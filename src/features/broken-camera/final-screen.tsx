import type { Ranked } from "./game-logic";
import { GameNavigation } from "./navigation";
import { RankingBars } from "./case-figures";
import { scenario, type Keterbatasan } from "./scenario";
import { conclusionChoices, conclusionText, type ConclusionKind, type Summary } from "./summary";
import type { DecisionMode } from "./state";
import { batasKutipan, type Kutipan } from "./verdict";
import styles from "./game.module.css";

type Props = {
  summary: Summary;
  ranking: Ranked[];
  interviewed: string[];
  followedUp: string[];
  decision: DecisionMode | null;
  conclusion: ConclusionKind | null;
  /** Alasan penyelidikan berakhir, kalau bukan karena pemain menutupnya sendiri. */
  notice: string;
  citations: string[];
  keterbatasan: string;
  dasarPilihan: Kutipan[];
  keterbatasanPilihan: Keterbatasan[];
  onDecision: (mode: DecisionMode) => void;
  onConclusion: (value: ConclusionKind) => void;
  onCitation: (id: string) => void;
  onKeterbatasan: (id: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export function FinalScreen(props: Props) {
  const { summary, ranking, interviewed, followedUp, decision, conclusion, citations, keterbatasan } = props;
  const choices = conclusionChoices(summary);
  const chosenText = conclusion ? conclusionText(conclusion) : "";
  const penuh = citations.length >= batasKutipan;

  return (
    <main className={styles.final}>
      <GameNavigation />
      <button className={styles.backButton} onClick={props.onBack}>← Kembali ke penyelidikan</button>
      <header>
        <p className={styles.kicker}>Rekonstruksi akhir</p>
        <h1>Tinjau rangkuman AI</h1>
        <p>Rangkuman ini dibuat dari wawancara dan pertanyaan lanjutan yang kamu pilih. Keterangan yang belum kamu buka tidak ikut dipertimbangkan.</p>
        {/* Jatah waktu yang habis memindahkan pemain ke sini, jadi alasannya harus terbaca di sini juga. */}
        {props.notice ? <p className={styles.notice}>{props.notice}</p> : null}
      </header>

      <section className={styles.finalGrid}>
        <article className={styles.summary}>
          <h2>Rangkuman akhir AI</h2>
          <p><b>Wawancara:</b> {interviewed.length}/{scenario.tokoh.length} · <b>Pertanyaan lanjutan:</b> {followedUp.length}</p>
          <h3>Kesimpulan AI tentang kerusakan</h3>
          <p className={styles.conclusion}>{summary.conclusion}</p>
          <h3>Peringkat dugaan</h3>
          <RankingBars ranking={ranking} />
          <p className={styles.muted}>Persentase ini hanya simulasi peringkat dalam permainan. Angka tersebut bukan bukti atau peluang yang terukur di dunia nyata.</p>
        </article>

        <article className={styles.decision}>
          <h2>Apa keputusanmu setelah membaca kesimpulan AI?</h2>
          <p>Gunakan kesimpulan AI atau pilih kesimpulanmu sendiri. Pastikan pilihanmu sesuai dengan bukti yang sudah kamu kumpulkan.</p>
          {!decision ? (
            <div className={styles.choiceButtons}>
              <button onClick={() => props.onDecision("gunakan")}>Gunakan rangkuman AI</button>
              <button className={styles.secondary} onClick={() => props.onDecision("ubah")}>Ubah kesimpulan</button>
            </div>
          ) : (
            <>
              <p>{decision === "gunakan"
                ? "Kamu memilih memakai kesimpulan AI. Tetap perhatikan alasan dan keterbatasan buktinya."
                : "Kamu memilih mengubah kesimpulan AI. Pilih jawaban yang bisa kamu jelaskan berdasarkan bukti."}</p>

              {decision === "ubah" ? (
                <fieldset>
                  <legend>Pilih kesimpulanmu</legend>
                  {choices.map((item) => {
                    const text = conclusionText(item);
                    return (
                      <label key={text}>
                        <input type="radio" name="conclusion" checked={chosenText === text} onChange={() => props.onConclusion(item)} />
                        {text}
                      </label>
                    );
                  })}
                </fieldset>
              ) : null}

              {conclusion ? (
                <>
                  {/*
                    Menggantikan kuis dua pertanyaan. Yang dinilai bukan satu id
                    yang benar, melainkan apakah dasar yang ditunjuk memang
                    menopang kesimpulan yang dipilih.
                  */}
                  <fieldset className={styles.question}>
                    <legend>Tunjuk dasar kesimpulanmu</legend>
                    <p>
                      Pilih satu sampai {batasKutipan} hal yang menopang kesimpulan di atas.
                      Hanya bukti dan keterangan yang sudah kamu buka bisa dipilih.
                    </p>
                    {props.dasarPilihan.map((item) => {
                      const dipilih = citations.includes(item.id);
                      return (
                        <label key={item.id} className={dipilih ? styles.dasarDipilih : ""}>
                          <input
                            type="checkbox"
                            checked={dipilih}
                            disabled={!dipilih && penuh}
                            onChange={() => props.onCitation(item.id)}
                          />
                          {item.label}
                        </label>
                      );
                    })}
                    <p className={styles.muted}>{citations.length} dari {batasKutipan} dasar dipilih.</p>
                  </fieldset>

                  <fieldset className={styles.question}>
                    <legend>Keterbatasan yang kamu ingat</legend>
                    <p>Mana yang benar-benar berlaku pada penyelidikan yang barusan kamu jalankan?</p>
                    {props.keterbatasanPilihan.map((item) => (
                      <label key={item.id}>
                        <input
                          type="radio"
                          name="keterbatasan"
                          checked={keterbatasan === item.id}
                          onChange={() => props.onKeterbatasan(item.id)}
                        />
                        {item.teks}
                      </label>
                    ))}
                  </fieldset>

                  <button onClick={props.onSubmit} disabled={!citations.length || !keterbatasan}>Simpan keputusan</button>
                </>
              ) : null}
            </>
          )}
        </article>
      </section>
    </main>
  );
}
