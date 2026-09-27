import { adaAksiTerjangkau, harga, mampu, nudge, sisa } from "./budget";
import type { Catatan } from "./commitment";
import { rankCandidates, type Candidate, type Ranked } from "./game-logic";
import { isUnlocked, personById, scenario } from "./scenario";
import { makeSynthesis, type ConclusionKind } from "./summary";
import { batasKutipan } from "./verdict";

/**
 * Seluruh alur permainan sebagai reducer murni. Komponen hanya merender dan
 * mengirim action; tidak ada satu pun keputusan tentang kasus ini yang
 * diambil di dalam JSX. Ini juga satu-satunya cara alurnya bisa diuji, karena
 * vitest di repo ini berjalan di lingkungan node tanpa DOM.
 */

export type Stage = "mulai" | "selidik" | "akhir" | "hasil";
export type Tab = "teori" | "sumber" | "riwayat";
export type DecisionMode = "gunakan" | "ubah";

export type HistoryEntry = { trigger: string; text: string };

export type GameState = {
  stage: Stage;
  selected: string;
  interviewed: string[];
  followedUp: string[];
  /** Jatah waktu yang sudah dibelanjakan, dalam detik. */
  terpakai: number;
  /** Penyelidikan yang sudah ditutup tidak bisa menerima tindakan baru. */
  closed: boolean;
  tab: Tab;
  notice: string;
  history: HistoryEntry[];
  openedEvidence: string[];
  showEvidence: string | null;
  /** Panel konfirmasi penutupan sedang terbuka. */
  konfirmasi: boolean;
  /** Pernah membuka tab keterangan asli, bukan hanya membaca rangkuman AI. */
  sumberDibaca: boolean;
  /** Dugaan yang dicatat pemain sendiri, opsional sepanjang permainan. */
  catatan: Catatan[];
  /** Urutan teratas AI sesudah tiap tindakan, untuk log perbedaan di akhir. */
  aiTrail: Candidate[];
  /** Peringkat sebelum tindakan terakhir, dipakai menandai arah pergeseran. */
  peringkatSebelumnya: Ranked[];
  decision: DecisionMode | null;
  conclusion: ConclusionKind | null;
  /** Dasar yang ditunjuk pemain, sebagai id kutipan. */
  citations: string[];
  keterbatasan: string;
};

export type GameAction =
  | { type: "mulai" }
  | { type: "pilihOrang"; id: string }
  | { type: "dengarkan" }
  | { type: "tanyaLanjut" }
  | { type: "gantiTab"; tab: Tab }
  | { type: "bukaBukti"; id: string }
  | { type: "tutupBukti" }
  | { type: "akhiriPenyelidikan" }
  | { type: "konfirmasiAkhiri"; buka: boolean }
  | { type: "kembaliKePenyelidikan" }
  | { type: "pilihMode"; mode: DecisionMode; topCandidate: ConclusionKind }
  | { type: "pilihKesimpulan"; conclusion: ConclusionKind }
  | { type: "catatDugaan"; tebakan: Candidate | null }
  | { type: "ubahCatatan" }
  | { type: "pulihkan"; state: GameState }
  | { type: "tunjukDasar"; id: string }
  | { type: "pilihKeterbatasan"; id: string }
  | { type: "simpanKeputusan" }
  | { type: "ulangi" };

export const initialState: GameState = {
  stage: "mulai",
  selected: "Arya",
  interviewed: [],
  followedUp: [],
  terpakai: 0,
  closed: false,
  tab: "teori",
  notice: "",
  history: [],
  openedEvidence: [],
  showEvidence: null,
  konfirmasi: false,
  sumberDibaca: false,
  catatan: [],
  aiTrail: [],
  peringkatSebelumnya: [],
  decision: null,
  conclusion: null,
  citations: [],
  keterbatasan: "",
};

function unique(list: string[], item: string): string[] {
  return list.includes(item) ? list : [...list, item];
}

