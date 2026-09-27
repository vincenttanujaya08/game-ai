"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { DiagramId, DiagramSpec } from "./types";
import styles from "./diagram.module.css";

/**
 * Aturan yang dipakai semua diagram di sini:
 * geometri dan label pendek digambar di SVG; kalimat penjelas ditulis sebagai
 * HTML di luar SVG supaya tidak pernah terpotong dan ikut mengalir di layar kecil.
 */

const described: Record<DiagramId, { title: string; desc: string }> = {
  "token-stream": {
    title: "Model bahasa menyusun jawaban satu potongan demi satu potongan",
    desc: "Kalimat tumbuh sepotong demi sepotong. Pada tiap langkah model menimbang beberapa kandidat lanjutan beserta bobotnya, lalu memilih satu dan mengulang prosesnya.",
  },
  "train-vs-infer": {
    title: "Training memakai contoh berlabel, prediksi memakai data baru",
    desc: "Di fase training, banyak contoh berlabel dipakai berulang untuk menyesuaikan model. Di fase prediksi, satu data baru tanpa label masuk ke model yang sudah jadi dan keluar sebagai jawaban.",
  },
  "context-window": {
    title: "Context window punya batas, isi terlama terdorong keluar",
    desc: "Percakapan disimpan sebagai potongan di dalam jendela berukuran tetap. Ketika potongan baru masuk dan jendelanya penuh, potongan terlama jatuh keluar dan tidak lagi dipakai.",
  },
  "classify-boundary": {
    title: "Batas pemisah bergeser saat contoh bertambah",
    desc: "Model menarik garis pemisah antara dua kelompok data. Menambah contoh baru menggeser garis itu, jadi jawaban model ikut berubah tanpa ada aturan yang ditulis ulang.",
  },
  "agent-loop": {
    title: "Agent bekerja dalam putaran tujuan, rencana, alat, dan pemeriksaan",
    desc: "Agent menerima tujuan, menyusun rencana, memakai alat untuk bertindak, lalu memeriksa hasilnya. Bila hasilnya belum sesuai, putaran diulang dari rencana.",
  },
  "citation-chain": {
    title: "Rantai dari klaim ke dokumen bisa putus di tengah",
    desc: "Sebuah klaim menunjuk sitasi, dan sitasi seharusnya menunjuk dokumen yang bisa dibuka. Kalau mata rantai terakhir putus, klaim itu terlihat bersumber padahal tidak bisa diperiksa.",
  },
  "permission-gate": {
    title: "Tiga jalur izin untuk tindakan agent",
    desc: "Setiap tindakan agent melewati gerbang izin. Allow menjalankan langsung, Ask meminta persetujuanmu dulu, dan Deny menolak tindakan itu.",
  },
};

type FrameProps = {
  id: DiagramId;
  children: ReactNode;
  controls?: ReactNode;
  /** Kalimat yang menerangkan apa yang sedang digambar. */
  note: ReactNode;
  caption: string;
};

function Frame({ id, children, controls, note, caption }: FrameProps) {
  return (
    <figure className={styles.figure}>
      {/*
        Di layar sempit kotak ini bisa digeser mendatar, jadi ia harus bisa
        dicapai dan digeser dengan keyboard, bukan hanya dengan jari.
      */}
      <div
        className={styles.frame}
        role="group"
        tabIndex={0}
        aria-label={"Diagram: " + described[id].title}
      >
        {children}
      </div>
      <p className={styles.note}>{note}</p>
      {controls}
      <figcaption className={styles.caption}>
        {caption} <span className="nusa-sr-only">{described[id].desc}</span>
      </figcaption>
    </figure>
  );
}

/**
  Dibaca sesudah mount supaya markup server dan klien tetap sama. Saat pembaca
  meminta pengurangan animasi, tombol pemutar disembunyikan: browsernya memang
  tidak akan menjalankan animasinya.
*/
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/** Animasi bertahap hanya aktif sesudah pembaca memintanya. */
function stepClass(run: number) {
  return run > 0 ? styles.step + " " + styles.stepAnimated : styles.step;
}

