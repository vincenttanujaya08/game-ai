# Vibe Coding — alur materi interaktif

Dokumen kerja untuk mengubah materi Vibe Coding menjadi pengalaman belajar yang lebih pendek, interaktif, dan berkesinambungan. Jalur utama mengikuti satu project yang sama—timer belajar—supaya peserta tidak perlu memahami konteks baru setiap kali pindah bagian.

Materi asli, sumber, panduan alat, dan asesmen tetap disimpan di lampiran sebagai bahan pengecekan. Bagian utama di bawah ini adalah naskah yang diarahkan untuk pengalaman peserta.

## Pembuka peserta

**Judul:** Dari ide kecil sampai jadi aplikasi yang bisa dicoba

Kita mulai dari project yang sederhana: timer belajar.

Bayangkan kamu ingin timer dengan durasi awal 25 menit. Ada tombol **Mulai** untuk menjalankan waktu, **Jeda** untuk berhenti sebentar, dan **Reset** untuk kembali ke awal. Kedengarannya kecil, tetapi dari project ini kita bisa melihat hampir seluruh alur bekerja dengan coding agent: memberi arahan, mengecek rencana, mengizinkan tindakan, melihat perubahan, mencari bug, sampai membagikan hasilnya.

Kamu tidak perlu menghafal kode atau memahami semua istilah teknis dari awal. Fokusnya bukan “seberapa cepat AI bisa membuat aplikasi”, tetapi bagaimana kamu tetap tahu apa yang sedang dibuat, kenapa sebuah perubahan dilakukan, dan bagaimana memastikan hasilnya benar-benar bekerja.

Semua contoh perubahan file, jawaban agent, dan hasil pengujian di bagian ini adalah **simulasi yang sudah disiapkan**. Tidak ada file di laptopmu yang akan diubah dan tidak ada aplikasi yang benar-benar diterbitkan. Setelah simulasi selesai, ada bagian terpisah kalau kamu ingin mencoba alur yang sama pada project sungguhan.

**Tombol:** Mulai dari masalah pertama →

## Peta perjalanan

Timer yang sama akan kita bawa dari awal sampai akhir. Setiap tahap menghasilkan sesuatu yang dipakai lagi pada tahap berikutnya.

| Tahap | Bagian | Yang kamu bawa ke tahap berikutnya |
| --- | --- | --- |
| Kenali cara kerjanya | 1–3 | Tahu perbedaan chat, model, agent, serta tindakan yang boleh dilakukan |
| Beri arah dan bangun | 4–8 | Punya brief yang jelas, konteks yang cukup, rencana, dan perubahan yang sudah ditinjau |
| Uji dan bagikan | 9–12 | Punya hasil uji, keputusan soal penyimpanan, pemeriksaan sebelum publikasi, dan pola kerja untuk project sendiri |

Setiap bagian dimulai dari situasi yang muncul pada project, bukan dari definisi panjang. Peserta mencoba dulu, melihat akibatnya, lalu membaca pembahasannya. Detail tambahan tetap tersedia melalui **Baca lebih lanjut** bagi yang ingin memahami konsepnya lebih jauh.

## Tahap 1 — Kenali cara kerjanya

### 1. Kodenya sudah ada, tapi aplikasinya belum jalan

**Tujuan:** Membedakan bantuan AI chat dengan coding agent yang memiliki akses ke project.

**Situasi di layar:**

> Kamu meminta AI membuat timer sederhana. Kodenya sudah kamu salin ke project, tetapi saat dijalankan muncul `Module not found`.

Kalau hanya memakai AI chat, kamu perlu membawa sendiri pesan error dan potongan kode yang menurutmu relevan ke percakapan. Itu tetap bisa membantu, tetapi AI hanya melihat bahan yang kamu kirim.

Coding agent bisa bekerja dengan cara berbeda. Jika diberi akses, agent dapat melihat file yang ada di project, mencari hubungan antarfile, lalu menjelaskan apa yang ditemukannya.

**Interaksi — pilih bantuan:**

“Kamu belum tahu sumber errornya. Pilihan mana yang benar-benar memanfaatkan kemampuan coding agent?”

| Pilihan | Setelah dipilih |
| --- | --- |
| A. “Jelaskan error dari pesan yang saya tempel di chat.” | Bisa membantu, tetapi AI masih hanya melihat pesan yang kamu kirim. Belum ada pemeriksaan langsung ke project. |
| B. “Baca file yang terkait. Jelaskan penyebab dan rencananya dulu, jangan ubah apa pun.” | Agent dapat memeriksa project dan memberi alasan berdasarkan file yang ditemukan. Belum ada perubahan yang dilakukan. |
| C. “Buatkan satu file baru, nanti saya salin sendiri.” | Kamu masih harus memindahkan kode dan menentukan sendiri apakah file itu cocok dengan project. |

**Kartu hasil B — simulasi:**

> `App.jsx` mencoba mengambil `Timer.jsx`, tetapi file yang tersedia bernama `StudyTimer.jsx`. Saya akan mencocokkan import dengan file yang ada. Setelah itu, project perlu dijalankan lagi untuk memastikan errornya hilang.