/** Riwayat dan jejak urutan teratas AI tumbuh bersama, dari peringkat yang sama. */
function setelahKeterangan(state: GameState, trigger: string, interviewed: string[], followedUp: string[]) {
  const ranking = rankCandidates(interviewed, followedUp);
  return {
    history: [...state.history, { trigger, text: makeSynthesis(interviewed, followedUp, ranking) }],
    aiTrail: [...state.aiTrail, ranking[0].name],
    peringkatSebelumnya: rankCandidates(state.interviewed, state.followedUp),
  };
}

/** Satu jalur penutupan untuk waktu habis maupun penutupan sukarela. */
function closeInvestigation(state: GameState, notice: string): GameState {
  return { ...state, stage: "akhir", closed: true, konfirmasi: false, notice, decision: null, conclusion: null, citations: [], keterbatasan: "" };
}

/** Masih ada orang yang bisa diwawancarai atau didalami dengan jatah tersisa. */
function adaYangBisaDilakukan(state: GameState): boolean {
  const calonWawancara = scenario.tokoh.some(
    (person) => !state.interviewed.includes(person.id) && isUnlocked(person, state.interviewed),
  );
  const calonDalami = state.interviewed.some((id) => !state.followedUp.includes(id));
  return adaAksiTerjangkau(state.terpakai, state.interviewed.length, calonWawancara, calonDalami);
}

/**
 * Penyelidikan bisa berhenti karena dua sebab yang berbeda, dan pemain berhak
 * tahu yang mana. Jalur luas berakhir dengan jatah tersisa yang tidak cukup
 * untuk satu pertanyaan lanjutan, bukan dengan jatah nol.
 */
function alasanPenutupan(state: GameState): string {
  if (sisa(state.terpakai) < harga.wawancara) {
    return "Jatah waktu kasus sudah habis. Rangkuman akhir disusun dari keterangan yang sudah kamu kumpulkan.";
  }
  return "Semua orang sudah kamu dengarkan, dan sisa jatah waktu tidak cukup untuk satu pertanyaan lanjutan lagi. Rangkuman akhir disusun dari keterangan yang sudah kamu kumpulkan.";
}

/** Sesudah membelanjakan jatah, tutup penyelidikan kalau tidak ada lagi yang bisa dibeli. */
function setelahBelanja(state: GameState, sebelum: number): GameState {
  const peringatan = nudge(sebelum, state.terpakai);
  const withNudge = peringatan ? { ...state, notice: peringatan } : state;
  if (adaYangBisaDilakukan(withNudge)) return withNudge;
  return closeInvestigation(withNudge, alasanPenutupan(withNudge));
}

