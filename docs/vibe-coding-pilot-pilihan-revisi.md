# Revisi latihan pilot Vibe Coding

Naskah cerita tetap bersumber dari `vibe-coding-alur-interaktif-natural-v2.md`. Dokumen ini mencatat revisi pertanyaan, pilihan, dan umpan balik agar pengecoh lebih masuk akal. Kunci untuk penyunting; tidak ditampilkan kepada peserta sebelum menjawab.

## Bagian 1, langkah 1

Kamu ingin tahu sumber errornya. Permintaan mana yang memanfaatkan kemampuan coding agent?

Pilih satu permintaan yang akan kamu kirim. Setelah itu, lihat apa yang bisa diperiksa AI dari permintaan tersebut.

1. A. Periksa pesan error dan potongan kode yang saya kirim. Susun dugaan penyebab sebelum saya memilih file lain.

   Umpan balik: Ini bisa membantu, tetapi konteksnya masih berasal dari bahan yang kamu pilih sendiri. Permintaan ini belum memakai akses agent untuk menelusuri project.

2. B. Tulis contoh import yang sesuai untuk timer ini. Saya akan menyalinnya ke file yang menurutmu perlu diubah.

   Umpan balik: Contoh kode bisa berguna, tetapi belum memastikan nama dan hubungan file yang benar-benar ada. Kamu masih harus mencocokkan perubahan dengan project.

3. C. Telusuri import dan file yang tersedia di project ini. Jelaskan temuan dan rencananya sebelum mengubah kode.

   Umpan balik: Permintaan ini memakai akses agent untuk memeriksa konteks langsung. Temuannya dapat dibandingkan dengan file project sebelum kamu mengizinkan perubahan.

Kunci: pilihan 3.

## Bagian 2, langkah 2

Anggaran latihan terbatas. Bagaimana memilih model untuk mengganti satu label tombol?

Bandingkan tiga cara memulai pekerjaan ini. Pertimbangkan cakupan perubahan, biaya, dan bagaimana hasilnya akan diperiksa.

1. Mulai dengan model lebih kuat agar pemeriksaan project dilakukan lebih mendalam, lalu turunkan model setelah perubahan berhasil.

   Umpan balik: Pemeriksaan tetap berguna, tetapi tugas satu label belum menunjukkan perlunya kemampuan tambahan itu. Dengan anggaran terbatas, mulai dari kebutuhan tugasnya.

2. Mulai dengan model ringan, batasi perubahan pada label, lalu tinjau hasilnya sebelum memutuskan perlu kemampuan tambahan.

   Umpan balik: Cakupan kecil memberi kesempatan mencoba model yang cukup untuk tugas ini. Jika ada kesulitan nyata, kamu bisa menambah kemampuan berdasarkan bukti.

3. Mulai dengan model yang unggul di benchmark coding agar pilihan tidak bergantung pada perkiraan tingkat kesulitan tugas.

   Umpan balik: Benchmark memberi petunjuk untuk jenis tugas tertentu. Memakainya sebagai penentu utama belum mempertimbangkan kebutuhan dan anggaran untuk perubahan kecil ini.

Kunci: pilihan 2.

## Bagian 3, langkah 2

Agent meminta izin memperbaiki import. Apa yang ingin kamu lakukan sebelum menyetujuinya?

Bandingkan ketiga cara menanggapi permintaan ini, lalu pilih yang paling sesuai dengan izin untuk tugas kita.

1. Periksa diff dan isi perintah pemeriksaan, lalu beri izin hanya untuk tindakan yang sesuai dengan perbaikan import.

   Umpan balik: Kamu memeriksa perubahan sekaligus tindakan yang akan dijalankan. Izin tetap dibatasi pada tugas yang sedang ditinjau.

2. Izinkan perintah pemeriksaan lebih dulu, lalu baca diff jika hasil pemeriksaannya masih menunjukkan error pada project.

   Umpan balik: Hasil pemeriksaan dapat membantu, tetapi tindakan sudah berjalan sebelum kamu memahami perintah dan dampaknya. Build juga tidak menilai semua perubahan yang dibuat.

3. Cocokkan nama file dengan rencana, lalu beri izin untuk perintah berikutnya selama dijalankan dari folder project ini.

   Umpan balik: Nama file dan lokasi folder saja belum menjelaskan isi perubahan atau dampak perintah. Tindakan dalam folder project tetap perlu dibatasi dan ditinjau.

Kunci: pilihan 1.

