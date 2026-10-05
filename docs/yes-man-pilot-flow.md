> Navigasi pilot diperbarui: `/dev/yes-man-pilot` kini daftar dua course. Prompt Engineering dibuka di `/dev/yes-man-pilot/prompt-engineering`; AI Fundamentals di `/dev/yes-man-pilot/ai-fundamentals`.

# Prompt Engineering — dokumentasi lengkap alur yang diterapkan

> Pembaruan materi: pilot kini memuat pengantar, teori singkat pada langkah terkait, penjelasan tambahan yang bisa dibuka, dan glosarium dari `prompt-engineering-materi-lengkap.md`. Tambahan teks lengkap dicatat pada bagian akhir dokumen ini. Transkripsi dan checksum sebelumnya adalah catatan sebelum tambahan teori tersebut. Pengantar dibuka sebelum latihan baru; progres lama tetap dapat dilanjutkan. Tombol Mulai dari awal kini membuka pengantar lagi.

Dokumen ini mencatat implementasi pilot yang ada di kode pada **3 Oktober 2026**, setelah penerapan teks dan pengantar dari `prompt-engineering-pilot-revisi-natural.md`, dengan tampilan bertahap dan pilihan “Sudah cukup” yang eksklusif. Ini menggantikan dokumentasi alur sebelumnya. Teks diambil dari data dan hasil render komponen terbaru, bukan disalin dari rancangan lama.

Ada **12 bagian, 34 langkah utama**, satu halaman selesai, dan latihan kasus baru opsional. Tidak ada API AI pada interaksi; semua jawaban simulasi sudah disiapkan. Durasi 8–10 menit adalah target rancangan, belum hasil pengukuran peserta.

Lokasi: branch `feature/microlearning-yesman-pilot`, worktree `.worktrees/yes-man-pilot`. URL `http://localhost:3000/dev/yes-man-pilot`. Route hanya tersedia dalam development; selain development menghasilkan 404. Halaman ini belum menggantikan course utama dan belum di-deploy.

Dalam contoh di dokumen, teks `[Permintaan utama peserta]`, `[Konteks peserta]`, `[Batasan peserta]`, `[Format peserta]`, `[Contoh peserta]`, dan `[Tulisan peserta]` mewakili input bebas. Aplikasi tidak mengisi kolom dengan placeholder dokumentasi ini. Penanda `[cara daftar]` dan penanda isi brief memang tampil sebagai bagian contoh AI.

## Daftar bagian dan langkah

| Bagian | Judul | Langkah | Tombol menuju bagian berikutnya |
| --- | --- | --- | --- |
| 1 | Pernah minta bantuan AI, tapi jawabannya kurang sesuai? | 1 | Lihat jawabannya → |
| 2 | Kalau jawabannya seperti ini, sudah bisa diposting? | 1 | Coba ubah prompt-nya → |
| 3 | Apa yang berubah kalau prompt-nya lebih jelas? | 2 | Pilih detail yang perlu → |
| 4 | Detail mana yang perlu masuk ke prompt? | 7 | Coba pakai contoh → |
| 5 | Kalau sulit menjelaskan gayanya, beri contoh | 3 | Kalau detailnya belum lengkap? → |
| 6 | Belum tahu harus memberi informasi apa? | 3 | Coba untuk pekerjaan yang lebih besar → |
| 7 | Kalau tugasnya banyak, kerjakan bertahap | 2 | Perbaiki jawaban yang kurang pas → |
| 8 | Hasilnya belum pas? Sebutkan bagian yang ingin diubah | 2 | Coba dengan bahan bacaan → |
| 9 | Mau merangkum artikel? Jelaskan bahan yang harus dipakai | 3 | Cek fakta dalam jawabannya → |
| 10 | Angkanya terlihat meyakinkan. Sumbernya ada? | 1 | Sekarang coba sendiri → |
| 11 | Kamu ingin minta bantuan AI untuk apa? | 8 | Lihat ringkasannya → |
| 12 | Beberapa kebiasaan yang bisa kamu pakai | 1 | Selesaikan materi → |

## Aturan umum tampilan, tombol, dan progres

- Judul halaman luar: `Pratinjau · Prompt Engineering`. Tetap terlihat pada layar utama, saat jeda, dan setelah selesai.
- Header layar utama: `Prompt Engineering · {bagian}/12`. Nomor bagian mulai dari 1.
- Label kecil: `COBA LANGSUNG` pada bagian 3; `FOLLOW-UP` pada bagian 8; `GILIRANMU` pada bagian 11; `YANG PERLU DIINGAT` pada bagian 12; selainnya `PROMPT ENGINEERING`.
- Indikator langkah hanya muncul pada bagian dengan lebih dari satu langkah: `Langkah {langkah} dari {jumlah langkah bagian}`.
- Progres batang berubah sesuai bagian, bukan tiap langkah. Nilai awal 1/12; bagian terakhir 12/12. Nama aksesibilitasnya `Progres materi`.
- Footer layar utama selalu memuat `← Kembali` dan tombol lanjut sesuai langkah. Catatan footer: `Jawaban AI pada latihan ini adalah contoh simulasi.`
- Pilihan tombol biasa memakai penanda `+` ketika tidak aktif dan `✓` ketika aktif; status juga disampaikan melalui `aria-pressed`. Tombol kelompok detail memakai `✓` hanya pada kelompok aktif. Tautan sumber itinerary menampilkan ikon `↗` (disembunyikan dari pembaca layar) serta label aksesibilitas “(buka tab baru)”.
- Tidak ada perpindahan otomatis setelah memilih. Tombol lanjut aktif setelah syarat langkah dipenuhi. Jawaban yang kurang tepat tetap bisa dilanjutkan setelah dicoba.
- `← Kembali` pindah ke langkah sebelumnya. Dari langkah pertama suatu bagian, ia pindah ke langkah terakhir bagian sebelumnya. Hanya pada bagian 1 langkah 1 tombol ini nonaktif.
- Kembali mempertahankan seluruh pilihan dan tulisan, serta tidak menghapus status pernah mencoba/membuka hasil.
- Saat bagian atau langkah berubah, atau saat melanjutkan dari jeda, fokus dipindahkan ke judul dan layar digulir ke judul.
- Bagian yang dapat dibuka memakai kontrol details/summary native, tanpa wajib dibuka untuk lanjut. Status buka/tutup tidak disimpan dalam progres.
- Tampilan ponsel memakai susunan vertikal; pilihan, tombol, kolom dan kontrol urutan dapat dipakai dengan sentuhan atau keyboard.
- Sorotan perubahan caption berlangsung 800 ms. Sorotan dan transisi progres dinonaktifkan pada `prefers-reduced-motion`.

### Syarat tombol lanjut pada seluruh 34 langkah

| Bagian.langkah | Teks tombol lanjut | Syarat aktif |
| --- | --- | --- |
| 1.1 | Lihat jawabannya → | Salah satu dari dua pilihan perkiraan sudah dipilih. |
| 2.1 | Coba ubah prompt-nya → | Setidaknya satu masalah dipilih, atau pilihan tunggal “Sudah cukup” aktif. |
| 3.1 | Lihat perubahan jawabannya → | Setidaknya satu komponen pernah dicoba; boleh semuanya sudah dinonaktifkan lagi. |
| 3.2 | Pilih detail yang perlu → | Selalu aktif. |
| 4.1 | Detail berikutnya → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.2 | Detail berikutnya → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.3 | Detail berikutnya → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.4 | Detail berikutnya → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.5 | Detail berikutnya → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.6 | Lihat hasil pengelompokan → | Kelompok untuk detail ini sudah dipilih; tidak harus sesuai jawaban acuan. |
| 4.7 | Coba pakai contoh → | Selalu aktif. |
| 5.1 | Pilih contoh gaya → | Selalu aktif; ini layar melihat situasi. |
| 5.2 | Lihat pesan yang mengikuti contoh → | Salah satu contoh A/B/C sudah dipilih. |
| 5.3 | Kalau detailnya belum lengkap? → | Selalu aktif. |
| 6.1 | Coba minta AI bertanya → | Salah satu informasi yang penting sudah dipilih. |
| 6.2 | Lihat contoh rencananya → | Salah satu dari empat minat sudah dipilih. |
| 6.3 | Coba untuk pekerjaan yang lebih besar → | Selalu aktif. |
| 7.1 | Lihat percakapannya → | Pernah mengubah urutan melalui tombol naik/turun, termasuk bila kemudian kembali ke urutan awal. |
| 7.2 | Perbaiki jawaban yang kurang pas → | Selalu aktif. |
| 8.1 | Lihat jawaban setelah diperbaiki → | Setidaknya satu pilihan follow-up aktif. |
| 8.2 | Coba dengan bahan bacaan → | Selalu aktif. |
| 9.1 | Lihat contoh jawabannya → | Prompt A atau B sudah dipilih. |
| 9.2 | Bandingkan arahannya → | Kedua jawaban A dan B sudah pernah dibuka. |
| 9.3 | Cek fakta dalam jawabannya → | Prompt A atau B pada pertanyaan arah sumber sudah dipilih. |
| 10.1 | Sekarang coba sendiri → | Salah satu tindakan pemeriksaan klaim sudah dipilih. |
| 11.1 | Tulis permintaanmu → | Salah satu kebutuhan awal sudah dipilih. |
| 11.2 | Tambahkan konteks → | Permintaan utama tidak kosong setelah trim; isian spasi saja belum memenuhi syarat. |
| 11.3 | Lanjut ke batasan → | Selalu aktif; konteks opsional. |
| 11.4 | Lanjut ke bentuk jawaban → | Selalu aktif; batasan opsional. |
| 11.5 | Lanjut ke contoh → | Selalu aktif; format opsional. |
| 11.6 | Lihat saran untuk prompt ini | Selalu aktif; contoh opsional. |
| 11.7 | Lanjut ke refleksi → | Selalu aktif. |
| 11.8 | Lihat ringkasannya → | Salah satu pilihan refleksi sudah dipilih. |
| 12.1 | Selesaikan materi → | Selalu aktif; menandai materi selesai. |

Tidak ada tombol `Lewati` terpisah pada kolom opsional. Peserta melewatinya dengan menekan tombol lanjut yang sama saat kolom kosong.

## Teks lengkap setiap bagian dan langkah

Transkripsi berikut memuat isi yang tersedia pada tiap langkah, termasuk isi kontrol yang dapat dibuka. Jika ada umpan balik contoh yang sudah tampil, kondisinya dijelaskan pada aturan bagian dan daftar cabang. Tombol navigasi umum beserta kondisinya sudah tercatat pada tabel 34 langkah di atas; tidak diulang dalam transkripsi.

### Bagian 1 — Pernah minta bantuan AI, tapi jawabannya kurang sesuai?

**Aturan interaksi:** Pilihan tunggal. Memilih pilihan lain mengganti pilihan sebelumnya; menekan pilihan yang sudah aktif tetap mempertahankannya. Umpan balik muncul di dekat pilihan aktif. Kedua pilihan sama-sama boleh dilanjutkan.

#### 1.1 — Perkirakan kecukupan prompt

Pernah merasa permintaanmu sudah jelas, tapi jawaban AI masih terlalu umum?

Misalnya kamu menulis:

**Kamu**

Tolong buatkan caption untuk postingan workshop AI ini.

AI bisa membuat caption dari satu kalimat itu. Namun, beberapa hal belum disebutkan: siapa yang diajak ikut, kapan acaranya, dan gaya bahasa yang kamu inginkan.

**Menurutmu, permintaan ini sudah cukup?**

**Tombol:** Sudah cukup untuk mulai

Kalau untuk mencari ide awal, sudah bisa. Coba lihat hasilnya dulu, lalu tentukan apakah masih ada yang kurang.

**Tombol:** Masih perlu beberapa detail

#### Semua cabang perkiraan

| Pilihan | Teks yang muncul |
| --- | --- |
| Sudah cukup untuk mulai | Kalau untuk mencari ide awal, sudah bisa. Coba lihat hasilnya dulu, lalu tentukan apakah masih ada yang kurang. |
| Masih perlu beberapa detail | Ada beberapa detail yang bisa ditambahkan. Kita lihat dulu jawabannya supaya lebih mudah menentukan mana yang perlu. |

### Bagian 2 — Kalau jawabannya seperti ini, sudah bisa diposting?

**Aturan interaksi:** Empat pilihan masalah mendukung beberapa pilihan sekaligus. Menekan masalah aktif menonaktifkannya. “Sudah cukup untuk kebutuhan saya” eksklusif: memilihnya menghapus semua masalah; menekan lagi mengosongkan pilihan. Memilih masalah ketika “Sudah cukup” aktif menghapus “Sudah cukup”. Umpan balik hanya untuk item terakhir dalam daftar pilihan yang masih aktif. Urutan daftar mengikuti saat pilihan ditambahkan; menghapus pilihan terakhir membuat umpan balik kembali ke pilihan sebelumnya. Kalimat pengantar berikutnya tetap tampil sebelum maupun setelah memilih.

#### 2.1 — Tandai hal yang perlu diperbaiki

Anggap kamu sedang membantu komunitas lokal mempromosikan workshop AI gratis untuk pemula. Caption tadi akan dipakai di akun Instagram komunitas.

**Kamu**

Tolong buatkan caption untuk postingan workshop AI ini.

**Contoh jawaban AI**

Jangan lewatkan workshop AI seru ini! 🎉 Tambah wawasan, dapatkan pengalaman baru, dan belajar bersama. Ajak temanmu dan daftar sekarang!

**Apa yang masih perlu diperbaiki sebelum caption ini dipakai?**

Kamu boleh memilih beberapa hal yang perlu diperbaiki. Kalau menurutmu sudah cukup, pilih “Sudah cukup untuk kebutuhan saya”; pilihan lain akan dilepas.

**Tombol:** Belum jelas untuk siapa

**Tombol:** Detail acaranya belum ada

**Tombol:** Belum tahu harus daftar di mana

**Tombol:** Gaya bahasanya kurang cocok

**Tombol:** Sudah cukup untuk kebutuhan saya

Pembaca belum tahu workshop ini cocok untuk siapa. Menyebut bahwa acaranya untuk pemula bisa membantu AI membuat pembuka yang lebih sesuai.

Coba tambahkan beberapa detail ke prompt tadi. Setelah itu, bandingkan caption yang muncul.

#### Semua alasan pilihan

| Pilihan | Umpan balik |
| --- | --- |
| Belum jelas untuk siapa | Pembaca belum tahu workshop ini cocok untuk siapa. Menyebut bahwa acaranya untuk pemula bisa membantu AI membuat pembuka yang lebih sesuai. |
| Detail acaranya belum ada | Waktu dan biaya acara belum disebutkan di prompt, jadi informasi itu belum muncul di caption. |
| Belum tahu harus daftar di mana | Caption-nya mengajak orang mendaftar, tapi belum menjelaskan caranya. Kamu perlu menambahkan informasi pendaftaran. |
| Gaya bahasanya kurang cocok | Kalau gayanya belum cocok, jelaskan seperti apa yang kamu mau. Misalnya lebih santai, lebih formal, atau cukup satu emoji. |
| Sudah cukup untuk kebutuhan saya | Untuk ide awal, caption ini bisa dipakai. Kalau mau langsung diposting, cek dulu apakah pembaca sudah punya informasi yang cukup untuk ikut. |

### Bagian 3 — Apa yang berubah kalau prompt-nya lebih jelas?

**Aturan interaksi:** Langkah 1 menampilkan pilihan tanpa jawaban AI. Masing-masing komponen dapat diaktifkan/dinonaktifkan. Prompt yang tersusun dapat dibuka dan berubah mengikuti pilihan. Informasi acara disimpan pada bagian “Lihat detail workshop”. Langkah 2 menampilkan jawaban dari komponen aktif saat itu. Informasi komponen terakhir ditampilkan hanya jika catatan sementara masih ada. Setelah sedikitnya tiga komponen berbeda pernah dicoba, muncul catatan kegunaan detail dan tombol “Coba hapus satu detail”. Tombol ini menghapus komponen terakhir dalam daftar komponen aktif (terakhir ditambahkan); hasil langsung berubah dan tombol nonaktif bila tidak ada komponen aktif. Kembali memungkinkan mengganti komponen. Pernah mencoba tidak berarti masih aktif; lima komponen bisa pernah dicoba lalu semuanya dinonaktifkan.

