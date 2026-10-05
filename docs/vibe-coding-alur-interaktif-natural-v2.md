# Vibe Coding — alur materi interaktif

Dokumen kerja ini menyusun materi Vibe Coding sebagai satu pengalaman belajar yang utuh. Bagian utama ditulis untuk peserta yang mungkin baru pertama kali mendengar istilah seperti coding agent, repository, terminal, atau deployment. Karena itu, setiap konsep diperkenalkan setelah peserta memahami dulu masalah yang sedang dihadapi dan kenapa konsep tersebut diperlukan.

Materi asli, sumber, panduan alat, dan asesmen lama tetap disimpan di lampiran sebagai bahan pengecekan. Bagian utama di bawah ini adalah naskah yang ditujukan untuk pengalaman peserta.

## Pembuka peserta

**Judul:** Bikin aplikasi dengan AI, tapi tetap tahu apa yang sedang terjadi

Kalau pernah meminta AI membantu membuat kode, alurnya mungkin terasa familiar: kamu menjelaskan apa yang ingin dibuat, AI memberi kode, lalu kamu mencoba memasukkannya ke project. Selama semuanya berjalan, prosesnya terasa mudah. Begitu muncul error atau hasilnya tidak sesuai, barulah muncul pertanyaan: bagian mana yang salah, apa yang perlu diperbaiki, dan apakah perubahan dari AI aman untuk langsung dipakai?

Di course ini, kita akan melihat cara kerja yang sedikit berbeda. Kita akan memakai konsep **coding agent**: AI yang bukan hanya menjawab lewat chat, tetapi juga bisa diberi akses untuk membaca file project, mengusulkan perubahan, dan menjalankan langkah tertentu dengan izinmu.

Supaya kamu tidak perlu memahami contoh baru di setiap bagian, kita akan mengikuti satu project kecil dari awal sampai akhir. Contohnya adalah **timer belajar 25 menit** dengan tiga fungsi sederhana: Mulai, Jeda, dan Reset.

Timer dipilih bukan karena kamu harus membuat aplikasi belajar. Project ini sengaja dibuat kecil supaya kita bisa fokus pada cara bekerjanya: bagaimana memberi arahan yang jelas, melihat rencana agent, menentukan izin, memeriksa perubahan, menemukan bug, sampai menyiapkan aplikasi agar bisa dicoba orang lain.

Kamu juga tidak perlu sudah bisa coding untuk mengikuti alurnya. Saat istilah teknis muncul, kita akan membahasnya di saat istilah itu memang dibutuhkan. Yang perlu kamu perhatikan adalah tiga hal: apa yang ingin dibuat, apa yang dilakukan agent, dan bagaimana kita tahu hasilnya benar-benar bekerja.

Semua perubahan file, jawaban agent, dan hasil pengujian di bagian utama adalah **simulasi yang sudah disiapkan**. Tidak ada file di laptopmu yang akan berubah. Setelah simulasi selesai, baru ada bagian terpisah jika kamu ingin mencoba pola yang sama pada project sungguhan.

**Tombol:** Lihat bagaimana agent bekerja →

## Peta perjalanan

Kita akan mengikuti timer yang sama dari kondisi awal sampai siap dibagikan. Jadi, bagian berikutnya selalu berangkat dari sesuatu yang sudah terjadi sebelumnya.

| Tahap | Apa yang terjadi pada project | Yang akan kamu pelajari |
| --- | --- | --- |
| Kenali cara kerjanya | Project belum berjalan dengan benar | Bedanya AI chat dan coding agent, peran model, serta izin tindakan |
| Beri arah dan bangun | Agent sudah bisa membantu, tetapi masih perlu arahan | Cara membuat brief, memberi konteks, membaca rencana, dan meninjau perubahan |
| Uji dan bagikan | Timer sudah terlihat bekerja | Cara menguji, melaporkan bug, menentukan kebutuhan penyimpanan, dan melakukan deployment |
| Coba idemu sendiri | Simulasi selesai | Cara membawa pola yang sama ke project yang ingin kamu buat |

Di setiap bagian, kamu akan melihat situasinya lebih dulu, mengambil keputusan, lalu membaca kenapa pilihan tersebut masuk akal. Detail yang belum dibutuhkan akan dipindahkan ke **Baca lebih lanjut** agar alurnya tidak terasa seperti membaca dokumentasi teknis dari awal sampai akhir.

## Tahap 1 — Kenali cara kerjanya

### 1. Saat project error, AI sebenarnya melihat apa?

**Fokus bagian:** Memahami perbedaan antara AI chat biasa dan coding agent yang bisa mengakses project.

Kita mulai dari kondisi yang sangat umum: project sudah ada, tetapi belum berhasil dijalankan.

Di layar muncul pesan:

> `Module not found`

Kalau kamu belum pernah coding, tidak masalah kalau pesan itu belum berarti apa-apa. Intinya sederhana: project sedang mencari sesuatu yang tidak berhasil ditemukan. Masalahnya, kita belum tahu file mana yang berkaitan dengan error tersebut.

Sekarang ada dua cara meminta bantuan AI.

Dengan **AI chat biasa**, kamu bisa menyalin pesan error ke percakapan. Kalau perlu, kamu juga menambahkan potongan kode atau nama file yang menurutmu berkaitan. AI bisa membantu menjelaskan, tetapi ia hanya mengetahui bahan yang kamu kirim.

Dengan **coding agent**, situasinya bisa berbeda. Jika diberi akses ke folder project, agent dapat melihat file yang tersedia dan mencari sendiri bagian yang berkaitan dengan error.

**Interaksi — mana yang benar-benar memanfaatkan kemampuan coding agent?**

| Pilihan | Apa yang terjadi |
| --- | --- |
| A. “Jelaskan arti error ini dari pesan yang saya tempel.” | Bisa membantu, tetapi AI hanya melihat pesan yang kamu kirim. |
| B. “Periksa file yang terkait dengan error ini. Jelaskan penyebab dan rencananya dulu, jangan ubah apa pun.” | Agent bisa melihat project, mencari file yang relevan, lalu menjelaskan temuannya tanpa melakukan perubahan. |
| C. “Buat ulang seluruh timer dari awal di chat.” | Kamu tetap harus memindahkan hasilnya sendiri dan belum tentu masalah awalnya terselesaikan. |

**Jika memilih B, tampilkan simulasi:**

> `App.jsx` mencoba mengambil `Timer.jsx`, tetapi file yang tersedia bernama `StudyTimer.jsx`. Kemungkinan error berasal dari nama import yang tidak cocok. Saya belum akan mengubah file sampai kamu menyetujuinya.

**Pembahasan:**

Perbedaan utamanya bukan sekadar “AI yang satu lebih pintar”. Perbedaannya ada pada **konteks dan akses**. AI chat menunggu kamu membawa konteks ke percakapan. Coding agent bisa diberi akses untuk melihat project dan menggunakan alat di dalam lingkungan kerja tersebut.

Akses ini memang membuat pekerjaan tertentu lebih praktis, tetapi juga berarti agent bisa melakukan tindakan yang berdampak pada project. Karena itu, kita tidak cukup hanya tahu bahwa agent “bisa membantu”. Kita juga perlu tahu apa yang sedang digunakan di baliknya dan tindakan apa yang boleh dijalankan.

**Baca lebih lanjut:** Di course ini, *vibe coding* dipakai untuk menggambarkan proses membangun software lewat percakapan dengan bantuan AI, sambil tetap memberi arah, meninjau perubahan, dan menguji hasilnya. Istilah seperti repository atau terminal belum perlu kamu hafalkan sekarang.

**Transisi:** Agent tadi bisa menemukan hubungan antarfile karena ia bekerja di dalam project. Sebelum kita membiarkannya melakukan perubahan, ada tiga istilah yang perlu dibedakan dulu: alat yang kita gunakan, model AI yang menjawab, dan agent yang menghubungkan model itu dengan project.

**Lanjut:** Bedakan alat, model, dan agent →

### 2. Chat, builder, model, agent — bedanya buat apa?

**Fokus bagian:** Memilih jenis bantuan AI berdasarkan pekerjaan yang sedang dilakukan dan memahami peran model di dalam agent.

Setelah melihat agent memeriksa project, mungkin muncul pertanyaan: kalau semuanya sama-sama memakai AI, kenapa tidak memakai satu alat saja untuk semua hal?

Karena kebutuhan kita bisa berbeda.

Saat masih mencari ide, kita belum membutuhkan akses ke file. Saat ingin mencoba prototype cepat, kita mungkin lebih terbantu oleh tool yang menyiapkan banyak hal secara otomatis. Saat sudah ada project dan ada file yang perlu diperbaiki, akses langsung ke project baru terasa penting.

**Interaksi — pasangkan kebutuhan dengan bantuan yang paling masuk akal:**

| Kebutuhan | Pilihan yang masuk akal | Kenapa |
| --- | --- | --- |
| Membandingkan beberapa ide aplikasi | AI chat | Kita masih berdiskusi. Belum ada file yang perlu disentuh. |
| Mencoba prototype dengan cepat dari browser | AI app builder | Builder bisa menyiapkan banyak bagian awal di lingkungannya sendiri. |
| Memperbaiki import pada project yang sudah ada | Coding agent | Agent bisa melihat file yang benar-benar digunakan oleh project tersebut. |

Kategori ini tidak selalu terpisah dengan rapi. Satu produk bisa memiliki kemampuan chat, builder, dan agent sekaligus. Jadi yang perlu dipahami bukan daftar mereknya, melainkan **jenis bantuan yang dibutuhkan oleh pekerjaanmu saat itu**.

Lalu ada istilah lain yang sering tercampur: **model** dan **agent**.

Model adalah AI yang menghasilkan respons dan melakukan penalaran. Agent adalah sistem yang memakai model tersebut bersama konteks, alat, aturan, izin, dan lingkungan kerja.

Cara paling sederhana membedakannya:

> Model berpikir dan menghasilkan respons. Agent menghubungkan respons itu dengan tindakan yang bisa dilakukan di project.

Karena itu, model yang sama bisa terasa berbeda saat dipakai melalui agent yang berbeda.

**Interaksi lanjutan:**

> Kamu hanya ingin mengganti tulisan tombol `Start` menjadi `Mulai`. Apakah harus memakai model paling kuat atau paling mahal?

- **Tidak. Mulai dari model yang cukup untuk tugasnya.** Perubahan kecil tidak selalu membutuhkan model paling kuat. Hasilnya tetap perlu diperiksa.
- **Ya. Model yang lebih mahal pasti lebih benar.** Belum tentu. Model yang lebih mampu bisa membantu pada tugas rumit, tetapi harga bukan jaminan perubahan pertama langsung benar.

**Pembahasan:**

Pilihan model sebaiknya mengikuti kebutuhan. Untuk perubahan sederhana, model ringan mungkin sudah cukup. Untuk bug yang melibatkan banyak file dan hubungan yang rumit, model yang lebih mampu bisa lebih membantu.

Selain kemampuan, pertimbangkan biaya, kecepatan, jumlah konteks yang bisa dibaca, dan kebijakan data dari provider yang digunakan.

**Baca lebih lanjut:** Benchmark seperti SWE-bench, LiveCodeBench, dan Terminal-Bench mengukur kemampuan yang berbeda. Angka benchmark bisa menjadi petunjuk, tetapi tidak otomatis menentukan model terbaik untuk semua pekerjaan. Course ini memakai Kilo sebagai alat latihan, tetapi pola berpikirnya tetap relevan untuk coding agent lain.

**Transisi:** Sekarang kita tahu bahwa agent bisa memakai model dan berbagai alat untuk bekerja di project. Artinya, agent bukan hanya bisa membaca file seperti pada bagian pertama. Ia juga bisa mengubah kode atau menjalankan perintah. Di titik ini, izin mulai penting.

**Lanjut:** Tentukan apa yang boleh dilakukan →

### 3. Kalau agent bisa bertindak, kapan kita perlu berhenti dan mengecek?

**Fokus bagian:** Memahami izin berdasarkan jenis tindakan dan dampaknya terhadap project.

Kita kembali ke error `Module not found` tadi. Agent sudah menemukan kemungkinan penyebabnya. Untuk melanjutkan, ada beberapa tindakan yang mungkin dilakukan:

- membaca file yang terkait,
- memperbaiki satu baris import,
- menjalankan project untuk melihat apakah error sudah hilang.

Sekilas semuanya terdengar sederhana, tetapi dampaknya tidak sama. Membaca file tidak mengubah isi project. Mengedit file mengubah project. Menjalankan perintah juga bisa berdampak, tergantung perintah yang digunakan.

Karena itu, coding agent biasanya memiliki pengaturan izin.

**Interaksi — tentukan Allow, Ask, atau Deny untuk latihan ini:**

| Tindakan | Aturan latihan | Kenapa |
| --- | --- | --- |
| Membaca `App.jsx` dan `StudyTimer.jsx` di folder latihan | Allow | File memang relevan dan folder latihan dinyatakan tidak memuat data rahasia. |
| Mengubah import dan menjalankan perintah pemeriksaan | Ask | Kita masih ingin melihat perubahan atau perintah sebelum dijalankan. |
| Menghapus seluruh folder project untuk “mulai dari awal” | Deny | Error satu import tidak membutuhkan tindakan sebesar itu. |

**Setelah cocok, tampilkan permintaan simulasi:**

> Saya akan memperbaiki satu import. Setelah itu saya ingin menjalankan perintah pemeriksaan yang sudah tersedia di project. Kamu bisa melihat detailnya sebelum memberi izin.

Pilihan peserta:

- **Lihat perubahan dan perintah dulu** → buka rincian, lalu tampilkan tombol **Izinkan tindakan ini**.
- **Izinkan semua tindakan berikutnya** → tampilkan pengingat bahwa izin yang lebih luas berarti lebih sedikit kesempatan untuk memeriksa tindakan berikutnya.

**Pembahasan:**

`Allow` berarti tindakan tertentu boleh berjalan tanpa meminta persetujuan setiap kali. `Ask` membuat agent berhenti dan menunggu persetujuan. `Deny` memblokir tindakan tersebut.