## Bagian 6, langkah 1

Mana yang paling sesuai dengan brief kita?

Bandingkan cakupan dan urutan kedua rencana dengan brief, lalu pilih A atau B.

1. A

   Umpan balik: Rencananya tetap berpusat pada timer, tetapi menambahkan penyimpanan lintas perangkat sebelum kebutuhan itu muncul. Ini memperluas versi pertama.

2. B

   Umpan balik: Rencana ini membangun fungsi yang diminta, mengujinya, dan menjaga data tetap lokal. Tambahan dapat diputuskan setelah ada kebutuhan baru.

Kunci: pilihan 2.

## Bagian 7, langkah 1

Tampilan timer sudah muncul, tetapi tombolnya belum bekerja. Apa langkah berikutnya?

Bandingkan tiga langkah berikutnya dengan kondisi timer saat ini, lalu pilih yang paling sesuai.

1. Rapikan tampilan dan petunjuk penggunaan, lalu coba ketiga tombol saat versi pertama sudah siap untuk dibagikan.

   Umpan balik: Tampilan dan petunjuk berguna, tetapi belum ada fungsi tombol untuk dicoba. Menundanya sampai akhir membuat masalah fungsi lebih lambat terlihat.

2. Minta agent menuntaskan ketiga fungsi sekaligus dan memastikan perilakunya benar lewat review kode sebelum kita mencoba.

   Umpan balik: Review kode membantu, tetapi belum menggantikan percobaan perilaku timer. Kita perlu melihat hasil yang berjalan selama fungsi dibangun.

3. Tambahkan hitung mundur dan perilaku Mulai dulu, coba hasilnya, lalu lanjutkan ke Jeda dan Reset dengan uji masing-masing.

   Umpan balik: Kamu melanjutkan dari tampilan ke fungsi dengan hasil kecil yang bisa dicoba. Kesalahan lebih mudah dikaitkan dengan perubahan terakhir.

Kunci: pilihan 3.

## Bagian 9, langkah 2

Jeda ternyata mengembalikan waktu ke awal. Laporan mana yang paling membantu agent memperbaikinya?

Semua laporan menyebut masalah Jeda. Bandingkan informasi dan permintaan dalam tiap laporan, lalu pilih yang paling membantu perbaikan.

1. Setelah Mulai berjalan beberapa detik, Jeda mengembalikan waktu ke 25:00. Seharusnya sisa waktu tetap ada dan hitungan berhenti. Cari penyebabnya; pertahankan perilaku Reset.

   Umpan balik: Laporan memberi kondisi pemicu, hasil aktual, harapan, dan batas perubahan. Agent punya dasar untuk menelusuri bug tanpa mengubah fungsi yang berbeda.

2. Jeda tampaknya memakai fungsi Reset karena waktu kembali ke 25:00. Ganti pemanggilan itu dengan penghentian timer, lalu pastikan kedua tombol memakai fungsi terpisah.

   Umpan balik: Dugaannya mungkin benar, tetapi laporan langsung menetapkan penyebab dan implementasi sebelum diperiksa. Mintalah penelusuran berdasarkan perilaku yang bisa diulang.

3. Waktu kembali ke 25:00 saat Jeda ditekan. Buat Jeda menghentikan hitungan dan samakan perilaku tombol lain agar pengelolaan status timer lebih konsisten.

   Umpan balik: Masalah Jeda disebutkan, tetapi menyamakan tombol lain bisa mengubah Reset yang justru perlu kembali ke awal. Batas perilaku tiap tombol perlu dipertahankan.

Kunci: pilihan 1.

## Bagian 10, langkah 1

Kalau durasi hanya perlu diingat di browser yang sama, penyimpanan apa yang cukup?

Bandingkan cara kerja dan cakupan ketiga solusi dengan kebutuhan di kartu ini.

1. Tambahkan penyimpanan online sekarang agar pengaturan tetap ada setelah browser ditutup, lalu batasi aksesnya pada satu pengguna.

   Umpan balik: Penyimpanan lokal juga bisa bertahan setelah browser ditutup. Kebutuhan satu browser belum memberi alasan untuk menambah layanan dan pengaturan akses online.

2. Simpan pilihan durasi di browser yang sama, lalu pertimbangkan layanan online jika nanti perlu dipakai lintas perangkat.

   Umpan balik: Ini memenuhi kebutuhan saat ini tanpa menambah layanan yang belum diperlukan. Tetap jelaskan bahwa pengaturan bisa hilang jika data browser dihapus.

