import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/features/learn/yes-man-pilot.module.css";
import pilotStyles from "@/features/learn/ai-fundamentals-pilot.module.css";

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <main
      data-nusa-theme="light"
      className={`${pilotStyles.shell} ${pilotStyles.hub}`}
    >
      <div className={`${styles.pilot} ${pilotStyles.hubContainer}`}>
        <header className={pilotStyles.hubHeader}>
          <span className={pilotStyles.wordmark}>
            NUSA <span>Lab</span>
          </span>
        </header>
        <p className={styles.kicker}>PRATINJAU MATERI</p>
        <h1 className={pilotStyles.title}>Mau belajar yang mana?</h1>
        <p>
          Pilih satu materi. Kamu bisa jeda dan melanjutkannya nanti di browser
          ini.
        </p>
        <div className={pilotStyles.courseList}>
          <Link
            href="/dev/yes-man-pilot/ai-fundamentals"
            className={pilotStyles.course}
          >
            <div
              className={`${pilotStyles.courseVisual} ${pilotStyles.fundamentalsCover}`}
              aria-hidden="true"
            >
              <div className={pilotStyles.miniInput} />
              <span className={pilotStyles.visualConnector}>→</span>
              <div className={pilotStyles.miniNetwork}>
                <i />
                <i />
                <i />
              </div>
              <span className={pilotStyles.visualConnector}>→</span>
              <div className={pilotStyles.miniOutput}>
                <i />
                <i />
                <i />
              </div>
            </div>
            <span className={styles.kicker}>KURSUS 01 · DASAR AI</span>
            <h2>AI Fundamentals</h2>
            <p>
              Kenali kemampuan AI, pahami dasar cara kerjanya, lalu coba
              memeriksa hasil dan sarannya.
            </p>
            <small>3 pelajaran · bisa dicicil</small>
            <strong>Buka materi →</strong>
          </Link>
          <Link
            href="/dev/yes-man-pilot/prompt-engineering"
            className={pilotStyles.course}
          >
            <div
              className={`${pilotStyles.courseVisual} ${pilotStyles.promptCover}`}
              aria-hidden="true"
            >
              <div className={pilotStyles.miniPrompt}>
                <i />
                <i />
              </div>
              <div className={pilotStyles.miniAnswer}>
                <i />
                <i />
                <i />
              </div>
            </div>
            <span className={styles.kicker}>
              KURSUS 02 · PROMPT ENGINEERING
            </span>
            <h2>Prompt Engineering</h2>
            <p>
              Coba menyampaikan kebutuhan, memilih detail, memberi contoh, dan
              memperbaiki jawaban AI.
            </p>
            <small>12 bagian</small>
            <strong>Buka materi →</strong>
          </Link>
          <Link
            href="/dev/yes-man-pilot/vibe-coding"
            className={pilotStyles.course}
          >
            <div
              className={`${pilotStyles.courseVisual} ${pilotStyles.promptCover}`}
              aria-hidden="true"
            >
              <span
                style={{
                  font: "42px ui-monospace, monospace",
                  color: "#08766d",
                }}
              >
                25:00
              </span>
            </div>
            <span className={styles.kicker}>KURSUS 03 · VIBE CODING</span>
            <h2>Vibe Coding</h2>
            <p>
              Bikin aplikasi dengan AI, tapi tetap tahu apa yang sedang terjadi
            </p>
            <small>12 bagian · simulasi timer belajar</small>
            <strong>Buka materi →</strong>
          </Link>
        </div>
        <p className={styles.hint}>
          Semua respons latihan sudah disiapkan sebagai simulasi.
        </p>
      </div>
    </main>
  );
}
