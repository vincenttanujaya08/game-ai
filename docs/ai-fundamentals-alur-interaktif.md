> Dokumen acuan dari pengguna. Implementasi pilot ditambahkan pada branch `feature/microlearning-yesman-pilot`. Keterangan “belum diterapkan” di dokumen asli adalah status saat dokumen disusun.

# AI Fundamentals — Materi dan Alur Belajar Interaktif

Versi bahasa: 3 Oktober 2026. Dokumen ini berisi materi dan panduan penerapan; perubahan belum diterapkan pada aplikasi.

Materi dibagi menjadi tiga pelajaran dengan 29 bagian. Setiap bagian menggabungkan penjelasan, contoh, dan aktivitas singkat. Di akhir tiap pelajaran ada satu cek pemahaman. Jadi, ada 32 layar pembelajaran, ditambah halaman pengantar dan halaman selesai. Penjelasan tambahan dibuka di layar yang sama.

Bagian “Yang tampil”, pertanyaan, pilihan jawaban, pembahasan yang dikutip, dan kalimat transisi adalah teks untuk peserta. Tujuan, waktu, jawaban acuan, serta aturan interaksi adalah catatan untuk penyusun dan pengembang. Jawaban acuan baru ditampilkan setelah peserta mencoba.

## 1. Arah materi

### Untuk siapa?

Materi ini ditujukan untuk orang yang baru mulai mengenal AI. Mereka mungkin sudah memakai chatbot, rekomendasi lagu, atau fitur edit foto, tetapi belum tahu cara kerjanya. Peserta tidak perlu bisa coding atau memahami matematika khusus.

### Apa yang dipelajari?

Setelah mengikuti materi, peserta diharapkan bisa:

1. Mengenali tugas yang dikerjakan AI dalam aplikasi sehari-hari.
2. Menjelaskan hubungan AI, machine learning, deep learning, dan AI generatif.
3. Membedakan proses melatih model dengan memakai model yang sudah dilatih.
4. Membaca capaian AI sambil memahami apa yang sudah dan belum dibuktikan.
5. Memilih cara memeriksa informasi, tindakan, dan data yang akan dibagikan.
6. Memakai bantuan AI untuk sebagian tugas sambil tetap memahami hasil dan mengambil keputusan sendiri.

Daftar ini menjadi pegangan saat menyusun aktivitas. Menyelesaikan materi belum tentu berarti peserta langsung menguasai semuanya.

### Waktu belajar

| Bagian | Perkiraan waktu | Fokus |
| --- | --- | --- |
| Pengantar | 1–2 menit | Mengenal tujuan dan cara belajar |
| Pelajaran 1: AI Hari Ini | 14–20 menit | Melihat kemampuan AI dan memeriksa hasilnya |
| Pelajaran 2: Sebenarnya, Apa Itu AI? | 11–16 menit | Memahami aturan, data, dan model |
| Pelajaran 3: Berpikir di Era AI | 13–18 menit | Memakai bantuan AI dan menilai saran |
| Seluruh jalur utama | 39–56 menit | Termasuk pengantar dan cek pemahaman |

Waktu ini masih perkiraan dan perlu disesuaikan setelah uji peserta. Membuka bacaan tambahan atau menulis refleksi bisa membuat sesi lebih panjang. Peserta boleh menyelesaikan satu pelajaran dulu, lalu melanjutkan sisanya nanti. Durasi tiap pelajaran mengikuti isi materinya; target 8–10 menit pada materi prompt engineering tidak dipakai untuk seluruh kelas ini.

## 2. Pola layar dan interaksi

Biasanya layar dimulai dari situasi singkat, dilanjutkan penjelasan, aktivitas, dan pembahasan. Pada beberapa bagian, peserta diminta membuat perkiraan dulu sebelum melihat hasil. Penjelasan yang dibutuhkan untuk menjawab tetap tersedia, sementara jawaban latihan baru dibuka setelah mencoba.

- Bahas satu gagasan utama di setiap layar.
- Letakkan informasi yang dibutuhkan dekat dengan pertanyaannya.
- Usahakan penjelasan inti sekitar 40–90 kata. Pakai dua paragraf jika itu lebih mudah dibaca.
- Simpan rincian penelitian dan istilah tambahan dalam panel “Kalau penasaran”.
- Biarkan peserta menekan tombol untuk lanjut. Layar tidak berpindah sendiri setelah jawaban dipilih.
- Saat pilihan kurang tepat, jelaskan alasannya dan beri kesempatan mencoba lagi.
- Peserta tidak harus hafal semua istilah untuk melanjutkan.
- Pilih bentuk aktivitas yang membantu menjelaskan konsepnya. Tidak semua bagian perlu memakai pilihan ganda.

Contoh jawaban AI, transaksi, dokumen kampus, prediksi, dan percakapan dalam materi ini sudah disiapkan sebagai simulasi. Aktivitas tidak membutuhkan API AI, dokumen pribadi, atau akses ke rekening peserta.

## 3. Halaman pengantar

Label: `KURSUS 01 · DASAR AI`

Judul: `Kenalan dengan AI, lalu coba pahami cara kerjanya`

### Yang tampil

Kamu mungkin sudah bertemu AI saat membuka email, memilih lagu, atau meminta bantuan menulis. Tapi, apa sebenarnya yang dikerjakan sistem di balik fitur-fitur itu?

Di sini, kita akan melihat beberapa contohnya, mempelajari dasar cara kerja AI, lalu mencoba menilai jawaban dan sarannya. Kamu tidak perlu bisa coding. Cukup ikuti contoh, coba aktivitasnya, dan baca pembahasannya. Kalau ingin tahu lebih jauh, buka bagian “Kalau penasaran”.

### Peta pelajaran

1. AI Hari Ini: apa yang sudah bisa dilakukan AI, dan bagaimana memeriksa hasilnya?
2. Sebenarnya, Apa Itu AI?: bagaimana aturan, data, dan model bekerja?
3. Berpikir di Era AI: bagaimana memakai bantuan AI dalam tugasmu sendiri?

Tombol utama: `Mulai belajar`

Tombol sekunder: `Lihat isi pelajaran`

Catatan pengembang: semua contoh latihan sudah disiapkan. Refleksi diperiksa oleh peserta sendiri; sistem tidak menilai makna tulisannya secara otomatis.

## 4. Pelajaran 1 — AI Hari Ini

Pertanyaan utama: `Apa yang bisa dilakukan AI, dan bagaimana kita menilai hasilnya?`

Pengantar: “Mulai dari yang dekat dulu: email, lagu, dan chatbot. Setelah itu, kita lihat contoh dari sains dan beberapa situasi ketika hasil AI perlu diperiksa lebih hati-hati.”

### 1.1 — AI di kegiatan sehari-hari

Waktu: 60–90 detik. Tujuan: mengenali beberapa tugas AI dalam aplikasi sehari-hari.

#### Yang tampil

Email mencurigakan masuk ke folder spam. Aplikasi musik menyarankan lagu yang mungkin kamu suka. Chatbot membantu menulis caption. Ketiganya memakai AI, tetapi tugasnya berbeda: mengelompokkan pesan, memberi rekomendasi, dan membuat teks.

AI adalah bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten. Jadi, AI yang kamu temui sehari-hari bisa punya bentuk selain chatbot.

#### Aktivitas — apa yang dikerjakan sistem?

Petunjuk untuk peserta: “Lihat contoh berikut, lalu pilih tugas yang dikerjakan sistem.”

Tampilkan tiga contoh bergantian. Pilihan: `Mengelompokkan`, `Merekomendasikan`, dan `Menghasilkan konten`.

| Contoh | Jawaban acuan | Pembahasan |
| --- | --- | --- |
| Email dipisahkan menjadi spam dan bukan spam. | Mengelompokkan | Pesan diberi kategori agar email yang mencurigakan bisa dipisahkan. |
| Aplikasi memilih lagu yang mungkin kamu suka. | Merekomendasikan | Aplikasi memilih lagu dari koleksi yang tersedia berdasarkan perkiraan seleramu. |
| Chatbot menulis caption baru. | Menghasilkan konten | Chatbot menyusun teks dari permintaan yang kamu berikan. |

Catatan pengembang: ketiga contoh perlu dicoba. Peserta boleh membuka contoh sebelumnya atau lanjut setelah membaca pembahasan, meskipun jawabannya belum tepat.

Kalau penasaran: satu aplikasi bisa mengerjakan beberapa tugas sekaligus. Aplikasi musik, misalnya, bisa merekomendasikan lagu dan membuat teks penjelasan tentang playlist. Untuk mengenalinya, lihat fitur yang sedang dipakai.

Penghubung: “Contoh tadi mungkin sudah sering kamu pakai. Di bidang sains, AI juga mulai membantu tugas yang jauh lebih khusus.”

Tombol: `Lihat contoh dari sains →`

### 1.2 — Capaian AI: apa yang bisa kita simpulkan?

Waktu: 75–105 detik. Tujuan: membaca capaian AI tanpa memperluas kesimpulan melebihi hasil pengujiannya.

#### Yang tampil

Pada IMO 2025, versi khusus Gemini Deep Think dilaporkan berhasil menyelesaikan lima dari enam soal. Skornya 35 dari 42 poin, setara standar medali emas. Itu capaian besar pada soal dan kondisi pengujian tersebut.

Di biologi, AlphaFold2 membantu memprediksi bentuk tiga dimensi protein dari urutan asam amino. Pengembangannya membawa Demis Hassabis dan John Jumper menerima separuh Nobel Kimia 2024. Prediksi ini membantu penelitian, sementara pengembangan dan pengujian obat masih membutuhkan proses lanjutan.

#### Aktivitas — sejauh mana contoh ini menjawab?

Petunjuk: “Buka kartu capaian, lalu lihat kesimpulannya. Apakah contoh tadi sudah mendukung kesimpulan itu?”

Pilihan: `Sudah didukung` atau `Perlu bukti lain`.

| Kesimpulan | Jawaban acuan | Pembahasan |
| --- | --- | --- |
| Model tersebut berhasil pada sebagian besar soal IMO yang diuji. | Sudah didukung | Lima dari enam soal berhasil diselesaikan dalam pengujian itu. |
| Model tersebut selalu benar untuk semua soal matematika. | Perlu bukti lain | Hasil pada enam soal belum memberi jawaban untuk semua soal matematika. |
| AlphaFold2 membantu mempelajari struktur protein. | Sudah didukung | Prediksi struktur protein memang menjadi kemampuan yang ditunjukkan pada contoh ini. |
| AlphaFold2 langsung menyembuhkan penyakit. | Perlu bukti lain | Mengetahui bentuk protein dapat membantu riset, tetapi pengobatan masih perlu dikembangkan dan diuji. |

Catatan pengembang: peserta mencoba dua pernyataan pada masing-masing kartu. Pembahasan muncul setelah pilihan dibuat.

Kalau penasaran: benchmark adalah tugas atau kumpulan soal untuk mengukur kemampuan tertentu. Hasilnya perlu dibaca bersama model, alat, kondisi, dan cara penilaiannya. Protein sendiri adalah molekul yang menjalankan berbagai fungsi dalam sel; bentuknya membantu peneliti memahami cara kerjanya.

Penghubung: “Batas kesimpulan seperti ini juga penting saat membaca penelitian tentang AI di bidang kesehatan.”

Tombol: `Coba membaca hasil penelitian →`

### 1.3 — Membaca manfaat AI dalam pemeriksaan medis

Waktu: 90–120 detik. Tujuan: mempertimbangkan beberapa ukuran hasil penelitian sekaligus.

#### Yang tampil

Mammogram adalah gambar dari pemeriksaan payudara. Radiolog, yaitu dokter yang membaca gambar medis, dapat memakai AI untuk membantu pemeriksaan.

Dalam studi yang melibatkan 31.301 perempuan, strategi AI yang diuji mengurangi beban pembacaan radiolog sebesar 63,6%. Tingkat deteksi kanker meningkat 15,2% dibanding strategi standar. Namun, lebih banyak orang juga dipanggil untuk pemeriksaan lanjutan. Ketiga hasil ini perlu dibaca bersama.

#### Aktivitas — ada satu hasil yang belum dibuka

Tampilkan tiga kartu: `Beban pembacaan −63,6%`, `Deteksi +15,2%`, dan `Pemeriksaan lanjutan ?`.

Pertanyaan: “Kira-kira, berapa kenaikan tingkat panggilan untuk pemeriksaan lanjutan?”

Sediakan isian 0–40%, tombol tambah/kurang, dan slider opsional. Tombol: `Lihat hasil studi`. Peserta juga boleh memilih `Lihat tanpa menebak`.

Jawaban acuan: 14,8%. Rentang ±4 poin persentase dari sumber dipakai untuk menanggapi perkiraan peserta, bukan untuk menilai pemahaman. Isian awal kosong; posisi awal slider belum dihitung sebagai jawaban.

Pembahasan untuk semua perkiraan:

> Tingkat panggilan untuk pemeriksaan lanjutan naik 14,8% secara relatif. Orang yang dipanggil kembali belum tentu didiagnosis kanker; mereka perlu diperiksa lebih lanjut. Jadi, strategi ini membantu deteksi dan mengurangi beban pembacaan, tetapi juga menambah pemeriksaan lanjutan. Kalau hanya melihat satu angka, ada bagian hasil yang terlewat.

