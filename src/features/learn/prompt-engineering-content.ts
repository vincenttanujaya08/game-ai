export const basePrompt =
  "Tolong buatkan caption untuk postingan workshop AI ini.";
export const components = [
  {
    label: "Untuk orang yang baru mulai belajar AI",
    prompt: "Acaranya untuk orang yang baru mulai belajar AI.",
    why: "Pembukanya sekarang ditujukan untuk pemula, sesuai informasi peserta yang kamu tambahkan.",
  },
  {
    label: "Gratis, Sabtu pukul 10.00",
    prompt: "Workshop ini gratis dan diadakan Sabtu pukul 10.00.",
    why: "Waktu dan biaya sudah disebutkan. Pembaca sekarang tahu kapan acaranya dan bahwa workshop ini gratis.",
  },
  {
    label: "Ajak pembaca mendaftar",
    prompt:
      "Ajak pembaca mendaftar. Kalau cara daftarnya belum disebutkan, tulis [cara daftar] supaya bisa saya lengkapi.",
    why: "Ajakan mendaftarnya sudah muncul. Bagian [cara daftar] masih perlu kamu isi sebelum caption diposting.",
  },
  {
    label: "Santai, dengan sedikit emoji",
    prompt: "Pakai bahasa santai, dengan satu atau dua emoji saja.",
    why: "Gaya yang kamu minta bisa dijelaskan dengan kata-kata biasa, misalnya “santai, dengan sedikit emoji”.",
  },
  {
    label: "Buat versi pendek dan versi lebih lengkap",
    prompt: "Tolong buat dua versi: satu pendek dan satu lebih lengkap.",
    why: "Ada dua versi yang bisa kamu bandingkan dan pilih sesuai kebutuhan.",
  },
];
export function captionDemo(selected: number[]) {
  const has = (id: number) => selected.includes(id);
  const opening = has(0)
    ? has(3)
      ? "Baru mulai belajar AI? Yuk, belajar bareng! 🙌"
      : "Mau belajar AI, tapi bingung mulai dari mana?"
    : has(3)
      ? "Yuk, ikut workshop AI bareng! 🙌"
      : "Jangan lewatkan workshop AI seru ini!";
  const audience = has(0)
    ? "Di workshop ini, kamu bisa mengenal dasar-dasarnya bersama peserta lain yang juga baru mulai."
    : "Tambah wawasan dan belajar bersama.";
  const event = has(1) ? "Workshop gratis, Sabtu pukul 10.00." : "";
  const signup = has(2)
    ? "Daftar melalui [cara daftar]."
    : selected.length === 0
      ? "Daftar sekarang!"
      : "";
  const full = [opening, audience, event, signup].filter(Boolean).join(" ");
  return {
    prompt: [
      basePrompt,
      ...components.filter((_, i) => has(i)).map((item) => item.prompt),
    ].join(" "),
    answers: has(4)
      ? [
          {
            label: "Versi pendek",
            text: [opening, event, signup].filter(Boolean).join(" "),
          },
          { label: "Versi lebih lengkap", text: full },
        ]
      : [{ label: "Contoh jawaban AI", text: full }],
  };
}
export const details = [
  {
    text: "Workshop gratis",
    needed: true,
    why: "Informasi bahwa workshop ini gratis bisa membantu pembaca memutuskan untuk ikut.",
  },
  {
    text: "Acaranya untuk pemula",
    needed: true,
    why: "Dengan menyebut pemula, kamu membantu pembaca menilai apakah workshop ini cocok untuk mereka.",
  },
  {
    text: "Ketua komunitas suka warna biru",
    needed: false,
    why: "Warna favorit ketua tidak banyak membantu untuk caption ini. Detail itu mungkin baru berguna kalau kamu sedang membuat desain.",
  },
  {
    text: "Komunitas berdiri tahun 2023",
    needed: false,
    why: "Tahun berdiri bisa dipakai saat memperkenalkan komunitas. Untuk caption pendaftaran workshop, detail ini belum perlu, kecuali memang ada alasan untuk menyebutkannya.",
  },
  {
    text: "Pendaftaran ditutup Jumat malam",
    needed: true,
    why: "Batas waktu pendaftaran perlu disebutkan supaya pembaca tahu kapan terakhir mereka bisa mendaftar.",
  },
  {
    text: "Caption maksimal sekitar 80 kata",
    needed: true,
    why: "Batas panjang membantu AI menyesuaikan caption dengan kebutuhanmu.",
  },
];
export const examples = [
  "Mengingatkan ya, workshop-nya besok jam 10.00. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.",
  "Yth. peserta workshop, kami mengingatkan bahwa kegiatan akan dilaksanakan besok pukul 10.00 WIB. Mohon hadir tepat waktu.",
  "Besok ketemu di workshop ya! Mulai jam 10.00, jadi jangan sampai kelewatan 🙌",
];
export const reminders = [
  "Mengingatkan ya, workshop-nya besok jam 10.00. Tolong datang 10 menit lebih awal supaya kita bisa mulai tepat waktu. Sampai ketemu! Kalau nggak bisa hadir, kabari kami ya.",
  "Yth. peserta workshop, kegiatan akan dilaksanakan besok, Sabtu pukul 10.00 WIB. Mohon hadir 10 menit lebih awal agar kegiatan dapat dimulai tepat waktu.",
  "Besok ketemu di workshop ya! Mulai jam 10.00. Datang 10 menit lebih awal supaya sempat siap-siap 🙌",
];
export const taskSteps = [
  "Pahami brief dan cari informasi yang masih kurang",
  "Buat beberapa pilihan konsep, lalu pilih satu",
  "Susun rundown dan kebutuhan lain dari konsep yang dipilih",
];
export const followupOptions = [
  "Bahasa yang lebih sederhana",
  "Contoh spam email",
  "Tanpa rumus dulu",
  "Cukup tiga poin",
  "Penjelasan dari awal lagi",
];
export function followupDemo(selected: number[]) {
  const has = (id: number) => selected.includes(id);
  const requests = [
    has(0) && "Pakai bahasa yang lebih sederhana.",
    has(1) && "Pakai contoh spam email.",
    has(2) && "Tanpa rumus dulu.",
    has(3) && "Cukup tiga poin.",
  ].filter(Boolean);
  const prompt = [
    has(4)
      ? "Tolong jelaskan lagi dasar machine learning, lalu lanjut ke supervised learning."
      : "Saya masih bingung dengan supervised learning tadi. Tolong jelaskan ulang bagian itu.",
    ...requests,
  ].join(" ");
  const points = has(1)
    ? [
        "Model diberi banyak contoh email yang sudah ditandai sebagai ‘spam’ atau ‘bukan spam’.",
        "Dari contoh itu, model belajar mengenali pola pada kedua kelompok.",
        "Saat ada email baru, model memakai pola tadi untuk memperkirakan apakah email tersebut spam atau bukan.",
      ]
    : has(0)
      ? [
          "Model belajar dari contoh yang sudah diberi label jawaban.",
          "Dari contoh itu, model belajar mengenali pola.",
          "Saat ada data baru, model memakai pola tadi untuk memperkirakan jawabannya.",
        ]
      : [
          "Supervised learning memakai pasangan data input dan target berlabel.",
          "Model mempelajari hubungan antara input dan target dari data latihan.",
          "Hubungan itu digunakan untuk membuat prediksi pada input baru.",
        ];
  const intro = has(4)
    ? "Machine learning adalah cara komputer mempelajari pola dari data, lalu menggunakan pola itu untuk membuat perkiraan pada data baru.\n\n"
    : "";
  const body = has(3)
    ? points.map((point, i) => `${i + 1}. ${point}`).join("\n")
    : points.join(" ");
  return {
    prompt,
    answer:
      intro +
      body +
      "\n\nDisebut supervised karena data yang dipakai untuk belajar sudah diberi label jawaban.",
  };
}
export function composePrompt(fields: string[]) {
  return fields.filter((field) => field.trim()).join("\n\n");
}
export const habits = [
  "Mulai dari permintaan yang jelas. Untuk tugas sederhana, satu kalimat bisa cukup.",
  "Tambahkan konteks yang berkaitan dengan tugas.",
  "Sebutkan batasan dan bentuk jawaban kalau diperlukan.",
  "Beri contoh saat gaya atau pola sulit dijelaskan.",
  "Minta AI bertanya kalau informasi penting belum ada.",
  "Kerjakan tugas besar bertahap, sambil mengecek hasil tiap langkah.",
  "Gunakan permintaan lanjutan untuk memperbaiki bagian yang belum sesuai.",
  "Kalau harus mengikuti bahan tertentu, sebutkan sumber yang boleh dipakai.",
  "Periksa fakta penting sebelum menggunakan jawaban.",
];

