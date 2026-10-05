export type FundamentalsTask = {
  kind:
    | "choice"
    | "multi"
    | "explore"
    | "order"
    | "estimate"
    | "reflection"
    | "read";
  question: string;
  options?: string[];
  feedback?: string[];
  correct?: number[];
  explanation?: string;
  min?: number;
  max?: number;
  checkLabel?: string;
  visual?:
    | "animals"
    | "alarm"
    | "model"
    | "map"
    | "receipt"
    | "poster"
    | "chart"
    | "document"
    | "schedule"
    | "proposal";
  context?: string[];
};
const choice = (
  question: string,
  options: string[],
  correct: number | number[],
  explanation: string,
  feedback?: string[],
): FundamentalsTask => ({
  kind: "choice",
  question,
  options,
  correct: Array.isArray(correct) ? correct : [correct],
  explanation,
  feedback,
});
const multi = (
  question: string,
  options: string[],
  correct: number[],
  feedback: string[],
  min = 1,
  max?: number,
  checkLabel = "Lihat pembahasannya",
): FundamentalsTask => ({
  kind: "multi",
  question,
  options,
  correct,
  feedback,
  min,
  max,
  checkLabel,
});
const explore = (
  question: string,
  options: string[],
  feedback: string[],
  min = options.length,
): FundamentalsTask => ({ kind: "explore", question, options, feedback, min });
const order = (
  question: string,
  options: string[],
  explanation: string,
  checkLabel: string,
): FundamentalsTask => ({
  kind: "order",
  question,
  options,
  explanation,
  checkLabel,
});
const labelTasks = [
  "Mengelompokkan",
  "Merekomendasikan",
  "Menghasilkan konten",
];
const termOptions = ["Machine learning", "Deep learning", "Generatif"];
const thinkingActions = [
  "Membuat draf sendiri",
  "Meminta kritik",
  "Memeriksa kritik",
  "Mencocokkan sumber",
  "Memutuskan revisi",
  "Menyalin jawaban jadi",
];

