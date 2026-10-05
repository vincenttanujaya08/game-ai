import { notFound } from "next/navigation";
import { VibeCodingPilot } from "@/features/learn/vibe-coding-pilot";

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <VibeCodingPilot />;
}