Tidak ada satu pengaturan yang selalu benar untuk semua project. Yang perlu dibangun adalah kebiasaan melihat **apa tindakannya, kenapa dibutuhkan, dan apa dampaknya** sebelum memberikan izin.

Bahkan izin membaca file tetap perlu mempertimbangkan isi project. Kalau folder berisi data pribadi, credential, atau informasi perusahaan, konteksnya tentu berbeda dengan folder latihan kosong.

**Baca lebih lanjut:** Dalam Kilo, Ask dapat dipakai untuk memahami project, Plan untuk menyusun langkah, Code untuk menerapkan perubahan, dan Debug untuk menelusuri masalah. Nama atau ketersediaan mode bisa berubah mengikuti versi alat. Saat pertama kali membuka project yang belum kamu kenal, permintaan seperti “Jelaskan struktur project ini. Jangan ubah file” adalah awal yang masuk akal.

**Transisi:** Sekarang kita sudah tahu cara memberi agent ruang untuk bekerja tanpa langsung memberinya kebebasan penuh. Tapi izin yang baik belum menyelesaikan masalah lain: kalau permintaan kita sendiri tidak jelas, agent tetap harus menebak apa yang sebenarnya ingin dibuat.

**Lanjut:** Beri agent arah yang lebih jelas →

## Tahap 2 — Beri arah, lalu bangun sedikit demi sedikit

### 4. Sebelum meminta agent membangun, jelaskan dulu versi pertama yang kamu mau

**Fokus bagian:** Menyusun brief sederhana yang menjelaskan pengguna, fungsi inti, dan batas versi pertama.

Error awal sudah selesai. Project bisa dibuka lagi. Sekarang kita benar-benar ingin membangun timer tadi.

Kalau kita hanya menulis:

> Buat aplikasi belajar yang keren.

agent harus mengisi banyak bagian yang belum kita jelaskan. Misalnya, siapa penggunanya? Apa fungsi utamanya? Apakah perlu akun? Apakah perlu kalender? Apakah akan dipakai sendiri atau banyak orang?

Tidak aneh kalau agent kemudian mengusulkan:

> Tambahkan akun, kalender, leaderboard, dan database.

Masalahnya bukan karena usulan itu “salah”. Masalahnya, kita belum memberikan cukup arah untuk membedakan mana kebutuhan utama dan mana fitur tambahan.

**Interaksi — lengkapi tiga hal yang paling penting:**

1. **Siapa yang memakai?**  
   “Untuk saya yang belajar sendiri di laptop.”

2. **Apa yang harus bekerja di versi pertama?**  
   “Timer dimulai dari 25 menit dan punya tombol Mulai, Jeda, dan Reset.”

3. **Apa yang belum perlu dibuat?**  
   “Belum perlu akun, kalender, atau leaderboard.”

Peserta boleh menyalakan atau mematikan setiap bagian. Pratinjau brief berubah langsung. Rencana agent baru muncul setelah peserta menekan **Lihat rencananya**.

**Logika hasil:**

- Tanpa pengguna → belum jelas siapa yang akan memakai aplikasi.
- Tanpa fungsi inti → belum jelas apa yang harus benar-benar bekerja.
- Tanpa batas → agent masih punya ruang besar untuk memperluas project.
- Ketiganya ada → rencana bisa fokus pada timer sederhana.

Jika lebih dari satu bagian belum ada, tampilkan semua hal yang masih kabur.

**Pembahasan:**

Brief yang baik tidak harus panjang. Untuk project kecil, yang paling penting adalah memberi agent cukup informasi agar rencananya bisa kita nilai.

Sederhananya:

> Siapa yang memakai → apa yang harus bekerja → apa yang belum perlu dibuat.

Dengan batas yang jelas, kita juga lebih mudah berkata “ini sesuai” atau “ini sudah terlalu jauh”.

**Transisi:** Arah project sekarang sudah jelas. Tapi setelah brief jadi, biasanya muncul godaan untuk memberi agent semua hal sekaligus: banyak dokumen, banyak aturan, banyak tool. Sebelum itu, kita perlu membedakan konteks yang memang membantu dengan konteks yang hanya menambah beban.

**Lanjut:** Pilih konteks yang benar-benar dibutuhkan →

### 5. Tidak semua informasi perlu diberikan sekarang

**Fokus bagian:** Memilih konteks, aturan, dan alat tambahan berdasarkan kebutuhan project saat ini.

Agent sudah tahu kita ingin membuat timer 25 menit dengan tiga tombol dan tanpa fitur tambahan.

Sekarang bayangkan ada banyak hal yang bisa dimasukkan ke project atau diberikan kepada agent: struktur file, aturan tampilan, database, skill tambahan, bahkan koneksi ke layanan lain.

Pertanyaannya bukan “apa saja yang bisa ditambahkan?”, tetapi:

> Apa yang membantu agent mengerjakan timer versi pertama ini?

**Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”:**

| Kartu | Untuk timer versi pertama | Alasan |
| --- | --- | --- |
| Struktur file dan cara menjalankan project | Perlu sekarang | Agent perlu tahu tempat bekerja dan bagaimana hasilnya dicoba. |
| Perilaku Mulai, Jeda, dan Reset | Perlu sekarang | Ini adalah fungsi yang nantinya harus diuji. |
| Aturan: jangan tambah library tanpa alasan; tampilan nyaman di ponsel | Perlu sekarang | Batas ini memengaruhi solusi yang dipilih sejak awal. |
| MCP untuk kalender online | Belum perlu | Kalender tidak termasuk versi pertama. |
| Skill untuk integrasi pembayaran | Belum perlu | Project tidak memiliki kebutuhan pembayaran. |
| Database akun pengguna | Belum perlu | Akun juga belum termasuk kebutuhan. |

Setelah semua kartu ditempatkan, tombol **Periksa pilihan** membuka alasan masing-masing. Peserta boleh mengubah pilihannya.

**Pembahasan:**

Konteks membantu ketika membuat keputusan agent lebih tepat. Banyak konteks tidak selalu berarti konteks yang lebih baik.

Untuk project kecil, terlalu banyak aturan, dokumen, skill, atau integrasi justru bisa membuat pekerjaan utama tenggelam di antara hal yang belum diperlukan.

Mulai dari informasi yang langsung memengaruhi tugas sekarang. Tambahkan konteks lain ketika project benar-benar membutuhkannya.

**Baca lebih lanjut:** `AGENTS.md` dapat menyimpan aturan project yang perlu diikuti berulang kali. `PROJECT.md` dapat merangkum tujuan, fitur, dan batas project. `SKILL.md` berisi petunjuk untuk jenis pekerjaan tertentu. MCP memberi agent akses ke tool atau layanan tambahan. Tidak ada kewajiban memakai semuanya dalam satu project.

**Transisi:** Sekarang agent punya tujuan yang jelas dan konteks yang cukup. Sebelum satu pun file diubah, kita masih punya cara sederhana untuk mengecek apakah agent memahami semuanya dengan benar: lihat rencananya.

**Lanjut:** Periksa rencana sebelum coding →

### 6. Rencana adalah tempat termurah untuk menemukan salah arah

**Fokus bagian:** Memeriksa apakah rencana agent sesuai brief sebelum perubahan benar-benar dibuat.

Dari brief yang sudah kita susun, bayangkan agent memberikan dua rencana berikut.

**Rencana A**

1. Buat tampilan timer dan tiga tombol.
2. Tambahkan hitung mundur.
3. Coba Mulai, Jeda, dan Reset.
4. Periksa tampilan pada layar kecil.

**Rencana B**

1. Buat sistem akun.
2. Tambahkan langganan.
3. Buat dashboard kalender.
4. Baru buat timer.

**Pertanyaan:** Mana yang paling sesuai dengan brief kita?

- **A** → setiap langkah berkaitan langsung dengan fungsi yang memang diminta.
- **B** → sebagian besar pekerjaan justru berada di luar batas versi pertama.

**Interaksi berikutnya — susun urutan yang mudah diperiksa:**

Tampilan utama → Fungsi timer → Uji alur utama → Perbaiki berdasarkan hasil uji

**Pembahasan:**

Rencana tidak harus sempurna dan tidak ada satu urutan yang selalu berlaku untuk semua project. Di sini kita memilih urutan kecil karena setiap langkah menghasilkan sesuatu yang bisa dilihat atau diuji.

Kalau rencananya sudah salah arah, memperbaikinya sekarang jauh lebih murah daripada setelah banyak file berubah.

Membaca rencana juga membuat kita tahu apa yang akan terjadi berikutnya. Jadi ketika agent meminta izin untuk mengubah file atau menjalankan perintah, tindakannya tidak datang tanpa konteks.

**Transisi:** Rencananya sudah sesuai. Sekarang kita tidak perlu meminta agent membuat semuanya dalam satu langkah. Kita akan membangun bagian pertama, melihat hasilnya, lalu memutuskan langkah berikutnya dari apa yang benar-benar terjadi.

**Lanjut:** Mulai dari bagian kecil →

### 7. Jangan tunggu semuanya selesai untuk mulai mengecek

**Fokus bagian:** Mengalami siklus kerja sederhana: instruksi → perubahan → pemeriksaan → langkah berikutnya.

Kita mulai dari bagian yang paling mudah dilihat.

> Buat tampilan timer 25:00 dengan tombol Mulai, Jeda, dan Reset. Jangan tambahkan fitur lain dulu.

**Hasil pertama:** Angka 25:00 dan tiga tombol sudah muncul di layar. Tombolnya belum melakukan apa-apa.

**Interaksi — apa langkah berikutnya?**

- **“Tampilannya sudah ada. Sekarang tambahkan perilaku tombol dan hitung mundur.”** → Masuk akal. Kita menyelesaikan satu bagian lalu lanjut ke fungsi berikutnya.
- **“Project sudah selesai karena tampilannya sudah benar.”** → Belum. Tombol yang terlihat belum membuktikan fungsinya bekerja.

Sekarang permintaannya bisa dibuat lebih spesifik:

> Tambahkan hitung mundur. Saat Jeda ditekan, hitungan berhenti tanpa menghapus sisa waktu. Reset mengembalikan timer ke 25:00 dan membuat timer berhenti.

**Hasil simulasi yang bisa dicoba:**

- **Mulai** → waktu berkurang.
- **Jeda** → hitungan berhenti.
- **Reset** → kembali ke 25:00 dan berhenti.

Tampilkan label bahwa perilaku ini adalah simulasi course, bukan project peserta.

**Pembahasan:**

Coding agent biasanya bekerja dalam beberapa putaran. Ia membaca permintaan, melihat konteks, memakai alat sesuai izin, lalu menggunakan hasil tindakan sebelumnya untuk menentukan langkah berikutnya.

Kita juga sebaiknya bekerja dalam putaran yang sama: minta sesuatu yang cukup kecil, lihat apa yang berubah, coba hasilnya, baru lanjut.

Cara ini bukan sekadar lebih hati-hati. Saat masalah muncul, kita lebih mudah memperkirakan perubahan mana yang mungkin menyebabkannya karena jumlah perubahan sejak pemeriksaan terakhir masih kecil.

**Transisi:** Dari layar, timer sekarang terlihat sudah bekerja. Tapi tampilan hanya menunjukkan hasil akhirnya. Agent bisa saja mengubah file lain yang tidak kita minta. Jadi sebelum melanjutkan, kita perlu melihat apa saja yang sebenarnya berubah di balik layar.

**Lanjut:** Tinjau perubahan agent →

### 8. Hasilnya terlihat benar, tapi apakah perubahannya juga masuk akal?

**Fokus bagian:** Menilai apakah perubahan yang dibuat agent benar-benar berkaitan dengan tugas.

Setelah menyelesaikan fungsi timer, agent memberikan ringkasan perubahan berikut:

1. `StudyTimer.jsx` — menambahkan status berjalan dan sisa waktu.
2. `timer.css` — menyesuaikan tombol agar nyaman dipakai di layar kecil.
3. `package.json` — menambahkan paket pembayaran.
4. `README.md` — menambahkan cara menjalankan dan mencoba timer.

Sekilas aplikasinya tetap bisa terlihat normal. Tapi ada satu perubahan yang tidak cocok dengan apa pun yang kita minta.

**Interaksi:** Perubahan mana yang perlu ditanyakan lebih lanjut?

- `package.json` dengan paket pembayaran → tidak ada kebutuhan pembayaran dalam brief.
- Perubahan timer, CSS, dan petunjuk menjalankan → masih berhubungan dengan project, meskipun isinya tetap perlu ditinjau.

Jika peserta menandai semua perubahan, jelaskan bahwa review bukan berarti setiap perubahan harus dianggap mencurigakan. Tujuannya adalah mencari ketidaksesuaian antara kebutuhan, perubahan, dan dampaknya.

**Permintaan lanjutan:**

> Kenapa paket pembayaran diperlukan? Kalau tidak ada hubungannya dengan timer versi pertama, hapus tambahan itu dan gunakan bagian project yang sudah ada.

**Hasil simulasi:** Paket pembayaran dihapus dari usulan. Daftar perubahan diperbarui.

**Pembahasan:**

Kamu belum harus memahami setiap baris kode untuk mulai melakukan review. Untuk tahap awal, tiga pertanyaan sudah sangat membantu:

1. File apa yang berubah?
2. Kenapa file itu perlu berubah?
3. Bagaimana kita akan membuktikan bahwa perubahan tersebut bekerja?

**Baca lebih lanjut:** Git membantu menyimpan riwayat perubahan dan membandingkan versi. Saat kemampuan coding-mu berkembang, review bisa dilakukan lebih dalam sampai ke perubahan per baris. Untuk sekarang, fokus dulu pada hubungan antara kebutuhan dan perubahan yang dibuat.

**Transisi:** Perubahannya sekarang sudah kembali sesuai dengan brief. Tetapi “file yang masuk akal” belum berarti “fitur yang bekerja benar”. Satu-satunya cara memastikan perilaku timer adalah mencobanya.

**Lanjut:** Uji seperti pengguna →

## Tahap 3 — Buktikan hasilnya, baru bagikan

