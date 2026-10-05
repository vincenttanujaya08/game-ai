import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const fundamentalsKey = "nusa-learn-progress-v2";
const workingKey = "nusa-learn-working-generative-ai-v1";

/**
 * Bagian dituju lewat progres yang diseed, bukan dengan menekan "Lanjut membaca"
 * berulang: tombol itu sekarang terkunci selama latihan di bagiannya belum
 * selesai, jadi menekannya bukan lagi cara yang andal untuk berpindah.
 */
async function openAtSection(
  page: import("@playwright/test").Page,
  key: string,
  path: string,
  sectionIndex: number,
  overrides: Record<string, unknown> = {},
) {
  const seed = { completedStages: [], unlockedStage: 0, activeStage: 0, attempts: {}, ...overrides, sectionIndex };
  await page.goto("/learn");
  await page.evaluate(
    ([storageKey, value]) => localStorage.setItem(storageKey as string, JSON.stringify(value)),
    [key, seed] as const,
  );
  await page.goto(path);
  await page.getByText(/^BAGIAN \d+ \/ \d+$/).waitFor();
}

/** Naikkan satu baris lewat keyboard, tanpa bergantung pada posisinya saat itu. */
async function moveUp(page: import("@playwright/test").Page, label: string, times = 1) {
  const row = orderRows(page).filter({ hasText: label }).getByRole("button");
  await row.focus();
  for (let step = 0; step < times; step += 1) {
    await page.keyboard.press("ArrowUp");
  }
}

function orderRows(page: import("@playwright/test").Page) {
  return page.getByRole("region", { name: /Susun urutan kerja robot/ }).getByRole("listitem");
}

