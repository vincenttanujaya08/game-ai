import { scenario } from "./scenario";

/**
 * Waktu bukan jam yang berjalan sendiri, melainkan jatah yang dibelanjakan.
 * Tiap tindakan punya harga, jadi tiap klik adalah pertukaran, bukan sekadar
 * menunggu. Versi lama memakai jam mundur yang tidak berakibat apa pun.
 */

export type Aksi = "wawancara" | "dalami";

export const anggaran = scenario.meta.anggaranDetik;

export const batasWawancara = scenario.meta.batasWawancaraAkhir;

export const harga: Record<Aksi, number> = {
  wawancara: scenario.meta.biayaWawancaraDetik,
  dalami: scenario.meta.biayaDalamiDetik,
};

/** Aksi termurah, dipakai untuk menentukan apakah masih ada yang bisa dibeli. */
const termurah = Math.min(harga.wawancara, harga.dalami);

export function sisa(terpakai: number): number {
  return Math.max(0, anggaran - terpakai);
}

/**
 * Jatah yang ditahan supaya batas wawancara minimum selalu masih bisa dicapai.
 *
 * Tanpa penahan ini ada jalur yang mengunci pemain: empat wawancara dan empat
 * pendalaman menghabiskan tepat seluruh anggaran di wawancara keempat, satu
 * langkah di bawah batas untuk boleh mengakhiri penyelidikan. Aturan pembuka
 * menjanjikan itu tidak terjadi, jadi yang dibatasi adalah pendalamannya.
 * Wawancara sendiri tidak pernah tertahan, karena tiap wawancara mengecilkan
 * cadangan ini sebesar harganya sendiri.
 */
export function cadangan(sudahWawancara: number): number {
  return Math.max(0, batasWawancara - sudahWawancara) * harga.wawancara;
}

export function mampu(aksi: Aksi, terpakai: number, sudahWawancara: number): boolean {
  const tersedia = aksi === "dalami" ? sisa(terpakai) - cadangan(sudahWawancara) : sisa(terpakai);
  return tersedia >= harga[aksi];
}

/**
 * Penyelidikan tertutup ketika tidak ada lagi yang bisa dibeli, entah karena
 * jatah habis atau karena semua orang sudah didengar dan didalami.
 */
export function adaAksiTerjangkau(
  terpakai: number,
  sudahWawancara: number,
  adaCalonWawancara: boolean,
  adaCalonDalami: boolean,
): boolean {
  if (sisa(terpakai) < termurah) return false;
  if (adaCalonWawancara && mampu("wawancara", terpakai, sudahWawancara)) return true;
  if (adaCalonDalami && mampu("dalami", terpakai, sudahWawancara)) return true;
  return false;
}

/** "1 menit" atau "2 menit", dipakai pada label tombol. */
export function hargaTeks(aksi: Aksi): string {
  const menit = harga[aksi] / 60;
  return Number.isInteger(menit) ? `${menit} menit` : `${harga[aksi]} detik`;
}

export function formatSisa(terpakai: number): string {
  const total = sisa(terpakai);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

const ambang: { batas: number; teks: string }[] = [
  { batas: 240, teks: "Sisa jatah waktu 4 menit. Pilih wawancara atau pertanyaan lanjutan yang paling menambah bukti, bukan yang paling mudah." },
  { batas: 120, teks: "Sisa 2 menit. Satu pertanyaan lanjutan sama dengan dua wawancara. Pilih yang lebih kamu butuhkan." },
];

/**
 * Peringatan dipicu oleh pembelanjaan yang melewati ambang, bukan oleh detik
 * yang berdetak. Jadi ia tidak bisa berulang dan tidak bisa muncul di tab latar.
 */
export function nudge(terpakaiSebelum: number, terpakaiSesudah: number): string | null {
  const sebelum = sisa(terpakaiSebelum);
  const sesudah = sisa(terpakaiSesudah);
  for (const item of ambang) {
    if (sebelum > item.batas && sesudah <= item.batas) return item.teks;
  }
  return null;
}

/** Alasan sebuah tombol tidak bisa ditekan, supaya tidak hanya tampil kelabu. */
export function alasanTidakMampu(aksi: Aksi, terpakai: number, sudahWawancara: number): string {
  const kurang = Math.max(0, batasWawancara - sudahWawancara);
  if (aksi === "dalami" && sisa(terpakai) >= harga.dalami && kurang > 0) {
    return `Sisa jatah waktu ${formatSisa(terpakai)} ditahan untuk mencapai ${batasWawancara} wawancara. Dengarkan ${kurang} keterangan lagi sebelum mendalami lagi.`;
  }
  return `Sisa jatah waktu ${formatSisa(terpakai)}. ${aksi === "wawancara" ? "Wawancara" : "Pertanyaan lanjutan"} butuh ${hargaTeks(aksi)}.`;
}
