import { expect, test } from "vitest";
import { registrationSchema, submissionSchema } from "./validation";

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
