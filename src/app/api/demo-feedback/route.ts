import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { courses, type CourseId } from "@/features/learn/courses";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { gameIdSchema, type GameId } from "@/server/games/scoring";
import { recordFirstGameScore } from "@/server/games/results";

const courseIdSchema = z.enum(["ai-fundamentals", "working-with-generative-ai", "vibe-coding"]);
const payloadSchema = z.object({
  courses: z.array(z.object({ id: courseIdSchema, rating: z.number().int().min(1).max(5), comment: z.string().trim().max(500) })).length(3),
  games: z.array(z.object({ id: gameIdSchema, usefulnessRating: z.number().int().min(1).max(5), clarityRating: z.number().int().min(1).max(5), comment: z.string().trim().max(500) })).length(2),
}).refine(({ courses: selectedCourses, games }) => new Set(selectedCourses.map(({ id }) => id)).size === 3 && new Set(games.map(({ id }) => id)).size === 2);

const postAnswers: Record<CourseId, number[]> = {
  "ai-fundamentals": [0, 1, 1, 0],
  "working-with-generative-ai": [1, 0, 1, 0],
  "vibe-coding": [2, 1, 0, 1],
};

export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "INVALID_FEEDBACK" }, { status: 400 }); }
  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "INVALID_FEEDBACK" }, { status: 400 });
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "FEEDBACK_STORAGE_UNAVAILABLE" }, { status: 503 });

  for (const item of parsed.data.courses) {
    const courseId = item.id as CourseId;
    const course = courses[courseId];
    const lastStage = course.stages.length - 1;
    const progress = { completedStages: course.stages.map((_, index) => index), unlockedStage: lastStage, activeStage: lastStage, sectionIndex: 0, attempts: {} };
    const saved = await supabase.from("course_progress").upsert({ user_id: user.id, course_id: courseId, progress, updated_at: new Date().toISOString() }, { onConflict: "user_id,course_id" });
    if (saved.error) return NextResponse.json({ error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
    const pre = await supabase.rpc("submit_course_assessment", { p_course_id: courseId, p_kind: "pre", p_answers: [0, 0, 0, 0, 0], p_reflection: null });
    if (pre.error) return NextResponse.json({ error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
    const post = await supabase.rpc("submit_course_assessment", { p_course_id: courseId, p_kind: "post", p_answers: postAnswers[courseId], p_reflection: "Saya telah mengikuti demo course ini dan memberikan feedback melalui formulir." });
    if (post.error) return NextResponse.json({ error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
    const rating = await admin.from("course_ratings").upsert({ user_id: user.id, course_id: courseId, rating: item.rating, comment: item.comment || null, updated_at: new Date().toISOString() }, { onConflict: "user_id,course_id" });
    if (rating.error) return NextResponse.json({ error: "RATING_SAVE_FAILED" }, { status: 500 });
  }

  for (const item of parsed.data.games) {
    try { await recordFirstGameScore(user.id, item.id as GameId, 100); }
    catch { return NextResponse.json({ error: "PROGRESS_SAVE_FAILED" }, { status: 500 }); }
    const progress = item.id === "sitasi-bermasalah"
      ? await (async () => {
        const current = await supabase.from("game_sessions").select("snapshot,events,stream_version").eq("user_id", user.id).eq("id", "demo").maybeSingle();
        if (current.error) return current;
        const snapshot = current.data?.snapshot && typeof current.data.snapshot === "object" ? current.data.snapshot : {};
        return supabase.from("game_sessions").upsert({ user_id: user.id, id: "demo", snapshot: { ...snapshot, status: "submitted" }, events: current.data?.events ?? [], stream_version: current.data?.stream_version ?? 0, updated_at: new Date().toISOString() }, { onConflict: "user_id,id" });
      })()
      : await (async () => {
        const current = await supabase.from("game_progress").select("state").eq("user_id", user.id).eq("game_id", item.id).maybeSingle();
        if (current.error) return current;
        return supabase.from("game_progress").upsert({ user_id: user.id, game_id: item.id, state: current.data?.state ?? {}, completed: true, updated_at: new Date().toISOString() }, { onConflict: "user_id,game_id" });
      })();
    if (progress.error) return NextResponse.json({ error: "PROGRESS_SAVE_FAILED" }, { status: 500 });
    const rating = await admin.from("game_ratings").upsert({ user_id: user.id, game_id: item.id, usefulness_rating: item.usefulnessRating, clarity_rating: item.clarityRating, comment: item.comment || null, is_mock: false, updated_at: new Date().toISOString() }, { onConflict: "user_id,game_id" });
    if (rating.error) return NextResponse.json({ error: "RATING_SAVE_FAILED" }, { status: 500 });
  }

  return NextResponse.json({ saved: true, completedCourses: 3, completedGames: 2 });
}