export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "mulai":
      return { ...state, stage: "selidik" };

    case "pilihOrang":
      return { ...state, selected: action.id, notice: "" };

    case "dengarkan": {
      if (state.closed || state.interviewed.includes(state.selected)) return state;
      if (!mampu("wawancara", state.terpakai, state.interviewed.length)) return state;
      const person = personById[state.selected];
      if (!person) return state;
      const interviewed = unique(state.interviewed, state.selected);
      const sebelum = state.terpakai;
      return setelahBelanja({
        ...state,
        interviewed,
        terpakai: state.terpakai + harga.wawancara,
        ...setelahKeterangan(state, `Wawancara: ${person.nama}`, interviewed, state.followedUp),
        notice: "Teori sementara AI diperbarui. Periksa apakah ada keterangan atau bukti baru yang terbuka.",
      }, sebelum);
    }

    case "tanyaLanjut": {
      const known = state.interviewed.includes(state.selected);
      const already = state.followedUp.includes(state.selected);
      if (state.closed || !known || already) return state;
      // Tidak ada kuota terpisah: jatah waktu yang membatasi berapa kali ini
      // bisa dipakai, dikurangi cadangan menuju batas wawancara minimum.
      if (!mampu("dalami", state.terpakai, state.interviewed.length)) return state;
      const person = personById[state.selected];
      if (!person) return state;
      const followedUp = unique(state.followedUp, state.selected);
      const sebelum = state.terpakai;
      return setelahBelanja({
        ...state,
        followedUp,
        terpakai: state.terpakai + harga.dalami,
        ...setelahKeterangan(state, `Gali lebih dalam: ${person.nama}`, state.interviewed, followedUp),
        notice: "Keterangan tambahan sudah masuk ke teori sementara AI.",
      }, sebelum);
    }

    case "gantiTab":
      // Membuka keterangan asli dicatat sekali dan tidak pernah dicabut, karena
      // yang dinilai adalah apakah pemain pernah membaca kalimat saksinya sendiri.
      return { ...state, tab: action.tab, sumberDibaca: state.sumberDibaca || action.tab === "sumber" };

    case "bukaBukti":
      return { ...state, showEvidence: action.id, openedEvidence: unique(state.openedEvidence, action.id) };

    case "tutupBukti":
      return { ...state, showEvidence: null };

    case "konfirmasiAkhiri": {
      const kurang = scenario.meta.batasWawancaraAkhir - state.interviewed.length;
      if (action.buka && kurang > 0) {
        return { ...state, notice: `Wawancarai ${kurang} orang lagi sebelum mengakhiri penyelidikan lebih awal.` };
      }
      return { ...state, konfirmasi: action.buka, notice: "" };
    }

    case "akhiriPenyelidikan": {
      const kurang = scenario.meta.batasWawancaraAkhir - state.interviewed.length;
      if (kurang > 0) {
        return { ...state, notice: `Wawancarai ${kurang} orang lagi sebelum mengakhiri penyelidikan lebih awal.` };
      }
      return closeInvestigation(state, "");
    }

    case "kembaliKePenyelidikan":
      return { ...state, stage: "selidik" };

    case "pilihMode":
      return {
        ...state,
        decision: action.mode,
        // Memakai rangkuman AI berarti mengambil dugaan teratasnya sebagai kesimpulan sendiri.
        conclusion: action.mode === "gunakan" ? action.topCandidate : null,
        citations: [],
        keterbatasan: "",
      };

    case "pilihKesimpulan":
      // Mengganti kesimpulan membatalkan dasarnya: dasar lama belum tentu
      // menopang kesimpulan baru, dan membiarkannya akan menilai yang keliru.
      return { ...state, conclusion: action.conclusion, citations: [], keterbatasan: "" };

    case "tunjukDasar": {
      if (state.citations.includes(action.id)) {
        return { ...state, citations: state.citations.filter((id) => id !== action.id), notice: "" };
      }
      if (state.citations.length >= batasKutipan) {
        return { ...state, notice: `Pilih paling banyak ${batasKutipan} dasar. Lepaskan salah satu dulu kalau mau menggantinya.` };
      }
      return { ...state, citations: [...state.citations, action.id], notice: "" };
    }

    case "catatDugaan": {
      // Mencatat dugaan tidak memakai jatah waktu: mengumpulkan itu mahal,
      // berpikir tidak. Yang disimpan bersamanya adalah urutan teratas AI saat
      // ini, supaya log perbedaan bisa dihitung tanpa memutar ulang permainan.
      const aiTop = state.aiTrail[state.aiTrail.length - 1];
      if (state.closed || !aiTop) return state;
      return { ...state, catatan: [...state.catatan, { tebakan: action.tebakan, aiTop }] };
    }

    case "ubahCatatan":
      // Membuka lagi pilihannya untuk keadaan AI yang sama, jadi satu keadaan
      // hanya pernah menghasilkan satu catatan.
      return { ...state, catatan: state.catatan.slice(0, -1) };

    case "pulihkan":
      return action.state;

    case "pilihKeterbatasan":
      return { ...state, keterbatasan: action.id };

    case "simpanKeputusan":
      if (!state.citations.length || !state.keterbatasan || !state.conclusion) return state;
      return { ...state, stage: "hasil" };

    case "ulangi":
      return initialState;
  }
}
