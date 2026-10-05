import { InteractiveCourse } from "@/features/learn/interactive-course";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Belajar membangun, menguji, dan meluncurkan software bersama coding agent.",
};

export default async function VibeCodingLessonPage() {
  const { user } = await requirePreTest("vibe-coding");
  return <InteractiveCourse course="vibe-coding" userId={user.id} />;
}
