"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import rawScenario from "@/content/kamera-rusak.id.json";
import { rankCandidates, type Candidate } from "./game-logic";
import styles from "./game.module.css";

type Person = { id: string; nama: string; peran: string; ringkas: string; buka: string[]; mengapa: string; awal: string; tanya: string; lanjut: string };
type Evidence = { id: string; bukaSetelah: string; judul: string; isi: string };
type Scenario = { meta: { judul: string; versi: string; durasiDetik: number; batasWawancaraAkhir: number; jatahDalami: number }; pembuka: { judul: string; isi: string; catatanAi: string; aksi: string }; fase: { judul: string; ids: string[] }[]; tokoh: Person[]; bukti: Evidence[]; linimasa: string };
type Stage = "mulai" | "selidik" | "akhir" | "hasil";
type Tab = "teori" | "sumber" | "riwayat";

const scenario = rawScenario as Scenario;
const personById = Object.fromEntries(scenario.tokoh.map((person) => [person.id, person])) as Record<string, Person>;
const candidateIds: Candidate[] = ["Arya", "Bella", "Dimas", "Chris", "Leo"];
const strength: Record<Candidate, string> = {
  Arya: "Kevin melihat bagian depan kamera Arya menyenggol pegangan tangga sebelum lembar pengembalian ditandatangani.",
  Bella: "Bella mengaku mengangkat kamera untuk melepaskan tali tas, lalu sisi kamera menyentuh tepi meja.",
  Dimas: "Dimas mengatakan beberapa barang dimasukkan sekaligus ke peti dan saling berbenturan di dalamnya.",
  Chris: "Chris mengatakan peti membentur kusen pintu; Nina mendengar benturannya dan suara barang bergeser di dalam.",
  Leo: "Tripod jatuh ke arah peti. Leo dan Maya melihat tripod menyentuh peti setelahnya.",
};
const weakness: Record<Candidate, string> = {
  Arya: "Tidak ada yang memeriksa lensa setelah kamera menyenggol pegangan tangga. Benturannya terjadi, tetapi dampaknya pada lensa hanya dugaan.",
  Bella: "Kamera mungkin menyentuh tepi meja, tetapi tidak ada yang mencatat kondisi lensa tepat sebelum dan sesudah Bella memegangnya.",
  Dimas: "Perpindahan kamera ke peti cukup jelas, tetapi benturan barang di dalam peti tidak membuktikan bahwa lensa retak saat meja dibereskan.",
  Chris: "Benturan di kusen didukung keterangan Nina, tetapi tidak ada yang memeriksa lensa sebelum kejadian tripod setelahnya.",
  Leo: "Kejadian tripod didukung saksi lain, tetapi tidak ada yang melihat tripod merusak lensa secara langsung. Lensanya mungkin sudah retak sebelumnya.",
};

