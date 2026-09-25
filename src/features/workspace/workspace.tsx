"use client";

import "./game-flow.css";
import "./source-selection-game.css";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { SourceDocumentViewer } from "./document-viewer";
import type { PublicScenario } from "@/shared/contracts/scenario";
import type { EventInput, SessionSnapshot } from "@/shared/contracts/session";

type Screen = "brief" | "evidence" | "decision" | "review" | "result";
type Report = { total: number; findings: Array<{ earned: number }> };
type ScenarioDocument = PublicScenario["documents"][number];
type Decision = "pakai" | "tidak_pakai";

const sourceIds = [
  "doc_prompt_guide",
  "doc_unesco_students",
  "doc_vendor_whitepaper",
  "doc_grade_impact",
  "doc_campus_policy",
] as const;

const claims: Array<{
  id: string;
  text: string;
  sourceId: (typeof sourceIds)[number];
  expected: Decision;
  correction: string;
}> = [
  {
    id: "claim_prompt_only",
    text: "Program pengenalan AI sebaiknya terutama mengajarkan cara menulis prompt agar mahasiswa bisa menyelesaikan tugas lebih cepat. Dengan prompt yang jelas, mereka otomatis dapat memakai AI secara bertanggung jawab.",
    sourceId: "doc_prompt_guide",
    expected: "tidak_pakai",
    correction:
      "Program perlu mengajarkan cara menulis prompt sebagai salah satu keterampilan, sambil tetap melatih mahasiswa memeriksa keluaran dan mengambil keputusan sendiri.",
  },
  {
    id: "claim_unesco_scope",
    text: "Program perlu membantu mahasiswa mengenali kekuatan dan keterbatasan AI, memeriksa fakta dan sumber, mengenali bias, menjaga data pribadi, serta mengambil keputusan sendiri.",
    sourceId: "doc_unesco_students",
    expected: "pakai",
    correction:
      "Bagian ini sesuai dengan panduan resmi untuk pembelajaran di perguruan tinggi.",
  },
  {
    id: "claim_vendor_overreach",
    text: "Laporan BrightMind menyebut penggunaan AI menghemat rata-rata 6,4 jam per minggu. Karena itu, produktivitas seharusnya menjadi tujuan utama program bagi mahasiswa baru.",
    sourceId: "doc_vendor_whitepaper",
    expected: "tidak_pakai",
    correction:
      "Angka ini berasal dari perkiraan pelanggan produk berbayar. Itu belum membuktikan manfaat bagi mahasiswa, apalagi tujuan utama program.",
  },
  {
    id: "claim_grade_impact",
    text: "Survei terhadap 83 mahasiswa menunjukkan mereka puas memakai chatbot. Temuan itu membuktikan chatbot meningkatkan nilai kuliah sehingga kampus sebaiknya mewajibkannya di semua mata kuliah.",
    sourceId: "doc_grade_impact",
    expected: "tidak_pakai",
    correction:
      "Survei hanya menanyakan kepuasan. Tanpa data nilai dan kelompok pembanding, sumber ini tidak membuktikan kenaikan nilai.",
  },
  {
    id: "claim_campus_policy",
    text: "Untuk tugas di NUSA, mahasiswa perlu menyebutkan bantuan AI, memeriksa fakta dan sitasi, mengikuti aturan dosen, serta tetap bertanggung jawab atas isi yang dikumpulkan.",
    sourceId: "doc_campus_policy",
    expected: "pakai",
    correction:
      "Pedoman kampus mendukung bagian ini. Aturannya berlaku di NUSA, bukan otomatis di semua kampus.",
  },
];

const decisionLabels: Record<Decision, string> = {
  pakai: "Pakai",
  tidak_pakai: "Tidak pakai",
};

const sourceNotes: Record<
  (typeof sourceIds)[number],
  { type: string; scope: string }
