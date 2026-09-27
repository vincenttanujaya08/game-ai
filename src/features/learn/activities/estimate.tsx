"use client";

import { useId, useState } from "react";
import { ActivityShell } from "./activity-shell";
import { grade } from "./grade";
import type { EstimateActivity, Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: EstimateActivity; label: string; onAttempt: (verdict: Verdict) => void };

const decimals = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });

export function Estimate({ activity, label, onAttempt }: Props) {
  const midpoint = Math.round(((activity.min + activity.max) / 2) / activity.step) * activity.step;
  const [guess, setGuess] = useState(midpoint);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const sliderId = useId();

  const settled = verdict?.solved === true;

  function check() {
    const next = grade(activity, guess);
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setGuess(midpoint);
    setVerdict(null);
  }

  return (
    <ActivityShell
      label={label}
      title={activity.question}
      instruction="Tebak dulu sebelum angkanya dibuka. Tebakan yang meleset pun tetap membantu."
      verdict={verdict}
      action={settled ? undefined : { label: "Buka angkanya", onClick: check }}
      onRetry={settled ? undefined : reset}
      afterSolved={
        <>
          <div className={styles.actual}>
            <span>Angka sebenarnya</span>
            <strong>{decimals.format(activity.answer)}</strong>
            <span>{activity.unit}</span>
          </div>
          {activity.source ? (
            <p className={styles.source}>
              <a href={activity.source.url} target="_blank" rel="noreferrer">↗ {activity.source.label}</a>
            </p>
          ) : null}
        </>
      }
    >
      <div className={styles.slider}>
        <div className={styles.readout}>
          <output htmlFor={sliderId}>{decimals.format(guess)}</output>
          <span>{activity.unit}</span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={activity.min}
          max={activity.max}
          step={activity.step}
          value={guess}
          disabled={settled}
          aria-label={activity.question + " (dalam " + activity.unit + ")"}
          onChange={(event) => {
            setGuess(Number(event.target.value));
            setVerdict(null);
          }}
        />
        <div className={styles.scale}>
          <span>{decimals.format(activity.min)}</span>
          <span>{decimals.format(activity.max)}</span>
        </div>
      </div>
    </ActivityShell>
  );
}
