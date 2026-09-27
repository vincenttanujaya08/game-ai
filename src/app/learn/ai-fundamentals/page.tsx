import CourseMap from "@/features/learn/course-map";

export const metadata = {
  title: "AI Fundamentals · NUSA Lab",
  description: "Tiga pelajaran interaktif untuk memahami dasar-dasar AI.",
};

export default function AiFundamentalsPage() {
  return <CourseMap course="ai-fundamentals" />;
}
