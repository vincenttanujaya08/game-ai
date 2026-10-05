import { afterEach, expect, it, vi } from "vitest";
import { courses } from "./courses";
import { completeInteractiveCourse, initialLearnProgress } from "./progress";

const course = courses["vibe-coding"];
afterEach(() => vi.unstubAllGlobals());

it.each([false, true])(
  "saves completion before navigation, preserving post-test status %s",
  async (postTestCompleted) => {
    const attempts = {
      "0-0-0": { tries: 2, solved: true, firstTryCorrect: false },
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        progress: { ...initialLearnProgress, attempts },
        preTestCompleted: true,
        postTestCompleted,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const next = await completeInteractiveCourse(course, "learner");
    const saved = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(saved.completedStages).toEqual(
      Array.from(
        { length: course.stages.length - (postTestCompleted ? 0 : 1) },
        (_, index) => index,
      ),
    );
    expect(saved.attempts).toEqual(attempts);
    expect(
      fetchMock.mock.calls.map((call) => call[1]?.method ?? "GET"),
    ).toEqual(["GET", "PUT", "GET"]);
    expect(next).toBe(
      postTestCompleted ? course.path : `${course.path}/assessment?kind=post`,
    );
  },
);

it("blocks navigation and cache refresh when the save fails", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        progress: initialLearnProgress,
        preTestCompleted: true,
        postTestCompleted: false,
      }),
    })
    .mockResolvedValueOnce({ ok: false });
  vi.stubGlobal("fetch", fetchMock);
  await expect(completeInteractiveCourse(course, "learner")).rejects.toThrow(
    "PROGRESS_SAVE_FAILED",
  );
  expect(fetchMock).toHaveBeenCalledTimes(2);
});
