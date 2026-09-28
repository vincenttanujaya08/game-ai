import { notFound } from "next/navigation";
import { AssessmentForm } from "@/features/learn/assessment-form";
import { requireAssessmentPage } from "@/features/learn/assessment-access";
import { courses, type CourseId } from "@/features/learn/courses";

export const metadata = { title: "Cek pemahaman · NUSA Lab" };

export default async function CourseAssessmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ course: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  const [{ course: rawCourse }, query] = await Promise.all([params, searchParams]);
  if (!Object.hasOwn(courses, rawCourse)) notFound();
  const courseId = rawCourse as CourseId;
  const kind = query.kind === "post" ? "post" : query.kind === "pre" ? "pre" : null;
  if (!kind) notFound();
  await requireAssessmentPage(courseId, kind);
  return <AssessmentForm courseId={courseId} kind={kind} />;
}
