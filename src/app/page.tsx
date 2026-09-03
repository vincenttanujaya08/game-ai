import Link from "next/link";
import GameCarousel from "./game-carousel";
import styles from "./home.module.css";

export const metadata = {
  title: "NUSA Lab · Game untuk belajar mengambil keputusan",
  description:
    "Kumpulan game edukatif singkat tentang literasi AI dan pengambilan keputusan.",
};

export default function HomePage() {
  return (
    <main className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="NUSA Lab, beranda">
          <span aria-hidden="true">✦</span>
          NUSA Lab
        </Link>
        <a className={styles.navLink} href="#game">
          Pilih game
        </a>
      </header>

      <div className={styles.decorations} aria-hidden="true">
        <span>★</span>
        <span>☁</span>
        <span>✦</span>
        <span>➤</span>
        <span>〰</span>
      </div>

      <section className={styles.intro}>
        <div>
          <h1>
            Belajar sambil <span>main, yuk!</span>
          </h1>
          <p>
            Pilih cerita, ambil keputusan, lalu lihat apa yang bisa kamu
            pelajari.
          </p>
        </div>
        <span className={styles.doodle} aria-hidden="true">
          ↝
        </span>
      </section>

      <GameCarousel />
    </main>
  );
}
