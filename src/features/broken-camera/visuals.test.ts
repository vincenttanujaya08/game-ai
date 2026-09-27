import { describe, expect, it } from "vitest";
import { rankCandidates } from "./game-logic";
import { scenario } from "./scenario";
import { hitungBenturan, pemandu, segmenLinimasa, stasiun, toBars } from "./visuals";

const semua = ["Arya", "Kevin", "Bella", "Fajar", "Siska", "Dimas", "Rafi", "Chris", "Nina", "Leo", "Maya"];
const minimum = ["Arya", "Bella", "Siska", "Dimas", "Rafi"];

describe("toBars", () => {
  it("memberi lebar penuh pada dugaan teratas", () => {
    const bars = toBars(rankCandidates(minimum, []));
    expect(bars[0].width).toBe(100);
    expect(bars[0].teratas).toBe(true);
  });

  it("menandai jalur tanpa keterangan sebagai kosong dengan lebar nol", () => {
    const bars = toBars(rankCandidates(["Arya"], []));
    const kosong = bars.filter((bar) => bar.kosong);
    expect(kosong.length).toBeGreaterThan(0);
    kosong.forEach((bar) => {
      expect(bar.width).toBe(0);
      expect(bar.percent).toBe(0);
    });
  });

  it("tidak menandai apa pun sebagai teratas saat belum ada keterangan", () => {
    const bars = toBars(rankCandidates([], []));
    expect(bars.every((bar) => !bar.teratas)).toBe(true);
    expect(bars.every((bar) => bar.width === 0)).toBe(true);
  });

  it("lebarnya tidak pernah melebihi seratus persen", () => {
    for (const set of [["Arya"], minimum, semua]) {
      toBars(rankCandidates(set, [])).forEach((bar) => {
        expect(bar.width).toBeLessThanOrEqual(100);
        expect(bar.width).toBeGreaterThanOrEqual(0);
      });
    }
  });
});

describe("arah pergeseran peringkat", () => {
  it("tanpa pembanding, tidak ada yang ditandai bergeser", () => {
    toBars(rankCandidates(minimum, [])).forEach((bar) => {
      expect(bar.arah).toBe("tetap");
      expect(bar.tingkat).toBe(0);
    });
  });

  it("menandai jalur yang naik dan yang turun karena keterangan terakhir", () => {
    // Mendengar Kevin mengangkat jalur Arya melewati jalur lain.
    const sebelum = rankCandidates(["Bella"], []);
    const sesudah = rankCandidates(["Bella", "Arya", "Kevin"], []);
    const bars = toBars(sesudah, sebelum);
    const arya = bars.find((bar) => bar.name === "Arya");
    expect(arya?.arah).toBe("naik");
    expect(arya?.tingkat).toBeGreaterThan(0);
    expect(bars.some((bar) => bar.arah === "turun")).toBe(true);
  });

  it("jumlah yang naik dan yang turun selalu seimbang", () => {
    // Peringkat adalah permutasi, jadi tiap kenaikan menuntut penurunan.
    const sebelum = rankCandidates(["Arya"], []);
    const sesudah = rankCandidates(["Arya", "Leo", "Maya"], []);
    const bars = toBars(sesudah, sebelum);
    const naik = bars.filter((bar) => bar.arah === "naik").reduce((t, bar) => t + bar.tingkat, 0);
    const turun = bars.filter((bar) => bar.arah === "turun").reduce((t, bar) => t + bar.tingkat, 0);
    expect(naik).toBe(turun);
  });

  it("peringkat yang tidak berubah tidak menandai apa pun", () => {
    const sama = rankCandidates(minimum, []);
    expect(toBars(sama, sama).every((bar) => bar.arah === "tetap")).toBe(true);
  });
});

describe("posisi kamera di peta", () => {
  it("tidak menandai apa pun sebagai dilewati sebelum ada keterangan", () => {
    expect(stasiun([]).some((item) => item.dilewati)).toBe(false);
  });

  it("menandai seluruh ruas sampai titik terkini", () => {
    const daftar = stasiun(["Arya"]);
    const terkini = daftar.findIndex((item) => item.terkini);
    expect(terkini).toBeGreaterThanOrEqual(0);
    daftar.forEach((item, index) => expect(item.dilewati).toBe(index <= terkini));
  });

  it("seluruh perjalanan dilewati setelah semua keterangan masuk", () => {
    expect(stasiun(semua).every((item) => item.dilewati)).toBe(true);
  });
});

