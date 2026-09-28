import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import styles from "./events.module.css";

export const metadata = {
  title: "Event · NUSA Lab",
  description: "Temukan acara NUSA Lab untuk belajar, berkarya, dan mencoba ide baru.",
};

export default function EventsPage() {
  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.page}>
      <section className={styles.intro} aria-labelledby="events-title">
        <p>EVENT NUSA LAB</p>
        <h1 id="events-title">Belajar bareng.<br />Buat sesuatu.</h1>
        <span>Di sini kamu bisa menemukan acara NUSA Lab dan melihat detail kegiatan yang akan datang.</span>
      </section>

      <section className={styles.list} aria-label="Daftar event">
        <article className={styles.event} aria-label="Vibe Coding Challenge">
          <div className={styles.eventCopy}>
            <span className={styles.label}>EVENT NUSA LAB · 7 HARI</span>
            <h2>Vibe Coding Challenge</h2>
            <p>Punya ide? Coba wujudkan dalam 7 hari. Buat aplikasi sederhana untuk membantu menyelesaikan masalah mahasiswa.</p>
            <Link className={styles.eventAction} href="/events/vibe-coding-challenge">Lihat challenge <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.poster} aria-hidden="true">
            <span>VIBE CODING</span>
            <strong>07</strong>
            <span>HARI UNTUK MEMBUAT PROJECT</span>
          </div>
        </article>
      </section>
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
