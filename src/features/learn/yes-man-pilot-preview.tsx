"use client";

import { useState } from "react";
import { YesManPilot } from "./yes-man-pilot";

export function YesManPilotPreview() {
  const [done, setDone] = useState(false);
  return (
    <main data-nusa-theme="light" style={{ minHeight: "100dvh", padding: "40px 24px", background: "var(--paper)", color: "var(--ink)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1rem", margin: "0 0 24px" }}>Pratinjau · Jangan Biarkan AI Cuma Mengiyakan</h1>
        {done ? <p role="status">Pelajaran selesai. Pratinjau berhasil.</p> : <YesManPilot onAttempt={() => {}} onComplete={() => setDone(true)} />}
      </div>
    </main>
  );
}
