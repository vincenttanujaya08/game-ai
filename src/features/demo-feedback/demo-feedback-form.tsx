"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { courseList } from "@/features/learn/courses";
import type { GameId } from "@/server/games/scoring";
import styles from "./demo-feedback.module.css";

const games: { id: GameId; title: string }[] = [
  { id: "sitasi-bermasalah", title: "Sitasi Bermasalah" },
  { id: "kamera-rusak", title: "Kamera yang Rusak" },
];

export function DemoFeedbackForm() {
  const [courseRatings, setCourseRatings] = useState<Record<string, number>>({});
  const [courseComments, setCourseComments] = useState<Record<string, string>>({});
  const [gameRatings, setGameRatings] = useState<Record<string, { usefulness: number; clarity: number; comment: string }>>(
    Object.fromEntries(games.map(({ id }) => [id, { usefulness: 0, clarity: 0, comment: "" }])),
  );
  const [status, setStatus] = useState<"ready" | "saving" | "saved" | "error">("ready");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    try {
      const response = await fetch("/api/demo-feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          courses: courseList.map(({ id }) => ({ id, rating: courseRatings[id], comment: courseComments[id] ?? "" })),
          games: games.map(({ id }) => ({ id, usefulnessRating: gameRatings[id].usefulness, clarityRating: gameRatings[id].clarity, comment: gameRatings[id].comment })),
        }),
      });
      if (!response.ok) throw new Error("SAVE_FAILED");
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  const ratingChoices = (name: string, value: number, onChange: (rating: number) => void) => (
    <fieldset className={styles.rating}>
      <legend>{name}</legend>
      <div className={styles.ratingChoices}>{[1, 2, 3, 4, 5].map((rating) => <label key={rating}>
        <input type="radio" name={name} value={rating} checked={value === rating} onChange={() => onChange(rating)} required />
        <span>{rating}</span>
      </label>)}</div>
      <div className={styles.scaleHint}><span>Kurang</span><span>Sangat</span></div>
    </fieldset>
  );

  return <main className={styles.page}>
    <header><Link href="/">NUSA Lab</Link><span>Feedback demo</span></header>
    <section className={styles.intro}>
      <p className={styles.eyebrow}>MASUKAN PESERTA DEMO</p>
      <h1>Ceritakan pengalamanmu.</h1>
      <p>Nilai setiap course dan game yang sudah kamu coba. Setelah dikirim, semua course dan game di akunmu akan ditandai selesai.</p>
    </section>
    {status === "saved" ? <section className={styles.success} role="status">
      <h2>Feedback tersimpan.</h2><p>Semua course dan game sudah ditandai selesai di akunmu.</p>
      <Link href="/profile">Lihat profil →</Link>
    </section> : <form onSubmit={submit}>
      <h2>Course</h2>
      {courseList.map((course) => <section className={styles.item} key={course.id}>
        <h3>{course.title}</h3>
        {ratingChoices(`Seberapa bermanfaat ${course.title}?`, courseRatings[course.id] ?? 0, (rating) => setCourseRatings((current) => ({ ...current, [course.id]: rating })))}
        <label className={styles.comment}>Komentar (opsional)<textarea maxLength={500} value={courseComments[course.id] ?? ""} onChange={(event) => setCourseComments((current) => ({ ...current, [course.id]: event.target.value }))} /></label>
      </section>)}
      <h2>Game</h2>
      {games.map((game) => <section className={styles.item} key={game.id}>
        <h3>{game.title}</h3>
        {ratingChoices(`Seberapa bermanfaat ${game.title}?`, gameRatings[game.id].usefulness, (usefulness) => setGameRatings((current) => ({ ...current, [game.id]: { ...current[game.id], usefulness } })))}
        {ratingChoices(`Seberapa jelas ${game.title}?`, gameRatings[game.id].clarity, (clarity) => setGameRatings((current) => ({ ...current, [game.id]: { ...current[game.id], clarity } })))}
        <label className={styles.comment}>Komentar (opsional)<textarea maxLength={500} value={gameRatings[game.id].comment} onChange={(event) => setGameRatings((current) => ({ ...current, [game.id]: { ...current[game.id], comment: event.target.value } }))} /></label>
      </section>)}
      {status === "error" ? <p className={styles.error} role="alert">Feedback belum tersimpan. Coba kirim lagi.</p> : null}
      <button className={styles.submit} type="submit" disabled={status === "saving"}>{status === "saving" ? "Menyimpan…" : "Kirim feedback dan tandai selesai"}</button>
    </form>}
  </main>;
}
