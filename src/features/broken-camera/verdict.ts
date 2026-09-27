import { collectedSupport, sisiLain, type Candidate } from "./game-logic";
import { personById, scenario, type Keterbatasan, type NaskahHasil } from "./scenario";
import { candidateFromConclusion, rotateOptions, weakness, type ConclusionKind } from "./summary";

/**
 * Penilaian akhir bertumpu pada apa yang benar-benar dikumpulkan pemain.
 *
 * Sebelum ini, bukti yang dibuka tidak pernah dibaca kode penilaian mana pun,
 * dan delapan dari sembilan pilihan kesimpulan identik secara mekanis. Di sini
 * kesimpulan, kutipan yang menopangnya, dan keterangan yang benar-benar
 * didengar dinilai bersama, sehingga menyebut nama yang jalurnya tidak pernah
 * disentuh punya akibat yang bisa dijelaskan.
 */

export type OutcomeId =
  | "hatiHatiKuat" | "hatiHatiPerluDasar"
  | "bandingKuat" | "bandingPerluDasar"
  | "dugaanBeralasan" | "dugaanTipis"
  | "lompatanTanpaDasar";

/** Satu hal yang bisa ditunjuk pemain sebagai dasar kesimpulannya. */
export type Kutipan = { id: string; label: string; jalur: Candidate | null; celah: boolean };

/** Satu keputusan yang bisa ditunjuk, bukan satu angka besar. */
export type Keputusan = { id: string; label: string; ok: boolean; alasan: string };

export type FinalVerdict = {
  outcome: OutcomeId;
  judul: string;
  isi: string;
  langkah: string;
  keputusan: Keputusan[];
  tepat: number;
  total: number;
  ringkas: string;
  sumberTeks: string;
};

export const batasKutipan = 3;

/**
 * Hanya yang sudah dibuka yang bisa ditunjuk, jadi judul bukti yang belum
 * terbuka tidak bocor lewat daftar ini.
 */
export function citationOptions(interviewed: string[], followedUp: string[], openedEvidence: string[]): Kutipan[] {
  const keterangan = scenario.tokoh
    .filter((person) => interviewed.includes(person.id))
    .map((person): Kutipan => ({
      id: `saksi:${person.id}`,
      label: followedUp.includes(person.id)
        ? `Keterangan ${person.nama}, termasuk pertanyaan lanjutan`
        : `Keterangan ${person.nama}`,
      jalur: person.jalur,
      celah: person.celah,
    }));
  const bukti = scenario.bukti
    .filter((item) => openedEvidence.includes(item.id))
    .map((item): Kutipan => ({ id: `bukti:${item.id}`, label: `Bukti: ${item.judul}`, jalur: item.jalur, celah: item.celah }));
  return [...keterangan, ...bukti];
}

export function keterbatasanPilihan(seed: number): Keterbatasan[] {
  // Opsi yang berlaku tidak pernah dipasang di posisi tetap.
  return rotateOptions(scenario.keterbatasan, seed);
}

export function keterbatasanBerlaku(id: string, interviewed: string[], followedUp: string[]): boolean {
  const item = scenario.keterbatasan.find((entry) => entry.id === id);
  if (!item) return false;
  switch (item.berlaku) {
    case "selalu":
      return true;
    case "wawancaraBelumLengkap":
      return interviewed.length < scenario.tokoh.length;
    case "tanpaPendalaman":
      return followedUp.length === 0;
    case "tidakPernah":
      return false;
  }
}

/** Jalur yang disebut kesimpulan. */
function jalurDisebut(kind: ConclusionKind): Candidate[] {
  switch (kind.kind) {
    case "satu":
      return [kind.candidate];
    case "dua":
      return [...kind.candidates];
    case "tiga":
      return [...kind.candidates];
    case "belumCukup":
      return [];
  }
}

function isiNaskah(naskah: NaskahHasil, ganti: Record<string, string>): NaskahHasil {
  const tukar = (teks: string) => teks.replace(/\{(\w+)\}/g, (cocok, kunci: string) => ganti[kunci] ?? cocok);
  return { judul: tukar(naskah.judul), isi: tukar(naskah.isi), langkah: tukar(naskah.langkah) };
}

export type FinalSubmission = {
  conclusion: ConclusionKind;
  citations: string[];
  keterbatasan: string;
};

