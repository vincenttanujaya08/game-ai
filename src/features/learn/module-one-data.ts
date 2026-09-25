export type LessonStage = {
  id: string;
  title: string;
  area: string;
  question: string;
  intro: string;
};

export const moduleOneStages: LessonStage[] = [
  {
    id: "ai-today",
    title: "AI Hari Ini",
    area: "Lesson 1 / 3",
    question: "Seberapa jauh kemampuan AI sekarang?",
    intro: "Lihat AI di sains, kesehatan, dunia fisik, dan keseharian. Lalu pahami mengapa kemampuan besar tetap perlu diimbangi sikap hati-hati.",
  },
  {
    id: "what-is-ai",
    title: "Sebenarnya, Apa Itu AI?",
    area: "Lesson 2 / 3",
    question: "Apa yang membuat sebuah sistem disebut AI?",
    intro: "Mulai dari otomatisasi, lalu kenali data, machine learning, deep learning, generative AI, dan alasan sebuah model bisa keliru.",
  },
  {
    id: "thinking-with-ai",
    title: "Berpikir di Era AI",
    area: "Lesson 3 / 3",
    question: "Bagaimana tetap bernilai dan memegang kendali?",
    intro: "Pelajari perubahan tugas dalam pekerjaan, risiko terlalu percaya AI, dan cara memakai AI tanpa menyerahkan penilaianmu.",
  },
];
