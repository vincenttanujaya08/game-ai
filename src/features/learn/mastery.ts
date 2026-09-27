import type { Activity } from "./activities/types";
import type { CourseConfig } from "./courses";
import { attemptKey, type LearnProgress } from "./progress";

/**
 * Penguasaan selalu diturunkan dari attempts, tidak pernah disimpan. Ini menjaga
 * progress.ts tetap punya satu sumber kebenaran dan tahan data lama.
 */

/** Satu bagian yang menuntut keputusan: blok latihan, atau cek pemahaman pelajaran. */
export type PracticeRef = {
  key: string;
  stageIndex: number;
  sectionIndex: number;
  /** Judul bagian tempat latihan ini berada. */
  section: string;
  /** Pertanyaan yang diputuskan pembaca. */
  question: string;
  /** Alasan yang menjelaskan mengapa jawabannya begitu. */
  reason: string;
};

const activityBlockIndex = 0;
const checkActivityIndex = 1;

function questionOf(activity: Activity) {
  switch (activity.kind) {
    case "predict":
      return activity.prompt;
    case "spot":
      return activity.mode === "flaw" ? "Tandai bagian yang perlu diperiksa" : "Tandai bagian yang kamu kenali";
    case "arrange":
      return activity.instruction;
    case "estimate":
      return activity.question;
    case "promptLab":
      return activity.task;
  }
}

function reasonOf(activity: Activity) {
  return activity.kind === "promptLab" ? activity.outputs.strong : activity.reveal;
}

/** Semua latihan dalam satu pelajaran, berurutan sesuai bacaan. */
export function lessonPractices(course: CourseConfig, stageIndex: number): PracticeRef[] {
  const lesson = course.lessons[stageIndex];
  const panels = course.presentations[stageIndex] ?? [];
  const refs: PracticeRef[] = [];

  lesson.sections.forEach((section, sectionIndex) => {
    const activity = panels[sectionIndex]?.activity;
    if (!activity) return;
    refs.push({
      key: attemptKey(stageIndex, sectionIndex, activityBlockIndex),
      stageIndex,
      sectionIndex,
      section: section.title,
      question: questionOf(activity),
      reason: reasonOf(activity),
    });
  });

  const lastSection = lesson.sections.length - 1;
  const correct = lesson.check.choices.find((choice) => choice.correct);
  refs.push({
    key: attemptKey(stageIndex, lastSection, checkActivityIndex),
    stageIndex,
    sectionIndex: lastSection,
    section: lesson.sections[lastSection].title,
    question: lesson.check.question,
    reason: correct?.feedback ?? "",
  });

  return refs;
}

export function coursePractices(course: CourseConfig): PracticeRef[] {
  return course.stages.flatMap((_, stageIndex) => lessonPractices(course, stageIndex));
}

export type Mastery = { solved: number; firstTry: number; total: number };

export function masteryOf(progress: LearnProgress, refs: PracticeRef[]): Mastery {
  return {
    solved: refs.filter((ref) => progress.attempts[ref.key]?.solved).length,
    firstTry: refs.filter((ref) => progress.attempts[ref.key]?.firstTryCorrect).length,
    total: refs.length,
  };
}

/** "belum", "sebagian", atau "selesai", dipakai rail dan peta pelajaran. */
export function masteryState(mastery: Mastery) {
  if (mastery.total === 0 || mastery.solved === 0) return "belum" as const;
  return mastery.solved >= mastery.total ? ("selesai" as const) : ("sebagian" as const);
}