**Pembahasan:** Inilah perbedaan pentingnya. Agent bukan sekadar tempat bertanya; ia bisa memakai model bersama konteks dan alat untuk bekerja pada project. Akses tersebut membuatnya lebih mudah mencari hubungan antarfile, tetapi tidak membuat hasilnya otomatis benar. Kita masih perlu melihat rencana, perubahan, dan hasil akhirnya.

**Baca lebih lanjut:** Di course ini, *vibe coding* berarti membangun software melalui percakapan dengan AI sambil tetap memberi arah, meninjau perubahan, dan mencoba hasilnya. Istilah ini dipakai dengan arti yang cukup luas di luar course. Untuk sekarang, kamu tidak perlu menghafal istilah editor, terminal, atau repository. Kita akan mengenalnya saat benar-benar dibutuhkan.

**Transisi:** Sekarang agent sudah bisa melihat project. Tapi sebelum memberinya pekerjaan, ada satu hal yang perlu dibedakan: mana yang disebut alat, mana yang disebut model, dan mana yang disebut agent.

**Lanjut:** Bedakan alat, model, dan agent →

### 2. Tidak semua alat cocok untuk pekerjaan yang sama

**Tujuan:** Memilih jenis alat dan kemampuan model sesuai kebutuhan, bukan berdasarkan nama atau harga saja.

**Situasi:** Dalam project yang sama, kamu punya tiga kebutuhan berbeda: mencari ide, mencoba tampilan dengan cepat, dan memperbaiki file yang sudah ada.

**Interaksi — pasangkan pekerjaan dengan bantuan yang paling masuk akal:**

| Pekerjaan | Pasangan yang diterima | Pembahasan |
| --- | --- | --- |
| Membandingkan beberapa ide timer | AI chat | Kamu masih mencari arah. Percakapan sudah cukup tanpa perlu menyentuh project. |
| Mencoba prototype cepat lewat browser | AI app builder | Builder bisa membantu menyiapkan banyak bagian awal di lingkungannya sendiri. |
| Memperbaiki import pada project yang sudah ada | Coding agent dengan akses project | Agent dapat membaca file yang memang sedang bermasalah dan bekerja pada konteks project tersebut. |

Batas antarkategori tidak selalu kaku. Satu produk bisa memiliki beberapa kemampuan sekaligus. Di bagian ini, yang penting bukan menghafal merek, tetapi mengenali bantuan seperti apa yang dibutuhkan oleh tugasnya.

**Interaksi lanjutan:**

“Kamu cuma ingin mengganti tulisan tombol `Start` menjadi `Mulai`. Haruskah selalu memakai model paling mahal?”

- **Tidak. Mulai dari model yang cukup untuk tugasnya.** Perubahan kecil belum tentu membutuhkan model paling kuat. Yang penting, hasilnya tetap diperiksa.
- **Ya. Model yang lebih mahal pasti lebih benar.** Harga atau ukuran model tidak menjamin perubahan pertama langsung benar. Kemampuan lebih besar baru terasa berguna ketika tugas memang lebih rumit.

**Baca lebih lanjut:** Model menghasilkan respons dan melakukan penalaran. Agent menghubungkan model dengan konteks, alat, izin, dan lingkungan kerja. Benchmark seperti SWE-bench, LiveCodeBench, dan Terminal-Bench juga mengukur jenis kemampuan yang berbeda. Saat memilih model, lihat kebutuhan tugas, biaya, kecepatan, konteks, dan kebijakan datanya. Course ini memakai Kilo sebagai alat latihan, tetapi pola kerjanya bisa dibawa ke coding agent lain.

**Transisi:** Memilih agent yang tepat baru setengah cerita. Karena agent bisa membaca file, mengubah kode, atau menjalankan perintah, kita juga perlu menentukan tindakan mana yang boleh langsung dilakukan dan mana yang harus berhenti dulu untuk meminta izin.

**Lanjut:** Atur apa yang boleh dilakukan →

### 3. Boleh baca, boleh ubah, atau harus tanya dulu?

**Tujuan:** Menilai izin berdasarkan tindakan dan dampaknya.

**Situasi:** Agent sudah menemukan import yang keliru. Sekarang ia membutuhkan beberapa tindakan untuk memeriksa dan memperbaikinya.

**Interaksi — tentukan Allow, Ask, atau Deny untuk latihan ini:**

| Tindakan | Aturan latihan | Umpan balik |
| --- | --- | --- |
| Membaca `App.jsx` dan `StudyTimer.jsx` di folder latihan | Allow | File tersebut memang relevan dengan error dan folder latihan dinyatakan tidak memuat data rahasia. |
| Mengedit import lalu menjalankan perintah pemeriksaan | Ask | Sebelum project berubah atau sebuah perintah dijalankan, lihat dulu apa yang akan dilakukan dan apakah masih sesuai tugas. |
| Menghapus seluruh folder project agar bisa mulai dari awal | Deny | Satu import yang salah tidak memberi alasan untuk menghapus seluruh pekerjaan. |

