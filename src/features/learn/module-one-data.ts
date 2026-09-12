export type LessonStage = {
  id: string;
  title: string;
  area: string;
  question: string;
  intro: string;
  reward: string;
  kind: "lesson" | "challenge";
};

export const moduleOneStages: LessonStage[] = [
  {
    id: "ai-around-you",
    title: "AI Around You",
    area: "Lesson 1 / 3",
    question: "Apakah semua teknologi otomatis memakai AI?",
    intro:
      "Teknologi bekerja di sekitar kita hampir setiap saat. Tapi tidak semua yang otomatis menggunakan AI.",
    reward: "AI Radar",
    kind: "lesson",
  },
  {
    id: "generative-ai",
    title: "What Is Generative AI?",
    area: "Lesson 2 / 3",
    question: "Apa yang membedakan Generative AI?",
    intro:
      "Semua ini AI, tetapi tidak semuanya melakukan hal yang sama. Mari lihat mana yang menghasilkan konten baru.",
    reward: "GenAI Explorer",
    kind: "lesson",
  },
  {
    id: "how-ai-works",
    title: "How AI Works",
    area: "Lesson 3 / 3 · From Input to Output",
    question: "Secara sederhana, dari mana output AI datang?",
    intro:
      "Saat memakai AI, kita melihat input dan output. Di tengahnya ada model yang telah belajar pola.",
    reward: "Model Explorer",
    kind: "lesson",
  },
  {
    id: "smart-campus",
    title: "Smart Campus",
    area: "Module Challenge",
    question: "Bisakah kamu memakai konsep tadi di skenario kampus?",
    intro:
      "Pilih lima lokasi kampus dalam urutan yang kamu mau. Tidak ada materi baru—hanya memakai konsep yang sudah kamu pelajari.",
    reward: "Understand AI Badge",
    kind: "challenge",
  },
];
