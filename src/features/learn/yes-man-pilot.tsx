"use client";

import { useState } from "react";
import styles from "./yes-man-pilot.module.css";

const prompts = [
  {
    text: "Bandingkan ide ini dengan tren makanan sehat di Indonesia. Apa yang membuatnya menarik?",
    reply: "Minat pada makanan sehat bisa menjadi peluang. Menu praktis dekat kampus mungkin menarik bagi mahasiswa yang sibuk.",
    feedback: "Tren umum bisa memberi ide, tetapi belum menunjukkan apakah orang di dekat kampusmu mau membeli.",
  },
  {
    text: "Cari kelemahan terbesar ide ini dan alasan mengapa usaha seperti ini bisa gagal.",
    reply: "Harga bahan bisa tinggi dan ada banyak pilihan makanan lain. Usaha ini mungkin sulit bersaing.",
    feedback: "Mencari kelemahan itu berguna. Namun, daftar risiko saja juga belum menjawab apakah ada calon pembeli.",
  },
  {
    text: "Apa yang mendukung dan meragukan ide ini? Pisahkan asumsi dari yang sudah diketahui, lalu sarankan cara sederhana menguji minat pembeli.",
    reply: "Lokasinya dekat calon pembeli, tetapi saya belum tahu apakah mereka tertarik pada menu dan harganya. Itu masih asumsi. Coba tanyakan kebutuhan dan batas harga kepada beberapa calon pembeli.",
    feedback: "Pertanyaan ini membuka dua sisi dan meminta cara mengecek hal yang belum diketahui. Jawaban AI tetap perlu diuji langsung.",
  },
] as const;

const evidenceChoices = [
  {
    text: "Apakah orang di sekitar kampus mau membeli menu ini dengan harga yang direncanakan?",
    feedback: "Tepat. Minat dan harga di tempatmu perlu ditanyakan atau dicoba langsung pada calon pembeli.",
  },
  {
    text: "Apakah makanan sehat sedang banyak dibicarakan di Indonesia?",
    feedback: "Tren umum bisa memberi konteks, tetapi belum menjawab apakah orang di tempatmu akan membeli menu ini.",
  },
  {
    text: "Apakah chatbot lain juga akan menyebut ide ini menjanjikan?",
    feedback: "Dua chatbot bisa membuat tebakan serupa. Kesamaan jawaban mereka belum menjadi bukti minat pembeli.",
  },
] as const;

const parts = [
  {
    title: "Apa tugas AI?",
    choices: [
      "Bantu saya menguji ide ini sebelum menyimpulkan apakah layak dijalankan.",
      "Beri nilai peluang sukses ide ini dari 1 sampai 10.",
      "Jelaskan mengapa ide ini bisa menarik banyak pembeli.",
    ],
    correct: 0,
    why: "Menguji ide memberi ruang untuk lebih dari satu kemungkinan. Nilai atau pujian saja belum menunjukkan dasarnya.",
  },
  {
    title: "Apa yang perlu diperiksa?",
    choices: [
      "Daftarkan semua risiko agar saya siap menghadapi kegagalan.",
      "Bandingkan alasan yang mendukung dan meragukan; tandai asumsi yang belum diuji.",
      "Cari contoh usaha lain yang berhasil dengan menu serupa.",
    ],
    correct: 1,
    why: "Kita butuh sisi kuat, sisi lemah, dan asumsi yang masih berupa tebakan. Contoh usaha lain belum tentu cocok dengan tempatmu.",
  },
  {
    title: "Apa langkah setelah itu?",
    choices: [
      "Perkirakan penjualan bulan pertama dari tren makanan sehat.",
      "Buat target penjualan yang masuk akal menurutmu.",
      "Sarankan cara sederhana mengecek minat dan harga kepada calon pembeli.",
    ],
    correct: 2,
    why: "Jawaban AI membantu menyusun pertanyaan; calon pembeli memberi bukti awal tentang kebutuhan dan harga.",
  },
] as const;

type Props = {
  onAttempt: (step: number, correct: boolean) => void;
  onComplete: () => void;
};