export const fundamentalsTasks: Record<string, FundamentalsTask[]> = {
  "1.1": [
    choice(
      "Email dipisahkan menjadi spam dan bukan spam. Apa yang dikerjakan sistem?",
      labelTasks,
      0,
      "Pesan diberi kategori agar email yang mencurigakan bisa dipisahkan.",
    ),
    choice(
      "Aplikasi memilih lagu yang mungkin kamu suka. Apa yang dikerjakan sistem?",
      labelTasks,
      1,
      "Aplikasi memilih lagu dari koleksi yang tersedia berdasarkan perkiraan seleramu.",
    ),
    choice(
      "Chatbot menulis caption baru. Apa yang dikerjakan sistem?",
      labelTasks,
      2,
      "Chatbot menyusun teks dari permintaan yang kamu berikan.",
    ),
  ],
  "1.2": [
    choice(
      "Model tersebut berhasil pada sebagian besar soal IMO yang diuji.",
      ["Sudah didukung", "Perlu bukti lain"],
      0,
      "Lima dari enam soal berhasil diselesaikan dalam pengujian itu.",
    ),
    choice(
      "Model tersebut selalu benar untuk semua soal matematika.",
      ["Sudah didukung", "Perlu bukti lain"],
      1,
      "Hasil pada enam soal belum memberi jawaban untuk semua soal matematika.",
    ),
    choice(
      "AlphaFold2 membantu mempelajari struktur protein.",
      ["Sudah didukung", "Perlu bukti lain"],
      0,
      "Prediksi struktur protein memang menjadi kemampuan yang ditunjukkan pada contoh ini.",
    ),
    choice(
      "AlphaFold2 langsung menyembuhkan penyakit.",
      ["Sudah didukung", "Perlu bukti lain"],
      1,
      "Mengetahui bentuk protein dapat membantu riset, tetapi pengobatan masih perlu dikembangkan dan diuji.",
    ),
  ],
  "1.3": [
    {
      kind: "estimate",
      question:
        "Kira-kira, berapa kenaikan tingkat panggilan untuk pemeriksaan lanjutan?",
      explanation:
        "Tingkat panggilan untuk pemeriksaan lanjutan naik 14,8% secara relatif. Orang yang dipanggil kembali belum tentu didiagnosis kanker; mereka perlu diperiksa lebih lanjut. Jadi, strategi ini membantu deteksi dan mengurangi beban pembacaan, tetapi juga menambah pemeriksaan lanjutan. Kalau hanya melihat satu angka, ada bagian hasil yang terlewat.",
      checkLabel: "Lihat hasil studi",
    },
    multi(
      "Dari tiga hasil tadi, pilih dua yang ingin kamu lihat lebih dekat.",
      [
        "Beban pembacaan −63,6%",
        "Deteksi +15,2%",
        "Pemeriksaan lanjutan +14,8%",
      ],
      [],
      [
        "Beban pembacaan mengukur jumlah pemeriksaan yang perlu dibaca radiolog. Dalam strategi yang diuji, lebih sedikit pemeriksaan perlu dibaca manusia.",
        "Tingkat deteksi mengukur kanker yang ditemukan dalam pemeriksaan. Hasilnya perlu dilihat bersama jumlah pemeriksaan lanjutan.",
        "Tingkat panggilan mengukur peserta yang diminta kembali untuk pemeriksaan lanjutan, bukan jumlah diagnosis kanker.",
      ],
      2,
      2,
    ),
  ],
  "1.4": [
    multi(
      "Kamu ingin memahami pesan error di laptop. Pilih bahan yang membantu; boleh lebih dari satu.",
      ["Teks error", "Tangkapan layar", "Foto bagian belakang laptop"],
      [0, 1],
      [
        "Teks memperlihatkan pesan errornya.",
        "Tangkapan layar memperlihatkan pesan error beserta bagian layar di sekitarnya.",
        "Foto bagian belakang laptop mungkin membantu untuk masalah perangkat tertentu, tetapi belum menjelaskan pesan yang sedang dibahas.",
      ],
    ),
    multi(
      "Kamu ingin menuliskan ucapan dalam rapat. Pilih bahan yang membantu; boleh lebih dari satu.",
      ["Rekaman suara", "Foto ruang rapat", "Agenda tertulis"],
      [0, 2],
      [
        "Rekaman memuat percakapannya dan menjadi bahan utama untuk menuliskan ucapan.",
        "Foto ruangan tidak memberi isi percakapan.",
        "Agenda memberi gambaran topik, tetapi tidak memuat semua yang diucapkan.",
      ],
    ),
  ],
  "1.5": [
    order(
      "Susun empat langkah berikut menjadi gambaran alur pengujian.",
      [
        "Amati kondisi dengan sensor",
        "Perkirakan akibat tindakan",
        "Uji gerakan di simulasi",
        "Awasi keamanan di dunia nyata",
      ],
      "Sensor membantu robot membaca kondisi. Perkiraan akibat tindakan memberi gambaran tentang apa yang mungkin terjadi, lalu simulasi menyediakan tempat untuk mencoba. Saat beralih ke pengujian nyata, manusia tetap memeriksa gerakan dan keamanannya. Alur ini adalah gambaran sederhana; setiap proyek robot bisa punya urutan pengujian yang berbeda.",
      "Lihat pembahasannya",
    ),
  ],
  "1.6": [
    explore(
      "Bandingkan dua riwayat ini.",
      ["Riwayat A · saran", "Riwayat B · tindakan"],
      [
        "Coba buka file konfigurasi, perbaiki bagian itu, lalu jalankan tes.",
        "File konfigurasi dibuka → perubahan ditampilkan → tes dijalankan → hasil tes tercatat.",
      ],
    ),
    choice(
      "Mana yang menunjukkan bahwa pekerjaan sudah dilakukan?",
      ["A saja", "B saja", "Keduanya"],
      1,
      "Riwayat B memuat tindakan dan hasil yang bisa kamu periksa, seperti perubahan file dan keluaran tes.",
      [
        "Riwayat A berisi saran. Kita belum melihat apakah langkahnya benar-benar dikerjakan.",
        "Riwayat B memuat tindakan dan hasil yang bisa kamu periksa, seperti perubahan file dan keluaran tes.",
        "Keduanya bisa membantu, tetapi A baru memberi saran. Pada contoh ini, catatan pekerjaan ada di B.",
      ],
    ),
    {
      kind: "read",
      question: "Apa yang perlu dicek?",
      context: [
        "Perubahan file: apakah yang diubah sesuai tugas?",
        "Hasil tes: tes apa yang dijalankan, dan bagaimana hasilnya?",
        "Izin: apakah tindakannya sesuai akses dan izin yang diberikan?",
      ],
      checkLabel: "Apa yang perlu dicek?",
    },
  ],
  "1.7": [
    {
      ...explore(
        "Buka bukti yang ingin kamu periksa, lalu tentukan apakah pembayaran sudah bisa dipastikan.",
        [
          "Tangkapan layar",
          "Nomor referensi dari pembeli",
          "Riwayat rekening penerima",
        ],
        [
          "Gambar ini menunjukkan klaim pembeli, tetapi belum memastikan uang masuk ke rekeningmu.",
          "Nomor ini bisa membantu penelusuran. Namun, informasinya masih berasal dari pembeli dan perlu dicocokkan.",
          "Catatan di pihak penerima membantu memastikan uang masuk. Cocokkan detailnya dengan pembayaran yang sedang kamu tunggu.",
        ],
        1,
      ),
      visual: "receipt",
    },
    choice(
      "Sekarang, apakah kamu sudah bisa menyerahkan tiket?",
      [
        "Bisa setelah transaksi masuk dan detailnya cocok",
        "Bisa dari gambar saja",
        "Tunda jika transaksi belum terlihat",
      ],
      [0, 2],
      "Bisa setelah transaksi masuk dan detailnya cocok. Jika belum terlihat, tunda penyerahan dan periksa lewat layanan terkait.",
      [
        "Pastikan kamu sudah membuka riwayat penerima dan mencocokkan pengirim, nominal, waktu, serta statusnya.",
        "Gambar saja belum memastikan pembayaran diterima. Periksa transaksi di pihak penerima.",
        "Jika transaksi belum terlihat, menunda penyerahan dan memeriksa lewat layanan terkait adalah langkah yang sesuai.",
      ],
    ),
  ],
  "1.8": [
    {
      ...explore(
        "Buka sudut pandang berikut. Apa yang perlu dipikirkan sebelum poster ini dibagikan?",
        ["Orang dalam foto", "Penerima poster", "Pembuat poster"],
        [
          "Apakah fotonya dipakai dengan izin?",
          "Apakah jelas siapa yang membuat pengumuman ini?",
          "Apakah orang lain bisa mengira poster ini resmi?",
        ],
      ),
      visual: "poster",
    },
    multi(
      "Pilih tindakanmu. Boleh menambahkan tindakan kedua.",
      [
        "Bagikan",
        "Periksa pengumuman asli dulu",
        "Tanya izin dan tujuan pemakaian foto",
      ],
      [1, 2],
      [
        "Kita belum tahu apakah pengumumannya benar atau fotonya dipakai dengan izin. Membagikannya bisa membuat lebih banyak orang salah paham.",
        "Ini membantu memastikan isi pengumuman. Setelah itu, lihat juga apakah penggunaan fotonya sudah mendapat izin.",
        "Ini membantu memastikan penggunaan identitas orang tersebut. Isi pengumumannya tetap perlu diperiksa.",
      ],
      1,
      2,
    ),
  ],
  "1.9": [
    {
      ...multi(
        "Tolong ringkas tiga hambatan dalam pelaksanaan acara ini. Pilih bagian yang membantu membuat ringkasan.",
        [
          "Hambatan",
          "Langkah perbaikan",
          "Nama peserta",
          "Nomor identitas",
          "Kontak pribadi",
        ],
        [0, 1],
        [
          "Bagian ini memuat masalah yang perlu diringkas.",
          "Bagian ini memberi penjelasan tentang tindak lanjutnya.",
          "Rincian ini belum dibutuhkan untuk merangkum hambatan acara.",
          "Rincian ini belum dibutuhkan untuk merangkum hambatan acara.",
          "Rincian ini belum dibutuhkan untuk merangkum hambatan acara.",
        ],
        1,
        undefined,
        "Lihat bahan yang akan dikirim",
      ),
      visual: "document",
    },
    {
      kind: "read",
      question: "Sebelum mengirim bahan, periksa empat hal ini.",
      context: [
        "Apakah bahan ini diperlukan untuk tugasnya?",
        "Apakah saya boleh membagikannya?",
        "Layanan apa yang akan menerimanya?",
        "Apakah saya sudah memahami penyimpanan dan penggunaan datanya?",
      ],
      checkLabel: "Buka pemeriksaan sebelum mengirim",
    },
  ],
  "1.10": [
    multi(
      "Baca jawaban berikut. Tandai dua kalimat yang belum didukung panduan.",
      [
        "Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas.",
        "Sebanyak 87% dosen menyetujui aturan ini.",
        "Mahasiswa tetap bertanggung jawab atas isi tugasnya.",
        "Aturan yang sama berlaku di semua kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).",
      ],
      [1, 3],
      [
        "Permintaan ini memang ada di panduan latihan.",
        "Panduan tidak memuat survei atau angka 87%. Kita belum punya sumber untuk angka ini.",
        "Tanggung jawab mahasiswa juga disebutkan di panduan.",
        "Panduan latihan tidak membahas semua kampus atau aturan sejak 2019. Sitasi yang dicantumkan juga belum menyediakan dokumen yang bisa diperiksa.",
      ],
      2,
      2,
      "Cocokkan dengan panduan",
    ),
  ],
  "1.11": [
    choice(
      "Aplikasi memperbaiki foto secara otomatis. Hasilnya berbeda pada setiap foto. Informasi mana yang paling membantu memahami cara kerja fitur ini?",
      [
        "Nama fitur",
        "Penjelasan aturan atau model yang dipakai",
        "Warna tombol",
      ],
      1,
      "Nama fitur dan warna tombol belum menjelaskan proses di dalamnya. Aturan yang sama pun bisa memberi hasil berbeda untuk foto berbeda. Penjelasan tentang aturan atau modelnya akan lebih membantu.",
    ),
  ],
  "1.check": [
    choice(
      "Sebelum menyerahkan tiket, apa yang kamu periksa?",
      [
        "Cocokkan nomor referensi dari pembeli dengan gambar.",
        "Periksa nama, nominal, dan waktu pada gambar.",
        "Buka riwayat rekening penerima dan cocokkan transaksi yang masuk.",
      ],
      2,
      "Riwayat penerima membantu memastikan uang masuk. Cocokkan pengirim, nominal, waktu, dan statusnya dengan pembayaran tiket.",
      [
        "Detailnya terlihat cocok, tetapi informasinya masih berasal dari pembeli. Kamu perlu memastikan transaksi masuk di pihak penerima.",
        "Detailnya terlihat cocok, tetapi informasinya masih berasal dari pembeli. Kamu perlu memastikan transaksi masuk di pihak penerima.",
        "Riwayat penerima membantu memastikan uang masuk. Cocokkan pengirim, nominal, waktu, dan statusnya dengan pembayaran tiket.",
      ],
    ),
  ],
  "2.1": [
    {
      ...explore(
        "Coba dua jarak berbeda. Perhatikan kapan alarm menyala.",
        ["20 cm", "30 cm", "50 cm"],
        [
          "Alarm menyala karena jaraknya kurang dari 30 cm.",
          "Alarm tidak menyala. Batasnya adalah kurang dari 30 cm, jadi tepat 30 cm belum memenuhi aturan.",
          "Alarm tidak menyala karena jaraknya masih di atas batas.",
        ],
        2,
      ),
      visual: "alarm",
    },
    choice(
      "Apa yang menentukan hasil pada contoh ini?",
      [
        "Aturan yang ditulis",
        "Pelatihan dari kumpulan foto",
        "Nama fitur alarm",
      ],
      0,
      "Aturan yang ditulis menentukan kapan alarm menyala. Dari bunyinya saja, kita belum bisa tahu apakah suatu sistem memakai model yang dilatih.",
    ),
  ],
  "2.2": [
    {
      ...choice(
        "Kumpulan mana yang memuat variasi lebih dekat dengan foto baru ini?",
        [
          "A · foto terang, semuanya dari depan",
          "B · cahaya, sudut, dan latar beragam",
        ],
        1,
        "Kumpulan B memuat variasi yang lebih dekat dengan foto uji. Contoh yang beragam dapat membantu model menghadapi kondisi berbeda. Namun, kita tetap perlu mengujinya pada foto terpisah untuk melihat seberapa baik hasilnya.",
      ),
      visual: "animals",
    },
  ],
  "2.3": [
    order(
      "Susun kartu dari awal pelatihan sampai model dipakai untuk foto baru.",
      [
        "Data berlabel",
        "Training",
        "Model hasil pelatihan",
        "Prediksi foto baru",
      ],
      "Pelatihan: data dipakai untuk menyesuaikan model. Pemakaian: foto baru diproses oleh model yang sudah dilatih untuk menghasilkan prediksi.",
      "Lihat alurnya",
    ),
    choice(
      "Foto baru masuk untuk dikenali. Apakah ini pasti pelatihan baru?",
      [
        "Ya, setiap input melatih ulang model",
        "Tidak, bisa memakai model yang sudah dilatih",
      ],
      1,
      "Tidak. Itu bisa menjadi pemakaian model yang sudah tersedia. Apakah input disimpan dan digunakan untuk pelatihan di kemudian hari bergantung pada rancangan sistem serta kebijakan layanan.",
    ),
  ],
  "2.4": [
    choice(
      "Email latihan sudah ditandai spam atau bukan spam. Apa yang membantu model belajar?",
      ["Label jawaban", "Struktur dan kemiripan data", "Hasil tindakan"],
      0,
      "Model mendapat contoh beserta kategorinya. Pendekatan ini disebut supervised learning.",
    ),
    choice(
      "Data belanja dikelompokkan berdasarkan kemiripan. Apa yang membantu model belajar?",
      ["Label jawaban", "Struktur dan kemiripan data", "Hasil tindakan"],
      1,
      "Sistem mencari pola pengelompokan tanpa diberi kategori jawaban untuk setiap contoh. Ini contoh unsupervised learning.",
    ),
    choice(
      "Robot mencoba gerakan dan mendapat umpan balik sesuai tujuan. Apa yang membantu model belajar?",
      ["Label jawaban", "Struktur dan kemiripan data", "Hasil tindakan"],
      2,
      "Umpan balik membantu model mempelajari tindakan yang mendukung tujuan. Ini contoh reinforcement learning.",
    ),
  ],
  "2.5": [
    {
      ...explore(
        "Buka tiga bagian diagram untuk melihat contoh perjalanan data.",
        ["Input", "Lapisan model", "Output"],
        [
          "Informasi masuk ke model, misalnya sebuah foto.",
          "Perhitungan di dalam model memproses hubungan dan pola pada input.",
          "Model memberikan hasil, misalnya prediksi kategori foto.",
        ],
      ),
      visual: "model",
    },
    choice(
      "Kalimat mana yang sesuai dengan gambaran tadi?",
      [
        "Model mempelajari hubungan melalui lapisan perhitungan.",
        "Banyak lapisan membuat model memiliki pengalaman seperti manusia.",
      ],
      0,
      "Kalimat pertama sesuai dengan gambaran tadi. Banyak lapisan menjelaskan susunan model, tetapi belum membuktikan adanya pengalaman seperti manusia.",
    ),
  ],
  "2.6": [
    choice(
      "Menandai email sebagai spam.",
      [
        "Memberi kategori",
        "Memilih rekomendasi",
        "Memperkirakan nilai",
        "Membuat konten",
      ],
      0,
      "Sistem menentukan kategori pesan.",
    ),
    choice(
      "Menyarankan lagu untuk didengarkan.",
      [
        "Memberi kategori",
        "Memilih rekomendasi",
        "Memperkirakan nilai",
        "Membuat konten",
      ],
      1,
      "Sistem memilih lagu dari yang tersedia.",
    ),
    choice(
      "Memperkirakan tingkat risiko.",
      [
        "Memberi kategori",
        "Memilih rekomendasi",
        "Memperkirakan nilai",
        "Membuat konten",
      ],
      2,
      "Sistem memberikan perkiraan dari informasi yang diterima.",
    ),
    choice(
      "Menulis draf balasan pesan.",
      [
        "Memberi kategori",
        "Memilih rekomendasi",
        "Memperkirakan nilai",
        "Membuat konten",
      ],
      3,
      "Sistem menyusun teks yang bisa kamu tinjau dan revisi.",
    ),
    {
      ...multi(
        "Aplikasi mengenali objek dalam foto, lalu menulis penjelasannya. Dua tugas apa yang dipakai?",
        ["Pengenalan", "Pembuatan konten", "Pemindahan pembayaran"],
        [0, 1],
        [
          "Sistem mengenali objek dalam foto.",
          "Sistem menghasilkan penjelasan berdasarkan objek yang dikenali.",
          "Contoh ini tidak melakukan transaksi.",
        ],
        2,
        2,
      ),
      explanation:
        "Satu aplikasi bisa menggabungkan beberapa tugas. Di sini, sistem mengenali objek lalu menghasilkan penjelasan.",
    },
  ],
  "2.7": [
    {
      kind: "read",
      question:
        "Acara dimulai … pukul 10.00, atau besok pagi? Apa yang kamu perlukan untuk memastikan waktunya?",
      context: [
        "Keduanya bisa terdengar wajar. Namun, kita perlu jadwal acara untuk tahu mana yang sesuai.",
      ],
      visual: "schedule",
      checkLabel: "Buka jadwal",
    },
    choice(
      "Pilih kalimat yang didukung jadwal tersebut.",
      ["Acara dimulai pukul 10.00", "Acara dimulai besok pagi"],
      0,
      "Jadwal menyebut pukul 10.00, jadi waktu itu punya dasar. Untuk mengatakan ‘besok’, kita juga perlu tahu hari saat kalimatnya dipakai. Lanjutan yang terdengar lancar belum tentu sesuai fakta. Kelancaran bahasa pun belum menunjukkan bahwa model punya pengalaman atau niat seperti manusia.",
      undefined,
    ),
  ],
  "2.8": [
    choice(
      "‘Saya sudah memeriksa artikel.’ Pilih bukti yang sesuai.",
      [
        "Artikel terbuka dan bagian yang mendukung klaim",
        "Judul atau tautan saja",
        "Kalimat ‘sudah saya periksa’",
      ],
      0,
      "Judul atau tautan saja belum menunjukkan bahwa isi artikel sudah diperiksa.",
    ),
    choice(
      "‘Kode sudah lolos tes.’ Pilih bukti yang sesuai.",
      [
        "Pernyataan ‘sudah aman’",
        "Catatan tes yang dijalankan pada kode tersebut",
        "Nama bahasa pemrograman",
      ],
      1,
      "Pernyataan ‘sudah aman’ belum memberi hasil tes yang bisa dilihat. Tes yang lolos memberi informasi tentang hal yang diuji. Bug pada bagian yang belum diuji masih bisa terlewat.",
    ),
    choice(
      "‘File sudah diperbaiki.’ Pilih bukti yang sesuai.",
      [
        "Penjelasan cara memperbaiki",
        "Nama file",
        "Perubahan pada file yang dimaksud",
      ],
      2,
      "Penjelasan cara memperbaiki belum menunjukkan bahwa filenya sudah diubah.",
    ),
  ],
  "2.9": [
    choice(
      "Salah satu pendekatan dalam AI yang menyesuaikan model dari data adalah …",
      termOptions,
      0,
      "Machine learning: model belajar dari foto latihan untuk mengenali foto baru.",
    ),
    choice(
      "Jenis machine learning yang memakai jaringan saraf berlapis adalah …",
      termOptions,
      1,
      "Deep learning: model memakai jaringan saraf dengan banyak lapisan.",
    ),
    choice(
      "Kemampuan menghasilkan konten seperti teks atau gambar disebut …",
      termOptions,
      2,
      "Generatif: sistem menghasilkan draf teks atau gambar.",
    ),
    {
      kind: "read",
      question: "Hubungan istilah yang sudah kamu coba",
      context: [
        "Deep learning adalah bagian dari machine learning. Machine learning merupakan salah satu pendekatan dalam AI.",
        "Generatif menjelaskan kemampuan menghasilkan konten. Kemampuan ini dapat beririsan dengan pendekatan tersebut, bukan selalu sebagai kotak terdalam.",
      ],
      checkLabel: "Lihat peta lengkap",
      visual: "map",
    },
  ],
  "2.check": [
    choice(
      "Apakah informasi itu cukup untuk memastikan fitur memakai machine learning?",
      [
        "Ya, karena hasilnya berubah mengikuti foto.",
        "Belum; perlu penjelasan tentang aturan atau model yang dipakai.",
        "Tidak, karena pengguna masih harus menekan tombol.",
      ],
      1,
      "Hasil yang berbeda bisa muncul dari aturan maupun model yang dilatih. Tombol yang perlu ditekan juga tidak menentukan jenis teknologinya. Untuk memastikan, cari penjelasan tentang cara kerja fitur tersebut.",
    ),
  ],
  "3.1": [
    {
      ...choice(
        "Merangkum dokumen acara. Bantuan seperti apa yang sesuai?",
        ["AI membantu draf", "Perlu penilaian dan pemeriksaan", "Keduanya"],
        2,
        "AI bisa membantu membuat ringkasan. Cocokkan lagi dengan dokumen agar rincian penting tidak hilang atau berubah.",
      ),
      correct: undefined,
    },
    {
      ...choice(
        "Membuat beberapa susunan slide. Bantuan seperti apa yang sesuai?",
        ["AI membantu draf", "Perlu penilaian dan pemeriksaan", "Keduanya"],
        2,
        "AI bisa menawarkan susunan yang berbeda. Tim memilih yang paling membantu menjelaskan tujuan proposal.",
      ),
      correct: undefined,
    },
    {
      ...choice(
        "Memilih sponsor yang cocok. Bantuan seperti apa yang sesuai?",
        ["AI membantu draf", "Perlu penilaian dan pemeriksaan", "Keduanya"],
        2,
        "AI bisa membantu membandingkan pilihan. Hubungan dengan sponsor, nilai kegiatan, dan pertimbangan tim tetap perlu dibahas.",
      ),
      correct: undefined,
    },
    {
      ...choice(
        "Menyetujui janji kepada sponsor. Bantuan seperti apa yang sesuai?",
        ["AI membantu draf", "Perlu penilaian dan pemeriksaan", "Keduanya"],
        1,
        "Persetujuan perlu diberikan oleh pihak yang berwenang dan memahami komitmennya. Kalimat dalam draf AI belum menjadi persetujuan tim.",
      ),
      correct: undefined,
    },
  ],
  "3.2": [
    {
      ...choice(
        "Pada ukuran yang dibahas, kelompok muda memiliki paparan lebih tinggi.",
        ["Didukung", "Tidak didukung"],
        0,
        "Angka kelompok muda lebih tinggi daripada kelompok dewasa dalam perbandingan ini.",
      ),
      visual: "chart",
    },
    choice(
      "26,1% pekerja muda pasti kehilangan pekerjaan.",
      ["Didukung", "Tidak didukung"],
      1,
      "Angka ini mengukur paparan tugas. Kepastian kehilangan pekerjaan tidak bisa disimpulkan dari grafik tersebut.",
    ),
    choice(
      "Semua tugas pekerja muda akan dikerjakan AI.",
      ["Didukung", "Tidak didukung"],
      1,
      "Grafik tidak menunjukkan bahwa semua tugas dalam setiap pekerjaan akan diambil alih.",
    ),
    {
      ...multi(
        "Apa yang perlu kamu baca bersama angka ini? Boleh pilih lebih dari satu.",
        [
          "Definisi paparan",
          "Kelompok usia",
          "Waktu dan sumber data",
          "Warna grafik",
        ],
        [0, 1, 2],
        [
          "Definisi menjelaskan apa yang diukur.",
          "Kelompok usia menjelaskan siapa yang dibandingkan.",
          "Waktu dan sumber membantu menempatkan hasil penelitian.",
          "Warna memudahkan membaca grafik, tetapi tidak menentukan apa yang diukur.",
        ],
      ),
      explanation:
        "Definisi, kelompok usia, waktu, dan sumber membantu menjelaskan arti angka. Warna memudahkan membaca grafik, tetapi tidak menentukan apa yang diukur.",
    },
  ],
  "3.3": [
    {
      kind: "reflection",
      min: 1,
      question: "Apa yang ingin kamu coba minggu ini?",
      options: ["Belajar", "Riset", "Berkarya", "Pekerjaan atau kegiatan lain"],
      context: [
        "Minggu ini saya ingin memakai AI untuk …, lalu memeriksa ….",
        "Saya ingin dibantu memahami topik baru, lalu mencoba menjelaskannya ulang tanpa melihat jawaban.",
        "Saya ingin membuat ringkasan penelitian, lalu mencocokkannya dengan artikel asli.",
        "Saya ingin membuat draf kode, lalu membaca perubahannya dan menjalankan tes yang relevan.",
      ],
    },
  ],
  "3.4": [
    explore(
      "Brief simulasi: acara untuk pemula, anggaran terbatas, dan tim ingin menyediakan sesi praktik. AI menyarankan sebagian besar anggaran untuk dekorasi. Sebelum memutuskan, apa yang ingin kamu lihat?",
      ["Tujuan acara", "Rincian anggaran", "Penjelasan AI yang lebih panjang"],
      [
        "Tim ingin peserta mendapat pengalaman praktik. Saran dekorasi perlu dilihat bersama kebutuhan ini.",
        "Periksa apakah setelah biaya dekorasi masih ada cukup dana untuk sesi praktik.",
        "Penjelasan tambahan bisa membantu memahami usulannya. Namun, kamu tetap perlu mencocokkannya dengan tujuan dan anggaran.",
      ],
      1,
    ),
    choice(
      "Apa yang kamu lakukan dengan saran itu?",
      ["Ikuti saran", "Sesuaikan saran", "Tunda sampai informasi cukup"],
      [1, 2],
      "Menyesuaikan atau menunda lebih beralasan pada kasus ini.",
      [
        "Sebelum langsung mengikuti, ada kebutuhan yang belum terjawab: bagaimana sesi praktik tetap terlaksana dengan sisa anggaran?",
        "Kamu bisa mempertimbangkan dekorasi sambil menjaga dana untuk sesi praktik. Pastikan usulan barunya sesuai tujuan dan rincian biaya.",
        "Jika biaya dan kebutuhan praktik belum jelas, mencari informasi itu dulu memberi dasar untuk memutuskan.",
      ],
    ),
  ],
  "3.5": [
    ...[
      [
        "Menentukan tujuan proposal sebelum membuat slide.",
        "Tujuan membantu memilih isi dan susunan yang perlu dimasukkan.",
      ],
      [
        "Menilai apakah rincian biaya masuk akal.",
        "Pengetahuan tentang kebutuhan acara membantu membaca perkiraan biaya.",
      ],
      [
        "Membuka sumber asli angka pada slide.",
        "Angka yang dipakai untuk meyakinkan sponsor perlu sumber yang bisa diperiksa.",
      ],
      [
        "Menanyakan kemampuan tim memenuhi janji sponsor.",
        "Usulan harus mempertimbangkan kemampuan orang yang akan menjalankannya.",
      ],
      [
        "Mengevaluasi cara kerja setelah mencoba alat baru.",
        "Pengalaman memakai alat bisa membantu memperbaiki proses berikutnya.",
      ],
    ].map(([question, explanation], i) =>
      choice(
        question + " Pilih kemampuan yang paling terlihat.",
        [
          "Menentukan tujuan",
          "Memahami bidang",
          "Memeriksa sesuai risiko",
          "Memahami konteks dan orang",
          "Terus belajar",
        ],
        i,
        explanation +
          " Satu tindakan boleh berkaitan dengan beberapa kemampuan.",
      ),
    ),
  ],
  "3.6": [
    explore(
      "Bandingkan dua cara memakai AI untuk belajar.",
      ["Cara pertama", "Cara kedua"],
      [
        "Meminta jawaban jadi → menyalinnya.",
        "Membuat draf sendiri → meminta kritik → memeriksa kritik → mencocokkan sumber → memutuskan revisi.",
      ],
    ),
    multi(
      "Tandai langkah yang melibatkan penyusunan atau penilaian jawaban. Boleh pilih lebih dari satu.",
      thinkingActions,
      [0, 2, 3, 4],
      [
        "Kamu ikut menyusun jawaban.",
        "Meminta masukan bisa membantu, tetapi kritiknya masih perlu dinilai.",
        "Kamu menilai apakah masukan benar dan sesuai kebutuhan.",
        "Kamu memastikan klaim sesuai dengan bahan aslinya.",
        "Kamu mengambil keputusan tentang perubahan yang diperlukan.",
        "Menyalin saja belum menunjukkan bahwa kamu memahami atau menilai isinya.",
      ],
    ),
    choice(
      "Saran AI · simulasi: ‘Tambahkan angka 78% agar lebih meyakinkan.’",
      ["Terima", "Periksa dulu", "Tidak dipakai"],
      [1, 2],
      "Angka 78% belum punya sumber. Menambahkannya hanya karena terdengar meyakinkan belum memberi dasar bagi proposal. Cari sumber yang mendukung atau jangan pakai angkanya.",
    ),
    {
      ...choice(
        "Saran AI: ‘Jelaskan manfaat sesi praktik untuk peserta.’",
        ["Terima", "Periksa dulu", "Tidak dipakai"],
        0,
        "Menjelaskan manfaat praktik sesuai dengan tujuan acara. Kamu bisa memakai saran ini, lalu memastikan penjelasannya cocok dengan sesi yang benar-benar direncanakan. Memeriksa manfaat praktik lebih dulu juga masuk akal.",
      ),
      correct: undefined,
    },
  ],
  "3.7": [
    {
      ...choice(
        "Tentukan. Apa tujuan proposal ini?",
        [
          "Menyusun proposal yang bisa dipertanggungjawabkan",
          "Membuat sponsor terkesan dengan angka apa pun",
        ],
        0,
        "Proposal perlu menjelaskan manfaat dan rencana yang punya dasar. Angka yang menarik belum tentu membantu jika sumbernya tidak jelas.",
      ),
      visual: "proposal",
    },
    {
      ...multi(
        "Gunakan. Bantuan mana yang masih berguna? Boleh pilih lebih dari satu.",
        [
          "Merangkum bahan",
          "Memberi pilihan kalimat",
          "Menganggap statistik tanpa sumber benar",
        ],
        [0, 1],
        [
          "AI bisa membantu mengolah bahan.",
          "AI bisa membantu menyusun kalimat.",
          "Statistiknya tetap perlu diperiksa.",
        ],
      ),
      explanation:
        "AI bisa membantu mengolah bahan dan menyusun kalimat. Statistiknya tetap perlu diperiksa.",
    },
    choice(
      "Cek. Bagaimana kamu memeriksa angkanya?",
      [
        "Cari sumber asli, kelompok yang diteliti, dan tahun",
        "Tanyakan angka yang sama ke AI lain",
      ],
      0,
      "Sumber asli membantu memastikan apa yang diukur dan siapa yang diteliti. Jawaban AI lain belum memberi kepastian itu.",
    ),
    choice(
      "Putuskan. Sumbernya belum ditemukan. Apa yang kamu lakukan?",
      [
        "Hapus atau ganti dengan informasi yang bisa dibuktikan",
        "Pakai karena cocok dengan pesan",
        "Tetap jadikan dasar kesimpulan dengan catatan belum diperiksa",
      ],
      0,
      "Angka ini belum bisa menjadi dasar kesimpulan. Kamu bisa menghapusnya atau mengganti dengan informasi yang punya sumber. Menulis ‘belum diperiksa’ memberi tahu pembaca bahwa ada ketidakpastian, tetapi belum membuat angkanya bisa dipercaya.",
    ),
    {
      kind: "read",
      question: "Pilihan dan keputusanmu",
      checkLabel: "Lihat keputusanmu",
      visual: "proposal",
      context: [
        "Periksa apakah keputusanmu sesuai tujuan proposal dan informasi yang tersedia. Proposal ini tidak dikirim ke mana pun.",
      ],
    },
  ],
  "3.8": [
    multi(
      "Draf simulasi menjanjikan fasilitas dan penggunaan foto peserta kepada sponsor. Pilih hal yang perlu dipastikan sebelum proposal dikirim.",
      [
        "Konfirmasi fasilitas ke tim",
        "Pastikan izin penggunaan foto",
        "Anggap draf sebagai persetujuan",
        "Tinjau komitmen bersama penanggung jawab",
      ],
      [0, 1, 3],
      [
        "Pastikan fasilitasnya memang tersedia dan bisa dipakai untuk rencana ini.",
        "Orang dalam foto perlu mengetahui dan mengizinkan penggunaan yang direncanakan.",
        "Draf baru memuat usulan. Isinya belum menunjukkan bahwa pihak terkait sudah setuju.",
        "Penanggung jawab perlu memahami janji yang dibuat dan memastikan tim bisa memenuhinya.",
      ],
    ),
    {
      kind: "reflection",
      question: "Sebelum proposal dikirim, saya perlu memastikan ….",
    },
  ],
  "3.9": [
    choice(
      "Kamu ingin memasukkan kutipan dari AI ke tulisan. Apa yang kamu periksa lebih dulu?",
      ["Buka tulisan asli", "Tanya ulang AI", "Nilai dari gaya bahasa"],
      0,
      "Buka tulisan asli, lalu cocokkan kata-kata dan konteks kutipannya. Gaya bahasa yang meyakinkan belum memastikan kutipan benar.",
    ),
    choice(
      "Kamu menerima bukti pembayaran. Apa yang kamu periksa lebih dulu?",
      [
        "Cocokkan transaksi penerima",
        "Periksa font",
        "Minta gambar lebih tajam",
      ],
      0,
      "Cocokkan catatan transaksi di pihak penerima. Gambar yang lebih tajam tetap belum memastikan uang masuk.",
    ),
    choice(
      "Kamu ingin mengirim dokumen berisi data orang lain. Apa yang kamu periksa lebih dulu?",
      [
        "Periksa kebutuhan dan izin",
        "Matikan training saja",
        "Kirim semua agar lengkap",
      ],
      0,
      "Pastikan datanya diperlukan dan boleh dibagikan. Pengaturan training tidak menggantikan izin tersebut.",
    ),
    choice(
      "Kamu memakai jawaban AI untuk belajar. Apa yang kamu periksa lebih dulu?",
      [
        "Jelaskan ulang dan periksa alasan",
        "Salin agar cepat",
        "Terima semua kritik",
      ],
      0,
      "Coba jelaskan ulang dan lihat apakah kamu memahami alasannya. Kritik juga perlu dinilai sebelum dipakai.",
    ),
  ],
  "3.check": [
    choice(
      "Apa langkah berikutnya saat statistik tidak disertai sumber?",
      [
        "Cari sumber asli, lalu periksa tahun, kelompok yang diteliti, dan isi klaimnya.",
        "Tanya dua AI lain dan pakai angkanya kalau jawaban mereka serupa.",
        "Jadikan dasar proposal sambil menulis ‘perlu diverifikasi’.",
      ],
      0,
      "Sumber asli membantu kamu memastikan apa yang diukur. Jawaban yang serupa dari beberapa AI atau catatan ‘perlu diverifikasi’ belum menjawab pertanyaan itu. Kalau sumbernya tidak ditemukan, jangan jadikan angka tersebut dasar kesimpulan. Cari informasi lain yang bisa diperiksa.",
    ),
  ],
};