> = {
  doc_prompt_guide: {
    type: "Panduan praktik",
    scope:
      "Berisi kiat menulis prompt. Tidak membahas tujuan program literasi AI.",
  },
  doc_unesco_students: {
    type: "Panduan pemerintah",
    scope:
      "Khusus perguruan tinggi; membahas pemeriksaan fakta, sumber, bias, privasi, dan tanggung jawab.",
  },
  doc_vendor_whitepaper: {
    type: "Laporan pemasaran",
    scope:
      "Survei pelanggan berbayar; waktu yang dihemat hanya berdasarkan perkiraan responden.",
  },
  doc_grade_impact: {
    type: "Berita survei",
    scope:
      "Menanyakan kepuasan 83 mahasiswa, bukan membandingkan nilai sebelum dan sesudah memakai AI.",
  },
  doc_campus_policy: {
    type: "Pedoman kampus",
    scope:
      "Mengatur pemeriksaan fakta, sitasi, keterbukaan penggunaan AI, dan tanggung jawab mahasiswa NUSA.",
  },
};

const originalSourceUrls: Record<string, string> = {
  doc_unesco_students:
    "https://kemdiktisaintek.go.id/api/file/humas-production/2024/10/Panduan-Penggunaan-Generative-Artificial-Intelligence-pada-Pembelajaran-di-Perguruan-Tinggi.pdf",
};
const uid = () => crypto.randomUUID();