test("estimate: tebak dulu, angka sebenarnya dibuka sesudahnya", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 2);

  const slider = page.getByRole("slider");
  await expect(slider).toBeVisible();
  await expect(page.getByText("Angka sebenarnya")).toBeHidden();

  // Geser jauh dari jawaban (14,8) supaya arah tebakan ikut diuji.
  await slider.fill("38");
  await page.getByRole("button", { name: "Buka angkanya" }).click();

  await expect(page.getByText(/lebih tinggi dari angka sebenarnya/)).toBeVisible();
  await expect(page.getByText("Angka sebenarnya")).toBeVisible();

  await page.getByRole("button", { name: "Coba lagi" }).click();
  await expect(page.getByText("Angka sebenarnya")).toBeHidden();

  await slider.fill("14.8");
  await page.getByRole("button", { name: "Buka angkanya" }).click();
  await expect(page.getByText(/Pasien yang dipanggil kembali naik/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("arrange: urutan disusun dengan keyboard saja", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  // Urutan awal sengaja teracak di data: Uji, Amati, Awasi, Perkirakan.
  const rows = orderRows(page);
  await expect(rows.first()).toContainText("Uji");

  await moveUp(page, "Amati");
  await moveUp(page, "Perkirakan", 2);
  await expect(rows.first()).toContainText("Amati");
  await expect(rows.nth(1)).toContainText("Perkirakan");

  await page.getByRole("button", { name: "Periksa urutanku" }).click();
  await expect(page.getByText(/Amati → Perkirakan → Uji → Awasi/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("arrange: baris bisa diseret dengan tetikus", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  const rows = orderRows(page);
  await expect(rows.first()).toContainText("Uji");

  // Seret "Amati" ke posisi pertama.
  await rows.filter({ hasText: "Amati" }).getByRole("button").dragTo(rows.first().getByRole("button"));
  await expect(rows.first()).toContainText("Amati");

  // Jalur keyboard harus tetap tersedia berdampingan dengan drag.
  await moveUp(page, "Perkirakan", 2);
  await page.getByRole("button", { name: "Periksa urutanku" }).click();
  await expect(page.getByText(/Amati → Perkirakan → Uji → Awasi/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("arrange: baris bisa dioperasikan tanpa tetikus dan tanpa tombol tambahan", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  const rows = orderRows(page);

  // Barisnya sendiri adalah satu-satunya kontrol: tidak ada pegangan atau tombol tambahan.
  await expect(rows.first().getByRole("button")).toHaveCount(1);

  // Baris bisa difokus dan digerakkan dengan panah.
  await rows.filter({ hasText: "Amati" }).getByRole("button").focus();
  await page.keyboard.press("ArrowUp");
  await expect(rows.first()).toContainText("Amati");

  // Ketuk dua baris untuk menukar tempatnya — jalur untuk layar sentuh.
  // Urutan saat ini: Amati, Uji, Awasi, Perkirakan.
  await rows.filter({ hasText: "Perkirakan" }).getByRole("button").click();
  await expect(rows.filter({ hasText: "Perkirakan" }).getByRole("button")).toHaveAttribute("aria-pressed", "true");
  await rows.nth(1).getByRole("button").click();
  await expect(rows.nth(1)).toContainText("Perkirakan");
  // Menukar hanya memindahkan dua baris itu, sisanya tetap di tempatnya.
  await expect(rows.nth(3)).toContainText("Uji");

  // Tukar dua baris terakhir supaya urutannya benar.
  await rows.filter({ hasText: "Awasi" }).getByRole("button").click();
  await rows.nth(3).getByRole("button").click();

  await page.getByRole("button", { name: "Periksa urutanku" }).click();
  await expect(page.getByText(/Amati → Perkirakan → Uji → Awasi/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("arrange: menjatuhkan ke baris jauh menukar dua baris itu saja", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  // Urutan awal: Uji, Amati, Awasi, Perkirakan.
  const rows = orderRows(page);
  await expect(rows.nth(0)).toContainText("Uji");
  await expect(rows.nth(3)).toContainText("Perkirakan");

  // Baris ke-4 dijatuhkan ke baris ke-1: hanya keduanya yang berpindah.
  await rows.nth(3).getByRole("button").dragTo(rows.nth(0).getByRole("button"));
  await expect(rows.nth(0)).toContainText("Perkirakan");
  await expect(rows.nth(3)).toContainText("Uji");
  await expect(rows.nth(1)).toContainText("Amati");
  await expect(rows.nth(2)).toContainText("Awasi");
});

test("arrange: urutan salah memberi kredit sebagian dan boleh diulang", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  await page.getByRole("button", { name: "Periksa urutanku" }).click();
  await expect(page.getByText(/dari 4 sudah di tempat yang tepat/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Coba lagi" })).toBeVisible();
});

test("spot: menandai bagian yang benar ikut ditolak", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 9);

  await page.getByRole("button", { name: /Panduan kampus meminta mahasiswa/ }).click();
  await page.getByRole("button", { name: "Periksa tandaku" }).click();
  await expect(page.getByText(/Ada bagian yang sebenarnya sudah tepat/)).toBeVisible();

  await page.getByRole("button", { name: "Coba lagi" }).click();
  await page.getByRole("button", { name: /Sebanyak 87% dosen/ }).click();
  await page.getByRole("button", { name: "Periksa tandaku" }).click();
  await expect(page.getByText(/Cari 1 lagi/)).toBeVisible();

  await page.getByRole("button", { name: /Aturan serupa sudah berlaku/ }).click();
  await page.getByRole("button", { name: "Periksa tandaku" }).click();
  await expect(page.getByText(/perlu dicek ke sumber aslinya/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("pilot prompting: pilihan dan hasil bertahap, posisi tersimpan", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dev/yes-man-pilot/prompt-engineering");
  const click = async (name: string) => page.getByRole("button", { name, exact: true }).click();
  await click("Mulai belajar →");
  await expect(page.getByRole("button", { name: "Lihat jawabannya →" })).toBeDisabled();
  await click("Sudah cukup untuk mulai");
  await click("Lihat jawabannya →");
  await click("Detail acaranya belum ada");
  await click("Coba ubah prompt-nya →");
  await click("Untuk orang yang baru mulai belajar AI");
  await click("Gratis, Sabtu pukul 10.00");
  await click("Ajak pembaca mendaftar");
  await expect(page.getByText("Daftar melalui [cara daftar].", { exact: false })).toHaveCount(0);
  await click("Lihat perubahan jawabannya →");
  await expect(page.getByText("Daftar melalui [cara daftar].", { exact: false })).toBeVisible();
  await click("Coba hapus satu detail");
  await expect(page.getByText("Daftar melalui [cara daftar].", { exact: false })).toHaveCount(0);
  await click("← Kembali");
  await expect(page.getByRole("button", { name: "Gratis, Sabtu pukul 10.00" })).toHaveAttribute("aria-pressed", "true");
  await click("Lihat perubahan jawabannya →");
  await click("Pilih detail yang perlu →");
  for (let i = 0; i < 6; i++) {
    await page.getByRole("button", { name: /^Perlu untuk caption ini/ }).click();
    await click(i < 5 ? "Detail berikutnya →" : "Lihat hasil pengelompokan →");
  }
  // A mistaken classification is explained and still allows progress.
  await click("Coba pakai contoh →");
  await click("Pilih contoh gaya →");
  await page.getByRole("button", { name: /^Contoh A:/ }).click();
  await click("Lihat pesan yang mengikuti contoh →");
  await click("Kalau detailnya belum lengkap? →");
  await click("Ketiganya bisa berpengaruh");
  await expect(page.getByRole("heading", { name: "AI bertanya · simulasi" })).toHaveCount(0);
  await click("Coba minta AI bertanya →");
  await click("Kuliner");
  await expect(page.getByRole("heading", { name: "Gudeg di Wijilan" })).toHaveCount(0);
  await click("Lihat contoh rencananya →");
  await expect(page.getByRole("heading", { name: "Gudeg di Wijilan" })).toBeVisible();
  await click("Coba untuk pekerjaan yang lebih besar →");
  await page.getByRole("button", { name: /^Naikkan: Pahami brief/ }).click();
  await click("Lihat percakapannya →");
  await click("Perbaiki jawaban yang kurang pas →");
  await click("Bahasa yang lebih sederhana");
  await click("Lihat jawaban setelah diperbaiki →");
  await click("Coba dengan bahan bacaan →");
  await page.getByRole("button", { name: /^Prompt A:/ }).click();
  await click("Lihat contoh jawabannya →");
  await expect(page.getByText(/‘100 peserta’ tidak ada dalam artikel/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Bandingkan arahannya →" })).toBeDisabled();
  await click("Lihat jawaban B");
  await click("Bandingkan arahannya →");
  await click("Prompt B");
  await click("Cek fakta dalam jawabannya →");
  await click("Pakai langsung karena angkanya spesifik");
  await expect(page.getByText(/Angka yang terlihat spesifik tetap bisa salah atau dibuat-buat/)).toBeVisible();
  await click("Sekarang coba sendiri →");
  await click("Kebutuhan lain");
  await click("Tulis permintaanmu →");
  const literal = "Bantu aku jelasin ini ya—jangan ubah gaya tulisku!";
  await page.getByRole("textbox", { name: /Apa yang ingin kamu minta/ }).fill(literal);
  await click("Simpan dan berhenti");
  await page.reload();
  await click("Lanjutkan belajar →");
  await expect(page.getByRole("textbox", { name: /Apa yang ingin kamu minta/ })).toHaveValue(literal);
  for (const name of ["Tambahkan konteks →", "Lanjut ke batasan →", "Lanjut ke bentuk jawaban →", "Lanjut ke contoh →", "Lihat saran untuk prompt ini"]) await click(name);
  await expect(page.getByText(literal, { exact: true })).toBeVisible();
  await click("Lanjut ke refleksi →");
  await click("Cari dulu apa yang masih kurang");
  await click("Lihat ringkasannya →");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await click("Selesaikan materi →");
  await expect(page.getByRole("heading", { name: "Siap dicoba untuk kebutuhanmu sendiri" })).toBeVisible();
});

test("arrange pencocokan: tiap baris dipilih kategorinya", async ({ page }) => {
  await openAtSection(page, workingKey, "/learn/working-with-generative-ai/lesson", 2);

  const check = page.getByRole("button", { name: "Periksa pasanganku" });
  await expect(check).toBeDisabled();

  const answers: [string, string][] = [
    ["Buat ringkasan laporan ini", "Task"],
    ["Untuk ketua organisasi mahasiswa", "Context"],
    ["Sajikan dalam lima poin", "Output"],
    ["Maksimal 150 kata", "Requirements"],
  ];
  for (const [item, bucket] of answers) {
    await page.getByRole("group", { name: new RegExp("Kategori untuk: .*" + item) }).getByRole("button", { name: bucket }).click();
  }

  await expect(check).toBeEnabled();
  await check.click();
  await expect(page.getByText(/Task menjelaskan apa yang harus dikerjakan/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("percobaan latihan tercatat di progres", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 2);
  await page.getByRole("slider").fill("14.8");
  await page.getByRole("button", { name: "Buka angkanya" }).click();

  await expect
    .poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "null"), fundamentalsKey))
    .toMatchObject({ attempts: { "0-2-0": { tries: 1, solved: true, firstTryCorrect: true } } });
});

test("latihan yang belum benar mengunci tombol lanjut", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  const next = page.getByRole("button", { name: "Lanjut membaca →" });
  await expect(next).toBeDisabled();
  await expect(page.getByText("Selesaikan latihan di atas untuk lanjut.")).toBeVisible();

  // Panah kanan adalah tombol lanjut yang sama, jadi ikut tertahan.
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("BAGIAN 05 / 11")).toBeVisible();

  // Menyelesaikan latihan membuka kuncinya.
  await moveUp(page, "Amati");
  await moveUp(page, "Perkirakan", 2);
  await page.getByRole("button", { name: "Periksa urutanku" }).click();
  await expect(page.getByText(/Amati → Perkirakan → Uji → Awasi/)).toBeVisible();
  await expect(next).toBeEnabled();
  await expect(page.getByText("Selesaikan latihan di atas untuk lanjut.")).toBeHidden();
});

test("jalan keluar baru muncul sesudah latihan benar-benar dicoba", async ({ page }) => {
  await openAtSection(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", 4);

  const skip = page.getByRole("button", { name: "Lewati latihan ini" });
  const check = page.getByRole("button", { name: "Periksa urutanku" });

  // Belum dicoba: tidak ada jalan pintas sama sekali.
  await expect(skip).toHaveCount(0);

  await check.click();
  await expect(skip).toHaveCount(0);

  await check.click();
  await expect(skip).toBeVisible();

  await skip.click();
  await expect(page.getByRole("button", { name: "Lanjut membaca →" })).toBeEnabled();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
