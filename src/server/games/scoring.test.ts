import { expect, it } from "vitest";
import { initialState } from "@/features/broken-camera/state";
import { gradeFinal } from "@/features/broken-camera/verdict";
import { cameraScore, gameFeedbackSchema } from "./scoring";

const state = {
  ...initialState, stage: "hasil", interviewed: ["Arya", "Kevin"], openedEvidence: ["pengembalian"], sumberDibaca: true,
  finalSubmission: { conclusion: { kind: "belumCukup" as const }, citations: ["bukti:pengembalian"], keterbatasan: "lensaTidakDiperiksa" },
};
it("computes camera score from decisions, ignoring an injected score", () => {
  const verdict = gradeFinal({ submission: state.finalSubmission, interviewed: state.interviewed, followedUp: [], openedEvidence: state.openedEvidence, sumberDibaca: true });
  expect(cameraScore({ ...state, score: -900 })).toBe(Math.round(verdict.tepat / verdict.total * 100));
});
it("rejects missing final answers, unknown candidates, and impossible interview order", () => {
  expect(() => cameraScore({ ...state, finalSubmission: undefined })).toThrow();
  expect(() => cameraScore({ ...state, finalSubmission: { ...state.finalSubmission, conclusion: { kind: "satu", candidate: "Unknown" } } })).toThrow();
  expect(() => cameraScore({ ...state, interviewed: ["Kevin"] })).toThrow();
});
it("validates both rating scales and optional comment length", () => {
  expect(gameFeedbackSchema.safeParse({ usefulnessRating: 4, clarityRating: 5, comment: "" }).success).toBe(true);
  expect(gameFeedbackSchema.safeParse({ usefulnessRating: 0, clarityRating: 6, comment: "" }).success).toBe(false);
  expect(gameFeedbackSchema.safeParse({ usefulnessRating: 4, clarityRating: 5, comment: "x".repeat(501) }).success).toBe(false);
});