export default function Workspace() {
  const [snapshot, setSnapshot] = useState<SessionSnapshot | null>(null);
  const [scenario, setScenario] = useState<PublicScenario | null>(null);
  const [screen, setScreen] = useState<Screen>("brief");
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [notice, setNotice] = useState("Memuat kasus…");
  const [loadError, setLoadError] = useState(false);

  async function load(reset = false) {
    setLoadError(false);
    setNotice("Memuat kasus…");
    try {
      const response = await fetch(`/api/v1/sessions${reset ? "?reset" : ""}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("LOAD_FAILED");
      const data = await response.json();
      setSnapshot(data.snapshot);
      setScenario(data.scenario);
      setReport(null);
      setScreen("brief");
      setNotice("Tersimpan");
    } catch {
      setLoadError(true);
      setNotice("Kasus gagal dimuat");
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/v1/sessions", { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error("LOAD_FAILED");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setSnapshot(data.snapshot);
        setScenario(data.scenario);
        setNotice("Tersimpan");
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
        setNotice("Kasus gagal dimuat");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function act(
    type: EventInput["type"],
    payload: Record<string, string> = {},
  ) {
    if (!snapshot || snapshot.status !== "in_progress") return null;
    const event = {
      clientEventId: uid(),
      type,
      occurredAt: new Date().toISOString(),
      payload,
    };
    let expectedVersion = snapshot.streamVersion;
    setNotice("Menyimpan…");

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const response = await fetch("/api/v1/sessions/demo/events", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "if-match": String(expectedVersion),
          "idempotency-key": event.clientEventId,
        },
        body: JSON.stringify({ events: [event] }),
      });
      const data = await response.json();
      if (response.ok) {
        setSnapshot(data.snapshot);
        setNotice("Tersimpan");
        return data.snapshot as SessionSnapshot;
      }
      if (response.status !== 409 || attempt === 1) break;
      const latest = await fetch("/api/v1/sessions", { method: "POST" }).then(
        (result) => result.json(),
      );
      setSnapshot(latest.snapshot);
      expectedVersion = latest.snapshot.streamVersion;
    }
    setNotice("Belum tersimpan");
    return null;
  }

  async function begin() {
    await act("workspace_opened");
    goTo("evidence");
  }

  function goTo(next: Exclude<Screen, "result">) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  async function openDocument(documentId: string) {
    setActiveDocumentId(documentId);
    if (!snapshot?.openedDocumentIds.includes(documentId)) {
      await act("document_opened", { documentId });
    }
  }

  async function chooseClaim(claimId: string, decision: Decision) {
    await act("claim_state_changed", { claimId, state: decision });
  }

  async function submit() {
    if (!snapshot || claims.some((claim) => !snapshot.claimStates[claim.id])) return;
    setNotice("Menilai hasil…");
    const response = await fetch("/api/v1/sessions/demo/submit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "if-match": String(snapshot.streamVersion),
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      setNotice("Penilaian gagal. Coba lagi.");
      return;
    }
    const data = await response.json();
    setSnapshot(data.snapshot);
    setReport(data.report);
    setScreen("result");
    setNotice("Selesai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loadError) {
    return (
      <main className="case-state">
        <h1>Kasus belum dapat dibuka</h1>
        <p>Periksa koneksi lalu coba lagi.</p>
        <button type="button" onClick={() => void load()}>
          Coba lagi
        </button>
      </main>
    );
  }
  if (!scenario || !snapshot)
    return (
      <main className="case-state" aria-live="polite">
        <p>{notice}</p>
      </main>
    );

  const sources = sourceIds
    .map((id) => scenario.documents.find((document) => document.id === id))
    .filter((document): document is ScenarioDocument => Boolean(document));
  const activeDocument = scenario.documents.find(
    (document) => document.id === activeDocumentId,
  );

  return (
    <div className="case-app">
      <CaseHeader notice={notice} />
      {screen === "brief" && <BriefScreen onBegin={begin} />}
      {screen === "evidence" && (
        <EvidenceScreen
          sources={sources}
          snapshot={snapshot}
          onOpen={openDocument}
          onContinue={() => goTo("decision")}
        />
      )}
      {screen === "decision" && (
        <DecisionScreen
          snapshot={snapshot}
          onChoose={chooseClaim}
          onReview={() => goTo("review")}
        />
      )}
      {screen === "review" && (
        <ReviewScreen
          snapshot={snapshot}
          onBack={() => goTo("decision")}
          onSubmit={submit}
        />
      )}
      {screen === "result" && report && (
        <ResultScreen
          snapshot={snapshot}
          report={report}
          onRestart={() => void load(true)}
        />
      )}
      {activeDocument && (
        <DocumentDialog
          document={activeDocument}
          onClose={() => setActiveDocumentId(null)}
        />
      )}
    </div>
  );
}

function CaseHeader({ notice }: { notice: string }) {
  return (
    <header className="case-header">
      <Link href="/" className="case-brand" aria-label="NUSA Lab, beranda">
        <span>NUSA</span> Lab
      </Link>
      <nav aria-label="Navigasi utama">
        <Link href="/games" className="case-back">
          <span aria-hidden="true">←</span> Kembali ke koleksi game
        </Link>
        <span className="save-state" aria-live="polite">
          {notice}
        </span>
      </nav>
    </header>
  );
}

function Progress({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const labels = ["Kasus", "Buka bukti", "Pilih klaim", "Jawaban akhir", "Hasil"];
  return (
    <ol
      className="case-progress case-progress-five"
      aria-label={`Langkah ${step} dari 5`}
    >
      {labels.map((label, index) => (
        <li
          key={label}
          className={
            index + 1 === step ? "current" : index + 1 < step ? "done" : ""
          }
          aria-current={index + 1 === step ? "step" : undefined}
        >
          <span>{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}

function BriefScreen({ onBegin }: { onBegin: () => Promise<void> }) {
  return (
    <main className="case-main brief-main">
      <Progress step={1} />
      <section className="case-brief">
        <p className="case-kicker">KASUS 01 · PERIKSA JAWABAN AI</p>
        <h1>AI sudah membuat draf. Sekarang cek isi dan sumbernya.</h1>
        <p className="case-lead">
          Raka meminta AI menulis latar belakang program pengenalan AI untuk
          mahasiswa baru. Draf ini akan masuk ke proposal kelompok malam ini. Ia
          minta kamu memeriksanya lebih dulu.
        </p>
        <div className="brief-output-preview">
          <span>PROMPT RAKA</span>
          <p>
            “Buat latar belakang singkat untuk program literasi AI bagi
            mahasiswa baru. Jelaskan kemampuan yang perlu diajarkan dan sertakan
            sumber.”
          </p>
          <small>Jawaban AI: 5 bagian · 5 sumber · belum diperiksa</small>
        </div>
        <div className="brief-task">
          <span aria-hidden>01</span>
          <div>
            <h2>Tugasmu</h2>
            <p>
              Buka sumber yang dicantumkan AI untuk setiap klaim. Setelah itu,
              putuskan klaim mana yang layak dipakai dalam jawaban akhir.
            </p>
          </div>
        </div>
        <button
          className="case-primary"
          type="button"
          onClick={() => void onBegin()}
        >
          Periksa jawaban AI
        </button>
        <p className="case-safety">
          Sekitar 8–10 menit · semua dokumen sudah disiapkan · kamu tidak perlu
          memasukkan data pribadi atau memakai layanan AI lain.
        </p>
      </section>
    </main>
  );
}

function EvidenceScreen({
  sources,
  snapshot,
  onOpen,
  onContinue,
}: {
  sources: ScenarioDocument[];
  snapshot: SessionSnapshot;
  onOpen: (id: string) => Promise<void>;
  onContinue: () => void;
}) {
  const openedCount = sourceIds.filter((id) =>
    snapshot.openedDocumentIds.includes(id),
  );
  const ready = openedCount.length === sourceIds.length;
  return (
    <main className="case-main audit-main">
      <Progress step={2} />
      <section className="audit-intro">
        <p className="case-kicker">DRAF AI DAN BUKTI YANG DICANTUMKAN</p>
        <h1>Baca draf AI, lalu buka bukti di balik setiap klaim.</h1>
        <p>
          Jangan mengambil keputusan dulu. Periksa dulu apakah sumbernya benar,
          relevan, dan cukup kuat untuk mendukung klaim AI.
        </p>
      </section>
      <section className="source-context" aria-label="Konteks percakapan dengan AI">
        <div className="source-message source-message-user">
          <span>Raka</span>
          <p>
            Buat latar belakang singkat untuk program literasi AI bagi
            mahasiswa baru. Jelaskan kemampuan yang perlu diajarkan dan
            sertakan sumber.
          </p>
        </div>
        <div className="source-message source-message-ai">
          <span>AI</span>
          <p>Berikut draf latar belakang program dengan lima sumber.</p>
        </div>
      </section>
      <section
        className="ai-output"
        aria-label="Jawaban AI yang perlu diperiksa"
      >
        <header>
          <div>
            <strong>Jawaban AI</strong>
            <span>Latar belakang program untuk mahasiswa baru</span>
          </div>
          <small>5 sumber dicantumkan</small>
        </header>
        <div className="ai-output-body">
          <p className="ai-output-lead">
            Program pengenalan AI perlu menyiapkan mahasiswa baru untuk belajar
            dengan lebih efektif dan bertanggung jawab.
          </p>
          {claims.map((claim, index) => (
            <EvidenceClaim
              key={claim.id}
              claim={claim}
              index={index + 1}
              source={sources.find((source) => source.id === claim.sourceId)}
              opened={snapshot.openedDocumentIds.includes(claim.sourceId)}
              onOpen={onOpen}
            />
          ))}
        </div>
      </section>
      <aside className="selection-bar audit-bar">
        <div>
          <strong>{openedCount.length} dari 5 sumber sudah dibuka</strong>
          <span>Buka semua bukti sebelum menilai klaim AI.</span>
        </div>
        <button className="case-primary" type="button" disabled={!ready} onClick={onContinue}>
          Lanjut pilih klaim
        </button>
      </aside>
    </main>
  );
}

function EvidenceClaim({
  claim,
  index,
  source,
  opened,
  onOpen,
}: {
  claim: (typeof claims)[number];
  index: number;
  source?: ScenarioDocument;
  opened: boolean;
  onOpen: (id: string) => Promise<void>;
}) {
  const note = sourceNotes[claim.sourceId];
  return (
    <article className="claim-card evidence-claim">
      <div className="claim-index">{index}</div>
      <div className="claim-content">
        <p>{claim.text}</p>
        <div className="claim-evidence">
          <span>Sumber [{index}] · {note.type}</span>
          <small>{source?.title} · {note.scope}</small>
          <button type="button" className="claim-citation" onClick={() => void onOpen(claim.sourceId)}>
            {opened ? "Buka lagi bukti" : "Buka bukti"}
          </button>
        </div>
      </div>
    </article>
  );
}

function ClaimCard({
  claim,
  index,
  decision,
  onChoose,
}: {
  claim: (typeof claims)[number];
  index: number;
  decision?: Decision;
  onChoose: (id: string, decision: Decision) => Promise<void>;
}) {
  return (
    <article className={`claim-card ${decision ? "has-decision" : ""}`}>
      <div className="claim-index">{index}</div>
      <div className="claim-content">
        <p>{claim.text}</p>
        <div
          className="claim-actions"
          aria-label={`Keputusan untuk klaim ${index}`}
        >
          {(["pakai", "tidak_pakai"] as const).map((action) => (
            <button
              key={action}
              type="button"
              className={decision === action ? "active" : ""}
              aria-pressed={decision === action}
              onClick={() => void onChoose(claim.id, action)}
            >
              {decisionLabels[action]}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function DecisionScreen({
  snapshot,
  onChoose,
  onReview,
}: {
  snapshot: SessionSnapshot;
  onChoose: (id: string, decision: Decision) => Promise<void>;
  onReview: () => void;
}) {
  const ready = claims.every((claim) => snapshot.claimStates[claim.id]);
  return (
    <main className="case-main decision-main">
      <Progress step={3} />
      <section className="audit-intro">
        <div>
          <p className="case-kicker">BUAT KEPUTUSAN BERDASARKAN BUKTI</p>
          <h1>Klaim mana yang layak masuk ke jawaban akhir?</h1>
        </div>
        <p>
          Pilih Pakai jika sumber benar-benar mendukung klaim. Jika buktinya
          tidak cukup, tidak relevan, atau bertentangan, pilih Tidak pakai.
        </p>
      </section>
      <section className="ai-output" aria-label="Klaim AI yang akan diputuskan">
        <div className="ai-output-body">
          {claims.map((claim, index) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              index={index + 1}
              decision={snapshot.claimStates[claim.id] as Decision | undefined}
              onChoose={onChoose}
            />
          ))}
        </div>
      </section>
      <aside className="selection-bar decision-bar">
        <div>
          <strong>{claims.filter((claim) => snapshot.claimStates[claim.id]).length} dari 5 klaim sudah diputuskan</strong>
          <span>Keputusan ini akan menentukan isi jawaban akhir.</span>
        </div>
        <button className="case-primary" type="button" disabled={!ready} onClick={onReview}>
          Lihat jawaban akhir
        </button>
      </aside>
    </main>
  );
}

function ReviewScreen({
  snapshot,
  onBack,
  onSubmit,
}: {
  snapshot: SessionSnapshot;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}) {
  const includedClaims = claims.filter(
    (claim) => snapshot.claimStates[claim.id] === "pakai",
  );
  return (
    <main className="case-main review-main">
      <Progress step={4} />
      <section className="review-sheet">
        <p className="case-kicker">CEK TERAKHIR</p>
        <h1>Ini jawaban akhir dari klaim yang kamu pilih.</h1>
        <p className="case-lead">
          Klaim yang tidak kamu pakai tidak ikut masuk. Baca sekali lagi
          sebelum mengirim hasil pemeriksaan.
        </p>
        <div className="revised-answer">
          <span>JAWABAN AKHIR</span>
          {includedClaims.length ? (
            includedClaims.map((claim) => (
              <p key={claim.id}>
                {claim.text} <sup>[{claims.indexOf(claim) + 1}]</sup>
              </p>
            ))
          ) : (
            <p>Tidak ada klaim yang dipakai. Kembali dan periksa keputusanmu.</p>
          )}
        </div>
        <div className="review-actions">
          <button className="case-secondary" type="button" onClick={onBack}>
            Ubah pilihan klaim
          </button>
          <button
            className="case-primary"
            type="button"
            onClick={() => void onSubmit()}
          >
            Kirim hasil pemeriksaan
          </button>
        </div>
      </section>
    </main>
  );
}

function ResultScreen({
  snapshot,
  report,
  onRestart,
}: {
  snapshot: SessionSnapshot;
  report: Report;
  onRestart: () => void;
}) {
  const passed = report.findings.filter((finding) => finding.earned > 0).length;
  const possible = report.findings.length;
  return (
    <main className="case-main result-main">
      <Progress step={5} />
      <section className="result-head">
        <div>
          <p className="case-kicker">HASIL PEMERIKSAAN</p>
          <h1>
            {report.total === 100
              ? "Semua keputusanmu tepat."
              : "Ada keputusan yang perlu kamu cek lagi."}
          </h1>
          <p>
            {passed} dari {possible} keputusan tepat menurut kunci kasus.
          </p>
        </div>
        <div
          className="result-score"
          aria-label={`${passed} dari ${possible} keputusan tepat`}
        >
          <strong>{passed}</strong>
          <span>/{possible}</span>
          <small>keputusan tepat</small>
        </div>
      </section>
      <section className="feedback-section">
        <h2>Bagian jawaban AI</h2>
        <div className="feedback-list">
          {claims.map((claim, index) => {
            const selected = snapshot.claimStates[claim.id] as
              Decision | undefined;
            const aligned = selected === claim.expected;
            return (
              <article
                key={claim.id}
                className={aligned ? "aligned" : "reconsider"}
              >
                <span className="feedback-mark" aria-hidden>
                  {aligned ? "✓" : "↺"}
                </span>
                <div>
                  <p>
                    KLAIM {index + 1} ·{" "}
                    {selected
                      ? decisionLabels[selected].toUpperCase()
                      : "BELUM DIPILIH"}
                  </p>
                  <h3>{claim.text}</h3>
                  <span>{claim.correction}</span>
                </div>
                <strong>{aligned ? "Tepat" : "Cek lagi"}</strong>
              </article>
            );
          })}
        </div>
      </section>
      <section className="result-lesson">
        <p className="case-kicker">INTI LATIHAN</p>
        <h2>Jawaban yang rapi belum tentu dapat dipercaya.</h2>
        <p>
          Cek apa yang dikatakan, apakah sumbernya benar-benar mendukung, siapa
          yang menerbitkan, dan bagaimana datanya diperoleh.
        </p>
      </section>
      <div className="result-actions">
        <button className="case-primary" type="button" onClick={onRestart}>
          Main lagi
        </button>
        <Link className="case-secondary link-button" href="/games">
          Kembali ke daftar game
        </Link>
      </div>
    </main>
  );
}

function DocumentDialog({
  document,
  onClose,
}: {
  document: ScenarioDocument;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const originalSourceUrl = originalSourceUrls[document.id];
  useEffect(() => {
    previousFocus.current = window.document.activeElement as HTMLElement;
    const close = dialogRef.current?.querySelector<HTMLButtonElement>("button");
    const originalOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
    close?.focus();
    return () => {
      window.document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, []);
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && window.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && window.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  return (
    <div
      className="document-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="document-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-dialog-title"
        onKeyDown={handleKeyDown}
      >
        <div className="document-dialog-heading">
          <div>
            <span>SUMBER YANG DICANTUMKAN AI</span>
            <h2 id="document-dialog-title">{document.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup dokumen">
            Tutup
          </button>
        </div>
        <p className="adapted-source-note">
          {originalSourceUrl
            ? "Cuplikan ini disederhanakan untuk latihan. Publikasi aslinya juga bisa kamu buka."
            : "Ini dokumen latihan, bukan publikasi sungguhan. Cek tujuan dan keterbatasannya sebelum dipakai."}
          {originalSourceUrl && (
            <>
              {" "}
              <a href={originalSourceUrl} target="_blank" rel="noreferrer">
                Buka sumber asli ↗
              </a>
            </>
          )}
        </p>
        <SourceDocumentViewer document={document} />
      </div>
    </div>
  );
}
