"use client";

import type { RefObject } from "react";
import type { LessonContent } from "./fundamentals-content";
import type { Mastery } from "./mastery";
import { masteryState } from "./mastery";
import type { LessonStage } from "./module-one-data";
import styles from "./fundamentals-reader.module.css";

type RailProps = {
  stages: LessonStage[];
  lesson: LessonContent;
  stageIndex: number;
  sectionIndex: number;
  unlockedStage: number;
  completedStages: number[];
  /** Penguasaan latihan per pelajaran, sejajar dengan stages. */
  mastery: Mastery[];
  onOpenLesson: (index: number) => void;
  onShowSection: (index: number) => void;
  showSections?: boolean;
};

export function LessonRail({ stages, lesson, stageIndex, sectionIndex, unlockedStage, completedStages, mastery, onOpenLesson, onShowSection, showSections = true }: RailProps) {
  return (
    <nav className={styles.rail} aria-label="Navigasi pelajaran">
      <p>Rute pelajaran</p>
      {stages.map((item, index) => {
        const state = masteryState(mastery[index] ?? { solved: 0, firstTry: 0, total: 0 });
        const done = completedStages.includes(index);
        return (
          <button
            key={item.id}
            type="button"
            disabled={index > unlockedStage}
            aria-current={index === stageIndex ? "step" : undefined}
            onClick={() => onOpenLesson(index)}
          >
            <i aria-hidden="true" data-mastery={state}>{done && state === "selesai" ? "✓" : String(index + 1).padStart(2, "0")}</i>
            <span>
              {item.title}
              {mastery[index] && mastery[index].total > 0 && state !== "belum" ? (
                <small>{mastery[index].solved} / {mastery[index].total} latihan</small>
              ) : null}
            </span>
          </button>
        );
      })}
      {showSections && <>
      <div className={styles.railDivider} />
      <p>Di pelajaran ini</p>
      <div className={styles.chapterLinks}>
        {lesson.sections.map((item, index) => (
          <button key={item.title} type="button" aria-current={index === sectionIndex ? "location" : undefined} onClick={() => onShowSection(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.title}
          </button>
        ))}
      </div>
      </>}
    </nav>
  );
}

type MobileIndexProps = {
  lesson: LessonContent;
  stageIndex: number;
  sectionIndex: number;
  onShowSection: (index: number) => void;
  indexRef: RefObject<HTMLDetailsElement | null>;
};

export function LessonMobileIndex({ lesson, stageIndex, sectionIndex, onShowSection, indexRef }: MobileIndexProps) {
  return (
    <details key={stageIndex} ref={indexRef} className={styles.mobileIndex}>
      <summary>Lihat daftar bagian</summary>
      <div>
        {lesson.sections.map((item, index) => (
          <button key={item.title} type="button" aria-current={index === sectionIndex ? "location" : undefined} onClick={() => onShowSection(index)}>
            {String(index + 1).padStart(2, "0")} · {item.title}
          </button>
        ))}
      </div>
    </details>
  );
}
