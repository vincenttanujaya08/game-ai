import Link from "next/link";
import NusaHeader from "./nusa-header";
import styles from "./landing.module.css";

const examples = [
  ["Belajar & mencari informasi", "Bantu memahami topik baru, merangkum informasi, dan menemukan hal yang perlu kamu pelajari lebih lanjut."],
  ["Mengerjakan ide & project", "Dari menyusun rencana sampai membuat sesuatu, AI bisa membantu kamu memulai dan mencoba berbagai kemungkinan."],
] as const;

export const metadata = {
  title: "NUSA Lab · Belajar dan Berkarya dengan AI",
  description: "Belajar memahami AI, memakainya dengan bijak, dan mencoba membuat proyek sendiri.",
};

export default function HomePage() {
  return (
    <main className={styles.shell} data-nusa-theme="light">
      <NusaHeader active="beranda" />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>PAHAMI · GUNAKAN · CIPTAKAN</p>
          <h1 id="home-title">Kenalan sama AI. Belajar memakainya. Wujudkan idemu.</h1>
          <p>
            NUSA Lab adalah tempat belajar AI lewat materi, eksperimen, dan praktik langsung.
            Mulai dari memahami cara kerjanya, memakai AI dengan lebih bijak, sampai mencoba
            membuat proyekmu sendiri.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/learn">
              Mulai belajar
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13M14 6l6 6-6 6" />
              </svg>
            </Link>
            <Link className={styles.secondaryAction} href="/games">Coba game <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <div className={styles.heroJourney} aria-label="Alur belajar di NUSA Lab">
          <p>Jalur belajar</p>
          <ol>
            <li><span>01</span><div><strong>AI Fundamentals</strong><small>Kenali cara kerja AI, apa yang bisa dilakukan, dan di mana batasnya.</small></div></li>
            <li><span>02</span><div><strong>Working with Generative AI</strong><small>Belajar memberi instruksi yang jelas dan menilai hasil AI sebelum menggunakannya.</small></div></li>
            <li><span>03</span><div><strong>Vibe Coding</strong><small>Punya ide? Coba ubah jadi aplikasi yang benar-benar bisa dipakai.</small></div></li>
          </ol>
        </div>
      </section>

      <section className={styles.impact} aria-labelledby="impact-title">
        <div className={styles.impactIntro}>
          <p>Buat apa belajar AI?</p>
          <h2 id="impact-title">Bukan cuma tahu cara pakainya.</h2>
          <span>
            AI bisa membantu banyak hal. Yang penting, kamu tetap tahu apa yang ingin dicapai,
            mengecek hasilnya, dan tidak langsung menerima semuanya begitu saja.
          </span>
        </div>

        <div className={styles.exampleList}>
          {examples.map(([context, result], index) => (
            <article key={context}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{context}</p>
              <h3>{result}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Tempat belajar dan mencoba AI untuk anak muda Indonesia.</span>
      </footer>
    </main>
  );
}
