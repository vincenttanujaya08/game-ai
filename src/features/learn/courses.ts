import { fundamentalsLessons, type LessonContent } from "./fundamentals-content";
import { sectionPresentations, type SectionPresentation } from "./fundamentals-presentation";
import { moduleOneStages, type LessonStage } from "./module-one-data";
import { workingLessons, workingPresentations, workingStages } from "./working-with-generative-ai";
import { vibeLessons, vibePresentations, vibeStages } from "./vibe-coding";

export type CourseId = "ai-fundamentals" | "working-with-generative-ai" | "vibe-coding";

export type CourseConfig = {
  id: CourseId;
  /** Judul kursus apa adanya, dipakai di peta pelajaran dan hub. */
  title: string;
  /** Eyebrow di header pelajaran, mis. "AI FUNDAMENTALS". */
  eyebrow: string;
  /** Eyebrow di peta pelajaran, mis. "KURSUS 01 · DASAR-DASAR AI". */
  label: string;
  /** Nomor urut kursus untuk hub, mis. "01". */
  order: string;
  path: string;
  lessonPath: string;
  progressKey: string;
  /** Ringkasan di hero peta pelajaran. */
  summary: string;
  /** Ringkasan di blok "Peta pelajaran". */
  mapSummary: string;
  /** Ringkasan di learn hub. */
  hubSummary: string;
  hero: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
    credit: string;
    creditUrl: string;
  };
  stages: LessonStage[];
  lessons: LessonContent[];
  presentations: SectionPresentation[][];
  finish: { title: string; body: string; cta: { label: string; href: string } };
};

export const courses: Record<CourseId, CourseConfig> = {
  "ai-fundamentals": {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    eyebrow: "AI FUNDAMENTALS",
    label: "KURSUS 01 · DASAR-DASAR AI",
    order: "01",
    path: "/learn/ai-fundamentals",
    lessonPath: "/learn/ai-fundamentals/module-1",
    progressKey: "nusa-learn-progress-v2",
    summary: "Kenali kemampuan AI hari ini, pahami cara kerjanya, dan belajar memakainya dengan penilaianmu sendiri.",
    mapSummary: "Tiga pelajaran yang saling menyambung. Mulai dari yang bisa AI lakukan, lalu pahami cara kerja dan peran kita.",
    hubSummary: "Tiga pelajaran tentang kemampuan AI hari ini, cara kerjanya, dan cara tetap berpikir jernih saat memakainya.",
    hero: {
      src: "/course-visuals/aceh-polytechnic.webp",
      alt: "Mahasiswa Politeknik Aceh mempraktikkan keterampilan teknologi komputer di laboratorium",
      width: 1280,
      height: 853,
      caption: "Belajar AI, tetap berpikir sendiri.",
      credit: "Foto: USAID Indonesia · domain publik",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Mahasiswa_i_menggunakan_komputer_untuk_meningkatkan_keterampilan_teknologi_(8315664069).jpg",
    },
    stages: moduleOneStages,
    lessons: fundamentalsLessons,
    presentations: sectionPresentations,
    finish: {
      title: "Bekal AI Fundamentals sudah lengkap.",
      body: "Kamu sudah mengenal kemampuan AI, cara kerja dasarnya, dan cara menjaga keputusan tetap di tanganmu. Coba gunakan bekal itu dalam skenario nyata di NUSA Lab Game.",
      cta: { label: "Coba NUSA Lab Game ↗", href: "/games" },
    },
  },
  "working-with-generative-ai": {
    id: "working-with-generative-ai",
    title: "Working with Generative AI",
    eyebrow: "WORKING WITH GENERATIVE AI",
    label: "KURSUS 02 · GENERATIVE AI",
    order: "02",
    path: "/learn/working-with-generative-ai",
    lessonPath: "/learn/working-with-generative-ai/lesson",
    progressKey: "nusa-learn-working-generative-ai-v1",
    summary: "Belajar memberi arahan yang jelas, menguji jawaban AI, memperbaiki hasil, dan menyusun alur kerja yang tetap kamu kendalikan.",
    mapSummary: "Empat pelajaran yang saling menyambung. Mulai dari memberi arah, lalu meninjau jawaban hingga merangkai alur kerja.",
    hubSummary: "Empat pelajaran untuk memberi AI arahan yang jelas, menguji jawabannya, memperbaiki hasil, dan menyusun alur kerja.",
    hero: {
      src: "/course-visuals/working-generative-ai-students.jpg",
      alt: "Mahasiswa bekerja bersama menyusun model arsitektur di lingkungan kampus",
      width: 1280,
      height: 854,
      caption: "Belajar bersama, berpikir mandiri.",
      credit: "Foto: DFAT · CC BY 2.0",
      creditUrl: "https://commons.wikimedia.org/wiki/File:New_Colombo_Plan_students_in_Indonesia_working_on_a_student_collaboration_on_architecture_(15894268345).jpg",
    },
    stages: workingStages,
    lessons: workingLessons,
    presentations: workingPresentations,
    finish: {
      title: "Kamu siap bekerja bersama Generative AI.",
      body: "Kamu sudah berlatih memberi arah, menguji jawaban, memperbaiki hasil, dan menyusun alur kerja. Tetap periksa sumber dan gunakan penilaianmu sendiri.",
      cta: { label: "Kembali ke semua kursus ↗", href: "/learn" },
    },
  },
  "vibe-coding": {
    id: "vibe-coding",
    title: "Vibe Coding",
    eyebrow: "VIBE CODING",
    label: "KURSUS 03 · VIBE CODING",
    order: "03",
    path: "/learn/vibe-coding",
    lessonPath: "/learn/vibe-coding/lesson",
    progressKey: "nusa-learn-vibe-coding-v1",
    summary: "Bangun software lewat percakapan dengan AI. Kenali coding agent, rencanakan, uji, perbaiki, lalu bagikan project-mu.",
    mapSummary: "Tujuh pelajaran dari mengenal coding agent hingga menguji dan meluncurkan project sendiri.",
    hubSummary: "Tujuh pelajaran untuk mengubah ide menjadi software: pahami coding agent, bangun project, uji hasilnya, lalu bagikan ke internet.",
    hero: {
      src: "/course-visuals/vibe-coding-person-laptop.jpg",
      alt: "Seseorang sedang bekerja di laptop di ruang kerja yang nyaman",
      width: 1280,
      height: 854,
      caption: "Mulai dari ide. Akhiri dengan karya yang bisa dibuka.",
      credit: "Foto: Nenad Stojković · CC BY 2.0",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Person_working_on_laptop_in_a_cozy_indoor_setting_during_daytime.jpg",
    },
    stages: vibeStages,
    lessons: vibeLessons,
    presentations: vibePresentations,
    finish: {
      title: "Kamu sudah membangun dan meluncurkan ide.",
      body: "Kamu sudah mengenal coding agent, membuat project, mengujinya, dan membagikan hasilnya. Terus gunakan penilaianmu sendiri saat bekerja dengan AI.",
      cta: { label: "Kembali ke semua kursus ↗", href: "/learn" },
    },
  },
};

export const courseOrder: CourseId[] = ["ai-fundamentals", "working-with-generative-ai", "vibe-coding"];

export const courseList: CourseConfig[] = courseOrder.map((id) => courses[id]);

/** Jumlah bagian tiap pelajaran, dipakai untuk clamp sectionIndex saat membaca progres. */
export function sectionCounts(course: CourseConfig) {
  return course.lessons.map((lesson) => lesson.sections.length);
}
