import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import { createClient } from "@/lib/supabase/server";
import landing from "@/app/landing.module.css";
import styles from "../event.module.css";
import { saveChallengeFeedback, submitChallenge } from "../actions";
import { isChallengeOpen } from "../status";

export const metadata = { title: "Kirim Project Vibe Coding Challenge · NUSA Lab" };

export default async function SubmitPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const open = isChallengeOpen();
  const configured = open && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const supabase = configured ? await createClient() : null;
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const { data: registered } = user ? await supabase!.from("event_registrations").select("user_id")
    .eq("user_id", user.id).eq("event_id", "vibe-coding-challenge").maybeSingle() : { data: null };
  const { data: feedback, error: feedbackError } = registered ? await supabase!.from("event_feedback")
    .select("material_rating,game_rating,comment").eq("user_id", user!.id).eq("event_id", "vibe-coding-challenge").maybeSingle() : { data: null, error: null };
  const { data: saved } = registered && feedback ? await supabase!.from("event_submissions")
    .select("project_name,summary,repository_url,demo_url,ai_tools")
    .eq("user_id", user!.id).eq("event_id", "vibe-coding-challenge").maybeSingle() : { data: null };

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.formPage}>
      <Link className={styles.back} href="/events/vibe-coding-challenge">← Vibe Coding Challenge</Link>
      <h1>Kirim projectmu.</h1>
      <p className={styles.formLead}>Bagikan repository dan rekaman video projectmu. Jelaskan kebutuhan, proses, dan keputusan teknis di README GitHub. Kamu bisa memperbarui kirimanmu dari akun yang sama.</p>
      {!open ? <p className={styles.notice} role="status">Pengumpulan ditutup. Periode challenge 29 September–6 Oktober 2026, sampai pukul 23.59 WIB.</p>
        : !configured ? <p className={styles.notice} data-error="true">Submit belum tersedia karena login Google dan database belum dikonfigurasi.</p>
        : !user ? <p className={styles.notice}><Link href="/login?mode=signin&next=%2Fevents%2Fvibe-coding-challenge%2Fsubmit">Sign in</Link> atau <Link href="/login?mode=signup&next=%2Fevents%2Fvibe-coding-challenge%2Fsubmit">Sign up</Link> dengan Google untuk melanjutkan.</p>
          : !registered ? <p className={styles.notice}>Kamu perlu mendaftar lebih dulu. <Link href="/events/vibe-coding-challenge/register">Buka pendaftaran →</Link></p>
            : <>
              {status === "invalid" ? <p className={styles.notice} data-error="true" role="alert">Lengkapi semua kolom wajib. Tautan yang diisi harus memakai HTTPS dan repository harus berada di GitHub.</p> : null}
              {status === "error" ? <p className={styles.notice} data-error="true" role="alert">Project belum tersimpan. Periksa konfigurasi database, lalu coba lagi.</p> : null}
              {feedbackError ? <p className={styles.notice} data-error="true" role="alert">Rating belum bisa dimuat. Coba muat ulang halaman.</p> : !feedback ? <>
                <p className={styles.formAside}>Sebelum mengirim karya, bantu kami memperbaiki NUSA Lab dengan memberi rating materi dan game yang sudah kamu coba.</p>
                {status === "feedback-invalid" ? <p className={styles.notice} data-error="true" role="alert">Pilih rating untuk materi dan game.</p> : null}
                {status === "feedback-error" ? <p className={styles.notice} data-error="true" role="alert">Rating belum tersimpan. Coba lagi.</p> : null}
                <form className={styles.form} action={saveChallengeFeedback}>
                  {([ ["materialRating", "Materi kelas"], ["gameRating", "Game NUSA Lab"] ] as const).map(([name, label]) => <fieldset className={styles.rating} key={name}>
                    <legend>{label}</legend>
                    <div>{[1, 2, 3, 4, 5].map((rating) => <label key={rating}><input type="radio" name={name} value={rating} required /><span>{rating}</span></label>)}</div>
                    <small>1 = perlu banyak perbaikan · 5 = sangat membantu</small>
                  </fieldset>)}
                  <label>Komentar (opsional)<textarea name="comment" maxLength={500} placeholder="Apa yang paling membantu atau perlu diperbaiki?" /></label>
                  <button type="submit">Simpan rating dan lanjutkan →</button>
                </form>
              </> : <>
              {status === "feedback-saved" ? <p className={styles.notice} role="status">Terima kasih! Rating tersimpan. Sekarang kamu bisa mengirim karya.</p> : null}
              {status === "feedback-required" ? <p className={styles.notice} role="status">Beri rating materi dan game terlebih dahulu sebelum mengirim karya.</p> : null}
              {(status === "saved" || (saved && status !== "invalid" && status !== "error")) ? <p className={styles.notice} role="status">Projectmu tersimpan. Kamu dapat memperbarui tautan atau penjelasannya di bawah.</p> : null}
              <form className={styles.form} action={submitChallenge}>
                <label>Nama project<input name="projectName" required minLength={2} maxLength={120} defaultValue={saved?.project_name ?? ""} /></label>
                <label>Masalah yang diselesaikan dan cara aplikasi membantunya<textarea name="summary" required minLength={2} maxLength={600} defaultValue={saved?.summary ?? ""} /></label>
                <label>Repository GitHub<small>Di README, jelaskan kebutuhan, cara menjalankan aplikasi, proses AI, dan keputusan teknismu.</small><input name="repositoryUrl" type="url" required pattern="https://.*" placeholder="https://github.com/..." defaultValue={saved?.repository_url ?? ""} /></label>
                <label>Link demo project<small>Isi link website/aplikasi yang bisa dicoba. Kalau belum online, isi link video demo yang bisa dibuka penilai.</small><input name="demoUrl" type="url" required pattern="https://.*" placeholder="https://..." defaultValue={saved?.demo_url ?? ""} /></label>
                <label>AI tool atau coding agent yang digunakan<small>Jika memakai skill tambahan, sebutkan juga apa yang dibantunya.</small><textarea name="aiTools" required minLength={2} maxLength={500} placeholder="Nama alat dan bagian project yang dibantu" defaultValue={saved?.ai_tools ?? ""} /></label>
                <p className={styles.formAside}>Dengan mengirim project, kamu menyatakan karya ini milikmu dan siap menjelaskan keputusan penting dalam implementasinya. Kiriman dan perubahan ditutup 6 Oktober 2026 pukul 23.59 WIB.</p>
                <button type="submit">{saved ? "Perbarui kiriman" : "Kirim project"}</button>
              </form>
              </>}
            </>}
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