### 9. “Sudah selesai” belum berarti “sudah benar”

**Fokus bagian:** Menemukan bug dengan langkah uji yang jelas dan menjelaskan masalah dengan informasi yang cukup untuk diperbaiki.

Agent mengatakan pekerjaan selesai. Daripada langsung percaya pada kalimat itu, kita coba fungsi yang tadi memang dijanjikan.

**Interaksi — lakukan langkah berikut:**

25:00 → tekan **Mulai** → tunggu beberapa detik → tekan **Jeda**

Sebelum hasil muncul, tanyakan:

> Berdasarkan brief kita, apa yang seharusnya terjadi setelah Jeda ditekan?

**Yang diharapkan:** Waktu berhenti pada angka terakhir.

**Yang terjadi di simulasi:** Waktu kembali ke 25:00.

Tampilkan dua kartu:

- **Seharusnya:** berhenti di sisa waktu.
- **Yang terjadi:** kembali ke 25:00.

Sekarang kita tahu ada bug. Pertanyaan berikutnya adalah bagaimana memberi informasi yang cukup agar agent tidak menebak-nebak lagi.

**Interaksi — laporan mana yang lebih membantu?**

- **“Timernya rusak. Tolong perbaiki.”** → Belum jelas kapan masalah muncul, apa hasil aktualnya, dan perilaku mana yang harus dipertahankan.
- **“Setelah Mulai, waktu berkurang. Saat Jeda ditekan, waktu kembali ke 25:00. Seharusnya berhenti di sisa waktu. Cari penyebabnya dan perbaiki tanpa mengubah perilaku Reset.”** → Kondisi, hasil aktual, hasil yang diharapkan, dan batas perubahan sudah jelas.

**Setelah pilihan sesuai, tampilkan jawaban agent:**

> Fungsi Jeda ternyata memakai logika yang sama dengan Reset. Saya akan memisahkan keduanya.

Tampilkan versi simulasi yang diperbaiki. Peserta mengulangi uji Jeda, lalu mencoba Reset lagi.

**Pembahasan:**

Perbaikan belum selesai saat bug lama hilang. Kita juga perlu memastikan perubahan tersebut tidak merusak bagian yang sebelumnya sudah benar.

Itulah kenapa setelah memperbaiki Jeda, kita tetap mencoba Reset lagi.

Untuk project lain, langkah ujinya akan berbeda. Prinsipnya tetap sama: tentukan apa yang diharapkan, lakukan langkah yang bisa diulang, bandingkan dengan yang benar-benar terjadi, lalu beri agent informasi yang spesifik.

Tes otomatis bisa membantu pengujian berulang, tetapi pengalaman pengguna tetap perlu dicoba langsung. Pada timer ini, kita masih bisa mengecek apa yang terjadi jika Mulai ditekan dua kali, halaman di-refresh, dibuka di layar kecil, atau waktu dibiarkan sampai habis.

**Transisi:** Timer sekarang sudah lolos uji utama. Sampai titik ini, semua kebutuhan kita masih sederhana. Tapi misalnya kamu ingin menyimpan pilihan durasi. Baru sekarang pertanyaan tentang penyimpanan data menjadi relevan.

**Lanjut:** Pilih cara menyimpan data →

### 10. Kapan project benar-benar membutuhkan database?

**Fokus bagian:** Memilih cara penyimpanan berdasarkan kebutuhan nyata, bukan karena database dianggap wajib.

Misalnya, setelah memakai timer beberapa kali, kamu ingin aplikasi mengingat durasi terakhir yang dipilih.

**Situasi A:**

> Saya ingin pilihan durasi tetap ada ketika timer dibuka lagi di browser yang sama.

**Pilihan:**

- Simpan di browser perangkat tersebut.
- Buat database online.

**Jawaban yang masuk akal:** Penyimpanan lokal di browser sudah bisa cukup. Data tetap tersedia pada browser itu, tetapi bisa hilang jika data browser dihapus dan tidak otomatis muncul di perangkat lain.

Sekarang kebutuhan berubah.

**Situasi B:**

> Saya ingin pilihan durasi yang sama muncul saat membuka timer dari laptop dan ponsel.

Di sini penyimpanan lokal saja tidak cukup, karena masing-masing perangkat memiliki data sendiri.

**Pilihan:**

- Tetap menyimpan data secara terpisah di setiap perangkat.
- Pertimbangkan penyimpanan online dan cara menghubungkan data dengan pengguna atau perangkat.

**Jawaban yang masuk akal:** Kebutuhan lintas perangkat membuat penyimpanan online mulai relevan. Sebelum menambahkan layanan, tentukan dulu data apa yang disimpan, bagaimana perangkat atau pengguna dikenali, dan siapa yang boleh mengakses data tersebut.

**Pembahasan:**

Database bukan tanda bahwa sebuah project lebih “serius”. Database hanyalah salah satu solusi ketika kebutuhan memang memerlukan data yang disimpan dan diakses dengan cara tertentu.

Untuk timer versi pertama, kita bahkan mungkin tidak membutuhkan penyimpanan sama sekali. Penyimpanan lokal baru masuk ketika ingin mengingat pilihan pada perangkat yang sama. Database online baru masuk ketika kebutuhan berkembang lagi.

**Baca lebih lanjut:** PostgreSQL adalah contoh database untuk menyimpan data terstruktur. Supabase adalah salah satu layanan yang menyediakan database dan fitur lain. Login, API, autentikasi, dan penyimpanan online sebaiknya ditambahkan karena ada kebutuhan yang jelas, bukan karena semua aplikasi dianggap harus memilikinya.

**Transisi:** Sekarang kita tahu cara memilih teknologi berdasarkan kebutuhan. Timer sudah bekerja, dan kalau dibutuhkan, datanya juga bisa disimpan dengan cara yang sesuai. Lalu muncul kebutuhan baru yang sangat mudah dipahami: kamu ingin mengirim timer ini ke teman agar ia bisa mencobanya.

**Lanjut:** Bawa aplikasi keluar dari laptopmu →

### 11. Kenapa link localhost tidak bisa dibuka temanmu?

**Fokus bagian:** Memahami perbedaan antara aplikasi yang berjalan di komputer sendiri dan aplikasi yang sudah tersedia melalui URL publik.

Saat mengembangkan aplikasi, kamu mungkin melihat alamat seperti:

> `localhost:5173`

Di laptopmu, alamat itu bisa membuka timer dengan normal. Kamu lalu mengirim link tersebut ke teman. Temanmu mencoba membukanya dan tidak melihat aplikasi yang sama.

Kenapa?

**Interaksi — pilih penjelasan yang paling tepat:**

- **“`localhost` menunjuk ke komputer orang yang sedang membuka alamat itu. Agar teman bisa mengakses timer milikmu, aplikasi perlu diterbitkan ke alamat publik.”** → Tepat.
- **“Teman harus memakai laptop dengan merek yang sama.”** → Bukan itu masalahnya. `localhost` selalu menunjuk ke perangkat masing-masing.

Proses membuat aplikasi tersedia lewat internet biasa disebut **deployment**. Tetapi sebelum menekan tombol deploy, kita perlu memastikan project aman dan siap dibagikan.

**Interaksi — apa yang dilakukan pada tiga kondisi berikut?**

| Temuan | Tindakan |
| --- | --- |
| Ada secret key layanan tertulis di kode frontend | Hentikan publikasi. Keluarkan secret dari frontend dan repository. Jika sudah terekspos, cabut atau rotasi key tersebut. |
| Fungsi utama belum pernah diuji | Uji dulu sebelum diterbitkan. |
| Tidak punya akun GitHub | Bukan masalah universal. Pilih jalur deployment yang sesuai dengan layanan yang digunakan. |

Setelah pemeriksaan, tampilkan dua contoh jalur:

- Upload langsung melalui layanan yang mendukungnya.
- Hubungkan repository Git ke layanan hosting.

Saat praktik sungguhan, arahkan peserta ke dokumentasi layanan yang digunakan karena framework yang didukung, proses build, dan tampilan antarmuka bisa berubah.

**Hasil publikasi — simulasi:** `https://timer-belajar.example`

Berikan label jelas bahwa URL tersebut hanya contoh.

**Pertanyaan terakhir:**

> Build berhasil dan URL sudah muncul. Apakah itu berarti aplikasinya pasti bekerja?

- **Belum. Buka URL publik dari perangkat lain lalu coba fungsi utamanya lagi.** → Tepat. Yang perlu diuji adalah versi yang benar-benar akan dipakai orang lain.
- **Ya. Build sukses berarti seluruh alur pengguna pasti benar.** → Build hanya membuktikan proses build selesai tanpa error tertentu. Itu belum membuktikan semua fungsi bekerja.

**Pembahasan:**

Deployment bukan sekadar mendapatkan URL. Setelah aplikasi berada di lingkungan publik, buka URL tersebut dan ulangi pengujian fungsi utama.

