import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import { courseList } from "@/features/learn/courses";
import { applyPostTestCompletion, normalizeProgress } from "@/features/learn/progress";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
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

function percentage(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
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

  const [authUsersResult, registrationsResult, submissionsResult, feedbackResult, courseRatingsResult, progressResult, assessmentsResult] = await Promise.all([
    listAuthUsers(db),
    db.from("event_registrations").select("user_id,name,university,email,created_at").eq("event_id", "vibe-coding-challenge").order("created_at", { ascending: false }),
    db.from("event_submissions").select("user_id,project_name,summary,repository_url,demo_url,ai_tools,updated_at").eq("event_id", "vibe-coding-challenge").order("updated_at", { ascending: false }),
    db.from("event_feedback").select("user_id,material_rating,game_rating,comment,updated_at").eq("event_id", "vibe-coding-challenge").order("updated_at", { ascending: false }),
    db.from("course_ratings").select("user_id,course_id,rating,comment,updated_at").order("updated_at", { ascending: false }),
    db.from("course_progress").select("user_id,course_id,progress"),
    db.from("course_assessments").select("user_id,course_id,pre_test_completed_at,post_test_completed_at"),
  ]);
  const queryError = registrationsResult.error || submissionsResult.error || feedbackResult.error || courseRatingsResult.error || progressResult.error || assessmentsResult.error;
  if (authUsersResult.error || queryError) return <Notice>Data dashboard belum bisa dimuat. Pastikan service role key dan skema Supabase sudah tersedia.</Notice>;

  const authUsers = authUsersResult.users;
  const registrations = registrationsResult.data ?? [];
  const submissions = submissionsResult.data ?? [];
  const feedback = feedbackResult.data ?? [];
  const courseRatings = courseRatingsResult.data ?? [];
  const progress = progressResult.data ?? [];
  const assessments = assessmentsResult.data ?? [];
  const registrationByUser = new Map(registrations.map((item) => [item.user_id, item]));
  const authUserById = new Map(authUsers.map((item) => [item.id, item]));
  const progressByCourseUser = new Map(progress.map((item) => [item.course_id + ":" + item.user_id, item]));
  const courseStats = courseList.map((course) => {
    const courseProgress = progress.filter((item) => item.course_id === course.id);
    const courseAssessments = assessments.filter((item) => item.course_id === course.id);
    const preTestCount = courseAssessments.filter((item) => item.pre_test_completed_at).length;
    const completed = courseAssessments.filter((item) => {
      const row = progressByCourseUser.get(course.id + ":" + item.user_id);
      return applyPostTestCompletion(normalizeProgress(row?.progress, course), course, Boolean(item.post_test_completed_at)).completedStages.length === course.stages.length;
    }).length;
    const ratings = courseRatings.filter((item) => item.course_id === course.id);
    const averageRating = ratings.length ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length : null;
    return { course, entered: courseProgress.length, preTestCount, completed, completionRate: percentage(completed, courseProgress.length), ratings: ratings.length, averageRating };
  });
  const activeLearners = new Set(progress.map((item) => item.user_id)).size;
  const completedCourses = courseStats.reduce((sum, item) => sum + item.completed, 0);
  const mean = (values: number[]) => values.length ? (values.reduce((sum, item) => sum + item, 0) / values.length).toFixed(1) : "—";
  const courseTitle = new Map(courseList.map((course) => [course.id, course.title]));

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.page}>
      <div className={styles.topline}>
        <Link href="/events/vibe-coding-challenge">← Vibe Coding Challenge</Link>
        <span className={styles.live}><i /> Data terbaru</span>
      </div>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>PUSAT OPERASIONAL · NUSA LAB</p><h1>Ringkasan aktivitas</h1><p className={styles.intro}>Pantau akun, perjalanan belajar, challenge, dan masukan peserta dalam satu tempat.</p></div>
        <div className={styles.updated}><span>Masuk sebagai</span><strong>{user.email}</strong></div>
      </header>

      <section aria-label="Metrik utama" className={styles.stats}>
        <Metric label="Akun terdaftar" value={number(authUsers.length)} detail="Semua akun Supabase Auth" accent="teal" />
        <Metric label="Peserta belajar" value={number(activeLearners)} detail={number(progress.length) + " course mulai tersimpan"} accent="blue" />
        <Metric label="Pendaftar challenge" value={number(registrations.length)} detail={percentage(registrations.length, authUsers.length) + "% dari seluruh akun"} accent="amber" />
        <Metric label="Karya terkumpul" value={number(submissions.length)} detail={percentage(submissions.length, registrations.length) + "% dari pendaftar"} accent="violet" />
      </section>

      <section className={styles.section} aria-labelledby="challenge-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>VIBE CODING CHALLENGE</p><h2 id="challenge-title">Perjalanan peserta</h2></div><span>{number(registrations.length)} pendaftar</span></div>
        <div className={styles.funnel}>
          <FunnelStep label="Mendaftar" value={registrations.length} total={registrations.length} />
          <FunnelStep label="Mengirim karya" value={submissions.length} total={registrations.length} />
          <FunnelStep label="Memberi rating" value={feedback.length} total={registrations.length} />
        </div>
        <div className={styles.feedbackStats}>
          <div><span>Rata-rata materi</span><strong>{mean(feedback.map((item) => item.material_rating))}<small>/5</small></strong></div>
          <div><span>Rata-rata game</span><strong>{mean(feedback.map((item) => item.game_rating))}<small>/5</small></strong></div>
          <div><span>Total masukan</span><strong>{number(feedback.length)}</strong></div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="courses-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>PEMBELAJARAN</p><h2 id="courses-title">Keterlibatan per course</h2></div><span>{number(completedCourses)} course selesai</span></div>
        <div className={styles.courseGrid}>
          {courseStats.map(({ course, entered, preTestCount, completed, completionRate, ratings, averageRating }) => <article className={styles.course} key={course.id}>
            <div className={styles.courseTop}><h3>{course.title}</h3><span>{number(entered)} mulai</span></div>
            <div className={styles.completion}><div><span>Tingkat selesai</span><strong>{completionRate}%</strong></div><div className={styles.bar}><i style={{ width: completionRate + "%" }} /></div></div>
            <div className={styles.courseFacts}><div><strong>{number(preTestCount)}</strong><span>pre-test</span></div><div><strong>{number(completed)}</strong><span>tuntas</span></div><div><strong>{averageRating === null ? "—" : averageRating.toFixed(1) + "/5"}</strong><span>{number(ratings)} rating</span></div></div>
          </article>)}
        </div>
        <p className={styles.note}>Course mulai dihitung saat progres tersimpan. Tuntas berarti semua pelajaran dan post-test selesai.</p>
      </section>

      <section className={styles.section} aria-labelledby="submissions-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>KARYA PESERTA</p><h2 id="submissions-title">Pengumpulan terbaru</h2></div><span>{number(submissions.length)} karya</span></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Karya</th><th>Ringkasan</th><th>Tautan</th><th>Terakhir diperbarui</th></tr></thead><tbody>
          {submissions.map((item) => {
            const registration = registrationByUser.get(item.user_id);
            return <tr key={item.user_id}><td>{registration?.name ?? "—"}<small>{registration?.email}</small><small>{registration?.university}</small></td><td><strong>{item.project_name}</strong><small>AI: {item.ai_tools}</small></td><td>{item.summary}</td><td className={styles.links}><a href={item.demo_url} target="_blank" rel="noreferrer">Demo ↗</a><a href={item.repository_url} target="_blank" rel="noreferrer">GitHub ↗</a></td><td>{new Date(item.updated_at).toLocaleDateString("id-ID")}</td></tr>;
          })}
          {submissions.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada karya yang dikirim.</td></tr> : null}
        </tbody></table></div>
      </section>

      <section className={styles.section} aria-labelledby="ratings-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>SUARA PESERTA</p><h2 id="ratings-title">Rating dan komentar course</h2></div><span>{number(courseRatings.length)} rating</span></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Course</th><th>Rating</th><th>Komentar</th><th>Tanggal</th></tr></thead><tbody>
          {courseRatings.map((item) => {
            const authUser = authUserById.get(item.user_id);
            const registration = registrationByUser.get(item.user_id);
            return <tr key={item.user_id + item.course_id}><td>{registration?.name ?? authUser?.user_metadata?.full_name ?? authUser?.email ?? "Pengguna"}<small>{registration?.email ?? authUser?.email}</small></td><td>{courseTitle.get(item.course_id) ?? item.course_id}</td><td><strong className={styles.rating}>★ {item.rating}/5</strong></td><td>{item.comment || "—"}</td><td>{new Date(item.updated_at).toLocaleDateString("id-ID")}</td></tr>;
          })}
          {courseRatings.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada rating course.</td></tr> : null}
        </tbody></table></div>
      </section>

      <section className={styles.section} aria-labelledby="registrations-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>DAFTAR PESERTA</p><h2 id="registrations-title">Pendaftar challenge</h2></div><span>{number(registrations.length)} peserta</span></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Nama</th><th>Email</th><th>Kampus</th><th>Tanggal daftar</th><th>Status karya</th></tr></thead><tbody>
          {registrations.map((item) => {
            const submitted = submissions.some((submission) => submission.user_id === item.user_id);
            return <tr key={item.user_id}><td><strong>{item.name}</strong></td><td>{item.email}</td><td>{item.university}</td><td>{new Date(item.created_at).toLocaleDateString("id-ID")}</td><td><span className={submitted ? styles.statusDone : styles.statusPending}>{submitted ? "Sudah mengirim" : "Belum mengirim"}</span></td></tr>;
          })}
          {registrations.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada pendaftar.</td></tr> : null}
        </tbody></table></div>
      </section>

      <section className={styles.section} aria-labelledby="feedback-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>EVALUASI CHALLENGE</p><h2 id="feedback-title">Masukan peserta</h2></div><span>{number(feedback.length)} tanggapan</span></div>
        <div className={styles.tableWrap}><table><thead><tr><th>Peserta</th><th>Materi</th><th>Game</th><th>Komentar</th><th>Tanggal</th></tr></thead><tbody>
          {feedback.map((item) => <tr key={item.user_id}><td>{registrationByUser.get(item.user_id)?.name ?? "—"}</td><td><span className={styles.rating}>★ {item.material_rating}/5</span></td><td><span className={styles.rating}>★ {item.game_rating}/5</span></td><td>{item.comment || "—"}</td><td>{new Date(item.updated_at).toLocaleDateString("id-ID")}</td></tr>)}
          {feedback.length === 0 ? <tr><td colSpan={5} className={styles.empty}>Belum ada masukan challenge.</td></tr> : null}
        </tbody></table></div>
      </section>
    </div>
  </main>;
}

function Metric({ label, value, detail, accent }: { label: string; value: string; detail: string; accent: "teal" | "blue" | "amber" | "violet" }) {
  return <article className={styles.metric} data-accent={accent}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

function FunnelStep({ label, value, total }: { label: string; value: number; total: number }) {
  const rate = percentage(value, total);
  return <div className={styles.funnelStep}><div><span>{label}</span><strong>{number(value)} <small>{rate}%</small></strong></div><div className={styles.bar}><i style={{ width: rate + "%" }} /></div></div>;
}

function Notice({ children }: { children: ReactNode }) {
  return <main className={landing.shell} data-nusa-theme="light"><NusaHeader active="event" /><p className={styles.notice}>{children}</p></main>;
}
