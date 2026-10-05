"use client";

import { useState } from "react";
import { ActivityShell } from "./activity-shell";
import type { GuidedActivity, Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: GuidedActivity; label: string; onAttempt: (verdict: Verdict) => void };

export function Guided({ activity, label, onAttempt }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [firstAnswers, setFirstAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const step = activity.steps[stepIndex];
  const picked = answers[step.id];
  const option = picked === undefined ? undefined : step.options[picked];

  function choose(index: number) {
    setAnswers((current) => ({ ...current, [step.id]: index }));
    setFirstAnswers((current) => ({ ...current, [step.id]: current[step.id] ?? index }));
  }

  function advance() {
    if (picked === undefined) return;
    if (stepIndex < activity.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }
    const firstTryCorrect = activity.steps.every((item) => item.options[firstAnswers[item.id]]?.correct);
    setDone(true);
    onAttempt({ solved: true, hits: [], misses: [], message: activity.reveal, firstTryCorrect });
  }

  const indicators = activity.checks?.map((check) => ({
    ...check,
    passed: activity.steps.find((item) => item.id === check.stepId)?.options[answers[check.stepId]]?.correct === true,
  }));

  return (
    <ActivityShell
      label={label}
      title={activity.title}
      instruction={`Langkah ${stepIndex + 1} dari ${activity.steps.length} · ${step.prompt}`}
      verdict={done ? { solved: true, hits: [], misses: [], message: activity.reveal } : null}
      action={done ? undefined : { label: stepIndex === activity.steps.length - 1 ? "Lihat rangkuman" : "Lanjut", disabled: picked === undefined, onClick: advance }}
      afterSolved={
        <div className={styles.guidedResult}>
          {activity.comparison ? <div className={styles.guidedComparison}><p><strong>Sebelum</strong>{activity.comparison.before}</p><p><strong>Sesudah</strong>{activity.comparison.after}</p></div> : null}
          {indicators ? <ul className={styles.guidedChecks}>{indicators.map((item) => <li key={item.stepId} data-passed={item.passed}>{item.passed ? "✓" : "↺"} {item.label}</li>)}</ul> : null}
        </div>
      }
    >
      <div className={styles.options}>
        {step.options.map((item, index) => (
          <button key={item.label} type="button" aria-pressed={picked === index} disabled={done} data-state={picked === index ? (item.correct ? "correct" : "wrong") : undefined} onClick={() => choose(index)}>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      {option && !done ? <p className={styles.verdict} data-state={option.correct ? "solved" : "unsolved"} aria-live="polite">{option.feedback}</p> : null}
      {stepIndex > 0 && !done ? <button type="button" className={styles.retry} onClick={() => setStepIndex(stepIndex - 1)}>← Langkah sebelumnya</button> : null}
    </ActivityShell>
  );
}
