"use client";

import "./game-flow.css";
import "./workspace-v2.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { SourceDocumentViewer } from "./document-viewer";
import type { PublicScenario } from "@/shared/contracts/scenario";
import type { EventInput, SessionSnapshot } from "@/shared/contracts/session";

type Report = {
  total: number;
  findings: Array<{
    ruleId: string;
    outcome: "met" | "missed";
    feedbackKey: string;
  }>;
};

type BrowserTab = "tugas" | "sumber" | "aira" | "dokumen";
type Person = "nara" | "raka" | "maya" | "aira";

const tabs: Array<{ id: BrowserTab; label: string }> = [
  { id: "tugas", label: "Brief Tugas" },
  { id: "sumber", label: "Chat Raka" },
  { id: "aira", label: "AIRA" },
  { id: "dokumen", label: "Kirim ke Dr. Maya" },
];

const steps = ["Pahami", "Baca sumber", "Tanya AIRA", "Kirim"];
const uid = () => crypto.randomUUID();
const AIRA_PROMPT =
  "Susun ulang klaim untuk Dr. Maya dengan menggabungkan seluruh dokumen yang saya pilih.";
const relevantDocumentIds = new Set([
  "doc_unesco",
  "doc_unesco_students",
  "doc_digcomp",
  "doc_data_ethics",
  "doc_campus_policy",
]);
const avatarText: Record<Person, string> = {
  nara: "N",
  raka: "R",
  maya: "M",
  aira: "AI",
};
const resultLessonCopy: Record<
  string,
  { title: string; met: string; missed: string }
> = {
  select_only_relevant_safe_context: {
    title: "Konteks tetap fokus",
    met: "Kamu hanya membawa sumber yang relevan dan aman ke AIRA.",
    missed: "Konteks AIRA masih memuat sumber yang tidak diperlukan.",
  },
  link_relevant_passage: {
    title: "Bukti mendukung klaim",
    met: "Kutipan yang dipilih langsung menjawab cakupan literasi AI.",
    missed: "Bukti yang dipilih belum langsung menjawab klaim utama.",
  },
  review_ai_change: {
    title: "Kamu memeriksa hasil AI",
    met: "Keputusan akhir tetap berada di tanganmu.",
    missed: "Hasil AI perlu diperiksa sebelum dipakai sebagai revisi.",
  },
};

