"use client";

import { useState } from "react";
import { ActivityShell } from "./activity-shell";
import { grade } from "./grade";
import type { SpotActivity, Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: SpotActivity; label: string; onAttempt: (verdict: Verdict) => void };

export function Spot({ activity, label, onAttempt }: Props) {
  const [picked, setPicked] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const settled = verdict?.solved === true;
  const title = activity.mode === "flaw"
    ? "Tandai bagian yang perlu diperiksa"
    : "Tandai bagian yang kamu kenali";
  const instruction = activity.mode === "flaw"
    ? "Klik kalimat yang menurutmu bermasalah. Ada " + activity.requiredHits + " kalimat yang perlu ditemukan."
    : "Klik bagian yang cocok dengan penjelasan. Ada " + activity.requiredHits + " bagian yang perlu ditemukan.";

  function toggle(id: string) {
    if (settled) return;
    setPicked((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    setVerdict(null);
  }

  function check() {
    const next = grade(activity, picked);
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setPicked([]);
    setVerdict(null);
  }

  function stateOf(id: string) {
    if (!verdict) return undefined;
    if (verdict.hits.includes(id)) return "hit";
    if (verdict.misses.includes(id)) return "miss";
    return undefined;
  }

  return (
    <ActivityShell
      label={label}
      title={title}
      instruction={instruction}
      verdict={verdict}
      action={settled ? undefined : { label: "Periksa tandaku", disabled: picked.length === 0, onClick: check }}
      onRetry={settled ? undefined : reset}
      afterSolved={
        <ul className={styles.why}>
          {activity.spans.filter((span) => span.target).map((span) => (
            <li key={span.id} data-target="true">
              <strong>{span.tag ?? span.text}</strong>
              {span.why}
            </li>
          ))}
        </ul>
      }
    >
      <p className={styles.instruction}>{activity.lead}</p>
      <p className={styles.passage}>
        {activity.spans.map((span) => (
          <button
            key={span.id}
            type="button"
            className={styles.span}
            data-state={stateOf(span.id)}
            aria-pressed={picked.includes(span.id)}
            disabled={settled}
            onClick={() => toggle(span.id)}
          >
            {span.text}
          </button>
        ))}
      </p>
    </ActivityShell>
  );
}
