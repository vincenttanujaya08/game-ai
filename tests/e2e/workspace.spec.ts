import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("alur singkat dari brief hingga mengirim revisi", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Belajar sambil main, yuk!" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Game berikutnya" }).click();
  await expect(
    page.getByRole("heading", { name: "Game baru segera hadir!" }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Game sebelumnya" }).click();
  const citationGame = page.getByRole("link", { name: /Sitasi Bermasalah/ });
  await expect(citationGame).toBeInViewport();
  await citationGame.click();
  await expect(page).toHaveTitle(/Simulasi Sitasi Bermasalah/);
  await expect(
    page.getByRole("heading", {
      name: "Sitasi Bermasalah",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Mulai main" }).click();

  await expect(
    page.getByRole("heading", { name: "Tolong cek draf ini sebelum kelas" }),
  ).toBeVisible();
  await expect(
    page.getByText(/Apakah literasi AI hanya berarti mampu menggunakan alat/),
  ).toBeVisible();
  await expect(
    page.getByText(/Tugasmu: cari bukti untuk menguji/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Buka chat Raka" }).click();
  await expect(page.getByText(/Cari bukti untuk menguji:/)).toBeVisible();

  const misleading = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Data Lengkap: AI Meningkatkan Nilai Mahasiswa",
    }),
  });
  await misleading.getByRole("button", { name: "Buka" }).click();
  await page.getByRole("link", { name: /Periksa data studinya/ }).click();
  await expect(
    page.getByText(/Kuesioner tidak meminta nilai mata kuliah/),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Tutup dokumen" }).click();

  const unesco = page.locator("article").filter({
    has: page.getByRole("heading", { name: "Kerangka literasi AI UNESCO" }),
  });
  await unesco.getByRole("button", { name: "Buka" }).click();
  await page
    .getByRole("link", { name: /Lompat ke bagian yang dikutip/ })
    .click();
  await expect(page.locator("#kutipan-valid-unesco mark")).toBeInViewport();
  await page.getByRole("button", { name: "Pilih untuk AIRA" }).click();

  await page.getByRole("button", { name: /Lanjut ke AIRA/ }).click();
  await expect(
    page.getByText(/Aku membantu menulis dari dokumen pilihanmu/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Kirim ke AIRA" }).click();
  await page.getByRole("button", { name: /Bawa hasil ke Dr. Maya/ }).click();
  await page.getByLabel(/Saya sudah membaca hasil AIRA/).check();
  await page.getByRole("button", { name: /Kirim revisi/ }).click();

  await expect(
    page.getByRole("heading", { name: "Revisi terkirim." }),
  ).toBeVisible();
  await expect(
    page.getByText(/Klaim, sumber, dan tanggung jawabmu sudah jelas/),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tiga keputusan yang dinilai" }),
  ).toBeVisible();
  await expect(page.locator(".result-decisions li.met")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Bawa cara ini ke tugas berikutnya" }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("status tautan tersembunyi dan risiko data muncul setelah dikirim", async ({
  page,
}) => {
  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/");
  await page.getByRole("link", { name: /Sitasi Bermasalah/ }).click();
  await page.getByRole("button", { name: "Mulai main" }).click();
  await page.getByRole("button", { name: "Buka chat Raka" }).click();

  const broken = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Kerangka Kompetensi AI OECD untuk Mahasiswa",
    }),
  });
  await expect(broken).not.toContainText(/rusak|404|tidak tersedia/i);
  await broken.getByRole("button", { name: "Buka" }).click();
  await expect(page.getByText("404", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Tutup dokumen" }).click();

  await page
    .getByRole("button", {
      name: "Pilih Daftar peserta kegiatan kampus untuk AIRA",
    })
    .click();
  await page
    .getByRole("button", {
      name: "Pilih Kerangka literasi AI UNESCO untuk AIRA",
    })
    .click();
  await page.getByRole("button", { name: /Lanjut ke AIRA/ }).click();
  await page.getByRole("button", { name: "Kirim ke AIRA" }).click();
  await page.getByRole("button", { name: /Bawa hasil ke Dr. Maya/ }).click();
  await page.getByLabel(/Saya sudah membaca hasil AIRA/).check();
  await page.getByRole("button", { name: /Kirim revisi/ }).click();

  await expect(
    page.getByText(/daftar peserta berisi data pribadi/i),
  ).toBeVisible();
  await expect(
    page.getByText(/Jangan kirim nama, email, atau nomor telepon/i),
  ).toBeVisible();
});

test("lampiran Raka dapat digulir dan dipilih dengan centang hijau", async ({
  page,
}) => {
  await page.request.post("/api/v1/sessions?reset");
  await page.goto("/");
  await page.getByRole("link", { name: /Sitasi Bermasalah/ }).click();
  await page.getByRole("button", { name: "Mulai main" }).click();
  await page.getByRole("button", { name: "Buka chat Raka" }).click();

  const messages = page.locator(".message-stack");
  await expect
    .poll(() =>
      messages.evaluate(
        (element) => element.scrollHeight > element.clientHeight,
      ),
    )
    .toBe(true);
  await messages.evaluate((element) =>
    element.scrollTo(0, element.scrollHeight),
  );
  await expect
    .poll(() => messages.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);

  const pickUnesco = page.getByRole("button", {
    name: "Pilih Kerangka literasi AI UNESCO untuk AIRA",
  });
  await expect(pickUnesco).toHaveAttribute("aria-pressed", "false");
  await expect(pickUnesco).toHaveText("✓");
  await pickUnesco.click();
  const removeUnesco = page.getByRole("button", {
    name: "Keluarkan Kerangka literasi AI UNESCO dari AIRA",
  });
  await expect(removeUnesco).toHaveAttribute("aria-pressed", "true");
  await expect(removeUnesco).toHaveCSS("color", "rgb(22, 139, 99)");

  const ethicsModule = page.locator("article").filter({
    has: page.getByRole("heading", {
      name: "Modul etika dan data dalam penggunaan AI",
    }),
  });
  await ethicsModule.getByRole("button", { name: "Buka" }).click();
  const pageFooter = page.locator(".document-sheet > footer");
  await expect(pageFooter).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(pageFooter).toHaveCSS("min-height", "0px");
  await expect
    .poll(() =>
      pageFooter.evaluate((footer) => {
        const contentBottom =
          footer.previousElementSibling?.getBoundingClientRect().bottom;
        return contentBottom === undefined
          ? false
          : contentBottom <= footer.getBoundingClientRect().top;
      }),
    )
    .toBe(true);
});
