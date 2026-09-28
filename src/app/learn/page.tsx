import LearnHub from "@/features/learn/learn-hub";
import { getAuthenticatedUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Peta Belajar AI · NUSA Lab",
  description: "Pilih jalur belajar AI dan lanjutkan perjalananmu di NUSA Lab.",
};

export default async function LearnPage() {
  const user = await getAuthenticatedUser();
  return <LearnHub isAuthenticated={Boolean(user)} />;
}
