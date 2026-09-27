import { LessonReader } from "@/features/learn/lesson-reader";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Belajar membangun, menguji, dan meluncurkan software bersama coding agent.",
};

export default function VibeCodingLessonPage() {
  return <LessonReader course="vibe-coding" />;
}
