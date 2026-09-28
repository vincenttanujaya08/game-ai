import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import { createClient } from "@/lib/supabase/server";
import landing from "@/app/landing.module.css";
import styles from "../event.module.css";
import { registerChallenge } from "../actions";
import { isChallengeOpen } from "../status";

export const metadata = { title: "Daftar Vibe Coding Challenge · NUSA Lab" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const configured = isChallengeOpen && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const supabase = configured ? await createClient() : null;
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const { data: saved } = user ? await supabase!.from("event_registrations").select("name,university")
    .eq("user_id", user.id).eq("event_id", "vibe-coding-challenge").maybeSingle() : { data: null };

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.formPage}>
      <Link className={styles.back} href="/events/vibe-coding-challenge">← Vibe Coding Challenge</Link>
      <h1>Daftar challenge.</h1>
      <p className={styles.formLead}>Daftarkan dirimu dengan akun Google. Setelah itu, kamu bisa mengirim atau memperbarui project dari halaman submit.</p>
      {!isChallengeOpen ? <p className={styles.notice} role="status">Coming Soon. Pendaftaran akan dibuka saat event dimulai.</p>
        : !configured ? <p className={styles.notice} data-error="true">Pendaftaran belum tersedia karena login Google dan database belum dikonfigurasi.</p>
        : !user ? <p className={styles.notice}><Link href="/login?mode=signin&next=%2Fevents%2Fvibe-coding-challenge%2Fregister">Sign in</Link> atau <Link href="/login?mode=signup&next=%2Fevents%2Fvibe-coding-challenge%2Fregister">Sign up</Link> dengan Google untuk melanjutkan.</p>
          : <>
            {(status === "saved" || (saved && status !== "invalid" && status !== "error")) ? <p className={styles.notice} role="status">Pendaftaranmu tersimpan. Kamu bisa memperbarui data di bawah atau <Link href="/events/vibe-coding-challenge/submit">mengirim project →</Link></p> : null}
            {status === "required" ? <p className={styles.notice}>Daftar dulu sebelum mengirim project.</p> : null}
            {status === "invalid" ? <p className={styles.notice} data-error="true" role="alert">Isi nama dan kampusmu, masing-masing minimal dua karakter.</p> : null}
            {status === "error" ? <p className={styles.notice} data-error="true" role="alert">Pendaftaran belum tersimpan. Periksa konfigurasi database, lalu coba lagi.</p> : null}
            <form className={styles.form} action={registerChallenge}>
              <label>Nama peserta<input name="name" required minLength={2} maxLength={100} defaultValue={saved?.name ?? user.user_metadata?.full_name ?? ""} autoComplete="name" /></label>
              <label>Universitas atau kampus<input name="university" required minLength={2} maxLength={150} defaultValue={saved?.university ?? ""} autoComplete="organization" /></label>
              <p className={styles.formAside}>Akun pendaftaran: <strong>{user.email}</strong>. Tanggal mulai dan batas submit akan diumumkan di halaman challenge.</p>
              <button type="submit">{saved ? "Perbarui pendaftaran" : "Daftar challenge"}</button>
            </form>
          </>}
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
