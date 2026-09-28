"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import NusaHeader from "../../app/nusa-header";
import { courses, type CourseId } from "./courses";
import { fallbackPanel } from "./learning-panel";
import { LessonFinish } from "./lesson-finish";
import { initialCheckState, isCheckSettled, type CheckState } from "./lesson-check";
import { LessonMobileIndex, LessonRail } from "./lesson-rail";
import { LessonSection } from "./lesson-section";
import { lessonPractices, masteryOf } from "./mastery";
import { loadAssessmentStatus } from "./assessment-status";
import { attemptKey, initialLearnProgress, loadProgress, saveProgress, type LearnProgress } from "./progress";
import styles from "./fundamentals-reader.module.css";

/** Satu bagian punya paling banyak satu blok latihan (indeks 0); cek pemahaman memakai indeks 1. */
const activityBlockIndex = 0;
const checkActivityIndex = 1;

/** Berapa kali latihan harus dicoba sebelum jalan keluar ditawarkan. */
const triesBeforeSkip = 2;

export function LessonReader({ course: courseId }: { course: CourseId }) {
  const course = courses[courseId];
  const { stages, lessons, presentations } = course;
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [checkState, setCheckState] = useState<CheckState>(initialCheckState);
  const [selectedPanelItem, setSelectedPanelItem] = useState(0);
  /** Latihan yang sengaja dilewati pembaca pada sesi ini. */
  const [skipped, setSkipped] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [postTestCompleted, setPostTestCompleted] = useState(false);
  const progressRef = useRef<LearnProgress>(initialLearnProgress);
  const contentRef = useRef<HTMLElement>(null);
  const mobileIndexRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([loadProgress(course), loadAssessmentStatus(course.id)]).then(([value, assessment]) => {
      if (!cancelled) { progressRef.current = value; setProgress(value); setPostTestCompleted(assessment.postTestCompleted); setReady(true); }
    }).catch(() => { if (!cancelled) setLoadError(true); });
    return () => { cancelled = true; };
  }, [course]);

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

  const stageIndex = progress.activeStage;
  const stage = stages[stageIndex];
  const lesson = lessons[stageIndex];
  const sectionCount = lesson.sections.length;
  const sectionIndex = Math.min(progress.sectionIndex, sectionCount - 1);
  const section = lesson.sections[sectionIndex];
  const isLastSection = sectionIndex === sectionCount - 1;
  const isComplete = progress.completedStages.includes(stageIndex);
  const presentation = presentations[stageIndex]?.[sectionIndex] ?? fallbackPanel;

  /**
   * Latihan di tengah bagian ikut mengunci tombol lanjut. Tanpa ini, blok latihan
   * hanya jadi hiasan yang dilewati begitu saja. Jalan keluarnya baru muncul
   * sesudah benar-benar dicoba, supaya menahan bukan berarti menjebak.
   */
  const activityKey = attemptKey(stageIndex, sectionIndex, activityBlockIndex);
  const activityAttempt = progress.attempts[activityKey];
  const activitySolved = activityAttempt?.solved === true;
  const activityTries = activityAttempt?.tries ?? 0;
  const activitySkipped = skipped.includes(activityKey);
  const activityBlocks = Boolean(presentation.activity) && !activitySolved && !activitySkipped;
  const canOfferSkip = activityBlocks && activityTries >= triesBeforeSkip;

  const commit = useCallback((next: LearnProgress) => {
    progressRef.current = next;
    saveProgress(next, course);
    setProgress(next);
  }, [course]);

  function scrollToContent() {
    contentRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  const showSection = useCallback((index: number) => {
    if (index < 0 || index >= sectionCount) return;
    if (mobileIndexRef.current) mobileIndexRef.current.open = false;
    setSelectedPanelItem(0);
    commit({ ...progress, sectionIndex: index });
    contentRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [commit, progress, sectionCount]);

  function openLesson(index: number) {
    if (index > progress.unlockedStage) return;
    setCheckState(initialCheckState);
    setSelectedPanelItem(0);
    setFinished(false);
    commit({ ...progress, activeStage: index, sectionIndex: 0 });
    scrollToContent();
  }

  /** Satu percobaan blok latihan atau cek pemahaman dicatat di progres. */
  const recordAttempt = useCallback((activityIndex: number, solved: boolean) => {
    const prev = progressRef.current;
    const key = attemptKey(prev.activeStage, prev.sectionIndex, activityIndex);
    const previous = prev.attempts[key];
    const tries = (previous?.tries ?? 0) + 1;
    const next: LearnProgress = {
      ...prev,
      attempts: {
        ...prev.attempts,
        [key]: {
          tries,
          solved: previous?.solved === true || solved,
          firstTryCorrect: previous?.firstTryCorrect === true || (solved && tries === 1),
        },
      },
    };
    progressRef.current = next;
    saveProgress(next, course);
    setProgress(next);
  }, [course]);

  /** Cek pemahaman: benar membuka jalan, salah boleh diulang tanpa penalti. */
  function answerCheck(index: number) {
    if (isCheckSettled(checkState)) return;
    const correct = lesson.check.choices[index].correct === true;
    const nextState: CheckState = {
      picked: checkState.picked.includes(index) ? checkState.picked : [...checkState.picked, index],
      solved: correct,
      revealed: false,
    };
    setCheckState(nextState);
    recordAttempt(checkActivityIndex, correct);
  }

  function revealCheckAnswer() {
    setCheckState((prev) => (isCheckSettled(prev) ? prev : { ...prev, revealed: true }));
  }

  const canCompleteLesson = isComplete || (isCheckSettled(checkState) && !activityBlocks);

  function completeLesson() {
    if (!canCompleteLesson) return;
    if (stageIndex === stages.length - 1) {
      setFinished(true);
      scrollToContent();
      return;
    }
    const completedStages = progress.completedStages.includes(stageIndex)
      ? progress.completedStages
      : [...progress.completedStages, stageIndex].sort((a, b) => a - b);
    const nextIndex = Math.min(stageIndex + 1, stages.length - 1);
    setCheckState(initialCheckState);
    setSelectedPanelItem(0);
    setFinished(false);
    commit({
      ...progress,
      completedStages,
      unlockedStage: Math.max(progress.unlockedStage, nextIndex),
      activeStage: nextIndex,
      sectionIndex: 0,
    });
    scrollToContent();
  }

  // Panah kiri/kanan memindahkan bagian, kecuali saat fokus sedang di kolom isian.
  useEffect(() => {
    if (!ready || finished) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (event.key === "ArrowRight") {
        if (activityBlocks) return;
        showSection(sectionIndex + 1);
      }
      else if (event.key === "ArrowLeft") showSection(sectionIndex - 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ready, finished, sectionIndex, showSection, activityBlocks]);

  const nextLabel = lesson.sections[sectionIndex + 1]?.title ?? stages[stageIndex + 1]?.title ?? "Cek pemahaman selesai";
  const masteryByStage = stages.map((_, index) => masteryOf(progress, lessonPractices(course, index)));
  const lessonMastery = masteryByStage[stageIndex];

  /** Dari layar selesai, kembali ke satu bagian tertentu. */
  function reviewSection(reviewStage: number, reviewSection: number) {
    setCheckState(initialCheckState);
    setSelectedPanelItem(0);
    setFinished(false);
    commit({ ...progress, activeStage: reviewStage, sectionIndex: reviewSection });
    scrollToContent();
  }

  return (
    <main className={styles.page} data-nusa-theme="light">
      <NusaHeader active="belajar" />
      <div className={styles.wrap}>
        {saveError && <p role="alert">Progres belum tersimpan di akun. <button type="button" onClick={() => saveProgress(progress, course)}>Coba simpan lagi</button></p>}
        <div className={styles.utility}>
          <Link href={course.path}>← Peta pelajaran</Link>
          <span>{ready ? progress.completedStages.length : 0} / {stages.length} pelajaran selesai</span>
        </div>

        {loadError ? <p role="alert">Progres belum bisa dimuat. Muat ulang halaman untuk mencoba lagi.</p> : !ready ? <p className={styles.loading}>Menyiapkan pelajaran…</p> : finished ? (
          <LessonFinish course={course} progress={progress} postTestCompleted={postTestCompleted} onReview={reviewSection} />
        ) : (
          <>
            <header className={styles.lessonHeader}>
              <div>
                <span className={styles.eyebrow}>{course.eyebrow} · PELAJARAN {String(stageIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
                <h1>{stage.title}</h1>
                <p>{lesson.lead}</p>
              </div>
            </header>

            <div className={styles.layout}>
              <LessonRail
                stages={stages}
                lesson={lesson}
                stageIndex={stageIndex}
                sectionIndex={sectionIndex}
                unlockedStage={progress.unlockedStage}
                completedStages={progress.completedStages}
                mastery={masteryByStage}
                onOpenLesson={openLesson}
                onShowSection={showSection}
              />

              <article className={styles.article} ref={contentRef}>
                <div className={styles.sectionTop}>
                  <span>BAGIAN {String(sectionIndex + 1).padStart(2, "0")} / {String(sectionCount).padStart(2, "0")}</span>
                  {lessonMastery.total > 0 ? (
                    <span className={styles.practiceCount}>{lessonMastery.total} latihan · {lessonMastery.solved} selesai</span>
                  ) : null}
                  <div className={styles.progressTrack} role="progressbar" aria-label="Progres bagian pelajaran" aria-valuemin={0} aria-valuemax={sectionCount} aria-valuenow={sectionIndex + 1}>
                    <i style={{ width: ((sectionIndex + 1) / sectionCount * 100) + "%" }} />
                  </div>
                </div>

                <LessonMobileIndex
                  lesson={lesson}
                  stageIndex={stageIndex}
                  sectionIndex={sectionIndex}
                  onShowSection={showSection}
                  indexRef={mobileIndexRef}
                />

                <LessonSection
                  lesson={lesson}
                  section={section}
                  presentation={presentation}
                  isLastSection={isLastSection}
                  selectedPanelItem={selectedPanelItem}
                  onSelectPanelItem={setSelectedPanelItem}
                  checkState={checkState}
                  onAnswer={answerCheck}
                  onRevealAnswer={revealCheckAnswer}
                  onActivityAttempt={(verdict) => recordAttempt(activityBlockIndex, verdict.solved)}
                  nextLabel={nextLabel}
                />

                <footer className={styles.actions}>
                  <button type="button" disabled={sectionIndex === 0} onClick={() => showSection(sectionIndex - 1)}>← Sebelumnya</button>

                  {activityBlocks ? (
                    <p className={styles.gateHint} aria-live="polite">
                      Selesaikan latihan di atas untuk lanjut.
                      {canOfferSkip ? (
                        <button type="button" onClick={() => setSkipped((prev) => [...prev, activityKey])}>
                          Lewati latihan ini
                        </button>
                      ) : null}
                    </p>
                  ) : null}

                  {isLastSection ? (
                    <button type="button" disabled={!canCompleteLesson} onClick={completeLesson}>
                      {stageIndex === stages.length - 1 ? "Selesaikan kursus" : "Lanjut ke pelajaran berikutnya"} →
                    </button>
                  ) : (
                    <button type="button" disabled={activityBlocks} onClick={() => showSection(sectionIndex + 1)}>Lanjut membaca →</button>
                  )}
                </footer>
              </article>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
