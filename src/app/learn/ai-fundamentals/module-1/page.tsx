import { LessonReader } from "@/features/learn/lesson-reader";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "AI Fundamentals · NUSA Lab",
  description: "Tiga pelajaran untuk mengenal kemampuan AI, cara kerjanya, dan penilaian manusia.",
};

export default async function ModuleOnePage() {
  await requirePreTest("ai-fundamentals");
  return <LessonReader course="ai-fundamentals" />;
}
