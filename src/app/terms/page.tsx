import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import styles from "@/app/legal.module.css";

export const metadata = {
  title: "Ketentuan Penggunaan · NUSA Lab",
  description: "Ketentuan singkat untuk menggunakan website dan materi NUSA Lab.",
};

export default function TermsPage() {
  return <main className={styles.page} data-nusa-theme="light">
    <NusaHeader />
    <article className={styles.content}>
      <p className={styles.eyebrow}>NUSA LAB</p>
      <h1>Ketentuan Penggunaan</h1>
      <p className={styles.updated}>Terakhir diperbarui: 6 Oktober 2026</p>
      <div className={styles.sections}>
        <section><h2>Gunakan dengan baik</h2><p>Gunakan NUSA Lab untuk belajar dan berkarya. Jangan mengganggu layanan, mengakses akun orang lain, atau mengirim konten yang melanggar hak orang lain.</p></section>
        <section><h2>Karya dan informasi</h2><p>Kamu bertanggung jawab atas informasi, jawaban, tautan, dan karya yang kamu kirim. Pastikan kamu berhak membagikan materi tersebut dan tautan project dapat dibuka oleh pihak yang perlu meninjaunya.</p></section>
        <section><h2>Materi pembelajaran</h2><p>Materi dan game NUSA Lab disediakan untuk tujuan pembelajaran. Hasil AI atau informasi dalam materi dapat keliru; periksa kembali sebelum mengandalkannya untuk keputusan penting.</p></section>
      </div>
    </article>
    <footer className={styles.footer}><Link href="/">NUSA Lab</Link><nav aria-label="Halaman kebijakan"><Link href="/privacy">Privasi</Link><Link href="/terms" aria-current="page">Ketentuan</Link></nav></footer>
  </main>;
}