**Setelah cocok, tampilkan permintaan simulasi:**

> Saya akan memperbaiki satu import. Setelah itu saya ingin menjalankan perintah pemeriksaan yang sudah tersedia di project. Lihat rinciannya sebelum mengizinkan.

Pilihan peserta:

- **Lihat perubahan dan perintah dulu** → buka rincian, lalu tampilkan tombol **Izinkan tindakan ini**.
- **Izinkan semua tindakan berikutnya** → tampilkan pengingat bahwa izin yang terlalu luas membuat tindakan berikutnya berjalan dengan pemeriksaan yang lebih sedikit. Peserta boleh kembali mengubah pilihan.

**Pembahasan:** `Allow` berarti tindakan tertentu boleh berjalan, `Ask` berarti agent harus berhenti dan meminta persetujuan, sedangkan `Deny` memblokirnya. Tidak ada satu konfigurasi yang cocok untuk semua project. Bahkan membaca file perlu mempertimbangkan isi dan kebijakan data. Persetujuan untuk satu tindakan juga bukan izin otomatis untuk semua hal yang ingin dilakukan agent setelahnya.

**Baca lebih lanjut:** Dalam latihan Kilo, Ask bisa dipakai untuk memahami project, Plan untuk menyusun langkah, Code untuk menerapkan perubahan, dan Debug untuk menelusuri masalah. Nama atau ketersediaan mode dapat berubah mengikuti versi alat. Saat membuka project yang belum kamu kenal, permintaan sederhana seperti “Jelaskan project ini. Jangan ubah file” adalah titik awal yang masuk akal.

**Transisi:** Sekarang agent tahu file mana yang boleh dibaca dan kapan harus meminta izin. Berikutnya, masalahnya pindah ke kita: kalau arah yang diberikan masih kabur, agent tetap harus menebak apa yang sebenarnya ingin dibuat.

**Lanjut:** Beri agent tujuan yang lebih jelas →

## Tahap 2 — Beri arah, lalu bangun sedikit demi sedikit

### 4. Kalau brief-nya kabur, agent akan menebak

**Tujuan:** Menyusun brief sederhana yang menjelaskan pengguna, fungsi inti, dan batas versi pertama.

**Situasi — prompt awal:**

> Buat aplikasi belajar yang keren.

**Rencana agent — simulasi:**

> Tambahkan akun, kalender, leaderboard, dan database.

Rencananya tidak sepenuhnya aneh. Masalahnya, agent tidak tahu bahwa yang kamu inginkan sebenarnya jauh lebih kecil: timer untuk dipakai sendiri.

**Pertanyaan:** “Informasi apa yang belum kamu sampaikan?”

**Interaksi — susun brief dari tiga bagian:**

1. **Siapa yang memakai:** “Untuk saya yang belajar sendiri di laptop.”
2. **Apa yang harus bekerja:** “Durasi awal 25 menit dengan tombol Mulai, Jeda, dan Reset.”
3. **Apa yang belum perlu:** “Versi pertama tanpa akun, kalender, dan leaderboard.”

Peserta boleh memasang atau melepas setiap bagian. Pratinjau prompt berubah langsung, tetapi hasil rencana baru muncul setelah menekan **Lihat rencananya**.

**Logika hasil:**

- Tanpa pengguna → agent masih perlu menebak siapa yang memakai timer.
- Tanpa fungsi inti → belum jelas perilaku apa yang harus dibangun.
- Tanpa batas → agent masih boleh mengusulkan fitur lain sebagai kemungkinan.
- Ketiganya lengkap → rencana mengarah ke satu timer sederhana dengan tiga tombol.

Jika lebih dari satu bagian kosong, tampilkan semua hal yang masih belum jelas. Jangan memilih satu masalah secara acak.

**Pembahasan:** Brief yang baik tidak harus panjang. Yang dibutuhkan adalah cukup konteks agar agent bisa membuat rencana yang dapat kamu nilai. Semakin kecil dan jelas versi pertamanya, semakin mudah juga menentukan apakah hasilnya sudah sesuai.

**Transisi:** Brief-nya sekarang jelas. Tapi memberi agent lebih banyak informasi belum tentu selalu membantu. Kita perlu memilih konteks yang benar-benar berguna untuk timer ini dan menahan hal-hal yang baru akan dibutuhkan nanti.

**Lanjut:** Pilih konteks yang benar-benar membantu →

### 5. Konteks yang membantu, bukan yang menumpuk

**Tujuan:** Membedakan konteks yang diperlukan sekarang dari aturan, skill, atau integrasi yang belum relevan.

**Situasi:** Kamu sudah punya brief timer. Sekarang ada beberapa informasi dan alat yang bisa diberikan ke agent. Mana yang benar-benar membantu versi pertama?

**Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”:**