3. Simpan pilihan durasi pada status timer selama halaman terbuka, lalu tampilkan kembali nilainya setiap kali tombol Reset ditekan.

   Umpan balik: Status selama halaman terbuka belum memenuhi kebutuhan saat timer dibuka kembali. Perlu penyimpanan yang bertahan melampaui halaman yang sedang berjalan.

Kunci: pilihan 2.

## Bagian 10, langkah 2

Sekarang durasi harus sama di laptop dan ponsel. Apa yang perlu dipertimbangkan?

Kebutuhannya sudah berubah. Bandingkan tiga pendekatan berikut, lalu pilih yang sesuai dengan penggunaan di dua perangkat.

1. Gunakan penyimpanan browser pada kedua perangkat dan samakan nama kunci agar keduanya membaca pilihan durasi yang sama.

   Umpan balik: Nama kunci yang sama tidak menghubungkan penyimpanan dua perangkat. Masing-masing browser masih menyimpan nilainya sendiri.

2. Kirim durasi dalam tautan saat berpindah perangkat, lalu simpan secara lokal agar perubahan berikutnya tetap tersinkron otomatis.

   Umpan balik: Tautan bisa membawa satu nilai saat dibuka, tetapi tidak otomatis menyinkronkan perubahan berikutnya. Pengiriman nilai sekali berbeda dari sinkronisasi data.

3. Tentukan data dan cara mengenali pengguna atau perangkat, lalu gunakan penyimpanan online yang dapat diakses keduanya.

   Umpan balik: Kebutuhan baru mencakup hubungan antarperangkat. Rancangan perlu menjelaskan data, identitas, dan akses sebelum layanan ditambahkan.

Kunci: pilihan 3.

## Bagian 11, langkah 1

Timer bisa dibuka di laptopmu, tetapi link localhost tidak membuka timer yang sama di laptop teman. Mengapa?

Bandingkan ketiga penjelasan dengan kejadian pada laptop teman, lalu pilih yang paling tepat.

1. Teman perlu menjalankan server development pada port 5173 juga, supaya alamat yang sama mengambil timer dari laptopmu.

   Umpan balik: Port yang sama tidak menghubungkan dua komputer. Server yang dijalankan teman berada di perangkatnya; alamat localhost tetap menuju perangkat yang membukanya.

2. Alamat localhost menuju komputer yang membuka link. Timer perlu tersedia di alamat publik agar teman membuka aplikasi milikmu.

   Umpan balik: Link saat ini tidak menunjuk ke laptop pengembang dari perangkat teman. Publikasi memberi alamat yang dapat mengarah ke aplikasi yang sama.

3. Kirim link localhost lengkap beserta nama folder project, supaya browser teman bisa menemukan file timer tanpa memasang project.

   Umpan balik: Nama folder tidak memberikan akses ke file di komputer lain. Mengubah bentuk link lokal belum membuat aplikasi tersedia lewat internet.

Kunci: pilihan 2.

## Bagian 11, langkah 4

Build berhasil dan URL sudah muncul. Apakah itu berarti aplikasinya pasti bekerja?

Ketiga pilihan sama-sama memuat pemeriksaan. Pilih langkah yang cukup untuk menilai apakah versi yang diterbitkan bekerja.

1. Buka URL publik dari perangkat lain dan ulangi Mulai, Jeda, serta Reset untuk melihat perilaku versi yang diterbitkan.

   Umpan balik: Kamu memeriksa aplikasi yang benar-benar diakses pengguna. Hasil build dan uji lokal tetap berguna, tetapi lingkungan publik perlu dicoba.

2. Cocokkan log build dengan hasil uji lokal dan pastikan tidak ada error sebelum meminta teman mencoba versi berikutnya.

   Umpan balik: Log dan uji lokal belum memperlihatkan seluruh perilaku versi publik. Jangan menunda percobaan URL yang sudah diterbitkan.

3. Buka URL publik dan pastikan halaman serta semua tombol tampil, lalu gunakan hasil uji lokal untuk menilai fungsi timernya.

   Umpan balik: Halaman dan tombol yang terlihat belum membuktikan perilakunya. Ulangi fungsi utama pada URL publik, bukan hanya memeriksa tampilannya.

Kunci: pilihan 1.

## Pasangan kebutuhan dan alat

