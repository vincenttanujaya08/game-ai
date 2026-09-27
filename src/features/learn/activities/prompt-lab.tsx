"use client";

import { useId, useState } from "react";
import { ActivityShell } from "./activity-shell";
import { grade } from "./grade";
import type { PromptLabActivity, Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: PromptLabActivity; label: string; onAttempt: (verdict: Verdict) => void };

export function PromptLab({ activity, label, onAttempt }: Props) {
  const [text, setText] = useState(activity.startPrompt);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const fieldId = useId();

  const settled = verdict?.solved === true;

  function check() {
    const next = grade(activity, text);
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setText(activity.startPrompt);
    setVerdict(null);
  }

  return (
    <ActivityShell
      label={label}
      title={activity.task}
      instruction="Tulis ulang promptnya sampai semua syarat di bawah terpenuhi. Tidak ada AI yang dipanggil di sini. Yang diperiksa adalah isi promptmu."
      verdict={verdict}
      action={settled ? undefined : { label: "Periksa promptku", disabled: text.trim().length === 0, onClick: check }}
      onRetry={settled ? undefined : reset}
      afterSolved={
        <div className={styles.outputs}>
          <div>
            <span>Prompt awal menghasilkan</span>
            <p>{activity.outputs.weak}</p>
          </div>
          <div>
            <span>Prompt yang sudah diperbaiki</span>
            <p>{activity.outputs.strong}</p>
          </div>
        </div>
      }
    >
      <div className={styles.lab}>
        <label className={styles.label} htmlFor={fieldId}>Promptmu</label>
        <textarea
          id={fieldId}
          value={text}
          disabled={settled}
          spellCheck={false}
          onChange={(event) => {
            setText(event.target.value);
            setVerdict(null);
          }}
        />
        <ul className={styles.checklist}>
          {activity.checks.map((item) => {
            const hit = verdict?.hits.includes(item.id) === true;
            return (
              <li key={item.id} data-state={hit ? "hit" : undefined}>
                <i aria-hidden="true">{hit ? "✓" : "·"}</i>
                <span>{item.label}{hit ? "" : ": " + item.hint}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </ActivityShell>
  );
}
