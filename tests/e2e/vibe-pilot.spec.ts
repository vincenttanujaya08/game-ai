import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const path = "/dev/yes-man-pilot/vibe-coding";
const key = "nusa-vibe-coding-pilot-v3";
async function next(page: Page) {
  await page.locator("footer").getByRole("button").last().click();
}
async function timer(page: Page, reset = true) {
  await page.getByRole("button", { name: "Mulai", exact: true }).click();
  await page.getByRole("button", { name: "Jalankan satu langkah" }).click();
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  if (reset)
    await page.getByRole("button", { name: "Reset", exact: true }).click();
}

test("vibe pilot: full learner flow, real choices, bug and resume", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 390, height: 844 });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(path);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bikin aplikasi dengan AI, tapi tetap tahu apa yang sedang terjadi",
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({
    path: "/tmp/vibe-pilot-intro-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Lanjutkan →", exact: true }).click();
  await page.reload();
  await expect(page.getByText(/Timer dipilih bukan karena/)).toBeVisible();
  await page.getByRole("button", { name: "Lanjutkan →", exact: true }).click();
  await page
    .getByRole("button", { name: "Lihat bagaimana agent bekerja" })
    .click();
  await expect(page.locator("footer button").last()).toBeDisabled();
  await page.getByRole("button", { name: /^A\. / }).click();
  await expect(page.locator("footer button").last()).toBeDisabled();
  await page.getByRole("button", { name: /^C\. / }).click();
  await expect(page.getByText(/App.jsx.*mencoba mengambil/)).toBeVisible();
  await next(page);
  for (let i = 0; i < 3; i++)
    await page
      .locator('[class*="matchRow__"]')
      .nth(i)
      .getByRole("button")
      .nth(i)
      .click();
  await page
    .getByRole("button", { name: "Periksa pilihan", exact: true })
    .click();
  await next(page);
  await page
    .getByRole("button", { name: /^Mulai dengan model ringan/ })
    .click();
  await next(page);
  for (let i = 0; i < 3; i++)
    await page
      .locator('[class*="matchRow__"]')
      .nth(i)
      .getByRole("button")
      .nth(i)
      .click();
  await page
    .getByRole("button", { name: "Periksa pilihan", exact: true })
    .click();
  await next(page);
  await page
    .getByRole("button", {
      name: /^Cocokkan nama file dengan rencana/,
    })
    .click();
  await expect(page.locator("footer button").last()).toBeDisabled();
  await page
    .getByRole("button", {
      name: /^Periksa diff dan isi perintah pemeriksaan/,
    })
    .click();
  await next(page);
  await page
    .getByRole("button", { name: "Izinkan tindakan ini", exact: true })
    .click();
  await next(page);
  await page
    .getByRole("button", { name: "Lihat rencananya", exact: true })
    .click();
  await expect(
    page.getByText("belum jelas siapa yang akan memakai aplikasi.", {
      exact: true,
    }),
  ).toBeVisible();
  for (const label of [
    "Siapa yang memakai?",
    "Apa yang harus bekerja di versi pertama?",
    "Apa yang belum perlu dibuat?",
  ])
    await page.getByRole("button", { name: label }).click();
  await expect(page.locator("footer button").last()).toBeDisabled();
  await page
    .getByRole("button", { name: "Lihat rencananya", exact: true })
    .click();
  await expect(
    page.getByText("rencana bisa fokus pada timer sederhana.", { exact: true }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await next(page);
  for (let i = 0; i < 6; i++)
    await page
      .locator('[class*="matchRow__"]')
      .nth(i)
      .getByRole("button", {
        name: i % 2 === 0 ? "Perlu sekarang" : "Belum perlu",
        exact: true,
      })
      .click();
  await page
    .getByRole("button", { name: "Periksa pilihan", exact: true })
    .click();
  await next(page);
  await page.getByRole("button", { name: "B", exact: true }).click();
  await next(page);
  await page
    .getByRole("button", { name: "Naikkan Tampilan utama", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Naikkan Fungsi timer", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Naikkan Fungsi timer", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Periksa urutan", exact: true })
    .click();
  await next(page);
  await page
    .getByRole("button", {
      name: /^Tambahkan hitung mundur dan perilaku Mulai dulu/,
    })
    .click();
  await next(page);
  await timer(page);
  await next(page);
  await page.getByRole("button", { name: /package.json/ }).click();
  await page
    .getByRole("button", { name: "Periksa perubahan", exact: true })
    .click();
  await next(page);
  await page
    .getByRole("button", { name: "Lihat perubahan file", exact: true })
    .click();
  await next(page);
  await expect(
    page.getByText("Yang terjadi", { exact: true }),
  ).not.toBeVisible();
  await timer(page, false);
  await expect(
    page.getByText("Waktu kembali ke 25:00.", { exact: true }),
  ).toBeVisible();
  await next(page);
  await page
    .getByRole("button", { name: /^Setelah Mulai berjalan beberapa detik/ })
    .click();
  await next(page);
  await page.getByRole("button", { name: "Mulai", exact: true }).click();
  await page.getByRole("button", { name: "Jalankan satu langkah" }).click();
  await page.getByRole("button", { name: "Jeda", exact: true }).click();
  await expect(page.getByText("24:55", { exact: true })).toBeVisible();
  await expect(page.locator("footer button").last()).toBeDisabled();
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await next(page);
  await page
    .getByRole("button", {
      name: /^Simpan pilihan durasi di browser yang sama/,
    })
    .click();
  await next(page);
  await page
    .getByRole("button", {
      name: /^Tentukan data dan cara mengenali pengguna atau perangkat/,
    })
    .click();
  await next(page);
  await page
    .getByRole("button", { name: /^Alamat localhost menuju komputer/ })
    .click();
  await next(page);
  for (let i = 1; i <= 3; i++)
    await page
      .getByRole("button", { name: `Periksa temuan ${i}`, exact: true })
      .click();
  await next(page);
  await page
    .getByRole("button", { name: /Upload langsung melalui layanan/ })
    .click();
  await expect(
    page.getByText("https://timer-belajar.example", { exact: true }),
  ).toBeVisible();
  await next(page);
  await page
    .getByRole("button", {
      name: /^Buka URL publik dari perangkat lain dan ulangi/,
    })
    .click();
  await next(page);
  const fields = [
    "Study planner untuk mahasiswa",
    "Mencatat tugas dan tenggat",
    "Belum perlu login",
    "Mencoba menambah dan menyelesaikan tugas",
  ];
  for (let i = 0; i < fields.length; i++)
    await page.getByRole("textbox").nth(i).fill(fields[i]);
  await page.getByRole("button", { name: "Jeda belajar", exact: true }).click();
  await page.reload();
  for (let i = 0; i < fields.length; i++)
    await expect(page.getByRole("textbox").nth(i)).toHaveValue(fields[i]);
  await next(page);
  await page.getByRole("textbox").nth(0).fill("Saya membatasi versi pertama.");
  await next(page);
  await expect(
    page.getByText(
      "Kamu tidak perlu mengingat setiap istilah dari course ini. Yang lebih penting adalah pola kerjanya: jangan biarkan agent menebak terlalu banyak, jangan menerima perubahan tanpa melihat dampaknya, dan jangan menganggap sesuatu selesai sebelum kamu sendiri mencoba hasilnya.",
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByText("Coba project sungguhan", { exact: true }).click();
  await expect(
    page.getByText(/Tadi semua langkah masih berupa simulasi/),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const saved = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(saved.finished).toBe(true);
  expect(saved.helped).toEqual([]);
});

test("vibe pilot: assistance is recorded and does not claim independent success", async ({
  page,
}) => {
  await page.goto(path);
  await page.getByRole("button", { name: "Lanjutkan →", exact: true }).click();
  await page.reload();
  await expect(page.getByText(/Timer dipilih bukan karena/)).toBeVisible();
  await page.getByRole("button", { name: "Lanjutkan →", exact: true }).click();
  await page
    .getByRole("button", { name: "Lihat bagaimana agent bekerja" })
    .click();
  await page
    .getByRole("button", { name: "Lihat pembahasan dan lanjut", exact: true })
    .click();
  await expect(
    page.getByText("Dilanjutkan dengan pembahasan.", { exact: true }),
  ).toBeVisible();
  await next(page);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Chat, builder, model, agent — bedanya buat apa?",
  );
  const saved = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  );
  expect(saved.helped).toContain("0:0");
  expect(saved.answers["0:0:choice"]).toBeUndefined();
  await page
    .locator("footer")
    .getByRole("button", { name: "← Kembali", exact: true })
    .click();
  await page.getByRole("button", { name: /^A\. / }).click();
  await expect(page.locator("footer button").last()).toBeDisabled();
});

test("vibe pilot: every activity has one visible question and an action direction", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(path);
  const phases = [1, 2, 3, 1, 1, 2, 2, 2, 3, 2, 4, 2];
  for (let step = 0; step < phases.length; step++) {
    for (let phase = 0; phase < phases[step]; phase++) {
      await page.evaluate(
        ({ key, step, phase }) =>
          localStorage.setItem(
            key,
            JSON.stringify({
              step,
              phase,
              answers: {},
              checked: [],
              helped: [],
              finished: false,
            }),
          ),
        { key, step, phase },
      );
      await page.reload();
      const task = page.locator("[data-vibe-task]");
      await expect(task).toHaveCount(1);
      await expect(task.getByRole("heading", { level: 2 })).toBeVisible();
      await expect(task.getByRole("heading", { level: 2 })).toHaveText(/\?$/);
      await expect(task.locator("p")).not.toBeEmpty();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      if (step === 0) {
        const question = await task.boundingBox();
        const firstChoice = await page
          .getByRole("button", { name: /^A\. / })
          .boundingBox();
        expect(question!.y + question!.height).toBeLessThan(firstChoice!.y);
        await expect(
          page.getByText(/Ini contoh isi folder project/),
        ).toBeVisible();
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        );
        await page.screenshot({
          path: "/tmp/vibe-pilot-directions-mobile.png",
          fullPage: true,
        });
      }
    }
  }
});

test("vibe pilot: each revised distractor gives feedback and only the intended answer unlocks next", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto(path);
  const cases = [
    [0, 0, 2],
    [1, 1, 1],
    [2, 1, 0],
    [5, 0, 1],
    [6, 0, 2],
    [8, 1, 0],
    [9, 0, 1],
    [9, 1, 2],
    [10, 0, 1],
    [10, 3, 0],
  ];
  for (const [step, phase, correct] of cases) {
    await page.evaluate(
      ({ key, step, phase }) =>
        localStorage.setItem(
          key,
          JSON.stringify({
            step,
            phase,
            answers: {},
            checked: [],
            helped: [],
            finished: false,
          }),
        ),
      { key, step, phase },
    );
    await page.reload();
    const choices = page.locator('[class*="choices__"]').getByRole("button");
    await expect(choices).toHaveCount(step === 5 ? 2 : 3);
    for (let option = 0; option < (await choices.count()); option++) {
      if (option === correct) continue;
      await choices.nth(option).click();
      await expect(page.locator("footer button").last()).toBeDisabled();
      await expect(page.getByRole("status")).toHaveCount(1);
      await expect(page.getByRole("status")).not.toBeEmpty();
    }
    await choices.nth(correct).click();
    await expect(page.locator("footer button").last()).toBeEnabled();
  }
  await page.screenshot({
    path: "/tmp/vibe-pilot-revised-choices.png",
    fullPage: true,
  });
});