- Belum ada project. Kamu ingin membandingkan kebutuhan dua ide sebelum menentukan aplikasi yang akan dibuat.

  Kunci: AI chat. Pada tahap ini, kebutuhan utamanya berdiskusi dan membandingkan ide, belum menyiapkan atau mengubah aplikasi.

- Kamu ingin mencoba bentuk tampilan dari browser tanpa menyiapkan folder project dan terminal di laptop.

  Kunci: AI app builder. Untuk contoh ini, pilih bantuan yang menyiapkan lingkungan pembuatan prototype di browser.

- Project sudah ada di laptop. Kamu ingin memeriksa hubungan import antarfile tanpa memindahkannya ke layanan lain.

  Kunci: Coding agent. Kebutuhannya adalah akses langsung ke file project yang sudah ada, dengan izin yang kamu tentukan.

## Revisi konteks dan rencana

### Bagian 3: Interaksi — tentukan Allow, Ask, atau Deny untuk latihan ini

| Tindakan                                                           | Aturan latihan | Kenapa                                                                                                   |
| ------------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------- |
| Membaca import dan nama komponen pada dua file yang terkait error  | Allow          | Pembacaan terbatas pada file latihan yang relevan dan tidak berisi data rahasia.                         |
| Menjalankan script build project yang belum kamu lihat isinya      | Ask            | Nama build saja belum menjelaskan seluruh tindakan script; lihat isinya sebelum memberi izin.            |
| Menghapus salinan project sebelum perbaikan untuk merapikan folder | Deny           | Pada latihan ini, salinan sebelum perbaikan harus dipertahankan untuk meninjau dan memulihkan perubahan. |

### Bagian 5: Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”

| Kartu                                                                        | Untuk timer versi pertama | Alasan                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| Perintah menjalankan project dan lokasi komponen timer yang ada              | Perlu sekarang            | Agent perlu tahu tempat perubahan dan cara mencoba hasilnya.                             |
| Aturan penyimpanan riwayat sesi di server agar bisa dipakai lintas perangkat | Belum perlu               | Versi ini belum menyimpan riwayat atau membutuhkan sinkronisasi.                         |
| Perilaku Jeda, Reset, dan keadaan timer saat waktu mencapai nol              | Perlu sekarang            | Ini menentukan fungsi yang harus dibangun serta diperiksa.                               |
| Pilihan library animasi untuk membuat transisi angka lebih menarik           | Belum perlu               | Fungsi utama belum menuntut animasi atau dependency tambahan.                            |
| Ukuran layar yang perlu didukung dan cara pengguna menekan tombol            | Perlu sekarang            | Ini membantu memilih ukuran dan susunan kontrol yang nyaman.                             |
| Aturan agar semua fitur baru disiapkan sebagai plugin sejak awal             | Belum perlu               | Kemungkinan perluasan belum memberi alasan untuk menambah struktur pada timer kecil ini. |

### Bagian 6: Rencana A

1. Buat tampilan timer dengan tiga tombol.
2. Tambahkan hitung mundur dan simpan riwayat sesi ke server.
3. Hubungkan riwayat agar nanti bisa dipakai lintas perangkat.
4. Uji Mulai, Jeda, dan Reset setelah alur penyimpanan terhubung.

### Bagian 6: Rencana B

1. Buat tampilan timer dengan tiga tombol.
2. Tambahkan hitung mundur dan perilaku tombol secara bertahap.
3. Uji Mulai, Jeda, dan Reset pada setiap hasil yang bisa dijalankan.
4. Periksa tampilan layar kecil sebelum menambah kebutuhan baru.

### Bagian 8: Permintaan lanjutan

> Jelaskan alasan library timer dan layanan statistik diperlukan. Untuk versi pertama, kita hanya membutuhkan hitung mundur serta Mulai, Jeda, dan Reset. Tinjau cara memakai bagian project yang sudah ada tanpa mengirim riwayat sesi ke layanan lain.

### Bagian 8: Hasil simulasi

Agent mengeluarkan tambahan layanan statistik dan dependency yang belum diperlukan. Fungsi timer tetap memakai bagian project yang sudah ada. Daftar perubahan diperbarui.

## Review file

- `StudyTimer.jsx` — menambahkan status berjalan dan sisa waktu.
- `timer.css` — menyesuaikan ukuran tombol untuk layar kecil.
- `package.json` — memasang library timer dan perekam statistik sesi ke layanan online.
- `README.md` — menjelaskan cara menjalankan timer dan mencoba ketiga tombol.

Kunci: pertanyakan tambahan pada `package.json` yang belum diminta dalam brief.
