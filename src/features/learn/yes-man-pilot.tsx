"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  basePrompt,
  captionDemo,
  components,
  composePrompt,
  details,
  examples,
  followupDemo,
  followupOptions,
  habits,
  jogjaItineraries,
  reminders,
  taskSteps,
} from "./prompt-engineering-content";
import styles from "./yes-man-pilot.module.css";
import ui from "./prompt-engineering-pilot.module.css";
import {
  promptIntroduction,
  promptTheory,
  promptGlossary,
  type TheoryDetail,
} from "./prompt-engineering-theory";

function TheoryDetails({ detail }: { detail: TheoryDetail }) {
  const inline = (text: string) =>
    text
      .split(/(`[^`]+`)/g)
      .map((part, i) =>
        part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part,
      );
  return (
    <details className={styles.more}>
      <summary>{detail.title}</summary>
      {detail.blocks.map((block, i) => {
        if (block.kind === "list")
          return (
            <ul key={i}>
              {block.items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        if (block.kind === "table")
          return (
            <div className={styles.theoryTable} key={i}>
              <table>
                <caption className={styles.srOnly}>{detail.title}</caption>
                <thead>
                  <tr>
                    {block.rows[0].map((cell) => (
                      <th scope="col" key={cell}>
                        {inline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.slice(1).map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td key={k}>{inline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return <p key={i}>{inline(block.text)}</p>;
      })}
    </details>
  );
}

const titles = [
  "Pernah minta bantuan AI, tapi jawabannya kurang sesuai?",
  "Kalau jawabannya seperti ini, sudah bisa diposting?",
  "Apa yang berubah kalau prompt-nya lebih jelas?",
  "Detail mana yang perlu masuk ke prompt?",
  "Kalau sulit menjelaskan gayanya, beri contoh",
  "Belum tahu harus memberi informasi apa?",
  "Kalau tugasnya banyak, kerjakan bertahap",
  "Hasilnya belum pas? Sebutkan bagian yang ingin diubah",
  "Mau merangkum artikel? Jelaskan bahan yang harus dipakai",
  "Angkanya terlihat meyakinkan. Sumbernya ada?",
  "Kamu ingin minta bantuan AI untuk apa?",
  "Beberapa kebiasaan yang bisa kamu pakai",
];
const nextLabels = [
  "Lihat jawabannya →",
  "Coba ubah prompt-nya →",
  "Pilih detail yang perlu →",
  "Coba pakai contoh →",
  "Kalau detailnya belum lengkap? →",
  "Coba untuk pekerjaan yang lebih besar →",
  "Perbaiki jawaban yang kurang pas →",
  "Coba dengan bahan bacaan →",
  "Cek fakta dalam jawabannya →",
  "Sekarang coba sendiri →",
  "Lihat ringkasannya →",
  "Selesaikan materi →",
];
const issues = [
  [
    "Belum jelas untuk siapa",
    "Pembaca belum tahu workshop ini cocok untuk siapa. Menyebut bahwa acaranya untuk pemula bisa membantu AI membuat pembuka yang lebih sesuai.",
  ],
  [
    "Detail acaranya belum ada",
    "Waktu dan biaya acara belum disebutkan di prompt, jadi informasi itu belum muncul di caption.",
  ],
  [
    "Belum tahu harus daftar di mana",
    "Caption-nya mengajak orang mendaftar, tapi belum menjelaskan caranya. Kamu perlu menambahkan informasi pendaftaran.",
  ],
  [
    "Gaya bahasanya kurang cocok",
    "Kalau gayanya belum cocok, jelaskan seperti apa yang kamu mau. Misalnya lebih santai, lebih formal, atau cukup satu emoji.",
  ],
  [
    "Sudah cukup untuk kebutuhan saya",
    "Untuk ide awal, caption ini bisa dipakai. Kalau mau langsung diposting, cek dulu apakah pembaca sudah punya informasi yang cukup untuk ikut.",
  ],
];
const travelChoices = [
  [
    "Tempat atau kegiatan yang saya suka",
    "Orang yang suka kuliner mungkin memilih tempat berbeda dari orang yang ingin wisata budaya atau berjalan di alam.",
  ],
  [
    "Budget perjalanan saya",
    "Budget membantu menyesuaikan pilihan tempat, makanan, dan transportasi dengan kemampuanmu.",
  ],
  [
    "Area tempat saya menginap",
    "Lokasi menginap membantu menyusun rute agar kamu tidak perlu banyak bolak-balik.",
  ],
  [
    "Ketiganya bisa berpengaruh",
    "Ketiganya berguna. Minat membantu memilih kegiatan, budget menentukan pilihan yang terjangkau, dan lokasi menginap membantu menyusun rute.",
  ],
];
const claimChoices = [
  [
    "Cari survei aslinya dan cocokkan angkanya",
    "Cari survei aslinya dan cocokkan angkanya. Lihat siapa respondennya, kapan survei dilakukan, dan pertanyaan yang diajukan.",
  ],
  [
    "Minta AI menyebutkan nama lembaganya",
    "Kamu boleh meminta sumber kepada AI, tetapi tetap perlu membuka dan membaca sumbernya. Nama lembaga saja belum membuktikan angkanya benar.",
  ],
  [
    "Pakai langsung karena angkanya spesifik",
    "Angka yang terlihat spesifik tetap bisa salah atau dibuat-buat. Cari sumbernya dulu sebelum dipakai di presentasi.",
  ],
  [
    "Hapus klaimnya kalau sumbernya tidak ditemukan",
    "Kalau sumbernya tidak bisa ditemukan, lebih baik klaim ini tidak dipakai. Kamu bisa mencari data lain yang dapat diperiksa.",
  ],
];
const fieldLabels = [
  "Apa yang ingin kamu minta?",
  "Apa yang perlu AI tahu?",
  "Ada batasan yang perlu diikuti?",
  "Mau jawabannya dalam bentuk apa?",
  "Punya contoh?",
];
const fieldHints = [
  "",
  "Misalnya kemampuanmu sekarang, siapa pembacanya, bahan yang kamu punya, atau situasi yang perlu dipertimbangkan.",
  "Misalnya waktu, budget, panjang tulisan, sumber yang boleh dipakai, atau hal yang ingin kamu hindari.",
  "Misalnya tabel, langkah-langkah, tiga pilihan, atau draf singkat.",
  "Tambahkan kalau kamu ingin menunjukkan gaya atau susunan yang kamu suka.",
];
const fieldFeedback = [
  "Kamu bisa mencoba prompt ini, lalu melihat hasilnya. Kalau masih terlalu umum, tambahkan detail yang belum tersampaikan.",
  "Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?",
  "Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.",
  "Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.",
  "Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu.",
];
const article =
  "Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.";
const sourcePrompts = [
  "Tolong rangkum topik ini untuk presentasi saya.",
  `Tolong rangkum artikel di bawah ini menjadi lima poin untuk slide presentasi. Gunakan hanya informasi dari artikel. Kalau ada detail yang tidak disebutkan, tulis bahwa informasinya belum tersedia.\n\nArtikel:\n${article}`,
];
const sourceAnswers = [
  "Komunitas lokal mengadakan workshop AI gratis untuk pemula pada Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam. Workshop ini akan diikuti 100 peserta.",
  "1. Workshop AI diadakan oleh komunitas lokal.\n2. Workshop ditujukan untuk pemula.\n3. Peserta tidak dikenai biaya.\n4. Workshop berlangsung Sabtu pukul 10.00.\n5. Pendaftaran ditutup Jumat malam.\n\nLokasi acara belum tersedia dalam artikel.",
];
const sourceFeedback =
  "Prompt B menjelaskan artikel yang dipakai, bentuk ringkasan, dan batas sumbernya. Itu membantu mengarahkan jawaban, tetapi kamu tetap perlu mencocokkan hasilnya dengan artikel.";
const transferChecks = [
  "Tujuan berlatih berbicara",
  "Target tiga bulan",
  "Waktu sekitar 20 menit sehari",
  "Jadwal yang ringan dan bisa dijalankan",
  "Tidak terlalu banyak latihan tata bahasa",
  "Bentuk rencana yang mudah dipakai, kalau diperlukan",
];

const phaseCounts = [1, 1, 2, 7, 3, 3, 2, 2, 3, 1, 8, 1];
const phaseLabels: Record<number, string[]> = {
  2: ["Lihat perubahan jawabannya →"],
  3: [
    "Detail berikutnya →",
    "Detail berikutnya →",
    "Detail berikutnya →",
    "Detail berikutnya →",
    "Detail berikutnya →",
    "Lihat hasil pengelompokan →",
  ],
  4: ["Pilih contoh gaya →", "Lihat pesan yang mengikuti contoh →"],
  5: ["Coba minta AI bertanya →", "Lihat contoh rencananya →"],
  6: ["Lihat percakapannya →"],
  7: ["Lihat jawaban setelah diperbaiki →"],
  8: ["Lihat contoh jawabannya →", "Bandingkan arahannya →"],
  10: [
    "Tulis permintaanmu →",
    "Tambahkan konteks →",
    "Lanjut ke batasan →",
    "Lanjut ke bentuk jawaban →",
    "Lanjut ke contoh →",
    "Lihat saran untuk prompt ini",
    "Lanjut ke refleksi →",
  ],
};

type Session = {
  screen: number;
  phase: number;
  prediction: number | null;
  issues: number[];
  components: number[];
  tried: number[];
  sorted: (boolean | null)[];
  example: number | null;
  travel: number | null;
  interest: string;
  order: number[];
  ordered: boolean;
  followup: number[];
  sourcesSeen: number[];
  source: number | null;
  sourceChoice: number | null;
  claim: number | null;
  category: number | null;
  fields: string[];
  submitted: boolean;
  reflection: number | null;
  complete: boolean;
  transfer: string;
  transferSubmitted: boolean;
  checks: number[];
};
const initial: Session = {
  screen: 0,
  phase: 0,
  prediction: null,
  issues: [],
  components: [],
  tried: [],
  sorted: details.map(() => null),
  example: null,
  travel: null,
  interest: "",
  order: [2, 0, 1],
  ordered: false,
  followup: [],
  sourcesSeen: [],
  source: null,
  sourceChoice: null,
  claim: null,
  category: null,
  fields: ["", "", "", "", ""],
  submitted: false,
  reflection: null,
  complete: false,
  transfer: "",
  transferSubmitted: false,
  checks: [],
};
const storageKey = "prompt-engineering-v4-pilot";
function emit(
  name: string,
  screen: number,
  detail: Record<string, unknown> = {},
) {
  window.dispatchEvent(
    new CustomEvent("prompt-course-event", {
      detail: { name, screen: screen + 1, ...detail },
    }),
  );
}
function toggle(items: number[], id: number) {
  return items.includes(id)
    ? items.filter((item) => item !== id)
    : [...items, id];
}
const learningStages = [
  { title: "Susun permintaan", parts: "Bagian 1–4" },
  { title: "Perbaiki bersama", parts: "Bagian 5–8" },
  { title: "Periksa dan gunakan", parts: "Bagian 9–12" },
];
function PromptFrame({
  stage,
  children,
}: {
  stage: number | null;
  children: ReactNode;
}) {
  return (
    <div className={ui.layout} data-stage={stage}>
      <aside className={ui.rail} aria-label="Alur Prompt Engineering">
        <p className={ui.railCaption}>PROMPT ENGINEERING</p>
        <p className={ui.railTitle}>
          Dari permintaan
          <br />
          ke hasil yang sesuai.
        </p>
        <ol>
          {learningStages.map((item, i) => (
            <li
              key={item.title}
              aria-current={stage === i ? "step" : undefined}
            >
              <span className={ui.stageNumber} aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.parts}</small>
              </div>
            </li>
          ))}
        </ol>
      </aside>
      <div className={ui.body}>{children}</div>
    </div>
  );
}

function Bubble({
  label,
  children,
  answer = false,
}: {
  label: string;
  children: ReactNode;
  answer?: boolean;
}) {
  return (
    <section
      className={`${answer ? styles.answer : styles.prompt} ${answer ? ui.response : ui.request}`}
    >
      <h3>{label}</h3>
      <div className={styles.bubbleText}>{children}</div>
    </section>
  );
}
function Note({ children }: { children: ReactNode }) {
  return <p className={`${styles.note} ${ui.annotation}`}>{children}</p>;
}
function More({
  title = "Kalau penasaran",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className={styles.more}>
      <summary>{title}</summary>
      <p>{children}</p>
    </details>
  );
}
function Choice({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.choice} ${ui.choice}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span aria-hidden="true">{selected ? "✓" : "+"}</span>
      {text}
    </button>
  );
}

export function YesManPilot({ storageKey: sessionKey = storageKey, completion }: { storageKey?: string; completion?: ReactNode } = {}) {
  const [session, setSession] = useState<Session>(initial);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [lastComponent, setLastComponent] = useState<number | null>(null);
  const [removed, setRemoved] = useState(false);
  const [resultVersion, setResultVersion] = useState(0);
  const [started, setStarted] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const s = session;
  function patch(changes: Partial<Session>) {
    setSession((current) => ({ ...current, ...changes }));
  }
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(sessionKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Session;
          const ids = (value: unknown, max: number) =>
            Array.isArray(value) &&
            value.every((id) => Number.isInteger(id) && id >= 0 && id < max);
          const choice = (value: unknown, max: number) =>
            value === null ||
            (typeof value === "number" &&
              Number.isInteger(value) &&
              value >= 0 &&
              value < max);
          if (
            parsed &&
            Number.isInteger(parsed.screen) &&
            parsed.screen >= 0 &&
            parsed.screen < 12 &&
            (parsed.phase === undefined ||
              (Number.isInteger(parsed.phase) &&
                parsed.phase >= 0 &&
                parsed.phase < phaseCounts[parsed.screen])) &&
            choice(parsed.prediction, 2) &&
            ids(parsed.issues, 5) &&
            ids(parsed.components, 5) &&
            ids(parsed.tried, 5) &&
            Array.isArray(parsed.sorted) &&
            parsed.sorted.length === 6 &&
            parsed.sorted.every(
              (value) => value === null || typeof value === "boolean",
            ) &&
            choice(parsed.example, 3) &&
            choice(parsed.travel, 4) &&
            typeof parsed.interest === "string" &&
            ids(parsed.order, 3) &&
            parsed.order.length === 3 &&
            new Set(parsed.order).size === 3 &&
            ids(parsed.followup, 5) &&
            ids(parsed.sourcesSeen, 2) &&
            choice(parsed.source, 2) &&
            choice(parsed.sourceChoice, 2) &&
            choice(parsed.claim, 4) &&
            choice(parsed.category, 4) &&
            choice(parsed.reflection, 3) &&
            Array.isArray(parsed.fields) &&
            parsed.fields.length === 5 &&
            parsed.fields.every((field) => typeof field === "string") &&
            typeof parsed.transfer === "string" &&
            ids(parsed.checks, 6) &&
            [
              parsed.ordered,
              parsed.submitted,
              parsed.complete,
              parsed.transferSubmitted,
            ].every((value) => typeof value === "boolean")
          ) {
            setSession({
              ...parsed,
              phase: parsed.phase ?? 0,
              issues: parsed.issues.includes(4) ? [4] : parsed.issues,
            });
            setPaused(true);
            setStarted(true);
          }
        }
      } catch {
        /* Storage can be unavailable; the course still works in memory. */
      }
      setLoaded(true);
      emit("prompt_course_started", 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [sessionKey]);
  useEffect(() => {
    if (!loaded || !started) return;
    try {
      localStorage.setItem(sessionKey, JSON.stringify(session));
    } catch {
      /* No network fallback for personal drafts. */
    }
  }, [session, loaded, started, sessionKey]);
  useEffect(() => {
    if (loaded && !paused && !s.complete) {
      heading.current?.focus({ preventScroll: true });
      if (started)
        heading.current?.scrollIntoView({
          block: "start",
          behavior: "instant",
        });
    }
  }, [s.screen, s.phase, s.complete, paused, loaded, started]);

  function changeComponent(id: number) {
    const removing = s.components.includes(id);
    patch({
      components: toggle(s.components, id),
      tried: s.tried.includes(id) ? s.tried : [...s.tried, id],
    });
    setLastComponent(id);
    setRemoved(removing);
    setResultVersion((current) => current + 1);
    emit("prompt_component_toggled", s.screen, {
      component: id,
      enabled: !removing,
    });
  }
  const ready =
    s.screen === 0
      ? s.prediction !== null
      : s.screen === 1
        ? s.issues.length > 0
        : s.screen === 2
          ? s.phase > 0 || s.tried.length > 0
          : s.screen === 3
            ? s.phase === 6 || s.sorted[s.phase] !== null
            : s.screen === 4
              ? s.phase !== 1 || s.example !== null
              : s.screen === 5
                ? s.phase === 0
                  ? s.travel !== null
                  : s.phase === 1
                    ? Boolean(s.interest)
                    : true
                : s.screen === 6
                  ? s.phase > 0 || s.ordered
                  : s.screen === 7
                    ? s.phase > 0 || s.followup.length > 0
                    : s.screen === 8
                      ? s.phase === 0
                        ? s.source !== null
                        : s.phase === 1
                          ? s.sourcesSeen.length === 2
                          : s.sourceChoice !== null
                      : s.screen === 9
                        ? s.claim !== null
                        : s.screen === 10
                          ? s.phase === 0
                            ? s.category !== null
                            : s.phase === 1
                              ? Boolean(s.fields[0].trim())
                              : s.phase === 7
                                ? s.reflection !== null
                                : true
                          : true;
  function next() {
    if (!ready) return;
    if (s.screen === 8 && s.phase === 0 && s.source !== null) {
      const seen = s.sourcesSeen.includes(s.source)
        ? s.sourcesSeen
        : [...s.sourcesSeen, s.source];
      patch({ sourcesSeen: seen });
      if (seen.length === 2) emit("source_constraint_compared", 8);
    }
    if (s.screen === 6 && s.phase === 0) {
      emit("task_breakdown_completed", 6, { order: s.order });
    }
    if (s.screen === 10 && s.phase === 5) {
      emit("own_prompt_submitted", 10, {
        filledFields: s.fields.map((field) => Boolean(field.trim())),
      });
    }
    if (s.phase < phaseCounts[s.screen] - 1) {
      patch({ phase: s.phase + 1 });
    } else if (s.screen === 11) {
      patch({ complete: true });
      emit("prompt_course_completed", s.screen);
    } else patch({ screen: s.screen + 1, phase: 0 });
  }
  function back() {
    if (s.phase > 0) patch({ phase: s.phase - 1 });
    else if (s.screen > 0)
      patch({ screen: s.screen - 1, phase: phaseCounts[s.screen - 1] - 1 });
  }
  function selectIssue(id: number) {
    const nextIssues =
      id === 4
        ? s.issues.includes(4)
          ? []
          : [4]
        : toggle(
            s.issues.filter((issue) => issue !== 4),
            id,
          );
    patch({ issues: nextIssues });
  }
  const demo = captionDemo(s.components);
  const followup = followupDemo(s.followup);
  const ownPrompt = composePrompt(s.fields);
  if (!loaded) return <p role="status">Menyiapkan materi…</p>;
  if (!started)
    return (
      <PromptFrame stage={null}>
        <section className={`${styles.pilot} ${ui.studio}`}>
          <div className={ui.introVisual} aria-hidden="true">
            <div className={ui.introPrompt}>
              <span>Prompt</span>
              <i />
              <i />
              <i />
            </div>
            <span className={ui.introArrow}>→</span>
            <div className={ui.introDraft}>
              <span>Draf</span>
              <i />
              <i />
              <i />
            </div>
            <span className={ui.revisionMark}>↻</span>
          </div>
          <p className={styles.kicker}>PROMPT ENGINEERING</p>
          <h2 ref={heading} tabIndex={-1}>
            {promptIntroduction.title}
          </h2>
          {promptIntroduction.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <TheoryDetails detail={promptIntroduction.details} />
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => setStarted(true)}>
              Mulai belajar →
            </button>
          </div>
        </section>
      </PromptFrame>
    );
  if (paused)
    return (
      <PromptFrame stage={Math.floor(s.screen / 4)}>
        <section className={`${styles.pilot} ${ui.studio}`}>
          <p className={styles.kicker}>PROMPT ENGINEERING</p>
          <h2>Mau jeda dulu?</h2>
          <p>
            Progres dan tulisanmu tersimpan di perangkat ini. Kamu terakhir
            berada di bagian {s.screen + 1} dari 12, langkah {s.phase + 1} dari{" "}
            {phaseCounts[s.screen]}.
          </p>
          <div className={styles.actions}>
            <button className={styles.primary} onClick={() => setPaused(false)}>
              Lanjutkan belajar →
            </button>
            <button
              onClick={() => {
                setSession(initial);
                setPaused(false);
                setStarted(false);
                try {
                  localStorage.removeItem(sessionKey);
                } catch {
                  /* Restart remains available when browser storage is blocked. */
                }
              }}
            >
              Mulai dari awal
            </button>
          </div>
        </section>
      </PromptFrame>
    );
  if (s.complete)
    return (
      <PromptFrame stage={2}>
        <section className={`${styles.pilot} ${ui.studio}`}>
          <p className={styles.kicker}>MATERI SELESAI</p>
          {completion}
          <h2>Siap dicoba untuk kebutuhanmu sendiri</h2>
          <p>
            Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat
            jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan
            pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa
            informasi yang penting.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => patch({ complete: false, screen: 11, phase: 0 })}
            >
              ← Kembali ke ringkasan
            </button>
            <button
              className={styles.primary}
              onClick={() => setTransferOpen(!transferOpen)}
              aria-expanded={transferOpen}
            >
              Latihan kasus baru · opsional
            </button>
          </div>
          {transferOpen && (
            <section className={styles.transfer}>
              <p>
                Di latihan sebelumnya, kamu menulis prompt dengan bantuan
                beberapa kolom. Kali ini, coba sampaikan kebutuhan dalam satu
                tulisan dengan caramu sendiri.
              </p>
              <h3>Rencana latihan bahasa Inggris</h3>
              <p>
                Kamu ingin berlatih berbicara bahasa Inggris. Kamu punya waktu
                sekitar 20 menit sehari dan ingin lebih percaya diri dalam tiga
                bulan. Kalau jadwalnya terlalu berat, kamu biasanya berhenti.
                Kamu juga tidak ingin terlalu banyak latihan tata bahasa.
              </p>
              <Bubble label="Prompt awal">
                Tolong buatkan rencana belajar bahasa Inggris.
              </Bubble>
              {!s.transferSubmitted && (
                <>
                  <label className={`${styles.field} ${ui.field}`}>
                    Ubah permintaan ini supaya rencananya lebih sesuai dengan
                    situasi tadi. Tulis dengan caramu sendiri.
                    <textarea
                      rows={5}
                      value={s.transfer}
                      onChange={(event) =>
                        patch({
                          transfer: event.target.value,
                          transferSubmitted: false,
                          checks: [],
                        })
                      }
                    />
                  </label>
                  <button
                    className={styles.primary}
                    disabled={!s.transfer.trim()}
                    onClick={() => patch({ transferSubmitted: true })}
                  >
                    Periksa dengan situasinya
                  </button>
                </>
              )}
              {s.transferSubmitted && (
                <>
                  <button
                    className={styles.secondary}
                    onClick={() => patch({ transferSubmitted: false })}
                  >
                    Edit tulisanmu
                  </button>
                  <Bubble label="Prompt yang kamu tulis">{s.transfer}</Bubble>
                  <p>
                    Baca permintaanmu dan cocokkan dengan situasi. Kamu boleh
                    memakai kalimatmu sendiri. Checklist berikut membantu
                    pemeriksaan mandiri; tanda centang tidak berarti aplikasi
                    telah memastikan kebutuhan itu tertulis atau dapat dipenuhi.
                  </p>
                  <Note>
                    Baca tulisanmu, lalu tandai kebutuhan yang sudah disebutkan.
                    Meminta AI bertanya lebih dulu juga boleh. Kamu memeriksanya
                    sendiri; aplikasi tidak menilai isi tulisanmu.
                  </Note>
                  <div className={styles.choices}>
                    {transferChecks.map((check, i) => (
                      <Choice
                        key={check}
                        text={check}
                        selected={s.checks.includes(i)}
                        onClick={() => patch({ checks: toggle(s.checks, i) })}
                      />
                    ))}
                  </div>
                  <p>
                    Kalau ada kebutuhan yang belum disebutkan, edit tulisanmu
                    lalu periksa lagi.
                  </p>
                </>
              )}
            </section>
          )}
        </section>
      </PromptFrame>
    );
  return (
    <PromptFrame stage={Math.floor(s.screen / 4)}>
      <article
        className={`${styles.pilot} ${ui.studio}`}
        data-screen={s.screen}
        data-phase={s.phase}
      >
        <header className={`${styles.top} ${ui.top}`}>
          <span>Prompt Engineering · {s.screen + 1}/12</span>
          <button onClick={() => setPaused(true)}>Simpan dan berhenti</button>
        </header>
        <div
          className={`${styles.progress} ${ui.progress}`}
          role="progressbar"
          aria-label="Progres materi"
          aria-valuemin={0}
          aria-valuemax={12}
          aria-valuenow={s.screen + 1}
        >
          <span style={{ width: `${((s.screen + 1) / 12) * 100}%` }} />
        </div>
        <p className={styles.kicker}>
          {s.screen === 2
            ? "COBA LANGSUNG"
            : s.screen === 7
              ? "FOLLOW-UP"
              : s.screen === 10
                ? "GILIRANMU"
                : s.screen === 11
                  ? "YANG PERLU DIINGAT"
                  : "PROMPT ENGINEERING"}
        </p>
        <h2 ref={heading} tabIndex={-1}>
          {titles[s.screen]}
        </h2>
        {phaseCounts[s.screen] > 1 && (
          <p className={styles.phaseIndicator}>
            Langkah {s.phase + 1} dari {phaseCounts[s.screen]}
          </p>
        )}
        {promptTheory[`${s.screen}:${s.phase}`]?.text && (
          <section
            className={`${styles.theory} ${ui.theory}`}
            aria-label="Yang perlu dipahami"
          >
            <h3>Yang perlu dipahami</h3>
            <p>{promptTheory[`${s.screen}:${s.phase}`].text}</p>
          </section>
        )}
        {s.screen === 0 && (
          <>
            <p>
              Pernah merasa permintaanmu sudah jelas, tapi jawaban AI masih
              terlalu umum?
            </p>
            <p>Misalnya kamu menulis:</p>
            <Bubble label="Kamu">{basePrompt}</Bubble>
            <p>
              AI bisa membuat caption dari satu kalimat itu. Namun, beberapa hal
              belum disebutkan: siapa yang diajak ikut, kapan acaranya, dan gaya
              bahasa yang kamu inginkan.
            </p>
            <h3>Menurutmu, permintaan ini sudah cukup?</h3>
            <div className={styles.choices}>
              {["Sudah cukup untuk mulai", "Masih perlu beberapa detail"].map(
                (text, i) => (
                  <div key={text}>
                    <Choice
                      text={text}
                      selected={s.prediction === i}
                      onClick={() => {
                        patch({ prediction: i });
                        emit("prediction_selected", 0, { choice: i });
                      }}
                    />
                    {s.prediction === i && (
                      <Note>
                        {i === 0
                          ? "Kalau untuk mencari ide awal, sudah bisa. Coba lihat hasilnya dulu, lalu tentukan apakah masih ada yang kurang."
                          : "Ada beberapa detail yang bisa ditambahkan. Kita lihat dulu jawabannya supaya lebih mudah menentukan mana yang perlu."}
                      </Note>
                    )}
                  </div>
                ),
              )}
            </div>
          </>
        )}
        {s.screen === 1 && (
          <>
            <p>
              Anggap kamu sedang membantu komunitas lokal mempromosikan workshop
              AI gratis untuk pemula. Caption tadi akan dipakai di akun
              Instagram komunitas.
            </p>
            <Bubble label="Kamu">{basePrompt}</Bubble>
            <Bubble label="Contoh jawaban AI" answer>
              Jangan lewatkan workshop AI seru ini! 🎉 Tambah wawasan, dapatkan
              pengalaman baru, dan belajar bersama. Ajak temanmu dan daftar
              sekarang!
            </Bubble>
            <h3>
              Apa yang masih perlu diperbaiki sebelum caption ini dipakai?
            </h3>
            <p className={styles.hint}>
              Kamu boleh memilih beberapa hal yang perlu diperbaiki. Kalau
              menurutmu sudah cukup, pilih “Sudah cukup untuk kebutuhan saya”;
              pilihan lain akan dilepas.
            </p>
            <div className={styles.choices}>
              {issues.map(([text], i) => (
                <div key={text}>
                  <Choice
                    text={text}
                    selected={s.issues.includes(i)}
                    onClick={() => selectIssue(i)}
                  />
                </div>
              ))}
            </div>
            {s.issues.length > 0 && (
              <Note>{issues[s.issues[s.issues.length - 1]][1]}</Note>
            )}
            <p>
              Coba tambahkan beberapa detail ke prompt tadi. Setelah itu,
              bandingkan caption yang muncul.
            </p>
          </>
        )}
        {s.screen === 2 && (
          <>
            {s.phase === 0 ? (
              <>
                <p>
                  Kita pakai prompt caption yang sama. Kali ini, kamu bisa
                  menentukan informasi tambahan yang akan masuk.
                </p>
                <details className={styles.facts}>
                  <summary>Lihat detail workshop</summary>
                  <ul>
                    <li>Gratis.</li>
                    <li>Sabtu pukul 10.00.</li>
                    <li>Untuk orang yang baru mulai belajar AI.</li>
                    <li>Postingan dibuat untuk mengajak orang mendaftar.</li>
                  </ul>
                </details>
                <h3>Pilih detail yang ingin kamu tambahkan.</h3>
                <p className={styles.hint}>
                  Pilih satu atau beberapa tambahan. Di langkah berikutnya, kamu
                  bisa melihat pengaruhnya pada caption.
                </p>
                <div className={ui.builder}>
                  <div className={styles.choices}>
                    {components.map((item, i) => (
                      <Choice
                        key={item.label}
                        text={item.label}
                        selected={s.components.includes(i)}
                        onClick={() => changeComponent(i)}
                      />
                    ))}
                  </div>
                  <Bubble label="Prompt yang kamu buat">{demo.prompt}</Bubble>
                </div>
              </>
            ) : (
              <>
                <p>
                  Ini caption dari pilihanmu tadi. Perhatikan bagian yang
                  berkaitan dengan detail yang kamu tambahkan.
                </p>
                <div aria-live="polite" aria-atomic="true">
                  <div
                    className={`${styles.result} ${ui.results}`}
                    key={resultVersion}
                  >
                    {demo.answers.map((answer) => (
                      <Bubble
                        key={answer.label}
                        label={`${answer.label} · simulasi`}
                        answer
                      >
                        {answer.text}
                      </Bubble>
                    ))}
                  </div>
                </div>
                {lastComponent !== null && (
                  <Note>
                    {removed
                      ? `Detail “${components[lastComponent].label}” dihapus. Lihat bagian caption yang ikut berubah.`
                      : components[lastComponent].why}
                  </Note>
                )}
                <details className={styles.more}>
                  <summary>Lihat prompt yang kamu buat</summary>
                  <Bubble label="Prompt yang kamu buat">{demo.prompt}</Bubble>
                </details>
                {s.tried.length >= 3 && (
                  <>
                    <p>
                      Sekarang coba cocokkan caption ini dengan detail yang kamu
                      pilih. Informasi mana yang membuat hasilnya lebih sesuai
                      dengan kebutuhanmu?
                    </p>
                    <button
                      className={styles.secondary}
                      disabled={!s.components.length}
                      onClick={() =>
                        changeComponent(s.components[s.components.length - 1])
                      }
                    >
                      Coba hapus satu detail
                    </button>
                  </>
                )}
                <p className={styles.hint}>
                  Kalau ingin mengganti pilihan, tekan “Kembali” dan coba detail
                  lain.
                </p>
              </>
            )}
          </>
        )}
        {s.screen === 3 && (
          <>
            {s.phase === 0 && (
              <p>
                Menambah detail bisa membantu, tetapi tidak semuanya perlu
                dimasukkan. Coba pilah informasi tentang workshop tadi satu per
                satu.
              </p>
            )}
            {s.phase < 6 ? (
              <>
                <p>
                  Untuk membuat caption workshop tadi, apakah AI perlu tahu
                  detail ini?
                </p>
                <section className={`${styles.singleDetail} ${ui.detailCard}`}>
                  <span>Detail {s.phase + 1} dari 6</span>
                  <h3>{details[s.phase].text}</h3>
                </section>
                <div
                  className={`${styles.destinationButtons} ${ui.destinations}`}
                >
                  {[true, false].map((needed) => (
                    <button
                      type="button"
                      key={String(needed)}
                      className={`${styles.destinationButton} ${ui.destination}`}
                      aria-pressed={s.sorted[s.phase] === needed}
                      onClick={() => {
                        const sorted = [...s.sorted];
                        sorted[s.phase] = needed;
                        patch({ sorted });
                        if (sorted.every((value) => value !== null))
                          emit("detail_sort_completed", 3, {
                            relevantPlacements: sorted.filter(
                              (value, index) => value === details[index].needed,
                            ).length,
                          });
                      }}
                    >
                      <span>
                        {s.sorted[s.phase] === needed ? "✓ " : ""}
                        {needed ? "Perlu untuk caption ini" : "Belum perlu"}
                      </span>
                      <small>
                        {needed
                          ? "Membantu menentukan isi caption"
                          : "Belum dibutuhkan untuk menulis caption ini"}
                      </small>
                    </button>
                  ))}
                </div>
                {s.sorted[s.phase] !== null && (
                  <Note>
                    {s.sorted[s.phase] !== details[s.phase].needed && (
                      <strong>Coba lihat kegunaan detail ini. </strong>
                    )}
                    {details[s.phase].why}
                  </Note>
                )}
              </>
            ) : (
              <>
                <p>
                  Ini hasil pengelompokanmu. Cek lagi mana yang membantu menulis
                  caption dan mana yang belum diperlukan.
                </p>
                <h3>Hasil pilihanmu</h3>
                <div className={`${styles.sort} ${ui.sort}`}>
                  {[true, false].map((group) => (
                    <section className={styles.sortGroup} key={String(group)}>
                      <h4>
                        {group ? "Perlu untuk caption ini" : "Belum perlu"}
                      </h4>
                      <ul>
                        {details.map(
                          (item, i) =>
                            s.sorted[i] === group && (
                              <li key={item.text}>{item.text}</li>
                            ),
                        )}
                      </ul>
                    </section>
                  ))}
                </div>
                <Note>
                  Saat menambah detail, coba tanya: apakah informasi ini
                  membantu AI mengerjakan tugasnya?
                </Note>
                <More title="Kalau penasaran: kenapa detail yang tidak berkaitan sebaiknya dihapus?">
                  Prompt lebih mudah diikuti kalau isinya berkaitan dengan
                  tugas. Detail yang tidak perlu bisa membuat arahan utama
                  kurang jelas.
                </More>
                <p className={styles.hint}>
                  Gunakan Kembali untuk memeriksa atau mengubah pilihanmu.
                </p>
              </>
            )}
          </>
        )}
        {s.screen === 4 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Caption workshop sudah dibahas. Sekarang, kamu ingin mengirim
                  pesan pengingat kepada orang yang sudah mendaftar.
                </p>
                <Bubble label="Prompt awal">
                  Tolong buatkan pesan pengingat workshop untuk peserta.
                  Bahasanya santai dan ramah, tapi tetap sopan.
                </Bubble>
                <Bubble label="Contoh jawaban AI" answer>
                  Halo! Kami ingin mengingatkan bahwa workshop akan segera
                  dilaksanakan. Kami menantikan kehadiran Anda dan berharap
                  acara ini dapat memberikan pengalaman yang bermanfaat.
                </Bubble>
                <p>
                  Pesannya sopan, tetapi terasa cukup formal untuk grup peserta.
                  Kalau kata “santai” belum memberi hasil yang kamu bayangkan,
                  coba tunjukkan contoh pesan.
                </p>
              </>
            )}
            {s.phase === 1 && (
              <>
                <p>
                  Coba tunjukkan gaya yang kamu mau lewat salah satu contoh
                  berikut.
                </p>
                <h3>
                  Dari tiga pesan ini, mana yang paling mendekati gaya yang kamu
                  inginkan?
                </h3>
                <div className={`${styles.choices} ${ui.exampleChoices}`}>
                  {examples.map((example, i) => (
                    <Choice
                      key={example}
                      text={`Contoh ${String.fromCharCode(65 + i)}: ${example}`}
                      selected={s.example === i}
                      onClick={() => {
                        patch({ example: i });
                        emit("example_selected", 4, { example: i });
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            {s.phase === 2 && (
              <>
                <p>
                  Sekarang lihat pesan yang mengikuti contoh pilihanmu.
                  Bandingkan gayanya dengan pesan awal.
                </p>
                {s.example !== null && (
                  <div aria-live="polite">
                    <details className={styles.more}>
                      <summary>Lihat prompt dengan contoh</summary>
                      <Bubble label="Prompt dengan contoh">{`Tolong buatkan pesan pengingat workshop untuk peserta. Pakai gaya bahasa seperti contoh ini:\n\n“${examples[s.example]}”\n\nPesannya akan dikirim hari Jumat. Workshop diadakan Sabtu pukul 10.00. Minta peserta datang 10 menit lebih awal.`}</Bubble>
                    </details>
                    <Bubble label="Jawaban mengikuti contoh · simulasi" answer>
                      {reminders[s.example]}
                    </Bubble>
                  </div>
                )}
                <Note>
                  Contoh tadi memberi gambaran gaya yang kamu mau. Cek juga
                  apakah waktu acara dan permintaan datang lebih awal sudah
                  ditulis dengan benar.
                </Note>
                <More title="Mau tahu istilahnya?">
                  Memberi satu contoh sering disebut one-shot prompting. Kalau
                  contohnya beberapa, istilahnya few-shot prompting. Yang perlu
                  kamu ingat: contoh bisa membantu saat gaya atau pola sulit
                  dijelaskan.
                </More>
              </>
            )}
          </>
        )}
        {s.screen === 5 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Untuk pesan workshop tadi, kamu sudah tahu informasi yang
                  perlu diberikan. Tapi kadang kebutuhan kita sendiri belum
                  jelas. Misalnya saat merencanakan perjalanan dua hari di
                  Jogja: kamu ingin dibuatkan itinerary, tetapi belum terpikir
                  detail apa yang harus disebutkan.
                </p>
                <Bubble label="Prompt awal">
                  Tolong buatkan itinerary dua hari di Jogja buat saya.
                </Bubble>
                <h3>
                  Informasi apa yang bisa membuat rencana perjalanannya lebih
                  cocok buatmu?
                </h3>
                <div className={styles.choices}>
                  {travelChoices.map(([text, why], i) => (
                    <div key={text}>
                      <Choice
                        text={text}
                        selected={s.travel === i}
                        onClick={() => patch({ travel: i })}
                      />
                      {s.travel === i && <Note>{why}</Note>}
                    </div>
                  ))}
                </div>
              </>
            )}
            {s.phase === 1 && (
              <>
                <p>
                  Kalau detailnya belum lengkap, kamu bisa meminta AI bertanya
                  dulu sebelum menyusun rencana.
                </p>
                <Bubble label="Prompt alternatif">
                  Saya mau jalan-jalan dua hari di Jogja. Sebelum membuat
                  itinerary, tolong tanya dulu maksimal tiga hal yang perlu kamu
                  tahu agar rencananya cocok buat saya.
                </Bubble>
                <Bubble label="AI bertanya · simulasi" answer>
                  <p>Boleh, saya tanya tiga hal dulu ya:</p>
                  <ol>
                    <li>
                      Kamu lebih suka kuliner, wisata budaya, alam, atau
                      campuran?
                    </li>
                    <li>Budget per harinya kira-kira berapa?</li>
                    <li>
                      Kamu menginap di area mana, atau berangkat dari mana?
                    </li>
                  </ol>
                </Bubble>
                <h3>
                  Untuk latihan ini, coba jawab pertanyaan tentang minatmu dulu.
                </h3>
                <div className={styles.inline}>
                  {["Kuliner", "Wisata budaya", "Alam", "Campuran"].map(
                    (interest) => (
                      <Choice
                        key={interest}
                        text={interest}
                        selected={s.interest === interest}
                        onClick={() => {
                          patch({ interest });
                          emit("clarifying_question_demo_completed", 5, {
                            interest,
                          });
                        }}
                      />
                    ),
                  )}
                </div>
              </>
            )}
            {s.phase === 2 && (
              <>
                <p>
                  Pilihan minatmu sudah memberi arah untuk rencana perjalanan.
                  Karena dua pertanyaan lain belum dijawab, hasilnya masih
                  berupa pilihan kegiatan.
                </p>
                {s.interest && (
                  <div aria-live="polite">
                    <Bubble label="Pratinjau itinerary · belum final" answer>
                      <p>
                        {s.interest === "Campuran"
                          ? "Kalau kamu ingin menggabungkan beberapa kegiatan, ini contoh pilihan tempat untuk dua hari:"
                          : `Kalau kamu lebih suka ${s.interest.toLowerCase()}, ini contoh tempat yang bisa dipertimbangkan untuk dua hari:`}
                      </p>
                      <ol className={`${styles.itineraryDays} ${ui.itinerary}`}>
                        {(jogjaItineraries[s.interest] ?? []).map((day, i) => (
                          <li key={day.place}>
                            <span className={styles.dayLabel}>
                              Hari {i + 1} · {day.area}
                            </span>
                            <h4>{day.place}</h4>
                            <p>{day.activity}</p>
                            <div className={styles.sourceLinks}>
                              <span>Sumber tempat:</span>
                              {day.sources.map((source) => (
                                <a
                                  key={source.url}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {source.label}
                                  <span className={styles.srOnly}>
                                    {" "}
                                    (buka tab baru)
                                  </span>
                                  <span aria-hidden="true"> ↗</span>
                                </a>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ol>
                      <p className={styles.pending}>
                        Budget dan lokasi menginap belum kamu jawab, jadi ini
                        baru contoh pilihan kegiatan. Rute, transportasi, dan
                        biaya masih perlu disesuaikan. Sebelum berangkat, cek
                        juga jam buka dan kondisi tempatnya.
                      </p>
                    </Bubble>
                  </div>
                )}
                <Note>
                  Pertanyaan dari AI bisa membantumu mengenali informasi yang
                  perlu disampaikan sebelum meminta rencana lengkap.
                </Note>
              </>
            )}
          </>
        )}
        {s.screen === 6 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Dari contoh perjalanan tadi, kita belajar melengkapi informasi
                  sebelum meminta rencana. Sekarang kembali ke pekerjaan
                  menyiapkan acara. Kalau kamu punya brief dua halaman dan perlu
                  membuat konsep, rundown, anggaran, proposal, serta caption,
                  ada baiknya hasil tiap tahap diperiksa dulu sebelum lanjut.
                </p>
                <Bubble label="Contoh prompt">
                  Tolong baca brief ini, buat konsep acaranya, susun rundown dan
                  budget, lalu tulis proposal serta caption promosinya.
                </Bubble>
                <p>
                  Kalau konsepnya ternyata kurang sesuai, rundown dan proposal
                  mungkin ikut perlu diubah. Karena itu, cek konsepnya dulu
                  sebelum meminta bagian lain.
                </p>
                <h3>
                  Susun langkah-langkah ini dari yang perlu dikerjakan lebih
                  dulu.
                </h3>
                <p className={styles.hint}>
                  Gunakan tombol naik dan turun untuk mengubah urutannya.
                </p>
                <ol className={`${styles.order} ${ui.order}`}>
                  {s.order.map((id, position) => (
                    <li key={id}>
                      <span>{taskSteps[id]}</span>
                      <div className={styles.inline}>
                        {[-1, 1].map((direction) => (
                          <button
                            key={direction}
                            className={styles.secondary}
                            disabled={
                              position + direction < 0 ||
                              position + direction > 2
                            }
                            aria-label={`${direction < 0 ? "Naikkan" : "Turunkan"}: ${taskSteps[id]}`}
                            onClick={() => {
                              const order = [...s.order];
                              [order[position], order[position + direction]] = [
                                order[position + direction],
                                order[position],
                              ];
                              patch({ order, ordered: true });
                            }}
                          >
                            {direction < 0 ? "↑ Naik" : "↓ Turun"}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            )}
            {s.phase === 1 && (
              <>
                <p>
                  Sekarang lihat contoh percakapan yang mengerjakan tugas acara
                  itu satu per satu.
                </p>
                {
                  <>
                    <Note>
                      {s.order.join() === "0,1,2"
                        ? "Urutan ini memberi kamu kesempatan memahami brief, memilih konsep, lalu menyiapkan kebutuhan acara. Kalau ada yang kurang sesuai, kamu bisa memperbaikinya sebelum lanjut."
                        : "Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas."}
                    </Note>
                    <Bubble label="Kamu">
                      Tolong baca brief ini dulu. Ringkas tujuan acara dan
                      batasannya, lalu sebutkan informasi yang masih kurang.
                      Belum perlu membuat konsep acara.
                    </Bubble>
                    <Bubble label="Contoh jawaban AI" answer>
                      {
                        "Tujuan acara: [ringkasan tujuan dari brief].\n\nBatasan: [anggaran, waktu, atau ketentuan yang tercantum].\n\nMasih perlu dipastikan: [informasi yang belum tersedia]."
                      }
                    </Bubble>
                    <Bubble label="Kamu">
                      Oke, sekarang buat tiga pilihan konsep yang sesuai dengan
                      brief tadi.
                    </Bubble>
                  </>
                }
                <More title="Kapan bisa langsung dikerjakan?">
                  Untuk tugas kecil yang mudah diperiksa, seperti memperbaiki
                  satu paragraf, kamu bisa langsung meminta hasilnya. Pilih cara
                  yang sesuai dengan pekerjaannya.
                </More>
              </>
            )}
          </>
        )}
        {s.screen === 7 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Tadi kamu memberi arahan bertahap sambil mengecek hasilnya.
                  Kalau ada bagian yang belum sesuai, percakapannya bisa
                  diteruskan dengan permintaan perbaikan. Cara yang sama juga
                  berguna saat belajar: misalnya, penjelasan AI tentang machine
                  learning masih terlalu teknis buatmu.
                </p>
                <Bubble label="Potongan jawaban AI" answer>
                  Supervised learning merupakan paradigma pembelajaran mesin
                  yang memetakan input terhadap target berdasarkan pasangan data
                  berlabel.
                </Bubble>
                <h3>
                  Apa yang ingin kamu ubah agar bagian ini lebih mudah dipahami?
                </h3>
                <p className={styles.hint}>Kamu boleh memilih beberapa.</p>
                <div className={styles.choices}>
                  {followupOptions.map((text, i) => (
                    <Choice
                      key={text}
                      text={text}
                      selected={s.followup.includes(i)}
                      onClick={() => {
                        patch({ followup: toggle(s.followup, i) });
                        emit("followup_built", 7, {
                          choices: toggle(s.followup, i),
                        });
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            {s.phase === 1 && (
              <>
                <p>
                  Ini contoh jawaban berdasarkan perubahan yang kamu pilih.
                  Apakah bagian yang tadi membingungkan sudah lebih mudah
                  dipahami?
                </p>
                {s.followup.length > 0 && (
                  <div aria-live="polite">
                    <details className={styles.more}>
                      <summary>Lihat permintaan lanjutanmu</summary>
                      <Bubble label="Permintaan lanjutanmu">
                        {followup.prompt}
                      </Bubble>
                    </details>
                    <Bubble
                      label="Contoh jawaban setelah diperbaiki · simulasi"
                      answer
                    >
                      {followup.answer}
                    </Bubble>
                  </div>
                )}
                {s.followup.includes(2) && (
                  <Note>
                    Kamu meminta penjelasan tanpa rumus. Batasan seperti ini
                    bisa dipakai saat kamu ingin memahami gambaran dasarnya
                    lebih dulu.
                  </Note>
                )}
                {s.followup.includes(4) && (
                  <Note>
                    Kalau dasarnya masih membingungkan, kamu boleh meminta
                    penjelasan dari awal. Kalau hanya satu bagian yang belum
                    jelas, sebutkan bagian itu saja.
                  </Note>
                )}
                <Note>
                  Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian
                  yang belum cocok dan bagaimana kamu ingin memperbaikinya.
                </Note>
              </>
            )}
          </>
        )}
        {s.screen === 8 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Di penjelasan tadi, kamu meminta AI mengubah cara menyampaikan
                  jawaban. Sekarang kita perhatikan isinya: informasi mana yang
                  boleh digunakan? Kembali ke workshop yang kita bahas di awal,
                  kamu punya artikel singkat yang ingin dirangkum untuk
                  presentasi.
                </p>
                <Bubble label="Artikel untuk simulasi">{article}</Bubble>
                <h3>Pilih prompt untuk melihat contoh jawabannya.</h3>
                <div className={styles.choices}>
                  {sourcePrompts.map((prompt, i) => (
                    <Choice
                      key={prompt}
                      text={`Prompt ${i === 0 ? "A" : "B"}: ${prompt}`}
                      selected={s.source === i}
                      onClick={() =>
                        patch({
                          source: i,
                        })
                      }
                    />
                  ))}
                </div>
              </>
            )}
            {s.phase === 1 && (
              <>
                <p className={styles.hint}>
                  Buka jawaban A dan B, lalu cocokkan dengan artikel. Keduanya
                  adalah contoh simulasi.
                </p>
                <div className={styles.inline}>
                  {["A", "B"].map((label, i) => (
                    <button
                      key={label}
                      className={styles.secondary}
                      aria-pressed={s.source === i}
                      onClick={() => {
                        const seen = s.sourcesSeen.includes(i)
                          ? s.sourcesSeen
                          : [...s.sourcesSeen, i];
                        patch({ source: i, sourcesSeen: seen });
                        if (seen.length === 2)
                          emit("source_constraint_compared", 8);
                      }}
                    >
                      Lihat jawaban {label}
                    </button>
                  ))}
                </div>
                {s.source !== null && (
                  <Bubble
                    label={`Jawaban ${s.source === 0 ? "A" : "B"} · simulasi`}
                    answer
                  >
                    {sourceAnswers[s.source]}
                    <Note>
                      {s.source === 0
                        ? "‘100 peserta’ tidak ada dalam artikel. Ini fakta tambahan yang dibuat untuk simulasi, bukan data acara."
                        : "Dalam contoh ini, ringkasannya mengikuti artikel dan menyebut informasi yang belum ada. Saat memakai AI sendiri, tetap periksa hasilnya meskipun kamu sudah membatasi sumber."}
                    </Note>
                  </Bubble>
                )}
                <details className={styles.more}>
                  <summary>Cocokkan dengan artikel</summary>
                  <p>{article}</p>
                </details>
                <p className={styles.hint}>
                  Sudah dibuka: {s.sourcesSeen.length}/2 jawaban.
                </p>
              </>
            )}
            {s.phase === 2 && (
              <>
                <p>
                  Setelah melihat kedua jawaban, bandingkan lagi arahan dalam
                  prompt-nya.
                </p>
                <h3>
                  Kalau ringkasannya harus mengikuti isi artikel, prompt mana
                  yang arahannya lebih jelas?
                </h3>
                <div className={styles.choices}>
                  {["Prompt A", "Prompt B"].map((text, i) => (
                    <Choice
                      key={text}
                      text={text}
                      selected={s.sourceChoice === i}
                      onClick={() => patch({ sourceChoice: i })}
                    />
                  ))}
                </div>
                {s.sourceChoice !== null && (
                  <Note>
                    {s.sourceChoice === 0 &&
                      "Prompt A belum menyebut batas sumbernya. "}
                    {sourceFeedback}
                  </Note>
                )}
                <details className={styles.more}>
                  <summary>Lihat kedua prompt lagi</summary>
                  {sourcePrompts.map((prompt, i) => (
                    <Bubble
                      key={prompt}
                      label={`Prompt ${i === 0 ? "A" : "B"}`}
                    >
                      {prompt}
                    </Bubble>
                  ))}
                </details>
                <More title="Tips: pisahkan instruksi dan bahan">
                  Pisahkan instruksi dan bahan bacaan dengan judul seperti
                  “Artikel:” atau blok kutipan. Dengan begitu, keduanya lebih
                  mudah dibedakan. Pemisah bagian dalam prompt sering disebut
                  delimiter.
                </More>
              </>
            )}
          </>
        )}
        {s.screen === 9 && (
          <>
            <p>
              Di ringkasan tadi, ada jumlah peserta yang tidak disebutkan dalam
              artikel. Hal serupa juga bisa muncul sebagai angka survei atau
              kutipan yang terdengar meyakinkan. Coba periksa contoh berikut.
            </p>
            <Bubble
              label="Klaim buatan untuk latihan · bukan data nyata"
              answer
            >
              “Menurut survei nasional 2026, 78% anak muda Indonesia menggunakan
              AI setiap hari untuk belajar.”
            </Bubble>
            <h3>
              Kamu ingin memakai angka ini di presentasi. Apa langkah
              berikutnya?
            </h3>
            <div className={styles.choices}>
              {claimChoices.map(([text, why], i) => (
                <div key={text}>
                  <Choice
                    text={text}
                    selected={s.claim === i}
                    onClick={() => {
                      patch({ claim: i });
                      emit("claim_check_completed", 9, { choice: i });
                    }}
                  />
                  {s.claim === i && <Note>{why}</Note>}
                </div>
              ))}
            </div>
            <Note>
              Sebelum membagikan jawaban AI atau memakainya untuk mengambil
              keputusan, periksa dulu klaim pentingnya, terutama angka dan
              kutipan.
            </Note>
          </>
        )}
        {s.screen === 10 && (
          <>
            {s.phase === 0 && (
              <>
                <p>
                  Kamu sudah mencoba menambah detail, memberi contoh, meminta
                  perbaikan, dan mengecek hasil. Sekarang pilih kebutuhanmu
                  sendiri. Mulai dari permintaan sederhana, lalu tambahkan
                  informasi yang diperlukan.
                </p>
                <div className={styles.choices}>
                  {[
                    "Belajar sesuatu",
                    "Membuat sesuatu",
                    "Merencanakan sesuatu",
                    "Kebutuhan lain",
                  ].map((text, i) => (
                    <Choice
                      key={text}
                      text={text}
                      selected={s.category === i}
                      onClick={() => patch({ category: i })}
                    />
                  ))}
                </div>
              </>
            )}
            {s.phase >= 1 && s.phase <= 5 && (
              <>
                <ol
                  className={ui.formSteps}
                  aria-label="Bagian prompt yang kamu susun"
                >
                  {[
                    "Permintaan",
                    "Konteks",
                    "Batasan",
                    "Bentuk jawaban",
                    "Contoh",
                  ].map((label, i) => (
                    <li
                      key={label}
                      aria-current={s.phase === i + 1 ? "step" : undefined}
                      data-filled={Boolean(s.fields[i].trim())}
                    >
                      {label}
                    </li>
                  ))}
                </ol>
                <p>
                  {
                    [
                      "Tulis dulu permintaan utamanya. Detail lain bisa kamu tambahkan setelah ini.",
                      "Sekarang pikirkan situasimu. Adakah informasi yang membantu AI memahami permintaan tadi? Kalau tidak ada, kamu boleh langsung lanjut.",
                      "Berikutnya, sebutkan batas yang perlu diikuti, kalau ada. Misalnya waktu yang tersedia atau hal yang ingin kamu hindari.",
                      "Kalau bentuk jawabannya penting, sebutkan di sini. Kamu juga boleh membiarkannya kosong.",
                      "Terakhir, tambahkan contoh kalau itu membantu menunjukkan gaya atau pola yang kamu mau. Kalau tidak perlu, lanjut saja.",
                    ][s.phase - 1]
                  }
                </p>
                <label className={`${styles.field} ${ui.field}`}>
                  {fieldLabels[s.phase - 1]}{" "}
                  <span className={styles.hint}>
                    {s.phase === 1 ? "Wajib" : "Opsional · boleh dilewati."}
                  </span>
                  {fieldHints[s.phase - 1] && (
                    <small>{fieldHints[s.phase - 1]}</small>
                  )}
                  <textarea
                    rows={5}
                    required={s.phase === 1}
                    value={s.fields[s.phase - 1]}
                    placeholder={
                      s.phase === 1
                        ? [
                            "Contoh: Tolong jelaskan dasar-dasar reksa dana untuk pemula.",
                            "Contoh: Tolong bantu tulis deskripsi singkat untuk proyek portofolio saya.",
                            "Contoh: Tolong bantu susun jadwal belajar IELTS selama satu bulan.",
                            "Tulis kebutuhanmu sendiri.",
                          ][s.category ?? 3]
                        : undefined
                    }
                    onChange={(event) => {
                      const fields = [...s.fields];
                      fields[s.phase - 1] = event.target.value;
                      patch({ fields, submitted: false });
                    }}
                  />
                </label>
                <details className={styles.more}>
                  <summary>Lihat prompt sejauh ini</summary>
                  <Bubble label="Pratinjau prompt yang kamu buat">
                    {ownPrompt ||
                      "Kalimat yang kamu tulis akan muncul di sini."}
                  </Bubble>
                </details>
              </>
            )}
            {s.phase === 6 && (
              <>
                <p>
                  Semua isianmu sudah digabung. Baca sebagai satu permintaan:
                  apakah sudah menyampaikan kebutuhanmu dengan jelas?
                </p>
                <Bubble label="Pratinjau prompt yang kamu buat">
                  {ownPrompt}
                </Bubble>
                <Note>{fieldFeedback[0]}</Note>
                <details className={styles.more}>
                  <summary>Lihat saran sesuai isianmu</summary>
                  <p className={styles.hint}>
                    Saran ini membantumu memeriksa prompt sendiri. Aplikasi
                    tidak menilai isi tulisanmu secara otomatis.
                  </p>
                  {s.fields.map(
                    (field, i) =>
                      i > 0 &&
                      field.trim() && <Note key={i}>{fieldFeedback[i]}</Note>,
                  )}
                </details>
                <button
                  className={styles.secondary}
                  onClick={() => patch({ phase: 1 })}
                >
                  Edit prompt yang kamu buat
                </button>
              </>
            )}
            {s.phase === 7 && (
              <>
                <p>
                  Prompt-mu sudah siap dicoba. Sekarang bayangkan jawabannya
                  masih belum sesuai.
                </p>
                <h3>
                  Kalau jawabannya masih kurang sesuai, kamu akan mulai dari
                  mana?
                </h3>
                <div className={styles.choices}>
                  {[
                    "Minta AI memperbaiki bagian tertentu",
                    "Tulis prompt baru dari awal",
                    "Cari dulu apa yang masih kurang",
                  ].map((text, i) => (
                    <Choice
                      key={text}
                      text={text}
                      selected={s.reflection === i}
                      onClick={() => patch({ reflection: i })}
                    />
                  ))}
                </div>
                {s.reflection !== null && (
                  <Note>
                    Cari dulu bagian yang belum sesuai, lalu minta AI
                    memperbaikinya. Kalau kebutuhanmu sudah berubah banyak,
                    menulis prompt baru juga boleh.
                  </Note>
                )}
              </>
            )}
          </>
        )}
        {s.screen === 11 && (
          <>
            <p>
              Kamu sudah mencoba menyusun permintaan sendiri. Ini ringkasan
              kebiasaan yang bisa kamu pakai saat berbicara dengan AI nanti.
            </p>
            <ol className={`${styles.habits} ${ui.habits}`}>
              {habits.map((habit) => (
                <li key={habit}>{habit}</li>
              ))}
            </ol>
            <Note>
              Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat
              jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan
              pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa
              informasi yang penting.
            </Note>
          </>
        )}
        <section
          key={`${s.screen}:${s.phase}`}
          aria-label="Penjelasan tambahan"
        >
          {promptTheory[`${s.screen}:${s.phase}`]?.details.map((detail) => (
            <TheoryDetails key={detail.title} detail={detail} />
          ))}
          <TheoryDetails detail={promptGlossary} />
        </section>
        <footer className={styles.actions}>
          <button
            className={styles.secondary}
            disabled={s.screen === 0 && s.phase === 0}
            onClick={back}
          >
            ← Kembali
          </button>
          <button className={styles.primary} disabled={!ready} onClick={next}>
            {phaseLabels[s.screen]?.[s.phase] ?? nextLabels[s.screen]}
          </button>
        </footer>
        <p className={styles.simulation}>
          Jawaban AI pada latihan ini adalah contoh simulasi.
        </p>
      </article>
    </PromptFrame>
  );
}
