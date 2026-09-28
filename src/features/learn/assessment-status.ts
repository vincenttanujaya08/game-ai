import type { CourseId } from "./courses";

export type AssessmentStatus = { preTestCompleted: boolean; postTestCompleted: boolean; postTestScore: number | null };

export async function loadAssessmentStatus(courseId: CourseId): Promise<AssessmentStatus> {
  const response = await fetch(`/api/assessments/${courseId}`, { cache: "no-store" });
  if (!response.ok) throw new Error("ASSESSMENT_LOAD_FAILED");
  return response.json();
}
