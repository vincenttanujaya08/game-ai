import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home reference 03: responsive assets, navigation and real learning progress", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page).toHaveTitle("NUSA Lab · Main. Belajar. Untuk Nanti.");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Belajar sambil main, yuk!");
  await expect(page.getByText("0/4 modul selesai", { exact: true })).toBeVisible();
  await expect(page.getByText("Belum dimainkan", { exact: true })).toBeVisible();
  for (const width of [1536, 1024, 768, 760, 390, 320]) {
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#tools-title").scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator("main img").evaluateAll((images) => images.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const name of ["Mulai belajar", "Mulai main", "Lihat perjalananmu"]) {
      await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
    }
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("navigation").getByRole("link", { name: "Learn", exact: true }).click();
  await expect(page).toHaveURL(/#learn$/);
  await page.getByRole("link", { name: "Mulai belajar", exact: true }).click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(page).toHaveTitle("Peta Belajar AI · NUSA Lab");
  await expect(page.getByLabel("Prompting, segera hadir")).toBeVisible();
  await expect(page.getByLabel("Vibecoding, segera hadir")).toBeVisible();
  await page.getByRole("link", { name: "Buka course AI Fundamentals" }).click();
  await expect(page).toHaveURL(/\/learn\/ai-fundamentals$/);
  await page.evaluate(() => localStorage.setItem("nusa-learn-progress-v1", JSON.stringify({ completedStages: [0, 1], unlockedStage: 2, activeStage: 2 })));
  await page.goto("/");
  await expect(page.getByText("0/4 modul selesai", { exact: true })).toBeVisible();
  await page.evaluate(() => localStorage.setItem("nusa-learn-progress-v1", JSON.stringify({ completedStages: [0, 1, 2, 3], unlockedStage: 3, activeStage: 3 })));
  await page.reload();
  await expect(page.getByText("1/4 modul selesai", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Lihat perjalananmu", exact: true }).click();
  await expect(page).toHaveURL(/\/learn$/);
  await page.goto("/");
  await page.getByRole("link", { name: "Mulai main", exact: true }).click();
  await expect(page).toHaveURL(/\/games\/sitasi-bermasalah$/);
  await expect(page.locator("nextjs-portal")).toBeHidden();
  expect(errors).toEqual([]);
});
