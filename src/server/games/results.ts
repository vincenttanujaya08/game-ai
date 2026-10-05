import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { GameId } from "./scoring";

export async function recordFirstGameScore(userId: string, gameId: GameId, score: number) {
  const admin = createAdminClient();
  if (!admin) throw new Error("RESULT_STORAGE_UNAVAILABLE");
  const inserted = await admin.from("game_results").upsert({ user_id: userId, game_id: gameId, score, is_mock: false }, { onConflict: "user_id,game_id", ignoreDuplicates: true });
  if (inserted.error) throw new Error("RESULT_SAVE_FAILED");
  // An actual completion replaces a demo result; later real attempts stay unchanged.
  const replaced = await admin.from("game_results").update({ score, is_mock: false, completed_at: new Date().toISOString() }).eq("user_id", userId).eq("game_id", gameId).eq("is_mock", true);
  if (replaced.error) throw new Error("RESULT_SAVE_FAILED");
  const result = await admin.from("game_results").select("score").eq("user_id", userId).eq("game_id", gameId).single();
  if (result.error) throw new Error("RESULT_LOAD_FAILED");
  return result.data.score as number;
}
