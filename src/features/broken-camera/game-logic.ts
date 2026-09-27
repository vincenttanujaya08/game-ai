import { scenario } from "./scenario";

export type Candidate = "Arya" | "Bella" | "Dimas" | "Chris" | "Leo";

const candidates = scenario.jalur.map((item) => item.id as Candidate);
/** Urutan pemutus nilai seri. Ini mekanik, bukan naskah, jadi tetap di sini. */
const ties: Candidate[] = ["Chris", "Leo", "Dimas", "Bella", "Arya"];

/**
 * Bobotnya sekarang diturunkan dari skenario, jadi mengubah keterangan saksi
 * dan mengubah pengaruhnya pada peringkat terjadi di satu tempat yang sama.
 */
export function buildScores(interviewed: string[], followedUp: string[]) {
  const scores = Object.fromEntries(candidates.map((name) => [name, 0])) as Record<Candidate, number>;
  for (const person of scenario.tokoh) {
    const jalur = person.jalur as Candidate | null;
    if (interviewed.includes(person.id) && jalur) scores[jalur] += person.bobot.awal;
    if (!followedUp.includes(person.id)) continue;
    if (jalur) scores[jalur] += person.bobot.lanjut;
    // Saksi tanpa jalur bisa membagi nilainya ke beberapa jalur sekaligus.
    const bagi = person.bobot.bagi;
    if (bagi) for (const ke of bagi.ke) scores[ke as Candidate] += bagi.nilai;
  }
  for (const item of scenario.jalur) {
    if (item.saksi.every((id) => followedUp.includes(id))) scores[item.id as Candidate] += scenario.bonusPasangan;
  }
  return scores;
}

/**
 * Membagi 100 memakai metode sisa terbesar, supaya persen yang ditampilkan
 * berjumlah tepat 100. Pembulatan per baris bisa menghasilkan 99 atau 101.
 */
function allocatePercents(values: number[]): number[] {
  const total = values.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return values.map(() => 0);
  const exact = values.map((value) => (100 * value) / total);
  const percents = exact.map((value) => Math.floor(value));
  const sisa = 100 - percents.reduce((sum, value) => sum + value, 0);
  const urutan = exact
    .map((value, index) => ({ index, pecahan: value - Math.floor(value) }))
    .sort((a, b) => b.pecahan - a.pecahan || a.index - b.index);
  for (let step = 0; step < sisa; step += 1) percents[urutan[step % urutan.length].index] += 1;
  return percents;
}

export type Ranked = { name: Candidate; score: number; percent: number };

export function rankCandidates(interviewed: string[], followedUp: string[]): Ranked[] {
  const scores = buildScores(interviewed, followedUp);
  const sorted = [...candidates].sort((a, b) => scores[b] - scores[a] || ties.indexOf(a) - ties.indexOf(b));
  // Tanpa lantai minimum: kandidat yang tidak punya keterangan sama sekali harus
  // tampil 0%, bukan angka kecil yang membuat AI seolah punya data tentangnya.
  const percents = allocatePercents(sorted.map((name) => scores[name]));
  return sorted.map((name, index) => ({ name, score: scores[name], percent: percents[index] }));
}

/**
 * Seberapa jauh sebuah jalur benar-benar ditopang oleh yang pemain kumpulkan.
 * Versi lama hanya punya satu kalimat statis per kandidat, sehingga menyebut
 * nama yang jalurnya tidak pernah disentuh terbaca sama meyakinkannya dengan
 * nama yang didalami dua sisi.
 */
export type SupportLevel = "tidakAda" | "awal" | "tidakLangsung" | "diakui" | "dikuatkan";

/** Dua saksi per jalur, dibaca dari skenario supaya tidak bisa melenceng. */
export const pathWitnesses = Object.fromEntries(
  scenario.jalur.map((item) => [item.id, item.saksi]),
) as Record<Candidate, string[]>;

function gabung(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} dan ${names[names.length - 1]}`;
}

export function collectedSupport(candidate: Candidate, interviewed: string[], followedUp: string[]): {
  level: SupportLevel;
  sources: string[];
  teks: string;
} {
  const saksi = pathWitnesses[candidate];
  const didengar = saksi.filter((id) => interviewed.includes(id));
  const didalami = saksi.filter((id) => followedUp.includes(id));

  const kalimat = (level: SupportLevel, sumber: string[]) =>
    scenario.dukungan[level].replace("{jalur}", candidate).replace("{sumber}", gabung(sumber));

  if (didengar.length === 0) return { level: "tidakAda", sources: [], teks: kalimat("tidakAda", []) };
  if (didalami.length >= 2) return { level: "dikuatkan", sources: didengar, teks: kalimat("dikuatkan", didalami) };
  if (didalami.length === 1) return { level: "diakui", sources: didengar, teks: kalimat("diakui", didalami) };
  if (didengar.length >= 2) return { level: "tidakLangsung", sources: didengar, teks: kalimat("tidakLangsung", didengar) };
  return { level: "awal", sources: didengar, teks: kalimat("awal", didengar) };
}

/** Sisi jalur yang belum ditempuh pemain, sebagai langkah berikut yang konkret. */
export function sisiLain(candidate: Candidate, interviewed: string[], followedUp: string[]): string {
  const saksi = pathWitnesses[candidate];
  const belumDidengar = saksi.filter((id) => !interviewed.includes(id));
  if (belumDidengar.length) return scenario.sisiLain.belumDidengar.replace("{sumber}", gabung(belumDidengar));
  const belumDidalami = saksi.filter((id) => !followedUp.includes(id));
  if (belumDidalami.length) return scenario.sisiLain.belumDidalami.replace("{sumber}", gabung(belumDidalami));
  return scenario.sisiLain.habis;
}
