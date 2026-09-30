"use client";

import { useState } from "react";
import styles from "./yes-man-pilot.module.css";

const stages = ["Brief kasus", "Pilih strategi", "Pilah info", "Rakit prompt", "Audit jawaban", "Tentukan tes", "Bekalmu"];

const promptMoves = [
  {
    text: "Berperan sebagai konsultan usaha kecil. Sebutkan tiga alasan booth snack sehat ini bisa sukses, lalu beri rekomendasi.",
    response: "Booth ini bisa menarik pengunjung yang peduli kesehatan, menambah pilihan makanan di festival, dan membangun nama usaha. Saya merekomendasikan tim untuk lanjut.",
    feedback: "Peran bisa memberi gaya jawaban, tetapi permintaan ini hanya mencari alasan sukses. Belum ada dasar untuk rekomendasi lanjut.",
  },
  {
    text: "Jangan mengiyakan saya. Cari risiko terbesar booth snack sehat ini dan sarankan cara mengatasinya.",
    response: "Risikonya antara lain minat pengunjung rendah, harga bahan naik, dan persaingan dengan booth lain. Siapkan promosi dan menu yang beragam.",
    feedback: "Mencari risiko itu berguna, tapi belum cukup untuk menilai ide. Jawabannya juga belum tahu batas modal atau apakah pengunjung tertarik.",
  },
  {
    text: "Bantu timku menguji rencana booth snack sehat di festival 3 hari. Modal maksimal Rp400 ribu dan belum ada data calon pembeli. Bandingkan alasan mendukung dan meragukan, tandai asumsi, lalu sarankan tes murah sebelum kami belanja bahan.",
    response: "Yang mendukung: ada acara dan target pengunjung. Yang belum diketahui: minat pada menu dan harga. Target acara bukan jumlah pembeli. Sebelum belanja, tanyakan minat dan batas harga kepada calon pengunjung.",
    feedback: "Ini memberi tugas, konteks, batas, dan cara menilai jawaban. AI tetap belum tahu apakah orang akan membeli; ia membantu merancang hal yang perlu dicek.",
  },
] as const;

const claims = [
  {
    text: "Panitia menargetkan 1.000 pengunjung.",
    labels: ["Ada di brief", "Asumsi", "Langkah uji"],
    answer: 0,
    why: "Angka itu disebut di brief sebagai target panitia. Target bukan jumlah pengunjung yang pasti hadir.",
  },
  {
    text: "Pengunjung festival pasti tertarik membeli snack sehat.",
    labels: ["Ada di brief", "Asumsi", "Langkah uji"],
    answer: 1,
    why: "Belum ada data minat pengunjung. Kata “pasti” menyulap dugaan menjadi seolah-olah fakta.",
  },
  {
    text: "Tawarkan sampel kecil dan catat berapa orang yang mau membayar.",
    labels: ["Ada di brief", "Asumsi", "Langkah uji"],
    answer: 2,
    why: "Ini usulan eksperimen, belum hasil. Setelah dicoba, catat siapa yang merespons dan berapa yang benar-benar mau membayar.",
  },
] as const;

const promptParts = [
  {
    title: "Tugas",
    choices: [
      "Bandingkan booth ini dengan pilihan makanan lain di festival.",
      "Bantu tim menilai apakah ide booth ini layak diuji.",
      "Tentukan apakah tim sebaiknya langsung patungan modal.",
    ],
    answer: 1,
    why: "Tugasnya meminta penilaian yang bisa diuji. Membandingkan dengan booth lain bisa berguna, tetapi perlu data yang belum ada.",
  },
  {
    title: "Konteks dan batas",
    choices: [
      "Festival 3 hari; modal maksimal Rp400 ribu; belum ada data minat atau harga.",
      "Festival 3 hari; target 1.000 pengunjung; modal Rp400 ribu.",
      "Acara kampus untuk anak muda; jual snack sehat dengan harga terjangkau.",
    ],
    answer: 0,
    why: "Festival, durasi, target panitia, dan modal memang berguna. Tapi prompt ini belum menyebut bahwa tim belum punya data minat atau harga.",
  },
  {
    title: "Standar penilaian",
    choices: [
      "Cari alasan yang mendukung dan meragukan; pisahkan info di brief dari asumsi.",
      "Daftar risiko booth dan cara menguranginya.",
      "Bandingkan alasan mendukung dan meragukan, lalu simpulkan apakah ide ini layak.",
    ],
    answer: 0,
    why: "Daftar risiko membantu, tetapi baru melihat satu sisi. Ringkasan pro-kontra lebih mudah dinilai kalau juga memisahkan info dan asumsi.",
  },
  {
    title: "Bentuk jawaban",
    choices: [
      "Buat promosi yang menarik untuk media sosial.",
      "Buat tabel: klaim, dasar di brief, asumsi, dan cara mengeceknya dengan biaya kecil.",
      "Tulis poin-poin pro dan kontra, lalu beri kesimpulan singkat.",
    ],
    answer: 1,
    why: "Ringkasan pro-kontra bisa jadi awal, tapi tabel ini juga menunjukkan dasar klaim dan apa yang masih perlu dicek.",
  },
] as const;

