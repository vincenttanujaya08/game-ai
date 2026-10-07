import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { courseList } from "@/features/learn/courses";
import AdminPage from "./page";

const fixture = vi.hoisted(() => ({ tables: {} as Record<string, Record<string, unknown>[]>, users: [] as { id: string; email: string }[] }));
vi.mock("@/lib/supabase/server", () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: { email: "admin@example.com" } } }) } }) }));
vi.mock("@/lib/supabase/admin", () => ({
  isAdminEmail: () => true,
  createAdminClient: () => ({
    auth: { admin: { listUsers: async () => ({ data: { users: fixture.users }, error: null }) } },
    from: (table: string) => {
      const result = { data: fixture.tables[table] ?? [], error: null };
      const query = { ...result, eq: () => query, order: () => query };
      return { select: () => query };
    },
  }),
}));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentProps<"a">) => React.createElement("a", props, children) }));

beforeEach(() => {
  vi.stubGlobal("React", React);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "test-key");
  fixture.users = [{ id: "learner", email: "learner@example.com" }, { id: "trial", email: "trial@example.com" }];
  fixture.tables = {
    event_registrations: fixture.users.map((user) => ({ user_id: user.id, email: user.email, name: user.id, university: "Kampus Contoh", created_at: "2026-10-04T00:00:00Z" })),
    event_submissions: fixture.users.map((user) => ({ user_id: user.id, project_name: user.id + " project", summary: "Aplikasi pencatat kegiatan", ai_tools: "Coding agent", demo_url: "https://example.com", repository_url: "https://github.com/example/project", updated_at: "2026-10-04T00:00:00Z" })),
    event_feedback: fixture.users.map((user) => ({ user_id: user.id, feedback_version: user.id === "trial" ? 3 : 2, teaching_rating: user.id === "trial" ? 1 : 5, practice_rating: 4, material_rating: 1, game_rating: 1, comment: user.id + " feedback", updated_at: "2026-10-04T00:00:00Z" })),
    game_sessions: [{ user_id: "learner", snapshot: { status: "submitted" } }, { user_id: "trial", snapshot: { status: "active" } }],
    game_progress: [{ user_id: "learner", completed: true }],
    course_progress: courseList.slice(0, 2).map((course) => ({ user_id: "learner", course_id: course.id, progress: { completedStages: course.stages.slice(0, -1).map((_, index) => index) } })),
    course_assessments: courseList.slice(0, 2).map((course) => ({ user_id: "learner", course_id: course.id, pre_test_completed_at: "2026-10-04", post_test_completed_at: "2026-10-04" })),
  };
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

async function render() {
  return renderToStaticMarkup(await AdminPage());
}

it("includes all accounts and distinguishes people from course completions", async () => {
  const html = await render();
  expect(html).toContain("Akun terdaftar</span><strong>2</strong>");
  expect(html).toContain("1 orang tuntas minimal satu course");
  expect(html).toContain("2 course selesai");
  expect(html).toContain("dari 2 pendaftar");
  expect(html).toContain("Rata-rata dari 2 jawaban peserta.");
  expect(html).toContain("Memahami materi</dt><dd>3.0");
  expect(html).toContain("trial project");
  expect(html).toContain("trial feedback");
  expect(html).not.toContain("Terapkan filter");
  expect(html).not.toContain("Feedback event versi lama");
});

it("keeps teaching feedback separate from course and game participation", async () => {
  fixture.tables.course_progress = [];
  fixture.tables.course_assessments = [];
  fixture.tables.game_sessions = [];
  fixture.tables.game_progress = [];
  const html = await render();
  expect(html).toContain("0 orang tuntas minimal satu course");
  expect(html).toContain("Rata-rata dari 2 jawaban peserta.");
  expect(html).toContain("0 orang tuntas minimal satu course · 0 course selesai");
  expect(html).not.toContain("tuntas simulasi");
  expect(html).not.toContain("dipetakan");
  expect(html).toContain("Rating event tidak menandai penyelesaian course atau game.");
  expect(html).not.toContain("NaN");
});

it("counts accounts that have not started a course, game, or event", async () => {
  fixture.users.push({ id: "new-account", email: "new@example.com" });
  const html = await render();
  expect(html).toContain("Akun terdaftar</span><strong>3</strong>");
  expect(html).toContain("Peserta course</span><strong>1</strong>");
  expect(html).toContain("Pemain game</span><strong>2</strong>");
  expect(html).toContain("Karya event</span><strong>2</strong>");
});

it("shows course participation independently of the assessment panel", async () => {
  const course = courseList[0];
  fixture.tables.course_progress.push({ user_id: "trial", course_id: course.id, progress: { completedStages: [] } });
  const html = await render();
  expect(html).toContain(`${course.title}</th><td>2</td><td>1</td><td>1</td>`);
  expect(html).toContain("Masih belajar");
  expect(html).toContain("Asesmen AI literacy");
  expect(html).not.toContain("Belum ada rating course");
});

it("orders the event stages and explains feedback awaiting a submission by user identity", async () => {
  fixture.tables.event_submissions[1].user_id = "other-user";
  const html = await render();
  expect(html.indexOf("Mendaftar event")).toBeLessThan(html.indexOf("Mengisi feedback"));
  expect(html.indexOf("Mengisi feedback")).toBeLessThan(html.indexOf("Mengirim karya"));
  expect(html).toContain("1 peserta sudah mengisi feedback, tetapi belum mengirim karya.");
  expect(html).not.toContain("Responden pembelajaran");
});

it("summarizes game scores and both ratings independently of event feedback", async () => {
  fixture.tables.game_results = [
    { user_id: "learner", game_id: "sitasi-bermasalah", score: 80, is_mock: false },
    { user_id: "trial", game_id: "sitasi-bermasalah", score: 40, is_mock: false },
  ];
  fixture.tables.game_ratings = [
    { user_id: "learner", game_id: "sitasi-bermasalah", usefulness_rating: 4, clarity_rating: 3, is_mock: false },
    { user_id: "trial", game_id: "sitasi-bermasalah", usefulness_rating: 5, clarity_rating: 5, is_mock: false },
  ];
  const html = await render();
  expect(html).toContain("Sitasi Bermasalah</th><td>2</td><td>2</td><td>60.0<small>2 skor");
  expect(html).toContain("4.5<small>2 jawaban");
  expect(html).toContain("4.0<small>2 jawaban");
});


it("shows paired literacy scores without simulation labels", async () => {
  const answers = Array(10).fill(0);
  fixture.tables.course_assessments = [
    { user_id: "learner", course_id: "ai-fundamentals", pre_test_completed_at: "2026-10-07", post_test_completed_at: "2026-10-07", pre_test_answers: answers, post_test_answers: answers, pre_test_score: 6, post_test_score: 8, assessment_version: 2, is_mock: false },
    { user_id: "trial", course_id: "ai-fundamentals", pre_test_completed_at: "2026-10-07", post_test_completed_at: "2026-10-07", pre_test_answers: answers, post_test_answers: answers, pre_test_score: 9, post_test_score: 8, assessment_version: 2, is_mock: true },
    { user_id: "incomplete", course_id: "ai-fundamentals", pre_test_completed_at: "2026-10-07", pre_test_answers: answers, pre_test_score: 0, assessment_version: 2, is_mock: false },
    { user_id: "legacy", course_id: "ai-fundamentals", pre_test_completed_at: "2026-10-04", post_test_completed_at: "2026-10-04", pre_test_answers: Array(5).fill(0), post_test_answers: Array(4).fill(0), post_test_score: 3, assessment_version: 1, is_mock: false },
  ];
  const html = await render();
  expect(html).toContain("<td>2</td><td>7.5</td><td>8.0</td><td>+0.5</td>");
  expect(html).toContain("learner</th><td>6/10</td><td>8/10</td><td>+2</td>");
  expect(html).toContain("trial</th><td>9/10</td><td>8/10</td><td>-1</td>");
  expect(html).toContain("incomplete</th><td>0/10</td><td>—</td><td>—</td>");
  expect(html).toContain("legacy</th><td>—</td><td>3/4</td><td>—</td>");
  expect(html).not.toContain("Simulasi");
  expect(html).not.toContain("Data simulasi");
  expect(html).not.toContain("Sumber data");
  expect(html).not.toContain("NaN");
});
