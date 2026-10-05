# AI Fundamentals — seluruh teks dan konten pilot

Transkripsi dari implementasi pada branch `feature/microlearning-yesman-pilot`. Dokumen ini menggabungkan isi materi, seluruh pertanyaan, pilihan, pembahasan, contoh, panel tambahan, sumber, glosarium, halaman selesai, serta pesan antarmuka. Ini mengikuti **kode pilot saat ini**, termasuk perubahan penerapannya, bukan hanya dokumen rancangan. Tidak ada teks aplikasi yang diubah untuk membuat dokumen ini.

URL daftar course: `/dev/yes-man-pilot`. URL materi: `/dev/yes-man-pilot/ai-fundamentals`. Ada **3 pelajaran, 29 bagian, dan 3 cek pemahaman**, sehingga total 32 layar pembelajaran. Aktivitas yang memiliki beberapa contoh disajikan bertahap pada bagian yang sama.

Teks dalam tanda `{...}` di dokumentasi mewakili nilai yang berubah sesuai posisi atau pilihan peserta. `[Tulisan peserta]` mewakili tulisan bebas asli peserta, bukan kalimat bawaan aplikasi. Jawaban acuan di sini dicatat untuk penyunting materi; dalam aplikasi pembahasannya baru muncul setelah peserta mencoba.

## 1. Pengantar

**Label:** KURSUS 01 · DASAR AI

**Judul:** Kenalan dengan AI dari hal-hal yang sudah dekat dengan kita

Tanpa sadar, kamu mungkin sudah memakai AI saat membuka email, memilih lagu, mencari ide, atau meminta bantuan menulis. Kita sering melihat hasilnya, tetapi belum tentu tahu apa yang sebenarnya terjadi di balik fitur-fitur itu.

Materi ini dimulai dari contoh yang dekat dengan keseharian, lalu perlahan masuk ke cara kerja AI dan cara menilai hasilnya. Kamu tidak perlu bisa coding. Ikuti saja alurnya, coba aktivitas yang ada, dan lihat pembahasannya setelah menjawab. Kalau ingin menggali lebih jauh, ada bagian “Kalau penasaran” yang bisa dibuka kapan saja.

**Panel:** Lihat isi pelajaran

1. AI Hari Ini: apa yang sudah bisa dilakukan AI, dan bagaimana memeriksa hasilnya? **14–20 menit.**
2. Sebenarnya, Apa Itu AI?: bagaimana aturan, data, dan model bekerja? **11–16 menit.**
3. Berpikir di Era AI: bagaimana memakai bantuan AI dalam tugasmu sendiri? **13–18 menit.**

Sekitar 39–56 menit untuk seluruh jalur utama. Ini masih perkiraan; kamu boleh menyelesaikan satu pelajaran dulu lalu melanjutkan nanti. Semua contoh latihan sudah disiapkan sebagai simulasi.

**Tombol:** Mulai belajar

**Panel:** Glosarium · buka saat diperlukan

## 2. Teks umum aktivitas dan navigasi

- `← Kembali ke daftar materi`
- `Jeda dan lanjutkan nanti`
- `← Kembali`
- `Langkah berikutnya →`
- `Aktivitas {nomor} dari {jumlah aktivitas bagian}`
- `Buka kembali penjelasan bagian ini`
- `Kalau penasaran`
- `Glosarium · buka saat diperlukan`
- `Pembahasan`
- `Coba lagi` (cek pemahaman)

Pada aktivitas pertama, penjelasan bagian tampil langsung. Pada aktivitas selanjutnya dalam bagian yang sama, penjelasan itu tersedia dalam panel “Buka kembali penjelasan bagian ini”. Kembali mempertahankan pilihan dan tulisan.

### Pilihan tunggal

**Petunjuk:** Pilih satu jawaban

Pilihan berbentuk radio. Memilih satu jawaban membuka pembahasan untuk pilihan itu. Jika pilihan berada di luar acuan yang dibahas, tambahan teksnya:

> Di contoh ini, pilihan yang dibahas: {pilihan acuan dipisahkan dengan “ / ”}. {penjelasan umum jika ada pembahasan per pilihan, atau “Kalau ingin membandingkan, kamu bisa mencoba pilihan lain.”}

### Pilihan jamak

**Petunjuk:** Boleh pilih lebih dari satu

Jika jumlahnya pasti, petunjuk menjadi **Pilih {jumlah} bagian**. Pilihan baru dinonaktifkan ketika batas maksimum tercapai; pilihan aktif masih boleh dilepas. Tombol pemeriksaan aktif setelah jumlah pilihan memenuhi petunjuk.

Sesudah diperiksa, alasan setiap opsi ditampilkan dengan label **{teks pilihan} · kamu pilih** atau **{teks pilihan} · tidak kamu pilih**. Tidak ada skor.

### Membuka kartu atau diagram

**Petunjuk:** Buka sedikitnya {jumlah minimum} bagian. Terbuka: {jumlah bagian yang pernah dibuka}.

Setiap tombol membuka penjelasannya. Bagian yang pernah dibuka diberi tanda ✓; yang belum dibuka bertanda +.

### Menyusun urutan

**Tombol:** ↑ Naik / ↓ Turun

**Pembahasan:** Urutan contoh: {kartu dalam urutan acuan, dipisahkan dengan →}

Urutan awal diacak sekali saat mulai, lalu disimpan. Pembahasan terbuka lewat tombol pemeriksaan; peserta tidak harus mengubah urutan awal.

### Refleksi dan catatan

**Label:** Catatan pribadi · opsional

Tulisanmu tidak diberi skor atau dinilai otomatis. Kalau tidak ingin menulis, kamu tetap bisa lanjut.

**Panel:** Contoh yang bisa dibuka

**Panel:** Lihat catatanmu

**Isi panel:** [Tulisan peserta]

Kategori menggunakan label **Pilih satu kategori** jika wajib, atau **Kategori · boleh dipilih atau dilewati** jika opsional. Checklist latihan akhir memakai **Pemeriksaan mandiri · boleh dicentang atau dilewati**.

## 3. Seluruh pelajaran dan aktivitas

### Pelajaran 1 — AI Hari Ini

**Perkiraan pelajaran ini:** 14–20 menit. Kamu bisa berhenti sebentar dan lanjut lagi kapan saja.

Kita mulai dari hal yang paling dekat: email, lagu, dan chatbot. Dari sana, kita akan melihat kemampuan AI yang lebih luas sekaligus belajar kapan hasilnya cukup dipercaya dan kapan perlu diperiksa lagi.

### 1.1 — AI di kegiatan sehari-hari

**Header:** AI Hari Ini · 1/12

**Label:** PELAJARAN 1 · 1.1

**Materi yang tampil:**

Email mencurigakan masuk ke folder spam. Aplikasi musik menyarankan lagu yang mungkin kamu suka. Chatbot membantu menulis caption. Ketiganya memakai AI, tetapi tugasnya berbeda: mengelompokkan pesan, memberi rekomendasi, dan membuat teks.

AI adalah bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten. Jadi, AI yang kamu temui sehari-hari bisa punya bentuk selain chatbot.

#### Aktivitas 1 — Email dipisahkan menjadi spam dan bukan spam. Apa yang dikerjakan sistem?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Mengelompokkan
2. Merekomendasikan
3. Menghasilkan konten

**Pilihan/urutan acuan:** Mengelompokkan

**Pembahasan umum:**

Pesan diberi kategori agar email yang mencurigakan bisa dipisahkan.

#### Aktivitas 2 — Aplikasi memilih lagu yang mungkin kamu suka. Apa yang dikerjakan sistem?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Mengelompokkan
2. Merekomendasikan
3. Menghasilkan konten

**Pilihan/urutan acuan:** Merekomendasikan

**Pembahasan umum:**

Aplikasi memilih lagu dari koleksi yang tersedia berdasarkan perkiraan seleramu.

#### Aktivitas 3 — Chatbot menulis caption baru. Apa yang dikerjakan sistem?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Mengelompokkan
2. Merekomendasikan
3. Menghasilkan konten

**Pilihan/urutan acuan:** Menghasilkan konten

**Pembahasan umum:**

Chatbot menyusun teks dari permintaan yang kamu berikan.

#### Panel — Kalau penasaran

satu aplikasi bisa mengerjakan beberapa tugas sekaligus. Aplikasi musik, misalnya, bisa merekomendasikan lagu dan membuat teks penjelasan tentang playlist. Untuk mengenalinya, lihat fitur yang sedang dipakai.

**Transisi sebelum melanjutkan:**

Tiga contoh tadi menunjukkan bahwa AI tidak hanya berarti chatbot. Sekarang kita pindah ke contoh yang lebih khusus untuk melihat seberapa jauh kemampuan AI bisa berkembang.

**Tombol menuju bagian berikutnya:** Lihat contoh dari sains →

### 1.2 — Capaian AI: apa yang bisa kita simpulkan?

**Header:** AI Hari Ini · 2/12

**Label:** PELAJARAN 1 · 1.2

**Materi yang tampil:**

Pada IMO 2025, versi khusus Gemini Deep Think dilaporkan berhasil menyelesaikan lima dari enam soal. Skornya 35 dari 42 poin, setara standar medali emas. Itu capaian besar pada soal dan kondisi pengujian tersebut.

Di biologi, AlphaFold2 membantu memprediksi bentuk tiga dimensi protein dari urutan asam amino. Pengembangannya membawa Demis Hassabis dan John Jumper menerima separuh Nobel Kimia 2024. Prediksi ini membantu penelitian, sementara pengembangan dan pengujian obat masih membutuhkan proses lanjutan.

**Sumber pada bagian ini:**

- [DeepMind — capaian IMO 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)
- [Nobel Prize — John Jumper dan AlphaFold2](https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/)

**Pengingat pada aktivitas 2:** Capaian yang diuji: Gemini Deep Think menyelesaikan lima dari enam soal IMO 2025, dengan skor 35/42.

**Pengingat pada aktivitas 3 dan 4:** Capaian yang dibahas: AlphaFold2 membantu memprediksi struktur tiga dimensi protein dari urutan asam amino.

**Panel:** Ilustrasi struktur protein

**Keterangan gambar:** Ilustrasi struktur AlphaFold · CC0 menurut sumber materi.

**Teks alternatif:** Ilustrasi bentuk tiga dimensi protein, bukan hasil pengembangan obat

#### Aktivitas 1 — Model tersebut berhasil pada sebagian besar soal IMO yang diuji.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Sudah didukung
2. Perlu bukti lain

**Pilihan/urutan acuan:** Sudah didukung

**Pembahasan umum:**

Lima dari enam soal berhasil diselesaikan dalam pengujian itu.

#### Aktivitas 2 — Model tersebut selalu benar untuk semua soal matematika.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Sudah didukung
2. Perlu bukti lain

**Pilihan/urutan acuan:** Perlu bukti lain

**Pembahasan umum:**

Hasil pada enam soal belum memberi jawaban untuk semua soal matematika.

#### Aktivitas 3 — AlphaFold2 membantu mempelajari struktur protein.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Sudah didukung
2. Perlu bukti lain

**Pilihan/urutan acuan:** Sudah didukung

**Pembahasan umum:**

Prediksi struktur protein memang menjadi kemampuan yang ditunjukkan pada contoh ini.

#### Aktivitas 4 — AlphaFold2 langsung menyembuhkan penyakit.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Sudah didukung
2. Perlu bukti lain

**Pilihan/urutan acuan:** Perlu bukti lain

**Pembahasan umum:**

Mengetahui bentuk protein dapat membantu riset, tetapi pengobatan masih perlu dikembangkan dan diuji.

#### Panel — Kalau penasaran

benchmark adalah tugas atau kumpulan soal untuk mengukur kemampuan tertentu. Hasilnya perlu dibaca bersama model, alat, kondisi, dan cara penilaiannya. Protein sendiri adalah molekul yang menjalankan berbagai fungsi dalam sel; bentuknya membantu peneliti memahami cara kerjanya.

**Transisi sebelum melanjutkan:**

Dari sini ada satu kebiasaan penting: jangan menarik kesimpulan lebih jauh daripada bukti yang tersedia. Prinsip yang sama akan kita pakai saat membaca contoh AI di bidang kesehatan.

**Tombol menuju bagian berikutnya:** Coba membaca hasil penelitian →

### 1.3 — Membaca manfaat AI dalam pemeriksaan medis

**Header:** AI Hari Ini · 3/12

**Label:** PELAJARAN 1 · 1.3

**Materi yang tampil:**

Mammogram adalah gambar dari pemeriksaan payudara. Radiolog, yaitu dokter yang membaca gambar medis, dapat memakai AI untuk membantu pemeriksaan.

Dalam studi yang melibatkan 31.301 perempuan, strategi AI yang diuji mengurangi beban pembacaan radiolog sebesar 63,6%. Tingkat deteksi kanker meningkat 15,2% dibanding strategi standar. Namun, lebih banyak orang juga dipanggil untuk pemeriksaan lanjutan. Ketiga hasil ini perlu dibaca bersama.

**Sumber pada bagian ini:**

