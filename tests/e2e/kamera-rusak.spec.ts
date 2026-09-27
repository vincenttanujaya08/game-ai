import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Suite pertama untuk Kasus 02. Tiap skenario menuntut nol pelanggaran axe pada
 * layar yang dikunjunginya, jadi setiap kontrol baru harus elemen native.
 */

const minimum = ["Arya", "Bella", "Siska", "Dimas", "Rafi"];

const orang = (page: Page, nama: string) => page.locator(`button:has(strong:text-is("${nama}"))`);
const dengarkan = (page: Page) => page.getByRole("button", { name: /^(Dengarkan keterangan ·|Keterangan sudah didengar)/ });
const dalami = (page: Page) => page.getByRole("button", { name: /^(Tanya lebih lanjut ·|Pertanyaan lanjutan sudah)/ });
const sisaJatah = (page: Page) => page.locator("header b").first();

async function bersih(page: Page) {
  const bersihAxe = await new AxeBuilder({ page }).analyze();
  expect(bersihAxe.violations).toEqual([]);
}

async function mulai(page: Page) {
  await page.goto("/games/kamera-rusak");
  await page.getByRole("button", { name: "Mulai menyelidiki" }).click();
  await expect(sisaJatah(page)).toHaveText("12:00");
}

async function wawancarai(page: Page, nama: string) {
  await orang(page, nama).click();
  await dengarkan(page).click();
}

async function akhiri(page: Page) {
  await page.locator("footer button").filter({ hasText: "Akhiri penyelidikan" }).click();
  await expect(page.getByText("Akhiri penyelidikan sekarang?")).toBeVisible();
  await page.getByRole("button", { name: "Ya, akhiri" }).click();
}

async function isiKeputusan(page: Page, dasar: RegExp, keterbatasan: RegExp) {
  await page.locator('input[type="checkbox"]').locator("..").filter({ hasText: dasar }).locator("input").check();
  await page.locator('input[name="keterbatasan"]').locator("..").filter({ hasText: keterbatasan }).locator("input").check();
  await page.getByRole("button", { name: "Simpan keputusan" }).click();
}