Pertanyaan lanjutan: “Dari tiga hasil tadi, pilih dua yang ingin kamu lihat lebih dekat.”

Setiap pilihan membuka penjelasan tentang apa yang diukur. Semua ukuran penting untuk alasan yang berbeda, sehingga tidak ada satu pasangan wajib.

Kalau penasaran: kenaikan relatif 14,8% berbeda dari kenaikan 14,8 poin persentase. Studi melaporkan perbedaan absolut tingkat panggilan sekitar 0,7 poin persentase. Hasil ini berlaku pada populasi, sistem, dan alur yang diteliti. Rumah sakit dengan kondisi berbeda bisa memperoleh hasil berbeda pula.

Penghubung: “Di contoh tadi, AI membaca gambar. Pada sistem lain, masukan yang diproses bisa berupa suara, video, atau beberapa jenis informasi sekaligus.”

Tombol: `Kenali jenis input AI →`

### 1.4 — AI bisa menerima lebih dari teks

Waktu: 60–90 detik. Tujuan: memilih masukan yang sesuai dengan tugas.

#### Yang tampil

Informasi yang masuk ke sistem disebut input. Hasil yang diberikan disebut output. Sistem multimodal bisa memproses beberapa jenis input, misalnya teks dan gambar.

Kalau ingin membahas pesan error, kamu bisa mengirim teksnya atau tangkapan layar. Untuk menuliskan isi rapat, rekaman suara lebih membantu. Jenis input yang tepat memudahkan tugas, meskipun sistem masih bisa melewatkan detail atau salah membaca.

#### Aktivitas — bahan mana yang membantu?

Petunjuk: “Pilih bahan yang akan kamu berikan. Setelah itu, lihat informasi apa yang bisa diperoleh dari tiap bahan.”

Tampilkan dua situasi bergantian. Peserta menambahkan bahan lewat tombol; tidak ada unggahan file asli.

| Situasi | Bahan yang bisa dipilih | Pembahasan |
| --- | --- | --- |
| Kamu ingin memahami pesan error di laptop. | Teks error; tangkapan layar; foto bagian belakang laptop. | Teks atau tangkapan layar memperlihatkan pesan errornya. Foto bagian belakang laptop mungkin membantu untuk masalah perangkat tertentu, tetapi belum menjelaskan pesan yang sedang dibahas. |
| Kamu ingin menuliskan ucapan dalam rapat. | Rekaman suara; foto ruang rapat; agenda tertulis. | Rekaman memuat percakapannya. Agenda memberi gambaran topik, tetapi tidak memuat semua yang diucapkan. Foto ruangan juga tidak memberi isi percakapan. |

Catatan pengembang: tiap bahan membuka penjelasannya sendiri. Peserta boleh memilih lebih dari satu bahan yang membantu.

Kalau penasaran: modalitas berarti jenis informasi. Gambar buram, suara yang tidak jelas, tulisan kecil, atau halaman yang hilang bisa membuat hasil kurang tepat. Sebelum mengirim bahan, pastikan juga isinya boleh dibagikan. Kita akan membahas hal itu setelah beberapa contoh berikut.

Penghubung: “Pada chatbot, hasilnya muncul di layar. Pada robot, informasi yang diproses bisa menentukan gerakan di dunia nyata.”

Tombol: `Lihat AI pada robot →`

### 1.5 — Saat AI membantu menentukan gerakan

Waktu: 75–105 detik. Tujuan: memahami peran sensor, simulasi, dan pengawasan dalam pengujian robot.

#### Yang tampil

Robot memakai sensor untuk membaca keadaan di sekitarnya, lalu menentukan gerakan. Karena bergerak di dunia nyata, kesalahan bisa berdampak pada orang atau benda di dekatnya.

Dalam proyek robot Olaf dari Disney Research, gerakan dicoba berulang kali lewat simulasi sebelum diterapkan pada robot sungguhan. Gerakannya perlu terlihat sesuai karakter sekaligus memperhitungkan keseimbangan, bunyi langkah, dan panas motor.

#### Aktivitas — bagaimana gerakannya diuji?

Petunjuk: “Susun empat langkah berikut menjadi gambaran alur pengujian.”

Kartu: `Amati kondisi dengan sensor`, `Perkirakan akibat tindakan`, `Uji gerakan di simulasi`, dan `Awasi keamanan di dunia nyata`.

Gunakan tombol `Naik` dan `Turun` untuk mengubah urutan. Tombol pemeriksaan: `Lihat pembahasannya`.

Jawaban acuan: Amati → Perkirakan → Uji → Awasi.

Pembahasan:

> Sensor membantu robot membaca kondisi. Perkiraan akibat tindakan memberi gambaran tentang apa yang mungkin terjadi, lalu simulasi menyediakan tempat untuk mencoba. Saat beralih ke pengujian nyata, manusia tetap memeriksa gerakan dan keamanannya. Alur ini adalah gambaran sederhana; setiap proyek robot bisa punya urutan pengujian yang berbeda.

Catatan pengembang: acak urutan awal sekali, lalu pertahankan jika peserta kembali. Drag boleh tersedia di desktop, tetapi aktivitas harus bisa diselesaikan dengan tombol.

Kalau penasaran: world model memperkirakan bagaimana lingkungan berubah, termasuk setelah suatu tindakan. Simulasi menyediakan lingkungan buatan untuk percobaan. Pada contoh kendaraan, Tesla menyebut Full Self-Driving sebagai sistem yang memerlukan pengawasan pengemudi. Untuk memahami sebuah fitur, baca penjelasan kemampuan dan syarat penggunaannya.

Penghubung: “AI juga bisa melakukan langkah di komputer, seperti membuka file dan menjalankan tes. Kita lihat bagaimana membedakannya dari sekadar memberi saran.”

Tombol: `Dari memberi saran ke mengerjakan →`

### 1.6 — Chatbot, agent, dan tindakan yang bisa diperiksa

Waktu: 75–105 detik. Tujuan: membedakan saran dengan tindakan yang dilakukan melalui alat.

#### Yang tampil

Chatbot bisa kamu ajak bertanya dan berdiskusi. Agent dapat memakai alat untuk mengerjakan langkah menuju tujuan, membaca hasilnya, lalu menentukan langkah berikutnya.

Dalam proyek coding, misalnya, sistem yang punya akses bisa membuka file, mencari penyebab tes gagal, mengubah kode sesuai izin, dan menjalankan tes. Apa yang bisa dikerjakannya bergantung pada alat dan akses yang tersedia saat itu.

#### Aktivitas — mana yang sudah dikerjakan?

Petunjuk: “Bandingkan dua riwayat ini. Mana yang menunjukkan bahwa pekerjaan sudah dilakukan?”

Tab A: “Coba buka file konfigurasi, perbaiki bagian itu, lalu jalankan tes.”

Tab B: “File konfigurasi dibuka → perubahan ditampilkan → tes dijalankan → hasil tes tercatat.”

Pilihan dan pembahasannya:

- `A saja`: “Riwayat A berisi saran. Kita belum melihat apakah langkahnya benar-benar dikerjakan.”
- `B saja`: “Riwayat B memuat tindakan dan hasil yang bisa kamu periksa, seperti perubahan file dan keluaran tes.”
- `Keduanya`: “Keduanya bisa membantu, tetapi A baru memberi saran. Pada contoh ini, catatan pekerjaan ada di B.”

Setelah memilih, tombol `Apa yang perlu dicek?` membuka perubahan file, hasil tes, dan kesesuaian tindakan dengan izin. Semua contoh sudah disiapkan; aktivitas tidak membuka terminal atau proyek asli.

Kalau penasaran: chatbot modern juga bisa memakai tool. Contoh ini membandingkan cara penggunaan, bukan membagi produk ke dua kelompok yang selalu terpisah. Agent dapat mengulang langkah merencanakan, bertindak, dan memeriksa. Akses untuk mengubah data atau mengirim pesan tetap perlu disesuaikan dengan tugasnya.

Penghubung: “Catatan tindakan membantu kita memastikan pekerjaan sudah dilakukan. Saat menerima pembayaran, ada catatan lain yang perlu kamu periksa.”

Tombol: `Coba periksa pembayaran →`

### 1.7 — Bukti transfer yang terlihat meyakinkan

Waktu: 60–90 detik. Tujuan: memilih catatan yang bisa memastikan pembayaran diterima.

#### Yang tampil

Kamu menjual tiket konser. Pembeli mengirim gambar bertuliskan “transfer berhasil”. Nama, nominal, dan waktunya terlihat cocok. Apakah tiketnya sudah bisa diserahkan?

Gambar seperti ini bisa diedit atau dibuat ulang. Untuk memastikan pembayaran diterima, lihat transaksi pada rekeningmu sendiri atau status pembayaran di layanan merchant yang kamu pakai.

#### Aktivitas — periksa sebelum menyerahkan tiket

Petunjuk: “Buka bukti yang ingin kamu periksa, lalu tentukan apakah pembayaran sudah bisa dipastikan.”

Kartu dan pembahasannya:

- `Tangkapan layar`: “Gambar ini menunjukkan klaim pembeli, tetapi belum memastikan uang masuk ke rekeningmu.”
- `Nomor referensi dari pembeli`: “Nomor ini bisa membantu penelusuran. Namun, informasinya masih berasal dari pembeli dan perlu dicocokkan.”
- `Riwayat rekening penerima`: tampilkan transaksi simulasi dengan pengirim, nominal, waktu, dan status yang sesuai. “Catatan di pihak penerima membantu memastikan uang masuk. Cocokkan detailnya dengan pembayaran yang sedang kamu tunggu.”

Pertanyaan: “Sekarang, apakah kamu sudah bisa menyerahkan tiket?”

Jawaban acuan: bisa setelah transaksi masuk dan detailnya cocok. Jika belum terlihat, tunda penyerahan dan periksa lewat layanan terkait.

Catatan pengembang: simulasi harus menampilkan transaksi yang sesuai, bukan hanya saldo bertambah. Label simulasi tetap terlihat.

Kalau penasaran: jika seseorang meminta uang lewat suara yang terdengar seperti temanmu, konfirmasi melalui jalur lain yang sudah kamu percaya. Tampilan rapi atau suara yang mirip saja belum memastikan siapa pengirimnya.

Penghubung: “Konten palsu juga bisa memakai identitas seseorang. Dampaknya dapat terasa bahkan ketika tidak ada uang yang berpindah.”

Tombol: `Lihat siapa yang terdampak →`

### 1.8 — Konten buatan dan orang di dalamnya

Waktu: 60–90 detik. Tujuan: mempertimbangkan sumber, izin, dan dampak sebelum menyebarkan konten.

#### Yang tampil

Konten sintetis adalah konten yang dibuat atau dimanipulasi secara buatan, termasuk dengan AI. Deepfake bisa meniru wajah atau suara seseorang. Teknologi ini bisa dipakai untuk karya kreatif, tetapi juga bisa membuat orang percaya pada kejadian yang tidak pernah terjadi.

Bayangkan fotomu dipakai dalam poster pengumuman yang tidak pernah kamu buat. Orang lain mungkin mengira kamu terlibat. Itu bisa memengaruhi reputasi, privasi, dan rasa amanmu.

#### Aktivitas — lihat posternya dari tiga sisi

Tampilkan poster fiktif dengan label simulasi. Petunjuk: “Buka sudut pandang berikut. Apa yang perlu dipikirkan sebelum poster ini dibagikan?”

- `Orang dalam foto`: “Apakah fotonya dipakai dengan izin?”
- `Penerima poster`: “Apakah jelas siapa yang membuat pengumuman ini?”
- `Pembuat poster`: “Apakah orang lain bisa mengira poster ini resmi?”

Pilihan tindakan dan pembahasannya:

- `Bagikan`: “Kita belum tahu apakah pengumumannya benar atau fotonya dipakai dengan izin. Membagikannya bisa membuat lebih banyak orang salah paham.”
- `Periksa pengumuman asli dulu`: “Ini membantu memastikan isi pengumuman. Setelah itu, lihat juga apakah penggunaan fotonya sudah mendapat izin.”
- `Tanya izin dan tujuan pemakaian foto`: “Ini membantu memastikan penggunaan identitas orang tersebut. Isi pengumumannya tetap perlu diperiksa.”

Catatan pengembang: peserta boleh menambahkan tindakan kedua. Pembahasan menunjukkan bahwa pemeriksaan isi dan izin penggunaan foto menjawab pertanyaan yang berbeda.

Penghubung: “Soal izin juga muncul saat kita mengirim dokumen atau foto ke layanan AI. Bahan apa yang sebenarnya perlu dibagikan?”

Tombol: `Siapkan bahan sebelum dikirim →`

### 1.9 — Data apa yang perlu dikirim?

Waktu: 75–105 detik. Tujuan: memilih data sesuai kebutuhan dan memeriksa izin membagikannya.

#### Yang tampil

Saat kamu mengirim prompt, PDF, foto, atau suara, bahan itu diterima oleh layanan AI. Sebelum mengirim, pikirkan apa yang dibutuhkan untuk tugasmu, apakah kamu boleh membagikannya, dan bagaimana layanan tersebut menangani data.

Untuk membuat ringkasan, mungkin cukup memakai beberapa bagian dokumen. Menghapus nama juga belum tentu menghilangkan identitas: alamat, tanggal, atau rincian kegiatan bisa tetap menunjukkan siapa orangnya.

