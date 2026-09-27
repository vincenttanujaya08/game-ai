import { LessonReader } from "@/features/learn/lesson-reader";

export const metadata = {
  title: "AI Fundamentals · NUSA Lab",
  description: "Tiga pelajaran untuk mengenal kemampuan AI, cara kerjanya, dan penilaian manusia.",
};

export default function ModuleOnePage() {
  return <LessonReader course="ai-fundamentals" />;
}
