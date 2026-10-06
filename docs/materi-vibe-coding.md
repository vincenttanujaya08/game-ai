# Vibe Coding — alur materi interaktif

Dokumen kerja untuk mengubah materi kelas utama menjadi pengalaman belajar seperti pilot AI Fundamentals dan Prompt Engineering. Ini adalah naskah dan rancangan interaksi; belum terhubung ke aplikasi. Materi asli, sumber, dan asesmen disimpan di lampiran agar bisa ditinjau saat menyunting.

## Pembuka peserta

**Judul:** Dari ide kecil ke aplikasi yang bisa dicoba

Kamu ingin membuat timer belajar: tekan **Mulai**, berhenti sebentar dengan **Jeda**, lalu kembali ke awal dengan **Reset**. Kita akan mengikuti cara coding agent membantu membuatnya, dari memahami project sampai mencoba tautan publiknya.

Kamu tidak perlu menghafal kode. Kamu akan berlatih menjelaskan kebutuhan, memeriksa rencana, memilih izin, dan mencari bukti bahwa hasilnya bekerja.

Contoh jawaban, perubahan file, dan hasil uji dalam jalur ini adalah **simulasi yang sudah disiapkan**. Pilihanmu mengubah contoh yang terlihat. Jalur ini tidak menjalankan agent, mengubah file di laptopmu, atau menerbitkan aplikasi. Praktik dengan alat sungguhan tersedia setelah latihan simulasi.

**Tombol:** Mulai dari satu error →

## Peta perjalanan

| Tahap | Bagian | Hasil yang dibawa ke tahap berikutnya |
| --- | --- | --- |
| Kenali cara kerjanya | 1–3 | Tahu beda chat, model, agent, dan izin tindakan |
| Beri arah dan bangun | 4–8 | Brief kecil, konteks yang cukup, rencana, dan perubahan yang ditinjau |
| Uji dan bagikan | 9–12 | Catatan bug, keputusan penyimpanan, pemeriksaan publikasi, dan refleksi |

Satu bagian memuat situasi singkat, tindakan peserta, akibat atau hasil, pembahasan, dan penghubung ke bagian berikutnya. Detail konsep tersedia melalui **Baca lebih lanjut**, bukan ditampilkan semuanya sebelum peserta mencoba.

## Tahap 1 — Kenali cara kerjanya

### 1. Kode dari chat ternyata belum jalan

**Tujuan:** Membedakan bantuan AI chat dengan agent yang memiliki akses ke project.

**Situasi di layar:**

> Kamu meminta halaman sederhana untuk timer belajar. Setelah kode dari chat ditempel ke project, muncul `Module not found`.

AI chat bisa menjelaskan error dari bahan yang kamu kirim. Coding agent yang diberi akses dan izin bisa mencari file terkait langsung di project.

**Interaksi — pilih bantuan:** “Kamu ingin memahami sumber error di project. Bantuan mana yang memakai kemampuan khas coding agent?”

| Pilihan | Hasil setelah dipilih |
| --- | --- |
| A. Jelaskan error dari pesan yang saya tempel di chat. | Ini tetap berguna, tetapi AI chat biasa juga bisa melakukannya. Belum ada pemeriksaan langsung terhadap file project. |
| B. Baca file terkait dan jelaskan penyebab serta rencana sebelum mengubah kode. | Pilihan sesuai. Simulasi menampilkan daftar file yang diperiksa dan rencana singkat. Belum ada file yang berubah. |
| C. Kirim satu file baru agar saya salin ke project. | Ini masih mengandalkanmu untuk memindahkan kode dan mencocokkannya dengan project. |

**Kartu hasil B — simulasi:** “Import pada `App.jsx` menunjuk ke `Timer.jsx`, tetapi file yang tersedia bernama `StudyTimer.jsx`. Saya akan mencocokkan import dengan file yang ada, lalu mencoba menjalankan project.”

