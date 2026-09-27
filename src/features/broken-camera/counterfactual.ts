import { mampu } from "./budget";
import { rankCandidates, type Candidate } from "./game-logic";
import { isUnlocked, scenario } from "./scenario";
import { makeSummary } from "./summary";

/**
 * Jalur lain yang belum ditempuh, dihitung dengan memanggil ulang peringkat
 * pada himpunan andai kata. Tidak ada satu pun logika skor baru di sini, jadi
 * bagian ini tidak bisa menyimpang dari yang dialami pemain.
 */

export type Andai = { id: string; teks: string; tafsir: string };

const teratas = (interviewed: string[], followedUp: string[]): Candidate => rankCandidates(interviewed, followedUp)[0].name;

/**
 * Hanya orang yang sudah terbuka tetapi belum diwawancarai. Pembatasan ini yang
 * menjaga kejujurannya: tidak akan berkata "kalau kamu mewawancarai Maya"
 * padahal Maya baru terbuka setelah Leo didengar.
 */
export function calonWawancara(interviewed: string[]): string[] {
  return scenario.tokoh
    .filter((orang) => !interviewed.includes(orang.id) && isUnlocked(orang, interviewed))
    .map((orang) => orang.id);
}

function andaiWawancara(interviewed: string[], followedUp: string[]): Andai | null {
  const calon = calonWawancara(interviewed);
  if (!calon.length) return null;
  const sekarang = teratas(interviewed, followedUp);
  const naskah = scenario.andaiKata;

  // Yang paling mengajar adalah orang yang memindahkan urutan teratas.
  const pemindah = calon.find((id) => teratas([...interviewed, id], followedUp) !== sekarang);
  const dipilih = pemindah ?? calon[0];
  const nama = scenario.tokoh.find((orang) => orang.id === dipilih)?.nama ?? dipilih;
  const sesudah = teratas([...interviewed, dipilih], followedUp);

  if (!pemindah) {
    return {
      id: `wawancara:${dipilih}`,
      teks: naskah.wawancaraTetap.replace("{nama}", nama).replace("{dari}", sekarang),
      tafsir: naskah.tafsirWawancara.replace("{ke}", sekarang),
    };
  }
  return {
    id: `wawancara:${dipilih}`,
    teks: naskah.wawancara.replace("{nama}", nama).replace("{dari}", sekarang).replace("{ke}", sesudah),
    tafsir: naskah.tafsirWawancara.replace("{ke}", sesudah),
  };
}

/** Pendalaman yang melengkapi pasangan bonus, kalau jatahnya masih terjangkau. */
function andaiPendalaman(interviewed: string[], followedUp: string[], terpakai: number): Andai | null {
  if (!mampu("dalami", terpakai, interviewed.length)) return null;
  const sekarang = teratas(interviewed, followedUp);

  for (const jalur of scenario.jalur) {
    const kurang = jalur.saksi.filter((id) => !followedUp.includes(id));
    if (kurang.length !== 1) continue;
    const id = kurang[0];
    if (!interviewed.includes(id)) continue;
    if (teratas(interviewed, [...followedUp, id]) === sekarang) continue;
    const nama = scenario.tokoh.find((orang) => orang.id === id)?.nama ?? id;
    return {
      id: `dalami:${id}`,
      teks: scenario.andaiKata.pendalaman.replace("{nama}", nama).replace("{jalur}", jalur.id),
      tafsir: scenario.andaiKata.tafsirPendalaman,
    };
  }
  return null;
}

/** Panel tetap: kesebelas keterangan hampir selalu berujung di bentuk terbuka. */
function andaiSemua(): Andai {
  const semua = scenario.tokoh.map((orang) => orang.id);
  const summary = makeSummary(rankCandidates(semua, []));
  const jumlah = summary.shape === "tiga" ? 3 : summary.shape === "dua" ? 2 : 1;
  return {
    id: "semua",
    teks: scenario.andaiKata.semua.replace("{jumlah}", String(jumlah)),
    tafsir: scenario.andaiKata.tafsirSemua,
  };
}

export function jalurLain(interviewed: string[], followedUp: string[], terpakai: number): Andai[] {
  const daftar = [andaiWawancara(interviewed, followedUp), andaiPendalaman(interviewed, followedUp, terpakai), andaiSemua()];
  return daftar.filter((item): item is Andai => item !== null);
}