#### Aktivitas — pilih isi dokumen yang dibutuhkan

Tugas: “Tolong ringkas tiga hambatan dalam pelaksanaan acara ini.”

Tampilkan dokumen fiktif berisi lima blok: hambatan, langkah perbaikan, nama peserta, nomor identitas, dan kontak pribadi.

Petunjuk: “Pilih bagian yang membantu membuat ringkasan, lalu lihat bahan yang sudah kamu siapkan.”

Tombol: `Lihat bahan yang akan dikirim`.

Jawaban acuan dan pembahasan:

- Hambatan: “Bagian ini memuat masalah yang perlu diringkas.”
- Langkah perbaikan: “Bagian ini memberi penjelasan tentang tindak lanjutnya.”
- Nama peserta, nomor identitas, dan kontak pribadi: “Rincian ini belum dibutuhkan untuk merangkum hambatan acara.”

Pratinjau tidak dikirim ke layanan mana pun. Setelah itu, tampil empat pertanyaan:

1. Apakah bahan ini diperlukan untuk tugasnya?
2. Apakah saya boleh membagikannya?
3. Layanan apa yang akan menerimanya?
4. Apakah saya sudah memahami penyimpanan dan penggunaan datanya?

Kalau penasaran: kebijakan bisa berbeda menurut layanan, jenis akun, dan pengaturan. Penyimpanan data, penggunaan untuk pelatihan, dan izin membagikan dokumen perlu diperiksa masing-masing. Mematikan penggunaan chat untuk training tidak otomatis memberi izin mengunggah dokumen rahasia.

Catatan pengembang: tautkan panduan resmi layanan yang berlaku. Jika menampilkan nama menu pengaturan, periksa kembali saat implementasi karena namanya bisa berubah.

Penghubung: “Bahan yang tepat membantu AI mengerjakan tugas. Namun, jawabannya masih bisa menambahkan informasi yang tidak ada di bahan itu.”

Tombol: `Cocokkan jawaban dengan sumber →`

### 1.10 — Jawaban yang rapi masih bisa keliru

Waktu: 90–120 detik. Tujuan: membedakan isi yang didukung sumber dari tambahan yang belum punya dasar.

#### Yang tampil

AI kadang memberikan informasi salah atau mengarang detail seolah-olah benar. Ini sering disebut halusinasi AI. Jawaban seperti itu bisa tetap terdengar lancar dan menyertakan sitasi, yaitu rujukan ke sumber. Rujukannya perlu dibuka untuk memastikan dokumennya ada dan memang mendukung jawaban.

Untuk latihan ini, kita memakai panduan kampus fiktif. Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas dan tetap bertanggung jawab atas isinya.

#### Aktivitas — mana yang ditambahkan tanpa dasar?

Petunjuk: “Baca jawaban berikut. Tandai dua kalimat yang belum didukung panduan.”

Panduan bisa dibuka selama menjawab. Jawaban simulasi:

1. “Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas.”
2. “Sebanyak 87% dosen menyetujui aturan ini.”
3. “Mahasiswa tetap bertanggung jawab atas isi tugasnya.”
4. “Aturan yang sama berlaku di semua kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).”

Tombol: `Cocokkan dengan panduan`.

Jawaban acuan: kalimat 2 dan 4.

Pembahasan tiap kalimat:

- 1: “Permintaan ini memang ada di panduan latihan.”
- 2: “Panduan tidak memuat survei atau angka 87%. Kita belum punya sumber untuk angka ini.”
- 3: “Tanggung jawab mahasiswa juga disebutkan di panduan.”
- 4: “Panduan latihan tidak membahas semua kampus atau aturan sejak 2019. Sitasi yang dicantumkan juga belum menyediakan dokumen yang bisa diperiksa.”

Catatan pengembang: setelah pemeriksaan, tampilkan alasan keempat kalimat. Jika peserta memilih 1 atau 3, tunjukkan bagian panduan yang mendukungnya. Tegaskan bahwa panduan ini fiktif dan tidak menggambarkan aturan seluruh kampus.

Kalau penasaran: jawaban yang sama dari beberapa AI belum menggantikan sumber asli. Untuk tugasmu sendiri, buka panduan yang berlaku di institusimu dan cocokkan isinya.

Penghubung: “Sejauh ini, kita membahas kemampuan AI dan hasil yang perlu diperiksa. Ada satu pertanyaan dasar lagi: apakah setiap fitur otomatis memakai AI?”

Tombol: `Lihat cara kerja di balik fitur →`

### 1.11 — Fitur otomatis bekerja dengan cara apa?

Waktu: 45–75 detik. Tujuan: mencari penjelasan cara kerja sebelum menyimpulkan bahwa fitur belajar dari data.

#### Yang tampil

Sistem otomatis bisa memakai aturan, model yang dilatih dari data, atau gabungan keduanya. TCAS pada pesawat, misalnya, memberi peringatan dan arahan untuk membantu menghindari tabrakan. Kecanggihan hasilnya saja belum menunjukkan apakah sistem memakai machine learning.

AI adalah bidang luas yang juga mencakup pendekatan berbasis pengetahuan dan aturan. Untuk mengetahui apakah suatu fitur belajar dari data, kita perlu melihat cara kerjanya.

#### Aktivitas — apa yang perlu dicari tahu?

Kartu: “Aplikasi memperbaiki foto secara otomatis. Hasilnya berbeda pada setiap foto.”

Pertanyaan: “Informasi mana yang paling membantu memahami cara kerja fitur ini?”

Pilihan: `Nama fitur`, `Penjelasan aturan atau model yang dipakai`, atau `Warna tombol`.

Pembahasan:

> Nama fitur dan warna tombol belum menjelaskan proses di dalamnya. Aturan yang sama pun bisa memberi hasil berbeda untuk foto berbeda. Penjelasan tentang aturan atau modelnya akan lebih membantu.

Penghubung: “Kita lanjut dari pertanyaan itu. Di pelajaran berikutnya, kamu akan mencoba aturan sederhana lalu melihat bagaimana model belajar dari contoh.”

Tombol: `Cek pemahaman pelajaran 1 →`

### Cek pemahaman pelajaran 1

Waktu: 45–75 detik. Letakkan sebelum pelajaran 2.

Situasi: “Pembeli mengirim bukti transfer yang terlihat meyakinkan. Sebelum menyerahkan tiket, apa yang kamu periksa?”

Pilihan:

1. Cocokkan nomor referensi dari pembeli dengan gambar.
2. Periksa nama, nominal, dan waktu pada gambar.
3. Buka riwayat rekening penerima dan cocokkan transaksi yang masuk.

Jawaban acuan: 3.

Pembahasan untuk 1 dan 2: “Detailnya terlihat cocok, tetapi informasinya masih berasal dari pembeli. Kamu perlu memastikan transaksi masuk di pihak penerima.”

Pembahasan untuk 3: “Riwayat penerima membantu memastikan uang masuk. Cocokkan pengirim, nominal, waktu, dan statusnya dengan pembayaran tiket.”

Peserta boleh mencoba lagi atau lanjut setelah membaca pembahasan.

Penutup: “Kamu sudah melihat beberapa tugas AI dan mencoba memeriksa hasilnya. Sekarang, kita telusuri bagaimana sistem menghasilkan hasil tersebut.”

## 5. Pelajaran 2 — Sebenarnya, Apa Itu AI?

Pertanyaan utama: `Bagaimana aturan, data, dan model bekerja?`

Pengantar: “Dua fitur bisa sama-sama otomatis, tetapi memakai cara kerja yang berbeda. Kita mulai dari contoh yang sederhana: alarm parkir.”

### 2.1 — Mulai dari aturan sederhana

Waktu: 60–90 detik. Tujuan: memahami hubungan input, aturan, dan output.

#### Yang tampil

Sensor parkir membaca jarak kendaraan dari benda di dekatnya. Dalam contoh sederhana, alarm menyala ketika jaraknya melewati batas yang sudah ditentukan. Pengembang menulis kondisinya; sistem tidak perlu dilatih dari kumpulan foto atau suara.

Machine learning memakai pendekatan lain. Model disesuaikan dari contoh data selama pelatihan. Dalam aplikasi nyata, aturan dan model juga bisa dipakai bersama.

#### Aktivitas — ubah jaraknya, lihat alarmnya

Aturan simulasi: alarm menyala jika jarak kurang dari 30 cm.

Petunjuk: “Coba dua jarak berbeda. Perhatikan kapan alarm menyala.”

Pilihan: `20 cm`, `30 cm`, dan `50 cm`. Tampilkan alur `Jarak → Aturan → Alarm` beserta penjelasannya:

- 20 cm: “Alarm menyala karena jaraknya kurang dari 30 cm.”
- 30 cm: “Alarm tidak menyala. Batasnya adalah kurang dari 30 cm, jadi tepat 30 cm belum memenuhi aturan.”
- 50 cm: “Alarm tidak menyala karena jaraknya masih di atas batas.”

Setelah dua nilai dicoba, tanyakan: “Apa yang menentukan hasil pada contoh ini?”

Jawaban acuan dan pembahasan: “Aturan yang ditulis menentukan kapan alarm menyala. Dari bunyinya saja, kita belum bisa tahu apakah suatu sistem memakai model yang dilatih.”

Penghubung: “Aturan jarak tadi mudah ditulis. Bagaimana dengan tugas yang punya banyak variasi, seperti membedakan foto kucing dan anjing?”

Tombol: `Coba contoh foto hewan →`

### 2.2 — Ketika contoh lebih membantu daripada daftar aturan

Waktu: 75–105 detik. Tujuan: memahami pembelajaran dari data dan generalisasi.

#### Yang tampil

Kucing dan anjing sama-sama bisa berbulu dan berkaki empat. Di foto, penampilannya juga berubah karena sudut kamera, cahaya, atau bagian tubuh yang tertutup. Sulit menulis aturan yang mencakup semua kemungkinan itu.

Machine learning adalah salah satu pendekatan dalam AI. Model mempelajari pola dari contoh selama pelatihan, lalu memakai pola tersebut pada data baru. Kemampuan bekerja pada data yang belum dipakai untuk pelatihan disebut generalisasi.

#### Aktivitas — contoh latihannya sudah cukup beragam?

Tampilkan dua kumpulan foto ilustrasi:

- A: foto terang, semuanya diambil dari depan.
- B: foto dengan cahaya, sudut, dan latar yang beragam.

Peserta membuka foto uji: hewan terlihat dari samping dalam cahaya redup.

Pertanyaan: “Kumpulan mana yang memuat variasi lebih dekat dengan foto baru ini?”

Jawaban acuan: B.

Pembahasan:

> Kumpulan B memuat variasi yang lebih dekat dengan foto uji. Contoh yang beragam dapat membantu model menghadapi kondisi berbeda. Namun, kita tetap perlu mengujinya pada foto terpisah untuk melihat seberapa baik hasilnya.

Catatan pengembang: foto hanya ilustrasi. Mengganti kumpulan memperbarui keterangan variasi, bukan melatih model sungguhan. Jangan menampilkan angka akurasi buatan seolah-olah hasil pengujian.

Kalau penasaran: foto untuk pengujian perlu dipisahkan dari foto latihan. Menambahkan foto ke layar juga belum mengubah model; foto itu harus benar-benar dipakai dalam proses pelatihan.

Penghubung: “Dari contoh tadi, kita sudah mengenal data latihan dan foto baru. Sekarang, lihat di mana keduanya masuk dalam proses.”

Tombol: `Susun prosesnya →`

### 2.3 — Dari data sampai prediksi

Waktu: 75–105 detik. Tujuan: membedakan pelatihan model dan inferensi.

#### Yang tampil

Untuk melatih pengenal gambar, kita menyiapkan foto dengan label seperti “kucing” atau “anjing”. Proses training menyesuaikan model dari contoh-contoh itu. Setelah dilatih, model bisa menerima foto baru dan membuat prediksi.

Memakai model pada input baru disebut inferensi. Jadi, ketika kamu mengirim satu foto untuk dikenali, model tidak otomatis dilatih ulang saat itu juga.

#### Aktivitas — kapan model dilatih, kapan dipakai?

Petunjuk: “Susun kartu dari awal pelatihan sampai model dipakai untuk foto baru.”

Kartu: `Data berlabel`, `Training`, `Model hasil pelatihan`, dan `Prediksi foto baru`.

Peserta mengurutkan dengan tombol naik/turun. Tombol: `Lihat alurnya`.

Jawaban acuan: Data → Training → Model → Prediksi.

Setelah dibahas, tampilkan dua fase:

- `Pelatihan`: data dipakai untuk menyesuaikan model.
- `Pemakaian`: foto baru diproses oleh model yang sudah dilatih untuk menghasilkan prediksi.

Pertanyaan: “Foto baru masuk untuk dikenali. Apakah ini pasti pelatihan baru?”

Jawaban acuan dan pembahasan: “Tidak. Itu bisa menjadi pemakaian model yang sudah tersedia. Apakah input disimpan dan digunakan untuk pelatihan di kemudian hari bergantung pada rancangan sistem serta kebijakan layanan.”

Penghubung: “Pada contoh foto, label membantu model belajar. Model lain bisa belajar dari kemiripan data atau dari hasil tindakan yang dicoba.”

Tombol: `Bandingkan cara model belajar →`

### 2.4 — Tiga cara model belajar

