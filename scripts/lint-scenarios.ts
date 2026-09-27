import {citationMini}from"../src/server/scenario/citation-mini";import{ScenarioDefinitionSchema,toPublicScenario}from"../src/shared/contracts/scenario";const parsed=ScenarioDefinitionSchema.parse(citationMini),publicJson=JSON.stringify(toPublicScenario(parsed));if(/expectedLinks|rules|contentHash/.test(publicJson))throw new Error("Hidden truth leaked");for(const d of parsed.documents)if(d.classification==="restricted"&&d.contextPolicy.mode==="allowed_full")throw new Error(`Restricted context: ${d.id}`);console.log(`scenario valid: ${parsed.id}`);

/* Kasus 02, "Kamera yang Rusak". Aturan yang selama ini tidak dijaga apa pun:
   tanpa em dash, graf saksi yang utuh, dan anggaran yang bisa diselesaikan. */
import { readFileSync } from "node:fs";
import { KameraRusakSchema, outcomeIds, tokenNaskah } from "../src/features/broken-camera/scenario-schema";

const kamera = KameraRusakSchema.parse(JSON.parse(readFileSync("src/content/kamera-rusak.id.json", "utf8")));
const galat: string[] = [];
const cek = (lolos: boolean, pesan: string) => { if (!lolos) galat.push(pesan); };

/* 1. Tanda baca yang dilarang naskah proyek ini, di string mana pun. */
const semuaTeks: [string, string][] = [];
const telusuri = (nilai: unknown, jalan: string) => {
  if (typeof nilai === "string") semuaTeks.push([jalan, nilai]);
  else if (Array.isArray(nilai)) nilai.forEach((item, index) => telusuri(item, `${jalan}[${index}]`));
  else if (nilai && typeof nilai === "object") {
    for (const [kunci, isi] of Object.entries(nilai)) telusuri(isi, jalan ? `${jalan}.${kunci}` : kunci);
  }
};
telusuri(kamera, "");
for (const [jalan, teks] of semuaTeks) {
  cek(!teks.includes("\u2014"), `em dash di ${jalan}`);
  cek(!teks.includes("--"), `dua tanda hubung di ${jalan}`);
}

/* 2. Tanpa istilah aksi berbahasa Inggris. */
const inggris = /\b(start|submit|next|back|continue|skip|retry|finish|play|score|level|quiz|hint|timer|button|click|player)\b/i;
for (const [jalan, teks] of semuaTeks) cek(!inggris.test(teks), `istilah Inggris di ${jalan}: ${teks.slice(0, 40)}`);

/* 3. Graf saksi utuh, asiklik, dan seluruhnya terjangkau dari satu titik awal. */
const idTokoh = new Set(kamera.tokoh.map((orang) => orang.id));
for (const orang of kamera.tokoh) {
  for (const butuh of orang.buka) cek(idTokoh.has(butuh), `prasyarat tidak dikenal: ${orang.id} butuh ${butuh}`);
}
for (const bukti of kamera.bukti) cek(idTokoh.has(bukti.bukaSetelah), `bukti ${bukti.id} menunggu orang tak dikenal`);
for (const beat of kamera.linimasa) {
  for (const butuh of beat.butuh) cek(idTokoh.has(butuh), `linimasa menunggu orang tak dikenal: ${butuh}`);
}
const awal = kamera.tokoh.filter((orang) => orang.buka.length === 0);
cek(awal.length === 1, `titik awal harus tepat satu, ada ${awal.length}`);
let terbuka = awal.map((orang) => orang.id);
for (let putaran = 0; putaran < kamera.tokoh.length; putaran += 1) {
  terbuka = kamera.tokoh.filter((orang) => orang.buka.every((id) => terbuka.includes(id))).map((orang) => orang.id);
}
cek(terbuka.length === kamera.tokoh.length, "ada orang yang tidak pernah bisa terbuka");
for (const fase of kamera.fase) {
  for (const id of fase.ids) cek(idTokoh.has(id), `fase memuat orang tak dikenal: ${id}`);
}
cek(kamera.fase.flatMap((fase) => fase.ids).length === kamera.tokoh.length, "tidak semua orang muncul di fase");

