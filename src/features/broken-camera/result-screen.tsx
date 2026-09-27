import Link from "next/link";
import { GameNavigation } from "./navigation";
import { CameraTimeline } from "./case-figures";
import { kamuDanAi, type Catatan } from "./commitment";
import { jalurLain } from "./counterfactual";
import type { Candidate } from "./game-logic";
import { scenario } from "./scenario";
import { conclusionText, type ConclusionKind } from "./summary";
import type { DecisionMode } from "./state";
import type { FinalVerdict } from "./verdict";
import styles from "./game.module.css";

type Props = {
  conclusion: ConclusionKind;
  decision: DecisionMode;
  verdict: FinalVerdict;
  interviewed: string[];
  followedUp: string[];
  terpakai: number;
  catatan: Catatan[];
  aiTrail: Candidate[];
  onReview: () => void;
  onRestart: () => void;
};

export function ResultScreen({ conclusion, decision, verdict, interviewed, followedUp, terpakai, catatan, aiTrail, onReview, onRestart }: Props) {
  const perbandingan = kamuDanAi(catatan, aiTrail);
  const andai = jalurLain(interviewed, followedUp, terpakai);

  return (
    <main className={styles.result}>
      <GameNavigation />
      <header>
        <p className={styles.kicker}>Hasil rekonstruksi</p>
        <h1>Perjalanan kamera bisa disusun, tetapi kapan lensanya retak masih belum pasti.</h1>
        <p>Di kasus ini tidak ada pengungkapan pelaku rahasia. Hasilmu menunjukkan seberapa jauh kesimpulanmu mengikuti bukti yang kamu kumpulkan sendiri.</p>
      </header>

      <section className={styles.resultGrid}>
        <article>
          <h2>Kronologi berdasarkan bukti</h2>
          <p>Perpindahan kamera lebih mudah disusun daripada waktu kerusakannya. Bagian yang saksinya tidak pernah kamu dengar tetap tertutup di bawah ini, karena penyelidikanmu memang belum membukanya.</p>
          <CameraTimeline interviewed={interviewed} />
        </article>

        <article>
          <h2>Keputusan akhirmu</h2>
          <p><b>{decision === "gunakan" ? "Menggunakan" : "Mengubah"}</b> rangkuman AI</p>
          <p className={styles.conclusion}>{conclusionText(conclusion)}</p>

          <h3 className={styles.verdict}>{verdict.judul}</h3>
          <p>{verdict.isi}</p>
          <p><b>Langkah berikutnya:</b> {verdict.langkah}</p>

          <h3>Keputusan yang dinilai</h3>
          <p className={styles.muted}>{verdict.ringkas}</p>
          <ul className={styles.keputusan}>
            {verdict.keputusan.map((item) => (
              <li key={item.id} data-ok={item.ok}>
                <b>{item.label}</b>
                <span>{item.alasan}</span>
              </li>
            ))}
          </ul>

          <h3>Yang bisa dipastikan</h3>
          <p>{verdict.sumberTeks}</p>
          <p>{scenario.pesanInti}</p>
          <p className={styles.pelajaran}>
            {scenario.pelajaran.teks} <Link href={scenario.pelajaran.tautan}>{scenario.pelajaran.label}</Link>
          </p>
        </article>
      </section>

      <section className={[styles.resultGrid, styles.resultGridAkhir].join(" ")}>
        <article>
          <h2>{scenario.kamuDanAi.judul}</h2>
          {perbandingan.baris.map((baris) => <p key={baris}>{baris}</p>)}
        </article>

        <article>
          {/* Bukan "jawaban sebenarnya": tiap baris memasangkan fakta dengan
              tafsir yang benar dalam satu tarikan, supaya perpindahan peringkat
              tidak terbaca sebagai pengungkapan pelaku. */}
          <h2>{scenario.andaiKata.judul}</h2>
          <ul className={styles.andai}>
            {andai.map((item) => (
              <li key={item.id}>
                <b>{item.teks}</b>
                <span>{item.tafsir}</span>
              </li>
            ))}
          </ul>
          <p className={styles.andaiPenutup}>{scenario.andaiKata.penutup}</p>
        </article>
      </section>

      <footer>
        <button className={styles.secondary} onClick={onReview}>Tinjau kembali kasus</button>
        <button onClick={onRestart}>{scenario.andaiKata.mainLagi}</button>
      </footer>
    </main>
  );
}
