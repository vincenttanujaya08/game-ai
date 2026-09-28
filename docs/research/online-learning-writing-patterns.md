# Pola menulis lesson web yang terasa hidup

Riset 27 September 2026 untuk 3 kelas dan 14 lesson di `src/features/learn/`. Ini bahan penyuntingan materi, bukan aturan agar semua lesson mengikuti satu template.

## Apa yang terlihat di contoh resmi

| Sumber | Yang dilakukan | Yang layak dicoba di sini |
| --- | --- | --- |
| [Raspberry Pi Projects, “About me”](https://projects.raspberrypi.org/en/projects/about-me) | Sejak awal pelajar tahu benda yang akan dibuat. Langkahnya bergerak dari contoh kecil ke program milik pelajar, lalu ke tantangan baru; pada satu langkah mereka diminta menebak hasil sebelum menjalankan kode. | Buka lesson dengan hasil atau keputusan konkret. Beri kesempatan menebak sebelum menjelaskan istilah. Sesudah contoh, minta pelajar mengubah satu hal atau menilai kasus baru. |
| [Brilliant, penjelasan metode](https://brilliant.org/about/) | Brilliant menyebut satu konsep per lesson, masalah sebelum prosedur, penjelasan visual, dan umpan balik khusus untuk jawaban. Ini pernyataan desain mereka, bukan bukti bahwa format sama pasti berhasil pada pembaca kita. | Potong bagian yang hanya memperluas cakupan. Satu pertanyaan sulit yang dibahas tuntas lebih kuat daripada banyak fakta yang lewat sebentar. Umpan balik pilihan jawaban perlu menyebut alasan, bukan sekadar “tepat”. |
| [Duolingo, pengembangan Stories](https://blog.duolingo.com/duolingo-advanced-stories/) | Tokoh dan alur muncul lagi di beberapa cerita pendek, dengan bentuk yang bervariasi seperti email, ulasan, dialog, dan iklan. Setiap cerita tetap punya sasaran belajar yang spesifik. | Dalam satu kelas, boleh ada benang merah, misalnya tugas kelompok yang berkembang. Namun bentuk bacaan bisa berganti: percakapan, tangkapan jawaban AI, catatan revisi, atau keputusan rilis. Tidak perlu memulai setiap lesson dengan “bayangkan kamu…”. |
| [Khan Academy/Common Sense Education, “What is AI?”](https://www.khanacademy.org/college-careers-more/ai-for-education/x68ea37461197a514:ai-our-lives/x68ea37461197a514:what-is-ai/a/what-is-ai-lesson-plan) | Rencana pelajarannya menyatakan tiga hasil yang terbatas: menjelaskan AI, mengenali ciri AI generatif, dan menimbang manfaat serta risikonya. | Buat janji lesson yang masuk akal dan pastikan tiap bagian melayani janji itu. Bila satu lesson memuat definisi, sejarah, robot, medis, penipuan, dan privasi, pilih satu jalur utama dan pindahkan sisanya menjadi contoh singkat atau lesson lain. |
| [Khan Academy, “Setting realistic expectations”](https://www.khanacademy.org/college-careers-more/ai-for-education/x68ea37461197a514:unit-teaching-with-ai/x68ea37461197a514:getting-started-with-ai-in-the-classroom/a/ai-setting-realistic-expectations) | Penjelasan kemampuan dan keterbatasan dimulai dengan analogi obeng dan palu yang langsung menunjukkan kesalahan pemakaian alat. | Masukkan konsep setelah pembaca melihat masalahnya. Perbandingan sederhana yang tepat lebih mudah diingat daripada pembuka berisi daftar istilah. |

## Diagnosis pada materi sekarang

- **Cerita sering hanya ada di `lead`.** Contohnya lesson pertama AI Fundamental membuka dengan pagi dan ponsel, tetapi langsung berpindah ke IMO, protein, mammogram, multimodal, robot, agent, penipuan, privasi, dan TCAS. Perpindahan ini terasa seperti katalog, bukan rangkaian kejadian. Pilih satu pertanyaan pengikat; bawa contoh lain hanya jika membantu menjawabnya.
- **Pembuka terasa seragam.** Di `working-with-generative-ai.ts` dan `vibe-coding.ts`, banyak lesson memulai dengan “Kamu…”, “Bayangkan…”, lalu menutup dengan takeaway yang sangat rapi. Variasikan: mulai dari potongan jawaban yang janggal, percakapan dua orang, hasil uji yang gagal, pertanyaan langsung, atau satu keputusan yang harus diambil.
- **Terlalu banyak kalimat penyangga.** Frasa seperti “di pelajaran ini kita belajar…”, “yang penting…”, “cukup pahami…”, “langkah berikutnya…” berguna sesekali, tetapi jika berulang, pembaca merasakan pola mesin. Ganti dengan pengamatan atau tindakan: “Angka ini belum punya sumber. Buka laporan aslinya.”
- **Contoh kadang tidak punya akibat.** Cerita terasa hidup jika pilihan mengubah sesuatu yang pembaca pedulikan: tugas siap dikumpulkan atau harus direvisi, tombol nyaman dipakai atau tidak, klaim bisa dipertahankan atau dicoret. Setelah situasi pembuka, gunakan hasil pilihan itu untuk mengantar konsep berikutnya.
- **Istilah datang bergerombol.** Satu bagian dapat memperkenalkan beberapa istilah dan caveat sekaligus. Pertahankan akurasi, tetapi letakkan istilah tepat saat dibutuhkan untuk memecahkan masalah pada layar itu.

## Cara menyunting per lesson

1. Tulis satu kalimat kerja: **“Setelah lesson ini, pembaca bisa memutuskan/mencoba ___.”** Jika kalimatnya perlu beberapa “dan”, cakupannya kemungkinan terlalu lebar.
2. Pilih satu situasi konkret dengan detail seperlunya: siapa, sedang mengerjakan apa, apa yang macet, dan apa akibat keputusan berikutnya. Hindari tokoh fiktif yang hanya dipakai sebagai hiasan.
3. Tahan jawaban sebentar. Tampilkan dua pilihan yang sama-sama masuk akal atau satu hasil yang perlu ditebak. Pakai `reveal` atau `check` yang sudah ada.
4. Jelaskan hanya konsep yang membantu pembaca menilai situasi tadi. Masukkan bukti dan batasannya dekat dengan klaim yang didukung; jangan mengubah riset menjadi parade angka.
5. Kembalikan pembaca ke kasus awal. Tunjukkan keputusan yang sekarang lebih baik, lalu coba pada kasus kedua yang sedikit berbeda.
6. Baca keras-keras. Hapus kalimat yang hanya mengumumkan struktur, metafora yang terlalu manis, dan ringkasan yang mengulang paragraf sebelumnya. Pakai bahasa Indonesia sehari-hari yang tetap tepat; jargon boleh jika memang sedang diajarkan.

**Contoh arah perubahan, bukan teks final:** Dalam lesson tentang jawaban AI yang tampak meyakinkan, mulai dengan satu paragraf proposal berisi angka tanpa sumber. Minta pembaca memilih: pakai, periksa, atau hapus. Baru setelah itu jelaskan mengapa kalimat yang lancar belum menjadi bukti. Di akhir, tunjukkan paragraf yang sudah direvisi. Pembaca melihat akibat dari proses cek, bukan hanya menerima nasihat “verifikasi sumber”.

## Batas penerapan

Raspberry Pi mengajarkan proyek, Duolingo mengajarkan bahasa, dan Brilliant terutama matematika. Pola di atas adalah inspirasi desain yang dapat diterjemahkan ke literasi AI, bukan hasil eksperimen langsung pada pembaca NUSA Lab. Keseragaman cerita juga akan membuat kursus terasa dibuat dengan cetakan; gunakan pola hanya saat membantu tujuan lesson. Untuk contoh privasi, penipuan, dan dampak sosial, gunakan bahasa yang tenang serta situasi yang layak bagi audiens umum tanpa mengaburkan tindakan atau akibatnya.