const outputClaims = [
  "Panitia menargetkan 1.000 pengunjung.",
  "Anak muda makin sadar kesehatan, jadi snack ini pasti laku.",
  "Sebaiknya siapkan 50 porsi untuk hari pertama.",
] as const;

const followUps = [
  {
    text: "Cari tren makanan sehat dan contoh booth serupa untuk membandingkan peluangnya.",
    feedback: "Ini bisa memberi konteks awal, tetapi contoh dari tempat lain belum menjawab minat pengunjung festivalmu.",
  },
  {
    text: "Perkirakan jumlah porsi yang akan terjual dari target 1.000 pengunjung.",
    feedback: "Perkiraan itu terdengar konkret, tapi kita belum tahu berapa orang datang atau tertarik membeli. Angka presisi bisa memberi rasa yakin palsu.",
  },
  {
    text: "Rancang tes satu hari dengan biaya maksimal Rp100 ribu. Tentukan siapa yang ditanya, apa yang dicatat, dan tanda minat seperti apa yang cukup untuk lanjut. Pisahkan saranmu dari asumsi.",
    feedback: "Bagus: tesnya kecil, ada ukuran yang diamati, dan tim menentukan keputusan dari hasil nyata—bukan dari pujian AI.",
  },
] as const;

type Props = {
  onAttempt: (step: number, correct: boolean) => void;
  onComplete: () => void;
};

