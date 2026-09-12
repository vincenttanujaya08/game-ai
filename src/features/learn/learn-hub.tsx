"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HomeIcon from "@/app/home-icon";
import {
  completedFundamentalsModules,
  fundamentalsModuleCount,
  initialLearnProgress,
  readProgress,
} from "./progress";
import styles from "./learn-hub.module.css";

const courses = [
  {
    number: "01",
    title: "AI Fundamentals",
    description: "Pahami dasar AI, bangun fondasi untuk masa depan.",
    icon: "book",
    theme: "fundamentals",
    href: "/learn/ai-fundamentals",
  },
  {
    number: "02",
    title: "Prompting",
    description: "Ubah ide jadi hasil dengan prompt yang tepat.",
    icon: "prompt",
    theme: "prompting",
    href: null,
  },
  {
    number: "03",
    title: "Vibecoding",
    description: "Bangun solusi nyata dengan AI, lebih cepat, lebih bebas.",
    icon: "code",
    theme: "vibecoding",
    href: null,
  },
] as const;

export default function LearnHub() {
  const [progress, setProgress] = useState(initialLearnProgress);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setProgress(readProgress()));
    return () => cancelAnimationFrame(frame);
  }, []);

  const completed = completedFundamentalsModules(progress);

  return (
    <main className={styles.learnHub}>
      <div className={styles.hubBackdrop} aria-hidden="true" />
      <div className={styles.hubBackdropBottom} aria-hidden="true" />

      <header className={styles.hubHeader}>
        <Link className={styles.hubBrand} href="/" aria-label="NUSA Lab, beranda">
          <HomeIcon name="logo" />
          <span><b>NUSA</b> Lab<small>AI untuk Generasi Hebat</small></span>
        </Link>
        <nav className={styles.hubNav} aria-label="Navigasi Learn">
          <Link href="/"><HomeIcon name="home" />Beranda</Link>
          <Link href="/#missions"><HomeIcon name="flag" />Missions</Link>
        </nav>
      </header>

      <section className={styles.hubHero} aria-labelledby="learn-hub-title">
        <div className={styles.heroCopy}>
          <h1 id="learn-hub-title">Peta Belajar AI</h1>
          <p>Pilih jalur belajarmu, selesaikan setiap misi, dan jadi bagian dari generasi pembangun masa depan bersama AI!</p>
        </div>
      </section>

      <section className={styles.activeMission} aria-labelledby="active-course-title">
        <div className={styles.missionStamp} aria-hidden="true">
          <span>Jalur<strong>01</strong></span>
          <HomeIcon name="compass" />
        </div>
        <div className={styles.missionBody}>
          <p className={styles.missionLabel}>Misi aktif</p>
          <h2 id="active-course-title">AI Fundamentals</h2>
          <div className={styles.missionProgress} aria-label={`${completed} dari ${fundamentalsModuleCount} modul selesai`}>
            <strong>{completed}/{fundamentalsModuleCount} modul selesai</strong>
            <div className={styles.progressTrack} aria-hidden="true">
              <i style={{ width: `${(completed / (fundamentalsModuleCount - 1)) * 100}%` }} />
              {Array.from({ length: fundamentalsModuleCount }, (_, index) => (
                <span
                  key={index}
                  data-state={index < completed ? "complete" : index === completed ? "active" : "upcoming"}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.missionAction}>
          <p>Langkah kecil untuk masa depan besar!</p>
          <Link href="/learn/ai-fundamentals">Lanjutkan <HomeIcon name="arrow" /></Link>
        </div>
      </section>

      <section className={styles.courseSection} aria-labelledby="course-list-title">
        <div className={styles.courseHeading}>
          <h2 id="course-list-title">Pilih jalur belajarmu</h2>
          <p><HomeIcon name="compass" />Setiap jalur, petualangan baru!</p>
          <span aria-hidden="true" />
        </div>
        <ol className={styles.courseRail}>
          {courses.map((course) => {
            const content = <>
              <span className={styles.courseNumber}>{course.number}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span className={styles.courseGlyph} aria-hidden="true"><HomeIcon name={course.icon} /></span>
              <span className={styles.courseStatus}>
                {course.href ? "TERBUKA" : <><HomeIcon name="lock" />Segera hadir</>}
              </span>
              <span className={styles.courseArrow} aria-hidden="true"><HomeIcon name="arrow" /></span>
            </>;

            return (
              <li key={course.title}>
                {course.href ? (
                  <Link className={styles.courseCard} data-theme={course.theme} href={course.href} aria-label={`Buka course ${course.title}`}>
                    {content}
                  </Link>
                ) : (
                  <article className={styles.courseCard} data-theme={course.theme} data-locked="true" aria-label={`${course.title}, segera hadir`}>
                    {content}
                  </article>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <footer className={styles.hubFooter}>
        <span>Peta ini terus bertambah</span>
        <i aria-hidden="true" />
        <span>Karena masa depan selalu punya jalur baru</span>
      </footer>
    </main>
  );
}
