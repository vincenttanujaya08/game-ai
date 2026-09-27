import { describe, expect, it } from "vitest";
import { rankCandidates } from "./game-logic";
import {
  candidateFromConclusion, conclusionChoices, conclusionText, makeSummary,
  makeSynthesis, rotateOptions, strength, weakness, type ConclusionKind,
} from "./summary";

const semua = ["Arya", "Kevin", "Bella", "Fajar", "Siska", "Dimas", "Rafi", "Chris", "Nina", "Leo", "Maya"];
const minimum = ["Arya", "Bella", "Siska", "Dimas", "Rafi"];

describe("invarian pedagogis", () => {
  // Inti kasusnya: makin sedikit keterangan, makin percaya diri rangkuman AI.
  // Kalau kedua test ini merah, pelajaran utama game ini hilang.
  it("berhenti di batas minimum membuat AI terdengar paling yakin", () => {
    const summary = makeSummary(rankCandidates(minimum, []));
    expect(summary.top.score - summary.second.score).toBe(18);
    expect(summary.shape).toBe("satu");
  });

  it("mendengar semua keterangan justru membuat AI ragu", () => {
    const summary = makeSummary(rankCandidates(semua, []));
    expect(summary.top.score - summary.third.score).toBe(3);
    expect(summary.shape).toBe("tiga");
  });
});

describe("persentase peringkat", () => {
  it("memberi 0% untuk kandidat tanpa satu pun keterangan", () => {
    const ranking = rankCandidates(["Arya"], []);
    const kosong = ranking.filter((item) => item.score === 0);
    expect(kosong.length).toBeGreaterThan(0);
    kosong.forEach((item) => expect(item.percent).toBe(0));
  });

  it("selalu berjumlah tepat 100 saat ada data", () => {
    for (const set of [["Arya"], minimum, semua]) {
      const total = rankCandidates(set, []).reduce((sum, item) => sum + item.percent, 0);
      expect(total, set.join(",")).toBe(100);
    }
  });

  it("tidak menghasilkan NaN saat belum ada keterangan", () => {
    rankCandidates([], []).forEach((item) => {
      expect(item.percent).toBe(0);
      expect(Number.isNaN(item.percent)).toBe(false);
    });
  });
});

describe("candidateFromConclusion", () => {
  // Versi lama menebak nama dengan mencari string berurutan, sehingga kesimpulan
  // yang condong ke Chris terbaca sebagai Arya.
  it("mengembalikan kandidat yang benar-benar dicondongi", () => {
    const kind: ConclusionKind = { kind: "dua", candidates: ["Arya", "Chris"], condong: "Chris" };
    expect(candidateFromConclusion(kind)).toBe("Chris");
  });

  it("mengembalikan null saat pemain menahan diri", () => {
    expect(candidateFromConclusion({ kind: "belumCukup" })).toBeNull();
    expect(candidateFromConclusion({ kind: "tiga", candidates: ["Arya", "Bella", "Chris"] })).toBeNull();
  });
});

describe("rotateOptions", () => {
  it("deterministik dan tetap permutasi", () => {
    // Dipakai verdict.ts supaya opsi yang berlaku tidak selalu di posisi pertama.
    const asli = ["a", "b", "c", "d"];
    expect(rotateOptions(asli, 2)).toEqual(rotateOptions(asli, 2));
    expect([...rotateOptions(asli, 3)].sort()).toEqual([...asli].sort());
    expect(rotateOptions([], 3)).toEqual([]);
  });

  it("menggeser posisi mengikuti seed", () => {
    const asli = ["a", "b", "c", "d"];
    const posisi = [0, 1, 2, 3].map((seed) => rotateOptions(asli, seed).indexOf("a"));
    expect(new Set(posisi).size).toBe(4);
  });
});

describe("naskah", () => {
  it("pilihan kesimpulan selalu memuat jalan menahan diri", () => {
    const summary = makeSummary(rankCandidates(minimum, []));
    const teks = conclusionChoices(summary).map(conclusionText);
    expect(teks).toContain("Bukti yang ada belum cukup untuk menentukan satu penyebab.");
    expect(new Set(teks).size).toBe(teks.length);
  });

  it("sintesis hanya memuat baris untuk orang yang sudah diwawancarai", () => {
    const teks = makeSynthesis(["Arya", "Bella"], [], rankCandidates(["Arya", "Bella"], []));
    expect(teks).toContain("Catatan pengembalian pukul 17.48");
    expect(teks).not.toContain("Maya menguatkan keterangan");
  });

  it("tidak memakai em dash di mana pun", () => {
    const summary = makeSummary(rankCandidates(semua, []));
    const semuaTeks = [
      makeSynthesis(semua, ["Kevin"], rankCandidates(semua, ["Kevin"])),
      summary.conclusion, summary.label,
      ...conclusionChoices(summary).map(conclusionText),
      ...Object.values(strength), ...Object.values(weakness),
    ];
    semuaTeks.forEach((teks) => {
      expect(teks.includes("—"), teks.slice(0, 50)).toBe(false);
      expect(teks.includes("--"), teks.slice(0, 50)).toBe(false);
    });
  });
});
