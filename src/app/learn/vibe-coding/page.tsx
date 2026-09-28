import CourseMap from "@/features/learn/course-map";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Tujuh pelajaran untuk membangun software bersama coding agent, mengujinya, dan meluncurkannya.",
};

export default async function VibeCodingPage() {
  const user = await getAuthenticatedUser();
  return <CourseMap course="vibe-coding" isAuthenticated={Boolean(user)} />;
}
