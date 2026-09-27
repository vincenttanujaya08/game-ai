import { describe, expect, it } from "vitest";
import { compileCheck, grade } from "./grade";
import type { ArrangeActivity, EstimateActivity, PredictActivity, PromptLabActivity, SpotActivity } from "./types";

describe("grade · predict", () => {
  const activity: PredictActivity = {
    kind: "predict",
    prompt: "Mana yang paling membantu?",
    options: [
      { label: "A", correct: false, feedback: "A kurang netral." },
      { label: "B", correct: true, feedback: "B membandingkan dua sisi." },
    ],
    reveal: "Bandingkan dua sisi sebelum memutuskan.",
  };

  it("menandai pilihan benar", () => {
    expect(grade(activity, 1)).toEqual({ solved: true, hits: ["B"], misses: [], message: "B membandingkan dua sisi." });
  });

  it("menandai pilihan salah tanpa mengunci", () => {
    const verdict = grade(activity, 0);
    expect(verdict.solved).toBe(false);
    expect(verdict.message).toBe("A kurang netral.");
  });

  it("menolak respons yang bukan indeks", () => {
    expect(grade(activity, null).solved).toBe(false);
    expect(grade(activity, 9).solved).toBe(false);
    expect(grade(activity, 1.5).solved).toBe(false);
  });
});

describe("grade · spot", () => {
  const activity: SpotActivity = {
    kind: "spot",
    mode: "flaw",
    lead: "Jawaban AI berikut punya dua masalah.",
    spans: [
      { id: "s1", text: "Kalimat aman.", target: false, why: "Ini didukung dokumen." },
      { id: "s2", text: "Angka tanpa sumber.", target: true, why: "Angkanya tidak ada di dokumen." },
      { id: "s3", text: "Sitasi yang tidak cocok.", target: true, why: "Sitasinya membahas topik lain." },
    ],
    requiredHits: 2,
    reveal: "Dua bagian itu perlu diperiksa ke sumber aslinya.",
  };

  it("selesai kalau semua sasaran ditemukan tanpa salah tanda", () => {
    const verdict = grade(activity, ["s2", "s3"]);
    expect(verdict.solved).toBe(true);
    expect(verdict.hits).toEqual(["s2", "s3"]);
    expect(verdict.message).toBe(activity.reveal);
  });

  it("memberi kredit sebagian saat baru satu yang ditemukan", () => {
    const verdict = grade(activity, ["s2"]);
    expect(verdict.solved).toBe(false);
    expect(verdict.hits).toEqual(["s2"]);
    expect(verdict.misses).toEqual(["s3"]);
    expect(verdict.message).toContain("1 lagi");
  });

  it("menolak saat bagian yang benar ikut ditandai", () => {
    const verdict = grade(activity, ["s1", "s2", "s3"]);
    expect(verdict.solved).toBe(false);
    expect(verdict.misses).toContain("s1");
  });

  it("meminta tanda pertama saat belum ada pilihan", () => {
    expect(grade(activity, []).solved).toBe(false);
    expect(grade(activity, "bukan array").solved).toBe(false);
  });
});

describe("grade · arrange (pengurutan)", () => {
  const activity: ArrangeActivity = {
    kind: "arrange",
    instruction: "Urutkan langkahnya.",
    items: [
      { id: "a", label: "Tulis prompt" },
      { id: "b", label: "Tinjau hasil" },
      { id: "c", label: "Beri masukan" },
    ],
    answer: ["a", "b", "c"],
    reveal: "Tinjau dulu sebelum memberi masukan.",
  };

  it("selesai untuk urutan tepat", () => {
    expect(grade(activity, ["a", "b", "c"])).toMatchObject({ solved: true, misses: [] });
  });

  it("menghitung posisi yang sudah tepat", () => {
    const verdict = grade(activity, ["a", "c", "b"]);
    expect(verdict.solved).toBe(false);
    expect(verdict.hits).toEqual(["a"]);
    expect(verdict.message).toContain("1 dari 3");
  });

  it("menolak daftar yang belum lengkap", () => {
    expect(grade(activity, ["a", "b"]).solved).toBe(false);
  });
});

