"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NusaHeader from "@/app/nusa-header";
import shellStyles from "@/app/landing.module.css";
import type { CourseId } from "./courses";
import { initialLearnProgress, loadAllProgress, readHubProgress, type CourseProgressInfo, type LearnProgress } from "./progress";
import styles from "./learn-hub.module.css";

type ProgressMap = Record<CourseId, LearnProgress>;
type HubCourse = CourseProgressInfo & { title: string; order: string; path: string; hubSummary: string };

export default function LearnHub({ courses, userId }: { courses: HubCourse[]; userId: string | null }) {
  const [progressMap, setProgressMap] = useState<ProgressMap>(() => Object.fromEntries(courses.map((course) => [course.id, initialLearnProgress])) as ProgressMap);
  const [known, setKnown] = useState<Partial<Record<CourseId, boolean>>>({});
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = Object.fromEntries(courses.flatMap((course) => {
      const progress = readHubProgress(course, userId);
      return progress ? [[course.id, progress] as const] : [];
    })) as Partial<ProgressMap>;
    const frame = requestAnimationFrame(() => {
    if (Object.keys(cached).length) {
      setProgressMap((current) => ({ ...current, ...cached }));
      setKnown(Object.fromEntries(Object.keys(cached).map((id) => [id, true])) as Partial<Record<CourseId, boolean>>);
    }
    if (!userId) {
      setKnown(Object.fromEntries(courses.map((course) => [course.id, true])));
      return;
    }
    });
    if (!userId) return () => cancelAnimationFrame(frame);
    void loadAllProgress(courses, userId)
      .then((value) => { if (!cancelled) { setProgressMap(value); setKnown(Object.fromEntries(courses.map((course) => [course.id, true]))); } })
      .catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [courses, userId]);

  return (
    <main className={shellStyles.shell + " " + styles.learnHub} data-nusa-theme="light">
      <NusaHeader active="belajar" />
      {loadError && <p role="alert">Progres belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p>}

      <section className={styles.intro} aria-labelledby="learn-hub-title">
        <div>
          <p>Ruang belajar</p>
          <h1 id="learn-hub-title">Belajar AI, dari dasar sampai bikin sesuatu sendiri.</h1>
        </div>
        <p>
          Mulai dari mengenal cara kerja AI, belajar menggunakan Generative AI dengan lebih baik,
          lalu mencoba mengubah ide menjadi aplikasi lewat Vibe Coding.
        </p>
      </section>

      {courses.map((course) => {
        const total = course.stageCount;
        const completed = progressMap[course.id].completedStages.length;
        const percent = Math.round(completed / total * 100);
        const label = completed === total ? "Kelas selesai" : percent + "% penyelesaian";
        const parts = course.id === "ai-fundamentals" ? 3 : 12;
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
                <div><dt>{parts}</dt><dd>{course.id === "ai-fundamentals" ? "Pelajaran" : "Bagian"}</dd></div>
                <div><dt>Interaktif</dt><dd>Simulasi dan latihan</dd></div>
              </dl>
            </div>

            <div className={styles.courseProgress}>
              <div>
                <span>Progresmu</span>
                <strong>{known[course.id] ? label : loadError ? "Gagal memuat" : "Memuat progres…"}</strong>
              </div>
              <div className={styles.progressTrack} data-loading={!known[course.id] || undefined} aria-label={known[course.id] ? percent + "% penyelesaian kursus" : "Memuat progres"}>
                <i style={{ width: (completed / total) * 100 + "%" }} />
                {Array.from({ length: total }, (_, index) => (
                  <span
                    key={index}
                    data-state={index < completed ? "complete" : index === completed ? "active" : "upcoming"}
                  />
                ))}
              </div>
              <Link href={userId ? course.path : `/login?next=${encodeURIComponent(course.path)}`} aria-label={"Buka materi " + course.title}>
                {userId ? known[course.id] ? (completed === total ? "Kelas selesai" : completed === 0 ? "Mulai belajar" : "Lanjutkan") : "Memuat…" : "Sign in untuk belajar"}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        );
      })}

      <footer className={shellStyles.siteFooter}>
        <span><strong>NUSA</strong> Lab</span>
        <span>Belajar AI. Coba sendiri. Bikin sesuatu.</span>
      </footer>
    </main>
  );
}
