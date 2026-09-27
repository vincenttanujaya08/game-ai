"use client";

import type { ReactNode } from "react";
import type { Verdict } from "./types";
import styles from "./activity.module.css";

type Props = {
  label: string;
  title: string;
  instruction?: string;
  verdict: Verdict | null;
  /** Aksi utama, mis. "Periksa jawaban". Tanpa ini blok dinilai saat diklik. */
  action?: { label: string; disabled?: boolean; onClick: () => void };
  onRetry?: () => void;
  children: ReactNode;
  /** Muncul sesudah selesai, mis. angka sebenarnya atau contoh hasil. */
  afterSolved?: ReactNode;
};

export function ActivityShell({ label, title, instruction, verdict, action, onRetry, children, afterSolved }: Props) {
  return (
    <section className={styles.activity} aria-label={label + ": " + title}>
      <span className={styles.label}>{label}</span>
      <h3>{title}</h3>
      {instruction ? <p className={styles.instruction}>{instruction}</p> : null}

      {children}

      {verdict ? (
        <p className={styles.verdict} data-state={verdict.solved ? "solved" : "unsolved"} aria-live="polite">
          {verdict.message}
        </p>
      ) : null}

      {verdict?.solved ? afterSolved : null}

      {action || onRetry ? (
        <div className={styles.footer}>
          {action ? (
            <button type="button" className={styles.primary} disabled={action.disabled} onClick={action.onClick}>
              {action.label}
            </button>
          ) : null}
          {onRetry && verdict ? (
            <button type="button" className={styles.retry} onClick={onRetry}>
              Coba lagi
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
