import { describe, expect, it } from "vitest";
import { collectedSupport, sisiLain } from "./game-logic";
import { scenario } from "./scenario";
import type { ConclusionKind } from "./summary";
import {
  citationOptions, gradeFinal, keterbatasanBerlaku, keterbatasanPilihan,
  type FinalSubmission, type OutcomeId,
} from "./verdict";

const semua = ["Arya", "Kevin", "Bella", "Fajar", "Siska", "Dimas", "Rafi", "Chris", "Nina", "Leo", "Maya"];

function nilai(input: {
  conclusion: ConclusionKind;
  citations?: string[];
  keterbatasan?: string;
  interviewed?: string[];
  followedUp?: string[];
  openedEvidence?: string[];
  sumberDibaca?: boolean;
}) {
  const submission: FinalSubmission = {
    conclusion: input.conclusion,
    citations: input.citations ?? [],
    keterbatasan: input.keterbatasan ?? "lensaTidakDiperiksa",
  };
  return gradeFinal({
    submission,
    interviewed: input.interviewed ?? ["Arya", "Kevin"],
    followedUp: input.followedUp ?? [],
    openedEvidence: input.openedEvidence ?? ["pengembalian"],
    sumberDibaca: input.sumberDibaca ?? false,
  });
}

const ok = (verdict: ReturnType<typeof nilai>, id: string) => verdict.keputusan.find((item) => item.id === id)?.ok;

describe("lompatan tanpa dasar", () => {
  it("menyebut nama yang jalurnya tidak pernah disentuh", () => {
    // Jalur Chris butuh keterangan Chris atau Nina, dan keduanya tidak didengar.
    const verdict = nilai({ conclusion: { kind: "satu", candidate: "Chris" }, citations: ["saksi:Arya"] });
    expect(verdict.outcome).toBe("lompatanTanpaDasar");
    expect(ok(verdict, "dukunganTerkumpul")).toBe(false);
    expect(verdict.isi).toContain("Chris");
    expect(verdict.langkah).toContain("Nina");
  });

  it("tidak bisa dihindari dengan berpagar pada dua nama", () => {
    const verdict = nilai({
      conclusion: { kind: "dua", candidates: ["Arya", "Chris"], condong: "Chris" },
      citations: ["saksi:Kevin"],
    });
    expect(verdict.outcome).toBe("lompatanTanpaDasar");
  });

  it("menjelaskan, bukan menghakimi", () => {
    const verdict = nilai({ conclusion: { kind: "satu", candidate: "Leo" }, citations: ["saksi:Arya"] });
    expect(verdict.isi).toContain("boleh saja");
    for (const kata of ["salah", "gagal", "seharusnya kamu"]) expect(verdict.isi.toLowerCase()).not.toContain(kata);
  });
});

describe("kesimpulan hati-hati", () => {
  it("menunjuk celah memberi hasil terkuat dengan lima dari lima", () => {
    const verdict = nilai({ conclusion: { kind: "belumCukup" }, citations: ["saksi:Kevin"] });
    expect(verdict.outcome).toBe("hatiHatiKuat");
    expect(verdict.tepat).toBe(5);
    expect(verdict.ringkas).toBe("5 dari 5 keputusan sudah bertumpu pada bukti yang kamu kumpulkan.");
  });

  it("menunjuk sumber yang hanya memastikan waktu belum menunjukkan celahnya", () => {
    // Lembar pengembalian memastikan pengembalian pukul 17.48, bukan kondisi lensa.
    const verdict = nilai({ conclusion: { kind: "belumCukup" }, citations: ["bukti:pengembalian"] });
    expect(verdict.outcome).toBe("hatiHatiPerluDasar");
    expect(ok(verdict, "dasarCocok")).toBe(false);
    expect(verdict.tepat).toBe(4);
  });
});

describe("dugaan satu nama", () => {
  it("dua sisi jalur yang sama memberi dugaan beralasan", () => {
    const verdict = nilai({
      conclusion: { kind: "satu", candidate: "Arya" },
      citations: ["saksi:Kevin"],
      keterbatasan: "saksiBelumLengkap",
    });
    expect(verdict.outcome).toBe("dugaanBeralasan");
    expect(verdict.tepat).toBe(5);
    expect(verdict.isi).toContain("Kevin");
  });

  it("satu sisi saja belum cukup untuk menyebut satu penyebab", () => {
    const verdict = nilai({
      conclusion: { kind: "satu", candidate: "Arya" },
      citations: ["saksi:Arya"],
      interviewed: ["Arya"],
    });
    expect(verdict.outcome).toBe("dugaanTipis");
    expect(ok(verdict, "dukunganTerkumpul")).toBe(true);
    expect(ok(verdict, "tidakMelebihiBukti")).toBe(false);
    expect(verdict.langkah).toContain("Kevin");
  });
});