| Kartu | Untuk timer versi ini | Alasan |
| --- | --- | --- |
| Struktur file dan cara menjalankan project | Perlu sekarang | Agent perlu tahu tempat bekerja dan bagaimana mencoba hasilnya. |
| Perilaku Mulai, Jeda, dan Reset | Perlu sekarang | Ini adalah fungsi yang nantinya harus bisa diuji. |
| Aturan: jangan tambah library tanpa alasan; tampilan nyaman di ponsel | Perlu sekarang | Batas ini membantu agent memilih solusi yang sesuai sejak awal. |
| MCP untuk kalender online | Belum perlu | Kalender tidak termasuk versi pertama. |
| Skill untuk integrasi pembayaran | Belum perlu | Timer ini belum menerima pembayaran. |
| Database akun pengguna | Belum perlu | Akun juga belum masuk cakupan. |

Setelah semua kartu ditempatkan, tombol **Periksa pilihan** membuka alasan pada masing-masing kartu. Peserta boleh memindahkan kembali pilihan yang ingin diperbaiki.

**Pembahasan:** Konteks berguna ketika membantu keputusan yang sedang dibuat. Menambahkan lebih banyak dokumen, skill, atau integrasi tidak otomatis membuat agent lebih pintar. Untuk project kecil, terlalu banyak persiapan justru bisa menjauhkan perhatian dari fungsi utama yang ingin dibuat.

**Baca lebih lanjut:** `AGENTS.md` bisa menyimpan aturan project yang berlaku berulang kali. `PROJECT.md` dapat menyimpan tujuan, fitur, dan batas. `SKILL.md` berisi petunjuk untuk jenis pekerjaan tertentu. MCP memberi agent akses ke tool atau layanan tambahan. Project pertama tidak perlu memiliki semuanya. Tambahkan ketika ada kebutuhan yang benar-benar muncul.

**Transisi:** Kita sekarang punya brief dan konteks yang cukup. Sebelum agent mulai mengubah file, ada satu kesempatan murah untuk menangkap salah arah: baca rencananya.

**Lanjut:** Lihat rencananya sebelum coding →

### 6. Sebelum coding, lihat rencananya

**Tujuan:** Menilai apakah rencana sesuai brief dan memilih urutan implementasi yang mudah diperiksa.

**Interaksi — bandingkan dua rencana:**

**Rencana A**

1. Buat tampilan timer dan tiga tombol.
2. Tambahkan hitung mundur.
3. Coba Mulai, Jeda, dan Reset.
4. Periksa tampilan pada layar kecil.

Tidak ada akun atau database.

**Rencana B**

1. Buat sistem akun.
2. Tambahkan langganan.
3. Buat dashboard kalender.
4. Baru buat timer.

**Pertanyaan:** “Mana yang benar-benar mengikuti brief tadi?”

- **A** → tunjukkan hubungan setiap langkah dengan kebutuhan yang sudah disepakati.
- **B** → tandai akun, langganan, dan kalender sebagai perluasan yang belum diminta. Peserta boleh mengganti pilihan.

**Interaksi berikutnya — susun urutan yang masuk akal untuk latihan:**

Tampilan utama → Fungsi timer → Uji alur utama → Perbaiki berdasarkan hasil uji

**Pembahasan:** Urutan ini bukan satu-satunya cara membangun software. Kita memakainya karena setiap perubahan mudah dilihat dan diuji sebelum pekerjaan membesar. Pengujian pun tidak harus menunggu seluruh aplikasi selesai. Kalau ringkasan atau rencana agent sudah salah, lebih murah memperbaikinya sekarang daripada setelah banyak file berubah.

**Transisi:** Rencananya sudah cukup kecil dan sesuai brief. Jadi, jangan langsung minta semuanya sekaligus. Kita mulai dari bagian pertama dan lihat apa yang benar-benar muncul di layar.

**Lanjut:** Bangun bagian pertama →

### 7. Buat sedikit, coba, lalu lanjut

**Tujuan:** Mengalami siklus instruksi → perubahan → pemeriksaan → revisi.

**Permintaan peserta dalam simulasi:**

> Buat tampilan timer 25:00 dengan tombol Mulai, Jeda, dan Reset. Jangan tambah fitur lain dulu.

**Hasil pertama:** Timer dan tiga tombol sudah terlihat. Belum ada hitung mundur.

**Interaksi — pilih kesimpulan:**

- **“Tampilannya sudah ada. Berikutnya tambahkan perilaku tombol dan hitung mundur.”** → Ya. Tahap pertama sudah terlihat, tetapi fungsi timer belum selesai.
- **“Project sudah selesai karena semua tombol sudah muncul.”** → Belum. Tombol yang terlihat tidak membuktikan tombol tersebut melakukan sesuatu.

**Tahap berikutnya — permintaan:**

> Tambahkan hitung mundur. Jeda menghentikan hitungan tanpa menghapus sisa waktu. Reset mengembalikan timer ke 25:00 dan berhenti.

**Hasil simulasi yang bisa dicoba:**

- **Mulai** → waktu berkurang.
- **Jeda** → hitungan berhenti.
- **Reset** → kembali ke 25:00 dan berhenti.

Tampilkan label bahwa perilaku ini adalah simulasi course, bukan hasil build project peserta.

