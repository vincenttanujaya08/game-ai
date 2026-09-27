import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const fundamentalsKey = "nusa-learn-progress-v2";
const vibeKey = "nusa-learn-vibe-coding-v1";

async function openAt(page: import("@playwright/test").Page, key: string, path: string, seed: object) {
  await page.goto("/learn");
  await page.evaluate(([storageKey, value]) => localStorage.setItem(storageKey as string, JSON.stringify(value)), [key, seed] as const);
  await page.goto(path);
  await page.getByText(/^BAGIAN \d+ \/ \d+$/).waitFor();
}

test.describe("dengan setelan kurangi animasi", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("isi diagram tetap utuh tanpa animasi sama sekali", async ({ page }) => {
    // Regresi: dulu keempat langkah disembunyikan di balik animasi, jadi diagramnya
    // kosong dan hanya menyisakan panah yang menunjuk ke ketiadaan.
    await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
      completedStages: [], unlockedStage: 0, activeStage: 0, sectionIndex: 5, attempts: {},
    });

    const figure = page.locator("figure").first();
    for (const step of ["Tujuan", "Rencana", "Alat", "Cek"]) {
      const node = figure.locator("svg text", { hasText: new RegExp("^" + step + "$") }).first();
      await expect(node).toBeVisible();
      const opacity = await node.evaluate((element) => {
        const group = element.closest("g");
        return group ? Number(getComputedStyle(group).opacity) : 1;
      });
      expect(opacity, step + " harus terlihat tanpa animasi").toBeGreaterThan(0.9);
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

  test("tidak ada tombol pemutar yang justru menghilangkan gambarnya", async ({ page }) => {
    // Regresi: menekan "Lihat urutannya" membuat seluruh isi diagram transparan,
    // dan karena animasinya tidak pernah jalan, isinya tidak pernah kembali.
    await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
      completedStages: [], unlockedStage: 0, activeStage: 0, sectionIndex: 5, attempts: {},
    });

    await expect(page.locator("figure").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Lihat urutannya|Putar ulang/ })).toHaveCount(0);

    const opacity = await page
      .locator("figure svg g")
      .filter({ hasText: "Rencana" })
      .first()
      .evaluate((element) => Number(getComputedStyle(element).opacity));
    expect(opacity).toBeGreaterThan(0.9);
  });

  test("token-stream juga utuh tanpa animasi", async ({ page }) => {
    await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
      completedStages: [0], unlockedStage: 1, activeStage: 1, sectionIndex: 6, attempts: {},
    });

    const figure = page.locator("figure").first();
    for (const label of ["Indonesia", "Jakarta", "71%"]) {
      const node = figure.locator("svg text", { hasText: new RegExp("^" + label + "$") }).first();
      const opacity = await node.evaluate((element) => {
        const group = element.closest("g");
        return group ? Number(getComputedStyle(group).opacity) : 1;
      });
      expect(opacity, label + " harus terlihat tanpa animasi").toBeGreaterThan(0.9);
    }
  });
});

test("token-stream menggambar kalimat tumbuh dan bobot kandidatnya", async ({ page }) => {
  await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
    completedStages: [0], unlockedStage: 1, activeStage: 1, sectionIndex: 6, attempts: {},
  });

  const figure = page.locator("figure").first();
  await expect(figure.getByRole("img", { name: /menyusun jawaban satu potongan/ })).toBeVisible();
  // Animasi memunculkan token bertahap; tunggu potongan terakhir dan kandidatnya.
  await expect(figure.getByText("Jakarta")).toBeVisible();
  await expect(figure.getByText("71%")).toBeVisible();
  // Animasi bertahap bersifat opt-in; labelnya berubah sesudah ditekan sekali.
  const replay = page.getByRole("button", { name: "Lihat urutannya" });
  await expect(replay).toBeVisible();
  await replay.click();
  await expect(page.getByRole("button", { name: "Putar ulang" })).toBeVisible();
  await expect(figure.getByText("Jakarta")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("classify-boundary menggeser batas saat contoh ditambah", async ({ page }) => {
  await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
    completedStages: [0], unlockedStage: 1, activeStage: 1, sectionIndex: 1, attempts: {},
  });

  await expect(page.getByText(/Batas ini ditarik dari contoh/)).toBeVisible();
  await page.getByRole("button", { name: "12 contoh" }).click();
  await expect(page.getByText(/Dua contoh baru menggeser batasnya/)).toBeVisible();
  await page.getByRole("button", { name: "10 contoh" }).click();
  await expect(page.getByText(/Batas ini ditarik dari contoh/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("permission-gate tampil di pelajaran izin agent", async ({ page }) => {
  await openAt(page, vibeKey, "/learn/vibe-coding/lesson", {
    completedStages: [0, 1], unlockedStage: 2, activeStage: 2, sectionIndex: 1, attempts: {},
  });

  const figure = page.locator("figure").first();
  await expect(figure.getByRole("img", { name: /Tiga jalur izin/ })).toBeVisible();
  await expect(figure.getByText("minta persetujuanmu", { exact: true })).toBeVisible();
  // Area diagram bisa digeser mendatar, jadi harus bisa dicapai keyboard.
  const region = figure.getByRole("group", { name: /Diagram: Tiga jalur izin/ });
  await region.focus();
  await expect(region).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("diagram tidak menimbulkan scroll horizontal di ponsel", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openAt(page, fundamentalsKey, "/learn/ai-fundamentals/module-1", {
    completedStages: [0], unlockedStage: 1, activeStage: 1, sectionIndex: 4, attempts: {},
  });

  await expect(page.locator("figure").first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