Waktu: 75–105 detik. Tujuan: membedakan pembelajaran dari label, struktur data, dan umpan balik tindakan.

#### Yang tampil

Ada beberapa pendekatan untuk melatih model. Supervised learning memakai contoh yang sudah punya target atau label. Unsupervised learning mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel. Reinforcement learning mempelajari tindakan dari umpan balik yang berkaitan dengan tujuan.

Kamu tidak perlu langsung menghafal namanya. Perhatikan dulu informasi apa yang dipakai untuk membantu proses belajar.

#### Aktivitas — apa yang membantu model belajar?

Petunjuk: “Cocokkan contoh dengan informasi yang dipakai untuk belajar. Nama pendekatannya akan muncul setelah kamu memilih.”

| Contoh | Jawaban acuan | Pembahasan dan istilah |
| --- | --- | --- |
| Email latihan sudah ditandai spam atau bukan spam. | Label jawaban | Model mendapat contoh beserta kategorinya. Pendekatan ini disebut supervised learning. |
| Data belanja dikelompokkan berdasarkan kemiripan. | Struktur dan kemiripan data | Sistem mencari pola pengelompokan tanpa diberi kategori jawaban untuk setiap contoh. Ini contoh unsupervised learning. |
| Robot mencoba gerakan dan mendapat umpan balik sesuai tujuan. | Hasil tindakan | Umpan balik membantu model mempelajari tindakan yang mendukung tujuan. Ini contoh reinforcement learning. |

Catatan pengembang: tampilkan istilah bersama pembahasannya, setelah peserta memilih bentuk informasi. Sistem nyata bisa menggabungkan beberapa pendekatan.

Kalau penasaran: kelompok yang ditemukan belum tentu berguna untuk kebutuhan kita. Pada robot, umpan balik juga perlu dirancang agar sesuai dengan tujuan. Sekadar membiarkan sistem mencoba tidak menjamin hasil yang diinginkan.

Penghubung: “Selain cara belajar, model juga punya susunan yang berbeda. Salah satu yang sering kamu dengar adalah deep learning.”

Tombol: `Kenali deep learning →`

### 2.5 — Mengenal deep learning tanpa rumus dulu

Waktu: 60–90 detik. Tujuan: memahami hubungan deep learning dengan machine learning dan arti jaringan saraf buatan.

#### Yang tampil

Deep learning adalah bagian dari machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. Melalui pelatihan, lapisan-lapisan ini membantu model mempelajari hubungan dalam data, termasuk gambar, suara, dan bahasa.

Jaringan saraf buatan terdiri dari perhitungan yang disesuaikan selama pelatihan. Kata “saraf” pada namanya tidak berarti komputer punya otak, perasaan, atau pengalaman seperti manusia.

#### Aktivitas — lihat peran tiap bagian

Petunjuk: “Buka tiga bagian diagram untuk melihat contoh perjalanan data.”

Diagram vertikal:

- `Input`: “Informasi masuk ke model, misalnya sebuah foto.”
- `Lapisan model`: “Perhitungan di dalam model memproses hubungan dan pola pada input.”
- `Output`: “Model memberikan hasil, misalnya prediksi kategori foto.”

Setelah ketiganya dibuka, peserta membandingkan dua kalimat:

1. “Model mempelajari hubungan melalui lapisan perhitungan.”
2. “Banyak lapisan membuat model memiliki pengalaman seperti manusia.”

Pembahasan: “Kalimat pertama sesuai dengan gambaran tadi. Banyak lapisan menjelaskan susunan model, tetapi belum membuktikan adanya pengalaman seperti manusia.”

Catatan pengembang: garis menunjukkan perjalanan data. Hindari animasi yang menggambarkan titik sebagai pikiran manusia. Diagram ini menyederhanakan proses, bukan menjelaskan seluruh arsitektur.

Kalau penasaran: kemampuan model juga dipengaruhi kualitas data, tujuan pelatihan, rancangan, dan pengujian. Jumlah lapisan saja belum cukup untuk menilai kualitasnya.

Penghubung: “Model berlapis dapat dipakai untuk berbagai tugas. Berikutnya, kita lihat perbedaan antara memberi kategori, membuat prediksi, dan menghasilkan konten.”

Tombol: `Bandingkan tugas AI →`

### 2.6 — Mengenali, memilih, dan membuat konten

Waktu: 60–90 detik. Tujuan: memahami AI generatif dan hubungannya dengan istilah lain.

#### Yang tampil

Filter spam memberi kategori pada email. Sistem rekomendasi memilih lagu. Model prediksi memperkirakan risiko. AI generatif membuat konten, misalnya teks, gambar, suara, video, atau kode.

Banyak sistem generatif modern memakai deep learning. Namun, istilah “generatif” menjelaskan kemampuan menghasilkan konten, sedangkan machine learning dan deep learning menjelaskan pendekatan yang dipakai. Karena itu, hubungan semua istilah tersebut perlu digambarkan dengan hati-hati.

#### Aktivitas — hasil seperti apa yang diminta?

Petunjuk: “Pasangkan contoh berikut dengan hasil yang dikerjakan sistem.”

| Contoh | Jawaban acuan | Pembahasan |
| --- | --- | --- |
| Menandai email sebagai spam. | Memberi kategori | Sistem menentukan kategori pesan. |
| Menyarankan lagu untuk didengarkan. | Memilih rekomendasi | Sistem memilih lagu dari yang tersedia. |
| Memperkirakan tingkat risiko. | Memperkirakan nilai | Sistem memberikan perkiraan dari informasi yang diterima. |
| Menulis draf balasan pesan. | Membuat konten | Sistem menyusun teks yang bisa kamu tinjau dan revisi. |

Kasus lanjutan: “Aplikasi mengenali objek dalam foto, lalu menulis penjelasannya.”

Pertanyaan: “Dua tugas apa yang dipakai?” Peserta menandai pengenalan dan pembuatan konten.

Pembahasan: “Satu aplikasi bisa menggabungkan beberapa tugas. Di sini, sistem mengenali objek lalu menghasilkan penjelasan.”

Kalau penasaran: model generatif juga ada yang tidak menggunakan deep learning. Jika membuat peta istilah, letakkan deep learning sebagai bagian dari machine learning. Tunjukkan generatif sebagai kemampuan yang dapat beririsan dengan pendekatan tersebut, bukan selalu sebagai kotak terdalam.

Penghubung: “Kita sudah tahu bahwa AI generatif bisa membuat teks. Bagaimana model menyusun kalimat yang terdengar lancar?”

Tombol: `Lihat cara model bahasa menyusun teks →`

### 2.7 — Kalimatnya lancar, apakah isinya benar?

Waktu: 75–105 detik. Tujuan: memahami gambaran pembuatan teks dan perlunya pemeriksaan fakta.

#### Yang tampil

Model bahasa dilatih dari banyak contoh teks. Saat menjawab, model memproses input lalu memperkirakan lanjutan berdasarkan pola yang dipelajari. Proses ini berulang hingga jawaban tersusun bagian demi bagian.

Bagian yang diproses disebut token. Token bisa berupa potongan kata atau tanda baca, sehingga satu token tidak selalu sama dengan satu kata. Ini gambaran dasar; sistem bahasa modern bisa memiliki komponen lain yang ikut bekerja.

#### Aktivitas — lanjutan mana yang cocok dengan jadwal?

Tampilkan kalimat: “Acara dimulai …”

Dua lanjutan: `pukul 10.00` dan `besok pagi`.

Petunjuk: “Baca dua lanjutan ini. Apa yang kamu perlukan untuk memastikan waktunya?”

Pembahasan awal: “Keduanya bisa terdengar wajar. Namun, kita perlu jadwal acara untuk tahu mana yang sesuai.”

Tombol `Buka jadwal` menampilkan dokumen fiktif: “Sabtu, pukul 10.00”. Peserta kemudian memilih kalimat yang didukung jadwal tersebut.

Pembahasan:

> Jadwal menyebut pukul 10.00, jadi waktu itu punya dasar. Untuk mengatakan “besok”, kita juga perlu tahu hari saat kalimatnya dipakai. Lanjutan yang terdengar lancar belum tentu sesuai fakta. Kelancaran bahasa pun belum menunjukkan bahwa model punya pengalaman atau niat seperti manusia.

Catatan pengembang: pilihan lanjutan dibuat untuk ilustrasi. Jangan menampilkan persentase seolah-olah dihasilkan model nyata atau menyamakan aktivitas memilih kalimat dengan keseluruhan proses tokenisasi.

Penghubung: “Isi jawaban perlu dicocokkan dengan sumbernya. Kalau AI mengaku sudah melakukan sesuatu, apa yang perlu kita lihat?”

Tombol: `Cek klaim tindakan AI →`

### 2.8 — “Sudah saya kerjakan” perlu diperiksa

Waktu: 60–90 detik. Tujuan: memilih bukti yang sesuai dengan klaim tindakan.

#### Yang tampil

Model yang bagus pada satu tugas belum tentu sama baiknya pada tugas lain. Versi, konteks, alat, dan cara memberi tugas dapat memengaruhi hasil. Satu jawaban saja belum cukup untuk menilai semua kemampuan model.

Saat AI mengatakan sudah membuka artikel atau menjalankan tes, periksa apakah alatnya memang tersedia dan apakah ada hasil yang bisa dilihat. Kalimat “sudah saya kerjakan” perlu dicocokkan dengan pekerjaan yang dimaksud.

#### Aktivitas — apa yang menunjukkan pekerjaannya selesai?

Petunjuk: “Pilih bukti yang sesuai untuk setiap klaim.”

| Klaim | Bukti yang relevan | Pembahasan |
| --- | --- | --- |
| “Saya sudah memeriksa artikel.” | Artikel terbuka dan bagian yang mendukung klaim. | Judul atau tautan saja belum menunjukkan bahwa isi artikel sudah diperiksa. |
| “Kode sudah lolos tes.” | Catatan tes yang dijalankan pada kode tersebut. | Pernyataan “sudah aman” belum memberi hasil tes yang bisa dilihat. |
| “File sudah diperbaiki.” | Perubahan pada file yang dimaksud. | Penjelasan cara memperbaiki belum menunjukkan bahwa filenya sudah diubah. |

Catatan pengembang: peserta mencoba minimal dua klaim. Setelah memilih, jelaskan apa yang bisa dipastikan dan apa yang belum.

Pembahasan tambahan: “Tes yang lolos memberi informasi tentang hal yang diuji. Bug pada bagian yang belum diuji masih bisa terlewat.”

Penghubung: “Sebelum lanjut, kita rangkai istilah yang sudah muncul agar hubungannya lebih mudah diingat.”

Tombol: `Hubungkan istilahnya →`

### 2.9 — Merangkai istilah yang sudah dipelajari

Waktu: 60–90 detik. Tujuan: memahami hubungan konsep melalui contoh.

#### Yang tampil

Otomatisasi menggambarkan proses yang berjalan tanpa terus dioperasikan. Machine learning menjelaskan bagaimana model belajar dari data. Deep learning adalah salah satu jenis machine learning. Generatif menjelaskan kemampuan menghasilkan konten.

Istilah-istilah ini membantu kita bertanya lebih tepat tentang sebuah fitur: tugasnya apa, prosesnya bagaimana, dan hasilnya perlu diperiksa dengan cara apa?

#### Aktivitas — lengkapi hubungan berikut

Petunjuk: “Pilih istilah yang melengkapi setiap kalimat.”

1. “Salah satu pendekatan dalam AI yang menyesuaikan model dari data adalah …” — machine learning.
2. “Jenis machine learning yang memakai jaringan saraf berlapis adalah …” — deep learning.
3. “Kemampuan menghasilkan konten seperti teks atau gambar disebut …” — generatif.

Saat pilihan belum tepat, tampilkan contoh yang memperjelas hubungannya:

- Machine learning: model belajar dari foto latihan untuk mengenali foto baru.
- Deep learning: model memakai jaringan saraf dengan banyak lapisan.
- Generatif: sistem menghasilkan draf teks atau gambar.

Tombol `Lihat peta lengkap` muncul setelah mencoba. Peta menunjukkan deep learning sebagai bagian dari machine learning, sementara generatif dapat beririsan dengan pendekatan tersebut.

Penghubung: “Sekarang, coba pakai hubungan tadi untuk membaca sebuah fitur yang belum kita ketahui cara kerjanya.”

Tombol: `Cek pemahaman pelajaran 2 →`

### Cek pemahaman pelajaran 2

Waktu: 45–75 detik.

Situasi: “Aplikasi punya tombol ‘Perbaiki otomatis’. Hasilnya berbeda pada setiap foto. Apakah informasi itu cukup untuk memastikan fitur memakai machine learning?”

Pilihan:

1. Ya, karena hasilnya berubah mengikuti foto.
2. Belum; perlu penjelasan tentang aturan atau model yang dipakai.
3. Tidak, karena pengguna masih harus menekan tombol.

Jawaban acuan: 2.

Pembahasan:

> Hasil yang berbeda bisa muncul dari aturan maupun model yang dilatih. Tombol yang perlu ditekan juga tidak menentukan jenis teknologinya. Untuk memastikan, cari penjelasan tentang cara kerja fitur tersebut.

Peserta bisa mencoba lagi atau lanjut setelah membaca pembahasan.

Penutup: “Kita sudah membahas aturan, data, dan model. Di pelajaran berikutnya, kita pakai pemahaman itu untuk menentukan bantuan AI yang sesuai dengan tugas sehari-hari.”

