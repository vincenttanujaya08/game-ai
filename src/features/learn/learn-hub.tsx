"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NusaHeader from "@/app/nusa-header";
import shellStyles from "@/app/landing.module.css";
import { courseList, type CourseId } from "./courses";
import { coursePractices, masteryOf } from "./mastery";
import { initialLearnProgress, loadProgress, type LearnProgress } from "./progress";
import styles from "./learn-hub.module.css";

type ProgressMap = Record<CourseId, LearnProgress>;

const initialMap = Object.fromEntries(
  courseList.map((course) => [course.id, initialLearnProgress]),
) as ProgressMap;

export default function LearnHub({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [progressMap, setProgressMap] = useState<ProgressMap>(initialMap);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void Promise.all(courseList.map(async (course) => [course.id, await loadProgress(course)] as const))
      .then((entries) => { if (!cancelled) setProgressMap(Object.fromEntries(entries) as ProgressMap); })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, []);

  return (
    <main className={shellStyles.shell + " " + styles.learnHub} data-nusa-theme="light">
      <NusaHeader active="belajar" />
      {loadError && <p role="alert">Progres belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p>}

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

      {courseList.map((course) => {
        const total = course.stages.length;
        const completed = progressMap[course.id].completedStages.length;
        const label = completed === 0 ? "Belum dimulai" : completed + "/" + total + " selesai";
        const practice = masteryOf(progressMap[course.id], coursePractices(course));
        const titleId = course.id + "-course-title";
        return (
          <section key={course.id} className={styles.activeCourse} aria-labelledby={titleId}>
            <div className={styles.courseNumber}>
              <span>{course.order}</span>
              <small>Tersedia</small>
            </div>

            <div className={styles.courseBody}>
              <p className={styles.courseLabel}>Materi aktif</p>
              <h2 id={titleId}>{course.title}</h2>
              <p>{course.hubSummary}</p>
              <dl className={styles.courseMeta}>
                <div><dt>{total}</dt><dd>Pelajaran</dd></div>
                <div><dt>{practice.total}</dt><dd>Latihan</dd></div>
                {practice.solved > 0 ? <div><dt>{practice.solved}</dt><dd>Latihan selesai</dd></div> : null}
              </dl>
            </div>

            <div className={styles.courseProgress}>
              <div>
                <span>Progresmu</span>
                <strong>{label}</strong>
              </div>
              <div className={styles.progressTrack} aria-label={completed + " dari " + total + " bagian selesai"}>
                <i style={{ width: (completed / total) * 100 + "%" }} />
                {Array.from({ length: total }, (_, index) => (
                  <span
                    key={index}
                    data-state={index < completed ? "complete" : index === completed ? "active" : "upcoming"}
                  />
                ))}
              </div>
              <Link href={isAuthenticated ? course.path : `/login?next=${encodeURIComponent(course.path)}`} aria-label={"Buka materi " + course.title}>
                {isAuthenticated ? (completed === 0 ? "Mulai belajar" : "Lanjutkan") : "Sign in untuk belajar"}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        );
      })}

      <footer className={shellStyles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Belajar AI dengan pertimbangan.</span>
      </footer>
    </main>
  );
}
