"use client";

import type { LessonContent } from "./fundamentals-content";
import styles from "./fundamentals-reader.module.css";

/** Percobaan yang sedang berjalan pada satu cek pemahaman. */
export type CheckState = { picked: number[]; solved: boolean; revealed: boolean };

export const initialCheckState: CheckState = { picked: [], solved: false, revealed: false };

/** Jumlah percobaan salah sebelum jalan keluar "Lihat penjelasan" muncul. */
export const wrongTriesBeforeEscape = 2;

export function isCheckSettled(state: CheckState) {
  return state.solved || state.revealed;
}

export function wrongTries(state: CheckState) {
  return state.solved ? state.picked.length - 1 : state.picked.length;
}

type Props = {
  check: LessonContent["check"];
  state: CheckState;
  onAnswer: (index: number) => void;
  onReveal: () => void;
};

export function LessonCheck({ check, state, onAnswer, onReveal }: Props) {
  const settled = isCheckSettled(state);
  const wrong = wrongTries(state);
  const lastPicked = state.picked.at(-1);
  const correctIndex = check.choices.findIndex((choice) => choice.correct);

  function choiceState(index: number) {
    if (state.solved && check.choices[index].correct) return "correct";
    if (state.revealed && check.choices[index].correct) return "correct";
    if (state.picked.includes(index) && !check.choices[index].correct) return "wrong";
    return undefined;
  }

  return (
    <div className={styles.check}>
      <span>CEK PEMAHAMAN</span>
      <h3>{check.question}</h3>
      <div className={styles.choices}>
        {check.choices.map((choice, index) => (
          <button
            key={choice.label}
            type="button"
            data-state={choiceState(index)}
            aria-pressed={state.picked.includes(index)}
            disabled={settled}
            onClick={() => onAnswer(index)}
          >
            <span>{choice.label}</span>
            {choiceState(index) === "correct" ? <i aria-hidden="true">✓</i> : null}
            {choiceState(index) === "wrong" ? <i aria-hidden="true">↺</i> : null}
          </button>
        ))}
      </div>

      <p className={styles.feedback} data-state={state.solved ? "correct" : wrong > 0 ? "wrong" : undefined} aria-live="polite">
        {state.solved
          ? check.choices[correctIndex].feedback
          : state.revealed
            ? "Jawabannya: " + check.choices[correctIndex].label + ". " + check.choices[correctIndex].feedback
            : lastPicked !== undefined
              ? check.choices[lastPicked].feedback + " Coba pilihan lain."
              : ""}
      </p>

      {!settled && wrong >= wrongTriesBeforeEscape ? (
        <button type="button" className={styles.checkEscape} onClick={onReveal}>
          Lihat penjelasan
        </button>
      ) : null}
    </div>
  );
}
