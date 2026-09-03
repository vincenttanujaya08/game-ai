"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import styles from "./home.module.css";

export default function GameCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    track.current?.scrollBy({
      left: direction * track.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.games} id="game" aria-label="Daftar game">
      <div className={styles.carouselBar}>
        <p>Geser untuk melihat game lainnya</p>
        <div className={styles.carouselButtons}>
          <button aria-label="Game sebelumnya" onClick={() => move(-1)}>
            ←
          </button>
          <button aria-label="Game berikutnya" onClick={() => move(1)}>
            →
          </button>
        </div>
      </div>

      <div className={styles.carouselTrack} ref={track} tabIndex={0}>
        <article className={styles.gameSlide}>
          <Link className={styles.featuredGame} href="/games/sitasi-bermasalah">
            <div className={styles.gameArtwork}>
              <Image
                src="/sitasi-bermasalah.png"
                alt="Raka memeriksa beberapa dokumen di depan laptop"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 58vw"
              />
            </div>
            <div className={styles.gameCopy}>
              <span className={styles.gameNumber}>Game 01</span>
              <h2>Sitasi Bermasalah</h2>
              <p>
                Bantu Raka memeriksa sumber, memakai AI dengan hati-hati, dan
                memperbaiki tugas kelompok.
              </p>
              <span className={styles.playButton}>
                Mulai main <b aria-hidden="true">→</b>
              </span>
            </div>
          </Link>
        </article>

        <article className={`${styles.gameSlide} ${styles.futureGame}`}>
          <span className={styles.futureLock} aria-hidden="true">
            🔒
          </span>
          <div>
            <span className={styles.gameNumber}>Game 02</span>
            <h2>Game baru segera hadir!</h2>
            <p>Cerita dan tantangan barunya sedang kami siapkan.</p>
          </div>
          <span className={styles.futureDoodle} aria-hidden="true">
            ★
          </span>
        </article>

        <article className={`${styles.gameSlide} ${styles.futureGame}`}>
          <span className={styles.futureLock} aria-hidden="true">
            🔒
          </span>
          <div>
            <span className={styles.gameNumber}>Game 03</span>
            <h2>Petualangan berikutnya</h2>
            <p>Geser kembali dan mainkan game yang sudah tersedia, ya.</p>
          </div>
          <span className={styles.futureDoodle} aria-hidden="true">
            ☺
          </span>
        </article>
      </div>
    </section>
  );
}