Secret juga perlu dipahami dengan hati-hati. Memindahkan sebuah nilai ke environment variable tidak otomatis membuatnya rahasia jika nilai itu tetap dikirim ke browser. Pada Vite, misalnya, variabel yang memang diekspos ke client dapat dibaca dari aplikasi frontend. [Sumber: dokumentasi Vite tentang environment variables](https://vite.dev/guide/env-and-mode).

**Transisi:** Sampai di sini, satu project kecil sudah melewati seluruh alur: ada masalah, agent memeriksa project, kita memberi arah, agent membuat perubahan, kita menguji hasilnya, lalu aplikasi diterbitkan dan diuji lagi. Timer hanyalah contoh. Sekarang kita akan mengambil pola kerjanya dan mengganti timer dengan ide yang benar-benar ingin kamu buat.

**Lanjut:** Susun ide project-mu →

### 12. Mulai project-mu dari kebutuhan, bukan dari daftar teknologi

**Fokus bagian:** Membawa pola yang sudah dipelajari ke project peserta sendiri.

Sebelum memilih framework, database, model, atau tool lain, mulai dari hal yang sama seperti pada timer: apa yang ingin dibuat dan bagaimana kita tahu versi pertamanya berhasil.

**Interaksi — isi empat bagian:**

1. **Siapa yang akan memakai?**  
   “Saya ingin membuat … untuk …”

2. **Apa yang harus bisa dilakukan versi pertama?**  
   “Versi pertama harus bisa …”

3. **Apa yang sengaja belum dibuat?**  
   “Untuk sekarang, belum perlu …”

4. **Bagaimana kamu akan menguji hasilnya?**  
   “Saya akan mencobanya dengan …”

**Contoh dari project yang baru kita ikuti:**

> Saya ingin membuat timer untuk saya yang belajar sendiri. Versi pertama punya durasi 25 menit serta tombol Mulai, Jeda, dan Reset. Belum perlu login atau kalender. Saya akan mencoba Mulai, Jeda, Reset, dan tampilannya di ponsel.

**Hasil:** Gabungkan jawaban peserta menjadi satu kartu brief yang bisa disalin.

Tampilkan checklist untuk membantu peserta meninjau jawabannya:

- Sudah jelas siapa yang memakai?
- Ada fungsi yang benar-benar bisa dicoba?
- Batas versi pertama sudah disebut?
- Sudah ada cara untuk mengecek apakah hasilnya bekerja?

Checklist ini membantu menemukan bagian yang masih kabur. Jangan menyatakan brief otomatis “benar” hanya karena semua kolom sudah terisi.

**Refleksi:**

- Keputusan apa yang tadi tetap harus kamu ambil sendiri meskipun memakai agent?
- Ada usulan agent yang sempat kamu pertanyakan atau tolak?
- Bagian mana yang baru terlihat setelah project benar-benar diuji?

Jawaban disimpan sebagai catatan pribadi tanpa skor benar atau salah.

**Ringkasan akhir:**

Jelaskan kebutuhan → beri konteks secukupnya → periksa rencana → beri izin dengan sadar → bangun sedikit demi sedikit → tinjau perubahan → uji → perbaiki → baru bagikan.

**Selesai simulasi:**

> Kamu tidak perlu mengingat setiap istilah dari course ini. Yang lebih penting adalah pola kerjanya: jangan biarkan agent menebak terlalu banyak, jangan menerima perubahan tanpa melihat dampaknya, dan jangan menganggap sesuatu selesai sebelum kamu sendiri mencoba hasilnya.

**Pilihan berikutnya:** Coba project sungguhan / Baca detail dan sumber / Kembali ke bagian sebelumnya

Kalau project nanti dibagikan sebagai tugas, demo, atau portofolio, jangan hanya menulis “dibuat dengan AI”. Jelaskan apa yang ingin diselesaikan, bantuan apa yang diberikan agent, keputusan apa yang kamu ambil, dan bagaimana kamu menguji hasilnya.

Git, testing, API, database, autentikasi, skills, dan MCP bisa dipelajari lebih dalam ketika project-mu benar-benar membutuhkan masing-masing konsep tersebut.

## Praktik sungguhan — setelah simulasi

**Pembuka peserta:**

> Tadi semua langkah masih berupa simulasi. Kalau kamu ingin mencoba pada project sungguhan, gunakan brief yang baru dibuat dan jalankan pola yang sama secara bertahap. Kali ini agent benar-benar bisa membaca atau mengubah file sesuai izin yang kamu berikan, jadi lihat setiap permintaan tindakan sebelum menyetujuinya.

1. Siapkan editor dan coding agent yang ingin dipakai. Jika kelas menggunakan Kilo, buka panduan setup di lampiran dan cocokkan dengan dokumentasi resminya. Periksa versi, model, izin, biaya, dan kebijakan data.
2. Buka folder project. Kalau belum mengenal strukturnya, minta agent menjelaskan isi folder dan cara menjalankan project tanpa melakukan perubahan.
3. Kirim brief yang sudah dibuat, lalu minta rencana. Pastikan ringkasannya sesuai dengan kebutuhanmu sebelum coding dimulai.
4. Terapkan satu bagian kecil dari rencana. Lihat file atau perintah yang ingin digunakan agent sebelum memberi izin.
5. Jalankan fungsi yang baru dibuat. Jangan menunggu seluruh project selesai untuk mulai menguji.
6. Jika menemukan masalah, jelaskan langkah sebelum masalah terjadi, hasil yang muncul, hasil yang seharusnya muncul, dan bagian yang tidak ingin diubah.
7. Setelah diperbaiki, ulangi pengujian pada fungsi yang bermasalah dan fungsi terkait.
8. Jika ingin membagikan project, periksa secret dan kebutuhan hosting. Setelah deployment, buka URL publik dari perangkat lain dan coba fungsi utamanya sekali lagi.

**Catatan hasil peserta:** nama project, fungsi yang dicoba, masalah yang ditemukan, keputusan perbaikan, hasil uji ulang, dan URL publik jika memang tersedia. Repository bersifat opsional. Project lokal tetap boleh dicatat sebagai hasil praktik; jangan diberi label berhasil deploy jika belum memiliki URL publik yang sudah diuji.

## Aturan alur untuk implementasi

Bagian ini untuk penyunting dan pengembang, bukan copy utama peserta.

- **Pembaca dianggap benar-benar baru.** Jangan mengasumsikan peserta sudah memahami coding agent, file project, terminal, Git, database, localhost, atau deployment. Konteks muncul lebih dulu; istilah dikenalkan setelah masalahnya terasa relevan.
- **Satu project, satu cerita.** Bagian 1–11 selalu mengikuti timer contoh yang sama. Kondisi di awal sebuah bagian harus berasal dari hasil bagian sebelumnya.
- **Timer harus punya alasan.** Timer bukan pembuka yang berdiri sendiri. Ia diperkenalkan sebagai project kecil yang sengaja dipilih agar peserta bisa melihat seluruh alur coding agent tanpa terbebani fitur yang banyak.
- **Urutan utama:** Pembuka → Bagian 1–12 → selesai simulasi. Praktik sungguhan dan bacaan tambahan bersifat opsional. Pre-test/post-test lama tetap berada di lampiran untuk peninjauan.
- **Masalah dulu, istilah kemudian.** Jangan membuka bagian dengan definisi teknis. Tunjukkan situasi yang membuat konsep tersebut diperlukan, lalu beri nama konsepnya.
- **Satu keputusan utama per layar.** Jika sebuah detail tidak dibutuhkan untuk keputusan saat itu, pindahkan ke **Baca lebih lanjut**.
- **Interaksi harus punya alasan.** Peserta tidak memilih hanya untuk menjawab kuis. Pilihannya harus mewakili keputusan yang benar-benar mungkin muncul dalam alur project.
- **Feedback menjelaskan akibat.** Hindari umpan balik yang hanya berbunyi “Benar” atau “Salah”. Jelaskan apa akibat pilihan tersebut terhadap project atau proses kerja.
- **Builder bagian 4:** Pilihan langsung memperbarui pratinjau brief. Rencana agent baru muncul setelah peserta menekan **Lihat rencananya**. Peserta boleh mencoba beberapa kombinasi.
- **Bagian 7 dan 9:** Hasil muncul setelah peserta melakukan aksi, bukan sebelumnya. Reset simulasi tidak menghapus progres course. Di bagian 9, peserta perlu menguji ulang Jeda dan Reset setelah perbaikan.
- **Tulisan bebas tidak diberi skor otomatis.** Bagian 12 menggunakan checklist mandiri. Peserta boleh memperbaiki jawabannya atau memilih **Lanjut tanpa menyimpan brief**.
- **Pilihan sebelumnya tetap tersimpan.** Jika peserta kembali dan mengubah brief di bagian 4, hasil simulasi bagian itu ikut diperbarui. Bagian 5–11 tetap memakai timer contoh yang sama dan tidak berpura-pura mengikuti seluruh tulisan bebas peserta.
- **Progres tersimpan.** Simpan posisi, pilihan, status bantuan, dan catatan peserta. Bacaan tambahan tidak menjadi syarat selesai.
- **Interaksi ramah keyboard dan ponsel.** Pengelompokan, pasangan, dan urutan harus dapat dilakukan tanpa drag-and-drop. Umpan balik tidak hanya dibedakan lewat warna. Timer menyediakan mode demonstrasi langkah demi langkah agar tidak membutuhkan respons cepat.
- **Visual harus membantu pemahaman.** Prompt, rencana, perubahan file, timer, serta perbandingan “yang seharusnya” dan “yang terjadi” dapat divisualisasikan dengan HTML/CSS. Jangan membuat terminal palsu yang seolah-olah menjalankan tindakan nyata. Label **simulasi** tetap terlihat pada hasil contoh.
- **Transisi wajib membawa konteks.** Jangan menulis “selanjutnya kita belajar database” atau “sekarang kita belajar deployment” tanpa alasan dari cerita. Sebutkan kebutuhan baru yang muncul pada project, lalu masuk ke konsepnya.
- **Jangan memaksakan konsep.** Jika suatu istilah atau teknologi tidak muncul secara alami dari kebutuhan timer, pindahkan ke bacaan tambahan atau praktik lanjutan.

## Cakupan materi lama

| Pelajaran asal | Tempat di alur baru |
| --- | --- |
| 1. Dari Copy-Paste ke Coding Agent | Pembuka dan Bagian 1; istilah vibe coding sebagai konteks tambahan |
| 2. Kenali Alat dan Modelnya | Bagian 2; agent loop terlihat lewat praktik di Bagian 7 |
| 3. Izin dan Cara Kerja Agent | Bagian 3, lalu diterapkan kembali saat agent mulai bekerja |
| 4. Beri Agent Arah dan Konteks | Bagian 4–6; AGENTS.md, skills, dan MCP sebagai detail tambahan di Bagian 5 |
| 5. Dari Laptop ke Internet | Bagian 10–11 dan praktik sungguhan |
| 6. Bangun Ide, Satu Bagian Dulu | Bagian 4, 6–8, lalu diterapkan ke ide peserta di Bagian 12 |
| 7. Uji, Perbaiki, dan Luncurkan | Bagian 9, 11, dan 12; pengujian ulang dibawa ke praktik sungguhan |

## Lampiran — materi asli dan sumber

Materi asli berikut disimpan sebagai referensi penyuntingan, bukan urutan bacaan utama peserta. Panduan alat bersifat versi tertentu; cocokkan dokumentasi resmi ketika dipakai. Asesmen lama belum diubah agar dapat dibandingkan dengan tujuan alur baru.

<details>
<summary>Buka materi asli, panduan setup, sumber, dan asesmen</summary>

## Materi Vibe Coding — salinan untuk revisi

Salinan materi kelas utama `/learn/vibe-coding` (bukan pilot). Berisi materi, latihan, pembahasan, panduan pemasangan, dan asesmen. Teks materi dipertahankan dari sumber saat diekspor. Mengedit file ini belum otomatis mengubah aplikasi.

Sumber: `docs/materi-pembelajaran-lengkap.md`, `src/features/learn/course-map.tsx`, dan `src/features/learn/assessments.ts`.

### Panduan awal di halaman kelas

#### Pasang Kilo Code di VS Code

Di kelas ini kamu akan belajar memakai AI coding agent lewat extension Kilo Code. Siapkan alatnya sekarang agar kamu bisa langsung mencoba saat masuk ke latihan.

Extension VS Code sudah membawa runtime Kilo; kamu tidak perlu memasang CLI untuk mengikuti kelas ini. Tampilan video bisa berbeda dari versi extension terbaru.

1. **Buka Extensions di VS Code.** Cari “Kilo Code”, lalu pilih **Install Pre-Release Version** dari menu di samping tombol Install.

2. **Masuk ke akunmu.** Buka panel Kilo Code di sidebar, pilih Sign In atau buat akun, lalu selesaikan prosesnya di browser.

3. **Pilih model dan izin.** Klik roda gigi di panel Kilo, lalu pilih Auto Free jika tersedia. Di Settings → Auto Approve, atur **read: Allow**, serta **edit** dan **bash: Ask**.

4. **Coba di sebuah project.** Buka folder project di VS Code, lalu minta agent Ask menjelaskan isi folder tanpa mengubah file.

#### Tautan panduan

- [Panduan instalasi resmi ↗](https://kilo.ai/docs/getting-started/installing)

- [Video instalasi di VS Code ↗](https://www.youtube.com/watch?v=rqyv8iM6KDA)

- [Video penggunaan dasar ↗](https://youtu.be/4YPE73HE7r8?si=5HHsMuq1WfsHTNpW)

---

### Materi kelas


**Label kelas:** KURSUS 03 · VIBE CODING

**Gambaran kelas:** Di kelas ini kita berfokus pada penggunaan AI coding agent untuk membangun aplikasi kecil. Kamu akan belajar memberi agent arah, memeriksa rencananya, mengizinkan perubahan yang diperlukan, lalu menguji dan membagikan hasilnya.

**Peta belajar:** Mulai dari membedakan AI chat dan coding agent, lalu pelajari pilihan alat dan model, permission, konteks project, proses implementasi bertahap, pengujian, dan deployment.

**Ringkasan katalog:** Gunakan coding agent untuk mengubah ide aplikasi kecil menjadi versi yang bisa dijalankan, diuji, dan dibagikan melalui URL publik.

![Seseorang sedang bekerja di laptop di ruang kerja yang nyaman](../public/course-visuals/vibe-coding-person-laptop.jpg)

**Ilustrasi pembuka:** Seseorang sedang bekerja di laptop di ruang kerja yang nyaman. [Foto: Nenad Stojković · CC BY 2.0](https://commons.wikimedia.org/wiki/File:Person_working_on_laptop_in_a_cozy_indoor_setting_during_daytime.jpg).

#### Pelajaran 1: Dari Copy-Paste ke Coding Agent

**Pertanyaan utama:** Apa yang berubah saat AI bisa membuka project?

AI chat dan coding agent sama-sama bisa membantu menulis kode, tetapi cara kerjanya terhadap project berbeda. Dengan chat biasa, kita biasanya menyalin kode, pesan error, dan konteks project secara manual. Coding agent bisa diberi akses langsung ke file dan tools di dalam project. Karena itu, latihan di kelas Vibe Coding ini berfokus pada **cara memakai AI coding agent** untuk mengerjakan project. Contoh error `Module not found` di pelajaran ini akan memperlihatkan perbedaannya.

##### 1.1 Dulu: salin, tempel, lalu cari error

Dengan AI chat biasa, alurnya sering dimulai dari pertanyaan di browser, misalnya: ‘Buat halaman login sederhana dengan email, password, dan tombol masuk.’ Setelah kode disalin ke VS Code dan dijalankan di project, bisa saja muncul error yang tidak terlihat saat kode masih berada di chat:

> Module not found: file yang dicari project tidak ditemukan.

Kamu kembali ke AI, menyalin perbaikan, menempelkannya, lalu menjalankan project lagi. Proses ini bisa berulang karena AI tidak otomatis mengetahui struktur folder, library, gaya kode, atau hubungan antarfile di project kamu.

AI chat tetap membantu menulis fungsi, CSS, query, menjelaskan error, bahkan membuat satu file penuh. Namun **kita sendiri yang harus memindahkan konteks dan perubahan antara AI dan project**.

**Alur kerja dengan AI chat**

- **AI di browser:** Menjawab dari konteks yang kita kirim.
- **VS Code:** Kita sendiri mencari file dan memindahkan kode.
- **Error:** Kembali ke AI, tempel pesan error, lalu coba lagi.

##### 1.2 Sekarang: agent bisa bekerja di dalam project

Dengan coding agent yang memiliki akses ke project, konteks tidak harus dipindahkan seluruhnya secara manual. Untuk error yang sama, kamu bisa meminta agent memeriksa project terlebih dahulu: ‘Cari penyebab `Module not found` di project ini. Jelaskan file yang terkait dan rencana perbaikannya sebelum mengubah kode.’

Coding agent bisa membaca file, mencari bagian relevan, membuat rencana, meminta izin, mengubah file, menjalankan perintah, lalu melihat hasilnya. Agent tidak hanya mengirim potongan kode; agent juga memakai tools untuk bekerja langsung pada project.

Kemampuan ini tetap punya batas. Agent bisa salah memahami kebutuhan, mengubah file yang keliru, atau membuat bug. Karena itu kita perlu meninjau perubahan dan mencoba aplikasinya sendiri.

**Alur kerja dengan coding agent**

- **Pahami:** Baca struktur dan kode project.
- **Rencanakan:** Tentukan file dan langkah yang relevan.
- **Minta izin:** Tunggu persetujuan sebelum tindakan tertentu.
- **Kerjakan:** Edit file atau jalankan perintah sesuai izin.
- **Periksa:** Lihat hasil dan lanjutkan bila masih ada pekerjaan.

##### 1.3 Perbedaan coding agent dan AI chat

Perbedaan utama kedua pendekatan tadi ada pada akses ke tools dan project. Gunakan pertanyaan berikut untuk memastikan perbedaannya sudah jelas.

**CHECKPOINT 1: Apa yang membedakan coding agent?**

**Latihan interaktif**

Halaman login di projectmu gagal saat dijalankan. Bantuan mana yang khas dari coding agent?

1. Menjelaskan kemungkinan penyebab dari pesan error yang kamu salin ke chat. — AI chat biasa juga bisa membantu menafsirkan pesan error yang kamu berikan.

2. Membaca file yang terkait, mengubahnya sesuai izin, lalu menjalankan langkah pemeriksaan di project. **(jawaban tepat)** — Tepat. Agent dapat memakai alat untuk bekerja langsung pada project dan melihat hasilnya.

3. Menulis ulang contoh halaman login di chat untuk kamu salin sendiri ke VS Code. — Itu masih mengandalkan kamu untuk memindahkan perubahan ke project.

**Pembahasan:** Coding agent bukan model yang lebih pintar, melainkan model yang diberi alat dan izin. Itu sebabnya izin dan pemeriksaan jadi bahasan penting di kursus ini.

##### 1.4 Vibe coding: membangun lewat percakapan

Pendekatan membangun software dengan bantuan AI melalui percakapan sering disebut **vibe coding**. Istilah ini populer pada 2025 setelah digunakan Andrej Karpathy dan sampai sekarang dipakai dengan arti yang cukup luas. Di kelas ini, kita mempraktikkannya bersama **AI coding agent** yang bisa bekerja di dalam project: jelaskan tujuan, beri konteks, tinjau rencana, minta agent membantu implementasi, lalu uji dan perbaiki hasilnya.

Vibe coding bukan berarti menyerahkan seluruh project kepada AI lalu selalu menekan Accept. Kamu tidak harus sudah mahir programming untuk mulai, tetapi kamu tetap perlu tahu apa yang ingin dibuat, membaca perubahan penting, dan mencoba apakah hasilnya benar-benar bekerja.

**Sumber bacaan**

- [Andrej Karpathy · unggahan tentang vibe coding](https://x.com/karpathy/status/1886192184808149383)

**Alur kerja yang digunakan di kursus**

- **Percakapan:** Jelaskan kebutuhan dan batasan.
- **Agent:** Membantu membuat perubahan pada project.
- **Manusia:** Meninjau, menguji, dan menentukan apakah hasil sesuai.

##### 1.5 Peran kita: menentukan arah dan memeriksa hasil

Saat memakai coding agent, fokus kita tidak hanya pada cara menulis kode. Kita juga perlu menjelaskan kebutuhan, menentukan batasan, dan memeriksa hasil yang dibuat agent. Tiga pertanyaan yang perlu dijawab adalah: **‘Apa yang perlu dibuat, apa batasnya, dan bagaimana saya tahu hasilnya benar?’**

Kamu tetap menentukan kebutuhan, batasan, dan keputusan akhir. Agent bisa membantu memilih cara implementasi; kamu memastikan cara itu sesuai project.

**Peran pengguna saat bekerja dengan agent**

- **Kamu menentukan:** Requirement, batasan, dan standar hasil yang benar.
- **Agent membantu:** Memilih cara implementasi dan membuat perubahan pada project.

##### 1.6 Kalau kamu belum pernah coding

Kamu tidak harus memahami semua istilah teknis sebelum mengikuti bagian berikutnya. Sebagai awal, fokus pada tujuan project dan hasil yang terlihat di layar. Istilah seperti VS Code, terminal, file project, Git, dan deployment akan dijelaskan sambil digunakan dalam contoh.

Beberapa bagian berikutnya membahas izin tool dan cara agent bekerja lebih rinci. Jika masih baru dalam coding, fokus dulu pada konsep utamanya dan kembali ke detail teknis setelah mencoba project pertama.

**Jalur utama dan bagian opsional**

- **Jalur utama:** Pengalaman coding tidak diperlukan untuk mengikuti konsep dasarnya.
- **Lebih Dalam (Opsional):** Bahasan teknis bisa dipelajari bertahap jika kamu ingin mendalami coding agent.

##### Penutup pelajaran

**Yang perlu diingat:** Saat halaman login gagal, coding agent bisa mencari file yang terkait dan mencoba perbaikan di project. Kamu tetap perlu membaca perubahan dan menjalankan halaman itu sendiri.

**Cek pemahaman:** Coding agent sudah memperbaiki halaman login di projectmu. Sebelum memakai hasilnya, apa yang perlu kamu lakukan?

1. Minta agent menjalankan tes otomatis; jika lulus, langsung gunakan halaman itu. — Tes membantu, tetapi mungkin belum mencakup alur login yang kamu butuhkan.

2. Periksa ringkasan perubahan dari agent dan lihat tangkapan layar hasilnya. — Ringkasan dan gambar belum menunjukkan apakah halaman login benar-benar bekerja saat dicoba.

3. Baca perubahan yang dibuat dan coba sendiri alur login untuk memastikan perbaikannya bekerja. **(jawaban tepat)** — Benar. Kamu perlu memahami perubahan penting dan mencoba hasilnya sebelum melanjutkan.

#### Pelajaran 2: Kenali Alat dan Modelnya

**Pertanyaan utama:** Alat mana yang cocok untuk kebutuhanmu?

Tidak semua alat AI untuk coding dibuat untuk pekerjaan yang sama. Ada yang paling nyaman untuk berdiskusi dan memahami konsep, ada yang cepat membuat prototype dari browser, dan ada yang dirancang untuk bekerja langsung dengan file serta terminal. Pelajaran ini membantu membedakan jenis alat itu dan memilih model sesuai tingkat kesulitan tugas.

##### 2.1 Tiga kelompok alat yang sering ditemui

Pilih tool berdasarkan pekerjaan yang ingin dilakukan. Kalau masih merumuskan ide aplikasi, **AI chat** seperti ChatGPT, Claude, atau Gemini bisa dipakai untuk brainstorming, menjelaskan konsep, dan membandingkan pilihan. Hasil dari chat kemudian kamu terapkan sendiri ke project.

Ingin cepat mencoba tampilan dari browser? **AI app builder** seperti Replit Agent atau Lovable bisa membuat prototype dan mengurus sebagian persiapan. Paket gratis biasanya punya batas penggunaan.

Sudah punya project dengan beberapa file? **AI coding agent** seperti Kilo Code, OpenCode, Codex, Claude Code, atau Cursor bisa bekerja dengan file, repository, terminal, dan alat development.

**Jenis alat untuk kebutuhan yang berbeda**

- **AI chat:** Untuk bertukar ide, memahami konsep, menyusun kebutuhan, dan membandingkan pilihan.
- **AI app builder:** Untuk membuat prototype dari browser dengan persiapan yang lebih ringan.
- **AI coding agent:** Untuk bekerja dengan file, repository, terminal, dan project development.

##### 2.2 Kita berlatih dengan Kilo, tetapi prinsipnya berlaku di tool lain

Untuk latihan, kita memakai **Kilo Code**, sebuah extension AI coding agent di VS Code. Kamu akan membuka project di VS Code, berbicara dengan agent lewat panel Kilo, lalu melihat perubahan yang dibuatnya pada file. Panduan pemasangan sudah tersedia di awal halaman kelas Vibe Coding; langkah pengaturannya dibahas lagi saat kamu mulai praktik di pelajaran 5.

Tool yang kamu pakai nanti bisa berbeda, tetapi alur dasarnya tetap mirip: **tujuan → konteks → rencana → agent memakai alat → tinjau → uji → perbaiki**.

**Sumber bacaan**

- [Dokumentasi Kilo Code untuk VS Code](https://kilo.ai/docs/code-with-ai/platforms/vscode)

**Kilo sebagai alat latihan**

- **Kilo Code:** Extension VS Code yang dipakai untuk latihan bersama coding agent di kelas ini.
- **Tool lain:** OpenCode, Codex, Claude Code, Cursor, dan alat lain bisa punya interface berbeda.
- **Pola umum:** Tujuan → konteks → rencana → alat → tinjau → uji → perbaiki.

##### 2.3 Mengenal agent loop

Cara kerja agent lebih mudah dipahami dari perubahan kecil. Misalnya, kamu meminta tulisan tombol pada halaman login diganti menjadi ‘Masuk’. Agent membaca permintaan dan konteks, mencari file yang memuat tombol itu, membuat perubahan jika diizinkan, lalu melihat hasilnya.

Proses berulang ini sering disebut **agent loop**. Agent bisa melanjutkan pekerjaan berdasarkan hasil tindakan sebelumnya sampai tugas selesai atau perlu bertanya lagi.

**Agent loop: dari permintaan ke tindakan**

- **Baca request:** Pahami tugas dan konteksnya.
- **Pilih tool:** Tentukan alat yang tepat untuk membaca atau mengubah project.
- **Lakukan:** Ambil tindakan jika diizinkan.
- **Lihat hasil:** Gunakan hasilnya untuk memilih langkah berikutnya.

**Diagram:** Agent tidak berhenti setelah memberi jawaban. Agent bisa memakai tool, membaca hasilnya, lalu menentukan langkah berikutnya. Kamu tetap memeriksa hasil akhirnya.

Agent menerima tujuan, merencanakan langkah, memakai alat, lalu memeriksa hasilnya. Jika hasilnya belum sesuai, agent bisa mengulangi langkah-langkah ini.

##### 2.4 Model dan agent bukan hal yang sama

Saat memakai coding agent, dua istilah yang sering tercampur adalah **model** dan **agent**. Model dan agent berkaitan, tetapi perannya tidak sama.

**Model** adalah AI yang menghasilkan jawaban dan melakukan penalaran. **Agent** adalah sistem yang menghubungkan model dengan konteks, instruksi, alat, izin, dan environment.

Cara paling mudah membedakannya: model menghasilkan respons, sedangkan agent mengatur bagaimana model memakai konteks, tools, permission, dan environment untuk menyelesaikan tugas. Karena itu, model yang sama bisa memberi pengalaman berbeda di agent yang berbeda.

##### 2.5 Pilih model sesuai tingkat kesulitan

Kebutuhan model bergantung pada kerumitan tugas. Mengubah tulisan tombol dari ‘Submit’ menjadi ‘Kirim’ jauh lebih sederhana daripada mencari bug yang melibatkan banyak file dan state aplikasi.

Untuk perubahan sederhana, model yang lebih ringan atau gratis mungkin cukup. Untuk pekerjaan rumit, model yang lebih mampu bisa membantu. Pertimbangkan juga biaya, kecepatan, context window, privasi, dan kemampuan yang dibutuhkan.

**Benchmark punya konteks.** SWE-bench menguji penyelesaian issue software di repository; LiveCodeBench berfokus pada soal coding; Terminal-Bench menguji penggunaan terminal dan alat. Angka dari satu benchmark tidak otomatis menentukan model terbaik untuk semua tugas. Agent, alat, prompt, environment, dan batas token juga berpengaruh.

**Sumber bacaan**

- [SWE-bench](https://github.com/swe-bench/SWE-bench)
- [LiveCodeBench](https://github.com/GOTOIA/livecodebench)
- [Terminal-Bench](https://github.com/harbor-framework/terminal-bench)

**Sesuaikan model dengan kerumitan tugas**

- **Perubahan kecil:** Ganti label tombol: model ringan mungkin sudah cukup.
- **Bug lintas file:** Masalah pada banyak file dan state mungkin butuh model lebih mampu.
- **Bandingkan:** Biaya, kecepatan, context window, privasi, dan benchmark.
- **Checkpoint 2:** Tugas kecil tidak otomatis memerlukan model paling mahal.

##### 2.6 Perlukah model paling mahal?

Untuk perubahan kecil, model ringan sering cukup. Namun jika tugas mulai melibatkan beberapa file dan model yang dipakai belum bisa mengikuti masalahnya, kamu mungkin perlu mencoba model yang lebih mampu. Pertimbangkan situasi berikut.

Model ringan sudah diberi langkah reproduksi dan log untuk bug lintas file, tetapi dua kali menyarankan perubahan yang tidak terkait. Apa langkah berikutnya?

**A.** Ulangi permintaan tanpa log agar model tidak terdistraksi oleh detail error.

**B.** Coba model lebih mampu dengan konteks yang sama, lalu tinjau penjelasan dan perubahannya.

**C.** Pilih model dengan skor benchmark tertinggi dan langsung terima perubahan pertamanya.

**Pembahasan**

**B.** Log dan langkah reproduksi tetap berguna. Model yang lebih mampu layak dicoba saat model ringan belum mampu menelusuri masalah yang lebih rumit, tetapi hasilnya tetap perlu diperiksa.

**Membaca benchmark sesuai konteksnya**

- **SWE-bench:** Menguji penyelesaian issue software pada repository.
- **LiveCodeBench:** Berfokus pada pemecahan soal coding.
- **Terminal-Bench:** Melihat kemampuan agent menggunakan terminal dan tools.

##### 2.7 Auto Free untuk latihan awal

Kilo memiliki pilihan **Auto Free** yang mengarahkan permintaan ke model gratis yang tersedia. Model gratis bisa terkena batas penggunaan dan pilihan modelnya bisa berubah.

Jika ingin tetap memakai opsi gratis, periksa juga model yang dipakai autocomplete atau fitur background karena pengaturannya bisa terpisah. Perhatikan privasi: setiap provider bisa punya kebijakan penyimpanan data yang berbeda. Jangan kirim data pribadi atau rahasia sebelum memahami kebijakan tool yang kamu pakai.

**Sumber bacaan**

- [Kilo · Menggunakan Kilo secara gratis](https://kilo.ai/docs/getting-started/using-kilo-for-free)
- [Kilo · Model dan provider](https://kilo.ai/docs/gateway/models-and-providers)

##### Penutup pelajaran

**Yang perlu diingat:** Jika masih mencari ide, mulai dari chat. Jika perlu memperbaiki file project, gunakan agent. Pilih model yang cukup untuk tugas itu dan lihat kebijakan datanya sebelum mengirim isi project.

**Cek pemahaman:** Kamu hanya ingin mengganti satu label tombol. Apa pilihan yang masuk akal?

1. Mulai dengan model paling mampu agar perubahan kecil itu cukup dikerjakan sekali. — Model lebih kuat bisa membantu, tetapi biayanya belum tentu sepadan untuk tugas yang sederhana.

2. Coba model ringan yang cukup, lalu periksa apakah labelnya berubah tanpa mengganggu bagian lain. **(jawaban tepat)** — Tepat. Pilihan model mengikuti kerumitan tugas, dan hasilnya tetap perlu diperiksa.

3. Pilih model dengan skor benchmark coding tertinggi tanpa melihat biaya tugas ini. — Benchmark memberi petunjuk kemampuan umum, tetapi belum menentukan pilihan paling masuk akal untuk perubahan kecil.

#### Pelajaran 3: Izin dan Cara Kerja Agent

**Pertanyaan utama:** Tindakan apa yang perlu kamu izinkan?

Coding agent bisa membaca file, mengubah kode, dan menjalankan perintah di terminal. Setiap tindakan punya dampak yang berbeda, jadi izin sebaiknya diberikan sesuai kebutuhan. Pelajaran ini membahas permission dan pilihan agent di Kilo agar kamu tahu bantuan apa yang sedang dipakai dan tindakan apa yang boleh dijalankannya.

##### 3.1 Agent bisa melakukan tindakan

Satu tugas agent bisa melibatkan beberapa tindakan: membuka file, mengubah tombol masuk, dan menjalankan aplikasi. Dampaknya tidak sama. Membaca file hanya memberi konteks; mengedit file mengubah project; menjalankan perintah bisa memasang package atau memulai program.

Karena itu, izin membantu kita memilih tindakan yang boleh langsung berjalan, yang perlu kita setujui, dan yang sebaiknya diblokir.

**Jenis tindakan yang bisa dilakukan agent**

- **Contoh tindakan:** Membaca file, mengedit project, menjalankan command, atau memasang package.

##### 3.2 Allow, Ask, Deny

Di Kilo, permission bisa diatur per alat atau perintah:

**Allow**: tindakan boleh berjalan tanpa bertanya.

**Ask**: agent perlu meminta izin lebih dulu.

**Deny**: tindakan diblokir.

Kilo juga memiliki aturan bawaan yang dapat mengizinkan beberapa tindakan secara otomatis. Karena itu, periksa pengaturan izin di panel Kilo sebelum memulai latihan; jangan berasumsi semua tindakan akan selalu meminta persetujuan.

**Sumber bacaan**

- [Kilo · Agent Permissions](https://kilo.ai/docs/customize/agent-permissions)
- [Kilo · Auto-Approving Actions](https://kilo.ai/docs/getting-started/settings/auto-approving-actions)

**Allow, Ask, dan Deny**

**Diagram:** Setiap tindakan agent mengikuti salah satu dari tiga izin ini. Dengan Ask, agent berhenti dan menunggu persetujuanmu sebelum melanjutkan.

Jika memilih **Ask**, agent berhenti dan menunggu persetujuanmu sebelum menjalankan tindakan tersebut. Ini berguna untuk perubahan yang ingin kamu periksa lebih dulu.

##### 3.3 Berikan izin secukupnya

Untuk latihan awal, gunakan pengaturan yang sederhana dan hati-hati: izinkan agent membaca file, tetapi minta persetujuan sebelum agent mengubah file atau menjalankan perintah terminal. Tindakan di luar project juga perlu diperiksa terlebih dahulu.

Misalnya agent ingin menjalankan `npm install random-ui-library`. Sebelum menyetujui, tanyakan kenapa package baru diperlukan. Bisa jadi memang berguna; bisa juga CSS yang sudah ada sudah cukup.

Aturan bisa dibuat lebih spesifik: `git status` bisa diizinkan otomatis, sedangkan perintah yang menghapus file sebaiknya ditolak atau tetap meminta persetujuan. Sebelum menyetujui perintah, baca dulu apa yang akan dijalankan dan apa dampaknya.

**Periksa tindakan sebelum memberi izin**

- **npm install random-ui-library:** Tanyakan kenapa package baru diperlukan.
- **git status:** Perintah baca status bisa dibuat boleh jika sesuai aturan project.
- **Menghapus file:** Pahami target dan dampaknya sebelum memberi izin.

##### 3.4 Pilih agent: Ask, Plan, Code, Debug

Permission mengatur tindakan yang boleh dilakukan. Di Kilo, kamu juga bisa memilih agent dari menu di panel chat sesuai jenis bantuan yang sedang dibutuhkan.

**Ask** untuk memahami: ‘Jelaskan struktur project ini. Jangan ubah file.’

**Plan** untuk merancang: ‘Saya ingin menambah pencarian. Jangan coding dulu; jelaskan file yang berubah dan cara kerjanya.’

**Code** untuk menerapkan: ‘Implementasikan tahap pertama dari rencana. Jangan ubah bagian lain.’

**Debug** untuk mencari penyebab: ‘Tombol ini tidak bekerja. Cari penyebabnya dan tunjukkan bukti sebelum mengubah kode.’

##### 3.5 Project belum kamu kenal: mulai dari mana?

Permission saja belum cukup. Kalau kamu belum mengenal project-nya, pahami dulu struktur dan alurnya supaya perubahan dari agent lebih mudah diperiksa.

**CHECKPOINT 3: Project belum kamu kenal**

**Latihan interaktif**

Kamu belum tahu cara kerja sebuah project. Langkah pertama yang lebih aman?

1. Minta agent membuat contoh fitur kecil dahulu supaya kamu bisa menebak alur project dari perubahan itu. — Perubahan contoh tetap bisa menyentuh bagian yang belum kamu pahami.

2. Minta agent menjelaskan struktur dan alur project sebelum menyusun perubahan. **(jawaban tepat)** — Tepat. Penjelasan itu memberi pijakan untuk menilai rencana kerja agent.

**Pembahasan:** Menulis ulang tanpa memahami project membuat kamu sulit menilai apakah perubahan yang dibuat memang diperlukan. Memahami struktur dan alurnya lebih dulu memudahkan kamu meninjau rencana sebelum implementasi.

##### Penutup pelajaran

**Yang perlu diingat:** Sebelum menyetujui perintah tadi, baca apa yang akan dijalankan dan mengapa. Untuk belajar, biarkan agent membaca file; minta persetujuan saat ia akan mengubah atau menjalankan sesuatu.

**Cek pemahaman:** Agent meminta izin memasang package baru hanya untuk mengganti warna satu tombol. Apa yang sebaiknya kamu lakukan?

1. Tanyakan alasan package diperlukan dan periksa apakah CSS yang sudah ada cukup untuk mengubah warna tombol. **(jawaban tepat)** — Benar. Periksa kebutuhan dan dampak perintah sebelum memberi izin.

2. Setujui setelah agent menunjukkan package itu populer dan masih diperbarui. — Package yang terawat pun belum tentu diperlukan untuk perubahan satu warna.

3. Setujui pemasangan di branch terpisah, lalu tinjau hasil warnanya sebelum digabung. — Branch terpisah membatasi dampak, tetapi belum menjawab mengapa package baru dibutuhkan.

#### Pelajaran 4: Beri Agent Arah dan Konteks

**Pertanyaan utama:** Bagaimana agar agent memahami project?

Jika kebutuhan project tidak dijelaskan, agent harus menebak sendiri fitur dan teknologinya. Untuk project kecil, tebakan ini sering membuat solusi menjadi terlalu rumit. Misalnya, prompt ‘buat aplikasi belajar yang keren’ bisa membuat agent merencanakan login, database, dan kalender padahal kamu hanya ingin timer belajar sederhana.

##### 4.1 Jangan mulai dari ‘buat aplikasi keren’

Prompt yang terlalu umum membuat agent harus menebak banyak hal. Agent bisa menambahkan akun pengguna, kalender, atau database karena fitur-fitur itu terdengar masuk akal untuk aplikasi belajar, padahal timer sederhana belum membutuhkannya.

> Rencana agent — Buat akun pengguna, simpan data di database, tambahkan kalender dan pengingat.

Coba sebutkan siapa yang akan memakai aplikasi, satu masalah yang dibantu, dan fungsi pertama yang perlu bekerja. Untuk fitur besar, lanjutkan dengan **Ide → Kebutuhan → Rencana → Bangun → Uji → Perbaiki**. Untuk mengganti warna tombol, langkah panjang seperti itu tidak perlu.

**Sesuaikan proses dengan ukuran perubahan**

- **Perubahan kecil:** Warna tombol mungkin bisa langsung diubah.
- **Fitur baru:** Rencana membantu memeriksa kebutuhan dan file yang perlu berubah.
- **Aplikasi besar:** Pecah pekerjaan; jangan mulai dari ‘buat semuanya’.

##### 4.2 Simpan aturan project yang terus berlaku

Kalau ada aturan yang harus diikuti sepanjang project—misalnya ‘jangan menambah library tanpa alasan’, ‘jangan ubah file di luar tugas’, atau ‘pastikan tampilan nyaman di ponsel’—aturan itu bisa ditulis di **AGENTS.md**.

File ini berisi petunjuk yang perlu diikuti agent selama bekerja di project. Contohnya: utamakan solusi sederhana; jelaskan perubahan besar sebelum mengerjakannya; jangan menambah dependency tanpa alasan; setelah perubahan, pastikan aplikasi tetap bisa dijalankan.

Tidak semua project memerlukannya. Untuk project kecil, satu catatan `PROJECT.md` tentang tujuan, fitur, batasan, dan definisi selesai mungkin cukup. `product-spec.md` atau `architecture.md` baru berguna ketika project sudah cukup kompleks untuk membutuhkan dokumentasi tambahan.

**Sumber bacaan**

- [Kilo · Custom Instructions](https://kilo.ai/docs/customize/custom-instructions)

**AGENTS.md sebagai petunjuk project**

- **Contoh aturan:** Utamakan solusi sederhana; jangan tambah dependency tanpa alasan; batasi perubahan pada tugas.
- **Tidak wajib:** Project kecil mungkin cukup punya catatan PROJECT.md yang ringkas.
- **Dokumen lain:** Product spec atau architecture docs berguna jika ukuran project membutuhkannya.

##### 4.3 Skills menyimpan langkah kerja untuk tugas tertentu

Selain aturan umum project, ada jenis tugas yang selalu mengikuti langkah serupa. Untuk tugas seperti ini, agent bisa diberi playbook melalui **skill** yang menjelaskan langkah kerja yang perlu diikuti.

**AGENTS.md** menyimpan aturan atau konteks yang berlaku untuk project. **SKILL.md** berisi petunjuk untuk jenis tugas tertentu, misalnya langkah membuat interface atau meninjau tulisan.

Kilo bisa menemukan skill yang tersedia dan membaca instruksinya ketika skill tersebut relevan dengan tugas. Menambahkan banyak skill tidak otomatis membuat agent lebih baik; skill yang tidak berkaitan justru menambah informasi yang harus diproses.

**Sumber bacaan**

- [Kilo · Skills](https://kilo.ai/docs/customize/skills)

##### 4.4 MCP menambahkan akses ke alat lain

Kalau agent perlu memakai tool atau layanan di luar project, kita perlu memberi akses ke tool itu, bukan hanya menjelaskannya lewat prompt. Salah satu cara yang bisa dipakai adalah MCP.

**MCP (Model Context Protocol)** adalah cara menghubungkan agent dengan tools atau layanan tambahan, seperti alat desain, database, dokumentasi, atau pemantauan.

Cara membedakannya cukup sederhana: AGENTS.md berisi aturan project, SKILL.md berisi langkah kerja untuk tugas tertentu, dan MCP memberi agent akses ke tool atau layanan tambahan. Project pertama tidak perlu MCP jika belum ada kebutuhan yang jelas.

**Sumber bacaan**

- [Kilo · Menggunakan MCP](https://kilo.ai/docs/automate/mcp/using-in-kilo-code)

**MCP untuk menghubungkan tools tambahan**

- **Contoh:** Alat desain, database, dokumentasi, atau pemantauan.
- **Ingat:** Untuk project pertama, MCP tidak wajib.

##### 4.5 Aktivitas · pilih konteks yang cukup

Tidak semua project membutuhkan AGENTS.md, skills, dan MCP sekaligus. Untuk project kecil, pilih hanya konteks dan tools yang benar-benar membantu tugas saat ini.

**AKTIVITAS: Quiz kecil tanpa login**

**Latihan interaktif**

Kamu membuat quiz kecil tanpa login. Apa yang perlu diminta lebih dulu?

1. Minta agent menyiapkan struktur plugin dan beberapa paket soal agar quiz mudah diperluas nanti. — Persiapan untuk kemungkinan nanti menambah bagian yang belum dibutuhkan quiz pertama.

2. Minta satu alur quiz yang bisa dijalankan di ponsel, lalu tambah layanan lain jika kebutuhan muncul. **(jawaban tepat)** — Tepat. Fungsi yang bisa dicoba memberi dasar untuk memutuskan tambahan berikutnya.

**Pembahasan:** Tambahkan hanya konteks dan tool yang memang dibutuhkan untuk tugas sekarang. Login, database, skill tambahan, atau MCP bisa ditambahkan nanti ketika memang ada kebutuhan.

##### Penutup pelajaran

**Yang perlu diingat:** Untuk timer itu, tulis siapa penggunanya, satu fungsi utama, dan fitur yang belum diperlukan. Jika aturan yang sama terus dibutuhkan, simpan sebagai petunjuk project.

**Cek pemahaman:** Kapan AGENTS.md paling berguna?

1. Saat kamu ingin menyimpan langkah penyelidikan untuk satu bug yang sedang dikerjakan. — Catatan tugas sekali pakai lebih cocok disimpan bersama pembahasan bug itu.

2. Saat kamu ingin membandingkan beberapa ide fitur yang belum disepakati tim. — Daftar ide sementara bukan petunjuk tetap tentang cara agent bekerja di project.

3. Saat ada aturan project yang perlu diikuti agent dalam banyak tugas. **(jawaban tepat)** — Tepat. AGENTS.md menyimpan petunjuk berulang tentang cara bekerja di project.

#### Pelajaran 5: Dari Laptop ke Internet

**Pertanyaan utama:** Apa yang membuat aplikasi bisa diakses orang lain?

Aplikasi yang berjalan di laptopmu belum tentu bisa dibuka dari perangkat lain. Jika timer belajar hanya tersedia di `localhost`, alamat itu hanya menunjuk ke aplikasi yang berjalan di komputermu sendiri. Pelajaran ini membahas perbedaan localhost dan deployment, kapan database dibutuhkan, serta cara menyimpan API key atau secret dengan aman.

##### 5.1 Localhost hanya berjalan di perangkatmu

Alamat seperti `http://localhost:5173` menunjuk ke aplikasi yang berjalan di komputer sendiri. Di laptop temanmu, alamat itu mencari aplikasi di komputernya, bukan di laptopmu.

Agar temanmu bisa mencoba aplikasinya, kamu perlu melakukan **deployment**, yaitu menerbitkan aplikasi ke layanan yang memberi URL publik, misalnya `nama-project.vercel.app`.

**Localhost dan URL publik**

- **localhost:5173:** Alamat ini membuka aplikasi yang berjalan di komputer sendiri.
- **Deployment:** Menerbitkan aplikasi agar bisa diakses pengguna melalui URL publik.

##### 5.2 Tidak semua aplikasi perlu database

Database baru diperlukan jika ada data yang perlu disimpan di luar browser atau dipakai oleh lebih dari satu perangkat/pengguna. Timer belajar yang hanya menyimpan pengaturan di browser yang sama, misalnya, belum membutuhkan database server. Kalkulator, kuis sederhana, portofolio interaktif, atau tracker lokal juga bisa dibuat tanpa database online.

Database atau backend mulai berguna ketika aplikasi membutuhkan login, sinkronisasi data antarperangkat, banyak pengguna, atau penyimpanan online. Supabase adalah salah satu opsi yang menyediakan PostgreSQL, autentikasi, storage, dan API. Untuk project pertama, kamu tidak perlu menambahkannya jika fitur-fitur itu belum dibutuhkan.

**Kapan database dibutuhkan**

- **Tanpa database:** Pomodoro, calculator, quiz, portfolio, random generator, atau tracker lokal.
- **Database mungkin perlu:** Login, data lintas perangkat, banyak pengguna, atau data online.
- **Supabase:** Salah satu opsi untuk PostgreSQL, autentikasi, storage, dan API.

##### 5.3 Jaga API key dan secret

Aplikasi yang terhubung ke layanan eksternal sering membutuhkan API key atau kredensial lain. Jangan menaruh informasi rahasia itu di kode frontend atau repository publik.

Aplikasi biasanya menyimpan konfigurasi rahasia melalui **environment variables**, bukan menulisnya langsung di source code. Untuk tahap ini, ingat satu aturan penting: jangan unggah secret ke GitHub dan jangan menaruh secret di kode frontend yang akan dikirim ke browser pengguna.

**Jaga API key dan secret**

- **Environment variables:** Cara umum menyimpan konfigurasi rahasia di luar kode yang dikirim ke browser.

##### 5.4 Setup Kilo untuk latihan

Sebelum meminta agent membuat timer belajar, siapkan dulu tempat kerjanya. Untuk kelas ini, cukup gunakan extension Kilo Code di VS Code; kamu tidak perlu memasang Kilo CLI secara terpisah.

**Pasang dan buka Kilo Code**

1. Buka VS Code, lalu buka **Extensions** dari sidebar. Pintasannya `Ctrl+Shift+X` di Windows/Linux atau `Cmd+Shift+X` di macOS.
2. Cari **Kilo Code**. Menurut panduan resmi saat ini, buka menu kecil di samping tombol **Install**, lalu pilih **Install Pre-Release Version**. Label Pre-Release di sini adalah nama kanal distribusinya.
3. Setelah terpasang, klik ikon **Kilo Code** di sidebar. Pilih **Sign In** atau buat akun gratis, lalu selesaikan proses di browser dan izinkan browser kembali ke VS Code.
4. Buka folder project yang ingin kamu kerjakan di VS Code. Panel Kilo sekarang siap membaca project itu saat kamu mengirim tugas.

**Atur sebelum latihan pertama**

1. Di panel Kilo, buka **Settings** lewat ikon roda gigi. Pilih **Auto Free** (`kilo-auto/free`) sebagai model utama jika tersedia. Pilihan model gratis dan batas pemakaiannya dapat berubah.
2. Di **Settings → Auto Approve**, atur `read`, `glob`, dan `grep` ke **Allow** agar agent bisa memahami project. Atur `edit`, `bash`, dan `external_directory` ke **Ask** agar kamu melihat permintaan izin sebelum agent mengubah file, menjalankan perintah, atau mengakses folder lain. Periksa izin yang diminta setiap kali muncul.
3. Jika ingin menjaga penggunaan tetap gratis, di **Settings → Models** pilih model gratis juga untuk **small model**. Autocomplete memakai pengaturan tersendiri; jika belum diperlukan, matikan di tab **Autocomplete**.

Sekarang coba tugas kecil dengan agent **Ask**: ‘Jelaskan isi folder project ini dalam tiga kalimat. Jangan ubah file.’ Setelah penjelasannya masuk akal, kamu bisa beralih ke **Plan** untuk menyusun langkah, lalu ke **Code** saat siap mengerjakannya. Tampilan Kilo dapat berubah; jika nama tombol berbeda dari yang kamu lihat di video, ikuti panduan resmi terbaru di bawah. Jangan masukkan data pribadi atau rahasia project ke model sebelum memahami kebijakan provider yang dipakai.

**Sumber bacaan**

- [Kilo · panduan instalasi VS Code](https://kilo.ai/docs/getting-started/installing)
- [Kilo · masuk dan menghubungkan akun](https://kilo.ai/docs/getting-started/setup-authentication)
- [Kilo · tugas pertama di VS Code](https://kilo.ai/docs/getting-started/quickstart)
- [Kilo · pengaturan izin](https://kilo.ai/docs/getting-started/settings/auto-approving-actions)
- [Kilo · memakai model gratis](https://kilo.ai/docs/getting-started/using-kilo-for-free)
- [Video: memasang Kilo Code di VS Code (YouTube)](https://www.youtube.com/watch?v=rqyv8iM6KDA)
- [Video: penggunaan dasar Kilo Code (YouTube)](https://youtu.be/4YPE73HE7r8?si=5HHsMuq1WfsHTNpW)

##### 5.5 Perlukah timer memakai database?

Kamu ingin membuat timer belajar pribadi yang menyimpan pengaturan di browser perangkat yang sama. Apakah database online wajib?

**Pembahasan**

**Tidak.** Mulai dengan solusi lokal yang sederhana; tambah database jika kebutuhan berubah.

##### Penutup pelajaran

**Yang perlu diingat:** Jika temanmu perlu mencoba aplikasi, terbitkan ke URL publik dan buka tautannya dari perangkat lain. Timer sederhana bisa berjalan tanpa database; simpan kunci rahasia di luar kode yang dibagikan.

**Cek pemahaman:** Timer belajar sederhana hanya perlu menyimpan pengaturan di satu browser. Apa pilihan awal yang masuk akal?

1. Gunakan database cloud agar pengaturan tetap ada setelah tab browser ditutup. — Penyimpanan lokal di browser juga bisa bertahan setelah tab ditutup.

2. Simpan pengaturan di browser dulu; tambah database jika nanti perlu sinkronisasi antarperangkat. **(jawaban tepat)** — Benar. Kebutuhan satu browser belum menuntut database online.

3. Buat endpoint server untuk menyimpan pengaturan agar aplikasi tetap terasa cepat. — Endpoint menambah layanan yang belum diperlukan untuk pengaturan pada satu browser.

#### Pelajaran 6: Bangun Ide, Satu Bagian Dulu

**Pertanyaan utama:** Bagaimana mengubah ide menjadi aplikasi?

Setelah memahami agent, permission, konteks project, dan deployment, sekarang kita masuk ke praktik membangun versi pertama. Project awal sengaja dibuat kecil agar setiap perubahan mudah dicoba. Untuk timer belajar, misalnya, versi pertama cukup punya satu layar dan tombol untuk mulai atau menjeda waktu. Fitur lain bisa ditambahkan setelah fungsi dasar ini bekerja.

##### 6.1 Tentukan ide sebelum membuka coding agent

Pilih kebutuhan yang cukup kecil untuk diselesaikan dan diuji dalam satu project latihan. Contohnya timer untuk sesi belajar, kuis untuk mengulang materi, atau halaman acara kampus. Tentukan siapa yang akan memakainya dan satu hal utama yang harus bisa dilakukan pengguna.

Ide lain juga boleh: kalkulator pengeluaran, flashcard, portfolio, atau permainan mini. Pilih sesuatu yang bisa dicoba orang lain, lalu tentukan satu fungsi yang membuatnya berguna.

**Contoh ide project kecil**

- **Belajar:** Pomodoro, study planner, quiz, flashcard, atau GPA calculator.
- **Keseharian:** Expense calculator, habit tracker, book tracker, atau random meal picker.
- **Karya pribadi:** Portfolio interaktif, event website, mini game, mood journal lokal, atau ide kamu sendiri.

##### 6.2 Langkah 1 · jelaskan versi pertama

Sebelum meminta agent menulis kode, jelaskan empat hal: **apa yang dibuat, siapa yang akan menggunakannya, apa 2-4 fungsi utama, dan apa yang belum perlu dibuat**. Deskripsinya boleh singkat.

Minta AI membantu merapikan kebutuhan kalau perlu. Pastikan versi pertama tetap kecil dan bisa dicoba.

**Langkah 1: definisikan versi pertama**

**Latihan interaktif**

Tulis definisi versi pertama project kamu

**Prompt awal:** Saya mau membuat aplikasi study planner.

**Yang perlu ada pada revisi:**

- Menyebut siapa penggunanya — Sebutkan siapa yang akan memakainya. (pola pemeriksaan: `untuk (mahasiswa|siswa|pengguna|saya|teman|dosen|guru|tim)|pengguna(nya)? (adalah|utama)`)

- Menyebut 2-4 fungsi inti — Sebut minimal dua kemampuan inti, bukan satu daftar panjang. (pola pemeriksaan: `(fungsi|fitur)[\s\S]*(dan|,)|(menambah|menyimpan|menampilkan|mencatat|mengingatkan)[\s\S]*(menambah|menyimpan|menampilkan|mencatat|mengingatkan)`)

- Menyebut yang belum perlu dibuat — Sebutkan satu hal yang sengaja belum dibuat di versi pertama. (pola pemeriksaan: `belum perlu|tidak perlu|tanpa (login|akun|database)|nanti saja|di luar (lingkup|cakupan)`)

**Contoh hasil sebelum perbaikan:** Agent menebak sendiri fitur, pengguna, dan teknologinya, lalu membangun sesuatu yang lebih besar dari kebutuhanmu.

**Contoh hasil setelah perbaikan:** Agent mengusulkan rencana yang sesuai dengan pengguna dan fungsi yang kamu sebutkan, tanpa menambahkan fitur yang sudah kamu nyatakan belum diperlukan pada versi pertama.

##### 6.3 Langkah 2-3 · minta agent memahami dan merencanakan

Setelah kebutuhan versi pertama jelas, buka project di VS Code dan gunakan Ask atau Plan: ‘Saya ingin membuat aplikasi berikut. Bantu merancang versi pertama yang sederhana. Jangan coding dulu. Jelaskan fitur minimum, struktur project, dan urutan implementasinya. Hindari fitur yang tidak diperlukan.’

Baca rencana itu. Kalau terlalu rumit, minta agent menyederhanakannya. Untuk project sederhana, aturan tambahan boleh dilewati. Jika memakai AGENTS.md, cukup tulis beberapa aturan yang benar-benar penting.

**Langkah 2–3: pahami project dan tinjau rencana**

- **Ask atau Plan:** Minta fitur minimum, struktur project, dan urutan implementasi.
- **Tinjau:** Baca rencana. Jika terlalu rumit, minta disederhanakan.
- **Rules bila perlu:** Pakai beberapa aturan penting; project sederhana boleh melewatinya.

##### 6.4 Langkah 4-5 · bangun bagian terkecil

Perubahan lebih mudah diperiksa jika project dibangun bertahap. Mulai dari tampilan utama atau satu fungsi inti, jalankan aplikasinya, lalu tambah fitur berikutnya satu per satu: tombol bisa ditekan, timer berjalan, data bisa ditambahkan, nilai bisa dihitung, quiz bisa dijawab, atau kartu bisa difilter.

Setelah tiap perubahan, lihat file yang berubah dan coba fitur itu. Minta agent menjelaskan perubahan penting dengan kata-kata sederhana.

**Langkah 4–5: bangun bagian kecil lalu uji**

- **Tampilan utama:** Minta satu bagian UI, jalankan aplikasi, lalu lihat hasilnya.
- **Fungsi inti:** Tambahkan timer, input data, kalkulasi, jawaban quiz, atau filter satu per satu.
- **Periksa perubahan:** Lihat file yang berubah dan minta penjelasan bagian penting.

##### 6.5 Tentukan bagian pertama yang akan dibangun

Setelah rencana cukup jelas, pilih bagian terkecil yang bisa dibangun dan diuji terlebih dahulu.

**CHECKPOINT: Apa yang dibuat lebih dulu?**

**Latihan interaktif**

Untuk membuat study planner, langkah pertama mana yang lebih mudah diperiksa?

1. Minta tampilan dan semua fungsi utama diselesaikan dalam satu tahap, lalu uji setelah terhubung. — Jika ada masalah, banyak bagian berubah sekaligus sehingga penyebabnya lebih sulit dicari.

2. Minta tampilan utama, jalankan, lalu tambahkan satu fungsi inti dan uji lagi. **(jawaban tepat)** — Tepat. Perubahan kecil yang dicoba satu per satu lebih mudah diperiksa.

**Pembahasan:** Dengan membangun satu bagian pada satu waktu, kamu lebih mudah mengetahui perubahan mana yang menyebabkan masalah jika sesuatu tidak bekerja.

##### Penutup pelajaran

**Yang perlu diingat:** Mulai dari timer yang bisa dijalankan dan dijeda. Coba langsung hasilnya, lalu gunakan masalah yang kamu temukan untuk menentukan fitur atau perbaikan berikutnya.

**Cek pemahaman:** Kamu mulai membuat study planner. Bagaimana membatasi versi pertama?

1. Tentukan pengguna, dua sampai empat fungsi utama, dan fitur yang belum perlu dibuat. **(jawaban tepat)** — Tepat. Batas versi pertama jelas sehingga agent tidak perlu menebak cakupannya.

2. Daftarkan semua fitur yang mungkin dibutuhkan, lalu biarkan agent memilih sendiri isi versi pertama. — Agent belum tentu tahu prioritas pengguna jika batasnya kamu serahkan sepenuhnya.

3. Rancang semua layar dan alur data lebih dulu agar teknologi yang diperlukan segera terlihat. — Perencanaan berguna, tetapi tanpa batas fungsi, versi pertama bisa tetap membesar.

#### Pelajaran 7: Uji, Perbaiki, dan Luncurkan

**Pertanyaan utama:** Kapan project siap dibagikan?

Project belum selesai hanya karena aplikasinya bisa berjalan di laptop. Sebelum dibagikan, fungsi utama perlu diuji, tampilan perlu dicoba pada ukuran layar berbeda, dan masalah yang ditemukan perlu diperbaiki. Setelah itu barulah aplikasi diterbitkan dan URL publiknya diuji dari perangkat lain.

##### 7.1 Langkah 6-8 · uji, perbaiki, dan review

Mulai pengujian dari hal yang benar-benar akan dilakukan pengguna. Ubah ukuran browser seperti layar ponsel, lalu coba fungsi utama: mulai, jeda, dan refresh halaman. Coba juga input yang tidak biasa dan gunakan aplikasi seperti pengguna biasa, misalnya dari layar ponsel dengan satu tangan. Cara ini sering menemukan masalah yang tidak terlihat hanya dengan membaca kode.

Pilih satu hal yang membingungkan atau rusak. Jelaskan kepada agent langkah-langkah yang membuat masalah itu muncul, lalu minta agent mencari penyebab dan memperbaikinya tanpa merusak bagian yang sudah bekerja.

Sebelum membagikan tautan, coba lagi fungsi utamanya. Lihat apakah ada error atau perubahan yang tidak diperlukan. Jika kamu belum paham satu bagian penting, minta agent menjelaskan mengapa bagian itu ada.

**Langkah 6–8: uji → perbaiki → review**

- **Coba sendiri:** Klik, ketik, ubah ukuran layar, refresh, dan masukkan nilai yang tidak biasa.
- **Cari satu masalah:** Temukan bagian yang membingungkan, rusak, atau kurang nyaman.
- **Minta bukti dan perbaikan:** Minta agent mencari penyebab lalu memperbaiki tanpa merusak bagian lain.
- **Review:** Periksa fungsi, error, perubahan tak perlu, kerumitan, dan pemahamanmu.

##### 7.2 Langkah 9 · deploy dengan jalur yang sesuai

Setelah fungsi utama sudah diuji, pilih jalur deployment yang sesuai. Salah satu jalur sederhana adalah **Vercel Drop**: unggah file atau folder lewat browser, pilih nama project, lalu deploy. Vercel bisa mendeteksi framework tertentu dan memberi URL publik. Setelah itu, buka URL dari perangkat lain dan uji kembali.

Jika ingin menyimpan source code sebagai portofolio, kamu bisa memakai alur **GitHub → Vercel**. GitHub bukan syarat agar project dianggap selesai. Yang lebih penting adalah aplikasi bisa dibuka dan fitur utamanya sudah diuji. Deploy yang berhasil hanya berarti aplikasi berhasil diterbitkan, bukan berarti semua fiturnya pasti benar.

**Sumber bacaan**

- [Vercel · Vercel Drop](https://vercel.com/changelog/vercel-drop)
- [Kilo · dokumentasi resmi](https://kilo.ai/docs)

**Langkah 9: pilih jalur deployment**

- **Vercel Drop:** Unggah file atau folder lewat browser; Vercel mendeteksi framework yang dikenali, menjalankan proses build, lalu memberi URL live.
- **GitHub → Vercel:** Simpan repository sebagai portofolio dan hubungkan ke Vercel untuk deployment dari Git.
- **Bukan syarat:** GitHub opsional. Yang penting project berhasil live dan diuji.

##### 7.3 Tautan yang benar-benar bisa dibuka

Deployment perlu diuji dari luar perangkat pengembang. Kirim tautannya kepada satu teman atau buka dari perangkat lain. Jika ia bisa membuka timer dan menekan tombol mulai serta jeda dari perangkatnya sendiri, versi pertama sudah mencapai tujuanmu. Catat masalah yang ia temukan untuk perbaikan berikutnya.

**Hasil deployment: project bisa diakses dari perangkat lain**

- **Dari ide ke internet:** Tentukan tujuan, arahkan agent, batasi izin, bangun, uji, perbaiki, dan bagikan URL yang berfungsi.

##### 7.4 Refleksi singkat

Setelah menguji aplikasi, catat singkat apa yang kamu buat dan siapa yang sudah mencobanya. Lalu refleksikan tiga hal: bagian mana yang paling banyak dibantu AI, keputusan apa yang kamu ambil sendiri, dan apa yang kamu ubah setelah mencoba aplikasi di ponsel.

Catatan ini membantu kamu mengingat alasan di balik keputusan project, bukan hanya file apa saja yang dibuat.

**Refleksi setelah project selesai**

- **Apa yang dibuat?:** Tulis nama dan kegunaan project.
- **AI membantu apa?:** Bagian mana yang paling banyak dibantu agent?
- **Keputusanmu?:** Apa yang kamu putuskan sendiri?
- **Apa yang berubah?:** Apa yang kamu ubah setelah melihat hasil AI?

##### 7.5 Opsional · ceritakan project kamu

Jika tautan sudah bekerja dan hasilnya sudah cukup baik, project bisa dibagikan sesuai tujuanmu. Kirim kepada teman atau dosen untuk mendapat masukan; setelah itu, kamu bisa memasukkannya ke portofolio atau membagikannya lebih luas.

Ceritakan apa yang kamu buat, kenapa memilih ide itu, bagaimana AI membantu, keputusan apa yang tetap kamu buat sendiri, dan apa yang dipelajari. Sertakan tautan live; repository GitHub boleh ditambahkan jika ada. Ceritanya tetap ceritamu, meski AI membantu merapikan tulisan.

**Opsional: bagikan project kepada orang lain**

- **Ceritakan:** Apa yang kamu buat, mengapa memilihnya, bagaimana AI membantu, dan apa yang kamu putuskan sendiri.
- **Sertakan:** Tautan live. Repository GitHub hanya jika tersedia.
- **Tetap personal:** AI boleh merapikan tulisan, tetapi ceritanya tetap milikmu.

##### 7.6 Ke mana melangkah setelah ini?

Project berikutnya mungkin membutuhkan fitur yang lebih kompleks. Jika data harus tersimpan lintas perangkat atau dipakai banyak pengguna, database online seperti Supabase dan autentikasi mulai relevan. Jika aplikasi perlu mengambil data atau memakai layanan lain, API bisa menghubungkannya dengan layanan cuaca, peta, AI, dan sebagainya.

Git dan GitHub membantu menyimpan riwayat perubahan dan berkolaborasi. Testing membantu memastikan fitur tetap bekerja setelah kode berubah. MCP, custom agents, dan skills bisa ditambahkan ketika kamu memang membutuhkan tool atau workflow yang lebih khusus.

**Langkah berikutnya setelah project pertama**

- **Database dan autentikasi:** Untuk data online lintas perangkat dan akun pengguna.
- **API:** Untuk layanan cuaca, peta, AI, atau data lain.
- **Git dan testing:** Untuk riwayat perubahan, kolaborasi, dan pemeriksaan sistematis.
- **MCP, agents, skills:** Untuk menambah alat atau menyesuaikan workflow saat memang berguna.

##### 7.7 Prinsip yang bisa dipakai lagi di project berikutnya

Prinsip utamanya sederhana: mulai dari kebutuhan pengguna, bukan dari sebanyak mungkin fitur yang bisa dibuat AI. Setiap kali agent mengusulkan sesuatu, cek apakah fitur itu benar-benar dibutuhkan dan bagaimana kamu akan mengujinya.

Tool dan model akan terus berubah. Kebiasaan yang tetap berguna adalah menjelaskan tujuan, membaca rencana sebelum implementasi, mencoba hasilnya sendiri, lalu memperbaiki masalah yang benar-benar dialami pengguna.

Versi pertama sudah layak dibagikan ketika fungsi utamanya bekerja lewat URL publik dan sudah kamu uji. Kode yang terlihat selesai di layar chat saja belum cukup.

**Alur utama: Ide → Percakapan → Rencana → Bangun → Uji → Perbaiki → Deploy**

- **Pegangan:** Jelaskan kebutuhanmu, periksa hasil agent, dan tentukan sendiri kapan software sudah cukup baik untuk dipakai atau dibagikan.

##### Penutup pelajaran

**Yang perlu diingat:** Perbesar tombol jeda, coba lagi di ponsel, lalu minta temanmu menguji tautan yang sama. Ceritakan apa yang kamu ubah setelah melihat cara orang lain memakainya.

**Cek pemahaman:** Deployment berhasil dan kamu mendapat URL. Apa langkah berikutnya?

1. Periksa log build di Vercel dan bagikan tautan jika tidak ada error. — Build yang berhasil belum membuktikan fungsi aplikasi bekerja saat dipakai orang lain.

2. Buka URL di browser yang kamu pakai saat mengembangkan aplikasi, lalu bagikan jika halaman terlihat normal. — Tampilan awal di satu browser belum memeriksa fungsi utama atau perangkat lain.

3. Buka URL dari perangkat lain, coba fungsi utamanya, dan catat masalah yang perlu diperbaiki. **(jawaban tepat)** — Benar. Tautan publik perlu diuji seperti pengalaman pengguna sungguhan.

#### Penutup kelas

Sampai di sini, satu ide sudah kamu kembangkan dari tahap perencanaan menjadi aplikasi yang bisa dibuka orang lain.

Kamu juga sudah mencoba alur kerja coding agent: memberi konteks, meninjau rencana, membangun bertahap, menguji, memperbaiki, dan melakukan deployment. Di project berikutnya, gunakan pola yang sama dan tetap periksa hasil AI sebelum dipakai.

**Lanjut:** [Kembali ke semua kursus ↗](/learn)

---

### Asesmen kelas

#### Pre-test

##### Soal 1

Coding agent akan membantu membuat aplikasi kecil. Apa yang paling baik dilakukan sebelum meminta perubahan kode?

1. Berikan daftar perubahan dan minta agent langsung mengedit semua file terkait

2. Jelaskan tujuan, lalu minta agent membaca struktur project dan melaporkan rencananya **(jawaban tepat)**

3. Minta agent memilih fitur awal berdasarkan project yang mirip

**Pembahasan:** Tujuan dan pemahaman terhadap project memberi dasar yang lebih aman untuk bekerja.

##### Soal 2

Agent meminta izin menjalankan perintah terminal yang belum kamu pahami. Apa pilihan yang bijak?

1. Izinkan jika agent menjelaskan bahwa perintah itu mempercepat pekerjaan

2. Minta agent menjalankan perintah yang sama dari folder lain

3. Tinjau perintah dan dampaknya, lalu setujui jika sesuai dengan tugas **(jawaban tepat)**

**Pembahasan:** Pahami dampak tindakan sebelum memberi izin, khususnya untuk perintah terminal.

##### Soal 3

Halaman aplikasi terlihat benar di laptopmu. Apa pemeriksaan berikut yang paling berguna sebelum dibagikan?

1. Coba alur utama dan periksa tampilan pada ukuran layar lain **(jawaban tepat)**

2. Minta agent memastikan tidak ada bug tanpa mencoba sendiri

3. Periksa kode sumber saja karena tampilannya sudah terbuka

**Pembahasan:** Pengujian alur utama dan ukuran layar membantu menemukan masalah yang belum terlihat.

##### Soal 4

Kamu punya ide membuat rencana kegiatan dengan bantuan AI. Prompt awal mana yang paling jelas?

1. Buat rencana kegiatan yang menarik

2. Beri ide sebanyak mungkin untuk sebuah acara

3. Susun rencana satu hari untuk 30 peserta dengan anggaran terbatas; tandai hal yang perlu dikonfirmasi **(jawaban tepat)**

**Pembahasan:** Tujuan, batasan, dan hal yang belum pasti memberi AI konteks kerja yang lebih jelas.

##### Soal 5

Apa pembeda paling penting antara AI chat biasa dan coding agent saat bekerja di project?

1. Coding agent dapat memakai alat untuk membaca atau mengubah project jika diberi izin **(jawaban tepat)**

2. Coding agent selalu memakai model AI yang lebih pintar

3. AI chat tidak bisa membantu menulis atau menjelaskan kode

**Pembahasan:** Coding agent dapat berinteraksi dengan file dan alat project; tindakannya tetap perlu ditinjau.

#### Post-test

##### Soal 1

Agent sudah merangkum project. Sebelum meminta fitur baru, apa langkah yang paling membantu?

1. Minta rencana fitur sambil menganggap ringkasan itu sudah akurat

2. Berikan spesifikasi lengkap tanpa memeriksa apa yang agent pahami

3. Cocokkan ringkasan dengan tujuan project dan luruskan bagian yang keliru **(jawaban tepat)**

**Pembahasan:** Pastikan agent memahami struktur dan tujuan sebelum memperluas perubahan.

##### Soal 2

Agent menawarkan menghapus file yang tampak tidak terpakai. Apa yang sebaiknya kamu lakukan?

1. Setujui setelah melihat nama file tidak muncul di halaman utama

2. Periksa pemakaian file dan perubahan yang akan dibuat sebelum menyetujui **(jawaban tepat)**

3. Minta agent memindahkannya dulu tanpa memeriksa dependensi

**Pembahasan:** Perubahan file perlu ditinjau dampaknya; coding agent juga bisa keliru.

##### Soal 3

Fitur baru berhasil dibuka, tetapi belum dicoba di ponsel. Kesimpulan terbaik adalah…

1. Uji alur utama dan tata letak pada ukuran layar yang relevan **(jawaban tepat)**

2. Tampilan desktop cukup menjadi acuan untuk semua perangkat

3. Periksa prompt agent lagi sebelum menguji aplikasi

**Pembahasan:** Satu tampilan berhasil belum menjamin pengalaman di perangkat dan alur lain.

##### Soal 4

Sebelum mengunggah project ke layanan hosting, hal apa yang perlu diperiksa?

1. Apakah warna dan nama file sudah konsisten

2. Apakah API key atau konfigurasi rahasia ikut tersimpan di project **(jawaban tepat)**

3. Apakah agent sudah menyatakan project selesai

**Pembahasan:** Pastikan rahasia project tidak ikut terunggah dan periksa pengaturan deployment.

#### Refleksi asesmen

Bayangkan kamu membuat fitur kecil dengan coding agent. Apa yang akan kamu minta, tindakan apa yang perlu kamu tinjau, dan bagaimana kamu menguji hasilnya?

</details>