function includesAll(source: string[], target: string[]) { return target.every((item) => source.includes(item)); }
function formatTime(total: number) { return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`; }
function unique(list: string[], item: string) { return list.includes(item) ? list : [...list, item]; }

export default function BrokenCameraGame() {
  const [stage, setStage] = useState<Stage>("mulai");
  const [selected, setSelected] = useState("Arya");
  const [interviewed, setInterviewed] = useState<string[]>([]);
  const [followedUp, setFollowedUp] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(scenario.meta.durasiDetik);
  const [tab, setTab] = useState<Tab>("teori");
  const [notice, setNotice] = useState("");
  const [history, setHistory] = useState<{ trigger: string; text: string }[]>([]);
  const [showEvidence, setShowEvidence] = useState<Evidence | null>(null);
  const [decision, setDecision] = useState<"gunakan" | "ubah" | null>(null);
  const [conclusion, setConclusion] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");

  const ranking = useMemo(() => rankCandidates(interviewed, followedUp), [interviewed, followedUp]);
  const selectedPerson = personById[selected];
  const unlockedEvidence = scenario.bukti.filter((item) => interviewed.includes(item.bukaSetelah));
  const canFinishEarly = interviewed.length >= scenario.meta.batasWawancaraAkhir;
  const isUnlocked = (person: Person) => includesAll(interviewed, person.buka);
  const isKnown = interviewed.includes(selected);
  const hasFollowUp = followedUp.includes(selected);
  const remainingFollowUps = scenario.meta.jatahDalami - followedUp.length;

  useEffect(() => {
    if (stage !== "selidik" || seconds <= 0) return;
    const timeout = window.setTimeout(() => {
      if (seconds === 1) {
        setSeconds(0);
        setNotice("Waktu habis. Ringkasan akhir disusun dari bukti yang sudah kamu kumpulkan.");
        setStage("akhir");
      } else {
        setSeconds((value) => value - 1);
      }
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [stage, seconds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stage]);

  const synthesis = makeSynthesis(interviewed, followedUp, ranking);
  const summary = makeSummary(ranking);
  const chosenCandidate = candidateFromConclusion(conclusion, summary.top.name);
  const questionOne = decision === "gunakan"
    ? `Bukti mana yang paling menjelaskan mengapa AI memberi bobot pada ${summary.shape === "satu" ? summary.top.name : summary.second.name}?`
    : conclusion.startsWith("Bukti yang ada belum cukup") || conclusion.includes("sama-sama mungkin")
      ? "Celah bukti mana yang paling kuat menunjukkan bahwa kita belum bisa menetapkan satu penyebab?"
      : `Keterangan mana yang paling kuat mendukung kesimpulanmu tentang ${chosenCandidate}?`;
  const optionsOne = decision === "gunakan"
    ? evidenceOptions(summary.shape === "satu" ? summary.top.name : summary.second.name)
    : conclusion.startsWith("Bukti yang ada belum cukup") || conclusion.includes("sama-sama mungkin") ? gapOptions() : evidenceOptions(chosenCandidate);
  const optionsTwo = decision === "gunakan"
    ? [weakness[summary.top.name], "Foto pukul 17.56 membuktikan tepat kapan lensa retak.", "Semua benturan diperiksa langsung setelah terjadi.", "Peringkat angka dari AI sudah membuktikan penyebabnya."]
    : [changeReason(conclusion, summary.top.name), "Ringkasan AI pasti salah karena AI selalu tidak bisa diandalkan.", "Aku lebih suka jawaban lain meski tidak didukung sumber.", "Orang yang terakhir diwawancarai pasti penyebabnya."];

  function appendHistory(trigger: string, nextInterviewed: string[], nextFollowUps: string[]) {
    setHistory((entries) => [...entries, { trigger, text: makeSynthesis(nextInterviewed, nextFollowUps, rankCandidates(nextInterviewed, nextFollowUps)) }]);
  }

  function hearStatement() {
    if (isKnown) return;
    const next = unique(interviewed, selected);
    setInterviewed(next); appendHistory(`Wawancara: ${selectedPerson.nama}`, next, followedUp);
    setNotice("Teori sementara AI diperbarui. Periksa apakah ada keterangan atau bukti baru yang terbuka.");
  }

  function askMore() {
    if (!isKnown || hasFollowUp || remainingFollowUps <= 0) return;
    const next = unique(followedUp, selected);
    setFollowedUp(next); appendHistory(`Gali lebih dalam: ${selectedPerson.nama}`, interviewed, next);
    setNotice("Keterangan tambahan sudah masuk ke teori sementara AI.");
  }

  function endInvestigation() {
    if (!canFinishEarly) { setNotice(`Wawancarai ${scenario.meta.batasWawancaraAkhir - interviewed.length} orang lagi sebelum mengakhiri penyelidikan lebih awal.`); return; }
    setStage("akhir"); setDecision(null); setConclusion(""); setAnswerOne(""); setAnswerTwo("");
  }

  function pickDecision(next: "gunakan" | "ubah") { setDecision(next); setConclusion(next === "gunakan" ? summary.conclusion : ""); setAnswerOne(""); setAnswerTwo(""); }
  function submit() { if (answerOne && answerTwo && conclusion) setStage("hasil"); }
  function restart() { setStage("mulai"); setSelected("Arya"); setInterviewed([]); setFollowedUp([]); setSeconds(scenario.meta.durasiDetik); setTab("teori"); setNotice(""); setHistory([]); setDecision(null); setConclusion(""); setAnswerOne(""); setAnswerTwo(""); }

  if (stage === "mulai") return <Start onStart={() => setStage("selidik")} />;
  if (stage === "akhir") return <FinalScreen summary={summary} interviewed={interviewed} followedUp={followedUp} decision={decision} conclusion={conclusion} answerOne={answerOne} answerTwo={answerTwo} onDecision={pickDecision} onConclusion={setConclusion} questionOne={questionOne} optionsOne={optionsOne} optionsTwo={optionsTwo} onAnswerOne={setAnswerOne} onAnswerTwo={setAnswerTwo} onBack={() => setStage("selidik")} onSubmit={submit} />;
  if (stage === "hasil") return <ResultScreen summary={summary} conclusion={conclusion} decision={decision!} answerOne={answerOne} answerTwo={answerTwo} onReview={() => setStage("selidik")} onRestart={restart} />;

  return <main className={styles.game}>
    <GameNavigation />
    <header className={styles.header}>
      <div><h1>{scenario.meta.judul}</h1><p>{scenario.meta.versi}</p></div>
      <div className={styles.stats}><b className={seconds <= 60 ? styles.danger : seconds <= 180 ? styles.warning : ""}>{formatTime(seconds)}</b><span>Waktu tersisa</span></div>
      <div className={styles.stats}><b>{interviewed.length}/{scenario.tokoh.length}</b><span>Wawancara</span></div>
      <div className={styles.stats}><b>{followedUp.length}/{scenario.meta.jatahDalami}</b><span>Pertanyaan lanjutan</span></div>
    </header>
    <section className={styles.workspace}>
      <aside className={styles.people} aria-label="Daftar orang yang bisa diwawancarai">
        <div className={styles.sectionHead}><h2>Orang yang bisa diwawancarai</h2><p>Semakin banyak keterangan terkumpul, semakin banyak jalur penyelidikan terbuka.</p></div>
        {scenario.fase.map((phase) => <div key={phase.judul} className={styles.phase}><h3>{phase.judul}</h3>{phase.ids.map((id) => {
          const person = personById[id]; const unlocked = isUnlocked(person); const seen = interviewed.includes(id); const more = followedUp.includes(id);
          return <button key={id} className={`${styles.person} ${selected === id && unlocked ? styles.selected : ""}`} disabled={!unlocked} onClick={() => { setSelected(id); setNotice(""); }}><strong>{person.nama}</strong><span>{person.ringkas}</span><small>{!unlocked ? `Belum terbuka · dengarkan ${person.buka.join(" dan ")} lebih dulu` : more ? "Sudah ditanya lebih lanjut" : seen ? "Keterangan sudah didengar" : "Bisa diwawancarai"}</small></button>;
        })}</div>)}</aside>
      <section className={styles.statement} aria-live="polite">
        <div className={styles.sectionHead}><p className={styles.kicker}>Wawancara</p><h2>{selectedPerson.nama}</h2><p>{selectedPerson.peran}</p></div>
        <article className={styles.paper}>
          <p className={styles.paperLabel}>Mengapa keterangannya penting</p><p>{selectedPerson.mengapa}</p>
          {isKnown ? <><p className={styles.paperLabel}>Keterangan awal</p><p className={styles.quote}>{selectedPerson.awal}</p>{hasFollowUp && <><p className={styles.paperLabel}>Pertanyaan lanjutan</p><p><b>Tanya:</b> {selectedPerson.tanya}</p><p className={styles.quote}>{selectedPerson.lanjut}</p></>}</> : <p className={styles.preview}>Orang-orang ini bukan tersangka. Mereka diwawancarai karena keterangan mereka membantu menyusun kronologi. Dengarkan satu per satu untuk melihat bagaimana teori sementara AI berubah.</p>}
        </article>
        <div className={styles.actions}><button onClick={hearStatement} disabled={isKnown}>{isKnown ? "Keterangan sudah didengar ✓" : "Dengarkan keterangan"}</button><button className={styles.secondary} onClick={askMore} disabled={!isKnown || hasFollowUp || remainingFollowUps <= 0}>{hasFollowUp ? "Pertanyaan lanjutan sudah dipakai ✓" : remainingFollowUps ? `Tanya lebih lanjut · ${remainingFollowUps} kesempatan` : "Kesempatan bertanya habis"}</button></div>
        {notice && <p className={styles.notice}>{notice}</p>}
      </section>
      <aside className={styles.notebook}>
        <div className={styles.sectionHead}><h2>Catatan kasus</h2><p>Rangkuman AI, keterangan asli, dan riwayat perubahannya.</p></div>
        <div className={styles.tabs}>{([ ["teori", "Rangkuman AI"], ["sumber", "Keterangan asli"], ["riwayat", "Riwayat perubahan"] ] as [Tab, string][]).map(([id, label]) => <button key={id} className={tab === id ? styles.activeTab : ""} onClick={() => setTab(id)}>{label}</button>)}</div>
        <div className={styles.noteBody}>{tab === "teori" ? <TextBlock text={synthesis} /> : tab === "sumber" ? interviewed.length ? interviewed.map((id) => <article key={id} className={styles.source}><h3>{personById[id].nama} · {personById[id].peran}</h3><p>{personById[id].awal}</p>{followedUp.includes(id) && <><b>Pertanyaan lanjutan: {personById[id].tanya}</b><p>{personById[id].lanjut}</p></>}</article>) : <p>Belum ada keterangan yang dibuka.</p> : history.length ? [...history].reverse().slice(0, 6).map((item, index) => <article key={`${item.trigger}-${index}`} className={styles.source}><h3>{item.trigger}</h3><TextBlock text={item.text} /></article>) : <p>Riwayat perubahan akan muncul setelah keterangan atau pertanyaan lanjutan mengubah teori AI.</p>}</div>
      </aside>
    </section>
    <footer className={styles.evidenceBar}><div><h2>Bukti yang terbuka</h2>{unlockedEvidence.length ? <div className={styles.evidenceList}>{unlockedEvidence.map((item) => <button key={item.id} className={styles.evidence} onClick={() => setShowEvidence(item)}>{item.judul}</button>)}</div> : <p>Mulai dari orang yang bisa diwawancarai. Bukti akan muncul saat ada alasan untuk memeriksanya.</p>}</div><button className={styles.end} onClick={endInvestigation}>Akhiri penyelidikan</button></footer>
    {showEvidence && <dialog open className={styles.dialog}><article><button className={styles.close} onClick={() => setShowEvidence(null)} aria-label="Tutup">Tutup</button><h2>{showEvidence.judul}</h2><TextBlock text={showEvidence.isi} /></article></dialog>}
  </main>;
}

function GameNavigation() { return <header className={styles.gameNavigation}><Link href="/" className={styles.gameBrand} aria-label="NUSA Lab, beranda"><strong>NUSA</strong> Lab</Link><Link href="/games" className={styles.back}><span aria-hidden="true">←</span> Kembali ke daftar permainan</Link></header>; }
function Start({ onStart }: { onStart: () => void }) { return <main className={styles.start}><GameNavigation /><section><p className={styles.kicker}>KASUS 02 · REKONSTRUKSI KRONOLOGI</p><h1>{scenario.pembuka.judul}</h1><TextBlock text={scenario.pembuka.isi} /><aside><h2>Catatan AI</h2><p>{scenario.pembuka.catatanAi}</p></aside><p className={styles.kicker}>Susun kembali urutan kejadian dengan memeriksa keterangan dan bukti.</p><button onClick={onStart}>{scenario.pembuka.aksi}</button></section></main>; }
function TextBlock({ text }: { text: string }) { return <>{text.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>; }

function makeSynthesis(interviewed: string[], followedUp: string[], ranking: ReturnType<typeof rankCandidates>) {
  if (!interviewed.length) return "Belum ada keterangan. Mulai dengan mewawancarai Arya untuk melihat teori sementara pertama dari AI.";
  const [top, second] = ranking;
  const bits = [
    "RANGKUMAN AI",
    "Dugaan paling kuat saat ini",
    `${top.name} paling mungkin terkait dengan kerusakan lensa, dengan nilai sekitar ${top.percent}% dalam peringkat saat ini.`,
    `Mengapa AI condong ke ${top.name}? ${strength[top.name]}`,
  ];
  if (interviewed.includes("Arya")) bits.push("Catatan pengembalian pukul 17.48 menunjukkan Arya masih menggunakan kamera menjelang waktu itu, tetapi catatan tersebut tidak memastikan di mana kamera disimpan.");
  if (interviewed.includes("Kevin")) bits.push("Keterangan Kevin menambahkan kemungkinan benturan sebelum kamera dikembalikan, sehingga Arya tetap ada dalam daftar dugaan.");
  if (interviewed.includes("Bella")) bits.push("Bella tidak membawa kamera di dalam tas, tetapi ia sempat memegang kamera saat melepaskan tali tas.");
  if (interviewed.includes("Fajar")) bits.push("Keterangan Fajar menambahkan kemungkinan kamera menyentuh tepi meja saat Bella berada di sana.");
  if (interviewed.includes("Siska")) bits.push("Foto pukul 17.56 memastikan kamera berada di meja dokumentasi dan terpisah dari tas Bella. Namun, foto itu tidak menunjukkan apakah lensa sudah retak.");
  if (interviewed.includes("Dimas")) bits.push("Keterangan Dimas memberi petunjuk kuat tentang bagaimana kamera berpindah dari meja ke peti.");
  if (interviewed.includes("Rafi")) bits.push("Rafi mempersempit waktu perpindahan dan menghubungkan tumpukan barang Dimas dengan peti yang sudah tertutup.");
  if (interviewed.includes("Chris")) bits.push("Chris membawa peti tertutup ke ruang multimedia.");
  if (interviewed.includes("Nina")) bits.push("Nina membenarkan bahwa peti membentur kusen pintu. Ini mendukung kemungkinan benturan setelah kamera berada di dalam peti.");
  if (interviewed.includes("Leo")) bits.push("Leo menambahkan kemungkinan benturan lain setelah peti tiba: sebuah tripod jatuh ke arahnya.");
  if (interviewed.includes("Maya")) bits.push("Maya menguatkan keterangan tentang waktu kejadian tripod dan posisinya di dekat peti.");
  if (followedUp.length) bits.push(`Pertanyaan lanjutan untuk ${followedUp.join(", ")} menambahkan detail yang membuat satu rangkaian kejadian tampak lebih kuat. Namun, detail itu belum membuktikan kapan lensa retak.`);
  bits.push(`Dugaan berikutnya: ${second.name}, sekitar ${second.percent}%. Peringkat ini dibuat dari keterangan yang kamu pilih, bukan dari semua hal yang mungkin terjadi.`);
  bits.push(`Peringkat dugaan saat ini: ${ranking.map((item, index) => `${index + 1}. ${item.name} · ${item.percent}%`).join("   ")}.`);
  return bits.join("\n\n");
}
function makeSummary(ranking: ReturnType<typeof rankCandidates>) {
  const [top, second, third] = ranking; const gap12 = top.score - second.score; const gap13 = top.score - third.score;
  if (gap13 <= 8) return { top, second, third, shape: "tiga", conclusion: `${top.name}, ${second.name}, dan ${third.name} masih sama-sama mungkin. AI sedikit lebih condong ke ${top.name}.` };
  if (gap12 <= 7) return { top, second, third, shape: "dua", conclusion: `Dugaan ${top.name} dan ${second.name} hampir berimbang. AI sedikit lebih condong ke ${top.name}.` };
  if (gap12 <= 15) return { top, second, third, shape: "pasangan", conclusion: `${top.name} menjadi dugaan terkuat, tetapi ${second.name} masih mungkin menjadi penyebabnya.` };
  return { top, second, third, shape: "satu", conclusion: `Menurut AI, ${top.name} paling mungkin menyebabkan lensa retak.` };
}
function evidenceOptions(candidate: Candidate) { return [strength[candidate], ...candidateIds.filter((name) => name !== candidate).slice(0, 3).map((name) => strength[name])]; }
function gapOptions() { return ["Tidak ada yang memeriksa kondisi lensa di antara beberapa kejadian benturan, jadi waktu tepat lensa retak tidak bisa dipastikan.", "Nomor seri kamera tidak tercatat di daftar tugas beres-beres.", "Lembar pengembalian mencatat pukul 17.48, bukan 17.45.", "Bella membawa tas kamera ke tempat lain."]; }
function candidateFromConclusion(conclusion: string, fallback: Candidate): Candidate { return candidateIds.find((name) => conclusion.startsWith(name) || conclusion.includes(`condong ke ${name}`)) ?? fallback; }
function changeReason(conclusion: string, top: Candidate) { if (conclusion.startsWith("Bukti yang ada belum cukup") || conclusion.includes("sama-sama mungkin")) return "AI mengubah peringkat dugaan menjadi cerita sebab-akibat yang lebih pasti daripada yang bisa dibuktikan oleh sumber."; if (conclusion.includes("atau")) return "Peringkat AI terlalu merangkum ketidakpastian. Dugaan kedua juga punya dukungan sumber yang cukup untuk tetap disebutkan."; return `Aku memilih memperkuat dugaan tentang ${candidateFromConclusion(conclusion, top)} karena ada alasan yang jelas dari sumber, bukan sekadar mengikuti peringkat AI.`; }

function FinalScreen(props: { summary: ReturnType<typeof makeSummary>; interviewed: string[]; followedUp: string[]; decision: "gunakan" | "ubah" | null; conclusion: string; answerOne: string; answerTwo: string; onDecision: (value: "gunakan" | "ubah") => void; onConclusion: (value: string) => void; questionOne: string; optionsOne: string[]; optionsTwo: string[]; onAnswerOne: (value: string) => void; onAnswerTwo: (value: string) => void; onBack: () => void; onSubmit: () => void }) {
  const { summary, interviewed, followedUp, decision, conclusion, answerOne, answerTwo } = props;
  const conclusions = [
    ...candidateIds.map((name) => `${name} paling mungkin menjadi penyebab kerusakan.`),
    `${summary.top.name} atau ${summary.second.name} masih mungkin. Aku lebih condong ke ${summary.top.name}.`,
    `${summary.top.name} atau ${summary.second.name} masih mungkin. Aku lebih condong ke ${summary.second.name}.`,
    ...(summary.shape === "tiga" || summary.shape === "dua" ? [`${summary.top.name}, ${summary.second.name}, dan ${summary.third.name} masih sama-sama mungkin.`] : []),
    "Bukti yang ada belum cukup untuk menentukan satu penyebab.",
  ];
  return <main className={styles.final}>
    <GameNavigation />
    <button className={styles.backButton} onClick={props.onBack}>← Kembali ke penyelidikan</button>
    <header>
      <p className={styles.kicker}>REKONSTRUKSI AKHIR</p>
      <h1>Tinjau rangkuman AI</h1>
      <p>Rangkuman ini dibuat dari wawancara dan jawaban lanjutan yang kamu pilih. Keterangan yang belum kamu buka tidak ikut dipertimbangkan.</p>
    </header>
    <section className={styles.finalGrid}>
      <article className={styles.summary}>
        <h2>Rangkuman akhir AI</h2>
        <p><b>Wawancara:</b> {interviewed.length}/{scenario.tokoh.length} · <b>Pertanyaan lanjutan:</b> {followedUp.length}/{scenario.meta.jatahDalami}</p>
        <h3>Kesimpulan AI tentang kerusakan</h3><p className={styles.conclusion}>{summary.conclusion}</p>
        <h3>Peringkat dugaan</h3>
        {[summary.top, summary.second, summary.third].map((item, index) => <p key={item.name}>{index + 1}. {item.name} · {item.percent}%</p>)}
        <p className={styles.muted}>Persentase ini hanya simulasi peringkat dalam permainan. Angka tersebut bukan bukti atau peluang yang terukur di dunia nyata.</p>
      </article>
      <article className={styles.decision}>
        <h2>Apa keputusanmu setelah membaca kesimpulan AI?</h2>
        <p>Gunakan kesimpulan AI atau pilih kesimpulanmu sendiri. Pastikan pilihanmu sesuai dengan bukti yang sudah kamu kumpulkan.</p>
        {!decision ? <div className={styles.choiceButtons}><button onClick={() => props.onDecision("gunakan")}>Gunakan rangkuman AI</button><button className={styles.secondary} onClick={() => props.onDecision("ubah")}>Ubah kesimpulan</button></div> : <>
          <p>{decision === "gunakan" ? "Kamu memilih memakai kesimpulan AI. Tetap perhatikan alasan dan keterbatasan buktinya." : "Kamu memilih mengubah kesimpulan AI. Pilih jawaban yang bisa kamu jelaskan berdasarkan bukti."}</p>
          {decision === "ubah" && <fieldset><legend>Pilih kesimpulanmu</legend>{conclusions.map((item) => <label key={item}><input type="radio" name="conclusion" checked={conclusion === item} onChange={() => { props.onConclusion(item); props.onAnswerOne(""); props.onAnswerTwo(""); }} />{item}</label>)}</fieldset>}
          {conclusion && <>
            <Question title="Pertanyaan 1" question={props.questionOne} options={props.optionsOne} value={answerOne} onChange={props.onAnswerOne} name="one" />
            <Question title="Pertanyaan 2" question={decision === "gunakan" ? "Walaupun memakai rangkuman AI, keterbatasan apa yang perlu kamu ingat?" : "Bagian mana dari kesimpulan AI yang kamu tolak atau perbaiki?"} options={props.optionsTwo} value={answerTwo} onChange={props.onAnswerTwo} name="two" />
            <button onClick={props.onSubmit} disabled={!answerOne || !answerTwo}>Simpan keputusan</button>
          </>}
        </>}
      </article>
    </section>
  </main>;
}
function Question({ title, question, options, value, onChange, name }: { title: string; question: string; options: string[]; value: string; onChange: (value: string) => void; name: string }) { return <fieldset className={styles.question}><legend>{title}</legend><p>{question}</p>{options.map((option) => <label key={option}><input type="radio" name={name} checked={value === option} onChange={() => onChange(option)} />{option}</label>)}</fieldset>; }
function ResultScreen({ summary, conclusion, decision, answerOne, answerTwo, onReview, onRestart }: { summary: ReturnType<typeof makeSummary>; conclusion: string; decision: "gunakan" | "ubah"; answerOne: string; answerTwo: string; onReview: () => void; onRestart: () => void }) {
  const cautious = conclusion.startsWith("Bukti yang ada belum cukup");
  const evidenceOk = answerOne.includes("Tidak ada yang memeriksa") || answerOne === strength[candidateFromConclusion(conclusion, summary.top.name)];
  const reasonOk = answerTwo.includes("AI mengubah") || answerTwo === weakness[summary.top.name] || answerTwo.includes("Aku memilih") || answerTwo.includes("Peringkat AI terlalu");
  return <main className={styles.result}>
    <GameNavigation />
    <header><p className={styles.kicker}>HASIL REKONSTRUKSI</p><h1>Perjalanan kamera bisa disusun, tetapi kapan lensanya retak masih belum pasti.</h1><p>Di kasus ini tidak ada pengungkapan pelaku rahasia. Hasilmu menunjukkan seberapa baik kesimpulanmu mengikuti bukti yang kamu pilih.</p></header>
    <section className={styles.resultGrid}>
      <article><h2>Kronologi berdasarkan bukti</h2><p>Perpindahan kamera lebih mudah disusun daripada waktu kerusakannya: kamera terlihat di meja pukul 17.56, kemungkinan masuk ke peti saat Dimas membereskan meja, lalu dibawa Chris ke ruang multimedia.</p><TextBlock text={scenario.linimasa} /></article>
      <article>
        <h2>Keputusan akhirmu</h2>
        <p><b>{decision === "gunakan" ? "Menggunakan" : "Mengubah"}</b> rangkuman AI</p>
        <p className={styles.conclusion}>{conclusion}</p>
        <h3>{cautious && evidenceOk && reasonOk ? "Kesimpulan paling hati-hati" : cautious ? "Kesimpulan hati-hati · alasan perlu ditinjau" : "Kesimpulan yang masih perlu diuji"}</h3>
        <p>{cautious ? "Tidak ada yang memeriksa kondisi lensa di antara beberapa kejadian benturan. Jika pertanyaannya adalah apa yang bisa dipastikan dari bukti, belum memilih satu penyebab adalah kesimpulan yang paling kuat. Ini tidak berarti semua orang sama mungkin menyebabkan kerusakan; bukti hanya belum memastikan kejadian mana yang membuat lensa retak." : "Beberapa kejadian benturan benar-benar terjadi atau didukung keterangan saksi, tetapi tidak ada yang memeriksa lensa setelahnya. Dugaanmu bisa masuk akal, namun belum membuktikan kapan retak pertama kali muncul."}</p>
        <h3>Yang bisa dipastikan</h3>
        <p>AI menyusun jawaban dari informasi yang kamu berikan dan cenderung memilih pola yang tampak paling masuk akal. Peringkat yang meyakinkan tetap bukan bukti. Periksa sumber aslinya, lalu tentukan apakah bukti mendukung dugaan, jawaban yang hati-hati, atau perlu pemeriksaan lebih lanjut.</p>
      </article>
    </section>
    <footer><button className={styles.secondary} onClick={onReview}>Tinjau kembali kasus</button><button onClick={onRestart}>Main lagi</button></footer>
  </main>;
}
