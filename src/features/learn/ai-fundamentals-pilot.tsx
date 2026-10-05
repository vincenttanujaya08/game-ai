"use client";

import Link from "next/link";
import Image from "next/image";
import proteinVisual from "../../../public/course-visuals/alphafold-protein.webp";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import {
  fundamentalsIntroduction,
  fundamentalsSections,
  fundamentalsGlossary,
  fundamentalsSources,
} from "./ai-fundamentals-content";
import {
  fundamentalsTasks,
  optionalAfter,
  scholarshipTasks,
  type FundamentalsTask,
} from "./ai-fundamentals-activities";
import styles from "./yes-man-pilot.module.css";
import ui from "./ai-fundamentals-pilot.module.css";

const lessonNames = [
  "AI Hari Ini",
  "Sebenarnya, Apa Itu AI?",
  "Berpikir di Era AI",
];
const lessonIntroductions = [
  "Kita mulai dari hal yang paling dekat: email, lagu, dan chatbot. Dari sana, kita akan melihat kemampuan AI yang lebih luas sekaligus belajar kapan hasilnya cukup dipercaya dan kapan perlu diperiksa lagi.",
  "Dua fitur bisa sama-sama terlihat pintar dari luar, tetapi cara kerjanya bisa sangat berbeda. Kita mulai dari contoh yang sederhana agar perbedaannya mudah terlihat: alarm parkir.",
  "Di pelajaran terakhir, kita pakai satu situasi sebagai benang merah: kamu dan tim sedang menyiapkan proposal sponsor untuk sebuah kegiatan komunitas. AI bisa membantu merangkum bahan, mencari bentuk penyampaian, atau membuat draf. Tetapi keputusan tentang isi, ketepatan informasi, dan janji yang akhirnya dikirim tetap perlu kalian pertanggungjawabkan.",
];
const storageKey = "ai-fundamentals-interactive-pilot-v1";
const answerSchema = z.object({
  selected: z.array(z.number().int().min(0).max(50)),
  seen: z.array(z.number().int().min(0).max(50)),
  order: z.array(z.number().int().min(0).max(50)),
  checked: z.boolean(),
  text: z.string().max(10000),
  number: z.string().max(20),
  active: z.number().int().min(0).max(50).nullable(),
});
const sessionSchema = z.object({
  version: z.literal(1),
  mode: z.enum(["intro", "learning", "complete"]),
  index: z.number().int().min(0).max(31),
  phase: z.number().int().min(0).max(8),
  answers: z.record(z.string(), answerSchema),
  transferPhase: z.number().int().min(0).max(3),
});
type Answer = z.infer<typeof answerSchema>;
type Session = z.infer<typeof sessionSchema>;
const emptyAnswer: Answer = {
  selected: [],
  seen: [],
  order: [],
  checked: false,
  text: "",
  number: "",
  active: null,
};
const initial: Session = {
  version: 1,
  mode: "intro",
  index: 0,
  phase: 0,
  answers: {},
  transferPhase: 0,
};
function event(
  name: string,
  section?: string,
  detail: Record<string, unknown> = {},
) {
  window.dispatchEvent(
    new CustomEvent("ai-fundamentals-event", {
      detail: { name, section, ...detail },
    }),
  );
}
function shuffled(count: number) {
  const ids = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids;
}
function validAnswer(task: FundamentalsTask, answer: Answer) {
  const count = task.options?.length ?? 0;
  const ids = [...answer.selected, ...answer.seen];
  return (
    ids.every((i) => i < count) &&
    new Set(answer.selected).size === answer.selected.length &&
    new Set(answer.seen).size === answer.seen.length &&
    (answer.active === null || answer.active < count) &&
    (task.kind !== "order" ||
      (answer.order.length === count &&
        new Set(answer.order).size === count &&
        answer.order.every((i) => i < count)))
  );
}
function ready(task: FundamentalsTask, answer: Answer) {
  if (task.kind === "reflection")
    return answer.selected.length >= (task.min ?? 0);
  if (task.kind === "choice") return answer.selected.length === 1;
  if (task.kind === "explore")
    return answer.seen.length >= (task.min ?? task.options?.length ?? 0);
  return answer.checked;
}
function SourceLinks({ section }: { section: string }) {
  const indices: Record<string, number[]> = {
    "1.2": [0, 1],
    "1.3": [2, 3],
    "1.5": [4, 5],
    "1.7": [7],
    "1.8": [8],
    "1.9": [9, 10],
    "1.11": [6],
    "2.2": [11, 12],
    "3.2": [13, 14, 15],
    "3.3": [16],
    "3.4": [17],
    "3.5": [18, 19],
    "3.6": [20],
  };
  return (
    <div className={styles.sourceLinks}>
      {indices[section]?.map((i) => (
        <a
          key={i}
          href={fundamentalsSources[i].href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${fundamentalsSources[i].label} (tab baru)`}
        >
          {fundamentalsSources[i].label}
        </a>
      ))}
    </div>
  );
}
function Glossary() {
  return (
    <details className={styles.more}>
      <summary>Glosarium · buka saat diperlukan</summary>
      <dl>
        {fundamentalsGlossary.map(([term, meaning]) => (
          <div key={term}>
            <dt>
              <strong>{term}</strong>
            </dt>
            <dd style={{ margin: "4px 0 18px" }}>{meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
function EverydayVisual({ phase, answer }: { phase: number; answer: Answer }) {
  const resolved = answer.selected.includes(phase);
  return (
    <div
      className={ui.everydayScene}
      data-resolved={resolved}
      aria-hidden="true"
    >
      <span className={ui.sceneCaption}>Contoh visual · simulasi</span>
      {phase === 0 ? (
        <div className={ui.mailScene}>
          <div className={ui.mailFolder}>Bukan spam</div>
          <div className={ui.mailFolder}>Spam</div>
          <div className={ui.mailPaper}>
            <span className={ui.envelope} />
            Email
          </div>
        </div>
      ) : phase === 1 ? (
        <div className={ui.playlistScene}>
          {[0, 1, 2].map((i) => (
            <div key={i} data-recommended={resolved && i === 1}>
              <span className={ui.record} />
              <span>Lagu {i + 1}</span>
              {resolved && i === 1 && <small>Rekomendasi</small>}
            </div>
          ))}
        </div>
      ) : (
        <div className={ui.captionScene}>
          <span>Caption</span>
          <div className={ui.captionLines} data-written={resolved}>
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
    </div>
  );
}

function AnimalExamples() {
  const animal = (side: boolean, dark: boolean, dog: boolean, key: number) => (
    <svg
      key={key}
      viewBox="0 0 140 115"
      role="img"
      aria-label={`${dog ? "Anjing" : "Kucing"} ilustrasi, ${side ? "dari samping" : "dari depan"}, ${dark ? "cahaya redup" : "cahaya terang"}`}
    >
      <rect
        width="140"
        height="115"
        rx="8"
        fill={dark ? "#304853" : "#eef5f2"}
      />
      <ellipse
        cx={side ? 64 : 70}
        cy="79"
        rx={side ? 38 : 27}
        ry="23"
        fill={dog ? "#bb9369" : "#879e91"}
      />
      <circle
        cx={side ? 95 : 70}
        cy="47"
        r="23"
        fill={dog ? "#bb9369" : "#879e91"}
      />
      {dog ? (
        <>
          <ellipse cx={side ? 79 : 49} cy="43" rx="8" ry="18" fill="#936d48" />
          <ellipse cx={side ? 112 : 91} cy="43" rx="8" ry="18" fill="#936d48" />
        </>
      ) : (
        <path
          d={
            side
              ? "M77 36 L77 14 L94 27 M97 27 L112 14 L116 37"
              : "M49 36 L48 14 L67 27 M73 27 L91 14 L92 37"
          }
          fill="#879e91"
        />
      )}
      <circle cx={side ? 103 : 62} cy="46" r="3" fill="#173844" />
      {!side && <circle cx="78" cy="46" r="3" fill="#173844" />}
      <path
        d={side ? "M113 55 L126 60 L113 65" : "M66 57 L74 57 L70 63 Z"}
        fill="#173844"
      />
    </svg>
  );
  return (
    <div>
      <p className={styles.simulation}>
        Ilustrasi variasi data · tidak melatih model sungguhan
      </p>
      <h3>Kumpulan A · terang, dari depan</h3>
      <div className={ui.animalGrid}>
        {[0, 1, 2].map((i) => animal(false, false, i === 1, i))}
      </div>
      <h3>Kumpulan B · cahaya, sudut, dan latar beragam</h3>
      <div className={ui.animalGrid}>
        {[0, 1, 2].map((i) => animal(i > 0, i === 2, i === 1, i))}
      </div>
      <details className={styles.more}>
        <summary>Buka foto uji · ilustrasi</summary>
        {animal(true, true, false, 4)}
        <p>Hewan terlihat dari samping dalam cahaya redup.</p>
      </details>
    </div>
  );
}
const documentBlocks = [
  "Hambatan: perlengkapan datang terlambat, ruangan belum siap, dan peserta kesulitan menemukan lokasi.",
  "Langkah perbaikan: konfirmasi perlengkapan lebih awal, cek ruangan sehari sebelumnya, dan kirim petunjuk lokasi.",
  "Nama peserta: Peserta Contoh A dan Peserta Contoh B.",
  "Nomor identitas: ID-CONTOH-001 dan ID-CONTOH-002 (bukan identitas nyata).",
  "Kontak pribadi: kontak-pribadi@example.invalid (bukan alamat aktif).",
];
function Visual({
  kind,
  answer,
}: {
  kind: FundamentalsTask["visual"];
  answer: Answer;
}) {
  if (kind === "animals") return <AnimalExamples />;
  if (kind === "alarm") {
    const distance =
      answer.active === null ? null : [20, 30, 50][answer.active];
    return (
      <div className={ui.alarmScene} aria-label="Jarak ke aturan ke alarm">
        <div
          className={ui.parkingGround}
          data-distance={distance}
          aria-hidden="true"
        >
          <div className={ui.parkingWall} />
          <div className={ui.car} />
          <div className={ui.distanceLine}>
            <span>{distance === null ? "—" : `${distance} cm`}</span>
          </div>
        </div>
        <div className={ui.alarmReadout}>
          <div>
            Jarak:{" "}
            {distance === null ? "pilih jarak di bawah" : distance + " cm"}
          </div>
          <div>Aturan: jarak kurang dari 30 cm</div>
          <div className={ui.alarmStatus} data-on={distance === 20}>
            Alarm:{" "}
            {distance === null
              ? "belum dicoba"
              : distance === 20
                ? "Menyala"
                : "Tidak menyala"}
          </div>
        </div>
      </div>
    );
  }
  if (kind === "model")
    return (
      <div className={ui.modelScene}>
        <div className={ui.modelSteps}>
          {["Input ↓", "Lapisan model ↓", "Output"].map((label, i) => (
            <div key={label} data-active={answer.active === i}>
              {i === 0 ? (
                <div className={ui.pixelImage} aria-hidden="true" />
              ) : i === 1 ? (
                <svg
                  viewBox="0 0 180 100"
                  aria-hidden="true"
                  className={ui.network}
                >
                  {[24, 50, 76].flatMap((y) =>
                    [24, 50, 76].map((next) => (
                      <line
                        key={`${y}-${next}`}
                        x1="38"
                        y1={y}
                        x2="142"
                        y2={next}
                      />
                    )),
                  )}
                  {[38, 142].flatMap((x) =>
                    [24, 50, 76].map((y) => (
                      <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
                    )),
                  )}
                </svg>
              ) : (
                <div className={ui.outputShape} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              )}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  if (kind === "map")
    return (
      <div className={ui.mapScene}>
        <div className={ui.mapOuter}>
          AI
          <div className={ui.mapMiddle}>
            ↳ Machine learning<div className={ui.mapInner}>↳ Deep learning</div>
          </div>
        </div>
        <div className={ui.generativeNote}>
          Generatif: kemampuan membuat konten, dapat beririsan dengan pendekatan
          di atas.
        </div>
      </div>
    );
  if (kind === "chart")
    return (
      <figure className={ui.chart}>
        <figcaption>
          Paparan AI generatif pada pekerja Indonesia · ILO, 2026
        </figcaption>
        <p>
          Usia 15–24 tahun: <strong>26,1%</strong>
        </p>
        <div className={ui.bar} style={{ width: "87%" }} />
        <p>
          Kelompok dewasa: <strong>21,1%</strong>
        </p>
        <div className={ui.bar} style={{ width: "70.33%" }} />
        <div className={ui.chartAxis} aria-hidden="true">
          <span>0%</span>
          <span>10%</span>
          <span>20%</span>
          <span>30%</span>
        </div>
        <p className={styles.hint}>
          Ukuran: potensi tugas untuk dipengaruhi AI, bukan kepastian kehilangan
          pekerjaan. Panjang batang memakai skala yang sama, 0–30%.
        </p>
        <SourceLinks section="3.2" />
      </figure>
    );
  if (kind === "poster")
    return (
      <div className={ui.poster}>
        <small>POSTER FIKTIF · SIMULASI</small>
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          role="img"
          aria-label="Figur rekaan, bukan foto orang nyata"
        >
          <circle cx="45" cy="28" r="18" fill="#879e91" />
          <path d="M10 85 Q10 52 45 52 Q80 52 80 85" fill="#173844" />
        </svg>
        <strong>Pengumuman Komunitas</strong>
        <p>
          Figur ini ditampilkan sebagai pihak yang mendukung pengumuman. Sumber
          dan izin penggunaan identitas belum diketahui.
        </p>
      </div>
    );
  if (kind === "receipt")
    return (
      <div className={ui.receipt}>
        <small>TRANSAKSI FIKTIF · SIMULASI</small>
        <p>Tagihan tiket: Rp150.000 · Pembeli Contoh · 3 Oktober, 10.15</p>
        {answer.active === 0 && (
          <>
            <strong>Gambar dari pembeli: “Transfer berhasil”</strong>
            <p>
              Pembeli Contoh → Penjual Contoh · Rp150.000 · 3 Oktober, 10.15
            </p>
          </>
        )}
        {answer.active === 1 && (
          <p>
            Referensi dari pembeli: CONTOH-001. Nomor ini belum dicocokkan
            dengan transaksi penerima.
          </p>
        )}
        {answer.active === 2 && (
          <>
            <strong>Riwayat rekening penerima</strong>
            <p>
              Pengirim: Pembeli Contoh
              <br />
              Nominal: Rp150.000
              <br />
              Waktu: 3 Oktober, 10.15
              <br />
              Status: Masuk / berhasil
              <br />
              Referensi: CONTOH-001
            </p>
          </>
        )}
      </div>
    );
  if (kind === "document")
    return (
      <details className={styles.facts} open>
        <summary>Dokumen acara · simulasi</summary>
        {documentBlocks.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </details>
    );
  if (kind === "schedule")
    return (
      <div className={ui.receipt}>
        <small>JADWAL FIKTIF · SIMULASI</small>
        <p>Sabtu, pukul 10.00</p>
      </div>
    );
  if (kind === "proposal")
    return (
      <div className={ui.proposal}>
        <small>DRAF PROPOSAL · SIMULASI</small>
        <p>
          <mark>“78% Gen Z menyukai merek yang mendukung keberlanjutan.”</mark>
        </p>
        <p>
          Angka ini dibuat untuk latihan, tanpa sumber, dan bukan statistik
          nyata.
        </p>
      </div>
    );
  return null;
}

function Activity({
  task,
  answer,
  onChange,
  id,
}: {
  task: FundamentalsTask;
  answer: Answer;
  onChange: (answer: Answer) => void;
  id: string;
}) {
  const QuestionHeading = id.startsWith("transfer-") ? "h3" : "h2";
  const feedback = useRef<HTMLDivElement>(null);
  const reveal = (next: Answer) => {
    onChange(next);
    event("ai_feedback_opened", id);
    requestAnimationFrame(() => {
      feedback.current?.focus({ preventScroll: true });
      feedback.current?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
    });
  };
  const update = (changes: Partial<Answer>) => {
    onChange({ ...answer, ...changes });
    event("ai_activity_attempted", id, { type: task.kind });
  };
  const selected = answer.selected;
  const options = task.options ?? [];
  const outcome =
    task.kind === "choice"
      ? selected.length > 0
      : task.kind === "explore"
        ? answer.active !== null
        : answer.checked;
  const rangeValid =
    answer.number.trim() !== "" &&
    Number.isFinite(Number(answer.number)) &&
    Number(answer.number) >= 0 &&
    Number(answer.number) <= 40;
  const countValid =
    selected.length >= (task.min ?? 1) &&
    selected.length <= (task.max ?? options.length);
  return (
    <section aria-label="Aktivitas" className={ui.feedback}>
      {id.startsWith("1.1-") && (
        <EverydayVisual phase={Number(id.slice(-1))} answer={answer} />
      )}
      <QuestionHeading>{task.question}</QuestionHeading>
      {task.visual &&
        task.visual !== "chart" &&
        !(task.kind === "read" && !answer.checked) && (
          <Visual kind={task.visual} answer={answer} />
        )}
      {task.kind === "estimate" && (
        <>
          <div className={ui.stat}>
            <div>
              <span>Beban pembacaan</span>
              <strong>−63,6%</strong>
            </div>
            <div>
              <span>Deteksi</span>
              <strong>+15,2%</strong>
            </div>
            <div>
              <span>Pemeriksaan lanjutan</span>
              <strong>{answer.checked ? "+14,8%" : "?"}</strong>
            </div>
          </div>
          <label htmlFor={`${id}-number`}>
            Perkiraan kenaikan relatif (0–40%)
          </label>
          <div className={ui.number}>
            <button
              className={styles.secondary}
              aria-label="Kurangi perkiraan satu persen"
              onClick={() =>
                update({
                  number: String(
                    Math.max(0, Math.min(40, Number(answer.number || 0) - 1)),
                  ),
                  checked: false,
                })
              }
            >
              −
            </button>
            <input
              id={`${id}-number`}
              type="number"
              min="0"
              max="40"
              step="0.1"
              value={answer.number}
              onChange={(e) =>
                update({ number: e.target.value, checked: false })
              }
            />
            <span>%</span>
            <button
              className={styles.secondary}
              aria-label="Tambah perkiraan satu persen"
              onClick={() =>
                update({
                  number: String(
                    Math.min(40, Math.max(0, Number(answer.number || 0) + 1)),
                  ),
                  checked: false,
                })
              }
            >
              +
            </button>
          </div>
          <div className={styles.inline}>
            <button
              className={styles.primary}
              disabled={!rangeValid}
              onClick={() => reveal({ ...answer, checked: true })}
            >
              Lihat hasil studi
            </button>
            <button
              className={styles.secondary}
              onClick={() => reveal({ ...answer, number: "", checked: true })}
            >
              Lihat tanpa menebak
            </button>
          </div>
        </>
      )}
      {(task.kind === "choice" || task.kind === "multi") && (
        <fieldset className={ui.options}>
          <legend>
            {task.kind === "choice"
              ? "Pilih satu jawaban"
              : task.min === task.max
                ? `Pilih ${task.min} bagian`
                : "Boleh pilih lebih dari satu"}
          </legend>
          {options.map((text, i) => (
            <label className={ui.option} key={text}>
              <input
                type={task.kind === "choice" ? "radio" : "checkbox"}
                name={id}
                checked={selected.includes(i)}
                disabled={
                  task.kind === "multi" &&
                  task.max !== undefined &&
                  selected.length >= task.max &&
                  !selected.includes(i)
                }
                onChange={() => {
                  const next =
                    task.kind === "choice"
                      ? [i]
                      : selected.includes(i)
                        ? selected.filter((x) => x !== i)
                        : [...selected, i];
                  update({ selected: next, checked: false });
                  if (task.kind === "choice")
                    event(
                      id.includes("check")
                        ? "ai_checkpoint_answered"
                        : "ai_feedback_opened",
                      id,
                      { choice: i },
                    );
                }}
              />
              <span>{text}</span>
            </label>
          ))}
        </fieldset>
      )}
      {task.kind === "multi" && (
        <button
          className={styles.primary}
          disabled={!countValid}
          onClick={() => reveal({ ...answer, checked: true })}
        >
          {task.checkLabel ?? "Lihat pembahasannya"}
        </button>
      )}
      {task.kind === "explore" && (
        <>
          <p className={styles.hint}>
            Buka sedikitnya {task.min ?? options.length} bagian. Terbuka:{" "}
            {answer.seen.length}.
          </p>
          <div className={styles.choices}>
            {options.map((text, i) => (
              <button
                className={styles.choice}
                key={text}
                aria-pressed={answer.active === i}
                onClick={() =>
                  update({
                    active: i,
                    seen: answer.seen.includes(i)
                      ? answer.seen
                      : [...answer.seen, i],
                  })
                }
              >
                <span aria-hidden="true">
                  {answer.seen.includes(i) ? "✓" : "+"}
                </span>
                {text}
              </button>
            ))}
          </div>
        </>
      )}
      {task.kind === "order" && (
        <>
          <ol
            className={`${styles.order} ${id === "2.3-0" ? ui.trainingOrder : ""}`}
          >
            {answer.order.map((item, pos) => (
              <li key={item}>
                {options[item]}
                <div className={styles.inline}>
                  {[-1, 1].map((direction) => (
                    <button
                      key={direction}
                      className={styles.secondary}
                      disabled={
                        pos + direction < 0 || pos + direction >= options.length
                      }
                      aria-label={`${direction < 0 ? "Naikkan" : "Turunkan"}: ${options[item]}`}
                      onClick={() => {
                        const next = [...answer.order];
                        [next[pos], next[pos + direction]] = [
                          next[pos + direction],
                          next[pos],
                        ];
                        update({ order: next, checked: false });
                      }}
                    >
                      {direction < 0 ? "↑ Naik" : "↓ Turun"}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button
            className={styles.primary}
            onClick={() => reveal({ ...answer, checked: true })}
          >
            {task.checkLabel}
          </button>
        </>
      )}
      {task.kind === "read" &&
        task.visual === "schedule" &&
        !answer.checked &&
        task.context?.map((text) => <p key={text}>{text}</p>)}
      {task.kind === "read" && (
        <button
          className={styles.primary}
          onClick={() => reveal({ ...answer, checked: true })}
        >
          {task.checkLabel ?? "Buka penjelasan"}
        </button>
      )}
      {task.kind === "reflection" && (
        <>
          {options.length > 0 && (
            <fieldset className={ui.options}>
              <legend>
                {id.startsWith("transfer-3")
                  ? "Pemeriksaan mandiri · boleh dicentang atau dilewati"
                  : task.min
                    ? "Pilih satu kategori"
                    : "Kategori · boleh dipilih atau dilewati"}
              </legend>
              {options.map((text, i) => (
                <label className={ui.option} key={text}>
                  <input
                    type={id.startsWith("transfer-3") ? "checkbox" : "radio"}
                    name={id}
                    checked={selected.includes(i)}
                    onChange={() =>
                      update({
                        selected: id.startsWith("transfer-3")
                          ? selected.includes(i)
                            ? selected.filter((x) => x !== i)
                            : [...selected, i]
                          : [i],
                      })
                    }
                  />
                  {text}
                </label>
              ))}
            </fieldset>
          )}
          {!id.startsWith("transfer-3") && (
            <label className={styles.field}>
              Catatan pribadi · opsional
              <textarea
                rows={3}
                maxLength={10000}
                value={answer.text}
                placeholder={task.context?.[0]}
                onChange={(e) => update({ text: e.target.value })}
              />
              <small>
                Tulisanmu tidak diberi skor atau dinilai otomatis. Kalau tidak
                ingin menulis, kamu tetap bisa lanjut.
              </small>
            </label>
          )}
          {task.context && task.context.length > 1 && (
            <details className={styles.more}>
              <summary>Contoh yang bisa dibuka</summary>
              {task.context.slice(1).map((text) => (
                <p key={text}>{text}</p>
              ))}
            </details>
          )}
          {answer.text && (
            <details className={styles.more}>
              <summary>Lihat catatanmu</summary>
              <p style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {answer.text}
              </p>
            </details>
          )}
        </>
      )}
      {outcome && task.kind !== "reflection" && (
        <div ref={feedback} tabIndex={-1} className={ui.discussion}>
          <p role="status" className={styles.srOnly}>
            Pembahasan tersedia di bawah aktivitas
            {task.kind === "choice"
              ? `: ${options[selected[0]]}`
              : task.kind === "explore" && answer.active !== null
                ? `: ${options[answer.active]}`
                : ""}
            .
          </p>
          <h3>Pembahasan</h3>
          {task.kind === "choice" && (
            <>
              <p className={styles.note}>
                {task.feedback?.[selected[0]] ?? task.explanation}
              </p>
              {task.correct && !task.correct.includes(selected[0]) && (
                <p>
                  Di contoh ini, pilihan yang dibahas:{" "}
                  <strong>
                    {task.correct.map((i) => options[i]).join(" / ")}
                  </strong>
                  .{" "}
                  {task.feedback
                    ? task.explanation
                    : "Kalau ingin membandingkan, kamu bisa mencoba pilihan lain."}
                </p>
              )}
            </>
          )}
          {task.kind === "explore" && (
            <p className={styles.note}>{task.feedback?.[answer.active!]}</p>
          )}
          {task.kind === "multi" && (
            <>
              {task.visual === "document" && (
                <div className={ui.receipt}>
                  <strong>Pratinjau bahan · tidak dikirim</strong>
                  {selected.map((i) => (
                    <p key={i}>{documentBlocks[i]}</p>
                  ))}
                </div>
              )}
              {task.feedback?.map((text, i) => (
                <p className={styles.note} key={i}>
                  <strong>
                    {options[i]} ·{" "}
                    {selected.includes(i) ? "kamu pilih" : "tidak kamu pilih"}
                  </strong>
                  <br />
                  {text}
                </p>
              ))}
              {task.explanation && <p>{task.explanation}</p>}
            </>
          )}
          {task.kind === "order" && (
            <>
              <p>
                Urutan contoh: <strong>{options.join(" → ")}</strong>
              </p>
              <p className={styles.note}>{task.explanation}</p>
            </>
          )}
          {task.kind === "estimate" && (
            <>
              <p>
                {answer.number === ""
                  ? "Kamu membuka hasil tanpa menebak."
                  : Math.abs(Number(answer.number) - 14.8) <= 4
                    ? "Perkiraanmu berada dalam rentang ±4 poin persentase dari hasil studi."
                    : "Perkiraanmu berbeda lebih dari 4 poin persentase dari hasil studi."}{" "}
                Perkiraan ini bukan skor pemahaman.
              </p>
              <p className={styles.note}>{task.explanation}</p>
            </>
          )}
          {task.kind === "read" && (
            <>
              {task.context?.map((text) => (
                <p className={styles.note} key={text}>
                  {text}
                </p>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  );
}

function newSession(): Session {
  const answers: Session["answers"] = {};
  for (const [id, tasks] of Object.entries(fundamentalsTasks))
    tasks.forEach((task, i) => {
      if (task.kind === "order")
        answers[`${id}-${i}`] = {
          ...emptyAnswer,
          order: shuffled(task.options!.length),
        };
    });
  return { ...initial, mode: "learning", answers };
}
function restore(raw: string): Session | null {
  const parsed = sessionSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) return null;
  const value = parsed.data;
  const current = fundamentalsSections[value.index];
  if (!fundamentalsTasks[current.id]?.[value.phase]) return null;
  for (const [key, answer] of Object.entries(value.answers)) {
    const split = key.lastIndexOf("-");
    const id = key.slice(0, split),
      phase = Number(key.slice(split + 1));
    const task = (
      id === "transfer" ? scholarshipTasks : fundamentalsTasks[id]
    )?.[phase];
    if (!task || !validAnswer(task, answer)) return null;
  }
  // Every shuffled activity has its own stable order, including unvisited screens.
  for (const [id, tasks] of Object.entries(fundamentalsTasks)) {
    if (
      tasks.some(
        (task, i) => task.kind === "order" && !value.answers[`${id}-${i}`],
      )
    )
      return null;
  }
  return value;
}

export function AiFundamentalsPilot({ storageKey: sessionKey = storageKey, backHref = "/dev/yes-man-pilot", completion }: { storageKey?: string; backHref?: string; completion?: ReactNode } = {}) {
  const [session, setSession] = useState<Session>(initial);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [restart, setRestart] = useState(false);
  const [storage, setStorage] = useState<"idle" | "saved" | "failed">("idle");
  const [transferOpen, setTransferOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const transferHeading = useRef<HTMLHeadingElement>(null);
  const section = fundamentalsSections[session.index];
  const tasks = fundamentalsTasks[section.id];
  const task = tasks[session.phase];
  const key = `${section.id}-${session.phase}`;
  const answer = session.answers[key] ?? emptyAnswer;
  const minimum = optionalAfter[section.id];
  const attempted = tasks.filter((item, i) =>
    ready(item, session.answers[`${section.id}-${i}`] ?? emptyAnswer),
  ).length;
  const canLeaveEarly = minimum !== undefined && attempted >= minimum;
  const lessonStart = fundamentalsSections.findIndex(
    (item) => item.lesson === section.lesson,
  );
  const lessonCount = fundamentalsSections.filter(
    (item) => item.lesson === section.lesson,
  ).length;
  const position = session.index - lessonStart + 1;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(sessionKey);
        if (saved) {
          const value = restore(saved);
          if (value) {
            setSession(value);
            setPaused(value.mode !== "intro");
            setStorage("saved");
          }
        }
      } catch {
        setStorage("failed");
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [sessionKey]);
  useEffect(() => {
    if (!loaded || session.mode === "intro") return;
    let status: "saved" | "failed" = "saved";
    try {
      localStorage.setItem(sessionKey, JSON.stringify(session));
    } catch {
      status = "failed";
    }
    const frame = requestAnimationFrame(() => setStorage(status));
    return () => cancelAnimationFrame(frame);
  }, [loaded, session, sessionKey]);
  useEffect(() => {
    if (!loaded) return;
    const target =
      transferOpen && !paused && !restart && session.mode === "complete"
        ? transferHeading.current
        : heading.current;
    target?.focus({ preventScroll: true });
    if (session.mode !== "intro" || paused || restart)
      target?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [
    loaded,
    paused,
    restart,
    session.index,
    session.phase,
    session.mode,
    session.transferPhase,
    transferOpen,
  ]);

  function patch(changes: Partial<Session>) {
    setSession((old) => ({ ...old, ...changes }));
  }
  function changeAnswer(id: string, value: Answer) {
    setSession((old) => ({ ...old, answers: { ...old.answers, [id]: value } }));
  }
  function begin() {
    setSession(newSession());
    setPaused(false);
    event("ai_fundamentals_started");
    event("ai_lesson_started", "1.1", { lesson: 1 });
  }
  function clear() {
    try {
      localStorage.removeItem(sessionKey);
      setStorage("idle");
    } catch {
      setStorage("failed");
    }
    setSession(initial);
    setPaused(false);
    setRestart(false);
    setTransferOpen(false);
    setSummaryOpen(false);
  }
  function nextSection() {
    if (section.id.endsWith("check"))
      event("ai_lesson_completed", section.id, { lesson: section.lesson });
    if (session.index === fundamentalsSections.length - 1) {
      patch({ mode: "complete" });
      event("ai_fundamentals_completed");
    } else {
      const next = fundamentalsSections[session.index + 1];
      patch({ index: session.index + 1, phase: 0 });
      if (next.lesson !== section.lesson)
        event("ai_lesson_started", next.id, { lesson: next.lesson });
    }
  }
  function next() {
    if (!ready(task, answer)) return;
    if (session.phase < tasks.length - 1) patch({ phase: session.phase + 1 });
    else nextSection();
  }
  function back() {
    if (session.phase > 0) patch({ phase: session.phase - 1 });
    else if (session.index > 0) {
      const previous = fundamentalsSections[session.index - 1];
      patch({
        index: session.index - 1,
        phase: fundamentalsTasks[previous.id].length - 1,
      });
    } else patch({ mode: "intro" });
  }
  const storageMessage =
    storage === "saved"
      ? "Progres tersimpan di browser ini. Progres lokal belum tentu ikut saat berpindah browser atau perangkat."
      : storage === "failed"
        ? "Progres belum tersimpan di browser ini. Kamu masih bisa melanjutkan selama halaman tetap terbuka."
        : "Progres dan catatan disimpan di browser ini saat kamu mulai belajar.";
  const extraParagraphs = section.extra.split("\n\n").filter(Boolean);
  const checkpoint = section.id.endsWith("check");
  return (
    <main
      data-nusa-theme="light"
      data-lesson={session.mode === "intro" ? 0 : section.lesson}
      className={`${ui.shell} ${ui.study}`}
    >
      <header className={ui.studyHeader}>
        <span className={ui.wordmark}>
          NUSA <span>Lab</span>
        </span>
        <Link className={ui.backLink} href={backHref}>
          ← Kembali ke daftar materi
        </Link>
      </header>
      <div className={ui.studyLayout}>
        <aside className={ui.lessonRail} aria-label="Pelajaran AI Fundamentals">
          <p className={ui.railCaption}>KURSUS 01 · DASAR AI</p>
          <h2>AI Fundamentals</h2>
          <ol>
            {lessonNames.map((name, i) => (
              <li
                key={name}
                aria-current={
                  session.mode === "learning" && section.lesson === i + 1
                    ? "step"
                    : undefined
                }
              >
                <span className={ui.lessonNumber} aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <strong>{name}</strong>
                </div>
              </li>
            ))}
          </ol>
        </aside>
        <div className={`${styles.pilot} ${ui.studyBody}`}>
          {!loaded ? (
            <p role="status">Menyiapkan materi…</p>
          ) : restart ? (
            <section>
              <h1 ref={heading} tabIndex={-1} className={ui.title}>
                Mulai dari awal?
              </h1>
              <p>
                Progres, pilihan, urutan kartu, dan catatan AI Fundamentals akan
                dikosongkan. Progres Prompt Engineering tetap tersimpan.
              </p>
              <div className={styles.actions}>
                <button
                  className={styles.secondary}
                  onClick={() => setRestart(false)}
                >
                  Batal
                </button>
                <button className={styles.primary} onClick={clear}>
                  Hapus progres dan mulai ulang
                </button>
              </div>
            </section>
          ) : paused ? (
            <section>
              <p className={styles.kicker}>DASAR AI · JEDA</p>
              <h1 ref={heading} tabIndex={-1} className={ui.title}>
                Mau melanjutkan belajar?
              </h1>
              <p>
                {session.mode === "complete"
                  ? "Kamu sudah menyelesaikan tiga pelajaran. Ringkasan dan latihan tambahan masih bisa dibuka."
                  : `Terakhir: ${lessonNames[section.lesson - 1]} · ${position}/${lessonCount}, aktivitas ${session.phase + 1}/${tasks.length}.`}
              </p>
              <p className={ui.storage}>{storageMessage}</p>
              <div className={styles.actions}>
                <button
                  className={styles.secondary}
                  onClick={() => setRestart(true)}
                >
                  Mulai dari awal
                </button>
                <button
                  className={styles.primary}
                  onClick={() => setPaused(false)}
                >
                  Lanjutkan
                </button>
              </div>
            </section>
          ) : session.mode === "intro" ? (
            <section className={ui.introduction}>
              <div className={ui.introVisual} aria-hidden="true">
                <div className={ui.introEnvelope}>
                  <span className={ui.envelope} />
                </div>
                <div className={ui.introRecord}>
                  <span className={ui.record} />
                </div>
                <div className={ui.introPage}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <p className={styles.kicker}>KURSUS 01 · DASAR AI</p>
              <h1 ref={heading} tabIndex={-1} className={ui.title}>
                Kenalan dengan AI dari hal-hal yang sudah dekat dengan kita
              </h1>
              {fundamentalsIntroduction.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <details className={styles.more}>
                <summary>Lihat isi pelajaran</summary>
                <ol>
                  <li>
                    AI Hari Ini: apa yang sudah bisa dilakukan AI, dan bagaimana
                    memeriksa hasilnya?
                  </li>
                  <li>
                    Sebenarnya, Apa Itu AI?: bagaimana aturan, data, dan model
                    bekerja?
                  </li>
                  <li>
                    Berpikir di Era AI: bagaimana memakai bantuan AI dalam
                    tugasmu sendiri?
                  </li>
                </ol>
              </details>
              <p className={styles.hint}>
                Target belajar sekitar 15–20 menit untuk jalur utama. Bacaan
                tambahan bersifat opsional. Semua contoh latihan sudah disiapkan
                sebagai simulasi.
              </p>
              <div className={styles.actions}>
                <button className={styles.primary} onClick={begin}>
                  Mulai belajar
                </button>
              </div>
              <Glossary />
            </section>
          ) : session.mode === "complete" ? (
            <section>
              <p className={styles.kicker}>DASAR AI · SELESAI</p>
              {completion}
              <h1 ref={heading} tabIndex={-1} className={ui.title}>
                Sekarang, coba untuk tugasmu sendiri
              </h1>
              <p>
                Kamu sudah melihat apa saja yang bisa dilakukan AI, bagaimana
                beberapa sistem bekerja, dan mengapa hasilnya tetap perlu
                diperiksa. Saat memakainya untuk tugasmu sendiri, mulai dari
                kebutuhan yang jelas. Tentukan bagian yang ingin dibantu, cek
                hal yang penting, lalu putuskan apa yang benar-benar layak
                dipakai.
              </p>
              <p>
                Kalau ada bagian yang masih terasa belum jelas, kamu bisa
                kembali ke contoh atau membuka glosarium. Setelah itu, coba bawa
                pola yang sama ke satu situasi baru di bawah ini.
              </p>
              <div className={styles.choices}>
                <Link className={ui.backLink} href={backHref}>
                  Kembali ke daftar materi
                </Link>
                <button
                  className={styles.secondary}
                  aria-expanded={summaryOpen}
                  onClick={() => setSummaryOpen(!summaryOpen)}
                >
                  Lihat ringkasan tiga pelajaran
                </button>
                <button
                  className={styles.primary}
                  aria-expanded={transferOpen}
                  onClick={() => setTransferOpen(!transferOpen)}
                >
                  Coba situasi baru · opsional
                </button>
              </div>
              {summaryOpen && (
                <section className={ui.diagram}>
                  <div>
                    <h2>AI Hari Ini</h2>
                    <p>
                      AI mengerjakan tugas yang berbeda. Baca capaian sesuai
                      pengujiannya, dan pilih bukti yang sesuai sebelum memakai
                      hasil.
                    </p>
                  </div>
                  <div>
                    <h2>Sebenarnya, Apa Itu AI?</h2>
                    <p>
                      Aturan, pelatihan dari data, dan pemakaian model merupakan
                      proses yang berbeda. Deep learning adalah bagian dari
                      machine learning; generatif menjelaskan kemampuan membuat
                      konten.
                    </p>
                  </div>
                  <div>
                    <h2>Berpikir di Era AI</h2>
                    <p>
                      Tentukan kebutuhan, gunakan bantuan, cek hal penting, lalu
                      putuskan. Pahami hasil dan libatkan pihak yang berwenang.
                    </p>
                  </div>
                  <details className={styles.more}>
                    <summary>Buka kembali bagian pelajaran</summary>
                    {fundamentalsSections.map((item, i) => (
                      <button
                        className={styles.choice}
                        key={item.id}
                        onClick={() => {
                          patch({ mode: "learning", index: i, phase: 0 });
                          setTransferOpen(false);
                        }}
                      >
                        <span aria-hidden="true">→</span>
                        {item.id} · {item.title}
                      </button>
                    ))}
                  </details>
                </section>
              )}
              {transferOpen && (
                <section className={styles.transfer}>
                  <h2 ref={transferHeading} tabIndex={-1}>
                    Pengumuman beasiswa · latihan opsional
                  </h2>
                  <p>
                    Komunitasmu ingin membuat pengumuman beasiswa dari satu
                    dokumen resmi. Draf AI menambahkan tanggal penutupan, angka
                    peluang diterima, dan tautan pendaftaran. Ketiganya tidak
                    ada di dokumen.
                  </p>
                  <div className={ui.receipt}>
                    <small>DOKUMEN FIKTIF · SIMULASI</small>
                    <p>
                      Program: Beasiswa Komunitas Contoh.
                      <br />
                      Persyaratan dasar: peserta aktif dalam kegiatan komunitas
                      dan mengirim surat motivasi.
                      <br />
                      Kontak penyelenggara: panitia@example.invalid (alamat
                      ilustrasi, bukan kontak nyata).
                    </p>
                    <small>DRAF AI · SIMULASI</small>
                    <p>
                      Pendaftaran ditutup 30 November. Peluang diterima 80%.
                      Daftar di https://beasiswa-contoh.example.invalid. Ketiga
                      tambahan ini dibuat untuk latihan.
                    </p>
                  </div>
                  <Activity
                    key={`transfer-${session.transferPhase}`}
                    id={`transfer-${session.transferPhase}`}
                    task={scholarshipTasks[session.transferPhase]}
                    answer={
                      session.answers[`transfer-${session.transferPhase}`] ??
                      emptyAnswer
                    }
                    onChange={(value) => {
                      changeAnswer(`transfer-${session.transferPhase}`, value);
                      event("ai_transfer_attempted");
                    }}
                  />
                  <div className={styles.actions}>
                    <button
                      className={styles.secondary}
                      disabled={session.transferPhase === 0}
                      onClick={() =>
                        patch({ transferPhase: session.transferPhase - 1 })
                      }
                    >
                      ← Kembali
                    </button>
                    {session.transferPhase < 3 ? (
                      <button
                        className={styles.primary}
                        disabled={
                          !ready(
                            scholarshipTasks[session.transferPhase],
                            session.answers[
                              `transfer-${session.transferPhase}`
                            ] ?? emptyAnswer,
                          )
                        }
                        onClick={() =>
                          patch({ transferPhase: session.transferPhase + 1 })
                        }
                      >
                        Langkah berikutnya →
                      </button>
                    ) : (
                      <button
                        className={styles.primary}
                        onClick={() => setTransferOpen(false)}
                      >
                        Selesai meninjau
                      </button>
                    )}
                  </div>
                </section>
              )}
              <Glossary />
            </section>
          ) : (
            <article className={ui.lessonArticle}>
              <header className={`${styles.top} ${ui.lessonTop}`}>
                <span>
                  {lessonNames[section.lesson - 1]} · {position}/{lessonCount}
                </span>
                <button onClick={() => setPaused(true)}>
                  Jeda dan lanjutkan nanti
                </button>
              </header>
              <div
                className={`${styles.progress} ${ui.lessonProgress}`}
                role="progressbar"
                aria-label="Progres AI Fundamentals"
                aria-valuemin={0}
                aria-valuemax={32}
                aria-valuenow={session.index + 1}
              >
                <span
                  style={{ width: `${((session.index + 1) / 32) * 100}%` }}
                />
              </div>
              <p className={styles.kicker}>
                {checkpoint
                  ? "CEK PEMAHAMAN"
                  : `PELAJARAN ${section.lesson} · ${section.id}`}
              </p>
              <h1 ref={heading} tabIndex={-1} className={ui.title}>
                {section.title}
              </h1>
              {position === 1 && (
                <section
                  className={`${styles.theory} ${ui.lessonIntroduction}`}
                >
                  <p>{lessonIntroductions[section.lesson - 1]}</p>
                </section>
              )}
              {session.phase === 0 ? (
                section.paragraphs.map((text) => (
                  <p className={ui.reading} key={text}>
                    {text}
                  </p>
                ))
              ) : (
                <details
                  key={`context-${section.id}-${session.phase}`}
                  className={styles.facts}
                >
                  <summary>Buka kembali penjelasan bagian ini</summary>
                  {section.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </details>
              )}
              {section.id === "3.2" && (
                <Visual kind="chart" answer={emptyAnswer} />
              )}
              {section.id === "1.2" && session.phase > 0 && (
                <p className={styles.note}>
                  {session.phase < 2
                    ? "Capaian yang diuji: Gemini Deep Think menyelesaikan lima dari enam soal IMO 2025, dengan skor 35/42."
                    : "Capaian yang dibahas: AlphaFold2 membantu memprediksi struktur tiga dimensi protein dari urutan asam amino."}
                </p>
              )}
              <SourceLinks section={section.id} />
              {section.id === "1.2" && (
                <details className={styles.more}>
                  <summary>Ilustrasi struktur protein</summary>
                  <Image
                    className={ui.figure}
                    src={proteinVisual}
                    sizes="(max-width: 850px) 100vw, 850px"
                    alt="Ilustrasi bentuk tiga dimensi protein, bukan hasil pengembangan obat"
                  />
                  <p className={styles.hint}>
                    Ilustrasi struktur AlphaFold · CC0 menurut sumber materi.
                  </p>
                </details>
              )}
              {section.id === "1.10" && (
                <details className={styles.facts} open>
                  <summary>Panduan kampus fiktif · simulasi</summary>
                  <p>
                    Mahasiswa diminta menyebutkan bantuan AI pada tugas dan
                    tetap bertanggung jawab atas isi tugasnya. Panduan ini
                    dibuat untuk latihan, bukan aturan seluruh kampus.
                  </p>
                </details>
              )}
              {section.id === "2.7" && session.phase === 1 && (
                <Visual kind="schedule" answer={emptyAnswer} />
              )}
              {section.id === "1.7" && session.phase === 1 && (
                <details className={styles.facts}>
                  <summary>Buka kembali bukti yang kamu periksa</summary>
                  <Visual
                    kind="receipt"
                    answer={session.answers["1.7-0"] ?? emptyAnswer}
                  />
                  <p className={styles.hint}>
                    Jika riwayat penerima belum dibuka, bukti uang masuk belum
                    kamu periksa. Kamu bisa kembali untuk membukanya.
                  </p>
                </details>
              )}
              {minimum !== undefined && (
                <div
                  className={styles.choices}
                  aria-label="Contoh yang tersedia"
                >
                  {tasks.map((item, i) => (
                    <button
                      key={i}
                      className={styles.choice}
                      aria-pressed={session.phase === i}
                      onClick={() => patch({ phase: i })}
                    >
                      <span aria-hidden="true">
                        {ready(
                          item,
                          session.answers[`${section.id}-${i}`] ?? emptyAnswer,
                        )
                          ? "✓"
                          : "+"}
                      </span>
                      {section.id === "3.5"
                        ? [
                            "Tujuan proposal",
                            "Rincian biaya",
                            "Sumber angka",
                            "Janji sponsor",
                            "Evaluasi alat baru",
                          ][i]
                        : section.id === "3.9"
                          ? [
                              "Kutipan",
                              "Pembayaran",
                              "Data orang lain",
                              "Belajar",
                            ][i]
                          : [
                              "Memeriksa artikel",
                              "Menjalankan tes",
                              "Memperbaiki file",
                            ][i]}
                    </button>
                  ))}
                  <p className={styles.hint}>
                    Coba sedikitnya {minimum}{" "}
                    {section.id === "3.5" ? "tindakan" : "kasus"}. Sudah dicoba:{" "}
                    {attempted}. Sisanya boleh dibaca sebagai tambahan.
                  </p>
                </div>
              )}
              {tasks.length > 1 && (
                <p className={styles.phaseIndicator}>
                  Aktivitas {session.phase + 1} dari {tasks.length}
                </p>
              )}
              <Activity
                key={key}
                id={key}
                task={task}
                answer={answer}
                onChange={(value) => changeAnswer(key, value)}
              />
              {section.id === "3.7" &&
                session.phase === 4 &&
                answer.checked && (
                  <>
                    <div className={ui.receipt}>
                      {tasks.slice(0, 4).map((item, i) => (
                        <p key={i}>
                          <strong>{item.question}</strong>
                          <br />
                          {(session.answers[`3.7-${i}`]?.selected ?? [])
                            .map((v) => item.options?.[v])
                            .join("; ") || "Belum dipilih"}
                        </p>
                      ))}
                    </div>
                    <button
                      className={styles.secondary}
                      onClick={() => patch({ phase: 0 })}
                    >
                      Ubah keputusan
                    </button>
                  </>
                )}
              {checkpoint && answer.selected.length > 0 && (
                <button
                  className={styles.secondary}
                  onClick={() => {
                    changeAnswer(key, emptyAnswer);
                    event("ai_activity_retried", section.id);
                  }}
                >
                  Coba lagi
                </button>
              )}
              {section.extra && (
                <details
                  key={`extra-${section.id}`}
                  className={styles.more}
                  onToggle={(e) => {
                    if (e.currentTarget.open)
                      event("ai_optional_explanation_opened", section.id);
                  }}
                >
                  <summary>Kalau penasaran</summary>
                  {extraParagraphs.map((text) =>
                    text.startsWith("- ") ? (
                      <ul key={text}>
                        {text.split("\n").map((line) => (
                          <li key={line}>{line.replace(/^- /, "")}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={text}>{text}</p>
                    ),
                  )}
                </details>
              )}
              <Glossary key={`glossary-${section.id}-${session.phase}`} />
              {((session.phase === tasks.length - 1 && ready(task, answer)) ||
                canLeaveEarly) &&
                section.transition && (
                  <p className={styles.note}>{section.transition}</p>
                )}
              <footer className={styles.actions}>
                <button className={styles.secondary} onClick={back}>
                  ← Kembali
                </button>
                {canLeaveEarly ? (
                  <button className={styles.primary} onClick={nextSection}>
                    {section.next}
                  </button>
                ) : (
                  <button
                    className={styles.primary}
                    disabled={!ready(task, answer)}
                    onClick={next}
                  >
                    {session.phase < tasks.length - 1
                      ? "Langkah berikutnya →"
                      : section.next}
                  </button>
                )}
              </footer>
            </article>
          )}
          {loaded && (
            <p role="status" className={ui.storage}>
              {storageMessage}
            </p>
          )}
          <p className={styles.simulation}>
            Contoh latihan, dokumen, transaksi, dan percakapan adalah simulasi.
            Tidak ada bahan atau catatan pribadi yang dikirim ke layanan AI.
          </p>
        </div>
      </div>
    </main>
  );
}