**Pembahasan:** Agent memakai model, konteks, dan alat untuk bekerja pada project. Akses itu membantu mencari penyebab; akses tidak menjamin agent selalu benar. Kita tetap meninjau perubahan dan mencoba hasilnya.

**Baca lebih lanjut:** Di kelas ini, vibe coding berarti membangun software melalui percakapan dengan AI sambil tetap memberi arah, menguji, dan meninjau. Istilahnya dipakai dengan makna yang beragam; jangan menganggap semua pemakaian istilah ini punya batas yang sama. Untuk pemula, pahami hasil yang ingin terlihat dahulu; istilah editor, terminal, dan file dikenalkan lewat tugasnya.

**Lanjut:** Kenali alat yang sedang bekerja →

### 2. Alat, model, dan agent punya peran berbeda

**Tujuan:** Memilih jenis alat dan tingkat kemampuan model sesuai tugas.

**Situasi:** Kamu punya tiga pekerjaan: mencari ide, mencoba bentuk tampilan, dan memperbaiki file project.

**Interaksi — pasangkan pekerjaan dengan alat:**

| Pekerjaan | Pasangan yang diterima | Pembahasan |
| --- | --- | --- |
| Membandingkan beberapa ide timer | AI chat | Percakapan bisa membantu mencari arah sebelum ada project. |
| Membuat prototype cepat lewat browser | AI app builder | Builder dapat mengurus sebagian pembuatan dan persiapan di lingkungannya. |
| Memperbaiki import pada project yang sudah ada | Coding agent dengan akses project | File dan alat project memberi konteks untuk perubahan langsung. |

Kategori ini bisa bertumpang tindih. Untuk latihan ini, cocokkan kemampuan yang disebutkan pada kartu; tidak perlu menghafal merek.

**Interaksi lanjutan — pilih untuk tugas kecil:** “Hanya mengganti tulisan tombol ‘Start’ menjadi ‘Mulai’. Haruskah selalu memakai model termahal?”

- **Tidak; mulai dari model yang cukup untuk tugas tersebut.** Pembahasan: perubahan kecil mungkin dapat ditangani model ringan. Tetap periksa hasilnya.
- **Ya; harga memastikan hasil benar.** Pembahasan: harga bukan jaminan kebenaran. Tugas rumit dapat membutuhkan kemampuan lebih besar, tetapi hasil tetap harus diuji.

**Baca lebih lanjut:** Model menghasilkan jawaban dan penalaran. Agent menghubungkannya dengan alat, konteks, izin, dan lingkungan kerja. Benchmark menguji jenis tugas tertentu: SWE-bench, LiveCodeBench, dan Terminal-Bench tidak mengukur hal yang persis sama. Pertimbangkan kesulitan tugas, biaya, kecepatan, konteks, dan kebijakan data. Kilo adalah alat latihan kelas; pola kerjanya dapat dibawa ke alat lain. Pilihan model gratis seperti Auto Free beserta batas dan kebijakan providernya dapat berubah.

**Lanjut:** Agent meminta izin. Apa yang kamu setujui? →

### 3. Izin adalah keputusan tentang tindakan

**Tujuan:** Menilai izin dari tugas dan dampaknya, bukan nama tombol saja.

**Situasi:** Agent sudah menemukan import yang keliru. Ia menawarkan tiga tindakan.

**Interaksi — tentukan Allow, Ask, atau Deny untuk aturan latihan ini:**

| Tindakan | Aturan latihan | Umpan balik |
| --- | --- | --- |
| Membaca `App.jsx` dan `StudyTimer.jsx` di folder latihan | Allow | Membaca file relevan memberi konteks. Folder latihan ini dinyatakan tidak berisi data rahasia. |
| Mengedit import dan menjalankan perintah pemeriksaan | Ask | Lihat perubahan serta perintahnya dahulu; izinkan setelah sesuai tugas. Ask bukan berarti selalu menolak. |
| Menghapus seluruh folder project untuk memulai ulang tanpa kebutuhan yang jelas | Deny | Tindakan ini menghilangkan pekerjaan dan tidak diperlukan untuk memperbaiki satu import. |

