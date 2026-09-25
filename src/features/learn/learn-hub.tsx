"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NusaHeader from "@/app/nusa-header";
import shellStyles from "@/app/landing.module.css";
import {
  completedFundamentalsModules,
  fundamentalsModuleCount,
  initialLearnProgress,
  readProgress,
} from "./progress";
import styles from "./learn-hub.module.css";

const workingLessonCount = 4;
const vibeLessonCount = 7;

export default function LearnHub() {
  const [progress, setProgress] = useState(initialLearnProgress);
  const [workingProgress, setWorkingProgress] = useState(initialLearnProgress);
  const [vibeProgress, setVibeProgress] = useState(initialLearnProgress);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(readProgress());
      setWorkingProgress(readProgress("nusa-learn-working-generative-ai-v1", workingLessonCount));
      setVibeProgress(readProgress("nusa-learn-vibe-coding-v1", vibeLessonCount));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const completedStages = completedFundamentalsModules(progress);
  const progressLabel = completedStages === 0
    ? "Belum dimulai"
    : completedStages + "/" + fundamentalsModuleCount + " selesai";
  const progressAria = completedStages + " dari " + fundamentalsModuleCount + " bagian selesai";
  const completedWorkingStages = workingProgress.completedStages.length;
  const workingProgressLabel = completedWorkingStages === 0
    ? "Belum dimulai"
    : completedWorkingStages + "/" + workingLessonCount + " selesai";
  const workingProgressAria = completedWorkingStages + " dari " + workingLessonCount + " bagian selesai";
  const completedVibeStages = vibeProgress.completedStages.length;
  const vibeProgressLabel = completedVibeStages === 0
    ? "Belum dimulai"
    : completedVibeStages + "/" + vibeLessonCount + " selesai";
  const vibeProgressAria = completedVibeStages + " dari " + vibeLessonCount + " bagian selesai";

  return (
    <main className={shellStyles.shell + " " + styles.learnHub}>
      <NusaHeader active="belajar" />

      <section className={styles.intro} aria-labelledby="learn-hub-title">
        <div>
          <p>Ruang belajar</p>
          <h1 id="learn-hub-title">Tiga jalur untuk memahami dan berkarya dengan AI.</h1>
        </div>
        <p>
          Mulai dari AI Fundamentals, pelajari Working with Generative AI, lalu coba
          membangun ide dengan Vibe Coding.
        </p>
      </section>

      <section className={styles.activeCourse} aria-labelledby="active-course-title">
        <div className={styles.courseNumber}>
          <span>01</span>
          <small>Tersedia</small>
        </div>

        <div className={styles.courseBody}>
          <p className={styles.courseLabel}>Materi aktif</p>
          <h2 id="active-course-title">AI Fundamentals</h2>
          <p>
            Tiga pelajaran tentang kemampuan AI hari ini, cara kerjanya, dan cara
            tetap berpikir jernih saat memakainya.
          </p>
          <dl className={styles.courseMeta}>
            <div><dt>3</dt><dd>Pelajaran</dd></div>
            <div><dt>3</dt><dd>Cek pemahaman</dd></div>
          </dl>
        </div>

        <div className={styles.courseProgress}>
          <div>
            <span>Progresmu</span>
            <strong>{progressLabel}</strong>
          </div>
          <div className={styles.progressTrack} aria-label={progressAria}>
            <i style={{ width: (completedStages / fundamentalsModuleCount) * 100 + "%" }} />
            {Array.from({ length: fundamentalsModuleCount }, (_, index) => (
              <span
                key={index}
                data-state={index < completedStages ? "complete" : index === completedStages ? "active" : "upcoming"}
              />
            ))}
          </div>
          <Link href="/learn/ai-fundamentals" aria-label="Buka materi AI Fundamentals">
            {completedStages === 0 ? "Mulai belajar" : "Lanjutkan"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.activeCourse} aria-labelledby="working-course-title">
        <div className={styles.courseNumber}>
          <span>02</span>
          <small>Tersedia</small>
        </div>

        <div className={styles.courseBody}>
          <p className={styles.courseLabel}>Materi aktif</p>
          <h2 id="working-course-title">Working with Generative AI</h2>
          <p>
            Empat pelajaran untuk memberi AI arahan yang jelas, menguji jawabannya,
            memperbaiki hasil, dan menyusun alur kerja.
          </p>
          <dl className={styles.courseMeta}>
            <div><dt>4</dt><dd>Pelajaran</dd></div>
            <div><dt>4</dt><dd>Cek pemahaman</dd></div>
          </dl>
        </div>

        <div className={styles.courseProgress}>
          <div>
            <span>Progresmu</span>
            <strong>{workingProgressLabel}</strong>
          </div>
          <div className={styles.progressTrack} aria-label={workingProgressAria}>
            <i style={{ width: (completedWorkingStages / workingLessonCount) * 100 + "%" }} />
            {Array.from({ length: workingLessonCount }, (_, index) => (
              <span
                key={index}
                data-state={index < completedWorkingStages ? "complete" : index === completedWorkingStages ? "active" : "upcoming"}
              />
            ))}
          </div>
          <Link href="/learn/working-with-generative-ai" aria-label="Buka materi Working with Generative AI">
            {completedWorkingStages === 0 ? "Mulai belajar" : "Lanjutkan"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.activeCourse} aria-labelledby="vibe-course-title">
        <div className={styles.courseNumber}>
          <span>03</span>
          <small>Tersedia</small>
        </div>

        <div className={styles.courseBody}>
          <p className={styles.courseLabel}>Materi aktif</p>
          <h2 id="vibe-course-title">Vibe Coding</h2>
          <p>
            Tujuh pelajaran untuk mengubah ide menjadi software: pahami coding agent,
            bangun project, uji hasilnya, lalu bagikan ke internet.
          </p>
          <dl className={styles.courseMeta}>
            <div><dt>7</dt><dd>Pelajaran</dd></div>
            <div><dt>7</dt><dd>Cek pemahaman</dd></div>
          </dl>
        </div>

        <div className={styles.courseProgress}>
          <div>
            <span>Progresmu</span>
            <strong>{vibeProgressLabel}</strong>
          </div>
          <div className={styles.progressTrack} aria-label={vibeProgressAria}>
            <i style={{ width: (completedVibeStages / vibeLessonCount) * 100 + "%" }} />
            {Array.from({ length: vibeLessonCount }, (_, index) => (
              <span
                key={index}
                data-state={index < completedVibeStages ? "complete" : index === completedVibeStages ? "active" : "upcoming"}
              />
            ))}
          </div>
          <Link href="/learn/vibe-coding" aria-label="Buka materi Vibe Coding">
            {completedVibeStages === 0 ? "Mulai belajar" : "Lanjutkan"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className={shellStyles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Belajar AI dengan pertimbangan.</span>
      </footer>
    </main>
  );
}
