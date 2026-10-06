import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import styles from "@/app/legal.module.css";

export const metadata = {
  title: "Kebijakan Privasi · NUSA Lab",
  description: "Informasi singkat tentang data yang disimpan saat menggunakan NUSA Lab.",
};

export default function PrivacyPage() {
  return <main className={styles.page} data-nusa-theme="light">
    <NusaHeader />
    <article className={styles.content}>
      <p className={styles.eyebrow}>NUSA LAB</p>
      <h1>Kebijakan Privasi</h1>
      <p className={styles.updated}>Terakhir diperbarui: 6 Oktober 2026</p>
      <div className={styles.sections}>
        <section><h2>Data yang disimpan</h2><p>Saat kamu membuat akun, NUSA Lab menyimpan email akunmu. Kami juga menyimpan progres belajar, jawaban asesmen, dan hasil game agar kamu bisa melanjutkan aktivitas. Jika mengikuti event, data yang kamu kirim dapat mencakup nama, institusi, informasi project, tautan, rating, dan komentar.</p></section>
        <section><h2>Penggunaan data</h2><p>Data digunakan untuk menyediakan akun, menyimpan progres, mengelola kegiatan, meninjau karya, dan memperbaiki materi serta pengalaman belajar di NUSA Lab.</p></section>
        <section><h2>Jaga informasi pribadi</h2><p>Jangan masukkan kata sandi, data keuangan, atau informasi pribadi sensitif ke dalam jawaban, komentar, maupun deskripsi project.</p></section>
      </div>
    </article>
    <footer className={styles.footer}><Link href="/">NUSA Lab</Link><nav aria-label="Halaman kebijakan"><Link href="/privacy" aria-current="page">Privasi</Link><Link href="/terms">Ketentuan</Link></nav></footer>
  </main>;
}