**Setelah cocok:** Tampilkan permintaan: “Saya akan memperbaiki satu import. Setelah itu menjalankan perintah pemeriksaan yang tercantum dalam project. Setujui?”

- **Lihat perubahan dan perintah dulu:** Buka rincian contoh, lalu tombol “Izinkan tindakan ini”.
- **Izinkan semua tindakan berikutnya:** Tampilkan alasan untuk meninjau ruang izin; peserta dapat mengubah pilihannya.

**Pembahasan:** Allow membolehkan tindakan sesuai aturan, Ask meminta persetujuan, Deny memblokir. Ini contoh pengaturan awal untuk latihan, bukan aturan universal. Membaca file pun perlu memperhatikan isi dan kebijakan data. Persetujuan satu tindakan tidak berarti izin untuk semua perubahan berikutnya.

**Baca lebih lanjut:** Dalam latihan Kilo, Ask dipakai untuk memahami, Plan untuk merencanakan, Code untuk menerapkan, dan Debug untuk mencari penyebab. Nama serta ketersediaannya mengikuti versi alat. Mulai dengan “Jelaskan project ini; jangan ubah file” ketika belum memahami project.

**Lanjut:** Sekarang beri agent tujuan yang lebih jelas →

## Tahap 2 — Beri arah dan bangun

### 4. “Buat aplikasi keren” membuat agent menebak

**Tujuan:** Menyusun brief dengan pengguna, fungsi inti, dan batas versi pertama.

**Situasi — prompt awal:** “Buat aplikasi belajar yang keren.”

**Rencana agent — simulasi:** “Tambahkan akun, kalender, leaderboard, dan database.”

**Pertanyaan:** “Padahal kamu hanya butuh timer untuk belajar sendiri. Informasi apa yang belum kamu sampaikan?”

**Interaksi — susun brief dari tiga kelompok:**

1. Pengguna: “Untuk saya yang belajar sendiri di laptop.”
2. Fungsi inti: “Durasi awal 25 menit; tombol Mulai, Jeda, dan Reset.”
3. Batas: “Versi pertama tanpa akun, kalender, dan leaderboard.”

Peserta bisa memilih atau melepas setiap kelompok. Pratinjau prompt berubah sesuai pilihan; hasil simulasi hanya muncul setelah menekan **Lihat rencananya**.

**Logika hasil:**

- Tanpa pengguna: agent masih menanyakan siapa yang memakai timer.
- Tanpa fungsi inti: agent masih menanyakan perilaku yang harus dibuat.
- Tanpa batas: rencana masih mengusulkan fitur tambahan sebagai kemungkinan, belum mengimplementasikannya.
- Ketiganya lengkap: rencana fokus pada timer dan tiga tombol, tanpa layanan tambahan.

Jika beberapa kelompok kosong, tampilkan pertanyaan untuk masing-masing kelompok kosong. Jangan memilih satu masalah secara acak.

**Pembahasan:** Brief yang berguna memberi agent cukup arah untuk membuat rencana yang bisa kamu periksa. Prompt panjang tidak otomatis lebih baik. Kebutuhan yang kecil dan jelas lebih mudah diuji.

**Lanjut:** Pilih konteks yang membantu brief itu →

### 5. Tidak semua konteks dan alat perlu ditambahkan

**Tujuan:** Membedakan konteks tugas, aturan project, skills, dan MCP.

**Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”:**

