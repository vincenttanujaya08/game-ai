import { describe, expect, it } from "vitest";
import { anggaran, harga } from "./budget";
import { calonWawancara, jalurLain } from "./counterfactual";
import { rankCandidates } from "./game-logic";
import { scenario } from "./scenario";
import { makeSummary } from "./summary";

const semua = scenario.tokoh.map((orang) => orang.id);
const minimum = ["Arya", "Bella", "Siska", "Dimas", "Rafi"];

describe("calon wawancara", () => {
  it("hanya menawarkan orang yang sudah terbuka tetapi belum didengar", () => {
    const calon = calonWawancara(["Arya"]);
    expect(calon).toContain("Kevin");
    expect(calon).not.toContain("Arya");
    // Maya baru terbuka setelah Leo, jadi menawarkannya di sini akan menyesatkan.
    expect(calon).not.toContain("Maya");
  });

  it("kosong setelah semua orang didengar", () => {
    expect(calonWawancara(semua)).toEqual([]);
  });
});

describe("jalur lain yang belum ditempuh", () => {
  it("selalu memuat panel kesebelas keterangan", () => {
    for (const set of [["Arya"], minimum, semua]) {
      expect(jalurLain(set, [], set.length * harga.wawancara).some((item) => item.id === "semua")).toBe(true);
    }
  });

  it("panel kesebelas keterangan berujung di bentuk terbuka", () => {
    // Inilah bayarannya: data paling lengkap justru membuat AI berhenti
    // menyebut satu nama.
    expect(makeSummary(rankCandidates(semua, [])).shape).toBe("tiga");
    const teks = jalurLain(minimum, [], 300).find((item) => item.id === "semua")?.teks ?? "";
    expect(teks).toContain("3 jalur");
  });

  it("tidak menawarkan pendalaman saat jatahnya tidak cukup", () => {
    const habis = jalurLain(minimum, [], anggaran);
    expect(habis.some((item) => item.id.startsWith("dalami:"))).toBe(false);
  });

  it("tidak menawarkan wawancara saat semua orang sudah didengar", () => {
    const penuh = jalurLain(semua, [], semua.length * harga.wawancara);
    expect(penuh.some((item) => item.id.startsWith("wawancara:"))).toBe(false);
  });

  it("menyebut perpindahan sebagai pergeseran peringkat, bukan pengungkapan pelaku", () => {
    const daftar = jalurLain(["Arya", "Kevin"], [], 120);
    const pindah = daftar.find((item) => item.id.startsWith("wawancara:"));
    expect(pindah).toBeTruthy();
    expect(pindah?.tafsir).toContain("bukan tanda");
  });

  it("naskahnya tidak pernah menyebut pelaku, seharusnya, atau terbukti", () => {
    const terlarang = ["pelaku", "sebenarnya", "terbukti", "seharusnya"];
    for (const set of [["Arya"], ["Arya", "Kevin"], minimum, semua]) {
      for (const item of jalurLain(set, [], set.length * harga.wawancara)) {
        for (const kata of terlarang) {
          expect(`${item.teks} ${item.tafsir}`.toLowerCase(), item.id).not.toContain(kata);
        }
      }
    }
    expect(scenario.andaiKata.penutup.toLowerCase()).not.toContain("terbukti");
  });

  it("tidak meninggalkan token yang belum terisi", () => {
    for (const set of [["Arya"], ["Arya", "Kevin"], minimum, semua]) {
      for (const item of jalurLain(set, ["Arya"], 300)) {
        expect(item.teks, item.id).not.toMatch(/[{}]/);
        expect(item.tafsir, item.id).not.toMatch(/[{}]/);
      }
    }
  });

  it("baris penutupnya menegaskan tidak ada penyebab rahasia", () => {
    expect(scenario.andaiKata.penutup).toContain("Tidak ada penyebab rahasia");
  });
});
