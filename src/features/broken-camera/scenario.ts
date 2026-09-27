import rawScenario from "@/content/kamera-rusak.id.json";
import type { Candidate } from "./game-logic";

/** Bobot peringkat satu saksi. Siska tidak memihak jalur, tetapi membagi nilai. */
export type Bobot = { awal: number; lanjut: number; bagi?: { ke: string[]; nilai: number } };

export type Person = {
  id: string;
  bobot: Bobot;
  /** Baris yang masuk ke rangkuman AI begitu keterangannya didengar. */
  sintesis: string;
  /** Jalur kejadian yang keterangannya topang. Siska tidak memihak jalur mana pun. */
  jalur: Candidate | null;
  /** Keterangannya memperlihatkan bahwa kondisi lensa tidak pernah dicatat. */
  celah: boolean;
  nama: string;
  peran: string;
  ringkas: string;
  buka: string[];
  mengapa: string;
  awal: string;
  tanya: string;
  lanjut: string;
};

export type Evidence = { id: string; bukaSetelah: string; judul: string; isi: string; jalur: Candidate | null; celah: boolean };

/** Kapan sebuah keterbatasan benar-benar berlaku pada satu penyelidikan. */
export type AturanBerlaku = "selalu" | "wawancaraBelumLengkap" | "tanpaPendalaman" | "tidakPernah";
export type Keterbatasan = { id: string; berlaku: AturanBerlaku; teks: string };
export type Jalur = { id: string; saksi: string[]; kuat: string; batas: string };
export type TingkatDukungan = "tidakAda" | "awal" | "tidakLangsung" | "diakui" | "dikuatkan";
export type NaskahHasil = { judul: string; isi: string; langkah: string };

export type Phase = { judul: string; ids: string[] };

export type Tempat = "tangan" | "meja" | "peti" | "multimedia";

/** Satu kejadian dalam perjalanan kamera. `butuh` menyebut saksi yang membukanya. */
export type Beat = {
  waktu: string;
  isi: string;
  catatan?: string;
  jenis: "aksi" | "benturan" | "foto" | "temuan";
  tempat: Tempat;
  butuh: string[];
};

export type Scenario = {
  meta: {
    judul: string;
    versi: string;
    /** Jatah waktu kasus yang dibelanjakan per tindakan, bukan jam yang berjalan. */
    anggaranDetik: number;
    biayaWawancaraDetik: number;
    biayaDalamiDetik: number;
    batasWawancaraAkhir: number;
  };
  pembuka: {
    judul: string;
    latarBelakang: { waktu: string; isi: string }[];
    tujuan: string;
    pertanyaanKunci: string[];
    catatanAi: string;
    aturan: string[];
    aksi: string;
  };
  fase: Phase[];
  tokoh: Person[];
  bukti: Evidence[];
  linimasa: Beat[];
  celahUtama: string;
  tempat: { id: Tempat; nama: string }[];
  keterbatasan: Keterbatasan[];
  /** Berkunci OutcomeId. Kelengkapannya dijaga verdict.test.ts. */
  hasil: Record<string, NaskahHasil>;
  pesanInti: string;
  pelajaran: { teks: string; tautan: string; label: string };
  jalur: Jalur[];
  bonusPasangan: number;
  dukungan: Record<TingkatDukungan, string>;
  sisiLain: { belumDidengar: string; belumDidalami: string; habis: string };
  catatan: { ajakan: string; bantuan: string; lewati: string; tersimpan: string; lewatiTersimpan: string; ubah: string };
  kamuDanAi: {
    judul: string; tanpaCatatan: string; perubahanAi: string; tanpaPerubahanAi: string;
    samaDenganAi: string; bedaDenganAi: string;
  };
  andaiKata: {
    judul: string; wawancara: string; wawancaraTetap: string; tafsirWawancara: string;
    pendalaman: string; tafsirPendalaman: string; semua: string; tafsirSemua: string;
    penutup: string; mainLagi: string;
  };
  lanjutkan: { ajakan: string; mulaiBaru: string; catatan: string };
};

export const scenario = rawScenario as Scenario;

export const personById = Object.fromEntries(scenario.tokoh.map((person) => [person.id, person])) as Record<string, Person>;

/** Seseorang terbuka kalau seluruh prasyarat di `buka` sudah diwawancarai. */
export function isUnlocked(person: Person, interviewed: string[]): boolean {
  return person.buka.every((id) => interviewed.includes(id));
}

export function unlockedEvidence(interviewed: string[]): Evidence[] {
  return scenario.bukti.filter((item) => interviewed.includes(item.bukaSetelah));
}

export function formatTime(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