**Pembahasan:** Agent bekerja dalam putaran. Ia membaca konteks, memakai alat sesuai izin, melihat hasilnya, lalu menentukan langkah berikutnya. Kita ikut melihat setiap hasil kecil supaya tahu apa yang sudah benar dan bagian mana yang masih perlu dikerjakan.

**Transisi:** Aplikasinya mulai berfungsi. Tapi sebelum merasa aman karena tampilannya terlihat benar, kita perlu melihat apa saja yang sebenarnya diubah agent di balik layar.

**Lanjut:** Lihat perubahan file →

### 8. Jangan terima perubahan hanya karena hasilnya terlihat benar

**Tujuan:** Mengenali perubahan yang relevan dan mempertanyakan perluasan yang tidak punya alasan jelas.

**Kartu perubahan — simulasi:**

1. `StudyTimer.jsx` — menambahkan status berjalan dan sisa waktu.
2. `timer.css` — menyesuaikan tombol agar nyaman dipakai di layar kecil.
3. `package.json` — menambahkan paket pembayaran.
4. `README.md` — menambahkan cara menjalankan dan mencoba timer.

**Interaksi:** “Mana yang perlu kamu tanyakan sebelum perubahan diterima?”

- Paket pembayaran perlu dipertanyakan karena tidak ada kaitannya dengan brief timer.
- Perubahan pada timer, CSS, dan petunjuk menjalankan masih masuk akal, tetapi bukan berarti isinya boleh dilewati begitu saja.
- Jika peserta menandai semuanya, jelaskan bahwa review bukan berarti mencurigai setiap perubahan. Tujuannya mencari kesesuaian, dampak, dan hal yang tidak diminta.

**Permintaan lanjutan:**

> Kenapa paket pembayaran diperlukan? Kalau tidak ada hubungannya dengan timer versi pertama, hapus tambahan itu dan gunakan bagian project yang sudah ada.

**Hasil simulasi:** Paket pembayaran dihapus dari usulan. Daftar perubahan diperbarui.

**Baca lebih lanjut:** Git membantu menyimpan riwayat dan membandingkan perubahan antarversi. Kamu belum harus memahami setiap baris kode untuk mulai melakukan review. Mulailah dari tiga pertanyaan: file apa yang berubah, kenapa perlu berubah, dan bagaimana hasilnya akan diperiksa.

**Transisi:** Perubahannya sekarang sesuai dengan brief. Berikutnya kita perlu membuktikan fungsi timer dengan mencoba perilakunya, bukan hanya menerima kalimat “sudah selesai” dari agent.

**Lanjut:** Uji versi ini →

## Tahap 3 — Buktikan hasilnya, baru bagikan

### 9. Kelihatan jadi belum berarti sudah benar

**Tujuan:** Menemukan bug dengan langkah uji yang bisa diulang dan menjelaskan masalah secara spesifik.

**Situasi:** Agent mengatakan timer sudah selesai. Kamu mencobanya sendiri.

**Interaksi — lakukan uji terarah:**

25:00 → tekan **Mulai** → tunggu beberapa detik → tekan **Jeda**

Sebelum hasil dibuka, tanyakan:

> Kalau Jeda bekerja sesuai brief, apa yang seharusnya terjadi?

**Harapan:** Hitungan berhenti pada sisa waktu terakhir.

**Hasil simulasi:** Waktu malah kembali ke 25:00.

Tampilkan dua kartu berdampingan:

- **Yang diharapkan:** berhenti di sisa waktu.
- **Yang terjadi:** kembali ke 25:00.

**Interaksi — pilih laporan bug yang lebih membantu:**

- **“Timernya jelek, perbaiki semuanya.”** → Agent tidak tahu kondisi kapan masalah muncul, apa yang salah, dan bagian mana yang jangan diubah.
- **“Setelah Mulai, waktu berkurang. Saat Jeda ditekan, waktu kembali ke 25:00. Seharusnya berhenti di sisa waktu. Cari penyebabnya dan perbaiki tanpa mengubah perilaku Reset.”** → Masalah, hasil aktual, hasil yang diharapkan, dan batas perubahannya jelas.

**Setelah pilihan sesuai, tampilkan jawaban agent:**

> Fungsi Jeda ternyata memakai logika Reset. Saya akan memisahkan keduanya.

Tampilkan versi simulasi yang diperbaiki. Peserta mengulangi uji Jeda, lalu mencoba Reset untuk memastikan perbaikannya tidak merusak fungsi lain.

**Pembahasan:** “Sudah jadi” baru punya arti setelah ada sesuatu yang bisa diperiksa. Untuk timer ini, kamu juga bisa mencoba menekan Mulai dua kali, melakukan refresh, mengecek layar kecil, atau membiarkan waktunya habis. Tes otomatis membantu pemeriksaan berulang, tetapi pengalaman pengguna tetap perlu dicoba secara langsung.

**Transisi:** Fungsi utamanya sekarang lolos uji. Sebelum aplikasi dibagikan, ada satu pertanyaan desain yang sering membuat project kecil terlalu cepat membesar: apakah kita benar-benar membutuhkan database?

