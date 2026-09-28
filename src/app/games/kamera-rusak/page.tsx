import BrokenCameraGame from "@/features/broken-camera/game";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Kamera yang Rusak · NUSA Lab",
  description: "Susun kronologi berdasarkan bukti dan periksa kesimpulan AI dengan cermat.",
};

export default async function BrokenCameraPage() {
  if (process.env.NODE_ENV === "production" && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) {
    return <main className="case-state"><h1>Game belum tersedia</h1><p>Login belum dikonfigurasi untuk situs ini.</p></main>;
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/games/kamera-rusak");
  }
  return <BrokenCameraGame />;
}