describe("menyebut beberapa jalur", () => {
  it("tiap jalur yang disebut butuh dasarnya sendiri", () => {
    const empat = ["Arya", "Kevin", "Bella", "Fajar"];
    const kuat = nilai({
      conclusion: { kind: "dua", candidates: ["Arya", "Bella"], condong: "Arya" },
      citations: ["saksi:Kevin", "saksi:Bella"],
      keterbatasan: "tanpaPendalaman",
      interviewed: empat,
    });
    expect(kuat.outcome).toBe("bandingKuat");
    expect(kuat.tepat).toBe(5);

    const timpang = nilai({
      conclusion: { kind: "dua", candidates: ["Arya", "Bella"], condong: "Arya" },
      citations: ["saksi:Kevin"],
      keterbatasan: "tanpaPendalaman",
      interviewed: empat,
    });
    expect(timpang.outcome).toBe("bandingPerluDasar");
    expect(ok(timpang, "dasarCocok")).toBe(false);
  });

  it("menahan tiga kemungkinan tidak pernah dianggap melebihi bukti", () => {
    const verdict = nilai({
      conclusion: { kind: "tiga", candidates: ["Arya", "Bella", "Dimas"] },
      citations: ["saksi:Kevin", "saksi:Bella", "saksi:Dimas"],
      keterbatasan: "tanpaPendalaman",
      interviewed: ["Arya", "Kevin", "Bella", "Fajar", "Dimas"],
    });
    expect(ok(verdict, "tidakMelebihiBukti")).toBe(true);
    expect(verdict.outcome).toBe("bandingKuat");
  });
});

describe("dasar yang ditunjuk", () => {
  it("hanya menawarkan yang sudah dibuka", () => {
    const pilihan = citationOptions(["Arya", "Bella"], ["Bella"], ["pengembalian"]);
    expect(pilihan.map((item) => item.id)).toEqual(["saksi:Arya", "saksi:Bella", "bukti:pengembalian"]);
    expect(pilihan.find((item) => item.id === "saksi:Bella")?.label).toContain("pertanyaan lanjutan");
    // Judul bukti yang belum terbuka tidak boleh bocor lewat daftar ini.
    expect(pilihan.some((item) => item.id.startsWith("bukti:foto"))).toBe(false);
  });

  it("menolak kutipan yang tidak pernah dibuka", () => {
    const verdict = nilai({ conclusion: { kind: "belumCukup" }, citations: ["bukti:foto1828"], openedEvidence: [] });
    expect(ok(verdict, "dasarTerbuka")).toBe(false);
  });

  it("tanpa dasar sama sekali tidak pernah menjadi hasil terkuat", () => {
    const verdict = nilai({ conclusion: { kind: "belumCukup" }, citations: [] });
    expect(ok(verdict, "dasarTerbuka")).toBe(false);
    expect(verdict.outcome).toBe("hatiHatiPerluDasar");
  });
});

describe("keterbatasan", () => {
  it("dinilai terhadap penyelidikan yang benar-benar dijalankan", () => {
    expect(keterbatasanBerlaku("lensaTidakDiperiksa", ["Arya"], [])).toBe(true);
    expect(keterbatasanBerlaku("saksiBelumLengkap", ["Arya"], [])).toBe(true);
    expect(keterbatasanBerlaku("saksiBelumLengkap", semua, [])).toBe(false);
    expect(keterbatasanBerlaku("tanpaPendalaman", ["Arya"], [])).toBe(true);
    expect(keterbatasanBerlaku("tanpaPendalaman", ["Arya"], ["Arya"])).toBe(false);
    expect(keterbatasanBerlaku("peringkatMembuktikan", ["Arya"], [])).toBe(false);
    expect(keterbatasanBerlaku("tidakDikenal", ["Arya"], [])).toBe(false);
  });

  it("opsinya diputar tetapi tetap lengkap", () => {
    const posisi = [0, 1, 2, 3].map((seed) => keterbatasanPilihan(seed).findIndex((item) => item.id === "lensaTidakDiperiksa"));
    expect(new Set(posisi).size).toBeGreaterThan(1);
    expect(keterbatasanPilihan(3)).toHaveLength(scenario.keterbatasan.length);
  });

  it("selalu ada lebih dari satu keterbatasan yang benar", () => {
    // Riset desainnya menuntut beberapa jawaban bisa sama-sama dinilai baik.
    const berlaku = scenario.keterbatasan.filter((item) => keterbatasanBerlaku(item.id, ["Arya", "Kevin"], []));
    expect(berlaku.length).toBeGreaterThan(1);
  });
});

