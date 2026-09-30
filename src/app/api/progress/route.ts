import { NextResponse } from "next/server";
import { courses, type CourseId } from "@/features/learn/courses";
import { applyPostTestCompletion, initialLearnProgress, normalizeProgress } from "@/features/learn/progress";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });

  const [progressResult, assessmentResult] = await Promise.all([
    supabase.from("course_progress").select("course_id,progress").eq("user_id", user.id),
    supabase.from("course_assessments").select("course_id,pre_test_completed_at,post_test_completed_at").eq("user_id", user.id),
  ]);
  if (progressResult.error || assessmentResult.error) return NextResponse.json({ error: "PROGRESS_LOAD_FAILED" }, { status: 500 });
  const progress = Object.fromEntries(Object.entries(courses).map(([id, course]) => {
    const row = progressResult.data.find((item) => item.course_id === id);
    const assessment = assessmentResult.data.find((item) => item.course_id === id);
    return [id, {
      progress: applyPostTestCompletion(
        row ? normalizeProgress(row.progress, course) : initialLearnProgress,
        course,
        Boolean(assessment?.post_test_completed_at),
      ),
      preTestCompleted: Boolean(assessment?.pre_test_completed_at),
      postTestCompleted: Boolean(assessment?.post_test_completed_at),
    }];
  })) as Record<CourseId, { progress: ReturnType<typeof normalizeProgress>; preTestCompleted: boolean; postTestCompleted: boolean }>;
  return NextResponse.json({ courses: progress }, { headers: { "cache-control": "no-store" } });
}
