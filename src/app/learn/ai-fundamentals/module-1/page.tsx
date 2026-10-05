import { InteractiveCourse } from "@/features/learn/interactive-course";
import { requirePreTest } from "@/features/learn/assessment-access";

export const metadata = {
  title: "AI Fundamentals · NUSA Lab",
  description: "Tiga pelajaran untuk mengenal kemampuan AI, cara kerjanya, dan penilaian manusia.",
};

export default async function ModuleOnePage() {
  const { user } = await requirePreTest("ai-fundamentals");
  return <InteractiveCourse course="ai-fundamentals" userId={user.id} />;
}
