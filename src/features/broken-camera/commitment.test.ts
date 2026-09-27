import { describe, expect, it } from "vitest";
import { catatanTerakhir, kamuDanAi, perjalananAi, perluMencatat, type Catatan } from "./commitment";
import { initialState, reducer, type GameAction, type GameState } from "./state";

function jalankan(actions: GameAction[], from: GameState = initialState): GameState {
  return actions.reduce(reducer, from);
}

function wawancarai(ids: string[]): GameAction[] {
  return ids.flatMap((id): GameAction[] => [{ type: "pilihOrang", id }, { type: "dengarkan" }]);
}

describe("ajakan mencatat dugaan", () => {
  it("tidak muncul sebelum ada satu pun keterangan", () => {
    expect(perluMencatat([], null, 0)).toBe(false);
    expect(perluMencatat([], "Arya", 0)).toBe(false);
  });

  it("muncul setelah keterangan pertama", () => {
    expect(perluMencatat([], "Arya", 1)).toBe(true);
  });

  it("menciut setelah dicatat, lalu muncul lagi saat urutan teratas AI berpindah", () => {
    const catatan: Catatan[] = [{ tebakan: "Arya", aiTop: "Arya" }];
    expect(perluMencatat(catatan, "Arya", 3)).toBe(false);
    expect(perluMencatat(catatan, "Dimas", 4)).toBe(true);
  });

  it("memilih belum mau menebak juga menutupnya untuk keadaan AI itu", () => {
    const catatan: Catatan[] = [{ tebakan: null, aiTop: "Arya" }];
    expect(perluMencatat(catatan, "Arya", 3)).toBe(false);
    expect(catatanTerakhir(catatan)?.tebakan).toBeNull();
  });
});

describe("mencatat lewat reducer", () => {
  it("tidak memakai jatah waktu", () => {
    const sebelum = jalankan([{ type: "mulai" }, ...wawancarai(["Arya", "Kevin"])]);
    const sesudah = reducer(sebelum, { type: "catatDugaan", tebakan: "Arya" });
    expect(sesudah.terpakai).toBe(sebelum.terpakai);
    expect(sesudah.catatan).toEqual([{ tebakan: "Arya", aiTop: sebelum.aiTrail[sebelum.aiTrail.length - 1] }]);
  });

  it("menyimpan urutan teratas AI saat itu, bukan saat dibaca di akhir", () => {
    // Inilah yang membuat log perbedaan bisa dihitung tanpa memutar ulang run.
    const awal = jalankan([{ type: "mulai" }, ...wawancarai(["Arya"]), { type: "catatDugaan", tebakan: "Chris" }]);
    const akhir = jalankan([...wawancarai(["Kevin", "Bella", "Fajar", "Siska", "Dimas", "Rafi"])], awal);
    expect(akhir.catatan[0].aiTop).toBe("Arya");
    expect(akhir.aiTrail[akhir.aiTrail.length - 1]).not.toBe("Arya");
  });

  it("tidak bisa mencatat sebelum ada keterangan atau sesudah penyelidikan ditutup", () => {
    const kosong = reducer(jalankan([{ type: "mulai" }]), { type: "catatDugaan", tebakan: "Arya" });
    expect(kosong.catatan).toEqual([]);

    const tertutup = jalankan([
      { type: "mulai" }, ...wawancarai(["Arya", "Bella", "Siska", "Dimas", "Rafi"]),
      { type: "akhiriPenyelidikan" }, { type: "kembaliKePenyelidikan" },
      { type: "catatDugaan", tebakan: "Arya" },
    ]);
    expect(tertutup.catatan).toEqual([]);
  });

  it("ubah membuka lagi pilihannya tanpa menumpuk dua catatan", () => {
    const state = jalankan([
      { type: "mulai" }, ...wawancarai(["Arya"]),
      { type: "catatDugaan", tebakan: "Arya" },
      { type: "ubahCatatan" },
      { type: "catatDugaan", tebakan: "Bella" },
    ]);
    expect(state.catatan).toHaveLength(1);
    expect(state.catatan[0].tebakan).toBe("Bella");
  });
});

describe("perjalanan urutan teratas AI", () => {
  it("menghitung perpindahan orang, bukan tiap tindakan", () => {
    expect(perjalananAi(["Arya", "Arya", "Arya"])).toEqual({ urutan: ["Arya"], perubahan: 0 });
    expect(perjalananAi(["Arya", "Dimas", "Dimas", "Leo"])).toEqual({ urutan: ["Arya", "Dimas", "Leo"], perubahan: 2 });
    expect(perjalananAi([])).toEqual({ urutan: [], perubahan: 0 });
  });

  it("tumbuh mengikuti keterangan yang masuk", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya", "Kevin", "Bella"])]);
    expect(state.aiTrail).toHaveLength(3);
  });
});

describe("bagian kamu dan AI", () => {
  const trail = ["Arya", "Arya", "Dimas", "Leo"] as const;

  it("selalu menampilkan angka perubahan AI, bahkan tanpa catatan pemain", () => {
    const hasil = kamuDanAi([], [...trail]);
    expect(hasil.baris[0]).toContain("2 kali");
    expect(hasil.baris[1]).toContain("tidak mencatat");
  });

  it("menyebut saat pemain menahan dugaan yang berbeda dari AI", () => {
    const hasil = kamuDanAi([{ tebakan: "Chris", aiTop: "Arya" }, { tebakan: "Chris", aiTop: "Dimas" }], [...trail]);
    expect(hasil.baris[1]).toContain("2 kali");
    expect(hasil.baris[1]).toContain("pendapat sendiri");
  });

  it("menyebut saat catatan pemain selalu mengikuti AI", () => {
    const hasil = kamuDanAi([{ tebakan: "Arya", aiTop: "Arya" }, { tebakan: "Dimas", aiTop: "Dimas" }], [...trail]);
    expect(hasil.baris[1]).toContain("ingatan");
  });

  it("melewati catatan belum mau menebak saat membandingkan", () => {
    const hasil = kamuDanAi([{ tebakan: null, aiTop: "Arya" }], [...trail]);
    expect(hasil.baris[1]).toContain("tidak mencatat");
  });

  it("menjelaskan urutan AI yang tidak pernah berpindah", () => {
    const hasil = kamuDanAi([], ["Arya", "Arya"]);
    expect(hasil.baris[0]).toContain("tidak pernah berpindah");
    expect(hasil.baris[0]).toContain("bukan tanda ia benar");
  });

  it("tidak meninggalkan token yang belum terisi", () => {
    for (const catatan of [[], [{ tebakan: "Arya", aiTop: "Arya" } as Catatan], [{ tebakan: "Chris", aiTop: "Arya" } as Catatan]]) {
      for (const baris of kamuDanAi(catatan, [...trail]).baris) expect(baris).not.toMatch(/[{}]/);
    }
  });
});
