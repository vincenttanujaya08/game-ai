"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { courses, type CourseId } from "./courses";
import { coursePractices, lessonPractices, masteryOf } from "./mastery";
import { completedCount, initialLearnProgress, readProgress, saveProgress, type LearnProgress } from "./progress";
import styles from "./learn.module.css";

export default function CourseMap({ course: courseId }: { course: CourseId }) {
  const course = courses[courseId];
  const { stages, hero } = course;
  const router = useRouter();
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(readProgress(course));
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [course]);

  function openStage(index: number) {
    if (!ready || index > progress.unlockedStage) return;
    const next = { ...progress, activeStage: index, sectionIndex: index === progress.activeStage ? progress.sectionIndex : 0 };
    saveProgress(next, course);
    setProgress(next);
    router.push(course.lessonPath);
  }

  const completed = completedCount(progress);
  const percent = Math.round((completed / stages.length) * 100);
  const practice = masteryOf(progress, coursePractices(course));
  const lessonMastery = stages.map((_, index) => masteryOf(progress, lessonPractices(course, index)));

  return (
    <main className={styles.page} data-nusa-theme="light">
      <NusaHeader active="belajar" />
      <div className={styles.wrap}>
        <Link href="/learn" className={styles.back}>← Semua kursus</Link>
        <section className={styles.hero} aria-labelledby="course-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{course.label}</span>
            <h1 id="course-title">{course.title}<span>.</span></h1>
            <p>{course.summary}</p>
            <div className={styles.heroFacts}>
              <span><strong>{String(stages.length).padStart(2, "0")}</strong> pelajaran</span>
              <span><strong>01</strong> cek pemahaman per pelajaran</span>
              <span><strong>∞</strong> bisa dibaca ulang</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} priority />
            <div>
              <span>{hero.caption}</span>
              <a href={hero.creditUrl} target="_blank" rel="noreferrer">{hero.credit}</a>
            </div>
          </div>
        </section>

        <section className={styles.curriculum} aria-labelledby="path-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>RUTE BELAJAR</span>
              <h2 id="path-title">Peta pelajaran</h2>
              <p>{course.mapSummary}</p>
            </div>
            <div className={styles.progress} role="group" aria-label={completed + " dari " + stages.length + " pelajaran selesai"}>
              <strong>{completed}<span> / {stages.length}</span></strong>
              <small>pelajaran selesai</small>
              <div><i style={{ width: percent + "%" }} /></div>
              {ready && practice.solved > 0 ? (
                <small>{practice.solved} dari {practice.total} latihan selesai</small>
              ) : null}
            </div>
          </div>
          <div className={styles.lessonList}>
            {stages.map((stage, index) => {
              const isCompleted = progress.completedStages.includes(index);
              const isUnlocked = ready && index <= progress.unlockedStage;
              const state = isCompleted ? "completed" : isUnlocked ? "current" : "locked";
              return (
                <button key={stage.id} type="button" className={styles.lessonRow} data-state={state} disabled={!isUnlocked} onClick={() => openStage(index)} aria-label={stage.title + ", " + (state === "locked" ? "terkunci" : isCompleted ? "baca lagi" : "siap dibaca")}>
                  <span className={styles.lessonNumber}>{isCompleted ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.lessonCopy}>
                    <small>{stage.area}{lessonMastery[index].solved > 0 ? " · " + lessonMastery[index].solved + "/" + lessonMastery[index].total + " latihan" : ""}</small>
                    <strong>{stage.title}</strong>
                    <span>{stage.intro}</span>
                  </span>
                  <span className={styles.lessonAction}>{isCompleted ? "Baca lagi" : isUnlocked ? "Mulai belajar" : "Terkunci"}<i aria-hidden="true">{isUnlocked ? "↗" : "·"}</i></span>
                </button>
              );
            })}
          </div>
          <p className={styles.footnote}>Pelan-pelan saja. Kamu bisa kembali ke bagian mana pun dalam pelajaran yang sudah terbuka.</p>
        </section>
      </div>
    </main>
  );
}