export function YesManPilot({ onAttempt, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState<number | null>(null);
  const [evidence, setEvidence] = useState<number | null>(null);
  const [selectedParts, setSelectedParts] = useState<(number | null)[]>([null, null, null]);
  const [partsChecked, setPartsChecked] = useState(false);
  const [reflection, setReflection] = useState("");
  const correctParts = parts.filter((part, index) => selectedParts[index] === part.correct).length;

  function choosePrompt(index: number) {
    setPrompt(index);
    onAttempt(0, index === 2);
  }

  function chooseEvidence(index: number) {
    setEvidence(index);
    onAttempt(1, index === 0);
  }

  function choosePart(partIndex: number, choiceIndex: number) {
    setSelectedParts((previous) => previous.map((value, index) => index === partIndex ? choiceIndex : value));
    setPartsChecked(false);
  }

  function checkParts() {
    setPartsChecked(true);
    onAttempt(2, correctParts === parts.length);
  }

  return (
    <div className={styles.pilot}>
      <div className={styles.topline}>
        <span>PELAJARAN INTERAKTIF · ±8 MENIT</span>
        <span>LANGKAH {step + 1} / 5</span>
      </div>
      <div className={styles.track} role="progressbar" aria-label="Progres permainan" aria-valuemin={0} aria-valuemax={5} aria-valuenow={step + 1}>
        <span style={{ width: `${(step + 1) * 20}%` }} />
      </div>

      {step === 0 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>SATU IDE, SATU JAWABAN YANG TERLALU YAKIN</p>
          <h2 id="pilot-title">AI bilang idemu brilian. Apa itu cukup?</h2>
          <p className={styles.lead}>Kamu ingin menjual camilan sehat dekat kampus. Belum ada yang ditanya soal menu atau harga. Kamu bertanya kepada AI, “Ide ini bakal laku, kan?”</p>
          <div className={styles.chat}>
            <span>JAWABAN AI</span>
            <p>“Wah, ini ide brilian! Mahasiswa makin peduli kesehatan, jadi pasti banyak yang mau membeli.”</p>
          </div>
          <p className={styles.note}>Pujian bisa terasa meyakinkan, tetapi AI belum tahu minat pembeli di tempatmu. Sekarang coba ubah arah percakapannya.</p>
          <button className={styles.primary} type="button" onClick={() => setStep(1)}>Coba tanya lagi →</button>
        </section>
      )}

      {step === 1 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>PILIH PERTANYAAN</p>
          <h2 id="pilot-title">Apa yang akan kamu tanyakan?</h2>
          <p className={styles.lead}>Kamu ingin tahu apakah ide ini layak dicoba. Pilih satu prompt, lalu lihat arah jawaban AI.</p>
          <div className={styles.choices} role="group" aria-label="Pilihan prompt">
            {prompts.map((item, index) => (
              <button key={item.text} type="button" aria-pressed={prompt === index} onClick={() => choosePrompt(index)}>{item.text}</button>
            ))}
          </div>
          {prompt !== null && (
            <div className={styles.feedback} aria-live="polite">
              <span>AI MENJAWAB</span>
              <p>“{prompts[prompt].reply}”</p>
              <strong>{prompt === 2 ? "Paling membantu untuk tujuanmu." : "Ada gunanya, tapi belum cukup."}</strong>
              <p>{prompts[prompt].feedback}</p>
            </div>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(0)}>← Kembali</button>
            <button className={styles.primary} type="button" disabled={prompt !== 2} onClick={() => setStep(2)}>Periksa jawabannya →</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>BUKTI ATAU TEBAKAN?</p>
          <h2 id="pilot-title">Bagian mana yang masih perlu dicek?</h2>
          <div className={styles.chat}>
            <span>AI SEBELUMNYA BILANG</span>
            <p>“Mahasiswa makin peduli kesehatan, jadi pasti banyak yang mau membeli.”</p>
          </div>
          <p className={styles.lead}>Apa yang paling perlu kamu cari tahu sebelum mengeluarkan uang untuk memulai usaha?</p>
          <div className={styles.choices} role="group" aria-label="Informasi yang perlu dicek">
            {evidenceChoices.map((item, index) => (
              <button key={item.text} type="button" aria-pressed={evidence === index} onClick={() => chooseEvidence(index)}>{item.text}</button>
            ))}
          </div>
          {evidence !== null && (
            <p className={styles.feedback} aria-live="polite"><strong>{evidence === 0 ? "Tepat." : "Coba bedakan tren umum dan minat di tempatmu."}</strong> {evidenceChoices[evidence].feedback}</p>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(1)}>← Kembali</button>
            <button className={styles.primary} type="button" disabled={evidence !== 0} onClick={() => setStep(3)}>Susun pertanyaan lanjut →</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>SUSUN PERTANYAAN LANJUT</p>
          <h2 id="pilot-title">Minta AI membantu menguji ide</h2>
          <p className={styles.lead}>Pilih satu kartu di tiap bagian. Pertanyaanmu akan tersusun di bawahnya.</p>
          {parts.map((part, partIndex) => (
            <fieldset className={styles.part} key={part.title}>
              <legend>{partIndex + 1}. {part.title}</legend>
              <div className={styles.choices}>
                {part.choices.map((choice, choiceIndex) => (
                  <button key={choice} type="button" aria-pressed={selectedParts[partIndex] === choiceIndex} onClick={() => choosePart(partIndex, choiceIndex)}>{choice}</button>
                ))}
              </div>
              {partsChecked && <p className={selectedParts[partIndex] === part.correct ? styles.right : styles.wrong}>{selectedParts[partIndex] === part.correct ? "Pilihan ini membantu." : part.why}</p>}
            </fieldset>
          ))}
          <div className={styles.preview} aria-live="polite">
            <span>PROMPT YANG KAMU SUSUN</span>
            <p>{selectedParts.map((choice, index) => choice === null ? "…" : parts[index].choices[choice]).join(" ")}</p>
          </div>
          {partsChecked && (
            <p className={styles.feedback} role="status"><strong>{correctParts} dari 3 bagian sudah membantu.</strong> Pertanyaan yang kuat meminta AI menguji dua sisi, menunjukkan asumsi, lalu menyarankan cara mencari bukti. Jawabannya tetap perlu kamu periksa.</p>
          )}
          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(2)}>← Kembali</button>
            {partsChecked && correctParts === parts.length ? (
              <button className={styles.primary} type="button" onClick={() => setStep(4)}>Lihat inti pelajaran →</button>
            ) : (
              <button className={styles.primary} type="button" disabled={selectedParts.some((choice) => choice === null)} onClick={checkParts}>Periksa pertanyaanku</button>
            )}
          </div>
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="pilot-title">
          <p className={styles.kicker}>INTI PELAJARAN</p>
          <h2 id="pilot-title">Pujian AI belum membuktikan idemu bagus</h2>
          <p className={styles.lead}>Minta AI mencari alasan yang mendukung dan meragukan idemu. Perhatikan asumsi yang dibuatnya. Untuk tahu apakah orang benar-benar membutuhkan idemu, cari bukti dari orang dan keadaan yang sebenarnya.</p>
          <details className={styles.more}>
            <summary>Kenapa AI bisa terlalu mengiyakan?</summary>
            <p>AI bisa mengikuti nada pertanyaanmu. Jika kamu meminta persetujuan, jawabannya bisa condong ke pujian. Kecenderungan terlalu menyetujui pengguna ini juga disebut <em>sycophancy</em>.</p>
            <a href="https://openai.com/index/sycophancy-in-gpt-4o/" target="_blank" rel="noreferrer">Baca penjelasan OpenAI ↗</a>
          </details>
          <details className={styles.more}>
            <summary>Apakah prompt boleh dipakai untuk melewati aturan AI?</summary>
            <p>Tidak. Prompt bisa memengaruhi jawaban, tetapi tidak membuat aturan penggunaan jadi bebas diabaikan.</p>
          </details>
          <label className={styles.reflection}>Kalau AI langsung memuji idemu, apa yang ingin kamu tanyakan setelahnya? <span>Opsional · tidak dinilai</span>
            <textarea rows={3} value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Tulis untuk dirimu sendiri…" />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(3)}>← Kembali</button>
            <button className={styles.primary} type="button" onClick={onComplete}>Selesai, lanjut pelajaran →</button>
          </div>
        </section>
      )}
    </div>
  );
}
