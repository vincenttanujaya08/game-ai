import { describe, expect, it } from "vitest";
import {
  adaAksiTerjangkau, alasanTidakMampu, anggaran, batasWawancara, cadangan,
  formatSisa, harga, mampu, nudge, sisa,
} from "./budget";
import { isUnlocked, personById, scenario } from "./scenario";
import { initialState, reducer, type GameAction, type GameState } from "./state";

describe("harga tindakan", () => {
  it("memakai angka dari skenario", () => {
    expect(harga.wawancara).toBe(60);
    expect(harga.dalami).toBe(120);
  });

  it("satu pertanyaan lanjutan berharga tepat dua wawancara", () => {
    // Kalimat ini dipakai apa adanya di aturan pembuka dan di peringatan ambang.
    expect(harga.dalami).toBe(harga.wawancara * 2);
  });

  it("menjaga ketiga rencana bermain tetap berbeda tajam", () => {
    const biaya = (wawancara: number, dalami: number) => wawancara * harga.wawancara + dalami * harga.dalami;
    expect(biaya(scenario.tokoh.length, 0)).toBeLessThanOrEqual(anggaran);
    expect(biaya(batasWawancara, 3)).toBeLessThanOrEqual(anggaran);
    expect(biaya(8, 2)).toBe(anggaran);
    // Luas dan dalam sekaligus harus tetap tidak terjangkau, karena di situlah
    // pertukarannya hidup.
    expect(biaya(scenario.tokoh.length, 3)).toBeGreaterThan(anggaran);
  });
});

describe("cadangan menuju batas wawancara", () => {
  it("menahan pendalaman yang akan mengunci pemain di bawah batas", () => {
    // Empat wawancara dan tiga pendalaman memakai 600 detik. Sisa 120 cukup
    // untuk satu pendalaman lagi, tetapi itu akan menghabiskan seluruh jatah
    // pada wawancara keempat, satu langkah di bawah batas.
    const terpakai = 4 * harga.wawancara + 3 * harga.dalami;
    expect(sisa(terpakai)).toBe(harga.dalami);
    expect(mampu("dalami", terpakai, 4)).toBe(false);
    expect(mampu("wawancara", terpakai, 4)).toBe(true);
  });

  it("tidak menahan apa pun setelah batas tercapai", () => {
    expect(cadangan(batasWawancara)).toBe(0);
    expect(cadangan(scenario.tokoh.length)).toBe(0);
    const terpakai = batasWawancara * harga.wawancara;
    expect(mampu("dalami", terpakai, batasWawancara)).toBe(true);
  });

  it("menyebutkan alasan penahanan, bukan hanya kekurangan waktu", () => {
    const tertahan = alasanTidakMampu("dalami", 4 * harga.wawancara + 3 * harga.dalami, 4);
    expect(tertahan).toContain("ditahan");
    expect(tertahan).toContain("1 keterangan lagi");
    const habis = alasanTidakMampu("dalami", anggaran, batasWawancara);
    expect(habis).toContain("butuh 2 menit");
  });
});

/**
 * Penelusuran menyeluruh atas graf unlock. Ini yang memaku janji di aturan
 * pembuka: "Kamu tidak akan kehabisan jatah sebelum bisa mengakhiri
 * penyelidikan." Kalau ada satu urutan tindakan saja yang menutup penyelidikan
 * di bawah batas wawancara, test ini menyebutkan urutannya.
 */
