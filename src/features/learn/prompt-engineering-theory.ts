// Participant-facing additions from prompt-engineering-materi-lengkap.md.
export type TheoryBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; rows: string[][] };
export type TheoryDetail = { title: string; blocks: TheoryBlock[] };
export type StepTheory = { text: string; details: TheoryDetail[] };
export const promptIntroduction: {
  title: string;
  paragraphs: string[];
  details: TheoryDetail;
} = {
  title:
    "Prompt Engineering: menyampaikan kebutuhan dan memperbaiki jawaban AI",
  paragraphs: [
    "Prompt adalah permintaan atau instruksi yang kamu tulis untuk AI. Di sini kamu akan mencoba memilih detail, memberi contoh, meminta perubahan, dan memeriksa jawabannya.",
    "Semua jawaban dalam latihan ini sudah disiapkan sebagai simulasi. Pilihanmu menentukan contoh yang muncul. Saat menulis prompt sendiri, kamu mendapat panduan pemeriksaan; aplikasi tidak menilai isi tulisanmu atau menghasilkan jawaban langsung dari prompt tersebut.",
    "Ikuti petunjuk tiap langkah. Kamu bisa kembali untuk mengubah pilihan dan melanjutkan dari progres yang tersimpan pada browser ini. Target durasi utama sekitar 8–10 menit belum diuji kepada peserta; membaca seluruh rincian tambahan bisa memerlukan waktu lebih lama.",
  ],
  details: {
    title: "AI dan prompt engineering yang dibahas di sini",
    blocks: [
      {
        kind: "paragraph",
        text: "Materi ini membahas AI generatif untuk percakapan, yang bisa membantu membuat draf, menjelaskan topik, atau menyusun rencana. Prompt engineering adalah cara menyusun dan memperbaiki permintaan agar jawabannya lebih sesuai kebutuhan. Mulai dari permintaan sederhana, lihat hasilnya, lalu tambahkan arahan jika perlu. Informasi penting tetap perlu diperiksa sebelum digunakan.",
      },
    ],
  },
};
export const promptTheory: Record<string, StepTheory> = {
  "0:0": {
    text: "Prompt adalah permintaan atau instruksi yang kamu berikan kepada AI. Informasi yang dibutuhkan bergantung pada hasil yang kamu mau. Satu kalimat bisa cukup untuk mencari ide awal; caption yang siap diposting perlu memuat detail yang dibutuhkan pembaca.",
    details: [
      {
        title: "Kenapa jawabannya bisa kurang sesuai?",
        blocks: [
          {
            kind: "paragraph",
            text: "AI memakai permintaanmu, informasi dalam percakapan, dan kemampuan model untuk menyusun jawaban. Kalau ada detail penting yang belum disebutkan, AI bisa memakai asumsi yang berbeda dari maksudmu.",
          },
          {
            kind: "paragraph",
            text: "Jawaban yang kurang cocok juga tidak selalu berarti prompt-mu salah. AI bisa keliru memahami arahan meskipun kamu sudah menjelaskannya. Lihat dulu hasilnya, lalu tentukan apa yang perlu diubah.",
          },
        ],
      },
    ],
  },
  "1:0": {
    text: "Saat menilai caption, lihat kebutuhan pembacanya: apakah jelas siapa yang cocok ikut, kapan acaranya, dan bagaimana cara mendaftar? Draf awal bisa membantu mencari ide, tetapi sebelum diposting, cocokkan isinya dengan informasi acara.",
    details: [
      {
        title: "Dari draf ke tulisan siap pakai",
        blocks: [
          {
            kind: "paragraph",
            text: "Draf awal bisa membantu mencari ide atau menentukan gaya tulisan. Sebelum diposting, isinya perlu diperiksa. Untuk pengumuman acara, pembaca tetap membutuhkan waktu dan cara mendaftar, meskipun caption-nya sudah menarik.",
          },
          {
            kind: "paragraph",
            text: "“Sudah cukup” bisa menjadi pilihan kalau kamu hanya butuh ide awal. Kalau caption akan langsung dipakai, cocokkan dulu dengan informasi acara yang benar.",
          },
        ],
      },
    ],
  },
  "2:0": {
    text: "Tambahan pada prompt punya fungsi berbeda. Audiens dan detail acara memberi informasi tentang isi. Gaya mengatur cara menyampaikan pesan, sedangkan format menentukan bentuk jawabannya. Pilih yang membantu kebutuhanmu.",
    details: [],
  },
  "2:1": {
    text: "Lihat apakah setiap arahan yang kamu pilih terlihat pada hasilnya. Jika ada penanda [cara daftar], isi dengan informasi yang benar sebelum caption diposting. Penanda itu menunjukkan bagian yang masih kurang, bukan tautan pendaftaran.",
    details: [
      {
        title: "Fungsi tiap pilihan",
        blocks: [
          {
            kind: "table",
            rows: [
              ["Pilihan", "Fungsinya", "Yang perlu dilihat pada hasil"],
              [
                "Untuk orang yang baru mulai belajar AI",
                "Menjelaskan siapa pesertanya.",
                "Apakah pembuka dan isinya cocok untuk pemula?",
              ],
              [
                "Gratis, Sabtu pukul 10.00",
                "Memberi informasi acara.",
                "Apakah biaya dan waktunya ditulis dengan benar?",
              ],
              [
                "Ajak pembaca mendaftar",
                "Menjelaskan tindakan yang diharapkan.",
                "Apakah ada ajakan mendaftar dan cara ikut yang benar, atau penanda yang perlu dilengkapi?",
              ],
              [
                "Santai, dengan sedikit emoji",
                "Menunjukkan gaya bahasa.",
                "Apakah nada dan jumlah emojinya sesuai?",
              ],
              [
                "Buat versi pendek dan versi lebih lengkap",
                "Meminta dua versi jawaban.",
                "Apakah versi yang diberikan bisa dipilih sesuai kebutuhan postingan?",
              ],
            ],
          },
          {
            kind: "paragraph",
            text: "Informasi acara menentukan apa yang disampaikan. Arahan gaya membantu menentukan cara menyampaikannya.",
          },
        ],
      },
      {
        title: "Bagian yang perlu dilengkapi",
        blocks: [
          {
            kind: "paragraph",
            text: "`[cara daftar]` adalah penanda untuk informasi yang belum diberikan. Ganti bagian itu dengan cara mendaftar yang benar sebelum caption diposting. Penanda ini membantu memperlihatkan informasi yang masih kurang tanpa mengarang alamat atau tautan.",
          },
        ],
      },
    ],
  },
  "3:0": {
    text: "Konteks adalah informasi tentang situasi yang membantu AI memahami tugas. Untuk caption ini, pilih detail yang membantu menentukan isi, memberi informasi kepada calon peserta, atau mengatur bentuk tulisannya.",
    details: [],
  },
  "3:1": {
    text: "",
    details: [],
  },
  "3:2": {
    text: "",
    details: [],
  },
  "3:3": {
    text: "",
    details: [],
  },
  "3:4": {
    text: "",
    details: [],
  },
  "3:5": {
    text: "",
    details: [],
  },
  "3:6": {
    text: "Kegunaan detail bergantung pada tugas. Tahun berdiri mungkin penting untuk profil komunitas, sedangkan warna bisa berguna untuk desain. Cek pengelompokanmu berdasarkan kebutuhan caption pendaftaran yang sedang kita kerjakan.",
    details: [
      {
        title: "Apa itu konteks?",
        blocks: [
          {
            kind: "paragraph",
            text: "Konteks adalah informasi tentang situasi yang membantu AI mengerjakan permintaanmu. Dalam contoh workshop, kamu bisa menjelaskan siapa pesertanya, detail acara, dan tujuan postingan.",
          },
          {
            kind: "paragraph",
            text: "Pilih informasi yang berpengaruh pada tugas. Kamu tidak perlu memasukkan semua hal yang kamu tahu.",
          },
        ],
      },
      {
        title: "Kegunaan keenam detail",
        blocks: [
          {
            kind: "table",
            rows: [
              ["Detail", "Kegunaannya untuk caption"],
              [
                "Workshop gratis",
                "Memberi tahu calon peserta bahwa mereka tidak perlu membayar.",
              ],
              [
                "Acaranya untuk pemula",
                "Membantu pembaca menilai apakah acara ini cocok untuk mereka.",
              ],
              [
                "Ketua komunitas suka warna biru",
                "Belum membantu menulis caption pendaftaran. Bisa berguna untuk desain jika warna itu menjadi arahan.",
              ],
              [
                "Komunitas berdiri tahun 2023",
                "Bisa dipakai untuk memperkenalkan komunitas, tetapi belum perlu untuk caption pendaftaran ini.",
              ],
              [
                "Pendaftaran ditutup Jumat malam",
                "Memberi tahu batas waktu mendaftar.",
              ],
              [
                "Caption maksimal sekitar 80 kata",
                "Mengatur panjang caption. Detail ini tidak menambah fakta tentang acara.",
              ],
            ],
          },
        ],
      },
      {
        title: "Kalau tugasnya berubah",
        blocks: [
          {
            kind: "paragraph",
            text: "Kalau kamu membuat profil komunitas, tahun berdirinya mungkin perlu disebutkan. Kalau membuat poster, arahan warna bisa berguna. Nilai kegunaan detail berdasarkan pekerjaan yang sedang kamu lakukan.",
          },
        ],
      },
    ],
  },
  "4:0": {
    text: "Kata seperti “santai” bisa memberi gambaran yang berbeda. Kalau hasilnya belum sesuai, contoh pesan bisa menunjukkan gaya yang kamu inginkan dengan lebih jelas.",
    details: [],
  },
  "4:1": {
    text: "Contoh bisa menunjukkan sapaan, panjang kalimat, tingkat formalitas, dan susunan pesan. Pilih yang cocok untuk grup peserta. Ketiga gaya di sini bisa digunakan sesuai situasinya.",
    details: [],
  },
  "4:2": {
    text: "Pisahkan gaya dari fakta. Kamu boleh mengikuti cara menulis pada contoh, tetapi waktu, nama, dan detail acara harus sesuai informasi yang diberikan untuk tugas ini.",
    details: [
      {
        title: "Bagian mana dari contoh yang diikuti?",
        blocks: [
          {
            kind: "paragraph",
            text: "Contoh bisa menunjukkan sapaan, panjang kalimat, tingkat formalitas, dan susunan pesan. Detail seperti tanggal, nama, atau alamat belum tentu berlaku untuk pesan baru. Jelaskan gaya yang ingin diikuti dan berikan informasi acara yang benar.",
          },
        ],
      },
      {
        title: "One-shot dan few-shot",
        blocks: [
          {
            kind: "paragraph",
            text: "Memberi satu contoh sering disebut one-shot prompting. Kalau contohnya beberapa, istilahnya few-shot prompting. Kamu mungkin menemui istilah ini di panduan lain. Untuk memakainya sehari-hari, cukup ingat kapan contoh bisa membantu.",
          },
        ],
      },
    ],
  },
  "5:0": {
    text: "AI belum tahu semua kebutuhanmu. Minat, budget, dan lokasi menginap bisa memengaruhi pilihan kegiatan serta rutenya. Saat detail penting belum ada, kamu bisa meminta AI bertanya lebih dulu.",
    details: [],
  },
  "5:1": {
    text: "Pertanyaan klarifikasi membantu memastikan informasi yang belum jelas. Di contoh ini, kita membatasi pertanyaan agar percakapan tetap singkat. Jumlahnya bisa berbeda untuk tugas lain. Kamu hanya menjawab minat, sehingga hasil berikutnya belum menjadi rencana lengkap.",
    details: [],
  },
  "5:2": {
    text: "Asumsi adalah hal yang dianggap berlaku padahal belum dipastikan. Budget atau lokasi yang ditebak bisa membuat rencana kurang cocok. Lengkapi informasi itu dan periksa rute, biaya, serta kondisi tempat sebelum memakai rencananya.",
    details: [
      {
        title: "Pertanyaan klarifikasi",
        blocks: [
          {
            kind: "paragraph",
            text: "Pertanyaan klarifikasi membantu memastikan informasi yang belum jelas sebelum pekerjaan dilanjutkan. Kamu bisa meminta AI menanyakan hal yang paling diperlukan, lalu menjawabnya satu per satu.",
          },
          {
            kind: "paragraph",
            text: "Di contoh ini, jumlahnya dibatasi maksimal tiga pertanyaan agar percakapannya tetap singkat. Untuk tugas lain, sesuaikan jumlahnya dengan kebutuhan.",
          },
        ],
      },
      {
        title: "Asumsi dalam rencana awal",
        blocks: [
          {
            kind: "paragraph",
            text: "Asumsi adalah hal yang dianggap berlaku padahal belum dipastikan. Kalau AI menebak budget atau lokasi keberangkatan, saran perjalanannya mungkin kurang cocok. Kamu bisa meminta AI bertanya dulu atau menjelaskan asumsi yang dipakai.",
          },
          {
            kind: "paragraph",
            text: "Tempatnya bisa benar-benar ada, tetapi rute, biaya, transportasi, dan waktu kunjungannya belum tentu sesuai. Tautan membantu memeriksa informasi tempat; rincian perjalanan tetap perlu kamu tinjau.",
          },
        ],
      },
    ],
  },
  "6:0": {
    text: "Brief adalah ringkasan kebutuhan pekerjaan, seperti tujuan, peserta, waktu, dan anggaran. Beberapa hasil saling bergantung: rundown perlu mengikuti konsep acara. Menentukan urutan membantu kamu mengecek dasar tiap tahap sebelum lanjut.",
    details: [],
  },
  "6:1": {
    text: "Untuk pekerjaan yang saling bergantung, mengecek hasil tiap tahap membuatmu bisa memperbaiki arah lebih awal. Banyaknya tahap mengikuti tugas. Pekerjaan sederhana tidak perlu dipecah menjadi banyak percakapan.",
    details: [
      {
        title: "Kenapa dikerjakan bertahap?",
        blocks: [
          {
            kind: "paragraph",
            text: "Meminta beberapa hasil sekaligus bisa membantu membuat gambaran awal. Namun, kalau satu pekerjaan bergantung pada hasil sebelumnya, mengecek tiap tahap membuatmu bisa memperbaiki arah lebih awal.",
          },
          {
            kind: "paragraph",
            text: "Sesuaikan jumlah tahap dengan tugasnya. Untuk pekerjaan sederhana, kamu tidak perlu membuat banyak percakapan.",
          },
        ],
      },
      {
        title: "Arti penanda dalam jawaban",
        blocks: [
          {
            kind: "paragraph",
            text: "`[ringkasan tujuan dari brief]` menandai tempat untuk hasil yang diambil dari brief sebenarnya. Karena isi brief belum diberikan dalam aktivitas utama, contoh ini menunjukkan susunan jawaban, bukan analisis acara nyata.",
          },
        ],
      },
      {
        title: "Contoh tambahan yang bisa dibuka",
        blocks: [
          {
            kind: "paragraph",
            text: "Brief fiktif untuk latihan:",
          },
          {
            kind: "paragraph",
            text: "Komunitas ingin mengadakan sesi pengenalan AI untuk 20 pemula. Acara berlangsung Sabtu pukul 10.00–11.30, dengan anggaran Rp300.000. Tempatnya belum ditentukan. Setelah mengikuti acara, peserta diharapkan sudah mencoba menyusun satu prompt.",
          },
          {
            kind: "paragraph",
            text: "Contoh ringkasannya:",
          },
          {
            kind: "list",
            items: [
              "Tujuan: membantu pemula mengenal penggunaan AI dan mencoba menyusun prompt.",
              "Batasan: 20 peserta, durasi 90 menit, dan anggaran Rp300.000.",
              "Masih perlu dipastikan: lokasi acara dan fasilitas untuk praktik.",
            ],
          },
        ],
      },
    ],
  },
  "7:0": {
    text: "Follow-up adalah permintaan lanjutan setelah jawaban sebelumnya. Sebutkan bagian yang membingungkan dan perubahan yang kamu butuhkan. Kamu bisa meminta bahasa sederhana, contoh, atau penjelasan dasar sesuai kesulitanmu.",
    details: [],
  },
  "7:1": {
    text: "Periksa apakah perubahan yang diminta benar-benar membantu. Tiga poin bisa lebih ringkas tetapi tetap sulit, dan penjelasan tanpa rumus masih bisa memakai istilah teknis. Kalau belum cocok, beri arahan lanjutan yang lebih spesifik.",
    details: [
      {
        title: "Apa itu follow-up?",
        blocks: [
          {
            kind: "paragraph",
            text: "Follow-up adalah permintaan lanjutan setelah jawaban sebelumnya. Sebutkan bagian yang membingungkan, perubahan yang kamu mau, dan bagian yang masih perlu dipertahankan.",
          },
          {
            kind: "paragraph",
            text: "Contoh:",
          },
          {
            kind: "paragraph",
            text: "Saya masih bingung dengan supervised learning tadi. Tolong jelaskan pakai contoh spam email. Cukup tiga poin, dengan bahasa yang mudah dipahami pemula.",
          },
        ],
      },
      {
        title: "Fungsi tiap pilihan",
        blocks: [
          {
            kind: "table",
            rows: [
              ["Pilihan", "Yang dibantu"],
              [
                "Bahasa yang lebih sederhana",
                "Mengurangi istilah yang sulit dipahami.",
              ],
              [
                "Contoh spam email",
                "Memberi contoh konkret untuk memahami konsep.",
              ],
              ["Tanpa rumus dulu", "Meminta penjelasan tanpa rumus."],
              ["Cukup tiga poin", "Mengatur jumlah dan susunan poin."],
              [
                "Penjelasan dari awal lagi",
                "Membahas dasar yang masih belum dipahami.",
              ],
            ],
          },
          {
            kind: "paragraph",
            text: "Tiga poin bisa lebih ringkas, tetapi istilahnya masih mungkin sulit. Penjelasan tanpa rumus juga bisa tetap teknis. Pilih perubahan berdasarkan hal yang membuatmu bingung.",
          },
        ],
      },
    ],
  },
  "8:0": {
    text: "Topik dan bahan rujukan berbeda. “Workshop AI” adalah topik luas, sedangkan artikel ini berisi informasi tentang acara tertentu. Kalau diminta merangkum artikel, AI perlu mengikuti isinya tanpa menambahkan detail acara dari perkiraan.",
    details: [],
  },
  "8:1": {
    text: "Bandingkan isi jawaban dengan artikel, bukan hanya kerapian bahasanya. Perhatikan informasi yang diringkas dan detail baru yang tidak disebutkan dalam bahan.",
    details: [],
  },
  "8:2": {
    text: "Batas sumber membantu mengarahkan jawaban, tetapi hasilnya tetap perlu diperiksa. Untuk tugas lain yang membutuhkan sumber tambahan, kamu boleh mengizinkannya sambil memastikan sumber tersebut benar dan mendukung jawabannya.",
    details: [
      {
        title: "Topik dan bahan rujukan",
        blocks: [
          {
            kind: "paragraph",
            text: "“Workshop AI” adalah topik yang luas. Artikel yang kamu berikan berisi informasi tentang acara tertentu. Kalau tugasnya merangkum artikel, jawaban perlu mengikuti isinya tanpa menambahkan detail acara dari perkiraan.",
          },
          {
            kind: "paragraph",
            text: "Untuk tugas yang membutuhkan sumber lain, kamu boleh mengizinkan AI memakai bahan tambahan. Tetap periksa sumber tersebut dan sesuaikan batasnya dengan kebutuhanmu.",
          },
        ],
      },
      {
        title: "Memisahkan instruksi dan bahan",
        blocks: [
          {
            kind: "paragraph",
            text: "Tulis permintaanmu terlebih dahulu, lalu beri judul “Artikel:” sebelum bahan bacaan. Dengan begitu, instruksi dan isi artikel lebih mudah dibedakan.",
          },
          {
            kind: "paragraph",
            text: "Pemisah seperti ini kadang disebut delimiter. Fungsinya membuat susunan prompt lebih jelas. AI tetap bisa keliru mengikuti instruksi, jadi hasilnya perlu diperiksa.",
          },
        ],
      },
    ],
  },
  "9:0": {
    text: "AI bisa menghasilkan angka, pernyataan, atau sumber yang terdengar masuk akal tetapi salah atau dibuat-buat. Kesalahan seperti ini sering disebut halusinasi. Jawaban yang terdengar yakin tetap perlu diperiksa melalui sumbernya.",
    details: [
      {
        title: "Halusinasi AI",
        blocks: [
          {
            kind: "paragraph",
            text: "AI bisa menghasilkan angka, pernyataan, atau sumber yang terdengar masuk akal tetapi salah atau dibuat-buat. Kesalahan seperti ini sering disebut halusinasi. Jawaban yang terdengar yakin tetap perlu diperiksa.",
          },
          {
            kind: "paragraph",
            text: "Kalau sumbernya tidak ditemukan atau tidak mendukung klaim, kamu bisa menunda pemakaiannya, menghapus klaim itu, atau mencari data lain yang dapat diperiksa.",
          },
        ],
      },
      {
        title: "Apa yang perlu dicek pada survei?",
        blocks: [
          {
            kind: "list",
            items: [
              "Apakah sumber aslinya bisa ditemukan dan dibuka?",
              "Apakah angkanya sama dengan yang tertulis di sumber?",
              "Siapa respondennya? Apakah sesuai dengan kelompok yang disebut dalam klaim?",
              "Kapan datanya dikumpulkan?",
              "Apa pertanyaannya, dan istilah apa yang dipakai dalam survei?",
              "Apakah kesimpulan yang ingin disampaikan sesuai dengan datanya?",
            ],
          },
          {
            kind: "paragraph",
            text: "Misalnya, survei peserta satu acara belum tentu menggambarkan kebiasaan seluruh anak muda Indonesia. “Pernah memakai AI” juga berbeda dari “memakai AI setiap hari”.",
          },
        ],
      },
    ],
  },
  "10:0": {
    text: "Kolom berikut membantu kamu memikirkan kebutuhan. Hanya permintaan utama yang wajib diisi. Tambahkan konteks, batasan, format, atau contoh jika memang membantu tugasmu.",
    details: [],
  },
  "10:1": {
    text: "Sebutkan tugas yang ingin dikerjakan dan, kalau membantu, tujuan pemakaian hasilnya. “Bantu saya belajar” masih luas. “Tolong jelaskan perbedaan tabungan dan reksa dana untuk pemula” memberi tugas yang lebih jelas.",
    details: [],
  },
  "10:2": {
    text: "Pilih konteks yang berpengaruh pada tugas, seperti kemampuanmu sekarang, siapa pembacanya, atau bahan yang tersedia. Informasi pribadi yang tidak berkaitan tidak perlu ditambahkan.",
    details: [],
  },
  "10:3": {
    text: "Pastikan batasan bisa diikuti bersama. Penjelasan mendalam mungkin tidak muat dalam satu kalimat. Kamu bisa meminta gambaran singkat dulu, lalu membahas bagian tertentu lebih jauh.",
    details: [],
  },
  "10:4": {
    text: "Pilih bentuk jawaban sesuai cara pemakaiannya. Tabel membantu membandingkan pilihan, langkah bernomor membantu mengikuti urutan, dan paragraf bisa menjelaskan hubungan antargagasan.",
    details: [],
  },
  "10:5": {
    text: "Contoh membantu menunjukkan gaya atau pola. Sebutkan bagian yang ingin diikuti dan pastikan detail contoh yang tidak sesuai tidak terbawa ke tugasmu.",
    details: [],
  },
  "10:6": {
    text: "Baca hasil gabungannya sebagai satu permintaan. Apakah tugasnya jelas, konteksnya berguna, dan batasannya sesuai? Saran aplikasi mengikuti kolom yang terisi; aplikasi tidak memeriksa makna tulisan atau menguji jawabannya.",
    details: [],
  },
  "10:7": {
    text: "Saat jawaban belum sesuai, kenali dulu masalahnya. Kamu bisa meminta perbaikan dalam percakapan yang sama atau menulis permintaan baru kalau kebutuhanmu sudah berubah.",
    details: [],
  },
  "11:0": {
    text: "Semua cara tadi membantu percakapan yang sama: sampaikan kebutuhan, lihat hasilnya, lalu lengkapi atau perbaiki bagian yang belum sesuai. Pilih cara yang membantu tugasmu; kamu tidak harus memakai semuanya setiap kali.",
    details: [
      {
        title: "Kaitannya dengan latihan tadi",
        blocks: [
          {
            kind: "table",
            rows: [
              ["Yang kamu coba", "Yang bisa dipakai nanti"],
              [
                "Memeriksa caption",
                "Menilai apakah jawaban cukup untuk tujuanmu.",
              ],
              [
                "Menambah dan memilah detail",
                "Memberi informasi yang berkaitan dengan tugas.",
              ],
              [
                "Memilih contoh pengingat",
                "Menunjukkan gaya atau susunan yang kamu mau.",
              ],
              [
                "Menjawab pertanyaan perjalanan",
                "Melengkapi informasi sebelum meminta rencana lengkap.",
              ],
              [
                "Menyusun tahapan acara",
                "Mengecek hasil sebelum mengerjakan bagian berikutnya.",
              ],
              [
                "Memperbaiki penjelasan",
                "Meminta perubahan pada bagian yang belum cocok.",
              ],
              [
                "Membandingkan ringkasan artikel",
                "Menentukan bahan yang harus diikuti.",
              ],
              ["Memeriksa angka survei", "Mencocokkan klaim dengan bukti."],
              [
                "Menulis prompt sendiri",
                "Memilih cara yang sesuai dengan kebutuhanmu.",
              ],
            ],
          },
        ],
      },
    ],
  },
};
export const promptGlossary: TheoryDetail = {
  title: "Glosarium opsional",
  blocks: [
    {
      kind: "table",
      rows: [
        ["Istilah", "Artinya"],
        ["Prompt", "Permintaan atau instruksi yang kamu berikan kepada AI."],
        [
          "Prompt engineering",
          "Cara menyusun dan memperbaiki permintaan agar hasil AI lebih sesuai kebutuhan.",
        ],
        [
          "Konteks",
          "Informasi tentang situasi yang membantu AI memahami tugas.",
        ],
        [
          "Audiens",
          "Orang yang akan membaca, mendengar, atau memakai hasilnya.",
        ],
        [
          "Batasan",
          "Ketentuan yang perlu diikuti, misalnya waktu, budget, panjang tulisan, atau sumber.",
        ],
        [
          "Format output",
          "Bentuk jawaban, seperti paragraf, tabel, checklist, atau langkah bernomor.",
        ],
        [
          "Draf",
          "Tulisan atau hasil awal yang masih perlu diperiksa dan bisa diperbaiki.",
        ],
        [
          "Contoh",
          "Bahan untuk menunjukkan gaya, pola, atau susunan yang kamu mau.",
        ],
        [
          "Klarifikasi",
          "Memastikan informasi yang belum jelas sebelum melanjutkan.",
        ],
        ["Asumsi", "Hal yang dianggap berlaku padahal belum dipastikan."],
        ["Brief", "Ringkasan kebutuhan pekerjaan atau acara."],
        ["Rundown", "Urutan kegiatan beserta waktunya."],
        ["Follow-up", "Permintaan lanjutan berdasarkan jawaban sebelumnya."],
        [
          "One-shot / few-shot",
          "Memberi satu contoh / beberapa contoh dalam prompt.",
        ],
        [
          "Delimiter",
          "Penanda untuk memisahkan instruksi, contoh, atau bahan dalam prompt.",
        ],
        [
          "Halusinasi AI",
          "Jawaban yang terdengar masuk akal, tetapi memuat informasi salah atau dibuat-buat.",
        ],
        ["Verifikasi", "Memeriksa klaim dengan bukti atau sumber yang sesuai."],
        [
          "Simulasi",
          "Contoh yang sudah disiapkan untuk latihan; jawabannya tidak dibuat langsung dari tulisanmu.",
        ],
      ],
    },
  ],
};