## 6. Pelajaran 3 — Berpikir di Era AI

Pertanyaan utama: `Bagaimana memakai bantuan AI sambil tetap memahami pekerjaanmu?`

Pengantar: “Bayangkan kamu dan tim sedang menyiapkan proposal sponsor untuk kegiatan komunitas. AI bisa membantu membuat draf dan slide. Kamu masih perlu memilih isi yang sesuai, memeriksa informasinya, dan memastikan janji dalam proposal bisa dipenuhi.”

Kasus yang dipakai sepanjang pelajaran: proposal sponsor kegiatan komunitas. Tim perlu mencari informasi, membuat slide, dan memilih rekomendasi. Draf AI memuat kalimat “78% Gen Z menyukai merek yang mendukung keberlanjutan” tanpa sumber. Angka ini dibuat untuk latihan dan tidak boleh dikutip sebagai statistik nyata. Beri label simulasi setiap kali angka ditampilkan.

### 3.1 — Lihat tugasnya satu per satu

Waktu: 75–105 detik. Tujuan: menentukan bantuan AI pada tiap tugas dalam sebuah pekerjaan.

#### Yang tampil

Membuat proposal melibatkan banyak tugas: mencari informasi, membaca dokumen, menyusun slide, dan menentukan rekomendasi. AI mungkin membantu beberapa di antaranya. Namun, kamu tetap perlu memahami kebutuhan tim, hubungan dengan sponsor, dan alasan memilih suatu usulan.

Untuk menentukan bantuan yang tepat, pecah dulu pekerjaannya menjadi tugas-tugas kecil. Dari sana, lebih mudah melihat bagian yang bisa dibantu dan bagian yang perlu kamu periksa sendiri.

#### Aktivitas — AI bisa membantu bagian mana?

Petunjuk: “Lihat empat tugas berikut. Pilih bentuk bantuan yang menurutmu sesuai, lalu baca hal yang tetap perlu diperiksa.”

Pilihan: `AI membantu draf`, `Perlu penilaian dan pemeriksaan`, atau `Keduanya`.

| Tugas | Pembahasan |
| --- | --- |
| Merangkum dokumen acara. | AI bisa membantu membuat ringkasan. Cocokkan lagi dengan dokumen agar rincian penting tidak hilang atau berubah. |
| Membuat beberapa susunan slide. | AI bisa menawarkan susunan yang berbeda. Tim memilih yang paling membantu menjelaskan tujuan proposal. |
| Memilih sponsor yang cocok. | AI bisa membantu membandingkan pilihan. Hubungan dengan sponsor, nilai kegiatan, dan pertimbangan tim tetap perlu dibahas. |
| Menyetujui janji kepada sponsor. | Persetujuan perlu diberikan oleh pihak yang berwenang dan memahami komitmennya. Kalimat dalam draf AI belum menjadi persetujuan tim. |

Catatan pengembang: jangan memberi label seolah-olah satu tugas selalu bisa diserahkan sepenuhnya kepada AI. Setelah memilih, peserta melihat bantuan yang mungkin dipakai beserta pemeriksaannya.

Penghubung: “Dalam satu pekerjaan, pengaruh AI bisa berbeda untuk setiap tugas. Perbedaan ini juga penting saat membaca angka tentang pekerjaan.”

Tombol: `Pahami angka tentang pekerjaan →`

### 3.2 — Apa arti pekerjaan “terpapar AI”?

Waktu: 90–120 detik. Tujuan: membaca statistik paparan pekerjaan dengan definisi dan kelompok yang tepat.

#### Yang tampil

Dalam penelitian, paparan AI menggambarkan potensi tugas dalam pekerjaan untuk dipengaruhi kemampuan AI. Cara mengukurnya mengikuti studi yang dipakai. Angka itu belum menunjukkan berapa orang yang akan kehilangan pekerjaan.

Artikel ILO pada 2026 menyebut paparan AI generatif pada pekerja muda Indonesia usia 15–24 tahun sebesar 26,1%, dibanding 21,1% pada kelompok dewasa. Perbandingan ini menggambarkan potensi perubahan tugas pada dua kelompok tersebut.

#### Aktivitas — apa yang bisa dibaca dari grafik?

Tampilkan dua batang berlabel 26,1% dan 21,1%. Keterangan kelompok serta sumber selalu terlihat.

Petunjuk: “Baca grafiknya, lalu lihat kesimpulan mana yang didukung.”

| Kesimpulan | Acuan | Pembahasan |
| --- | --- | --- |
| Pada ukuran yang dibahas, kelompok muda memiliki paparan lebih tinggi. | Didukung | Angka kelompok muda lebih tinggi daripada kelompok dewasa dalam perbandingan ini. |
| 26,1% pekerja muda pasti kehilangan pekerjaan. | Tidak didukung | Angka ini mengukur paparan tugas. Kepastian kehilangan pekerjaan tidak bisa disimpulkan dari grafik tersebut. |
| Semua tugas pekerja muda akan dikerjakan AI. | Tidak didukung | Grafik tidak menunjukkan bahwa semua tugas dalam setiap pekerjaan akan diambil alih. |

Pertanyaan berikutnya: “Apa yang perlu kamu baca bersama angka ini?”

Pilihan jamak: `Definisi paparan`, `Kelompok usia`, `Waktu dan sumber data`, dan `Warna grafik`.

Pembahasan: “Definisi, kelompok usia, waktu, dan sumber membantu menjelaskan arti angka. Warna memudahkan membaca grafik, tetapi tidak menentukan apa yang diukur.”

Kalau penasaran:

- ILO menyebut sekitar 3–4% pekerjaan di Indonesia berada dalam kategori paparan tertinggi.
- Pada kelompok pekerjaan dukungan administratif Indonesia, artikel tersebut menyebut 93,9% terpapar dan 67,5% berada pada kategori tertinggi. Ini angka untuk kelompok pekerjaan tersebut, bukan seluruh tenaga kerja Indonesia.
- Dalam laporan Agustus 2026, Stanford Digital Economy Lab membahas pekerja AS usia 22–25 tahun pada bidang dengan paparan tinggi. Dengan data hingga Juni 2026, jumlah pekerjanya sekitar 19% di bawah pembanding yang dibentuk dari pertumbuhan kelompok sebaya dengan paparan lebih rendah. Penyesuaian lebih terlihat pada berkurangnya perekrutan. Temuan ini bersifat deskriptif: hasilnya belum menetapkan AI sebagai satu-satunya penyebab dan tidak bisa langsung dipakai untuk memprediksi Indonesia.

Penghubung: “Angka tadi memberi gambaran perubahan pekerjaan. Untuk mulai belajar, kita bisa kembali ke hal yang lebih dekat: tugas apa yang ingin kamu kerjakan dengan lebih baik?”

Tombol: `Pilih kebutuhanmu sendiri →`

### 3.3 — Mulai dari kebutuhan yang kamu punya

Waktu: 60–90 detik. Tujuan: memilih satu kemampuan yang bisa dilatih melalui tugas nyata.

#### Yang tampil

Kamu tidak harus membuat model sebesar ChatGPT untuk mulai memakai AI. Coba dari tugas yang memang kamu hadapi, seperti memahami materi, membaca penelitian, membuat desain, menulis kode, atau menyiapkan kegiatan.

Pengembangan AI melibatkan infrastruktur, energi, chip, talenta, dan aplikasi. Sebagai pengguna, kamu bisa mulai dengan belajar menjelaskan kebutuhan, memilih bahan yang tepat, dan memeriksa hasil. Kemampuan itu tetap berguna saat alat yang kamu pakai berubah.

#### Aktivitas — apa yang ingin kamu coba minggu ini?

Pilih satu kategori: `Belajar`, `Riset`, `Berkarya`, atau `Pekerjaan atau kegiatan lain`.

Petunjuk: “Tulis satu tugas yang ingin kamu coba, lalu sebutkan apa yang akan kamu periksa.”

Kalimat bantuan: “Minggu ini saya ingin memakai AI untuk …, lalu memeriksa ….”

Contoh yang bisa dibuka:

- “Saya ingin dibantu memahami topik baru, lalu mencoba menjelaskannya ulang tanpa melihat jawaban.”
- “Saya ingin membuat ringkasan penelitian, lalu mencocokkannya dengan artikel asli.”
- “Saya ingin membuat draf kode, lalu membaca perubahannya dan menjalankan tes yang relevan.”

Catatan pengembang: tulisan opsional dan tidak diberi skor atau dinilai dari kata kunci. Jika diisi, tampilkan kembali sebagai catatan pribadi. Peserta tetap bisa lanjut tanpa menulis.

Penghubung: “Setelah mulai mencoba, kamu mungkin mendapat saran yang terdengar sangat meyakinkan. Bagaimana menentukan apakah saran itu cocok?”

Tombol: `Coba menilai saran AI →`

### 3.4 — Saat saran AI terdengar meyakinkan

Waktu: 75–105 detik. Tujuan: mengenali automation bias dan menilai saran dari alasan serta informasi pendukungnya.

#### Yang tampil

Automation bias adalah kecenderungan terlalu mengandalkan saran sistem otomatis. Penjelasan yang panjang dan percaya diri bisa membuat kita mengikuti AI tanpa mengecek apakah sarannya menjawab kebutuhan.

Pengetahuan bidang membantu, tetapi orang yang berpengalaman pun bisa keliru. Saat menilai saran, lihat alasan dan informasi pendukungnya. Rasa yakin saja belum menunjukkan bahwa pilihan itu tepat.

#### Aktivitas — sarannya cocok dengan rencana acara?

Kembali ke proposal sponsor. Brief fiktif: acara ditujukan untuk pemula, anggarannya terbatas, dan tim ingin menyediakan sesi praktik. AI menyarankan sebagian besar anggaran dipakai untuk dekorasi agar sponsor tertarik.

Pertanyaan: “Sebelum memutuskan, apa yang ingin kamu lihat?”

Pilihan dan pembahasannya:

- `Tujuan acara`: “Tim ingin peserta mendapat pengalaman praktik. Saran dekorasi perlu dilihat bersama kebutuhan ini.”
- `Rincian anggaran`: “Periksa apakah setelah biaya dekorasi masih ada cukup dana untuk sesi praktik.”
- `Penjelasan AI yang lebih panjang`: “Penjelasan tambahan bisa membantu memahami usulannya. Namun, kamu tetap perlu mencocokkannya dengan tujuan dan anggaran.”

Setelah itu, peserta memilih `Ikuti saran`, `Sesuaikan saran`, atau `Tunda sampai informasi cukup`.

Pembahasan untuk mengikuti: “Sebelum langsung mengikuti, ada kebutuhan yang belum terjawab: bagaimana sesi praktik tetap terlaksana dengan sisa anggaran?”

Pembahasan untuk menyesuaikan: “Kamu bisa mempertimbangkan dekorasi sambil menjaga dana untuk sesi praktik. Pastikan usulan barunya sesuai tujuan dan rincian biaya.”

Pembahasan untuk menunda: “Jika biaya dan kebutuhan praktik belum jelas, mencari informasi itu dulu memberi dasar untuk memutuskan.”

Catatan pengembang: menyesuaikan atau menunda lebih beralasan pada kasus ini. Jangan menyiratkan bahwa menolak AI selalu membuat keputusan manusia benar.

Kalau penasaran: sumber materi juga memuat penelitian diagnosis kulit tentang respons orang awam dan dokter terhadap saran AI. Itu contoh dalam konteks medis tertentu. Bacaan ini membantu membahas cara menilai saran; aktivitas tidak meminta peserta mendiagnosis kondisi medis.

Penghubung: “Untuk menilai usulan tadi, kamu memakai tujuan acara, pengetahuan tentang biaya, dan pemahaman tentang tim. Ada beberapa kemampuan yang saling membantu di sini.”

Tombol: `Kenali kemampuan yang dipakai →`

### 3.5 — Lima kemampuan yang tetap kamu perlukan

Waktu: 75–105 detik. Tujuan: menghubungkan lima kemampuan dengan tindakan dalam kasus proposal.

#### Yang tampil

Saat memakai AI, kamu masih perlu menentukan tujuan, memahami bidangnya, memeriksa hal penting sesuai risikonya, memperhatikan orang dan situasi, serta terus belajar dari pengalaman.

Kelima kemampuan ini bisa dilatih lewat tugas sehari-hari. Tidak ada daftar keterampilan yang menjamin pekerjaan akan bebas dari dampak AI, tetapi kemampuan tersebut membantu kamu menilai dan memakai hasil dengan lebih baik.

#### Aktivitas — kemampuan apa yang sedang dipakai?

Petunjuk: “Lihat tindakan dalam proposal berikut. Pilih kemampuan yang paling terlihat, lalu baca kaitannya.”

| Tindakan | Kemampuan yang dibahas | Pembahasan |
| --- | --- | --- |
| Menentukan tujuan proposal sebelum membuat slide. | Menentukan tujuan | Tujuan membantu memilih isi dan susunan yang perlu dimasukkan. |
| Menilai apakah rincian biaya masuk akal. | Memahami bidang | Pengetahuan tentang kebutuhan acara membantu membaca perkiraan biaya. |
| Membuka sumber asli angka pada slide. | Memeriksa sesuai risiko | Angka yang dipakai untuk meyakinkan sponsor perlu sumber yang bisa diperiksa. |
| Menanyakan kemampuan tim memenuhi janji sponsor. | Memahami konteks dan orang | Usulan harus mempertimbangkan kemampuan orang yang akan menjalankannya. |
| Mengevaluasi cara kerja setelah mencoba alat baru. | Terus belajar | Pengalaman memakai alat bisa membantu memperbaiki proses berikutnya. |

