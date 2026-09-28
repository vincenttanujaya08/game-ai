import { NextResponse, type NextRequest } from "next/server";
import { courses, type CourseId } from "@/features/learn/courses";
import { initialLearnProgress, normalizeProgress } from "@/features/learn/progress";
import { createClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ course: string }> };

async function contextData(context: Context) {
  const { course: id } = await context.params;
  const course = courses[id as CourseId];
  if (!course) return null;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { course, supabase, user: null };
  return { course, supabase, user };
}

export async function GET(_request: NextRequest, context: Context) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const data = await contextData(context);
  if (!data) return NextResponse.json({ error: "COURSE_NOT_FOUND" }, { status: 404 });
  if (!data.user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const { data: row, error } = await data.supabase.from("course_progress")
    .select("progress").eq("user_id", data.user.id).eq("course_id", data.course.id).maybeSingle();
  if (error) return NextResponse.json({ error: "LOAD_FAILED" }, { status: 500 });
  return NextResponse.json({ progress: row ? normalizeProgress(row.progress, data.course) : initialLearnProgress });
}

export async function PUT(request: NextRequest, context: Context) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const data = await contextData(context);
  if (!data) return NextResponse.json({ error: "COURSE_NOT_FOUND" }, { status: 404 });
  if (!data.user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "INVALID_PROGRESS" }, { status: 400 }); }
  if (!raw || typeof raw !== "object" || JSON.stringify(raw).length > 25000) {
    return NextResponse.json({ error: "INVALID_PROGRESS" }, { status: 400 });
  }
  const progress = normalizeProgress(raw, data.course);
  const { error } = await data.supabase.from("course_progress").upsert({
    user_id: data.user.id, course_id: data.course.id, progress, updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,course_id" });
  if (error) return NextResponse.json({ error: "SAVE_FAILED" }, { status: 500 });
  return NextResponse.json({ progress });
}
