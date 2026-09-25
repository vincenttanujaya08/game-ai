"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { moduleOneStages } from "./module-one-data";
import { workingStages } from "./working-with-generative-ai";
import { vibeStages } from "./vibe-coding";
import { completedFundamentalsModules, initialLearnProgress, readProgress, saveProgress, type LearnProgress } from "./progress";
import styles from "./learn.module.css";

export default function CourseMap({ working = false, vibe = false }: { working?: boolean; vibe?: boolean }) {
  const stages = vibe ? vibeStages : working ? workingStages : moduleOneStages;
  const courseTitle = vibe ? "Vibe Coding" : working ? "Working with Generative AI" : "AI Fundamentals";
  const courseLabel = vibe ? "KURSUS 03 · VIBE CODING" : working ? "KURSUS 02 · GENERATIVE AI" : "KURSUS 01 · DASAR-DASAR AI";
  const progressKey = vibe ? "nusa-learn-vibe-coding-v1" : working ? "nusa-learn-working-generative-ai-v1" : undefined;
  const coursePath = vibe ? "/learn/vibe-coding" : working ? "/learn/working-with-generative-ai" : "/learn/ai-fundamentals";
  const lessonPath = coursePath + "/lesson";
  const router = useRouter();
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(readProgress(progressKey, stages.length));
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [progressKey, stages.length]);

  function openStage(index: number) {
    if (!ready || index > progress.unlockedStage) return;
    const next = { ...progress, activeStage: index };
    saveProgress(next, progressKey);
    setProgress(next);
    router.push(lessonPath);
  }

  const completed = completedFundamentalsModules(progress);
  const percent = Math.round((completed / stages.length) * 100);

  return (
    <main className={styles.page}>
      <NusaHeader active="belajar" />
      <div className={styles.wrap}>
          <Link href="/learn" className={styles.back}>← Semua kursus</Link>
        <section className={styles.hero} aria-labelledby="course-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{courseLabel}</span>
            <h1 id="course-title">{courseTitle}<span>.</span></h1>
            <p>{vibe ? "Bangun software lewat percakapan dengan AI. Kenali coding agent, rencanakan, uji, perbaiki, lalu bagikan project-mu." : working ? "Belajar memberi arahan yang jelas, menguji jawaban AI, memperbaiki hasil, dan menyusun alur kerja yang tetap kamu kendalikan." : "Kenali kemampuan AI hari ini, pahami cara kerjanya, dan belajar memakainya dengan penilaianmu sendiri."}</p>
            <div className={styles.heroFacts}>
              <span><strong>{String(stages.length).padStart(2, "0")}</strong> pelajaran</span>
              <span><strong>01</strong> cek pemahaman per pelajaran</span>
              <span><strong>∞</strong> bisa dibaca ulang</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image src={vibe ? "/course-visuals/vibe-coding-person-laptop.jpg" : working ? "/course-visuals/working-generative-ai-students.jpg" : "/course-visuals/aceh-polytechnic.webp"} alt={vibe ? "Seseorang sedang bekerja di laptop di ruang kerja yang nyaman" : working ? "Mahasiswa bekerja bersama menyusun model arsitektur di lingkungan kampus" : "Mahasiswa Politeknik Aceh mempraktikkan keterampilan teknologi komputer di laboratorium"} width={1280} height={vibe ? 854 : working ? 854 : 853} priority />
              {vibe ? <div><span>Mulai dari ide. Akhiri dengan karya yang bisa dibuka.</span><a href="https://commons.wikimedia.org/wiki/File:Person_working_on_laptop_in_a_cozy_indoor_setting_during_daytime.jpg" target="_blank" rel="noreferrer">Foto: Nenad Stojković · CC BY 2.0</a></div> : working ? <div><span>Belajar bersama, berpikir mandiri.</span><a href="https://commons.wikimedia.org/wiki/File:New_Colombo_Plan_students_in_Indonesia_working_on_a_student_collaboration_on_architecture_(15894268345).jpg" target="_blank" rel="noreferrer">Foto: DFAT · CC BY 2.0</a></div> : <div><span>Belajar AI, tetap berpikir sendiri.</span><a href="https://commons.wikimedia.org/wiki/File:Mahasiswa_i_menggunakan_komputer_untuk_meningkatkan_keterampilan_teknologi_(8315664069).jpg" target="_blank" rel="noreferrer">Foto: USAID Indonesia · domain publik</a></div>}
          </div>
        </section>

        <section className={styles.curriculum} aria-labelledby="path-title">
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>RUTE BELAJAR</span>
              <h2 id="path-title">Peta pelajaran</h2>
              <p>{vibe ? "Tujuh pelajaran dari mengenal coding agent hingga menguji dan meluncurkan project sendiri." : working ? "Empat pelajaran yang saling menyambung. Mulai dari memberi arah, lalu meninjau jawaban hingga merangkai alur kerja." : "Tiga pelajaran yang saling menyambung. Mulai dari yang bisa AI lakukan, lalu pahami cara kerja dan peran kita."}</p>
            </div>
            <div className={styles.progress} role="group" aria-label={completed + " dari " + stages.length + " pelajaran selesai"}>
              <strong>{completed}<span> / {stages.length}</span></strong>
              <small>pelajaran selesai</small>
              <div><i style={{ width: percent + "%" }} /></div>
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
                    <small>{stage.area}</small>
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