Catatan pengembang: satu tindakan boleh berkaitan dengan beberapa kemampuan. Semua kartu bisa dibaca tanpa mewajibkan lima jawaban terpisah.

Kalau penasaran: studi bantuan AI pada layanan pelanggan melaporkan manfaat produktivitas yang berbeda antarpekerja. Untuk memahami hasilnya, perhatikan siapa yang memakai, tugas yang dibantu, ukuran manfaat, dan versi penelitiannya. Hasil pada satu lingkungan belum menjadi perkiraan manfaat untuk semua pekerjaan.

Penghubung: “Kemampuan tadi berkembang saat kamu ikut mengerjakan dan menilai hasilnya. Sekarang, bandingkan dua cara memakai AI untuk belajar.”

Tombol: `Bandingkan cara belajarnya →`

### 3.6 — Tetap ikut memikirkan jawabannya

Waktu: 75–105 detik. Tujuan: memilih cara memakai AI yang tetap melibatkan penyusunan dan penilaian jawaban.

#### Yang tampil

Dua orang memakai AI untuk tugas yang sama. Orang pertama meminta jawaban jadi, lalu menyalinnya. Orang kedua membuat draf sendiri, meminta kritik, memeriksa kritik itu, dan memilih bagian yang perlu direvisi.

Pada cara kedua, ia tetap menyusun jawaban dan menilai masukan. Kritik AI pun bisa salah. Kamu boleh memakai yang membantu, memeriksa yang meragukan, dan mengabaikan yang tidak sesuai.

#### Aktivitas — di mana kamu ikut berpikir?

Tampilkan dua tab berisi riwayat singkat tadi.

Petunjuk: “Tandai langkah yang melibatkan penyusunan atau penilaian jawaban.”

Langkah acuan: membuat draf sendiri, memeriksa kritik, mencocokkan sumber, dan memutuskan revisi.

Lanjutkan dengan dua saran AI untuk proposal:

1. “Tambahkan angka 78% agar lebih meyakinkan.”
2. “Jelaskan manfaat sesi praktik untuk peserta.”

Peserta memilih `Terima`, `Periksa dulu`, atau `Tidak dipakai` untuk masing-masing.

Pembahasan saran pertama: “Angka 78% belum punya sumber. Menambahkannya hanya karena terdengar meyakinkan belum memberi dasar bagi proposal. Cari sumber yang mendukung atau jangan pakai angkanya.”

Pembahasan saran kedua: “Menjelaskan manfaat praktik sesuai dengan tujuan acara. Kamu bisa memakai saran ini, lalu memastikan penjelasannya cocok dengan sesi yang benar-benar direncanakan.”

Catatan pengembang: tanggapi pilihan berdasarkan alasannya. Misalnya, memeriksa manfaat praktik lebih dulu juga masuk akal. Jangan memperlakukan semua saran sebagai sesuatu yang harus diterima atau ditolak bersama-sama.

Kalau penasaran: penelitian Microsoft Research dan Carnegie Mellon mengumpulkan laporan pengalaman 319 pekerja pengetahuan dengan 936 contoh penggunaan AI. Kepercayaan lebih tinggi pada AI berkaitan dengan upaya berpikir kritis yang dilaporkan lebih rendah pada tugas tertentu. Penelitian ini memakai laporan pengalaman, sehingga hasilnya tidak membuktikan bahwa semua pengguna AI menjadi kurang pintar.

Penghubung: “Dari proposal tadi, kita bisa mengambil empat langkah yang mudah diingat dan dipakai lagi.”

Tombol: `Coba empat langkahnya →`

### 3.7 — Tentukan, gunakan, cek, putuskan

Waktu: 90–120 detik. Tujuan: menerapkan empat langkah pada draf proposal.

#### Yang tampil

Tentukan: apa yang ingin kamu selesaikan?

Gunakan: bagian mana yang bisa dibantu AI?

Cek: apa yang perlu kamu periksa sebelum memakai hasilnya?

Putuskan: bagian mana yang layak dipakai, dan siapa yang bertanggung jawab?

Kamu bisa kembali ke langkah sebelumnya. Kalau menemukan informasi yang keliru, perjelas lagi kebutuhannya atau minta revisi.

#### Aktivitas — rapikan keputusan dalam proposal

Kasus: angka “78% Gen Z …” muncul dalam slide sponsor tanpa sumber. Angka tetap diberi label simulasi.

Petunjuk: “Ikuti empat langkah ini untuk menentukan apa yang akan kamu lakukan dengan drafnya.”

Empat panel dibuka berurutan:

1. Tentukan. “Apa tujuan proposal ini?” Pilihan: `Menyusun proposal yang bisa dipertanggungjawabkan` atau `Membuat sponsor terkesan dengan angka apa pun`. Pembahasan: “Proposal perlu menjelaskan manfaat dan rencana yang punya dasar. Angka yang menarik belum tentu membantu jika sumbernya tidak jelas.”
2. Gunakan. “Bantuan mana yang masih berguna?” Pilihan: `Merangkum bahan`, `Memberi pilihan kalimat`, atau `Menganggap statistik tanpa sumber benar`. Pembahasan: “AI bisa membantu mengolah bahan dan menyusun kalimat. Statistiknya tetap perlu diperiksa.”
3. Cek. “Bagaimana kamu memeriksa angkanya?” Pilihan: `Cari sumber asli, kelompok yang diteliti, dan tahun` atau `Tanyakan angka yang sama ke AI lain`. Pembahasan: “Sumber asli membantu memastikan apa yang diukur dan siapa yang diteliti. Jawaban AI lain belum memberi kepastian itu.”
4. Putuskan. “Sumbernya belum ditemukan. Apa yang kamu lakukan?” Pilihan: `Hapus atau ganti dengan informasi yang bisa dibuktikan`, `Pakai karena cocok dengan pesan`, atau `Tetap jadikan dasar kesimpulan dengan catatan belum diperiksa`.

Jawaban acuan pada langkah terakhir: hapus atau ganti.

Pembahasan:

> Angka ini belum bisa menjadi dasar kesimpulan. Kamu bisa menghapusnya atau mengganti dengan informasi yang punya sumber. Menulis “belum diperiksa” memberi tahu pembaca bahwa ada ketidakpastian, tetapi belum membuat angkanya bisa dipercaya.

Di akhir, tampilkan pilihan dan keputusan peserta. Sediakan tombol `Ubah keputusan`.

Catatan pengembang: proposal tidak benar-benar dikirim. Alasan bebas tidak diberi skor otomatis.

Penghubung: “Setelah isi proposal dipilih, masih ada satu pemeriksaan: apakah tim bisa memenuhi janji yang tertulis?”

Tombol: `Periksa komitmen dalam proposal →`

### 3.8 — Pahami dulu sebelum memakai hasilnya

Waktu: 60–90 detik. Tujuan: memahami komitmen dan melibatkan pihak yang berwenang.

#### Yang tampil

AI bisa mempercepat pembuatan ringkasan dan draf. Sebelum memakainya, kamu masih perlu memahami isi, memilih saran yang sesuai, dan memikirkan orang yang terdampak.

Kalau keputusan berada di luar pengetahuan atau kewenanganmu, ajak pihak yang tepat untuk membahasnya. Hal yang sama berlaku saat AI membantu menulis, menganalisis, atau membuat kode: pahami bagian yang akan kamu gunakan.

#### Aktivitas — siapa yang perlu kamu ajak bicara?

Kasus: draf proposal menjanjikan fasilitas dan penggunaan foto peserta kepada sponsor.

Petunjuk: “Pilih hal yang perlu dipastikan sebelum proposal dikirim.”

Pilihan dan pembahasannya:

- `Konfirmasi fasilitas ke tim`: “Pastikan fasilitasnya memang tersedia dan bisa dipakai untuk rencana ini.”
- `Pastikan izin penggunaan foto`: “Orang dalam foto perlu mengetahui dan mengizinkan penggunaan yang direncanakan.”
- `Anggap draf sebagai persetujuan`: “Draf baru memuat usulan. Isinya belum menunjukkan bahwa pihak terkait sudah setuju.”
- `Tinjau komitmen bersama penanggung jawab`: “Penanggung jawab perlu memahami janji yang dibuat dan memastikan tim bisa memenuhinya.”

Jawaban acuan: konfirmasi fasilitas, izin penggunaan foto, dan peninjauan bersama penanggung jawab.

Refleksi opsional: “Sebelum proposal dikirim, saya perlu memastikan ….”

Catatan pengembang: refleksi tidak dinilai otomatis dan tidak menjadi syarat lanjut.

Penghubung: “Proposal kita sudah melalui beberapa pemeriksaan. Coba gunakan cara berpikir yang sama pada situasi lain.”

Tombol: `Coba situasi lain →`

### 3.9 — Sesuaikan pemeriksaan dengan klaimnya

Waktu: 90–120 detik. Tujuan: menerapkan konsep pada beberapa kasus baru.

#### Yang tampil

Saat ingin memakai hasil AI, mulai dari pertanyaan yang perlu dijawab. Apakah kutipannya benar? Apakah pembayaran sudah masuk? Apakah data boleh dibagikan? Apakah kamu sudah memahami jawabannya?

Pertanyaan yang berbeda membutuhkan pemeriksaan yang berbeda pula. Pilih langkah yang benar-benar membantu memastikan hal yang ingin kamu ketahui.

#### Aktivitas — apa yang kamu periksa lebih dulu?

Petunjuk: “Buka sedikitnya dua situasi. Pilih tindakan yang paling membantu, lalu baca pembahasannya.”

| Situasi | Pilihan tindakan | Jawaban acuan dan pembahasan |
| --- | --- | --- |
| Kamu ingin memasukkan kutipan dari AI ke tulisan. | Buka tulisan asli; tanya ulang AI; nilai dari gaya bahasa. | Buka tulisan asli, lalu cocokkan kata-kata dan konteks kutipannya. Gaya bahasa yang meyakinkan belum memastikan kutipan benar. |
| Kamu menerima bukti pembayaran. | Cocokkan transaksi penerima; periksa font; minta gambar lebih tajam. | Cocokkan catatan transaksi di pihak penerima. Gambar yang lebih tajam tetap belum memastikan uang masuk. |
| Kamu ingin mengirim dokumen berisi data orang lain. | Periksa kebutuhan dan izin; matikan training saja; kirim semua agar lengkap. | Pastikan datanya diperlukan dan boleh dibagikan. Pengaturan training tidak menggantikan izin tersebut. |
| Kamu memakai jawaban AI untuk belajar. | Jelaskan ulang dan periksa alasan; salin agar cepat; terima semua kritik. | Coba jelaskan ulang dan lihat apakah kamu memahami alasannya. Kritik juga perlu dinilai sebelum dipakai. |

Catatan pengembang: setiap kasus tampil pada satu layar pendek. Minimal dua kasus berbeda perlu dicoba; sisanya tersedia sebagai latihan tambahan. Pembahasan muncul setelah memilih.

Penghubung: “Terakhir, kembali ke angka dalam proposal. Apa langkah yang paling membantu saat sumbernya belum ada?”

Tombol: `Cek pemahaman pelajaran 3 →`

### Cek pemahaman pelajaran 3

Waktu: 45–75 detik.

Situasi: “AI memberi statistik yang cocok untuk proposal, tetapi tidak menyertakan sumber. Apa langkah berikutnya?”

Pilihan:

1. Cari sumber asli, lalu periksa tahun, kelompok yang diteliti, dan isi klaimnya.
2. Tanya dua AI lain dan pakai angkanya kalau jawaban mereka serupa.
3. Jadikan dasar proposal sambil menulis “perlu diverifikasi”.

Jawaban acuan: 1.

Pembahasan:

> Sumber asli membantu kamu memastikan apa yang diukur. Jawaban yang serupa dari beberapa AI atau catatan “perlu diverifikasi” belum menjawab pertanyaan itu. Kalau sumbernya tidak ditemukan, jangan jadikan angka tersebut dasar kesimpulan. Cari informasi lain yang bisa diperiksa.

Peserta boleh mencoba lagi atau lanjut setelah pembahasan.

## 7. Halaman selesai dan latihan mandiri

Label: `DASAR AI · SELESAI`

Judul: `Sekarang, coba untuk tugasmu sendiri`

### Yang tampil

Kamu sudah melihat beberapa kemampuan AI, mempelajari dasar cara kerjanya, dan mencoba memeriksa hasilnya. Saat memakai AI untuk tugasmu sendiri, mulai dengan kebutuhan yang jelas. Pilih bagian yang ingin dibantu, periksa hal penting, lalu tentukan apa yang akan kamu pakai.

Kalau ada bagian yang masih membingungkan, contoh dan glosarium bisa dibuka kembali. Kamu juga bisa mencoba satu situasi baru di bawah ini.

Tombol:

- `Kembali ke daftar materi`
- `Lihat ringkasan tiga pelajaran`
- `Coba situasi baru · opsional`

