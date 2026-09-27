"use client";

import { useState } from "react";
import { ActivityShell } from "./activity-shell";
import { grade } from "./grade";
import type { PredictActivity, Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: PredictActivity; label: string; onAttempt: (verdict: Verdict) => void };

export function Predict({ activity, label, onAttempt }: Props) {
  const [picked, setPicked] = useState<number[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const settled = verdict?.solved === true;

  function choose(index: number) {
    if (settled) return;
    const next = grade(activity, index);
    setPicked((prev) => (prev.includes(index) ? prev : [...prev, index]));
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setPicked([]);
    setVerdict(null);
  }

  function stateOf(index: number) {
    if (settled && activity.options[index].correct) return "correct";
    if (picked.includes(index) && !activity.options[index].correct) return "wrong";
    return undefined;
  }

  return (
    <ActivityShell
      label={label}
      title={activity.prompt}
      verdict={verdict}
      onRetry={settled ? undefined : reset}
      afterSolved={<p className={styles.instruction}>{activity.reveal}</p>}
    >
      <div className={styles.options}>
        {activity.options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            data-state={stateOf(index)}
            aria-pressed={picked.includes(index)}
            disabled={settled}
            onClick={() => choose(index)}
          >
            <span>{option.label}</span>
            {stateOf(index) === "correct" ? <i aria-hidden="true">✓</i> : null}
            {stateOf(index) === "wrong" ? <i aria-hidden="true">↺</i> : null}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
