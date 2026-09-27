"use client";

import { useEffect, useMemo, useReducer, useSyncExternalStore } from "react";
import { formatSisa } from "./budget";
import { FinalScreen } from "./final-screen";
import { rankCandidates } from "./game-logic";
import { InvestigationScreen } from "./investigation-screen";
import { ResultScreen } from "./result-screen";
import { StartScreen } from "./start-screen";
import { hapusRun, langgananRun, lupakanRun, runTersimpan, simpanRun } from "./persistence";
import { initialState, reducer } from "./state";
import { makeSummary, makeSynthesis } from "./summary";
import { citationOptions, gradeFinal, keterbatasanPilihan } from "./verdict";

/**
 * Router tahap yang tipis. Semua yang menghitung fakta tentang kasus ini tinggal
 * di modul .ts di sebelahnya, karena di sanalah ia bisa diuji.
 */
export default function BrokenCameraGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tersimpan = useSyncExternalStore(langgananRun, () => runTersimpan(window.sessionStorage), () => null);
  const { stage, interviewed, followedUp, decision, conclusion, citations, keterbatasan } = state;

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
    simpanRun(window.sessionStorage, state);
  }, [state]);

  if (stage === "mulai") {
    return (
      <StartScreen
        lanjutan={tersimpan ? { wawancara: tersimpan.interviewed.length, sisa: formatSisa(tersimpan.terpakai) } : null}
        onStart={() => {
          hapusRun(window.sessionStorage);
          lupakanRun();
          dispatch({ type: "mulai" });
        }}
        onLanjut={() => { if (tersimpan) dispatch({ type: "pulihkan", state: tersimpan }); }}
      />
    );
  }

  if (stage === "akhir") {
    // Seed pemutar opsi diturunkan dari keadaan penyelidikan: tetap deterministik
    // dan bisa diuji, tetapi opsi yang berlaku tidak selalu berada di posisi pertama.
    const seed = interviewed.length * 7 + followedUp.length * 3;

    return (
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
    );
  }

  // Reducer hanya meloloskan tahap "hasil" kalau keduanya sudah terisi.
  if (stage === "hasil" && decision && conclusion) {
    return (
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
        onReview={() => dispatch({ type: "kembaliKePenyelidikan" })}
        onRestart={() => {
          // Main lagi dengan jalur berbeda memang harus benar-benar bersih.
          hapusRun(window.sessionStorage);
          lupakanRun();
          dispatch({ type: "ulangi" });
        }}
      />
    );
  }

  return <InvestigationScreen state={state} ranking={ranking} synthesis={synthesis} dispatch={dispatch} />;
}
