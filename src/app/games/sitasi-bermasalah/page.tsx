import Workspace from "@/features/workspace/workspace";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Periksa Jawaban AI · NUSA Lab",
  description:
    "Game untuk memeriksa isi, sitasi, dan sumber dalam jawaban AI sebelum dipakai untuk tugas kuliah.",
};

export default async function CitationGamePage() {
  if (process.env.NODE_ENV === "production" && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) {
    return <main className="case-state"><h1>Game belum tersedia</h1><p>Login belum dikonfigurasi untuk situs ini.</p></main>;
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/games/sitasi-bermasalah");
  }
  return <Workspace />;
}
