"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HomeIcon from "@/app/home-icon";
import { moduleOneStages } from "./module-one-data";
import {
  completedFundamentalsModules,
  fundamentalsModuleCount,
  initialLearnProgress,
  readProgress,
  saveProgress,
  type LearnProgress,
} from "./progress";
import styles from "./learn.module.css";

const futureModules = [
  ["02", "AI Safety", "Bagikan data dengan aman"],
  ["03", "Verify AI", "Periksa klaim dan sumber"],
  ["04", "Responsible AI Use", "Jaga keputusan tetap manusiawi"],
];

export default function CourseMap() {
  const router = useRouter();
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(readProgress());
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function openStage(index: number) {
    if (!ready || index > progress.unlockedStage || (!allStagesCompleted && index !== progress.activeStage)) return;
    const next = { ...progress, activeStage: index };
    saveProgress(next);
    setProgress(next);
    router.push("/learn/ai-fundamentals/module-1");
  }

  const completed = progress.completedStages.length;
  const completedModules = completedFundamentalsModules(progress);
  const percent = Math.round((completedModules / fundamentalsModuleCount) * 100);
  const allStagesCompleted = completed === moduleOneStages.length;

  return (
    <main className={styles.coursePage}>
      <header className={styles.courseHeader}>
        <Link href="/learn" className={styles.backLink}>
          ← Semua course
        </Link>
        <strong>NUSA LAB</strong>
        <span>{ready ? `${percent}% selesai` : "Memuat…"}</span>
      </header>

      <section className={styles.courseIntro}>
        <div>
          <p className={styles.consoleLabel}>LEARNING PATH 01</p>
          <h1>AI Fundamentals</h1>
          <p>
            Belajar memahami dan menggunakan AI melalui perjalanan singkat di
            dunia NUSA Campus.
          </p>
        </div>
        <div
          id="progress"
          className={styles.progressConsole}
          aria-label={`${percent}% selesai`}
        >
          <span>COURSE PROGRESS</span>
          <b>
            {completedModules}/{fundamentalsModuleCount}
          </b>
          <div>
            <i style={{ width: `${percent}%` }} />
          </div>
        </div>
      </section>

      <section className={styles.pathShell} aria-labelledby="module-one-title">
        <div className={styles.modulePlate}>
          <span>MODULE 01</span>
          <h2 id="module-one-title">Understand AI</h2>
          <p>Kenali apa yang sedang kamu gunakan.</p>
        </div>

        <div className={styles.lessonPath}>
          <div className={styles.pathLine} aria-hidden="true" />
          {moduleOneStages.map((stage, index) => {
            const isCompleted = progress.completedStages.includes(index);
            const isUnlocked = ready && index <= progress.unlockedStage;
            const canOpen = isUnlocked && (allStagesCompleted || index === progress.activeStage);
            const state = isCompleted
              ? "completed"
              : isUnlocked
                ? "current"
                : "locked";
            return (
              <button
                key={stage.id}
                type="button"
                className={styles.lessonNode}
                data-state={state}
                disabled={!canOpen}
                onClick={() => openStage(index)}
                aria-label={`${stage.title}, ${state === "locked" ? "terkunci" : canOpen ? "siap dimainkan" : "selesaikan bagian berikutnya terlebih dahulu"}`}
              >
                <span className={styles.nodeOrb} aria-hidden="true">
                  {isCompleted ? "✓" : state === "locked" ? <HomeIcon name="lock" /> : index + 1}
                </span>
                <span className={styles.nodeCopy}>
                  <small>{stage.area}</small>
                  <b>{stage.title}</b>
                  <em>
                    {allStagesCompleted
                      ? "Mainkan lagi"
                      : canOpen
                        ? "Mulai"
                        : isCompleted
                          ? "Selesai"
                          : "Terkunci"}
                  </em>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.futurePath} aria-label="Module berikutnya">
        {futureModules.map(([number, title, description]) => (
          <article key={number} aria-label={`${title}, terkunci`}>
            <span>{number}</span>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <b><HomeIcon name="lock" />TERKUNCI</b>
          </article>
        ))}
      </section>
    </main>
  );
}
