import Link from "next/link";
import type { CourseConfig } from "./courses";
import { coursePractices, masteryOf } from "./mastery";
import type { LearnProgress } from "./progress";
import styles from "./fundamentals-reader.module.css";

type Props = { course: CourseConfig; progress: LearnProgress; postTestCompleted: boolean; onReview: (stageIndex: number, sectionIndex: number) => void };

export function LessonFinish({ course, progress, postTestCompleted, onReview }: Props) {
  const total = course.stages.length;
  const practices = coursePractices(course);
  const mastery = masteryOf(progress, practices);
  const attempted = practices.filter((ref) => progress.attempts[ref.key]);

  return (
    <section className={styles.finish}>
      <span className={styles.eyebrow}>{total} / {total} {postTestCompleted ? "KELAS SELESAI" : "MATERI DIBACA"}</span>
      <h1>{postTestCompleted ? course.finish.title : "Materi kelas sudah kamu baca."}</h1>
      <p>{postTestCompleted ? course.finish.body : "Tinggal satu langkah: kirim post-test singkat untuk menutup kelas. Jawaban terbukamu menjadi refleksi, bukan nilai otomatis."}</p>

      {attempted.length > 0 ? (
        <div className={styles.journal}>
          <span className={styles.eyebrow}>CATATAN KEPUTUSANMU</span>
          <p className={styles.journalLead}>
            {mastery.firstTry} dari {mastery.total} latihan tepat pada percobaan pertama.
            {mastery.solved < mastery.total ? " Sisanya masih bisa kamu coba lagi." : ""}
          </p>
          <ol>
            {attempted.map((ref) => {
              const attempt = progress.attempts[ref.key];
              const verdict = attempt.firstTryCorrect ? "tepat sejak awal" : attempt.solved ? "tepat setelah " + attempt.tries + "× mencoba" : "belum terjawab";
              return (
                <li key={ref.key} data-state={attempt.solved ? "solved" : "open"}>
                  <strong>{ref.question}</strong>
                  <em>{verdict}</em>
                  {/* Yang belum terjawab tidak dibuka alasannya, masih ada yang bisa dicoba. */}
                  <p>{attempt.solved ? ref.reason : "Latihan ini masih menunggu jawabanmu."}</p>
                  <button type="button" onClick={() => onReview(ref.stageIndex, ref.sectionIndex)}>
                    {attempt.solved ? "Buka bagian " + ref.section : "Coba lagi di bagian " + ref.section} →
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {postTestCompleted
        ? <Link href={course.finish.cta.href}>{course.finish.cta.label}</Link>
        : <Link href={`${course.path}/assessment?kind=post`}>Kerjakan post-test →</Link>}
    </section>
  );
}