describe("tidak mungkin terkunci mati", () => {
  it("tidak ada urutan tindakan yang menutup penyelidikan di bawah batas", () => {
    const kunci = (state: GameState) => `${[...state.interviewed].sort().join()}|${[...state.followedUp].sort().join()}`;
    const dikunjungi = new Set<string>();
    const awal = reducer(initialState, { type: "mulai" });
    let terperiksa = 0;

    const telusuri = (state: GameState, jejak: string[]) => {
      terperiksa += 1;
      if (state.closed && state.interviewed.length < batasWawancara) {
        throw new Error(`terkunci mati setelah: ${jejak.join(" > ")}`);
      }
      if (state.closed) return;
      const id = kunci(state);
      if (dikunjungi.has(id)) return;
      dikunjungi.add(id);

      for (const person of scenario.tokoh) {
        if (state.interviewed.includes(person.id) || !isUnlocked(person, state.interviewed)) continue;
        const aksi: GameAction[] = [{ type: "pilihOrang", id: person.id }, { type: "dengarkan" }];
        const sesudah = aksi.reduce(reducer, state);
        if (sesudah.interviewed.length > state.interviewed.length) telusuri(sesudah, [...jejak, `dengar ${person.id}`]);
      }
      for (const orang of state.interviewed) {
        if (state.followedUp.includes(orang)) continue;
        const aksi: GameAction[] = [{ type: "pilihOrang", id: orang }, { type: "tanyaLanjut" }];
        const sesudah = aksi.reduce(reducer, state);
        if (sesudah.followedUp.length > state.followedUp.length) telusuri(sesudah, [...jejak, `dalami ${orang}`]);
      }
    };

    telusuri(awal, []);
    // Jaring pengaman: kalau penelusurannya runtuh jadi beberapa keadaan saja,
    // lulusnya test ini tidak berarti apa-apa.
    expect(terperiksa).toBeGreaterThan(1000);
    expect(dikunjungi.size).toBeGreaterThan(500);
  });

  it("setiap orang bisa dicapai dari Arya", () => {
    // Cadangan jatah hanya menolong kalau selalu ada orang yang boleh diwawancarai.
    let terbuka = scenario.tokoh.filter((person) => person.buka.length === 0).map((person) => person.id);
    expect(terbuka).toEqual(["Arya"]);
    for (let putaran = 0; putaran < scenario.tokoh.length; putaran += 1) {
      terbuka = scenario.tokoh.filter((person) => isUnlocked(person, terbuka)).map((person) => person.id);
    }
    expect(terbuka).toHaveLength(scenario.tokoh.length);
    expect(terbuka.every((id) => personById[id])).toBe(true);
  });
});

describe("jatah habis", () => {
  it("menutup penyelidikan sebagai keadaan, bukan sebagai layar", () => {
    const habis = adaAksiTerjangkau(anggaran, scenario.tokoh.length, true, true);
    expect(habis).toBe(false);
    expect(adaAksiTerjangkau(anggaran - harga.wawancara, 8, true, false)).toBe(true);
    // Tidak ada calon berarti tidak ada yang bisa dibeli, meski jatah utuh.
    expect(adaAksiTerjangkau(0, 0, false, false)).toBe(false);
  });

  it("sisa tidak pernah negatif", () => {
    expect(sisa(anggaran + 600)).toBe(0);
    expect(formatSisa(anggaran + 600)).toBe("00:00");
    expect(formatSisa(0)).toBe("12:00");
  });
});

describe("peringatan ambang", () => {
  it("menyala tepat sekali per ambang sepanjang satu penyelidikan", () => {
    for (const langkah of [harga.wawancara, harga.dalami]) {
      const muncul: string[] = [];
      for (let terpakai = 0; terpakai + langkah <= anggaran; terpakai += langkah) {
        const teks = nudge(terpakai, terpakai + langkah);
        if (teks) muncul.push(teks);
      }
      expect(muncul).toHaveLength(2);
      expect(new Set(muncul).size).toBe(2);
    }
  });

  it("tidak menyala saat ambangnya tidak dilewati", () => {
    expect(nudge(0, harga.wawancara)).toBeNull();
    expect(nudge(anggaran, anggaran)).toBeNull();
  });

  it("naskahnya tidak memakai em dash", () => {
    const naskah = [
      nudge(anggaran - 300, anggaran - 240),
      nudge(anggaran - 180, anggaran - 120),
      alasanTidakMampu("wawancara", anggaran, 8),
      alasanTidakMampu("dalami", 4 * harga.wawancara + 3 * harga.dalami, 4),
    ];
    naskah.forEach((teks) => {
      expect(teks).toBeTruthy();
      expect(teks?.includes("—")).toBe(false);
      expect(teks?.includes("--")).toBe(false);
    });
  });
});
