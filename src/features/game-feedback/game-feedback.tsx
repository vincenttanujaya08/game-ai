"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { authConfigured } from "@/lib/supabase/client";
import type { GameId } from "@/server/games/scoring";
import styles from "./game-feedback.module.css";

const questions: Record<GameId, string> = {
  "sitasi-bermasalah": "Seberapa membantu game ini melatihmu memeriksa klaim berdasarkan sumber?",
  "kamera-rusak": "Seberapa membantu game ini melatihmu mengambil kesimpulan berdasarkan bukti?",
};

export function GameFeedback({ gameId, ready = true, theme = "light" }: { gameId: GameId; ready?: boolean; theme?: "light" | "dark" }) {
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "saved" | "error" | "login">("loading");
  const [score, setScore] = useState<number | null>(null);
  const [usefulness, setUsefulness] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [comment, setComment] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!authConfigured() || !ready) return;
    const controller = new AbortController();
    async function load() {
      try {
        const result = await fetch(`/api/game-results/${gameId}`, { method: "POST", signal: controller.signal });
        if (result.status === 401) { setStatus("login"); return; }
        if (!result.ok) throw new Error("RESULT_SAVE_FAILED");
        const stored = await result.json();
        const response = await fetch(`/api/game-feedback/${gameId}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("FEEDBACK_LOAD_FAILED");
        const { feedback } = await response.json();
        setScore(stored.score);
        if (feedback) { setUsefulness(feedback.usefulness_rating); setClarity(feedback.clarity_rating); setComment(feedback.comment ?? ""); }
        setStatus(feedback && !feedback.is_mock ? "saved" : "ready");
      } catch { if (!controller.signal.aborted) setStatus("error"); }
    }
    void load();
    return () => controller.abort();
  }, [gameId, ready, retry]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    try {
      const response = await fetch(`/api/game-feedback/${gameId}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ usefulnessRating: usefulness, clarityRating: clarity, comment }) });
      if (!response.ok) throw new Error("FEEDBACK_SAVE_FAILED");
      setStatus("saved");
    } catch { setStatus("error"); }
  }

  const configured = authConfigured();
  return <section className={styles.panel} data-theme={theme} aria-label="Rating game">
    <h2>Bagaimana pengalamanmu bermain?</h2>
    <p>Nilai manfaat belajar dan kejelasan game ini. Rating terpisah dari skor keputusanmu.</p>
    {score !== null ? <p className={styles.score}>Skor penyelesaian pertama tersimpan: <strong>{score}/100</strong></p> : null}
    {!configured || status === "login" ? <p>Masuk akun untuk menyimpan skor dan rating. <Link href={`/login?next=${encodeURIComponent("/games/" + gameId)}`}>Masuk akun →</Link></p> : <>
      {!ready || status === "loading" ? <p role="status">Menyiapkan penyimpanan skor dan rating…</p> : null}
      {status === "error" ? <p role="alert">Skor atau rating belum tersimpan. <button type="button" onClick={() => { setStatus("loading"); setRetry((value) => value + 1); }}>Coba lagi</button></p> : null}
      {score !== null ? <form onSubmit={submit}>
        {([ ["usefulness", questions[gameId], usefulness, setUsefulness], ["clarity", "Seberapa jelas instruksi dan penjelasan hasil game ini?", clarity, setClarity] ] as const).map(([name, question, selected, setSelected]) => <fieldset key={name} disabled={status === "saving"}>
          <legend>{question}</legend>
          <div className={styles.options}>{[1, 2, 3, 4, 5].map((value) => <label key={value}><input type="radio" name={name} value={value} checked={selected === value} onChange={() => { setSelected(value); setStatus("ready"); }} required /><span>{value}</span></label>)}</div>
          <small>{name === "usefulness" ? "1 = tidak membantu · 5 = sangat membantu" : "1 = tidak jelas · 5 = sangat jelas"}</small>
        </fieldset>)}
        <label className={styles.comment}>Komentar (opsional)<textarea value={comment} onChange={(event) => { setComment(event.target.value); setStatus("ready"); }} maxLength={500} placeholder="Apa yang paling membantu atau perlu diperbaiki?" disabled={status === "saving"} /></label>
        <div className={styles.actions}><button type="submit" disabled={status === "saving"}>{status === "saving" ? "Menyimpan…" : status === "saved" ? "Perbarui rating" : "Simpan rating"}</button><span role="status">{status === "saved" ? "Terima kasih, ratingmu tersimpan." : ""}</span></div>
      </form> : null}
    </>}
  </section>;
}
