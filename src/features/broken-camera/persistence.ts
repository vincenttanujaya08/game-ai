import { anggaran } from "./budget";
import type { Candidate } from "./game-logic";
import { isUnlocked, personById, scenario } from "./scenario";
import { initialState, type GameState, type Stage, type Tab } from "./state";

/**
 * Penyimpanan satu penyelidikan, di sessionStorage dan bukan localStorage.
 *
 * Nilai game ini adalah satu rantai keputusan dalam satu duduk: catatan dugaan,
 * pertukaran anggaran, dan jalur andai kata semuanya pernyataan tentang satu
 * run. Melanjutkan kasus setengah jadi setelah berhari-hari lebih buruk
 * daripada mulai bersih. Sisi belajar memakai localStorage karena progres
 * kursus memang jangka panjang; ini kebalikannya.
 *
 * Store disuntikkan supaya bisa diuji: vitest di repo ini berjalan di node
 * tanpa DOM, jadi sessionStorage tidak ada saat test.
 */

export const kunciSimpanan = "nusa-kamera-rusak-v1";

export type Penyimpanan = {
  getItem(kunci: string): string | null;
  setItem(kunci: string, nilai: string): void;
  removeItem(kunci: string): void;
};

const stages: Stage[] = ["mulai", "selidik", "akhir", "hasil"];
const tabs: Tab[] = ["teori", "sumber", "riwayat"];

function daftarId(nilai: unknown, dikenal: (id: string) => boolean): string[] | null {
  if (!Array.isArray(nilai)) return null;
  const bersih: string[] = [];
  for (const item of nilai) {
    if (typeof item !== "string" || !dikenal(item) || bersih.includes(item)) return null;
    bersih.push(item);
  }
  return bersih;
}

/**
 * Id tak dikenal membuang seluruh simpanan, bukan menambal sebagian. Perbaikan
 * separuh bisa menghasilkan keadaan yang tidak mungkin dicapai dengan bermain,
 * dan keadaan seperti itu lebih membingungkan daripada mulai bersih.
 */
export function bacaRun(store: Penyimpanan): GameState | null {
  try {
    const mentah = store.getItem(kunciSimpanan);
    if (!mentah) return null;
    const data = JSON.parse(mentah) as Record<string, unknown>;

    const interviewed = daftarId(data.interviewed, (id) => Boolean(personById[id]));
    if (!interviewed) return null;
    // Urutan wawancara harus mungkin menurut graf saksi.
    for (let index = 0; index < interviewed.length; index += 1) {
      const orang = personById[interviewed[index]];
      if (!isUnlocked(orang, interviewed.slice(0, index))) return null;
    }

    const followedUp = daftarId(data.followedUp, (id) => interviewed.includes(id));
    if (!followedUp) return null;
    const openedEvidence = daftarId(data.openedEvidence, (id) => scenario.bukti.some((item) => item.id === id));
    if (!openedEvidence) return null;

    const terpakai = data.terpakai;
    if (typeof terpakai !== "number" || !Number.isInteger(terpakai) || terpakai < 0 || terpakai > anggaran) return null;

    const stage = data.stage;
    if (typeof stage !== "string" || !stages.includes(stage as Stage)) return null;
    const tab = data.tab;
    if (typeof tab !== "string" || !tabs.includes(tab as Tab)) return null;
    const selected = data.selected;
    if (typeof selected !== "string" || !personById[selected]) return null;

    const catatan = Array.isArray(data.catatan) ? data.catatan : null;
    if (!catatan) return null;
    for (const item of catatan) {
      const isi = item as { tebakan?: unknown; aiTop?: unknown };
      const tebakanOk = isi.tebakan === null || scenario.jalur.some((jalur) => jalur.id === isi.tebakan);
      const topOk = scenario.jalur.some((jalur) => jalur.id === isi.aiTop);
      if (!tebakanOk || !topOk) return null;
    }
    const aiTrail = daftarId(
      Array.isArray(data.aiTrail) ? [...new Set(data.aiTrail)] : data.aiTrail,
      (id) => scenario.jalur.some((jalur) => jalur.id === id),
    );
    if (!Array.isArray(data.aiTrail) || aiTrail === null) return null;

    // Tahap akhir dan hasil dipulihkan sebagai penyelidikan yang sudah ditutup,
    // karena keputusan setengah terisi tidak layak dilanjutkan secara diam-diam.
    const lanjut = stage === "mulai" ? "mulai" : "selidik";
    return {
      ...initialState,
      stage: lanjut,
      selected,
      interviewed,
      followedUp,
      terpakai,
      closed: Boolean(data.closed),
      tab: tab as Tab,
      openedEvidence,
      sumberDibaca: Boolean(data.sumberDibaca),
      catatan: data.catatan as GameState["catatan"],
      aiTrail: data.aiTrail as Candidate[],
      history: Array.isArray(data.history) ? (data.history as GameState["history"]) : [],
    };
  } catch {
    return null;
  }
}

export function simpanRun(store: Penyimpanan, state: GameState): void {
  try {
    // Belum ada satu pun keterangan berarti belum ada yang layak dilanjutkan.
    if (state.stage === "mulai" || state.interviewed.length === 0) return;
    const { stage, selected, interviewed, followedUp, terpakai, closed, tab, openedEvidence, sumberDibaca, catatan, aiTrail, history } = state;
    store.setItem(kunciSimpanan, JSON.stringify({
      stage, selected, interviewed, followedUp, terpakai, closed, tab, openedEvidence, sumberDibaca, catatan, aiTrail, history,
    }));
  } catch {
    // Kuota penuh atau penyimpanan ditolak tidak boleh menghentikan permainan.
  }
}

export function hapusRun(store: Penyimpanan): void {
  try {
    store.removeItem(kunciSimpanan);
  } catch {
    // Sama seperti di atas.
  }
}

const pendengar = new Set<() => void>();
let simpanan: GameState | null | undefined;

/** Langganan untuk useSyncExternalStore. Isinya hanya berubah saat run dihapus. */
export function langgananRun(dengar: () => void): () => void {
  pendengar.add(dengar);
  return () => {
    pendengar.delete(dengar);
  };
}

/** Snapshot yang referensinya stabil, jadi React tidak merender berulang. */
export function runTersimpan(store: Penyimpanan): GameState | null {
  if (simpanan === undefined) simpanan = bacaRun(store);
  return simpanan;
}

export function lupakanRun(): void {
  simpanan = undefined;
  for (const dengar of pendengar) dengar();
}
