import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { courseList } from "@/features/learn/courses";
import { applyPostTestCompletion, normalizeProgress } from "@/features/learn/progress";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { SubmissionExport } from "./submission-export";
import styles from "./admin.module.css";

export const metadata = { title: "Admin · NUSA Lab" };

const usersPerPage = 1000;

async function listAuthUsers(db: NonNullable<ReturnType<typeof createAdminClient>>) {
  const users = [];
  for (let page = 1; ; page++) {
    const result = await db.auth.admin.listUsers({ page, perPage: usersPerPage });
    if (result.error) return { users: [], error: result.error };
    users.push(...result.data.users);
    if (result.data.users.length < usersPerPage) return { users, error: null };
  }
}

function number(value: number) {
  return value.toLocaleString("id-ID");
}

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) redirect("/login?next=/admin");
  const session = await createClient();
  const { data: { user } } = await session.auth.getUser();
  if (!user) redirect("/login?next=/admin");
  if (!isAdminEmail(user.email)) return <Notice>akses admin tidak tersedia untuk akun ini.</Notice>;

  const db = createAdminClient();
  if (!db) return <Notice>Tambahkan <code>SUPABASE_SERVICE_ROLE_KEY</code> di environment server untuk mengaktifkan dashboard.</Notice>;

  const [authUsersResult, registrationsResult, submissionsResult, feedbackResult, courseRatingsResult, progressResult, assessmentsResult, citationResult, cameraResult, gameResultsResult, gameRatingsResult] = await Promise.all([
    listAuthUsers(db),
    db.from("event_registrations").select("user_id,name,university,email,created_at").eq("event_id", "vibe-coding-challenge").order("created_at", { ascending: false }),
    db.from("event_submissions").select("user_id,project_name,summary,repository_url,demo_url,ai_tools,is_late,updated_at").eq("event_id", "vibe-coding-challenge").order("updated_at", { ascending: false }),
    db.from("event_feedback").select("user_id,feedback_version,teaching_rating,practice_rating,comment,updated_at").eq("event_id", "vibe-coding-challenge").order("updated_at", { ascending: false }),
    db.from("course_ratings").select("user_id,course_id,rating,comment,updated_at").order("updated_at", { ascending: false }),
    db.from("course_progress").select("user_id,course_id,progress"),
    db.from("course_assessments").select("user_id,course_id,post_test_completed_at"),
    db.from("game_sessions").select("user_id,snapshot").eq("id", "demo"),
    db.from("game_progress").select("user_id,completed").eq("game_id", "kamera-rusak"),
    db.from("game_results").select("user_id,game_id,score,is_mock"),
    db.from("game_ratings").select("user_id,game_id,usefulness_rating,clarity_rating,comment,is_mock"),
  ]);
  const queryError = registrationsResult.error || submissionsResult.error || feedbackResult.error || courseRatingsResult.error || progressResult.error || assessmentsResult.error;
  if (authUsersResult.error || queryError) return <Notice>Data dashboard belum bisa dimuat. Pastikan service role key dan skema Supabase sudah tersedia.</Notice>;

  const authUsers = authUsersResult.users;
  const registrations = (registrationsResult.data ?? []);
  const submissions = (submissionsResult.data ?? []);
  const allFeedback = (feedbackResult.data ?? []);
  const feedback = allFeedback.filter((item) => [2, 3].includes(item.feedback_version));
  const citation = (citationResult.data ?? []);
  const camera = (cameraResult.data ?? []);
  const gameError = citationResult.error || cameraResult.error;
  const gameResults = gameResultsResult.data ?? [];
  const gameRatings = gameRatingsResult.data ?? [];
  const gameMetricsError = gameResultsResult.error || gameRatingsResult.error;
  const gameStats = [
    { id: "sitasi-bermasalah", title: "Sitasi Bermasalah", rows: citation, completedIds: citation.filter((item) => item.snapshot && typeof item.snapshot === "object" && item.snapshot.status === "submitted").map((item) => item.user_id) },
    { id: "kamera-rusak", title: "Kamera yang Rusak", rows: camera, completedIds: camera.filter((item) => item.completed).map((item) => item.user_id) },
  ].map((game) => {
    const results = gameResults.filter((item) => item.game_id === game.id);
    const ratings = gameRatings.filter((item) => item.game_id === game.id);
    return { ...game, started: new Set([...game.rows, ...results].map((item) => item.user_id)).size, completed: new Set([...game.completedIds, ...results.map((item) => item.user_id)]).size, results, ratings };
  });
  const gamePlayers = new Set([...citation, ...camera, ...gameResults].map((item) => item.user_id)).size;
  const courseRatings = (courseRatingsResult.data ?? []);
  const progress = (progressResult.data ?? []);
  const assessments = (assessmentsResult.data ?? []);
  const registrationByUser = new Map(registrations.map((item) => [item.user_id, item]));
  const authUserById = new Map(authUsers.map((item) => [item.id, item]));
  const progressByCourseUser = new Map(progress.map((item) => [item.course_id + ":" + item.user_id, item]));
  const completedLearners = new Set<string>();
  const courseStats = courseList.map((course) => {
    const courseProgress = progress.filter((item) => item.course_id === course.id);
    const courseAssessments = assessments.filter((item) => item.course_id === course.id);
    const completed = courseAssessments.filter((item) => {
      const row = progressByCourseUser.get(course.id + ":" + item.user_id);
      const isComplete = applyPostTestCompletion(normalizeProgress(row?.progress, course), course, Boolean(item.post_test_completed_at)).completedStages.length === course.stages.length;
      if (isComplete) completedLearners.add(item.user_id);
      return isComplete;
    }).length;
    return { course, participants: courseProgress.length, completed, ongoing: courseProgress.length - completed, ratings: courseRatings.filter((item) => item.course_id === course.id) };
  });
  const activeLearners = new Set(progress.map((item) => item.user_id)).size;
  const completedCourses = courseStats.reduce((sum, item) => sum + item.completed, 0);
  const mean = (values: (number | null)[]) => {
    const ratings = values.filter((item): item is number => typeof item === "number");
    return ratings.length ? (ratings.reduce((sum, item) => sum + item, 0) / ratings.length).toFixed(1) : "—";
  };
  const courseTitle = new Map(courseList.map((course) => [course.id, course.title]));

  const submittedUserIds = new Set(submissions.map((item) => item.user_id));
  const awaitingSubmissions = allFeedback.filter((item) => !submittedUserIds.has(item.user_id)).length;
  const date = (value: string) => new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });

  return <main className={styles.dashboard} data-nusa-theme="light">
    <AdminHeader />
    <div className={styles.page} id="ringkasan">
      <header className={styles.header}>
        <div><h1>Ringkasan NUSA Lab</h1><p>Akun, aktivitas belajar, dan perjalanan peserta event.</p></div>
        <Link className={styles.refresh} href="/admin">Muat ulang data</Link>
      </header>

      <section aria-label="Metrik utama" className={styles.stats}>
        <Metric label="Akun terdaftar" value={number(authUsers.length)} detail="Semua akun yang sudah dibuat" />
        <Metric label="Peserta course" value={number(activeLearners)} detail="Orang yang mulai belajar" />
        <Metric label="Pemain game" value={gameError ? "—" : number(gamePlayers)} detail={gameError ? "Progres game belum bisa dimuat" : "Orang dengan progres game tersimpan"} />
        <Metric label="Karya event" value={number(submissions.length)} detail="Project sudah dikirim" />
      </section>

      <div className={styles.eventGrid} id="event">
        <section className={styles.panel} aria-labelledby="event-title">
          <div className={styles.panelHeading}><h2 id="event-title">Perjalanan peserta event</h2><Link href="/events/vibe-coding-challenge">Vibe Coding Challenge</Link></div>
          <ol className={styles.steps}>
            <EventStep order="01" label="Mendaftar event" value={registrations.length} detail="orang terdaftar" />
            <EventStep order="02" label="Mengisi feedback" value={allFeedback.length} detail={"dari " + number(registrations.length) + " pendaftar"} />
            <EventStep order="03" label="Mengirim karya" value={submissions.length} detail={"dari " + number(registrations.length) + " pendaftar"} />
          </ol>
          <p className={styles.flowNote}>{allFeedback.length === 0 ? "Peserta mengisi feedback sebelum mengirim karya." : awaitingSubmissions > 0 ? number(awaitingSubmissions) + " peserta sudah mengisi feedback, tetapi belum mengirim karya." : "Semua peserta yang mengisi feedback sudah mengirim karya."}</p>
        </section>

        <section className={styles.panel} aria-labelledby="benefits-title">
          <div className={styles.panelHeading}><h2 id="benefits-title">Manfaat pembelajaran</h2><p>{feedback.length ? "Rata-rata dari " + number(feedback.length) + " jawaban peserta." : "Belum ada jawaban peserta."}</p></div>
          <dl className={styles.ratings}>
            <div><dt>Memahami materi</dt><dd>{mean(feedback.map((item) => item.teaching_rating))}<small>/ 5</small></dd></div>
            <div><dt>Membuat project</dt><dd>{mean(feedback.map((item) => item.practice_rating))}<small>/ 5</small></dd></div>
          </dl>
          <p className={styles.note}>Pembelajaran di kelas atau website NUSA Lab. <a href="#feedback">Lihat jawaban peserta →</a></p>
        </section>
      </div>

      <div className={styles.activityGrid} id="aktivitas">
        <section className={styles.panel} aria-labelledby="courses-title">
          <div className={styles.panelHeading}><h2 id="courses-title">Course</h2><p>Peserta berdasarkan progres belajar.</p></div>
          <div className={`${styles.tableWrap} ${styles.compactTable}`}>
            <table>
              <thead><tr><th>Course</th><th>Peserta</th><th>Selesai</th><th>Masih belajar</th><th>Rating manfaat /5</th></tr></thead>
              <tbody>{courseStats.map(({ course, participants, completed, ongoing, ratings }) => <tr key={course.id}>
                <th scope="row">{course.title}</th><td>{number(participants)}</td><td>{number(completed)}</td><td>{number(ongoing)}</td><td>{mean(ratings.map((item) => item.rating))}<small>{number(ratings.length)} rating</small></td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className={styles.note}>{number(completedLearners.size)} orang tuntas minimal satu course · {number(completedCourses)} course selesai. Satu orang bisa mengikuti beberapa course.</p>
          {courseRatings.length > 0 ? <details className={styles.details}>
            <summary>Rincian rating manfaat dan komentar per peserta ({number(courseRatings.length)})</summary>
            <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Course</th><th>Rating</th><th>Komentar</th></tr></thead><tbody>
              {courseRatings.map((item) => <tr key={item.user_id + item.course_id}><td>{registrationByUser.get(item.user_id)?.name ?? authUserById.get(item.user_id)?.email ?? "Pengguna"}</td><td>{courseTitle.get(item.course_id) ?? item.course_id}</td><td>{item.rating}/5</td><td>{item.comment || "—"}</td></tr>)}
            </tbody></table></div>
          </details> : null}
        </section>

        <section className={styles.panel} aria-labelledby="games-title">
          <div className={styles.panelHeading}><h2 id="games-title">Game</h2><p>Penyelesaian berdasarkan progres game.</p></div>
          {gameError ? <p className={styles.note} role="alert">Progres game belum bisa dimuat. Coba muat ulang data.</p> : <div className={`${styles.tableWrap} ${styles.compactTable} ${styles.gameTable}`}>
            <table><thead><tr><th>Game</th><th>Pemain</th><th>Selesai</th><th>Skor /100</th><th>Manfaat /5</th><th>Kejelasan /5</th></tr></thead><tbody>
              {gameStats.map((game) => <tr key={game.title}><th scope="row">{game.title}</th><td>{number(game.started)}</td><td>{number(game.completed)}</td><td>{mean(game.results.map((item) => item.score))}<small>{number(game.results.length)} skor</small></td><td>{mean(game.ratings.map((item) => item.usefulness_rating))}<small>{number(game.ratings.length)} jawaban</small></td><td>{mean(game.ratings.map((item) => item.clarity_rating))}<small>{number(game.ratings.length)} jawaban</small></td></tr>)}
            </tbody></table>
          </div>}
          <p className={styles.note}>Skor keputusan memakai penyelesaian pertama yang tersimpan (0–100). Manfaat dan kejelasan memakai rating setelah game (1–5). Rating event tidak menandai penyelesaian course atau game.</p>
          {gameStats.map((game) => game.results.length ? <details className={styles.details} key={game.id}>
            <summary>Rincian skor dan rating {game.title} ({number(game.results.length)} peserta)</summary>
            <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Skor keputusan /100</th><th>Manfaat /5</th><th>Kejelasan /5</th><th>Komentar</th></tr></thead><tbody>
              {game.results.map((result) => {
                const rating = game.ratings.find((item) => item.user_id === result.user_id);
                const name = registrationByUser.get(result.user_id)?.name ?? authUserById.get(result.user_id)?.email ?? "Pengguna";
                return <tr key={result.user_id}><th scope="row">{name}</th><td className={styles.rating}>{result.score}/100</td><td>{rating ? `${rating.usefulness_rating}/5` : "—"}</td><td>{rating ? `${rating.clarity_rating}/5` : "—"}</td><td>{rating?.comment || "—"}</td></tr>;
              })}
            </tbody></table></div>
          </details> : null)}
          {gameMetricsError ? <p className={styles.note} role="alert">Skor dan rating game belum bisa dimuat. Pastikan migrasi game sudah dijalankan.</p> : null}
          {gameResults.some((item) => item.is_mock) || gameRatings.some((item) => item.is_mock) ? <p className={styles.note}>Termasuk {number(gameResults.filter((item) => item.is_mock).length)} skor dan {number(gameRatings.filter((item) => item.is_mock).length)} rating mock untuk uji tampilan.</p> : null}
        </section>
      </div>

      <section className={styles.panel} id="karya" aria-labelledby="submissions-title">
        <div className={`${styles.panelHeading} ${styles.submissionHeading}`}><div><h2 id="submissions-title">Karya peserta</h2><p>Project yang sudah dikirim ke Vibe Coding Challenge.</p></div><SubmissionExport rows={submissions.map((item) => {
          const registration = registrationByUser.get(item.user_id);
          return { name: registration?.name ?? null, university: registration?.university ?? null, projectName: item.project_name, summary: item.summary, aiTools: item.ai_tools, demoUrl: item.demo_url, repositoryUrl: item.repository_url, late: item.is_late };
        })} /></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Project</th><th>Tautan</th><th>Diperbarui</th></tr></thead><tbody>
          {submissions.map((item) => {
            const registration = registrationByUser.get(item.user_id);
            return <tr key={item.user_id}>
              <td><strong>{registration?.name ?? "—"}</strong><small>{registration?.university}</small></td>
              <td><strong>{item.project_name}</strong>{item.is_late ? <small className={styles.lateFlag}>Terlambat</small> : null}<details className={styles.projectDetails}><summary>Ringkasan dan proses AI</summary><p>{item.summary}</p><p><strong>Alat AI:</strong> {item.ai_tools}</p></details></td>
              <td><div className={styles.links}><a href={item.demo_url} target="_blank" rel="noreferrer">Demo ↗</a><a href={item.repository_url} target="_blank" rel="noreferrer">GitHub ↗</a></div></td>
              <td className={styles.date}>{date(item.updated_at)}</td>
            </tr>;
          })}
          {submissions.length === 0 ? <tr><td colSpan={4} className={styles.empty}>Belum ada karya yang dikirim.</td></tr> : null}
        </tbody></table></div>
      </section>

      <section className={styles.panel} id="feedback" aria-labelledby="feedback-title">
        <div className={styles.panelHeading}><h2 id="feedback-title">Jawaban feedback peserta</h2><p>Manfaat pembelajaran di kelas atau website. Skala 1 = tidak membantu, 5 = sangat membantu.</p></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Memahami materi</th><th>Membuat project</th><th>Komentar</th><th>Tanggal</th></tr></thead><tbody>
          {feedback.map((item) => <tr key={item.user_id}><td><strong>{registrationByUser.get(item.user_id)?.name ?? "—"}</strong></td><td className={styles.rating}>{item.teaching_rating}/5</td><td className={styles.rating}>{item.practice_rating}/5</td><td>{item.comment || "—"}</td><td className={styles.date}>{date(item.updated_at)}</td></tr>)}
          {feedback.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada feedback pembelajaran.</td></tr> : null}
        </tbody></table></div>
      </section>

      <details className={styles.registrationDetails}>
        <summary>Daftar pendaftar event</summary>
        <div className={styles.tableWrap}><table><thead><tr><th>Nama</th><th>Email</th><th>Kampus</th><th>Feedback</th><th>Karya</th></tr></thead><tbody>
          {registrations.map((item) => {
            const hasFeedback = allFeedback.some((response) => response.user_id === item.user_id);
            const hasSubmission = submittedUserIds.has(item.user_id);
            return <tr key={item.user_id}><td>{item.name}</td><td>{item.email}</td><td>{item.university}</td><td><span className={hasFeedback ? styles.statusDone : styles.statusPending}>{hasFeedback ? "Sudah diisi" : "Belum diisi"}</span></td><td><span className={hasSubmission ? styles.statusDone : styles.statusPending}>{hasSubmission ? "Sudah dikirim" : "Belum dikirim"}</span></td></tr>;
          })}
          {registrations.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada pendaftar.</td></tr> : null}
        </tbody></table></div>
      </details>
      <footer className={styles.footer}>Data akun yang tersimpan di NUSA Lab.<span>Admin: {user.email}</span></footer>
    </div>
  </main>;
}

function AdminHeader() {
  return <header className={styles.topbar}><div className={styles.topbarInner}>
    <Link className={styles.brand} href="/admin">NUSA Lab</Link>
    <nav aria-label="Navigasi dashboard"><a href="#ringkasan">Ringkasan</a><a href="#event">Event</a><a href="#aktivitas">Course &amp; Game</a><a href="#karya">Karya</a></nav>
    <Link className={styles.websiteLink} href="/">Kembali ke website →</Link>
  </div></header>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className={styles.metric}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function EventStep({ order, label, value, detail }: { order: string; label: string; value: number; detail: string }) {
  return <li className={styles.step}><span className={styles.stepOrder}>{order}</span><div><h3>{label}</h3><strong>{number(value)}</strong><p>{detail}</p></div></li>;
}

function Notice({ children }: { children: ReactNode }) {
  return <main className={styles.dashboard} data-nusa-theme="light"><AdminHeader /><div className={styles.notice}>{children}</div></main>;
}
