import "server-only";
import {
  EventInput,
  SessionEvent,
  SessionSnapshot,
  initialSnapshot,
} from "@/shared/contracts/session";
import { reduceSession } from "./reducer";
import { citationMini } from "@/server/scenario/citation-mini";
type Stored = {
  id: string;
  ownerId: string;
  snapshot: SessionSnapshot;
  events: SessionEvent[];
};
const sessions = new Map<string, Stored>();
export const testUserId = "fixture-learner";
export function startOrResume(reset = false) {
  const old = sessions.get("demo");
  if (!reset && old?.snapshot.status === "in_progress") return old;
  const session = {
    id: "demo",
    ownerId: testUserId,
    snapshot: initialSnapshot(),
    events: [],
  };
  sessions.set("demo", session);
  return session;
}
export function getSession(id: string) {
  const s = sessions.get(id);
  if (!s || s.ownerId !== testUserId) throw new Error("NOT_FOUND");
  return s;
}
export function append(id: string, expected: number, inputs: EventInput[]) {
  const s = getSession(id);
  if (s.snapshot.streamVersion !== expected)
    throw new Error("STREAM_VERSION_CONFLICT");
  for (const input of inputs) {
    if (s.events.some((e) => e.clientEventId === input.clientEventId)) continue;
    if (
      input.type === "context_item_added" &&
      !citationMini.documents.some((doc) => doc.id === input.payload.documentId)
    )
      throw new Error("EVENT_NOT_ALLOWED");
    const event: SessionEvent = {
      ...input,
      id: `event_${s.events.length + 1}`,
      sessionId: id,
      sequence: s.events.length + 1,
      receivedAt: new Date().toISOString(),
      actor: "learner",
      schemaVersion: 1,
    };
    s.events.push(event);
    s.snapshot = reduceSession(s.snapshot, event);
  }
  return s;
}
