import { describe, expect, it } from "vitest";
import { anggaran, harga, mampu } from "./budget";
import { scenario } from "./scenario";
import { initialState, reducer, type GameAction, type GameState } from "./state";

function jalankan(actions: GameAction[], from: GameState = initialState): GameState {
  return actions.reduce(reducer, from);
}

function wawancarai(ids: string[]): GameAction[] {
  return ids.flatMap((id): GameAction[] => [{ type: "pilihOrang", id }, { type: "dengarkan" }]);
}

const minimum = ["Arya", "Bella", "Siska", "Dimas", "Rafi"];

describe("alur penyelidikan", () => {
  it("mulai memindahkan tahap tanpa mengubah apa pun yang lain", () => {
    const state = reducer(initialState, { type: "mulai" });
    expect(state.stage).toBe("selidik");
    expect(state.interviewed).toEqual([]);
    expect(state.terpakai).toBe(0);
  });

  it("mendengarkan keterangan mencatat orangnya dan menambah riwayat", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya"])]);
    expect(state.interviewed).toEqual(["Arya"]);
    expect(state.history).toHaveLength(1);
    expect(state.history[0].trigger).toContain("Arya");
  });

  it("tidak mencatat orang yang sama dua kali", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya", "Arya"])]);
    expect(state.interviewed).toEqual(["Arya"]);
    expect(state.history).toHaveLength(1);
  });

  it("menolak pertanyaan lanjutan sebelum keterangan awal didengar", () => {
    const state = jalankan([{ type: "mulai" }, { type: "pilihOrang", id: "Arya" }, { type: "tanyaLanjut" }]);
    expect(state.followedUp).toEqual([]);
  });

  it("membelanjakan jatah waktu untuk tiap tindakan", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya", "Bella"]), { type: "pilihOrang", id: "Arya" }, { type: "tanyaLanjut" }]);
    expect(state.terpakai).toBe(harga.wawancara * 2 + harga.dalami);
  });

  it("pertanyaan lanjutan dibatasi jatah waktu, bukan kuota terpisah", () => {
    // Empat wawancara lalu pendalaman sampai jatahnya tidak cukup lagi. Yang
    // menahan pendalaman keempat adalah cadangan menuju batas wawancara, jadi
    // pemain tidak bisa mengunci diri di bawah batas itu.
    const empat = ["Arya", "Bella", "Siska", "Dimas"];
    const state = jalankan([
      { type: "mulai" },
      ...wawancarai(empat),
      ...empat.flatMap((id): GameAction[] => [{ type: "pilihOrang", id }, { type: "tanyaLanjut" }]),
    ]);
    expect(state.terpakai).toBeLessThanOrEqual(anggaran);
    expect(state.followedUp).toHaveLength(3);
    expect(state.closed).toBe(false);
    expect(mampu("wawancara", state.terpakai, state.interviewed.length)).toBe(true);
  });

  it("membelanjakan sisa terakhir pada wawancara lalu menutup sendiri", () => {
    // Jalur dalam: empat wawancara, tiga pendalaman, lalu dua wawancara
    // terakhir yang menghabiskan jatah tepat di 720 detik.
    const empat = ["Arya", "Bella", "Siska", "Dimas"];
    const dalam = jalankan([
      { type: "mulai" },
      ...wawancarai(empat),
      ...empat.flatMap((id): GameAction[] => [{ type: "pilihOrang", id }, { type: "tanyaLanjut" }]),
      ...wawancarai(["Kevin"]),
    ]);
    // Rencana "lima wawancara minimum dan tiga pendalaman" mendarat di 660.
    expect(dalam.interviewed).toHaveLength(scenario.meta.batasWawancaraAkhir);
    expect(dalam.followedUp).toHaveLength(3);
    expect(dalam.terpakai).toBe(660);
    expect(dalam.closed).toBe(false);

    const habis = jalankan(wawancarai(["Fajar"]), dalam);
    expect(habis.terpakai).toBe(anggaran);
    expect(habis.closed).toBe(true);
    expect(habis.stage).toBe("akhir");
    expect(habis.followedUp).toHaveLength(3);
  });

});

