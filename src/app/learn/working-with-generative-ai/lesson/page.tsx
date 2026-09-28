import { LessonReader } from "@/features/learn/lesson-reader";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "Working with Generative AI · NUSA Lab",
  description: "Belajar memberi arahan yang jelas, menguji jawaban AI, dan menyusun workflow.",
};

export default async function WorkingWithGenerativeAILessonPage() {
  await requirePreTest("working-with-generative-ai");
  return <LessonReader course="working-with-generative-ai" />;
}
