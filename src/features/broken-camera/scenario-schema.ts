import { z } from "zod";

/**
 * Skema isi kasus "Kamera yang Rusak".
 *
 * Dipakai oleh content lint, bukan oleh halamannya, supaya zod tidak ikut
 * terbawa ke bundel klien. Aturan yang tidak bisa dinyatakan sebagai bentuk
 * data, misalnya graf saksi dan keterjangkauan anggaran, diperiksa di
 * scripts/lint-scenarios.ts memakai tipe yang dihasilkan di sini.
 */

const teks = z.string().min(1);

export const outcomeIds = [
  "hatiHatiKuat", "hatiHatiPerluDasar",
  "bandingKuat", "bandingPerluDasar",
  "dugaanBeralasan", "dugaanTipis",
  "lompatanTanpaDasar",
] as const;

export const tingkatDukungan = ["tidakAda", "awal", "tidakLangsung", "diakui", "dikuatkan"] as const;

const BobotSchema = z.object({
  awal: z.number().int().min(0),
  lanjut: z.number().int().min(0),
  bagi: z.object({ ke: z.array(teks).min(1), nilai: z.number().int().min(1) }).optional(),
});

const PersonSchema = z.object({
  id: teks,
  nama: teks,
  peran: teks,
  ringkas: teks,
  buka: z.array(teks),
  mengapa: teks,
  awal: teks,
  tanya: teks,
  lanjut: teks,
  jalur: teks.nullable(),
  celah: z.boolean(),
  bobot: BobotSchema,
  sintesis: teks,
});

const EvidenceSchema = z.object({
  id: teks,
  bukaSetelah: teks,
  judul: teks,
  isi: teks,
  jalur: teks.nullable(),
  celah: z.boolean(),
});

const BeatSchema = z.object({
  waktu: teks,
  isi: teks,
  catatan: teks.optional(),
  jenis: z.enum(["aksi", "benturan", "foto", "temuan"]),
  tempat: z.enum(["tangan", "meja", "peti", "multimedia"]),
  butuh: z.array(teks),
});

const NaskahHasilSchema = z.object({ judul: teks, isi: teks, langkah: teks });

export const KameraRusakSchema = z.object({
  meta: z.object({
    judul: teks,
    versi: teks,
    anggaranDetik: z.number().int().positive(),
    biayaWawancaraDetik: z.number().int().positive(),
    biayaDalamiDetik: z.number().int().positive(),
    batasWawancaraAkhir: z.number().int().positive(),
  }),
  pembuka: z.object({
    judul: teks,
    latarBelakang: z.array(z.object({ waktu: teks, isi: teks })).min(1),
    tujuan: teks,
    pertanyaanKunci: z.array(teks).min(1),
    catatanAi: teks,
    aturan: z.array(teks).min(1),
    aksi: teks,
  }),
  fase: z.array(z.object({ judul: teks, ids: z.array(teks).min(1) })).min(1),
  tokoh: z.array(PersonSchema).min(2),
  bukti: z.array(EvidenceSchema).min(1),
  linimasa: z.array(BeatSchema).min(1),
  celahUtama: teks,
  tempat: z.array(z.object({ id: teks, nama: teks })).min(1),
  keterbatasan: z.array(z.object({
    id: teks,
    berlaku: z.enum(["selalu", "wawancaraBelumLengkap", "tanpaPendalaman", "tidakPernah"]),
    teks,
  })).min(3),
  hasil: z.record(z.enum(outcomeIds), NaskahHasilSchema),
  pesanInti: teks,
  pelajaran: z.object({ teks, tautan: teks.startsWith("/learn/"), label: teks }),
  jalur: z.array(z.object({ id: teks, saksi: z.array(teks).min(1), kuat: teks, batas: teks })).min(2),
  bonusPasangan: z.number().int().min(0),
  dukungan: z.record(z.enum(tingkatDukungan), teks),
  sisiLain: z.object({ belumDidengar: teks, belumDidalami: teks, habis: teks }),
  catatan: z.object({ ajakan: teks, bantuan: teks, lewati: teks, tersimpan: teks, lewatiTersimpan: teks, ubah: teks }),
  kamuDanAi: z.object({
    judul: teks, tanpaCatatan: teks, perubahanAi: teks, tanpaPerubahanAi: teks,
    samaDenganAi: teks, bedaDenganAi: teks,
  }),
  andaiKata: z.object({
    judul: teks, wawancara: teks, wawancaraTetap: teks, tafsirWawancara: teks,
    pendalaman: teks, tafsirPendalaman: teks, semua: teks, tafsirSemua: teks,
    penutup: teks, mainLagi: teks,
  }),
  lanjutkan: z.object({ ajakan: teks, mulaiBaru: teks, catatan: teks }),
});

export type KameraRusak = z.infer<typeof KameraRusakSchema>;

/** Token yang bisa diisi kode. Naskah tidak boleh memakai yang lain. */
export const tokenNaskah: Record<string, string[]> = {
  hasil: ["jalur", "dukungan", "batasJalur", "saksi", "kesimpulan"],
  dukungan: ["jalur", "sumber"],
  sisiLain: ["sumber"],
  catatan: ["tebakan"],
  kamuDanAi: ["jumlah", "urutan"],
  andaiKata: ["nama", "dari", "ke", "jalur", "jumlah"],
  lanjutkan: ["wawancara", "sisa"],
};