// Destinations are sourced; the day grouping is an illustrative draft, not a verified route.
const jogjaSources = {
  wijilan: {
    label: "Gudeg Wijilan",
    url: "https://visitingjogja.jogjaprov.go.id/8045/gudeg-wijilan/",
  },
  kotagedeFood: {
    label: "Kuliner Kotagede",
    url: "https://visitingjogja.jogjaprov.go.id/42323/makanan-khas-kotagede-yang-wajib-dicoba/",
  },
  tamanSari: {
    label: "Taman Sari",
    url: "https://budaya.jogjaprov.go.id/artikel/detail/51-tamansari",
  },
  kotagedeSilver: {
    label: "Kerajinan perak Kotagede",
    url: "https://visitingjogja.jogjaprov.go.id/40176/sentra-kerajinan-perak-kota-gede/",
  },
  tlogoPutri: {
    label: "Tlogo Putri, Kaliurang",
    url: "https://visitingjogja.jogjaprov.go.id/30916/wajib-dikunjungi-tlogo-putri-di-kaliurang-ini-sangat-indah/",
  },
  nglanggeran: {
    label: "Gunung Api Purba Nglanggeran",
    url: "https://visitingjogja.jogjaprov.go.id/259/gunung-api-purba-nglanggeran/",
  },
};
type ItineraryDay = {
  place: string;
  area: string;
  activity: string;
  sources: { label: string; url: string }[];
};
export const jogjaItineraries: Record<string, ItineraryDay[]> = {
  Kuliner: [
    {
      place: "Gudeg di Wijilan",
      area: "Kota Yogyakarta",
      activity:
        "Kamu bisa mencoba gudeg di kawasan Wijilan untuk mengenal salah satu makanan khas Jogja.",
      sources: [jogjaSources.wijilan],
    },
    {
      place: "Jajanan tradisional Kotagede",
      area: "Kota Yogyakarta",
      activity:
        "Cari kipo atau roti kembang waru di Kotagede. Keduanya termasuk jajanan khas kawasan ini.",
      sources: [jogjaSources.kotagedeFood],
    },
  ],
  "Wisata budaya": [
    {
      place: "Taman Sari",
      area: "Kota Yogyakarta",
      activity:
        "Kunjungi kawasan bekas taman Keraton Yogyakarta untuk melihat bangunannya dan mengenal sejarahnya.",
      sources: [jogjaSources.tamanSari],
    },
    {
      place: "Sentra perak Kotagede",
      area: "Kota Yogyakarta",
      activity:
        "Jelajahi kawasan kerajinan perak Kotagede dan lihat hasil karya perajinnya.",
      sources: [jogjaSources.kotagedeSilver],
    },
  ],
  Alam: [
    {
      place: "Tlogo Putri, Kaliurang",
      area: "Kabupaten Sleman",
      activity:
        "Kamu bisa menikmati suasana telaga Tlogo Putri dan kawasan alam di Kaliurang.",
      sources: [jogjaSources.tlogoPutri],
    },
    {
      place: "Gunung Api Purba Nglanggeran",
      area: "Kabupaten Gunungkidul",
      activity:
        "Kalau ingin mendaki, kamu bisa mempertimbangkan Nglanggeran untuk melihat pemandangan perbukitan. Pilih kegiatan yang sesuai dengan kondisi fisikmu.",
      sources: [jogjaSources.nglanggeran],
    },
  ],
  Campuran: [
    {
      place: "Taman Sari dan gudeg Wijilan",
      area: "Kota Yogyakarta",
      activity:
        "Gabungkan kunjungan budaya ke Taman Sari dengan mencoba gudeg di Wijilan.",
      sources: [jogjaSources.tamanSari, jogjaSources.wijilan],
    },
    {
      place: "Tlogo Putri, Kaliurang",
      area: "Kabupaten Sleman",
      activity:
        "Ganti suasana dengan kegiatan di kawasan telaga Tlogo Putri. Hari pertama berisi budaya dan kuliner, hari kedua berfokus pada alam.",
      sources: [jogjaSources.tlogoPutri],
    },
  ],
};
