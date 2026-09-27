import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const progressKey = "nusa-learn-progress-v2";

/** Reader membaca localStorage sesudah hydration, jadi tunggu bagian pertama tampil. */
async function waitForReader(page: import("@playwright/test").Page) {
  await page.getByText(/^BAGIAN \d+ \/ \d+$/).waitFor();
}

/**
 * Melompat ke bagian terakhir lewat progres tersimpan. Menekan "Lanjut membaca"
 * berulang tidak lagi bisa diandalkan: tombol itu terkunci selama latihan di
 * sebuah bagian belum diselesaikan.
 */
async function jumpToCheck(page: import("@playwright/test").Page, lastSectionIndex: number) {
  await waitForReader(page);
  await page.evaluate(
    ([key, index]) => {
      const stored = JSON.parse(localStorage.getItem(key as string) ?? "{}");
      localStorage.setItem(key as string, JSON.stringify({ ...stored, sectionIndex: index }));
    },
    [progressKey, lastSectionIndex] as const,
  );
  await page.reload();
  await waitForReader(page);
  await expect(page.getByText("CEK PEMAHAMAN", { exact: true })).toBeVisible();
}

function storedProgress(page: import("@playwright/test").Page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "null"), progressKey);
}

test("tiga lesson AI Fundamentals dibaca bertahap dan progres tersimpan", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate((key) => localStorage.removeItem(key), progressKey);
  await page.reload();

  await page.getByRole("link", { name: "Buka materi AI Fundamentals" }).click();
  await expect(page.getByRole("button", { name: /AI Hari Ini, siap dibaca/ })).toBeEnabled();
  await expect(page.getByRole("button", { name: /Sebenarnya, Apa Itu AI\?, terkunci/ })).toBeDisabled();

  await page.getByRole("button", { name: /AI Hari Ini, siap dibaca/ }).click();
  await expect(page.getByRole("heading", { name: "AI Hari Ini" })).toBeVisible();
  await jumpToCheck(page, 10);
  await page.getByRole("button", { name: "Cek riwayat transaksi di aplikasi bankmu" }).click();
  await expect(page.getByText(/Pastikan uangnya benar-benar masuk/)).toBeVisible();
  await page.getByRole("button", { name: /Lanjut ke pelajaran berikutnya/ }).click();
  await expect(page.getByRole("heading", { name: "Sebenarnya, Apa Itu AI?" })).toBeVisible();
  await expect.poll(() => storedProgress(page)).toMatchObject({ completedStages: [0], unlockedStage: 1, activeStage: 1 });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("jawaban salah menahan kemajuan sampai dijawab benar", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate((key) => localStorage.removeItem(key), progressKey);
  await page.goto("/learn/ai-fundamentals/module-1");
  await jumpToCheck(page, 10);

  const advance = page.getByRole("button", { name: /Lanjut ke pelajaran berikutnya/ });
  await expect(advance).toBeDisabled();

  await page.getByRole("button", { name: "Kirim tiket karena tampilannya rapi" }).click();
  await expect(page.getByText(/Coba pilihan lain/)).toBeVisible();
  await expect(advance).toBeDisabled();

  await page.getByRole("button", { name: "Cek riwayat transaksi di aplikasi bankmu" }).click();
  await expect(advance).toBeEnabled();
  await expect.poll(() => storedProgress(page)).toMatchObject({ attempts: { "0-10-1": { tries: 2, solved: true, firstTryCorrect: false } } });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("dua kali salah memunculkan jalan keluar Lihat penjelasan", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate((key) => localStorage.removeItem(key), progressKey);
  await page.goto("/learn/ai-fundamentals/module-1");
  await jumpToCheck(page, 10);

  const escape = page.getByRole("button", { name: "Lihat penjelasan" });
  await page.getByRole("button", { name: "Kirim tiket karena tampilannya rapi" }).click();
  await expect(escape).toBeHidden();
  await page.getByRole("button", { name: "Cari bagian gambar yang terlihat hasil edit" }).click();
  await expect(escape).toBeVisible();

  await escape.click();
  await expect(page.getByText(/Jawabannya: Cek riwayat transaksi/)).toBeVisible();
  await expect(page.getByRole("button", { name: /Lanjut ke pelajaran berikutnya/ })).toBeEnabled();
});

test("posisi bagian bertahan sesudah reload", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate((key) => localStorage.removeItem(key), progressKey);
  await page.goto("/learn/ai-fundamentals/module-1");

  await waitForReader(page);
  await page.getByRole("button", { name: "Lanjut membaca →" }).click();
  await page.getByRole("button", { name: "Lanjut membaca →" }).click();
  await expect(page.getByText("BAGIAN 03 / 11")).toBeVisible();

  await page.reload();
  await expect(page.getByText("BAGIAN 03 / 11")).toBeVisible();
});

test("materi tetap terbaca pada layar ponsel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/learn/ai-fundamentals/module-1");
  await expect(page.getByRole("heading", { name: "AI Hari Ini" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI ada di lebih banyak tempat daripada yang kita kira" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("lesson terakhir membuka penutup course", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate((key) => localStorage.setItem(key, JSON.stringify({ completedStages: [0, 1], unlockedStage: 2, activeStage: 2 })), progressKey);
  await page.goto("/learn/ai-fundamentals/module-1");
  await jumpToCheck(page, 8);
  await page.getByRole("button", { name: "Cari sumber asli dan periksa konteksnya" }).click();
  await page.getByRole("button", { name: /Selesaikan kursus/ }).click();
  await expect(page.getByRole("heading", { name: "Bekal AI Fundamentals sudah lengkap." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Coba NUSA Lab Game/ })).toHaveAttribute("href", "/games");
  await expect.poll(() => storedProgress(page)).toMatchObject({ completedStages: [0, 1, 2] });
});

test("latihan yang belum punya widget tetap menyembunyikan jawabannya", async ({ page }) => {
  // Bagian dituju lewat progres tersimpan: tombol lanjut kini terkunci oleh latihan.
  await page.goto("/learn");
  await page.evaluate(() => localStorage.setItem(
    "nusa-learn-working-generative-ai-v1",
    JSON.stringify({ completedStages: [], unlockedStage: 0, activeStage: 0, sectionIndex: 5, attempts: {} }),
  ));
  await page.goto("/learn/working-with-generative-ai/lesson");

  await waitForReader(page);
  await expect(page.getByRole("heading", { name: /Aktivitas · pilih informasi yang perlu ditambah/ })).toBeVisible();

  const reveal = page.getByText("Lihat jawaban dan alasannya");
  await expect(reveal).toBeVisible();
  await expect(page.getByText(/memberi arah yang cukup tanpa beban/)).toBeHidden();
  await reveal.click();
  await expect(page.getByText(/memberi arah yang cukup tanpa beban/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
