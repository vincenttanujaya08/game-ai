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

export function readProgress(course: CourseConfig): LearnProgress {
  if (typeof window === "undefined") return initialLearnProgress;
  const stageCount = course.stages.length;
  try {
    const value = JSON.parse(localStorage.getItem(course.progressKey) ?? "null");
    const completedStages: number[] = Array.isArray(value?.completedStages)
      ? value.completedStages.filter(
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
    const storedStage = Number.isInteger(value?.activeStage)
      ? clamp(value.activeStage, stageCount - 1)
      : undefined;
    const activeStage = storedStage !== undefined && storedStage <= unlockedStage ? storedStage : unlockedStage;
    const sectionCount = course.lessons[activeStage]?.sections.length ?? 1;
    const sectionIndex = Number.isInteger(value?.sectionIndex)
      ? clamp(value.sectionIndex, sectionCount - 1)
      : 0;
    return {
      completedStages: uniqueCompletedStages,
      unlockedStage,
      activeStage,
      sectionIndex,
      attempts: sanitizeAttempts(value?.attempts, stageCount),
    };
  } catch {
    return initialLearnProgress;
  }
}

export function saveProgress(progress: LearnProgress, course: CourseConfig) {
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
