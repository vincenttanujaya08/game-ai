import Link from "next/link";
import { redirect } from "next/navigation";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import { courseList } from "@/features/learn/courses";
import { normalizeProgress } from "@/features/learn/progress";
import { displayName } from "@/lib/auth/display-name";
import { createClient } from "@/lib/supabase/server";
import styles from "./profile.module.css";

export const metadata = { title: "Profil · NUSA Lab" };

export default async function ProfilePage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) redirect("/login");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const [{ data: rows, error: courseError }, { data: game, error: gameError }, { data: camera, error: cameraError }] = await Promise.all([
    supabase.from("course_progress").select("course_id,progress").eq("user_id", user.id),
    supabase.from("game_sessions").select("snapshot").eq("user_id", user.id).eq("id", "demo").maybeSingle(),
    supabase.from("game_progress").select("completed").eq("user_id", user.id).eq("game_id", "kamera-rusak").maybeSingle(),
  ]);

  const citationStatus = gameError ? "Progres tidak tersedia" : game?.snapshot && typeof game.snapshot === "object" && "status" in game.snapshot && game.snapshot.status === "submitted" ? "Selesai" : game ? "Sedang berjalan" : "Belum dimulai";
  const cameraStatus = cameraError ? "Progres tidak tersedia" : camera?.completed ? "Selesai" : camera ? "Sedang berjalan" : "Belum dimulai";

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader />
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>AKUN NUSA LAB</p>
        <h1>Profil</h1>
        <p className={styles.name}>{displayName(user)}</p>
        <p className={styles.email}>{user.email}</p>
      </header>

      {(courseError || gameError || cameraError) && <p className={styles.error} role="alert">Sebagian progres belum bisa dimuat. Coba buka ulang halaman ini.</p>}

      <section className={styles.section} aria-labelledby="courses-title">
        <div className={styles.sectionHeading}><h2 id="courses-title">Kelas</h2><p>Pilih kelas untuk melanjutkan belajar.</p></div>
        <ul className={styles.list}>{courseList.map((course) => {
          const row = rows?.find((item) => item.course_id === course.id);
          const progress = normalizeProgress(row?.progress, course);
          return <li key={course.id}>
            <Link href={course.path}><strong>{course.title}</strong><span>{courseError ? "Progres tidak tersedia" : `${progress.completedStages.length} dari ${course.stages.length} pelajaran selesai`}</span><span className={styles.arrow} aria-hidden="true">→</span></Link>
          </li>;
        })}</ul>
      </section>

      <section className={styles.section} aria-labelledby="games-title">
        <div className={styles.sectionHeading}><h2 id="games-title">Game</h2></div>
        <ul className={styles.list}>
          <li><Link href="/games/sitasi-bermasalah"><strong>Sitasi Bermasalah</strong><span>{citationStatus}</span><span className={styles.arrow} aria-hidden="true">→</span></Link></li>
          <li><Link href="/games/kamera-rusak"><strong>Kamera yang Rusak</strong><span>{cameraStatus}</span><span className={styles.arrow} aria-hidden="true">→</span></Link></li>
        </ul>
      </section>
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