test("penyelidikan singkat berjalan sampai layar hasil", async ({ page }) => {
  await mulai(page);
  await bersih(page);

  // Harga menempel pada aksinya, dan jatah hanya berkurang saat pemain bertindak.
  await expect(page.getByRole("button", { name: /Dengarkan keterangan/ })).toContainText("1 menit");
  for (const nama of minimum) await wawancarai(page, nama);
  await expect(sisaJatah(page)).toHaveText("07:00");
  await orang(page, "Kevin").click();
  await expect(dalami(page)).toContainText("2 menit");

  // Linimasa hidup selama bermain, bukan cuma hadiah di layar hasil: sebagian
  // segmen sudah terbuka, sisanya menunggu saksinya didengar.
  const segmen = page.locator("[class*=paperTimeline] li");
  await expect(segmen).toHaveCount(12);
  const tertutup = await page.locator(`[class*=paperTimeline] li[data-tertutup="true"]`).count();
  expect(tertutup).toBeGreaterThan(0);
  expect(tertutup).toBeLessThan(12);
  // Penanda posisi kamera berhenti di titik terjauh yang sudah diketahui.
  await expect(page.locator("[class*=mapCamera]")).toHaveCount(1);
  await bersih(page);

  await akhiri(page);
  await page.getByRole("button", { name: "Gunakan rangkuman AI" }).click();
  await isiKeputusan(page, /Keterangan Dimas/, /Tidak ada yang memeriksa kondisi lensa/);

  await expect(page.getByRole("heading", { level: 1 })).toContainText("belum pasti");
  await expect(page.getByText(/\d dari 5 keputusan sudah bertumpu/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Buka Modul 1" })).toHaveAttribute("href", "/learn/ai-fundamentals/module-1");
  await bersih(page);
});

test("lompatan tanpa dasar dijelaskan, bukan dihukum", async ({ page }) => {
  await mulai(page);
  // Jalur Chris tidak pernah disentuh sama sekali.
  for (const nama of minimum) await wawancarai(page, nama);
  await akhiri(page);

  await page.getByRole("button", { name: "Ubah kesimpulan" }).click();
  await page.locator('input[name="conclusion"]').locator("..").filter({ hasText: "Chris paling mungkin" }).locator("input").check();
  await isiKeputusan(page, /Keterangan Arya/, /Tidak ada yang memeriksa kondisi lensa/);

  const penilaian = page.getByRole("heading", { name: "Kesimpulan ini belum punya pijakan di penyelidikanmu" });
  await expect(penilaian).toBeVisible();
  await expect(page.getByText(/Mengubah kesimpulan AI boleh saja/)).toBeVisible();
  // Langkah berikutnya menyebut orang yang konkret, bukan menghakimi.
  await expect(page.getByText(/Dengarkan keterangan Chris dan Nina/)).toBeVisible();
  await bersih(page);
});

test("jatah waktu habis menutup penyelidikan dan mengunci tindakan baru", async ({ page }) => {
  await mulai(page);
  const semua = ["Arya", "Kevin", "Bella", "Fajar", "Siska", "Dimas", "Rafi", "Chris", "Nina", "Leo", "Maya"];
  for (const nama of semua) await wawancarai(page, nama);

  // Sebelas wawancara memakai 660 detik. Sisa 60 tidak cukup untuk pendalaman,
  // jadi tidak ada lagi yang bisa dibeli dan penyelidikan menutup sendiri.
  await expect(page.getByRole("heading", { name: "Tinjau rangkuman AI" })).toBeVisible();
  await expect(page.getByText(/Semua orang sudah kamu dengarkan/)).toBeVisible();
  await bersih(page);

  await page.getByRole("button", { name: /Kembali ke penyelidikan/ }).click();
  await expect(page.getByText("Penyelidikan sudah ditutup. Kamu masih bisa membaca ulang keterangan dan bukti.")).toBeVisible();
  await orang(page, "Leo").click();
  await expect(dalami(page)).toBeDisabled();
  await expect(page.locator("footer button").last()).toHaveText("Lihat rangkuman akhir");
  await bersih(page);
});

test("cadangan jatah menjaga batas wawancara tetap bisa dicapai", async ({ page }) => {
  await mulai(page);
  for (const nama of ["Arya", "Bella", "Siska", "Dimas"]) await wawancarai(page, nama);
  for (const nama of ["Arya", "Bella", "Siska"]) {
    await orang(page, nama).click();
    await dalami(page).click();
  }

  // Pendalaman keempat akan menghabiskan jatah pada wawancara keempat, satu
  // langkah di bawah batas untuk boleh mengakhiri penyelidikan.
  await orang(page, "Dimas").click();
  await expect(dalami(page)).toBeDisabled();
  await expect(page.getByText(/ditahan untuk mencapai 5 wawancara/)).toBeVisible();

  // Wawancara sendiri tidak pernah tertahan, jadi batasnya selalu bisa dicapai.
  await orang(page, "Kevin").click();
  await expect(dengarkan(page)).toBeEnabled();
  await bersih(page);
});

test("catatan dugaan bisa dilewati dan panelnya tetap berguna", async ({ page }) => {
  await mulai(page);
  await wawancarai(page, "Arya");

  const catatan = page.locator("[class*=catatan]").first();
  await expect(catatan).toContainText("Menurutmu sekarang, jalur mana yang paling kuat?");
  await page.getByRole("button", { name: "Belum mau menebak" }).click();
  await expect(catatan).toContainText("belum mau menebak");

  for (const nama of ["Bella", "Siska", "Dimas", "Rafi"]) await wawancarai(page, nama);
  await akhiri(page);
  await page.getByRole("button", { name: "Gunakan rangkuman AI" }).click();
  await isiKeputusan(page, /Keterangan Dimas/, /Tidak ada yang memeriksa kondisi lensa/);

  // Melewatkan mekanik ini tidak boleh meninggalkan slot kosong di layar hasil.
  const panel = page.locator("article").filter({ hasText: "Kamu dan AI" });
  await expect(panel).toContainText(/AI berubah pikiran|tidak pernah berpindah/);
  await expect(panel).toContainText("tidak mencatat dugaanmu sendiri");
  await expect(page.getByText("Tidak ada penyebab rahasia di kasus ini.", { exact: false })).toBeVisible();
  await bersih(page);
});

test("penyelidikan bertahan sesudah muat ulang", async ({ page }) => {
  await mulai(page);
  for (const nama of ["Arya", "Kevin", "Bella"]) await wawancarai(page, nama);
  await expect(sisaJatah(page)).toHaveText("09:00");

  await page.reload();
  await page.getByRole("button", { name: "Lanjutkan penyelidikan (3 wawancara, sisa 09:00)" }).click();
  await expect(sisaJatah(page)).toHaveText("09:00");
  await expect(page.locator("header b").nth(1)).toHaveText("3/11");
  await bersih(page);

  // Mulai bersih memang harus benar-benar bersih.
  await page.reload();
  await page.getByRole("button", { name: "Mulai penyelidikan baru" }).click();
  await expect(sisaJatah(page)).toHaveText("12:00");
  await page.reload();
  await expect(page.getByRole("button", { name: "Mulai menyelidiki" })).toBeVisible();
});

test("langkah akhir bisa dijalankan dengan papan tuts saja", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mulai(page);
  for (const nama of minimum) await wawancarai(page, nama);
  await akhiri(page);

  const sampai = async (cocok: RegExp) => {
    for (let langkah = 0; langkah < 60; langkah += 1) {
      await page.keyboard.press("Tab");
      const nama = await page.evaluate(() => {
        const el = document.activeElement as HTMLInputElement | null;
        if (!el) return "";
        return `${el.tagName}:${el.type ?? ""} ${el.labels?.[0]?.innerText ?? el.innerText ?? ""}`.replace(/\s+/g, " ").trim();
      });
      if (cocok.test(nama)) return true;
    }
    return false;
  };

  const panah = async (cocok: RegExp) => {
    for (let langkah = 0; langkah < 8; langkah += 1) {
      const nama = await page.evaluate(() => {
        const el = document.activeElement as HTMLInputElement | null;
        return (el?.labels?.[0]?.innerText ?? "").replace(/\s+/g, " ").trim();
      });
      if (cocok.test(nama)) {
        // Tab hanya memindahkan fokus ke grup, tidak memilih apa pun di dalamnya.
        await page.keyboard.press("Space");
        return true;
      }
      await page.keyboard.press("ArrowDown");
    }
    return false;
  };

  expect(await sampai(/Ubah kesimpulan/)).toBe(true);
  await page.keyboard.press("Enter");
  expect(await sampai(/INPUT:radio/)).toBe(true);
  expect(await panah(/penyebab kerusakan/)).toBe(true);
  expect(await sampai(/INPUT:checkbox Keterangan/)).toBe(true);
  await page.keyboard.press("Space");
  // Grup radio adalah satu perhentian tab, jadi memilih di dalamnya memakai
  // tombol panah. Itu memang perilaku native yang diharapkan.
  expect(await sampai(/INPUT:radio/)).toBe(true);
  expect(await panah(/Tidak ada yang memeriksa/)).toBe(true);
  expect(await sampai(/Simpan keputusan/)).toBe(true);
  await page.keyboard.press("Enter");

  await expect(page.getByText(/\d dari 5 keputusan sudah bertumpu/)).toBeVisible();
  await bersih(page);
});
