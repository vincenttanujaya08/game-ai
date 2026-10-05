import { z } from "zod";
import { bacaRun } from "@/features/broken-camera/persistence";
import { gradeFinal } from "@/features/broken-camera/verdict";
import { candidateIds } from "@/features/broken-camera/summary";

export const gameIdSchema = z.enum(["sitasi-bermasalah", "kamera-rusak"]);
export type GameId = z.infer<typeof gameIdSchema>;
const candidate = z.enum(candidateIds);
const conclusion = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("belumCukup") }),
  z.object({ kind: z.literal("satu"), candidate }),
  z.object({ kind: z.literal("dua"), candidates: z.tuple([candidate, candidate]), condong: candidate }).refine((value) => value.candidates[0] !== value.candidates[1] && value.candidates.includes(value.condong)),
  z.object({ kind: z.literal("tiga"), candidates: z.tuple([candidate, candidate, candidate]) }).refine((value) => new Set(value.candidates).size === 3),
]);
const finalSchema = z.object({ conclusion, citations: z.array(z.string().max(100)).min(1).max(3).refine((value) => new Set(value).size === value.length), keterbatasan: z.string().min(1).max(100) });

export function cameraScore(state: unknown) {
  if (!state || typeof state !== "object" || !("finalSubmission" in state) || !("stage" in state) || state.stage !== "hasil") throw new Error("FINAL_ANSWER_REQUIRED");
  const submission = finalSchema.parse(state.finalSubmission);
  const run = bacaRun({ getItem: () => JSON.stringify(state), setItem() {}, removeItem() {} });
  if (!run || !run.interviewed.length) throw new Error("INVALID_GAME_STATE");
  // Candidates are validated above against the scenario's IDs before grading.
  const verdict = gradeFinal({ submission, interviewed: run.interviewed, followedUp: run.followedUp, openedEvidence: run.openedEvidence, sumberDibaca: run.sumberDibaca });
  return Math.round(verdict.tepat / verdict.total * 100);
}

export const gameFeedbackSchema = z.object({
  usefulnessRating: z.number().int().min(1).max(5),
  clarityRating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500),
});
