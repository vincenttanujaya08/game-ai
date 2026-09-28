import type { CourseConfig } from "./courses";

/** Satu catatan percobaan untuk satu aktivitas di dalam satu bagian pelajaran. */
export type Attempt = { tries: number; solved: boolean; firstTryCorrect: boolean };

export type LearnProgress = {
  completedStages: number[];
  unlockedStage: number;
  activeStage: number;
  sectionIndex: number;
  attempts: Record<string, Attempt>;
};

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

export function normalizeProgress(value: unknown, course: CourseConfig): LearnProgress {
  const stageCount = course.stages.length;
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
    const sectionCount = course.lessons[activeStage]?.sections.length ?? 1;
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

export function readProgress(course: CourseConfig): LearnProgress {
  if (typeof window === "undefined") return initialLearnProgress;
  try { return normalizeProgress(JSON.parse(localStorage.getItem(course.progressKey) ?? "null"), course); }
  catch { return initialLearnProgress; }
}

const cloudCourses = new Set<string>();
const saveQueues = new Map<string, Promise<void>>();

/** Signed-in users load the database record; guests keep the existing local progress. */
export async function loadProgress(course: CourseConfig): Promise<LearnProgress> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    cloudCourses.delete(course.id);
    return readProgress(course);
  }
  await saveQueues.get(course.id);
  const response = await fetch(`/api/progress/${course.id}`, { cache: "no-store" });
  if (response.status === 401 || response.status === 503) {
    cloudCourses.delete(course.id);
    return readProgress(course);
  }
  if (!response.ok) throw new Error("PROGRESS_LOAD_FAILED");
  cloudCourses.add(course.id);
  const data = await response.json();
  return normalizeProgress(data.progress, course);
}

export function saveProgress(progress: LearnProgress, course: CourseConfig) {
  if (cloudCourses.has(course.id)) {
    const previous = saveQueues.get(course.id) ?? Promise.resolve();
    const next = previous.catch(() => {}).then(async () => {
      const response = await fetch(`/api/progress/${course.id}`, {
        method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(progress),
      });
      if (!response.ok) throw new Error("PROGRESS_SAVE_FAILED");
      window.dispatchEvent(new Event("nusa-progress-save-ok"));
    });
    saveQueues.set(course.id, next);
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
