import type { CourseConfig, CourseId } from "./courses";

/** Satu catatan percobaan untuk satu aktivitas di dalam satu bagian pelajaran. */
export type Attempt = { tries: number; solved: boolean; firstTryCorrect: boolean };

export type LearnProgress = {
  completedStages: number[];
  unlockedStage: number;
  activeStage: number;
  sectionIndex: number;
  attempts: Record<string, Attempt>;
};

export type ProgressLimits = { stageCount: number; sectionCounts: number[] };
export type CourseProgressInfo = ProgressLimits & { id: CourseId; progressKey: string };
export type CourseState = { progress: LearnProgress; preTestCompleted: boolean; postTestCompleted: boolean };

export const initialLearnProgress: LearnProgress = {
  completedStages: [],
  unlockedStage: 0,
  activeStage: 0,
  sectionIndex: 0,
  attempts: {},
};

/** Kunci percobaan: `${stage}-${section}-${activity}`. */
export function attemptKey(stage: number, section: number, activity = 0) {
  return stage + "-" + section + "-" + activity;
}

const ATTEMPT_KEY = /^\d+-\d+-\d+$/;

function clamp(value: number, max: number) {
  return Math.min(max, Math.max(0, value));
}

function sanitizeAttempts(value: unknown, stageCount: number): Record<string, Attempt> {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([key, raw]) => {
      if (!ATTEMPT_KEY.test(key)) return [];
      if (Number(key.split("-")[0]) >= stageCount) return [];
      if (!raw || typeof raw !== "object") return [];
      const item = raw as Record<string, unknown>;
      const tries = Number.isInteger(item.tries) ? clamp(item.tries as number, 99) : 0;
      return [
        [
          key,
          {
            tries,
            solved: item.solved === true,
            firstTryCorrect: item.firstTryCorrect === true && tries <= 1,
          },
        ] as const,
      ];
    }),
  );
}

export function normalizeProgress(value: unknown, course: Pick<CourseConfig, "stages" | "lessons"> | ProgressLimits): LearnProgress {
  const stageCount = "stageCount" in course ? course.stageCount : course.stages.length;
  try {
    const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
    const completedStages: number[] = Array.isArray(input.completedStages)
      ? input.completedStages.filter(
          (item: unknown): item is number =>
            Number.isInteger(item) && Number(item) >= 0 && Number(item) < stageCount,
        )
      : [];
    const uniqueCompletedStages = [...new Set(completedStages)].sort((a, b) => a - b);
    const nextStage = Array.from({ length: stageCount }, (_, index) => index).find(
      (index) => !uniqueCompletedStages.includes(index),
    );
    const unlockedStage = nextStage ?? stageCount - 1;
    // Hormati pelajaran yang terakhir dibuka selama masih dalam jangkauan yang terbuka,
    // supaya "Baca lagi" dan "lanjut dari tempat terakhir" bertahan sesudah reload.
    const storedStage = Number.isInteger(input.activeStage)
      ? clamp(input.activeStage as number, stageCount - 1)
      : undefined;
    const activeStage = storedStage !== undefined && storedStage <= unlockedStage ? storedStage : unlockedStage;
    const sectionCount = "sectionCounts" in course
      ? course.sectionCounts[activeStage] ?? 1
      : course.lessons[activeStage]?.sections.length ?? 1;
    const sectionIndex = Number.isInteger(input.sectionIndex)
      ? clamp(input.sectionIndex as number, sectionCount - 1)
      : 0;
    return {
      completedStages: uniqueCompletedStages,
      unlockedStage,
      activeStage,
      sectionIndex,
      attempts: sanitizeAttempts(input.attempts, stageCount),
    };
  } catch {
    return initialLearnProgress;
  }
}

