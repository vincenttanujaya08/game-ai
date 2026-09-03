import { describe, it, expect } from "vitest";
import { initialSnapshot, SessionEvent } from "@/shared/contracts/session";
import { reduceSession } from "./reducer";
const e = (
  type: SessionEvent["type"],
  payload: Record<string, string>,
  sequence = 1,
): SessionEvent => ({
  id: `e${sequence}`,
  clientEventId: `client-${sequence}`,
  sessionId: "s",
  sequence,
  type,
  payload,
  occurredAt: "2026-01-01T00:00:00Z",
  receivedAt: "2026-01-01T00:00:00Z",
  actor: "learner",
  schemaVersion: 1,
});
describe("reducer", () => {
  it("replays semantic state", () => {
    let s = reduceSession(
      initialSnapshot(),
      e("evidence_linked", { claimId: "c", passageId: "p" }),
    );
    s = reduceSession(s, e("diff_accepted", {}, 2));
    expect(s.evidenceLinks).toEqual([{ claimId: "c", passageId: "p" }]);
    expect(s.diffDecision).toBe("accepted");
  });
  it("freezes submitted sessions", () => {
    const s = reduceSession(initialSnapshot(), e("session_submitted", {}));
    expect(() =>
      reduceSession(s, e("document_opened", { documentId: "d" }, 2)),
    ).toThrow("SESSION_FROZEN");
  });
  it("requires a fresh AIRA response when context changes", () => {
    let s = reduceSession(
      initialSnapshot(),
      e("context_item_added", { documentId: "doc_unesco" }),
    );
    s = reduceSession(s, e("ai_response_received", {}, 2));
    s = reduceSession(
      s,
      e(
        "evidence_linked",
        {
          claimId: "claim_multidimensional",
          passageId: "passage_unesco_scope",
        },
        3,
      ),
    );
    s = reduceSession(
      s,
      e("context_item_added", { documentId: "doc_grade_impact" }, 4),
    );
    expect(s.aiResponseReady).toBe(false);
    expect(s.evidenceLinks).toEqual([]);
  });
});
