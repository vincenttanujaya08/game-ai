"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { courses, type CourseId } from "./courses";
import { coursePractices, lessonPractices, masteryOf } from "./mastery";
import { loadAssessmentStatus } from "./assessment-status";
import { completedCount, initialLearnProgress, loadProgress, saveProgress, type LearnProgress } from "./progress";
import styles from "./learn.module.css";

export default function CourseMap({ course: courseId, isAuthenticated }: { course: CourseId; isAuthenticated: boolean }) {
  const course = courses[courseId];
  const { stages, hero } = course;
  const router = useRouter();
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);
  const [preTestCompleted, setPreTestCompleted] = useState(false);
  const [assessmentReady, setAssessmentReady] = useState(!isAuthenticated);
  const [assessmentError, setAssessmentError] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void loadProgress(course).then((value) => {
      if (!cancelled) { setProgress(value); setReady(true); }
    }).catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, [course]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    void loadAssessmentStatus(courseId).then((value) => {
      if (!cancelled) { setPreTestCompleted(value.preTestCompleted); setAssessmentReady(true); }
    }).catch(() => { if (!cancelled) setAssessmentError(true); });
    return () => { cancelled = true; };
  }, [courseId, isAuthenticated]);

  useEffect(() => {
    const onError = () => setSaveError(true);
    const onOk = () => setSaveError(false);
    window.addEventListener("nusa-progress-save-error", onError);
    window.addEventListener("nusa-progress-save-ok", onOk);
    return () => {
      window.removeEventListener("nusa-progress-save-error", onError);
      window.removeEventListener("nusa-progress-save-ok", onOk);
    };
  }, []);

  function openStage(index: number) {
    if (!ready || !assessmentReady || index > progress.unlockedStage) return;
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(course.lessonPath)}`);
      return;
    }
    if (!preTestCompleted) {
      router.push(`${course.path}/assessment?kind=pre`);
      return;
    }
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
        {saveError && <p role="alert">Progres belum tersimpan di akun. <button type="button" onClick={() => saveProgress(progress, course)}>Coba simpan lagi</button></p>}
        {loadError && <p role="alert">Progres belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p>}
        {assessmentError && <p role="alert">Tes awal kelas belum bisa disiapkan. Periksa koneksi dan konfigurasi database, lalu muat ulang halaman.</p>}
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

        {courseId === "vibe-coding" ? (
          <section className={styles.kiloSetup} aria-labelledby="kilo-setup-title">
            <div className={styles.kiloSetupIntro}>
              <span className={styles.eyebrow}>MULAI DARI SINI</span>
              <h2 id="kilo-setup-title">Pasang Kilo Code di VS Code</h2>
              <p>Di kelas ini kamu akan belajar memakai AI coding agent lewat extension Kilo Code. Siapkan alatnya sekarang agar kamu bisa langsung mencoba saat masuk ke latihan.</p>
            </div>
            <ol className={styles.kiloSteps}>
              <li><strong>Buka Extensions di VS Code.</strong> Cari “Kilo Code”, lalu pilih <b>Install Pre-Release Version</b> dari menu di samping tombol Install.</li>
              <li><strong>Masuk ke akunmu.</strong> Buka panel Kilo Code di sidebar, pilih Sign In atau buat akun, lalu selesaikan prosesnya di browser.</li>
              <li><strong>Pilih model dan izin.</strong> Klik roda gigi di panel Kilo, lalu pilih Auto Free jika tersedia. Di Settings → Auto Approve, atur <b>read: Allow</b>, serta <b>edit</b> dan <b>bash: Ask</b>.</li>
              <li><strong>Coba di sebuah project.</strong> Buka folder project di VS Code, lalu minta agent Ask menjelaskan isi folder tanpa mengubah file.</li>
            </ol>
            <p className={styles.kiloSetupNote}>Extension VS Code sudah membawa runtime Kilo; kamu tidak perlu memasang CLI untuk mengikuti kelas ini. Tampilan video bisa berbeda dari versi extension terbaru.</p>
            <div className={styles.kiloResources}>
              <a href="https://kilo.ai/docs/getting-started/installing" target="_blank" rel="noreferrer">Panduan instalasi resmi ↗</a>
              <a href="https://www.youtube.com/watch?v=rqyv8iM6KDA" target="_blank" rel="noreferrer">Video instalasi di VS Code ↗</a>
              <a href="https://youtu.be/4YPE73HE7r8?si=5HHsMuq1WfsHTNpW" target="_blank" rel="noreferrer">Video penggunaan dasar ↗</a>
            </div>
          </section>
        ) : null}

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
              const isUnlocked = ready && assessmentReady && index <= progress.unlockedStage;
              const state = isCompleted ? "completed" : isUnlocked ? "current" : "locked";
              return (
                <button key={stage.id} type="button" className={styles.lessonRow} data-reveal-on-scroll data-state={state} disabled={!isUnlocked} onClick={() => openStage(index)} aria-label={stage.title + ", " + (state === "locked" ? "terkunci" : isCompleted ? "baca lagi" : "siap dibaca")}>
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
          <p className={styles.footnote}>Saat mulai, kamu akan menjawab lima pertanyaan pemetaan awal. Tidak ada nilai minimum; setelah dikirim, materi langsung terbuka.</p>
        </section>
      </div>
    </main>
  );
}
