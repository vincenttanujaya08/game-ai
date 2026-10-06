import { requireAuthenticatedUser } from "@/lib/supabase/server";
import { DemoFeedbackForm } from "@/features/demo-feedback/demo-feedback-form";

export const metadata = { title: "Feedback Demo · NUSA Lab" };

export default async function DemoFeedbackPage() {
  await requireAuthenticatedUser("/feedback-demo");
  return <DemoFeedbackForm />;
}