| Kartu | Untuk timer versi ini | Alasan |
| --- | --- | --- |
| Struktur file dan cara menjalankan project | Perlu sekarang | Agent perlu tahu tempat bekerja dan cara mencoba hasilnya. |
| Perilaku Mulai, Jeda, dan Reset | Perlu sekarang | Ini menentukan fungsi yang akan dibuat dan diperiksa. |
| Aturan: jangan tambah library tanpa alasan; tampilan nyaman di ponsel | Perlu sekarang | Batas ini relevan untuk tugas dan peninjauan. Bisa disampaikan langsung. |
| MCP untuk kalender online | Belum perlu | Timer ini tidak memakai kalender. |
| Skill untuk integrasi pembayaran | Belum perlu | Versi ini tidak menerima pembayaran. |
| Database akun pengguna | Belum perlu | Akun belum masuk cakupan versi pertama. |

Setelah semua kartu ditempatkan, tombol **Periksa pilihan** memberi alasan per kartu. Yang keliru dapat dipindahkan kembali.

**Baca lebih lanjut:** AGENTS.md dapat menyimpan aturan project yang berulang. PROJECT.md dapat menyimpan tujuan, fitur, dan batas. SKILL.md menyimpan petunjuk untuk jenis pekerjaan tertentu. MCP menghubungkan agent dengan tools atau layanan tambahan. Project kecil tidak wajib punya semua dokumen atau integrasi tersebut. Tambahkan ketika ada kebutuhan nyata.

**Lanjut:** Periksa rencana sebelum meminta kode →

### 6. Baca rencananya, lalu kecilkan bila perlu

**Tujuan:** Menilai rencana terhadap brief dan menentukan urutan implementasi.

**Interaksi — bandingkan dua rencana:**

**Rencana A:** Buat halaman timer dan tombol; tambahkan hitung mundur; periksa Mulai/Jeda/Reset; coba layar kecil. Tanpa akun atau database.

**Rencana B:** Buat akun, sistem langganan, dashboard kalender, lalu timer.

**Pertanyaan:** “Mana yang sesuai brief tadi?”

- **A:** Tampilkan hubungan tiap langkah dengan fungsi yang diminta. Peserta lanjut menyusun urutan.
- **B:** Tandai akun, langganan, dan kalender sebagai perluasan yang belum diminta. Pilihan dapat diperbaiki.

**Interaksi — urutkan empat kartu:** Tampilan utama → Fungsi timer → Uji alur utama → Perbaiki berdasarkan hasil uji.

**Pembahasan:** Ini urutan latihan agar perubahan mudah diamati. Pengujian juga boleh dilakukan selama implementasi; tidak harus menunggu seluruh fitur selesai. Jika agent salah memahami project, luruskan ringkasannya sebelum memperluas perubahan.

**Lanjut:** Minta satu bagian dulu →

### 7. Bangun sedikit, lihat hasilnya

**Tujuan:** Melihat siklus instruksi → perubahan → pemeriksaan → revisi.

**Permintaan peserta dalam simulasi:** “Buat tampilan timer 25:00 dengan tombol Mulai, Jeda, Reset. Jangan tambah fitur lain dulu.”

**Hasil pertama:** Pratinjau menampilkan timer dan tombol. Belum ada hitung mundur.

**Interaksi — pilih kesimpulan:**

- “Tampilannya sudah ada; berikutnya tambahkan perilaku tombol dan hitung mundur.” → Sesuai. Tampilan memenuhi tahap pertama, fungsi belum dibuat.
- “Project sudah selesai karena tombol terlihat.” → Tombol terlihat belum membuktikan tombol bekerja. Coba periksa perilakunya.

**Tahap berikut:** Permintaan “Tambahkan hitung mundur. Jeda menghentikan hitungan tanpa menghapus sisa waktu; Reset kembali ke 25:00 dan berhenti.”

**Hasil — simulasi tombol yang dapat dicoba:** Mulai membuat waktu berkurang; Jeda menghentikannya; Reset kembali ke durasi awal. Simulasi ini memperagakan perilaku yang diminta, bukan hasil build project peserta.

