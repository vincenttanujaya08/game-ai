import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Beranda menjelaskan arah belajar tanpa mengulang halaman lain", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page).toHaveTitle("NUSA Lab · Belajar dan Berkarya dengan AI");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Paham AI. Pakai dengan bijak. Lalu bikin sesuatu.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      name: "AI baru berguna kalau hasilnya bisa kamu pakai.",
    }),
  ).toBeVisible();
  await expect(page.getByText("AI Fundamentals", { exact: true })).toHaveCount(0);

  await expect(
    page.getByRole("navigation").getByRole("link"),
  ).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Lihat semua game" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jelajahi" })).toHaveCount(0);
  await expect(page.getByRole("img")).toHaveJSProperty("complete", true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  for (const width of [1440, 1024, 760, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("link", { name: "Lihat semua game" }).click();
  await expect(page).toHaveURL(/\/games$/);
  await expect(page).toHaveTitle("Game Literasi AI · NUSA Lab");
  await expect(page.getByRole("link", { name: "Mulai main" })).toHaveAttribute(
    "href",
    "/games/sitasi-bermasalah",
  );

  await page.goto("/");
  await page.getByRole("link", { name: "Mulai belajar", exact: true }).click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(page).toHaveTitle("Peta Belajar AI · NUSA Lab");
  await expect(
    page.getByRole("link", { name: "Buka materi AI Fundamentals" }),
  ).toBeVisible();
  await expect(page.getByLabel("Prompt Engineering, segera hadir")).toBeVisible();
  await expect(page.getByLabel("Build with AI, segera hadir")).toBeVisible();

  const removedPage = await page.request.get("/explore");
  expect(removedPage.status()).toBe(404);
  expect(errors).toEqual([]);
});
