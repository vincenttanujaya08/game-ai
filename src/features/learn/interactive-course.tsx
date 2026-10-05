"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { courses, type CourseId } from "./courses";
import { completeInteractiveCourse } from "./progress";
import promptStyles from "./prompt-engineering-pilot.module.css";
import styles from "./yes-man-pilot.module.css";

const AiFundamentals = dynamic(() =>
  import("./ai-fundamentals-pilot").then(
    (module) => module.AiFundamentalsPilot,
  ),
);
const PromptEngineering = dynamic(() =>
  import("./yes-man-pilot").then((module) => module.YesManPilot),
);
const VibeCoding = dynamic(() =>
  import("./vibe-coding-pilot").then((module) => module.VibeCodingPilot),
);

export function InteractiveCourse({
  course: courseId,
  userId,
}: {
  course: CourseId;
  userId: string;
}) {
  const course = courses[courseId];
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function finish() {
    setSaving(true);
    setError(false);
    try {
      const next = await completeInteractiveCourse(course, userId);
      router.push(next);
    } catch {
      setError(true);
      setSaving(false);
    }
  }

  const completion = (
    <div className={styles.actions}>
      {error && (
        <p role="alert">
          Progres belum tersimpan di akun. Coba lagi sebelum membuka post-test.
        </p>
      )}
      <button
        className={styles.primary}
        type="button"
        disabled={saving}
        onClick={finish}
      >
        {saving ? "Menyimpan progres…" : "Simpan progres dan lanjut →"}
      </button>
    </div>
  );
  // Keep personal drafts separate for each signed-in account and from previews.
  const storageKey = `nusa-interactive-v1:${userId}:${courseId}`;
  if (courseId === "ai-fundamentals")
    return (
      <AiFundamentals
        storageKey={storageKey}
        backHref="/learn"
        completion={completion}
      />
    );
  if (courseId === "vibe-coding")
    return (
      <VibeCoding
        storageKey={storageKey}
        backHref="/learn"
        completion={completion}
      />
    );
  return (
    <main data-nusa-theme="light" className={promptStyles.shell}>
      <header className={promptStyles.header}>
        <span className={promptStyles.wordmark}>
          NUSA <span>Lab</span>
        </span>
        <Link href="/learn">← Kembali ke daftar materi</Link>
      </header>
      <h1 className={promptStyles.previewTitle}>Prompt Engineering</h1>
      <PromptEngineering storageKey={storageKey} completion={completion} />
    </main>
  );
}
