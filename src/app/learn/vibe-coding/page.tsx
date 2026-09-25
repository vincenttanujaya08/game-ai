import CourseMap from "@/features/learn/course-map";

export const metadata = {
  title: "Vibe Coding · NUSA Lab",
  description: "Tujuh pelajaran untuk membangun software bersama coding agent, mengujinya, dan meluncurkannya.",
};

export default function VibeCodingPage() {
  return <CourseMap vibe />;
}
