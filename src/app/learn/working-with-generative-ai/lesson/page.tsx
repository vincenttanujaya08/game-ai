import { InteractiveCourse } from "@/features/learn/interactive-course";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "Prompt Engineering · NUSA Lab",
  description: "Belajar memberi arahan yang jelas, menguji jawaban AI, dan menyusun workflow.",
};

export default async function WorkingWithGenerativeAILessonPage() {
  const { user } = await requirePreTest("working-with-generative-ai");
  return <InteractiveCourse course="working-with-generative-ai" userId={user.id} />;
}
