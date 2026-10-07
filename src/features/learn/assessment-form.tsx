"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { assessments } from "./assessments";
import { courses, type CourseId } from "./courses";
import styles from "./assessment.module.css";

export function AssessmentForm({ courseId, kind }: { courseId: CourseId; kind: "pre" | "post" }) {
  const router = useRouter();
  const course = courses[courseId];
  const assessment = assessments[courseId];
  const questions = kind === "pre" ? assessment.pre : assessment.post;
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [reflection, setReflection] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingSaved, setRatingSaved] = useState(false);
  const [ratingBusy, setRatingBusy] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  const needsReflection = kind === "post" && Boolean(assessment.reflection);
  const complete = answers.every((answer) => answer !== null)
    && (!needsReflection || reflection.trim().length >= 30);

  async function submit() {
    if (!complete || busy || submitted) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/assessments/${courseId}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, answers, ...(needsReflection ? { reflection } : {}) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (kind === "pre") {
        router.replace(course.lessonPath);
        router.refresh();
      } else setSubmitted(true);
    } catch (reason) {
      setError(reason instanceof Error && reason.message === "REFLECTION_LENGTH"
        ? "Jawaban terbuka perlu 30–1.200 karakter."
        : "Jawaban belum tersimpan. Periksa koneksi, lalu coba kirim lagi.");
    } finally {
      setBusy(false);
    }
  }

  async function submitRating() {
    if (rating === null || ratingBusy || ratingSaved) return;
    setRatingBusy(true);
    setRatingError(false);
    try {
      const response = await fetch(`/api/assessments/${courseId}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "rating", rating, comment: ratingComment }),
      });
      if (!response.ok) throw new Error("RATING_SAVE_FAILED");
      setRatingSaved(true);
    } catch {
      setRatingError(true);
    } finally {
      setRatingBusy(false);
    }
  }

  return (
    <main className={styles.page} data-nusa-theme="light">
      <header className={styles.top}><Link href={course.path}>← Peta pelajaran</Link><span>{course.title}</span></header>
      <section className={styles.content} aria-labelledby="assessment-title">
        <p className={styles.eyebrow}>{kind === "pre" ? "SEBELUM BELAJAR" : "LANGKAH TERAKHIR"}</p>
        <h1 id="assessment-title">{kind === "pre" ? "Cek titik awalmu." : "Coba gunakan yang sudah kamu pelajari."}</h1>
        <p className={styles.intro}>{kind === "pre"
          ? `Jawab ${questions.length} pertanyaan pilihan ganda. Jawabanmu menjadi titik awal sebelum masuk ke materi. Tidak ada nilai minimum untuk mulai belajar.`
          : `Jawab ${questions.length} pertanyaan pilihan ganda${needsReflection ? ", lalu ceritakan singkat cara kamu menerapkan ide dari kelas ini" : ""}. Jawabanmu disimpan untuk melihat perkembangan pemahaman. Tidak ada nilai minimum untuk menyelesaikan kelas.`}</p>

        {questions.map((question, questionIndex) => (
          <fieldset className={styles.question} key={question.prompt} disabled={submitted}>
            <legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{question.prompt}</legend>
            <div className={styles.choices}>
              {question.choices.map((choice, choiceIndex) => (
                <label key={choice} data-selected={answers[questionIndex] === choiceIndex || undefined}>
                  <input type="radio" name={`question-${questionIndex}`} checked={answers[questionIndex] === choiceIndex}
                    onChange={() => setAnswers((current) => current.map((answer, i) => i === questionIndex ? choiceIndex : answer))} />
                  <span>{choice}</span>
                </label>
              ))}
            </div>
            {submitted && courseId !== "ai-fundamentals" && <p className={styles.feedback}>
              Jawaban paling tepat: <strong>{question.choices[question.answer]}</strong>. {answers[questionIndex] === question.answer ? "Pilihanmu sudah tepat. " : ""}{question.feedback}
            </p>}
          </fieldset>
        ))}

        {needsReflection && <div className={styles.reflection}>
          <label htmlFor="assessment-reflection"><span>{String(questions.length + 1).padStart(2, "0")}</span>{assessment.reflection}</label>
          <textarea id="assessment-reflection" value={reflection} maxLength={1200} minLength={30} rows={4}
            disabled={submitted} onChange={(event) => setReflection(event.target.value)} />
          <small>{reflection.trim().length}/1.200 karakter · minimal 30</small>
        </div>}

        {error && <p className={styles.error} role="alert">{error}</p>}
        {submitted ? (
          <div className={styles.result}>
            <div role="status">
              <strong>Jawaban tersimpan.</strong>
              <p>{kind === "post" ? "Kelas ini sudah selesai. Kamu bisa kembali ke peta belajar." : "Terima kasih. Sekarang materi kelas sudah terbuka."}</p>
            </div>
            <Link href={course.path}>{kind === "post" ? "Kembali ke peta belajar" : "Lanjut ke materi"} →</Link>
            {kind === "post" && !ratingSaved ? <div className={styles.courseRating}>
              <h2>Beri rating untuk kelas ini</h2>
              <p>Masukanmu membantu kami memperbaiki materi. Rating ini hanya untuk kelas {course.title}.</p>
              <fieldset disabled={ratingBusy}>
                <legend>Seberapa bermanfaat kelas ini?</legend>
                <div className={styles.ratingChoices}>{[1, 2, 3, 4, 5].map((value) => <label key={value} data-selected={rating === value || undefined}>
                  <input type="radio" name="course-rating" value={value} checked={rating === value} onChange={() => setRating(value)} />{value}
                </label>)}</div>
              </fieldset>
              <label className={styles.ratingComment}>Komentar (opsional)<textarea value={ratingComment} maxLength={500} onChange={(event) => setRatingComment(event.target.value)} /></label>
              {ratingError && <p className={styles.error} role="alert">Rating belum tersimpan. Coba lagi.</p>}
              <button className={styles.submit} type="button" disabled={rating === null || ratingBusy} onClick={() => void submitRating()}>{ratingBusy ? "Menyimpan…" : "Kirim rating"}</button>
              <Link className={styles.skipRating} href={course.path}>Lewati untuk sekarang</Link>
            </div> : null}
            {kind === "post" && ratingSaved ? <p className={styles.ratingThanks} role="status">Terima kasih atas rating untuk kelas ini.</p> : null}
          </div>
        ) : (
          <button className={styles.submit} type="button" disabled={!complete || busy} onClick={() => void submit()}>
            {busy ? "Menyimpan…" : kind === "pre" ? "Kirim jawaban dan mulai belajar" : "Kirim post-test"} →
          </button>
        )}
      </section>
    </main>
  );
}