#### 3.1 — Pilih tambahan

Kita pakai prompt caption yang sama. Kali ini, kamu bisa menentukan informasi tambahan yang akan masuk.

**Bisa dibuka — Lihat detail workshop** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

- Gratis.
- Sabtu pukul 10.00.
- Untuk orang yang baru mulai belajar AI.
- Postingan dibuat untuk mengajak orang mendaftar.

**Pilih detail yang ingin kamu tambahkan.**

Pilih satu atau beberapa tambahan. Di langkah berikutnya, kamu bisa melihat pengaruhnya pada caption.

**Tombol:** Untuk orang yang baru mulai belajar AI

**Tombol:** Gratis, Sabtu pukul 10.00

**Tombol:** Ajak pembaca mendaftar

**Tombol:** Santai, dengan sedikit emoji

**Tombol:** Buat versi pendek dan versi lebih lengkap

**Prompt yang kamu buat**

Prompt ini langsung diperbarui setiap kali pilihan detail ditambah atau dilepas.

#### 3.2 — Lihat hasil caption

Ini caption dari pilihanmu tadi. Perhatikan bagian yang berkaitan dengan detail yang kamu tambahkan.

**Versi pendek · simulasi**

Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].

**Versi lebih lengkap · simulasi**

Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].

**Bisa dibuka — Lihat prompt yang kamu buat** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt yang kamu buat**

Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.

Sekarang coba cocokkan caption ini dengan detail yang kamu pilih. Informasi mana yang membuat hasilnya lebih sesuai dengan kebutuhanmu?

**Tombol:** Coba hapus satu detail

Kalau ingin mengganti pilihan, tekan “Kembali” dan coba detail lain.

#### Lima komponen: tambahan prompt dan alasan

| ID | Pilihan | Tambahan pada prompt | Alasan setelah melihat hasil |
| --- | --- | --- | --- |
| 1 | Untuk orang yang baru mulai belajar AI | Acaranya untuk orang yang baru mulai belajar AI. | Pembukanya sekarang ditujukan untuk pemula, sesuai informasi peserta yang kamu tambahkan. |
| 2 | Gratis, Sabtu pukul 10.00 | Workshop ini gratis dan diadakan Sabtu pukul 10.00. | Waktu dan biaya sudah disebutkan. Pembaca sekarang tahu kapan acaranya dan bahwa workshop ini gratis. |
| 3 | Ajak pembaca mendaftar | Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. | Ajakan mendaftarnya sudah muncul. Bagian [cara daftar] masih perlu kamu isi sebelum caption diposting. |
| 4 | Santai, dengan sedikit emoji | Pakai bahasa santai, dengan satu atau dua emoji saja. | Gaya yang kamu minta bisa dijelaskan dengan kata-kata biasa, misalnya “santai, dengan sedikit emoji”. |
| 5 | Buat versi pendek dan versi lebih lengkap | Tolong buat dua versi: satu pendek dan satu lebih lengkap. | Ada dua versi yang bisa kamu bandingkan dan pilih sesuai kebutuhan. |

Catatan saat komponen dihapus: `Detail “{label komponen}” dihapus. Lihat bagian caption yang ikut berubah.` Label komponen diambil dari tabel di atas. Catatan saat ditambahkan adalah kolom alasan. Lampiran caption mencatat 32 hasil lengkap.

### Bagian 4 — Detail mana yang perlu masuk ke prompt?

**Aturan interaksi:** Enam detail ditampilkan satu per langkah, dalam urutan tetap. Setiap detail dipilih ke salah satu dari dua kelompok. Menekan kelompok yang sudah aktif tidak menghapus pilihan; menekan kelompok lain menggantinya. Pilihan yang berbeda dari jawaban acuan menambahkan awalan “Coba lihat kegunaan detail ini. ” sebelum alasan. Pada langkah ketujuh, ringkasan menampilkan kelompok hasil pilihan peserta, termasuk pilihan yang belum sesuai acuan. Kelompok kosong tetap mempunyai judul dan daftar kosong; tidak ada pesan kosong tambahan. Gunakan Kembali untuk memperbaiki detail sebelumnya.

#### 4.1 — Kelompokkan detail 1

Menambah detail bisa membantu, tetapi tidak semuanya perlu dimasukkan. Coba pilah informasi tentang workshop tadi satu per satu.

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 1 dari 6

**Workshop gratis**

**Tombol:** ✓ Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Informasi bahwa workshop ini gratis bisa membantu pembaca memutuskan untuk ikut.

#### 4.2 — Kelompokkan detail 2

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 2 dari 6

**Acaranya untuk pemula**

**Tombol:** ✓ Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Dengan menyebut pemula, kamu membantu pembaca menilai apakah workshop ini cocok untuk mereka.

#### 4.3 — Kelompokkan detail 3

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 3 dari 6

**Ketua komunitas suka warna biru**

**Tombol:** Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** ✓ Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Warna favorit ketua tidak banyak membantu untuk caption ini. Detail itu mungkin baru berguna kalau kamu sedang membuat desain.

#### 4.4 — Kelompokkan detail 4

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 4 dari 6

**Komunitas berdiri tahun 2023**

**Tombol:** Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** ✓ Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Tahun berdiri bisa dipakai saat memperkenalkan komunitas. Untuk caption pendaftaran workshop, detail ini belum perlu, kecuali memang ada alasan untuk menyebutkannya.

#### 4.5 — Kelompokkan detail 5

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 5 dari 6

**Pendaftaran ditutup Jumat malam**

**Tombol:** ✓ Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Batas waktu pendaftaran perlu disebutkan supaya pembaca tahu kapan terakhir mereka bisa mendaftar.

#### 4.6 — Kelompokkan detail 6

Untuk membuat caption workshop tadi, apakah AI perlu tahu detail ini?

Detail 6 dari 6

**Caption maksimal sekitar 80 kata**

**Tombol:** ✓ Perlu untuk caption ini

*Petunjuk tombol:* Membantu menentukan isi caption

**Tombol:** Belum perlu

*Petunjuk tombol:* Belum dibutuhkan untuk menulis caption ini

Batas panjang membantu AI menyesuaikan caption dengan kebutuhanmu.

#### 4.7 — Lihat kedua kelompok

Ini hasil pengelompokanmu. Cek lagi mana yang membantu menulis caption dan mana yang belum diperlukan.

**Hasil pilihanmu**

**Perlu untuk caption ini**

- Workshop gratis
- Acaranya untuk pemula
- Pendaftaran ditutup Jumat malam
- Caption maksimal sekitar 80 kata

**Belum perlu**

- Ketua komunitas suka warna biru
- Komunitas berdiri tahun 2023

Saat menambah detail, coba tanya: apakah informasi ini membantu AI mengerjakan tugasnya?

**Bisa dibuka — Kalau penasaran: kenapa detail yang tidak berkaitan sebaiknya dihapus?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Prompt lebih mudah diikuti kalau isinya berkaitan dengan tugas. Detail yang tidak perlu bisa membuat arahan utama kurang jelas.

Gunakan Kembali untuk memeriksa atau mengubah pilihanmu.

#### Semua detail, jawaban acuan, dan alasan

| Detail | Kelompok acuan | Teks alasan |
| --- | --- | --- |
| Workshop gratis | Perlu untuk caption ini | Informasi bahwa workshop ini gratis bisa membantu pembaca memutuskan untuk ikut. |
| Acaranya untuk pemula | Perlu untuk caption ini | Dengan menyebut pemula, kamu membantu pembaca menilai apakah workshop ini cocok untuk mereka. |
| Ketua komunitas suka warna biru | Belum perlu | Warna favorit ketua tidak banyak membantu untuk caption ini. Detail itu mungkin baru berguna kalau kamu sedang membuat desain. |
| Komunitas berdiri tahun 2023 | Belum perlu | Tahun berdiri bisa dipakai saat memperkenalkan komunitas. Untuk caption pendaftaran workshop, detail ini belum perlu, kecuali memang ada alasan untuk menyebutkannya. |
| Pendaftaran ditutup Jumat malam | Perlu untuk caption ini | Batas waktu pendaftaran perlu disebutkan supaya pembaca tahu kapan terakhir mereka bisa mendaftar. |
| Caption maksimal sekitar 80 kata | Perlu untuk caption ini | Batas panjang membantu AI menyesuaikan caption dengan kebutuhanmu. |

Jika pilihan peserta sama dengan kelompok acuan, hanya alasan muncul. Jika berbeda, teksnya adalah `Coba lihat kegunaan detail ini. ` + alasan tersebut. Kedua pilihan tetap dapat dilanjutkan. Ada 64 kombinasi akhir; semuanya dicatat di lampiran.

### Bagian 5 — Kalau sulit menjelaskan gayanya, beri contoh

**Aturan interaksi:** Langkah 1 hanya situasi, prompt awal, dan jawaban yang terasa formal. Langkah 2 hanya memilih salah satu contoh gaya; belum ada pesan hasil. Pilihan A/B/C semuanya sah. Langkah 3 menampilkan respons sesuai contoh yang dipilih; prompt lengkap berada dalam bagian yang dapat dibuka. Menekan contoh yang sama tetap mempertahankannya.

#### 5.1 — Lihat situasi

Caption workshop sudah dibahas. Sekarang, kamu ingin mengirim pesan pengingat kepada orang yang sudah mendaftar.

**Prompt awal**

Tolong buatkan pesan pengingat workshop untuk peserta. Bahasanya santai dan ramah, tapi tetap sopan.

**Contoh jawaban AI**

Halo! Kami ingin mengingatkan bahwa workshop akan segera dilaksanakan. Kami menantikan kehadiran Anda dan berharap acara ini dapat memberikan pengalaman yang bermanfaat.

Pesannya sopan, tetapi terasa cukup formal untuk grup peserta. Kalau kata “santai” belum memberi hasil yang kamu bayangkan, coba tunjukkan contoh pesan.

#### 5.2 — Pilih contoh gaya

Coba tunjukkan gaya yang kamu mau lewat salah satu contoh berikut.

**Dari tiga pesan ini, mana yang paling mendekati gaya yang kamu inginkan?**

**Tombol:** Contoh A: Mengingatkan ya, workshop-nya besok jam 10.00. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.

**Tombol:** Contoh B: Yth. peserta workshop, kami mengingatkan bahwa kegiatan akan dilaksanakan besok pukul 10.00 WIB. Mohon hadir tepat waktu.

**Tombol:** Contoh C: Besok ketemu di workshop ya! Mulai jam 10.00, jadi jangan sampai kelewatan 🙌

#### 5.3 — Lihat hasil pengingat

Sekarang lihat pesan yang mengikuti contoh pilihanmu. Bandingkan gayanya dengan pesan awal.

**Bisa dibuka — Lihat prompt dengan contoh** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt dengan contoh**

Tolong buatkan pesan pengingat workshop untuk peserta. Pakai gaya bahasa seperti contoh ini:

“Mengingatkan ya, workshop-nya besok jam 10.00. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.”

Pesannya akan dikirim hari Jumat. Workshop diadakan Sabtu pukul 10.00. Minta peserta datang 10 menit lebih awal.

**Jawaban mengikuti contoh · simulasi**

Mengingatkan ya, workshop-nya besok jam 10.00. Tolong datang 10 menit lebih awal supaya kita bisa mulai tepat waktu. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.

Contoh tadi memberi gambaran gaya yang kamu mau. Cek juga apakah waktu acara dan permintaan datang lebih awal sudah ditulis dengan benar.

**Bisa dibuka — Mau tahu istilahnya?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Yang perlu kamu ingat: contoh bisa membantu saat gaya atau pola sulit dijelaskan.

#### Cabang contoh A

Sekarang lihat pesan yang mengikuti contoh pilihanmu. Bandingkan gayanya dengan pesan awal.

**Bisa dibuka — Lihat prompt dengan contoh** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt dengan contoh**

Tolong buatkan pesan pengingat workshop untuk peserta. Pakai gaya bahasa seperti contoh ini:

“Mengingatkan ya, workshop-nya besok jam 10.00. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.”

Pesannya akan dikirim hari Jumat. Workshop diadakan Sabtu pukul 10.00. Minta peserta datang 10 menit lebih awal.

**Jawaban mengikuti contoh · simulasi**

Mengingatkan ya, workshop-nya besok jam 10.00. Tolong datang 10 menit lebih awal supaya kita bisa mulai tepat waktu. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.

Contoh tadi memberi gambaran gaya yang kamu mau. Cek juga apakah waktu acara dan permintaan datang lebih awal sudah ditulis dengan benar.

**Bisa dibuka — Mau tahu istilahnya?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Yang perlu kamu ingat: contoh bisa membantu saat gaya atau pola sulit dijelaskan.

#### Cabang contoh B

Sekarang lihat pesan yang mengikuti contoh pilihanmu. Bandingkan gayanya dengan pesan awal.

**Bisa dibuka — Lihat prompt dengan contoh** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt dengan contoh**

Tolong buatkan pesan pengingat workshop untuk peserta. Pakai gaya bahasa seperti contoh ini:

“Yth. peserta workshop, kami mengingatkan bahwa kegiatan akan dilaksanakan besok pukul 10.00 WIB. Mohon hadir tepat waktu.”

Pesannya akan dikirim hari Jumat. Workshop diadakan Sabtu pukul 10.00. Minta peserta datang 10 menit lebih awal.

**Jawaban mengikuti contoh · simulasi**

Yth. peserta workshop, kegiatan akan dilaksanakan besok, Sabtu pukul 10.00 WIB. Mohon hadir 10 menit lebih awal agar kegiatan dapat dimulai tepat waktu.

Contoh tadi memberi gambaran gaya yang kamu mau. Cek juga apakah waktu acara dan permintaan datang lebih awal sudah ditulis dengan benar.

**Bisa dibuka — Mau tahu istilahnya?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Yang perlu kamu ingat: contoh bisa membantu saat gaya atau pola sulit dijelaskan.

#### Cabang contoh C

Sekarang lihat pesan yang mengikuti contoh pilihanmu. Bandingkan gayanya dengan pesan awal.

**Bisa dibuka — Lihat prompt dengan contoh** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt dengan contoh**

Tolong buatkan pesan pengingat workshop untuk peserta. Pakai gaya bahasa seperti contoh ini:

“Besok ketemu di workshop ya! Mulai jam 10.00, jadi jangan sampai kelewatan 🙌”

Pesannya akan dikirim hari Jumat. Workshop diadakan Sabtu pukul 10.00. Minta peserta datang 10 menit lebih awal.

**Jawaban mengikuti contoh · simulasi**

Besok ketemu di workshop ya! Mulai jam 10.00. Datang 10 menit lebih awal supaya sempat siap-siap 🙌

Contoh tadi memberi gambaran gaya yang kamu mau. Cek juga apakah waktu acara dan permintaan datang lebih awal sudah ditulis dengan benar.

**Bisa dibuka — Mau tahu istilahnya?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Yang perlu kamu ingat: contoh bisa membantu saat gaya atau pola sulit dijelaskan.

### Bagian 6 — Belum tahu harus memberi informasi apa?

**Aturan interaksi:** Langkah 1 memilih salah satu informasi yang penting; setiap pilihan punya penjelasan berbeda dan semuanya dapat dilanjutkan. Langkah 2 menampilkan prompt alternatif dan tiga pertanyaan AI. Peserta hanya menjawab pertanyaan minat melalui Kuliner/Wisata budaya/Alam/Campuran. Budget dan area menginap belum menjadi kolom isian. Langkah 3 baru menampilkan pratinjau dua hari sesuai minat, lokasi nyata, dan tautan sumber. Urutan dua hari ini contoh editorial, bukan rute hasil optimasi. Tautan membuka tab baru; label aksesibilitas menambahkan “(buka tab baru)”.

#### 6.1 — Pilih informasi yang penting

