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
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const submitted = result !== null;
  const complete = answers.every((answer) => answer !== null)
    && (kind === "pre" || reflection.trim().length >= 30);

  async function submit() {
    if (!complete || busy || submitted) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/assessments/${courseId}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, answers, ...(kind === "post" ? { reflection } : {}) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (kind === "pre") router.replace(course.lessonPath);
      else setResult({ score: data.score, total: data.total });
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error && reason.message === "REFLECTION_LENGTH"
        ? "Jawaban terbuka perlu 30–1.200 karakter."
        : "Jawaban belum tersimpan. Periksa koneksi, lalu coba kirim lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.page} data-nusa-theme="light">
      <header className={styles.top}><Link href={course.path}>← Peta pelajaran</Link><span>{course.title}</span></header>
      <section className={styles.content} aria-labelledby="assessment-title">
        <p className={styles.eyebrow}>{kind === "pre" ? "SEBELUM BELAJAR" : "LANGKAH TERAKHIR"}</p>
        <h1 id="assessment-title">{kind === "pre" ? "Cek titik awalmu." : "Coba gunakan yang sudah kamu pelajari."}</h1>
        <p className={styles.intro}>{kind === "pre"
          ? "Jawab lima pertanyaan singkat. Ini bukan ujian dan tidak ada nilai minimum—jawabanmu hanya menjadi titik awal sebelum masuk ke materi."
          : "Jawab empat soal pilihan ganda, lalu ceritakan singkat cara kamu menerapkan ide dari kelas ini. Skor menjadi umpan balik, bukan syarat selesai; jawaban terbuka disimpan sebagai refleksi dan tidak dinilai otomatis."}</p>

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
            {submitted && <p className={styles.feedback}>
              Jawaban paling tepat: <strong>{question.choices[question.answer]}</strong>. {answers[questionIndex] === question.answer ? "Pilihanmu sudah tepat. " : ""}{question.feedback}
            </p>}
          </fieldset>
        ))}

        {kind === "post" && <div className={styles.reflection}>
          <label htmlFor="assessment-reflection"><span>05</span>{assessment.reflection}</label>
          <textarea id="assessment-reflection" value={reflection} maxLength={1200} minLength={30} rows={4}
            disabled={submitted} onChange={(event) => setReflection(event.target.value)} />
          <small>{reflection.trim().length}/1.200 karakter · minimal 30</small>
        </div>}

        {error && <p className={styles.error} role="alert">{error}</p>}
        {submitted ? (
          <div className={styles.result} role="status">
            <strong>{kind === "post" ? `Jawaban tersimpan · ${result.score}/${result.total} pilihan tepat` : "Jawaban tersimpan."}</strong>
            <p>{kind === "post" ? "Kelas ini sudah selesai. Kamu bisa kembali ke peta belajar." : "Terima kasih. Sekarang materi kelas sudah terbuka."}</p>
            <Link href={course.path}>{kind === "post" ? "Kembali ke peta belajar" : "Lanjut ke materi"} →</Link>
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
