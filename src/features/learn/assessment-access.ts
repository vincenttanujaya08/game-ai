import { redirect } from "next/navigation";
import { courses, type CourseId } from "./courses";
import { normalizeProgress } from "./progress";
import { createClient } from "@/lib/supabase/server";

export async function requirePreTest(courseId: CourseId) {
  const course = courses[courseId];
  const next = `${course.lessonPath}`;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) redirect(`/login?next=${encodeURIComponent(next)}`);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  const { data } = await supabase.from("course_assessments").select("pre_test_completed_at")
    .eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
  if (!data?.pre_test_completed_at) redirect(`${course.path}/assessment?kind=pre`);
}

export async function requireAssessmentPage(courseId: CourseId, kind: "pre" | "post") {
  const course = courses[courseId];
  const next = `${course.path}/assessment?kind=${kind}`;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) redirect(`/login?next=${encodeURIComponent(next)}`);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  const { data: assessment } = await supabase.from("course_assessments")
    .select("pre_test_completed_at, post_test_completed_at")
    .eq("user_id", user.id).eq("course_id", courseId).maybeSingle();

  if (kind === "pre" && assessment?.pre_test_completed_at) redirect(course.lessonPath);
  if (kind === "post") {
    if (!assessment?.pre_test_completed_at) redirect(`${course.path}/assessment?kind=pre`);
    const { data: row } = await supabase.from("course_progress").select("progress")
      .eq("user_id", user.id).eq("course_id", courseId).maybeSingle();
    const progress = normalizeProgress(row?.progress, course);
    const lessonsReady = course.stages.slice(0, -1).every((_, index) => progress.completedStages.includes(index));
    if (!lessonsReady) redirect(course.lessonPath);
    if (assessment.post_test_completed_at) redirect(course.path);
  }
  return { assessment, user };
}