Untuk pesan workshop tadi, kamu sudah tahu informasi yang perlu diberikan. Tapi kadang kebutuhan kita sendiri belum jelas. Misalnya saat merencanakan perjalanan dua hari di Jogja: kamu ingin dibuatkan itinerary, tetapi belum terpikir detail apa yang harus disebutkan.

**Prompt awal**

Tolong buatkan itinerary dua hari di Jogja buat saya.

**Informasi apa yang bisa membuat rencana perjalanannya lebih cocok buatmu?**

**Tombol:** Tempat atau kegiatan yang saya suka

Orang yang suka kuliner mungkin memilih tempat berbeda dari orang yang ingin wisata budaya atau berjalan di alam.

**Tombol:** Budget perjalanan saya

**Tombol:** Area tempat saya menginap

**Tombol:** Ketiganya bisa berpengaruh

#### 6.2 — Jawab pertanyaan AI

Kalau detailnya belum lengkap, kamu bisa meminta AI bertanya dulu sebelum menyusun rencana.

**Prompt alternatif**

Saya mau jalan-jalan dua hari di Jogja. Sebelum membuat itinerary, tolong tanya dulu maksimal tiga hal yang perlu kamu tahu agar rencananya cocok buat saya.

**AI bertanya · simulasi**

Boleh, saya tanya tiga hal dulu ya:

1. Kamu lebih suka kuliner, wisata budaya, alam, atau campuran?
2. Budget per harinya kira-kira berapa?
3. Kamu menginap di area mana, atau berangkat dari mana?

**Untuk latihan ini, coba jawab pertanyaan tentang minatmu dulu.**

**Tombol:** Kuliner

**Tombol:** Wisata budaya

**Tombol:** Alam

**Tombol:** Campuran

#### 6.3 — Lihat itinerary

Pilihan minatmu sudah memberi arah untuk rencana perjalanan. Karena dua pertanyaan lain belum dijawab, hasilnya masih berupa pilihan kegiatan.

**Pratinjau itinerary · belum final**

Kalau kamu lebih suka kuliner, ini contoh tempat yang bisa dipertimbangkan untuk dua hari:

1. Hari 1 · Kota Yogyakarta

**Gudeg di Wijilan**

Kamu bisa mencoba gudeg di kawasan Wijilan untuk mengenal salah satu makanan khas Jogja.

