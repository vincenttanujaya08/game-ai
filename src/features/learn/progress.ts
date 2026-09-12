export const progressKey = "nusa-learn-progress-v1";

export type LearnProgress = {
  completedStages: number[];
  unlockedStage: number;
  activeStage: number;
};

export const initialLearnProgress: LearnProgress = {
  completedStages: [],
  unlockedStage: 0,
  activeStage: 0,
};

const stageCount = 4;
export const fundamentalsModuleCount = 4;

export function completedFundamentalsModules(progress: LearnProgress) {
  return progress.completedStages.length === stageCount ? 1 : 0;
}

export function readProgress(): LearnProgress {
  if (typeof window === "undefined") return initialLearnProgress;
  try {
    const value = JSON.parse(localStorage.getItem(progressKey) ?? "null");
    const completedStages: number[] = Array.isArray(value?.completedStages)
      ? value.completedStages.filter(
          (item: unknown): item is number =>
            Number.isInteger(item) && Number(item) >= 0 && Number(item) <= 3,
        ) as number[]
      : [];
    const uniqueCompletedStages = [...new Set(completedStages)].sort();
    const nextStage = Array.from({ length: stageCount }, (_, index) => index).find(
      (index) => !uniqueCompletedStages.includes(index),
    );
    const allComplete = nextStage === undefined;
    const unlockedStage = nextStage ?? stageCount - 1;
    const activeStage = allComplete && Number.isInteger(value?.activeStage)
      ? Math.min(stageCount - 1, Math.max(0, value.activeStage))
      : unlockedStage;
    return { completedStages: uniqueCompletedStages, unlockedStage, activeStage };
  } catch {
    return initialLearnProgress;
  }
}

export function saveProgress(progress: LearnProgress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}
