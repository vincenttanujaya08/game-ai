import { expect, it } from "vitest";
import { citationMini } from "@/server/scenario/citation-mini";
import { scoreSession } from "./scorer";
import type { SessionEvent } from "@/shared/contracts/session";

const base = {
  sessionId: "s",
  occurredAt: "x",
  receivedAt: "x",
  actor: "learner" as const,
  schemaVersion: 1 as const,
};

function event(
  sequence: number,
  type: SessionEvent["type"],
  payload: Record<string, string>,
) {
  return {
    ...base,
    id: `e${sequence}`,
    clientEventId: `client-${sequence}`,
    sequence,
    type,
    payload,
  } as SessionEvent;
}

it("menilai audit klaim dan pilihan bukti secara deterministik", () => {
  const events = [
    event(1, "claim_state_changed", {
      claimId: "claim_prompt_only",
      state: "tidak_pakai",
    }),
    event(2, "claim_state_changed", {
      claimId: "claim_unesco_scope",
      state: "pakai",
    }),
    event(3, "claim_state_changed", {
      claimId: "claim_vendor_overreach",
      state: "tidak_pakai",
    }),
    event(4, "claim_state_changed", {
      claimId: "claim_grade_impact",
      state: "tidak_pakai",
    }),
    event(5, "claim_state_changed", {
      claimId: "claim_campus_policy",
      state: "pakai",
    }),
  ];
  const report = scoreSession(citationMini, events);
  expect(report).toEqual(scoreSession(citationMini, events));
  expect(report.total).toBe(100);
  expect(report.findings).toHaveLength(5);
});

it("memberi kredit parsial saat satu audit dan satu bukti keliru", () => {
  const report = scoreSession(citationMini, [
    event(1, "claim_state_changed", {
      claimId: "claim_prompt_only",
      state: "pakai",
    }),
    event(2, "claim_state_changed", {
      claimId: "claim_unesco_scope",
      state: "pakai",
    }),
    event(3, "claim_state_changed", {
      claimId: "claim_vendor_overreach",
      state: "tidak_pakai",
    }),
    event(4, "claim_state_changed", {
      claimId: "claim_grade_impact",
      state: "tidak_pakai",
    }),
    event(5, "claim_state_changed", {
      claimId: "claim_campus_policy",
      state: "pakai",
    }),
  ]);
  expect(report.total).toBe(80);
});

it("menilai keputusan klaim terakhir, bukan klik sebelumnya", () => {
  const report = scoreSession(citationMini, [
    event(1, "claim_state_changed", {
      claimId: "claim_vendor_overreach",
      state: "pakai",
    }),
    event(2, "claim_state_changed", {
      claimId: "claim_vendor_overreach",
      state: "tidak_pakai",
    }),
  ]);
  expect(
    report.findings.find(
      (finding) => finding.ruleId === "rule_audit_vendor_overreach",
    )?.earned,
  ).toBe(20);
});