function Avatar({
  person,
  label,
  size = "normal",
}: {
  person: Person;
  label?: string;
  size?: "small" | "normal" | "large";
}) {
  return (
    <span
      className={`avatar avatar-${person} avatar-${size}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {avatarText[person]}
    </span>
  );
}

function TabIcon({ id }: { id: BrowserTab }) {
  if (id === "tugas")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6 3h9l3 3v15H6zM9 10h6M9 14h6" />
      </svg>
    );
  if (id === "sumber")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M20 11c0 4-4 7-9 7l-5 3 1-4c-2-1-3-3-3-6 0-4 4-7 8-7s8 3 8 7Z" />
      </svg>
    );
  if (id === "aira")
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m12 3 1.4 4.1L18 8.5l-4.6 1.4L12 14l-1.4-4.1L6 8.5l4.6-1.4zM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m3 11 18-8-7 18-3-7zM11 14l10-11" />
    </svg>
  );
}

function FileIcon({ kind }: { kind: string }) {
  return (
    <span className={`file-icon file-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" />
      </svg>
    </span>
  );
}

export default function Workspace() {
  const [snapshot, setSnapshot] = useState<SessionSnapshot | null>(null);
  const [scenario, setScenario] = useState<PublicScenario | null>(null);
  const [notice, setNotice] = useState("Memuat…");
  const [loadError, setLoadError] = useState(false);
  const [activeTab, setActiveTab] = useState<BrowserTab>("tugas");
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [aiDraft, setAiDraft] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [responsibilityConfirmed, setResponsibilityConfirmed] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [startingGame, setStartingGame] = useState(false);

  async function load(reset = false) {
    setLoadError(false);
    setNotice("Memuat…");
    try {
      const response = await fetch(`/api/v1/sessions${reset ? "?reset" : ""}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("LOAD_FAILED");
      const data = await response.json();
      setSnapshot(data.snapshot);
      setScenario(data.scenario);
      setNotice("Tersimpan");
    } catch {
      setLoadError(true);
      setNotice("Gagal dimuat");
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
        setNotice("Gagal dimuat");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function act(
    type: EventInput["type"],
    payload: Record<string, string> = {},
    baseSnapshot: SessionSnapshot | null = snapshot,
  ) {
    if (!baseSnapshot || baseSnapshot.status !== "in_progress") return null;
    setNotice("Menyimpan…");
    const event = {
      clientEventId: uid(),
      type,
      occurredAt: new Date().toISOString(),
      payload,
    };
    let expectedVersion = baseSnapshot.streamVersion;

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
      if (response.status !== 409 || attempt === 1) {
        setNotice("Belum tersimpan");
        return null;
      }
      const latest = await fetch("/api/v1/sessions", { method: "POST" }).then(
        (result) => result.json(),
      );
      setSnapshot(latest.snapshot);
      expectedVersion = latest.snapshot.streamVersion;
    }
    return null;
  }

  async function openDocument(documentId: string) {
    setActiveDocumentId(documentId);
    if (!snapshot?.openedDocumentIds.includes(documentId)) {
      await act("document_opened", { documentId });
    }
  }

  async function startGame() {
    if (startingGame) return;
    setStartingGame(true);
    await Promise.all([
      act("workspace_opened"),
      new Promise((resolve) => setTimeout(resolve, 1400)),
    ]);
    setStartingGame(false);
  }

  async function toggleDocument(documentId: string) {
    if (!snapshot) return;
    await act(
      snapshot.contextDocumentIds.includes(documentId)
        ? "context_item_removed"
        : "context_item_added",
      { documentId },
    );
    setReport(null);
    setResponsibilityConfirmed(false);
  }

  async function askAira() {
    if (!snapshot || snapshot.contextDocumentIds.length === 0) return;
    setAiBusy(true);
    try {
      const response = await fetch("/api/v1/sessions/demo/ai-responses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt: AIRA_PROMPT,
          contextIds: snapshot.contextDocumentIds,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error("AI_FAILED");
      setAiMessage(data.message);
      setAiDraft(data.diffText);
      await act("ai_response_received", { responseId: "fixture_response" });
    } catch {
      setAiMessage("AIRA belum bisa menjawab. Coba kirim lagi.");
    } finally {
      setAiBusy(false);
    }
  }

  async function prepareSend() {
    if (!snapshot?.aiResponseReady) return;
    const selectedDocuments = snapshot.contextDocumentIds
      .map((id) => scenario?.documents.find((document) => document.id === id))
      .filter(Boolean) as PublicScenario["documents"];
    const preferredDocument =
      selectedDocuments.find((document) =>
        relevantDocumentIds.has(document.id),
      ) ?? selectedDocuments[0];
    const passageId = preferredDocument?.passages[0]?.id;
    let nextSnapshot = snapshot;

    if (passageId) {
      nextSnapshot =
        (await act(
          "evidence_linked",
          { claimId: "claim_multidimensional", passageId },
          nextSnapshot,
        )) ?? nextSnapshot;
    }
    const reviewedSnapshot = await act("diff_accepted", {}, nextSnapshot);
    if (reviewedSnapshot) setActiveTab("dokumen");
  }

  async function submit() {
    if (!snapshot || !responsibilityConfirmed) return;
    const response = await fetch("/api/v1/sessions/demo/submit", {
      method: "POST",
      headers: { "if-match": String(snapshot.streamVersion) },
    });
    const data = await response.json();
    if (!response.ok) {
      setNotice("Belum terkirim");
      return;
    }
    setSnapshot(data.snapshot);
    setReport(data.report);
    setNotice("Terkirim");
  }

  if (loadError) {
    return (
      <main className="loading">
        <h1>Game belum bisa dimuat</h1>
        <button onClick={() => void load()}>Coba lagi</button>
      </main>
    );
  }
  if (!snapshot || !scenario) return <main className="loading">{notice}</main>;

  const assignmentRead = snapshot.openedDocumentIds.includes(
    "doc_committee_brief",
  );
  const reviewed = snapshot.diffDecision === "accepted";
  const ready = snapshot.aiResponseReady && reviewed;
  const gameStep = !assignmentRead
    ? 0
    : snapshot.contextDocumentIds.length === 0
      ? 1
      : !snapshot.aiResponseReady
        ? 2
        : 3;
  const activeDocument = scenario.documents.find(
    (item) => item.id === activeDocumentId,
  );
  const enabledTabs: Record<BrowserTab, boolean> = {
    tugas: true,
    sumber: assignmentRead,
    aira: snapshot.contextDocumentIds.length > 0,
    dokumen: snapshot.aiResponseReady,
  };

  if (startingGame) {
    return (
      <main className="game-loading" aria-live="polite">
        <div className="game-loading-card" role="status">
          <span className="loading-donut" aria-hidden="true" />
          <b>Menyiapkan meja kerjamu…</b>
          <p>Dokumen dan pesan sedang dibuka.</p>
          <span className="loading-track" aria-hidden="true">
            <i />
          </span>
        </div>
      </main>
    );
  }

  if (!snapshot.briefingComplete) {
    return (
      <main className="welcome-screen">
        <div className="welcome-topbar">
          <Link href="/" className="back-to-games">
            <span aria-hidden="true">←</span> Semua game
          </Link>
          <strong>NUSA Lab</strong>
          <span>Game 01</span>
        </div>
        <section className="welcome-game-cover">
          <div className="welcome-artwork">
            <Image
              src="/sitasi-game-cover.png"
              alt="Nara dan Raka memeriksa sumber bersama sebelum kelas"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 58vw"
            />
            <span className="cover-sticker" aria-hidden="true">
              ★
            </span>
          </div>
          <div className="welcome-story">
            <span className="cover-browser-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="cover-kicker">GAME 01 · LITERASI AI</span>
            <h1>Sitasi Bermasalah</h1>
            <p>
              Selamatkan tugas kelompokmu. Periksa sumber, bantu Raka
              memperbaiki klaim, lalu kirim sebelum kelas.
            </p>
            <div className="game-mission" aria-label="Misi dari Dr. Maya">
              <Avatar person="maya" label="Dr. Maya" />
              <span>
                <b>Misi dari Dr. Maya</b>
                “Nara, bantu cek satu klaim ini sebelum kelas, ya.”
              </span>
            </div>
            <ol className="cover-steps" aria-label="Alur permainan">
              <li>
                <b>1</b> Baca sumber
              </li>
              <li>
                <b>2</b> Tanya AIRA
              </li>
              <li>
                <b>3</b> Kirim revisi
              </li>
            </ol>
            <button
              className="primary-button"
              disabled={startingGame}
              onClick={() => void startGame()}
            >
              Mulai main
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="game-shell">
      <header className="shell-header">
        <strong>NUSA Lab</strong>
        <span>Kasus Sitasi Bermasalah</span>
        <small>● {notice}</small>
      </header>

      <section className="game-browser" aria-label="Browser simulasi kerja">
        <div className="browser-chrome" aria-hidden="true">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <div>kampus.nusa / ruang-kerja</div>
          <span>☆</span>
        </div>

        <nav className="browser-tabs" aria-label="Tahapan kerja">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              disabled={!enabledTabs[tab.id]}
              className={activeTab === tab.id ? "active" : ""}
              aria-current={activeTab === tab.id ? "page" : undefined}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon id={tab.id} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="journey" aria-label="Kemajuan">
          {steps.map((step, index) => (
            <div
              key={step}
              className={
                index === gameStep ? "active" : index < gameStep ? "done" : ""
              }
            >
              <i>{index < gameStep ? "✓" : index + 1}</i>
              <span>{step}</span>
            </div>
          ))}
        </div>

        <section className="browser-content" aria-live="polite">
          {activeTab === "tugas" ? (
            <TaskTab
              onContinue={async () => {
                if (!assignmentRead) {
                  await act("document_opened", {
                    documentId: "doc_committee_brief",
                  });
                }
                setActiveTab("sumber");
              }}
            />
          ) : null}
          {activeTab === "sumber" ? (
            <SourceTab
              scenario={scenario}
              snapshot={snapshot}
              onOpen={openDocument}
              onToggle={toggleDocument}
              onContinue={() => setActiveTab("aira")}
            />
          ) : null}
          {activeTab === "aira" ? (
            <AiraTab
              scenario={scenario}
              snapshot={snapshot}
              aiMessage={aiMessage}
              aiBusy={aiBusy}
              onAsk={askAira}
              onRemove={toggleDocument}
              onSources={() => setActiveTab("sumber")}
              onContinue={prepareSend}
            />
          ) : null}
          {activeTab === "dokumen" ? (
            <SendTab
              scenario={scenario}
              snapshot={snapshot}
              reviewed={reviewed}
              ready={ready}
              aiDraft={aiDraft}
              report={report}
              responsibilityConfirmed={responsibilityConfirmed}
              onResponsibility={setResponsibilityConfirmed}
              onAira={() => setActiveTab("aira")}
              onSubmit={submit}
              onRestart={async () => {
                await load(true);
                setReport(null);
                setActiveTab("tugas");
                setResponsibilityConfirmed(false);
                setAiMessage(null);
              }}
            />
          ) : null}
        </section>
      </section>

      {activeDocument ? (
        <DocumentDialog
          document={activeDocument}
          included={snapshot.contextDocumentIds.includes(activeDocument.id)}
          onClose={() => setActiveDocumentId(null)}
          onToggle={toggleDocument}
        />
      ) : null}
      <div className="live" aria-live="polite">
        {notice}
      </div>
    </main>
  );
}

function TaskTab({ onContinue }: { onContinue: () => void | Promise<void> }) {
  return (
    <div className="mail-screen">
      <aside className="mail-rail" aria-label="Kotak masuk">
        <button type="button">＋ Tulis</button>
        <b>▣ Kotak masuk</b>
        <span>☆ Berbintang</span>
        <span>↗ Terkirim</span>
      </aside>
      <div className="mail-list" aria-label="Daftar surel">
        <b>Dr. Maya</b>
        <span>Tolong cek draf ini</span>
        <small>08.15</small>
      </div>
      <article className="mail-message">
        <span className="mail-tools" aria-hidden="true">
          ←　☆　↩
        </span>
        <h1>Tolong cek draf ini sebelum kelas</h1>
        <div className="person-row">
          <Avatar person="maya" label="Dr. Maya" />
          <p>
            <b>Dr. Maya Santoso</b>
            <span>kepada kamu · 08.15</span>
          </p>
        </div>
        <div className="mail-body">
          <p>Halo Nara,</p>
          <p>
            AIRA menulis:{" "}
            <mark>“Literasi AI hanya soal memakai alat secara efisien.”</mark>
          </p>
          <section className="mission-brief" aria-labelledby="mission-question">
            <strong id="mission-question">Pertanyaan yang diuji</strong>
            <p>
              Apakah literasi AI hanya berarti mampu menggunakan alat secara
              efisien?
            </p>
            <span>
              Tugasmu: cari bukti untuk menguji klaim itu. Periksa apakah
              literasi AI juga mencakup etika, penilaian kritis, dan pengawasan
              manusia.
            </span>
          </section>
          <p>
            Baca dokumen dari Raka, gunakan bukti yang sesuai untuk memperbaiki
            kalimat AIRA, lalu kirim revisinya kepadaku.
          </p>
          <p>— Maya</p>
        </div>
        <button className="primary-button" onClick={() => void onContinue()}>
          Buka chat Raka <span aria-hidden="true">→</span>
        </button>
      </article>
    </div>
  );
}

function SourceTab({
  scenario,
  snapshot,
  onOpen,
  onToggle,
  onContinue,
}: {
  scenario: PublicScenario;
  snapshot: SessionSnapshot;
  onOpen: (id: string) => void;
  onToggle: (id: string) => void;
  onContinue: () => void;
}) {
  const attachments = scenario.documents.filter(
    (document) => document.id !== "doc_committee_brief",
  );
  const selectedCount = snapshot.contextDocumentIds.length;

  return (
    <div className="raka-screen">
      <section
        className="raka-chat raka-chat-full"
        aria-label="Chat dengan Raka"
      >
        <header>
          <Avatar person="raka" label="Raka" />
          <div>
            <b>Raka</b>
            <span>online</span>
          </div>
          <small>{selectedCount} dipilih untuk AIRA</small>
        </header>
        <div className="message-stack">
          <div className="bubble friend">
            <p>Dr. Maya minta kita cek kalimat dari AIRA.</p>
            <time>08.20</time>
          </div>
          <div className="bubble friend">
            <p>
              Aku kirim semua yang kutemukan. Judulnya kelihatan bagus, tapi aku
              belum baca isinya 😅
            </p>
            <time>08.21</time>
          </div>

          <section className="chat-file-bundle" aria-label="Lampiran dari Raka">
            <header>
              <div>
                <b>{attachments.length} lampiran</b>
                <span>
                  Buka lalu cek: apakah literasi AI lebih dari kemampuan teknis?
                </span>
              </div>
              <span aria-hidden="true">↓</span>
            </header>
            <div className="attachment-list chat-files">
              {attachments.map((document) => {
                const included = snapshot.contextDocumentIds.includes(
                  document.id,
                );
                const opened = snapshot.openedDocumentIds.includes(document.id);
                return (
                  <article
                    key={document.id}
                    className={included ? "selected" : ""}
                  >
                    <FileIcon kind={document.kind} />
                    <div>
                      <h2>{document.title}</h2>
                      <p>{document.owner}</p>
                      {opened ? <small>✓ sudah dibuka</small> : null}
                    </div>
                    <div className="attachment-actions">
                      <button
                        className="quiet-button"
                        onClick={() => onOpen(document.id)}
                      >
                        Buka
                      </button>
                      <button
                        className={
                          included ? "pick-button picked" : "pick-button"
                        }
                        aria-pressed={included}
                        aria-label={
                          included
                            ? `Keluarkan ${document.title} dari AIRA`
                            : `Pilih ${document.title} untuk AIRA`
                        }
                        onClick={() => onToggle(document.id)}
                      >
                        ✓
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="bubble mine">
            <p>Oke. Aku baca dulu, baru pilih untuk AIRA.</p>
            <time>08.22 ✓✓</time>
          </div>
        </div>
        <footer className="chat-workbar">
          <span>
            {selectedCount
              ? `${selectedCount} dokumen dipilih. Pastikan isinya menjawab pertanyaan utama.`
              : "Cari bukti untuk menguji: apakah literasi AI lebih dari kemampuan teknis?"}
          </span>
          <button
            className="primary-button"
            disabled={selectedCount === 0}
            onClick={onContinue}
          >
            Lanjut ke AIRA <span aria-hidden="true">→</span>
          </button>
        </footer>
      </section>
    </div>
  );
}

function AiraTab({
  scenario,
  snapshot,
  aiMessage,
  aiBusy,
  onAsk,
  onRemove,
  onSources,
  onContinue,
}: {
  scenario: PublicScenario;
  snapshot: SessionSnapshot;
  aiMessage: string | null;
  aiBusy: boolean;
  onAsk: () => void;
  onRemove: (id: string) => void;
  onSources: () => void;
  onContinue: () => void;
}) {
  if (snapshot.contextDocumentIds.length === 0) {
    return (
      <div className="simple-empty">
        <Avatar person="aira" label="AIRA" size="large" />
        <h1>AIRA butuh dokumen pilihanmu.</h1>
        <button className="primary-button" onClick={onSources}>
          Kembali ke sumber
        </button>
      </div>
    );
  }

  return (
    <div className="aira-screen">
      <section className="aira-conversation">
        <header>
          <Avatar person="aira" label="AIRA" />
          <div>
            <h1>AIRA</h1>
            <span>asisten penyusun draf</span>
          </div>
        </header>
        <div className="aira-thread" aria-live="polite">
          <div className="aira-message">
            <Avatar person="aira" size="small" />
            <p>
              Aku membantu menulis dari dokumen pilihanmu. Aku bisa keliru—kamu
              tetap memeriksa.
            </p>
          </div>
          {snapshot.aiResponseReady ? (
            <>
              <div className="student-message">{AIRA_PROMPT}</div>
              <div className="aira-message answer">
                <Avatar person="aira" size="small" />
                <div>
                  <p>{aiMessage}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
        {!snapshot.aiResponseReady ? (
          <div className="aira-composer">
            <span className="locked-prompt">{AIRA_PROMPT}</span>
            <button
              className="send-circle"
              aria-label="Kirim ke AIRA"
              disabled={aiBusy}
              onClick={onAsk}
            >
              {aiBusy ? "…" : "➤"}
            </button>
          </div>
        ) : (
          <div className="aira-next">
            <button className="quiet-button" onClick={onSources}>
              Kembali ke sumber
            </button>
            <button className="primary-button" onClick={onContinue}>
              Bawa hasil ke Dr. Maya <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </section>

      <aside className="context-rail">
        <div>
          <h2>Konteks ({snapshot.contextDocumentIds.length})</h2>
          <p>Respons AIRA berubah mengikuti daftar ini.</p>
        </div>
        {snapshot.contextDocumentIds.map((id) => {
          const document = scenario.documents.find((item) => item.id === id);
          return (
            <article key={id}>
              <FileIcon kind={document?.kind ?? "reference"} />
              <span>{document?.title}</span>
              <button
                aria-label={`Hapus ${document?.title} dari AIRA`}
                onClick={() => onRemove(id)}
              >
                ×
              </button>
            </article>
          );
        })}
        <button className="add-source" onClick={onSources}>
          ＋ Ubah sumber
        </button>
      </aside>
    </div>
  );
}

function SendTab({
  scenario,
  snapshot,
  reviewed,
  ready,
  aiDraft,
  report,
  responsibilityConfirmed,
  onResponsibility,
  onAira,
  onSubmit,
  onRestart,
}: {
  scenario: PublicScenario;
  snapshot: SessionSnapshot;
  reviewed: boolean;
  ready: boolean;
  aiDraft: string;
  report: Report | null;
  responsibilityConfirmed: boolean;
  onResponsibility: (value: boolean) => void;
  onAira: () => void;
  onSubmit: () => void;
  onRestart: () => void | Promise<void>;
}) {
  if (!snapshot.aiResponseReady && !report) {
    return (
      <div className="simple-empty">
        <Avatar person="aira" label="AIRA" size="large" />
        <h1>Belum ada revisi.</h1>
        <button className="primary-button" onClick={onAira}>
          Buka AIRA
        </button>
      </div>
    );
  }

  if (report) {
    return (
      <SentResult report={report} snapshot={snapshot} onRestart={onRestart} />
    );
  }

  const selectedDocuments = snapshot.contextDocumentIds
    .map((id) => scenario.documents.find((document) => document.id === id))
    .filter(Boolean) as PublicScenario["documents"];

  return (
    <div className="send-screen">
      <section className="maya-thread" aria-label="Percakapan dengan Dr. Maya">
        <header>
          <Avatar person="maya" label="Dr. Maya" />
          <div>
            <b>Dr. Maya</b>
            <span>Dosen pembimbing</span>
          </div>
        </header>
        <div className="bubble friend">
          <p>Kirim revisi dan sumber yang kamu pakai, ya.</p>
          <time>08.15</time>
        </div>
        <div className="bubble mine">
          <p>Siap, Bu. Saya periksa dulu sebelum dikirim.</p>
          <time>08.24 ✓✓</time>
        </div>
      </section>

      <section className="message-composer">
        <div className="composer-field">
          <label>Kepada</label>
          <span>
            <Avatar person="maya" size="small" /> Dr. Maya
          </span>
        </div>
        <div className="composer-field">
          <label htmlFor="subject">Subjek</label>
          <input id="subject" value="Revisi rekomendasi literasi AI" readOnly />
        </div>
        <div className="composer-field message-field">
          <span className="field-label">Pesan</span>
          <div className="final-message-text">{aiDraft}</div>
        </div>

        <section className="final-source-block" aria-label="Lampiran sumber">
          <header>
            <svg
              className="paperclip-icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path d="m9 12.5 5.8-5.8a3 3 0 0 1 4.2 4.2l-8.2 8.2a5 5 0 0 1-7.1-7.1l8-8" />
            </svg>
            <b>{selectedDocuments.length} lampiran</b>
          </header>
          <div className="final-source-list">
            {selectedDocuments.map((document) => (
              <article key={document.id}>
                <FileIcon kind={document.kind} />
                <span>
                  <b>{document.title}</b>
                  <small>{document.owner}</small>
                </span>
              </article>
            ))}
          </div>
        </section>

        <div className="send-footer">
          <label className="responsibility-check">
            <input
              type="checkbox"
              disabled={!ready || !reviewed}
              checked={responsibilityConfirmed}
              onChange={(event) => onResponsibility(event.target.checked)}
            />
            Saya sudah membaca hasil AIRA dan siap mengirimnya.
          </label>
          <button
            className="primary-button"
            disabled={!ready || !responsibilityConfirmed}
            onClick={onSubmit}
          >
            Kirim revisi <span aria-hidden="true">➤</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function SentResult({
  report,
  snapshot,
  onRestart,
}: {
  report: Report;
  snapshot: SessionSnapshot;
  onRestart: () => void | Promise<void>;
}) {
  const strong = report.findings.every((finding) => finding.outcome === "met");
  const selectedRestricted =
    snapshot.contextDocumentIds.includes("doc_participants");
  const selectedRelevant = snapshot.contextDocumentIds.includes("doc_unesco");
  const response = selectedRestricted
    ? "Revisinya sudah terkirim, tetapi daftar peserta berisi data pribadi yang tidak dibutuhkan."
    : !selectedRelevant
      ? "Revisinya sudah terkirim, tetapi sumbermu belum menjawab pertanyaan utama."
      : strong
        ? "Bagus. Klaim, sumber, dan tanggung jawabmu sudah jelas."
        : "Arahnya sudah baik. Coba gunakan konteks yang lebih fokus lain kali.";
  const lessons = report.findings.map((finding) => {
    const copy = resultLessonCopy[finding.feedbackKey];
    const description =
      finding.feedbackKey === "select_only_relevant_safe_context" &&
      finding.outcome === "missed" &&
      selectedRestricted
        ? "Kamu membawa data pribadi yang tidak dibutuhkan ke AIRA."
        : (copy?.[finding.outcome] ??
          "Periksa kembali keputusan ini sebelum mengirim tugas.");
    return {
      ...finding,
      title: copy?.title ?? "Keputusan belajar",
      description,
    };
  });

  return (
    <section className="result-screen" aria-labelledby="result-title">
      <div className="result-sheet">
        <header className="result-intro">
          <h1 id="result-title">
            Revisi terkirim. Sekarang lihat keputusanmu.
          </h1>
          <p>
            Nilai terbaik bukan sekadar hasil akhir, tetapi cara kamu memilih
            sumber dan memeriksa AI.
          </p>
        </header>

        <div
          className="result-score"
          aria-label={`Skor latihan ${report.total}`}
        >
          <span>Skor latihan</span>
          <strong>{report.total}</strong>
          <div className="teacher-note">
            <Avatar person="maya" label="Dr. Maya" />
            <div>
              <b>Umpan balik Dr. Maya</b>
              <p>{response}</p>
            </div>
          </div>
          {selectedRestricted ? (
            <p className="result-warning">
              Jangan kirim nama, email, atau nomor telepon jika tidak
              dibutuhkan.
            </p>
          ) : null}
        </div>

        <section className="result-decisions" aria-labelledby="decision-title">
          <h2 id="decision-title">Tiga keputusan yang dinilai</h2>
          <ol>
            {lessons.map((lesson, index) => {
              const met = lesson.outcome === "met";
              return (
                <li className={met ? "met" : "missed"} key={lesson.ruleId}>
                  <span className="decision-number">{index + 1}</span>
                  <div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                  </div>
                  <strong>
                    <span aria-hidden="true">{met ? "✓" : "!"}</span>
                    {met ? "Tepat" : "Perlu diperbaiki"}
                  </strong>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="result-takeaway" aria-labelledby="takeaway-title">
          <h2 id="takeaway-title">Bawa cara ini ke tugas berikutnya</h2>
          <ol>
            <li>
              <span>1</span>
              <div>
                <b>Buka sumber</b>
                <p>Mulai dari sumber tepercaya yang relevan dan aman.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <b>Cocokkan klaim</b>
                <p>Pastikan bukti benar-benar mendukung klaimmu.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <b>Periksa hasil AI</b>
                <p>Baca kritis, cek fakta, lalu putuskan sendiri.</p>
              </div>
            </li>
          </ol>
          <button className="primary-button" onClick={() => void onRestart()}>
            Main lagi
          </button>
        </section>
      </div>
    </section>
  );
}

function DocumentDialog({
  document,
  included,
  onClose,
  onToggle,
}: {
  document: PublicScenario["documents"][number];
  included: boolean;
  onClose: () => void;
  onToggle: (id: string) => void;
}) {
  const unavailable = document.sourceState === "inaccessible_reference";
  return (
    <Modal label={`Pembaca dokumen ${document.title}`} onClose={onClose}>
      <header className="document-dialog-header">
        <div>
          <h1>{document.title}</h1>
          <span>{document.owner}</span>
        </div>
        <button
          className="dialog-close"
          aria-label="Tutup dokumen"
          onClick={onClose}
        >
          ×
        </button>
      </header>
      <SourceDocumentViewer document={document} />
      <footer className="document-dialog-footer">
        <span>Baca isinya. Jangan putuskan dari judul.</span>
        <button
          className="primary-button"
          disabled={unavailable}
          onClick={() => {
            void onToggle(document.id);
            onClose();
          }}
        >
          {unavailable
            ? "Sumber tidak tersedia"
            : included
              ? "Keluarkan dari AIRA"
              : "Pilih untuk AIRA"}
        </button>
      </footer>
    </Modal>
  );
}

function Modal({
  label,
  children,
  onClose,
}: {
  label: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="document-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        {children}
      </section>
    </div>
  );
}
