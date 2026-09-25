import Image from "next/image";
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
          <h1 id="home-title">Paham AI. Pakai dengan bijak. Lalu bikin sesuatu.</h1>
          <p>
            NUSA Lab membantu mahasiswa belajar AI dari dasar sampai bisa
            membuat karya yang berguna.
          </p>
          <Link className={styles.primaryAction} href="/learn">
            Mulai belajar
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13M14 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <figure className={styles.heroMedia}>
          <Image
            src="/course-visuals/students-laptop.webp"
            alt="Pelajar berdiskusi sambil menggunakan laptop"
            width={1280}
            height={852}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <figcaption>
            <span>Belajar lewat contoh, latihan, dan proyek yang dekat dengan kehidupan kampus.</span>
            <a href="https://commons.wikimedia.org/wiki/File:Students_using_a_computer_laptop.jpg" target="_blank" rel="noreferrer">Foto: Bright Kwame Ayisi · CC0</a>
          </figcaption>
        </figure>
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
        <span>Literasi AI untuk mahasiswa Indonesia.</span>
      </footer>
    </main>
  );
}