**Pembahasan:** Agent bekerja dalam putaran: membaca konteks, memakai alat sesuai izin, melihat hasil, lalu melanjutkan atau bertanya. Kita ikut memeriksa setiap hasil kecil agar tahu apa yang sudah bekerja.

**Lanjut:** Lihat apa yang berubah di file →

### 8. Review perubahan sebelum menerimanya

**Tujuan:** Mengenali perubahan relevan dan perluasan yang tidak diperlukan.

**Kartu perubahan — simulasi:**

1. `StudyTimer.jsx`: tambahkan status berjalan dan sisa waktu.
2. `timer.css`: sesuaikan tombol agar nyaman digunakan pada layar kecil.
3. `package.json`: tambahkan paket pembayaran.
4. `README.md`: tulis cara menjalankan dan mencoba timer.

**Interaksi:** “Tandai perubahan yang perlu dipertanyakan sebelum diterima.”

- Paket pembayaran harus ditandai: tidak terkait brief.
- Perubahan timer, CSS, dan petunjuk menjalankan masuk akal untuk tugas ini, tetapi isinya tetap perlu diperiksa.
- Menandai semua perubahan menghasilkan penjelasan: review mencari kesesuaian dan dampak; bukan menolak setiap perubahan.

**Permintaan lanjutan:** “Jelaskan mengapa paket pembayaran dibutuhkan. Jika tidak terkait timer versi pertama, hapus tambahan itu dan gunakan bagian project yang sudah ada.”

**Hasil simulasi:** Paket yang tidak diperlukan dihapus dari usulan; daftar perubahan diperbarui. Tombol **Uji versi ini** membawa peserta ke langkah berikutnya.

**Baca lebih lanjut:** Git menyimpan riwayat perubahan dan membantu membandingkan versi. Memahami semua baris kode belum wajib untuk mulai belajar; minta agent menjelaskan bagian penting, file yang berubah, dan cara memeriksa hasilnya.

**Lanjut:** Cari bukti dari perilaku aplikasi →

## Tahap 3 — Uji dan bagikan

### 9. “Sudah jadi” perlu dibuktikan

**Tujuan:** Menemukan bug dengan langkah uji yang bisa diulang.

**Situasi:** Agent mengatakan timer selesai. Dalam simulasi versi ini, Jeda keliru mengembalikan waktu ke 25:00.

**Interaksi — lakukan uji terarah:** Mulai dari 25:00 → jalankan beberapa detik → tekan Jeda → bandingkan hasil dengan harapan.

**Harapan:** Hitungan berhenti di sisa waktu yang terakhir terlihat.

**Hasil simulasi:** Waktu justru kembali ke 25:00. Tampilkan “Yang diharapkan” dan “Yang terjadi” berdampingan.

**Interaksi — pilih laporan bug:**

- “Timernya jelek, perbaiki semuanya.” → Sulit mengetahui kondisi dan perilaku yang dimaksud.
- “Setelah Mulai, waktu berkurang. Saat Jeda ditekan, waktu kembali ke 25:00. Seharusnya berhenti di sisa waktu. Cari penyebab dan perbaiki tanpa mengubah Reset.” → Memuat langkah, hasil aktual, harapan, dan batas perubahan.

**Setelah pilihan sesuai:** Tampilkan jawaban agent: “Jeda memakai fungsi Reset. Saya akan memisahkan keduanya.” Tampilkan versi simulasi yang diperbaiki; peserta mengulangi uji Jeda dan menguji Reset untuk memastikan fungsi lain tetap sesuai.

**Pembahasan:** Keberhasilan harus dilihat dari uji. Coba juga klik Mulai dua kali, refresh, ukuran layar kecil, dan keadaan waktu habis. Nyatakan perilaku yang diharapkan sebelum menyimpulkan sebuah hasil salah. Tes otomatis dapat membantu pemeriksaan berulang; tetap coba pengalaman pengguna.

**Lanjut:** Apakah timer ini perlu database? →

### 10. Pilih penyimpanan dari kebutuhannya

