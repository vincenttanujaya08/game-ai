import { SessionEvent, SessionSnapshot } from "@/shared/contracts/session";
const add = (xs: string[], x: unknown) =>
  typeof x === "string" && !xs.includes(x) ? [...xs, x] : xs;
export function reduceSession(
  previous: SessionSnapshot,
  event: SessionEvent,
): SessionSnapshot {
  if (previous.status === "submitted") throw new Error("SESSION_FROZEN");
  const next = structuredClone(previous);
  next.streamVersion = event.sequence;
  const p = event.payload;
  if (event.type === "workspace_opened") {
    next.briefingComplete = true;
    next.scene = "investigation";
  }
  if (event.type === "document_opened")
    next.openedDocumentIds = add(next.openedDocumentIds, p.documentId);
  if (event.type === "context_item_added") {
    next.contextDocumentIds = add(next.contextDocumentIds, p.documentId);
    next.aiResponseReady = false;
    next.evidenceLinks = [];
    next.claimStates = {};
    next.diffDecision = null;
  }
  if (event.type === "context_item_removed") {
    next.contextDocumentIds = next.contextDocumentIds.filter(
      (id) => id !== p.documentId,
    );
    next.aiResponseReady = false;
    next.evidenceLinks = [];
    next.claimStates = {};
    next.diffDecision = null;
  }
  if (event.type === "context_item_blocked") {
    next.blockedDocumentIds = add(next.blockedDocumentIds, p.documentId);
    next.scene = "pressure";
  }
  if (event.type === "ai_response_received") {
    next.aiResponseReady = true;
    next.scene = "pressure";
  }
  if (event.type === "stakeholder_challenge_viewed") next.challengeSeen = true;
  if (event.type === "evidence_linked")
    next.evidenceLinks = [
      ...next.evidenceLinks.filter((x) => x.claimId !== p.claimId),
      { claimId: String(p.claimId), passageId: String(p.passageId) },
    ];
  if (event.type === "evidence_unlinked")
    next.evidenceLinks = next.evidenceLinks.filter(
      (link) => link.claimId !== p.claimId,
    );
  if (event.type === "claim_state_changed")
    next.claimStates[String(p.claimId)] = String(p.state);
  if (event.type === "diff_accepted") next.diffDecision = "accepted";
  if (event.type === "diff_rejected") next.diffDecision = "rejected";
  if (event.type === "session_submitted") {
    next.status = "submitted";
    next.scene = "resolution";
  }
  return next;
}