**Lanjut:** Tentukan cara menyimpan data →

### 10. Perlu database atau belum?

**Tujuan:** Memilih cara penyimpanan berdasarkan kebutuhan nyata.

**Situasi A:**

> Saya ingin durasi pilihan tetap tersimpan ketika browser yang sama dibuka lagi.

**Pilihan:**

- Penyimpanan lokal di browser.
- Database online wajib.

**Jawaban yang masuk akal:** Penyimpanan lokal di browser bisa cukup. Pengaturan dapat bertahan di perangkat tersebut, tetapi bisa hilang jika data browser dihapus dan tidak otomatis muncul di perangkat lain.

Lalu ubah kebutuhannya.

**Situasi B:**

> Sekarang saya ingin durasi yang sama muncul ketika membuka timer dari laptop dan ponsel.

**Pilihan:**

- Tetap menyimpan data secara terpisah di setiap browser.
- Pertimbangkan penyimpanan online dan cara mengenali pengguna atau perangkat.

**Jawaban yang masuk akal:** Kebutuhan lintas perangkat mengubah rancangan. Sebelum menambah layanan, tentukan data apa yang disimpan, bagaimana perangkat dihubungkan, serta konsekuensi privasi dan aksesnya.

**Pembahasan:** Teknologi sebaiknya mengikuti kebutuhan. Database bukan tanda bahwa sebuah project lebih “serius”. Untuk timer versi pertama, penyimpanan lokal mungkin cukup. Kalau kebutuhannya berubah, barulah desainnya ikut berkembang.

**Baca lebih lanjut:** Database seperti PostgreSQL menyimpan data terstruktur. Supabase adalah salah satu layanan yang menyediakan database dan fitur lain. Login, API, autentikasi, atau penyimpanan online ditambahkan ketika memang dibutuhkan oleh fitur, bukan karena semua aplikasi harus memilikinya.

**Transisi:** Kita sudah punya timer yang bekerja dan tahu bagaimana datanya akan disimpan. Sekarang muncul kebutuhan baru: temanmu ingin mencobanya. Itu berarti aplikasi harus keluar dari laptopmu.

**Lanjut:** Bawa aplikasi ke URL publik →

### 11. Dari laptopmu ke orang lain

**Tujuan:** Memahami perbedaan localhost dan URL publik serta melakukan pemeriksaan sebelum dan sesudah deployment.

**Situasi:**

> Kamu mengirim `localhost:5173` kepada teman. Ia bilang link-nya tidak bisa dibuka.

**Interaksi — pilih penjelasan:**

- **“Localhost menunjuk ke komputer yang sedang membuka alamat itu. Agar teman bisa mencoba, aplikasi perlu diterbitkan ke alamat publik.”** → Tepat.
- **“Teman harus memakai merek laptop yang sama.”** → Bukan itu masalahnya. Alamat `localhost` tetap menunjuk ke perangkat masing-masing.

Sebelum tombol **Terbitkan** muncul, peserta harus memeriksa tiga temuan berikut.

**Interaksi — cek sebelum publikasi:**

| Temuan | Apa yang dilakukan |
| --- | --- |
| Ada secret key layanan tertulis di kode frontend | Hentikan publikasi. Keluarkan secret dari frontend dan repository. Jika sudah terekspos, cabut atau rotasi key tersebut. |
| Fungsi utama belum pernah diuji | Uji dulu dan catat hasilnya. |
| Tidak punya akun GitHub | Bukan penghalang universal. Gunakan jalur deployment yang sesuai dengan project dan layanan yang dipakai. |

**Setelah pemeriksaan:** tampilkan dua contoh jalur belajar:

- Unggah melalui layanan yang mendukung deployment langsung.
- Hubungkan repository Git ke layanan hosting.

Saat praktik sungguhan, peserta tetap diarahkan untuk mengikuti dokumentasi layanan yang digunakan karena dukungan framework, proses build, dan antarmuka dapat berubah.

**Hasil publikasi — simulasi:** `https://timer-belajar.example`

Berikan label jelas bahwa ini alamat contoh, bukan project live.

**Pertanyaan terakhir:**

> Build berhasil. Berarti selesai?

- **Buka URL publik dari perangkat lain, lalu coba Mulai, Jeda, Reset, dan tampilan layar kecil.** → Ya. Deployment perlu dibuktikan dari alamat yang benar-benar akan dibuka pengguna.
- **Langsung anggap seluruh aplikasi benar.** → Belum. Build sukses hanya membuktikan proses build selesai, bukan semua alur pengguna bekerja.

