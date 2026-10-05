import { beforeEach, expect, it, vi } from "vitest";
import { recordFirstGameScore } from "./results";
const store = vi.hoisted(() => ({ row: null as { score: number; is_mock: boolean } | null }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: () => ({ from: () => ({
  upsert: async (row: { score: number; is_mock: boolean }, options: { ignoreDuplicates: boolean }) => {
    if (!options.ignoreDuplicates || !store.row) store.row = row;
    return { error: null };
  },
  update: (patch: { score: number; is_mock: boolean }) => {
    const query = { eq: () => query, then: (resolve: (value: { error: null }) => void) => { if (store.row?.is_mock) store.row = patch; resolve({ error: null }); } };
    return query;
  },
  select: () => { const query = { eq: () => query, single: async () => ({ data: store.row, error: null }) }; return query; },
}) }) }));
beforeEach(() => { store.row = null; });
it("keeps the first actual completion when the player repeats a game", async () => {
  expect(await recordFirstGameScore("learner", "sitasi-bermasalah", 40)).toBe(40);
  expect(await recordFirstGameScore("learner", "sitasi-bermasalah", 100)).toBe(40);
});
it("replaces a mock score with the first actual result", async () => {
  store.row = { score: 80, is_mock: true };
  expect(await recordFirstGameScore("learner", "kamera-rusak", 60)).toBe(60);
  expect(store.row?.is_mock).toBe(false);
  expect(await recordFirstGameScore("learner", "kamera-rusak", 100)).toBe(60);
});
