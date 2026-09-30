import LearnHub from "@/features/learn/learn-hub";
import { courseList } from "@/features/learn/courses";
import { coursePractices } from "@/features/learn/mastery";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Peta Belajar AI · NUSA Lab",
  description: "Pilih jalur belajar AI dan lanjutkan perjalananmu di NUSA Lab.",
};

export default async function LearnPage() {
  const user = await getAuthenticatedUser();
  const hubCourses = courseList.map((course) => ({
    id: course.id,
    title: course.title,
    order: course.order,
    path: course.path,
    hubSummary: course.hubSummary,
    progressKey: course.progressKey,
    stageCount: course.stages.length,
    sectionCounts: course.lessons.map((lesson) => lesson.sections.length),
    practiceKeys: coursePractices(course).map((practice) => practice.key),
  }));
  return <LearnHub courses={hubCourses} userId={user?.id ?? null} />;
}
