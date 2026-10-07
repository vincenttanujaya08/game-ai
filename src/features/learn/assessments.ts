import type { CourseId } from "./courses";

export type AssessmentQuestion = { prompt: string; choices: string[]; answer: number; feedback: string };
export type CourseAssessment = { pre: AssessmentQuestion[]; post: AssessmentQuestion[]; reflection: string };

const aiLiteracyQuestions: AssessmentQuestion[] = [
  {
    "prompt": "Aplikasi musik merekomendasikan lagu berdasarkan kebiasaan mendengarmu. Penjelasan mana yang paling tepat?",
    "choices": [
      "Sistem menilai kualitas lagu, lalu memilih yang paling sesuai dengan selera musik secara umum.",
      "Sistem mengenali pola aktivitas untuk memperkirakan lagu yang mungkin kamu sukai.",
      "Sistem membentuk profil kepribadian untuk memahami alasanmu menyukai sebuah lagu.",
      "Sistem menyusun daftar lagu populer, lalu menyesuaikan urutannya dengan waktu kamu mendengarkan."
    ],
    "answer": 1,
    "feedback": "Rekomendasi memperkirakan kecocokan dari pola aktivitas, bukan memahami alasan pribadi pengguna."
  },
  {
    "prompt": "Sebuah model dilatih mengenali buah menggunakan foto yang sebagian besar diambil dengan pencahayaan terang. Model kemudian kesulitan mengenali buah dalam foto gelap. Apa penjelasan paling masuk akal?",
    "choices": [
      "Pola yang dipelajari belum cukup mewakili kondisi foto yang digunakan saat ini.",
      "Model perlu diberi nama buah dalam instruksi agar dapat mengenalinya dalam kondisi berbeda.",
      "Jumlah foto pelatihan lebih menentukan daripada variasi pencahayaan dalam foto tersebut.",
      "Hasil ini menunjukkan bahwa pengenalan buah lebih cocok menggunakan aturan daripada model terlatih."
    ],
    "answer": 0,
    "feedback": "Variasi data pelatihan memengaruhi kemampuan model bekerja pada kondisi baru."
  },
  {
    "prompt": "Chatbot menghasilkan jawaban terperinci tentang sebuah buku, tetapi beberapa kejadian yang disebutkan tidak ada di buku tersebut. Mengapa hal ini bisa terjadi?",
    "choices": [
      "Chatbot mengambil ringkasan buku dari sumber yang berbeda, sehingga rincian ceritanya ikut berubah.",
      "Chatbot mempersingkat isi buku dan menggabungkan kejadian untuk memudahkan pembaca.",
      "Chatbot menyusun teks berdasarkan pola dan konteks, sehingga detail yang masuk akal bisa muncul tanpa dasar faktual.",
      "Chatbot menafsirkan cerita secara kreatif karena pertanyaan pengguna belum meminta kutipan langsung."
    ],
    "answer": 2,
    "feedback": "Model bahasa dapat menghasilkan detail yang masuk akal tetapi tidak didukung sumber; ini disebut halusinasi."
  },
  {
    "prompt": "Sebuah AI memperoleh skor tinggi dalam pengujian matematika. Temanmu menyimpulkan bahwa AI tersebut juga dapat dipercaya untuk menjelaskan aturan asuransi. Bagaimana menilai kesimpulan itu?",
    "choices": [
      "Cukup beralasan, karena matematika menguji ketelitian yang juga dibutuhkan untuk membaca aturan.",
      "Cukup beralasan apabila penjelasan asuransinya konsisten ketika pertanyaan diulang.",
      "Belum cukup, karena penjelasan aturan lebih ditentukan oleh panjang dokumen daripada kemampuan model.",
      "Belum cukup, karena kemampuan pada tugas lain tetap perlu diperiksa dengan sumber dan pengujian yang sesuai."
    ],
    "answer": 3,
    "feedback": "Hasil benchmark berlaku pada tugas dan kondisi yang diuji, bukan jaminan kemampuan pada semua tugas."
  },
  {
    "prompt": "Dua chatbot memberi angka yang sama tentang pengangguran. Salah satunya menyertakan tautan ke sebuah laporan. Apa langkah paling kuat sebelum kamu membagikan angka tersebut?",
    "choices": [
      "Membuka laporan dan mencocokkan angka, periode, serta kelompok yang dihitung dengan klaimnya.",
      "Meminta kedua chatbot menjelaskan perhitungannya, lalu membandingkan apakah alasannya konsisten.",
      "Memastikan laporan diterbitkan lembaga tepercaya dan membahas topik pengangguran.",
      "Menanyakan angka itu kepada chatbot ketiga tanpa memperlihatkan dua jawaban sebelumnya."
    ],
    "answer": 0,
    "feedback": "Kesepakatan chatbot dan adanya tautan belum membuktikan klaim; cocokkan klaim dengan isi sumber."
  },
  {
    "prompt": "AI menyarankan pilihan A, sedangkan kamu awalnya memilih B. Penjelasan AI panjang dan meyakinkan. Apa cara paling tepat untuk menentukan pilihan?",
    "choices": [
      "Mengikuti A apabila AI menyebutkan lebih banyak pertimbangan daripada yang kamu pikirkan sebelumnya.",
      "Mempertahankan B apabila pilihan awalmu didasarkan pada pengalaman langsung dalam situasi serupa.",
      "Membandingkan A dan B berdasarkan tujuan, kondisi, dan bukti yang dapat diperiksa.",
      "Mengulang pertanyaan dengan susunan berbeda, lalu memilih saran yang paling sering diberikan."
    ],
    "answer": 2,
    "feedback": "Nilai rekomendasi berdasarkan tujuan dan bukti, bukan keyakinan AI atau keyakinan awalmu saja."
  },
  {
    "prompt": "Kamu ingin meminta AI merangkum dokumen yang berisi informasi pribadi beberapa orang. Nama sudah dihapus, tetapi alamat, tanggal kejadian, dan rincian keluarga masih ada. Apa langkah paling tepat?",
    "choices": [
      "Mengunggah dokumen setelah memastikan penggunaan percakapan untuk pelatihan model sudah dimatikan.",
      "Memeriksa izin berbagi dan kebijakan layanan, lalu membatasi isi serta rincian yang dapat mengidentifikasi orang.",
      "Mengganti nama dengan kode agar hubungan antarbagian tetap jelas, lalu mengunggah dokumen lengkap.",
      "Mengunggah dokumen dan meminta AI mengabaikan informasi pribadi ketika membuat ringkasan."
    ],
    "answer": 1,
    "feedback": "Menghapus nama atau mematikan training belum menghilangkan risiko identifikasi maupun menggantikan izin berbagi."
  },
  {
    "prompt": "Kamu membuat video AI yang meniru wajah dan suara teman untuk lelucon. Video terlihat nyata dan akan dibagikan di grup. Apa pertimbangan paling tepat sebelum membagikannya?",
    "choices": [
      "Apakah hasilnya cukup lucu sehingga anggota grup memahami bahwa video itu dibuat untuk hiburan.",
      "Apakah grup bersifat tertutup sehingga kemungkinan video tersebar ke orang lain lebih kecil.",
      "Apakah keterangan “dibuat dengan AI” sudah ditambahkan untuk menjelaskan asal video kepada penonton.",
      "Apakah temanmu menyetujui penggunaan identitasnya dan bagaimana video itu dapat memengaruhi dirinya."
    ],
    "answer": 3,
    "feedback": "Pertimbangkan persetujuan dan dampak terhadap orang yang identitasnya digunakan, meskipun konten diberi label AI."
  },
  {
    "prompt": "Kamu ingin memahami topik baru dan mampu menjelaskannya sendiri. Cara menggunakan AI mana yang paling mendukung tujuan tersebut?",
    "choices": [
      "Meminta penjelasan dan contoh, mencoba menjelaskan kembali, lalu memeriksa bagian yang belum dipahami.",
      "Meminta ringkasan lengkap, membacanya beberapa kali, lalu menghafalkan poin-poin yang diberikan.",
      "Meminta jawaban untuk latihan, mempelajari langkahnya, lalu menyimpan jawaban sebagai contoh.",
      "Meminta beberapa versi penjelasan, lalu memilih versi yang terasa paling mudah dan meyakinkan."
    ],
    "answer": 0,
    "feedback": "Mencoba menjelaskan kembali dan memeriksa pemahaman membuat peserta tetap aktif berpikir saat belajar dengan AI."
  },
  {
    "prompt": "AI membantu menulis pengumuman untuk kegiatan yang kamu kelola. Drafnya menyebut fasilitas yang belum dikonfirmasi. Apa tindakan paling tepat sebelum pengumuman diterbitkan?",
    "choices": [
      "Menerbitkan draf dengan keterangan bahwa informasi disusun menggunakan bantuan AI.",
      "Meminta AI meninjau ulang apakah fasilitas tersebut masuk akal untuk kegiatan sejenis.",
      "Mengonfirmasi fasilitas kepada pihak terkait dan memperbaiki informasi sebelum diterbitkan.",
      "Mengubah pernyataan fasilitas menjadi perkiraan agar pengumuman tetap bisa diterbitkan."
    ],
    "answer": 2,
    "feedback": "Pengguna tetap bertanggung jawab atas informasi yang diterbitkan; label AI tidak menggantikan konfirmasi."
  }
];

