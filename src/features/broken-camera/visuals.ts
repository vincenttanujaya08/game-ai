import type { Ranked } from "./game-logic";
import { personById, scenario, type Beat, type Tempat } from "./scenario";

/**
 * Perhitungan untuk lapisan visual. Dipisah dari komponennya supaya bisa diuji,
 * dan supaya bentuk batang atau segmen tidak pernah dihitung di dalam JSX.
 */

/** Pergeseran peringkat sejak tindakan terakhir, bukan sejak awal permainan. */
export type Arah = "naik" | "turun" | "tetap";

export type Bar = {
  name: string;
  percent: number;
  /** Lebar batang dalam persen lebar penuh, selalu relatif ke yang tertinggi. */
  width: number;
  /** Tanpa satu pun keterangan, AI memang tidak punya dasar untuk jalur ini. */
  kosong: boolean;
  teratas: boolean;
  arah: Arah;
  /** Berapa tingkat ia berpindah, untuk dibacakan pembaca layar. */
  tingkat: number;
};

/**
 * Pergeseran dihitung terhadap peringkat sebelum tindakan terakhir. Tanpa ini,
 * pelajaran inti game ini, yaitu bahwa urutan AI ikut bergeser mengikuti
 * keterangan yang masuk, hanya terlihat sebagai angka yang berganti diam-diam.
 */
export function toBars(ranking: Ranked[], sebelumnya: Ranked[] = []): Bar[] {
  const tertinggi = ranking.reduce((max, item) => Math.max(max, item.percent), 0);
  return ranking.map((item, index) => {
    const dulu = sebelumnya.findIndex((lama) => lama.name === item.name);
    const tingkat = dulu < 0 ? 0 : dulu - index;
    return {
      name: item.name,
      percent: item.percent,
      width: tertinggi > 0 ? (item.percent / tertinggi) * 100 : 0,
      kosong: item.score === 0,
      teratas: index === 0 && item.percent > 0,
      arah: tingkat > 0 ? "naik" : tingkat < 0 ? "turun" : "tetap",
      tingkat: Math.abs(tingkat),
    };
  });
}

/** Tingkat pemandu yang hilang saat port dari prototipe Java. */
export type Pemandu = { tingkat: "awal" | "belumCukup" | "bolehAkhiri" | "luas" | "lengkap"; teks: string };

export function pemandu(interviewed: number): Pemandu {
  const batas = scenario.meta.batasWawancaraAkhir;
  const total = scenario.tokoh.length;
  if (interviewed < 3) {
    return { tingkat: "awal", teks: "Gambaran awal baru terbentuk. Dengarkan beberapa keterangan dulu sebelum menilai apa pun." };
  }
  if (interviewed < batas) {
    return { tingkat: "belumCukup", teks: `Wawancarai ${batas - interviewed} orang lagi sebelum kamu bisa mengakhiri lebih awal.` };
  }
  if (interviewed < 8) {
    return { tingkat: "bolehAkhiri", teks: "Kamu sudah boleh mengakhiri sekarang, atau lanjut menguji teori AI dengan keterangan lain." };
  }
  if (interviewed < total) {
    return { tingkat: "luas", teks: "Cakupanmu sudah luas. Keterangan yang tersisa masih bisa menggeser peringkat AI." };
  }
  return { tingkat: "lengkap", teks: "Semua keterangan sudah terkumpul. Perhatikan apakah rangkuman AI jadi lebih ragu, bukan lebih yakin." };
}

export type Stasiun = {
  id: Tempat;
  nama: string;
  /** Beat yang terjadi di tempat ini. */
  beats: Beat[];
  /** Sudah ada keterangan yang membuka salah satu beat di sini. */
  terbuka: boolean;
  /** Titik terjauh yang sudah diketahui pemain. */
  terkini: boolean;
  /** Sudah dilewati kamera menurut yang pemain ketahui, termasuk titik terkini. */
  dilewati: boolean;
};

export function stasiun(interviewed: string[]): Stasiun[] {
  // Beat tanpa prasyarat adalah premis kasus, misalnya kamera ditemukan retak di
  // dalam peti. Itu sudah diketahui sejak awal, jadi tidak boleh membuat sebuah
  // tempat tampak sudah ditelusuri padahal pemain belum mendengar apa pun.
  const dibuka = (beat: Beat) => beat.butuh.length > 0 && beat.butuh.every((id) => interviewed.includes(id));
  const daftar = scenario.tempat.map((tempat): Stasiun => {
    const beats = scenario.linimasa.filter((beat) => beat.tempat === tempat.id);
    return { id: tempat.id, nama: tempat.nama, beats, terbuka: beats.some(dibuka), terkini: false, dilewati: false };
  });
  // "Terkini" adalah stasiun terbuka paling jauh dalam urutan perjalanan kamera,
  // dan di situlah penanda posisi kamera berhenti.
  const terakhir = daftar.map((item) => item.terbuka).lastIndexOf(true);
  if (terakhir >= 0) daftar[terakhir].terkini = true;
  return daftar.map((item, index) => ({ ...item, dilewati: terakhir >= 0 && index <= terakhir }));
}

export type SegmenLinimasa = Beat & { terbuka: boolean; pembuka: string[] };

export function segmenLinimasa(interviewed: string[]): SegmenLinimasa[] {
  return scenario.linimasa.map((beat) => ({
    ...beat,
    terbuka: beat.butuh.length === 0 || beat.butuh.every((id) => interviewed.includes(id)),
    pembuka: beat.butuh.map((id) => personById[id]?.nama ?? id),
  }));
}

export function hitungBenturan(segmen: SegmenLinimasa[]): { total: number; terbuka: number } {
  const benturan = segmen.filter((beat) => beat.jenis === "benturan");
  return { total: benturan.length, terbuka: benturan.filter((beat) => beat.terbuka).length };
}
