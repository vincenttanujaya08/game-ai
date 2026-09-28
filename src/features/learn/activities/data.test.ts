import { describe, expect, it } from "vitest";
import { courseList } from "../courses";
import { isArrangeOrdering, type Activity } from "./types";

/** Semua blok latihan yang ditulis di data ketiga kursus. */
const authored = courseList.flatMap((course) =>
  course.presentations.flatMap((set, lessonIndex) =>
    set.flatMap((panel, sectionIndex) =>
      panel.activity
        ? [{ id: course.id + " " + lessonIndex + "-" + sectionIndex + " " + panel.label, activity: panel.activity as Activity }]
        : [],
    ),
  ),
);

describe("data blok latihan", () => {
  it("ada blok latihan yang ditulis", () => {
    expect(authored.length).toBeGreaterThan(0);
  });

  it("paling banyak satu blok per bagian", () => {
    const ids = authored.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const { id, activity } of authored) {
    describe(id, () => {
      it("punya bentuk yang sah untuk jenisnya", () => {
        switch (activity.kind) {
          case "predict": {
            expect(activity.options.length).toBeGreaterThan(1);
            expect(activity.options.filter((option) => option.correct)).toHaveLength(1);
            activity.options.forEach((option) => {
              expect(option.label.trim().length).toBeGreaterThan(0);
              expect(option.feedback.trim().length).toBeGreaterThan(0);
            });
            break;
          }
          case "spot": {
            const targets = activity.spans.filter((span) => span.target);
            expect(activity.requiredHits).toBeGreaterThan(0);
            expect(targets.length).toBe(activity.requiredHits);
            expect(activity.spans.length).toBeGreaterThan(targets.length);
            expect(new Set(activity.spans.map((span) => span.id)).size).toBe(activity.spans.length);
            activity.spans.forEach((span) => expect(span.why.trim().length).toBeGreaterThan(0));
            break;
          }
          case "arrange": {
            const itemIds = activity.items.map((item) => item.id);
            expect(new Set(itemIds).size).toBe(itemIds.length);
            expect(activity.items.length).toBeGreaterThan(1);
            if (isArrangeOrdering(activity)) {
              expect(activity.buckets).toBeUndefined();
              expect([...activity.answer].sort()).toEqual([...itemIds].sort());
            } else {
              const bucketIds = (activity.buckets ?? []).map((bucket) => bucket.id);
              expect(bucketIds.length).toBeGreaterThan(1);
              const answer = activity.answer as Record<string, string>;
              expect(Object.keys(answer).sort()).toEqual([...itemIds].sort());
              Object.values(answer).forEach((bucket) => expect(bucketIds).toContain(bucket));
            }
            break;
          }
          case "estimate": {
            expect(activity.max).toBeGreaterThan(activity.min);
            expect(activity.step).toBeGreaterThan(0);
            expect(activity.tolerance).toBeGreaterThan(0);
            expect(activity.answer).toBeGreaterThanOrEqual(activity.min);
            expect(activity.answer).toBeLessThanOrEqual(activity.max);
            // Toleransi tidak boleh selebar hampir seluruh rentang.
            expect(activity.tolerance * 2).toBeLessThan((activity.max - activity.min) * 0.6);
            break;
          }
        }
      });

      it("punya kalimat penutup yang menjelaskan alasannya", () => {
        expect(activity.reveal.trim().length).toBeGreaterThan(20);
      });
    });
  }
});
