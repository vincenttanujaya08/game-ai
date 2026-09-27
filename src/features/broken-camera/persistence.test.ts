import { describe, expect, it } from "vitest";
import { kunciSimpanan, bacaRun, hapusRun, simpanRun, type Penyimpanan } from "./persistence";
import { initialState, reducer, type GameAction, type GameState } from "./state";

/** Store palsu di memori: vitest di repo ini berjalan di node tanpa DOM. */
function buatStore(awal: Record<string, string> = {}): Penyimpanan & { isi: Record<string, string> } {
  const isi = { ...awal };
  return {
    isi,
    getItem: (kunci) => isi[kunci] ?? null,
    setItem: (kunci, nilai) => { isi[kunci] = nilai; },
    removeItem: (kunci) => { delete isi[kunci]; },
  };
}

function jalankan(actions: GameAction[], from: GameState = initialState): GameState {
  return actions.reduce(reducer, from);
}

function wawancarai(ids: string[]): GameAction[] {
  return ids.flatMap((id): GameAction[] => [{ type: "pilihOrang", id }, { type: "dengarkan" }]);
}

const berjalan = jalankan([
  { type: "mulai" },
  ...wawancarai(["Arya", "Kevin", "Bella"]),
  { type: "pilihOrang", id: "Arya" }, { type: "tanyaLanjut" },
  { type: "bukaBukti", id: "pengembalian" },
  { type: "gantiTab", tab: "sumber" },
  { type: "catatDugaan", tebakan: "Bella" },
]);

const simpan = (state: GameState) => {
  const store = buatStore();
  simpanRun(store, state);
  return store;
};

describe("menyimpan dan memulihkan", () => {
  it("memulihkan penyelidikan yang sedang berjalan", () => {
    const pulih = bacaRun(simpan(berjalan));
    expect(pulih).toBeTruthy();
    expect(pulih?.interviewed).toEqual(berjalan.interviewed);
    expect(pulih?.followedUp).toEqual(berjalan.followedUp);
    expect(pulih?.terpakai).toBe(berjalan.terpakai);
    expect(pulih?.openedEvidence).toEqual(["pengembalian"]);
    expect(pulih?.sumberDibaca).toBe(true);
    expect(pulih?.catatan).toEqual(berjalan.catatan);
    expect(pulih?.aiTrail).toEqual(berjalan.aiTrail);
  });

  it("tidak menyimpan apa pun sebelum ada yang layak dilanjutkan", () => {
    const store = buatStore();
    simpanRun(store, initialState);
    expect(store.getItem(kunciSimpanan)).toBeNull();

    // Penyelidikan yang baru dibuka tanpa satu pun wawancara juga tidak
    // ditawarkan, karena melanjutkannya sama saja dengan mulai baru.
    simpanRun(store, jalankan([{ type: "mulai" }]));
    expect(store.getItem(kunciSimpanan)).toBeNull();
    expect(bacaRun(store)).toBeNull();
  });

  it("memulihkan tahap akhir sebagai penyelidikan, bukan keputusan setengah jadi", () => {
    const diAkhir = jalankan([
      ...wawancarai(["Siska", "Dimas"]),
      { type: "akhiriPenyelidikan" },
      { type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" } },
      { type: "pilihKesimpulan", conclusion: { kind: "belumCukup" } },
    ], berjalan);
    const pulih = bacaRun(simpan(diAkhir));
    expect(pulih?.stage).toBe("selidik");
    expect(pulih?.closed).toBe(true);
    expect(pulih?.conclusion).toBeNull();
    expect(pulih?.citations).toEqual([]);
  });

  it("menghapus simpanan", () => {
    const store = simpan(berjalan);
    hapusRun(store);
    expect(bacaRun(store)).toBeNull();
  });
});

describe("menyanitasi simpanan yang rusak", () => {
  const rusak = (ubah: (data: Record<string, unknown>) => void) => {
    const store = simpan(berjalan);
    const data = JSON.parse(store.getItem(kunciSimpanan) as string) as Record<string, unknown>;
    ubah(data);
    store.setItem(kunciSimpanan, JSON.stringify(data));
    return bacaRun(store);
  };

  it("membuang seluruh simpanan saat ada id tak dikenal", () => {
    // Tambalan separuh bisa menghasilkan keadaan yang tidak mungkin dicapai
    // dengan bermain, dan itu lebih membingungkan daripada mulai bersih.
    expect(rusak((data) => { (data.interviewed as string[]).push("Hantu"); })).toBeNull();
    expect(rusak((data) => { data.openedEvidence = ["berkasHilang"]; })).toBeNull();
    expect(rusak((data) => { data.selected = "Hantu"; })).toBeNull();
  });

  it("membuang urutan wawancara yang melanggar graf saksi", () => {
    // Maya tidak mungkin didengar sebelum Leo.
    expect(rusak((data) => { data.interviewed = ["Arya", "Maya"]; })).toBeNull();
    expect(rusak((data) => { data.interviewed = ["Kevin"]; })).toBeNull();
  });

  it("membuang pendalaman untuk orang yang tidak pernah diwawancarai", () => {
    expect(rusak((data) => { data.followedUp = ["Maya"]; })).toBeNull();
  });

  it("membuang jatah waktu yang mustahil", () => {
    expect(rusak((data) => { data.terpakai = -60; })).toBeNull();
    expect(rusak((data) => { data.terpakai = 99999; })).toBeNull();
    expect(rusak((data) => { data.terpakai = "banyak"; })).toBeNull();
  });

  it("membuang tahap dan tab yang tidak dikenal", () => {
    expect(rusak((data) => { data.stage = "entah"; })).toBeNull();
    expect(rusak((data) => { data.tab = "entah"; })).toBeNull();
  });

  it("membuang catatan dugaan yang menyebut jalur tak dikenal", () => {
    expect(rusak((data) => { data.catatan = [{ tebakan: "Hantu", aiTop: "Arya" }]; })).toBeNull();
    expect(rusak((data) => { data.aiTrail = ["Hantu"]; })).toBeNull();
  });

  it("tidak pernah melempar, apa pun isi penyimpanannya", () => {
    expect(bacaRun(buatStore({ [kunciSimpanan]: "bukan json" }))).toBeNull();
    expect(bacaRun(buatStore({ [kunciSimpanan]: "null" }))).toBeNull();
    expect(bacaRun(buatStore({ [kunciSimpanan]: "[]" }))).toBeNull();
    expect(bacaRun(buatStore())).toBeNull();
  });

  it("menelan galat penyimpanan tanpa menghentikan permainan", () => {
    const menolak: Penyimpanan = {
      getItem: () => { throw new Error("ditolak"); },
      setItem: () => { throw new Error("kuota penuh"); },
      removeItem: () => { throw new Error("ditolak"); },
    };
    expect(() => simpanRun(menolak, berjalan)).not.toThrow();
    expect(() => hapusRun(menolak)).not.toThrow();
    expect(bacaRun(menolak)).toBeNull();
  });
});