describe("dukungan yang terkumpul", () => {
  it("melewati kelima tingkatnya", () => {
    expect(collectedSupport("Chris", ["Arya"], []).level).toBe("tidakAda");
    expect(collectedSupport("Arya", ["Arya"], []).level).toBe("awal");
    expect(collectedSupport("Arya", ["Arya", "Kevin"], []).level).toBe("tidakLangsung");
    expect(collectedSupport("Arya", ["Arya", "Kevin"], ["Arya"]).level).toBe("diakui");
    expect(collectedSupport("Arya", ["Arya", "Kevin"], ["Arya", "Kevin"]).level).toBe("dikuatkan");
  });

  it("menawarkan sisi lain yang benar-benar tersisa", () => {
    expect(sisiLain("Arya", ["Arya"], [])).toBe("keterangan Kevin");
    expect(sisiLain("Arya", ["Arya", "Kevin"], ["Arya"])).toBe("pertanyaan lanjutan untuk Kevin");
    expect(sisiLain("Arya", ["Arya", "Kevin"], ["Arya", "Kevin"])).toBe("sisi lain jalur itu");
  });
});

describe("naskah hasil", () => {
  const outcomes: OutcomeId[] = [
    "hatiHatiKuat", "hatiHatiPerluDasar", "bandingKuat", "bandingPerluDasar",
    "dugaanBeralasan", "dugaanTipis", "lompatanTanpaDasar",
  ];

  it("punya naskah untuk tiap hasil", () => {
    for (const id of outcomes) {
      expect(scenario.hasil[id], id).toBeTruthy();
      expect(scenario.hasil[id].langkah.length, id).toBeGreaterThan(20);
    }
    expect(Object.keys(scenario.hasil).sort()).toEqual([...outcomes].sort());
  });

  it("tidak meninggalkan token yang belum terisi", () => {
    const contoh = [
      nilai({ conclusion: { kind: "belumCukup" }, citations: ["saksi:Kevin"] }),
      nilai({ conclusion: { kind: "belumCukup" }, citations: ["bukti:pengembalian"] }),
      nilai({ conclusion: { kind: "satu", candidate: "Arya" }, citations: ["saksi:Kevin"], keterbatasan: "saksiBelumLengkap" }),
      nilai({ conclusion: { kind: "satu", candidate: "Arya" }, citations: ["saksi:Arya"], interviewed: ["Arya"] }),
      nilai({ conclusion: { kind: "satu", candidate: "Chris" }, citations: ["saksi:Arya"] }),
    ];
    for (const verdict of contoh) {
      for (const teks of [verdict.judul, verdict.isi, verdict.langkah]) {
        expect(teks, verdict.outcome).not.toMatch(/[{}]/);
        expect(teks.trim(), verdict.outcome).not.toMatch(/\s{2,}/);
      }
    }
  });

  it("menjaga nada: tanpa em dash dan tanpa label berteriak", () => {
    const naskah = [
      ...Object.values(scenario.hasil).flatMap((item) => [item.judul, item.isi, item.langkah]),
      ...scenario.keterbatasan.map((item) => item.teks),
      scenario.pesanInti,
      scenario.pelajaran.teks,
    ];
    for (const teks of naskah) {
      expect(teks.includes("—"), teks.slice(0, 40)).toBe(false);
      expect(teks.includes("--"), teks.slice(0, 40)).toBe(false);
      expect(teks, teks.slice(0, 40)).not.toMatch(/[A-Z]{3}/);
    }
  });

  it("menautkan kembali ke materi yang membahas keputusan ini", () => {
    expect(scenario.pelajaran.tautan.startsWith("/learn/")).toBe(true);
  });
});

describe("membaca sumber asli", () => {
  it("dicatat sebagai pengamatan, bukan gerbang", () => {
    const tanpa = nilai({ conclusion: { kind: "belumCukup" }, citations: ["saksi:Kevin"], sumberDibaca: false });
    const dengan = nilai({ conclusion: { kind: "belumCukup" }, citations: ["saksi:Kevin"], sumberDibaca: true });
    expect(tanpa.outcome).toBe(dengan.outcome);
    expect(tanpa.tepat).toBe(dengan.tepat);
    expect(tanpa.sumberTeks).toContain("tidak pernah membuka");
    expect(dengan.sumberTeks).toContain("sempat membuka");
  });
});