describe("pemandu", () => {
  it("melewati kelima tingkatnya sesuai jumlah wawancara", () => {
    expect(pemandu(0).tingkat).toBe("awal");
    expect(pemandu(2).tingkat).toBe("awal");
    expect(pemandu(3).tingkat).toBe("belumCukup");
    expect(pemandu(scenario.meta.batasWawancaraAkhir).tingkat).toBe("bolehAkhiri");
    expect(pemandu(8).tingkat).toBe("luas");
    expect(pemandu(scenario.tokoh.length).tingkat).toBe("lengkap");
  });

  it("menyebut sisa wawancara yang tepat sebelum batas tercapai", () => {
    expect(pemandu(3).teks).toContain(String(scenario.meta.batasWawancaraAkhir - 3));
  });

  it("tidak memakai em dash", () => {
    for (let n = 0; n <= scenario.tokoh.length; n += 1) {
      expect(pemandu(n).teks.includes("—")).toBe(false);
      expect(pemandu(n).teks.includes("--")).toBe(false);
    }
  });
});

describe("stasiun perjalanan kamera", () => {
  it("menutup semuanya sebelum ada wawancara", () => {
    // Premis kasus, yaitu kamera ditemukan retak di dalam peti, tidak boleh
    // membuat sebuah tempat tampak sudah ditelusuri.
    expect(stasiun([]).some((item) => item.terbuka)).toBe(false);
  });

  it("menandai paling banyak satu stasiun terkini", () => {
    expect(stasiun([]).filter((item) => item.terkini)).toHaveLength(0);
    for (const set of [["Arya"], minimum, semua]) {
      expect(stasiun(set).filter((item) => item.terkini)).toHaveLength(1);
    }
  });

  it("terkini adalah titik terjauh yang sudah diketahui", () => {
    expect(stasiun(["Arya"]).find((item) => item.terkini)?.id).toBe("meja");
    expect(stasiun(semua).find((item) => item.terkini)?.id).toBe("multimedia");
  });

  it("membuka seluruh stasiun setelah semua keterangan masuk", () => {
    expect(stasiun(semua).every((item) => item.terbuka)).toBe(true);
  });

  it("urutannya mengikuti perjalanan kamera", () => {
    expect(stasiun([]).map((item) => item.id)).toEqual(["tangan", "meja", "peti", "multimedia"]);
  });
});

describe("linimasa", () => {
  it("menandai beat sebagai terbuka hanya setelah saksinya didengar", () => {
    const tertutup = segmenLinimasa([]).find((beat) => beat.butuh.includes("Kevin"));
    expect(tertutup?.terbuka).toBe(false);
    const terbuka = segmenLinimasa(["Kevin"]).find((beat) => beat.butuh.includes("Kevin"));
    expect(terbuka?.terbuka).toBe(true);
  });

  it("menyebut nama pembukanya, bukan idnya", () => {
    const beat = segmenLinimasa([]).find((item) => item.butuh.length > 0);
    expect(beat?.pembuka.length).toBeGreaterThan(0);
    expect(beat?.pembuka[0]).not.toBe("");
  });

  it("menghitung kemungkinan benturan yang sudah terbuka", () => {
    expect(hitungBenturan(segmenLinimasa([])).terbuka).toBe(0);
    const penuh = hitungBenturan(segmenLinimasa(semua));
    expect(penuh.terbuka).toBe(penuh.total);
    expect(penuh.total).toBe(5);
  });

  it("setiap beat punya tempat yang dikenal", () => {
    const dikenal = scenario.tempat.map((item) => item.id);
    scenario.linimasa.forEach((beat) => expect(dikenal).toContain(beat.tempat));
  });

  it("isinya tidak memakai em dash", () => {
    scenario.linimasa.forEach((beat) => {
      expect(beat.isi.includes("—")).toBe(false);
      expect((beat.catatan ?? "").includes("—")).toBe(false);
    });
  });
});