export function YesManPilot({ onAttempt, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [promptMove, setPromptMove] = useState<number | null>(null);
  const [classifications, setClassifications] = useState<(number | null)[]>([null, null, null]);
  const [claimsChecked, setClaimsChecked] = useState(false);
  const [parts, setParts] = useState<(number | null)[]>([null, null, null, null]);
  const [partsChecked, setPartsChecked] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([]);
  const [outputChecked, setOutputChecked] = useState(false);
  const [followUp, setFollowUp] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");

  const correctParts = promptParts.filter((part, index) => parts[index] === part.answer).length;
  const promptPreview = parts.map((choice, index) => `${promptParts[index].title}: ${choice === null ? `[${promptParts[index].title.toLowerCase()}]` : promptParts[index].choices[choice]}`).join("\n\n");

  function setClassification(claimIndex: number, choiceIndex: number) {
    setClassifications((previous) => previous.map((value, index) => index === claimIndex ? choiceIndex : value));
    setClaimsChecked(false);
  }

  function checkClaims() {
    const correct = claims.every((claim, index) => classifications[index] === claim.answer);
    setClaimsChecked(true);
    onAttempt(1, correct);
  }

  function setPart(partIndex: number, choiceIndex: number) {
    setParts((previous) => previous.map((value, index) => index === partIndex ? choiceIndex : value));
    setPartsChecked(false);
  }

  function checkParts() {
    setPartsChecked(true);
    onAttempt(2, correctParts === promptParts.length);
  }

  function toggleFlag(index: number) {
    setFlagged((previous) => previous.includes(index) ? previous.filter((value) => value !== index) : [...previous, index]);
    setOutputChecked(false);
  }

  function checkOutput() {
    const correct = flagged.length === 2 && flagged.includes(1) && flagged.includes(2);
    setOutputChecked(true);
    onAttempt(3, correct);
  }

  function selectFollowUp(index: number) {
    setFollowUp(index);
    onAttempt(4, index === 2);
  }

  function back() { setStep((current) => Math.max(0, current - 1)); }

  return (
    <div className={styles.pilot}>
      <div className={styles.missionBar}>
        <span><i aria-hidden="true">N</i> LAB PROMPT · KASUS LAPANGAN</span>
        <span>{String(step + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}</span>
      </div>
      <div className={styles.progress} role="progressbar" aria-label="Progres pelajaran" aria-valuemin={0} aria-valuemax={stages.length} aria-valuenow={step + 1}>
        <span style={{ width: `${((step + 1) / stages.length) * 100}%` }} />
      </div>
      <div className={styles.stageName}>{stages[step]}</div>

      {step === 0 && (
        <section aria-labelledby="pilot-title">
          <div className={styles.opening}>
            <div className={styles.caseNumber}>KASUS<br /><strong>07</strong></div>
            <div>
              <p className={styles.kicker}>KEPUTUSAN DALAM 8 MENIT</p>
              <h2 id="pilot-title">AI bilang idemu brilian. Terus?</h2>
              <p className={styles.lead}>Tim organisasimu mau buka booth snack sehat di festival kampus. Sebelum patungan modal, kamu minta pendapat AI.</p>
            </div>
          </div>
          <div className={styles.chat}>
            <span><i /> JAWABAN AI · BARU SAJA</span>
            <p>“Idenya brilian! Panitia menargetkan 1.000 pengunjung dan anak muda makin peduli kesehatan, jadi booth kalian pasti ramai.”</p>
          </div>
          <div className={styles.brief}>
            <span>BRIEF YANG KAMU PUNYA</span>
            <p>Festival berlangsung 3 hari · modal maksimal Rp400 ribu · panitia menargetkan 1.000 pengunjung · belum ada data minat atau harga.</p>
          </div>
          <p className={styles.note}>Tugasmu bukan mencari prompt ajaib. Kamu akan mengarahkan AI, memilah jawabannya, lalu menentukan hal yang perlu diuji di dunia nyata.</p>
          <button className={styles.primary} type="button" onClick={() => setStep(1)}>Mulai kasus <span aria-hidden="true">→</span></button>
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>RONDE 1 · PILIH STRATEGI</p>
          <h2 id="pilot-title">Prompt mana yang paling bisa diuji?</h2>
          <p className={styles.lead}>Tiap pilihan memberi arah berbeda. Pilih satu untuk melihat jawaban AI—lalu perhatikan apa yang masih belum ia ketahui.</p>
          <div className={styles.moves} role="group" aria-label="Pilihan prompt">
            {promptMoves.map((move, index) => (
              <button key={move.text} type="button" aria-pressed={promptMove === index} onClick={() => { setPromptMove(index); onAttempt(0, index === 2); }}>
                <span className={styles.moveTag}>{["PAKAI GELAR", "MINTA KRITIK", "UJI KEPUTUSAN"][index]}</span>
                <span>{move.text}</span>
              </button>
            ))}
          </div>
          {promptMove !== null && (
            <div className={styles.reply} aria-live="polite">
              <span>AI MENJAWAB</span>
              <p>“{promptMoves[promptMove].response}”</p>
              <strong>{promptMove === 2 ? "Arah yang lebih berguna" : "Masih ada yang kurang"}</strong>
              <p>{promptMoves[promptMove].feedback}</p>
            </div>
          )}
          <aside className={styles.lessonNote}><strong>Yang membuatnya bekerja:</strong> tugas dan kriterianya jelas. Meminta AI “jadi ahli” atau “jangan mengiyakan” saja belum memberi bahan untuk menilai.</aside>
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            <button className={styles.primary} type="button" disabled={promptMove !== 2} onClick={() => setStep(2)}>Lanjut pilah informasi →</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>RONDE 2 · PILAH INFORMASI</p>
          <h2 id="pilot-title">Fakta, asumsi, atau langkah uji?</h2>
          <p className={styles.lead}>AI mencampur tiga jenis pernyataan. Pasangkan tiap kartu dengan jenis yang tepat.</p>
          <div className={styles.claims}>
            {claims.map((claim, claimIndex) => (
              <fieldset className={styles.claim} key={claim.text}>
                <legend>{claim.text}</legend>
                <div className={styles.pills}>
                  {claim.labels.map((label, index) => (
                    <button key={label} type="button" aria-pressed={classifications[claimIndex] === index} onClick={() => setClassification(claimIndex, index)}>{label}</button>
                  ))}
                </div>
                {claimsChecked && <p className={classifications[claimIndex] === claim.answer ? styles.correct : styles.incorrect}>{classifications[claimIndex] === claim.answer ? "Tepat. " : "Belum tepat. "}{claim.why}</p>}
              </fieldset>
            ))}
          </div>
          {claimsChecked && <p className={styles.lessonNote}>Catatan penting: “target 1.000 orang” memang ada di brief, tapi tetap bukan bukti bahwa 1.000 orang akan datang—apalagi membeli.</p>}
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            {claimsChecked && classifications.every((value, index) => value === claims[index].answer) ? (
              <button className={styles.primary} type="button" onClick={() => setStep(3)}>Rakit prompt →</button>
            ) : (
              <button className={styles.primary} type="button" disabled={classifications.some((value) => value === null)} onClick={checkClaims}>Periksa pasangan</button>
            )}
          </div>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>RONDE 3 · PROMPT WORKBENCH</p>
          <h2 id="pilot-title">Rakit prompt yang bisa dipakai tim</h2>
          <p className={styles.lead}>Pilih isi tiap bagian. Prompt yang kuat memberi AI pekerjaan, bahan, standar penilaian, dan bentuk jawaban yang kamu butuhkan.</p>
          {promptParts.map((part, partIndex) => (
            <fieldset className={styles.part} key={part.title}>
              <legend><span>{String(partIndex + 1).padStart(2, "0")}</span>{part.title}</legend>
              <div className={styles.options}>
                {part.choices.map((choice, choiceIndex) => (
                  <button key={choice} type="button" aria-pressed={parts[partIndex] === choiceIndex} onClick={() => setPart(partIndex, choiceIndex)}>{choice}</button>
                ))}
              </div>
              {partsChecked && <p className={parts[partIndex] === part.answer ? styles.correct : styles.incorrect}>{parts[partIndex] === part.answer ? "Bagian ini membantu. " : "Coba pertimbangkan lagi. "}{part.why}</p>}
            </fieldset>
          ))}
          <div className={styles.promptPreview} aria-live="polite">
            <span>PROMPT TIMMU</span>
            <p>{promptPreview}</p>
          </div>
          {partsChecked && <p className={styles.lessonNote}>Empat bagian ini bikin jawaban lebih terarah. Tetap minta AI menunjukkan batas pengetahuannya, dan cek klaim penting ke sumber lain.</p>}
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            {partsChecked && correctParts === promptParts.length ? (
              <button className={styles.primary} type="button" onClick={() => setStep(4)}>Uji jawaban AI →</button>
            ) : (
              <button className={styles.primary} type="button" disabled={parts.some((choice) => choice === null)} onClick={checkParts}>Cek prompt</button>
            )}
          </div>
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>RONDE 4 · AUDIT JAWABAN</p>
          <h2 id="pilot-title">AI sudah menjawab. Mana yang perlu bukti?</h2>
          <p className={styles.lead}>Tandai dua kalimat yang belum punya dasar cukup untuk dipakai mengambil keputusan.</p>
          <div className={styles.aiReport}>
            <span>RINGKASAN AI</span>
            {outputClaims.map((claim, index) => (
              <button key={claim} type="button" aria-pressed={flagged.includes(index)} onClick={() => toggleFlag(index)}>
                <i aria-hidden="true">{flagged.includes(index) ? "✓" : "＋"}</i>{claim}
                <small>{flagged.includes(index) ? "PERLU DICEK" : "TAP UNTUK MENANDAI"}</small>
              </button>
            ))}
          </div>
          {outputChecked && (
            <div className={styles.reply} role="status">
              <strong>{flagged.length === 2 && flagged.includes(1) && flagged.includes(2) ? "Tepat sasaran." : "Coba periksa lagi."}</strong>
              <p>“Pengunjung pasti tertarik” adalah asumsi. “50 porsi” adalah saran AI, bukan hasil riset. Angka target panitia memang ada di brief, tapi tetap target—bukan jumlah hadir atau pembeli.</p>
              <p>Prompt bisa memperbaiki bentuk jawaban. Prompt tidak mengubah tebakan menjadi data.</p>
            </div>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            {outputChecked && flagged.length === 2 && flagged.includes(1) && flagged.includes(2) ? (
              <button className={styles.primary} type="button" onClick={() => setStep(5)}>Tentukan tes kecil →</button>
            ) : (
              <button className={styles.primary} type="button" disabled={flagged.length !== 2} onClick={checkOutput}>Cek tandaku</button>
            )}
          </div>
        </section>
      )}

      {step === 5 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>RONDE 5 · TINDAK LANJUT</p>
          <h2 id="pilot-title">Apa yang kamu minta setelah AI memberi saran?</h2>
          <p className={styles.lead}>Tim perlu memutuskan apakah patungan modal. Pilih prompt lanjutan yang paling membantu keputusan itu.</p>
          <div className={styles.moves} role="group" aria-label="Pilihan prompt lanjutan">
            {followUps.map((item, index) => (
              <button key={item.text} type="button" aria-pressed={followUp === index} onClick={() => selectFollowUp(index)}>
                <span className={styles.moveTag}>{["CARI KONTEKS", "BUAT PERKIRAAN", "UJI DENGAN BATAS NYATA"][index]}</span>
                <span>{item.text}</span>
              </button>
            ))}
          </div>
          {followUp !== null && (
            <div className={styles.reply} aria-live="polite">
              <strong>{followUp === 2 ? "Percakapan diarahkan ke tindakan." : "Belum menjawab pertanyaan tim."}</strong>
              <p>{followUps[followUp].feedback}</p>
              {followUp === 2 && <p>Tentukan ambang keputusan sebelum tes dimulai. Dengan begitu hasilnya tidak gampang “dibaca” sesuai harapan kita.</p>}
            </div>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            <button className={styles.primary} type="button" disabled={followUp !== 2} onClick={() => setStep(6)}>Lihat rangkuman →</button>
          </div>
        </section>
      )}

      {step === 6 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>BEKAL YANG DIBAWA</p>
          <h2 id="pilot-title">Minta AI menguji pikiranmu, bukan menggantikannya</h2>
          <p className={styles.lead}>Prompt yang jelas membantu AI memberi bahan berpikir. Keputusan tetap perlu bertumpu pada bukti yang bisa kamu cek.</p>
          <div className={styles.recipe}>
            <span>RESEP PROMPT</span>
            <ol>
              <li><strong>Tugas</strong><span>Apa yang kamu butuhkan?</span></li>
              <li><strong>Konteks</strong><span>Info dan batas apa yang sudah diketahui?</span></li>
              <li><strong>Standar</strong><span>Alasan atau kriteria apa yang harus dibandingkan?</span></li>
              <li><strong>Bentuk</strong><span>Susun jawaban seperti apa agar mudah diperiksa?</span></li>
            </ol>
          </div>
          <details className={styles.more}>
            <summary>Kenapa AI kadang terlalu mengiyakan?</summary>
            <p>Dalam riset, kecenderungan jawaban AI untuk mengikuti pandangan pengguna disebut <em>sycophancy</em>. Meminta dua sisi dan asumsi membuat jawaban lebih mudah ditelaah, tetapi tidak menjamin AI akan selalu netral atau benar.</p>
            <a href="https://openai.com/index/sycophancy-in-gpt-4o/" target="_blank" rel="noreferrer">Baca penjelasan OpenAI ↗</a>
          </details>
          <label className={styles.reflection}>Kalau AI langsung memuji ide kamu, pertanyaan apa yang akan kamu ajukan? <span>Opsional · tidak dinilai</span>
            <textarea rows={3} value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Catatan untuk dirimu…" />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={back}>← Kembali</button>
            <button className={styles.primary} type="button" onClick={onComplete}>Selesai · lanjut pelajaran →</button>
          </div>
        </section>
      )}
    </div>
  );
}
