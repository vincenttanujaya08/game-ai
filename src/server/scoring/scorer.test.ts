import { expect, it } from "vitest";
import { citationMini } from "@/server/scenario/citation-mini";
import { scoreSession } from "./scorer";
import { SessionEvent } from "@/shared/contracts/session";

const base = {
  sessionId: "s",
  occurredAt: "x",
  receivedAt: "x",
  actor: "learner" as const,
  schemaVersion: 1 as const,
};
const events = [
  {
    ...base,
    id: "e1",
    clientEventId: "client-1",
    sequence: 1,
    type: "context_item_added",
    payload: { documentId: "doc_unesco" },
  },
  {
    ...base,
    id: "e2",
    clientEventId: "client-2",
    sequence: 2,
    type: "evidence_linked",
    payload: {
      claimId: "claim_multidimensional",
      passageId: "passage_unesco_scope",
    },
  },
  {
    ...base,
    id: "e3",
    clientEventId: "client-3",
    sequence: 3,
    type: "diff_accepted",
    payload: {},
  },
] as SessionEvent[];

it("menghasilkan skor deterministik untuk pilihan konteks akhir", () => {
  const first = scoreSession(citationMini, events);
  expect(JSON.stringify(first)).toBe(
    JSON.stringify(scoreSession(citationMini, events)),
  );
  expect(first.total).toBe(100);
  expect(first).toMatchSnapshot();
});

it("menilai konteks akhir, bukan kesalahan yang sudah diperbaiki", () => {
  const revised = [
    {
      ...events[0],
      id: "e0",
      clientEventId: "client-0",
      payload: { documentId: "doc_participants" },
    },
    {
      ...events[0],
      id: "e0b",
      clientEventId: "client-0b",
      type: "context_item_removed",
      payload: { documentId: "doc_participants" },
    },
    ...events,
  ] as SessionEvent[];
  expect(scoreSession(citationMini, revised).total).toBe(100);
});