export function gradeFinal(input: {
  submission: FinalSubmission;
  interviewed: string[];
  followedUp: string[];
  openedEvidence: string[];
  sumberDibaca: boolean;
}): FinalVerdict {
  const { submission, interviewed, followedUp, openedEvidence, sumberDibaca } = input;
  const { conclusion, citations, keterbatasan } = submission;

  const tersedia = citationOptions(interviewed, followedUp, openedEvidence);
  const dipilih = citations
    .map((id) => tersedia.find((item) => item.id === id))
    .filter((item): item is Kutipan => Boolean(item));
  const jalur = jalurDisebut(conclusion);
  const dipertaruhkan = candidateFromConclusion(conclusion);
  const dukungan = dipertaruhkan ? collectedSupport(dipertaruhkan, interviewed, followedUp) : null;

  const dasarTerbuka = citations.length > 0 && dipilih.length === citations.length;
  const dasarCocok = conclusion.kind === "belumCukup"
    ? dipilih.some((item) => item.celah)
    : jalur.every((nama) => dipilih.some((item) => item.jalur === nama));
  const dukunganTerkumpul = dukungan === null || dukungan.level !== "tidakAda";
  const keterbatasanOk = keterbatasanBerlaku(keterbatasan, interviewed, followedUp);
  // Menyebut satu nama menuntut lebih dari satu sisi cerita di jalur itu.
  const tidakMelebihiBukti = conclusion.kind === "satu"
    ? dukungan !== null && dukungan.level !== "tidakAda" && dukungan.level !== "awal"
    : conclusion.kind === "dua"
      ? dukungan !== null && dukungan.level !== "tidakAda"
      : true;

  const keputusan: Keputusan[] = [
    {
      id: "dasarTerbuka",
      label: "Dasar yang kamu tunjuk memang sudah kamu buka",
      ok: dasarTerbuka,
      alasan: dasarTerbuka
        ? "Semua yang kamu tunjuk berasal dari keterangan atau bukti yang kamu buka sendiri."
        : "Ada dasar yang kamu tunjuk tetapi tidak pernah kamu buka di penyelidikan ini.",
    },
    {
      id: "dasarCocok",
      label: "Dasarnya nyambung dengan kesimpulanmu",
      ok: dasarCocok,
      alasan: dasarCocok
        ? (conclusion.kind === "belumCukup"
          ? "Yang kamu tunjuk memang memperlihatkan bahwa kondisi lensa tidak pernah dicatat."
          : "Tiap jalur yang kamu sebut punya sumber yang kamu tunjuk sendiri.")
        : (conclusion.kind === "belumCukup"
          ? "Yang kamu tunjuk memastikan tempat atau waktu, bukan celah pemeriksaan lensanya."
          : "Ada jalur yang kamu sebut tanpa satu pun sumber yang menopangnya."),
    },
    {
      id: "dukunganTerkumpul",
      label: "Jalur yang kamu sebut punya keterangan yang kamu kumpulkan",
      ok: dukunganTerkumpul,
      alasan: dukungan
        ? dukungan.teks
        : "Kesimpulanmu tidak mempertaruhkan satu nama, jadi tidak ada jalur yang perlu ditopang sendirian.",
    },
    {
      id: "keterbatasanBerlaku",
      label: "Keterbatasan yang kamu pilih berlaku di penyelidikan ini",
      ok: keterbatasanOk,
      alasan: keterbatasanOk
        ? "Keterbatasan itu memang terjadi pada penyelidikan yang barusan kamu jalankan."
        : "Keterbatasan itu tidak berlaku di penyelidikan ini, jadi ia tidak menjelaskan batas kesimpulanmu.",
    },
    {
      id: "tidakMelebihiBukti",
      label: "Keyakinanmu tidak melampaui dukungannya",
      ok: tidakMelebihiBukti,
      alasan: tidakMelebihiBukti
        ? "Seberapa jauh kesimpulanmu melangkah masih sejalan dengan yang kamu kumpulkan."
        : "Menyebut satu penyebab butuh lebih dari satu sisi cerita di jalur itu.",
    },
  ];

  const tepat = keputusan.filter((item) => item.ok).length;
  const semua = tepat === keputusan.length;

  const outcome: OutcomeId = dipertaruhkan && !dukunganTerkumpul
    ? "lompatanTanpaDasar"
    : conclusion.kind === "belumCukup"
      ? (semua ? "hatiHatiKuat" : "hatiHatiPerluDasar")
      : conclusion.kind === "satu"
        ? (semua ? "dugaanBeralasan" : "dugaanTipis")
        : (semua ? "bandingKuat" : "bandingPerluDasar");

  const naskah = isiNaskah(scenario.hasil[outcome], {
    jalur: dipertaruhkan ?? "",
    dukungan: dukungan?.teks ?? "",
    batasJalur: dipertaruhkan ? weakness[dipertaruhkan] : "",
    saksi: dipertaruhkan ? sisiLain(dipertaruhkan, interviewed, followedUp) : "",
    kesimpulan: jalur.map((nama) => personById[nama]?.nama ?? nama).join(", "),
  });

  return {
    outcome,
    ...naskah,
    keputusan,
    tepat,
    total: keputusan.length,
    ringkas: `${tepat} dari ${keputusan.length} keputusan sudah bertumpu pada bukti yang kamu kumpulkan.`,
    sumberTeks: sumberDibaca
      ? "Kamu sempat membuka tab Keterangan asli, jadi penilaianmu tidak hanya bersandar pada rangkuman AI."
      : "Kamu tidak pernah membuka tab Keterangan asli, jadi semua yang kamu nilai berasal dari rangkuman AI, bukan dari kalimat saksinya sendiri.",
  };
}
