import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { recordFirstGameScore } from "@/server/games/results";
import { cameraScore, gameIdSchema } from "@/server/games/scoring";
import { scoreSession } from "@/server/scoring/scorer";
import { citationMini } from "@/server/scenario/citation-mini";
import type { SessionEvent } from "@/shared/contracts/session";

export async function POST(_request: NextRequest, { params }: { params: Promise<{ game: string }> }) {
  const parsed = gameIdSchema.safeParse((await params).game);
  if (!parsed.success) return NextResponse.json({ error: "UNKNOWN_GAME" }, { status: 404 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const existing = await supabase.from("game_results").select("score,is_mock").eq("user_id", user.id).eq("game_id", parsed.data).maybeSingle();
  if (existing.error) return NextResponse.json({ error: "RESULT_LOAD_FAILED" }, { status: 500 });
  if (existing.data && !existing.data.is_mock) return NextResponse.json({ score: existing.data.score });
  let score: number;
  if (parsed.data === "sitasi-bermasalah") {
    const { data, error } = await supabase.from("game_sessions").select("snapshot,events").eq("user_id", user.id).eq("id", "demo").maybeSingle();
    if (error) return NextResponse.json({ error: "RESULT_LOAD_FAILED" }, { status: 500 });
    if (data?.snapshot?.status !== "submitted" || !Array.isArray(data.events)) return NextResponse.json({ error: "GAME_NOT_COMPLETED" }, { status: 409 });
    score = scoreSession(citationMini, data.events as SessionEvent[]).total;
  } else {
    const { data, error } = await supabase.from("game_progress").select("state,completed").eq("user_id", user.id).eq("game_id", parsed.data).maybeSingle();
    if (error) return NextResponse.json({ error: "RESULT_LOAD_FAILED" }, { status: 500 });
    if (!data?.completed) return NextResponse.json({ error: "GAME_NOT_COMPLETED" }, { status: 409 });
    try { score = cameraScore(data.state); }
    catch { return NextResponse.json({ error: "FINAL_ANSWER_REQUIRED" }, { status: 400 }); }
  }
  try {
    return NextResponse.json({ score: await recordFirstGameScore(user.id, parsed.data, score) });
  } catch { return NextResponse.json({ error: "RESULT_SAVE_FAILED" }, { status: 500 }); }
}
