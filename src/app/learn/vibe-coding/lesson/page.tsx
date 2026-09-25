import { ModuleOneGame } from "@/features/learn/module-one-game";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Belajar membangun, menguji, dan meluncurkan software bersama coding agent.",
};

export default function VibeCodingLessonPage() {
  return <ModuleOneGame vibe />;
}
