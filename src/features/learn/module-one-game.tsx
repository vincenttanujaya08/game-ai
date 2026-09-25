"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { fundamentalsLessons } from "./fundamentals-content";
import { sectionPresentations, type SectionPresentation } from "./fundamentals-presentation";
import { moduleOneStages } from "./module-one-data";
import { initialLearnProgress, readProgress, saveProgress, type LearnProgress } from "./progress";
import { workingLessons, workingPresentations, workingStages } from "./working-with-generative-ai";
import { vibeLessons, vibePresentations, vibeStages } from "./vibe-coding";
import styles from "./fundamentals-reader.module.css";

const reflections: Record<string, { question: string; answer: string }> = {
  "0-6": { question: "Kalau bukti transfer terlihat asli, apa yang masih perlu dicek?", answer: "Periksa riwayat transaksi di aplikasi bankmu. Gambar bukti transfer bisa dipalsukan, sedangkan catatan transaksi bank menunjukkan apakah uangnya benar-benar masuk." },
  "1-0": { question: "Apakah semua sistem yang bekerja otomatis disebut AI?", answer: "Tidak. Ada sistem yang cukup mengikuti aturan yang ditulis manusia. Cara kerjanya perlu dilihat sebelum memberi label AI." },
  "2-6": { question: "Pada langkah mana keputusan akhir tetap ada padamu?", answer: "Pada langkah Putuskan. Kamu dapat memakai AI untuk membantu, lalu memeriksa hasil dan menentukan tindakan sesuai konteks." },
};

