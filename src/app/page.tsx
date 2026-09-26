import Link from "next/link";
import NusaHeader from "./nusa-header";
import styles from "./landing.module.css";

const examples = [
  ["Tugas kuliah", "Riset yang sumber dan klaimnya sudah kamu cek."],
  ["Kegiatan kampus", "Alur kerja yang lebih rapi dan mudah dipakai tim."],
  ["Ide produk", "Prototype yang bisa dicoba, dengan atau tanpa kode."],
] as const;

export const metadata = {
  title: "NUSA Lab · Belajar dan Berkarya dengan AI",
  description: "Belajar memahami AI, memakainya dengan bijak, lalu membuat sesuatu yang berguna.",
};

export default function HomePage() {
  return (
    <main className={styles.shell}>
      <NusaHeader active="beranda" />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>PAHAMI · GUNAKAN · CIPTAKAN</p>
          <h1 id="home-title">Paham AI. Pakai dengan bijak. Lalu bikin sesuatu.</h1>
          <p>
            Ruang belajar AI untuk generasi muda Indonesia. Mulai dari memahami
            dasarnya, bekerja bersama AI, hingga membangun karya sendiri.
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
            <li><span>01</span><div><strong>AI Fundamentals</strong><small>Pahami cara kerja dan batas AI.</small></div></li>
            <li><span>02</span><div><strong>Working with Generative AI</strong><small>Beri arahan, lalu periksa hasilnya.</small></div></li>
            <li><span>03</span><div><strong>Vibe Coding</strong><small>Ubah ide menjadi software.</small></div></li>
          </ol>
        </div>
      </section>

      <section className={styles.impact} aria-labelledby="impact-title">
        <div className={styles.impactIntro}>
          <p>Dari masalah ke hasil</p>
          <h2 id="impact-title">AI baru berguna kalau hasilnya bisa kamu pakai.</h2>
          <span>
            Mulai dari kebutuhan yang nyata, lalu pakai AI untuk membantu
            berpikir, mencoba, dan memperbaiki hasilnya.
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

      <section className={styles.gameFeature} aria-labelledby="game-title">
        <div className={styles.gamePreview} aria-hidden="true">
          <span className={styles.previewLabel}>NUSA Lab · Game</span>
          <div className={styles.previewPath}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.previewSteps}>
            <div><b>01</b><span>Baca buktinya</span></div>
            <div><b>02</b><span>Uji alasannya</span></div>
            <div><b>03</b><span>Ambil keputusan</span></div>
          </div>
          <p>Setiap kasus punya jalannya sendiri.</p>
        </div>
        <div className={styles.gameFeatureCopy}>
          <p>Ruang latihan</p>
          <h2 id="game-title">Pilih kasus yang ingin kamu hadapi.</h2>
          <span>
            Setiap game mengajak kamu membaca situasi, menimbang bukti, dan
            memutuskan langkah yang paling masuk akal.
          </span>
          <Link className={styles.secondaryAction} href="/games">
            Lihat semua game <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Literasi AI untuk generasi muda Indonesia.</span>
      </footer>
    </main>
  );
}
