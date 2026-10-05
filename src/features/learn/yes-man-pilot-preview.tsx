"use client";

import Link from "next/link";
import { YesManPilot } from "./yes-man-pilot";
import ui from "./prompt-engineering-pilot.module.css";

export function YesManPilotPreview() {
  return (
    <main data-nusa-theme="light" className={ui.shell}>
      <header className={ui.header}>
        <span className={ui.wordmark}>
          NUSA <span>Lab</span>
        </span>
        <Link href="/dev/yes-man-pilot">← Kembali ke daftar materi</Link>
      </header>
      <h1 className={ui.previewTitle}>Pratinjau · Prompt Engineering</h1>
      <YesManPilot />
    </main>
  );
}
