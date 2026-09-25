import Link from "next/link";
import CameraCover from "../camera-cover";
import GameCover from "../game-cover";
import NusaHeader from "../nusa-header";
import styles from "../landing.module.css";

export const metadata = {
  title: "Game Literasi AI · NUSA Lab",
  description: "Latihan interaktif untuk mengambil keputusan saat memakai AI.",
};

export default function GamesPage() {
  return (
    <main className={styles.shell}>
      <NusaHeader active="game" />

      <section className={styles.gamesIntro} aria-labelledby="games-title">
        <p>Game literasi AI</p>
        <h1 id="games-title">Belajar dari situasi yang harus kamu hadapi sendiri.</h1>
        <span>
          Baca kasusnya, tentukan pilihanmu, lalu lihat alasan di balik hasilnya.
        </span>
      </section>

      <section className={styles.gamesList} aria-label="Daftar game">
        <article className={styles.availableGame}>
          <GameCover />
          <div className={styles.availableGameCopy}>
            <p>Game 01 · Tersedia</p>
            <h2>Sitasi Bermasalah</h2>
            <span>
              Periksa draf buatan AI, cocokkan klaim dengan sumber, lalu susun
              jawaban yang lebih layak dipakai untuk tugas kuliah.
            </span>
            <dl>
              <div><dt>Waktu</dt><dd>10–15 menit</dd></div>
              <div><dt>Fokus</dt><dd>Cek klaim &amp; sumber</dd></div>
            </dl>
            <Link href="/games/sitasi-bermasalah">
              Mulai main <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        <article className={`${styles.availableGame} ${styles.cameraGame}`}>
          <CameraCover />
          <div className={styles.availableGameCopy}>
            <p>Permainan 02 · Tersedia</p>
            <h2>Kamera yang Rusak</h2>
            <span>
              Wawancarai saksi, susun perjalanan kamera, lalu periksa seberapa
              kuat bukti yang mendukung rangkuman AI.
            </span>
            <dl>
              <div><dt>Waktu</dt><dd>10 menit</dd></div>
              <div><dt>Fokus</dt><dd>Jejak bukti &amp; kesimpulan AI</dd></div>
            </dl>
            <Link href="/games/kamera-rusak">
              Mulai menyelidiki <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </section>

      <footer className={styles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Literasi AI untuk mahasiswa Indonesia.</span>
      </footer>
    </main>
  );
}
