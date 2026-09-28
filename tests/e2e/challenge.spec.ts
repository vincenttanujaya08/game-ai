import { expect, test } from "@playwright/test";

test("halaman challenge menjelaskan acara dan membuka pendaftaran", async ({ page }) => {
  await page.goto("/events");
  await expect(page.getByRole("heading", { name: "Belajar bareng. Buat sesuatu." })).toBeVisible();
  await page.getByRole("link", { name: /Vibe Coding Challenge/ }).click();
  await expect(page).toHaveURL(/\/events\/vibe-coding-challenge$/);
  await expect(page.getByRole("heading", { name: "Vibe Coding Challenge" })).toBeVisible();
  await expect(page.getByText("Mahasiswa dari kampus mana pun.")).toBeVisible();
  await expect(page.getByText("Tanggal mulai dan batas kirim akan diumumkan.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dari daftar sampai hasil." })).toBeVisible();
  await expect(page.getByText("Video demo singkat")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cukup tunjukkan project dan prosesmu." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Lihat kelas Vibe Coding/ })).toBeVisible();
  await page.getByRole("link", { name: /Daftar event/ }).first().click();
  await expect(page).toHaveURL(/\/events\/vibe-coding-challenge\/register$/);
  await expect(page.getByRole("heading", { name: "Daftar challenge." })).toBeVisible();
  await expect(page.getByText(/dengan Google untuk melanjutkan/)).toBeVisible();
});

test("pilihan submit mudah ditemukan di ponsel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/events");
  await expect(page.getByRole("link", { name: "Event", exact: true })).toBeVisible();
  await page.getByRole("link", { name: /Vibe Coding Challenge/ }).click();
  await page.getByRole("link", { name: /Kirim project/ }).first().click();
  await expect(page).toHaveURL(/\/events\/vibe-coding-challenge\/submit$/);
  await expect(page.getByRole("heading", { name: "Kirim projectmu." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
