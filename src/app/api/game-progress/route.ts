import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function account() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return error || !user ? null : { supabase, userId: user.id };
}

function unavailable() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
}

export async function GET() {
  if (unavailable()) return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  const context = await account();
  if (!context) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const { data, error } = await context.supabase.from("game_progress")
    .select("state,completed").eq("user_id", context.userId).eq("game_id", "kamera-rusak").maybeSingle();
  if (error) return NextResponse.json({ error: "LOAD_FAILED" }, { status: 500 });
  return NextResponse.json({ state: data?.state ?? null, completed: data?.completed ?? false });
}

export async function PUT(request: NextRequest) {
  if (unavailable()) return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  const context = await account();
  if (!context) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "INVALID_STATE" }, { status: 400 }); }
  if (!body || typeof body !== "object" || JSON.stringify(body).length > 50000 || !("state" in body) || !("completed" in body)) {
    return NextResponse.json({ error: "INVALID_STATE" }, { status: 400 });
  }
  const { state, completed } = body as { state: unknown; completed: unknown };
  if (!state || typeof state !== "object" || typeof completed !== "boolean") return NextResponse.json({ error: "INVALID_STATE" }, { status: 400 });
  const { error } = await context.supabase.from("game_progress").upsert({
    user_id: context.userId, game_id: "kamera-rusak", state, completed, updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,game_id" });
  if (error) return NextResponse.json({ error: "SAVE_FAILED" }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (unavailable()) return NextResponse.json({ error: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  const context = await account();
  if (!context) return NextResponse.json({ error: "LOGIN_REQUIRED" }, { status: 401 });
  const { error } = await context.supabase.from("game_progress")
    .delete().eq("user_id", context.userId).eq("game_id", "kamera-rusak");
  if (error) return NextResponse.json({ error: "DELETE_FAILED" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
