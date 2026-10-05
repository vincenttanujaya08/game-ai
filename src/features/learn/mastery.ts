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
  }
}

function reasonOf(activity: Activity) { return activity.reveal; }

/** Semua latihan dalam satu pelajaran, berurutan sesuai bacaan. */
export function lessonPractices(course: CourseConfig, stageIndex: number): PracticeRef[] {
  if (course.id === "working-with-generative-ai" && stageIndex === 1) {
    return [
      ["Pilih strategi", "Pilih prompt untuk menguji keputusan", "Prompt yang kuat memberi AI konteks dan kriteria; gelar atau perintah umum seperti “jangan mengiyakan” saja belum cukup."],
      ["Pilah informasi", "Bedakan brief, asumsi, dan langkah uji", "Target acara adalah informasi di brief, minat pembeli masih asumsi, dan sampel adalah langkah untuk mencari bukti."],
      ["Rakit prompt", "Susun tugas, konteks, standar, dan bentuk jawaban", "Prompt yang jelas meminta AI membandingkan dua sisi, memisahkan asumsi, dan menyusun jawaban yang mudah diperiksa."],
      ["Audit jawaban", "Tandai klaim yang belum punya dasar", "AI dapat memberi saran berguna sekaligus menyertakan asumsi. Prompt tidak mengubah tebakan menjadi data."],
      ["Tentukan tes", "Pilih tindak lanjut yang bisa diuji", "Tes kecil dengan ukuran dan ambang keputusan membantu tim belajar dari calon pembeli sebelum mengeluarkan modal."],
    ].map(([section, question, reason], index) => ({
      key: attemptKey(stageIndex, 0, index), stageIndex, sectionIndex: 0, section, question, reason,
    }));
  }
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

export function masteryOf(progress: LearnProgress, refs: Array<Pick<PracticeRef, "key">>): Mastery {
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
