import type { Activity } from "./activities/types";
import type { DiagramSpec } from "./diagrams/types";

export type SectionPresentation = {
  kind: "tiles" | "stats" | "steps" | "compare" | "statement";
  label: string;
  title: string;
  detail?: string;
  items?: { title: string; detail: string }[];
  interactive?: boolean;
  bodyLabels?: string[];
  visual?:
    | { layout: "logos" | "feature"; items: { src: string; alt: string; caption: string; source: string; credit: string; width: number; height: number }[] }
    /** Diagram konsep menggantikan foto yang tidak menjelaskan mekanismenya. */
    | { layout: "diagram"; diagram: DiagramSpec };
  reflection?: { question: string; answer: string };
  /** Blok latihan yang menggantikan panel di bagian ini. */
  activity?: Activity;
  bridge: string;
};

const visuals = {
  protein: { layout: "feature" as const, items: [{ src: "/course-visuals/alphafold-protein.webp", alt: "Prediksi struktur tiga dimensi protein yang dihasilkan AlphaFold", caption: "Contoh model struktur protein yang diprediksi AlphaFold.", source: "https://commons.wikimedia.org/wiki/File:AF-P0CH12-F1.png", credit: "AlphaFold · CC0", width: 417, height: 485 }] },
  mammogram: { layout: "feature" as const, items: [{ src: "/course-visuals/mammography-machine.webp", alt: "Mesin pemeriksaan mammografi di ruang pemeriksaan", caption: "Mesin mammografi mengambil gambar yang kemudian diperiksa radiolog. Foto: Bill Branson / National Cancer Institute.", source: "https://commons.wikimedia.org/wiki/File:Mammography_machine.jpg", credit: "Public domain · NCI", width: 1280, height: 853 }] },
  olaf: { layout: "feature" as const, items: [{ src: "/course-visuals/olaf-robot.webp", alt: "Robot Olaf berdiri di jalan bersalju dalam proyek Disney Research", caption: "Robot Olaf belajar berjalan dengan reinforcement learning dan diuji lewat simulasi. Foto: Disney Research.", source: "https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/", credit: "Disney Research", width: 1024, height: 682 }] },
  bankJagoReceipt: { layout: "feature" as const, items: [{ src: "/course-visuals/bankjago-receipt.webp", alt: "Contoh struk digital dari aplikasi Bank Jago dengan nomor rekening disamarkan", caption: "Contoh struk digital Bank Jago. Penjual tetap perlu mengecek mutasi rekeningnya sendiri.", source: "https://commons.wikimedia.org/wiki/File:Example_of_PAN_truncation_in_digital_receipt.webp", credit: "VulcanSphere · public domain", width: 469, height: 423 }] },
};

