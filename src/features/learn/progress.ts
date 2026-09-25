import { moduleOneStages } from "./module-one-data";

export const progressKey = "nusa-learn-progress-v2";

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

export const fundamentalsModuleCount = moduleOneStages.length;

export function completedFundamentalsModules(progress: LearnProgress) {
  return progress.completedStages.length;
}

export function readProgress(key = progressKey, stageCount = fundamentalsModuleCount): LearnProgress {
  if (typeof window === "undefined") return initialLearnProgress;
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "null");
    const completedStages: number[] = Array.isArray(value?.completedStages)
      ? value.completedStages.filter(
          (item: unknown): item is number =>
            Number.isInteger(item) && Number(item) >= 0 && Number(item) < stageCount,
        )
      : [];
    const uniqueCompletedStages = [...new Set(completedStages)].sort();
    const nextStage = Array.from({ length: stageCount }, (_, index) => index).find(
      (index) => !uniqueCompletedStages.includes(index),
    );
    const unlockedStage = nextStage ?? stageCount - 1;
    const activeStage = nextStage === undefined && Number.isInteger(value?.activeStage)
      ? Math.min(stageCount - 1, Math.max(0, value.activeStage))
      : unlockedStage;
    return { completedStages: uniqueCompletedStages, unlockedStage, activeStage };
  } catch {
    return initialLearnProgress;
  }
}

export function saveProgress(progress: LearnProgress, key = progressKey) {
  localStorage.setItem(key, JSON.stringify(progress));
}
