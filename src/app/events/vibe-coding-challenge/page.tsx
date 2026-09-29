import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import styles from "./event.module.css";

export const metadata = {
  title: "Vibe Coding Challenge · NUSA Lab",
  description: "Buat aplikasi sederhana untuk membantu menyelesaikan masalah mahasiswa dalam tujuh hari.",
};

export default function ChallengePage() {
  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.page}>
      <Link className={styles.back} href="/events">← Semua event</Link>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>EVENT NUSA LAB · 7 HARI</p>
        <h1>Vibe Coding Challenge</h1>
        <p className={styles.tagline}>Buat aplikasi sederhana untuk membantu mahasiswa.</p>
        <p className={styles.heroDescription}>Pilih satu masalah mahasiswa, lalu buat solusi yang bisa dicoba. Kamu boleh memakai AI tools atau coding agent pilihanmu.</p>
        <p className={styles.heroDescription}>29 September–6 Oktober 2026 · Pendaftaran dan pengumpulan ditutup pukul 23.59 WIB.</p>
        <div className={styles.actions}>
          <Link className={landing.primaryAction} href="/events/vibe-coding-challenge/register">Daftar challenge <span aria-hidden="true">→</span></Link>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Sudah daftar? Kirim project <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="deliverables-title">
        <div><p className={styles.kicker}>Yang harus dikumpulkan</p><h2 id="deliverables-title">Cukup siapkan tiga hal.</h2></div>
        <div>
          <ol className={styles.deliverables}>
            <li><strong>Project di GitHub</strong><span>Isi README dengan masalah yang diselesaikan dan cara menjalankan aplikasi.</span></li>
            <li><strong>Link demo</strong><span>Kirim link website/aplikasi yang bisa dicoba, atau link video demo kalau aplikasimu belum online.</span></li>
            <li><strong>Catatan AI</strong><span>Sebutkan AI tools yang dipakai dan bagian yang dibantu. Tulis di formulir submit.</span></li>
          </ol>
          <p className={styles.sectionIntro}>Nama project dan ringkasan solusi juga diisi di formulir.</p>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Kirim project <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Belajar AI. Coba sendiri. Bikin sesuatu.</span></footer>
  </main>;
}
