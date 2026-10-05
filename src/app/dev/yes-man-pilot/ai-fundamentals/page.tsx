import { notFound } from "next/navigation";
import { AiFundamentalsPilot } from "@/features/learn/ai-fundamentals-pilot";

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <AiFundamentalsPilot />;
}
