"use client";

import { ActivityBlock } from "./activities/activity-block";
import type { Verdict } from "./activities/types";
import type { LessonContent, LessonSection as LessonSectionData } from "./fundamentals-content";
import type { SectionPresentation } from "./fundamentals-presentation";
import { LearningPanel, ShortParagraphs } from "./learning-panel";
import { LessonCheck, type CheckState } from "./lesson-check";
import styles from "./fundamentals-reader.module.css";

type Props = {
  lesson: LessonContent;
  section: LessonSectionData;
  presentation: SectionPresentation;
  isLastSection: boolean;
  selectedPanelItem: number;
  onSelectPanelItem: (index: number) => void;
  checkState: CheckState;
  onAnswer: (index: number) => void;
  onRevealAnswer: () => void;
  onActivityAttempt: (verdict: Verdict) => void;
  nextLabel: string;
};

export function LessonSection({ lesson, section, presentation, isLastSection, selectedPanelItem, onSelectPanelItem, checkState, onAnswer, onRevealAnswer, onActivityAttempt, nextLabel }: Props) {
  /**
   * Latihan selalu diletakkan sesudah seluruh prosa bagian ini. Menebak hanya
   * masuk akal kalau pijakannya sudah dibaca. Jawabannya sendiri tidak ada di
   * prosa, jadi ini tetap tebak-dulu-baru-buka.
   */
  const activity = presentation.activity ? (
    <ActivityBlock
      key={section.title}
      activity={presentation.activity}
      label={presentation.label}
      onAttempt={onActivityAttempt}
    />
  ) : null;
  const panelFirst = !activity && (presentation.kind === "stats" || presentation.kind === "statement");
  const panel = activity
    ? null
    : <LearningPanel panel={presentation} selected={selectedPanelItem} onSelect={onSelectPanelItem} />;

  return (
    <section aria-labelledby="lesson-section-title">
      <h2 id="lesson-section-title">{section.title}</h2>
      <div className={styles.prose}>
        {panelFirst ? panel : null}
        <div className={styles.proseIntro} data-panel-first={panelFirst}>
          <ShortParagraphs text={section.paragraphs[0]} lead />
        </div>
        {!panelFirst ? panel : null}
        <div className={styles.proseMore} data-kind={presentation.kind} data-labeled={Boolean(presentation.bodyLabels)}>
          {section.paragraphs.slice(1).map((paragraph, index) => presentation.bodyLabels ? (
            <div className={styles.detailBlock} key={index}>
              <span>{presentation.bodyLabels[index]}</span>
              <ShortParagraphs text={paragraph} />
            </div>
          ) : (
            <div className={styles.proseGroup} key={index}>
              <ShortParagraphs text={paragraph} />
            </div>
          ))}
        </div>
      </div>

      {activity}

      {section.reveal ? (
        <details className={styles.reveal}>
          <summary>{section.reveal.label ?? "Lihat jawaban dan alasannya"}</summary>
          <div>
            {section.reveal.paragraphs.map((paragraph, index) => (
              <ShortParagraphs key={index} text={paragraph} />
            ))}
          </div>
        </details>
      ) : null}

      {presentation.reflection ? (
        <details className={styles.reflection}>
          <summary>Coba pikirkan: {presentation.reflection.question}</summary>
          <p>{presentation.reflection.answer}</p>
        </details>
      ) : null}

      {section.sources ? (
        <div className={styles.sources} role="group" aria-label="Sumber bagian ini">
          <span>SUMBER &amp; BACA LANJUT</span>
          {section.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">↗ {source.label}</a>
          ))}
        </div>
      ) : null}

      {isLastSection ? (
        <>
          <div className={styles.takeaway}><span>INTI PELAJARAN</span><p>{lesson.takeaway}</p></div>
          <LessonCheck check={lesson.check} state={checkState} onAnswer={onAnswer} onReveal={onRevealAnswer} />
        </>
      ) : null}

      <div className={styles.bridge}>
        <span>SELANJUTNYA</span>
        <p>{presentation.bridge}</p>
        <strong>{nextLabel}</strong>
      </div>
    </section>
  );
}