Catatan pengembang: route `/games` dari sumber boleh dipakai untuk situasi baru jika masih sesuai dengan aplikasi. Label untuk peserta tetap memakai “latihan” atau “situasi”. Tampilkan tombol hanya jika tujuannya sudah tersedia.

### Latihan baru — opsional, 2–4 menit

Kasus: “Komunitasmu ingin membuat pengumuman beasiswa dari satu dokumen resmi. Draf AI menambahkan tanggal penutupan, angka peluang diterima, dan tautan pendaftaran. Ketiganya tidak ada di dokumen.”

Tampilkan dokumen fiktif yang memuat nama program, persyaratan dasar, dan kontak penyelenggara. Tanggal penutupan, angka peluang diterima, dan tautan pendaftaran tidak tercantum. Beri label simulasi pada dokumen dan draf.

Petunjuk untuk peserta:

1. Tandai informasi yang ditambahkan tanpa dasar dari dokumen.
2. Pilih langkah berikutnya: hubungi penyelenggara lewat kontak resmi, cari halaman resmi program, atau hapus klaim sampai ada sumber yang sesuai.
3. Jika ingin, tulis keputusanmu: “Saya akan … karena ….”

Jawaban acuan: ketiga tambahan perlu diperiksa. Kontak dan halaman resmi juga perlu dicocokkan dengan program yang dimaksud. Tautan yang dibuat AI belum bisa dianggap sebagai sumber resmi. Peserta boleh memilih lebih dari satu tindakan yang membantu.

Pemeriksaan mandiri:

- Saya tahu bagian tugas yang dibantu AI.
- Saya bisa membedakan isi dokumen dari tambahan dalam draf.
- Saya memilih pemeriksaan yang sesuai dengan klaimnya.
- Saya tahu informasi mana yang belum bisa diumumkan sebagai fakta.

Catatan pengembang: checklist ini membantu peserta meninjau langkahnya, tanpa memberi skor kualitas tulisan. Jika dipakai untuk evaluasi penelitian, siapkan rubrik, penilai, dan prosedur terpisah.

## 8. Peta bagian dan waktu belajar

Kisaran waktu di bawah mencakup aktivitas inti dan pembahasan. Bacaan tambahan tidak dihitung. Perkiraan per pelajaran juga memberi waktu untuk cek pemahaman dan perpindahan layar.

| Bagian | Peran dalam alur | Interaksi | Waktu |
| --- | --- | --- | --- |
| 1.1 | Mengenali tugas AI sehari-hari. | Cocokkan contoh dengan tugas. | 60–90 dtk |
| 1.2 | Membaca batas capaian AI. | Bandingkan kesimpulan dengan hasil pengujian. | 75–105 dtk |
| 1.3 | Membaca beberapa hasil penelitian bersama. | Buat perkiraan, lalu buka hasilnya. | 90–120 dtk |
| 1.4 | Memilih input yang membantu tugas. | Pilih bahan untuk tiap situasi. | 60–90 dtk |
| 1.5 | Menghubungkan pengolahan informasi dengan gerakan robot. | Susun alur pengujian. | 75–105 dtk |
| 1.6 | Membedakan saran dari tindakan melalui alat. | Bandingkan dua riwayat. | 75–105 dtk |
| 1.7 | Memastikan pembayaran diterima. | Buka dan cocokkan catatan transaksi. | 60–90 dtk |
| 1.8 | Memikirkan orang yang terdampak konten buatan. | Baca sudut pandang dan pilih tindakan. | 60–90 dtk |
| 1.9 | Memilih data yang perlu dan boleh dikirim. | Pilih bagian dokumen dan lihat pratinjau. | 75–105 dtk |
| 1.10 | Mencocokkan jawaban dengan sumber. | Tandai kalimat yang belum didukung. | 90–120 dtk |
| 1.11 | Mencari cara kerja fitur otomatis. | Pilih informasi yang perlu dicari. | 45–75 dtk |
| 2.1 | Memahami aturan sederhana. | Ubah jarak dan amati alarm. | 60–90 dtk |
| 2.2 | Mengenal variasi data dan generalisasi. | Bandingkan kumpulan contoh. | 75–105 dtk |
| 2.3 | Membedakan pelatihan dan pemakaian model. | Susun proses dan lihat kedua fasenya. | 75–105 dtk |
| 2.4 | Membedakan informasi yang membantu model belajar. | Cocokkan label, kemiripan, dan hasil tindakan. | 75–105 dtk |
| 2.5 | Mengenal deep learning. | Buka bagian diagram. | 60–90 dtk |
| 2.6 | Membedakan kategori, rekomendasi, prediksi, dan konten. | Pasangkan tugas dengan hasilnya. | 60–90 dtk |
| 2.7 | Memeriksa fakta di balik kalimat yang lancar. | Cocokkan lanjutan dengan jadwal. | 75–105 dtk |
| 2.8 | Memeriksa klaim pekerjaan yang dilakukan AI. | Pilih bukti untuk tiap klaim. | 60–90 dtk |
| 2.9 | Memahami hubungan istilah. | Lengkapi kalimat dan buka peta konsep. | 60–90 dtk |
| 3.1 | Memilih bantuan AI untuk tiap tugas. | Tinjau bantuan dan pemeriksaannya. | 75–105 dtk |
| 3.2 | Memahami angka paparan pekerjaan. | Baca grafik dan pilih kesimpulan. | 90–120 dtk |
| 3.3 | Menentukan latihan dari kebutuhan sendiri. | Pilih kebutuhan dan tulis rencana singkat. | 60–90 dtk |
| 3.4 | Menilai saran yang terdengar meyakinkan. | Cocokkan saran dengan tujuan dan anggaran. | 75–105 dtk |
| 3.5 | Mengenali lima kemampuan dalam tindakan. | Hubungkan tindakan dengan kemampuan. | 75–105 dtk |
| 3.6 | Tetap terlibat saat belajar dengan AI. | Bandingkan proses dan nilai kritik. | 75–105 dtk |
| 3.7 | Memakai empat langkah pada proposal. | Tentukan bantuan, pemeriksaan, dan keputusan. | 90–120 dtk |
| 3.8 | Memastikan komitmen dan persetujuan. | Pilih pemeriksaan dan pihak yang perlu dilibatkan. | 60–90 dtk |
| 3.9 | Menerapkan konsep pada situasi lain. | Pilih pemeriksaan untuk tiap klaim. | 90–120 dtk |

## 9. Navigasi dan pembahasan jawaban

### Alur dan progres

- Tampilkan nama pelajaran dan posisi layar, misalnya `AI Hari Ini · 3/12`. Pelajaran 1 memiliki 11 bagian dan satu cek pemahaman; pelajaran 2 serta 3 masing-masing memiliki sembilan bagian dan satu cek.
- Letakkan pengantar pelajaran di awal layar pertama, sehingga tidak menambah hitungan layar.
- Tampilkan perkiraan waktu saat pelajaran dimulai. Tidak perlu hitung mundur.
- Saat peserta menekan `Kembali`, pertahankan pilihan, urutan kartu, dan tulisannya.
- Setelah berganti layar, pindahkan fokus dan posisi gulir ke judul bagian baru.
- Bacaan tambahan tidak menjadi syarat untuk lanjut.
- Sediakan `Jeda dan lanjutkan nanti`. Pada pilihan mulai ulang, jelaskan bahwa progres serta tulisan akan dikosongkan.
- Tampilkan status tersimpan hanya setelah penyimpanan berhasil. Jika gagal, gunakan: “Progres belum tersimpan di browser ini. Kamu masih bisa melanjutkan selama halaman tetap terbuka.”

### Kapan peserta bisa lanjut?

| Aktivitas | Kapan pembahasan dibuka? | Kapan bisa lanjut? |
| --- | --- | --- |
| Pilihan tunggal | Setelah satu jawaban dipilih. | Setelah pembahasan muncul, termasuk jika jawabannya belum tepat. |
| Pilihan jamak | Setelah peserta memilih sesuai petunjuk. | Setelah hasil diperiksa. Sebutkan jumlah pilihan yang diminta dengan jelas. |
| Mencocokkan pasangan | Setelah item yang diminta sudah dicoba. | Setelah pembahasan muncul. Peserta boleh memperbaiki pilihan. |
| Menyusun urutan | Setelah tombol pemeriksaan ditekan. | Setelah pembahasan muncul, meskipun peserta tidak mengubah urutan awal. |
| Memperkirakan angka | Setelah nilai valid diberikan atau peserta memilih melihat tanpa menebak. | Setelah hasil dibuka. Perkiraan bukan tes hafalan angka penelitian. |
| Membuka diagram atau perbandingan | Setelah bagian yang diminta dibuka. | Setelah ringkasan muncul. Tidak perlu menambah pertanyaan hanya untuk membuka tombol lanjut. |
| Refleksi bebas | Tidak wajib diisi. | Bisa lanjut kapan saja; tulisan yang sudah ada tetap disimpan. |
| Cek pemahaman | Setelah satu jawaban dipilih. | Setelah pembahasan muncul. Sediakan kesempatan mencoba lagi. |

Pada 1.10, peserta menandai dua kalimat lalu melihat alasan untuk keempatnya. Pada 3.9, peserta mencoba sedikitnya dua kasus berbeda; dua lainnya opsional. Terapkan aturan sesuai aktivitas, bukan satu syarat yang sama untuk semua layar.

### Cara menanggapi jawaban

Jelaskan kenapa pilihan itu membantu atau apa yang masih belum terjawab. Misalnya:

- “Angka ini tidak ada di panduan. Kita perlu sumber lain untuk memastikannya.”
- “Catatan rekening penerima menunjukkan transaksi masuk. Sekarang cocokkan detailnya dengan pembayaran yang kamu tunggu.”
- “Pilihan ini membantu menilai gaya tulisan. Untuk memastikan angkanya benar, kita masih perlu membuka sumbernya.”

Hindari pujian berlebihan, bunyi kegagalan, animasi mengguncang, atau pesan “kamu salah” tanpa penjelasan. Jika beberapa pilihan masuk akal, jelaskan pertimbangannya. Jangan memaksa satu jawaban ketika situasinya memang memungkinkan lebih dari satu tindakan.

## 10. Tampilan yang nyaman di hape

- Gunakan satu kolom agar konteks, teori, aktivitas, pembahasan, dan tombol mudah diikuti dari atas ke bawah.
- Ganti dua panel teks berdampingan dengan tab atau kartu bergantian. Pilihan peserta tetap tersimpan saat berpindah tab.
- Sediakan panel ringkas untuk membuka kembali brief atau sumber. Informasi yang dibutuhkan untuk menjawab tetap terlihat dekat pertanyaan.
- Buat area sentuh setidaknya sekitar 44 × 44 piksel dan beri jarak antarkontrol.
- Biarkan label tombol turun ke dua baris jika perlu. Hindari pemotongan yang menghilangkan maknanya.
- Untuk menyusun urutan, sediakan tombol naik/turun atau pilihan posisi. Aktivitas drag harus punya alternatif sentuh dan keyboard.
- Peserta menandai klaim dengan menyentuh satu kalimat utuh, tanpa perlu menyorot potongan teks kecil.
- Pada isian angka, tampilkan label, satuan, batas nilai, dan tombol tambah/kurang. Slider boleh ditambahkan sebagai pilihan.
- Letakkan pembahasan tepat setelah aktivitas. Jika berada di luar layar, arahkan gulir agar hasil mudah ditemukan.
- Mulai kolom refleksi dengan ukuran pendek, lalu perbesar mengikuti tulisan. Pastikan keyboard tidak menutupi kolom aktif atau tombol.
- Sisakan ruang untuk tombol bawah dan area aman layar agar isi tidak tertutup.
- Sesuaikan foto serta diagram dengan lebar layar dan sediakan penjelasan teks untuk informasi penting.
- Pada grafik, tampilkan angka dan nama kelompok. Warna boleh membantu, tetapi maknanya harus tetap terbaca tanpa warna.

## 11. Aksesibilitas dan gerakan

- Semua kontrol bisa digunakan lewat keyboard, dengan penanda fokus yang terlihat.
- Tunjukkan status dipilih lewat teks atau ikon, sekaligus warna. Pakai `aria-pressed` atau kontrol form yang sesuai.
- Gunakan radio untuk memilih satu jawaban dan checkbox untuk memilih beberapa. Petunjuk harus menjelaskan jumlah pilihan yang diminta.
- Umumkan hasil yang berubah secara singkat kepada pembaca layar, tanpa membacakan ulang seluruh halaman.
- Panel tambahan memiliki judul yang jelas dan menyampaikan status terbuka atau tertutup.
- Label tautan menyebut judul sumber. Jika tautan membuka tab baru, sampaikan melalui label aksesibilitas.
- Pakai transisi singkat seperlunya dan ikuti pengaturan `prefers-reduced-motion`.
- Hindari gerakan terus-menerus, suara otomatis, konfeti di setiap layar, atau indikator waktu yang membuat peserta terburu-buru.

## 12. Glosarium yang bisa dibuka kembali