**Tujuan:** Menentukan kapan lokal cukup dan kapan layanan online masuk akal.

**Situasi A:** “Saya ingin durasi pilihan tetap tersimpan ketika browser yang sama dibuka lagi.”

**Pilihan:** Penyimpanan lokal di browser / Database online wajib.

**Jawaban sesuai:** Penyimpanan lokal dapat cukup. Data lokal dapat hilang jika penyimpanan browser dihapus; jangan menjanjikan tersimpan di semua perangkat.

**Situasi B, setelah A:** “Sekarang saya ingin durasi pilihan yang sama terbaca dari laptop dan ponsel.”

**Pilihan:** Tetap mengandalkan penyimpanan browser masing-masing / Pertimbangkan sinkronisasi dengan penyimpanan online dan identitas pengguna.

**Jawaban sesuai:** Kebutuhan lintas perangkat mengubah rancangan. Bahas data, identitas, privasi, dan layanan yang diperlukan sebelum menambahkannya. Ini perluasan berikutnya; tidak otomatis ditambahkan ke timer versi pertama.

**Baca lebih lanjut:** Database seperti PostgreSQL menyimpan data terstruktur; Supabase merupakan salah satu layanan yang menyediakan database dan fitur lain. Login, data bersama, API, dan layanan online ditambahkan ketika kebutuhan menuntutnya, bukan agar project terasa lebih lengkap.

**Lanjut:** Cek apa yang aman dibagikan →

### 11. Dari localhost ke tautan publik

**Tujuan:** Membedakan alamat lokal, publikasi, dan bukti bahwa aplikasi publik bekerja.

**Situasi:** Kamu mengirim `localhost:5173` kepada teman. Ia tidak bisa membuka timer di laptopmu dari alamat itu.

**Interaksi — pilih penjelasan:**

- “Localhost menunjuk ke komputer yang sedang membuka alamat itu; aplikasi perlu diterbitkan agar teman mendapat URL publik.” → Sesuai.
- “Teman harus memakai merek laptop yang sama.” → Merek perangkat bukan penyebabnya; alamat itu lokal.

**Interaksi — cek sebelum publikasi:**

| Temuan | Tindakan |
| --- | --- |
| Ada secret key layanan tertulis di kode frontend | Hentikan publikasi; keluarkan secret dari frontend dan repository. Jika sudah terekspos, cabut atau rotasi key. Jangan cukup memindahkannya ke environment variable yang tetap dikirim ke browser. |
| Fungsi inti belum pernah diuji | Uji dahulu dan catat hasilnya. |
| Tidak ada akun GitHub | Bukan penghalang universal; pilih jalur deployment yang mendukung project dan alatmu. |

**Setelah pemeriksaan:** Tampilkan pilihan belajar “Unggah lewat layanan yang mendukungnya” dan “Hubungkan repository Git ke hosting”. Dalam praktik, lihat dukungan framework, proses build, dan petunjuk penyedia. Contoh layanan dari materi awal: Vercel Drop dan GitHub → Vercel; detail langkahnya ada di bacaan tambahan dan perlu dicocokkan dengan dokumentasi ketika digunakan.

**Hasil publikasi — simulasi:** `https://timer-belajar.example` — alamat contoh, bukan project live.

**Pilihan terakhir:** “Build sukses. Apa langkah berikutnya?”

- Buka URL sebenarnya dari perangkat lain dan coba Mulai, Jeda, Reset serta layar kecil → Sesuai. Catat masalah yang ditemukan.
- Langsung simpulkan semua fitur benar → Build sukses belum membuktikan seluruh alur bekerja.