export const sectionPresentations: SectionPresentation[][] = [
  [
    { kind: "tiles", label: "PETA AWAL", title: "AI hadir dalam banyak bentuk", visual: { layout: "logos", items: [
      { src: "/course-visuals/chatgpt-logo.svg", alt: "Logo ChatGPT", caption: "ChatGPT", source: "https://commons.wikimedia.org/wiki/File:ChatGPT-Logo.svg", credit: "Logo OpenAI", width: 44, height: 44 },
      { src: "/course-visuals/gemini-logo.svg", alt: "Ikon Google Gemini", caption: "Gemini", source: "https://commons.wikimedia.org/wiki/File:Google_Gemini_icon_2025.svg", credit: "Logo Google", width: 44, height: 44 },
    ] }, items: [
      { title: "Sehari-hari", detail: "Filter email membantu memisahkan pesan spam; aplikasi musik merekomendasikan lagu." },
      { title: "Sains", detail: "AI membantu memprediksi bentuk protein dan menyelesaikan soal matematika." },
      { title: "Kesehatan", detail: "AI membantu radiolog memeriksa gambar hasil mammografi." },
      { title: "Robot dan tugas digital", detail: "Robot bisa dilatih bergerak; sistem AI juga bisa memakai alat digital untuk mengerjakan beberapa langkah." },
    ], bridge: "Sesudah melihat AI di sekitar kita, mari lihat contoh kemampuan yang lebih jauh di sains." },
    { kind: "stats", label: "CONTOH KEMAMPUAN", title: "35 / 42 poin", detail: "Versi khusus Gemini Deep Think meraih standar medali emas pada IMO 2025. Hasil ini berlaku untuk tantangan tersebut.", visual: visuals.protein, items: [
      { title: "AlphaFold2", detail: "AlphaFold2 membantu memprediksi bentuk tiga dimensi protein dari urutan asam amino." },
    ], bridge: "Kemampuan di sains membuka pertanyaan berikutnya: apa yang terjadi saat AI dipakai untuk keputusan kesehatan?" },
    { kind: "stats", label: "BACA SELURUH HASIL", activity: { kind: "estimate", question: "Deteksi kanker naik 15,2%. Menurutmu, berapa persen kenaikan pasien yang diminta datang kembali untuk pemeriksaan lanjutan?", min: 0, max: 40, step: 0.1, unit: "persen", answer: 14.8, tolerance: 4, reveal: "Pasien yang dipanggil kembali naik 14,8%. Manfaat dan beban tambahan datang bersamaan, jadi satu angka saja tidak cukup untuk menilai sebuah sistem.", source: { label: "Studi pemeriksaan payudara", url: "https://doi.org/10.1016/S1470-2045(23)00298-X" } }, title: "31.301 perempuan", detail: "Dalam studi pemeriksaan payudara ini, AI mengurangi tugas membaca gambar bagi radiolog, tetapi lebih banyak pasien juga diminta menjalani pemeriksaan lanjutan.", visual: visuals.mammogram, items: [
      { title: "−63,6%", detail: "Tugas membaca gambar oleh radiolog berkurang dalam strategi yang diuji." },
      { title: "+15,2%", detail: "Tingkat deteksi kanker meningkat dibanding strategi standar." },
      { title: "+14,8%", detail: "Pasien yang diminta datang kembali untuk pemeriksaan lanjutan meningkat." },
    ], bridge: "Dari gambar medis, kita beralih ke input lain yang bisa diproses AI, seperti suara dan video." },
    { kind: "tiles", label: "MULTIMODAL", title: "Input AI tidak hanya teks", items: [
      { title: "Gambar", detail: "Foto atau kamera bisa menunjukkan keadaan yang sulit dijelaskan hanya dengan kata-kata." },
      { title: "Suara", detail: "AI bisa mengubah ucapan menjadi teks atau mengenali pola suara." },
      { title: "Video", detail: "AI bisa memproses gerakan dan urutan kejadian dalam video." },
      { title: "Dokumen", detail: "Isi PDF atau tampilan layar bisa dipakai sebagai konteks saat bertanya." },
    ], bridge: "Ketika AI memproses lingkungan, langkah berikutnya adalah memahami akibat tindakannya di dunia fisik." },
    { kind: "steps", label: "AI FISIK", activity: { kind: "arrange", instruction: "Susun urutan kerja robot sebelum sebuah gerakan dijalankan di dunia nyata.", items: [{ id: "uji", label: "Uji: coba gerakan dalam simulasi" }, { id: "amati", label: "Amati: tangkap kondisi sekitar dengan sensor" }, { id: "awasi", label: "Awasi: manusia menilai keamanannya" }, { id: "perkirakan", label: "Perkirakan: hitung akibat tindakan" }], answer: ["amati", "perkirakan", "uji", "awasi"], hint: "Mengamati lebih dulu; manusia menutup putaran.", reveal: "Amati → Perkirakan → Uji → Awasi. Simulasi datang sebelum robot sungguhan, dan penilaian manusia menutup putarannya." }, title: "Dari percobaan ke tindakan", visual: visuals.olaf, items: [
      { title: "Amati", detail: "Kamera atau sensor menangkap kondisi di sekitar robot." },
      { title: "Perkirakan", detail: "Model memperkirakan akibat dari tindakan yang akan dicoba." },
      { title: "Uji", detail: "Gerakan bisa dicoba dalam simulasi sebelum diuji pada robot sungguhan." },
      { title: "Awasi", detail: "Manusia memeriksa apakah perilaku robot cukup aman di dunia nyata." },
    ], bridge: "Selain robot di dunia fisik, AI agent juga bisa mengambil langkah memakai alat digital." },
    { kind: "compare", label: "BEDAKAN CARANYA", title: "Menjawab atau melakukan?", visual: { layout: "diagram", diagram: { id: "agent-loop", caption: "Chatbot berhenti pada jawaban. Agent melanjutkannya: menyusun rencana, memakai alat, lalu memeriksa hasilnya. Kamu yang menutup putaran." } }, interactive: true, items: [
      { title: "Chatbot", detail: "Chatbot menerima pertanyaan, lalu memberi jawaban atau saran dalam percakapan." },
      { title: "AI agent", detail: "AI agent menerima tujuan, menyusun langkah, memakai alat, lalu memeriksa hasilnya." },
    ], bridge: "Semakin besar kemampuan bertindak, semakin penting memeriksa bukti dan hasil yang kita terima." },
    { kind: "statement", label: "CONTOH SEHARI-HARI", reflection: { question: "Kalau bukti transfer terlihat asli, apa yang masih perlu dicek?", answer: "Periksa riwayat transaksi di aplikasi bankmu. Gambar bukti transfer bisa dipalsukan, sedangkan catatan transaksi bank menunjukkan apakah uangnya benar-benar masuk." }, title: "Terlihat asli belum berarti terverifikasi.", detail: "Di warung atau toko online, bukti transfer atau QRIS bisa diedit. Cek mutasi rekening atau status pembayaran di aplikasi merchant sebelum menyerahkan barang.", visual: visuals.bankJagoReceipt, bridge: "Dari bukti palsu untuk penipuan, kita lanjut ke konten sintetis yang juga dapat merugikan orang." },
    { kind: "statement", label: "DAMPAK MANUSIA", title: "Gambar palsu bisa menimbulkan kerugian nyata.", detail: "Gambar atau video palsu dapat merusak privasi, reputasi, dan rasa aman orang yang menjadi korban.", bridge: "Setelah memikirkan dampak pada orang lain, periksa juga data yang kita sendiri berikan kepada alat AI." },
    { kind: "steps", label: "SEBELUM MENGUNGGAH", title: "Empat pertanyaan untuk datamu", items: [
      { title: "Data apa?", detail: "Pilih hanya data yang diperlukan untuk tugasmu." },
      { title: "Punya izin?", detail: "Pastikan kamu boleh membagikan data milik orang lain atau tempat kerja." },
      { title: "Dikirim ke siapa?", detail: "Periksa layanan yang menerima dan menggunakan datamu." },
      { title: "Disimpan berapa lama?", detail: "Baca pengaturan penyimpanan dan penggunaan data pada layanan tersebut." },
    ], bridge: "Setelah memeriksa data yang kita unggah, kita juga perlu memeriksa jawaban yang diberikan AI." },
    { kind: "compare", label: "PERIKSA KLAIM", activity: { kind: "spot", mode: "flaw", lead: "Kamu meminta AI merangkum aturan penggunaan AI di kampus. Ini jawabannya. Dua kalimat perlu diperiksa sebelum dipakai.", spans: [{ id: "aman1", text: "Panduan kampus meminta mahasiswa menyebutkan bantuan AI pada tugas.", target: false, why: "Kalimat ini ada di dokumen panduan." }, { id: "angka", text: "Sebanyak 87% dosen menyetujui aturan ini.", tag: "Angka tanpa sumber", target: true, why: "Tidak ada survei yang dirujuk. Angka sepresisi ini perlu sumber yang bisa dibuka." }, { id: "aman2", text: "Mahasiswa tetap bertanggung jawab atas isi tugasnya.", target: false, why: "Ini pernyataan yang konsisten dengan panduan." }, { id: "sitasi", text: "Aturan serupa sudah berlaku di seluruh kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12).", tag: "Sitasi yang tidak bisa diperiksa", target: true, why: "Judul dan nomor halamannya terdengar rapi, tetapi dokumen itu tidak dirujuk ke sumber yang bisa dibuka. Jawaban yang rapi bukan bukti." }], requiredHits: 2, reveal: "Dua bagian itu perlu dicek ke sumber aslinya: angka yang muncul tanpa rujukan, dan sitasi yang terdengar resmi tetapi tidak bisa dibuka." }, title: "Jawaban yang terdengar yakin belum tentu benar", items: [
      { title: "Jawaban AI", detail: "Jawaban AI bisa terdengar rapi meski angka, kutipan, atau kesimpulannya salah." },
      { title: "Sumber asli", detail: "Buka dokumen, aturan kampus, atau penelitian asli sebelum memakai klaim penting." },
    ], bridge: "Kalau sistem bisa salah, pertanyaan dasarnya muncul: sistem otomatis seperti apa yang sebenarnya disebut AI?" },
    { kind: "compare", label: "JEMBATAN PELAJARAN", title: "Otomatis belum tentu memakai AI", items: [
      { title: "Aturan", detail: "Sistem mengikuti aturan yang ditulis manusia, misalnya sensor parkir yang berbunyi pada jarak tertentu." },
      { title: "Model AI", detail: "Model machine learning belajar mengenali pola dari banyak contoh data." },
    ], bridge: "Di pelajaran berikutnya, kita akan menelusuri perbedaan aturan biasa, machine learning, dan generative AI." },
  ],
  [
    { kind: "compare", label: "MULAI DARI YANG DIKENAL", reflection: { question: "Apakah semua sistem yang bekerja otomatis disebut AI?", answer: "Tidak. Ada sistem yang cukup mengikuti aturan yang ditulis manusia. Cara kerjanya perlu dilihat sebelum memberi label AI." }, title: "Sistem otomatis punya beragam cara kerja", visual: { layout: "feature", items: [{ src: "/course-visuals/tcas-symbology.webp", alt: "Diagram simbol TCAS untuk pesawat sendiri, pesawat lain, dan tingkat ancaman", caption: "Contoh sistem otomatis yang memberi peringatan saat pesawat terlalu dekat.", source: "https://www.faa.gov/lessons_learned/transport_airplane/accidents/RA-85816", credit: "FAA", width: 748, height: 352 }] }, items: [
      { title: "Sensor parkir", detail: "Sensor parkir berbunyi ketika kendaraan terlalu dekat dengan objek di sekitarnya." },
      { title: "Model machine learning", detail: "Model dilatih dengan banyak contoh agar bisa mengenali pola pada data baru." },
    ], bridge: "Aturan tetap berguna. Namun bagaimana jika pola yang ingin dikenali terlalu banyak untuk ditulis satu per satu?" },
    { kind: "tiles", label: "MASALAH POLA", title: "Aturan untuk foto cepat menjadi rumit", visual: { layout: "diagram", diagram: { id: "classify-boundary", caption: "Alih-alih menulis aturan satu per satu, model menarik batas dari contoh. Tambah contoh, batasnya bergeser." } }, items: [
      { title: "Cahaya berubah", detail: "Foto kucing yang sama bisa tampak berbeda saat terang dan gelap." },
      { title: "Sudut kamera", detail: "Kucing dari samping terlihat berbeda dari kucing yang menghadap kamera." },
      { title: "Sebagian tertutup", detail: "Wajah atau tubuh hewan bisa tertutup sehingga cirinya tidak lengkap." },
    ], bridge: "Ketika daftar aturan tidak praktis, kita dapat memberi contoh dan melatih sebuah model." },
    { kind: "steps", label: "COBA IKUTI ALURNYA", activity: { kind: "arrange", instruction: "Susun alur melatih dan memakai sebuah model pengenal gambar.", items: [{ id: "model", label: "Model: hasil pelatihan yang siap dipakai" }, { id: "data", label: "Data: foto berlabel kucing dan anjing" }, { id: "prediksi", label: "Prediksi: jawaban untuk foto baru" }, { id: "training", label: "Training: model menyesuaikan diri dari contoh" }], answer: ["data", "training", "model", "prediksi"], hint: "Tidak ada model sebelum ada yang dipelajari.", reveal: "Data → Training → Model → Prediksi. Model tidak diberi aturan satu per satu; ia menyesuaikan diri dari contoh yang sudah berlabel." }, title: "Dari contoh ke prediksi", interactive: true, items: [
      { title: "Data", detail: "Kumpulkan foto kucing dan anjing dengan label yang benar." },
      { title: "Training", detail: "Model dilatih untuk membedakan pola dari foto-foto tersebut." },
      { title: "Model", detail: "Foto baru menjadi input bagi model yang sudah dilatih." },
      { title: "Output", detail: "Model memprediksi ‘kucing’ atau ‘anjing’; prediksi ini masih bisa salah." },
    ], bridge: "Itu satu cara belajar. Sekarang bandingkan beberapa jenis contoh dan umpan balik yang dipakai model." },
    { kind: "tiles", label: "TIGA PENDEKATAN", title: "Belajar dari label, pola, atau umpan balik", items: [
      { title: "Supervised learning", detail: "Model belajar dari contoh yang sudah diberi label, seperti email spam atau bukan spam." },
      { title: "Unsupervised learning", detail: "Model mencari kelompok atau kemiripan dalam data yang belum diberi label." },
      { title: "Reinforcement learning", detail: "Model mencoba tindakan dan memperbaikinya berdasarkan umpan balik." },
    ], bridge: "Semua pendekatan itu berhadapan dengan data yang makin rumit, seperti gambar, suara, dan bahasa." },
    { kind: "steps", label: "POLA BERTINGKAT", visual: { layout: "diagram", diagram: { id: "train-vs-infer", caption: "Training dan prediksi adalah dua fase yang berbeda. Yang kamu pakai sehari-hari adalah fase kanan, yaitu model yang sudah selesai belajar." } }, title: "Deep learning mempelajari hubungan kompleks", items: [
      { title: "Input", detail: "Foto, suara, atau teks menjadi data yang diproses model." },
      { title: "Lapisan model", detail: "Jaringan saraf buatan mempelajari hubungan antarpola melalui banyak lapisan." },
      { title: "Output", detail: "Hasilnya bisa berupa label objek pada foto, teks dari ucapan, atau prediksi lain." },
    ], bridge: "Model bukan hanya mengenali pola. Sebagian dapat menghasilkan konten baru." },
    { kind: "compare", label: "KENALI TUGASNYA", title: "Mengenali atau menghasilkan?", items: [
      { title: "AI prediktif", detail: "Contohnya filter spam yang memberi label atau sistem yang memperkirakan risiko." },
      { title: "Generative AI", detail: "Contohnya model yang membuat teks, gambar, suara, video, atau kode baru." },
    ], bridge: "Model bahasa adalah contoh generatif yang akrab kita pakai. Mengapa jawabannya bisa begitu lancar?" },
    { kind: "steps", label: "MODEL BAHASA", visual: { layout: "diagram", diagram: { id: "token-stream", caption: "Jawaban disusun sepotong demi sepotong dari bobot pola, bukan dari pencarian fakta. Karena itu kalimat yang lancar belum tentu benar." } }, title: "Bagaimana model bahasa menyusun jawaban", items: [
      { title: "Input", detail: "Kamu mengirim prompt berisi pertanyaan dan konteks." },
      { title: "Pola yang dipelajari", detail: "Model memakai pola bahasa yang dipelajari saat training." },
      { title: "Output", detail: "Model menyusun jawaban bagian demi bagian berdasarkan input tadi." },
    ], bridge: "Kelancaran ini mengesankan, tetapi belum menjamin model bekerja baik pada semua tugas." },
    { kind: "compare", label: "BATAS KEMAMPUAN", visual: { layout: "diagram", diagram: { id: "citation-chain", caption: "Klaim dan sitasi bisa terlihat rapi tanpa dokumen yang benar-benar bisa dibuka. Mata rantai terakhir itulah yang perlu kamu periksa." } }, title: "Klaim AI perlu bukti yang bisa diperiksa", items: [
      { title: "Klaim", detail: "AI mungkin mengatakan sudah membuka link atau menjalankan pengujian." },
      { title: "Bukti", detail: "Lihat halaman yang dibuka, file yang berubah, atau hasil pengujian yang benar-benar ada." },
    ], bridge: "Kita sudah mengenal mekanismenya. Sekarang rangkum istilah yang sering tercampur." },
    { kind: "tiles", label: "PETA ISTILAH", title: "Empat istilah, empat peran", items: [
      { title: "Otomatisasi", detail: "Sistem menjalankan langkah tertentu tanpa harus dioperasikan terus-menerus." },
      { title: "Machine learning", detail: "Model dilatih dengan data untuk mengenali pola pada contoh baru." },
      { title: "Deep learning", detail: "Jenis machine learning yang memakai jaringan saraf buatan berlapis." },
      { title: "Generative AI", detail: "Model membuat konten baru, misalnya teks atau gambar." },
    ], bridge: "Dengan dasar ini, kita bisa melihat perubahan pekerjaan dan cara manusia tetap memegang keputusan." },
  ],
  [
    { kind: "steps", label: "LIHAT TUGASNYA", title: "Satu pekerjaan berisi banyak keputusan", items: [
      { title: "Cari informasi", detail: "Analis membaca dokumen dan mencari data yang relevan." },
      { title: "Susun draf", detail: "AI dapat membantu merangkum dokumen atau membuat draf presentasi." },
      { title: "Pilih rekomendasi", detail: "Manusia menimbang konteks perusahaan sebelum memilih saran." },
      { title: "Tanggung jawab", detail: "Manusia menjelaskan alasan keputusan dan menanggung akibatnya." },
    ], bridge: "Jika tugas yang berubah tidak sama, data pekerjaan juga perlu dibaca dengan cermat." },
    { kind: "stats", label: "POTENSI DAMPAK PADA PEKERJAAN", activity: { kind: "estimate", question: "Menurut ILO, berapa persen pekerjaan di Indonesia yang punya sebagian tugas berpotensi terdampak generative AI?", min: 0, max: 60, step: 0.1, unit: "persen pekerjaan", answer: 21.7, tolerance: 6, reveal: "Sekitar 21,7%. Perhatikan kata ‘sebagian tugas’: ini bukan jumlah pekerja yang pasti kehilangan pekerjaan, melainkan pekerjaan yang sebagian tugasnya bisa berubah.", source: { label: "ILO · potensi dampak generative AI", url: "https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" } }, title: "21,7%", detail: "Menurut ILO, sekitar 21,7% pekerjaan di Indonesia memiliki sebagian tugas yang berpotensi terdampak generative AI. Ini bukan angka pekerja yang pasti kehilangan pekerjaan.", bodyLabels: ["Rincian Indonesia", "Sinyal dari Amerika Serikat"], items: [
      { title: "3-4%", detail: "Sekitar 3-4% pekerjaan di Indonesia masuk kategori dengan paling banyak tugas yang bisa dipengaruhi AI." },
      { title: "26,1%", detail: "Sekitar 26,1% pekerjaan pada kelompok usia 15-24 tahun memiliki tugas yang berpotensi terdampak AI." },
    ], bridge: "Angka memberi gambaran umum. Sekarang tanyakan apa yang dapat dilakukan mahasiswa Indonesia secara nyata." },
    { kind: "tiles", label: "PELUANG LOKAL", title: "Tidak semua orang perlu membuat model besar", items: [
      { title: "Saat belajar", detail: "Gunakan AI untuk mencari penjelasan, lalu cek informasi pentingnya." },
      { title: "Saat riset", detail: "AI dapat membantu membuat ringkasan awal; kamu tetap membuka sumber asli." },
      { title: "Saat berkarya", detail: "AI dapat membantu membuat draf desain, kode, atau ide bisnis." },
    ], bridge: "Memakai AI tetap perlu kewaspadaan: saran yang terdengar yakin bisa memengaruhi keputusan kita." },
    { kind: "compare", label: "AUTOMATION BIAS", title: "Saran AI perlu ditimbang", items: [
      { title: "Langsung ikut AI", detail: "Mengganti penilaian sendiri hanya karena penjelasan AI terdengar yakin." },
      { title: "Periksa saran AI", detail: "Bandingkan dengan pengetahuan bidang dan bukti yang tersedia." },
    ], bridge: "Agar bisa menimbang saran seperti itu, ada beberapa kemampuan yang perlu terus dilatih." },
    { kind: "tiles", label: "BEKAL YANG DILATIH", title: "Lima kemampuan yang saling melengkapi", bodyLabels: ["Kemampuan dalam praktik", "Terus menyesuaikan diri", "Contoh manfaat yang terukur"], items: [
      { title: "Tentukan tujuan", detail: "Tahu masalah apa yang ingin diselesaikan sebelum meminta bantuan AI." },
      { title: "Pahami bidangmu", detail: "Pengetahuan bidang membantu melihat kesalahan pada hasil AI." },
      { title: "Cek sesuai risiko", detail: "Periksa lebih teliti ketika akibat kesalahan lebih besar." },
      { title: "Pahami konteks", detail: "Pertimbangkan orang dan situasi yang tidak terlihat dalam prompt." },
      { title: "Terus belajar", detail: "Perbarui keterampilan saat alat dan tugas kerja berubah." },
    ], bridge: "Kemampuan itu berkembang jika kita tetap mengerjakan bagian berpikir, bukan menyalin semua hasil AI." },
    { kind: "compare", label: "DUA CARA MEMAKAI AI", title: "Mana yang melatih pikiranmu?", items: [
      { title: "Serahkan semuanya", detail: "Minta jawaban jadi, lalu salin tanpa memeriksa." },
      { title: "Minta AI mengkritik draf", detail: "Buat jawaban awal sendiri, minta AI mencari kelemahannya, lalu periksa dan perbaiki." },
    ], bridge: "Agar cara kedua lebih mudah diterapkan, gunakan kerangka empat langkah sederhana." },
    { kind: "steps", label: "LATIHAN KECIL", reflection: { question: "Pada langkah mana keputusan akhir tetap ada padamu?", answer: "Pada langkah Putuskan. Kamu dapat memakai AI untuk membantu, lalu memeriksa hasil dan menentukan tindakan sesuai konteks." }, title: "Tentukan → Gunakan → Cek → Putuskan", interactive: true, bodyLabels: ["Periksa dan putuskan", "Contoh proposal sponsor"], items: [
      { title: "Tentukan", detail: "Apa masalah yang sebenarnya ingin kamu selesaikan?" },
      { title: "Gunakan", detail: "Bagian mana yang cocok dibantu AI?" },
      { title: "Cek", detail: "Klaim, angka, dan sumber apa yang harus dibuka lagi?" },
      { title: "Putuskan", detail: "Apa yang layak dipakai dan siapa yang bertanggung jawab?" },
    ], bridge: "Empat langkah ini menjaga satu hal: arah dan penilaian tetap berada pada manusia." },
    { kind: "statement", label: "PERAN MANUSIA", title: "Manusia menentukan tujuan dan menilai hasil AI.", detail: "AI dapat mempercepat pekerjaan. Kita tetap memilih arah, memahami konteks, memeriksa kualitas, dan bertanggung jawab atas hasilnya.", bridge: "Bekal ini paling terasa saat dicoba dalam situasi nyata. Mari lanjutkan ke latihan NUSA Lab." },
    { kind: "tiles", label: "BAWA KE PRAKTIK", title: "Coba penilaianmu pada situasi nyata", items: [
      { title: "Kutipan dari AI", detail: "Buka tulisan asli untuk memastikan kutipan dan sumbernya benar." },
      { title: "Bukti transfer", detail: "Cek riwayat transaksi di aplikasi bank, bukan hanya tangkapan layar." },
      { title: "Data pribadi", detail: "Tanya dulu apakah informasi itu boleh dikirim ke layanan AI." },
      { title: "Tugas kuliah", detail: "Gunakan AI sebagai bantuan tanpa menyerahkan seluruh proses berpikir." },
    ], bridge: "Selesaikan cek pemahaman, lalu gunakan bekal ini saat belajar atau bekerja dengan AI." },
  ],
];
