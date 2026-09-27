import type { Candidate, Ranked } from "./game-logic";
import { scenario } from "./scenario";

/**
 * Semua yang menghitung fakta tentang kasus ini tinggal di sini, bukan di
 * komponen. Selain supaya bisa diuji (vitest hanya mengumpulkan file .ts),
 * ini juga tempat empat bug penilaian lama diperbaiki sekaligus.
 */

export const candidateIds = scenario.jalur.map((item) => item.id as Candidate);

export const strength = Object.fromEntries(scenario.jalur.map((item) => [item.id, item.kuat])) as Record<Candidate, string>;

export const weakness = Object.fromEntries(scenario.jalur.map((item) => [item.id, item.batas])) as Record<Candidate, string>;

export type SummaryShape = "satu" | "pasangan" | "dua" | "tiga";

export type Summary = {
  top: Ranked;
  second: Ranked;
  third: Ranked;
  shape: SummaryShape;
  conclusion: string;
  /** Label bentuk keyakinan, huruf kalimat. Bukan lencana berteriak. */
  label: string;
};

/**
 * Kesimpulan pemain disimpan sebagai data, bukan sebagai kalimat tampilan.
 * Versi lama menebak nama dengan mencari string berurutan, sehingga
 * "Arya atau Chris, condong ke Chris" terbaca sebagai Arya.
 */
export type ConclusionKind =
  | { kind: "satu"; candidate: Candidate }
  | { kind: "dua"; candidates: [Candidate, Candidate]; condong: Candidate }
  | { kind: "tiga"; candidates: [Candidate, Candidate, Candidate] }
  | { kind: "belumCukup" };

export function makeSummary(ranking: Ranked[]): Summary {
  const [top, second, third] = ranking;
  const gap12 = top.score - second.score;
  const gap13 = top.score - third.score;

  if (gap13 <= 8) {
    return {
      top, second, third, shape: "tiga",
      label: "Beberapa dugaan berdekatan",
      conclusion: `${top.name}, ${second.name}, dan ${third.name} masih sama-sama mungkin. AI sedikit lebih condong ke ${top.name}.`,
    };
  }
  if (gap12 <= 7) {
    return {
      top, second, third, shape: "dua",
      label: "Dua dugaan berdekatan",
      conclusion: `Dugaan ${top.name} dan ${second.name} hampir berimbang. AI sedikit lebih condong ke ${top.name}.`,
    };
  }
  if (gap12 <= 15) {
    return {
      top, second, third, shape: "pasangan",
      label: "Satu dugaan terkuat dengan satu alternatif",
      conclusion: `${top.name} menjadi dugaan terkuat, tetapi ${second.name} masih mungkin menjadi penyebabnya.`,
    };
  }
  return {
    top, second, third, shape: "satu",
    label: "Satu dugaan memimpin",
    conclusion: `Menurut AI, ${top.name} paling mungkin menyebabkan lensa retak.`,
  };
}

export function conclusionText(kind: ConclusionKind): string {
  switch (kind.kind) {
    case "satu":
      return `${kind.candidate} paling mungkin menjadi penyebab kerusakan.`;
    case "dua":
      return `${kind.candidates[0]} atau ${kind.candidates[1]} masih mungkin. Aku lebih condong ke ${kind.condong}.`;
    case "tiga":
      return `${kind.candidates[0]}, ${kind.candidates[1]}, dan ${kind.candidates[2]} masih sama-sama mungkin.`;
    case "belumCukup":
      return "Bukti yang ada belum cukup untuk menentukan satu penyebab.";
  }
}

/** Kandidat yang sedang dipertaruhkan pemain, atau null kalau ia menahan diri. */
export function candidateFromConclusion(kind: ConclusionKind): Candidate | null {
  switch (kind.kind) {
    case "satu":
      return kind.candidate;
    case "dua":
      return kind.condong;
    case "tiga":
    case "belumCukup":
      return null;
  }
}

export function conclusionChoices(summary: Summary): ConclusionKind[] {
  const openThree: ConclusionKind[] = summary.shape === "tiga" || summary.shape === "dua"
    ? [{ kind: "tiga", candidates: [summary.top.name, summary.second.name, summary.third.name] }]
    : [];
  return [
    ...candidateIds.map((candidate): ConclusionKind => ({ kind: "satu", candidate })),
    { kind: "dua", candidates: [summary.top.name, summary.second.name], condong: summary.top.name },
    { kind: "dua", candidates: [summary.top.name, summary.second.name], condong: summary.second.name },
    ...openThree,
    { kind: "belumCukup" },
  ];
}

/** Memutar urutan opsi supaya jawaban benar tidak selalu berada di posisi pertama. */
export function rotateOptions<T>(options: T[], seed: number): T[] {
  if (options.length === 0) return options;
  const shift = ((seed % options.length) + options.length) % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

/**
 * Lima opsi, satu per kandidat, jadi jawaban benar selalu ada di dalamnya.
 * Versi lama memotong daftar jadi empat sehingga jawaban benar kadang hilang.
 */
export function makeSynthesis(interviewed: string[], followedUp: string[], ranking: Ranked[]): string {
  if (!interviewed.length) {
    return "Belum ada keterangan. Mulai dengan mewawancarai Arya untuk melihat teori sementara pertama dari AI.";
  }
  const [top, second] = ranking;
  const bits = [
    "Rangkuman AI",
    "Dugaan paling kuat saat ini",
    `${top.name} paling mungkin terkait dengan kerusakan lensa, dengan nilai sekitar ${top.percent}% dalam peringkat saat ini.`,
    `Mengapa AI condong ke ${top.name}? ${strength[top.name]}`,
  ];
  for (const person of scenario.tokoh) if (interviewed.includes(person.id)) bits.push(person.sintesis);
  if (followedUp.length) {
    bits.push(`Pertanyaan lanjutan untuk ${followedUp.join(", ")} menambahkan detail yang membuat satu rangkaian kejadian tampak lebih kuat. Namun, detail itu belum membuktikan kapan lensa retak.`);
  }
  bits.push(`Dugaan berikutnya: ${second.name}, sekitar ${second.percent}%. Peringkat ini dibuat dari keterangan yang kamu pilih, bukan dari semua hal yang mungkin terjadi.`);
  bits.push(`Peringkat dugaan saat ini: ${ranking.map((item, index) => `${index + 1}. ${item.name} · ${item.percent}%`).join("   ")}.`);
  return bits.join("\n\n");
}

/** Berapa kali urutan teratas AI berpindah orang selama penyelidikan. */
export function aiTopChanges(trail: Candidate[]): number {
  let changes = 0;
  for (let index = 1; index < trail.length; index += 1) if (trail[index] !== trail[index - 1]) changes += 1;
  return changes;
}