**Pembahasan:** Secret harus tetap berada di lingkungan server yang sesuai. Environment variable tidak otomatis rahasia jika nilainya ikut dibundel ke browser. Contohnya, nilai berawalan `VITE_` pada Vite terekspos ke kode client. [Sumber: dokumentasi Vite tentang environment variables](https://vite.dev/guide/env-and-mode). Publikasi selesai setelah URL nyata bisa diakses dan fungsi utama diuji; simulasi ini belum membuktikan project peserta live.

**Lanjut:** Susun brief milikmu sendiri →

### 12. Bawa pola ini ke project-mu

**Tujuan:** Menggunakan pola latihan pada ide sendiri dan menyusun rencana pemeriksaan.

**Interaksi — isi empat bidang:**

1. “Saya ingin membuat … untuk …”
2. “Versi pertama harus bisa …”
3. “Yang belum perlu dibuat …”
4. “Saya akan memastikan hasilnya bekerja dengan …”

**Contoh:** “Timer untuk saya yang belajar sendiri. Durasi 25 menit, Mulai/Jeda/Reset. Tanpa login dan kalender. Saya akan mencoba Jeda setelah beberapa detik, Reset, dan tampilan di ponsel.”

**Hasil:** Gabungkan tulisan peserta menjadi kartu brief yang dapat disalin. Tampilkan checklist untuk diperiksa sendiri: pengguna disebut, fungsi dapat dicoba, batas jelas, langkah uji ada. Jangan mengklaim tulisan sudah benar hanya karena semua bidang terisi.

**Refleksi:** “Apa yang kamu putuskan sendiri? Usulan agent mana yang kamu pertanyakan? Apa yang berubah setelah diuji?” Jawaban disimpan sebagai catatan peserta, tanpa kunci benar/salah.

**Ringkasan:** Arahkan agent → periksa rencana → izinkan tindakan yang sesuai → bangun sedikit → review → uji → perbaiki → bagikan dan uji lagi.

**Selesai simulasi:** “Kamu sudah menyelesaikan latihan cara bekerja dengan coding agent.”

**Pilihan berikutnya:** Coba project sungguhan / Baca detail dan sumber / Kembali ke bagian sebelumnya.

Berbagi project kepada teman, dosen, atau sebagai portofolio bersifat opsional. Ceritakan kegunaannya, bantuan AI, keputusanmu, dan hasil uji. Git, testing, API, database, autentikasi, skills, dan MCP bisa dipelajari lebih lanjut ketika project memerlukannya.

## Praktik sungguhan — terpisah dari simulasi

**Pembuka:** “Sekarang coba brief-mu dengan alat yang benar-benar bekerja pada project. Langkah ini memerlukan editor, coding agent, dan lingkungan project. Kamu boleh kembali nanti.”

1. Buka panduan setup Kilo di lampiran dan dokumentasi resminya. Periksa versi, model, izin, biaya, dan kebijakan data. CLI bukan syarat bila menggunakan extension yang mendukung alur latihan.
2. Buka folder project latihan. Minta penjelasan isinya tanpa perubahan. Jika project belum ada, minta petunjuk menyiapkan project kecil sesuai alat yang dipilih sebelum melanjutkan.
3. Kirim brief. Minta rencana terlebih dahulu, baca, dan luruskan bagian yang keliru.
4. Izinkan tindakan yang relevan setelah melihat perubahan atau perintah. Terapkan satu bagian, jalankan, dan review.
5. Coba fungsi utama, laporkan satu masalah secara spesifik, lalu uji ulang hasil perbaikannya.
6. Bila ingin membagikan, periksa secret dan kebutuhan hosting, terbitkan, lalu uji URL nyata dari perangkat lain.

**Catatan hasil peserta:** Nama project, fungsi yang dicoba, masalah yang ditemukan, keputusan perbaikan, hasil uji ulang, serta URL publik jika sudah ada. Repository opsional. Tanpa URL, praktik masih boleh dicatat sebagai project lokal; jangan dilabeli berhasil deploy.

## Aturan alur untuk implementasi

Bagian ini untuk penyunting dan pengembang, bukan copy yang harus selalu tampil kepada peserta.

- **Urutan:** Pembuka → 1–12 → selesai simulasi. Praktik sungguhan dan bacaan tambahan bersifat pilihan. Pre-test/post-test lama ada di lampiran untuk peninjauan; jangan menambah gerbang wajib di tengah alur tanpa keputusan terpisah.
- **Pilihan tertutup:** Pilih → kirim/periksa → umpan balik → coba lagi atau lanjut. Kunci dan alasan mengikuti tabel tiap bagian. Lanjut baru terbuka setelah jawaban sesuai; sediakan “Lihat pembahasan dan lanjut” agar peserta tidak terkunci. Catat dibantu sebagai dibantu, bukan jawaban mandiri yang benar.
- **Builder bagian 4:** Pilihan langsung memperbarui pratinjau; hasil diminta lewat tombol. Peserta boleh melihat semua kombinasi. Lanjut tersedia setelah pembahasan dilihat, tidak wajib mencentang semua pilihan.
- **Bagian 7 dan 9:** Reset simulasi tidak menghapus progres kursus. Hasil pengamatan harus muncul setelah aksi uji, bukan sebelum peserta mencoba. Pada bagian 9, uji ulang Jeda dan Reset diperlukan untuk menyelesaikan demonstrasi; tersedia pembahasan sebagai bantuan.
- **Tulisan bebas:** Tidak memakai skor benar/salah atau regex sebagai bukti kualitas. Bagian 12 menawarkan checklist mandiri; tulisan boleh diperbaiki, atau dilewati dengan konfirmasi singkat “Lanjut tanpa menyimpan brief”.
- **Kembali dan ubah:** Simpan jawaban tiap bagian. Mengubah brief bagian 4 menghitung ulang hasil simulasinya dan menghapus status pemeriksaan hasil lama pada bagian itu. Bagian 5–11 memakai brief timer contoh yang dinyatakan tetap; tidak berpura-pura mengikuti setiap tulisan bebas peserta. Brief project sendiri hanya dipakai pada bagian 12 dan praktik.
- **Progres:** Simpan bagian, fase, pilihan, status bantuan, dan tulisan. Berhenti/lalu kembali membuka keadaan terakhir. Bacaan tambahan tidak menjadi syarat selesai. Menyelesaikan simulasi dan menyelesaikan praktik dicatat terpisah.
- **Interaksi aksesibel:** Pasangan, pengelompokan, dan urutan dapat dikerjakan dengan tombol/keyboard, bukan drag saja. Umpan balik menjelaskan tindakan dan akibat tanpa bergantung pada warna. Timer latihan punya mode demonstrasi langkah demi langkah agar tidak menuntut respons cepat.
- **Visual yang membantu:** Catatan prompt, panel rencana, potongan perubahan file, timer, dan tabel harapan/hasil dibuat dengan HTML/CSS. Jangan menampilkan terminal palsu seolah tindakan nyata telah dijalankan. Label simulasi tetap terlihat pada output contoh.

## Cakupan materi lama

| Pelajaran asal | Tempat di alur baru |
| --- | --- |
| 1. Dari Copy-Paste ke Coding Agent | Bagian 1; pengantar istilah dan pemula dalam bacaan tambahan |
| 2. Kenali Alat dan Modelnya | Bagian 2; agent loop di bagian 7; model gratis, benchmark, dan kebijakan data dalam detail |
| 3. Izin dan Cara Kerja Agent | Bagian 3, 6, dan 8 |
| 4. Beri Agent Arah dan Konteks | Bagian 4–6; AGENTS.md, skills, MCP dalam detail bagian 5 |
| 5. Dari Laptop ke Internet | Bagian 10–11 dan panduan praktik/setup |
| 6. Bangun Ide, Satu Bagian Dulu | Bagian 4, 6–8, 12, serta praktik ide sendiri |
| 7. Uji, Perbaiki, dan Luncurkan | Bagian 9, 11–12; refleksi, berbagi, dan keterampilan lanjutan |

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