export const assessments: Record<CourseId, CourseAssessment> = {
  "ai-fundamentals": {
    pre: aiLiteracyQuestions,
    post: aiLiteracyQuestions,
    reflection: "",
  },
  "working-with-generative-ai": {
    pre: [
      { prompt: "Kamu meminta AI membantu menyusun materi untuk teman sekelas, tetapi hasilnya terlalu teknis. Informasi apa yang paling membantu ditambahkan?", choices: ["Latar pembaca dan bagian yang perlu mereka pahami", "Panjang materi dan jumlah paragraf yang diinginkan", "Daftar istilah teknis yang harus muncul di setiap bagian"], answer: 0, feedback: "Konteks tentang pembaca membantu AI menyesuaikan pilihan kata dan kedalaman penjelasan." },
      { prompt: "AI menyebut data tanpa memberikan sumber. Apa langkah berikut yang paling dapat dipercaya?", choices: ["Meminta AI mengulang angka dengan format tabel", "Meminta nama sumber lalu membuka sumber aslinya untuk mencocokkan klaim", "Membandingkan jawabannya dengan ringkasan dari chatbot lain"], answer: 1, feedback: "Mintalah sumber yang dapat diperiksa, lalu buka dan cocokkan klaimnya." },
      { prompt: "Draf AI sudah dekat dengan kebutuhanmu, tetapi satu bagian meleset. Cara kerja yang paling efektif adalah…", choices: ["Mengganti seluruh prompt dengan instruksi yang lebih panjang", "Meminta AI membuat tiga draf baru tanpa menjelaskan masalahnya", "Menunjuk bagian yang meleset, memberi alasan, dan mempertahankan bagian yang sudah sesuai"], answer: 2, feedback: "Umpan balik spesifik menjaga bagian yang sudah sesuai dan memperbaiki bagian yang meleset." },
      { prompt: "Kamu perlu menulis panduan dari laporan panjang. Cara membagi pekerjaan yang paling membantu adalah…", choices: ["Minta AI mengerjakan seluruh panduan sekaligus tanpa meninjau draf", "Tentukan bagian yang perlu dibuat, lalu tinjau sebelum semuanya digabung", "Gabungkan beberapa ringkasan AI apa adanya"], answer: 1, feedback: "Pekerjaan bertahap memudahkanmu meninjau isi dan memberi koreksi sebelum hasil digabung." },
      { prompt: "Kamu meminta AI mengolah catatan rapat. Batasan mana yang paling berguna untuk menjaga isi tetap akurat?", choices: ["Jangan menambahkan keputusan yang tidak tertulis di catatan", "Gunakan gaya bahasa yang terdengar meyakinkan", "Tambahkan contoh keputusan dari rapat lain"], answer: 0, feedback: "Batasan yang jelas membantu AI membedakan isi sumber dari informasi tambahan." },
    ],
    post: [
      { prompt: "Kamu meminta ringkasan untuk pengurus komunitas yang sibuk. Prompt mana yang memberi konteks paling berguna?", choices: ["Ringkas semua bagian laporan dalam urutan yang sama", "Ringkas temuan utama untuk pengurus nonteknis yang perlu menentukan jadwal kegiatan", "Buat ringkasan singkat dengan gaya profesional"], answer: 1, feedback: "Tujuan dan pembaca membantu AI memilih informasi yang relevan." },
      { prompt: "AI membuat klaim statistik untuk laporan. Apa yang sebaiknya kamu lakukan sebelum memakainya?", choices: ["Cari sumber data dan cocokkan definisi serta angkanya", "Minta AI menambahkan tautan yang mendukung klaim", "Bandingkan angka itu dengan perkiraan umum tentang topiknya"], answer: 0, feedback: "Angka perlu dilacak ke sumber yang dapat dipercaya sebelum dipakai." },
      { prompt: "Setelah dua kali revisi, hasil AI masih belum sesuai. Langkah berikut yang paling membantu adalah…", choices: ["Minta versi yang lebih ringkas dengan nada berbeda", "Berikan contoh arah yang diinginkan, lalu sebutkan bagian yang harus dipertahankan", "Mulai chat baru dan tempelkan hasil yang sama"], answer: 1, feedback: "Contoh dan batasan yang jelas membuat revisi lebih terarah." },
      { prompt: "AI menggabungkan informasi dari catatanmu dan menambahkan satu klaim baru. Apa yang sebaiknya kamu lakukan?", choices: ["Periksa klaim tambahan itu dan tandai informasi yang belum terverifikasi", "Pertahankan klaimnya jika gaya bahasanya sesuai", "Minta AI menghapus semua informasi dari catatanmu"], answer: 0, feedback: "Bedakan informasi yang kamu berikan dari tambahan AI, lalu verifikasi klaim baru." },
    ],
    reflection: "Ceritakan satu tugas yang akan kamu bantu dengan AI. Konteks atau batasan apa yang akan kamu berikan, dan bagian mana yang tetap kamu periksa sendiri?",
  },
  "vibe-coding": {
    pre: [
      { prompt: "Coding agent akan membantu membuat aplikasi kecil. Apa yang paling baik dilakukan sebelum meminta perubahan kode?", choices: ["Berikan daftar perubahan dan minta agent langsung mengedit semua file terkait", "Jelaskan tujuan, lalu minta agent membaca struktur project dan melaporkan rencananya", "Minta agent memilih fitur awal berdasarkan project yang mirip"], answer: 1, feedback: "Tujuan dan pemahaman terhadap project memberi dasar yang lebih aman untuk bekerja." },
      { prompt: "Agent meminta izin menjalankan perintah terminal yang belum kamu pahami. Apa pilihan yang bijak?", choices: ["Izinkan jika agent menjelaskan bahwa perintah itu mempercepat pekerjaan", "Minta agent menjalankan perintah yang sama dari folder lain", "Tinjau perintah dan dampaknya, lalu setujui jika sesuai dengan tugas"], answer: 2, feedback: "Pahami dampak tindakan sebelum memberi izin, khususnya untuk perintah terminal." },
      { prompt: "Halaman aplikasi terlihat benar di laptopmu. Apa pemeriksaan berikut yang paling berguna sebelum dibagikan?", choices: ["Coba alur utama dan periksa tampilan pada ukuran layar lain", "Minta agent memastikan tidak ada bug tanpa mencoba sendiri", "Periksa kode sumber saja karena tampilannya sudah terbuka"], answer: 0, feedback: "Pengujian alur utama dan ukuran layar membantu menemukan masalah yang belum terlihat." },
      { prompt: "Kamu punya ide membuat rencana kegiatan dengan bantuan AI. Prompt awal mana yang paling jelas?", choices: ["Buat rencana kegiatan yang menarik", "Beri ide sebanyak mungkin untuk sebuah acara", "Susun rencana satu hari untuk 30 peserta dengan anggaran terbatas; tandai hal yang perlu dikonfirmasi"], answer: 2, feedback: "Tujuan, batasan, dan hal yang belum pasti memberi AI konteks kerja yang lebih jelas." },
      { prompt: "Apa pembeda paling penting antara AI chat biasa dan coding agent saat bekerja di project?", choices: ["Coding agent dapat memakai alat untuk membaca atau mengubah project jika diberi izin", "Coding agent selalu memakai model AI yang lebih pintar", "AI chat tidak bisa membantu menulis atau menjelaskan kode"], answer: 0, feedback: "Coding agent dapat berinteraksi dengan file dan alat project; tindakannya tetap perlu ditinjau." },
    ],
    post: [
      { prompt: "Agent sudah merangkum project. Sebelum meminta fitur baru, apa langkah yang paling membantu?", choices: ["Minta rencana fitur sambil menganggap ringkasan itu sudah akurat", "Berikan spesifikasi lengkap tanpa memeriksa apa yang agent pahami", "Cocokkan ringkasan dengan tujuan project dan luruskan bagian yang keliru"], answer: 2, feedback: "Pastikan agent memahami struktur dan tujuan sebelum memperluas perubahan." },
      { prompt: "Agent menawarkan menghapus file yang tampak tidak terpakai. Apa yang sebaiknya kamu lakukan?", choices: ["Setujui setelah melihat nama file tidak muncul di halaman utama", "Periksa pemakaian file dan perubahan yang akan dibuat sebelum menyetujui", "Minta agent memindahkannya dulu tanpa memeriksa dependensi"], answer: 1, feedback: "Perubahan file perlu ditinjau dampaknya; coding agent juga bisa keliru." },
      { prompt: "Fitur baru berhasil dibuka, tetapi belum dicoba di ponsel. Kesimpulan terbaik adalah…", choices: ["Uji alur utama dan tata letak pada ukuran layar yang relevan", "Tampilan desktop cukup menjadi acuan untuk semua perangkat", "Periksa prompt agent lagi sebelum menguji aplikasi"], answer: 0, feedback: "Satu tampilan berhasil belum menjamin pengalaman di perangkat dan alur lain." },
      { prompt: "Sebelum mengunggah project ke layanan hosting, hal apa yang perlu diperiksa?", choices: ["Apakah warna dan nama file sudah konsisten", "Apakah API key atau konfigurasi rahasia ikut tersimpan di project", "Apakah agent sudah menyatakan project selesai"], answer: 1, feedback: "Pastikan rahasia project tidak ikut terunggah dan periksa pengaturan deployment." },
    ],
    reflection: "Bayangkan kamu membuat fitur kecil dengan coding agent. Apa yang akan kamu minta, tindakan apa yang perlu kamu tinjau, dan bagaimana kamu menguji hasilnya?",
  },
};