**Pembahasan:** Secret perlu berada di lingkungan server yang memang menjaga kerahasiaannya. Memindahkan nilai ke environment variable tidak otomatis membuatnya aman jika nilai tersebut tetap dibundel ke kode browser. Pada Vite, misalnya, variabel yang diekspos ke client memang dapat dibaca dari aplikasi frontend. [Sumber: dokumentasi Vite tentang environment variables](https://vite.dev/guide/env-and-mode). Deployment selesai ketika URL publik dapat dibuka dan fungsi utamanya kembali diuji dari lingkungan tersebut.

**Transisi:** Timer contoh sudah melewati seluruh perjalanan: dari error pertama sampai URL publik. Sekarang giliran mengganti timer itu dengan sesuatu yang benar-benar ingin kamu buat.

**Lanjut:** Susun project versimu sendiri →

### 12. Sekarang ganti timer dengan idemu sendiri

**Tujuan:** Membawa pola kerja dari simulasi ke project peserta.

Alih-alih memberi daftar teknologi, minta peserta menjelaskan empat hal yang sama seperti yang dipakai sepanjang course.

**Interaksi — isi empat bagian:**

1. **Untuk siapa?**  
   “Saya ingin membuat … untuk …”

2. **Apa yang harus bisa dilakukan versi pertama?**  
   “Versi pertama harus bisa …”

3. **Apa yang sengaja belum dibuat?**  
   “Untuk sekarang, belum perlu …”

4. **Bagaimana kamu akan membuktikan bahwa hasilnya bekerja?**  
   “Saya akan mencobanya dengan …”

**Contoh:**

> Saya ingin membuat timer untuk saya yang belajar sendiri. Versi pertama punya durasi 25 menit serta tombol Mulai, Jeda, dan Reset. Belum perlu login atau kalender. Saya akan mencoba Jeda setelah beberapa detik, Reset, dan tampilannya di ponsel.

**Hasil:** Gabungkan jawaban peserta menjadi satu kartu brief yang bisa disalin.

Tampilkan checklist untuk diperiksa sendiri:

- Sudah jelas siapa yang memakai?
- Ada fungsi yang benar-benar bisa dicoba?
- Batas versi pertama sudah disebut?
- Sudah ada cara untuk menguji hasilnya?

Checklist membantu peserta meninjau tulisannya, tetapi jangan menyatakan brief “benar” hanya karena semua kolom terisi.

**Refleksi:**

- Bagian mana yang kamu putuskan sendiri?
- Ada usulan agent yang tadi kamu pertanyakan?
- Apa yang baru terlihat setelah hasilnya diuji?

Jawaban disimpan sebagai catatan pribadi tanpa skor benar atau salah.

**Ringkasan akhir:**

Tentukan arah → beri konteks yang perlu → periksa rencana → izinkan tindakan dengan sadar → bangun sedikit → lihat perubahan → uji → perbaiki → baru bagikan.

**Selesai simulasi:**

> Kamu sudah mengikuti satu project dari masalah pertama sampai siap dibagikan. Polanya bisa dipakai lagi pada project yang berbeda.

**Pilihan berikutnya:** Coba project sungguhan / Baca detail dan sumber / Kembali ke bagian sebelumnya

Berbagi project kepada teman, dosen, atau sebagai portofolio tetap opsional. Kalau kamu membagikannya, ceritakan bukan hanya “dibuat dengan AI”, tetapi juga apa kegunaannya, bantuan apa yang diberikan agent, keputusan apa yang kamu ambil, dan bagaimana hasilnya diuji.

Git, testing, API, database, autentikasi, skills, dan MCP dapat dipelajari lebih dalam ketika project-mu benar-benar membutuhkannya.

## Praktik sungguhan — setelah simulasi

**Pembuka peserta:**

> Sekarang kamu sudah tahu alurnya. Kalau ingin mencoba dengan project sungguhan, gunakan brief yang baru dibuat. Bagian ini benar-benar bekerja pada file dan alatmu, jadi periksa izin dan perubahan yang muncul. Kamu juga boleh kembali nanti.

1. Siapkan editor dan coding agent yang ingin dipakai. Jika mengikuti kelas dengan Kilo, buka panduan setup di lampiran dan cocokkan dengan dokumentasi resminya. Periksa versi, model, izin, biaya, dan kebijakan data.
2. Buka folder project. Sebelum meminta perubahan, minta agent menjelaskan struktur dan cara menjalankannya. Jika project belum ada, mulai dari project kecil yang sesuai alatmu.
3. Kirim brief dan minta rencana lebih dulu. Baca ringkasannya; luruskan jika kebutuhanmu salah dipahami.
4. Terapkan satu bagian. Lihat perubahan atau perintah yang diminta sebelum memberi izin.
5. Jalankan fungsi utama. Jika menemukan masalah, laporkan kondisi, hasil yang terjadi, hasil yang diharapkan, dan bagian yang tidak ingin diubah.
6. Uji kembali setelah perbaikan.
7. Kalau ingin membagikan project, periksa secret dan kebutuhan hosting. Setelah deployment, buka URL publik dari perangkat lain dan coba fungsi utamanya sekali lagi.

**Catatan hasil peserta:** nama project, fungsi yang dicoba, masalah yang ditemukan, keputusan perbaikan, hasil uji ulang, dan URL publik jika memang sudah tersedia. Repository bersifat opsional. Project lokal tetap boleh dicatat sebagai hasil praktik; jangan diberi label berhasil deploy jika belum memiliki URL publik yang diuji.

## Aturan alur untuk implementasi

Bagian ini untuk penyunting dan pengembang, bukan copy utama peserta.

- **Satu project, satu cerita:** Bagian 1–11 selalu kembali ke timer contoh yang sama. Setiap bagian harus mengambil kondisi dari bagian sebelumnya dan menghasilkan sesuatu yang dipakai sesudahnya. Hindari membuka topik baru hanya karena konsep tersebut ingin “dimasukkan”.
- **Urutan:** Pembuka → 1–12 → selesai simulasi. Praktik sungguhan dan bacaan tambahan bersifat opsional. Pre-test/post-test lama tetap berada di lampiran untuk peninjauan.
- **Coba sebelum dijelaskan panjang:** Jika konsep bisa dipahami lewat pilihan atau akibat tindakan, tampilkan situasinya lebih dulu. Penjelasan konsep muncul setelah peserta mencoba atau melalui **Baca lebih lanjut**.
- **Pilihan tertutup:** Pilih → lihat akibat/umpan balik → perbaiki jika perlu → lanjut. Kunci mengikuti tiap bagian. Sediakan **Lihat pembahasan dan lanjut** agar peserta tidak terjebak jika belum menemukan jawaban.
- **Feedback berbicara tentang akibat, bukan nilai:** Hindari hanya menulis “Benar” atau “Salah”. Jelaskan apa yang terjadi pada project jika pilihan itu dipakai.
- **Builder bagian 4:** Pilihan langsung memperbarui pratinjau brief. Hasil agent baru muncul ketika peserta menekan **Lihat rencananya**. Peserta boleh mencoba beberapa kombinasi.
- **Bagian 7 dan 9:** Hasil pengamatan muncul setelah peserta melakukan aksi, bukan sebelumnya. Reset simulasi tidak menghapus progres course. Di bagian 9, peserta menguji ulang Jeda dan Reset setelah perbaikan.
- **Tulisan bebas:** Tidak memakai regex atau skor otomatis sebagai bukti kualitas. Bagian 12 memakai checklist mandiri. Peserta dapat memperbaiki tulisannya atau memilih **Lanjut tanpa menyimpan brief**.
- **Kembali dan ubah:** Simpan pilihan tiap bagian. Mengubah brief di bagian 4 menghitung ulang hasil simulasi bagian itu. Bagian 5–11 tetap menggunakan timer contoh yang sama dan tidak berpura-pura mengikuti semua tulisan bebas peserta.
- **Progres:** Simpan posisi, pilihan, status bantuan, serta catatan peserta. Jika berhenti, peserta kembali ke keadaan terakhir. Bacaan tambahan tidak menjadi syarat selesai.
- **Interaksi aksesibel:** Pasangan, pengelompokan, dan urutan harus bisa dikerjakan dengan tombol atau keyboard; jangan bergantung pada drag-and-drop. Umpan balik tidak hanya dibedakan lewat warna. Timer memiliki mode demonstrasi langkah demi langkah agar tidak membutuhkan respons cepat.
- **Visual harus membantu keputusan:** Prompt, rencana, perubahan file, timer, serta perbandingan “yang diharapkan” dan “yang terjadi” bisa divisualisasikan dengan HTML/CSS. Jangan membuat terminal palsu yang seolah-olah menjalankan tindakan nyata. Label **simulasi** tetap terlihat pada contoh hasil.
- **Jangan menumpuk teori:** Setiap layar sebaiknya punya satu pertanyaan utama atau satu keputusan. Jika ada detail yang berguna tetapi tidak diperlukan untuk langkah berikutnya, pindahkan ke **Baca lebih lanjut**.
- **Transisi harus membawa hasil sebelumnya:** Tombol lanjut dan kalimat transisi tidak sekadar mengatakan topik berikutnya. Sebutkan apa yang baru diketahui dan kenapa hal itu menimbulkan pertanyaan berikutnya.

## Cakupan materi lama

| Pelajaran asal | Tempat di alur baru |
| --- | --- |
| 1. Dari Copy-Paste ke Coding Agent | Bagian 1; istilah vibe coding dan pengantar pemula di bacaan tambahan |
| 2. Kenali Alat dan Modelnya | Bagian 2; agent loop terlihat kembali di bagian 7; benchmark dan kebijakan data di detail tambahan |
| 3. Izin dan Cara Kerja Agent | Bagian 3, lalu diterapkan kembali pada bagian 6–8 |
| 4. Beri Agent Arah dan Konteks | Bagian 4–6; AGENTS.md, skills, dan MCP sebagai detail bagian 5 |
| 5. Dari Laptop ke Internet | Bagian 10–11 dan panduan praktik |
| 6. Bangun Ide, Satu Bagian Dulu | Bagian 4, 6–8, lalu diterapkan pada ide sendiri di bagian 12 |
| 7. Uji, Perbaiki, dan Luncurkan | Bagian 9 dan 11–12; refleksi dan pengujian ulang di akhir |


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
