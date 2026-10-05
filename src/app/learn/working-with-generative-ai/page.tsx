import CourseMap from "@/features/learn/course-map";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Prompt Engineering · NUSA Lab",
  description: "Dua belas bagian interaktif untuk memberi arah, meninjau jawaban, dan bekerja bersama generative AI.",
};

export default async function WorkingWithGenerativeAIPage() {
  const user = await getAuthenticatedUser();
  return <CourseMap course="working-with-generative-ai" userId={user?.id ?? null} />;
}