function LearningPanel({ panel, selected, onSelect }: { panel: SectionPresentation; selected: number; onSelect: (index: number) => void }) {
  return (
    <div className={styles.learningPanel} data-kind={panel.kind} role="group" aria-label={panel.label}>
      <span className={styles.panelLabel}>{panel.label}</span>
      <h3>{panel.title}</h3>
      {panel.detail ? <p className={styles.panelDetail}>{panel.detail}</p> : null}
      {panel.visual?.layout === "logos" ? (
        <div className={styles.brandLogos} aria-label="Contoh produk generative AI">
          {panel.visual.items.map((item) => (
            <a key={item.caption} href={item.source} target="_blank" rel="noreferrer" aria-label={item.alt + " — " + item.credit}>
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
              <span>{item.caption}</span>
            </a>
          ))}
        </div>
      ) : null}
      {panel.items ? (
        <div className={styles.panelItems}>
          {panel.items.map((item, index) => panel.interactive ? (
            <button key={item.title} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)}>
              <strong>{item.title}</strong>
              <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      ) : null}
      {panel.visual?.layout === "feature" ? (
        <div className={styles.featureVisual}>
          {panel.visual.items.map((item) => (
            <figure key={item.src}>
              <a href={item.source} target="_blank" rel="noreferrer" aria-label={"Buka sumber: " + item.credit}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 760px) 100vw, 800px"
                />
              </a>
              <figcaption>{item.caption} <a href={item.source} target="_blank" rel="noreferrer">Sumber: {item.credit} ↗</a></figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      {panel.interactive ? <p className={styles.panelReveal} aria-live="polite">{panel.items?.[selected]?.detail}</p> : null}
    </div>
  );
}

function ShortParagraphs({ text, lead = false }: { text: string; lead?: boolean }) {
  return text.split("\n\n").map((paragraph, index) => (
    <p key={index} className={lead && index === 0 ? styles.proseLead : undefined}>
      {paragraph.split("**").map((part, partIndex) => partIndex % 2 ? <strong key={partIndex}>{part}</strong> : part)}
    </p>
  ));
}

export function ModuleOneGame({ working = false, vibe = false }: { working?: boolean; vibe?: boolean }) {
  const stages = vibe ? vibeStages : working ? workingStages : moduleOneStages;
  const lessons = vibe ? vibeLessons : working ? workingLessons : fundamentalsLessons;
  const presentations = vibe ? vibePresentations : working ? workingPresentations : sectionPresentations;
  const coursePath = vibe ? "/learn/vibe-coding" : working ? "/learn/working-with-generative-ai" : "/learn/ai-fundamentals";
  const progressKey = vibe ? "nusa-learn-vibe-coding-v1" : working ? "nusa-learn-working-generative-ai-v1" : undefined;
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [selectedPanelItem, setSelectedPanelItem] = useState(0);
  const [finished, setFinished] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const mobileIndexRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(readProgress(progressKey, stages.length));
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [progressKey, stages.length]);

  const stageIndex = progress.activeStage;
  const stage = stages[stageIndex];
  const lesson = lessons[stageIndex];
  const section = lesson.sections[sectionIndex];
  const isLastSection = sectionIndex === lesson.sections.length - 1;
  const isComplete = progress.completedStages.includes(stageIndex);
  const presentation = presentations[stageIndex][sectionIndex];
  const panelFirst = presentation.kind === "stats" || presentation.kind === "statement";
  const reflection = working || vibe ? undefined : reflections[stageIndex + "-" + sectionIndex];

  function scrollToContent() {
    contentRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  function showSection(index: number) {
    if (mobileIndexRef.current) mobileIndexRef.current.open = false;
    setSectionIndex(index);
    setSelectedPanelItem(0);
    scrollToContent();
  }

  function openLesson(index: number) {
    if (index > progress.unlockedStage) return;
    const next = { ...progress, activeStage: index };
    saveProgress(next, progressKey);
    setProgress(next);
    setSectionIndex(0);
    setAnswerIndex(null);
    setSelectedPanelItem(0);
    setFinished(false);
    scrollToContent();
  }

  function completeLesson() {
    if (answerIndex === null && !isComplete) return;
    const completedStages = progress.completedStages.includes(stageIndex)
      ? progress.completedStages
      : [...progress.completedStages, stageIndex].sort();
    const nextIndex = Math.min(stageIndex + 1, stages.length - 1);
    const next = { completedStages, unlockedStage: Math.max(progress.unlockedStage, nextIndex), activeStage: nextIndex };
    saveProgress(next, progressKey);
    setProgress(next);
    setAnswerIndex(null);
    setSectionIndex(0);
    setSelectedPanelItem(0);
    setFinished(stageIndex === stages.length - 1);
    scrollToContent();
  }

  return (
    <main className={styles.page}>
      <NusaHeader active="belajar" />
      <div className={styles.wrap}>
        <div className={styles.utility}>
          <Link href={coursePath}>← Peta pelajaran</Link>
          <span>{ready ? progress.completedStages.length : 0} / {stages.length} pelajaran selesai</span>
        </div>

        {!ready ? <p className={styles.loading}>Menyiapkan pelajaran…</p> : finished ? (
            <section className={styles.finish}>
            <span className={styles.eyebrow}>{stages.length} / {stages.length} PELAJARAN SELESAI</span>
            <h1>{vibe ? "Kamu sudah membangun dan meluncurkan ide." : working ? "Kamu siap bekerja bersama Generative AI." : "Bekal AI Fundamentals sudah lengkap."}</h1>
            <p>{vibe ? "Kamu sudah mengenal coding agent, membuat project, mengujinya, dan membagikan hasilnya. Terus gunakan penilaianmu sendiri saat bekerja dengan AI." : working ? "Kamu sudah berlatih memberi arah, menguji jawaban, memperbaiki hasil, dan menyusun alur kerja. Tetap periksa sumber dan gunakan penilaianmu sendiri." : "Kamu sudah mengenal kemampuan AI, cara kerja dasarnya, dan cara menjaga keputusan tetap di tanganmu. Coba gunakan bekal itu dalam skenario nyata di NUSA Lab Game."}</p>
            {working || vibe ? <Link href="/learn">Kembali ke semua kursus ↗</Link> : <Link href="/games">Coba NUSA Lab Game ↗</Link>}
          </section>
        ) : (
          <>
            <header className={styles.lessonHeader}>
              <div>
                <span className={styles.eyebrow}>{vibe ? "VIBE CODING" : working ? "WORKING WITH GENERATIVE AI" : "AI FUNDAMENTALS"} · PELAJARAN {String(stageIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
                <h1>{stage.title}</h1>
                <p>{lesson.lead}</p>
              </div>
              <span className={styles.headerNumber} aria-hidden="true">{String(stageIndex + 1).padStart(2, "0")}</span>
            </header>

            <div className={styles.layout}>
              <nav className={styles.rail} aria-label="Navigasi pelajaran">
                <p>Rute pelajaran</p>
                {stages.map((item, index) => (
                  <button key={item.id} type="button" disabled={index > progress.unlockedStage} aria-current={index === stageIndex ? "step" : undefined} onClick={() => openLesson(index)}>
                    <i aria-hidden="true">{progress.completedStages.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</i>
                    <span>{item.title}</span>
                  </button>
                ))}
                <div className={styles.railDivider} />
                <p>Di pelajaran ini</p>
                <div className={styles.chapterLinks}>
                  {lesson.sections.map((item, index) => (
                    <button key={item.title} type="button" aria-current={index === sectionIndex ? "location" : undefined} onClick={() => showSection(index)}>
                      <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
                    </button>
                  ))}
                </div>
              </nav>

              <article className={styles.article} ref={contentRef}>
                <div className={styles.sectionTop}>
                  <span>BAGIAN {String(sectionIndex + 1).padStart(2, "0")} / {String(lesson.sections.length).padStart(2, "0")}</span>
                  <div className={styles.progressTrack} role="progressbar" aria-label="Progres bagian pelajaran" aria-valuemin={0} aria-valuemax={lesson.sections.length} aria-valuenow={sectionIndex + 1}><i style={{ width: ((sectionIndex + 1) / lesson.sections.length * 100) + "%" }} /></div>
                </div>
                <details key={stageIndex} ref={mobileIndexRef} className={styles.mobileIndex}>
                  <summary>Lihat daftar bagian</summary>
                  <div>{lesson.sections.map((item, index) => <button key={item.title} type="button" aria-current={index === sectionIndex ? "location" : undefined} onClick={() => showSection(index)}>{String(index + 1).padStart(2, "0")} · {item.title}</button>)}</div>
                </details>
                <section aria-labelledby="lesson-section-title">
                  <h2 id="lesson-section-title">{section.title}</h2>
                  <div className={styles.prose}>
                    {panelFirst ? <LearningPanel panel={presentation} selected={selectedPanelItem} onSelect={setSelectedPanelItem} /> : null}
                    <div className={styles.proseIntro} data-panel-first={panelFirst}><ShortParagraphs text={section.paragraphs[0]} lead /></div>
                    {!panelFirst ? <LearningPanel panel={presentation} selected={selectedPanelItem} onSelect={setSelectedPanelItem} /> : null}
                    <div className={styles.proseMore} data-kind={presentation.kind} data-labeled={Boolean(presentation.bodyLabels)}>
                      {section.paragraphs.slice(1).map((paragraph, index) => presentation.bodyLabels ? (
                        <div className={styles.detailBlock} key={index}><span>{presentation.bodyLabels[index]}</span><ShortParagraphs text={paragraph} /></div>
                      ) : <div className={styles.proseGroup} key={index}><ShortParagraphs text={paragraph} /></div>)}
                    </div>
                  </div>
                  {reflection ? <details className={styles.reflection}><summary>Coba pikirkan: {reflection.question}</summary><p>{reflection.answer}</p></details> : null}
                  {section.sources ? <div className={styles.sources} role="group" aria-label="Sumber bagian ini"><span>SUMBER & BACA LANJUT</span>{section.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">↗ {source.label}</a>)}</div> : null}
                  {isLastSection ? (
                    <>
                      <div className={styles.takeaway}><span>INTI PELAJARAN</span><p>{lesson.takeaway}</p></div>
                      <div className={styles.check}>
                        <span>CEK PEMAHAMAN</span>
                        <h3>{lesson.check.question}</h3>
                        <div className={styles.choices}>{lesson.check.choices.map((choice, index) => <button key={choice.label} type="button" aria-pressed={answerIndex === index} onClick={() => setAnswerIndex(index)}>{choice.label}</button>)}</div>
                        {answerIndex !== null ? <p className={styles.feedback} aria-live="polite">{lesson.check.choices[answerIndex].feedback}</p> : null}
                      </div>
                    </>
                  ) : null}
                  <div className={styles.bridge}>
                    <span>SELANJUTNYA</span>
                    <p>{presentation.bridge}</p>
                    <strong>{lesson.sections[sectionIndex + 1]?.title ?? stages[stageIndex + 1]?.title ?? "Cek pemahaman selesai"}</strong>
                  </div>
                </section>
                <footer className={styles.actions}>
                  <button type="button" disabled={sectionIndex === 0} onClick={() => showSection(sectionIndex - 1)}>← Sebelumnya</button>
                  {isLastSection ? <button type="button" disabled={answerIndex === null && !isComplete} onClick={completeLesson}>{stageIndex === stages.length - 1 ? "Selesaikan kursus" : "Lanjut ke pelajaran berikutnya"} →</button> : <button type="button" onClick={() => showSection(sectionIndex + 1)}>Lanjut membaca →</button>}
                </footer>
              </article>

            </div>
          </>
        )}
      </div>
    </main>
  );
}
