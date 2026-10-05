import { expect, test } from "vitest";
import { feedbackSchema, registrationSchema, submissionSchema } from "./validation";

const valid = {
  projectName: "Planner Kuliah", summary: "Membantu menyusun tugas kuliah.",
  repositoryUrl: "https://github.com/student/planner",
  demoUrl: "https://video.example.com/demo", aiTools: "Kilo Code untuk implementasi",
};

test("pendaftaran dan submit hanya menerima data peserta serta tautan yang sesuai", () => {
  expect(registrationSchema.safeParse({ name: "Ayu", university: "Universitas Aceh" }).success).toBe(true);
  expect(registrationSchema.safeParse({ name: " ", university: "Universitas Aceh" }).success).toBe(false);
  expect(submissionSchema.safeParse(valid).success).toBe(true);
  expect(submissionSchema.safeParse({ ...valid, demoUrl: "https://planner.example.com" }).success).toBe(true);
  expect(submissionSchema.safeParse({ ...valid, demoUrl: "" }).success).toBe(false);
  expect(submissionSchema.safeParse({ ...valid, repositoryUrl: "" }).success).toBe(false);
  expect(submissionSchema.safeParse({ ...valid, repositoryUrl: "https://notgithub.com/student/planner" }).success).toBe(false);
  expect(submissionSchema.safeParse({ ...valid, repositoryUrl: "https://github.com/" }).success).toBe(false);
});


test("feedback event validates teaching usefulness independently from old material/game ratings", () => {
  expect(feedbackSchema.safeParse({ teachingRating: "5", practiceRating: "4", comment: "Terbantu saat membuat project" }).success).toBe(true);
  expect(feedbackSchema.safeParse({ materialRating: 5, gameRating: 4, comment: "" }).success).toBe(false);
  expect(feedbackSchema.safeParse({ teachingRating: 0, practiceRating: 6, comment: "" }).success).toBe(false);
});