/** Kelas baru tuntas jika semua pelajaran sebelumnya selesai dan post-test tersimpan di server. */
export function applyPostTestCompletion(progress: LearnProgress, course: CourseConfig, postTestCompleted: boolean) {
  const finalStage = course.stages.length - 1;
  const completedStages = progress.completedStages.filter((index) => index !== finalStage);
  const earlierLessonsComplete = course.stages.slice(0, -1).every((_, index) => completedStages.includes(index));
  if (postTestCompleted && earlierLessonsComplete) completedStages.push(finalStage);
  return normalizeProgress({ ...progress, completedStages }, course);
}

export function readProgress(course: CourseConfig): LearnProgress {
  return readStoredProgress(course.progressKey, course);
}

const saveQueues = new Map<string, Promise<void>>();
const pendingLoads = new Map<string, Promise<unknown>>();
const CLOUD_CACHE_PREFIX = "nusa-cloud-progress-v1:";

function readStoredProgress(key: string, limits: ProgressLimits | Pick<CourseConfig, "stages" | "lessons">) {
  if (typeof window === "undefined") return initialLearnProgress;
  try { return normalizeProgress(JSON.parse(localStorage.getItem(key) ?? "null"), limits); }
  catch { return initialLearnProgress; }
}

function cloudCacheKey(userId: string, courseId: string) {
  return CLOUD_CACHE_PREFIX + userId + ":" + courseId;
}

function accountCourseKey(userId: string, courseId: string) {
  return userId + ":" + courseId;
}

export function readCachedCourseState(course: CourseConfig, userId: string): CourseState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(cloudCacheKey(userId, course.id));
    if (!raw) return null;
    const cached = JSON.parse(raw) as Partial<CourseState>;
    return {
      progress: normalizeProgress(cached.progress, course),
      preTestCompleted: cached.preTestCompleted === true,
      postTestCompleted: cached.postTestCompleted === true,
    };
  } catch { return null; }
}

function storeCloudCourseState(courseId: string, userId: string, state: CourseState) {
  try { localStorage.setItem(cloudCacheKey(userId, courseId), JSON.stringify(state)); }
  catch { /* Cache is optional; server progress stays authoritative. */ }
}

export function readHubProgress(course: CourseProgressInfo, userId: string | null) {
  if (!userId || typeof window === "undefined") return readStoredProgress(course.progressKey, course);
  try {
    const cached = localStorage.getItem(cloudCacheKey(userId, course.id));
    return cached ? normalizeProgress((JSON.parse(cached) as Partial<CourseState>).progress, course) : null;
  } catch { return null; }
}

function localProgressMap(courseInfos: CourseProgressInfo[]) {
  return Object.fromEntries(courseInfos.map((course) => [course.id, readStoredProgress(course.progressKey, course)])) as Record<CourseId, LearnProgress>;
}

/** One authenticated request loads progress and test status for every course. */
export async function loadAllProgress(courseInfos: CourseProgressInfo[], userId: string | null) {
  if (!userId || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) return localProgressMap(courseInfos);
  const key = "all:" + userId;
  const pending = pendingLoads.get(key) as Promise<Record<CourseId, LearnProgress>> | undefined;
  if (pending) return pending;
  const request = (async () => {
    const response = await fetch("/api/progress", { cache: "no-store" });
    if (!response.ok) throw new Error("PROGRESS_LOAD_FAILED");
    const data = await response.json() as { courses: Record<CourseId, CourseState> };
    for (const course of courseInfos) {
      storeCloudCourseState(course.id, userId, data.courses[course.id]);
    }
    return Object.fromEntries(courseInfos.map(({ id }) => [id, data.courses[id].progress])) as Record<CourseId, LearnProgress>;
  })();
  pendingLoads.set(key, request);
  try { return await request; }
  finally { if (pendingLoads.get(key) === request) pendingLoads.delete(key); }
}

