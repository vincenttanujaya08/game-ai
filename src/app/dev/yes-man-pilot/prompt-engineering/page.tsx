import { notFound } from "next/navigation";
import { YesManPilotPreview } from "@/features/learn/yes-man-pilot-preview";

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <YesManPilotPreview />;
}
