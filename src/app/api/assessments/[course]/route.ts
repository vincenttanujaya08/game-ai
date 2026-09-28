import { NextResponse, type NextRequest } from "next/server";
import { assessments } from "@/features/learn/assessments";
import { courses, type CourseId } from "@/features/learn/courses";
import { normalizeProgress } from "@/features/learn/progress";
import { createClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ course: string }> };

async function getContext(context: Context) {
  const { course: id } = await context.params;
  if (!Object.hasOwn(courses, id)) return null;
  const courseId = id as CourseId;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { courseId, supabase, user: null };
  return { courseId, supabase, user };
}

function validAnswers(value: unknown, count: number) {
  return Array.isArray(value) && value.length === count && value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 3);
}

export async function GET(_request: NextRequest, context: Context) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const data = await getContext(context);
  if (!data) return NextResponse.json({ error: "COURSE_NOT_FOUND" }, { status: 404 });
  if (!data.user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const { data: row, error } = await data.supabase.from("course_assessments")
    .select("pre_test_completed_at, post_test_completed_at, post_test_score")
    .eq("user_id", data.user.id).eq("course_id", data.courseId).maybeSingle();
  if (error) return NextResponse.json({ error: "ASSESSMENT_LOAD_FAILED" }, { status: 500 });
  return NextResponse.json({
    preTestCompleted: Boolean(row?.pre_test_completed_at),
    postTestCompleted: Boolean(row?.post_test_completed_at),
    postTestScore: row?.post_test_score ?? null,
  }, { headers: { "cache-control": "no-store" } });
}

export async function POST(request: NextRequest, context: Context) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const data = await getContext(context);
  if (!data) return NextResponse.json({ error: "COURSE_NOT_FOUND" }, { status: 404 });
  if (!data.user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "INVALID_ANSWERS" }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "INVALID_ANSWERS" }, { status: 400 });
  const input = body as Record<string, unknown>;
  const assessment = assessments[data.courseId];
  const { data: existing, error: loadError } = await data.supabase.from("course_assessments")
    .select("pre_test_completed_at, post_test_completed_at")
    .eq("user_id", data.user.id).eq("course_id", data.courseId).maybeSingle();
  if (loadError) return NextResponse.json({ error: "ASSESSMENT_LOAD_FAILED" }, { status: 500 });

  if (input.kind === "pre") {
    if (!validAnswers(input.answers, assessment.pre.length)) return NextResponse.json({ error: "ANSWER_EACH_QUESTION" }, { status: 400 });
    if (existing?.pre_test_completed_at) return NextResponse.json({ preTestCompleted: true });
    const result = await data.supabase.rpc("submit_course_assessment", {
      p_course_id: data.courseId,
      p_kind: "pre",
      p_answers: input.answers,
      p_reflection: null,
    });
    if (result.error) return NextResponse.json({ error: "ASSESSMENT_SAVE_FAILED" }, { status: 500 });
    return NextResponse.json({ preTestCompleted: true });
  }

  if (input.kind !== "post" || !validAnswers(input.answers, assessment.post.length)) {
    return NextResponse.json({ error: "ANSWER_EACH_QUESTION" }, { status: 400 });
  }
  const reflection = typeof input.reflection === "string" ? input.reflection.trim() : "";
  const answers = input.answers as number[];
  if (reflection.length < 30 || reflection.length > 1200) {
    return NextResponse.json({ error: "REFLECTION_LENGTH" }, { status: 400 });
  }
  if (!existing?.pre_test_completed_at) return NextResponse.json({ error: "PRE_TEST_REQUIRED" }, { status: 403 });
  const { data: progressRow, error: progressError } = await data.supabase.from("course_progress")
    .select("progress").eq("user_id", data.user.id).eq("course_id", data.courseId).maybeSingle();
  if (progressError) return NextResponse.json({ error: "PROGRESS_LOAD_FAILED" }, { status: 500 });
  const progress = normalizeProgress(progressRow?.progress, courses[data.courseId]);
  const lessonsReady = courses[data.courseId].stages.slice(0, -1).every((_, index) => progress.completedStages.includes(index));
  if (!lessonsReady) return NextResponse.json({ error: "LESSONS_REQUIRED" }, { status: 403 });

  const result = await data.supabase.rpc("submit_course_assessment", {
    p_course_id: data.courseId,
    p_kind: "post",
    p_answers: answers,
    p_reflection: reflection,
  });
  if (result.error) return NextResponse.json({ error: "ASSESSMENT_SAVE_FAILED" }, { status: 500 });
  const score = Number((result.data as { score?: number } | null)?.score ?? 0);
  return NextResponse.json({ postTestCompleted: true, score, total: assessment.post.length });
}
