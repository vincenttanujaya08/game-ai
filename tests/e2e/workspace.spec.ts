import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const claimActions = [
  ["claim 1", "Tidak pakai"],
  ["claim 2", "Pakai"],
  ["claim 3", "Tidak pakai"],
  ["claim 4", "Tidak pakai"],
  ["claim 5", "Pakai"],
] as const;

test("membuka bukti, memilih klaim, dan menyusun jawaban akhir", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/games/sitasi-bermasalah");
  await expect(page).toHaveTitle(/Periksa Jawaban AI/);
  await expect(
    page.getByRole("heading", {
      name: "AI sudah membuat draf. Sekarang cek isi dan sumbernya.",
    }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  await page.getByRole("button", { name: "Periksa jawaban AI" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Baca draf AI, lalu buka bukti di balik setiap klaim.",
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Konteks percakapan dengan AI")).toContainText(
    "Buat latar belakang singkat untuk program literasi AI",
  );

  for (let index = 0; index < 5; index += 1) {
    const claim = page.locator("article.claim-card").nth(index);
    await claim
      .getByRole("button", { name: index === 0 ? "Buka bukti" : "Buka bukti" })
      .click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "Lanjut pilih klaim" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Klaim mana yang layak masuk ke jawaban akhir?",
    }),
  ).toBeVisible();
  for (let index = 0; index < 5; index += 1) {
    const claim = page.locator("article.claim-card").nth(index);
    await claim
      .getByRole("button", { name: claimActions[index][1], exact: true })
      .click();
  }
  await page.getByRole("button", { name: "Lihat jawaban akhir" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Ini jawaban akhir dari klaim yang kamu pilih.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Kirim hasil pemeriksaan" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Semua keputusanmu tepat.",
    }),
  ).toBeVisible();
  await expect(page.getByLabel("5 dari 5 keputusan tepat")).toBeVisible();
  await expect(page.locator(".feedback-list article").first()).toContainText(
    "KLAIM 1 · TIDAK PAKAI",
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("bukti sumber asli tersedia", async ({
  page,
}) => {
  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/games/sitasi-bermasalah");
  await page.getByRole("button", { name: "Periksa jawaban AI" }).click();
  const firstClaim = page.locator("article.claim-card").first();
  await firstClaim.getByRole("button", { name: "Buka bukti" }).click();
  await page.getByRole("button", { name: "Tutup dokumen" }).click();
  await page.locator("article.claim-card").nth(1).getByRole("button", { name: "Buka bukti" }).click();
  await expect(
    page.getByRole("link", { name: "Buka sumber asli ↗" }),
  ).toHaveAttribute("href", /kemdiktisaintek\.go\.id/);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("audit output tetap terbaca pada layar ponsel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/games/sitasi-bermasalah");
  await page.getByRole("button", { name: "Periksa jawaban AI" }).click();
  await expect(page.locator("article.claim-card")).toHaveCount(5);

  await page.locator("article.claim-card").nth(1).getByRole("button", { name: "Buka bukti" }).click();
  const dialog = page.getByRole("dialog");
  const sourceViewport = dialog.locator(".source-browser-viewport");
  await expect
    .poll(() =>
      sourceViewport.evaluate(
        (element) => element.scrollHeight > element.clientHeight,
      ),
    )
    .toBe(true);
  await sourceViewport.evaluate((element) =>
    element.scrollTo(0, element.scrollHeight),
  );
  await expect
    .poll(() => sourceViewport.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("button", { name: "Tutup dokumen" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tutup dokumen" }).click();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await expect(page.getByRole("button", { name: "Lanjut pilih klaim" })).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
