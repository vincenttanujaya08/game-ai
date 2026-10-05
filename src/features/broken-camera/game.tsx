"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { GameFeedback } from "@/features/game-feedback/game-feedback";
import { formatSisa } from "./budget";
import { FinalScreen } from "./final-screen";
import { rankCandidates } from "./game-logic";
import { InvestigationScreen } from "./investigation-screen";
import { ResultScreen } from "./result-screen";
import { StartScreen } from "./start-screen";
import { bacaRun, hapusRun, langgananRun, lupakanRun, runTersimpan, simpanRun } from "./persistence";
import { authConfigured } from "@/lib/supabase/client";
import { initialState, reducer } from "./state";
import { makeSummary, makeSynthesis } from "./summary";
import { citationOptions, gradeFinal, keterbatasanPilihan } from "./verdict";

/**
 * Router tahap yang tipis. Semua yang menghitung fakta tentang kasus ini tinggal
 * di modul .ts di sebelahnya, karena di sanalah ia bisa diuji.
 */
export default function BrokenCameraGame() {
  const cloudEnabled = authConfigured();
  const [state, dispatch] = useReducer(reducer, initialState);
  const tersimpan = useSyncExternalStore(langgananRun, () => cloudEnabled ? null : runTersimpan(window.sessionStorage), () => null);
  const [remoteRun, setRemoteRun] = useState<ReturnType<typeof bacaRun>>(null);
  const [remoteReady, setRemoteReady] = useState(!cloudEnabled);
  const [cloudError, setCloudError] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const saveQueue = useRef<Promise<void>>(Promise.resolve());
  const { stage, interviewed, followedUp, decision, conclusion, citations, keterbatasan } = state;

  const queueCloud = useCallback((method: "PUT" | "DELETE", body?: { state: unknown; completed: boolean }) => {
    saveQueue.current = saveQueue.current.catch(() => {}).then(async () => {
      const response = await fetch("/api/game-progress", {
        method, headers: body ? { "content-type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) throw new Error("GAME_SAVE_FAILED");
      setCloudError(false);
      setResultReady(method === "PUT" && body?.completed === true);
    });
    void saveQueue.current.catch(() => setCloudError(true));
  }, []);

  const saveCloudState = useCallback(() => {
    let saved: string | null = null;
    simpanRun({ getItem: () => null, setItem: (_key, value) => { saved = value; }, removeItem() {} }, state);
    if (saved) {
      const payload = JSON.parse(saved);
      if (state.stage === "hasil") payload.finalSubmission = { conclusion: state.conclusion, citations: state.citations, keterbatasan: state.keterbatasan };
      queueCloud("PUT", { state: payload, completed: state.stage === "hasil" });
    }
  }, [state, queueCloud]);

  useEffect(() => {
    if (!cloudEnabled) return;
    let cancelled = false;
    void fetch("/api/game-progress", { cache: "no-store" })
      .then(async (response) => { if (!response.ok) throw new Error("GAME_LOAD_FAILED"); return response.json(); })
      .then((data) => {
        if (cancelled) return;
        if (data.state) {
          const saved = JSON.stringify(data.state);
          setRemoteRun(bacaRun({ getItem: () => saved, setItem() {}, removeItem() {} }));
        }
        setRemoteReady(true);
      })
      .catch(() => { if (!cancelled) setCloudError(true); });
    return () => { cancelled = true; };
  }, [cloudEnabled]);

  const ranking = useMemo(() => rankCandidates(interviewed, followedUp), [interviewed, followedUp]);
  const summary = useMemo(() => makeSummary(ranking), [ranking]);
  const synthesis = useMemo(() => makeSynthesis(interviewed, followedUp, ranking), [interviewed, followedUp, ranking]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  // Snapshot server selalu null, jadi render pertama di klien sama persis
  // dengan hasil server. Pemulihannya ditawarkan sebagai pilihan tegas di layar
  // mulai, bukan sebagai lompatan diam-diam ke tengah permainan.
  useEffect(() => {
    if (state.stage === "mulai") return;
    if (!cloudEnabled) { simpanRun(window.sessionStorage, state); return; }
    saveCloudState();
  }, [state, cloudEnabled, saveCloudState]);

  if (!remoteReady) return <main className="case-state"><p>{cloudError ? "Progres game belum bisa dimuat. Muat ulang halaman untuk mencoba lagi." : "Memuat progres game…"}</p></main>;

  const run = cloudEnabled ? remoteRun : tersimpan;
  const saveNotice = cloudError ? <p role="alert">Progres game belum tersimpan. <button type="button" onClick={saveCloudState}>Coba simpan lagi</button></p> : null;

  if (stage === "mulai") {
    return (<>
      {saveNotice}
      <StartScreen
        lanjutan={run ? { wawancara: run.interviewed.length, sisa: formatSisa(run.terpakai) } : null}
        onStart={() => {
          hapusRun(window.sessionStorage);
          lupakanRun();
          setRemoteRun(null);
          if (cloudEnabled) queueCloud("DELETE");
          dispatch({ type: "mulai" });
        }}
        onLanjut={() => { if (run) dispatch({ type: "pulihkan", state: run }); }}
      />
    </>);
  }

  if (stage === "akhir") {
    // Seed pemutar opsi diturunkan dari keadaan penyelidikan: tetap deterministik
    // dan bisa diuji, tetapi opsi yang berlaku tidak selalu berada di posisi pertama.
    const seed = interviewed.length * 7 + followedUp.length * 3;

    return (<>
      {saveNotice}
      <FinalScreen
        summary={summary}
        ranking={ranking}
        interviewed={interviewed}
        followedUp={followedUp}
        decision={decision}
        conclusion={conclusion}
        notice={state.notice}
        citations={citations}
        keterbatasan={keterbatasan}
        dasarPilihan={citationOptions(interviewed, followedUp, state.openedEvidence)}
        keterbatasanPilihan={keterbatasanPilihan(seed)}
        onDecision={(mode) => dispatch({ type: "pilihMode", mode, topCandidate: { kind: "satu", candidate: summary.top.name } })}
        onConclusion={(value) => dispatch({ type: "pilihKesimpulan", conclusion: value })}
        onCitation={(id) => dispatch({ type: "tunjukDasar", id })}
        onKeterbatasan={(id) => dispatch({ type: "pilihKeterbatasan", id })}
        onBack={() => dispatch({ type: "kembaliKePenyelidikan" })}
        onSubmit={() => dispatch({ type: "simpanKeputusan" })}
      />
    </>);
  }

  // Reducer hanya meloloskan tahap "hasil" kalau keduanya sudah terisi.
  if (stage === "hasil" && decision && conclusion) {
    return (<>
      {saveNotice}
      <ResultScreen
        conclusion={conclusion}
        decision={decision}
        verdict={gradeFinal({
          submission: { conclusion, citations, keterbatasan },
          interviewed,
          followedUp,
          openedEvidence: state.openedEvidence,
          sumberDibaca: state.sumberDibaca,
        })}
        interviewed={interviewed}
        followedUp={followedUp}
        terpakai={state.terpakai}
        catatan={state.catatan}
        aiTrail={state.aiTrail}
        feedback={<GameFeedback gameId="kamera-rusak" ready={resultReady} theme="dark" />}
        onReview={() => dispatch({ type: "kembaliKePenyelidikan" })}
        onRestart={() => {
          // Main lagi dengan jalur berbeda memang harus benar-benar bersih.
          hapusRun(window.sessionStorage);
          lupakanRun();
          setRemoteRun(null);
          if (cloudEnabled) queueCloud("DELETE");
          dispatch({ type: "ulangi" });
        }}
      />
    </>);
  }

  return <>{saveNotice}<InvestigationScreen state={state} ranking={ranking} synthesis={synthesis} dispatch={dispatch} /></>;
}
