import { LessonReader } from "@/features/learn/lesson-reader";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Belajar membangun, menguji, dan meluncurkan software bersama coding agent.",
};

export default async function VibeCodingLessonPage() {
  const { user } = await requirePreTest("vibe-coding");
  return <LessonReader course="vibe-coding" userId={user.id} />;
}