describe("grade · arrange (pencocokan)", () => {
  const activity: ArrangeActivity = {
    kind: "arrange",
    instruction: "Cocokkan tiap potongan.",
    items: [
      { id: "ringkas", label: "Buat ringkasan laporan ini." },
      { id: "audiens", label: "Untuk ketua organisasi nonteknis." },
    ],
    buckets: [
      { id: "task", label: "Task" },
      { id: "context", label: "Context" },
    ],
    answer: { ringkas: "task", audiens: "context" },
    reveal: "Task adalah pekerjaannya, Context adalah latarnya.",
  };

  it("selesai untuk penempatan tepat", () => {
    expect(grade(activity, { ringkas: "task", audiens: "context" })).toMatchObject({ solved: true });
  });

  it("menandai item yang tertukar", () => {
    const verdict = grade(activity, { ringkas: "context", audiens: "context" });
    expect(verdict.solved).toBe(false);
    expect(verdict.hits).toEqual(["audiens"]);
    expect(verdict.misses).toEqual(["ringkas"]);
  });

  it("menolak penempatan yang belum lengkap", () => {
    expect(grade(activity, { ringkas: "task" }).solved).toBe(false);
    expect(grade(activity, null).solved).toBe(false);
  });
});

describe("grade · estimate", () => {
  const activity: EstimateActivity = {
    kind: "estimate",
    question: "Berapa persen pasien yang dipanggil kembali?",
    min: 0,
    max: 40,
    step: 0.1,
    unit: "persen",
    answer: 14.8,
    tolerance: 3,
    reveal: "Naik 14,8 persen. Manfaat dan beban tambahan datang bersamaan.",
  };

  it("menerima tebakan di dalam toleransi, termasuk batasnya", () => {
    expect(grade(activity, 14.8).solved).toBe(true);
    expect(grade(activity, 17.8).solved).toBe(true);
    expect(grade(activity, 11.8).solved).toBe(true);
  });

  it("menolak tepat di luar toleransi dan menyebut arahnya", () => {
    const high = grade(activity, 17.9);
    expect(high.solved).toBe(false);
    expect(high.message).toContain("lebih tinggi");
    expect(grade(activity, 11.7).message).toContain("lebih rendah");
  });

  it("menolak respons yang bukan angka", () => {
    expect(grade(activity, "14.8").solved).toBe(false);
    expect(grade(activity, Number.NaN).solved).toBe(false);
  });
});

describe("grade · promptLab", () => {
  const activity: PromptLabActivity = {
    kind: "promptLab",
    task: "Tulis ulang pertanyaan yang mengarahkan.",
    startPrompt: "Ide saya pasti laku, kan?",
    checks: [
      { id: "netral", label: "Tidak mengarahkan", pattern: "kan\\s*\\?", hint: "Buang ‘…, kan?’ di akhir." },
      { id: "risiko", label: "Menyebut risiko", pattern: "risiko|kelemahan", hint: "Minta juga sisi risikonya." },
    ],
    outputs: { weak: "Jawaban yang mendukung.", strong: "Jawaban yang membandingkan." },
  };

  it("menandai syarat yang terpenuhi", () => {
    const verdict = grade(activity, "Bandingkan peluang dan risiko usaha ini.");
    expect(verdict.hits).toEqual(["risiko"]);
    expect(verdict.misses).toEqual(["netral"]);
    expect(verdict.message).toContain("1 dari 2");
  });

  it("meminta isi saat prompt kosong", () => {
    expect(grade(activity, "   ").solved).toBe(false);
    expect(grade(activity, 42).solved).toBe(false);
  });

  it("pattern rusak dihitung belum terpenuhi, bukan melempar", () => {
    const broken: PromptLabActivity = {
      ...activity,
      checks: [{ id: "rusak", label: "Rusak", pattern: "([unclosed", hint: "tidak dipakai" }],
    };
    expect(compileCheck("([unclosed")).toBeNull();
    const verdict = grade(broken, "teks apa pun");
    expect(verdict.solved).toBe(false);
    expect(verdict.misses).toEqual(["rusak"]);
  });
});
