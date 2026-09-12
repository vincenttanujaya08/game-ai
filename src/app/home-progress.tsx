"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import HomeIcon from "./home-icon";
import {
  completedFundamentalsModules,
  fundamentalsModuleCount,
  initialLearnProgress,
  readProgress,
  type LearnProgress,
} from "@/features/learn/progress";
import styles from "./home.module.css";

const subscribe = () => () => {};
let cachedProgress = initialLearnProgress;

function getProgressSnapshot() {
  const next = readProgress();
  const unchanged =
    next.activeStage === cachedProgress.activeStage &&
    next.unlockedStage === cachedProgress.unlockedStage &&
    next.completedStages.join(",") === cachedProgress.completedStages.join(",");
  if (!unchanged) cachedProgress = next;
  return cachedProgress;
}

export default function HomeProgress() {
  const progress = useSyncExternalStore<LearnProgress>(
    subscribe,
    getProgressSnapshot,
    () => initialLearnProgress,
  );

  const completedModules = completedFundamentalsModules(progress);

  return (
    <section className={styles.progressSection} aria-labelledby="journey-title">
      <div className={styles.progressHeading}>
        <h2 id="journey-title" className={styles.sectionTag}>Jejak Belajar</h2>
      </div>

      <div className={styles.progressCards}>
        <article>
          <b aria-hidden="true"><HomeIcon name="book" /></b>
          <h3>Learn</h3>
          <p>{completedModules}/{fundamentalsModuleCount} modul selesai</p>
        </article>
        <article>
          <b aria-hidden="true"><HomeIcon name="game" /></b>
          <h3>Missions</h3>
          <p>Belum dimainkan</p>
        </article>
        <article>
          <b aria-hidden="true"><HomeIcon name="flame" /></b>
          <h3>Streak</h3>
          <p>{progress.completedStages.length ? "Mulai lagi hari ini" : "Mulai perjalananmu"}</p>
        </article>
      </div>
      <div className={styles.journeyAction}><p>Langkah kecil hari ini, untuk masa depan yang lebih cerah.</p><Link className={styles.paperButton} href="/learn">Lihat perjalananmu <HomeIcon name="arrow" /></Link></div>
    </section>
  );
}