function svgProps(id: DiagramId, viewBox: string) {
  return { viewBox, role: "img" as const, "aria-label": described[id].title };
}

const arrowDefs = (
  <defs>
    <marker id="nusa-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
    </marker>
    <marker id="nusa-arrow-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L10 5 L0 10 z" fill="var(--teal)" />
    </marker>
  </defs>
);

/** Kalimat tumbuh sepotong demi sepotong, dengan kandidat lanjutan dan bobotnya. */
function TokenStream({ caption }: { caption: string }) {
  const [run, setRun] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const tokens = ["Ibu", "kota", "Indonesia", "adalah"];
  const candidates: [string, number][] = [["Jakarta", 0.71], ["Nusantara", 0.19], ["Bandung", 0.04]];

  return (
    <Frame
      id="token-stream"
      caption={caption}
      note="Bobot kandidat berasal dari pola data latih, bukan dari pengecekan fakta."
      controls={reducedMotion ? undefined : (
        <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
          {run > 0 ? "Putar ulang" : "Lihat urutannya"}
        </button>
      )}
    >
      <svg key={run} {...svgProps("token-stream", "0 0 560 196")}>
        <text x="0" y="14" className={styles.eyebrow}>SATU LANGKAH DEMI SATU LANGKAH</text>
        {tokens.map((token, index) => (
          <g key={token} className={stepClass(run)} style={{ animationDelay: index * 260 + "ms" }}>
            <rect x={index * 122} y="30" width="108" height="40" rx="2" className={styles.box} />
            <text x={index * 122 + 54} y="55" textAnchor="middle" className={styles.label}>{token}</text>
          </g>
        ))}
        <g className={stepClass(run)} style={{ animationDelay: tokens.length * 260 + "ms" }}>
          <rect x="488" y="30" width="70" height="40" rx="2" className={styles.boxActive} strokeDasharray="5 4" />
          <text x="523" y="56" textAnchor="middle" className={styles.label}>?</text>
        </g>

        <text x="0" y="106" className={styles.eyebrow}>KANDIDAT LANJUTAN</text>
        {candidates.map(([word, weight], index) => (
          <g key={word} className={stepClass(run)} style={{ animationDelay: (tokens.length + 1) * 260 + index * 130 + "ms" }}>
            <text x="0" y={134 + index * 28} className={styles.small}>{word}</text>
            <rect x="120" y={123 + index * 28} width={340 * weight} height="14" className={index === 0 ? styles.bar : styles.barMuted} />
            <text x={130 + 340 * weight} y={135 + index * 28} className={styles.small}>{Math.round(weight * 100)}%</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/** Dua fase terpisah tegas: belajar dari contoh berlabel, lalu memakai model. */
function TrainVsInfer({ caption }: { caption: string }) {
  return (
    <Frame
      id="train-vs-infer"
      caption={caption}
      note="Fase kiri terjadi sekali, jauh sebelum kamu memakainya. Fase kanan yang kamu jalankan setiap hari."
    >
      <svg {...svgProps("train-vs-infer", "0 0 560 230")}>
        <text x="0" y="14" className={styles.eyebrow}>FASE 1 · TRAINING</text>
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <rect x="0" y={30 + row * 34} width="122" height="26" rx="2" className={styles.box} />
            <text x="10" y={48 + row * 34} className={styles.small}>foto {row + 1}</text>
            <circle cx="104" cy={43 + row * 34} r="7" className={row === 1 ? styles.dotB : styles.dotA} />
            <path d={"M128 " + (43 + row * 34) + " H184"} className={styles.arrow} markerEnd="url(#nusa-arrow-muted)" />
          </g>
        ))}
        <text x="0" y="150" className={styles.small}>contoh + label</text>

        <rect x="192" y="38" width="112" height="90" rx="2" className={styles.boxInk} />
        <text x="248" y="78" textAnchor="middle" className={styles.onInk}>Model</text>
        <text x="248" y="98" textAnchor="middle" className={styles.onInkSmall}>menyesuaikan</text>
        <path d="M248 134 v22 h-56" className={styles.arrow} markerEnd="url(#nusa-arrow-muted)" />
        <text x="150" y="176" className={styles.small}>diulang berkali-kali</text>

        <path d="M330 18 V214" className={styles.arrow} strokeDasharray="4 6" />

        <text x="352" y="14" className={styles.eyebrow}>FASE 2 · PREDIKSI</text>
        <rect x="352" y="30" width="112" height="28" rx="2" className={styles.box} />
        <text x="362" y="49" className={styles.small}>foto baru</text>
        <path d="M408 62 V86" className={styles.arrowTeal} markerEnd="url(#nusa-arrow-teal)" />
        <rect x="352" y="92" width="112" height="44" rx="2" className={styles.boxInk} />
        <text x="408" y="120" textAnchor="middle" className={styles.onInk}>Model</text>
        <path d="M408 142 V166" className={styles.arrowTeal} markerEnd="url(#nusa-arrow-teal)" />
        <rect x="352" y="170" width="112" height="34" rx="2" className={styles.boxActive} />
        <text x="408" y="192" textAnchor="middle" className={styles.label}>kucing</text>
        <text x="352" y="222" className={styles.small}>tanpa label</text>
        {arrowDefs}
      </svg>
    </Frame>
  );
}

/** Jendela berukuran tetap: potongan baru masuk, potongan terlama jatuh keluar. */
function ContextWindow({ caption }: { caption: string }) {
  const capacity = 4;
  const chunks = ["Pertanyaan awal", "Dokumen yang diunggah", "Jawaban sebelumnya", "Koreksi kamu", "Pertanyaan baru"];
  const [filled, setFilled] = useState(capacity - 2);
  const visible = chunks.slice(Math.max(0, filled + 1 - capacity), filled + 1);
  const dropped = filled + 1 > capacity ? chunks[filled - capacity] : null;

  return (
    <Frame
      id="context-window"
      caption={caption}
      note={dropped
        ? "‘" + dropped + "’ jatuh keluar jendela. Model tidak lagi memakainya untuk menjawab, meski kamu masih mengingatnya."
        : "Jendela masih muat. Tambahkan potongan sampai penuh untuk melihat apa yang terjadi."}
      controls={
        <div className={styles.controls}>
          <button type="button" disabled={filled >= chunks.length - 1} onClick={() => setFilled((value) => Math.min(chunks.length - 1, value + 1))}>
            Tambah satu potongan
          </button>
          <button type="button" onClick={() => setFilled(capacity - 2)}>Atur ulang</button>
        </div>
      }
    >
      <svg {...svgProps("context-window", "0 0 560 196")}>
        <text x="0" y="14" className={styles.eyebrow}>JENDELA KONTEKS · MUAT {capacity} POTONGAN</text>
        <rect x="0" y="26" width="356" height="166" rx="2" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {visible.map((chunk, index) => (
          <g key={chunk} className={styles.slide}>
            <rect x="14" y={38 + index * 38} width="328" height="30" rx="2" className={index === visible.length - 1 ? styles.boxActive : styles.box} />
            <text x="26" y={58 + index * 38} className={styles.small}>{chunk}</text>
          </g>
        ))}
        {dropped ? (
          <g>
            <path d="M370 52 H420" className={styles.arrowBroken} />
            <g className={styles.faded}>
              <rect x="428" y="38" width="132" height="30" rx="2" className={styles.box} strokeDasharray="5 4" />
              <text x="438" y="58" className={styles.small}>{dropped}</text>
            </g>
            <text x="428" y="86" className={styles.small}>terdorong keluar</text>
          </g>
        ) : (
          <text x="372" y="58" className={styles.small}>masih muat</text>
        )}
        {arrowDefs}
      </svg>
    </Frame>
  );
}

/** Garis pemisah bergeser ketika contoh baru ditambahkan. */
function ClassifyBoundary({ caption }: { caption: string }) {
  const [extra, setExtra] = useState(false);
  const base: [number, number, "a" | "b"][] = [
    [70, 58, "a"], [120, 36, "a"], [96, 100, "a"], [150, 82, "a"], [58, 122, "a"],
    [300, 142, "b"], [352, 116, "b"], [318, 88, "b"], [376, 162, "b"], [268, 176, "b"],
  ];
  const added: [number, number, "a" | "b"][] = [[214, 142, "a"], [190, 176, "a"]];
  const points = extra ? [...base, ...added] : base;

  return (
    <Frame
      id="classify-boundary"
      caption={caption}
      note={extra
        ? "Dua contoh baru menggeser batasnya, dan tidak satu pun aturan ditulis ulang."
        : "Batas ini ditarik dari contoh, bukan dari aturan yang kita tulis sendiri."}
      controls={
        <div className={styles.controls}>
          <button type="button" aria-pressed={!extra} onClick={() => setExtra(false)}>10 contoh</button>
          <button type="button" aria-pressed={extra} onClick={() => setExtra(true)}>12 contoh</button>
        </div>
      }
    >
      <svg {...svgProps("classify-boundary", "0 0 440 214")}>
        <text x="0" y="14" className={styles.eyebrow}>CONTOH BERLABEL DAN BATAS YANG DIPELAJARI</text>
        <rect x="0" y="24" width="440" height="180" fill="#fafcfc" stroke="var(--line)" strokeWidth="1.5" />
        <path d={extra ? "M150 204 L300 24" : "M110 204 L268 24"} className={styles.arrowTeal} />
        {points.map(([x, y, kind], index) => (
          <circle key={kind + index} cx={x} cy={y + 14} r="8" className={kind === "a" ? styles.dotA : styles.dotB} />
        ))}
      </svg>
    </Frame>
  );
}

/** Putaran kerja agent, dengan langkah yang menyala bergiliran. */
function AgentLoop({ caption }: { caption: string }) {
  const [run, setRun] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const steps = [
    // Catatan dijaga pendek supaya tidak meluber keluar kotak selebar 122 unit.
    { label: "Tujuan", x: 8, note: "dari kamu" },
    { label: "Rencana", x: 146, note: "agent menyusun" },
    { label: "Alat", x: 284, note: "agent bertindak" },
    { label: "Cek", x: 422, note: "kamu menilai" },
  ];

  return (
    <Frame
      id="agent-loop"
      caption={caption}
      note="Langkah pertama dan terakhir tetap milik manusia. Yang di tengah boleh diulang berkali-kali."
      controls={reducedMotion ? undefined : (
        <button type="button" className={styles.replay} onClick={() => setRun((value) => value + 1)}>
          {run > 0 ? "Putar ulang" : "Lihat urutannya"}
        </button>
      )}
    >
      <svg key={run} {...svgProps("agent-loop", "0 0 560 148")}>
        {steps.map((step, index) => (
          <g key={step.label} className={stepClass(run)} style={{ animationDelay: index * 300 + "ms" }}>
            <rect x={step.x} y="16" width="122" height="54" rx="2" className={index === 0 || index === 3 ? styles.boxActive : styles.box} />
            <text x={step.x + 61} y="40" textAnchor="middle" className={styles.label}>{step.label}</text>
            <text x={step.x + 61} y="58" textAnchor="middle" className={styles.tiny}>{step.note}</text>
            {index < steps.length - 1 ? (
              <path d={"M" + (step.x + 128) + " 43 H" + (steps[index + 1].x - 6)} className={styles.arrow} markerEnd="url(#nusa-arrow-muted)" />
            ) : null}
          </g>
        ))}
        <path d="M483 76 V108 H213 V82" className={styles.arrowTeal} markerEnd="url(#nusa-arrow-teal)" />
        <text x="223" y="128" className={styles.small}>belum sesuai? ulangi dari rencana</text>
        {arrowDefs}
      </svg>
    </Frame>
  );
}

/** Klaim menunjuk sitasi, sitasi seharusnya menunjuk dokumen yang bisa dibuka. */
function CitationChain({ caption }: { caption: string }) {
  return (
    <Frame
      id="citation-chain"
      caption={caption}
      note="Dua mata rantai pertama bisa terlihat rapi tanpa yang ketiga. Yang membuat sebuah klaim layak dipakai adalah dokumen yang benar-benar bisa dibuka, bukan sitasi yang terdengar resmi."
    >
      <svg {...svgProps("citation-chain", "0 0 560 106")}>
        <text x="0" y="14" className={styles.eyebrow}>RANTAI YANG PERLU DIPERIKSA</text>
        <rect x="0" y="28" width="150" height="58" rx="2" className={styles.box} />
        <text x="75" y="54" textAnchor="middle" className={styles.label}>Klaim</text>
        <text x="75" y="72" textAnchor="middle" className={styles.tiny}>angka di jawaban AI</text>

        <path d="M156 57 H198" className={styles.arrow} markerEnd="url(#nusa-arrow-muted)" />

        <rect x="204" y="28" width="150" height="58" rx="2" className={styles.box} />
        <text x="279" y="54" textAnchor="middle" className={styles.label}>Sitasi</text>
        <text x="279" y="72" textAnchor="middle" className={styles.tiny}>judul dan halaman</text>

        <path d="M360 57 H404" className={styles.arrowBroken} />
        <text x="382" y="26" textAnchor="middle" className={styles.cross}>✕</text>

        <rect x="410" y="28" width="150" height="58" rx="2" className={styles.box} strokeDasharray="6 5" />
        <text x="485" y="54" textAnchor="middle" className={styles.labelMuted}>Dokumen</text>
        <text x="485" y="72" textAnchor="middle" className={styles.tiny}>tidak bisa dibuka</text>
        {arrowDefs}
      </svg>
    </Frame>
  );
}

/** Tiga jalur izin yang dilewati setiap tindakan agent. */
function PermissionGate({ caption }: { caption: string }) {
  const lanes = [
    { label: "Allow", note: "jalan tanpa bertanya", tone: "teal" },
    { label: "Ask", note: "minta persetujuanmu", tone: "ink" },
    { label: "Deny", note: "tidak dijalankan", tone: "coral" },
  ];

  return (
    <Frame
      id="permission-gate"
      caption={caption}
      note="Ask adalah jalur yang paling berguna selama kamu belum mengenal project-nya: agent tetap bekerja, tetapi keputusan tetap lewat kamu."
    >
      <svg {...svgProps("permission-gate", "0 0 560 176")}>
        <text x="0" y="14" className={styles.eyebrow}>SETIAP TINDAKAN LEWAT GERBANG INI</text>
        <rect x="0" y="66" width="126" height="46" rx="2" className={styles.boxInk} />
        <text x="63" y="94" textAnchor="middle" className={styles.onInk}>Tindakan</text>
        <path d="M132 89 H182" className={styles.arrow} markerEnd="url(#nusa-arrow-muted)" />

        {lanes.map((lane, index) => (
          <g key={lane.label}>
            <path
              d={"M186 89 C 212 89, 212 " + (48 + index * 54) + ", 242 " + (48 + index * 54)}
              className={lane.tone === "coral" ? styles.arrowBroken : lane.tone === "teal" ? styles.arrowTeal : styles.arrow}
            />
            <rect
              x="248"
              y={28 + index * 54}
              width="312"
              height="40"
              rx="2"
              className={lane.tone === "teal" ? styles.boxActive : styles.box}
              stroke={lane.tone === "coral" ? "var(--coral)" : undefined}
            />
            <text x="264" y={53 + index * 54} className={styles.label}>{lane.label}</text>
            <text x="340" y={53 + index * 54} className={styles.small}>{lane.note}</text>
          </g>
        ))}
        {arrowDefs}
      </svg>
    </Frame>
  );
}

export function Diagram({ spec }: { spec: DiagramSpec }) {
  switch (spec.id) {
    case "token-stream":
      return <TokenStream caption={spec.caption} />;
    case "train-vs-infer":
      return <TrainVsInfer caption={spec.caption} />;
    case "context-window":
      return <ContextWindow caption={spec.caption} />;
    case "classify-boundary":
      return <ClassifyBoundary caption={spec.caption} />;
    case "agent-loop":
      return <AgentLoop caption={spec.caption} />;
    case "citation-chain":
      return <CitationChain caption={spec.caption} />;
    case "permission-gate":
      return <PermissionGate caption={spec.caption} />;
  }
}