describe("mengakhiri penyelidikan", () => {
  it("menahan penutupan sebelum batas wawancara tercapai", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya"]), { type: "akhiriPenyelidikan" }]);
    expect(state.stage).toBe("selidik");
    expect(state.notice).toContain("orang lagi");
  });

  it("membuka tahap akhir setelah batasnya terpenuhi", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(minimum), { type: "akhiriPenyelidikan" }]);
    expect(state.stage).toBe("akhir");
    expect(state.interviewed).toHaveLength(scenario.meta.batasWawancaraAkhir);
  });

  it("jatah habis menutup penyelidikan lewat jalur yang sama", () => {
    // Belanjakan seluruh jatah dengan pendalaman, lalu satu wawancara terakhir.
    const dasar = jalankan([{ type: "mulai" }, ...wawancarai(minimum)]);
    const habis = { ...dasar, terpakai: anggaran - harga.wawancara };
    const state = reducer({ ...habis, selected: "Kevin" }, { type: "dengarkan" });
    expect(state.stage).toBe("akhir");
    expect(state.closed).toBe(true);
    expect(state.notice).toContain("Jatah waktu kasus sudah habis");
  });

  it("jalur luas menutup sendiri dengan alasan yang tepat", () => {
    // Sebelas wawancara memakai 660 detik. Sisa 60 tidak cukup untuk satu
    // pertanyaan lanjutan, jadi tidak ada lagi yang bisa dibeli meski jatahnya
    // belum nol. Pesannya tidak boleh mengaku jatahnya habis.
    const semua = scenario.tokoh.map((person) => person.id);
    const state = jalankan([{ type: "mulai" }, ...wawancarai(semua)]);
    expect(state.interviewed).toHaveLength(scenario.tokoh.length);
    expect(state.terpakai).toBe(660);
    expect(state.closed).toBe(true);
    expect(state.stage).toBe("akhir");
    expect(state.notice).toContain("Semua orang sudah kamu dengarkan");
    expect(state.notice).not.toContain("habis.");
  });

  it("penutupan mengosongkan keputusan yang terlanjur terisi", () => {
    // Versi lama melewatkan reset ini di salah satu jalur penutupan.
    const dasar = jalankan([{ type: "mulai" }, ...wawancarai(minimum)]);
    const terisi: GameState = { ...dasar, decision: "ubah", conclusion: { kind: "belumCukup" }, citations: ["saksi:Arya"], keterbatasan: "lensaTidakDiperiksa" };
    const state = reducer(terisi, { type: "akhiriPenyelidikan" });
    expect(state.decision).toBeNull();
    expect(state.conclusion).toBeNull();
    expect(state.citations).toEqual([]);
    expect(state.keterbatasan).toBe("");
  });

  it("penyelidikan tertutup menolak tindakan baru", () => {
    const tertutup = jalankan([{ type: "mulai" }, ...wawancarai(minimum), { type: "akhiriPenyelidikan" }, { type: "kembaliKePenyelidikan" }]);
    expect(tertutup.closed).toBe(true);
    const coba = jalankan([{ type: "pilihOrang", id: "Kevin" }, { type: "dengarkan" }], tertutup);
    expect(coba.interviewed).toEqual(tertutup.interviewed);
    const dalami = jalankan([{ type: "pilihOrang", id: "Arya" }, { type: "tanyaLanjut" }], tertutup);
    expect(dalami.followedUp).toEqual(tertutup.followedUp);
  });

  it("konfirmasi hanya terbuka setelah batas wawancara terpenuhi", () => {
    const belum = jalankan([{ type: "mulai" }, ...wawancarai(["Arya"]), { type: "konfirmasiAkhiri", buka: true }]);
    expect(belum.konfirmasi).toBe(false);
    expect(belum.notice).toContain("orang lagi");

    const cukup = jalankan([{ type: "mulai" }, ...wawancarai(minimum), { type: "konfirmasiAkhiri", buka: true }]);
    expect(cukup.konfirmasi).toBe(true);
    expect(reducer(cukup, { type: "konfirmasiAkhiri", buka: false }).konfirmasi).toBe(false);
  });
});

