"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { courses, type CourseId } from "./courses";
import { completedCount, initialLearnProgress, loadCourseState, readCachedCourseState, readProgress, type LearnProgress } from "./progress";
import styles from "./learn.module.css";

export default function CourseMap({ course: courseId, userId }: { course: CourseId; userId: string | null }) {
  const course = courses[courseId];
  const { stages, hero } = course;
  const router = useRouter();
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);
  const [preTestCompleted, setPreTestCompleted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (!userId) {
        setProgress(readProgress(course));
        setReady(true);
        return;
      }
      const cached = readCachedCourseState(course, userId);
      if (cached) {
        setProgress(cached.progress);
        setPreTestCompleted(cached.preTestCompleted);
        setReady(true);
      }
    });
    if (!userId) return () => cancelAnimationFrame(frame);
    void loadCourseState(course, userId).then((value) => {
      if (!cancelled) { setProgress(value.progress); setPreTestCompleted(value.preTestCompleted); setReady(true); }
    }).catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [course, userId]);

  function openCourse() {
    if (!ready) return;
    if (!userId) {
      router.push(`/login?next=${encodeURIComponent(course.lessonPath)}`);
      return;
    }
    if (!preTestCompleted) {
      router.push(`${course.path}/assessment?kind=pre`);
      return;
    }
    router.push(course.lessonPath);
  }

  const completed = completedCount(progress);
  const percent = Math.round((completed / stages.length) * 100);
  const complete = completed === stages.length;
  const sectionCount = courseId === "ai-fundamentals" ? "3 pelajaran" : "12 bagian";

  return (
    <main className={styles.page} data-nusa-theme="light">
      <NusaHeader active="belajar" />
      <div className={styles.wrap}>
        {loadError && <p role="alert">Progres belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p>}
        <Link href="/learn" className={styles.back}>← Semua kursus</Link>
        <section className={styles.hero} aria-labelledby="course-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{course.label}</span>
            <h1 id="course-title">{course.title}<span>.</span></h1>
            <p>{course.summary}</p>
            <div className={styles.heroFacts}>
              <span><strong>{sectionCount}</strong> interaktif</span>
              <span>Latihan dan pembahasan bertahap</span>
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
            <div className={styles.progress} role="group" aria-label="Progres kursus">
              <strong>{percent}<span>%</span></strong>
              <small>{complete ? "Kursus selesai" : "Progres penyelesaian kursus"}</small>
              <div><i style={{ width: percent + "%" }} /></div>
            </div>
          </div>
          <div className={styles.lessonList}>
            <button type="button" className={styles.lessonRow} data-state="current" disabled={!ready} onClick={openCourse}>
              <span className={styles.lessonNumber}>→</span>
              <span className={styles.lessonCopy}>
                <small>{sectionCount} · simulasi dan latihan</small>
                <strong>{complete ? "Baca ulang materi" : "Mulai atau lanjutkan belajar"}</strong>
                <span>Lanjutkan dari posisi terakhir di browser ini. Setelah materi selesai, simpan progres dan kerjakan post-test.</span>
              </span>
              <span className={styles.lessonAction}>Buka materi<i aria-hidden="true">↗</i></span>
            </button>
          </div>
          <p className={styles.footnote}>Saat mulai, kamu akan menjawab lima pertanyaan pemetaan awal. Tidak ada nilai minimum; setelah dikirim, materi langsung terbuka.</p>
        </section>
      </div>
    </main>
  );
}
