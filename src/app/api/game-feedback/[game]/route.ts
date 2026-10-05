import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { gameFeedbackSchema, gameIdSchema } from "@/server/games/scoring";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ game: string }> }) {
  const game = gameIdSchema.safeParse((await params).game);
  if (!game.success) return NextResponse.json({ error: "UNKNOWN_GAME" }, { status: 404 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const { data, error } = await supabase.from("game_ratings").select("usefulness_rating,clarity_rating,comment,is_mock").eq("user_id", user.id).eq("game_id", game.data).maybeSingle();
  if (error) return NextResponse.json({ error: "FEEDBACK_LOAD_FAILED" }, { status: 500 });
  return NextResponse.json({ feedback: data });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ game: string }> }) {
  const game = gameIdSchema.safeParse((await params).game);
  if (!game.success) return NextResponse.json({ error: "UNKNOWN_GAME" }, { status: 404 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "INVALID_FEEDBACK" }, { status: 400 }); }
  const feedback = gameFeedbackSchema.safeParse(input);
  if (!feedback.success) return NextResponse.json({ error: "INVALID_FEEDBACK" }, { status: 400 });
  const result = await supabase.from("game_results").select("score").eq("user_id", user.id).eq("game_id", game.data).maybeSingle();
  if (result.error) return NextResponse.json({ error: "RESULT_LOAD_FAILED" }, { status: 500 });
  if (!result.data) return NextResponse.json({ error: "GAME_NOT_COMPLETED" }, { status: 409 });
  const { error } = await supabase.from("game_ratings").upsert({ user_id: user.id, game_id: game.data, usefulness_rating: feedback.data.usefulnessRating, clarity_rating: feedback.data.clarityRating, comment: feedback.data.comment || null, is_mock: false, updated_at: new Date().toISOString() }, { onConflict: "user_id,game_id" });
  if (error) return NextResponse.json({ error: "FEEDBACK_SAVE_FAILED" }, { status: 500 });
  return NextResponse.json({ saved: true });
}
