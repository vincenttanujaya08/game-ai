import { fundamentalsLessons, type LessonContent } from "./fundamentals-content";
import { sectionPresentations, type SectionPresentation } from "./fundamentals-presentation";
import { moduleOneStages, type LessonStage } from "./module-one-data";
import { workingLessons, workingPresentations, workingStages } from "./working-with-generative-ai";
import { vibeLessons, vibePresentations, vibeStages } from "./vibe-coding";
import material from "./material-final.json";
import { materialActivity } from "./material-activity";

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
    summary: "AI muncul di kotak masuk, ruang riset, sampai tugas kuliahmu. Ikuti ceritanya, pahami cara kerjanya, lalu putuskan kapan hasilnya perlu diperiksa.",
    mapSummary: "Mulai dari AI yang kamu temui sehari-hari, intip cara kerjanya, lalu coba menilai jawabannya dengan kepalamu sendiri.",
    hubSummary: "Dari rekomendasi lagu sampai tugas kuliah: kenali AI, cara kerjanya, dan kapan kamu perlu mengecek hasilnya.",
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
    summary: "Satu tugas presentasi bisa menghasilkan jawaban AI yang terlalu panjang, terlalu yakin, atau meleset. Pelajari cara mengarahkannya lewat percakapan.",
    mapSummary: "Dari prompt pertama sampai hasil akhir: beri konteks, uji asumsi, revisi draf, lalu susun pekerjaan langkah demi langkah.",
    hubSummary: "Mulai dari draf yang meleset, lalu arahkan, uji, dan perbaiki jawaban AI sampai berguna untuk tugasmu.",
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
    summary: "Punya ide aplikasi kecil? Ajak coding agent membantu dari rencana sampai kode, lalu coba, perbaiki, dan bagikan hasilnya.",
    mapSummary: "Ikuti perjalanan sebuah project: pilih alat, atur izin, beri konteks, bangun versi pertama, lalu uji di perangkat lain.",
    hubSummary: "Bawa ide aplikasi kecil dari percakapan dengan agent sampai menjadi tautan yang bisa dicoba orang lain.",
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

// The Markdown in docs/ is the reviewed source. The compiled JSON replaces
// every visible lesson text while preserving the existing activity mechanics.
material.forEach((source, courseIndex) => {
  const course = courses[courseOrder[courseIndex]];
  if (source.lessons.length !== course.lessons.length) throw new Error(`Lesson count mismatch: ${source.title}`);
  course.title = source.title;
  course.label = source.label;
  course.summary = source.summary;
  course.mapSummary = source.mapSummary;
  course.hubSummary = source.hubSummary;
  course.hero = { ...course.hero, ...source.hero };
  course.finish.body = source.finish;
  course.stages = course.stages.map((stage, lessonIndex) => ({ ...stage,
    title: source.lessons[lessonIndex].title,
    question: source.lessons[lessonIndex].question,
    intro: source.lessons[lessonIndex].intro,
  }));
  course.lessons = course.lessons.map((lesson, lessonIndex) => {
    const updated = source.lessons[lessonIndex];
    if (updated.sections.length !== lesson.sections.length) throw new Error(`Section count mismatch: ${source.title} / ${updated.title}`);
    return { ...lesson, lead: updated.lead, takeaway: updated.takeaway, check: updated.check,
      sections: lesson.sections.map((section, sectionIndex) => ({ ...section,
        title: updated.sections[sectionIndex].title,
        markdown: updated.sections[sectionIndex].body,
        reveal: updated.sections[sectionIndex].reveal
          ? { paragraphs: [updated.sections[sectionIndex].reveal] } : undefined,
      })) };
  });
  course.presentations = course.presentations.map((lesson, lessonIndex) => lesson.map((section, sectionIndex) => ({
    ...section,
    activity: materialActivity(section.activity, source.lessons[lessonIndex].sections[sectionIndex].activity),
    reflection: source.lessons[lessonIndex].sections[sectionIndex].reflection ?? undefined,
    bridge: "",
  })));
});

export const courseList: CourseConfig[] = courseOrder.map((id) => courses[id]);

/** Jumlah bagian tiap pelajaran, dipakai untuk clamp sectionIndex saat membaca progres. */
export function sectionCounts(course: CourseConfig) {
  return course.lessons.map((lesson) => lesson.sections.length);
}
