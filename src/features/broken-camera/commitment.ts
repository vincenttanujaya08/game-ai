import type { Candidate } from "./game-logic";
import { scenario } from "./scenario";

/**
 * Catatan dugaan pemain, opsional sejak awal.
 *
 * Yang membuat perbandingannya bisa dihitung di akhir tanpa memutar ulang
 * seluruh permainan adalah `aiTop`: urutan teratas AI pada saat catatan itu
 * ditekan disimpan bersama tebakannya.
 */

export type Catatan = {
  /** null berarti pemain memilih belum mau menebak untuk keadaan AI ini. */
  tebakan: Candidate | null;
  aiTop: Candidate;
};

/** Ajakan mencatat muncul lagi setiap kali urutan teratas AI berpindah orang. */
export function perluMencatat(catatan: Catatan[], aiTop: Candidate | null, interviewed: number): boolean {
  if (!aiTop || interviewed < 1) return false;
  const terakhir = catatan[catatan.length - 1];
  return !terakhir || terakhir.aiTop !== aiTop;
}

export function catatanTerakhir(catatan: Catatan[]): Catatan | null {
  return catatan[catatan.length - 1] ?? null;
}

/** Berapa kali urutan teratas AI berpindah orang, beserta urutannya. */
export function perjalananAi(trail: Candidate[]): { urutan: Candidate[]; perubahan: number } {
  const urutan = trail.filter((nama, index) => index === 0 || nama !== trail[index - 1]);
  return { urutan, perubahan: Math.max(0, urutan.length - 1) };
}

export type KamuDanAi = { baris: string[] };

/**
 * Angka perubahan AI selalu ditampilkan, karena angka itu sendiri sudah membawa
 * pelajarannya. Kalau pemain melewatkan mekanik ini sama sekali, bagian ini
 * tetap ada tanpa kolom pribadi, jadi ia tidak pernah menjadi slot kosong.
 */
export function kamuDanAi(catatan: Catatan[], trail: Candidate[]): KamuDanAi {
  const naskah = scenario.kamuDanAi;
  const { urutan, perubahan } = perjalananAi(trail);
  const baris: string[] = [];

  baris.push(perubahan > 0
    ? naskah.perubahanAi.replace("{jumlah}", String(perubahan)).replace("{urutan}", urutan.join(", lalu "))
    : naskah.tanpaPerubahanAi);

  const menebak = catatan.filter((item) => item.tebakan !== null);
  if (menebak.length === 0) {
    baris.push(naskah.tanpaCatatan);
    return { baris };
  }

  const beda = menebak.filter((item) => item.tebakan !== item.aiTop).length;
  baris.push(beda === 0
    ? naskah.samaDenganAi
    : naskah.bedaDenganAi.replace("{jumlah}", String(beda)));
  return { baris };
}