// Optional examples do not block the main path after the specified minimum.
export const optionalAfter: Record<string, number> = {
  "2.8": 2,
  "3.5": 1,
  "3.9": 2,
};

export const scholarshipTasks: FundamentalsTask[] = [
  multi(
    "Tandai informasi yang ditambahkan tanpa dasar dari dokumen.",
    [
      "Nama program",
      "Tanggal penutupan",
      "Angka peluang diterima",
      "Tautan pendaftaran",
      "Kontak penyelenggara",
    ],
    [1, 2, 3],
    [
      "Nama program ada dalam dokumen latihan.",
      "Tanggal penutupan tidak ada di dokumen.",
      "Angka peluang diterima tidak ada di dokumen.",
      "Tautan pendaftaran tidak ada di dokumen. Tautan yang dibuat AI belum bisa dianggap sebagai sumber resmi.",
      "Kontak penyelenggara ada dalam dokumen latihan.",
    ],
    3,
    3,
  ),
  {
    ...multi(
      "Pilih langkah berikutnya. Boleh memilih lebih dari satu tindakan yang membantu.",
      [
        "Hubungi penyelenggara lewat kontak resmi",
        "Cari halaman resmi program",
        "Hapus klaim sampai ada sumber yang sesuai",
      ],
      [],
      [
        "Cocokkan kontak dengan penyelenggara program yang dimaksud.",
        "Pastikan halaman tersebut benar-benar milik program yang dimaksud.",
        "Informasi tanpa sumber belum bisa diumumkan sebagai fakta.",
      ],
    ),
    explanation:
      "Ketiga tambahan perlu diperiksa. Kontak dan halaman resmi juga perlu dicocokkan dengan program yang dimaksud.",
  },
  { kind: "reflection", question: "Saya akan … karena …." },
  {
    ...multi(
      "Pemeriksaan mandiri. Tanda centang adalah catatanmu sendiri, bukan penilaian aplikasi.",
      [
        "Saya tahu bagian tugas yang dibantu AI.",
        "Saya bisa membedakan isi dokumen dari tambahan dalam draf.",
        "Saya memilih pemeriksaan yang sesuai dengan klaimnya.",
        "Saya tahu informasi mana yang belum bisa diumumkan sebagai fakta.",
      ],
      [],
      [],
      0,
    ),
    kind: "reflection",
  },
];