- [Nature Medicine — AI-based triage and decision support, 2026](https://www.nature.com/articles/s41591-026-04277-x)
- [PubMed — ringkasan studi mammografi yang sama](https://pubmed.ncbi.nlm.nih.gov/41857202/)

#### Aktivitas 1 — Kira-kira, berapa kenaikan tingkat panggilan untuk pemeriksaan lanjutan?

**Bentuk interaksi:** perkiraan angka.

**Pembahasan umum:**

Tingkat panggilan untuk pemeriksaan lanjutan naik 14,8% secara relatif. Orang yang dipanggil kembali belum tentu didiagnosis kanker; mereka perlu diperiksa lebih lanjut. Jadi, strategi ini membantu deteksi dan mengurangi beban pembacaan, tetapi juga menambah pemeriksaan lanjutan. Kalau hanya melihat satu angka, ada bagian hasil yang terlewat.

**Tombol pemeriksaan/pembuka:** Lihat hasil studi

**Kartu hasil sebelum dibuka:** Beban pembacaan −63,6%; Deteksi +15,2%; Pemeriksaan lanjutan ?.

**Label isian:** Perkiraan kenaikan relatif (0–40%)

**Kontrol:** − / isian angka / % / +

**Tombol:** Lihat hasil studi / Lihat tanpa menebak

Isian awal kosong. Hasil pemeriksaan lanjutan setelah dibuka: **+14,8%**.

**Tanggapan yang mungkin muncul:**

- Kamu membuka hasil tanpa menebak.
- Perkiraanmu berada dalam rentang ±4 poin persentase dari hasil studi.
- Perkiraanmu berbeda lebih dari 4 poin persentase dari hasil studi.

**Kalimat sesudah tanggapan:** Perkiraan ini bukan skor pemahaman.

#### Aktivitas 2 — Dari tiga hasil tadi, pilih dua yang ingin kamu lihat lebih dekat.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Beban pembacaan −63,6%
2. Deteksi +15,2%
3. Pemeriksaan lanjutan +14,8%

**Pembahasan setiap pilihan/kartu:**

**Beban pembacaan −63,6%**

Beban pembacaan mengukur jumlah pemeriksaan yang perlu dibaca radiolog. Dalam strategi yang diuji, lebih sedikit pemeriksaan perlu dibaca manusia.

**Deteksi +15,2%**

Tingkat deteksi mengukur kanker yang ditemukan dalam pemeriksaan. Hasilnya perlu dilihat bersama jumlah pemeriksaan lanjutan.

**Pemeriksaan lanjutan +14,8%**

Tingkat panggilan mengukur peserta yang diminta kembali untuk pemeriksaan lanjutan, bukan jumlah diagnosis kanker.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 2, maksimal 2.

#### Panel — Kalau penasaran

kenaikan relatif 14,8% berbeda dari kenaikan 14,8 poin persentase. Studi melaporkan perbedaan absolut tingkat panggilan sekitar 0,7 poin persentase. Hasil ini berlaku pada populasi, sistem, dan alur yang diteliti. Rumah sakit dengan kondisi berbeda bisa memperoleh hasil berbeda pula.

**Transisi sebelum melanjutkan:**

Contoh mammogram tadi memakai gambar sebagai bahan utama. AI juga bisa menerima bentuk informasi lain, seperti teks, suara, atau gabungan beberapa jenis input. Berikutnya kita lihat mengapa memilih input yang tepat ikut menentukan hasil.

**Tombol menuju bagian berikutnya:** Kenali jenis input AI →

### 1.4 — AI bisa menerima lebih dari teks

**Header:** AI Hari Ini · 4/12

**Label:** PELAJARAN 1 · 1.4

**Materi yang tampil:**

Informasi yang masuk ke sistem disebut input. Hasil yang diberikan disebut output. Sistem multimodal bisa memproses beberapa jenis input, misalnya teks dan gambar.

Kalau ingin membahas pesan error, kamu bisa mengirim teksnya atau tangkapan layar. Untuk menuliskan isi rapat, rekaman suara lebih membantu. Jenis input yang tepat memudahkan tugas, meskipun sistem masih bisa melewatkan detail atau salah membaca.

#### Aktivitas 1 — Kamu ingin memahami pesan error di laptop. Pilih bahan yang membantu; boleh lebih dari satu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Teks error
2. Tangkapan layar
3. Foto bagian belakang laptop

**Pilihan/urutan acuan:** Teks error; Tangkapan layar

**Pembahasan setiap pilihan/kartu:**

**Teks error**

Teks memperlihatkan pesan errornya.

**Tangkapan layar**

Tangkapan layar memperlihatkan pesan error beserta bagian layar di sekitarnya.

**Foto bagian belakang laptop**

Foto bagian belakang laptop mungkin membantu untuk masalah perangkat tertentu, tetapi belum menjelaskan pesan yang sedang dibahas.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Aktivitas 2 — Kamu ingin menuliskan ucapan dalam rapat. Pilih bahan yang membantu; boleh lebih dari satu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Rekaman suara
2. Foto ruang rapat
3. Agenda tertulis

**Pilihan/urutan acuan:** Rekaman suara; Agenda tertulis

**Pembahasan setiap pilihan/kartu:**

**Rekaman suara**

Rekaman memuat percakapannya dan menjadi bahan utama untuk menuliskan ucapan.

**Foto ruang rapat**

Foto ruangan tidak memberi isi percakapan.

**Agenda tertulis**

Agenda memberi gambaran topik, tetapi tidak memuat semua yang diucapkan.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Panel — Kalau penasaran

modalitas berarti jenis informasi. Gambar buram, suara yang tidak jelas, tulisan kecil, atau halaman yang hilang bisa membuat hasil kurang tepat. Sebelum mengirim bahan, pastikan juga isinya boleh dibagikan. Kita akan membahas hal itu setelah beberapa contoh berikut.

**Transisi sebelum melanjutkan:**

Sejauh ini, hasil AI masih berupa informasi di layar. Ketika AI dipakai pada robot, hasil pemrosesan itu bisa berubah menjadi gerakan di dunia nyata, sehingga risikonya juga berbeda.

**Tombol menuju bagian berikutnya:** Lihat AI pada robot →

### 1.5 — Saat AI membantu menentukan gerakan

**Header:** AI Hari Ini · 5/12

**Label:** PELAJARAN 1 · 1.5

**Materi yang tampil:**

Robot memakai sensor untuk membaca keadaan di sekitarnya, lalu menentukan gerakan. Karena bergerak di dunia nyata, kesalahan bisa berdampak pada orang atau benda di dekatnya.

Dalam proyek robot Olaf dari Disney Research, gerakan dicoba berulang kali lewat simulasi sebelum diterapkan pada robot sungguhan. Gerakannya perlu terlihat sesuai karakter sekaligus memperhitungkan keseimbangan, bunyi langkah, dan panas motor.

**Sumber pada bagian ini:**

- [Tesla — FSD Supervised](https://www.tesla.com/support/fsd)
- [Disney Research — robot Olaf](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/)

#### Aktivitas 1 — Susun empat langkah berikut menjadi gambaran alur pengujian.

**Bentuk interaksi:** susun urutan.

**Kartu yang tersedia:**

1. Amati kondisi dengan sensor
2. Perkirakan akibat tindakan
3. Uji gerakan di simulasi
4. Awasi keamanan di dunia nyata

**Urutan acuan:** Amati kondisi dengan sensor → Perkirakan akibat tindakan → Uji gerakan di simulasi → Awasi keamanan di dunia nyata

**Pembahasan umum:**

Sensor membantu robot membaca kondisi. Perkiraan akibat tindakan memberi gambaran tentang apa yang mungkin terjadi, lalu simulasi menyediakan tempat untuk mencoba. Saat beralih ke pengujian nyata, manusia tetap memeriksa gerakan dan keamanannya. Alur ini adalah gambaran sederhana; setiap proyek robot bisa punya urutan pengujian yang berbeda.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

#### Panel — Kalau penasaran

world model memperkirakan bagaimana lingkungan berubah, termasuk setelah suatu tindakan. Simulasi menyediakan lingkungan buatan untuk percobaan. Pada contoh kendaraan, Tesla menyebut Full Self-Driving sebagai sistem yang memerlukan pengawasan pengemudi. Untuk memahami sebuah fitur, baca penjelasan kemampuan dan syarat penggunaannya.

**Transisi sebelum melanjutkan:**

Robot bukan satu-satunya contoh ketika AI bisa bertindak. Di komputer, sistem tertentu juga dapat membuka file, menjalankan tes, atau memakai alat lain. Karena itu, penting membedakan antara AI yang hanya memberi saran dan AI yang benar-benar melakukan tindakan.

**Tombol menuju bagian berikutnya:** Dari memberi saran ke mengerjakan →

### 1.6 — Chatbot, agent, dan tindakan yang bisa diperiksa

**Header:** AI Hari Ini · 6/12

**Label:** PELAJARAN 1 · 1.6

**Materi yang tampil:**

Chatbot bisa kamu ajak bertanya dan berdiskusi. Agent dapat memakai alat untuk mengerjakan langkah menuju tujuan, membaca hasilnya, lalu menentukan langkah berikutnya.

Dalam proyek coding, misalnya, sistem yang punya akses bisa membuka file, mencari penyebab tes gagal, mengubah kode sesuai izin, dan menjalankan tes. Apa yang bisa dikerjakannya bergantung pada alat dan akses yang tersedia saat itu.

#### Aktivitas 1 — Bandingkan dua riwayat ini.

**Bentuk interaksi:** buka kartu/diagram.

**Pilihan/tombol yang tersedia:**

1. Riwayat A · saran
2. Riwayat B · tindakan

**Pembahasan setiap pilihan/kartu:**

**Riwayat A · saran**

Coba buka file konfigurasi, perbaiki bagian itu, lalu jalankan tes.

**Riwayat B · tindakan**

File konfigurasi dibuka → perubahan ditampilkan → tes dijalankan → hasil tes tercatat.

**Jumlah bagian yang perlu dibuka:** minimal 2.

#### Aktivitas 2 — Mana yang menunjukkan bahwa pekerjaan sudah dilakukan?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. A saja
2. B saja
3. Keduanya

**Pilihan/urutan acuan:** B saja

**Pembahasan setiap pilihan/kartu:**

**A saja**

Riwayat A berisi saran. Kita belum melihat apakah langkahnya benar-benar dikerjakan.

**B saja**

Riwayat B memuat tindakan dan hasil yang bisa kamu periksa, seperti perubahan file dan keluaran tes.

**Keduanya**

Keduanya bisa membantu, tetapi A baru memberi saran. Pada contoh ini, catatan pekerjaan ada di B.

**Pembahasan umum:**

Riwayat B memuat tindakan dan hasil yang bisa kamu periksa, seperti perubahan file dan keluaran tes.

#### Aktivitas 3 — Apa yang perlu dicek?

**Bentuk interaksi:** buka penjelasan.

**Penjelasan yang dibuka:**

Perubahan file: apakah yang diubah sesuai tugas?

Hasil tes: tes apa yang dijalankan, dan bagaimana hasilnya?

Izin: apakah tindakannya sesuai akses dan izin yang diberikan?

**Tombol pemeriksaan/pembuka:** Apa yang perlu dicek?

#### Panel — Kalau penasaran

chatbot modern juga bisa memakai tool. Contoh ini membandingkan cara penggunaan, bukan membagi produk ke dua kelompok yang selalu terpisah. Agent dapat mengulang langkah merencanakan, bertindak, dan memeriksa. Akses untuk mengubah data atau mengirim pesan tetap perlu disesuaikan dengan tugasnya.

**Transisi sebelum melanjutkan:**

Tadi kita belajar bahwa klaim tindakan perlu dibuktikan lewat jejak yang bisa diperiksa. Prinsip yang sama berguna di situasi sehari-hari, misalnya saat seseorang mengirim bukti pembayaran.

**Tombol menuju bagian berikutnya:** Coba periksa pembayaran →

### 1.7 — Bukti transfer yang terlihat meyakinkan

**Header:** AI Hari Ini · 7/12

**Label:** PELAJARAN 1 · 1.7

**Materi yang tampil:**

Kamu menjual tiket konser. Pembeli mengirim gambar bertuliskan “transfer berhasil”. Nama, nominal, dan waktunya terlihat cocok. Apakah tiketnya sudah bisa diserahkan?

Gambar seperti ini bisa diedit atau dibuat ulang. Untuk memastikan pembayaran diterima, lihat transaksi pada rekeningmu sendiri atau status pembayaran di layanan merchant yang kamu pakai.

**Sumber pada bagian ini:**

- [OJK — bukti transfer palsu](https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx)

**Panel pada aktivitas 2:** Buka kembali bukti yang kamu periksa

Jika riwayat penerima belum dibuka, bukti uang masuk belum kamu periksa. Kamu bisa kembali untuk membukanya.

#### Aktivitas 1 — Buka bukti yang ingin kamu periksa, lalu tentukan apakah pembayaran sudah bisa dipastikan.

**Bentuk interaksi:** buka kartu/diagram.

**Teks visual, dokumen, atau diagram:**

TRANSAKSI FIKTIF · SIMULASI

Tagihan tiket: Rp150.000 · Pembeli Contoh · 3 Oktober, 10.15

Gambar dari pembeli: “Transfer berhasil”

Pembeli Contoh → Penjual Contoh · Rp150.000 · 3 Oktober, 10.15

Referensi dari pembeli: CONTOH-001. Nomor ini belum dicocokkan dengan transaksi penerima.

Riwayat rekening penerima

Pengirim: Pembeli Contoh
Nominal: Rp150.000
Waktu: 3 Oktober, 10.15
Status: Masuk / berhasil
Referensi: CONTOH-001

**Pilihan/tombol yang tersedia:**

1. Tangkapan layar
2. Nomor referensi dari pembeli
3. Riwayat rekening penerima

**Pembahasan setiap pilihan/kartu:**

**Tangkapan layar**

Gambar ini menunjukkan klaim pembeli, tetapi belum memastikan uang masuk ke rekeningmu.

**Nomor referensi dari pembeli**

Nomor ini bisa membantu penelusuran. Namun, informasinya masih berasal dari pembeli dan perlu dicocokkan.

**Riwayat rekening penerima**

Catatan di pihak penerima membantu memastikan uang masuk. Cocokkan detailnya dengan pembayaran yang sedang kamu tunggu.

**Jumlah bagian yang perlu dibuka:** minimal 1.

#### Aktivitas 2 — Sekarang, apakah kamu sudah bisa menyerahkan tiket?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Bisa setelah transaksi masuk dan detailnya cocok
2. Bisa dari gambar saja
3. Tunda jika transaksi belum terlihat

**Pilihan/urutan acuan:** Bisa setelah transaksi masuk dan detailnya cocok; Tunda jika transaksi belum terlihat

**Pembahasan setiap pilihan/kartu:**

**Bisa setelah transaksi masuk dan detailnya cocok**

Pastikan kamu sudah membuka riwayat penerima dan mencocokkan pengirim, nominal, waktu, serta statusnya.

**Bisa dari gambar saja**

Gambar saja belum memastikan pembayaran diterima. Periksa transaksi di pihak penerima.

**Tunda jika transaksi belum terlihat**

Jika transaksi belum terlihat, menunda penyerahan dan memeriksa lewat layanan terkait adalah langkah yang sesuai.

**Pembahasan umum:**

Bisa setelah transaksi masuk dan detailnya cocok. Jika belum terlihat, tunda penyerahan dan periksa lewat layanan terkait.

#### Panel — Kalau penasaran

jika seseorang meminta uang lewat suara yang terdengar seperti temanmu, konfirmasi melalui jalur lain yang sudah kamu percaya. Tampilan rapi atau suara yang mirip saja belum memastikan siapa pengirimnya.

**Transisi sebelum melanjutkan:**

Masalahnya tidak berhenti pada transaksi. Konten buatan juga bisa memakai wajah, suara, atau identitas seseorang dan membuat orang lain percaya pada sesuatu yang tidak pernah terjadi.

**Tombol menuju bagian berikutnya:** Lihat siapa yang terdampak →

### 1.8 — Konten buatan dan orang di dalamnya

**Header:** AI Hari Ini · 8/12

**Label:** PELAJARAN 1 · 1.8

**Materi yang tampil:**

Konten sintetis adalah konten yang dibuat atau dimanipulasi secara buatan, termasuk dengan AI. Deepfake bisa meniru wajah atau suara seseorang. Teknologi ini bisa dipakai untuk karya kreatif, tetapi juga bisa membuat orang percaya pada kejadian yang tidak pernah terjadi.

Bayangkan fotomu dipakai dalam poster pengumuman yang tidak pernah kamu buat. Orang lain mungkin mengira kamu terlibat. Itu bisa memengaruhi reputasi, privasi, dan rasa amanmu.

**Sumber pada bagian ini:**

- [OJK — penipuan suara dan wajah](https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx)

#### Aktivitas 1 — Buka sudut pandang berikut. Apa yang perlu dipikirkan sebelum poster ini dibagikan?

**Bentuk interaksi:** buka kartu/diagram.

**Teks visual, dokumen, atau diagram:**

POSTER FIKTIF · SIMULASI

Pengumuman Komunitas

Figur ini ditampilkan sebagai pihak yang mendukung pengumuman. Sumber dan izin penggunaan identitas belum diketahui.

Teks alternatif: Figur rekaan, bukan foto orang nyata.

**Pilihan/tombol yang tersedia:**

1. Orang dalam foto
2. Penerima poster
3. Pembuat poster

**Pembahasan setiap pilihan/kartu:**

**Orang dalam foto**

Apakah fotonya dipakai dengan izin?

**Penerima poster**

Apakah jelas siapa yang membuat pengumuman ini?

**Pembuat poster**

Apakah orang lain bisa mengira poster ini resmi?

**Jumlah bagian yang perlu dibuka:** minimal 3.

#### Aktivitas 2 — Pilih tindakanmu. Boleh menambahkan tindakan kedua.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Bagikan
2. Periksa pengumuman asli dulu
3. Tanya izin dan tujuan pemakaian foto

**Pilihan/urutan acuan:** Periksa pengumuman asli dulu; Tanya izin dan tujuan pemakaian foto

**Pembahasan setiap pilihan/kartu:**

**Bagikan**

Kita belum tahu apakah pengumumannya benar atau fotonya dipakai dengan izin. Membagikannya bisa membuat lebih banyak orang salah paham.

**Periksa pengumuman asli dulu**

Ini membantu memastikan isi pengumuman. Setelah itu, lihat juga apakah penggunaan fotonya sudah mendapat izin.

**Tanya izin dan tujuan pemakaian foto**

Ini membantu memastikan penggunaan identitas orang tersebut. Isi pengumumannya tetap perlu diperiksa.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1, maksimal 2.

**Transisi sebelum melanjutkan:**

Kalau identitas orang lain perlu diperlakukan dengan hati-hati, hal yang sama berlaku saat kita mengunggah bahan ke layanan AI. Sebelum mengirim file, pertanyaannya bukan hanya “bisa atau tidak”, tetapi juga “apa yang benar-benar perlu dibagikan?”.

**Tombol menuju bagian berikutnya:** Siapkan bahan sebelum dikirim →

### 1.9 — Data apa yang perlu dikirim?

**Header:** AI Hari Ini · 9/12

**Label:** PELAJARAN 1 · 1.9

**Materi yang tampil:**

Saat kamu mengirim prompt, PDF, foto, atau suara, bahan itu diterima oleh layanan AI. Sebelum mengirim, pikirkan apa yang dibutuhkan untuk tugasmu, apakah kamu boleh membagikannya, dan bagaimana layanan tersebut menangani data.

Untuk membuat ringkasan, mungkin cukup memakai beberapa bagian dokumen. Menghapus nama juga belum tentu menghilangkan identitas: alamat, tanggal, atau rincian kegiatan bisa tetap menunjukkan siapa orangnya.

**Sumber pada bagian ini:**

- [OpenAI — Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)
- [Google — Gemini Privacy Hub](https://support.google.com/gemini/answer/13594961)

#### Aktivitas 1 — Tolong ringkas tiga hambatan dalam pelaksanaan acara ini. Pilih bagian yang membantu membuat ringkasan.

**Bentuk interaksi:** pilihan jamak.

**Teks visual, dokumen, atau diagram:**

Dokumen acara · simulasi

Hambatan: perlengkapan datang terlambat, ruangan belum siap, dan peserta kesulitan menemukan lokasi.

Langkah perbaikan: konfirmasi perlengkapan lebih awal, cek ruangan sehari sebelumnya, dan kirim petunjuk lokasi.

Nama peserta: Peserta Contoh A dan Peserta Contoh B.

Nomor identitas: ID-CONTOH-001 dan ID-CONTOH-002 (bukan identitas nyata).

Kontak pribadi: kontak-pribadi@example.invalid (bukan alamat aktif).

**Pilihan/tombol yang tersedia:**

1. Hambatan
2. Langkah perbaikan
3. Nama peserta
4. Nomor identitas
5. Kontak pribadi

**Pilihan/urutan acuan:** Hambatan; Langkah perbaikan

**Pembahasan setiap pilihan/kartu:**

**Hambatan**

Bagian ini memuat masalah yang perlu diringkas.

**Langkah perbaikan**

Bagian ini memberi penjelasan tentang tindak lanjutnya.

**Nama peserta**

Rincian ini belum dibutuhkan untuk merangkum hambatan acara.

**Nomor identitas**

Rincian ini belum dibutuhkan untuk merangkum hambatan acara.

**Kontak pribadi**

Rincian ini belum dibutuhkan untuk merangkum hambatan acara.

**Tombol pemeriksaan/pembuka:** Lihat bahan yang akan dikirim

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

**Setelah pemeriksaan:** Pratinjau bahan · tidak dikirim. Isi pratinjau mengikuti blok yang dipilih, dalam urutan pilihan peserta.

#### Aktivitas 2 — Sebelum mengirim bahan, periksa empat hal ini.

**Bentuk interaksi:** buka penjelasan.

**Penjelasan yang dibuka:**

Apakah bahan ini diperlukan untuk tugasnya?

Apakah saya boleh membagikannya?

Layanan apa yang akan menerimanya?

Apakah saya sudah memahami penyimpanan dan penggunaan datanya?

**Tombol pemeriksaan/pembuka:** Buka pemeriksaan sebelum mengirim

#### Panel — Kalau penasaran

kebijakan bisa berbeda menurut layanan, jenis akun, dan pengaturan. Penyimpanan data, penggunaan untuk pelatihan, dan izin membagikan dokumen perlu diperiksa masing-masing. Mematikan penggunaan chat untuk training tidak otomatis memberi izin mengunggah dokumen rahasia.

**Transisi sebelum melanjutkan:**

Memilih bahan yang tepat mengurangi risiko membagikan data yang tidak perlu. Tetapi itu belum menjamin jawabannya benar: AI masih bisa menambahkan detail yang tidak pernah ada di sumber.

**Tombol menuju bagian berikutnya:** Cocokkan jawaban dengan sumber →

### 1.10 — Jawaban yang rapi masih bisa keliru

**Header:** AI Hari Ini · 10/12

**Label:** PELAJARAN 1 · 1.10

**Materi yang tampil:**

AI kadang memberikan informasi salah atau mengarang detail seolah-olah benar. Ini sering disebut halusinasi AI. Jawaban seperti itu bisa tetap terdengar lancar dan menyertakan sitasi, yaitu rujukan ke sumber. Rujukannya perlu dibuka untuk memastikan dokumennya ada dan memang mendukung jawaban.

Untuk latihan ini, kita memakai panduan kampus fiktif. Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas dan tetap bertanggung jawab atas isinya.

**Panel sumber:** Panduan kampus fiktif · simulasi

Mahasiswa diminta menyebutkan bantuan AI pada tugas dan tetap bertanggung jawab atas isi tugasnya. Panduan ini dibuat untuk latihan, bukan aturan seluruh kampus.

#### Aktivitas 1 — Baca jawaban berikut. Tandai dua kalimat yang belum didukung panduan.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas.
2. Sebanyak 87% dosen menyetujui aturan ini.
3. Mahasiswa tetap bertanggung jawab atas isi tugasnya.
4. Aturan yang sama berlaku di semua kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).

**Pilihan/urutan acuan:** Sebanyak 87% dosen menyetujui aturan ini.; Aturan yang sama berlaku di semua kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).

**Pembahasan setiap pilihan/kartu:**

**Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas.**

Permintaan ini memang ada di panduan latihan.

**Sebanyak 87% dosen menyetujui aturan ini.**

Panduan tidak memuat survei atau angka 87%. Kita belum punya sumber untuk angka ini.

**Mahasiswa tetap bertanggung jawab atas isi tugasnya.**

Tanggung jawab mahasiswa juga disebutkan di panduan.

**Aturan yang sama berlaku di semua kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).**

Panduan latihan tidak membahas semua kampus atau aturan sejak 2019. Sitasi yang dicantumkan juga belum menyediakan dokumen yang bisa diperiksa.

**Tombol pemeriksaan/pembuka:** Cocokkan dengan panduan

**Jumlah pilihan sebelum pemeriksaan:** minimal 2, maksimal 2.

#### Panel — Kalau penasaran

jawaban yang sama dari beberapa AI belum menggantikan sumber asli. Untuk tugasmu sendiri, buka panduan yang berlaku di institusimu dan cocokkan isinya.

**Transisi sebelum melanjutkan:**

Sampai sini kita banyak membahas apa yang AI bisa lakukan dan bagaimana memeriksa hasilnya. Sebelum masuk ke cara kerjanya, ada satu hal yang perlu dibereskan dulu: fitur otomatis belum tentu bekerja dengan AI atau machine learning.

**Tombol menuju bagian berikutnya:** Lihat cara kerja di balik fitur →

### 1.11 — Fitur otomatis bekerja dengan cara apa?

**Header:** AI Hari Ini · 11/12

**Label:** PELAJARAN 1 · 1.11

**Materi yang tampil:**

Sistem otomatis bisa memakai aturan, model yang dilatih dari data, atau gabungan keduanya. TCAS pada pesawat, misalnya, memberi peringatan dan arahan untuk membantu menghindari tabrakan. Kecanggihan hasilnya saja belum menunjukkan apakah sistem memakai machine learning.

AI adalah bidang luas yang juga mencakup pendekatan berbasis pengetahuan dan aturan. Untuk mengetahui apakah suatu fitur belajar dari data, kita perlu melihat cara kerjanya.

**Sumber pada bagian ini:**

- [FAA — TCAS II](https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html)

#### Aktivitas 1 — Aplikasi memperbaiki foto secara otomatis. Hasilnya berbeda pada setiap foto. Informasi mana yang paling membantu memahami cara kerja fitur ini?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Nama fitur
2. Penjelasan aturan atau model yang dipakai
3. Warna tombol

**Pilihan/urutan acuan:** Penjelasan aturan atau model yang dipakai

**Pembahasan umum:**

Nama fitur dan warna tombol belum menjelaskan proses di dalamnya. Aturan yang sama pun bisa memberi hasil berbeda untuk foto berbeda. Penjelasan tentang aturan atau modelnya akan lebih membantu.

**Transisi sebelum melanjutkan:**

Pertanyaan tadi menjadi jembatan ke pelajaran berikutnya. Kita akan mulai dari sistem berbasis aturan yang sederhana, lalu membandingkannya dengan model yang belajar dari data.

**Tombol menuju bagian berikutnya:** Cek pemahaman pelajaran 1 →

### 1.check — Cek pemahaman pelajaran 1

**Header:** AI Hari Ini · 12/12

**Label:** CEK PEMAHAMAN

**Materi yang tampil:**

Pembeli mengirim bukti transfer yang terlihat meyakinkan. Sebelum menyerahkan tiket, apa yang kamu periksa?

#### Aktivitas 1 — Sebelum menyerahkan tiket, apa yang kamu periksa?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Cocokkan nomor referensi dari pembeli dengan gambar.
2. Periksa nama, nominal, dan waktu pada gambar.
3. Buka riwayat rekening penerima dan cocokkan transaksi yang masuk.

**Pilihan/urutan acuan:** Buka riwayat rekening penerima dan cocokkan transaksi yang masuk.

**Pembahasan setiap pilihan/kartu:**

**Cocokkan nomor referensi dari pembeli dengan gambar.**

Detailnya terlihat cocok, tetapi informasinya masih berasal dari pembeli. Kamu perlu memastikan transaksi masuk di pihak penerima.

**Periksa nama, nominal, dan waktu pada gambar.**

Detailnya terlihat cocok, tetapi informasinya masih berasal dari pembeli. Kamu perlu memastikan transaksi masuk di pihak penerima.

**Buka riwayat rekening penerima dan cocokkan transaksi yang masuk.**

Riwayat penerima membantu memastikan uang masuk. Cocokkan pengirim, nominal, waktu, dan statusnya dengan pembayaran tiket.

**Pembahasan umum:**

Riwayat penerima membantu memastikan uang masuk. Cocokkan pengirim, nominal, waktu, dan statusnya dengan pembayaran tiket.

**Transisi sebelum melanjutkan:**

Pelajaran pertama berfokus pada apa yang AI lakukan dan bagaimana hasilnya perlu diperiksa. Sekarang kita masuk satu tingkat lebih dalam: bagaimana sistem seperti ini menghasilkan keputusan, prediksi, atau konten.

**Tombol menuju bagian berikutnya:** Mulai pelajaran 2 →

### Pelajaran 2 — Sebenarnya, Apa Itu AI?

**Perkiraan pelajaran ini:** 11–16 menit. Kamu bisa berhenti sebentar dan lanjut lagi kapan saja.

Dua fitur bisa sama-sama terlihat pintar dari luar, tetapi cara kerjanya bisa sangat berbeda. Kita mulai dari contoh yang sederhana agar perbedaannya mudah terlihat: alarm parkir.

### 2.1 — Mulai dari aturan sederhana

**Header:** Sebenarnya, Apa Itu AI? · 1/10

**Label:** PELAJARAN 2 · 2.1

**Materi yang tampil:**

Sensor parkir membaca jarak kendaraan dari benda di dekatnya. Dalam contoh sederhana, alarm menyala ketika jaraknya melewati batas yang sudah ditentukan. Pengembang menulis kondisinya; sistem tidak perlu dilatih dari kumpulan foto atau suara.

Machine learning memakai pendekatan lain. Model disesuaikan dari contoh data selama pelatihan. Dalam aplikasi nyata, aturan dan model juga bisa dipakai bersama.

#### Aktivitas 1 — Coba dua jarak berbeda. Perhatikan kapan alarm menyala.

**Bentuk interaksi:** buka kartu/diagram.

**Teks visual, dokumen, atau diagram:**

Jarak: pilih jarak di bawah

Jarak: {20 / 30 / 50} cm

Aturan: jarak kurang dari 30 cm

Alarm: belum dicoba

Alarm: Menyala (20 cm)

Alarm: Tidak menyala (30 cm dan 50 cm)

**Pilihan/tombol yang tersedia:**

1. 20 cm
2. 30 cm
3. 50 cm

**Pembahasan setiap pilihan/kartu:**

**20 cm**

Alarm menyala karena jaraknya kurang dari 30 cm.

**30 cm**

Alarm tidak menyala. Batasnya adalah kurang dari 30 cm, jadi tepat 30 cm belum memenuhi aturan.

**50 cm**

Alarm tidak menyala karena jaraknya masih di atas batas.

**Jumlah bagian yang perlu dibuka:** minimal 2.

#### Aktivitas 2 — Apa yang menentukan hasil pada contoh ini?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Aturan yang ditulis
2. Pelatihan dari kumpulan foto
3. Nama fitur alarm

**Pilihan/urutan acuan:** Aturan yang ditulis

**Pembahasan umum:**

Aturan yang ditulis menentukan kapan alarm menyala. Dari bunyinya saja, kita belum bisa tahu apakah suatu sistem memakai model yang dilatih.

**Transisi sebelum melanjutkan:**

Aturan jarak mudah ditulis karena kondisinya jelas. Masalah menjadi berbeda ketika variasinya terlalu banyak untuk dirinci satu per satu, seperti mengenali kucing dan anjing dari foto.

**Tombol menuju bagian berikutnya:** Coba contoh foto hewan →

### 2.2 — Ketika contoh lebih membantu daripada daftar aturan

**Header:** Sebenarnya, Apa Itu AI? · 2/10

**Label:** PELAJARAN 2 · 2.2

**Materi yang tampil:**

Kucing dan anjing sama-sama bisa berbulu dan berkaki empat. Di foto, penampilannya juga berubah karena sudut kamera, cahaya, atau bagian tubuh yang tertutup. Sulit menulis aturan yang mencakup semua kemungkinan itu.

Machine learning adalah salah satu pendekatan dalam AI. Model mempelajari pola dari contoh selama pelatihan, lalu memakai pola tersebut pada data baru. Kemampuan bekerja pada data yang belum dipakai untuk pelatihan disebut generalisasi.

**Sumber pada bagian ini:**

- [Google — What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google — Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting)

#### Aktivitas 1 — Kumpulan mana yang memuat variasi lebih dekat dengan foto baru ini?

**Bentuk interaksi:** pilihan tunggal.

**Teks visual, dokumen, atau diagram:**

Ilustrasi variasi data · tidak melatih model sungguhan

Kumpulan A · terang, dari depan

Kumpulan B · cahaya, sudut, dan latar beragam

Buka foto uji · ilustrasi

Hewan terlihat dari samping dalam cahaya redup.

Teks alternatif ilustrasi: {Kucing / Anjing} ilustrasi, {dari depan / dari samping}, {cahaya terang / cahaya redup}.

**Pilihan/tombol yang tersedia:**

1. A · foto terang, semuanya dari depan
2. B · cahaya, sudut, dan latar beragam

**Pilihan/urutan acuan:** B · cahaya, sudut, dan latar beragam

**Pembahasan umum:**

Kumpulan B memuat variasi yang lebih dekat dengan foto uji. Contoh yang beragam dapat membantu model menghadapi kondisi berbeda. Namun, kita tetap perlu mengujinya pada foto terpisah untuk melihat seberapa baik hasilnya.

#### Panel — Kalau penasaran

foto untuk pengujian perlu dipisahkan dari foto latihan. Menambahkan foto ke layar juga belum mengubah model; foto itu harus benar-benar dipakai dalam proses pelatihan.

**Transisi sebelum melanjutkan:**

Sekarang kita sudah punya dua bahan penting: contoh untuk belajar dan data baru yang ingin dikenali. Berikutnya, kita susun keduanya dalam alur pelatihan dan pemakaian model.

**Tombol menuju bagian berikutnya:** Susun prosesnya →

### 2.3 — Dari data sampai prediksi

**Header:** Sebenarnya, Apa Itu AI? · 3/10

**Label:** PELAJARAN 2 · 2.3

**Materi yang tampil:**

Untuk melatih pengenal gambar, kita menyiapkan foto dengan label seperti “kucing” atau “anjing”. Proses training menyesuaikan model dari contoh-contoh itu. Setelah dilatih, model bisa menerima foto baru dan membuat prediksi.

Memakai model pada input baru disebut inferensi. Jadi, ketika kamu mengirim satu foto untuk dikenali, model tidak otomatis dilatih ulang saat itu juga.

#### Aktivitas 1 — Susun kartu dari awal pelatihan sampai model dipakai untuk foto baru.

**Bentuk interaksi:** susun urutan.

**Kartu yang tersedia:**

1. Data berlabel
2. Training
3. Model hasil pelatihan
4. Prediksi foto baru

**Urutan acuan:** Data berlabel → Training → Model hasil pelatihan → Prediksi foto baru

**Pembahasan umum:**

Pelatihan: data dipakai untuk menyesuaikan model. Pemakaian: foto baru diproses oleh model yang sudah dilatih untuk menghasilkan prediksi.

**Tombol pemeriksaan/pembuka:** Lihat alurnya

#### Aktivitas 2 — Foto baru masuk untuk dikenali. Apakah ini pasti pelatihan baru?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Ya, setiap input melatih ulang model
2. Tidak, bisa memakai model yang sudah dilatih

**Pilihan/urutan acuan:** Tidak, bisa memakai model yang sudah dilatih

**Pembahasan umum:**

Tidak. Itu bisa menjadi pemakaian model yang sudah tersedia. Apakah input disimpan dan digunakan untuk pelatihan di kemudian hari bergantung pada rancangan sistem serta kebijakan layanan.

**Transisi sebelum melanjutkan:**

Pada contoh foto, model belajar dari contoh yang sudah diberi label. Itu bukan satu-satunya cara. Ada model yang mencari pola dari data tanpa label, dan ada juga yang belajar dari hasil tindakan.

**Tombol menuju bagian berikutnya:** Bandingkan cara model belajar →

### 2.4 — Tiga cara model belajar

**Header:** Sebenarnya, Apa Itu AI? · 4/10

**Label:** PELAJARAN 2 · 2.4

**Materi yang tampil:**

Ada beberapa pendekatan untuk melatih model. Supervised learning memakai contoh yang sudah punya target atau label. Unsupervised learning mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel. Reinforcement learning mempelajari tindakan dari umpan balik yang berkaitan dengan tujuan.

Kamu tidak perlu langsung menghafal namanya. Perhatikan dulu informasi apa yang dipakai untuk membantu proses belajar.

#### Aktivitas 1 — Email latihan sudah ditandai spam atau bukan spam. Apa yang membantu model belajar?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Label jawaban
2. Struktur dan kemiripan data
3. Hasil tindakan

**Pilihan/urutan acuan:** Label jawaban

**Pembahasan umum:**

Model mendapat contoh beserta kategorinya. Pendekatan ini disebut supervised learning.

#### Aktivitas 2 — Data belanja dikelompokkan berdasarkan kemiripan. Apa yang membantu model belajar?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Label jawaban
2. Struktur dan kemiripan data
3. Hasil tindakan

**Pilihan/urutan acuan:** Struktur dan kemiripan data

**Pembahasan umum:**

Sistem mencari pola pengelompokan tanpa diberi kategori jawaban untuk setiap contoh. Ini contoh unsupervised learning.

#### Aktivitas 3 — Robot mencoba gerakan dan mendapat umpan balik sesuai tujuan. Apa yang membantu model belajar?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Label jawaban
2. Struktur dan kemiripan data
3. Hasil tindakan

**Pilihan/urutan acuan:** Hasil tindakan

**Pembahasan umum:**

Umpan balik membantu model mempelajari tindakan yang mendukung tujuan. Ini contoh reinforcement learning.

#### Panel — Kalau penasaran

kelompok yang ditemukan belum tentu berguna untuk kebutuhan kita. Pada robot, umpan balik juga perlu dirancang agar sesuai dengan tujuan. Sekadar membiarkan sistem mencoba tidak menjamin hasil yang diinginkan.

**Transisi sebelum melanjutkan:**

Cara model belajar bisa berbeda, begitu juga dengan susunan di dalam modelnya. Salah satu istilah yang sering muncul ketika membahas AI modern adalah deep learning.

**Tombol menuju bagian berikutnya:** Kenali deep learning →

### 2.5 — Mengenal deep learning tanpa rumus dulu

**Header:** Sebenarnya, Apa Itu AI? · 5/10

**Label:** PELAJARAN 2 · 2.5

**Materi yang tampil:**

Deep learning adalah bagian dari machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. Melalui pelatihan, lapisan-lapisan ini membantu model mempelajari hubungan dalam data, termasuk gambar, suara, dan bahasa.

Jaringan saraf buatan terdiri dari perhitungan yang disesuaikan selama pelatihan. Kata “saraf” pada namanya tidak berarti komputer punya otak, perasaan, atau pengalaman seperti manusia.

#### Aktivitas 1 — Buka tiga bagian diagram untuk melihat contoh perjalanan data.

**Bentuk interaksi:** buka kartu/diagram.

**Teks visual, dokumen, atau diagram:**

Input ↓

Lapisan model ↓

Output

**Pilihan/tombol yang tersedia:**

1. Input
2. Lapisan model
3. Output

**Pembahasan setiap pilihan/kartu:**

**Input**

Informasi masuk ke model, misalnya sebuah foto.

**Lapisan model**

Perhitungan di dalam model memproses hubungan dan pola pada input.

**Output**

Model memberikan hasil, misalnya prediksi kategori foto.

**Jumlah bagian yang perlu dibuka:** minimal 3.

#### Aktivitas 2 — Kalimat mana yang sesuai dengan gambaran tadi?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Model mempelajari hubungan melalui lapisan perhitungan.
2. Banyak lapisan membuat model memiliki pengalaman seperti manusia.

**Pilihan/urutan acuan:** Model mempelajari hubungan melalui lapisan perhitungan.

**Pembahasan umum:**

Kalimat pertama sesuai dengan gambaran tadi. Banyak lapisan menjelaskan susunan model, tetapi belum membuktikan adanya pengalaman seperti manusia.

#### Panel — Kalau penasaran

kemampuan model juga dipengaruhi kualitas data, tujuan pelatihan, rancangan, dan pengujian. Jumlah lapisan saja belum cukup untuk menilai kualitasnya.

**Transisi sebelum melanjutkan:**

Deep learning adalah pendekatan, bukan satu jenis tugas. Model dengan pendekatan ini bisa dipakai untuk mengenali, memperkirakan, memilih, atau menghasilkan sesuatu. Sekarang kita bedakan tugas-tugas tersebut.

**Tombol menuju bagian berikutnya:** Bandingkan tugas AI →

### 2.6 — Mengenali, memilih, dan membuat konten

**Header:** Sebenarnya, Apa Itu AI? · 6/10

**Label:** PELAJARAN 2 · 2.6

**Materi yang tampil:**

Filter spam memberi kategori pada email. Sistem rekomendasi memilih lagu. Model prediksi memperkirakan risiko. AI generatif membuat konten, misalnya teks, gambar, suara, video, atau kode.

Banyak sistem generatif modern memakai deep learning. Namun, istilah “generatif” menjelaskan kemampuan menghasilkan konten, sedangkan machine learning dan deep learning menjelaskan pendekatan yang dipakai. Karena itu, hubungan semua istilah tersebut perlu digambarkan dengan hati-hati.

#### Aktivitas 1 — Menandai email sebagai spam.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Memberi kategori
2. Memilih rekomendasi
3. Memperkirakan nilai
4. Membuat konten

**Pilihan/urutan acuan:** Memberi kategori

**Pembahasan umum:**

Sistem menentukan kategori pesan.

#### Aktivitas 2 — Menyarankan lagu untuk didengarkan.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Memberi kategori
2. Memilih rekomendasi
3. Memperkirakan nilai
4. Membuat konten

**Pilihan/urutan acuan:** Memilih rekomendasi

**Pembahasan umum:**

Sistem memilih lagu dari yang tersedia.

#### Aktivitas 3 — Memperkirakan tingkat risiko.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Memberi kategori
2. Memilih rekomendasi
3. Memperkirakan nilai
4. Membuat konten

**Pilihan/urutan acuan:** Memperkirakan nilai

**Pembahasan umum:**

Sistem memberikan perkiraan dari informasi yang diterima.

#### Aktivitas 4 — Menulis draf balasan pesan.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Memberi kategori
2. Memilih rekomendasi
3. Memperkirakan nilai
4. Membuat konten

**Pilihan/urutan acuan:** Membuat konten

**Pembahasan umum:**

Sistem menyusun teks yang bisa kamu tinjau dan revisi.

#### Aktivitas 5 — Aplikasi mengenali objek dalam foto, lalu menulis penjelasannya. Dua tugas apa yang dipakai?

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Pengenalan
2. Pembuatan konten
3. Pemindahan pembayaran

**Pilihan/urutan acuan:** Pengenalan; Pembuatan konten

**Pembahasan setiap pilihan/kartu:**

**Pengenalan**

Sistem mengenali objek dalam foto.

**Pembuatan konten**

Sistem menghasilkan penjelasan berdasarkan objek yang dikenali.

**Pemindahan pembayaran**

Contoh ini tidak melakukan transaksi.

**Pembahasan umum:**

Satu aplikasi bisa menggabungkan beberapa tugas. Di sini, sistem mengenali objek lalu menghasilkan penjelasan.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 2, maksimal 2.

#### Panel — Kalau penasaran

model generatif juga ada yang tidak menggunakan deep learning. Jika membuat peta istilah, letakkan deep learning sebagai bagian dari machine learning. Tunjukkan generatif sebagai kemampuan yang dapat beririsan dengan pendekatan tersebut, bukan selalu sebagai kotak terdalam.

**Transisi sebelum melanjutkan:**

Salah satu tugas tadi adalah menghasilkan konten. Untuk memahami mengapa teks dari AI bisa terdengar begitu lancar, kita lihat gambaran sederhana tentang cara model bahasa menyusun jawaban.

**Tombol menuju bagian berikutnya:** Lihat cara model bahasa menyusun teks →

### 2.7 — Kalimatnya lancar, apakah isinya benar?

**Header:** Sebenarnya, Apa Itu AI? · 7/10

**Label:** PELAJARAN 2 · 2.7

**Materi yang tampil:**

Model bahasa dilatih dari banyak contoh teks. Saat menjawab, model memproses input lalu memperkirakan lanjutan berdasarkan pola yang dipelajari. Proses ini berulang hingga jawaban tersusun bagian demi bagian.

Bagian yang diproses disebut token. Token bisa berupa potongan kata atau tanda baca, sehingga satu token tidak selalu sama dengan satu kata. Ini gambaran dasar; sistem bahasa modern bisa memiliki komponen lain yang ikut bekerja.

#### Aktivitas 1 — Acara dimulai … pukul 10.00, atau besok pagi? Apa yang kamu perlukan untuk memastikan waktunya?

**Bentuk interaksi:** buka penjelasan.

**Teks visual, dokumen, atau diagram:**

JADWAL FIKTIF · SIMULASI

Sabtu, pukul 10.00

**Penjelasan yang dibuka:**

Keduanya bisa terdengar wajar. Namun, kita perlu jadwal acara untuk tahu mana yang sesuai.

**Tombol pemeriksaan/pembuka:** Buka jadwal

#### Aktivitas 2 — Pilih kalimat yang didukung jadwal tersebut.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Acara dimulai pukul 10.00
2. Acara dimulai besok pagi

**Pilihan/urutan acuan:** Acara dimulai pukul 10.00

**Pembahasan umum:**

Jadwal menyebut pukul 10.00, jadi waktu itu punya dasar. Untuk mengatakan ‘besok’, kita juga perlu tahu hari saat kalimatnya dipakai. Lanjutan yang terdengar lancar belum tentu sesuai fakta. Kelancaran bahasa pun belum menunjukkan bahwa model punya pengalaman atau niat seperti manusia.

**Transisi sebelum melanjutkan:**

Kelancaran bahasa tidak menjamin kebenaran. Hal yang sama berlaku ketika AI mengatakan sudah melakukan sesuatu: kita perlu melihat bukti tindakannya, bukan hanya percaya pada kalimatnya.

**Tombol menuju bagian berikutnya:** Cek klaim tindakan AI →

### 2.8 — “Sudah saya kerjakan” perlu diperiksa

**Header:** Sebenarnya, Apa Itu AI? · 8/10

**Label:** PELAJARAN 2 · 2.8

**Materi yang tampil:**

Model yang bagus pada satu tugas belum tentu sama baiknya pada tugas lain. Versi, konteks, alat, dan cara memberi tugas dapat memengaruhi hasil. Satu jawaban saja belum cukup untuk menilai semua kemampuan model.

Saat AI mengatakan sudah membuka artikel atau menjalankan tes, periksa apakah alatnya memang tersedia dan apakah ada hasil yang bisa dilihat. Kalimat “sudah saya kerjakan” perlu dicocokkan dengan pekerjaan yang dimaksud.

#### Aktivitas 1 — ‘Saya sudah memeriksa artikel.’ Pilih bukti yang sesuai.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Artikel terbuka dan bagian yang mendukung klaim
2. Judul atau tautan saja
3. Kalimat ‘sudah saya periksa’

**Pilihan/urutan acuan:** Artikel terbuka dan bagian yang mendukung klaim

**Pembahasan umum:**

Judul atau tautan saja belum menunjukkan bahwa isi artikel sudah diperiksa.

#### Aktivitas 2 — ‘Kode sudah lolos tes.’ Pilih bukti yang sesuai.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Pernyataan ‘sudah aman’
2. Catatan tes yang dijalankan pada kode tersebut
3. Nama bahasa pemrograman

**Pilihan/urutan acuan:** Catatan tes yang dijalankan pada kode tersebut

**Pembahasan umum:**

Pernyataan ‘sudah aman’ belum memberi hasil tes yang bisa dilihat. Tes yang lolos memberi informasi tentang hal yang diuji. Bug pada bagian yang belum diuji masih bisa terlewat.

#### Aktivitas 3 — ‘File sudah diperbaiki.’ Pilih bukti yang sesuai.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Penjelasan cara memperbaiki
2. Nama file
3. Perubahan pada file yang dimaksud

**Pilihan/urutan acuan:** Perubahan pada file yang dimaksud

**Pembahasan umum:**

Penjelasan cara memperbaiki belum menunjukkan bahwa filenya sudah diubah.

**Tombol memilih contoh:** Memeriksa artikel / Menjalankan tes / Memperbaiki file

**Petunjuk:** Coba sedikitnya 2 kasus. Sudah dicoba: {jumlah}. Sisanya boleh dibaca sebagai tambahan.

**Transisi sebelum melanjutkan:**

Kita sudah bertemu cukup banyak istilah. Sebelum menutup pelajaran ini, kita susun hubungannya agar tidak terasa seperti kumpulan istilah yang berdiri sendiri.

**Tombol menuju bagian berikutnya:** Hubungkan istilahnya →

### 2.9 — Merangkai istilah yang sudah dipelajari

**Header:** Sebenarnya, Apa Itu AI? · 9/10

**Label:** PELAJARAN 2 · 2.9

**Materi yang tampil:**

Otomatisasi menggambarkan proses yang berjalan tanpa terus dioperasikan. Machine learning menjelaskan bagaimana model belajar dari data. Deep learning adalah salah satu jenis machine learning. Generatif menjelaskan kemampuan menghasilkan konten.

Istilah-istilah ini membantu kita bertanya lebih tepat tentang sebuah fitur: tugasnya apa, prosesnya bagaimana, dan hasilnya perlu diperiksa dengan cara apa?

#### Aktivitas 1 — Salah satu pendekatan dalam AI yang menyesuaikan model dari data adalah …

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Machine learning
2. Deep learning
3. Generatif

**Pilihan/urutan acuan:** Machine learning

**Pembahasan umum:**

Machine learning: model belajar dari foto latihan untuk mengenali foto baru.

#### Aktivitas 2 — Jenis machine learning yang memakai jaringan saraf berlapis adalah …

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Machine learning
2. Deep learning
3. Generatif

**Pilihan/urutan acuan:** Deep learning

**Pembahasan umum:**

Deep learning: model memakai jaringan saraf dengan banyak lapisan.

#### Aktivitas 3 — Kemampuan menghasilkan konten seperti teks atau gambar disebut …

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Machine learning
2. Deep learning
3. Generatif

**Pilihan/urutan acuan:** Generatif

**Pembahasan umum:**

Generatif: sistem menghasilkan draf teks atau gambar.

#### Aktivitas 4 — Hubungan istilah yang sudah kamu coba

**Bentuk interaksi:** buka penjelasan.

**Teks visual, dokumen, atau diagram:**

AI

↳ Machine learning

↳ Deep learning

Generatif: kemampuan membuat konten, dapat beririsan dengan pendekatan di atas.

**Penjelasan yang dibuka:**

Deep learning adalah bagian dari machine learning. Machine learning merupakan salah satu pendekatan dalam AI.

Generatif menjelaskan kemampuan menghasilkan konten. Kemampuan ini dapat beririsan dengan pendekatan tersebut, bukan selalu sebagai kotak terdalam.

**Tombol pemeriksaan/pembuka:** Lihat peta lengkap

**Transisi sebelum melanjutkan:**

Peta tadi baru berguna kalau bisa dipakai untuk membaca kasus baru. Sekarang coba terapkan pada fitur yang cara kerjanya belum kita ketahui.

**Tombol menuju bagian berikutnya:** Cek pemahaman pelajaran 2 →

### 2.check — Cek pemahaman pelajaran 2

**Header:** Sebenarnya, Apa Itu AI? · 10/10

**Label:** CEK PEMAHAMAN

**Materi yang tampil:**

Aplikasi punya tombol ‘Perbaiki otomatis’. Hasilnya berbeda pada setiap foto. Apakah informasi itu cukup untuk memastikan fitur memakai machine learning?

#### Aktivitas 1 — Apakah informasi itu cukup untuk memastikan fitur memakai machine learning?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Ya, karena hasilnya berubah mengikuti foto.
2. Belum; perlu penjelasan tentang aturan atau model yang dipakai.
3. Tidak, karena pengguna masih harus menekan tombol.

**Pilihan/urutan acuan:** Belum; perlu penjelasan tentang aturan atau model yang dipakai.

**Pembahasan umum:**

Hasil yang berbeda bisa muncul dari aturan maupun model yang dilatih. Tombol yang perlu ditekan juga tidak menentukan jenis teknologinya. Untuk memastikan, cari penjelasan tentang cara kerja fitur tersebut.

**Transisi sebelum melanjutkan:**

Kita sudah punya gambaran tentang aturan, data, model, dan cara hasilnya dibuat. Pelajaran terakhir akan membawa semua itu kembali ke situasi sehari-hari: kapan AI membantu, apa yang tetap perlu kita pikirkan, dan bagaimana memeriksa hasilnya sebelum dipakai.

**Tombol menuju bagian berikutnya:** Mulai pelajaran 3 →

### Pelajaran 3 — Berpikir di Era AI

**Perkiraan pelajaran ini:** 13–18 menit. Kamu bisa berhenti sebentar dan lanjut lagi kapan saja.

Di pelajaran terakhir, kita pakai satu situasi sebagai benang merah: kamu dan tim sedang menyiapkan proposal sponsor untuk sebuah kegiatan komunitas. AI bisa membantu merangkum bahan, mencari bentuk penyampaian, atau membuat draf. Tetapi keputusan tentang isi, ketepatan informasi, dan janji yang akhirnya dikirim tetap perlu kalian pertanggungjawabkan.

### 3.1 — Lihat tugasnya satu per satu

**Header:** Berpikir di Era AI · 1/10

**Label:** PELAJARAN 3 · 3.1

**Materi yang tampil:**

Membuat proposal melibatkan banyak tugas: mencari informasi, membaca dokumen, menyusun slide, dan menentukan rekomendasi. AI mungkin membantu beberapa di antaranya. Namun, kamu tetap perlu memahami kebutuhan tim, hubungan dengan sponsor, dan alasan memilih suatu usulan.

Untuk menentukan bantuan yang tepat, pecah dulu pekerjaannya menjadi tugas-tugas kecil. Dari sana, lebih mudah melihat bagian yang bisa dibantu dan bagian yang perlu kamu periksa sendiri.

#### Aktivitas 1 — Merangkum dokumen acara. Bantuan seperti apa yang sesuai?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. AI membantu draf
2. Perlu penilaian dan pemeriksaan
3. Keduanya

**Pembahasan umum:**

AI bisa membantu membuat ringkasan. Cocokkan lagi dengan dokumen agar rincian penting tidak hilang atau berubah.

#### Aktivitas 2 — Membuat beberapa susunan slide. Bantuan seperti apa yang sesuai?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. AI membantu draf
2. Perlu penilaian dan pemeriksaan
3. Keduanya

**Pembahasan umum:**

AI bisa menawarkan susunan yang berbeda. Tim memilih yang paling membantu menjelaskan tujuan proposal.

#### Aktivitas 3 — Memilih sponsor yang cocok. Bantuan seperti apa yang sesuai?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. AI membantu draf
2. Perlu penilaian dan pemeriksaan
3. Keduanya

**Pembahasan umum:**

AI bisa membantu membandingkan pilihan. Hubungan dengan sponsor, nilai kegiatan, dan pertimbangan tim tetap perlu dibahas.

#### Aktivitas 4 — Menyetujui janji kepada sponsor. Bantuan seperti apa yang sesuai?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. AI membantu draf
2. Perlu penilaian dan pemeriksaan
3. Keduanya

**Pembahasan umum:**

Persetujuan perlu diberikan oleh pihak yang berwenang dan memahami komitmennya. Kalimat dalam draf AI belum menjadi persetujuan tim.

**Transisi sebelum melanjutkan:**

Contoh proposal tadi menunjukkan bahwa satu pekerjaan terdiri dari banyak tugas, dan tidak semuanya terdampak AI dengan cara yang sama. Ini penting ketika kita membaca klaim atau angka tentang dampak AI terhadap pekerjaan.

**Tombol menuju bagian berikutnya:** Pahami angka tentang pekerjaan →

### 3.2 — Apa arti pekerjaan “terpapar AI”?

**Header:** Berpikir di Era AI · 2/10

**Label:** PELAJARAN 3 · 3.2

**Materi yang tampil:**

Dalam penelitian, paparan AI menggambarkan potensi tugas dalam pekerjaan untuk dipengaruhi kemampuan AI. Cara mengukurnya mengikuti studi yang dipakai. Angka itu belum menunjukkan berapa orang yang akan kehilangan pekerjaan.

Artikel ILO pada 2026 menyebut paparan AI generatif pada pekerja muda Indonesia usia 15–24 tahun sebesar 26,1%, dibanding 21,1% pada kelompok dewasa. Perbandingan ini menggambarkan potensi perubahan tugas pada dua kelompok tersebut.

**Sumber pada bagian ini:**

- [ILO — pasar kerja ASEAN](https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited)
- [ILO — rincian ASEAN dan Indonesia](https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets)
- [Stanford Digital Economy Lab — pekerja muda, Agustus 2026](https://digitaleconomy.stanford.edu/news/canariesaug26/)

**Grafik tetap tersedia di seluruh aktivitas bagian ini:**

Paparan AI generatif pada pekerja Indonesia · ILO, 2026

Usia 15–24 tahun: 26,1%

Kelompok dewasa: 21,1%

Ukuran: potensi tugas untuk dipengaruhi AI, bukan kepastian kehilangan pekerjaan. Panjang batang memakai skala yang sama, 0–30%.

#### Aktivitas 1 — Pada ukuran yang dibahas, kelompok muda memiliki paparan lebih tinggi.

**Bentuk interaksi:** pilihan tunggal.

**Teks visual, dokumen, atau diagram:**

Paparan AI generatif pada pekerja Indonesia · ILO, 2026

Usia 15–24 tahun: 26,1%

Kelompok dewasa: 21,1%

Ukuran: potensi tugas untuk dipengaruhi AI, bukan kepastian kehilangan pekerjaan. Panjang batang memakai skala yang sama, 0–30%.

**Pilihan/tombol yang tersedia:**

1. Didukung
2. Tidak didukung

**Pilihan/urutan acuan:** Didukung

**Pembahasan umum:**

Angka kelompok muda lebih tinggi daripada kelompok dewasa dalam perbandingan ini.

#### Aktivitas 2 — 26,1% pekerja muda pasti kehilangan pekerjaan.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Didukung
2. Tidak didukung

**Pilihan/urutan acuan:** Tidak didukung

**Pembahasan umum:**

Angka ini mengukur paparan tugas. Kepastian kehilangan pekerjaan tidak bisa disimpulkan dari grafik tersebut.

#### Aktivitas 3 — Semua tugas pekerja muda akan dikerjakan AI.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Didukung
2. Tidak didukung

**Pilihan/urutan acuan:** Tidak didukung

**Pembahasan umum:**

Grafik tidak menunjukkan bahwa semua tugas dalam setiap pekerjaan akan diambil alih.

#### Aktivitas 4 — Apa yang perlu kamu baca bersama angka ini? Boleh pilih lebih dari satu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Definisi paparan
2. Kelompok usia
3. Waktu dan sumber data
4. Warna grafik

**Pilihan/urutan acuan:** Definisi paparan; Kelompok usia; Waktu dan sumber data

**Pembahasan setiap pilihan/kartu:**

**Definisi paparan**

Definisi menjelaskan apa yang diukur.

**Kelompok usia**

Kelompok usia menjelaskan siapa yang dibandingkan.

**Waktu dan sumber data**

Waktu dan sumber membantu menempatkan hasil penelitian.

**Warna grafik**

Warna memudahkan membaca grafik, tetapi tidak menentukan apa yang diukur.

**Pembahasan umum:**

Definisi, kelompok usia, waktu, dan sumber membantu menjelaskan arti angka. Warna memudahkan membaca grafik, tetapi tidak menentukan apa yang diukur.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Panel — Kalau penasaran

- ILO menyebut sekitar 3–4% pekerjaan di Indonesia berada dalam kategori paparan tertinggi.
- Pada kelompok pekerjaan dukungan administratif Indonesia, artikel tersebut menyebut 93,9% terpapar dan 67,5% berada pada kategori tertinggi. Ini angka untuk kelompok pekerjaan tersebut, bukan seluruh tenaga kerja Indonesia.
- Dalam laporan Agustus 2026, Stanford Digital Economy Lab membahas pekerja AS usia 22–25 tahun pada bidang dengan paparan tinggi. Dengan data hingga Juni 2026, jumlah pekerjanya sekitar 19% di bawah pembanding yang dibentuk dari pertumbuhan kelompok sebaya dengan paparan lebih rendah. Penyesuaian lebih terlihat pada berkurangnya perekrutan. Temuan ini bersifat deskriptif: hasilnya belum menetapkan AI sebagai satu-satunya penyebab dan tidak bisa langsung dipakai untuk memprediksi Indonesia.

**Transisi sebelum melanjutkan:**

Angka-angka tadi memberi gambaran besar, tetapi belum menjawab apa yang perlu kamu lakukan sebagai pengguna. Jadi kita kembali ke hal yang lebih dekat: tugas apa yang sebenarnya ingin kamu kerjakan dengan lebih baik?

**Tombol menuju bagian berikutnya:** Pilih kebutuhanmu sendiri →

### 3.3 — Mulai dari kebutuhan yang kamu punya

**Header:** Berpikir di Era AI · 3/10

**Label:** PELAJARAN 3 · 3.3

**Materi yang tampil:**

Kamu tidak harus membuat model sebesar ChatGPT untuk mulai memakai AI. Coba dari tugas yang memang kamu hadapi, seperti memahami materi, membaca penelitian, membuat desain, menulis kode, atau menyiapkan kegiatan.

Pengembangan AI melibatkan infrastruktur, energi, chip, talenta, dan aplikasi. Sebagai pengguna, kamu bisa mulai dengan belajar menjelaskan kebutuhan, memilih bahan yang tepat, dan memeriksa hasil. Kemampuan itu tetap berguna saat alat yang kamu pakai berubah.

**Sumber pada bagian ini:**

- [Komdigi — lima lapisan AI](https://portal.komdigi.go.id/kanal-publik/berita-kini/10477)

#### Aktivitas 1 — Apa yang ingin kamu coba minggu ini?

**Bentuk interaksi:** catatan/checklist pribadi.

**Pilihan/tombol yang tersedia:**

1. Belajar
2. Riset
3. Berkarya
4. Pekerjaan atau kegiatan lain

**Kalimat bantuan/placeholder dan contoh:**

Minggu ini saya ingin memakai AI untuk …, lalu memeriksa ….

Saya ingin dibantu memahami topik baru, lalu mencoba menjelaskannya ulang tanpa melihat jawaban.

Saya ingin membuat ringkasan penelitian, lalu mencocokkannya dengan artikel asli.

Saya ingin membuat draf kode, lalu membaca perubahannya dan menjalankan tes yang relevan.

Kategori perlu dipilih. Tulisan tetap opsional dan tidak dinilai otomatis.

**Transisi sebelum melanjutkan:**

Setelah tahu tugas yang ingin dibantu, tantangan berikutnya adalah menilai saran yang diberikan. Jawaban yang terdengar yakin belum tentu paling cocok dengan kebutuhanmu.

**Tombol menuju bagian berikutnya:** Coba menilai saran AI →

### 3.4 — Saat saran AI terdengar meyakinkan

**Header:** Berpikir di Era AI · 4/10

**Label:** PELAJARAN 3 · 3.4

**Materi yang tampil:**

Automation bias adalah kecenderungan terlalu mengandalkan saran sistem otomatis. Penjelasan yang panjang dan percaya diri bisa membuat kita mengikuti AI tanpa mengecek apakah sarannya menjawab kebutuhan.

Pengetahuan bidang membantu, tetapi orang yang berpengalaman pun bisa keliru. Saat menilai saran, lihat alasan dan informasi pendukungnya. Rasa yakin saja belum menunjukkan bahwa pilihan itu tepat.

**Sumber pada bagian ini:**

- [Nature Medicine — explainable AI dan diagnosis kulit](https://www.nature.com/articles/s41591-026-04553-w)

#### Aktivitas 1 — Brief simulasi: acara untuk pemula, anggaran terbatas, dan tim ingin menyediakan sesi praktik. AI menyarankan sebagian besar anggaran untuk dekorasi. Sebelum memutuskan, apa yang ingin kamu lihat?

**Bentuk interaksi:** buka kartu/diagram.

**Pilihan/tombol yang tersedia:**

1. Tujuan acara
2. Rincian anggaran
3. Penjelasan AI yang lebih panjang

**Pembahasan setiap pilihan/kartu:**

**Tujuan acara**

Tim ingin peserta mendapat pengalaman praktik. Saran dekorasi perlu dilihat bersama kebutuhan ini.

**Rincian anggaran**

Periksa apakah setelah biaya dekorasi masih ada cukup dana untuk sesi praktik.

**Penjelasan AI yang lebih panjang**

Penjelasan tambahan bisa membantu memahami usulannya. Namun, kamu tetap perlu mencocokkannya dengan tujuan dan anggaran.

**Jumlah bagian yang perlu dibuka:** minimal 1.

#### Aktivitas 2 — Apa yang kamu lakukan dengan saran itu?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Ikuti saran
2. Sesuaikan saran
3. Tunda sampai informasi cukup

**Pilihan/urutan acuan:** Sesuaikan saran; Tunda sampai informasi cukup

**Pembahasan setiap pilihan/kartu:**

**Ikuti saran**

Sebelum langsung mengikuti, ada kebutuhan yang belum terjawab: bagaimana sesi praktik tetap terlaksana dengan sisa anggaran?

**Sesuaikan saran**

Kamu bisa mempertimbangkan dekorasi sambil menjaga dana untuk sesi praktik. Pastikan usulan barunya sesuai tujuan dan rincian biaya.

**Tunda sampai informasi cukup**

Jika biaya dan kebutuhan praktik belum jelas, mencari informasi itu dulu memberi dasar untuk memutuskan.

**Pembahasan umum:**

Menyesuaikan atau menunda lebih beralasan pada kasus ini.

#### Panel — Kalau penasaran

sumber materi juga memuat penelitian diagnosis kulit tentang respons orang awam dan dokter terhadap saran AI. Itu contoh dalam konteks medis tertentu. Bacaan ini membantu membahas cara menilai saran; aktivitas tidak meminta peserta mendiagnosis kondisi medis.

**Transisi sebelum melanjutkan:**

Saat menilai saran tadi, kamu sebenarnya memakai beberapa kemampuan sekaligus: memahami tujuan, membaca konteks, menilai risiko, dan menggunakan pengetahuan yang kamu punya. Berikutnya kita beri nama kemampuan-kemampuan itu.

**Tombol menuju bagian berikutnya:** Kenali kemampuan yang dipakai →

### 3.5 — Lima kemampuan yang tetap kamu perlukan

**Header:** Berpikir di Era AI · 5/10

**Label:** PELAJARAN 3 · 3.5

**Materi yang tampil:**

Saat memakai AI, kamu masih perlu menentukan tujuan, memahami bidangnya, memeriksa hal penting sesuai risikonya, memperhatikan orang dan situasi, serta terus belajar dari pengalaman.

Kelima kemampuan ini bisa dilatih lewat tugas sehari-hari. Tidak ada daftar keterampilan yang menjamin pekerjaan akan bebas dari dampak AI, tetapi kemampuan tersebut membantu kamu menilai dan memakai hasil dengan lebih baik.

**Sumber pada bagian ini:**

- [OECD — AI and skills](https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html)
- [Generative AI at Work — paper](https://arxiv.org/abs/2304.11771)

#### Aktivitas 1 — Menentukan tujuan proposal sebelum membuat slide. Pilih kemampuan yang paling terlihat.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Menentukan tujuan
2. Memahami bidang
3. Memeriksa sesuai risiko
4. Memahami konteks dan orang
5. Terus belajar

**Pilihan/urutan acuan:** Menentukan tujuan

**Pembahasan umum:**

Tujuan membantu memilih isi dan susunan yang perlu dimasukkan. Satu tindakan boleh berkaitan dengan beberapa kemampuan.

#### Aktivitas 2 — Menilai apakah rincian biaya masuk akal. Pilih kemampuan yang paling terlihat.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Menentukan tujuan
2. Memahami bidang
3. Memeriksa sesuai risiko
4. Memahami konteks dan orang
5. Terus belajar

**Pilihan/urutan acuan:** Memahami bidang

**Pembahasan umum:**

Pengetahuan tentang kebutuhan acara membantu membaca perkiraan biaya. Satu tindakan boleh berkaitan dengan beberapa kemampuan.

#### Aktivitas 3 — Membuka sumber asli angka pada slide. Pilih kemampuan yang paling terlihat.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Menentukan tujuan
2. Memahami bidang
3. Memeriksa sesuai risiko
4. Memahami konteks dan orang
5. Terus belajar

**Pilihan/urutan acuan:** Memeriksa sesuai risiko

**Pembahasan umum:**

Angka yang dipakai untuk meyakinkan sponsor perlu sumber yang bisa diperiksa. Satu tindakan boleh berkaitan dengan beberapa kemampuan.

#### Aktivitas 4 — Menanyakan kemampuan tim memenuhi janji sponsor. Pilih kemampuan yang paling terlihat.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Menentukan tujuan
2. Memahami bidang
3. Memeriksa sesuai risiko
4. Memahami konteks dan orang
5. Terus belajar

**Pilihan/urutan acuan:** Memahami konteks dan orang

**Pembahasan umum:**

Usulan harus mempertimbangkan kemampuan orang yang akan menjalankannya. Satu tindakan boleh berkaitan dengan beberapa kemampuan.

#### Aktivitas 5 — Mengevaluasi cara kerja setelah mencoba alat baru. Pilih kemampuan yang paling terlihat.

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Menentukan tujuan
2. Memahami bidang
3. Memeriksa sesuai risiko
4. Memahami konteks dan orang
5. Terus belajar

**Pilihan/urutan acuan:** Terus belajar

**Pembahasan umum:**

Pengalaman memakai alat bisa membantu memperbaiki proses berikutnya. Satu tindakan boleh berkaitan dengan beberapa kemampuan.

**Tombol memilih contoh:** Tujuan proposal / Rincian biaya / Sumber angka / Janji sponsor / Evaluasi alat baru

**Petunjuk:** Coba sedikitnya 1 tindakan. Sudah dicoba: {jumlah}. Sisanya boleh dibaca sebagai tambahan.

#### Panel — Kalau penasaran

studi bantuan AI pada layanan pelanggan melaporkan manfaat produktivitas yang berbeda antarpekerja. Untuk memahami hasilnya, perhatikan siapa yang memakai, tugas yang dibantu, ukuran manfaat, dan versi penelitiannya. Hasil pada satu lingkungan belum menjadi perkiraan manfaat untuk semua pekerjaan.

**Transisi sebelum melanjutkan:**

Kemampuan itu tidak berkembang kalau semua proses berpikir diserahkan ke AI. Supaya lebih terlihat, mari bandingkan dua cara memakai AI untuk belajar.

**Tombol menuju bagian berikutnya:** Bandingkan cara belajarnya →

### 3.6 — Tetap ikut memikirkan jawabannya

**Header:** Berpikir di Era AI · 6/10

**Label:** PELAJARAN 3 · 3.6

**Materi yang tampil:**

Dua orang memakai AI untuk tugas yang sama. Orang pertama meminta jawaban jadi, lalu menyalinnya. Orang kedua membuat draf sendiri, meminta kritik, memeriksa kritik itu, dan memilih bagian yang perlu direvisi.

Pada cara kedua, ia tetap menyusun jawaban dan menilai masukan. Kritik AI pun bisa salah. Kamu boleh memakai yang membantu, memeriksa yang meragukan, dan mengabaikan yang tidak sesuai.

**Sumber pada bagian ini:**

- [Microsoft Research — AI dan berpikir kritis](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)

#### Aktivitas 1 — Bandingkan dua cara memakai AI untuk belajar.

**Bentuk interaksi:** buka kartu/diagram.

**Pilihan/tombol yang tersedia:**

1. Cara pertama
2. Cara kedua

**Pembahasan setiap pilihan/kartu:**

**Cara pertama**

Meminta jawaban jadi → menyalinnya.

**Cara kedua**

Membuat draf sendiri → meminta kritik → memeriksa kritik → mencocokkan sumber → memutuskan revisi.

**Jumlah bagian yang perlu dibuka:** minimal 2.

#### Aktivitas 2 — Tandai langkah yang melibatkan penyusunan atau penilaian jawaban. Boleh pilih lebih dari satu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Membuat draf sendiri
2. Meminta kritik
3. Memeriksa kritik
4. Mencocokkan sumber
5. Memutuskan revisi
6. Menyalin jawaban jadi

**Pilihan/urutan acuan:** Membuat draf sendiri; Memeriksa kritik; Mencocokkan sumber; Memutuskan revisi

**Pembahasan setiap pilihan/kartu:**

**Membuat draf sendiri**

Kamu ikut menyusun jawaban.

**Meminta kritik**

Meminta masukan bisa membantu, tetapi kritiknya masih perlu dinilai.

**Memeriksa kritik**

Kamu menilai apakah masukan benar dan sesuai kebutuhan.

**Mencocokkan sumber**

Kamu memastikan klaim sesuai dengan bahan aslinya.

**Memutuskan revisi**

Kamu mengambil keputusan tentang perubahan yang diperlukan.

**Menyalin jawaban jadi**

Menyalin saja belum menunjukkan bahwa kamu memahami atau menilai isinya.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Aktivitas 3 — Saran AI · simulasi: ‘Tambahkan angka 78% agar lebih meyakinkan.’

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Terima
2. Periksa dulu
3. Tidak dipakai

**Pilihan/urutan acuan:** Periksa dulu; Tidak dipakai

**Pembahasan umum:**

Angka 78% belum punya sumber. Menambahkannya hanya karena terdengar meyakinkan belum memberi dasar bagi proposal. Cari sumber yang mendukung atau jangan pakai angkanya.

#### Aktivitas 4 — Saran AI: ‘Jelaskan manfaat sesi praktik untuk peserta.’

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Terima
2. Periksa dulu
3. Tidak dipakai

**Pembahasan umum:**

Menjelaskan manfaat praktik sesuai dengan tujuan acara. Kamu bisa memakai saran ini, lalu memastikan penjelasannya cocok dengan sesi yang benar-benar direncanakan. Memeriksa manfaat praktik lebih dulu juga masuk akal.

#### Panel — Kalau penasaran

penelitian Microsoft Research dan Carnegie Mellon mengumpulkan laporan pengalaman 319 pekerja pengetahuan dengan 936 contoh penggunaan AI. Kepercayaan lebih tinggi pada AI berkaitan dengan upaya berpikir kritis yang dilaporkan lebih rendah pada tugas tertentu. Penelitian ini memakai laporan pengalaman, sehingga hasilnya tidak membuktikan bahwa semua pengguna AI menjadi kurang pintar.

**Transisi sebelum melanjutkan:**

Dari beberapa contoh tadi, pola kerjanya mulai terlihat. Kita ringkas menjadi empat langkah yang bisa dipakai lagi di banyak situasi.

**Tombol menuju bagian berikutnya:** Coba empat langkahnya →

### 3.7 — Tentukan, gunakan, cek, putuskan

**Header:** Berpikir di Era AI · 7/10

**Label:** PELAJARAN 3 · 3.7

**Materi yang tampil:**

Tentukan: apa yang ingin kamu selesaikan?

Gunakan: bagian mana yang bisa dibantu AI?

Cek: apa yang perlu kamu periksa sebelum memakai hasilnya?

Putuskan: bagian mana yang layak dipakai, dan siapa yang bertanggung jawab?

Kamu bisa kembali ke langkah sebelumnya. Kalau menemukan informasi yang keliru, perjelas lagi kebutuhannya atau minta revisi.

#### Aktivitas 1 — Tentukan. Apa tujuan proposal ini?

**Bentuk interaksi:** pilihan tunggal.

**Teks visual, dokumen, atau diagram:**

DRAF PROPOSAL · SIMULASI

“78% Gen Z menyukai merek yang mendukung keberlanjutan.”

Angka ini dibuat untuk latihan, tanpa sumber, dan bukan statistik nyata.

**Pilihan/tombol yang tersedia:**

1. Menyusun proposal yang bisa dipertanggungjawabkan
2. Membuat sponsor terkesan dengan angka apa pun

**Pilihan/urutan acuan:** Menyusun proposal yang bisa dipertanggungjawabkan

**Pembahasan umum:**

Proposal perlu menjelaskan manfaat dan rencana yang punya dasar. Angka yang menarik belum tentu membantu jika sumbernya tidak jelas.

#### Aktivitas 2 — Gunakan. Bantuan mana yang masih berguna? Boleh pilih lebih dari satu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Merangkum bahan
2. Memberi pilihan kalimat
3. Menganggap statistik tanpa sumber benar

**Pilihan/urutan acuan:** Merangkum bahan; Memberi pilihan kalimat

**Pembahasan setiap pilihan/kartu:**

**Merangkum bahan**

AI bisa membantu mengolah bahan.

**Memberi pilihan kalimat**

AI bisa membantu menyusun kalimat.

**Menganggap statistik tanpa sumber benar**

Statistiknya tetap perlu diperiksa.

**Pembahasan umum:**

AI bisa membantu mengolah bahan dan menyusun kalimat. Statistiknya tetap perlu diperiksa.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Aktivitas 3 — Cek. Bagaimana kamu memeriksa angkanya?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Cari sumber asli, kelompok yang diteliti, dan tahun
2. Tanyakan angka yang sama ke AI lain

**Pilihan/urutan acuan:** Cari sumber asli, kelompok yang diteliti, dan tahun

**Pembahasan umum:**

Sumber asli membantu memastikan apa yang diukur dan siapa yang diteliti. Jawaban AI lain belum memberi kepastian itu.

#### Aktivitas 4 — Putuskan. Sumbernya belum ditemukan. Apa yang kamu lakukan?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Hapus atau ganti dengan informasi yang bisa dibuktikan
2. Pakai karena cocok dengan pesan
3. Tetap jadikan dasar kesimpulan dengan catatan belum diperiksa

**Pilihan/urutan acuan:** Hapus atau ganti dengan informasi yang bisa dibuktikan

**Pembahasan umum:**

Angka ini belum bisa menjadi dasar kesimpulan. Kamu bisa menghapusnya atau mengganti dengan informasi yang punya sumber. Menulis ‘belum diperiksa’ memberi tahu pembaca bahwa ada ketidakpastian, tetapi belum membuat angkanya bisa dipercaya.

#### Aktivitas 5 — Pilihan dan keputusanmu

**Bentuk interaksi:** buka penjelasan.

**Teks visual, dokumen, atau diagram:**

DRAF PROPOSAL · SIMULASI

“78% Gen Z menyukai merek yang mendukung keberlanjutan.”

Angka ini dibuat untuk latihan, tanpa sumber, dan bukan statistik nyata.

**Penjelasan yang dibuka:**

Periksa apakah keputusanmu sesuai tujuan proposal dan informasi yang tersedia. Proposal ini tidak dikirim ke mana pun.

**Tombol pemeriksaan/pembuka:** Lihat keputusanmu

**Ringkasan akhir:** pilihan peserta pada Tentukan, Gunakan, Cek, dan Putuskan ditampilkan di bawah masing-masing pertanyaan. Jika belum ada pilihan, tertulis **Belum dipilih**.

**Tombol:** Ubah keputusan

**Transisi sebelum melanjutkan:**

Proposal yang rapi belum tentu realistis. Setelah isinya terasa tepat, kita masih perlu memastikan bahwa janji yang ditulis benar-benar bisa dipenuhi oleh tim.

**Tombol menuju bagian berikutnya:** Periksa komitmen dalam proposal →

### 3.8 — Pahami dulu sebelum memakai hasilnya

**Header:** Berpikir di Era AI · 8/10

**Label:** PELAJARAN 3 · 3.8

**Materi yang tampil:**

AI bisa mempercepat pembuatan ringkasan dan draf. Sebelum memakainya, kamu masih perlu memahami isi, memilih saran yang sesuai, dan memikirkan orang yang terdampak.

Kalau keputusan berada di luar pengetahuan atau kewenanganmu, ajak pihak yang tepat untuk membahasnya. Hal yang sama berlaku saat AI membantu menulis, menganalisis, atau membuat kode: pahami bagian yang akan kamu gunakan.

#### Aktivitas 1 — Draf simulasi menjanjikan fasilitas dan penggunaan foto peserta kepada sponsor. Pilih hal yang perlu dipastikan sebelum proposal dikirim.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Konfirmasi fasilitas ke tim
2. Pastikan izin penggunaan foto
3. Anggap draf sebagai persetujuan
4. Tinjau komitmen bersama penanggung jawab

**Pilihan/urutan acuan:** Konfirmasi fasilitas ke tim; Pastikan izin penggunaan foto; Tinjau komitmen bersama penanggung jawab

**Pembahasan setiap pilihan/kartu:**

**Konfirmasi fasilitas ke tim**

Pastikan fasilitasnya memang tersedia dan bisa dipakai untuk rencana ini.

**Pastikan izin penggunaan foto**

Orang dalam foto perlu mengetahui dan mengizinkan penggunaan yang direncanakan.

**Anggap draf sebagai persetujuan**

Draf baru memuat usulan. Isinya belum menunjukkan bahwa pihak terkait sudah setuju.

**Tinjau komitmen bersama penanggung jawab**

Penanggung jawab perlu memahami janji yang dibuat dan memastikan tim bisa memenuhinya.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Aktivitas 2 — Sebelum proposal dikirim, saya perlu memastikan ….

**Bentuk interaksi:** catatan/checklist pribadi.

Boleh lanjut tanpa menulis atau mengisi checklist.

**Transisi sebelum melanjutkan:**

Sampai sini, proposal sudah melewati beberapa jenis pemeriksaan. Sekarang kita lihat apakah cara berpikir yang sama tetap berguna ketika situasinya berubah.

**Tombol menuju bagian berikutnya:** Coba situasi lain →

### 3.9 — Sesuaikan pemeriksaan dengan klaimnya

**Header:** Berpikir di Era AI · 9/10

**Label:** PELAJARAN 3 · 3.9

**Materi yang tampil:**

Saat ingin memakai hasil AI, mulai dari pertanyaan yang perlu dijawab. Apakah kutipannya benar? Apakah pembayaran sudah masuk? Apakah data boleh dibagikan? Apakah kamu sudah memahami jawabannya?

Pertanyaan yang berbeda membutuhkan pemeriksaan yang berbeda pula. Pilih langkah yang benar-benar membantu memastikan hal yang ingin kamu ketahui.

#### Aktivitas 1 — Kamu ingin memasukkan kutipan dari AI ke tulisan. Apa yang kamu periksa lebih dulu?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Buka tulisan asli
2. Tanya ulang AI
3. Nilai dari gaya bahasa

**Pilihan/urutan acuan:** Buka tulisan asli

**Pembahasan umum:**

Buka tulisan asli, lalu cocokkan kata-kata dan konteks kutipannya. Gaya bahasa yang meyakinkan belum memastikan kutipan benar.

#### Aktivitas 2 — Kamu menerima bukti pembayaran. Apa yang kamu periksa lebih dulu?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Cocokkan transaksi penerima
2. Periksa font
3. Minta gambar lebih tajam

**Pilihan/urutan acuan:** Cocokkan transaksi penerima

**Pembahasan umum:**

Cocokkan catatan transaksi di pihak penerima. Gambar yang lebih tajam tetap belum memastikan uang masuk.

#### Aktivitas 3 — Kamu ingin mengirim dokumen berisi data orang lain. Apa yang kamu periksa lebih dulu?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Periksa kebutuhan dan izin
2. Matikan training saja
3. Kirim semua agar lengkap

**Pilihan/urutan acuan:** Periksa kebutuhan dan izin

**Pembahasan umum:**

Pastikan datanya diperlukan dan boleh dibagikan. Pengaturan training tidak menggantikan izin tersebut.

#### Aktivitas 4 — Kamu memakai jawaban AI untuk belajar. Apa yang kamu periksa lebih dulu?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Jelaskan ulang dan periksa alasan
2. Salin agar cepat
3. Terima semua kritik

**Pilihan/urutan acuan:** Jelaskan ulang dan periksa alasan

**Pembahasan umum:**

Coba jelaskan ulang dan lihat apakah kamu memahami alasannya. Kritik juga perlu dinilai sebelum dipakai.

**Tombol memilih contoh:** Kutipan / Pembayaran / Data orang lain / Belajar

**Petunjuk:** Coba sedikitnya 2 kasus. Sudah dicoba: {jumlah}. Sisanya boleh dibaca sebagai tambahan.

**Transisi sebelum melanjutkan:**

Sebagai penutup, kita kembali ke masalah yang sering muncul: sebuah angka terdengar cocok untuk dipakai, tetapi sumbernya tidak ada. Apa yang seharusnya dilakukan?

**Tombol menuju bagian berikutnya:** Cek pemahaman pelajaran 3 →

### 3.check — Cek pemahaman pelajaran 3

**Header:** Berpikir di Era AI · 10/10

**Label:** CEK PEMAHAMAN

**Materi yang tampil:**

AI memberi statistik yang cocok untuk proposal, tetapi tidak menyertakan sumber. Apa langkah berikutnya?

#### Aktivitas 1 — Apa langkah berikutnya saat statistik tidak disertai sumber?

**Bentuk interaksi:** pilihan tunggal.

**Pilihan/tombol yang tersedia:**

1. Cari sumber asli, lalu periksa tahun, kelompok yang diteliti, dan isi klaimnya.
2. Tanya dua AI lain dan pakai angkanya kalau jawaban mereka serupa.
3. Jadikan dasar proposal sambil menulis ‘perlu diverifikasi’.

**Pilihan/urutan acuan:** Cari sumber asli, lalu periksa tahun, kelompok yang diteliti, dan isi klaimnya.

**Pembahasan umum:**

Sumber asli membantu kamu memastikan apa yang diukur. Jawaban yang serupa dari beberapa AI atau catatan ‘perlu diverifikasi’ belum menjawab pertanyaan itu. Kalau sumbernya tidak ditemukan, jangan jadikan angka tersebut dasar kesimpulan. Cari informasi lain yang bisa diperiksa.

**Tombol menuju bagian berikutnya:** Selesaikan materi →

## 4. Halaman selesai

**Label:** DASAR AI · SELESAI

**Judul:** Sekarang, coba untuk tugasmu sendiri

Kamu sudah melihat apa saja yang bisa dilakukan AI, bagaimana beberapa sistem bekerja, dan mengapa hasilnya tetap perlu diperiksa. Saat memakainya untuk tugasmu sendiri, mulai dari kebutuhan yang jelas. Tentukan bagian yang ingin dibantu, cek hal yang penting, lalu putuskan apa yang benar-benar layak dipakai.

Kalau ada bagian yang masih terasa belum jelas, kamu bisa kembali ke contoh atau membuka glosarium. Setelah itu, coba bawa pola yang sama ke satu situasi baru di bawah ini.

**Tombol/tautan:**

- Kembali ke daftar materi
- Lihat ringkasan tiga pelajaran
- Coba situasi baru · opsional

### Ringkasan tiga pelajaran

**AI Hari Ini**

AI mengerjakan tugas yang berbeda. Baca capaian sesuai pengujiannya, dan pilih bukti yang sesuai sebelum memakai hasil.

**Sebenarnya, Apa Itu AI?**

Aturan, pelatihan dari data, dan pemakaian model merupakan proses yang berbeda. Deep learning adalah bagian dari machine learning; generatif menjelaskan kemampuan membuat konten.

**Berpikir di Era AI**

Tentukan kebutuhan, gunakan bantuan, cek hal penting, lalu putuskan. Pahami hasil dan libatkan pihak yang berwenang.

**Panel:** Buka kembali bagian pelajaran

- 1.1 · AI di kegiatan sehari-hari
- 1.2 · Capaian AI: apa yang bisa kita simpulkan?
- 1.3 · Membaca manfaat AI dalam pemeriksaan medis
- 1.4 · AI bisa menerima lebih dari teks
- 1.5 · Saat AI membantu menentukan gerakan
- 1.6 · Chatbot, agent, dan tindakan yang bisa diperiksa
- 1.7 · Bukti transfer yang terlihat meyakinkan
- 1.8 · Konten buatan dan orang di dalamnya
- 1.9 · Data apa yang perlu dikirim?
- 1.10 · Jawaban yang rapi masih bisa keliru
- 1.11 · Fitur otomatis bekerja dengan cara apa?
- 1.check · Cek pemahaman pelajaran 1
- 2.1 · Mulai dari aturan sederhana
- 2.2 · Ketika contoh lebih membantu daripada daftar aturan
- 2.3 · Dari data sampai prediksi
- 2.4 · Tiga cara model belajar
- 2.5 · Mengenal deep learning tanpa rumus dulu
- 2.6 · Mengenali, memilih, dan membuat konten
- 2.7 · Kalimatnya lancar, apakah isinya benar?
- 2.8 · “Sudah saya kerjakan” perlu diperiksa
- 2.9 · Merangkai istilah yang sudah dipelajari
- 2.check · Cek pemahaman pelajaran 2
- 3.1 · Lihat tugasnya satu per satu
- 3.2 · Apa arti pekerjaan “terpapar AI”?
- 3.3 · Mulai dari kebutuhan yang kamu punya
- 3.4 · Saat saran AI terdengar meyakinkan
- 3.5 · Lima kemampuan yang tetap kamu perlukan
- 3.6 · Tetap ikut memikirkan jawabannya
- 3.7 · Tentukan, gunakan, cek, putuskan
- 3.8 · Pahami dulu sebelum memakai hasilnya
- 3.9 · Sesuaikan pemeriksaan dengan klaimnya
- 3.check · Cek pemahaman pelajaran 3

## 5. Latihan penutup opsional

**Judul:** Pengumuman beasiswa · latihan opsional

Komunitasmu ingin membuat pengumuman beasiswa dari satu dokumen resmi. Draf AI menambahkan tanggal penutupan, angka peluang diterima, dan tautan pendaftaran. Ketiganya tidak ada di dokumen.

**DOKUMEN FIKTIF · SIMULASI**

Program: Beasiswa Komunitas Contoh.

Persyaratan dasar: peserta aktif dalam kegiatan komunitas dan mengirim surat motivasi.

Kontak penyelenggara: panitia@example.invalid (alamat ilustrasi, bukan kontak nyata).

**DRAF AI · SIMULASI**

Pendaftaran ditutup 30 November. Peluang diterima 80%. Daftar di https://beasiswa-contoh.example.invalid. Ketiga tambahan ini dibuat untuk latihan.

#### Aktivitas 1 — Tandai informasi yang ditambahkan tanpa dasar dari dokumen.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Nama program
2. Tanggal penutupan
3. Angka peluang diterima
4. Tautan pendaftaran
5. Kontak penyelenggara

**Pilihan/urutan acuan:** Tanggal penutupan; Angka peluang diterima; Tautan pendaftaran

**Pembahasan setiap pilihan/kartu:**

**Nama program**

Nama program ada dalam dokumen latihan.

**Tanggal penutupan**

Tanggal penutupan tidak ada di dokumen.

**Angka peluang diterima**

Angka peluang diterima tidak ada di dokumen.

**Tautan pendaftaran**

Tautan pendaftaran tidak ada di dokumen. Tautan yang dibuat AI belum bisa dianggap sebagai sumber resmi.

**Kontak penyelenggara**

Kontak penyelenggara ada dalam dokumen latihan.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 3, maksimal 3.

#### Aktivitas 2 — Pilih langkah berikutnya. Boleh memilih lebih dari satu tindakan yang membantu.

**Bentuk interaksi:** pilihan jamak.

**Pilihan/tombol yang tersedia:**

1. Hubungi penyelenggara lewat kontak resmi
2. Cari halaman resmi program
3. Hapus klaim sampai ada sumber yang sesuai

**Pembahasan setiap pilihan/kartu:**

**Hubungi penyelenggara lewat kontak resmi**

Cocokkan kontak dengan penyelenggara program yang dimaksud.

**Cari halaman resmi program**

Pastikan halaman tersebut benar-benar milik program yang dimaksud.

**Hapus klaim sampai ada sumber yang sesuai**

Informasi tanpa sumber belum bisa diumumkan sebagai fakta.

**Pembahasan umum:**

Ketiga tambahan perlu diperiksa. Kontak dan halaman resmi juga perlu dicocokkan dengan program yang dimaksud.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

**Jumlah pilihan sebelum pemeriksaan:** minimal 1.

#### Aktivitas 3 — Saya akan … karena ….

**Bentuk interaksi:** catatan/checklist pribadi.

Boleh lanjut tanpa menulis atau mengisi checklist.

#### Aktivitas 4 — Pemeriksaan mandiri. Tanda centang adalah catatanmu sendiri, bukan penilaian aplikasi.

**Bentuk interaksi:** catatan/checklist pribadi.

**Pilihan/tombol yang tersedia:**

1. Saya tahu bagian tugas yang dibantu AI.
2. Saya bisa membedakan isi dokumen dari tambahan dalam draf.
3. Saya memilih pemeriksaan yang sesuai dengan klaimnya.
4. Saya tahu informasi mana yang belum bisa diumumkan sebagai fakta.

**Tombol pemeriksaan/pembuka:** Lihat pembahasannya

Boleh lanjut tanpa menulis atau mengisi checklist.

**Navigasi:** ← Kembali / Langkah berikutnya → / Selesai meninjau

## 6. Jeda, mulai ulang, pemuatan, dan pesan penyimpanan

### Pemuatan

Menyiapkan materi…

### Jeda

**Label:** DASAR AI · JEDA

**Judul:** Mau melanjutkan belajar?

**Posisi terakhir:** Terakhir: {nama pelajaran} · {posisi layar}/{jumlah layar pelajaran}, aktivitas {nomor aktivitas}/{jumlah aktivitas bagian}.

**Jika materi sudah selesai:** Kamu sudah menyelesaikan tiga pelajaran. Ringkasan dan latihan tambahan masih bisa dibuka.

**Tombol:** Mulai dari awal / Lanjutkan

### Konfirmasi mulai ulang

**Judul:** Mulai dari awal?

Progres, pilihan, urutan kartu, dan catatan AI Fundamentals akan dikosongkan. Progres Prompt Engineering tetap tersimpan.

**Tombol:** Batal / Hapus progres dan mulai ulang

### Pesan progres

- Progres dan catatan disimpan di browser ini saat kamu mulai belajar.
- Progres tersimpan di browser ini. Progres lokal belum tentu ikut saat berpindah browser atau perangkat.
- Progres belum tersimpan di browser ini. Kamu masih bisa melanjutkan selama halaman tetap terbuka.

### Keterangan simulasi pada halaman

Contoh latihan, dokumen, transaksi, dan percakapan adalah simulasi. Tidak ada bahan atau catatan pribadi yang dikirim ke layanan AI.

## 7. Glosarium lengkap

**Judul panel:** Glosarium · buka saat diperlukan

### AI

Bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten.

### Otomatisasi

Proses yang berjalan tanpa terus-menerus dioperasikan.

### Aturan

Ketentuan yang menentukan apa yang dilakukan sistem saat suatu kondisi terpenuhi.

### Machine learning

Pendekatan yang menyesuaikan model dari contoh data selama pelatihan.

### Model

Susunan perhitungan yang mengolah input menjadi hasil. Dalam machine learning, parameternya disesuaikan saat pelatihan.

### Data

Informasi yang dipakai untuk melatih, menguji, atau menggunakan sistem.

### Input / output

Informasi yang masuk ke sistem / hasil yang diberikan sistem.

### Training

Proses menyesuaikan model menggunakan data atau pengalaman yang disiapkan untuk pelatihan.

### Inferensi

Pemakaian model untuk memproses input dan memberikan hasil.

### Label

Target atau kategori yang diberikan pada contoh latihan.

### Prediksi

Perkiraan model dari input dan pola yang sudah dipelajari.

### Generalisasi

Kemampuan memakai pola yang dipelajari pada data baru.

### Supervised learning

Pelatihan dari contoh yang sudah memiliki target atau label.

### Unsupervised learning

Pendekatan untuk mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel.

### Reinforcement learning

Pembelajaran tindakan melalui umpan balik yang berkaitan dengan tujuan.

### Deep learning

Jenis machine learning yang memakai jaringan saraf buatan dengan banyak lapisan.

### AI generatif

AI yang menghasilkan konten, misalnya teks, gambar, suara, atau kode.

### Model bahasa

Model yang memproses atau menghasilkan bahasa.

### Prompt

Permintaan atau instruksi yang diberikan kepada AI.

### Token

Potongan yang diproses model, misalnya bagian kata atau tanda baca.

### Multimodal

Kemampuan memproses beberapa jenis informasi, misalnya teks dan gambar.

### Benchmark

Tugas atau kumpulan soal yang dipakai untuk mengukur kemampuan tertentu.

### Simulasi

Lingkungan, keadaan, atau hasil buatan yang dipakai untuk mencoba dan mempelajari sesuatu.

### World model

Model yang memperkirakan perubahan lingkungan, termasuk akibat suatu tindakan.

### Agent

Sistem yang memakai alat dan menjalankan langkah untuk mencapai tujuan.

### Tool

Alat yang bisa dipakai sistem, misalnya pencarian, pembaca file, atau terminal.

### Konten sintetis

Konten yang dibuat atau dimanipulasi secara buatan.

### Deepfake

Konten manipulasi yang meniru wajah atau suara seseorang.

### Halusinasi AI

Informasi keliru atau dibuat-buat yang disampaikan seolah-olah benar.

### Sitasi

Rujukan yang menunjukkan asal informasi.

### Verifikasi

Pemeriksaan klaim menggunakan bukti yang sesuai.

### Automation bias

Kecenderungan terlalu mengandalkan saran sistem otomatis.

### Paparan pekerjaan

Potensi tugas dalam pekerjaan untuk dipengaruhi AI menurut ukuran penelitian. Angkanya belum menunjukkan kepastian kehilangan pekerjaan.

### Radiolog

Dokter yang membaca dan menafsirkan gambar medis.

### Mammogram

Gambar yang dihasilkan dalam pemeriksaan mammografi.

### Protein

Molekul yang tersusun dari asam amino dan menjalankan berbagai fungsi dalam sel.

### Struktur protein

Bentuk tiga dimensi protein yang membantu peneliti memahami cara kerjanya.

## 8. Seluruh sumber pembelajaran

- [DeepMind — capaian IMO 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)
- [Nobel Prize — John Jumper dan AlphaFold2](https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/)
- [Nature Medicine — AI-based triage and decision support, 2026](https://www.nature.com/articles/s41591-026-04277-x)
- [PubMed — ringkasan studi mammografi yang sama](https://pubmed.ncbi.nlm.nih.gov/41857202/)
- [Tesla — FSD Supervised](https://www.tesla.com/support/fsd)
- [Disney Research — robot Olaf](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/)
- [FAA — TCAS II](https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html)
- [OJK — bukti transfer palsu](https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx)
- [OJK — penipuan suara dan wajah](https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx)
- [OpenAI — Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)
- [Google — Gemini Privacy Hub](https://support.google.com/gemini/answer/13594961)
- [Google — What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google — Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting)
- [ILO — pasar kerja ASEAN](https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited)
- [ILO — rincian ASEAN dan Indonesia](https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets)
- [Stanford Digital Economy Lab — pekerja muda, Agustus 2026](https://digitaleconomy.stanford.edu/news/canariesaug26/)
- [Komdigi — lima lapisan AI](https://portal.komdigi.go.id/kanal-publik/berita-kini/10477)
- [Nature Medicine — explainable AI dan diagnosis kulit](https://www.nature.com/articles/s41591-026-04553-w)
- [OECD — AI and skills](https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html)
- [Generative AI at Work — paper](https://arxiv.org/abs/2304.11771)
- [Microsoft Research — AI dan berpikir kritis](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)

Tautan sumber membuka tab baru. Label aksesibilitasnya: **{judul sumber} (tab baru)**.

## 9. Inventaris tambahan teks antarmuka dan aksesibilitas

Bagian ini mencatat fragmen teks statis dan pola dinamis yang ada langsung dalam JSX, termasuk label kontrol dan teks pembaca layar. Sebagian sudah dicatat utuh pada bagian sebelumnya. Fragmen bertanda pola memperlihatkan bagian yang diisi oleh kode saat ditampilkan; ini bukan materi tambahan untuk peserta.

**Pola dinamis:**

`${fundamentalsSources[i].label} (tab baru)`

Glosarium · buka saat diperlukan

4px 0 18px

**Pola dinamis:**

`${dog ? "Anjing" : "Kucing"} ilustrasi, ${side ? "dari samping" : "dari depan"}, ${dark ? "cahaya redup" : "cahaya terang"}`

Anjing

Kucing

dari samping

dari depan

cahaya redup

cahaya terang

#304853

#eef5f2

#bb9369

#879e91

M77 36 L77 14 L94 27 M97 27 L112 14 L116 37

M49 36 L48 14 L67 27 M73 27 L91 14 L92 37

M113 55 L126 60 L113 65

M66 57 L74 57 L70 63 Z

Ilustrasi variasi data · tidak melatih model sungguhan

Kumpulan A · terang, dari depan

Kumpulan B · cahaya, sudut, dan latar beragam

Buka foto uji · ilustrasi

Hewan terlihat dari samping dalam cahaya redup.

Jarak ke aturan ke alarm

Jarak:

pilih jarak di bawah

 cm

Aturan: jarak kurang dari 30 cm

Alarm:

belum dicoba

Menyala

Tidak menyala

Input ↓

Lapisan model ↓

Output

AI

↳ Machine learning

↳ Deep learning

Generatif: kemampuan membuat konten, dapat beririsan dengan pendekatan di atas.

Paparan AI generatif pada pekerja Indonesia · ILO, 2026

Usia 15–24 tahun:

26,1%

Kelompok dewasa:

21,1%

Ukuran: potensi tugas untuk dipengaruhi AI, bukan kepastian kehilangan pekerjaan. Panjang batang memakai skala yang sama, 0–30%.

POSTER FIKTIF · SIMULASI

Figur rekaan, bukan foto orang nyata

Pengumuman Komunitas

Figur ini ditampilkan sebagai pihak yang mendukung pengumuman. Sumber dan izin penggunaan identitas belum diketahui.

TRANSAKSI FIKTIF · SIMULASI

Tagihan tiket: Rp150.000 · Pembeli Contoh · 3 Oktober, 10.15

Gambar dari pembeli: “Transfer berhasil”

Pembeli Contoh → Penjual Contoh · Rp150.000 · 3 Oktober, 10.15

Referensi dari pembeli: CONTOH-001. Nomor ini belum dicocokkan dengan transaksi penerima.

Riwayat rekening penerima

Pengirim: Pembeli Contoh

Nominal: Rp150.000

Waktu: 3 Oktober, 10.15

Status: Masuk / berhasil

Referensi: CONTOH-001

Dokumen acara · simulasi

JADWAL FIKTIF · SIMULASI

Sabtu, pukul 10.00

DRAF PROPOSAL · SIMULASI

“78% Gen Z menyukai merek yang mendukung keberlanjutan.”

Angka ini dibuat untuk latihan, tanpa sumber, dan bukan statistik nyata.

Aktivitas

Beban pembacaan

−63,6%

Deteksi

+15,2%

Pemeriksaan lanjutan

+14,8%

?

Perkiraan kenaikan relatif (0–40%)

Kurangi perkiraan satu persen

Tambah perkiraan satu persen

Lihat hasil studi

Lihat tanpa menebak

Pilih satu jawaban

**Pola dinamis:**

`Pilih ${task.min} bagian`

Boleh pilih lebih dari satu

Lihat pembahasannya

Buka sedikitnya

bagian. Terbuka:

✓

**Pola dinamis:**

`${direction < 0 ? "Naikkan" : "Turunkan"}: ${options[item]}`

Naikkan

Turunkan

↑ Naik

↓ Turun

Buka penjelasan

Pemeriksaan mandiri · boleh dicentang atau dilewati

Pilih satu kategori

Kategori · boleh dipilih atau dilewati

Catatan pribadi · opsional

Tulisanmu tidak diberi skor atau dinilai otomatis. Kalau tidak ingin menulis, kamu tetap bisa lanjut.

Contoh yang bisa dibuka

Lihat catatanmu

Pembahasan tersedia di bawah aktivitas

**Pola dinamis:**

`: ${options[selected[0]]}`

**Pola dinamis:**

`: ${options[answer.active]}`

Pembahasan

Di contoh ini, pilihan yang dibahas:

Kalau ingin membandingkan, kamu bisa mencoba pilihan lain.

Pratinjau bahan · tidak dikirim

·

kamu pilih

tidak kamu pilih

Urutan contoh:

Kamu membuka hasil tanpa menebak.

Perkiraanmu berada dalam rentang ±4 poin persentase dari hasil studi.

Perkiraanmu berbeda lebih dari 4 poin persentase dari hasil studi.

Perkiraan ini bukan skor pemahaman.

← Kembali ke daftar materi

Menyiapkan materi…

Mulai dari awal?

Progres, pilihan, urutan kartu, dan catatan AI Fundamentals akan dikosongkan. Progres Prompt Engineering tetap tersimpan.

Batal

Hapus progres dan mulai ulang

DASAR AI · JEDA

Mau melanjutkan belajar?

Kamu sudah menyelesaikan tiga pelajaran. Ringkasan dan latihan tambahan masih bisa dibuka.

**Pola dinamis:**

`Terakhir: ${lessonNames[section.lesson - 1]} · ${position}/${lessonCount}, aktivitas ${session.phase + 1}/${tasks.length}.`

Mulai dari awal

Lanjutkan

KURSUS 01 · DASAR AI

Kenalan dengan AI, lalu coba pahami cara kerjanya

Lihat isi pelajaran

AI Hari Ini: apa yang sudah bisa dilakukan AI, dan bagaimana memeriksa hasilnya?

14–20 menit.

Sebenarnya, Apa Itu AI?: bagaimana aturan, data, dan model bekerja?

11–16 menit.

Berpikir di Era AI: bagaimana memakai bantuan AI dalam tugasmu sendiri?

13–18 menit.

Sekitar 39–56 menit untuk seluruh jalur utama. Ini masih perkiraan; kamu boleh menyelesaikan satu pelajaran dulu lalu melanjutkan nanti. Semua contoh latihan sudah disiapkan sebagai simulasi.

Mulai belajar

DASAR AI · SELESAI

Sekarang, coba untuk tugasmu sendiri

Kamu sudah melihat apa saja yang bisa dilakukan AI, bagaimana beberapa sistem bekerja, dan mengapa hasilnya tetap perlu diperiksa. Saat memakainya untuk tugasmu sendiri, mulai dari kebutuhan yang jelas. Tentukan bagian yang ingin dibantu, cek hal yang penting, lalu putuskan apa yang benar-benar layak dipakai.

Kalau ada bagian yang masih terasa belum jelas, kamu bisa kembali ke contoh atau membuka glosarium. Setelah itu, coba bawa pola yang sama ke satu situasi baru di bawah ini.

Kembali ke daftar materi

Lihat ringkasan tiga pelajaran

Coba situasi baru · opsional

AI Hari Ini

AI mengerjakan tugas yang berbeda. Baca capaian sesuai pengujiannya, dan pilih bukti yang sesuai sebelum memakai hasil.

Sebenarnya, Apa Itu AI?

Aturan, pelatihan dari data, dan pemakaian model merupakan proses yang berbeda. Deep learning adalah bagian dari machine learning; generatif menjelaskan kemampuan membuat konten.

Berpikir di Era AI

Tentukan kebutuhan, gunakan bantuan, cek hal penting, lalu putuskan. Pahami hasil dan libatkan pihak yang berwenang.

Buka kembali bagian pelajaran

Pengumuman beasiswa · latihan opsional

Komunitasmu ingin membuat pengumuman beasiswa dari satu dokumen resmi. Draf AI menambahkan tanggal penutupan, angka peluang diterima, dan tautan pendaftaran. Ketiganya tidak ada di dokumen.

DOKUMEN FIKTIF · SIMULASI

Program: Beasiswa Komunitas Contoh.

Persyaratan dasar: peserta aktif dalam kegiatan komunitas dan mengirim surat motivasi.

Kontak penyelenggara: panitia@example.invalid (alamat ilustrasi, bukan kontak nyata).

DRAF AI · SIMULASI

Pendaftaran ditutup 30 November. Peluang diterima 80%. Daftar di https://beasiswa-contoh.example.invalid. Ketiga tambahan ini dibuat untuk latihan.

← Kembali

Langkah berikutnya →

Selesai meninjau

Jeda dan lanjutkan nanti

Progres AI Fundamentals

CEK PEMAHAMAN

**Pola dinamis:**

`PELAJARAN ${section.lesson} · ${section.id}`

Perkiraan pelajaran ini:

. Kamu bisa berhenti sebentar dan lanjut lagi kapan saja.

Buka kembali penjelasan bagian ini

Capaian yang diuji: Gemini Deep Think menyelesaikan lima dari enam soal IMO 2025, dengan skor 35/42.

Capaian yang dibahas: AlphaFold2 membantu memprediksi struktur tiga dimensi protein dari urutan asam amino.

Ilustrasi struktur protein

Ilustrasi bentuk tiga dimensi protein, bukan hasil pengembangan obat

Ilustrasi struktur AlphaFold · CC0 menurut sumber materi.

Panduan kampus fiktif · simulasi

Mahasiswa diminta menyebutkan bantuan AI pada tugas dan tetap bertanggung jawab atas isi tugasnya. Panduan ini dibuat untuk latihan, bukan aturan seluruh kampus.

Buka kembali bukti yang kamu periksa

Jika riwayat penerima belum dibuka, bukti uang masuk belum kamu periksa. Kamu bisa kembali untuk membukanya.

Contoh yang tersedia

Tujuan proposal

Rincian biaya

Sumber angka

Janji sponsor

Evaluasi alat baru

Kutipan

Pembayaran

Data orang lain

Belajar

Memeriksa artikel

Menjalankan tes

Memperbaiki file

Coba sedikitnya

tindakan

kasus

. Sudah dicoba:

. Sisanya boleh dibaca sebagai tambahan.

Aktivitas

dari

Belum dipilih

Ubah keputusan

Coba lagi

Kalau penasaran

Langkah berikutnya →

Contoh latihan, dokumen, transaksi, dan percakapan adalah simulasi. Tidak ada bahan atau catatan pribadi yang dikirim ke layanan AI.

## 10. Sumber transkripsi

- `src/features/learn/ai-fundamentals-content.ts`
- `src/features/learn/ai-fundamentals-activities.ts`
- `src/features/learn/ai-fundamentals-pilot.tsx`

Tercatat: 32 layar pembelajaran, 81 aktivitas utama, 4 aktivitas penutup, 37 istilah, dan 21 sumber. Urutan acak kartu, seluruh kombinasi checklist, dan tulisan bebas tidak disalin satu per satu karena teksnya mengikuti opsi dan pola yang sudah dicatat.

