// Participant copy from ai-fundamentals-alur-interaktif.md (3 October 2026).
export type FundamentalsSection = {
  id: string;
  lesson: number;
  title: string;
  paragraphs: string[];
  extra: string;
  transition: string;
  next: string;
};
export const fundamentalsSections: FundamentalsSection[] = [
  {
    id: "1.1",
    lesson: 1,
    title: "AI di kegiatan sehari-hari",
    paragraphs: [
      "Email mencurigakan masuk ke folder spam. Aplikasi musik menyarankan lagu yang mungkin kamu suka. Chatbot membantu menulis caption. Ketiganya memakai AI, tetapi tugasnya berbeda: mengelompokkan pesan, memberi rekomendasi, dan membuat teks.",
      "AI adalah bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten. Jadi, AI yang kamu temui sehari-hari bisa punya bentuk selain chatbot.",
    ],
    extra:
      "satu aplikasi bisa mengerjakan beberapa tugas sekaligus. Aplikasi musik, misalnya, bisa merekomendasikan lagu dan membuat teks penjelasan tentang playlist. Untuk mengenalinya, lihat fitur yang sedang dipakai.",
    transition:
      "Tiga contoh tadi menunjukkan bahwa AI tidak hanya berarti chatbot. Sekarang kita pindah ke contoh yang lebih khusus untuk melihat seberapa jauh kemampuan AI bisa berkembang.",
    next: "Lihat contoh dari sains →",
  },
  {
    id: "1.2",
    lesson: 1,
    title: "Capaian AI: apa yang bisa kita simpulkan?",
    paragraphs: [
      "Pada IMO 2025, versi khusus Gemini Deep Think dilaporkan berhasil menyelesaikan lima dari enam soal. Skornya 35 dari 42 poin, setara standar medali emas. Itu capaian besar pada soal dan kondisi pengujian tersebut.",
      "Di biologi, AlphaFold2 membantu memprediksi bentuk tiga dimensi protein dari urutan asam amino. Pengembangannya membawa Demis Hassabis dan John Jumper menerima separuh Nobel Kimia 2024. Prediksi ini membantu penelitian, sementara pengembangan dan pengujian obat masih membutuhkan proses lanjutan.",
    ],
    extra:
      "benchmark adalah tugas atau kumpulan soal untuk mengukur kemampuan tertentu. Hasilnya perlu dibaca bersama model, alat, kondisi, dan cara penilaiannya. Protein sendiri adalah molekul yang menjalankan berbagai fungsi dalam sel; bentuknya membantu peneliti memahami cara kerjanya.",
    transition:
      "Dari sini ada satu kebiasaan penting: jangan menarik kesimpulan lebih jauh daripada bukti yang tersedia. Prinsip yang sama akan kita pakai saat membaca contoh AI di bidang kesehatan.",
    next: "Coba membaca hasil penelitian →",
  },
  {
    id: "1.3",
    lesson: 1,
    title: "Membaca manfaat AI dalam pemeriksaan medis",
    paragraphs: [
      "Mammogram adalah gambar dari pemeriksaan payudara. Radiolog, yaitu dokter yang membaca gambar medis, dapat memakai AI untuk membantu pemeriksaan.",
      "Dalam studi yang melibatkan 31.301 perempuan, strategi AI yang diuji mengurangi beban pembacaan radiolog sebesar 63,6%. Tingkat deteksi kanker meningkat 15,2% dibanding strategi standar. Namun, lebih banyak orang juga dipanggil untuk pemeriksaan lanjutan. Ketiga hasil ini perlu dibaca bersama.",
    ],
    extra:
      "kenaikan relatif 14,8% berbeda dari kenaikan 14,8 poin persentase. Studi melaporkan perbedaan absolut tingkat panggilan sekitar 0,7 poin persentase. Hasil ini berlaku pada populasi, sistem, dan alur yang diteliti. Rumah sakit dengan kondisi berbeda bisa memperoleh hasil berbeda pula.",
    transition:
      "Contoh mammogram tadi memakai gambar sebagai bahan utama. AI juga bisa menerima bentuk informasi lain, seperti teks, suara, atau gabungan beberapa jenis input. Berikutnya kita lihat mengapa memilih input yang tepat ikut menentukan hasil.",
    next: "Kenali jenis input AI →",
  },
  {
    id: "1.4",
    lesson: 1,
    title: "AI bisa menerima lebih dari teks",
    paragraphs: [
      "Informasi yang masuk ke sistem disebut input. Hasil yang diberikan disebut output. Sistem multimodal bisa memproses beberapa jenis input, misalnya teks dan gambar.",
      "Kalau ingin membahas pesan error, kamu bisa mengirim teksnya atau tangkapan layar. Untuk menuliskan isi rapat, rekaman suara lebih membantu. Jenis input yang tepat memudahkan tugas, meskipun sistem masih bisa melewatkan detail atau salah membaca.",
    ],
    extra:
      "modalitas berarti jenis informasi. Gambar buram, suara yang tidak jelas, tulisan kecil, atau halaman yang hilang bisa membuat hasil kurang tepat. Sebelum mengirim bahan, pastikan juga isinya boleh dibagikan. Kita akan membahas hal itu setelah beberapa contoh berikut.",
    transition:
      "Sejauh ini, hasil AI masih berupa informasi di layar. Ketika AI dipakai pada robot, hasil pemrosesan itu bisa berubah menjadi gerakan di dunia nyata, sehingga risikonya juga berbeda.",
    next: "Lihat AI pada robot →",
  },
  {
    id: "1.5",
    lesson: 1,
    title: "Saat AI membantu menentukan gerakan",
    paragraphs: [
      "Robot memakai sensor untuk membaca keadaan di sekitarnya, lalu menentukan gerakan. Karena bergerak di dunia nyata, kesalahan bisa berdampak pada orang atau benda di dekatnya.",
      "Dalam proyek robot Olaf dari Disney Research, gerakan dicoba berulang kali lewat simulasi sebelum diterapkan pada robot sungguhan. Gerakannya perlu terlihat sesuai karakter sekaligus memperhitungkan keseimbangan, bunyi langkah, dan panas motor.",
    ],
    extra:
      "world model memperkirakan bagaimana lingkungan berubah, termasuk setelah suatu tindakan. Simulasi menyediakan lingkungan buatan untuk percobaan. Pada contoh kendaraan, Tesla menyebut Full Self-Driving sebagai sistem yang memerlukan pengawasan pengemudi. Untuk memahami sebuah fitur, baca penjelasan kemampuan dan syarat penggunaannya.",
    transition:
      "Robot bukan satu-satunya contoh ketika AI bisa bertindak. Di komputer, sistem tertentu juga dapat membuka file, menjalankan tes, atau memakai alat lain. Karena itu, penting membedakan antara AI yang hanya memberi saran dan AI yang benar-benar melakukan tindakan.",
    next: "Dari memberi saran ke mengerjakan →",
  },
  {
    id: "1.6",
    lesson: 1,
    title: "Chatbot, agent, dan tindakan yang bisa diperiksa",
    paragraphs: [
      "Chatbot bisa kamu ajak bertanya dan berdiskusi. Agent dapat memakai alat untuk mengerjakan langkah menuju tujuan, membaca hasilnya, lalu menentukan langkah berikutnya.",
      "Dalam proyek coding, misalnya, sistem yang punya akses bisa membuka file, mencari penyebab tes gagal, mengubah kode sesuai izin, dan menjalankan tes. Apa yang bisa dikerjakannya bergantung pada alat dan akses yang tersedia saat itu.",
    ],
    extra:
      "chatbot modern juga bisa memakai tool. Contoh ini membandingkan cara penggunaan, bukan membagi produk ke dua kelompok yang selalu terpisah. Agent dapat mengulang langkah merencanakan, bertindak, dan memeriksa. Akses untuk mengubah data atau mengirim pesan tetap perlu disesuaikan dengan tugasnya.",
    transition:
      "Tadi kita belajar bahwa klaim tindakan perlu dibuktikan lewat jejak yang bisa diperiksa. Prinsip yang sama berguna di situasi sehari-hari, misalnya saat seseorang mengirim bukti pembayaran.",
    next: "Coba periksa pembayaran →",
  },
  {
    id: "1.7",
    lesson: 1,
    title: "Bukti transfer yang terlihat meyakinkan",
    paragraphs: [
      "Kamu menjual tiket konser. Pembeli mengirim gambar bertuliskan “transfer berhasil”. Nama, nominal, dan waktunya terlihat cocok. Apakah tiketnya sudah bisa diserahkan?",
      "Gambar seperti ini bisa diedit atau dibuat ulang. Untuk memastikan pembayaran diterima, lihat transaksi pada rekeningmu sendiri atau status pembayaran di layanan merchant yang kamu pakai.",
    ],
    extra:
      "jika seseorang meminta uang lewat suara yang terdengar seperti temanmu, konfirmasi melalui jalur lain yang sudah kamu percaya. Tampilan rapi atau suara yang mirip saja belum memastikan siapa pengirimnya.",
    transition:
      "Masalahnya tidak berhenti pada transaksi. Konten buatan juga bisa memakai wajah, suara, atau identitas seseorang dan membuat orang lain percaya pada sesuatu yang tidak pernah terjadi.",
    next: "Lihat siapa yang terdampak →",
  },
  {
    id: "1.8",
    lesson: 1,
    title: "Konten buatan dan orang di dalamnya",
    paragraphs: [
      "Konten sintetis adalah konten yang dibuat atau dimanipulasi secara buatan, termasuk dengan AI. Deepfake bisa meniru wajah atau suara seseorang. Teknologi ini bisa dipakai untuk karya kreatif, tetapi juga bisa membuat orang percaya pada kejadian yang tidak pernah terjadi.",
      "Bayangkan fotomu dipakai dalam poster pengumuman yang tidak pernah kamu buat. Orang lain mungkin mengira kamu terlibat. Itu bisa memengaruhi reputasi, privasi, dan rasa amanmu.",
    ],
    extra: "",
    transition:
      "Kalau identitas orang lain perlu diperlakukan dengan hati-hati, hal yang sama berlaku saat kita mengunggah bahan ke layanan AI. Sebelum mengirim file, pertanyaannya bukan hanya “bisa atau tidak”, tetapi juga “apa yang benar-benar perlu dibagikan?”.",
    next: "Siapkan bahan sebelum dikirim →",
  },
  {
    id: "1.9",
    lesson: 1,
    title: "Data apa yang perlu dikirim?",
    paragraphs: [
      "Saat kamu mengirim prompt, PDF, foto, atau suara, bahan itu diterima oleh layanan AI. Sebelum mengirim, pikirkan apa yang dibutuhkan untuk tugasmu, apakah kamu boleh membagikannya, dan bagaimana layanan tersebut menangani data.",
      "Untuk membuat ringkasan, mungkin cukup memakai beberapa bagian dokumen. Menghapus nama juga belum tentu menghilangkan identitas: alamat, tanggal, atau rincian kegiatan bisa tetap menunjukkan siapa orangnya.",
    ],
    extra:
      "kebijakan bisa berbeda menurut layanan, jenis akun, dan pengaturan. Penyimpanan data, penggunaan untuk pelatihan, dan izin membagikan dokumen perlu diperiksa masing-masing. Mematikan penggunaan chat untuk training tidak otomatis memberi izin mengunggah dokumen rahasia.",
    transition:
      "Memilih bahan yang tepat mengurangi risiko membagikan data yang tidak perlu. Tetapi itu belum menjamin jawabannya benar: AI masih bisa menambahkan detail yang tidak pernah ada di sumber.",
    next: "Cocokkan jawaban dengan sumber →",
  },
  {
    id: "1.10",
    lesson: 1,
    title: "Jawaban yang rapi masih bisa keliru",
    paragraphs: [
      "AI kadang memberikan informasi salah atau mengarang detail seolah-olah benar. Ini sering disebut halusinasi AI. Jawaban seperti itu bisa tetap terdengar lancar dan menyertakan sitasi, yaitu rujukan ke sumber. Rujukannya perlu dibuka untuk memastikan dokumennya ada dan memang mendukung jawaban.",
      "Untuk latihan ini, kita memakai panduan kampus fiktif. Panduan meminta mahasiswa menyebutkan bantuan AI pada tugas dan tetap bertanggung jawab atas isinya.",
    ],
    extra:
      "jawaban yang sama dari beberapa AI belum menggantikan sumber asli. Untuk tugasmu sendiri, buka panduan yang berlaku di institusimu dan cocokkan isinya.",
    transition:
      "Sampai sini kita banyak membahas apa yang AI bisa lakukan dan bagaimana memeriksa hasilnya. Sebelum masuk ke cara kerjanya, ada satu hal yang perlu dibereskan dulu: fitur otomatis belum tentu bekerja dengan AI atau machine learning.",
    next: "Lihat cara kerja di balik fitur →",
  },
  {
    id: "1.11",
    lesson: 1,
    title: "Fitur otomatis bekerja dengan cara apa?",
    paragraphs: [
      "Sistem otomatis bisa memakai aturan, model yang dilatih dari data, atau gabungan keduanya. TCAS pada pesawat, misalnya, memberi peringatan dan arahan untuk membantu menghindari tabrakan. Kecanggihan hasilnya saja belum menunjukkan apakah sistem memakai machine learning.",
      "AI adalah bidang luas yang juga mencakup pendekatan berbasis pengetahuan dan aturan. Untuk mengetahui apakah suatu fitur belajar dari data, kita perlu melihat cara kerjanya.",
    ],
    extra: "",
    transition:
      "Pertanyaan tadi menjadi jembatan ke pelajaran berikutnya. Kita akan mulai dari sistem berbasis aturan yang sederhana, lalu membandingkannya dengan model yang belajar dari data.",
    next: "Cek pemahaman pelajaran 1 →",
  },
  {
    id: "1.check",
    lesson: 1,
    title: "Cek pemahaman pelajaran 1",
    paragraphs: [
      "Pembeli mengirim bukti transfer yang terlihat meyakinkan. Sebelum menyerahkan tiket, apa yang kamu periksa?",
    ],
    extra: "",
    transition:
      "Pelajaran pertama berfokus pada apa yang AI lakukan dan bagaimana hasilnya perlu diperiksa. Sekarang kita masuk satu tingkat lebih dalam: bagaimana sistem seperti ini menghasilkan keputusan, prediksi, atau konten.",
    next: "Mulai pelajaran 2 →",
  },
  {
    id: "2.1",
    lesson: 2,
    title: "Mulai dari aturan sederhana",
    paragraphs: [
      "Sensor parkir membaca jarak kendaraan dari benda di dekatnya. Dalam contoh sederhana, alarm menyala ketika jaraknya melewati batas yang sudah ditentukan. Pengembang menulis kondisinya; sistem tidak perlu dilatih dari kumpulan foto atau suara.",
      "Machine learning memakai pendekatan lain. Model disesuaikan dari contoh data selama pelatihan. Dalam aplikasi nyata, aturan dan model juga bisa dipakai bersama.",
    ],
    extra: "",
    transition:
      "Aturan jarak mudah ditulis karena kondisinya jelas. Masalah menjadi berbeda ketika variasinya terlalu banyak untuk dirinci satu per satu, seperti mengenali kucing dan anjing dari foto.",
    next: "Coba contoh foto hewan →",
  },
  {
    id: "2.2",
    lesson: 2,
    title: "Ketika contoh lebih membantu daripada daftar aturan",
    paragraphs: [
      "Kucing dan anjing sama-sama bisa berbulu dan berkaki empat. Di foto, penampilannya juga berubah karena sudut kamera, cahaya, atau bagian tubuh yang tertutup. Sulit menulis aturan yang mencakup semua kemungkinan itu.",
      "Machine learning adalah salah satu pendekatan dalam AI. Model mempelajari pola dari contoh selama pelatihan, lalu memakai pola tersebut pada data baru. Kemampuan bekerja pada data yang belum dipakai untuk pelatihan disebut generalisasi.",
    ],
    extra:
      "foto untuk pengujian perlu dipisahkan dari foto latihan. Menambahkan foto ke layar juga belum mengubah model; foto itu harus benar-benar dipakai dalam proses pelatihan.",
    transition:
      "Sekarang kita sudah punya dua bahan penting: contoh untuk belajar dan data baru yang ingin dikenali. Berikutnya, kita susun keduanya dalam alur pelatihan dan pemakaian model.",
    next: "Susun prosesnya →",
  },
  {
    id: "2.3",
    lesson: 2,
    title: "Dari data sampai prediksi",
    paragraphs: [
      "Untuk melatih pengenal gambar, kita menyiapkan foto dengan label seperti “kucing” atau “anjing”. Proses training menyesuaikan model dari contoh-contoh itu. Setelah dilatih, model bisa menerima foto baru dan membuat prediksi.",
      "Memakai model pada input baru disebut inferensi. Jadi, ketika kamu mengirim satu foto untuk dikenali, model tidak otomatis dilatih ulang saat itu juga.",
    ],
    extra: "",
    transition:
      "Pada contoh foto, model belajar dari contoh yang sudah diberi label. Itu bukan satu-satunya cara. Ada model yang mencari pola dari data tanpa label, dan ada juga yang belajar dari hasil tindakan.",
    next: "Bandingkan cara model belajar →",
  },
  {
    id: "2.4",
    lesson: 2,
    title: "Tiga cara model belajar",
    paragraphs: [
      "Ada beberapa pendekatan untuk melatih model. Supervised learning memakai contoh yang sudah punya target atau label. Unsupervised learning mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel. Reinforcement learning mempelajari tindakan dari umpan balik yang berkaitan dengan tujuan.",
      "Kamu tidak perlu langsung menghafal namanya. Perhatikan dulu informasi apa yang dipakai untuk membantu proses belajar.",
    ],
    extra:
      "kelompok yang ditemukan belum tentu berguna untuk kebutuhan kita. Pada robot, umpan balik juga perlu dirancang agar sesuai dengan tujuan. Sekadar membiarkan sistem mencoba tidak menjamin hasil yang diinginkan.",
    transition:
      "Cara model belajar bisa berbeda, begitu juga dengan susunan di dalam modelnya. Salah satu istilah yang sering muncul ketika membahas AI modern adalah deep learning.",
    next: "Kenali deep learning →",
  },
  {
    id: "2.5",
    lesson: 2,
    title: "Mengenal deep learning tanpa rumus dulu",
    paragraphs: [
      "Deep learning adalah bagian dari machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. Melalui pelatihan, lapisan-lapisan ini membantu model mempelajari hubungan dalam data, termasuk gambar, suara, dan bahasa.",
      "Jaringan saraf buatan terdiri dari perhitungan yang disesuaikan selama pelatihan. Kata “saraf” pada namanya tidak berarti komputer punya otak, perasaan, atau pengalaman seperti manusia.",
    ],
    extra:
      "kemampuan model juga dipengaruhi kualitas data, tujuan pelatihan, rancangan, dan pengujian. Jumlah lapisan saja belum cukup untuk menilai kualitasnya.",
    transition:
      "Deep learning adalah pendekatan, bukan satu jenis tugas. Model dengan pendekatan ini bisa dipakai untuk mengenali, memperkirakan, memilih, atau menghasilkan sesuatu. Sekarang kita bedakan tugas-tugas tersebut.",
    next: "Bandingkan tugas AI →",
  },
  {
    id: "2.6",
    lesson: 2,
    title: "Mengenali, memilih, dan membuat konten",
    paragraphs: [
      "Filter spam memberi kategori pada email. Sistem rekomendasi memilih lagu. Model prediksi memperkirakan risiko. AI generatif membuat konten, misalnya teks, gambar, suara, video, atau kode.",
      "Banyak sistem generatif modern memakai deep learning. Namun, istilah “generatif” menjelaskan kemampuan menghasilkan konten, sedangkan machine learning dan deep learning menjelaskan pendekatan yang dipakai. Karena itu, hubungan semua istilah tersebut perlu digambarkan dengan hati-hati.",
    ],
    extra:
      "model generatif juga ada yang tidak menggunakan deep learning. Jika membuat peta istilah, letakkan deep learning sebagai bagian dari machine learning. Tunjukkan generatif sebagai kemampuan yang dapat beririsan dengan pendekatan tersebut, bukan selalu sebagai kotak terdalam.",
    transition:
      "Salah satu tugas tadi adalah menghasilkan konten. Untuk memahami mengapa teks dari AI bisa terdengar begitu lancar, kita lihat gambaran sederhana tentang cara model bahasa menyusun jawaban.",
    next: "Lihat cara model bahasa menyusun teks →",
  },
  {
    id: "2.7",
    lesson: 2,
    title: "Kalimatnya lancar, apakah isinya benar?",
    paragraphs: [
      "Model bahasa dilatih dari banyak contoh teks. Saat menjawab, model memproses input lalu memperkirakan lanjutan berdasarkan pola yang dipelajari. Proses ini berulang hingga jawaban tersusun bagian demi bagian.",
      "Bagian yang diproses disebut token. Token bisa berupa potongan kata atau tanda baca, sehingga satu token tidak selalu sama dengan satu kata. Ini gambaran dasar; sistem bahasa modern bisa memiliki komponen lain yang ikut bekerja.",
    ],
    extra: "",
    transition:
      "Kelancaran bahasa tidak menjamin kebenaran. Hal yang sama berlaku ketika AI mengatakan sudah melakukan sesuatu: kita perlu melihat bukti tindakannya, bukan hanya percaya pada kalimatnya.",
    next: "Cek klaim tindakan AI →",
  },
  {
    id: "2.8",
    lesson: 2,
    title: "“Sudah saya kerjakan” perlu diperiksa",
    paragraphs: [
      "Model yang bagus pada satu tugas belum tentu sama baiknya pada tugas lain. Versi, konteks, alat, dan cara memberi tugas dapat memengaruhi hasil. Satu jawaban saja belum cukup untuk menilai semua kemampuan model.",
      "Saat AI mengatakan sudah membuka artikel atau menjalankan tes, periksa apakah alatnya memang tersedia dan apakah ada hasil yang bisa dilihat. Kalimat “sudah saya kerjakan” perlu dicocokkan dengan pekerjaan yang dimaksud.",
    ],
    extra: "",
    transition:
      "Kita sudah bertemu cukup banyak istilah. Sebelum menutup pelajaran ini, kita susun hubungannya agar tidak terasa seperti kumpulan istilah yang berdiri sendiri.",
    next: "Hubungkan istilahnya →",
  },
  {
    id: "2.9",
    lesson: 2,
    title: "Merangkai istilah yang sudah dipelajari",
    paragraphs: [
      "Otomatisasi menggambarkan proses yang berjalan tanpa terus dioperasikan. Machine learning menjelaskan bagaimana model belajar dari data. Deep learning adalah salah satu jenis machine learning. Generatif menjelaskan kemampuan menghasilkan konten.",
      "Istilah-istilah ini membantu kita bertanya lebih tepat tentang sebuah fitur: tugasnya apa, prosesnya bagaimana, dan hasilnya perlu diperiksa dengan cara apa?",
    ],
    extra: "",
    transition:
      "Peta tadi baru berguna kalau bisa dipakai untuk membaca kasus baru. Sekarang coba terapkan pada fitur yang cara kerjanya belum kita ketahui.",
    next: "Cek pemahaman pelajaran 2 →",
  },
  {
    id: "2.check",
    lesson: 2,
    title: "Cek pemahaman pelajaran 2",
    paragraphs: [
      "Aplikasi punya tombol ‘Perbaiki otomatis’. Hasilnya berbeda pada setiap foto. Apakah informasi itu cukup untuk memastikan fitur memakai machine learning?",
    ],
    extra: "",
    transition:
      "Kita sudah punya gambaran tentang aturan, data, model, dan cara hasilnya dibuat. Pelajaran terakhir akan membawa semua itu kembali ke situasi sehari-hari: kapan AI membantu, apa yang tetap perlu kita pikirkan, dan bagaimana memeriksa hasilnya sebelum dipakai.",
    next: "Mulai pelajaran 3 →",
  },
  {
    id: "3.1",
    lesson: 3,
    title: "Lihat tugasnya satu per satu",
    paragraphs: [
      "Membuat proposal melibatkan banyak tugas: mencari informasi, membaca dokumen, menyusun slide, dan menentukan rekomendasi. AI mungkin membantu beberapa di antaranya. Namun, kamu tetap perlu memahami kebutuhan tim, hubungan dengan sponsor, dan alasan memilih suatu usulan.",
      "Untuk menentukan bantuan yang tepat, pecah dulu pekerjaannya menjadi tugas-tugas kecil. Dari sana, lebih mudah melihat bagian yang bisa dibantu dan bagian yang perlu kamu periksa sendiri.",
    ],
    extra: "",
    transition:
      "Contoh proposal tadi menunjukkan bahwa satu pekerjaan terdiri dari banyak tugas, dan tidak semuanya terdampak AI dengan cara yang sama. Ini penting ketika kita membaca klaim atau angka tentang dampak AI terhadap pekerjaan.",
    next: "Pahami angka tentang pekerjaan →",
  },
  {
    id: "3.2",
    lesson: 3,
    title: "Apa arti pekerjaan “terpapar AI”?",
    paragraphs: [
      "Dalam penelitian, paparan AI menggambarkan potensi tugas dalam pekerjaan untuk dipengaruhi kemampuan AI. Cara mengukurnya mengikuti studi yang dipakai. Angka itu belum menunjukkan berapa orang yang akan kehilangan pekerjaan.",
      "Artikel ILO pada 2026 menyebut paparan AI generatif pada pekerja muda Indonesia usia 15–24 tahun sebesar 26,1%, dibanding 21,1% pada kelompok dewasa. Perbandingan ini menggambarkan potensi perubahan tugas pada dua kelompok tersebut.",
    ],
    extra:
      "- ILO menyebut sekitar 3–4% pekerjaan di Indonesia berada dalam kategori paparan tertinggi.\n- Pada kelompok pekerjaan dukungan administratif Indonesia, artikel tersebut menyebut 93,9% terpapar dan 67,5% berada pada kategori tertinggi. Ini angka untuk kelompok pekerjaan tersebut, bukan seluruh tenaga kerja Indonesia.\n- Dalam laporan Agustus 2026, Stanford Digital Economy Lab membahas pekerja AS usia 22–25 tahun pada bidang dengan paparan tinggi. Dengan data hingga Juni 2026, jumlah pekerjanya sekitar 19% di bawah pembanding yang dibentuk dari pertumbuhan kelompok sebaya dengan paparan lebih rendah. Penyesuaian lebih terlihat pada berkurangnya perekrutan. Temuan ini bersifat deskriptif: hasilnya belum menetapkan AI sebagai satu-satunya penyebab dan tidak bisa langsung dipakai untuk memprediksi Indonesia.",
    transition:
      "Angka-angka tadi memberi gambaran besar, tetapi belum menjawab apa yang perlu kamu lakukan sebagai pengguna. Jadi kita kembali ke hal yang lebih dekat: tugas apa yang sebenarnya ingin kamu kerjakan dengan lebih baik?",
    next: "Pilih kebutuhanmu sendiri →",
  },
  {
    id: "3.3",
    lesson: 3,
    title: "Mulai dari kebutuhan yang kamu punya",
    paragraphs: [
      "Kamu tidak harus membuat model sebesar ChatGPT untuk mulai memakai AI. Coba dari tugas yang memang kamu hadapi, seperti memahami materi, membaca penelitian, membuat desain, menulis kode, atau menyiapkan kegiatan.",
      "Pengembangan AI melibatkan infrastruktur, energi, chip, talenta, dan aplikasi. Sebagai pengguna, kamu bisa mulai dengan belajar menjelaskan kebutuhan, memilih bahan yang tepat, dan memeriksa hasil. Kemampuan itu tetap berguna saat alat yang kamu pakai berubah.",
    ],
    extra: "",
    transition:
      "Setelah tahu tugas yang ingin dibantu, tantangan berikutnya adalah menilai saran yang diberikan. Jawaban yang terdengar yakin belum tentu paling cocok dengan kebutuhanmu.",
    next: "Coba menilai saran AI →",
  },
  {
    id: "3.4",
    lesson: 3,
    title: "Saat saran AI terdengar meyakinkan",
    paragraphs: [
      "Automation bias adalah kecenderungan terlalu mengandalkan saran sistem otomatis. Penjelasan yang panjang dan percaya diri bisa membuat kita mengikuti AI tanpa mengecek apakah sarannya menjawab kebutuhan.",
      "Pengetahuan bidang membantu, tetapi orang yang berpengalaman pun bisa keliru. Saat menilai saran, lihat alasan dan informasi pendukungnya. Rasa yakin saja belum menunjukkan bahwa pilihan itu tepat.",
    ],
    extra:
      "sumber materi juga memuat penelitian diagnosis kulit tentang respons orang awam dan dokter terhadap saran AI. Itu contoh dalam konteks medis tertentu. Bacaan ini membantu membahas cara menilai saran; aktivitas tidak meminta peserta mendiagnosis kondisi medis.",
    transition:
      "Saat menilai saran tadi, kamu sebenarnya memakai beberapa kemampuan sekaligus: memahami tujuan, membaca konteks, menilai risiko, dan menggunakan pengetahuan yang kamu punya. Berikutnya kita beri nama kemampuan-kemampuan itu.",
    next: "Kenali kemampuan yang dipakai →",
  },
  {
    id: "3.5",
    lesson: 3,
    title: "Lima kemampuan yang tetap kamu perlukan",
    paragraphs: [
      "Saat memakai AI, kamu masih perlu menentukan tujuan, memahami bidangnya, memeriksa hal penting sesuai risikonya, memperhatikan orang dan situasi, serta terus belajar dari pengalaman.",
      "Kelima kemampuan ini bisa dilatih lewat tugas sehari-hari. Tidak ada daftar keterampilan yang menjamin pekerjaan akan bebas dari dampak AI, tetapi kemampuan tersebut membantu kamu menilai dan memakai hasil dengan lebih baik.",
    ],
    extra:
      "studi bantuan AI pada layanan pelanggan melaporkan manfaat produktivitas yang berbeda antarpekerja. Untuk memahami hasilnya, perhatikan siapa yang memakai, tugas yang dibantu, ukuran manfaat, dan versi penelitiannya. Hasil pada satu lingkungan belum menjadi perkiraan manfaat untuk semua pekerjaan.",
    transition:
      "Kemampuan itu tidak berkembang kalau semua proses berpikir diserahkan ke AI. Supaya lebih terlihat, mari bandingkan dua cara memakai AI untuk belajar.",
    next: "Bandingkan cara belajarnya →",
  },
  {
    id: "3.6",
    lesson: 3,
    title: "Tetap ikut memikirkan jawabannya",
    paragraphs: [
      "Dua orang memakai AI untuk tugas yang sama. Orang pertama meminta jawaban jadi, lalu menyalinnya. Orang kedua membuat draf sendiri, meminta kritik, memeriksa kritik itu, dan memilih bagian yang perlu direvisi.",
      "Pada cara kedua, ia tetap menyusun jawaban dan menilai masukan. Kritik AI pun bisa salah. Kamu boleh memakai yang membantu, memeriksa yang meragukan, dan mengabaikan yang tidak sesuai.",
    ],
    extra:
      "penelitian Microsoft Research dan Carnegie Mellon mengumpulkan laporan pengalaman 319 pekerja pengetahuan dengan 936 contoh penggunaan AI. Kepercayaan lebih tinggi pada AI berkaitan dengan upaya berpikir kritis yang dilaporkan lebih rendah pada tugas tertentu. Penelitian ini memakai laporan pengalaman, sehingga hasilnya tidak membuktikan bahwa semua pengguna AI menjadi kurang pintar.",
    transition:
      "Dari beberapa contoh tadi, pola kerjanya mulai terlihat. Kita ringkas menjadi empat langkah yang bisa dipakai lagi di banyak situasi.",
    next: "Coba empat langkahnya →",
  },
  {
    id: "3.7",
    lesson: 3,
    title: "Tentukan, gunakan, cek, putuskan",
    paragraphs: [
      "Tentukan: apa yang ingin kamu selesaikan?",
      "Gunakan: bagian mana yang bisa dibantu AI?",
      "Cek: apa yang perlu kamu periksa sebelum memakai hasilnya?",
      "Putuskan: bagian mana yang layak dipakai, dan siapa yang bertanggung jawab?",
      "Kamu bisa kembali ke langkah sebelumnya. Kalau menemukan informasi yang keliru, perjelas lagi kebutuhannya atau minta revisi.",
    ],
    extra: "",
    transition:
      "Proposal yang rapi belum tentu realistis. Setelah isinya terasa tepat, kita masih perlu memastikan bahwa janji yang ditulis benar-benar bisa dipenuhi oleh tim.",
    next: "Periksa komitmen dalam proposal →",
  },
  {
    id: "3.8",
    lesson: 3,
    title: "Pahami dulu sebelum memakai hasilnya",
    paragraphs: [
      "AI bisa mempercepat pembuatan ringkasan dan draf. Sebelum memakainya, kamu masih perlu memahami isi, memilih saran yang sesuai, dan memikirkan orang yang terdampak.",
      "Kalau keputusan berada di luar pengetahuan atau kewenanganmu, ajak pihak yang tepat untuk membahasnya. Hal yang sama berlaku saat AI membantu menulis, menganalisis, atau membuat kode: pahami bagian yang akan kamu gunakan.",
    ],
    extra: "",
    transition:
      "Sampai sini, proposal sudah melewati beberapa jenis pemeriksaan. Sekarang kita lihat apakah cara berpikir yang sama tetap berguna ketika situasinya berubah.",
    next: "Coba situasi lain →",
  },
  {
    id: "3.9",
    lesson: 3,
    title: "Sesuaikan pemeriksaan dengan klaimnya",
    paragraphs: [
      "Saat ingin memakai hasil AI, mulai dari pertanyaan yang perlu dijawab. Apakah kutipannya benar? Apakah pembayaran sudah masuk? Apakah data boleh dibagikan? Apakah kamu sudah memahami jawabannya?",
      "Pertanyaan yang berbeda membutuhkan pemeriksaan yang berbeda pula. Pilih langkah yang benar-benar membantu memastikan hal yang ingin kamu ketahui.",
    ],
    extra: "",
    transition:
      "Sebagai penutup, kita kembali ke masalah yang sering muncul: sebuah angka terdengar cocok untuk dipakai, tetapi sumbernya tidak ada. Apa yang seharusnya dilakukan?",
    next: "Cek pemahaman pelajaran 3 →",
  },
  {
    id: "3.check",
    lesson: 3,
    title: "Cek pemahaman pelajaran 3",
    paragraphs: [
      "AI memberi statistik yang cocok untuk proposal, tetapi tidak menyertakan sumber. Apa langkah berikutnya?",
    ],
    extra: "",
    transition: "",
    next: "Selesaikan materi →",
  },
];
export const fundamentalsIntroduction = [
  "Tanpa sadar, kamu mungkin sudah memakai AI saat membuka email, memilih lagu, mencari ide, atau meminta bantuan menulis. Kita sering melihat hasilnya, tetapi belum tentu tahu apa yang sebenarnya terjadi di balik fitur-fitur itu.",
  "Materi ini dimulai dari contoh yang dekat dengan keseharian, lalu perlahan masuk ke cara kerja AI dan cara menilai hasilnya. Kamu tidak perlu bisa coding. Ikuti saja alurnya, coba aktivitas yang ada, dan lihat pembahasannya setelah menjawab. Kalau ingin menggali lebih jauh, ada bagian “Kalau penasaran” yang bisa dibuka kapan saja.",
];
export const fundamentalsGlossary: string[][] = [
  [
    "AI",
    "Bidang yang mengembangkan sistem untuk mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten.",
  ],
  ["Otomatisasi", "Proses yang berjalan tanpa terus-menerus dioperasikan."],
  [
    "Aturan",
    "Ketentuan yang menentukan apa yang dilakukan sistem saat suatu kondisi terpenuhi.",
  ],
  [
    "Machine learning",
    "Pendekatan yang menyesuaikan model dari contoh data selama pelatihan.",
  ],
  [
    "Model",
    "Susunan perhitungan yang mengolah input menjadi hasil. Dalam machine learning, parameternya disesuaikan saat pelatihan.",
  ],
  [
    "Data",
    "Informasi yang dipakai untuk melatih, menguji, atau menggunakan sistem.",
  ],
  [
    "Input / output",
    "Informasi yang masuk ke sistem / hasil yang diberikan sistem.",
  ],
  [
    "Training",
    "Proses menyesuaikan model menggunakan data atau pengalaman yang disiapkan untuk pelatihan.",
  ],
  ["Inferensi", "Pemakaian model untuk memproses input dan memberikan hasil."],
  ["Label", "Target atau kategori yang diberikan pada contoh latihan."],
  ["Prediksi", "Perkiraan model dari input dan pola yang sudah dipelajari."],
  ["Generalisasi", "Kemampuan memakai pola yang dipelajari pada data baru."],
  [
    "Supervised learning",
    "Pelatihan dari contoh yang sudah memiliki target atau label.",
  ],
  [
    "Unsupervised learning",
    "Pendekatan untuk mencari struktur dalam data tanpa target jawaban seperti pada contoh berlabel.",
  ],
  [
    "Reinforcement learning",
    "Pembelajaran tindakan melalui umpan balik yang berkaitan dengan tujuan.",
  ],
  [
    "Deep learning",
    "Jenis machine learning yang memakai jaringan saraf buatan dengan banyak lapisan.",
  ],
  [
    "AI generatif",
    "AI yang menghasilkan konten, misalnya teks, gambar, suara, atau kode.",
  ],
  ["Model bahasa", "Model yang memproses atau menghasilkan bahasa."],
  ["Prompt", "Permintaan atau instruksi yang diberikan kepada AI."],
  [
    "Token",
    "Potongan yang diproses model, misalnya bagian kata atau tanda baca.",
  ],
  [
    "Multimodal",
    "Kemampuan memproses beberapa jenis informasi, misalnya teks dan gambar.",
  ],
  [
    "Benchmark",
    "Tugas atau kumpulan soal yang dipakai untuk mengukur kemampuan tertentu.",
  ],
  [
    "Simulasi",
    "Lingkungan, keadaan, atau hasil buatan yang dipakai untuk mencoba dan mempelajari sesuatu.",
  ],
  [
    "World model",
    "Model yang memperkirakan perubahan lingkungan, termasuk akibat suatu tindakan.",
  ],
  [
    "Agent",
    "Sistem yang memakai alat dan menjalankan langkah untuk mencapai tujuan.",
  ],
  [
    "Tool",
    "Alat yang bisa dipakai sistem, misalnya pencarian, pembaca file, atau terminal.",
  ],
  ["Konten sintetis", "Konten yang dibuat atau dimanipulasi secara buatan."],
  ["Deepfake", "Konten manipulasi yang meniru wajah atau suara seseorang."],
  [
    "Halusinasi AI",
    "Informasi keliru atau dibuat-buat yang disampaikan seolah-olah benar.",
  ],
  ["Sitasi", "Rujukan yang menunjukkan asal informasi."],
  ["Verifikasi", "Pemeriksaan klaim menggunakan bukti yang sesuai."],
  [
    "Automation bias",
    "Kecenderungan terlalu mengandalkan saran sistem otomatis.",
  ],
  [
    "Paparan pekerjaan",
    "Potensi tugas dalam pekerjaan untuk dipengaruhi AI menurut ukuran penelitian. Angkanya belum menunjukkan kepastian kehilangan pekerjaan.",
  ],
  ["Radiolog", "Dokter yang membaca dan menafsirkan gambar medis."],
  ["Mammogram", "Gambar yang dihasilkan dalam pemeriksaan mammografi."],
  [
    "Protein",
    "Molekul yang tersusun dari asam amino dan menjalankan berbagai fungsi dalam sel.",
  ],
  [
    "Struktur protein",
    "Bentuk tiga dimensi protein yang membantu peneliti memahami cara kerjanya.",
  ],
];
export const fundamentalsSources: { label: string; href: string }[] = [
  {
    label: "DeepMind — capaian IMO 2025",
    href: "https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/",
  },
  {
    label: "Nobel Prize — John Jumper dan AlphaFold2",
    href: "https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/",
  },
  {
    label: "Nature Medicine — AI-based triage and decision support, 2026",
    href: "https://www.nature.com/articles/s41591-026-04277-x",
  },
  {
    label: "PubMed — ringkasan studi mammografi yang sama",
    href: "https://pubmed.ncbi.nlm.nih.gov/41857202/",
  },
  {
    label: "Tesla — FSD Supervised",
    href: "https://www.tesla.com/support/fsd",
  },
  {
    label: "Disney Research — robot Olaf",
    href: "https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/",
  },
  {
    label: "FAA — TCAS II",
    href: "https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html",
  },
  {
    label: "OJK — bukti transfer palsu",
    href: "https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx",
  },
  {
    label: "OJK — penipuan suara dan wajah",
    href: "https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx",
  },
  {
    label: "OpenAI — Data Controls",
    href: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt",
  },
  {
    label: "Google — Gemini Privacy Hub",
    href: "https://support.google.com/gemini/answer/13594961",
  },
  {
    label: "Google — What is Machine Learning?",
    href: "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml",
  },
  {
    label: "Google — Overfitting",
    href: "https://developers.google.com/machine-learning/crash-course/overfitting/overfitting",
  },
  {
    label: "ILO — pasar kerja ASEAN",
    href: "https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited",
  },
  {
    label: "ILO — rincian ASEAN dan Indonesia",
    href: "https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets",
  },
  {
    label: "Stanford Digital Economy Lab — pekerja muda, Agustus 2026",
    href: "https://digitaleconomy.stanford.edu/news/canariesaug26/",
  },
  {
    label: "Komdigi — lima lapisan AI",
    href: "https://portal.komdigi.go.id/kanal-publik/berita-kini/10477",
  },
  {
    label: "Nature Medicine — explainable AI dan diagnosis kulit",
    href: "https://www.nature.com/articles/s41591-026-04553-w",
  },
  {
    label: "OECD — AI and skills",
    href: "https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html",
  },
  {
    label: "Generative AI at Work — paper",
    href: "https://arxiv.org/abs/2304.11771",
  },
  {
    label: "Microsoft Research — AI dan berpikir kritis",
    href: "https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/",
  },
];
