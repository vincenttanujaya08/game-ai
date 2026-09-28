import { expect, test } from "@playwright/test";

test("sign in dan sign up mempertahankan halaman tujuan", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/login?next=%2Fevents%2Fvibe-coding-challenge%2Fregister");

  await expect(page.getByRole("heading", { name: "Selamat datang kembali." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in with Google" })).toBeVisible();

  await page.getByRole("navigation", { name: "Pilihan akun" }).getByRole("link", { name: "Sign up" }).click();
  await expect(page).toHaveURL(/mode=signup&next=%2Fevents%2Fvibe-coding-challenge%2Fregister/);
  await expect(page.getByRole("heading", { name: "Mulai dengan akunmu." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign up with Google" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
