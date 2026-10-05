import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of [
  "/learn/ai-fundamentals/module-1",
  "/learn/working-with-generative-ai/lesson",
  "/learn/vibe-coding/lesson",
]) {
  test(`interactive course keeps the login gate: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login\?next=/);
    expect(new URL(page.url()).searchParams.get("next")).toBe(path);
  });
}

test("fundamentals preview starts, resumes, and fits a mobile screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/dev/yes-man-pilot/ai-fundamentals");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kenalan dengan AI dari hal-hal yang sudah dekat dengan kita",
  );
  await page
    .getByRole("button", { name: "Mulai belajar", exact: true })
    .click();
  const heading = await page.getByRole("heading", { level: 1 }).innerText();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Mau melanjutkan belajar?",
  );
  await page.getByRole("button", { name: "Lanjutkan", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: "/tmp/fundamentals-main-mobile.png",
    fullPage: true,
  });
});
