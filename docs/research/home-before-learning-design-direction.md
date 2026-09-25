# NUSA Lab: arah desain beranda sebelum materi belajar

_Riset: 16 September 2026. Ruang lingkup: pengalaman sebelum pengguna memasuki `AI Fundamentals`; halaman materi dan temanya tidak diubah._

## Keputusan desain

Jadikan Beranda sebagai **pintu masuk studio kampus** yang menjelaskan tujuan dan menunjukkan bentuk karya yang mungkin dibuat. Jadikan `/learn` satu-satunya tempat untuk memilih/melanjutkan pembelajaran. Dengan begitu, Beranda dan Jelajahi tidak lagi menjelaskan hal yang sama, sementara `AI Fundamentals` tetap menjadi pengalaman belajar yang sudah ada.

Narasi program yang direkomendasikan:

> **Paham AI. Pakai dengan pertimbangan. Bangun sesuatu yang berguna.**

Ini bukan halaman "koleksi materi" dan bukan pula landing page AI generik. Pengunjung harus segera melihat: siapa program ini, tiga kemampuan yang akan dilalui, karya nyata yang dapat dihasilkan, dan satu tindakan untuk memulai.

## Apa yang menjadi inspirasi — dan pelajarannya

| Rujukan resmi | Pola yang terlihat | Terjemahan untuk NUSA |
| --- | --- | --- |
| [OpenAI Academy untuk mahasiswa](https://academy.openai.com/pages/higher-ed-students-krs3cf) | Konten dikelompokkan menurut tujuan mahasiswa: memahami konsep, memperbaiki pekerjaan, merencanakan proyek, lalu melampaui kelas. | Susun isi menurut **outcome**, bukan menu/halaman yang berulang. |
| [OpenAI Academy Courses](https://academy.openai.com/pages/courses) | Jalur bergerak dari memahami, menerapkan dalam pekerjaan nyata, hingga membangun solusi; praktik dan review output tetap bagian dari proses. | Tiga tahap `Paham → Pakai → Bangun` cukup kuat sebagai struktur program. |
| [Panduan AI Activator, OpenAI Academy](https://academy.openai.com/public/clubs/champions-ecqup/resources/getting-started-as-an-ai-activator-2026-06-08) | Mulai dari pekerjaan, friction, dan outcome; batas AI/manusia serta pengujian kasus nyata dibuat jelas. | Kartu proyek harus dimulai dari masalah kampus dan artefak, bukan dari kata "AI" atau teknologi. |
| [Khan Academy: Getting Started](https://www.khanacademy.org/resources/students/resources-for-students/a/getting-started-with-khan-academy) | Siklusnya jelas: pilih kursus/unit, ukur posisi awal, pelajari, praktik, lihat kemajuan. | Tampilkan format yang konkret, misalnya `4 pelajaran · 1 latihan · 1 mini project`, bukan hanya judul modul. |
| [Apple HIG: Layout](https://developer.apple.com/design/human-interface-guidelines/layout) dan [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) | Konten penting ditempatkan di awal; onboarding sebaiknya singkat dan opsional, bukan esai panjang. | CTA terbaik adalah ajakan kecil yang nyata—mis. `Mulai dari dasar` atau diagnosis 5 menit—bukan penjelasan panjang kedua. |
| [Material 3 canonical layouts](https://m3.material.io/foundations/layout/canonical-examples/overview) | Feed cocok untuk pemindaian banyak item; supporting pane memberi ruang pada detail tanpa mengubur konten utama. | Buat halaman terasa kaya dengan daftar artefak, status, dan konteks; jangan menjadikannya wall of cards. |
| [Linear: design refresh](https://linear.app/now/behind-the-latest-design-refresh) | Informasi padat tetap tenang ketika elemen inti diberi bobot visual paling besar dan navigasi mundur. | Beranda boleh berisi banyak bukti, tetapi hanya satu hal pada satu waktu yang boleh "berteriak". |
| [Google Material: Beyond Minimalism](https://design.google/library/minimal-meaningful) | Terlalu minimal dapat terasa dingin dan tidak menginspirasi; bentuk dan skala bisa membawa hierarki serta rasa. | Hindari ruang kosong yang tidak melakukan apa-apa. Isi dengan bukti, artefak, editorial label, dan struktur—bukan dekorasi AI abstrak. |

## Struktur halaman yang disarankan

Urutannya memberi tiap scroll tugas yang berbeda dan menghindari pengulangan Beranda/Jelajahi.

1. **Hero: janji program + satu artefak nyata.**
   Di kiri: judul besar, satu paragraf, satu CTA `Mulai dari dasar`. Di kanan: panel "Bangun minggu ini" berisi brief mini yang nyata—mis. _"Bantu panitia kampus membuat laman info acara yang jelas"_—dengan tiga baris proses `Brief → Prototype → uji`. Ini lebih manusiawi daripada robot, gradient, atau render AI.
2. **Rute program: tiga tahap, bukan dua halaman.**
   `01 Paham AI` (tersedia; menuju `/learn`), `02 Pakai AI` (terkunci/segera hadir), `03 Bangun dengan AI` (terkunci/segera hadir). Masing-masing menunjukkan fokus, format, dan output secara singkat. Bentuknya dapat asimetris/bernomor besar agar terasa editorial, bukan tiga kartu SaaS identik.
3. **Bukti bentuk karya.**
   Tampilkan 3 contoh artifact dengan label proses, bukan klaim testimoni atau angka palsu: _brief riset tervalidasi_, _workflow konten/otomasi_, _prototype web atau tool kampus_. Sertakan status jujur seperti `contoh arah proyek` jika belum merupakan karya mahasiswa. Gunakan cuplikan dokumen, wireframe, source-check, atau foto kegiatan yang nyata; bukan gambar orang/robot hasil AI.
4. **Cara belajar di NUSA.**
   Satu strip singkat: `Temukan masalah → beri konteks → buat versi awal → cek & uji → bagikan`. Ini menyatukan karya non-kode dan vibe coding tanpa menyamakan keduanya.
5. **Lanjutkan perjalanan.**
   Jika ada progres, munculkan "Lanjutkan AI Fundamentals" dengan progres sebenarnya. Jika belum ada, tampilkan detail jelas tentang modul pertama dan CTA yang sama. Materi yang belum tersedia tetap terlihat sebagai terkunci, bukan link yang mengecewakan.

## Definisi produk untuk tahap ketiga

Nama modul: **Bangun dengan AI**. Vibe coding adalah salah satu cara dalam jalur ini untuk membuat software melalui arahan, iterasi, dan pengujian bersama AI; ia tidak terbatas pada situs web, dan bukan keseluruhan definisi dari "membangun".

Dua tipe keluaran harus hidup berdampingan:

- **Karya/workflow non-kode:** riset yang tervalidasi, presentasi, kampanye, workflow konten, atau otomasi.
- **Produk digital:** laman web, prototype aplikasi, tool kampus, bot, atau otomasi yang dibangun dengan AI/vibe coding.

Setiap proyek perlu menampilkan: _masalah → artifact → pemeriksaan manusia_. Ini menghindari pesan keliru bahwa tujuan belajar hanya menghasilkan output AI dengan cepat.

## Guardrail visual dan isi

### Tetap konsisten dengan NUSA yang ada

- Pertahankan `Geist` lewat `--font-nusa`; jangan menambah display font baru. Bedakan hirarki lewat ukuran, weight, letter-spacing, dan label huruf kapital kecil.
- Pertahankan tinta navy (`#102b43`), teal (`#087b78`), teal-soft, coral, dan garis tipis yang sudah membangun identitas. Pakai navy sebagai momen struktur/kontras, teal untuk aksi/progres, coral hanya untuk perhatian/pemeriksaan—bukan semua elemen sekaligus.
- Pertahankan bahasa Indonesia yang tenang, spesifik, dan aktif. Gunakan kata kerja yang menunjukkan kerja nyata: `cek`, `uji`, `susun`, `bangun`, `bagikan`.
- Tetap gunakan foto kampus/artefak nyata yang sudah tersedia bila relevan. Konsistensi visual berarti gambar, ikon garis, dan potongan UI mempunyai peran informatif yang sama.

### Jangan sampai terasa AI-generated atau kosong

- Hindari aurora/mesh gradient, bola 3D, robot, neon ungu-biru, fake chat screenshot, orbit/partikel, dan "logo wall" tanpa kemitraan nyata.
- Hindari kartu mengambang berlapis, metrik/testimoni yang belum dapat dibuktikan, serta ilustrasi stok yang tidak mengajarkan apa pun.
- Jangan mengisi halaman dengan whitespace tanpa struktur. Ruang kosong harus memisahkan perubahan ide; kepadatan datang dari label, artefak, metadata jujur, garis grid, dan contoh yang bisa dibaca.
- Jangan menduplikasi halaman `Jelajahi`: informasi penemuan dan status modul sebaiknya menjadi bagian dari Beranda atau `/learn`; navigasi cukup mengarahkan ke Beranda dan Belajar.
- Jagalah aksesibilitas: satu `h1`, heading yang deskriptif, kontras warna cukup, CTA bermakna, dan efek gerak opsional/menuruti `prefers-reduced-motion`.

## Kriteria keberhasilan sebelum implementasi

Seorang mahasiswa yang memindai halaman dalam beberapa detik harus dapat menjawab: (1) NUSA mengajarkan apa, (2) saya mulai dari mana hari ini, (3) apa bedanya Paham/Pakai/Bangun, dan (4) seperti apa karya yang bisa saya hasilkan. Jika sebuah section tidak membantu salah satu jawaban tersebut, ia tidak perlu ditambahkan.