describe("keputusan akhir", () => {
  const sesudahPenyelidikan = jalankan([{ type: "mulai" }, ...wawancarai(minimum), { type: "akhiriPenyelidikan" }]);

  it("memakai rangkuman AI langsung mengisi kesimpulannya", () => {
    const state = reducer(sesudahPenyelidikan, {
      type: "pilihMode", mode: "gunakan", topCandidate: { kind: "satu", candidate: "Dimas" },
    });
    expect(state.decision).toBe("gunakan");
    expect(state.conclusion).toEqual({ kind: "satu", candidate: "Dimas" });
  });

  it("mengubah kesimpulan mengosongkan pilihan sampai pemain memilih", () => {
    const state = reducer(sesudahPenyelidikan, {
      type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" },
    });
    expect(state.conclusion).toBeNull();
  });

  it("menolak simpan sebelum dasar dan keterbatasan terisi", () => {
    const tanpaKeterbatasan = jalankan([
      { type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" } },
      { type: "pilihKesimpulan", conclusion: { kind: "belumCukup" } },
      { type: "tunjukDasar", id: "saksi:Bella" },
      { type: "simpanKeputusan" },
    ], sesudahPenyelidikan);
    expect(tanpaKeterbatasan.stage).toBe("akhir");

    const tanpaDasar = jalankan([
      { type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" } },
      { type: "pilihKesimpulan", conclusion: { kind: "belumCukup" } },
      { type: "pilihKeterbatasan", id: "lensaTidakDiperiksa" },
      { type: "simpanKeputusan" },
    ], sesudahPenyelidikan);
    expect(tanpaDasar.stage).toBe("akhir");
  });

  it("meloloskan simpan setelah keduanya terisi", () => {
    const penuh = jalankan([
      { type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" } },
      { type: "pilihKesimpulan", conclusion: { kind: "belumCukup" } },
      { type: "tunjukDasar", id: "saksi:Bella" },
      { type: "pilihKeterbatasan", id: "lensaTidakDiperiksa" },
      { type: "simpanKeputusan" },
    ], sesudahPenyelidikan);
    expect(penuh.stage).toBe("hasil");
  });

  it("menunjuk dasar bisa dibatalkan dan dibatasi tiga", () => {
    const dua = jalankan([
      { type: "tunjukDasar", id: "saksi:Arya" },
      { type: "tunjukDasar", id: "saksi:Bella" },
      { type: "tunjukDasar", id: "saksi:Arya" },
    ], sesudahPenyelidikan);
    expect(dua.citations).toEqual(["saksi:Bella"]);

    const penuh = jalankan([
      { type: "tunjukDasar", id: "saksi:Arya" },
      { type: "tunjukDasar", id: "saksi:Bella" },
      { type: "tunjukDasar", id: "saksi:Siska" },
      { type: "tunjukDasar", id: "saksi:Dimas" },
    ], sesudahPenyelidikan);
    expect(penuh.citations).toHaveLength(3);
    expect(penuh.citations).not.toContain("saksi:Dimas");
    expect(penuh.notice).toContain("paling banyak 3");
  });

  it("mengganti kesimpulan mengosongkan dasar yang sudah terlanjur ditunjuk", () => {
    const state = jalankan([
      { type: "pilihMode", mode: "ubah", topCandidate: { kind: "satu", candidate: "Dimas" } },
      { type: "pilihKesimpulan", conclusion: { kind: "satu", candidate: "Leo" } },
      { type: "tunjukDasar", id: "saksi:Arya" },
      { type: "pilihKeterbatasan", id: "lensaTidakDiperiksa" },
      { type: "pilihKesimpulan", conclusion: { kind: "belumCukup" } },
    ], sesudahPenyelidikan);
    expect(state.citations).toEqual([]);
    expect(state.keterbatasan).toBe("");
  });
});

describe("membaca sumber asli", () => {
  it("mencatat sekali dan tidak pernah mencabutnya", () => {
    const belum = jalankan([{ type: "mulai" }, { type: "gantiTab", tab: "riwayat" }]);
    expect(belum.sumberDibaca).toBe(false);
    const sudah = jalankan([{ type: "gantiTab", tab: "sumber" }, { type: "gantiTab", tab: "teori" }], belum);
    expect(sudah.sumberDibaca).toBe(true);
  });
});

describe("bukti dan catatan", () => {
  it("membuka bukti mencatatnya sebagai sudah dibuka", () => {
    const state = jalankan([{ type: "mulai" }, ...wawancarai(["Arya"]), { type: "bukaBukti", id: "pengembalian" }]);
    expect(state.openedEvidence).toEqual(["pengembalian"]);
    expect(state.showEvidence).toBe("pengembalian");
  });

  it("menutup bukti tidak menghapus catatan bahwa bukti pernah dibuka", () => {
    const state = jalankan([
      { type: "mulai" }, ...wawancarai(["Arya"]),
      { type: "bukaBukti", id: "pengembalian" }, { type: "tutupBukti" },
    ]);
    expect(state.showEvidence).toBeNull();
    expect(state.openedEvidence).toEqual(["pengembalian"]);
  });
});

describe("mengulang", () => {
  it("mengembalikan seluruh keadaan ke awal", () => {
    const state = jalankan([
      { type: "mulai" }, ...wawancarai(minimum),
      { type: "bukaBukti", id: "pengembalian" },
      { type: "akhiriPenyelidikan" },
      { type: "ulangi" },
    ]);
    expect(state).toEqual(initialState);
  });
});
