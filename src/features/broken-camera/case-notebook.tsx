import type { Catatan } from "./commitment";
import type { Candidate, Ranked } from "./game-logic";
import { NoteGuess } from "./note-guess";
import { TextBlock } from "./navigation";
import { RankingBars } from "./case-figures";
import { personById } from "./scenario";
import type { HistoryEntry, Tab } from "./state";
import styles from "./game.module.css";

const tabs: [Tab, string][] = [
  ["teori", "Rangkuman AI"],
  ["sumber", "Keterangan asli"],
  ["riwayat", "Riwayat perubahan"],
];

type Props = {
  tab: Tab;
  ranking: Ranked[];
  sebelumnya: Ranked[];
  synthesis: string;
  interviewed: string[];
  followedUp: string[];
  history: HistoryEntry[];
  catatan: Catatan[];
  aiTop: Candidate | null;
  onTab: (tab: Tab) => void;
  onCatat: (tebakan: Candidate | null) => void;
  onUbahCatatan: () => void;
};

export function CaseNotebook({ tab, ranking, sebelumnya, synthesis, interviewed, followedUp, history, catatan, aiTop, onTab, onCatat, onUbahCatatan }: Props) {
  return (
    /* Section bernama, bukan aside: complementary yang bersarang di dalam
       main adalah pelanggaran axe, sementara region bernama tidak. */
    <section className={styles.notebook} aria-labelledby="catatanKasus">
      <div className={styles.sectionHead}>
        <h2 id="catatanKasus">Catatan kasus</h2>
        <p>Rangkuman AI, keterangan asli, dan riwayat perubahannya.</p>
      </div>
      <div className={styles.tabs}>
        {tabs.map(([id, label]) => (
          <button key={id} className={tab === id ? styles.activeTab : ""} aria-pressed={tab === id} onClick={() => onTab(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className={styles.noteBody} tabIndex={0}>
        {tab === "teori" ? (
          <>
            <RankingBars ranking={ranking} sebelumnya={sebelumnya} judul="Peringkat dugaan AI saat ini" />
            <NoteGuess catatan={catatan} aiTop={aiTop} interviewed={interviewed.length} onCatat={onCatat} onUbah={onUbahCatatan} />
            <TextBlock text={synthesis} />
          </>
        ) : null}

        {tab === "sumber" ? (
          interviewed.length ? interviewed.map((id) => (
            <article key={id} className={styles.source}>
              <h3>{personById[id].nama} · {personById[id].peran}</h3>
              <p>{personById[id].awal}</p>
              {followedUp.includes(id) ? (
                <>
                  <b>Pertanyaan lanjutan: {personById[id].tanya}</b>
                  <p>{personById[id].lanjut}</p>
                </>
              ) : null}
            </article>
          )) : <p>Belum ada keterangan yang dibuka.</p>
        ) : null}

        {tab === "riwayat" ? (
          history.length ? [...history].reverse().slice(0, 6).map((item, index) => (
            <article key={`${item.trigger}-${index}`} className={styles.source}>
              <h3>{item.trigger}</h3>
              <TextBlock text={item.text} />
            </article>
          )) : <p>Riwayat perubahan akan muncul setelah keterangan atau pertanyaan lanjutan mengubah teori AI.</p>
        ) : null}
      </div>
    </section>
  );
}