/* 4. Tiap jalur punya saksinya sendiri, dan tiap saksi paling banyak satu jalur. */
const idJalur = new Set(kamera.jalur.map((item) => item.id));
for (const orang of kamera.tokoh) {
  if (orang.jalur !== null) cek(idJalur.has(orang.jalur), `jalur tak dikenal pada ${orang.id}`);
}
for (const item of kamera.jalur) {
  const anggota = kamera.tokoh.filter((orang) => orang.jalur === item.id).map((orang) => orang.id);
  cek(
    anggota.length === item.saksi.length && item.saksi.every((id) => anggota.includes(id)),
    `saksi jalur ${item.id} tidak cocok dengan daftar tokoh`,
  );
  cek(item.saksi.length >= 2, `jalur ${item.id} butuh minimal dua saksi supaya bisa dikuatkan`);
}
for (const bukti of kamera.bukti) {
  if (bukti.jalur !== null) cek(idJalur.has(bukti.jalur), `bukti ${bukti.id} menunjuk jalur tak dikenal`);
}
cek(kamera.tokoh.some((orang) => orang.celah), "tidak ada keterangan yang menandai celah pemeriksaan lensa");
cek(kamera.bukti.some((item) => item.celah), "tidak ada bukti yang menandai celah pemeriksaan lensa");

/* 5. Naskah hasil lengkap, dan tokennya bisa diisi kode. */
cek(
  outcomeIds.every((id) => kamera.hasil[id]) && Object.keys(kamera.hasil).length === outcomeIds.length,
  "naskah hasil tidak sama dengan daftar OutcomeId",
);
const tokenDipakai = (teks: string) => [...teks.matchAll(/\{(\w+)\}/g)].map((cocok) => cocok[1]);
for (const [jalan, teks] of semuaTeks) {
  const bagian = jalan.split(/[.[]/)[0];
  const diizinkan = tokenNaskah[bagian];
  for (const token of tokenDipakai(teks)) {
    cek(Boolean(diizinkan?.includes(token)), `token {${token}} tidak bisa diisi kode, di ${jalan}`);
  }
}

/* 6. Anggaran bisa diselesaikan, dan pertukarannya tetap hidup. */
const { anggaranDetik, biayaWawancaraDetik, biayaDalamiDetik, batasWawancaraAkhir } = kamera.meta;
const jumlahTokoh = kamera.tokoh.length;
cek(batasWawancaraAkhir <= jumlahTokoh, "batas wawancara melebihi jumlah orang");
cek(batasWawancaraAkhir * biayaWawancaraDetik <= anggaranDetik, "batas wawancara tidak terjangkau anggaran");
cek(
  batasWawancaraAkhir * biayaWawancaraDetik + biayaDalamiDetik <= anggaranDetik,
  "tidak ada sisa untuk satu pertanyaan lanjutan pun setelah batas wawancara",
);
cek(jumlahTokoh * biayaWawancaraDetik <= anggaranDetik, "mewawancarai semua orang tidak terjangkau");
cek(
  jumlahTokoh * biayaWawancaraDetik + biayaDalamiDetik > anggaranDetik,
  "luas dan dalam sekaligus masih terjangkau, jadi tidak ada pertukaran",
);
cek(biayaDalamiDetik % biayaWawancaraDetik === 0, "harga pendalaman harus kelipatan harga wawancara");
cek(
  kamera.keterbatasan.some((item) => item.berlaku === "selalu"),
  "harus ada keterbatasan yang selalu berlaku, supaya selalu ada jawaban benar",
);
cek(
  kamera.keterbatasan.some((item) => item.berlaku === "tidakPernah"),
  "harus ada keterbatasan yang tidak pernah berlaku, supaya pilihannya bermakna",
);

if (galat.length) {
  console.error(galat.map((pesan) => `  ${pesan}`).join("\n"));
  throw new Error(`kamera-rusak: ${galat.length} pelanggaran isi`);
}
console.log(`scenario valid: kamera-rusak ${kamera.meta.versi} (${semuaTeks.length} string diperiksa)`);
