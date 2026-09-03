import { z } from "zod";
export const EventInputSchema = z
  .object({
    clientEventId: z.string().min(8).max(100),
    type: z.enum([
      "workspace_opened",
      "document_opened",
      "context_item_added",
      "context_item_removed",
      "context_item_blocked",
      "ai_response_received",
      "stakeholder_challenge_viewed",
      "evidence_linked",
      "evidence_unlinked",
      "claim_state_changed",
      "diff_accepted",
      "diff_rejected",
      "session_submitted",
    ]),
    occurredAt: z.string(),
    payload: z.record(z.string(), z.unknown()),
  })
  .strict();
export const AppendEventsSchema = z
  .object({ events: z.array(EventInputSchema).min(1).max(20) })
  .strict();
export type EventInput = z.infer<typeof EventInputSchema>;
export type SessionEvent = EventInput & {
  id: string;
  sessionId: string;
  sequence: number;
  receivedAt: string;
  actor: "learner" | "system";
  schemaVersion: 1;
};
export type SessionSnapshot = {
  status: "in_progress" | "submitted";
  streamVersion: number;
  briefingComplete: boolean;
  openedDocumentIds: string[];
  contextDocumentIds: string[];
  blockedDocumentIds: string[];
  aiResponseReady: boolean;
  challengeSeen: boolean;
  evidenceLinks: { claimId: string; passageId: string }[];
  claimStates: Record<string, string>;
  diffDecision: "accepted" | "rejected" | null;
  scene: "arrival" | "investigation" | "pressure" | "resolution";
};
export const initialSnapshot = (): SessionSnapshot => ({
  status: "in_progress",
  streamVersion: 0,
  briefingComplete: false,
  openedDocumentIds: [],
  contextDocumentIds: [],
  blockedDocumentIds: [],
  aiResponseReady: false,
  challengeSeen: false,
  evidenceLinks: [],
  claimStates: {},
  diffDecision: null,
  scene: "arrival",
});
