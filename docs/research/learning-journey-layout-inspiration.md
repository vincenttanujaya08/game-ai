# Rute Belajar yang luas, kreatif, dan tetap tenang

_Riset diperiksa 15 September 2026. Ini bukan peringkat "web terbaik di dunia". Rujukan dipilih karena dimiliki oleh penyedia pembelajaran, universitas, atau organisasi standar yang menjelaskan keputusan mereka sendiri._

## Kesimpulan

**Ya, `Belajar` sebaiknya mendahului `Latihan`.** Untuk NUSA, urutan yang paling masuk akal adalah: pahami batas dan cara kerja AI, cek sebuah jawaban AI dalam kasus, lalu lihat kembali alasan keputusanmu. Game bukan tujuan yang berdiri sendiri; ia adalah ruang untuk menerapkan materi.

Namun, urutan itu tidak boleh mengunci orang ke satu jalur. Navigasi tetap memberi akses langsung ke `Latihan` bagi mahasiswa yang sudah siap. Yang berubah adalah urutan cerita pada Home dan halaman Jelajahi, bukan kebebasan pengguna.

## Bukti dari sumber resmi

| Sumber | Temuan | Keputusan untuk NUSA |
| --- | --- | --- |
| [MIT OpenCourseWare — Get Started](https://ocw.mit.edu/pages/get-started/) | MIT meminta pelajar melihat silabus dan kalender terlebih dahulu untuk memahami tujuan, topik, dan urutan pembelajaran; setelah itu mereka boleh mengikuti urutan atau memilih konsep secara mandiri. | Perlihatkan `AI Fundamentals` sebagai titik masuk yang menjelaskan tujuan dan urutan. Sediakan tautan `Langsung ke latihan` sebagai pilihan sekunder. |
| [MIT OCW — Experiencing Architecture Studio](https://www.ocw.mit.edu/courses/4-101-experiencing-architecture-studio-spring-2003/pages/syllabus/) | Mata kuliah ini memakai proyek awal untuk mempelajari kemampuan, lalu proyek akhir untuk menguji dan menunjukkan kemampuan tersebut. | Gunakan hubungan eksplisit, bukan dua menu yang tampak terpisah: `Belajar dasarnya` mengantar ke `Uji di kasus sitasi`. |
| [MIT OCW — Education Technology Studio](https://ocw.mit.edu/courses/cms-594-education-technology-studio-spring-2019/pages/syllabus/) | Struktur studio menggabungkan pembacaan, proyek praktik, refleksi, dan diskusi. | Setelah kasus, tampilkan ringkasan alasan keputusan dan tautan kembali ke materi yang relevan. Kompleksitas berasal dari siklus belajar–praktik–refleksi, bukan skor atau koleksi kartu. |
| [Kolibri Design System — Home](https://design-system.learningequality.org/) | Sistem desain Kolibri ditujukan untuk pengalaman yang konsisten, dapat diprediksi, responsif, dan aksesibel. Mereka memprioritaskan pemakaian pola bersama selama tidak menurunkan pengalaman pengguna. | Home, Belajar, Jelajahi, dan permainan memakai header, font, warna aksi, bentuk tombol, serta bahasa status yang sama. Buat satu pengecualian visual besar hanya bila membantu memahami pekerjaan pengguna. |
| [W3C — Page Structure Tutorial](https://www.w3.org/WAI/tutorials/page-structure/) | Bagian dan heading yang terstruktur membantu orang menemukan dan memprioritaskan isi, termasuk pengguna keyboard, pembaca layar, dan pembaca mobile. | Susun halaman sebagai bagian nyata, bukan dekorasi: pengantar, rute belajar, kasus, dan materi lanjutan. Heading harus menjelaskan tindakan, misalnya `Pelajari dasarnya` dan `Uji di kasus`. |
| [W3C — Disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | Detail dapat dibuka dan ditutup melalui kontrol yang jelas dan dapat dioperasikan dengan keyboard. | Simpan rincian kriteria, sumber, dan penjelasan panjang di lapisan berikutnya. Jangan memaksa semua detail masuk ke viewport pertama. |
| [GOV.UK Design System — Layout](https://design-system.service.gov.uk/styles/layout/) | Grid dapat memakai area penuh, tetapi kolom isi utama tetap dijaga agar baris teks tidak terlalu panjang untuk dibaca. | Buat komposisi lebih lebar tanpa membuat teks melebar: latar, gambar, dan jalur belajar boleh full-bleed; paragraf dan instruksi tetap di kolom baca yang sempit. |

## Arah yang direkomendasikan

### Navigasi dan urutan

Gunakan urutan navigasi yang mencerminkan jalur utama:

`Beranda` → `Belajar` → `Latihan`

`Jelajahi` boleh tetap menjadi nama rute URL, tetapi label yang tampil sebaiknya `Latihan` agar fungsinya langsung terbaca. Jangan memakai istilah yang berubah-ubah seperti `Misi`, `Quest`, atau `Eksplorasi` untuk hal yang sama.

Di halaman Jelajahi, susun konten ini:

1. **Belajar dulu** — satu modul `AI Fundamentals`, alasan singkat mengapa modul ini penting, dan CTA `Mulai belajar`.
2. **Lalu uji di kasus** — `Sitasi Bermasalah` muncul sebagai penerapan langsung dari modul tadi, lengkap dengan apa yang akan dicek dan CTA `Buka kasus`.
3. **Setelahnya, tinjau keputusan** — ringkasan hasil ada di akhir permainan dan merujuk kembali ke bagian materi yang relevan.

Home cukup menunjukkan versi ringkas dari jalur ini, dengan CTA utama menuju `Belajar`. CTA kedua menuju kasus dapat diletakkan setelah penjelasan, bukan bersaing di hero.

### Layout: terasa penuh tanpa terasa sesak

Jangan menjadikan seluruh isi selebar layar. Yang perlu dibuat lebih luas adalah **panggung visual**, bukan panjang baris teks.

- Gunakan satu band full-bleed untuk rute belajar: latar warna tenang atau gambar aktivitas belajar membentang lebar, sedangkan teks tetap berada dalam grid sekitar 1.280–1.360 px.
- Buat komposisi asimetris: panel `Belajar` lebih tinggi dan berangkat dari kiri; panel `Latihan` menyusul di kanan atau sedikit menurun. Urutan tetap terbaca dari atas ke bawah dan kembali linear pada layar kecil.
- Pertahankan lebar paragraf sekitar 60–75 karakter. Area yang lebar dipakai untuk jeda, gambar, metadata kasus, dan hubungan antarlangkah, bukan copy yang memanjang.
- Gunakan satu visual bukti yang besar per halaman: cuplikan jawaban AI, potongan sumber, atau foto kelompok belajar. Hindari empat kartu setara yang semuanya meminta perhatian.
- Jadikan perpindahan bagian terasa seperti ritme editorial: kanvas terang → satu bidang gelap/teal lebar → kanvas terang. Perubahan latar memberi orientasi tanpa perlu banyak border, stiker, atau warna status.

### Kompleks, tetapi mudah dipahami

Elemen yang memberi kedalaman sebaiknya mengungkap *hubungan*, bukan menambah ornamen:

| Yang terlihat | Makna yang perlu langsung terbaca |
| --- | --- |
| `AI Fundamentals` | “Ini bekal sebelum kamu menilai jawaban.” |
| Garis/rute pendek menuju `Sitasi Bermasalah` | “Sekarang coba pakai bekal itu pada satu jawaban AI.” |
| Kartu kasus dengan klaim, sumber, dan pilihan | “Inilah objek yang akan kamu cek.” |
| Rangkuman pascakasus | “Ini alasan keputusanmu dan bagian materi yang bisa kamu buka lagi.” |

Pakai label aksi yang konkret dan konsisten: `Mulai belajar`, `Buka kasus`, `Cek sumber`, `Lihat alasan`. Hindari `Mulai petualangan`, `Naik level`, atau skor besar; semua itu menambah gaya game tanpa menjelaskan pekerjaan akademiknya.

## Contoh struktur layar

```text
Beranda
  Hero: AI memberi jawaban. Kamu yang menilai. [Mulai belajar]
  Rute lebar: AI Fundamentals → Sitasi Bermasalah → Tinjau keputusan
  Bukti visual: klaim AI + sumber yang dapat dibuka

Belajar
  AI Fundamentals
  Penjelasan pendek + contoh
  [Uji pemahaman di Sitasi Bermasalah]

Latihan
  Belajar dulu: AI Fundamentals [Mulai belajar]
  Lalu uji di kasus: Sitasi Bermasalah [Buka kasus]
  Kasus berikutnya: status jelas, tidak pura-pura tersedia
```

## Batas yang perlu dijaga

- Jalur visual tidak boleh menjadi satu-satunya cara memahami urutan. Heading, teks, dan urutan DOM harus menyatakan hubungan yang sama.
- Jangan menyembunyikan aksi utama di bawah efek hover atau ilustrasi. Semua CTA tetap berupa tautan/tombol dengan label jelas.
- Pada mobile, ubah rute menjadi satu kolom sesuai urutan belajar → latihan → tinjau; jangan mempertahankan tata letak silang yang membuat pengguna harus menebak arah baca.
- Validasi dengan 5–8 mahasiswa: minta mereka membuka Home lalu jelaskan langkah pertama, manfaat latihan, dan cara kembali ke materi. Bila mereka menyebut “main game” sebelum memahami tujuannya, hubungan Belajar → Latihan belum cukup jelas.
