import { describe, expect, it } from "vitest";
import { courses, courseList } from "./courses";
import { coursePractices, lessonPractices, masteryOf, masteryState } from "./mastery";
import { initialLearnProgress, type LearnProgress } from "./progress";

const fundamentals = courses["ai-fundamentals"];

describe("lessonPractices", () => {
  it("selalu memuat cek pemahaman tiap pelajaran", () => {
    for (const course of courseList) {
      course.stages.forEach((_, stageIndex) => {
        const refs = lessonPractices(course, stageIndex);
        expect(refs.length, course.id + " pelajaran " + stageIndex).toBeGreaterThan(0);
        const last = refs.at(-1);
        expect(last?.key.endsWith("-1")).toBe(true);
      });
    }
  });

  it("memberi kunci unik untuk tiap latihan", () => {
    for (const course of courseList) {
      const keys = coursePractices(course).map((ref) => ref.key);
      expect(new Set(keys).size, course.id).toBe(keys.length);
    }
  });

  it("setiap latihan punya pertanyaan dan alasan", () => {
    for (const course of courseList) {
      coursePractices(course).forEach((ref) => {
        expect(ref.question.trim().length, course.id + " " + ref.key).toBeGreaterThan(0);
        expect(ref.reason.trim().length, course.id + " " + ref.key).toBeGreaterThan(0);
      });
    }
  });

  it("menemukan blok latihan yang ditulis di data", () => {
    const blocks = coursePractices(fundamentals).filter((ref) => ref.key.endsWith("-0"));
    expect(blocks.length).toBeGreaterThan(0);
  });
});

describe("masteryOf", () => {
  const refs = lessonPractices(fundamentals, 0);

  function withAttempts(entries: [string, { tries: number; solved: boolean; firstTryCorrect: boolean }][]): LearnProgress {
    return { ...initialLearnProgress, attempts: Object.fromEntries(entries) };
  }

  it("menghitung nol saat belum ada percobaan", () => {
    const mastery = masteryOf(initialLearnProgress, refs);
    expect(mastery).toEqual({ solved: 0, firstTry: 0, total: refs.length });
    expect(masteryState(mastery)).toBe("belum");
  });

  it("membedakan selesai dari tepat di percobaan pertama", () => {
    const progress = withAttempts([
      [refs[0].key, { tries: 3, solved: true, firstTryCorrect: false }],
      [refs[1].key, { tries: 1, solved: true, firstTryCorrect: true }],
    ]);
    const mastery = masteryOf(progress, refs);
    expect(mastery.solved).toBe(2);
    expect(mastery.firstTry).toBe(1);
    expect(masteryState(mastery)).toBe("sebagian");
  });

  it("menandai selesai hanya saat semua latihan terpecahkan", () => {
    const progress = withAttempts(refs.map((ref) => [ref.key, { tries: 1, solved: true, firstTryCorrect: true }]));
    expect(masteryState(masteryOf(progress, refs))).toBe("selesai");
  });

  it("mengabaikan percobaan yang belum selesai", () => {
    const progress = withAttempts([[refs[0].key, { tries: 4, solved: false, firstTryCorrect: false }]]);
    expect(masteryOf(progress, refs).solved).toBe(0);
  });
});