Sumber tempat:[Gudeg Wijilan](https://visitingjogja.jogjaprov.go.id/8045/gudeg-wijilan/)
2. Hari 2 · Kota Yogyakarta

**Jajanan tradisional Kotagede**

Cari kipo atau roti kembang waru di Kotagede. Keduanya termasuk jajanan khas kawasan ini.

Sumber tempat:[Kuliner Kotagede](https://visitingjogja.jogjaprov.go.id/42323/makanan-khas-kotagede-yang-wajib-dicoba/)

Budget dan lokasi menginap belum kamu jawab, jadi ini baru contoh pilihan kegiatan. Rute, transportasi, dan biaya masih perlu disesuaikan. Sebelum berangkat, cek juga jam buka dan kondisi tempatnya.

Pertanyaan dari AI bisa membantumu mengenali informasi yang perlu disampaikan sebelum meminta rencana lengkap.

#### Semua alasan informasi perjalanan

| Pilihan | Umpan balik |
| --- | --- |
| Tempat atau kegiatan yang saya suka | Orang yang suka kuliner mungkin memilih tempat berbeda dari orang yang ingin wisata budaya atau berjalan di alam. |
| Budget perjalanan saya | Budget membantu menyesuaikan pilihan tempat, makanan, dan transportasi dengan kemampuanmu. |
| Area tempat saya menginap | Lokasi menginap membantu menyusun rute agar kamu tidak perlu banyak bolak-balik. |
| Ketiganya bisa berpengaruh | Ketiganya berguna. Minat membantu memilih kegiatan, budget menentukan pilihan yang terjangkau, dan lokasi menginap membantu menyusun rute. |

#### Cabang minat Kuliner

Pilihan minatmu sudah memberi arah untuk rencana perjalanan. Karena dua pertanyaan lain belum dijawab, hasilnya masih berupa pilihan kegiatan.

**Pratinjau itinerary · belum final**

Kalau kamu lebih suka kuliner, ini contoh tempat yang bisa dipertimbangkan untuk dua hari:

1. Hari 1 · Kota Yogyakarta

**Gudeg di Wijilan**

Kamu bisa mencoba gudeg di kawasan Wijilan untuk mengenal salah satu makanan khas Jogja.

Sumber tempat:[Gudeg Wijilan](https://visitingjogja.jogjaprov.go.id/8045/gudeg-wijilan/)
2. Hari 2 · Kota Yogyakarta

**Jajanan tradisional Kotagede**

Cari kipo atau roti kembang waru di Kotagede. Keduanya termasuk jajanan khas kawasan ini.

Sumber tempat:[Kuliner Kotagede](https://visitingjogja.jogjaprov.go.id/42323/makanan-khas-kotagede-yang-wajib-dicoba/)

Budget dan lokasi menginap belum kamu jawab, jadi ini baru contoh pilihan kegiatan. Rute, transportasi, dan biaya masih perlu disesuaikan. Sebelum berangkat, cek juga jam buka dan kondisi tempatnya.

Pertanyaan dari AI bisa membantumu mengenali informasi yang perlu disampaikan sebelum meminta rencana lengkap.

#### Cabang minat Wisata budaya

Pilihan minatmu sudah memberi arah untuk rencana perjalanan. Karena dua pertanyaan lain belum dijawab, hasilnya masih berupa pilihan kegiatan.

**Pratinjau itinerary · belum final**

Kalau kamu lebih suka wisata budaya, ini contoh tempat yang bisa dipertimbangkan untuk dua hari:

1. Hari 1 · Kota Yogyakarta

**Taman Sari**

Kunjungi kawasan bekas taman Keraton Yogyakarta untuk melihat bangunannya dan mengenal sejarahnya.

Sumber tempat:[Taman Sari](https://budaya.jogjaprov.go.id/artikel/detail/51-tamansari)
2. Hari 2 · Kota Yogyakarta

**Sentra perak Kotagede**

Jelajahi kawasan kerajinan perak Kotagede dan lihat hasil karya perajinnya.

Sumber tempat:[Kerajinan perak Kotagede](https://visitingjogja.jogjaprov.go.id/40176/sentra-kerajinan-perak-kota-gede/)

Budget dan lokasi menginap belum kamu jawab, jadi ini baru contoh pilihan kegiatan. Rute, transportasi, dan biaya masih perlu disesuaikan. Sebelum berangkat, cek juga jam buka dan kondisi tempatnya.

Pertanyaan dari AI bisa membantumu mengenali informasi yang perlu disampaikan sebelum meminta rencana lengkap.

#### Cabang minat Alam

Pilihan minatmu sudah memberi arah untuk rencana perjalanan. Karena dua pertanyaan lain belum dijawab, hasilnya masih berupa pilihan kegiatan.

**Pratinjau itinerary · belum final**

Kalau kamu lebih suka alam, ini contoh tempat yang bisa dipertimbangkan untuk dua hari:

1. Hari 1 · Kabupaten Sleman

**Tlogo Putri, Kaliurang**

Kamu bisa menikmati suasana telaga Tlogo Putri dan kawasan alam di Kaliurang.

Sumber tempat:[Tlogo Putri, Kaliurang](https://visitingjogja.jogjaprov.go.id/30916/wajib-dikunjungi-tlogo-putri-di-kaliurang-ini-sangat-indah/)
2. Hari 2 · Kabupaten Gunungkidul

**Gunung Api Purba Nglanggeran**

Kalau ingin mendaki, kamu bisa mempertimbangkan Nglanggeran untuk melihat pemandangan perbukitan. Pilih kegiatan yang sesuai dengan kondisi fisikmu.

Sumber tempat:[Gunung Api Purba Nglanggeran](https://visitingjogja.jogjaprov.go.id/259/gunung-api-purba-nglanggeran/)

Budget dan lokasi menginap belum kamu jawab, jadi ini baru contoh pilihan kegiatan. Rute, transportasi, dan biaya masih perlu disesuaikan. Sebelum berangkat, cek juga jam buka dan kondisi tempatnya.

Pertanyaan dari AI bisa membantumu mengenali informasi yang perlu disampaikan sebelum meminta rencana lengkap.

#### Cabang minat Campuran

Pilihan minatmu sudah memberi arah untuk rencana perjalanan. Karena dua pertanyaan lain belum dijawab, hasilnya masih berupa pilihan kegiatan.

**Pratinjau itinerary · belum final**

Kalau kamu ingin menggabungkan beberapa kegiatan, ini contoh pilihan tempat untuk dua hari:

1. Hari 1 · Kota Yogyakarta

**Taman Sari dan gudeg Wijilan**

Gabungkan kunjungan budaya ke Taman Sari dengan mencoba gudeg di Wijilan.

Sumber tempat:[Taman Sari](https://budaya.jogjaprov.go.id/artikel/detail/51-tamansari)[Gudeg Wijilan](https://visitingjogja.jogjaprov.go.id/8045/gudeg-wijilan/)
2. Hari 2 · Kabupaten Sleman

**Tlogo Putri, Kaliurang**

Ganti suasana dengan kegiatan di kawasan telaga Tlogo Putri. Hari pertama berisi budaya dan kuliner, hari kedua berfokus pada alam.

Sumber tempat:[Tlogo Putri, Kaliurang](https://visitingjogja.jogjaprov.go.id/30916/wajib-dikunjungi-tlogo-putri-di-kaliurang-ini-sangat-indah/)

Budget dan lokasi menginap belum kamu jawab, jadi ini baru contoh pilihan kegiatan. Rute, transportasi, dan biaya masih perlu disesuaikan. Sebelum berangkat, cek juga jam buka dan kondisi tempatnya.

Pertanyaan dari AI bisa membantumu mengenali informasi yang perlu disampaikan sebelum meminta rencana lengkap.

### Bagian 7 — Kalau tugasnya banyak, kerjakan bertahap

**Aturan interaksi:** Urutan awal adalah langkah 3 → 1 → 2 dari daftar konsep acuan. Tombol naik/turun menukar dua langkah bersebelahan. Naik nonaktif pada posisi pertama; Turun nonaktif pada posisi terakhir. Nama aksesibilitasnya “Naikkan: {teks langkah}” atau “Turunkan: {teks langkah}”. Setelah sedikitnya satu perubahan, lanjut boleh ditekan walaupun urutan belum benar. Langkah kedua menampilkan alasan sesuai urutan, lalu contoh percakapan yang sama untuk seluruh urutan.

#### 7.1 — Susun urutan

Dari contoh perjalanan tadi, kita belajar melengkapi informasi sebelum meminta rencana. Sekarang kembali ke pekerjaan menyiapkan acara. Kalau kamu punya brief dua halaman dan perlu membuat konsep, rundown, anggaran, proposal, serta caption, ada baiknya hasil tiap tahap diperiksa dulu sebelum lanjut.

**Contoh prompt**

Tolong baca brief ini, buat konsep acaranya, susun rundown dan budget, lalu tulis proposal serta caption promosinya.

Kalau konsepnya ternyata kurang sesuai, rundown dan proposal mungkin ikut perlu diubah. Karena itu, cek konsepnya dulu sebelum meminta bagian lain.

**Susun langkah-langkah ini dari yang perlu dikerjakan lebih dulu.**

Gunakan tombol naik dan turun untuk mengubah urutannya.

1. Pahami brief dan cari informasi yang masih kurang

**Tombol:** ↑ Naik

**Tombol:** ↓ Turun
2. Buat beberapa pilihan konsep, lalu pilih satu

**Tombol:** ↑ Naik

**Tombol:** ↓ Turun
3. Susun rundown dan kebutuhan lain dari konsep yang dipilih

**Tombol:** ↑ Naik

**Tombol:** ↓ Turun

#### 7.2 — Lihat percakapan

Sekarang lihat contoh percakapan yang mengerjakan tugas acara itu satu per satu.

Urutan ini memberi kamu kesempatan memahami brief, memilih konsep, lalu menyiapkan kebutuhan acara. Kalau ada yang kurang sesuai, kamu bisa memperbaikinya sebelum lanjut.

**Kamu**

Tolong baca brief ini dulu. Ringkas tujuan acara dan batasannya, lalu sebutkan informasi yang masih kurang. Belum perlu membuat konsep acara.

**Contoh jawaban AI**

Tujuan acara: [ringkasan tujuan dari brief].

Batasan: [anggaran, waktu, atau ketentuan yang tercantum].

Masih perlu dipastikan: [informasi yang belum tersedia].

**Kamu**

Oke, sekarang buat tiga pilihan konsep yang sesuai dengan brief tadi.

**Bisa dibuka — Kapan bisa langsung dikerjakan?** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Untuk tugas kecil yang mudah diperiksa, seperti memperbaiki satu paragraf, kamu bisa langsung meminta hasilnya. Pilih cara yang sesuai dengan pekerjaannya.

#### Keenam kemungkinan urutan

| Urutan nomor acuan | Umpan balik |
| --- | --- |
| 1,2,3 | Urutan ini memberi kamu kesempatan memahami brief, memilih konsep, lalu menyiapkan kebutuhan acara. Kalau ada yang kurang sesuai, kamu bisa memperbaikinya sebelum lanjut. |
| 1,3,2 | Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas. |
| 2,1,3 | Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas. |
| 2,3,1 | Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas. |
| 3,1,2 | Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas. |
| 3,2,1 | Coba periksa urutannya lagi. Mulai dari memahami brief, lalu pilih konsep, baru susun rundown dan kebutuhan lain. Dengan begitu, tiap langkah punya dasar yang jelas. |

### Bagian 8 — Hasilnya belum pas? Sebutkan bagian yang ingin diubah

**Aturan interaksi:** Langkah 1 mendukung beberapa pilihan follow-up; menekan pilihan aktif menonaktifkannya. Hasil tidak ditampilkan saat memilih. Langkah 2 menampilkan respons dari kombinasi saat itu; permintaan lanjutannya dapat dibuka. “Tanpa rumus dulu” menambahkan instruksi dan catatan, tetapi teks respons simulasi sama dengan kombinasi identik tanpa opsi itu karena semua respons memang tidak memakai rumus. Saat “Contoh spam email” aktif, respons memakai contoh spam meskipun “Bahasa yang lebih sederhana” juga aktif; tidak ada respons tambahan terpisah bagi dua opsi tersebut.

#### 8.1 — Pilih perbaikan

Tadi kamu memberi arahan bertahap sambil mengecek hasilnya. Kalau ada bagian yang belum sesuai, percakapannya bisa diteruskan dengan permintaan perbaikan. Cara yang sama juga berguna saat belajar: misalnya, penjelasan AI tentang machine learning masih terlalu teknis buatmu.

**Potongan jawaban AI**

Supervised learning merupakan paradigma pembelajaran mesin yang memetakan input terhadap target berdasarkan pasangan data berlabel.

**Apa yang ingin kamu ubah agar bagian ini lebih mudah dipahami?**

Kamu boleh memilih beberapa.

**Tombol:** Bahasa yang lebih sederhana

**Tombol:** Contoh spam email

**Tombol:** Tanpa rumus dulu

**Tombol:** Cukup tiga poin

**Tombol:** Penjelasan dari awal lagi

#### 8.2 — Lihat respons follow-up

Ini contoh jawaban berdasarkan perubahan yang kamu pilih. Apakah bagian yang tadi membingungkan sudah lebih mudah dipahami?

**Bisa dibuka — Lihat permintaan lanjutanmu** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Permintaan lanjutanmu**

Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Tanpa rumus dulu. Cukup tiga poin.

**Contoh jawaban setelah diperbaiki · simulasi**

Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.

Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.

Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.

Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.

Semua 32 kombinasi permintaan lanjutan dan hasilnya tercatat di lampiran follow-up. Kombinasi kosong tidak dapat dilanjutkan melalui langkah memilih.

### Bagian 9 — Mau merangkum artikel? Jelaskan bahan yang harus dipakai

**Aturan interaksi:** Langkah 1 hanya memilih prompt. Pilihan ini belum menandai jawaban sebagai sudah dibaca. Ketika menekan lanjut, jawaban dari prompt terpilih ditampilkan dan dicatat pernah dibuka. Langkah 2 menampilkan satu jawaban pada satu waktu, dengan tombol A/B untuk membandingkan. Artikel asli dapat dibuka. Setiap pergantian jawaban mempertahankan status pernah dibuka; lanjut baru aktif ketika kedua jawaban pernah dibuka. Langkah 3 bertanya prompt mana yang lebih jelas membatasi sumber. Memilih A maupun B boleh lanjut setelah penjelasan. Kedua prompt dan tips bisa dibuka lagi.

#### 9.1 — Pilih prompt

Di penjelasan tadi, kamu meminta AI mengubah cara menyampaikan jawaban. Sekarang kita perhatikan isinya: informasi mana yang boleh digunakan? Kembali ke workshop yang kita bahas di awal, kamu punya artikel singkat yang ingin dirangkum untuk presentasi.

**Artikel untuk simulasi**

Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

**Pilih prompt untuk melihat contoh jawabannya.**

**Tombol:** Prompt A: Tolong rangkum topik ini untuk presentasi saya.

**Tombol:** Prompt B: Tolong rangkum artikel di bawah ini menjadi lima poin untuk slide presentasi. Gunakan hanya informasi dari artikel. Kalau ada detail yang tidak disebutkan, tulis bahwa informasinya belum tersedia.

Artikel:
Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

#### 9.2 — Bandingkan jawaban

Buka jawaban A dan B, lalu cocokkan dengan artikel. Keduanya adalah contoh simulasi.

**Tombol:** Lihat jawaban A

**Tombol:** Lihat jawaban B

**Jawaban A · simulasi**

Komunitas lokal mengadakan workshop AI gratis untuk pemula pada Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam. Workshop ini akan diikuti 100 peserta.

‘100 peserta’ tidak ada dalam artikel. Ini fakta tambahan yang dibuat untuk simulasi, bukan data acara.

**Bisa dibuka — Cocokkan dengan artikel** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

Sudah dibuka: 2/2 jawaban.

#### 9.3 — Pilih arahan sumber

Setelah melihat kedua jawaban, bandingkan lagi arahan dalam prompt-nya.

**Kalau ringkasannya harus mengikuti isi artikel, prompt mana yang arahannya lebih jelas?**

**Tombol:** Prompt A

**Tombol:** Prompt B

Prompt A belum menyebut batas sumbernya. Prompt B menjelaskan artikel yang dipakai, bentuk ringkasan, dan batas sumbernya. Itu membantu mengarahkan jawaban, tetapi kamu tetap perlu mencocokkan hasilnya dengan artikel.

**Bisa dibuka — Lihat kedua prompt lagi** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Prompt A**

Tolong rangkum topik ini untuk presentasi saya.

**Prompt B**

Tolong rangkum artikel di bawah ini menjadi lima poin untuk slide presentasi. Gunakan hanya informasi dari artikel. Kalau ada detail yang tidak disebutkan, tulis bahwa informasinya belum tersedia.

Artikel:
Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

**Bisa dibuka — Tips: pisahkan instruksi dan bahan** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Pisahkan instruksi dan bahan bacaan dengan judul seperti “Artikel:” atau blok kutipan. Dengan begitu, keduanya lebih mudah dibedakan. Pemisah bagian dalam prompt sering disebut delimiter.

#### Jawaban A beserta catatan

Buka jawaban A dan B, lalu cocokkan dengan artikel. Keduanya adalah contoh simulasi.

**Tombol:** Lihat jawaban A

**Tombol:** Lihat jawaban B

**Jawaban A · simulasi**

Komunitas lokal mengadakan workshop AI gratis untuk pemula pada Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam. Workshop ini akan diikuti 100 peserta.

‘100 peserta’ tidak ada dalam artikel. Ini fakta tambahan yang dibuat untuk simulasi, bukan data acara.

**Bisa dibuka — Cocokkan dengan artikel** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

Sudah dibuka: 2/2 jawaban.

#### Jawaban B beserta catatan

Buka jawaban A dan B, lalu cocokkan dengan artikel. Keduanya adalah contoh simulasi.

**Tombol:** Lihat jawaban A

**Tombol:** Lihat jawaban B

**Jawaban B · simulasi**

1. Workshop AI diadakan oleh komunitas lokal.
2. Workshop ditujukan untuk pemula.
3. Peserta tidak dikenai biaya.
4. Workshop berlangsung Sabtu pukul 10.00.
5. Pendaftaran ditutup Jumat malam.

Lokasi acara belum tersedia dalam artikel.

Dalam contoh ini, ringkasannya mengikuti artikel dan menyebut informasi yang belum ada. Saat memakai AI sendiri, tetap periksa hasilnya meskipun kamu sudah membatasi sumber.

**Bisa dibuka — Cocokkan dengan artikel** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Komunitas lokal mengadakan workshop AI gratis untuk pemula, Sabtu pukul 10.00. Pendaftaran ditutup Jumat malam.

Sudah dibuka: 2/2 jawaban.

#### Kedua cabang pertanyaan sumber

| Pilihan | Umpan balik |
| --- | --- |
| Prompt A | Prompt A belum menyebut batas sumbernya. Prompt B menjelaskan artikel yang dipakai, bentuk ringkasan, dan batas sumbernya. Itu membantu mengarahkan jawaban, tetapi kamu tetap perlu mencocokkan hasilnya dengan artikel. |
| Prompt B | Prompt B menjelaskan artikel yang dipakai, bentuk ringkasan, dan batas sumbernya. Itu membantu mengarahkan jawaban, tetapi kamu tetap perlu mencocokkan hasilnya dengan artikel. |

### Bagian 10 — Angkanya terlihat meyakinkan. Sumbernya ada?

**Aturan interaksi:** Pilihan tunggal. Umpan balik muncul hanya di bawah tindakan aktif. Menekan pilihan lain mengganti pilihan aktif; menekan pilihan aktif mempertahankannya. Semua tindakan dapat dilanjutkan, termasuk “Pakai langsung” yang mendapat koreksi. Catatan utama tentang pemeriksaan klaim selalu tampil.

#### 10.1 — Periksa klaim

Di ringkasan tadi, ada jumlah peserta yang tidak disebutkan dalam artikel. Hal serupa juga bisa muncul sebagai angka survei atau kutipan yang terdengar meyakinkan. Coba periksa contoh berikut.

**Klaim buatan untuk latihan · bukan data nyata**

“Menurut survei nasional 2026, 78% anak muda Indonesia menggunakan AI setiap hari untuk belajar.”

**Kamu ingin memakai angka ini di presentasi. Apa langkah berikutnya?**

**Tombol:** Cari survei aslinya dan cocokkan angkanya

Cari survei aslinya dan cocokkan angkanya. Lihat siapa respondennya, kapan survei dilakukan, dan pertanyaan yang diajukan.

**Tombol:** Minta AI menyebutkan nama lembaganya

**Tombol:** Pakai langsung karena angkanya spesifik

**Tombol:** Hapus klaimnya kalau sumbernya tidak ditemukan

Sebelum membagikan jawaban AI atau memakainya untuk mengambil keputusan, periksa dulu klaim pentingnya, terutama angka dan kutipan.

#### Semua cabang tindakan pemeriksaan

| Pilihan | Umpan balik |
| --- | --- |
| Cari survei aslinya dan cocokkan angkanya | Cari survei aslinya dan cocokkan angkanya. Lihat siapa respondennya, kapan survei dilakukan, dan pertanyaan yang diajukan. |
| Minta AI menyebutkan nama lembaganya | Kamu boleh meminta sumber kepada AI, tetapi tetap perlu membuka dan membaca sumbernya. Nama lembaga saja belum membuktikan angkanya benar. |
| Pakai langsung karena angkanya spesifik | Angka yang terlihat spesifik tetap bisa salah atau dibuat-buat. Cari sumbernya dulu sebelum dipakai di presentasi. |
| Hapus klaimnya kalau sumbernya tidak ditemukan | Kalau sumbernya tidak bisa ditemukan, lebih baik klaim ini tidak dipakai. Kamu bisa mencari data lain yang dapat diperiksa. |

### Bagian 11 — Kamu ingin minta bantuan AI untuk apa?

**Aturan interaksi:** Langkah 1 memilih kebutuhan. Langkah 2–6 menampilkan satu kolom per langkah; hanya permintaan utama wajib. Kategori mengubah placeholder, tidak mengisi tulisan atau menghapus draf. Pratinjau dapat dibuka saat mengetik. Penyusunan prompt mempertahankan teks asli tiap kolom yang tidak kosong setelah trim, dalam urutan permintaan → konteks → batasan → format → contoh, dipisahkan dua baris baru. Trim hanya untuk memeriksa kosong; spasi dan baris dalam isi kolom yang dipakai tetap dipertahankan. Langkah 7 menampilkan prompt, saran utama, dan bagian saran tambahan sesuai kolom yang terisi. Tidak ada penilaian semantik, skor, atau pencocokan kata kunci. “Edit prompt-mu” kembali ke langkah 2; data kolom tetap ada. Langkah 8 refleksi dengan satu pilihan dan penjelasan yang sama untuk ketiga jawaban.

#### 11.1 — Pilih kebutuhan

Kamu sudah mencoba menambah detail, memberi contoh, meminta perbaikan, dan mengecek hasil. Sekarang pilih kebutuhanmu sendiri. Mulai dari permintaan sederhana, lalu tambahkan informasi yang diperlukan.

**Tombol:** Belajar sesuatu

**Tombol:** Membuat sesuatu

**Tombol:** Merencanakan sesuatu

**Tombol:** Kebutuhan lain

#### 11.2 — Tulis permintaan utama

Tulis dulu permintaan utamanya. Detail lain bisa kamu tambahkan setelah ini.

Apa yang ingin kamu minta? Wajib

**Kolom menulis** · placeholder: Contoh: Tolong jelaskan dasar-dasar reksa dana untuk pemula.

```text
[Permintaan utama peserta]
```

**Bisa dibuka — Lihat prompt sejauh ini** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

#### 11.3 — Tambahkan konteks

Sekarang pikirkan situasimu. Adakah informasi yang membantu AI memahami permintaan tadi? Kalau tidak ada, kamu boleh langsung lanjut.

Apa yang perlu AI tahu? Opsional · boleh dilewati.Misalnya kemampuanmu sekarang, siapa pembacanya, bahan yang kamu punya, atau situasi yang perlu dipertimbangkan.

**Kolom menulis**

```text
[Konteks peserta]
```

**Bisa dibuka — Lihat prompt sejauh ini** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

#### 11.4 — Tambahkan batasan

Berikutnya, sebutkan batas yang perlu diikuti, kalau ada. Misalnya waktu yang tersedia atau hal yang ingin kamu hindari.

Ada batasan yang perlu diikuti? Opsional · boleh dilewati.Misalnya waktu, budget, panjang tulisan, sumber yang boleh dipakai, atau hal yang ingin kamu hindari.

**Kolom menulis**

```text
[Batasan peserta]
```

**Bisa dibuka — Lihat prompt sejauh ini** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

#### 11.5 — Pilih format

Kalau bentuk jawabannya penting, sebutkan di sini. Kamu juga boleh membiarkannya kosong.

Mau jawabannya dalam bentuk apa? Opsional · boleh dilewati.Misalnya tabel, langkah-langkah, tiga pilihan, atau draf singkat.

**Kolom menulis**

```text
[Format peserta]
```

**Bisa dibuka — Lihat prompt sejauh ini** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

#### 11.6 — Tambahkan contoh

Terakhir, tambahkan contoh kalau itu membantu menunjukkan gaya atau pola yang kamu mau. Kalau tidak perlu, lanjut saja.

Punya contoh? Opsional · boleh dilewati.Tambahkan kalau kamu ingin menunjukkan gaya atau susunan yang kamu suka.

**Kolom menulis**

```text
[Contoh peserta]
```

**Bisa dibuka — Lihat prompt sejauh ini** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

#### 11.7 — Lihat prompt dan saran

Semua isianmu sudah digabung. Baca sebagai satu permintaan: apakah sudah menyampaikan kebutuhanmu dengan jelas?

**Pratinjau prompt yang kamu buat**

[Permintaan utama peserta]

[Konteks peserta]

[Batasan peserta]

[Format peserta]

[Contoh peserta]

Kamu bisa mencoba prompt ini, lalu melihat hasilnya. Kalau masih terlalu umum, tambahkan detail yang belum tersampaikan.

**Bisa dibuka — Lihat saran sesuai isianmu** (tertutup saat elemen pertama kali ditampilkan).

Isi setelah dibuka:

Saran ini membantumu memeriksa prompt sendiri. Aplikasi tidak menilai isi tulisanmu secara otomatis.

Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?

Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.

Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.

Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu.

**Tombol:** Edit prompt yang kamu buat

#### 11.8 — Refleksi

Prompt-mu sudah siap dicoba. Sekarang bayangkan jawabannya masih belum sesuai.

**Kalau jawabannya masih kurang sesuai, kamu akan mulai dari mana?**

**Tombol:** Minta AI memperbaiki bagian tertentu

**Tombol:** Tulis prompt baru dari awal

**Tombol:** Cari dulu apa yang masih kurang

Cari dulu bagian yang belum sesuai, lalu minta AI memperbaikinya. Kalau kebutuhanmu sudah berubah banyak, menulis prompt baru juga boleh.

#### Placeholder permintaan utama menurut kebutuhan

| Kategori | Placeholder |
| --- | --- |
| Belajar sesuatu | Contoh: Tolong jelaskan dasar-dasar reksa dana untuk pemula. |
| Membuat sesuatu | Contoh: Tolong bantu tulis deskripsi singkat untuk proyek portofolio saya. |
| Merencanakan sesuatu | Contoh: Tolong bantu susun jadwal belajar IELTS selama satu bulan. |
| Kebutuhan lain / kategori kosong | Tulis kebutuhanmu sendiri. |

#### Semua kolom dan saran

| Kolom | Wajib/opsional | Petunjuk | Saran |
| --- | --- | --- | --- |
| Apa yang ingin kamu minta? | Wajib | (tidak ada petunjuk tambahan) | Kamu bisa mencoba prompt ini, lalu melihat hasilnya. Kalau masih terlalu umum, tambahkan detail yang belum tersampaikan. |
| Apa yang perlu AI tahu? | Opsional | Misalnya kemampuanmu sekarang, siapa pembacanya, bahan yang kamu punya, atau situasi yang perlu dipertimbangkan. | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu? |
| Ada batasan yang perlu diikuti? | Opsional | Misalnya waktu, budget, panjang tulisan, sumber yang boleh dipakai, atau hal yang ingin kamu hindari. | Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta. |
| Mau jawabannya dalam bentuk apa? | Opsional | Misalnya tabel, langkah-langkah, tiga pilihan, atau draf singkat. | Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai. |
| Punya contoh? | Opsional | Tambahkan kalau kamu ingin menunjukkan gaya atau susunan yang kamu suka. | Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |

Jika pratinjau yang dibuka saat menulis masih kosong, teksnya: `Kalimat yang kamu tulis akan muncul di sini.` Pada langkah pemeriksaan, saran utama selalu tampil. Di bagian “Lihat saran sesuai isianmu”, setiap saran tambahan hanya tampil jika kolom terkait tidak kosong setelah trim. Jika seluruh kolom tambahan kosong, bagian tersebut hanya memuat keterangan pemeriksaan, tanpa saran tambahan. Terdapat 16 kombinasi hadir/tidaknya empat kolom opsional; aturan independen ini menentukan semua cabangnya. Teks bebas tidak terbatas, sehingga hasilnya dicatat sebagai aturan penggabungan, bukan daftar kalimat peserta.

### Bagian 12 — Beberapa kebiasaan yang bisa kamu pakai

**Aturan interaksi:** Sembilan kebiasaan ditampilkan sebagai ringkasan. Tombol selesai membuka halaman akhir di URL yang sama dan mencatat selesai. Walaupun label tombol menyebut “ke materi berikutnya”, kode saat ini tidak menavigasi ke materi/course lain.

#### 12.1 — Ringkasan dan selesai

Kamu sudah mencoba menyusun permintaan sendiri. Ini ringkasan kebiasaan yang bisa kamu pakai saat berbicara dengan AI nanti.

1. Mulai dari permintaan yang jelas. Untuk tugas sederhana, satu kalimat bisa cukup.
2. Tambahkan konteks yang berkaitan dengan tugas.
3. Sebutkan batasan dan bentuk jawaban kalau diperlukan.
4. Beri contoh saat gaya atau pola sulit dijelaskan.
5. Minta AI bertanya kalau informasi penting belum ada.
6. Kerjakan tugas besar bertahap, sambil mengecek hasil tiap langkah.
7. Gunakan permintaan lanjutan untuk memperbaiki bagian yang belum sesuai.
8. Kalau harus mengikuti bahan tertentu, sebutkan sumber yang boleh dipakai.
9. Periksa fakta penting sebelum menggunakan jawaban.

Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa informasi yang penting.

## Halaman awal, jeda, selesai, dan latihan opsional

### Saat materi belum siap

Menyiapkan materi…

### Saat disimpan dan dihentikan

PROMPT ENGINEERING

**Mau jeda dulu?**

Progres dan tulisanmu tersimpan di perangkat ini. Kamu terakhir berada di bagian 11 dari 12, langkah 4 dari 8.

**Tombol:** Lanjutkan belajar →

**Tombol:** Mulai dari awal

Nomor pada contoh jeda di atas adalah contoh posisi bagian 11 langkah 4 dari 8. Teks sebenarnya mengikuti pola: `Progres dan tulisanmu tersimpan di perangkat ini. Kamu terakhir berada di bagian {bagian} dari 12, langkah {langkah} dari {jumlah langkah bagian}.`

`Simpan dan berhenti` hanya membuka layar jeda pada URL yang sama. `Lanjutkan belajar →` menampilkan kembali posisi yang disimpan. `Mulai dari awal` mereset data sesi ke keadaan awal dan kembali ke bagian 1 langkah 1. Tidak ada tombol kembali ke menu course pada layar jeda.

### Setelah materi selesai

MATERI SELESAI

**Siap dicoba untuk kebutuhanmu sendiri**

Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa informasi yang penting.

**Tombol:** ← Kembali ke ringkasan

**Tombol:** Latihan kasus baru · opsional

`← Kembali ke ringkasan` mengubah status selesai menjadi belum selesai dan membuka bagian 12 langkah 1. `Latihan kasus baru · opsional` membuka/menutup latihan di bawah halaman selesai. Kontrol ini tidak menavigasi ke URL lain dan tidak mewajibkan latihan untuk menyelesaikan materi.

### Latihan kasus baru — sebelum memeriksa

MATERI SELESAI

**Siap dicoba untuk kebutuhanmu sendiri**

Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa informasi yang penting.

**Tombol:** ← Kembali ke ringkasan

**Tombol:** Latihan kasus baru · opsional

Di latihan sebelumnya, kamu menulis prompt dengan bantuan beberapa kolom. Kali ini, coba sampaikan kebutuhan dalam satu tulisan dengan caramu sendiri.

**Rencana latihan bahasa Inggris**

Kamu ingin berlatih berbicara bahasa Inggris. Kamu punya waktu sekitar 20 menit sehari dan ingin lebih percaya diri dalam tiga bulan. Kalau jadwalnya terlalu berat, kamu biasanya berhenti. Kamu juga tidak ingin terlalu banyak latihan tata bahasa.

**Prompt awal**

Tolong buatkan rencana belajar bahasa Inggris.

Ubah permintaan ini supaya rencananya lebih sesuai dengan situasi tadi. Tulis dengan caramu sendiri.

**Kolom menulis**

*Kosong sebelum peserta mengetik.*

**Tombol:** Periksa dengan situasinya

Kolom latihan kasus baru tidak mempunyai placeholder. `Periksa dengan situasinya` nonaktif jika tulisan kosong atau hanya berisi spasi. Menekan tombol mempertahankan tulisan dan mengganti editor dengan tampilan pemeriksaan mandiri.

### Latihan kasus baru — saat memeriksa

MATERI SELESAI

**Siap dicoba untuk kebutuhanmu sendiri**

Nanti saat memakai AI, mulai dari apa yang kamu butuhkan. Lihat jawabannya, beri detail tambahan jika perlu, lalu minta perbaikan pada bagian yang belum cocok. Sebelum hasilnya dipakai, periksa informasi yang penting.

**Tombol:** ← Kembali ke ringkasan

**Tombol:** Latihan kasus baru · opsional

Di latihan sebelumnya, kamu menulis prompt dengan bantuan beberapa kolom. Kali ini, coba sampaikan kebutuhan dalam satu tulisan dengan caramu sendiri.

**Rencana latihan bahasa Inggris**

Kamu ingin berlatih berbicara bahasa Inggris. Kamu punya waktu sekitar 20 menit sehari dan ingin lebih percaya diri dalam tiga bulan. Kalau jadwalnya terlalu berat, kamu biasanya berhenti. Kamu juga tidak ingin terlalu banyak latihan tata bahasa.

**Prompt awal**

Tolong buatkan rencana belajar bahasa Inggris.

**Tombol:** Edit tulisanmu

**Prompt yang kamu tulis**

[Tulisan peserta]

Baca tulisanmu, lalu tandai kebutuhan yang sudah disebutkan. Meminta AI bertanya lebih dulu juga boleh. Kamu memeriksanya sendiri; aplikasi tidak menilai isi tulisanmu.

**Tombol:** Tujuan berlatih berbicara

**Tombol:** Target tiga bulan

**Tombol:** Waktu sekitar 20 menit sehari

**Tombol:** Jadwal yang ringan dan bisa dijalankan

**Tombol:** Tidak terlalu banyak latihan tata bahasa

**Tombol:** Bentuk rencana yang mudah dipakai, kalau diperlukan

Kalau ada kebutuhan yang belum disebutkan, edit tulisanmu lalu periksa lagi.

Setiap indikator adalah pilihan checkbox berbentuk tombol; semuanya independen, boleh dicentang/dilepas, dan tidak membentuk skor. Ada 64 kombinasi checklist (2^6), dengan teks indikator yang sama untuk setiap kombinasi. Tidak ada koreksi otomatis atau syarat wajib memilih semua indikator. `Edit tulisanmu` membuka editor lagi tanpa menghapus tulisan. Checklist tetap tersimpan ketika tombol edit ditekan; begitu tulisan diubah, checklist dikosongkan. Menekan periksa lagi tanpa mengubah tulisan mempertahankan checklist. Tidak ada tombol submit ke server atau halaman hasil transfer tersendiri.

## Lampiran A — seluruh kemungkinan pilihan masalah caption

Nomor pilihan: 1–4 adalah masalah dalam urutan tampil; 5 adalah “Sudah cukup”. Ada 17 keadaan pilihan sah: kosong, 15 subset masalah yang tidak kosong, dan pilihan tunggal 5. Kombinasi 5 dengan nomor lain selalu dibersihkan oleh aturan klik. Memilih item bukan otomatis pindah langkah.

| Pilihan aktif | Teks pilihan | Tombol lanjut | Umpan balik |
| --- | --- | --- | --- |
| Kosong | (belum memilih / semua dilepas) | Nonaktif | Tidak ada umpan balik |
| 1 | Belum jelas untuk siapa | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 2 | Detail acaranya belum ada | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,2 | Belum jelas untuk siapa; Detail acaranya belum ada | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 3 | Belum tahu harus daftar di mana | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,3 | Belum jelas untuk siapa; Belum tahu harus daftar di mana | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 2,3 | Detail acaranya belum ada; Belum tahu harus daftar di mana | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,2,3 | Belum jelas untuk siapa; Detail acaranya belum ada; Belum tahu harus daftar di mana | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 4 | Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,4 | Belum jelas untuk siapa; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 2,4 | Detail acaranya belum ada; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,2,4 | Belum jelas untuk siapa; Detail acaranya belum ada; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 3,4 | Belum tahu harus daftar di mana; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,3,4 | Belum jelas untuk siapa; Belum tahu harus daftar di mana; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 2,3,4 | Detail acaranya belum ada; Belum tahu harus daftar di mana; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 1,2,3,4 | Belum jelas untuk siapa; Detail acaranya belum ada; Belum tahu harus daftar di mana; Gaya bahasanya kurang cocok | Aktif | Alasan salah satu item aktif, menurut item terakhir dalam urutan daftar |
| 5 | Sudah cukup untuk kebutuhan saya | Aktif | Untuk ide awal, caption ini bisa dipakai. Kalau mau langsung diposting, cek dulu apakah pembaca sudah punya informasi yang cukup untuk ikut. |

Mengubah urutan klik tidak mengubah himpunan masalah, tetapi bisa mengubah alasan terakhir yang ditampilkan. Tidak ada penilaian benar/salah atas himpunan tersebut. Saat memuat data lama yang berisi pilihan 5 bersama masalah lain, sesi dinormalisasi menjadi hanya pilihan 5.

## Lampiran B — seluruh 32 kombinasi caption

Nomor komponen sesuai tabel bagian 3: 1 audiens, 2 detail acara, 3 ajakan mendaftar, 4 gaya santai, 5 dua versi. Urutan tambahan prompt selalu 1 → 2 → 3 → 4 → 5, meskipun urutan klik berbeda. Hasil tidak menggunakan API.

Pembuka ditentukan oleh audiens dan gaya; penjelasan peserta ditentukan oleh audiens; biaya/waktu hanya muncul bila detail acara aktif; penanda `[cara daftar]` hanya muncul bila ajakan mendaftar aktif. Jika tidak ada komponen aktif, hasil menyebut “Daftar sekarang!”. Jika ada komponen lain aktif tetapi ajakan mendaftar tidak aktif, kalimat ajakan mendaftar tidak muncul. Dua versi hanya muncul jika komponen 5 aktif. Versi pendek menggabungkan pembuka, biaya/waktu, dan ajakan, tanpa kalimat penjelasan peserta.

### C00 — tidak ada komponen aktif

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini.
```

**Contoh jawaban AI · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Daftar sekarang!
```

### C01 — 1

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI.
```

**Contoh jawaban AI · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai.
```

### C02 — 2

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00.
```

**Contoh jawaban AI · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00.
```

### C03 — 1, 2

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00.
```

**Contoh jawaban AI · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00.
```

### C04 — 3

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi.
```

**Contoh jawaban AI · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Daftar melalui [cara daftar].
```

### C05 — 1, 3

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi.
```

**Contoh jawaban AI · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Daftar melalui [cara daftar].
```

### C06 — 2, 3

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi.
```

**Contoh jawaban AI · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C07 — 1, 2, 3

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi.
```

**Contoh jawaban AI · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C08 — 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama.
```

### C09 — 1, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai.
```

### C10 — 2, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00.
```

### C11 — 1, 2, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00.
```

### C12 — 3, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Daftar melalui [cara daftar].
```

### C13 — 1, 3, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Daftar melalui [cara daftar].
```

### C14 — 2, 3, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C15 — 1, 2, 3, 4

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja.
```

**Contoh jawaban AI · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C16 — 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Jangan lewatkan workshop AI seru ini!
```

**Versi lebih lengkap · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama.
```

### C17 — 1, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana?
```

**Versi lebih lengkap · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai.
```

### C18 — 2, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Workshop gratis, Sabtu pukul 10.00.
```

**Versi lebih lengkap · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00.
```

### C19 — 1, 2, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Workshop gratis, Sabtu pukul 10.00.
```

**Versi lebih lengkap · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00.
```

### C20 — 3, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Daftar melalui [cara daftar].
```

### C21 — 1, 3, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Daftar melalui [cara daftar].
```

### C22 — 2, 3, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Jangan lewatkan workshop AI seru ini! Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C23 — 1, 2, 3, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Mau belajar AI, tapi bingung mulai dari mana? Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C24 — 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌
```

**Versi lebih lengkap · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama.
```

### C25 — 1, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌
```

**Versi lebih lengkap · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai.
```

### C26 — 2, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Workshop gratis, Sabtu pukul 10.00.
```

**Versi lebih lengkap · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00.
```

### C27 — 1, 2, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Workshop gratis, Sabtu pukul 10.00.
```

**Versi lebih lengkap · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00.
```

### C28 — 3, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Daftar melalui [cara daftar].
```

### C29 — 1, 3, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Daftar melalui [cara daftar].
```

### C30 — 2, 3, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Yuk, ikut workshop AI bareng! 🙌 Tambah wawasan dan belajar bersama. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

### C31 — 1, 2, 3, 4, 5

**Prompt yang terbentuk:**

```text
Tolong buatkan caption untuk postingan workshop AI ini. Acaranya untuk orang yang baru mulai belajar AI. Workshop ini gratis dan diadakan Sabtu pukul 10.00. Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi. Pakai bahasa santai, dengan satu atau dua emoji saja. Tolong buat dua versi: satu pendek dan satu lebih lengkap.
```

**Versi pendek · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

**Versi lebih lengkap · simulasi:**

```text
Baru mulai belajar AI? Yuk, belajar bareng! 🙌 Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai. Workshop gratis, Sabtu pukul 10.00. Daftar melalui [cara daftar].
```

Keadaan C00 dapat tampil melalui jalur normal: aktifkan lalu nonaktifkan sedikitnya satu komponen. Tombol lanjut masih aktif karena komponen itu pernah dicoba. Catatan “setelah mencoba tiga pilihan” memakai jumlah komponen berbeda yang pernah dicoba, bukan jumlah komponen yang sedang aktif.

## Lampiran C — seluruh 64 kombinasi akhir pilah detail

Nomor detail mengikuti urutan bagian 4. Tabel ini menampilkan hasil pilihan peserta, bukan pembetulan otomatis. Setiap nomor yang tidak masuk kelompok Perlu masuk kelompok Belum perlu. Alasan per detail dan awalan koreksi sudah dicatat pada bagian 4.

| Kombinasi | Perlu untuk caption ini | Belum perlu |
| --- | --- | --- |
| D00 | (daftar kosong) | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D01 | Workshop gratis | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D02 | Acaranya untuk pemula | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D03 | Workshop gratis; Acaranya untuk pemula | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D04 | Ketua komunitas suka warna biru | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D05 | Workshop gratis; Ketua komunitas suka warna biru | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D06 | Acaranya untuk pemula; Ketua komunitas suka warna biru | Workshop gratis; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D07 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru | Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D08 | Komunitas berdiri tahun 2023 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D09 | Workshop gratis; Komunitas berdiri tahun 2023 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D10 | Acaranya untuk pemula; Komunitas berdiri tahun 2023 | Workshop gratis; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D11 | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023 | Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D12 | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 | Workshop gratis; Acaranya untuk pemula; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D13 | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 | Acaranya untuk pemula; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D14 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 | Workshop gratis; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D15 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 | Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata |
| D16 | Pendaftaran ditutup Jumat malam | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D17 | Workshop gratis; Pendaftaran ditutup Jumat malam | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D18 | Acaranya untuk pemula; Pendaftaran ditutup Jumat malam | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D19 | Workshop gratis; Acaranya untuk pemula; Pendaftaran ditutup Jumat malam | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D20 | Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D21 | Workshop gratis; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D22 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam | Workshop gratis; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D23 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam | Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata |
| D24 | Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata |
| D25 | Workshop gratis; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Acaranya untuk pemula; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata |
| D26 | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Workshop gratis; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata |
| D27 | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata |
| D28 | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Workshop gratis; Acaranya untuk pemula; Caption maksimal sekitar 80 kata |
| D29 | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Acaranya untuk pemula; Caption maksimal sekitar 80 kata |
| D30 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Workshop gratis; Caption maksimal sekitar 80 kata |
| D31 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam | Caption maksimal sekitar 80 kata |
| D32 | Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D33 | Workshop gratis; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D34 | Acaranya untuk pemula; Caption maksimal sekitar 80 kata | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D35 | Workshop gratis; Acaranya untuk pemula; Caption maksimal sekitar 80 kata | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D36 | Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D37 | Workshop gratis; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D38 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata | Workshop gratis; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D39 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Caption maksimal sekitar 80 kata | Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam |
| D40 | Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam |
| D41 | Workshop gratis; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam |
| D42 | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Workshop gratis; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam |
| D43 | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam |
| D44 | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Pendaftaran ditutup Jumat malam |
| D45 | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Pendaftaran ditutup Jumat malam |
| D46 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Workshop gratis; Pendaftaran ditutup Jumat malam |
| D47 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Caption maksimal sekitar 80 kata | Pendaftaran ditutup Jumat malam |
| D48 | Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 |
| D49 | Workshop gratis; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 |
| D50 | Acaranya untuk pemula; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 |
| D51 | Workshop gratis; Acaranya untuk pemula; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023 |
| D52 | Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023 |
| D53 | Workshop gratis; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Komunitas berdiri tahun 2023 |
| D54 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Komunitas berdiri tahun 2023 |
| D55 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Komunitas berdiri tahun 2023 |
| D56 | Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru |
| D57 | Workshop gratis; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Acaranya untuk pemula; Ketua komunitas suka warna biru |
| D58 | Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Ketua komunitas suka warna biru |
| D59 | Workshop gratis; Acaranya untuk pemula; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Ketua komunitas suka warna biru |
| D60 | Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis; Acaranya untuk pemula |
| D61 | Workshop gratis; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Acaranya untuk pemula |
| D62 | Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | Workshop gratis |
| D63 | Workshop gratis; Acaranya untuk pemula; Ketua komunitas suka warna biru; Komunitas berdiri tahun 2023; Pendaftaran ditutup Jumat malam; Caption maksimal sekitar 80 kata | (daftar kosong) |

Sebelum semua kartu dipilih, masing-masing kartu masih dapat bernilai belum dipilih, Perlu, atau Belum perlu. Layar detail yang sedang aktif tidak dapat dilanjutkan selama detail itu belum dipilih. Kode tidak mewajibkan semua pilihan sesuai acuan untuk membuka ringkasan.

## Lampiran D — seluruh 32 kombinasi follow-up

Nomor pilihan: 1 bahasa sederhana, 2 contoh spam email, 3 tanpa rumus, 4 tiga poin, 5 penjelasan dari awal. Tambahan instruksi disusun dalam urutan 1 → 2 → 3 → 4. Pilihan 5 mengganti kalimat awal permintaan dan menambahkan pengantar tentang machine learning pada respons. Pilihan 4 mengubah tiga kalimat isi menjadi daftar bernomor. Tanpa pilihan 4, ketiganya menjadi satu paragraf. Definisi supervised tetap muncul pada akhir semua respons.

Pilihan 2 menentukan isi contoh spam dan didahulukan atas pilihan 1 pada teks simulasi. Karena itu, sebagian kombinasi menghasilkan jawaban yang identik walaupun instruksinya berbeda. Pilihan 3 tidak mengubah teks jawaban; ia menambahkan arahan dan catatan tentang batasan tanpa rumus.

### F00 — tidak ada pilihan

Kombinasi kosong tidak bisa membuka hasil melalui tombol lanjut pada alur normal. Berikut output fungsi pembentuk untuk kelengkapan dokumentasi; UI tidak menampilkan respons ini ketika pilihan kosong pada langkah hasil.

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Supervised learning memakai pasangan data input dan target berlabel. Model mempelajari hubungan antara input dan target dari data latihan. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F01 — 1

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model belajar dari contoh yang sudah diberi label jawaban. Dari contoh itu, model belajar mengenali pola. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F02 — 2

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai contoh spam email.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F03 — 1, 2

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Pakai contoh spam email.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F04 — 3

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Supervised learning memakai pasangan data input dan target berlabel. Model mempelajari hubungan antara input dan target dari data latihan. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F05 — 1, 3

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model belajar dari contoh yang sudah diberi label jawaban. Dari contoh itu, model belajar mengenali pola. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F06 — 2, 3

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai contoh spam email. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F07 — 1, 2, 3

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F08 — 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Supervised learning memakai pasangan data input dan target berlabel.
2. Model mempelajari hubungan antara input dan target dari data latihan.
3. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F09 — 1, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model belajar dari contoh yang sudah diberi label jawaban.
2. Dari contoh itu, model belajar mengenali pola.
3. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F10 — 2, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai contoh spam email. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F11 — 1, 2, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F12 — 3, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Supervised learning memakai pasangan data input dan target berlabel.
2. Model mempelajari hubungan antara input dan target dari data latihan.
3. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F13 — 1, 3, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model belajar dari contoh yang sudah diberi label jawaban.
2. Dari contoh itu, model belajar mengenali pola.
3. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F14 — 2, 3, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai contoh spam email. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F15 — 1, 2, 3, 4

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F16 — 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Supervised learning memakai pasangan data input dan target berlabel. Model mempelajari hubungan antara input dan target dari data latihan. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F17 — 1, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model belajar dari contoh yang sudah diberi label jawaban. Dari contoh itu, model belajar mengenali pola. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F18 — 2, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai contoh spam email.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F19 — 1, 2, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Pakai contoh spam email.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F20 — 3, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Supervised learning memakai pasangan data input dan target berlabel. Model mempelajari hubungan antara input dan target dari data latihan. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F21 — 1, 3, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model belajar dari contoh yang sudah diberi label jawaban. Dari contoh itu, model belajar mengenali pola. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F22 — 2, 3, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai contoh spam email. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F23 — 1, 2, 3, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Tanpa rumus dulu.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’. Dari contoh itu, model belajar mengenali pola pada kedua kelompok. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F24 — 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Supervised learning memakai pasangan data input dan target berlabel.
2. Model mempelajari hubungan antara input dan target dari data latihan.
3. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F25 — 1, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model belajar dari contoh yang sudah diberi label jawaban.
2. Dari contoh itu, model belajar mengenali pola.
3. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F26 — 2, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai contoh spam email. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F27 — 1, 2, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F28 — 3, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Supervised learning memakai pasangan data input dan target berlabel.
2. Model mempelajari hubungan antara input dan target dari data latihan.
3. Hubungan itu digunakan untuk membuat prediksi pada input baru.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F29 — 1, 3, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model belajar dari contoh yang sudah diberi label jawaban.
2. Dari contoh itu, model belajar mengenali pola.
3. Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F30 — 2, 3, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai contoh spam email. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

### F31 — 1, 2, 3, 4, 5

**Permintaan lanjutanmu** (isi setelah dibuka):

```text
Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning. Pakai bahasa yang lebih sederhana. Pakai contoh spam email. Tanpa rumus dulu. Cukup tiga poin.
```

**Contoh jawaban setelah diperbaiki · simulasi:**

```text
Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.

1. Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.
2. Dari contoh itu, model belajar mengenali pola pada kedua kelompok.
3. Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.

Disebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.
```

**Catatan karena pilihan 3 aktif:**

```text
Kamu meminta penjelasan tanpa rumus. Batasan seperti ini bisa dipakai saat kamu ingin memahami gambaran dasarnya lebih dulu.
```

**Catatan karena pilihan 5 aktif:**

```text
Kalau dasarnya masih membingungkan, kamu boleh meminta penjelasan dari awal. Kalau hanya satu bagian yang belum jelas, sebutkan bagian itu saja.
```

**Catatan utama yang selalu tampil di langkah hasil:**

```text
Gunakan jawaban sebelumnya sebagai titik awal. Sebutkan bagian yang belum cocok dan bagaimana kamu ingin memperbaikinya.
```

## Lampiran E — semua cabang kolom opsional dan refleksi

Permintaan utama selalu disertakan jika sudah memenuhi syarat. Empat kolom opsional independen. Tabel mengacu pada kolom: 1 konteks, 2 batasan, 3 bentuk jawaban, 4 contoh. Konten bebas peserta tetap sama; tabel ini menentukan tambahan yang digabung dan saran yang tersedia.

| Cabang | Kolom tambahan terisi | Urutan pratinjau | Saran tambahan setelah dibuka |
| --- | --- | --- | --- |
| P00 | (semuanya kosong) | Permintaan utama | (tidak ada saran tambahan) |
| P01 | Apa yang perlu AI tahu? | Permintaan utama → Apa yang perlu AI tahu? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu? |
| P02 | Ada batasan yang perlu diikuti? | Permintaan utama → Ada batasan yang perlu diikuti? | Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta. |
| P03 | Apa yang perlu AI tahu?, Ada batasan yang perlu diikuti? | Permintaan utama → Apa yang perlu AI tahu? → Ada batasan yang perlu diikuti? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta. |
| P04 | Mau jawabannya dalam bentuk apa? | Permintaan utama → Mau jawabannya dalam bentuk apa? | Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai. |
| P05 | Apa yang perlu AI tahu?, Mau jawabannya dalam bentuk apa? | Permintaan utama → Apa yang perlu AI tahu? → Mau jawabannya dalam bentuk apa? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai. |
| P06 | Ada batasan yang perlu diikuti?, Mau jawabannya dalam bentuk apa? | Permintaan utama → Ada batasan yang perlu diikuti? → Mau jawabannya dalam bentuk apa? | Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai. |
| P07 | Apa yang perlu AI tahu?, Ada batasan yang perlu diikuti?, Mau jawabannya dalam bentuk apa? | Permintaan utama → Apa yang perlu AI tahu? → Ada batasan yang perlu diikuti? → Mau jawabannya dalam bentuk apa? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai. |
| P08 | Punya contoh? | Permintaan utama → Punya contoh? | Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P09 | Apa yang perlu AI tahu?, Punya contoh? | Permintaan utama → Apa yang perlu AI tahu? → Punya contoh? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P10 | Ada batasan yang perlu diikuti?, Punya contoh? | Permintaan utama → Ada batasan yang perlu diikuti? → Punya contoh? | Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P11 | Apa yang perlu AI tahu?, Ada batasan yang perlu diikuti?, Punya contoh? | Permintaan utama → Apa yang perlu AI tahu? → Ada batasan yang perlu diikuti? → Punya contoh? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P12 | Mau jawabannya dalam bentuk apa?, Punya contoh? | Permintaan utama → Mau jawabannya dalam bentuk apa? → Punya contoh? | Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P13 | Apa yang perlu AI tahu?, Mau jawabannya dalam bentuk apa?, Punya contoh? | Permintaan utama → Apa yang perlu AI tahu? → Mau jawabannya dalam bentuk apa? → Punya contoh? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P14 | Ada batasan yang perlu diikuti?, Mau jawabannya dalam bentuk apa?, Punya contoh? | Permintaan utama → Ada batasan yang perlu diikuti? → Mau jawabannya dalam bentuk apa? → Punya contoh? | Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |
| P15 | Apa yang perlu AI tahu?, Ada batasan yang perlu diikuti?, Mau jawabannya dalam bentuk apa?, Punya contoh? | Permintaan utama → Apa yang perlu AI tahu? → Ada batasan yang perlu diikuti? → Mau jawabannya dalam bentuk apa? → Punya contoh? | Konteksnya sudah kamu tambahkan. Baca lagi: apakah informasi ini membantu AI memahami kebutuhanmu?<br>Batasannya sudah ada. Cek apakah AI bisa mengikuti batas ini dan tetap mengerjakan tugas yang kamu minta.<br>Kamu sudah menyebut bentuk jawaban yang diinginkan. Saat hasilnya muncul, cek apakah formatnya sesuai.<br>Contohmu bisa membantu menunjukkan gaya atau pola. Pastikan AI tidak ikut memakai detail contoh yang tidak sesuai dengan tugasmu. |

Saran utama untuk semua cabang:

```text
Kamu bisa mencoba prompt ini, lalu melihat hasilnya. Kalau masih terlalu umum, tambahkan detail yang belum tersampaikan.
```

Pilihan refleksi: `Minta AI memperbaiki bagian tertentu`; `Tulis prompt baru dari awal`; `Cari dulu apa yang masih kurang`. Ketiganya menampilkan penjelasan yang sama:

```text
Cari dulu bagian yang belum sesuai, lalu minta AI memperbaikinya. Kalau kebutuhanmu sudah berubah banyak, menulis prompt baru juga boleh.
```

## Penyimpanan, memuat ulang, dan keadaan awal

Data sesi disimpan di `localStorage` dengan kunci `prompt-engineering-v4-pilot`, setelah materi selesai dimuat dan setiap kali data sesi berubah. Penyimpanan tidak mengirim draf ke server. Pada pemuatan awal, sementara tampil `Menyiapkan materi…`. Setelah pemeriksaan localStorage selesai, tampil salah satu dari keadaan berikut:

| Keadaan data lokal | Yang tampil |
| --- | --- |
| Tidak ada data | Bagian 1 langkah 1, seluruh pilihan/kolom kosong. |
| JSON dan struktur sesi valid | Layar jeda; peserta memilih Lanjutkan belajar atau Mulai dari awal. |
| JSON tidak bisa dibaca / struktur tidak valid | Keadaan awal, tanpa pesan kesalahan tambahan. |
| Akses localStorage gagal / diblokir | Tetap berjalan dengan state dalam memori, tanpa pesan kesalahan tambahan. |
| Sesi valid sudah selesai | Tetap layar jeda dulu; setelah Lanjutkan belajar, halaman selesai tampil. |
| Sesi lama valid tanpa phase | Langkah pertama pada bagian yang tersimpan. |
| Sesi lama valid memuat Sudah cukup bersama masalah lain | Dibersihkan menjadi hanya Sudah cukup. |

### Data yang disimpan dan nilai awal

| Nama | Makna | Nilai awal |
| --- | --- | --- |
| screen | Bagian (indeks mulai 0) | 0 |
| phase | Langkah dalam bagian (indeks mulai 0) | 0 |
| prediction | Perkiraan bagian 1 | null |
| issues | Pilihan masalah bagian 2, menurut urutan ditambahkan | [] |
| components | Komponen caption aktif, menurut urutan ditambahkan | [] |
| tried | Komponen caption yang pernah dicoba | [] |
| sorted | Enam keputusan kelompok detail | [null, null, null, null, null, null] |
| example | Contoh gaya A/B/C | null |
| travel | Informasi penting untuk perjalanan | null |
| interest | Minat perjalanan | "" |
| order | Urutan tiga langkah pekerjaan | [2, 0, 1] |
| ordered | Pernah mengubah urutan | false |
| followup | Pilihan follow-up aktif | [] |
| sourcesSeen | Jawaban sumber yang pernah dibuka | [] |
| source | Prompt/jawaban sumber aktif | null |
| sourceChoice | Pilihan pertanyaan arah sumber | null |
| claim | Pilihan tindakan memeriksa klaim | null |
| category | Kategori kebutuhan menulis prompt | null |
| fields | Lima tulisan peserta | ["", "", "", "", ""] |
| submitted | Flag lama; tidak mengatur tampilan pemeriksaan utama saat ini | false |
| reflection | Pilihan refleksi | null |
| complete | Materi utama selesai | false |
| transfer | Tulisan latihan kasus baru | "" |
| transferSubmitted | Tampilan pemeriksaan mandiri latihan kasus baru | false |
| checks | Indikator pemeriksaan mandiri aktif | [] |

### Validasi data lokal saat memuat

- `screen` harus bilangan bulat 0–11; `phase` boleh belum ada untuk migrasi, atau bilangan bulat 0 sampai jumlah langkah bagian dikurangi satu.
- Pilihan tunggal harus null atau ID bilangan bulat dalam rentangnya.
- Daftar ID harus berupa array dengan setiap ID bilangan bulat dalam rentangnya. Validasi ini tidak memeriksa duplikasi; alur klik normal mencegah duplikasi sendiri.
- `sorted` harus tepat enam elemen bernilai null atau boolean.
- `order` harus tepat tiga ID unik 0–2.
- `fields` harus tepat lima string; `transfer` dan `interest` harus string. `interest` tidak diperiksa terhadap daftar minat pada validasi lokal.
- `ordered`, `submitted`, `complete`, dan `transferSubmitted` harus boolean.
- Validasi ini memeriksa struktur, bukan konsistensi syarat pilihan dengan posisi langkah. Data lokal yang dibuat manual tetapi lolos struktur bisa membuka keadaan yang tidak dilalui jalur normal. Dokumentasi cabang utama di atas mengikuti interaksi UI normal.

### Keadaan sementara yang tidak disimpan

`loaded`, `paused`, `transferOpen`, `lastComponent`, `removed`, dan `resultVersion` adalah state sementara komponen. Akibatnya:

- Membuka ulang halaman selalu menutup panel latihan opsional dan memulai layar jeda ketika sesi valid ditemukan.
- Catatan komponen caption terakhir dan flag tambah/hapus hilang setelah pemuatan ulang; prompt/hasil caption dari pilihan aktif tetap tersimpan.
- `Mulai dari awal` mereset objek sesi, tetapi kode tidak secara terpisah mereset state sementara ini. Catatan komponen lama atau status panel latihan dapat tetap ada dalam mount yang sama sampai diganti tindakan berikutnya.
- Buka/tutup details tidak disimpan; saat elemen dibuat ulang setelah berpindah langkah, ia mulai tertutup.
- Kembali dari halaman selesai ke ringkasan mempertahankan tulisan latihan kasus baru dan checklistnya. Materi dapat ditandai selesai lagi.
- Tidak ada status sukses/gagal penyimpanan yang ditampilkan; teks layar jeda tetap menyebut tersimpan meskipun localStorage gagal. Ini mencatat perilaku kode saat ini.

## Event yang diterbitkan

Seluruh event memakai CustomEvent browser bernama `prompt-course-event`. `detail` memuat `name`, `screen` (nomor bagian mulai 1), dan properti berikut. Event belum tersambung ke layanan analytics. Tulisan peserta tidak dimasukkan ke payload.

| name | Kapan | Payload tambahan |
| --- | --- | --- |
| prompt_course_started | Setelah bootstrap pemuatan lokal selesai pada mount | Tidak ada; screen selalu 1, termasuk ketika memuat sesi lanjutan. |
| prediction_selected | Setiap menekan salah satu perkiraan | choice: 0 atau 1 |
| prompt_component_toggled | Setiap menambah/melepas komponen, termasuk tombol hapus | component: ID 0–4; enabled: boolean |
| detail_sort_completed | Saat memilih kelompok dan semua enam detail sudah mempunyai keputusan | relevantPlacements: jumlah keputusan yang sesuai acuan. Dapat terbit lagi saat mengubah keputusan setelah semuanya terisi. |
| example_selected | Setiap menekan contoh gaya | example: ID 0–2 |
| clarifying_question_demo_completed | Setiap menekan minat perjalanan | interest: Kuliner/Wisata budaya/Alam/Campuran |
| task_breakdown_completed | Saat melanjutkan dari langkah susun urutan | order: tiga ID 0–2; tidak hanya urutan yang benar |
| followup_built | Setiap mengaktifkan/melepas pilihan follow-up | choices: daftar ID 0–4 sesudah klik |
| source_constraint_compared | Ketika kedua jawaban sudah pernah dibuka, saat memasuki hasil atau menekan A/B | Tidak ada; bisa terbit berulang sesudah kedua jawaban terbuka. |
| claim_check_completed | Setiap menekan tindakan pemeriksaan klaim | choice: ID 0–3 |
| own_prompt_submitted | Saat lanjut dari kolom contoh menuju pratinjau/saran | filledFields: lima boolean (hasil trim tiap kolom) |
| prompt_course_completed | Saat tombol selesai ditekan | Tidak ada. |

Tidak ada event khusus untuk membuka penjelasan tambahan, jeda, resume, mulai ulang, kategori kebutuhan, refleksi, latihan kasus baru, atau checklistnya. Tidak ada data kepercayaan diri atau durasi sesi yang dikumpulkan oleh komponen ini.

## Sumber tempat yang ditautkan pada itinerary

- [Gudeg Wijilan](https://visitingjogja.jogjaprov.go.id/8045/gudeg-wijilan/)

- [Kuliner Kotagede](https://visitingjogja.jogjaprov.go.id/42323/makanan-khas-kotagede-yang-wajib-dicoba/)

- [Taman Sari](https://budaya.jogjaprov.go.id/artikel/detail/51-tamansari)

- [Kerajinan perak Kotagede](https://visitingjogja.jogjaprov.go.id/40176/sentra-kerajinan-perak-kota-gede/)

- [Tlogo Putri, Kaliurang](https://visitingjogja.jogjaprov.go.id/30916/wajib-dikunjungi-tlogo-putri-di-kaliurang-ini-sangat-indah/)

- [Gunung Api Purba Nglanggeran](https://visitingjogja.jogjaprov.go.id/259/gunung-api-purba-nglanggeran/)

Catatan riset tersedia di [jogja-itinerary-research.md](jogja-itinerary-research.md). Halaman latihan sendiri sudah mempunyai tautan sumber di tiap hari. Harga tiket, jam buka, waktu tempuh, dan optimasi rute tidak dihasilkan oleh simulasi.

## Dasar pemeriksaan kelengkapan dokumen

Transkripsi 34 langkah dan layar khusus dirender dari komponen yang sama dengan UI memakai keadaan contoh lokal. Data seluruh kombinasi caption/follow-up dihitung oleh fungsi pembentuk yang digunakan UI; seluruh 64 hasil pengelompokan dan enam urutan dicatat. Keadaan kosong, syarat tombol, pergantian pilihan, penyimpanan, event, dan migrasi dicocokkan dengan percabangan kode. Inventaris seluruh string data dan JSX yang tampil juga diperiksa agar teks tidak tertinggal. Ini pemeriksaan dokumentasi terhadap kode; bukan pengujian klik browser atau penilaian durasi peserta.

Sumber implementasi dan checksum saat dokumen dibuat:

| File | SHA-256 |
| --- | --- |
| src/features/learn/yes-man-pilot.tsx | edff0cff1a6af19b5ade25d9b6917a3e56ec45b69a29c4a4bcc505fd0d9571ac |
| src/features/learn/prompt-engineering-content.ts | 7b90e4d8fcbb42e8eccfd725996ae8acf00c5b579d65a4b3d6e1f26ad3205514 |
| src/features/learn/yes-man-pilot-preview.tsx | fe37ad4e715ad4d788fa725b081ff28a243abe2f94943469072afeed02091ed7 |
| src/features/learn/yes-man-pilot.module.css | f3e37f019af060d0746bef8f4eb448ee58f357da4438d6597e1b0c40c70c70e0 |
| src/app/dev/yes-man-pilot/page.tsx | 09457580ef5ceea2cafc861c8cc2eb2420770e5d73029890e8053f4ed1a680e5 |


## Tambahan yang diterapkan dari materi lengkap

Pengantar mendahului 34 langkah utama dan memiliki tombol `Mulai belajar →`. Teori singkat muncul hanya pada langkah terkait. Semua penjelasan tambahan dan glosarium tertutup secara default, tidak wajib dibuka, dan kembali tertutup saat berganti langkah. Aktivitas, pilihan, jawaban simulasi, dan prompt yang otomatis diperbarui pada langkah 3.1 tetap mengikuti alur sebelumnya. Catatan penyusun, tabel temuan penerapan, aturan teknis, dan lampiran kemungkinan jawaban tidak ditampilkan sebagai bacaan peserta.


Prompt Engineering: menyampaikan kebutuhan dan memperbaiki jawaban AI

Prompt adalah permintaan atau instruksi yang kamu tulis untuk AI. Di sini kamu akan mencoba memilih detail, memberi contoh, meminta perubahan, dan memeriksa jawabannya.

Semua jawaban dalam latihan ini sudah disiapkan sebagai simulasi. Pilihanmu menentukan contoh yang muncul. Saat menulis prompt sendiri, kamu mendapat panduan pemeriksaan; aplikasi tidak menilai isi tulisanmu atau menghasilkan jawaban langsung dari prompt tersebut.

Ikuti petunjuk tiap langkah. Kamu bisa kembali untuk mengubah pilihan dan melanjutkan dari progres yang tersimpan pada browser ini. Target durasi utama sekitar 8–10 menit belum diuji kepada peserta; membaca seluruh rincian tambahan bisa memerlukan waktu lebih lama.

<details>
<summary>AI dan prompt engineering yang dibahas di sini</summary>

Materi ini membahas AI generatif untuk percakapan, yang bisa membantu membuat draf, menjelaskan topik, atau menyusun rencana. Prompt engineering adalah cara menyusun dan memperbaiki permintaan agar jawabannya lebih sesuai kebutuhan. Mulai dari permintaan sederhana, lihat hasilnya, lalu tambahkan arahan jika perlu. Informasi penting tetap perlu diperiksa sebelum digunakan.

</details>

### Tambahan pada langkah 1.1 — Perkirakan kecukupan prompt

**Yang perlu dipahami**

Prompt adalah permintaan atau instruksi yang kamu berikan kepada AI. Informasi yang dibutuhkan bergantung pada hasil yang kamu mau. Satu kalimat bisa cukup untuk mencari ide awal; caption yang siap diposting perlu memuat detail yang dibutuhkan pembaca.

<details>
<summary>Kenapa jawabannya bisa kurang sesuai?</summary>

AI memakai permintaanmu, informasi dalam percakapan, dan kemampuan model untuk menyusun jawaban. Kalau ada detail penting yang belum disebutkan, AI bisa memakai asumsi yang berbeda dari maksudmu.

Jawaban yang kurang cocok juga tidak selalu berarti prompt-mu salah. AI bisa keliru memahami arahan meskipun kamu sudah menjelaskannya. Lihat dulu hasilnya, lalu tentukan apa yang perlu diubah.

</details>

### Tambahan pada langkah 2.1 — Tandai hal yang perlu diperbaiki

**Yang perlu dipahami**

Saat menilai caption, lihat kebutuhan pembacanya: apakah jelas siapa yang cocok ikut, kapan acaranya, dan bagaimana cara mendaftar? Draf awal bisa membantu mencari ide, tetapi sebelum diposting, cocokkan isinya dengan informasi acara.

<details>
<summary>Dari draf ke tulisan siap pakai</summary>

Draf awal bisa membantu mencari ide atau menentukan gaya tulisan. Sebelum diposting, isinya perlu diperiksa. Untuk pengumuman acara, pembaca tetap membutuhkan waktu dan cara mendaftar, meskipun caption-nya sudah menarik.

“Sudah cukup” bisa menjadi pilihan kalau kamu hanya butuh ide awal. Kalau caption akan langsung dipakai, cocokkan dulu dengan informasi acara yang benar.

</details>

### Tambahan pada langkah 3.1 — Pilih tambahan

**Yang perlu dipahami**

Tambahan pada prompt punya fungsi berbeda. Audiens dan detail acara memberi informasi tentang isi. Gaya mengatur cara menyampaikan pesan, sedangkan format menentukan bentuk jawabannya. Pilih yang membantu kebutuhanmu.

### Tambahan pada langkah 3.2 — Lihat hasil caption

**Yang perlu dipahami**

Lihat apakah setiap arahan yang kamu pilih terlihat pada hasilnya. Jika ada penanda [cara daftar], isi dengan informasi yang benar sebelum caption diposting. Penanda itu menunjukkan bagian yang masih kurang, bukan tautan pendaftaran.

<details>
<summary>Fungsi tiap pilihan</summary>

| Pilihan | Fungsinya | Yang perlu dilihat pada hasil |
| --- | --- | --- |
| Untuk orang yang baru mulai belajar AI | Menjelaskan siapa pesertanya. | Apakah pembuka dan isinya cocok untuk pemula? |
| Gratis, Sabtu pukul 10.00 | Memberi informasi acara. | Apakah biaya dan waktunya ditulis dengan benar? |
| Ajak pembaca mendaftar | Menjelaskan tindakan yang diharapkan. | Apakah ada ajakan mendaftar dan cara ikut yang benar, atau penanda yang perlu dilengkapi? |
| Santai, dengan sedikit emoji | Menunjukkan gaya bahasa. | Apakah nada dan jumlah emojinya sesuai? |
| Buat versi pendek dan versi lebih lengkap | Meminta dua versi jawaban. | Apakah versi yang diberikan bisa dipilih sesuai kebutuhan postingan? |

Informasi acara menentukan apa yang disampaikan. Arahan gaya membantu menentukan cara menyampaikannya.

</details>

<details>
<summary>Bagian yang perlu dilengkapi</summary>

`[cara daftar]` adalah penanda untuk informasi yang belum diberikan. Ganti bagian itu dengan cara mendaftar yang benar sebelum caption diposting. Penanda ini membantu memperlihatkan informasi yang masih kurang tanpa mengarang alamat atau tautan.

</details>

### Tambahan pada langkah 4.1 — Kelompokkan detail 1

**Yang perlu dipahami**

Konteks adalah informasi tentang situasi yang membantu AI memahami tugas. Untuk caption ini, pilih detail yang membantu menentukan isi, memberi informasi kepada calon peserta, atau mengatur bentuk tulisannya.

### Tambahan pada langkah 4.7 — Lihat kedua kelompok

**Yang perlu dipahami**

Kegunaan detail bergantung pada tugas. Tahun berdiri mungkin penting untuk profil komunitas, sedangkan warna bisa berguna untuk desain. Cek pengelompokanmu berdasarkan kebutuhan caption pendaftaran yang sedang kita kerjakan.

<details>
<summary>Apa itu konteks?</summary>

Konteks adalah informasi tentang situasi yang membantu AI mengerjakan permintaanmu. Dalam contoh workshop, kamu bisa menjelaskan siapa pesertanya, detail acara, dan tujuan postingan.

Pilih informasi yang berpengaruh pada tugas. Kamu tidak perlu memasukkan semua hal yang kamu tahu.

</details>

<details>
<summary>Kegunaan keenam detail</summary>

| Detail | Kegunaannya untuk caption |
| --- | --- |
| Workshop gratis | Memberi tahu calon peserta bahwa mereka tidak perlu membayar. |
| Acaranya untuk pemula | Membantu pembaca menilai apakah acara ini cocok untuk mereka. |
| Ketua komunitas suka warna biru | Belum membantu menulis caption pendaftaran. Bisa berguna untuk desain jika warna itu menjadi arahan. |
| Komunitas berdiri tahun 2023 | Bisa dipakai untuk memperkenalkan komunitas, tetapi belum perlu untuk caption pendaftaran ini. |
| Pendaftaran ditutup Jumat malam | Memberi tahu batas waktu mendaftar. |
| Caption maksimal sekitar 80 kata | Mengatur panjang caption. Detail ini tidak menambah fakta tentang acara. |

</details>

<details>
<summary>Kalau tugasnya berubah</summary>

Kalau kamu membuat profil komunitas, tahun berdirinya mungkin perlu disebutkan. Kalau membuat poster, arahan warna bisa berguna. Nilai kegunaan detail berdasarkan pekerjaan yang sedang kamu lakukan.

</details>

### Tambahan pada langkah 5.1 — Lihat situasi

**Yang perlu dipahami**

Kata seperti “santai” bisa memberi gambaran yang berbeda. Kalau hasilnya belum sesuai, contoh pesan bisa menunjukkan gaya yang kamu inginkan dengan lebih jelas.

### Tambahan pada langkah 5.2 — Pilih contoh gaya

**Yang perlu dipahami**

Contoh bisa menunjukkan sapaan, panjang kalimat, tingkat formalitas, dan susunan pesan. Pilih yang cocok untuk grup peserta. Ketiga gaya di sini bisa digunakan sesuai situasinya.

### Tambahan pada langkah 5.3 — Lihat hasil pengingat

**Yang perlu dipahami**

Pisahkan gaya dari fakta. Kamu boleh mengikuti cara menulis pada contoh, tetapi waktu, nama, dan detail acara harus sesuai informasi yang diberikan untuk tugas ini.

<details>
<summary>Bagian mana dari contoh yang diikuti?</summary>

Contoh bisa menunjukkan sapaan, panjang kalimat, tingkat formalitas, dan susunan pesan. Detail seperti tanggal, nama, atau alamat belum tentu berlaku untuk pesan baru. Jelaskan gaya yang ingin diikuti dan berikan informasi acara yang benar.

</details>

<details>
<summary>One-shot dan few-shot</summary>

Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Kamu mungkin menemui istilah ini di panduan lain. Untuk memakainya sehari-hari, cukup ingat kapan contoh bisa membantu.

</details>

### Tambahan pada langkah 6.1 — Pilih informasi yang penting

**Yang perlu dipahami**

AI belum tahu semua kebutuhanmu. Minat, budget, dan lokasi menginap bisa memengaruhi pilihan kegiatan serta rutenya. Saat detail penting belum ada, kamu bisa meminta AI bertanya lebih dulu.

### Tambahan pada langkah 6.2 — Jawab pertanyaan AI

**Yang perlu dipahami**

Pertanyaan klarifikasi membantu memastikan informasi yang belum jelas. Di contoh ini, kita membatasi pertanyaan agar percakapan tetap singkat. Jumlahnya bisa berbeda untuk tugas lain. Kamu hanya menjawab minat, sehingga hasil berikutnya belum menjadi rencana lengkap.

### Tambahan pada langkah 6.3 — Lihat itinerary

**Yang perlu dipahami**

Asumsi adalah hal yang dianggap berlaku padahal belum dipastikan. Budget atau lokasi yang ditebak bisa membuat rencana kurang cocok. Lengkapi informasi itu dan periksa rute, biaya, serta kondisi tempat sebelum memakai rencananya.

<details>
<summary>Pertanyaan klarifikasi</summary>

Pertanyaan klarifikasi membantu memastikan informasi yang belum jelas sebelum pekerjaan dilanjutkan. Kamu bisa meminta AI menanyakan hal yang paling diperlukan, lalu menjawabnya satu per satu.

Di contoh ini, jumlahnya dibatasi maksimal tiga pertanyaan agar percakapannya tetap singkat. Untuk tugas lain, sesuaikan jumlahnya dengan kebutuhan.

</details>

<details>
<summary>Asumsi dalam rencana awal</summary>

Asumsi adalah hal yang dianggap berlaku padahal belum dipastikan. Kalau AI menebak budget atau lokasi keberangkatan, saran perjalanannya mungkin kurang cocok. Kamu bisa meminta AI bertanya dulu atau menjelaskan asumsi yang dipakai.

Tempatnya bisa benar-benar ada, tetapi rute, biaya, transportasi, dan waktu kunjungannya belum tentu sesuai. Tautan membantu memeriksa informasi tempat; rincian perjalanan tetap perlu kamu tinjau.

</details>

### Tambahan pada langkah 7.1 — Susun urutan

**Yang perlu dipahami**

Brief adalah ringkasan kebutuhan pekerjaan, seperti tujuan, peserta, waktu, dan anggaran. Beberapa hasil saling bergantung: rundown perlu mengikuti konsep acara. Menentukan urutan membantu kamu mengecek dasar tiap tahap sebelum lanjut.

### Tambahan pada langkah 7.2 — Lihat percakapan

**Yang perlu dipahami**

Untuk pekerjaan yang saling bergantung, mengecek hasil tiap tahap membuatmu bisa memperbaiki arah lebih awal. Banyaknya tahap mengikuti tugas. Pekerjaan sederhana tidak perlu dipecah menjadi banyak percakapan.

<details>
<summary>Kenapa dikerjakan bertahap?</summary>

Meminta beberapa hasil sekaligus bisa membantu membuat gambaran awal. Namun, kalau satu pekerjaan bergantung pada hasil sebelumnya, mengecek tiap tahap membuatmu bisa memperbaiki arah lebih awal.

Sesuaikan jumlah tahap dengan tugasnya. Untuk pekerjaan sederhana, kamu tidak perlu membuat banyak percakapan.

</details>

<details>
<summary>Arti penanda dalam jawaban</summary>

`[ringkasan tujuan dari brief]` menandai tempat untuk hasil yang diambil dari brief sebenarnya. Karena isi brief belum diberikan dalam aktivitas utama, contoh ini menunjukkan susunan jawaban, bukan analisis acara nyata.

</details>

<details>
<summary>Contoh tambahan yang bisa dibuka</summary>

Brief fiktif untuk latihan:

Komunitas ingin mengadakan sesi pengenalan AI untuk 20 pemula. Acara berlangsung Sabtu pukul 10.00–11.30, dengan anggaran Rp300.000. Tempatnya belum ditentukan. Setelah mengikuti acara, peserta diharapkan sudah mencoba menyusun satu prompt.

Contoh ringkasannya:

- Tujuan: membantu pemula mengenal penggunaan AI dan mencoba menyusun prompt.
- Batasan: 20 peserta, durasi 90 menit, dan anggaran Rp300.000.
- Masih perlu dipastikan: lokasi acara dan fasilitas untuk praktik.


</details>

### Tambahan pada langkah 8.1 — Pilih perbaikan

**Yang perlu dipahami**

Follow-up adalah permintaan lanjutan setelah jawaban sebelumnya. Sebutkan bagian yang membingungkan dan perubahan yang kamu butuhkan. Kamu bisa meminta bahasa sederhana, contoh, atau penjelasan dasar sesuai kesulitanmu.

### Tambahan pada langkah 8.2 — Lihat respons follow-up

**Yang perlu dipahami**

Periksa apakah perubahan yang diminta benar-benar membantu. Tiga poin bisa lebih ringkas tetapi tetap sulit, dan penjelasan tanpa rumus masih bisa memakai istilah teknis. Kalau belum cocok, beri arahan lanjutan yang lebih spesifik.

<details>
<summary>Apa itu follow-up?</summary>

Follow-up adalah permintaan lanjutan setelah jawaban sebelumnya. Sebutkan bagian yang membingungkan, perubahan yang kamu mau, dan bagian yang masih perlu dipertahankan.

Contoh:

> Saya masih bingung dengan supervised learning tadi. Tolong jelaskan pakai contoh spam email. Cukup tiga poin, dengan bahasa yang mudah dipahami pemula.

</details>

<details>
<summary>Fungsi tiap pilihan</summary>

| Pilihan | Yang dibantu |
| --- | --- |
| Bahasa yang lebih sederhana | Mengurangi istilah yang sulit dipahami. |
| Contoh spam email | Memberi contoh konkret untuk memahami konsep. |
| Tanpa rumus dulu | Meminta penjelasan tanpa rumus. |
| Cukup tiga poin | Mengatur jumlah dan susunan poin. |
| Penjelasan dari awal lagi | Membahas dasar yang masih belum dipahami. |

Tiga poin bisa lebih ringkas, tetapi istilahnya masih mungkin sulit. Penjelasan tanpa rumus juga bisa tetap teknis. Pilih perubahan berdasarkan hal yang membuatmu bingung.

</details>

### Tambahan pada langkah 9.1 — Pilih prompt

**Yang perlu dipahami**

Topik dan bahan rujukan berbeda. “Workshop AI” adalah topik luas, sedangkan artikel ini berisi informasi tentang acara tertentu. Kalau diminta merangkum artikel, AI perlu mengikuti isinya tanpa menambahkan detail acara dari perkiraan.

### Tambahan pada langkah 9.2 — Bandingkan jawaban

**Yang perlu dipahami**

Bandingkan isi jawaban dengan artikel, bukan hanya kerapian bahasanya. Perhatikan informasi yang diringkas dan detail baru yang tidak disebutkan dalam bahan.

### Tambahan pada langkah 9.3 — Pilih arahan sumber

**Yang perlu dipahami**

Batas sumber membantu mengarahkan jawaban, tetapi hasilnya tetap perlu diperiksa. Untuk tugas lain yang membutuhkan sumber tambahan, kamu boleh mengizinkannya sambil memastikan sumber tersebut benar dan mendukung jawabannya.

<details>
<summary>Topik dan bahan rujukan</summary>

“Workshop AI” adalah topik yang luas. Artikel yang kamu berikan berisi informasi tentang acara tertentu. Kalau tugasnya merangkum artikel, jawaban perlu mengikuti isinya tanpa menambahkan detail acara dari perkiraan.

Untuk tugas yang membutuhkan sumber lain, kamu boleh mengizinkan AI memakai bahan tambahan. Tetap periksa sumber tersebut dan sesuaikan batasnya dengan kebutuhanmu.

</details>

<details>
<summary>Memisahkan instruksi dan bahan</summary>

Tulis permintaanmu terlebih dahulu, lalu beri judul “Artikel:” sebelum bahan bacaan. Dengan begitu, instruksi dan isi artikel lebih mudah dibedakan.

Pemisah seperti ini kadang disebut delimiter. Fungsinya membuat susunan prompt lebih jelas. AI tetap bisa keliru mengikuti instruksi, jadi hasilnya perlu diperiksa.

</details>

### Tambahan pada langkah 10.1 — Periksa klaim

**Yang perlu dipahami**

AI bisa menghasilkan angka, pernyataan, atau sumber yang terdengar masuk akal tetapi salah atau dibuat-buat. Kesalahan seperti ini sering disebut halusinasi. Jawaban yang terdengar yakin tetap perlu diperiksa melalui sumbernya.

<details>
<summary>Halusinasi AI</summary>

AI bisa menghasilkan angka, pernyataan, atau sumber yang terdengar masuk akal tetapi salah atau dibuat-buat. Kesalahan seperti ini sering disebut halusinasi. Jawaban yang terdengar yakin tetap perlu diperiksa.

Kalau sumbernya tidak ditemukan atau tidak mendukung klaim, kamu bisa menunda pemakaiannya, menghapus klaim itu, atau mencari data lain yang dapat diperiksa.

</details>

<details>
<summary>Apa yang perlu dicek pada survei?</summary>

- Apakah sumber aslinya bisa ditemukan dan dibuka?
- Apakah angkanya sama dengan yang tertulis di sumber?
- Siapa respondennya? Apakah sesuai dengan kelompok yang disebut dalam klaim?
- Kapan datanya dikumpulkan?
- Apa pertanyaannya, dan istilah apa yang dipakai dalam survei?
- Apakah kesimpulan yang ingin disampaikan sesuai dengan datanya?

Misalnya, survei peserta satu acara belum tentu menggambarkan kebiasaan seluruh anak muda Indonesia. “Pernah memakai AI” juga berbeda dari “memakai AI setiap hari”.

</details>

### Tambahan pada langkah 11.1 — Pilih kebutuhan

**Yang perlu dipahami**

Kolom berikut membantu kamu memikirkan kebutuhan. Hanya permintaan utama yang wajib diisi. Tambahkan konteks, batasan, format, atau contoh jika memang membantu tugasmu.

### Tambahan pada langkah 11.2 — Tulis permintaan utama

**Yang perlu dipahami**

Sebutkan tugas yang ingin dikerjakan dan, kalau membantu, tujuan pemakaian hasilnya. “Bantu saya belajar” masih luas. “Tolong jelaskan perbedaan tabungan dan reksa dana untuk pemula” memberi tugas yang lebih jelas.

### Tambahan pada langkah 11.3 — Tambahkan konteks

**Yang perlu dipahami**

Pilih konteks yang berpengaruh pada tugas, seperti kemampuanmu sekarang, siapa pembacanya, atau bahan yang tersedia. Informasi pribadi yang tidak berkaitan tidak perlu ditambahkan.

### Tambahan pada langkah 11.4 — Tambahkan batasan

**Yang perlu dipahami**

Pastikan batasan bisa diikuti bersama. Penjelasan mendalam mungkin tidak muat dalam satu kalimat. Kamu bisa meminta gambaran singkat dulu, lalu membahas bagian tertentu lebih jauh.

### Tambahan pada langkah 11.5 — Pilih format

**Yang perlu dipahami**

Pilih bentuk jawaban sesuai cara pemakaiannya. Tabel membantu membandingkan pilihan, langkah bernomor membantu mengikuti urutan, dan paragraf bisa menjelaskan hubungan antargagasan.

### Tambahan pada langkah 11.6 — Tambahkan contoh

**Yang perlu dipahami**

Contoh membantu menunjukkan gaya atau pola. Sebutkan bagian yang ingin diikuti dan pastikan detail contoh yang tidak sesuai tidak terbawa ke tugasmu.

### Tambahan pada langkah 11.7 — Lihat prompt dan saran

**Yang perlu dipahami**

Baca hasil gabungannya sebagai satu permintaan. Apakah tugasnya jelas, konteksnya berguna, dan batasannya sesuai? Saran aplikasi mengikuti kolom yang terisi; aplikasi tidak memeriksa makna tulisan atau menguji jawabannya.

### Tambahan pada langkah 11.8 — Refleksi

**Yang perlu dipahami**

Saat jawaban belum sesuai, kenali dulu masalahnya. Kamu bisa meminta perbaikan dalam percakapan yang sama atau menulis permintaan baru kalau kebutuhanmu sudah berubah.

### Tambahan pada langkah 12.1 — Ringkasan dan selesai

**Yang perlu dipahami**

Semua cara tadi membantu percakapan yang sama: sampaikan kebutuhan, lihat hasilnya, lalu lengkapi atau perbaiki bagian yang belum sesuai. Pilih cara yang membantu tugasmu; kamu tidak harus memakai semuanya setiap kali.

<details>
<summary>Kaitannya dengan latihan tadi</summary>

| Yang kamu coba | Yang bisa dipakai nanti |
| --- | --- |
| Memeriksa caption | Menilai apakah jawaban cukup untuk tujuanmu. |
| Menambah dan memilah detail | Memberi informasi yang berkaitan dengan tugas. |
| Memilih contoh pengingat | Menunjukkan gaya atau susunan yang kamu mau. |
| Menjawab pertanyaan perjalanan | Melengkapi informasi sebelum meminta rencana lengkap. |
| Menyusun tahapan acara | Mengecek hasil sebelum mengerjakan bagian berikutnya. |
| Memperbaiki penjelasan | Meminta perubahan pada bagian yang belum cocok. |
| Membandingkan ringkasan artikel | Menentukan bahan yang harus diikuti. |
| Memeriksa angka survei | Mencocokkan klaim dengan bukti. |
| Menulis prompt sendiri | Memilih cara yang sesuai dengan kebutuhanmu. |

</details>

### Pemeriksaan mandiri latihan opsional

Baca permintaanmu dan cocokkan dengan situasi. Kamu boleh memakai kalimatmu sendiri. Checklist berikut membantu pemeriksaan mandiri; tanda centang tidak berarti aplikasi telah memastikan kebutuhan itu tertulis atau dapat dipenuhi.

### Glosarium opsional


Buka penjelasan istilah saat dibutuhkan. Peserta tidak harus membaca seluruh daftar sebelum mulai.

| Istilah | Artinya |
| --- | --- |
| Prompt | Permintaan atau instruksi yang kamu berikan kepada AI. |
| Prompt engineering | Cara menyusun dan memperbaiki permintaan agar hasil AI lebih sesuai kebutuhan. |
| Konteks | Informasi tentang situasi yang membantu AI memahami tugas. |
| Audiens | Orang yang akan membaca, mendengar, atau memakai hasilnya. |
| Batasan | Ketentuan yang perlu diikuti, misalnya waktu, budget, panjang tulisan, atau sumber. |
| Format output | Bentuk jawaban, seperti paragraf, tabel, checklist, atau langkah bernomor. |
| Draf | Tulisan atau hasil awal yang masih perlu diperiksa dan bisa diperbaiki. |
| Contoh | Bahan untuk menunjukkan gaya, pola, atau susunan yang kamu mau. |
| Klarifikasi | Memastikan informasi yang belum jelas sebelum melanjutkan. |
| Asumsi | Hal yang dianggap berlaku padahal belum dipastikan. |
| Brief | Ringkasan kebutuhan pekerjaan atau acara. |
| Rundown | Urutan kegiatan beserta waktunya. |
| Follow-up | Permintaan lanjutan berdasarkan jawaban sebelumnya. |
| One-shot / few-shot | Memberi satu contoh / beberapa contoh dalam prompt. |
| Delimiter | Penanda untuk memisahkan instruksi, contoh, atau bahan dalam prompt. |
| Halusinasi AI | Jawaban yang terdengar masuk akal, tetapi memuat informasi salah atau dibuat-buat. |
| Verifikasi | Memeriksa klaim dengan bukti atau sumber yang sesuai. |
| Simulasi | Contoh yang sudah disiapkan untuk latihan; jawabannya tidak dibuat langsung dari tulisanmu. |