| Istilah | Penjelasan |
| --- | --- |
| AI | Bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten. |
| Otomatisasi | Proses yang berjalan tanpa terus-menerus dioperasikan. |
| Aturan | Ketentuan yang menentukan apa yang dilakukan sistem saat suatu kondisi terpenuhi. |
| Machine learning | Pendekatan yang menyesuaikan model dari contoh data selama pelatihan. |
| Model | Susunan perhitungan yang mengolah input menjadi hasil. Dalam machine learning, parameternya disesuaikan saat pelatihan. |
| Data | Informasi yang dipakai untuk melatih, menguji, atau menggunakan sistem. |
| Input / output | Informasi yang masuk ke sistem / hasil yang diberikan sistem. |
| Training | Proses menyesuaikan model menggunakan data atau pengalaman yang disiapkan untuk pelatihan. |
| Inferensi | Pemakaian model untuk memproses input dan memberikan hasil. |
| Label | Target atau kategori yang diberikan pada contoh latihan. |
| Prediksi | Perkiraan model dari input dan pola yang sudah dipelajari. |
| Generalisasi | Kemampuan memakai pola yang dipelajari pada data baru. |
| Supervised learning | Pelatihan dari contoh yang sudah memiliki target atau label. |
| Unsupervised learning | Pendekatan untuk mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel. |
| Reinforcement learning | Pembelajaran tindakan melalui umpan balik yang berkaitan dengan tujuan. |
| Deep learning | Jenis machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. |
| AI generatif | AI yang menghasilkan konten, misalnya teks, gambar, suara, atau kode. |
| Model bahasa | Model yang memproses atau menghasilkan bahasa. |
| Prompt | Permintaan atau instruksi yang diberikan kepada AI. |
| Token | Potongan yang diproses model, misalnya bagian kata atau tanda baca. |
| Multimodal | Kemampuan memproses beberapa jenis informasi, misalnya teks dan gambar. |
| Benchmark | Tugas atau kumpulan soal yang dipakai untuk mengukur kemampuan tertentu. |
| Simulasi | Lingkungan, keadaan, atau hasil buatan yang dipakai untuk mencoba dan mempelajari sesuatu. |
| World model | Model yang memperkirakan perubahan lingkungan, termasuk akibat suatu tindakan. |
| Agent | Sistem yang memakai alat dan menjalankan langkah untuk mencapai tujuan. |
| Tool | Alat yang bisa dipakai sistem, misalnya pencarian, pembaca file, atau terminal. |
| Konten sintetis | Konten yang dibuat atau dimanipulasi secara buatan. |
| Deepfake | Konten manipulasi yang meniru wajah atau suara seseorang. |
| Halusinasi AI | Informasi keliru atau dibuat-buat yang disampaikan seolah-olah benar. |
| Sitasi | Rujukan yang menunjukkan asal informasi. |
| Verifikasi | Pemeriksaan klaim menggunakan bukti yang sesuai. |
| Automation bias | Kecenderungan terlalu mengandalkan saran sistem otomatis. |
| Paparan pekerjaan | Potensi tugas dalam pekerjaan untuk dipengaruhi AI menurut ukuran penelitian. Angkanya belum menunjukkan kepastian kehilangan pekerjaan. |
| Radiolog | Dokter yang membaca dan menafsirkan gambar medis. |
| Mammogram | Gambar yang dihasilkan dalam pemeriksaan mammografi. |
| Protein | Molekul yang tersusun dari asam amino dan menjalankan berbagai fungsi dalam sel. |
| Struktur protein | Bentuk tiga dimensi protein yang membantu peneliti memahami cara kerjanya. |

## 13. Visual dan sumber aset

Berkas gambar asli tidak disertakan dalam dokumen ini. Daftar berikut menunjukkan lokasi aset pada proyek sumber. Periksa dulu apakah berkasnya tersedia sebelum dipakai. Penjelasan inti tetap perlu terbaca meskipun gambar tidak berhasil dimuat.

| Penempatan | Aset pada sumber | Pemakaian |
| --- | --- | --- |
| Pengantar | `public/course-visuals/aceh-polytechnic.webp` | Mahasiswa di laboratorium komputer; ilustrasi lingkungan belajar. |
| 1.1 | `chatgpt-logo.svg`, `gemini-logo.svg` di folder yang sama | Identitas produk untuk melengkapi contoh AI sehari-hari. |
| 1.2 | `alphafold-protein.webp` | Ilustrasi prediksi struktur protein. |
| 1.3 | `mammography-machine.webp` | Mesin pengambilan gambar; bedakan dari AI pembaca gambar. |
| 1.5 | `olaf-robot.webp` | Contoh gerakan robot yang diuji. |
| 1.7 | `bankjago-receipt.webp` | Ilustrasi struk untuk simulasi pembayaran. |
| 2.1 | `tcas-symbology.webp` | Ilustrasi peringatan pesawat dan tingkat ancaman. |

Sumber aset dan keterangan lisensi dari materi asal:

- [Laboratorium Politeknik Aceh — USAID Indonesia](https://commons.wikimedia.org/wiki/File:Mahasiswa_i_menggunakan_komputer_untuk_meningkatkan_keterampilan_teknologi_(8315664069).jpg): domain publik menurut sumber.
- [Logo ChatGPT](https://commons.wikimedia.org/wiki/File:ChatGPT-Logo.svg) dan [ikon Gemini](https://commons.wikimedia.org/wiki/File:Google_Gemini_icon_2025.svg): identitas merek; periksa ketentuan penggunaan.
- [Struktur AlphaFold](https://commons.wikimedia.org/wiki/File:AF-P0CH12-F1.png): CC0 menurut sumber.
- [Mesin mammografi](https://commons.wikimedia.org/wiki/File:Mammography_machine.jpg): Bill Branson / National Cancer Institute, domain publik menurut sumber.
- [Robot Olaf — Disney Research](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/): periksa izin pemakaian aset sebelum digunakan.
- [Struk digital — VulcanSphere](https://commons.wikimedia.org/wiki/File:Example_of_PAN_truncation_in_digital_receipt.webp): domain publik menurut sumber.
- [Diagram TCAS — FAA](https://www.faa.gov/lessons_learned/transport_airplane/accidents/RA-85816).

Buat diagram sendiri untuk aktivitas alur proses. Pada contoh dokumen, transaksi, poster, dan proposal, letakkan label simulasi di tempat yang langsung terlihat.

## 14. Sumber pembelajaran dan catatan angka

Daftar ini memuat rujukan untuk konsep dan contoh dalam materi. Pada penyusunan awal, beberapa angka dan tautan penelitian diperiksa serta disesuaikan. Revisi bahasa ini mempertahankan rujukan tersebut, tanpa memeriksa ulang seluruh halaman.

### Kemampuan AI dan penelitian

- [DeepMind — capaian IMO 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/).
- [Nobel Prize — John Jumper dan AlphaFold2](https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/).
- [Nature Medicine — AI-based triage and decision support, 2026](https://www.nature.com/articles/s41591-026-04277-x).
- [PubMed — ringkasan studi mammografi yang sama](https://pubmed.ncbi.nlm.nih.gov/41857202/).
- [Tesla — FSD Supervised](https://www.tesla.com/support/fsd).
- [Disney Research — robot Olaf](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/).
- [FAA — TCAS II](https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html).

### Bukti dan data

- [OJK — bukti transfer palsu](https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx).
- [OJK — penipuan suara dan wajah](https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx).
- [OpenAI — Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt).
- [Google — Gemini Privacy Hub](https://support.google.com/gemini/answer/13594961).

### Konsep model

- [Google — What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml).
- [Google — Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting).

### Pekerjaan dan penilaian manusia

- [ILO — pasar kerja ASEAN](https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited).
- [ILO — rincian ASEAN dan Indonesia](https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets).
- [Stanford Digital Economy Lab — pekerja muda, Agustus 2026](https://digitaleconomy.stanford.edu/news/canariesaug26/).
- [Komdigi — lima lapisan AI](https://portal.komdigi.go.id/kanal-publik/berita-kini/10477).
- [Nature Medicine — explainable AI dan diagnosis kulit](https://www.nature.com/articles/s41591-026-04553-w).
- [OECD — AI and skills](https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html).
- [Generative AI at Work — paper](https://arxiv.org/abs/2304.11771).
- [Microsoft Research — AI dan berpikir kritis](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/).

### Catatan untuk penyusun dan pengembang

1. Tautan latihan medis pada sumber lama memakai DOI `10.1016/S1470-2045(23)00298-X`. Angka dalam latihan cocok dengan studi Nature Medicine 2026. Pada materi ini, angka 31.301, −63,6%, +15,2%, dan +14,8% mengacu pada studi 2026. Pakai sumber itu secara konsisten pada bacaan dan latihan.
2. Latihan lama meminta peserta memperkirakan paparan keseluruhan Indonesia sebesar 21,7%, dengan toleransi ±6, tetapi tautannya menuju indeks global. Materi ini memakai perbandingan usia 26,1% dan 21,1% dari artikel ILO. Angka 21,7% belum dipakai pada layar utama. Jika ingin menggunakannya kembali, cocokkan lebih dulu dengan tabel Indonesia. [Indeks global pada sumber lama](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure).
3. Sumber materi diagnosis kulit menyebut 623 orang awam dan 153 dokter. Jumlah itu belum diperiksa ulang pada revisi ini. Bagian 3.4 memakai kasus proposal fiktif, sementara penelitian tetap tersedia sebagai bacaan tambahan tanpa latihan menghafal jumlah peserta.
4. Sumber lama menyebut 5.172 agen layanan pelanggan dan kenaikan produktivitas 15%. Angka dapat berbeda menurut versi paper. Karena itu, bagian 3.5 membahas manfaat yang bergantung pada tugas dan pengguna, tanpa mencantumkan angka tersebut pada teks utama.
5. Nama menu pengaturan data bisa berubah. Bagian 1.9 berfokus pada kebutuhan data, izin, layanan penerima, dan penyimpanan. Sediakan tautan panduan resmi. Periksa versi terbaru jika nama menu akan ditampilkan saat implementasi.
6. Aplikasi sebelumnya disebut “NUSA Lab Game”. Pada tampilan peserta, gunakan “latihan” atau “situasi baru”. Route lama boleh tetap dipakai jika sesuai dengan tujuan tombol.
7. Letakkan tahun, kelompok, ukuran, dan tautan sumber dekat statistik atau capaian yang dibahas. Penjelasan yang diperlukan untuk memahami angka tetap terlihat di layar utama.

## 15. Penyimpanan progres dan evaluasi

### Menyimpan progres

Jika pilot memakai penyimpanan lokal, simpan pelajaran, posisi layar, pilihan jawaban, status pembahasan, urutan kartu, dan refleksi. Tulisan yang disimpan di browser tidak perlu dikirim ke server.

Saat peserta kembali, tampilkan posisi terakhir dengan pilihan `Lanjutkan` atau `Mulai dari awal`. Jelaskan bahwa progres lokal belum tentu ikut saat berpindah browser atau perangkat. Jika peserta mulai ulang, hapus progres, hasil aktivitas, dan draf sebelumnya secara konsisten.

### Event yang disarankan

Daftar berikut adalah usulan untuk implementasi; event belum dinyatakan tersedia dalam aplikasi:

- `ai_fundamentals_started`
- `ai_lesson_started`
- `ai_activity_attempted`
- `ai_feedback_opened`
- `ai_activity_retried`
- `ai_optional_explanation_opened`
- `ai_checkpoint_answered`
- `ai_lesson_completed`
- `ai_transfer_attempted`
- `ai_fundamentals_completed`

Cukup catat ID pelajaran, bagian, jenis aktivitas, dan pilihan terstruktur yang diperlukan. Isi refleksi serta data pribadi tidak dimasukkan ke analytics secara default.

### Apa yang dievaluasi?

Lihat berapa peserta yang menyelesaikan tiap pelajaran, bagian tempat mereka berhenti, konsep yang masih keliru pada cek pemahaman, dan perubahan jawaban setelah pembahasan. Latihan dengan kasus baru membantu melihat apakah peserta bisa menerapkan materi di situasi lain. Durasi memberi gambaran penggunaan, tetapi tidak menjadi ukuran utama keberhasilan.

Jika ingin menilai pemahaman lebih jauh, gunakan alasan peserta dan tugas baru. Membuka semua kartu atau mencentang checklist belum cukup untuk menunjukkan penguasaan materi.

## 16. Checklist sebelum diterapkan

- Semua 29 bagian tersedia dengan teori, contoh, aktivitas, dan transisi yang sesuai.
- Cek pemahaman muncul di akhir masing-masing pelajaran.
- Jawaban baru dibuka setelah peserta mencoba. Pada perkiraan angka, peserta juga boleh memilih melihat hasil tanpa menebak.
- Semua contoh buatan diberi label simulasi. Aktivitas tidak meminta rekening atau dokumen pribadi.
- Aktivitas urutan bisa diselesaikan tanpa drag. Grafik dan gambar memiliki penjelasan teks.
- Tombol, isian, penandaan kalimat, dan panel tambahan mudah dipakai pada layar sempit.
- Pilihan serta tulisan tetap ada saat peserta kembali atau melanjutkan sesi yang berhasil disimpan.
- Refleksi bebas tidak diberi pujian atau skor yang mengklaim kualitas isinya secara otomatis.
- Klaim penelitian disertai ukuran dan sumber yang sesuai.
- Penjelasan teori tidak diulang penuh pada setiap kartu.
- Perkiraan waktu disesuaikan setelah uji peserta.
- Uji satu pelajaran penuh di hape: informasi untuk menjawab mudah ditemukan, pembahasan terlihat, fokus berpindah dengan benar, dan keyboard tidak menutupi kontrol.
