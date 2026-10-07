import { beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { assessments } from "@/features/learn/assessments";

const fixture = vi.hoisted(() => ({
  preCompleted: false,
  postCompleted: false,
  lessonsCompleted: true,
  rpc: vi.fn(),
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    auth: { getUser: async () => ({ data: { user: { id: "learner" } }, error: null }) },
    from: (table: string) => {
      const query = {
        select: () => query,
        eq: () => query,
        maybeSingle: async () => ({
          error: null,
          data: table === "course_progress"
            ? { progress: { completedStages: fixture.lessonsCompleted ? [0, 1] : [], unlockedStage: 2, activeStage: 2, sectionIndex: 0, attempts: {} } }
            : { pre_test_completed_at: fixture.preCompleted ? "2026-10-07" : null, post_test_completed_at: fixture.postCompleted ? "2026-10-07" : null, post_test_score: 8 },
        }),
      };
      return query;
    },
    rpc: fixture.rpc,
  }),
}));
import { GET, POST } from "./route";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.test");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "test-key");
  fixture.preCompleted = false;
  fixture.postCompleted = false;
  fixture.lessonsCompleted = true;
  fixture.rpc.mockReset().mockResolvedValue({ data: { score: 10, total: 10 }, error: null });
});
const context = { params: Promise.resolve({ course: "ai-fundamentals" }) };
const request = (body: unknown) => new NextRequest("https://example.test/api/assessments/ai-fundamentals", { method: "POST", body: JSON.stringify(body) });
const answers = assessments["ai-fundamentals"].pre.map((question) => question.answer);

it("uses the same ten questions and choices for both assessments", () => {
  const assessment = assessments["ai-fundamentals"];
  expect(assessment.pre).toHaveLength(10);
  expect(assessment.post).toEqual(assessment.pre);
  expect(assessment.pre.every((question) => question.choices.length === 4)).toBe(true);
  expect(assessment.reflection).toBe("");
});

it("sends all ten pre-test answers, including option D, to database scoring", async () => {
  const response = await POST(request({ kind: "pre", answers, score: 999 }), context);
  expect(response.status).toBe(200);
  expect(fixture.rpc).toHaveBeenCalledWith("submit_course_assessment", { p_course_id: "ai-fundamentals", p_kind: "pre", p_answers: answers, p_reflection: null });
  expect(await response.json()).toEqual({ preTestCompleted: true });
});

it("saves post-test without reflection and does not return a participant score", async () => {
  fixture.preCompleted = true;
  const response = await POST(request({ kind: "post", answers }), context);
  expect(response.status).toBe(200);
  expect(fixture.rpc).toHaveBeenCalledWith("submit_course_assessment", { p_course_id: "ai-fundamentals", p_kind: "post", p_answers: answers, p_reflection: null });
  expect(await response.json()).toEqual({ postTestCompleted: true });
});

it.each([{ invalid: answers.slice(0, 5) }, { invalid: [...answers.slice(0, 9), 4] }, { invalid: [...answers.slice(0, 9), null] }])("rejects incomplete or invalid answers: $invalid", async ({ invalid }) => {
  const response = await POST(request({ kind: "pre", answers: invalid }), context);
  expect(response.status).toBe(400);
  expect(fixture.rpc).not.toHaveBeenCalled();
});

it("keeps the pre-test and lesson completion gates", async () => {
  expect((await POST(request({ kind: "post", answers }), context)).status).toBe(403);
  fixture.preCompleted = true;
  fixture.lessonsCompleted = false;
  expect((await POST(request({ kind: "post", answers }), context)).status).toBe(403);
  expect(fixture.rpc).not.toHaveBeenCalled();
});

it("does not report success when database storage fails", async () => {
  fixture.rpc.mockResolvedValue({ data: null, error: { message: "storage failed" } });
  const response = await POST(request({ kind: "pre", answers }), context);
  expect(response.status).toBe(500);
  expect(await response.json()).toEqual({ error: "ASSESSMENT_SAVE_FAILED" });
});

it("returns completion status without saved scores", async () => {
  fixture.preCompleted = true;
  fixture.postCompleted = true;
  const response = await GET(new NextRequest("https://example.test/api/assessments/ai-fundamentals"), context);
  expect(await response.json()).toEqual({ preTestCompleted: true, postTestCompleted: true });
});
