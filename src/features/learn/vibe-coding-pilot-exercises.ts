// Revised after the user's request for plausible distractors; narrative v2 stays intact.
export type RevisedChoice = {
  correct: number;
  options: { label: string; feedback: string }[];
};
export const revisedChoices: Record<string, RevisedChoice> = {
  "0:0": {
    correct: 2,
    options: [
      {
        label:
          "A. Periksa pesan error dan potongan kode yang saya kirim. Susun dugaan penyebab sebelum saya memilih file lain.",
        feedback:
          "Ini bisa membantu, tetapi konteksnya masih berasal dari bahan yang kamu pilih sendiri. Permintaan ini belum memakai akses agent untuk menelusuri project.",
      },
      {
        label:
          "B. Tulis contoh import yang sesuai untuk timer ini. Saya akan menyalinnya ke file yang menurutmu perlu diubah.",
        feedback:
          "Contoh kode bisa berguna, tetapi belum memastikan nama dan hubungan file yang benar-benar ada. Kamu masih harus mencocokkan perubahan dengan project.",
      },
      {
        label:
          "C. Telusuri import dan file yang tersedia di project ini. Jelaskan temuan dan rencananya sebelum mengubah kode.",
        feedback:
          "Permintaan ini memakai akses agent untuk memeriksa konteks langsung. Temuannya dapat dibandingkan dengan file project sebelum kamu mengizinkan perubahan.",
      },
    ],
  },
  "1:1": {
    correct: 1,
    options: [
      {
        label:
          "Mulai dengan model lebih kuat agar pemeriksaan project dilakukan lebih mendalam, lalu turunkan model setelah perubahan berhasil.",
        feedback:
          "Pemeriksaan tetap berguna, tetapi tugas satu label belum menunjukkan perlunya kemampuan tambahan itu. Dengan anggaran terbatas, mulai dari kebutuhan tugasnya.",
      },
      {
        label:
          "Mulai dengan model ringan, batasi perubahan pada label, lalu tinjau hasilnya sebelum memutuskan perlu kemampuan tambahan.",
        feedback:
          "Cakupan kecil memberi kesempatan mencoba model yang cukup untuk tugas ini. Jika ada kesulitan nyata, kamu bisa menambah kemampuan berdasarkan bukti.",
      },
      {
        label:
          "Mulai dengan model yang unggul di benchmark coding agar pilihan tidak bergantung pada perkiraan tingkat kesulitan tugas.",
        feedback:
          "Benchmark memberi petunjuk untuk jenis tugas tertentu. Memakainya sebagai penentu utama belum mempertimbangkan kebutuhan dan anggaran untuk perubahan kecil ini.",
      },
    ],
  },
  "2:1": {
    correct: 0,
    options: [
      {
        label:
          "Periksa diff dan isi perintah pemeriksaan, lalu beri izin hanya untuk tindakan yang sesuai dengan perbaikan import.",
        feedback:
          "Kamu memeriksa perubahan sekaligus tindakan yang akan dijalankan. Izin tetap dibatasi pada tugas yang sedang ditinjau.",
      },
      {
        label:
          "Izinkan perintah pemeriksaan lebih dulu, lalu baca diff jika hasil pemeriksaannya masih menunjukkan error pada project.",
        feedback:
          "Hasil pemeriksaan dapat membantu, tetapi tindakan sudah berjalan sebelum kamu memahami perintah dan dampaknya. Build juga tidak menilai semua perubahan yang dibuat.",
      },
      {
        label:
          "Cocokkan nama file dengan rencana, lalu beri izin untuk perintah berikutnya selama dijalankan dari folder project ini.",
        feedback:
          "Nama file dan lokasi folder saja belum menjelaskan isi perubahan atau dampak perintah. Tindakan dalam folder project tetap perlu dibatasi dan ditinjau.",
      },
    ],
  },
  "5:0": {
    correct: 1,
    options: [
      {
        label: "A",
        feedback:
          "Rencananya tetap berpusat pada timer, tetapi menambahkan penyimpanan lintas perangkat sebelum kebutuhan itu muncul. Ini memperluas versi pertama.",
      },
      {
        label: "B",
        feedback:
          "Rencana ini membangun fungsi yang diminta, mengujinya, dan menjaga data tetap lokal. Tambahan dapat diputuskan setelah ada kebutuhan baru.",
      },
    ],
  },
  "6:0": {
    correct: 2,
    options: [
      {
        label:
          "Rapikan tampilan dan petunjuk penggunaan, lalu coba ketiga tombol saat versi pertama sudah siap untuk dibagikan.",
        feedback:
          "Tampilan dan petunjuk berguna, tetapi belum ada fungsi tombol untuk dicoba. Menundanya sampai akhir membuat masalah fungsi lebih lambat terlihat.",
      },
      {
        label:
          "Minta agent menuntaskan ketiga fungsi sekaligus dan memastikan perilakunya benar lewat review kode sebelum kita mencoba.",
        feedback:
          "Review kode membantu, tetapi belum menggantikan percobaan perilaku timer. Kita perlu melihat hasil yang berjalan selama fungsi dibangun.",
      },
      {
        label:
          "Tambahkan hitung mundur dan perilaku Mulai dulu, coba hasilnya, lalu lanjutkan ke Jeda dan Reset dengan uji masing-masing.",
        feedback:
          "Kamu melanjutkan dari tampilan ke fungsi dengan hasil kecil yang bisa dicoba. Kesalahan lebih mudah dikaitkan dengan perubahan terakhir.",
      },
    ],
  },
  "8:1": {
    correct: 0,
    options: [
      {
        label:
          "Setelah Mulai berjalan beberapa detik, Jeda mengembalikan waktu ke 25:00. Seharusnya sisa waktu tetap ada dan hitungan berhenti. Cari penyebabnya; pertahankan perilaku Reset.",
        feedback:
          "Laporan memberi kondisi pemicu, hasil aktual, harapan, dan batas perubahan. Agent punya dasar untuk menelusuri bug tanpa mengubah fungsi yang berbeda.",
      },
      {
        label:
          "Jeda tampaknya memakai fungsi Reset karena waktu kembali ke 25:00. Ganti pemanggilan itu dengan penghentian timer, lalu pastikan kedua tombol memakai fungsi terpisah.",
        feedback:
          "Dugaannya mungkin benar, tetapi laporan langsung menetapkan penyebab dan implementasi sebelum diperiksa. Mintalah penelusuran berdasarkan perilaku yang bisa diulang.",
      },
      {
        label:
          "Waktu kembali ke 25:00 saat Jeda ditekan. Buat Jeda menghentikan hitungan dan samakan perilaku tombol lain agar pengelolaan status timer lebih konsisten.",
        feedback:
          "Masalah Jeda disebutkan, tetapi menyamakan tombol lain bisa mengubah Reset yang justru perlu kembali ke awal. Batas perilaku tiap tombol perlu dipertahankan.",
      },
    ],
  },
  "9:0": {
    correct: 1,
    options: [
      {
        label:
          "Tambahkan penyimpanan online sekarang agar pengaturan tetap ada setelah browser ditutup, lalu batasi aksesnya pada satu pengguna.",
        feedback:
          "Penyimpanan lokal juga bisa bertahan setelah browser ditutup. Kebutuhan satu browser belum memberi alasan untuk menambah layanan dan pengaturan akses online.",
      },
      {
        label:
          "Simpan pilihan durasi di browser yang sama, lalu pertimbangkan layanan online jika nanti perlu dipakai lintas perangkat.",
        feedback:
          "Ini memenuhi kebutuhan saat ini tanpa menambah layanan yang belum diperlukan. Tetap jelaskan bahwa pengaturan bisa hilang jika data browser dihapus.",
      },
      {
        label:
          "Simpan pilihan durasi pada status timer selama halaman terbuka, lalu tampilkan kembali nilainya setiap kali tombol Reset ditekan.",
        feedback:
          "Status selama halaman terbuka belum memenuhi kebutuhan saat timer dibuka kembali. Perlu penyimpanan yang bertahan melampaui halaman yang sedang berjalan.",
      },
    ],
  },
  "9:1": {
    correct: 2,
    options: [
      {
        label:
          "Gunakan penyimpanan browser pada kedua perangkat dan samakan nama kunci agar keduanya membaca pilihan durasi yang sama.",
        feedback:
          "Nama kunci yang sama tidak menghubungkan penyimpanan dua perangkat. Masing-masing browser masih menyimpan nilainya sendiri.",
      },
      {
        label:
          "Kirim durasi dalam tautan saat berpindah perangkat, lalu simpan secara lokal agar perubahan berikutnya tetap tersinkron otomatis.",
        feedback:
          "Tautan bisa membawa satu nilai saat dibuka, tetapi tidak otomatis menyinkronkan perubahan berikutnya. Pengiriman nilai sekali berbeda dari sinkronisasi data.",
      },
      {
        label:
          "Tentukan data dan cara mengenali pengguna atau perangkat, lalu gunakan penyimpanan online yang dapat diakses keduanya.",
        feedback:
          "Kebutuhan baru mencakup hubungan antarperangkat. Rancangan perlu menjelaskan data, identitas, dan akses sebelum layanan ditambahkan.",
      },
    ],
  },
  "10:0": {
    correct: 1,
    options: [
      {
        label:
          "Teman perlu menjalankan server development pada port 5173 juga, supaya alamat yang sama mengambil timer dari laptopmu.",
        feedback:
          "Port yang sama tidak menghubungkan dua komputer. Server yang dijalankan teman berada di perangkatnya; alamat localhost tetap menuju perangkat yang membukanya.",
      },
      {
        label:
          "Alamat localhost menuju komputer yang membuka link. Timer perlu tersedia di alamat publik agar teman membuka aplikasi milikmu.",
        feedback:
          "Link saat ini tidak menunjuk ke laptop pengembang dari perangkat teman. Publikasi memberi alamat yang dapat mengarah ke aplikasi yang sama.",
      },
      {
        label:
          "Kirim link localhost lengkap beserta nama folder project, supaya browser teman bisa menemukan file timer tanpa memasang project.",
        feedback:
          "Nama folder tidak memberikan akses ke file di komputer lain. Mengubah bentuk link lokal belum membuat aplikasi tersedia lewat internet.",
      },
    ],
  },
  "10:3": {
    correct: 0,
    options: [
      {
        label:
          "Buka URL publik dari perangkat lain dan ulangi Mulai, Jeda, serta Reset untuk melihat perilaku versi yang diterbitkan.",
        feedback:
          "Kamu memeriksa aplikasi yang benar-benar diakses pengguna. Hasil build dan uji lokal tetap berguna, tetapi lingkungan publik perlu dicoba.",
      },
      {
        label:
          "Cocokkan log build dengan hasil uji lokal dan pastikan tidak ada error sebelum meminta teman mencoba versi berikutnya.",
        feedback:
          "Log dan uji lokal belum memperlihatkan seluruh perilaku versi publik. Jangan menunda percobaan URL yang sudah diterbitkan.",
      },
      {
        label:
          "Buka URL publik dan pastikan halaman serta semua tombol tampil, lalu gunakan hasil uji lokal untuk menilai fungsi timernya.",
        feedback:
          "Halaman dan tombol yang terlihat belum membuktikan perilakunya. Ulangi fungsi utama pada URL publik, bukan hanya memeriksa tampilannya.",
      },
    ],
  },
};

