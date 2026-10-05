import { NextRequest } from "next/server";
import { beforeEach, expect, it, vi } from "vitest";
import { POST } from "./route";
const fixture = vi.hoisted(() => ({ user: { id: "owner" } as { id: string } | null, completed: false, save: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({
  auth: { getUser: async () => ({ data: { user: fixture.user } }) },
  from: () => ({
    select: () => { const query = { eq: () => query, maybeSingle: async () => ({ data: fixture.completed ? { score: 80 } : null, error: null }) }; return query; },
    upsert: fixture.save,
  }),
}) }));
beforeEach(() => { fixture.user = { id: "owner" }; fixture.completed = false; fixture.save.mockReset().mockResolvedValue({ error: null }); });
const params = { params: Promise.resolve({ game: "kamera-rusak" }) };
const request = (input: unknown) => new NextRequest("http://localhost/api/game-feedback/kamera-rusak", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
const rating = { usefulnessRating: 4, clarityRating: 5, comment: "Membantu" };
it("requires login and a completed result before accepting a rating", async () => {
  fixture.user = null;
  expect((await POST(request(rating), params)).status).toBe(401);
  fixture.user = { id: "owner" };
  expect((await POST(request(rating), params)).status).toBe(409);
  expect(fixture.save).not.toHaveBeenCalled();
});
it("writes ratings under the authenticated owner and replaces mock feedback", async () => {
  fixture.completed = true;
  expect((await POST(request({ ...rating, user_id: "other-person" }), params)).status).toBe(200);
  expect(fixture.save).toHaveBeenCalledWith(expect.objectContaining({ user_id: "owner", game_id: "kamera-rusak", usefulness_rating: 4, clarity_rating: 5, is_mock: false }), expect.anything());
});
it("rejects ratings outside the scale", async () => {
  fixture.completed = true;
  expect((await POST(request({ ...rating, clarityRating: 10 }), params)).status).toBe(400);
  expect(fixture.save).not.toHaveBeenCalled();
});
