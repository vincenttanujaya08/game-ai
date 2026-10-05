import { NextRequest } from "next/server";
import { beforeEach, expect, it, vi } from "vitest";
import { initialState } from "@/features/broken-camera/state";
import { cameraScore } from "@/server/games/scoring";
import { POST } from "./route";
const fixture = vi.hoisted(() => ({ state: {} as unknown, completed: true, save: vi.fn() }));
vi.mock("@/server/games/results", () => ({ recordFirstGameScore: fixture.save }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({
  auth: { getUser: async () => ({ data: { user: { id: "owner" } } }) },
  from: (table: string) => {
    const data = table === "game_progress" ? { state: fixture.state, completed: fixture.completed } : table === "game_sessions" ? { snapshot: { status: fixture.completed ? "submitted" : "in_progress" }, events: [] } : null;
    const query = { eq: () => query, maybeSingle: async () => ({ data, error: null }) };
    return { select: () => query };
  },
}) }));
beforeEach(() => {
  fixture.completed = true;
  fixture.save.mockReset().mockImplementation(async (_user, _game, score) => score);
  fixture.state = { ...initialState, stage: "hasil", interviewed: ["Arya", "Kevin"], openedEvidence: ["pengembalian"], sumberDibaca: true,
    finalSubmission: { conclusion: { kind: "belumCukup" }, citations: ["bukti:pengembalian"], keterbatasan: "lensaTidakDiperiksa" } };
});
const request = () => new NextRequest("http://localhost/api/game-results/kamera-rusak", { method: "POST", body: JSON.stringify({ score: 999, user_id: "other" }) });
it("derives camera score from saved answers instead of the request's score", async () => {
  const response = await POST(request(), { params: Promise.resolve({ game: "kamera-rusak" }) });
  expect(response.status).toBe(200);
  expect(fixture.save).toHaveBeenCalledWith("owner", "kamera-rusak", cameraScore(fixture.state));
});
it("requires game completion before recording a score", async () => {
  fixture.completed = false;
  const response = await POST(request(), { params: Promise.resolve({ game: "kamera-rusak" }) });
  expect(response.status).toBe(409);
  expect(fixture.save).not.toHaveBeenCalled();
});
it("grades citation game events on the server", async () => {
  const response = await POST(request(), { params: Promise.resolve({ game: "sitasi-bermasalah" }) });
  expect(response.status).toBe(200);
  expect(fixture.save).toHaveBeenCalledWith("owner", "sitasi-bermasalah", 0);
});
