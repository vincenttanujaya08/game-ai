import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import SubmitPage from "./page";

const fixture = vi.hoisted(() => ({ feedback: null as Record<string, unknown> | null }));
vi.mock("../status", () => ({ isChallengeOpen: () => true }));
vi.mock("../actions", () => ({ saveChallengeFeedback: "/save-feedback", submitChallenge: "/save-project" }));
vi.mock("@/app/nusa-header", () => ({ default: () => null }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentProps<"a">) => React.createElement("a", props, children) }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({
  auth: { getUser: async () => ({ data: { user: { id: "learner" } } }) },
  from: (table: string) => {
    const query = { eq: () => query, maybeSingle: async () => ({ error: null, data: table === "event_registrations" ? { user_id: "learner" } : table === "event_feedback" ? fixture.feedback : { project_name: "Existing project", summary: "Original submission" } }) };
    return { select: () => query };
  },
}) }));

beforeEach(() => {
  vi.stubGlobal("React", React);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "test-key");
  fixture.feedback = null;
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it("asks about classroom teaching instead of rating the app course or game", async () => {
  const html = renderToStaticMarkup(await SubmitPage({ searchParams: Promise.resolve({}) }));
  expect(html).toContain("Seberapa membantu materi di kelas maupun di website NUSA Lab dalam memahami materi?");
  expect(html).toContain("Seberapa membantu materi di kelas maupun di website NUSA Lab saat membuat project ini?");
  expect(html).not.toContain('name="gameRating"');
  expect(html).not.toContain('name="materialRating"');
});

it("lets migrated participants keep their submission and optionally update teaching feedback", async () => {
  fixture.feedback = { feedback_version: 3, teaching_rating: 5, practice_rating: 4, comment: "Terbantu" };
  const html = renderToStaticMarkup(await SubmitPage({ searchParams: Promise.resolve({}) }));
  expect(html).toContain("Existing project");
  expect(html).toContain("Perbarui feedback pembelajaran");
  const editHtml = renderToStaticMarkup(await SubmitPage({ searchParams: Promise.resolve({ feedback: "edit" }) }));
  expect(editHtml).toContain('name="teachingRating"');
  expect(editHtml).toContain('checked=""');
  expect(editHtml).toContain("Terbantu");
});
