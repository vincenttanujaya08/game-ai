import { describe, expect, it } from "vitest";
import { courseList } from "./courses";

describe("paritas data kursus", () => {
  for (const course of courseList) {
    describe(course.id, () => {
      it("punya jumlah stage, lesson, dan presentation yang sama", () => {
        expect(course.lessons).toHaveLength(course.stages.length);
        expect(course.presentations).toHaveLength(course.stages.length);
      });

      it("punya satu presentation per bagian pelajaran", () => {
        course.lessons.forEach((lesson, index) => {
          expect(course.presentations[index], "pelajaran " + index).toBeDefined();
          expect(course.presentations[index].length, "pelajaran " + index).toBe(lesson.sections.length);
        });
      });

      it("setiap bagian punya minimal satu paragraf", () => {
        course.lessons.forEach((lesson, lessonIndex) => {
          lesson.sections.forEach((section, sectionIndex) => {
            expect(section.paragraphs.length, lessonIndex + "-" + sectionIndex).toBeGreaterThan(0);
            expect(section.paragraphs[0].trim().length, lessonIndex + "-" + sectionIndex).toBeGreaterThan(0);
          });
        });
      });

      it("setiap cek pemahaman punya tepat satu jawaban benar", () => {
        course.lessons.forEach((lesson, index) => {
          const correct = lesson.check.choices.filter((choice) => choice.correct);
          expect(correct.length, "pelajaran " + index + ": " + lesson.check.question).toBe(1);
        });
      });

      it("setiap presentation punya label, title, dan bridge", () => {
        course.presentations.flat().forEach((panel) => {
          expect(panel.label.trim().length).toBeGreaterThan(0);
          expect(panel.title.trim().length).toBeGreaterThan(0);
          expect(panel.bridge.trim().length).toBeGreaterThan(0);
        });
      });

      it("panel interaktif punya items untuk dipilih", () => {
        course.presentations.flat().forEach((panel) => {
          if (!panel.interactive) return;
          expect(panel.items?.length ?? 0, panel.label).toBeGreaterThan(1);
        });
      });

      it("bagian latihan tidak membocorkan jawaban di prosa", () => {
        // Sebelumnya beberapa bagian mencetak "Jawaban: Salah." di paragraf yang
        // sama dengan pertanyaannya. Jawaban sekarang hidup di section.reveal.
        const leaks = /\*\*jawaban|\*\*pilihan\s+[a-d]\*\*|urutan yang benar\s*:/i;
        course.lessons.forEach((lesson, lessonIndex) => {
          lesson.sections.forEach((section, sectionIndex) => {
            section.paragraphs.forEach((paragraph) => {
              expect(leaks.test(paragraph), lessonIndex + "-" + sectionIndex + ": " + section.title).toBe(false);
            });
          });
        });
      });

      it("prosa tidak mencetak angka yang harus ditebak", () => {
        // Menebak jadi sia-sia kalau jawabannya sudah tercetak di paragraf sekitarnya.
        course.presentations.forEach((set, lessonIndex) => {
          set.forEach((panel, sectionIndex) => {
            if (panel.activity?.kind !== "estimate") return;
            const answer = panel.activity.answer;
            const forms = [String(answer), String(answer).replace(".", ",")];
            const prose = course.lessons[lessonIndex].sections[sectionIndex].paragraphs.join(" ");
            forms.forEach((form) => {
              expect(prose.includes(form), lessonIndex + "-" + sectionIndex + " membocorkan " + form).toBe(false);
            });
          });
        });
      });

      it("prosa tidak mencetak pilihan yang benar", () => {
        // Kalau label jawaban benar sudah ada di paragraf, memilih jadi formalitas.
        course.presentations.forEach((set, lessonIndex) => {
          set.forEach((panel, sectionIndex) => {
            if (panel.activity?.kind !== "predict") return;
            const correct = panel.activity.options.find((option) => option.correct);
            if (!correct) return;
            const needle = correct.label.replace(/[“”‘’'"*.]/g, "").trim().toLowerCase();
            if (needle.length < 25) return;
            const prose = course.lessons[lessonIndex].sections[sectionIndex].paragraphs
              .join(" ")
              .replace(/[“”‘’'"*.]/g, "")
              .toLowerCase();
            expect(prose.includes(needle), lessonIndex + "-" + sectionIndex + " membocorkan jawaban").toBe(false);
          });
        });
      });

      it("setiap reveal punya isi", () => {
        course.lessons.flatMap((lesson) => lesson.sections).forEach((section) => {
          if (!section.reveal) return;
          expect(section.reveal.paragraphs.length, section.title).toBeGreaterThan(0);
          section.reveal.paragraphs.forEach((paragraph) => {
            expect(paragraph.trim().length, section.title).toBeGreaterThan(0);
          });
        });
      });

      it("bodyLabels menutupi seluruh paragraf lanjutan", () => {
        course.lessons.forEach((lesson, lessonIndex) => {
          lesson.sections.forEach((section, sectionIndex) => {
            const labels = course.presentations[lessonIndex][sectionIndex].bodyLabels;
            if (!labels) return;
            expect(labels.length, lessonIndex + "-" + sectionIndex).toBe(section.paragraphs.length - 1);
          });
        });
      });
    });
  }
});