export async function loadCourseState(course: CourseConfig, userId: string) {
  const key = accountCourseKey(userId, course.id);
  const pendingSave = saveQueues.get(key);
  if (pendingSave) await pendingSave;
  const pendingKey = "course:" + key;
  const pending = pendingLoads.get(pendingKey) as Promise<CourseState> | undefined;
  if (pending) return pending;
  const request = (async () => {
    const response = await fetch(`/api/progress/${course.id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("PROGRESS_LOAD_FAILED");
    const data = await response.json() as CourseState;
    const pendingSave = saveQueues.get(key);
    if (pendingSave) {
      await pendingSave.catch(() => {});
      const latest = readCachedCourseState(course, userId);
      if (latest) {
        const state = { ...data, progress: latest.progress };
        storeCloudCourseState(course.id, userId, state);
        return state;
      }
    }
    const state = { ...data, progress: normalizeProgress(data.progress, course) };
    storeCloudCourseState(course.id, userId, state);
    return state;
  })();
  pendingLoads.set(pendingKey, request);
  try { return await request; }
  finally { if (pendingLoads.get(pendingKey) === request) pendingLoads.delete(pendingKey); }
}

/** Signed-in users load the database record; guests keep the existing local progress. */
export async function loadProgress(course: CourseConfig): Promise<LearnProgress> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return readProgress(course);
  }
  const response = await fetch(`/api/progress/${course.id}`, { cache: "no-store" });
  if (response.status === 401 || response.status === 503) {
    return readProgress(course);
  }
  if (!response.ok) throw new Error("PROGRESS_LOAD_FAILED");
  const data = await response.json();
  return normalizeProgress(data.progress, course);
}

export function saveProgress(progress: LearnProgress, course: CourseConfig, userId?: string) {
  const key = userId ? accountCourseKey(userId, course.id) : "";
  if (userId) {
    const cached = readCachedCourseState(course, userId);
    storeCloudCourseState(course.id, userId, {
      progress,
      preTestCompleted: cached?.preTestCompleted ?? false,
      postTestCompleted: cached?.postTestCompleted ?? false,
    });
    const previous = saveQueues.get(key) ?? Promise.resolve();
    const next = previous.catch(() => {}).then(async () => {
      const response = await fetch(`/api/progress/${course.id}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(progress),
      });
      if (!response.ok) throw new Error("PROGRESS_SAVE_FAILED");
      window.dispatchEvent(new Event("nusa-progress-save-ok"));
    });
    saveQueues.set(key, next);
    void next.catch(() => window.dispatchEvent(new Event("nusa-progress-save-error")));
    return;
  }
  try {
    localStorage.setItem(course.progressKey, JSON.stringify(progress));
  } catch {
    // Penyimpanan bisa penuh atau diblokir. Progres tetap hidup di state React.
  }
}

export function completedCount(progress: LearnProgress) {
  return progress.completedStages.length;
}

/** Penguasaan diturunkan dari attempts, tidak pernah disimpan. */
export function lessonMastery(progress: LearnProgress, activityKeys: string[]) {
  const solved = activityKeys.filter((key) => progress.attempts[key]?.solved).length;
  const firstTry = activityKeys.filter((key) => progress.attempts[key]?.firstTryCorrect).length;
  return { solved, firstTry, total: activityKeys.length };
}

/** Save interactive material completion before navigating to the post-test. */
export async function completeInteractiveCourse(course: CourseConfig, userId: string) {
  const state = await loadCourseState(course, userId);
  const last = course.stages.length - 1;
  const progress = {
    ...state.progress,
    completedStages: course.stages.slice(0, -1).map((_, index) => index),
    unlockedStage: last,
    activeStage: last,
    sectionIndex: 0,
  };
  // Only the existing post-test can complete the final lesson.
  if (state.postTestCompleted) progress.completedStages.push(last);
  const response = await fetch(`/api/progress/${course.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(progress),
  });
  if (!response.ok) throw new Error("PROGRESS_SAVE_FAILED");
  await loadCourseState(course, userId);
  return state.postTestCompleted ? course.path : `${course.path}/assessment?kind=post`;
}
