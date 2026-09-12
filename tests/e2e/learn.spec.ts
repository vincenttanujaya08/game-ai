import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Learn membuka lesson edukasional dan menyimpan progress", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("nusa-learn-progress-v1"));
  await page.reload();

  await page.getByRole("link", { name: "Mulai belajar", exact: true }).click();
  await expect(page).toHaveTitle("Peta Belajar AI · NUSA Lab");
  await page.getByRole("link", { name: "Buka course AI Fundamentals" }).click();
  await expect(page).toHaveTitle(/AI Fundamentals/);
  await expect(page.getByRole("heading", { name: "Prompt Engineering" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Responsible AI Use" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /AI Around You, siap dimainkan/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /What Is Generative AI.*terkunci/ }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: /What Is Generative AI.*terkunci/ }).locator("svg"),
  ).toBeVisible();
  await expect(page.getByLabel("AI Safety, terkunci").locator("svg")).toBeVisible();

  await page
    .getByRole("button", { name: /AI Around You, siap dimainkan/ })
    .click();
  await page.getByRole("button", { name: /Mode gelap/ }).click();
  await page.getByRole("button", { name: /Layar penuh/ }).click();
  await page.getByRole("button", { name: "Mulai" }).click();
  const viewport = page.viewportSize();
  const shellBox = await page.locator("article[data-stage]").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(shellBox?.x).toBe(0);
  expect(shellBox?.width).toBe(viewport?.width);
  expect(Math.abs((footerBox?.y ?? 0) + (footerBox?.height ?? 0) - (viewport?.height ?? 0))).toBeLessThan(1);
  await expect(page.locator("nextjs-portal")).toBeHidden();
  const aiChoices = page.getByRole("button", { name: "Menggunakan AI", exact: true });
  const ruleChoices = page.getByRole("button", { name: "Cukup dengan aturan", exact: true });
  await expect(page.getByRole("button", { name: "Lanjut →" })).toBeDisabled();
  await ruleChoices.nth(0).click();
  await expect(page.getByText("✓ Tepat.", { exact: true }).first()).toBeVisible();
  await aiChoices.nth(1).click();
  await ruleChoices.nth(2).click();
  await aiChoices.nth(3).click();
  await expect(page.getByRole("button", { name: "Lanjut →" })).toBeEnabled();
  await page.getByRole("button", { name: "Lanjut →" }).click();
  await page.getByRole("button", { name: "Lanjut →" }).click();
  await page.getByRole("button", { name: "Belum cukup informasi" }).click();
  await page.getByRole("button", { name: "Cukup dengan aturan", exact: true }).click();
  await page.getByRole("button", { name: "Selesai Lesson" }).click();
  await expect(
    page.getByRole("heading", { name: "What Is Generative AI?" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        JSON.parse(localStorage.getItem("nusa-learn-progress-v1") ?? "null"),
      ),
    )
    .toMatchObject({ completedStages: [0], unlockedStage: 1, activeStage: 1 });

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("Peta Smart Campus tetap terbaca di mobile dark mode", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "nusa-learn-progress-v1",
      JSON.stringify({ completedStages: [0, 1, 2], unlockedStage: 3, activeStage: 3 }),
    ),
  );
  await page.goto("/learn/ai-fundamentals/module-1");
  await page.getByRole("button", { name: /Mode gelap/ }).click();
  await page.getByRole("button", { name: /Layar penuh/ }).click();
  await page.getByRole("button", { name: "Mulai" }).click();

  const pins = await page
    .getByLabel("Peta pilihan Smart Campus")
    .getByRole("button")
    .evaluateAll((buttons) =>
      buttons.map((button) => {
        const box = button.getBoundingClientRect();
        return { left: box.left, top: box.top, right: box.right, bottom: box.bottom };
      }),
    );
  const overlaps = pins.some((pin, index) =>
    pins.slice(index + 1).some(
      (other) =>
        pin.left < other.right && pin.right > other.left && pin.top < other.bottom && pin.bottom > other.top,
    ),
  );

  expect(overlaps).toBe(false);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Modul berjalan berurutan lalu membuka rangkuman setelah Smart Campus", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem(
      "nusa-learn-progress-v1",
      JSON.stringify({ completedStages: [0], unlockedStage: 3, activeStage: 0 }),
    ),
  );
  await page.goto("/learn/ai-fundamentals");
  await expect(page.getByRole("button", { name: /AI Around You.*selesaikan bagian berikutnya/i })).toBeDisabled();
  await expect(page.getByRole("button", { name: /What Is Generative AI.*siap dimainkan/i })).toBeEnabled();

  await page.evaluate(() =>
    localStorage.setItem(
      "nusa-learn-progress-v1",
      JSON.stringify({ completedStages: [0, 1, 2], unlockedStage: 3, activeStage: 3 }),
    ),
  );
  await page.goto("/learn/ai-fundamentals/module-1");
  await page.getByRole("button", { name: "Mulai" }).click();

  const campusMap = page.getByLabel("Peta pilihan Smart Campus");
  await page.getByRole("button", { name: "Cukup dengan aturan", exact: true }).click();
  await campusMap.getByRole("button", { name: /Library/ }).click();
  await page.getByRole("button", { name: "Menggunakan AI", exact: true }).click();
  await campusMap.getByRole("button", { name: /Lab/ }).click();
  await page.getByRole("button", { name: "Generative AI", exact: true }).click();
  await campusMap.getByRole("button", { name: /Canteen/ }).click();
  await page.getByRole("button", { name: "Riwayat pembelian", exact: true }).click();
  await campusMap.getByRole("button", { name: /Assistant/ }).click();
  await page.getByRole("button", { name: "Informasi resmi kampus", exact: true }).click();

  await expect(page.getByRole("dialog", { name: "Tiga ide untuk dibawa pulang" })).toBeVisible();
  await page.getByRole("button", { name: "Kembali ke Course Map" }).click();
  await expect(page).toHaveTitle(/AI Fundamentals/);
  await page.getByRole("button", { name: /AI Around You.*siap dimainkan/i }).click();
  await page.getByRole("button", { name: "Mulai" }).click();
  await expect(page.getByRole("button", { name: "Lanjut →" })).toBeEnabled();
});
