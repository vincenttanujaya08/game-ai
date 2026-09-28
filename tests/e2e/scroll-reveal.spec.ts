import { expect, test } from "@playwright/test";

test("bagian memudar di luar layar dan muncul lagi dari kedua arah", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('section[aria-labelledby="home-title"]');
  const feature = page.locator('section[aria-labelledby="game-title"]');

  await expect(hero).not.toHaveAttribute("data-nusa-reveal");
  await expect(feature).toHaveAttribute("data-nusa-reveal", "pending");
  await expect(feature).toHaveCSS("opacity", "0");
  await feature.scrollIntoViewIfNeeded();
  await expect(feature).toHaveAttribute("data-nusa-reveal", "visible");
  await expect(feature).toHaveCSS("opacity", "1");
  await expect(hero).toHaveAttribute("data-nusa-reveal", "pending");
  await expect(hero).toHaveCSS("opacity", "0");

  await hero.scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-nusa-reveal", "visible");
  await expect(hero).toHaveCSS("opacity", "1");
  await expect(feature).toHaveAttribute("data-nusa-reveal", "pending");
  await expect(feature).toHaveCSS("opacity", "0");

  await feature.scrollIntoViewIfNeeded();
  await expect(feature).toHaveAttribute("data-nusa-reveal", "visible");
  await expect(feature).toHaveCSS("opacity", "1");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(feature).not.toHaveAttribute("data-nusa-reveal");
  await expect(feature).toHaveCSS("opacity", "1");
});
