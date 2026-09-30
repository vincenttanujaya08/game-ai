import CourseMap from "@/features/learn/course-map";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const metadata = {
  title: "AI Fundamentals · NUSA Lab",
  description: "Tiga pelajaran interaktif untuk memahami dasar-dasar AI.",
};

export default async function AiFundamentalsPage() {
  const user = await getAuthenticatedUser();
  return <CourseMap course="ai-fundamentals" userId={user?.id ?? null} />;
}
