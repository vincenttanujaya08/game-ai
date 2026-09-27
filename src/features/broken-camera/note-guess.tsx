import { catatanTerakhir, perluMencatat, type Catatan } from "./commitment";
import type { Candidate } from "./game-logic";
import { candidateIds } from "./summary";
import { scenario } from "./scenario";
import styles from "./game.module.css";

type Props = {
  catatan: Catatan[];
  aiTop: Candidate | null;
  interviewed: number;
  onCatat: (tebakan: Candidate | null) => void;
  onUbah: () => void;
};

/**
 * Sebaris di tab rangkuman AI, tepat di bawah teori AI saat ini. Tanpa modal
 * dan tanpa hamparan, karena ini ajakan berpikir, bukan gerbang. Setelah
 * ditekan ia menciut, lalu muncul lagi saat urutan teratas AI berpindah orang,
 * yaitu momen ketika pertanyaannya justru menarik.
 */
export function NoteGuess({ catatan, aiTop, interviewed, onCatat, onUbah }: Props) {
  if (interviewed < 1 || !aiTop) return null;
  const naskah = scenario.catatan;

  if (!perluMencatat(catatan, aiTop, interviewed)) {
    const terakhir = catatanTerakhir(catatan);
    const label = terakhir?.tebakan
      ? naskah.tersimpan.replace("{tebakan}", terakhir.tebakan)
      : naskah.lewatiTersimpan;
    return (
      <div className={styles.catatan}>
        <p>
          {label}{" "}
          <button className={styles.catatanUbah} onClick={onUbah}>{naskah.ubah}</button>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.catatan}>
      <p>{naskah.ajakan}</p>
      <div className={styles.catatanPilihan}>
        {candidateIds.map((nama) => (
          <button key={nama} onClick={() => onCatat(nama)}>{nama}</button>
        ))}
        <button className={styles.secondary} onClick={() => onCatat(null)}>{naskah.lewati}</button>
      </div>
      <p className={styles.muted}>{naskah.bantuan}</p>
    </div>
  );
}
