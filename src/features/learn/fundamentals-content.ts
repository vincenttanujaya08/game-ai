export type LessonSection = {
  title: string;
  paragraphs: string[];
  sources?: { label: string; url: string }[];
};

export type LessonContent = {
  lead: string;
  sections: LessonSection[];
  takeaway: string;
  check: {
    question: string;
    choices: { label: string; feedback: string; correct: boolean }[];
  };
};

export const fundamentalsLessons: LessonContent[] = [
  {
    lead: "AI sudah jauh lebih luas daripada chatbot. Di lesson ini kita melihat apa yang bisa dilakukannya, lalu belajar membedakan kemampuan dari keandalan.",
    sections: [
      {
        title: "AI ada di lebih banyak tempat daripada yang kita kira",
        paragraphs: [
          "Saat mendengar AI, kita mungkin langsung membayangkan ChatGPT, Gemini, pembuat gambar, atau asisten coding.\n\nItu wajar: **generative AI, yaitu AI yang bisa membuat teks atau gambar baru**, adalah bentuk yang paling sering kita ajak bicara.\n\nNamun AI juga membantu memilah email spam, merekomendasikan musik, membantu radiolog memeriksa gambar medis, memprediksi bentuk protein, mengendalikan robot, dan menjalankan tugas dengan alat digital.",
          "Kita mulai dari kemampuan yang terlihat sekarang, sebelum masuk ke definisi dan cara kerjanya pada lesson berikutnya.\n\n**Satu pegangan penting:** sistem yang berhasil pada suatu tugas belum tentu selalu benar, aman, atau cocok digunakan pada tugas lain.",
        ],
      },
      {
        title: "Dari soal matematika hingga penemuan ilmiah",
        paragraphs: [
          "Pada International Mathematical Olympiad 2025, versi khusus Gemini Deep Think menyelesaikan lima dari enam soal dan memperoleh **35 dari 42 poin**, setara standar medali emas.\n\nSoal diberikan dalam bahasa alami dan jawabannya berupa pembuktian matematika. Hasil itu menunjukkan kemampuan memecahkan persoalan kompleks.\n\nHasil tersebut tidak membuktikan bahwa AI berpikir seperti manusia atau akan selalu benar dalam matematika.",
          "Contoh lain datang dari AlphaFold2. Bentuk tiga dimensi protein berpengaruh pada cara protein bekerja. **AlphaFold2 membantu memprediksi bentuk itu dari urutan asam amino**.\n\nDemis Hassabis dan John Jumper menerima sebagian Nobel Kimia 2024 atas pekerjaan tersebut.\n\nAI di sini membantu ilmuwan memahami sistem biologis; ia bukan obat yang secara langsung menyembuhkan penyakit.",
        ],
        sources: [
          { label: "Google DeepMind · IMO 2025", url: "https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/" },
          { label: "Nobel Prize · AlphaFold2", url: "https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/" },
        ],
      },
      {
        title: "Membantu dokter, tetapi hasilnya tetap perlu dinilai",
        paragraphs: [
          "AI dapat membantu radiolog memeriksa mammogram, yaitu gambar hasil pemeriksaan payudara, dan menandai gambar yang perlu perhatian lebih.\n\nSebuah uji klinis yang terbit pada Maret 2026 melibatkan **31.301 perempuan**.\n\nPada strategi yang diuji, tugas membaca gambar oleh radiolog berkurang 63,6% dan tingkat deteksi kanker naik 15,2% dibanding strategi standar.\n\nNamun proporsi pasien yang diminta datang lagi untuk pemeriksaan lanjutan juga naik 14,8%.",
          "Angka itu berlaku pada studi dan alur kerja tersebut.\n\nKesimpulan yang tepat bukan ‘AI lebih baik daripada dokter’, melainkan bahwa cara manusia dan AI bekerja bersama harus dirancang serta dievaluasi dengan cermat.\n\n**Semakin besar akibat sebuah kesalahan, semakin penting pengawasan manusia.**",
        ],
        sources: [{ label: "Nature Medicine · uji mammogram 2026", url: "https://www.nature.com/articles/s41591-026-04277-x" }],
      },
      {
        title: "AI bisa memproses lebih dari teks",
        paragraphs: [
          "AI dapat menerima input berupa teks, foto dari kamera, suara, video, tampilan layar, atau dokumen.\n\nPengenalan wajah, mengubah suara menjadi teks (transkripsi), dan deteksi objek sudah lama digunakan.\n\nKini beberapa sistem bisa menggabungkan beberapa jenis input sekaligus; ini **disebut multimodal**.",
          "Bayangkan lampu indikator error pada perangkat berkedip. Kita dapat mengarahkan kamera ke perangkat itu dan bertanya apa artinya, atau membagikan layar saat rumus spreadsheet bermasalah.\n\nDulu kita harus menjelaskan semua yang terlihat dengan kata-kata. Sekarang kita dapat menunjukkan konteksnya.\n\nMeski begitu, ‘memproses gambar’ **bukan berarti AI melihat dan memahami dunia persis seperti manusia**.",
        ],
      },
      {
        title: "Dari layar ke dunia fisik",
        paragraphs: [
          "Di jalan, sistem bantuan mengemudi harus memperhatikan marka, kendaraan, pejalan kaki, lampu lalu lintas, lalu membantu memilih tindakan seperti mengerem atau berbelok.\n\nTesla menyebut Full Self-Driving sebagai sistem yang **tetap membutuhkan pengemudi yang memperhatikan jalan**. Nama produknya tidak mengubah tanggung jawab pengemudi.\n\nKesalahan di dunia fisik dapat berakibat jauh lebih serius daripada jawaban chatbot yang keliru.",
          "Robot Olaf dari Disney menunjukkan tantangan lain. Tubuh karakter animasi tidak mudah diterjemahkan menjadi robot yang seimbang.\n\nPeneliti menggunakan pembelajaran melalui percobaan dan umpan balik, dengan rujukan animasi dan simulasi, sebelum mengujinya pada robot sungguhan.\n\nBahkan bunyi langkah dan panas motor robot perlu diperhitungkan. Simulasi membantu mencoba perilaku berulang kali dengan risiko fisik yang lebih kecil.\n\nDalam riset AI fisik juga ada gagasan **world model**: model yang mencoba memperkirakan bagaimana lingkungan berubah ketika suatu tindakan dilakukan.\n\nDi tahap ini, cukup pahami tujuannya; belum perlu mempelajari tekniknya.",
        ],
        sources: [
          { label: "Tesla · Full Self-Driving (Supervised)", url: "https://www.tesla.com/support/fsd" },
          { label: "Disney Research · robot Olaf", url: "https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/" },
        ],
      },
      {
        title: "Dari menjawab ke melakukan",
        paragraphs: [
          "Chatbot biasa menjawab pertanyaan seperti ‘Apa itu SQL JOIN?’. **AI agent diberi tujuan**, lalu dapat merencanakan langkah, memakai alat, membaca hasil, dan menyesuaikan tindakannya.\n\nMisalnya, AI agent untuk coding bisa membaca file proyek, mencari penyebab test gagal, mengubah kode, menjalankan test, lalu meninjau hasilnya.",
          "Perbedaan sederhananya: chatbot sering mengikuti pola tanya → jawab; AI agent mengikuti tujuan → rencana → tindakan → pemeriksaan.\n\nKemampuan bertindak membuat AI lebih berguna sekaligus menambah hal yang perlu diawasi, terutama jika ia bisa mengubah data atau mengirim sesuatu.",
        ],
      },
      {
        title: "Bukti yang tampak nyata belum tentu terverifikasi",
        paragraphs: [
          "Bayangkan kamu menjual tiket konser dan pembeli mengirim tangkapan layar ‘transfer berhasil’. Nama, nominal, dan waktunya tampak benar.\n\nYang perlu kamu periksa adalah **riwayat transaksi di aplikasi bankmu sendiri**, bukan sekadar mencari font yang terlihat aneh.\n\nOJK pernah memperingatkan pemalsuan bukti transfer dengan bantuan AI. Cara verifikasi yang tahan terhadap gambar palsu ialah memeriksa sumber aslinya.",
          "Hal serupa berlaku pada identitas. Suara teman yang meminta uang lewat telepon bisa saja ditiru, begitu pula wajah di video.\n\nJika permintaannya penting atau mendesak, hubungi orang tersebut melalui kanal lain yang sudah kamu percayai. Jangan menjadikan ‘terdengar seperti suara asli’ sebagai satu-satunya bukti.",
        ],
        sources: [
          { label: "OJK · bukti transfer palsu", url: "https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx" },
          { label: "OJK · penipuan suara dan wajah", url: "https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx" },
        ],
      },
      {
        title: "Konten palsu bisa menimbulkan kerugian nyata",
        paragraphs: [
          "Foto seseorang dapat dipakai tanpa izin untuk membuat gambar seksual palsu. Gambar itu memang sintetis, tetapi **dampak pada martabat, privasi, reputasi, dan rasa aman korban sangat nyata**.\n\nKemampuan teknis untuk membuat sesuatu tidak otomatis memberi hak untuk membuat atau menyebarkannya.",
          "Pada Januari 2026, pemerintah Indonesia bahkan memutus akses sementara ke Grok setelah kasus konten seksual palsu tanpa persetujuan.\n\nPertimbangan yang sama berlaku pada penipuan, manipulasi opini, dan informasi kesehatan.\n\nKita perlu menilai bukan hanya apakah AI mampu membuat konten, tetapi siapa yang bisa terkena dampak dan siapa yang bertanggung jawab jika terjadi kesalahan.",
        ],
        sources: [{ label: "Komdigi · pernyataan konten deepfake", url: "https://portal.komdigi.go.id/kanal-publik/berita-kini/9923" }],
      },
      {
        title: "Perhatikan juga data yang kita berikan",
        paragraphs: [
          "Saat meminta bantuan AI, kita mungkin mengirim prompt, PDF, foto, suara, rekaman layar, kode, atau dokumen kerja.\n\n**Sebelum mengunggahnya, tanyakan:** data apa yang saya bagikan, apakah saya berhak membagikannya, siapa penerimanya, untuk apa data dipakai, berapa lama disimpan, dan apakah semua detail itu benar-benar diperlukan?\n\nSering kali cukup memakai cuplikan yang sudah menghapus identitas pribadi.",
          "Kebijakan penggunaan data berbeda menurut penyedia, produk, jenis akun, dan pengaturannya.\n\nMisalnya, ChatGPT menyediakan kontrol untuk menghentikan penggunaan percakapan baru bagi pelatihan model; produk kerja tertentu tidak memakai konten untuk pelatihan secara baku.\n\nPada Gemini, pengaturan Keep Activity memengaruhi penggunaan percakapan untuk peningkatan model.\n\n**Periksa pengaturan produk yang sedang kamu pakai**, terutama sebelum mengirim data orang lain atau data rahasia.",
        ],
        sources: [
          { label: "OpenAI · Data Controls", url: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
          { label: "Google · Gemini Privacy Hub", url: "https://support.google.com/gemini/answer/13594961" },
        ],
      },
      {
        title: "AI juga bisa salah tanpa ada yang berniat menipu",
        paragraphs: [
          "Sebuah jawaban bisa terdengar rapi dan yakin, tetapi memuat angka keliru, sumber yang tidak ada, atau kesimpulan yang tidak didukung bukti.\n\nJika kamu hendak memakai kutipan untuk tugas, buka tulisan aslinya. Jika AI menyebut aturan kampus, periksa halaman resmi kampus.\n\n**Mengulang pertanyaan ke AI yang sama tidak menggantikan verifikasi ke sumber.**",
          "Karena itu sistem AI memerlukan batas penggunaan, pengujian, dan pengawasan. Kemampuan baru memberi peluang besar, tetapi juga bisa memperbesar kesalahan atau penyalahgunaan.\n\nSikap yang berguna bukan menganggap AI selalu baik atau buruk; lihat tugas, konteks, risiko, dan bukti yang tersedia.",
        ],
      },
      {
        title: "Jembatan ke lesson berikutnya: apakah semua yang otomatis itu AI?",
        paragraphs: [
          "Sistem TCAS pada pesawat dapat mendeteksi potensi tabrakan dan memberi pilot saran untuk naik atau turun. Itu kemampuan keselamatan yang penting.\n\nNamun sistem yang mendeteksi, menghitung, dan memberi saran secara otomatis **belum tentu menggunakan machine learning atau AI modern**.\n\nAturan yang ditulis manusia juga bisa menghasilkan perilaku yang sangat canggih.",
          "Jadi pertanyaan untuk lesson berikutnya ialah: jika kemampuan mengambil keputusan otomatis saja belum cukup, apa yang sebenarnya dimaksud orang ketika mengatakan ‘AI’?",
        ],
        sources: [{ label: "FAA · penjelasan TCAS II", url: "https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" }],
      },
    ],
    takeaway: "AI semakin mampu melakukan tugas kompleks, tetapi kemampuan pada satu tugas tidak menjamin jawaban yang benar, penggunaan yang aman, atau keputusan yang bertanggung jawab.",
    check: {
      question: "Pembeli mengirim tangkapan layar transfer yang tampak meyakinkan. Langkah paling tepat?",
      choices: [
        { label: "Kirim tiket karena tampilannya rapi", feedback: "Tampilan tangkapan layar dapat dipalsukan. Periksa transaksi di rekeningmu sendiri.", correct: false },
        { label: "Cari bagian gambar yang terlihat hasil edit", feedback: "Editan yang baik sulit dikenali. Sumber asli lebih dapat diandalkan daripada tebakan visual.", correct: false },
        { label: "Cek riwayat transaksi di aplikasi bankmu", feedback: "Tepat. Pastikan uangnya benar-benar masuk lewat riwayat transaksi bankmu.", correct: true },
      ],
    },
  },
  {
    lead: "Kita sudah melihat kemampuan AI. Sekarang kita telusuri bagaimana sistem belajar dari data, apa bedanya dengan aturan biasa, dan mengapa jawaban yang meyakinkan tetap bisa keliru.",
    sections: [
      {
        title: "Otomatis belum tentu AI",
        paragraphs: [
          "Ingat TCAS dari lesson pertama. Sistem itu menerima informasi tentang pesawat sekitar, menghitung risiko, lalu memberi saran kepada pilot.\n\nSensor parkir juga menerima jarak, membandingkannya dengan batas yang ditetapkan, lalu membunyikan alarm. Keduanya dapat bekerja otomatis melalui logika yang dirancang manusia.",
          "Gambaran sederhananya: **input (data yang diterima) → aturan yang ditulis manusia → output (hasilnya)**. Aturan bisa sangat rumit dan tetap berguna.\n\nMenyebut suatu fitur ‘pintar’ atau ‘otomatis’ belum membuktikan bahwa ia memakai AI.",
        ],
        sources: [{ label: "FAA · TCAS II", url: "https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html" }],
      },
      {
        title: "Ketika aturan sulit ditulis satu per satu",
        paragraphs: [
          "Coba tulis aturan untuk membedakan semua foto kucing dan anjing. ‘Punya bulu’ tidak cukup; keduanya berbulu. ‘Empat kaki’ juga tidak cukup.\n\nSudut kamera, cahaya, warna, dan bagian tubuh yang tertutup membuat daftar aturan semakin panjang.",
          "AI adalah bidang yang mengembangkan sistem untuk tugas seperti mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten.\n\n**Machine learning adalah salah satu cara membangunnya**: berikan banyak contoh, lalu sistem menyesuaikan model untuk menangkap pola yang berguna.\n\nJadi AI adalah bidang yang lebih luas, sedangkan machine learning adalah salah satu pendekatannya.",
        ],
      },
      {
        title: "Data → training → model → output",
        paragraphs: [
          "Untuk pengenal kucing dan anjing, kita dapat memberi banyak foto beserta jawabannya. Saat training, sistem menyesuaikan model agar dapat membedakan pola.\n\nSetelah itu, **foto baru menjadi input dan model membuat prediksi**.\n\nModel tidak harus menyimpan aturan sederhana seperti ‘jika telinga segitiga, maka kucing’; hubungan yang dipelajarinya bisa jauh lebih kompleks.",
          "Ini gambaran sederhana untuk memahami prosesnya. Sistem AI berbeda-beda dibuat dengan cara yang berbeda.\n\nYang penting: data dan proses training memengaruhi kemampuan model, sementara output untuk input baru tetap berupa prediksi yang bisa salah.",
        ],
      },
      {
        title: "Tiga cara belajar yang sering dibahas",
        paragraphs: [
          "Dalam **supervised learning**, contoh sudah diberi jawaban: foto kucing atau anjing, email spam atau bukan spam, transaksi mencurigakan atau tidak.\n\nModel belajar dari contoh berlabel itu untuk memprediksi contoh baru.",
          "Dalam **unsupervised learning**, data tidak diberi kelompok yang benar sejak awal.\n\nSistem mencari pola kemiripan, misalnya pelanggan yang sering belanja kecil-kecilan dan pelanggan yang jarang belanja tetapi sekali transaksi besar.\n\nDalam **reinforcement learning**, sistem mencoba tindakan, menerima umpan balik, lalu menyesuaikan perilaku; robot yang belajar bergerak adalah salah satu contohnya.\n\nKetiganya bukan daftar yang perlu dihafal, melainkan tiga cara memahami bagaimana contoh dan umpan balik dipakai.",
        ],
      },
      {
        title: "Deep learning dan data yang lebih rumit",
        paragraphs: [
          "Foto tersusun dari banyak piksel. Suara memiliki frekuensi, waktu, dan gangguan. Arti kata berubah menurut kalimatnya. Video menambahkan gerakan dan urutan waktu.\n\nUntuk menemukan pola dalam data seperti itu, banyak sistem modern memakai **deep learning, yaitu bagian dari machine learning** yang menggunakan jaringan saraf buatan dengan banyak lapisan.",
          "Istilah ‘saraf’ terinspirasi sejarah penelitian, tetapi jaringan itu bukan otak manusia dalam komputer. Ia adalah cara matematika untuk mempelajari hubungan yang kompleks.\n\nDeep learning membantu banyak kemajuan pada pengenalan gambar, suara, bahasa, dan robotika.",
        ],
      },
      {
        title: "Dari mengenali menjadi menghasilkan",
        paragraphs: [
          "Sebagian AI memperkirakan kategori atau memilih sesuatu yang relevan: filter spam memberi label, sistem rekomendasi memilih lagu, model prediksi memperkirakan risiko.\n\nKelompok ini sering disebut AI prediktif atau diskriminatif, bergantung pada tugasnya.\n\n**Generative AI membuat konten baru** seperti teks, gambar, audio, video, atau kode berdasarkan input pengguna.\n\nKeduanya berada di dalam payung AI; generative AI bukan nama lain untuk seluruh AI.",
          "Generative AI modern banyak memakai deep learning.\n\nAda juga model generatif yang lebih tua dan tidak memakai pendekatan itu, jadi hubungan istilahnya tidak sesederhana empat kotak yang selalu bersarang rapi.\n\nUntuk pemula, cukup tanyakan tugasnya: apakah sistem sedang mengklasifikasi, merekomendasikan, memprediksi, atau menghasilkan konten?",
        ],
      },
      {
        title: "Mengapa model bahasa bisa menjawab dengan lancar?",
        paragraphs: [
          "Model bahasa dilatih pada banyak contoh bahasa. Saat menjawab, model memproses input dan memperkirakan kelanjutan yang sesuai dengan pola yang dipelajarinya.\n\nSistem modern melakukan proses ini berulang sehingga dapat menulis kalimat panjang, mengikuti instruksi, merangkum, dan membantu memecahkan masalah.",
          "Penjelasan ‘memprediksi bagian berikutnya’ adalah gambaran awal, bukan uraian lengkap seluruh cara kerja model.\n\n**Kelancaran bahasa tidak membuktikan** bahwa model memiliki pengalaman, niat, atau pemahaman seperti manusia. Bahkan jawaban yang terdengar sangat yakin bisa berisi informasi yang salah.",
        ],
      },
      {
        title: "Hebat pada satu tugas, rapuh pada tugas lain",
        paragraphs: [
          "Model dapat menyelesaikan persoalan sulit lalu gagal pada permintaan sederhana yang membutuhkan ketelitian, konteks, atau alat yang tidak tersedia.\n\nPerforma juga berubah menurut model, versi, dan cara pengguna memberi tugas.\n\nSebuah video kegagalan model berguna sebagai ilustrasi, tetapi bukan bukti bahwa semua model akan selalu gagal pada tugas yang sama.",
          "Kadang AI menyatakan seolah-olah sudah membuka link, menjalankan kode, atau memeriksa sumber padahal ia tidak punya alat untuk melakukannya.\n\nTanyakan apa yang benar-benar dilakukan sistem, lalu periksa bukti yang bisa kamu lihat: file yang berubah, hasil pengujian, atau halaman sumber asli.\n\n**Jangan menganggap klaim kemampuan sebagai bukti tindakan.**",
        ],
      },
      {
        title: "Apa yang perlu dibawa ke lesson terakhir?",
        paragraphs: [
          "Sistem otomatis dapat bekerja tanpa AI. Machine learning mempelajari pola dari data; deep learning adalah salah satu jenisnya; generative AI membuat konten baru.\n\nPada saat yang sama, model bisa salah, membuat klaim tanpa bukti, atau terlalu percaya diri tentang apa yang dapat dilakukannya.",
          "Pertanyaan selanjutnya bukan lagi sekadar ‘Apakah AI pintar?’. Kita perlu tahu kapan AI membantu, bagaimana menilai hasilnya, dan bagian keputusan mana yang tetap harus dipegang manusia.",
        ],
      },
    ],
    takeaway: "Banyak model AI mempelajari pola yang kompleks. Jawaban yang terdengar meyakinkan tetap berasal dari model dan belum tentu benar.",
    check: {
      question: "Sebuah fitur foto bertuliskan ‘perbaiki otomatis’. Apakah fitur itu pasti memakai AI?",
      choices: [
        { label: "Pasti memakai AI", feedback: "Nama fitur belum menjelaskan proses di baliknya. Bisa jadi hanya filter dengan aturan tetap.", correct: false },
        { label: "Pasti tidak memakai AI", feedback: "Fitur itu bisa saja menggunakan model. Kita membutuhkan informasi tentang cara kerjanya.", correct: false },
        { label: "Belum cukup informasi", feedback: "Tepat. Otomatisasi bisa berbasis aturan atau model AI.", correct: true },
      ],
    },
  },
  {
    lead: "AI bisa membantu banyak pekerjaan sekaligus membuat kita terlalu mudah mengikuti jawabannya. Lesson terakhir ini membahas perubahan kerja dan kebiasaan yang membuat kita tetap memegang arah, konteks, dan keputusan.",
    sections: [
      {
        title: "Pekerjaan terdiri dari banyak tugas",
        paragraphs: [
          "Seorang analis junior tidak hanya ‘menganalisis’.\n\nIa mencari informasi, membaca dokumen, membuat ringkasan, menulis draf, menyusun presentasi, memahami kondisi perusahaan, memilih rekomendasi, lalu mempertanggungjawabkannya.\n\nAI dapat mempercepat beberapa langkah awal tanpa mengambil alih seluruh pekerjaan. Meski jabatan orangnya tetap ada, **isi pekerjaannya sudah berubah**.",
          "Pertanyaan yang lebih berguna daripada ‘Apakah AI menggantikan profesi ini?’\n\nialah ‘Tugas mana yang bisa dibantu AI, dan tugas mana yang masih membutuhkan pemahaman, hubungan dengan orang lain, serta tanggung jawab manusia?’\n\nTugas yang jelas, berulang, dan banyak memproses informasi sering lebih mudah dibantu AI; situasi dengan konteks rumit dan konsekuensi sosial menuntut lebih banyak penilaian.\n\nPembagian ini membantu kita memilih bagian mana yang layak diberikan ke AI.",
        ],
      },
      {
        title: "Apa yang ditunjukkan data pekerjaan?",
        paragraphs: [
          "ILO melaporkan pada 2026 bahwa di ASEAN belum tampak kehilangan pekerjaan besar-besaran akibat generative AI. Banyak pekerjaan justru menghadapi perubahan sebagian tugas.\n\nDi Indonesia, sekitar 21,7% pekerjaan memiliki tugas yang secara teknis bisa terdampak AI lebih dari tingkat minimal; sekitar 3–4% masuk kategori paparan tertinggi.\n\n**Paparan di sini mengukur bagian tugas yang bisa dipengaruhi AI, bukan persentase orang yang pasti kehilangan pekerjaan.**",
          "Potensinya berbeda menurut jenis pekerjaan.\n\nMenurut ILO, 93,9% pekerjaan dukungan administratif di Indonesia memiliki tugas yang berpotensi terdampak generative AI, dan 67,5% masuk kategori paparan tertinggi.\n\nUntuk pekerja muda usia 15–24 tahun, angkanya diperkirakan 26,1%, dibanding 21,1% pada pekerja dewasa. Angka-angka ini menunjukkan perlunya persiapan, bukan kepastian nasib setiap individu.",
          "Data Amerika Serikat dari Stanford Digital Economy Lab memberi sinyal lain.\n\nHingga Juni 2026, tingkat pekerjaan pekerja usia 22–25 tahun di bidang yang sangat terpapar AI sekitar 19% lebih rendah dari perkiraan.\n\nPerkiraan ini memakai pertumbuhan kelompok muda pada pekerjaan dengan paparan AI lebih rendah sebagai pembanding. Penyesuaian lebih banyak tampak pada perekrutan yang melambat daripada PHK.\n\nStudi itu tidak membuktikan bahwa AI sendirian menyebabkan seluruh selisihnya, dan hasil Amerika Serikat tidak boleh langsung dianggap sebagai prediksi Indonesia.",
        ],
        sources: [
          { label: "ILO · pasar kerja ASEAN 2026", url: "https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited" },
          { label: "ILO · rincian Indonesia", url: "https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets" },
          { label: "Stanford Digital Economy Lab · pekerja muda", url: "https://digitaleconomy.stanford.edu/news/canariesaug26/" },
        ],
      },
      {
        title: "Apa artinya bagi mahasiswa Indonesia?",
        paragraphs: [
          "Ekosistem AI memerlukan energi, infrastruktur, chip, talenta, dan aplikasi. Indonesia masih membangun kemampuan di berbagai lapisan itu.\n\n**Tidak setiap mahasiswa perlu membuat model sebesar ChatGPT dari awal.** Jauh lebih banyak orang akan memakai AI dalam belajar, riset, desain, coding, bisnis, dan pelayanan sehari-hari.",
          "Karena itu, nilai praktis yang bisa dibangun sekarang adalah tahu kapan AI membantu menyelesaikan masalah nyata, bagaimana memberi konteks yang cukup, dan kapan hasilnya perlu diperiksa lagi.\n\nMenguasai nama satu alat saja tidak cukup, karena alatnya akan berubah.",
        ],
        sources: [{ label: "Komdigi · lima lapisan AI", url: "https://portal.komdigi.go.id/kanal-publik/berita-kini/10477" }],
      },
      {
        title: "Manusia + AI tidak otomatis lebih baik",
        paragraphs: [
          "Bayangkan kamu yakin jawaban soal adalah B, lalu AI menjawab D dengan penjelasan panjang.\n\nJika kamu langsung mengganti jawaban hanya karena AI terdengar yakin, kamu bisa meninggalkan jawaban yang sebenarnya benar.\n\nKebiasaan memberi kepercayaan berlebih kepada sistem otomatis disebut **automation bias**.",
          "Eksperimen yang terbit di Nature Medicine pada 2026 melibatkan 623 orang awam dan 153 dokter layanan primer dalam tugas diagnosis kondisi kulit.\n\nBantuan AI yang benar dapat membantu, tetapi orang awam lebih mudah mengikuti AI saat ia salah; dokter berpengalaman lebih mampu menahan pengaruh itu.\n\nHasil tersebut tidak berarti ahli selalu benar. Intinya, pengetahuan bidang membantu kita menilai saran AI.",
        ],
        sources: [{ label: "Nature Medicine · AI dan keputusan diagnosis 2026", url: "https://www.nature.com/articles/s41591-026-04553-w" }],
      },
      {
        title: "Lima kemampuan yang tetap perlu dilatih",
        paragraphs: [
          "Pertama, gunakan AI dengan tujuan yang jelas: minta bantuan untuk ide awal, ringkasan, atau draf, lalu tentukan sendiri bagian yang masih perlu pekerjaan manusia. Kedua, pahami bidangmu.\n\nPengetahuan coding membantu melihat celah keamanan pada kode AI; pengetahuan riset membantu mengenali asumsi yang salah dalam ringkasan.",
          "Ketiga, **sesuaikan tingkat pemeriksaan dengan akibat kesalahan**.\n\nNama acara kampus yang kurang menarik mudah diganti; ringkasan jurnal perlu dicek ke tulisan asli; keputusan kesehatan perlu sumber dan tenaga profesional yang tepat.\n\nKeempat, latih pemahaman konteks dan orang lain. Keputusan tentang pelanggan, tim, atau kebijakan jarang selesai hanya dari data yang mudah dimasukkan ke prompt.\n\nKelima, terus belajar, karena alat dan tugas kerja berubah.",
          "Tidak ada daftar keterampilan yang menjamin seseorang ‘kebal AI’.\n\nNamun **kemampuan menggunakan alat, memahami bidang, menilai hasil AI, membaca konteks manusia, dan belajar lagi** membuat kita lebih siap menyesuaikan diri.",
          "Ada manfaat yang terukur pada beberapa tugas.\n\nDalam studi atas 5.172 agen layanan pelanggan, akses ke asisten AI meningkatkan produktivitas rata-rata 15% menurut ukuran persoalan yang diselesaikan per jam; manfaatnya berbeda antarpekerja.\n\nHasil satu lingkungan kerja ini bukan janji bahwa setiap pekerjaan akan naik 15%. Yang dapat diambil ialah potensi AI membantu orang bekerja lebih baik jika tugas dan cara pakainya sesuai.",
        ],
        sources: [
          { label: "OECD · AI dan keterampilan", url: "https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html" },
          { label: "Brynjolfsson dkk. · Generative AI at Work", url: "https://arxiv.org/abs/2304.11771" },
        ],
      },
      {
        title: "Jangan menyerahkan seluruh proses berpikir",
        paragraphs: [
          "Sebuah studi Microsoft Research dan Carnegie Mellon mengumpulkan 936 contoh penggunaan generative AI dari 319 pekerja pengetahuan.\n\nDalam laporan diri mereka, kepercayaan yang lebih tinggi pada AI berkaitan dengan lebih sedikit upaya berpikir kritis pada tugas tertentu.\n\nPeneliti juga melihat pergeseran: pengguna **lebih banyak memeriksa, menggabungkan, dan mengawasi hasil AI**.\n\nIni tidak membuktikan bahwa AI membuat orang bodoh; hasilnya mengingatkan kita agar tetap mengerjakan bagian berpikir yang penting.",
          "Bandingkan dua cara memakai AI untuk tugas kuliah. Mahasiswa pertama meminta AI mengerjakan semuanya, lalu menyalin hasilnya.\n\nMahasiswa kedua membuat jawabannya dahulu, meminta AI mencari kelemahannya, memeriksa umpan balik, dan memperbaiki jawabannya sendiri.\n\nKeduanya memakai AI, tetapi hanya cara kedua yang jelas mempertahankan latihan berpikir mahasiswa.",
        ],
        sources: [{ label: "Microsoft Research · studi berpikir kritis", url: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/" }],
      },
      {
        title: "Empat langkah yang mudah dipakai",
        paragraphs: [
          "**TENTUKAN:** apa masalah yang sebenarnya ingin diselesaikan? Mulai dari tujuan, bukan dari merangkai prompt.\n\n**GUNAKAN:** pilih bagian yang bisa dibantu AI, seperti mencari ide, membuat draf, merangkum, membandingkan, atau menjelaskan.",
          "**CEK:** untuk klaim penting, angka, kutipan, dan sumber, kembali ke bukti aslinya. Semakin besar akibat jika jawaban salah, semakin teliti pemeriksaannya.\n\n**PUTUSKAN:** AI dapat memberi pilihan dan rekomendasi, tetapi kamu menentukan apa yang dipakai dan bertanggung jawab atas hasilnya.",
          "Contohnya, AI memberi angka ‘78% Gen Z menyukai merek yang mendukung keberlanjutan’ untuk proposal sponsor. Angkanya terdengar masuk akal, tetapi jangan langsung memakainya.\n\nCari penelitian aslinya, lihat siapa yang disurvei dan kapan, lalu putuskan apakah angka itu relevan.",
        ],
      },
      {
        title: "Nilai manusia ada pada arah dan penilaian",
        paragraphs: [
          "AI dapat mempercepat pelaksanaan.\n\n**Manusia tetap perlu menentukan tujuan**, memilih arah di antara banyak usulan, menilai apakah hasil cukup baik, memahami keadaan nyata, dan bertanggung jawab atas akibatnya.\n\nItu tidak berarti kita berhenti menulis, menganalisis, atau membuat kode. Semakin sering pekerjaan tersebut dilakukan bersama AI, semakin penting tahu apa yang sedang kita lakukan.",
          "Jangan panik seolah setiap pekerjaan pasti hilang, dan jangan pula mengabaikan perubahan hanya karena AI masih bisa salah.\n\nGunakan AI untuk memperluas kemampuanmu sambil menjaga pemahaman, penilaian, dan keputusanmu sendiri.",
        ],
      },
      {
        title: "Lanjutkan latihan dengan situasi nyata",
        paragraphs: [
          "Di NUSA Lab Game, kamu dapat menguji penilaianmu ketika menemui kutipan AI yang tampak sah, tangkapan layar yang terlihat asli, data yang belum tentu boleh dibagikan, atau tugas kuliah yang bisa dikerjakan AI.\n\nPertanyaannya bukan sekadar ‘AI baik atau buruk?’, melainkan ‘Apa yang akan kamu lakukan, dan **bukti apa yang kamu perlukan?**’",
          "Setelah tiga lesson ini, bawa satu kebiasaan sederhana ke pekerjaanmu sendiri: tentukan tujuan, gunakan AI saat berguna, cek hal penting, lalu putuskan dengan sadar.",
        ],
      },
    ],
    takeaway: "AI dapat mempercepat tugas. Manusia tetap memegang tujuan, konteks, penilaian mutu, dan tanggung jawab atas hasilnya.",
    check: {
      question: "AI memberi statistik yang cocok untuk proposalmu, tetapi tidak menyertakan sumber. Apa langkah berikutnya?",
      choices: [
        { label: "Langsung pakai karena angkanya masuk akal", feedback: "Angka yang terdengar masuk akal tetap bisa keliru atau keluar dari konteks.", correct: false },
        { label: "Jangan pernah memakai informasi dari AI", feedback: "AI tetap berguna sebagai titik awal. Periksa klaim penting sebelum memakainya.", correct: false },
        { label: "Cari sumber asli dan periksa konteksnya", feedback: "Tepat. Cek asal angka, waktu, dan siapa yang diteliti sebelum memutuskan memakainya.", correct: true },
      ],
    },
  },
];
