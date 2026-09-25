import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function readToCheck(page: import("@playwright/test").Page) {
  for (let index = 0; index < 20; index += 1) {
    const next = page.getByRole("button", { name: "Lanjut membaca →" });
    if (!(await next.isVisible())) return;
    await next.click();
  }
  throw new Error("Lesson tidak mencapai pertanyaan akhir");
}

test("tiga lesson AI Fundamentals dibaca bertahap dan progres tersimpan", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate(() => localStorage.removeItem("nusa-learn-progress-v2"));
  await page.reload();

  await page.getByRole("link", { name: "Buka materi AI Fundamentals" }).click();
  await expect(page.getByRole("button", { name: /AI Hari Ini, siap dibaca/ })).toBeEnabled();
  await expect(page.getByRole("button", { name: /Sebenarnya, Apa Itu AI\?, terkunci/ })).toBeDisabled();

  await page.getByRole("button", { name: /AI Hari Ini, siap dibaca/ }).click();
  await expect(page.getByRole("heading", { name: "AI Hari Ini" })).toBeVisible();
  await readToCheck(page);
  await page.getByRole("button", { name: "Cek riwayat transaksi di aplikasi bankmu" }).click();
  await expect(page.getByText(/Pastikan uangnya benar-benar masuk/)).toBeVisible();
  await page.getByRole("button", { name: /Lanjut ke lesson berikutnya/ }).click();
  await expect(page.getByRole("heading", { name: "Sebenarnya, Apa Itu AI?" })).toBeVisible();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("nusa-learn-progress-v2") ?? "null"))).toMatchObject({ completedStages: [0], unlockedStage: 1, activeStage: 1 });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
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
  await page.evaluate(() => localStorage.setItem("nusa-learn-progress-v2", JSON.stringify({ completedStages: [0, 1], unlockedStage: 2, activeStage: 2 })));
  await page.goto("/learn/ai-fundamentals/module-1");
  await readToCheck(page);
  await page.getByRole("button", { name: "Cari sumber asli dan periksa konteksnya" }).click();
  await page.getByRole("button", { name: /Selesaikan course/ }).click();
  await expect(page.getByRole("heading", { name: "Bekal AI Fundamentals sudah lengkap." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Coba NUSA Lab Game/ })).toHaveAttribute("href", "/games");
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("nusa-learn-progress-v2") ?? "null"))).toMatchObject({ completedStages: [0, 1, 2] });
});
