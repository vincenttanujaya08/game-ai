// Participant-facing directions added after the v2 copy review.
// Keep the reviewed source intact; these explain what each activity asks the learner to do.
export const vibeCodingGuidance: { question: string; hint: string }[][] = [
  [
    {
      question:
        "Kamu ingin tahu sumber errornya. Permintaan mana yang memanfaatkan kemampuan coding agent?",
      hint: "Pilih satu permintaan yang akan kamu kirim. Setelah itu, lihat apa yang bisa diperiksa AI dari permintaan tersebut.",
    },
  ],
  [
    {
      question:
        "Untuk setiap kebutuhan ini, bantuan AI mana yang paling cocok?",
      hint: "Pilih satu jenis bantuan pada tiap baris. Setelah semuanya terisi, tekan Periksa pilihan untuk melihat alasannya.",
    },
    {
      question:
        "Anggaran latihan terbatas. Bagaimana memilih model untuk mengganti satu label tombol?",
      hint: "Bandingkan tiga cara memulai pekerjaan ini. Pertimbangkan cakupan perubahan, biaya, dan bagaimana hasilnya akan diperiksa.",
    },
  ],
  [
    {
      question: "Untuk tiap tindakan ini, izin apa yang akan kamu berikan?",
      hint: "Allow berarti boleh langsung berjalan. Ask berarti harus meminta persetujuan dulu. Deny berarti diblokir. Dalam latihan ini, salinan project sebelum perbaikan harus tetap tersedia. Pilih satu izin untuk setiap tindakan, lalu periksa pilihanmu.",
    },
    {
      question:
        "Agent meminta izin memperbaiki import. Apa yang ingin kamu lakukan sebelum menyetujuinya?",
      hint: "Bandingkan ketiga cara menanggapi permintaan ini, lalu pilih yang paling sesuai dengan izin untuk tugas kita.",
    },
    {
      question:
        "Setelah melihat rinciannya, apakah tindakan ini sesuai dengan perbaikan yang kita minta?",
      hint: "Baris bertanda − adalah yang akan diganti; baris bertanda + adalah penggantinya. Perintah di bawah dipakai untuk memeriksa project. Jika sesuai, pilih Izinkan tindakan ini. Semuanya masih simulasi.",
    },
  ],
  [
    {
      question:
        "Apa yang perlu ditambahkan agar agent memahami timer yang kamu inginkan?",
      hint: "Klik bagian brief yang ingin kamu sertakan. Klik lagi untuk melepasnya. Lihat pratinjaunya, lalu tekan Lihat rencananya. Kamu boleh mencoba beberapa kombinasi.",
    },
  ],
  [
    {
      question:
        "Mana yang membantu timer versi pertama, dan mana yang belum diperlukan?",
      hint: "Untuk setiap kartu, pilih Perlu sekarang atau Belum perlu. Ingat, versi pertama hanya timer dengan Mulai, Jeda, dan Reset. Setelah semua kartu terisi, periksa pilihanmu.",
    },
  ],
  [
    {
      question: "Mana yang paling sesuai dengan brief kita?",
      hint: "Bandingkan cakupan dan urutan kedua rencana dengan brief, lalu pilih A atau B.",
    },
    {
      question:
        "Bagaimana kamu akan mengurutkan pekerjaan agar setiap hasilnya mudah diperiksa?",
      hint: "Gunakan tombol panah untuk memindahkan langkah ke atas atau ke bawah. Setelah urutannya sesuai, tekan Periksa urutan.",
    },
  ],
  [
    {
      question:
        "Tampilan timer sudah muncul, tetapi tombolnya belum bekerja. Apa langkah berikutnya?",
      hint: "Bandingkan tiga langkah berikutnya dengan kondisi timer saat ini, lalu pilih yang paling sesuai.",
    },
    {
      question:
        "Apakah Mulai, Jeda, dan Reset sudah melakukan hal yang kita minta?",
      hint: "Tekan Mulai, lalu Jalankan satu langkah agar waktunya berkurang. Tekan Jeda dan lihat sisa waktunya. Terakhir, tekan Reset. Kamu juga bisa mematikan mode langkah demi langkah untuk mencoba hitung mundur biasa.",
    },
  ],
  [
    {
      question: "Perubahan mana yang perlu ditanyakan lebih lanjut?",
      hint: "Klik file yang perubahannya ingin kamu pertanyakan. Kamu boleh menandai lebih dari satu, lalu tekan Periksa perubahan. Cocokkan setiap perubahan dengan brief timer tadi.",
    },
    {
      question:
        "Setelah tambahan yang tidak diperlukan ditolak, apa yang berubah pada usulan agent?",
      hint: "Baca permintaan lanjutan di bawah, lalu tekan Lihat perubahan file. Periksa apakah fungsi timer tetap ada dan tambahan layanan statistik sudah dikeluarkan dari usulan.",
    },
  ],
  [
    {
      question:
        "Kalau Jeda bekerja sesuai brief, apa yang seharusnya terjadi pada sisa waktu?",
      hint: "Coba sendiri: tekan Mulai, lalu Jalankan satu langkah, kemudian Jeda. Setelah itu, bandingkan hasilnya dengan perilaku yang kita harapkan.",
    },
    {
      question:
        "Jeda ternyata mengembalikan waktu ke awal. Laporan mana yang paling membantu agent memperbaikinya?",
      hint: "Semua laporan menyebut masalah Jeda. Bandingkan informasi dan permintaan dalam tiap laporan, lalu pilih yang paling membantu perbaikan.",
    },
    {
      question:
        "Jeda sudah diperbaiki. Apakah Jeda dan Reset sekarang bekerja sesuai brief?",
      hint: "Ulangi Mulai → Jalankan satu langkah → Jeda. Pastikan sisa waktunya tidak hilang. Lalu tekan Reset untuk memastikan fungsi itu tetap kembali ke 25:00 dan berhenti.",
    },
  ],
  [
    {
      question:
        "Kalau durasi hanya perlu diingat di browser yang sama, penyimpanan apa yang cukup?",
      hint: "Bandingkan cara kerja dan cakupan ketiga solusi dengan kebutuhan di kartu ini.",
    },
    {
      question:
        "Sekarang durasi harus sama di laptop dan ponsel. Apa yang perlu dipertimbangkan?",
      hint: "Kebutuhannya sudah berubah. Bandingkan tiga pendekatan berikut, lalu pilih yang sesuai dengan penggunaan di dua perangkat.",
    },
  ],
  [
    {
      question:
        "Timer bisa dibuka di laptopmu, tetapi link localhost tidak membuka timer yang sama di laptop teman. Mengapa?",
      hint: "Bandingkan ketiga penjelasan dengan kejadian pada laptop teman, lalu pilih yang paling tepat.",
    },
    {
      question:
        "Sebelum timer diterbitkan, apa yang perlu dilakukan pada tiap temuan ini?",
      hint: "Buka setiap temuan untuk melihat tindakan yang diperlukan. Periksa ketiganya sebelum memilih jalur publikasi.",
    },
    {
      question:
        "Lewat jalur mana kamu ingin mencoba menerbitkan timer dalam simulasi ini?",
      hint: "Pilih salah satu jalur. Keduanya bisa masuk akal jika didukung oleh layanan yang dipakai. Hasil berikutnya hanya alamat contoh, bukan aplikasi yang benar-benar diterbitkan.",
    },
    {
      question:
        "Build berhasil dan URL sudah muncul. Apakah itu berarti aplikasinya pasti bekerja?",
      hint: "Ketiga pilihan sama-sama memuat pemeriksaan. Pilih langkah yang cukup untuk menilai apakah versi yang diterbitkan bekerja.",
    },
  ],
  [
    {
      question:
        "Kalau memakai pola yang sama untuk idemu sendiri, seperti apa versi pertamanya?",
      hint: "Isi empat bagian di bawah dengan kebutuhan project-mu. Kalau belum punya ide, buka Contoh. Jawaban ini tidak diberi skor otomatis; kamu juga boleh melanjutkan tanpa menyimpan brief.",
    },
    {
      question: "Apakah brief-mu sudah cukup jelas untuk dikirim ke agent?",
      hint: "Baca kembali brief yang tersusun, lalu gunakan checklist untuk meninjaunya sendiri. Setelah itu, tulis refleksi jika ingin. Checklist dan refleksi tidak punya skor benar atau salah.",
    },
  ],
];