export const revisedFields: Record<number, Record<string, string>> = {
  2: {
    "Interaksi — tentukan Allow, Ask, atau Deny untuk latihan ini": `| Tindakan | Aturan latihan | Kenapa |
| --- | --- | --- |
| Membaca import dan nama komponen pada dua file yang terkait error | Allow | Pembacaan terbatas pada file latihan yang relevan dan tidak berisi data rahasia. |
| Menjalankan script build project yang belum kamu lihat isinya | Ask | Nama build saja belum menjelaskan seluruh tindakan script; lihat isinya sebelum memberi izin. |
| Menghapus salinan project sebelum perbaikan untuk merapikan folder | Deny | Pada latihan ini, salinan sebelum perbaikan harus dipertahankan untuk meninjau dan memulihkan perubahan. |`,
  },
  4: {
    "Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”": `| Kartu | Untuk timer versi pertama | Alasan |
| --- | --- | --- |
| Perintah menjalankan project dan lokasi komponen timer yang ada | Perlu sekarang | Agent perlu tahu tempat perubahan dan cara mencoba hasilnya. |
| Aturan penyimpanan riwayat sesi di server agar bisa dipakai lintas perangkat | Belum perlu | Versi ini belum menyimpan riwayat atau membutuhkan sinkronisasi. |
| Perilaku Jeda, Reset, dan keadaan timer saat waktu mencapai nol | Perlu sekarang | Ini menentukan fungsi yang harus dibangun serta diperiksa. |
| Pilihan library animasi untuk membuat transisi angka lebih menarik | Belum perlu | Fungsi utama belum menuntut animasi atau dependency tambahan. |
| Ukuran layar yang perlu didukung dan cara pengguna menekan tombol | Perlu sekarang | Ini membantu memilih ukuran dan susunan kontrol yang nyaman. |
| Aturan agar semua fitur baru disiapkan sebagai plugin sejak awal | Belum perlu | Kemungkinan perluasan belum memberi alasan untuk menambah struktur pada timer kecil ini. |`,
  },
  5: {
    "Rencana A":
      "1. Buat tampilan timer dengan tiga tombol.\n2. Tambahkan hitung mundur dan simpan riwayat sesi ke server.\n3. Hubungkan riwayat agar nanti bisa dipakai lintas perangkat.\n4. Uji Mulai, Jeda, dan Reset setelah alur penyimpanan terhubung.",
    "Rencana B":
      "1. Buat tampilan timer dengan tiga tombol.\n2. Tambahkan hitung mundur dan perilaku tombol secara bertahap.\n3. Uji Mulai, Jeda, dan Reset pada setiap hasil yang bisa dijalankan.\n4. Periksa tampilan layar kecil sebelum menambah kebutuhan baru.",
  },
  7: {
    "Permintaan lanjutan":
      "> Jelaskan alasan library timer dan layanan statistik diperlukan. Untuk versi pertama, kita hanya membutuhkan hitung mundur serta Mulai, Jeda, dan Reset. Tinjau cara memakai bagian project yang sudah ada tanpa mengirim riwayat sesi ke layanan lain.",
    "Hasil simulasi":
      "Agent mengeluarkan tambahan layanan statistik dan dependency yang belum diperlukan. Fungsi timer tetap memakai bagian project yang sudah ada. Daftar perubahan diperbarui.",
  },
};
export const revisedFiles = [
  "`StudyTimer.jsx` — menambahkan status berjalan dan sisa waktu.",
  "`timer.css` — menyesuaikan ukuran tombol untuk layar kecil.",
  "`package.json` — memasang library timer dan perekam statistik sesi ke layanan online.",
  "`README.md` — menjelaskan cara menjalankan timer dan mencoba ketiga tombol.",
];

export const revisedToolRows = [
  [
    "Belum ada project. Kamu ingin membandingkan kebutuhan dua ide sebelum menentukan aplikasi yang akan dibuat.",
    "AI chat",
    "Pada tahap ini, kebutuhan utamanya berdiskusi dan membandingkan ide, belum menyiapkan atau mengubah aplikasi.",
  ],
  [
    "Kamu ingin mencoba bentuk tampilan dari browser tanpa menyiapkan folder project dan terminal di laptop.",
    "AI app builder",
    "Untuk contoh ini, pilih bantuan yang menyiapkan lingkungan pembuatan prototype di browser.",
  ],
  [
    "Project sudah ada di laptop. Kamu ingin memeriksa hubungan import antarfile tanpa memindahkannya ke layanan lain.",
    "Coding agent",
    "Kebutuhannya adalah akses langsung ke file project yang sudah ada, dengan izin yang kamu tentukan.",
  ],
];
