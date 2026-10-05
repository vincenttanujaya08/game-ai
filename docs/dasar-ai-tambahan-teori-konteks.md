# Dasar AI — materi lengkap beserta tambahan teori dan konteks

Status: draf gabungan untuk diedit bahasanya. Materi utama disalin lengkap dari dokumentasi kelas yang digunakan aplikasi; tambahan teori dan konteks belum diterapkan ke aplikasi.
Tanggal: 3 Oktober 2026.
Cakupan: seluruh kelas **AI Fundamentals**, terdiri dari tiga pelajaran dan 29 bagian. “Materi pertama” di sini berarti kelas Dasar AI secara keseluruhan.
Dasar materi: [Materi Pembelajaran NUSA Lab — Kelas 1](materi-pembelajaran-lengkap.md#kelas-1-ai-fundamentals). Judul dan susunan bagian juga dicocokkan dengan materi yang dimuat aplikasi melalui `src/features/learn/material-final.json`.
Contoh gaya dan susunan: [Draf tambahan Prompt Engineering](prompt-engineering-pilot-tambahan-teori-konteks.md).

Dokumen ini memuat materi Dasar AI lengkap dan seluruh tambahan teori serta konteks dalam satu file. Setiap bagian memiliki blok **Materi utama — lengkap** yang menyalin isi sumber, diikuti tambahan editorial untuk bagian yang sama. Pembuka kelas, pengantar ketiga pelajaran, visual, sumber, latihan, pilihan, jawaban, pembahasan, cek pemahaman, dan penutup asli ikut dimuat. Tambahan tetap diberi label agar kamu dapat menyunting bahasanya tanpa kehilangan materi utama.

## Navigasi dokumen

- [Pembuka kelas](#pembuka-kelas--materi-utama-lengkap)
- [Pelajaran 1: AI Hari Ini](#pelajaran-1-ai-hari-ini)
- [Pelajaran 2: Sebenarnya, Apa Itu AI?](#pelajaran-2-sebenarnya-apa-itu-ai)
- [Pelajaran 3: Berpikir di Era AI](#pelajaran-3-berpikir-di-era-ai)
- [Penutup kelas](#penutup-kelas--materi-utama-lengkap)
- [Tambahan untuk cek pemahaman](#penutup-pelajaran-dan-konteks-cek-pemahaman)
- [Glosarium](#glosarium--bisa-dibuka-saat-diperlukan)
- [Peta penempatan](#peta-penempatan-pada-seluruh-29-bagian)
- [Catatan sumber dan penyuntingan](#catatan-penyuntingan-dan-pemeriksaan-sebelum-penerapan)

## Cara memakai draf ini

Setiap bagian memiliki **konteks**, **teks langsung**, **penjelasan tambahan**, **penutup**, dan **penghubung**. Konteks menjelaskan situasi; teks langsung memberi dasar yang diperlukan; rincian bisa dibuka ketika peserta ingin tahu lebih jauh. Penutup menghubungkan kegiatan dengan pelajaran yang diperoleh. Label tersebut merupakan petunjuk untuk penyusun, bukan semua judul yang harus muncul di layar.

Untuk penerapan nanti, letakkan tambahan pada bagian terkait. Jangan menampilkan seluruh isi dokumen sebagai satu bacaan panjang. Jika materi lama sudah menyampaikan gagasan yang sama, satukan penyampaiannya sambil mempertahankan seluruh maknanya. Pada draf ini, tambahan dicatat terpisah agar isinya mudah dinilai dan bahasanya mudah diedit.

Penjelasan setelah aktivitas diletakkan setelah peserta mencoba dan membuka hasil. Contoh atau penghubung tambahan tidak otomatis menjadi soal baru. Bagian yang tidak memiliki latihan tetap dapat membantu belajar melalui contoh dan penjelasan.

Materi ini tetap berbobot melalui pemahaman konsep, penilaian bukti, dan penerapan pada kasus. Banyaknya istilah atau klik tidak dipakai sebagai ukuran pemahaman. Durasi kelas dengan tambahan ini belum diukur; target waktu pilot Prompt Engineering tidak otomatis berlaku untuk kelas Dasar AI yang terdiri dari tiga pelajaran.

## Pengantar sebelum memulai kelas

### Identitas — teks langsung

**Dasar AI: mengenal kemampuan, memahami cara kerja, dan memeriksa hasilnya**

AI sudah dipakai dalam berbagai kegiatan, seperti menyaring email, merekomendasikan lagu, dan membantu membuat draf. Di kelas ini, kamu akan mengenali beberapa kegunaannya, memahami dasar cara kerjanya, lalu mencoba menilai hasil sebelum digunakan.

### Tujuan — teks langsung

Setelah mengikuti materi, kamu diharapkan bisa menjelaskan perbedaan beberapa jenis sistem, mengenali batas hasil AI, dan memilih pemeriksaan yang sesuai dengan kebutuhan.

Catatan penyusun: ini tujuan belajar, bukan klaim bahwa kemampuan tersebut sudah terbukti meningkat pada peserta.

### Peta belajar — teks langsung

1. **AI Hari Ini:** melihat contoh kemampuan dan risiko yang dekat dengan kehidupan sehari-hari.
2. **Sebenarnya, Apa Itu AI?:** memahami aturan, data, pelatihan, model, dan hasilnya.
3. **Berpikir di Era AI:** memakai AI untuk membantu tugas sambil tetap menilai hasil dan keputusan.

### Cara mengikuti materi — teks langsung

Baca contoh singkat dan coba latihan ketika muncul. Setelah mencoba, lihat pembahasannya untuk memahami alasan. Kamu bisa membuka penjelasan tambahan saat ada istilah atau bagian yang belum jelas.

### Hal yang perlu diketahui tentang latihan

Beberapa latihan meminta perkiraan angka. Fokusnya adalah membaca arti temuan setelah angka dibuka. Kamu tidak perlu pernah membaca studi tersebut sebelumnya.

Latihan lain mengajak kamu menyusun urutan atau menandai klaim. Gunakan informasi pada kasus untuk memilih, lalu lihat alasan dan koreksinya. Contoh kasus latihan tidak otomatis menjadi fakta atau aturan yang berlaku di semua tempat.

### Pengantar tiap pelajaran — teks langsung

**Sebelum pelajaran 1:** Kita mulai dari contoh yang bisa kamu temui. Perhatikan pekerjaan yang dilakukan AI dan bukti yang diperlukan untuk menilai hasilnya.

**Sebelum pelajaran 2:** Setelah melihat contoh kemampuan AI, kita akan memahami cara sistem dibangun. Mulai dari aturan sederhana, lalu telusuri data dan model.

**Sebelum pelajaran 3:** Dasar cara kerjanya sudah dibahas. Sekarang kita gunakan pengetahuan itu untuk menentukan bantuan AI yang sesuai dan memeriksa hasilnya.

## Pembuka kelas — materi utama lengkap

**Label kelas:** KURSUS 01 · DASAR-DASAR AI

**Gambaran kelas:** AI sudah muncul dalam banyak aktivitas sehari-hari, dari filter email dan rekomendasi musik sampai riset dan tugas kuliah. Kelas ini membahas apa yang bisa dilakukan AI, cara kerja dasarnya, dan kapan hasilnya perlu diperiksa.

**Peta belajar:** Mulai dari contoh AI yang dekat dengan kehidupan sehari-hari, lanjut ke cara kerja dasar AI dan machine learning, lalu pelajari cara menilai hasil AI tanpa menyerahkan keputusan sepenuhnya kepada sistem.

**Ringkasan katalog:** Kenali kemampuan AI, pahami cara kerja dasarnya, dan pelajari kapan hasilnya perlu diverifikasi sebelum dipakai.

![Mahasiswa Politeknik Aceh mempraktikkan keterampilan teknologi komputer di laboratorium](../public/course-visuals/aceh-polytechnic.webp)

**Ilustrasi pembuka:** Mahasiswa Politeknik Aceh mempraktikkan keterampilan teknologi komputer di laboratorium. [Foto: USAID Indonesia · domain publik](https://commons.wikimedia.org/wiki/File:Mahasiswa_i_menggunakan_komputer_untuk_meningkatkan_keterampilan_teknologi_(8315664069).jpg).

## Pelajaran 1: AI Hari Ini

**Pertanyaan utama:** Seberapa jauh kemampuan AI sekarang?

AI sudah dipakai di banyak layanan sehari-hari, tetapi tugasnya tidak selalu sama. Ada sistem yang menyaring spam, memberi rekomendasi, membuat konten, membantu membaca gambar medis, sampai mengendalikan robot. Di pelajaran ini, kita akan melihat apa yang sudah bisa dilakukan AI sekaligus kapan hasilnya masih perlu diperiksa manusia.

### 1.1 — AI ada di lebih banyak tempat daripada yang kita kira

#### Materi utama — lengkap

Kita sering memakai fitur berbasis AI tanpa perlu memikirkan teknologi di baliknya. Filter spam membantu memisahkan email spam dari inbox utama, aplikasi musik memberi rekomendasi lagu, dan chatbot menghasilkan jawaban berdasarkan prompt yang kita berikan. Masing-masing memakai AI untuk tugas yang berbeda.

**Generative AI**, misalnya, membuat konten baru seperti teks atau gambar. Di bidang lain, AI membantu radiolog membaca gambar medis, ilmuwan memprediksi bentuk protein, dan robot menyesuaikan gerakannya.

Jadi, AI bukan hanya chatbot atau generator gambar. Istilah ini mencakup banyak jenis sistem dengan tugas yang berbeda. Sebelum masuk ke definisi dan cara kerjanya, kita lihat dulu beberapa contoh nyata beserta batasnya.

**Catatan penting:** sistem yang berhasil pada satu tugas belum tentu selalu benar, aman, atau cocok dipakai untuk tugas lain.

**Contoh penggunaan AI di beberapa bidang**

- **Sehari-hari:** Filter email membantu memisahkan pesan spam; aplikasi musik merekomendasikan lagu.
- **Sains:** AI membantu memprediksi bentuk protein dan menyelesaikan soal matematika.
- **Kesehatan:** AI membantu radiolog memeriksa gambar hasil mammografi.
- **Robot dan tugas digital:** Robot bisa dilatih bergerak; sistem AI juga bisa memakai alat digital untuk mengerjakan beberapa langkah.

![Logo ChatGPT](../public/course-visuals/chatgpt-logo.svg) ![Ikon Google Gemini](../public/course-visuals/gemini-logo.svg)

**Visual:** Logo ChatGPT dari [OpenAI](https://commons.wikimedia.org/wiki/File:ChatGPT-Logo.svg) dan ikon Gemini dari [Google](https://commons.wikimedia.org/wiki/File:Google_Gemini_icon_2025.svg).

#### Konteks — sebelum contoh atau aktivitas

Kamu membuka email, memilih lagu, lalu meminta bantuan menulis. Di balik ketiga kegiatan itu, sistem bisa memakai AI untuk tugas yang berbeda.

#### Teori singkat — teks langsung

AI adalah bidang yang mengembangkan sistem untuk pekerjaan seperti mengenali pola, membuat prediksi, memecahkan masalah, dan menghasilkan konten. Chatbot adalah salah satu contoh yang bisa kamu temui.

#### Penjelasan tambahan — bisa dibuka

Untuk memahami sebuah fitur, lihat pekerjaan yang dilakukannya. Filter spam membantu mengelompokkan pesan. Rekomendasi musik memilih lagu yang diperkirakan cocok. AI generatif dapat menyusun teks atau gambar berdasarkan permintaan. Satu aplikasi juga bisa menggabungkan beberapa kemampuan.

Contoh-contoh ini membantu mengenali fungsi AI; kamu belum perlu menghafal nama model atau cara membangunnya.

#### Penutup — setelah melihat contoh atau pembahasan

Saat melihat contoh berikutnya, tanyakan: tugas apa yang dikerjakan sistem, dan bagian mana yang perlu diperiksa?

#### Penghubung ke bagian berikutnya

Dari penggunaan sehari-hari, kita lanjut melihat kemampuan AI pada tugas yang lebih khusus.

### 1.2 — Dari soal matematika hingga penemuan ilmiah

#### Materi utama — lengkap

Kemampuan AI juga terlihat pada tugas yang jauh lebih kompleks. Di International Mathematical Olympiad 2025, versi khusus Gemini Deep Think menyelesaikan lima dari enam soal dan memperoleh **35 dari 42 poin**, setara standar medali emas.

Soalnya diberikan dalam bahasa alami dan jawabannya harus berupa pembuktian matematika. Pada kompetisi itu, model mampu menyelesaikan sebagian besar soal yang diberikan.

Keberhasilan pada kompetisi itu tidak berarti AI berpikir seperti manusia atau akan selalu benar saat mengerjakan soal matematika.

Contoh lain ada di bidang biologi. Bentuk tiga dimensi protein memengaruhi cara protein bekerja, dan **AlphaFold2 membantu memprediksi struktur tiga dimensinya dari urutan asam amino**.

Demis Hassabis dan John Jumper menerima separuh Hadiah Nobel Kimia 2024 atas pengembangan AlphaFold2.

Dalam kasus ini, AI membantu ilmuwan mempelajari struktur protein. AlphaFold2 bukan obat dan tidak menyembuhkan penyakit secara langsung.

**Sumber bacaan**

- [Google DeepMind · IMO 2025](https://deepmind.google/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/)
- [Nobel Prize · AlphaFold2](https://www.nobelprize.org/prizes/chemistry/2024/jumper/facts/)

![Prediksi struktur tiga dimensi protein yang dihasilkan AlphaFold](../public/course-visuals/alphafold-protein.webp)

**Visual:** Contoh struktur tiga dimensi protein yang diprediksi AlphaFold. [AlphaFold · CC0](https://commons.wikimedia.org/wiki/File:AF-P0CH12-F1.png).

#### Konteks — sebelum contoh atau aktivitas

Kamu membaca berita bahwa AI berhasil menyelesaikan soal matematika atau membantu penelitian protein. Sebelum menarik kesimpulan, perhatikan tugas yang diuji dan hasil yang benar-benar ditunjukkan.

#### Teori singkat — teks langsung

Keberhasilan pada suatu tugas memberi bukti tentang kemampuan yang diuji. Untuk menilai kegunaannya di tempat lain, kita perlu melihat kondisi dan cara pengujiannya.

#### Penjelasan tambahan — bisa dibuka

Benchmark adalah tugas atau kumpulan soal untuk mengukur kemampuan tertentu. Nilai tinggi dapat menjadi hasil penting, tetapi belum menjelaskan seluruh kemampuan sistem. Model yang digunakan, soal yang diberikan, alat yang tersedia, dan cara penilaiannya ikut menentukan arti hasil tersebut.

Protein adalah molekul yang menjalankan berbagai fungsi dalam sel dan tubuh. Protein tersusun dari rangkaian asam amino yang dapat membentuk struktur tiga dimensi.

Pada penelitian protein, prediksi struktur memberi informasi yang dapat dipakai ilmuwan dalam penelitian selanjutnya. Menemukan struktur, memahami fungsi, mengembangkan obat, dan menguji pengobatan merupakan pekerjaan yang berbeda.

#### Penutup — setelah melihat contoh atau pembahasan

Perhatikan apa yang sudah dibuktikan pada contoh ini, lalu bedakan dari manfaat lain yang masih membutuhkan penelitian.

#### Penghubung ke bagian berikutnya

Pertanyaan tentang manfaat dan batas pengujian juga penting saat AI dipakai di bidang kesehatan.

### 1.3 — AI untuk membantu pemeriksaan medis

#### Materi utama — lengkap

Di bidang kesehatan, AI juga dipakai untuk membantu pemeriksaan. Salah satu contohnya adalah mammogram, yaitu gambar hasil pemeriksaan payudara. AI bisa membantu radiolog menandai gambar yang perlu diperiksa lebih teliti. Karena kesalahan medis bisa berdampak besar, manfaat AI perlu dinilai bersama risikonya, termasuk apakah penggunaannya membuat lebih banyak pasien harus menjalani pemeriksaan lanjutan.

Sebuah uji klinis yang terbit pada Maret 2026 melibatkan **31.301 perempuan**. Pada strategi yang diuji, tugas membaca gambar oleh radiolog berkurang 63,6% dan tingkat deteksi kanker naik 15,2% dibanding strategi standar.

Namun proporsi pasien yang diminta datang lagi untuk pemeriksaan lanjutan ikut naik. Angka pastinya ada di latihan di bawah.

Angka-angka ini berasal dari studi dan alur kerja tertentu. Hasilnya belum tentu sama jika sistem dipakai di rumah sakit, populasi, atau prosedur pemeriksaan yang berbeda.

Kesimpulan yang tepat bukan ‘AI lebih baik daripada dokter’, melainkan bahwa cara manusia dan AI bekerja bersama harus dirancang serta dievaluasi dengan cermat.

**Semakin besar akibat sebuah kesalahan, semakin penting pengawasan manusia.**

**Sumber bacaan**

- [Nature Medicine · uji mammogram 2026](https://www.nature.com/articles/s41591-026-04277-x)

**RINGKASAN HASIL STUDI: 31.301 perempuan**

Dalam studi pemeriksaan payudara ini, AI mengurangi jumlah gambar yang perlu dibaca radiolog, tetapi lebih banyak pasien juga diminta menjalani pemeriksaan lanjutan.

- **−63,6%:** Jumlah pembacaan gambar yang perlu dilakukan radiolog berkurang dalam strategi yang diuji.
- **+15,2%:** Tingkat deteksi kanker meningkat dibanding strategi standar.

![Mesin pemeriksaan mammografi di ruang pemeriksaan](../public/course-visuals/mammography-machine.webp)

**Visual:** Mesin pemeriksaan mammografi di ruang pemeriksaan. Mesin mammografi mengambil gambar yang kemudian diperiksa radiolog. Foto: Bill Branson / National Cancer Institute. [Public domain · NCI](https://commons.wikimedia.org/wiki/File:Mammography_machine.jpg).

**Latihan interaktif**

Deteksi kanker naik 15,2%. Menurutmu, berapa persen kenaikan pasien yang diminta datang kembali untuk pemeriksaan lanjutan?

Rentang tebakan: 0–40 persen (langkah 0.1).

**Jawaban:** 14.8 persen. Toleransi latihan: ±4.

**Pembahasan:** Pasien yang dipanggil kembali naik 14,8%. Manfaat dan beban tambahan datang bersamaan, jadi satu angka saja tidak cukup untuk menilai sebuah sistem.

**Sumber latihan:** [Studi pemeriksaan payudara](https://doi.org/10.1016/S1470-2045(23)00298-X)

#### Konteks — sebelum contoh atau aktivitas

Bayangkan kamu membaca laporan penggunaan AI untuk membantu memeriksa gambar medis. Laporannya menyebut manfaat, tetapi kamu juga perlu memahami apa yang berubah bagi pasien dan tenaga kesehatan.

#### Teori singkat — teks langsung

Sebuah sistem bisa memberi manfaat sekaligus menambah pekerjaan atau pemeriksaan lanjutan. Untuk menilainya, perhatikan beberapa hasil yang berkaitan, bukan hanya satu angka.

#### Penjelasan tambahan — bisa dibuka

Radiolog adalah dokter yang membaca gambar pemeriksaan medis. Mammogram merupakan gambar dari pemeriksaan mammografi. Pada contoh ini, AI membantu bagian tertentu dalam alur pembacaan gambar.

Dipanggil kembali berarti pasien perlu pemeriksaan lanjutan; panggilan itu sendiri belum berarti diagnosis kanker. Deteksi, jumlah pembacaan gambar, dan pemeriksaan lanjutan mengukur hal yang berbeda. Persentase kenaikan juga perlu dibaca bersama angka awal dan kelompok pembandingnya.

Hasil suatu studi berlaku pada populasi, sistem, dan prosedur yang diteliti. Materi ini membantu membaca temuan penelitian, bukan menilai kondisi kesehatan pribadi.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah angkanya dibuka, lihat manfaat dan beban tambahan secara bersamaan. Coba jelaskan dengan kalimatmu sendiri mengapa satu hasil saja belum cukup untuk menilai sistem.

#### Penghubung ke bagian berikutnya

Sekarang kita beralih dari kegunaan AI ke jenis informasi yang bisa diprosesnya.

### 1.4 — AI bisa memproses lebih dari teks

#### Materi utama — lengkap

Interaksi dengan AI tidak lagi terbatas pada teks. Banyak sistem sekarang bisa menerima gambar, tangkapan layar, dokumen, suara, atau video sebagai bagian dari input. Ini berguna ketika sebuah masalah lebih mudah ditunjukkan daripada dijelaskan panjang lewat chat.

Pengenalan wajah, mengubah suara menjadi teks (transkripsi), dan deteksi objek sudah lama digunakan. Sistem yang menggabungkan beberapa jenis input sekaligus **disebut multimodal**.

Misalnya, saat muncul pesan error di laptop, kamu bisa mengirim tangkapan layar agar AI bisa membaca pesan error itu. Untuk masalah pada perangkat fisik, foto atau kamera juga bisa memberi konteks yang sulit dijelaskan hanya dengan kata-kata.

Meski begitu, ‘memproses gambar’ **bukan berarti AI melihat dan memahami dunia persis seperti manusia**. Periksa petunjuk resmi perangkat sebelum mengikuti saran yang berisiko.

**MULTIMODAL: Input AI tidak hanya teks**

- **Gambar:** Foto atau kamera bisa menunjukkan keadaan yang sulit dijelaskan hanya dengan kata-kata.
- **Suara:** AI bisa mengubah ucapan menjadi teks atau mengenali pola suara.
- **Video:** AI bisa memproses gerakan dan urutan kejadian dalam video.
- **Dokumen:** Isi PDF atau tampilan layar bisa dipakai sebagai konteks saat bertanya.

#### Konteks — sebelum contoh atau aktivitas

Sebuah pesan error panjang mungkin lebih mudah ditunjukkan lewat tangkapan layar. Pada kebutuhan lain, informasi pentingnya justru ada dalam suara, foto, atau video.

#### Teori singkat — teks langsung

Input adalah informasi yang diterima sistem. Output adalah hasil yang diberikan. Sistem multimodal dapat memproses lebih dari satu jenis informasi, misalnya teks dan gambar.

#### Penjelasan tambahan — bisa dibuka

Modalitas berarti jenis informasi, seperti teks, gambar, atau suara. Kemampuan menerima suatu jenis file tidak berarti semua isinya selalu diproses dengan tepat. Gambar buram, tulisan kecil, suara yang tidak jelas, atau bagian dokumen yang hilang dapat memengaruhi hasil.

Perhatikan apa yang benar-benar didukung alat yang kamu pakai. Bila hasilnya menyebut informasi penting dari gambar atau dokumen, cocokkan kembali dengan bahan yang terlihat.

#### Penutup — setelah melihat contoh atau pembahasan

Pilih input yang membantu menunjukkan masalah, lalu periksa apakah bagian pentingnya terbaca dengan benar.

#### Penghubung ke bagian berikutnya

Ketika hasil pemrosesan itu dipakai untuk menggerakkan perangkat, akibat kesalahannya bisa langsung terasa di dunia fisik.

### 1.5 — Dari layar ke dunia fisik

#### Materi utama — lengkap

Saat AI dipakai untuk mengendalikan sistem di dunia fisik, kesalahan prediksi bisa langsung memengaruhi tindakan. Pada sistem bantuan mengemudi, misalnya, kamera dan sensor membaca marka jalan, kendaraan, pejalan kaki, dan lampu lalu lintas sebelum sistem membantu menentukan apakah kendaraan perlu mengerem atau berbelok.

Tesla menyebut Full Self-Driving sebagai sistem yang **tetap membutuhkan pengemudi yang memperhatikan jalan**. Nama produknya tidak mengubah tanggung jawab pengemudi.

Kesalahan di dunia fisik bisa berakibat jauh lebih serius daripada jawaban chatbot yang keliru.

Membuat robot dari karakter animasi seperti Olaf punya tantangan sendiri. Gerakan yang terlihat natural di film belum tentu mudah dilakukan oleh robot sungguhan sambil tetap menjaga keseimbangan.

Untuk melatih gerakannya, peneliti menggunakan proses belajar melalui percobaan dan umpan balik, dengan animasi sebagai referensi. Gerakan kemudian dicoba berkali-kali di simulasi sebelum diterapkan pada robot sungguhan.

Peneliti juga perlu memperhitungkan hal yang sangat praktis, seperti bunyi langkah dan panas motor. Dengan simulasi, gerakan bisa diuji berulang kali sebelum dicoba langsung pada robot sungguhan.

Dalam riset AI fisik juga ada gagasan **world model**: model yang mencoba memperkirakan bagaimana lingkungan berubah ketika suatu tindakan dilakukan.

Untuk sekarang, cukup pahami fungsi dasarnya. Detail teknis tentang cara membangun world model belum perlu dibahas di bagian ini.

**Sumber bacaan**

- [Tesla · Full Self-Driving (Supervised)](https://www.tesla.com/support/fsd)
- [Disney Research · robot Olaf](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/)

**AI FISIK: Dari percobaan ke tindakan**

- **Amati:** Kamera atau sensor menangkap kondisi di sekitar robot.
- **Perkirakan:** Model memperkirakan akibat dari tindakan yang akan dicoba.
- **Uji:** Gerakan bisa dicoba dalam simulasi sebelum diuji pada robot sungguhan.
- **Awasi:** Manusia memeriksa apakah perilaku robot cukup aman di dunia nyata.

![Robot Olaf berdiri di jalan bersalju dalam proyek Disney Research](../public/course-visuals/olaf-robot.webp)

**Visual:** Robot Olaf berdiri di jalan bersalju dalam proyek Disney Research. Robot Olaf belajar berjalan dengan reinforcement learning dan diuji lewat simulasi. Foto: Disney Research. [Disney Research](https://la.disneyresearch.com/publication/olaf-bringing-an-animated-character-to-life-in-the-physical-world/).

**Latihan interaktif**

Susun urutan kerja robot sebelum sebuah gerakan dijalankan di dunia nyata.

**Pilihan**

- Uji: coba gerakan dalam simulasi
- Amati: tangkap kondisi sekitar dengan sensor
- Awasi: manusia menilai keamanannya
- Perkirakan: hitung akibat tindakan

**Petunjuk:** Pikirkan informasi apa yang dibutuhkan untuk memperkirakan gerakan, lalu bedakan uji virtual dari pemeriksaan sebelum tindakan nyata.

**Urutan jawaban:** Amati: tangkap kondisi sekitar dengan sensor → Perkirakan: hitung akibat tindakan → Uji: coba gerakan dalam simulasi → Awasi: manusia menilai keamanannya

**Pembahasan:** Amati → Perkirakan → Uji → Awasi. Gerakan dicoba di simulasi sebelum diterapkan pada robot sungguhan, lalu manusia tetap memeriksa apakah hasilnya aman.

#### Konteks — sebelum contoh atau aktivitas

Kamu melihat robot bergerak atau kendaraan memberi bantuan mengemudi. Sistem perlu memproses keadaan sekitar dan menentukan tindakan, sementara keadaan di dunia nyata dapat berubah.

#### Teori singkat — teks langsung

Sensor membantu menangkap keadaan lingkungan. Simulasi memberi tempat untuk mencoba perilaku sebelum pengujian nyata. Hasil simulasi tetap perlu diperiksa pada kondisi penggunaan yang sebenarnya.

#### Penjelasan tambahan — bisa dibuka

Simulasi adalah lingkungan buatan untuk mencoba suatu keadaan. Peneliti dapat menguji gerakan berulang kali, termasuk pada kondisi yang sulit atau berisiko dicoba langsung. Namun, permukaan, pencahayaan, benda di sekitar, dan kondisi perangkat nyata bisa berbeda dari simulasi.

World model adalah model yang mencoba memperkirakan perubahan lingkungan, termasuk perubahan akibat tindakan. Di bagian ini, cukup pahami fungsi perkiraannya. Tidak semua robot memakai susunan sistem yang sama.

Urutan dalam latihan merupakan penyederhanaan untuk memahami hubungan pengamatan, perkiraan, pengujian, dan pengawasan. Pada sistem nyata, prosesnya dapat berulang.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah menyusun urutan, perhatikan informasi yang dibutuhkan tiap langkah. Pengujian memberi bahan untuk menilai apakah perilaku sistem dapat digunakan dengan aman.

#### Penghubung ke bagian berikutnya

AI juga bisa melakukan tindakan dalam aplikasi digital. Di sana, tindakan dan izin tetap perlu diperhatikan.

### 1.6 — Dari menjawab ke melakukan

#### Materi utama — lengkap

Chatbot biasanya digunakan untuk berdiskusi, meminta penjelasan, atau mencari ide. Kamu mengirim pertanyaan, lalu chatbot memberikan jawaban di percakapan. **AI agent** melangkah lebih jauh: agent bisa diberi tujuan, merencanakan langkah, memakai alat yang tersedia, membaca hasil tindakan sebelumnya, lalu menyesuaikan langkah berikutnya.

Perbedaannya lebih jelas saat masalah tidak bisa selesai hanya dengan saran lewat chat. Jika sebuah project di laptop mengalami error, agent yang punya akses ke file dan terminal bisa memeriksa project langsung, bukan hanya memberi daftar langkah yang harus kamu coba sendiri.

Dalam tugas coding, misalnya, agent bisa membaca file project, mencari penyebab test gagal, mengubah kode setelah mendapat izin, menjalankan test, lalu melihat apakah perbaikannya berhasil.

Perbedaan sederhananya: chatbot sering mengikuti pola tanya → jawab; AI agent mengikuti tujuan → rencana → tindakan → pemeriksaan.

Karena agent bisa melakukan tindakan langsung, izin dan hasil kerjanya perlu diawasi lebih ketat—terutama jika agent bisa mengubah data, menjalankan perintah, atau mengirim sesuatu.

**Perbedaan chatbot dan AI agent**

- **Chatbot:** Chatbot menerima pertanyaan, lalu memberi jawaban atau saran dalam percakapan.
- **AI agent:** AI agent menerima tujuan, menyusun langkah, memakai alat, lalu memeriksa hasilnya.

**Diagram:** Chatbot biasanya berhenti setelah memberi jawaban. Agent bisa melanjutkan dengan menyusun rencana, memakai tool, dan memeriksa hasilnya. Kamu tetap yang menilai hasil akhirnya.

Agent menerima tujuan, merencanakan langkah, memakai alat, lalu memeriksa hasilnya. Jika hasilnya belum sesuai, agent bisa mengulangi langkah-langkah ini.

#### Konteks — sebelum contoh atau aktivitas

Kamu meminta bantuan memperbaiki sebuah proyek. Ada alat yang memberi petunjuk lewat percakapan, dan ada alat yang dapat memeriksa file atau menjalankan perintah jika diberi akses.

#### Teori singkat — teks langsung

AI agent dapat memakai alat untuk mengerjakan beberapa langkah menuju suatu tujuan. Kemampuan bertindak bergantung pada alat, akses, dan izin yang tersedia.

#### Penjelasan tambahan — bisa dibuka

Tool adalah alat yang dapat dipanggil sistem, seperti pencarian web, pembaca file, atau terminal. Model membantu menentukan langkah, sedangkan tool menjalankan fungsi tertentu. Akses membaca file berbeda dari akses mengubahnya atau mengirim data ke tempat lain.

Batas antara chatbot dan agent bisa berbeda menurut produk. Ada aplikasi percakapan yang juga memakai tool. Untuk kebutuhanmu, yang penting adalah mengetahui apa yang dapat dilakukannya dan tindakan apa yang memerlukan persetujuan.

#### Penutup — setelah melihat contoh atau pembahasan

Periksa hasil tindakan yang penting melalui bukti yang tersedia, seperti file yang berubah atau hasil pemeriksaan. Beri akses sesuai pekerjaan yang diperlukan.

#### Penghubung ke bagian berikutnya

Kemampuan membuat dan mengubah konten juga membuat bukti digital perlu diperiksa lebih hati-hati.

### 1.7 — Bukti yang terlihat meyakinkan belum tentu asli

#### Materi utama — lengkap

AI membuat gambar dan suara palsu semakin mudah dibuat dengan hasil yang terlihat meyakinkan. Misalnya, saat menjual tiket konser, kamu menerima tangkapan layar bertuliskan ‘transfer berhasil’. Nama, nominal, dan waktunya bisa terlihat benar, tetapi tangkapan layar itu belum membuktikan bahwa uang benar-benar masuk.

Yang perlu diperiksa adalah **riwayat transaksi di aplikasi bankmu sendiri**, bukan sekadar mencari font yang terlihat aneh.

OJK pernah memperingatkan pemalsuan bukti transfer dengan bantuan AI. Cara verifikasi yang lebih andal adalah memeriksa sumber aslinya.

Prinsip yang sama berlaku untuk identitas. Suara teman yang meminta uang lewat telepon bisa saja ditiru, begitu pula wajah di video.

Jika permintaannya penting atau mendesak, hubungi orang itu melalui kanal lain yang sudah kamu percayai. Jangan menjadikan ‘terdengar seperti suara asli’ sebagai satu-satunya bukti.

**Sumber bacaan**

- [OJK · bukti transfer palsu](https://ojk.go.id/id/Publikasi/Info-Hoax/Pages/Waspada-Pemalsuan-Bukti-Transfer-Menggunakan-AI.aspx)
- [OJK · penipuan suara dan wajah](https://ojk.go.id/id/berita-dan-kegiatan/info-terkini/Pages/Satgas-PASTI-Imbau-Masyarakat-Waspadai-Penipuan-Menggunakan-AI.aspx)

**Contoh sehari-hari: bukti pembayaran tetap perlu diverifikasi**

Di warung atau toko online, bukti transfer atau QRIS bisa diedit. Cek mutasi rekening atau status pembayaran di aplikasi merchant sebelum menyerahkan barang.

![Contoh struk digital dari aplikasi Bank Jago dengan nomor rekening disamarkan](../public/course-visuals/bankjago-receipt.webp)

**Visual:** Contoh struk digital Bank Jago dengan nomor rekening disamarkan. Struk seperti ini tetap perlu dicocokkan dengan mutasi rekening atau status pembayaran di aplikasi merchant. [VulcanSphere · public domain](https://commons.wikimedia.org/wiki/File:Example_of_PAN_truncation_in_digital_receipt.webp).

**Renungkan:** Kalau bukti transfer terlihat asli, apa yang masih perlu dicek?

**Jawaban:** Periksa riwayat transaksi di aplikasi bankmu. Gambar bukti transfer bisa dipalsukan, sedangkan catatan transaksi bank menunjukkan apakah uangnya benar-benar masuk.

#### Konteks — sebelum contoh atau aktivitas

Kamu menjual tiket dan menerima gambar bukti transfer. Sebelum menyerahkan tiket, kamu perlu mengetahui apakah pembayaran yang sesuai benar-benar diterima.

#### Teori singkat — teks langsung

Gambar yang terlihat rapi belum cukup untuk membuktikan sebuah kejadian. Cari catatan atau sumber yang sesuai dengan hal yang ingin kamu pastikan.

#### Penjelasan tambahan — bisa dibuka

Verifikasi adalah memeriksa suatu klaim dengan bukti yang relevan. Dalam kasus pembayaran, cocokkan transaksi yang diterima pada catatan bank atau merchant milikmu. Nama, nominal, dan waktu pada gambar saja belum memastikan pembayaran telah terjadi.

Untuk permintaan dari orang yang dikenal, gunakan kanal lain yang sudah dipercaya bila identitas atau pesannya perlu dipastikan. Menghubungi nomor baru yang diberikan dalam pesan mencurigakan belum menjadi pemeriksaan yang terpisah.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah membuka jawaban refleksi, hubungkan tindakan pemeriksaan dengan pertanyaan utamanya: apakah pembayaran yang sesuai sudah diterima?

#### Penghubung ke bagian berikutnya

Konten yang dibuat atau diubah dengan AI juga dapat berdampak pada orang yang identitasnya digunakan.

### 1.8 — Risiko gambar palsu bagi orang lain

#### Materi utama — lengkap

Gambar, audio, atau video yang dibuat atau dimanipulasi dengan AI sering disebut **konten sintetis**. Konten seperti ini tidak hanya bisa dipakai untuk penipuan finansial, tetapi juga bisa merugikan orang yang wajah atau identitasnya digunakan. Misalnya, foto seseorang diubah menjadi poster seolah-olah ia mengumumkan sesuatu yang tidak pernah ia katakan. Jika orang lain percaya dan ikut menyebarkannya, reputasi orang tersebut bisa rusak, privasinya bisa terganggu, dan ia bisa merasa tidak aman.

Minta izin sebelum memakai foto orang lain, dan periksa asal gambar sebelum membagikannya.

Masalah yang sama bisa muncul pada bukti transfer, pengumuman kampus, atau informasi kesehatan. Sebelum percaya atau membagikannya, cari sumber asli dan pikirkan siapa yang bisa dirugikan jika informasi itu ternyata salah.

**Dampak pada orang yang identitasnya digunakan**

Gambar atau video palsu bisa merusak privasi, reputasi, dan rasa aman orang yang menjadi korban.

#### Konteks — sebelum contoh atau aktivitas

Kamu menerima poster atau video yang memakai wajah seseorang. Isinya seolah-olah menunjukkan bahwa orang itu mengatakan atau melakukan sesuatu.

#### Teori singkat — teks langsung

Konten sintetis adalah konten yang dibuat atau dimanipulasi secara buatan. Sebelum membagikannya, perhatikan asalnya, izin penggunaan identitas, dan dampaknya pada orang yang terlibat.

#### Penjelasan tambahan — bisa dibuka

Konten sintetis bisa dipakai untuk karya kreatif, simulasi, atau tujuan lain. Masalah muncul ketika konten itu menyesatkan, melanggar privasi, atau membuat orang percaya bahwa seseorang terlibat dalam kejadian yang tidak pernah terjadi.

Deepfake biasanya merujuk pada manipulasi yang meniru wajah atau suara seseorang. Kamu tidak perlu memastikan teknik pembuatannya dahulu untuk menunda penyebaran konten yang sumbernya belum jelas. Periksa pengumuman asli atau hubungi pihak terkait melalui kanal yang dipercaya.

#### Penutup — setelah melihat contoh atau pembahasan

Pikirkan siapa yang bisa dirugikan bila konten ini dipercaya. Keputusan membagikan ikut menentukan dampaknya.

#### Penghubung ke bagian berikutnya

Selain memeriksa konten yang diterima, kita perlu memperhatikan informasi yang dikirim ke layanan AI.

### 1.9 — Perhatikan juga data yang kita berikan

#### Materi utama — lengkap

Saat memakai AI, kita tidak hanya mengirim teks prompt. PDF, foto, suara, rekaman layar, kode, dan dokumen kerja yang diunggah juga ikut dikirim ke layanan AI. Karena itu, periksa isi file sebelum mengunggahnya.

**Sebelum mengunggah, tanyakan:** data apa yang akan saya kirim, apakah saya berhak membagikannya, layanan apa yang akan menerima data itu, untuk apa data digunakan, berapa lama data disimpan, dan apakah semua informasi di dalamnya memang diperlukan?

Kalau AI tidak membutuhkan seluruh dokumen, kirim hanya bagian yang relevan. Hapus dulu nama, nomor identitas, alamat, nomor rekening, atau informasi pribadi lain yang tidak diperlukan untuk menjawab pertanyaanmu.

Setiap layanan punya kebijakan data yang berbeda. Aturannya juga bisa berbeda menurut jenis akun dan pengaturan yang kamu pilih.

Di ChatGPT, pengguna akun pribadi bisa mematikan **Improve the model for everyone** agar percakapan baru tidak digunakan untuk melatih model. Untuk akun organisasi seperti ChatGPT Business, Enterprise, dan Edu, OpenAI menyatakan bahwa konten pengguna tidak digunakan untuk melatih model secara default.

Di Gemini, pengaturan **Keep Activity** menentukan apakah percakapan baru disimpan ke akun dan bisa digunakan untuk meningkatkan model. Jika Keep Activity dimatikan, percakapan baru tidak digunakan untuk training model kecuali kamu memilih mengirim feedback.

**Periksa pengaturan produk yang sedang kamu pakai**, terutama sebelum mengirim data orang lain atau data rahasia.

**Sumber bacaan**

- [OpenAI · Data Controls](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)
- [Google · Gemini Privacy Hub](https://support.google.com/gemini/answer/13594961)

**Sebelum mengunggah data ke layanan AI**

- **Data apa?** Pilih hanya data yang diperlukan untuk tugasmu.
- **Punya izin?** Pastikan kamu boleh membagikan data milik orang lain atau tempat kerja.
- **Dikirim ke siapa?** Pastikan kamu tahu layanan apa yang menerima datanya dan bagaimana layanan itu menggunakannya.
- **Disimpan berapa lama?** Periksa berapa lama data disimpan dan apakah ada pengaturan untuk menghapus atau membatasi penggunaannya.

#### Konteks — sebelum contoh atau aktivitas

Kamu ingin meminta AI merangkum dokumen. Di dalamnya ada nama, kontak, dan informasi lain yang mungkin tidak diperlukan untuk membuat ringkasan.

#### Teori singkat — teks langsung

Sebelum mengunggah, tentukan bagian yang diperlukan untuk tugas dan pastikan kamu boleh membagikannya kepada layanan yang dipakai.

#### Penjelasan tambahan — bisa dibuka

Membatasi data yang dibagikan membantu mengurangi informasi yang ikut terkirim. Kamu dapat memakai potongan dokumen atau mengganti identitas yang tidak diperlukan dengan penanda. Nama bukan satu-satunya informasi yang bisa mengidentifikasi orang; kombinasi alamat, tanggal, atau rincian kegiatan juga dapat memberi petunjuk.

Penyimpanan percakapan, penggunaan data untuk pelatihan, dan izin membagikan dokumen merupakan hal yang berbeda. Mematikan suatu pengaturan tidak otomatis menyelesaikan semua pertanyaan tentang data. Baca ketentuan layanan dan aturan organisasi yang berlaku sebelum mengirim bahan sensitif.

#### Penutup — setelah melihat contoh atau pembahasan

Tentukan apa yang benar-benar perlu dikirim, siapa penerimanya, dan apakah kamu memiliki izin. Jika belum jelas, tanyakan kepada pihak yang bertanggung jawab atas data tersebut.

#### Penghubung ke bagian berikutnya

Sekarang kita melihat kesalahan yang dapat muncul pada jawaban, bahkan saat tidak ada orang yang sengaja memalsukan informasi.

### 1.10 — AI juga bisa salah tanpa ada yang berniat menipu

#### Materi utama — lengkap

AI juga bisa menghasilkan informasi salah meskipun tidak ada orang yang sedang mencoba menipu. Dalam tugas kuliah, misalnya, AI bisa memberi kutipan lengkap dengan judul sumber yang terlihat meyakinkan. Sebelum memasukkannya ke daftar pustaka, buka sumber aslinya. Judulnya bisa saja tidak ada, atau isi kutipannya berbeda dari yang ditulis AI. Jika AI menyebut aturan kampus, cek halaman resmi kampus.

**Mengulang pertanyaan ke AI yang sama tidak menggantikan verifikasi ke sumber.**

Karena AI bisa salah, penggunaannya perlu punya batas yang jelas. Klaim penting perlu diperiksa, fitur baru perlu diuji, dan tugas berisiko tinggi tetap membutuhkan pengawasan manusia.

Jangan menilai AI hanya sebagai ‘baik’ atau ‘buruk’. Lihat dulu tugasnya, siapa yang terdampak jika hasilnya salah, dan bukti apa yang tersedia untuk memeriksa hasil itu.

**Periksa klaim penting ke sumber asli**

- **Jawaban AI:** Jawaban AI bisa terdengar rapi meski angka, kutipan, atau kesimpulannya salah.
- **Sumber asli:** Buka dokumen, aturan kampus, atau penelitian asli sebelum memakai klaim penting.

**Latihan interaktif**

Kamu meminta AI merangkum aturan penggunaan AI di kampus. Ini jawabannya. Dua kalimat perlu diperiksa sebelum dipakai.

Tandai 2 bagian yang perlu diperiksa:

- Panduan kampus meminta mahasiswa menyebutkan bantuan AI pada tugas. — Bukan sasaran. Kalimat ini ada di dokumen panduan.

- Sebanyak 87% dosen menyetujui aturan ini. **(Angka tanpa sumber)** — Sasaran. Tidak ada survei yang dirujuk. Angka sepresisi ini perlu sumber yang bisa dibuka.

- Mahasiswa tetap bertanggung jawab atas isi tugasnya. — Bukan sasaran. Ini pernyataan yang konsisten dengan panduan.

- Aturan serupa sudah berlaku di seluruh kampus Indonesia sejak 2019 (Panduan Nasional AI, hlm. 12). **(Sitasi yang tidak bisa diperiksa)** — Sasaran. Judul dan nomor halamannya terdengar meyakinkan, tetapi jawaban tidak memberikan dokumen atau tautan yang bisa diperiksa. Sitasi yang terlihat rapi belum tentu benar.

**Pembahasan:** Dua bagian itu perlu dicek ke sumber aslinya: angka yang muncul tanpa rujukan, dan sitasi yang terdengar resmi tetapi tidak bisa dibuka.

#### Konteks — sebelum contoh atau aktivitas

Kamu memakai AI untuk membantu memahami panduan kampus. Sebagian kalimat terdengar masuk akal, tetapi ada angka dan rujukan yang perlu diperiksa sebelum digunakan.

#### Teori singkat — teks langsung

Jawaban yang lancar dapat memuat informasi keliru. Sitasi adalah petunjuk menuju sumber; isi dan keberadaan sumbernya tetap perlu diperiksa.

#### Penjelasan tambahan — bisa dibuka

Kesalahan yang menghasilkan fakta atau sumber seolah-olah benar sering disebut halusinasi AI. Saat memeriksa sitasi, pastikan dokumennya ada, kutipannya sesuai, dan konteksnya mendukung klaim.

Dalam latihan, nilai setiap bagian berdasarkan bahan dan pembahasan yang disediakan. Dua bagian yang tidak menjadi sasaran latihan tidak berarti semua klaim serupa selalu benar di kampus lain. Aturan nyata harus diperiksa pada panduan yang berlaku untuk tugasmu.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah pemeriksaan, perhatikan alasan bagian itu perlu diverifikasi: adakah bukti yang bisa dibuka, dan apakah bukti tersebut mendukung pernyataannya?

#### Penghubung ke bagian berikutnya

Kita sudah melihat kemampuan dan batas AI. Sebelum membahas cara kerjanya, kita perlu membedakan AI dari fitur yang hanya bekerja otomatis.

### 1.11 — Apakah semua yang otomatis itu AI?

#### Materi utama — lengkap

Setelah melihat berbagai kemampuan AI, penting untuk membedakannya dari otomatisasi biasa. Tidak semua sistem yang bisa mendeteksi kondisi dan mengambil tindakan otomatis menggunakan machine learning. TCAS pada pesawat, misalnya, bisa mendeteksi potensi tabrakan dan memberi pilot saran untuk naik atau turun.

Namun sistem yang mendeteksi, menghitung, dan memberi saran secara otomatis **belum tentu menggunakan machine learning atau AI modern**. Aturan yang ditulis manusia juga bisa menghasilkan perilaku yang sangat canggih.

Jadi pertanyaan untuk pelajaran berikutnya ialah: jika kemampuan mengambil keputusan otomatis saja belum cukup, apa yang sebenarnya dimaksud orang ketika mengatakan ‘AI’?

**Sumber bacaan**

- [FAA · penjelasan TCAS II](https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html)

**Otomatisasi dan model AI bekerja dengan cara berbeda**

- **Aturan:** Sistem mengikuti aturan yang ditulis manusia, misalnya sensor parkir yang berbunyi pada jarak tertentu.
- **Model AI:** Model machine learning belajar mengenali pola dari banyak contoh data.

#### Konteks — sebelum contoh atau aktivitas

Kamu melihat fitur yang menerima informasi dan memberi peringatan otomatis. Perilakunya tampak pintar, tetapi nama atau tampilannya belum menjelaskan cara sistem dibangun.

#### Teori singkat — teks langsung

Otomatisasi berarti suatu proses dapat berjalan tanpa dioperasikan terus-menerus. Sebuah sistem otomatis bisa memakai aturan yang ditulis manusia, model yang dilatih dengan data, atau gabungan keduanya.

#### Penjelasan tambahan — bisa dibuka

Aturan tetap dapat menghasilkan sistem yang rumit dan berguna. Untuk membedakannya dari machine learning, lihat apakah pola perilakunya ditentukan melalui aturan yang ditulis atau dipelajari lewat pelatihan dengan data.

AI adalah bidang luas yang juga memiliki pendekatan berbasis pengetahuan dan aturan. Jadi, jangan memakai aturan sederhana “semua sistem berbasis aturan pasti bukan AI”. Pada contoh ini, kita sedang membedakan otomatisasi biasa dari pendekatan machine learning.

#### Penutup — setelah melihat contoh atau pembahasan

Tanyakan bagaimana fiturnya bekerja. Kata “otomatis” saja belum cukup untuk menyimpulkan apakah machine learning digunakan.

#### Penghubung ke bagian berikutnya

Pelajaran berikutnya menjelaskan hubungan antara AI, machine learning, model, dan data.

### Penutup pelajaran 1 — materi utama lengkap

**Yang perlu diingat:** Saat AI menghasilkan sesuatu yang terlihat meyakinkan, tanyakan apa yang sebenarnya berhasil dilakukan sistem dan bagian mana yang masih perlu diverifikasi. Tangkapan layar transfer, misalnya, tetap harus dicocokkan dengan riwayat bankmu.

**Cek pemahaman:** Pembeli mengirim tangkapan layar transfer yang tampak meyakinkan. Langkah paling tepat?

1. Minta nomor referensi transfer dari pembeli dan cocokkan dengan angka di tangkapan layar. — Nomor referensi dan gambar masih berasal dari pembeli; keduanya belum membuktikan uang masuk ke rekeningmu.

2. Periksa nama penerima, nominal, dan jam transfer yang tertulis pada tangkapan layar. — Detail yang tampak cocok tetap bisa muncul pada gambar yang keliru atau diubah.

3. Buka riwayat transaksi di aplikasi bankmu dan cocokkan uang yang benar-benar masuk. **(jawaban tepat)** — Tepat. Catatan di rekeningmu sendiri adalah bukti yang perlu dipakai sebelum mengirim tiket.

## Pelajaran 2: Sebenarnya, Apa Itu AI?

**Pertanyaan utama:** Apa yang membuat sebuah sistem disebut AI?

Tidak semua fitur yang tampak ‘pintar’ bekerja dengan cara yang sama. Sensor parkir bisa berbunyi saat mobil terlalu dekat dengan dinding, sementara aplikasi foto bisa mengenali objek seperti kucing. Pelajaran ini membedakan sistem berbasis aturan, machine learning, deep learning, dan generative AI agar istilah-istilah itu tidak tercampur.

### 2.1 — Otomatis belum tentu AI

#### Materi utama — lengkap

Ambil contoh sensor parkir. Sensor membaca jarak, membandingkannya dengan batas yang sudah ditentukan, lalu menyalakan alarm. Sistem seperti ini bisa bekerja hanya dengan aturan yang ditulis manusia, tanpa belajar dari contoh data.

Ingat TCAS dari pelajaran pertama? Sistem pesawat itu juga menerima informasi, menghitung risiko, lalu memberi saran kepada pilot. Kemampuan otomatis yang canggih masih bisa dibangun dari logika yang dirancang manusia.

Secara sederhana: **input (data yang diterima) → aturan yang ditulis manusia → output (hasilnya)**. Aturan bisa sangat rumit dan tetap berguna.

Menyebut suatu fitur ‘pintar’ atau ‘otomatis’ belum membuktikan bahwa fitur itu memakai AI.

**Sumber bacaan**

- [FAA · TCAS II](https://www.faa.gov/air_traffic/publications/aim_html/chap4_section_4.html)

**Dua contoh cara kerja sistem**

- **Sensor parkir:** Sensor parkir berbunyi ketika kendaraan terlalu dekat dengan objek di sekitarnya.
- **Model machine learning:** Model dilatih dengan banyak contoh agar bisa mengenali pola pada data baru.

![Diagram simbol TCAS untuk pesawat sendiri, pesawat lain, dan tingkat ancaman](../public/course-visuals/tcas-symbology.webp)

**Visual:** Diagram simbol TCAS untuk pesawat sendiri, pesawat lain, dan tingkat ancaman. Contoh sistem otomatis yang memberi peringatan saat pesawat terlalu dekat. [FAA](https://www.faa.gov/lessons_learned/transport_airplane/accidents/RA-85816).

**Renungkan:** Apakah semua sistem yang bekerja otomatis disebut AI?

**Jawaban:** Tidak. Ada sistem yang cukup mengikuti aturan yang ditulis manusia. Cara kerjanya perlu dilihat sebelum memberi label AI.

#### Konteks — sebelum contoh atau aktivitas

Kita mulai dari sensor parkir yang memberi alarm saat jaraknya melewati batas tertentu. Contoh ini membantu melihat hubungan antara informasi masuk, aturan, dan hasil.

#### Teori singkat — teks langsung

Pada contoh sistem berbasis aturan, pengembang menentukan apa yang dilakukan ketika suatu kondisi terpenuhi. Model machine learning mempelajari hubungan dari data selama pelatihan.

#### Penjelasan tambahan — bisa dibuka

Sebuah sistem dapat menggabungkan keduanya. Misalnya, model memperkirakan risiko, lalu aturan menentukan kapan peringatan ditampilkan. Karena itu, hasil yang berubah-ubah tidak otomatis membuktikan adanya machine learning; aturan pun dapat memberi hasil berbeda pada input yang berbeda.

Perbandingan ini membantu memahami pendekatan, bukan memberi penilaian bahwa salah satunya selalu lebih baik. Kecocokan sistem mengikuti kebutuhan tugas.

#### Penutup — setelah melihat contoh atau pembahasan

Pada refleksi, gunakan informasi tentang cara kerja sistem. Jika penjelasannya belum tersedia, kamu boleh menyimpulkan bahwa jenis teknologinya belum dapat dipastikan.

#### Penghubung ke bagian berikutnya

Sekarang kita melihat keadaan ketika menulis semua aturan menjadi sulit.

### 2.2 — Ketika aturan sulit ditulis satu per satu

#### Materi utama — lengkap

Menulis aturan satu per satu mulai tidak praktis ketika pola yang ingin dikenali sangat beragam. Untuk membedakan foto kucing dan anjing, misalnya, aturan seperti ‘punya bulu’ atau ‘empat kaki’ tidak membantu banyak karena keduanya punya ciri itu.

Sudut kamera, cahaya, warna, dan bagian tubuh yang tertutup membuat daftar aturan semakin panjang.

AI adalah bidang yang mengembangkan sistem untuk tugas seperti mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten.

**Machine learning adalah salah satu cara membangunnya**: berikan banyak contoh, lalu sistem menyesuaikan model untuk menangkap pola yang berguna.

Jadi AI adalah bidang yang lebih luas, sedangkan machine learning adalah salah satu pendekatannya.

**Mengapa aturan manual cepat menjadi rumit**

- **Cahaya berubah:** Foto kucing yang sama bisa tampak berbeda saat terang dan gelap.
- **Sudut kamera:** Kucing dari samping terlihat berbeda dari kucing yang menghadap kamera.
- **Sebagian tertutup:** Wajah atau tubuh hewan bisa tertutup sehingga cirinya tidak lengkap.

**Diagram:** Alih-alih menulis aturan satu per satu, model belajar memisahkan kelompok berdasarkan contoh yang diberikan. Ketika contoh berubah atau bertambah, hasil pemisahannya juga bisa berubah.

Model belajar membedakan kelompok berdasarkan pola dari contoh data. Ketika contoh baru ditambahkan, pola yang dipelajari dan prediksinya bisa ikut berubah.

#### Konteks — sebelum contoh atau aktivitas

Kamu ingin membedakan foto kucing dan anjing. Bentuk, warna, cahaya, dan sudut foto berubah-ubah, sehingga daftar ciri sederhana belum cukup.

#### Teori singkat — teks langsung

Machine learning merupakan salah satu pendekatan dalam AI. Sistem menyesuaikan model dari data agar dapat membuat perkiraan pada contoh baru.

#### Penjelasan tambahan — bisa dibuka

Data latihan memberi contoh pola yang ingin dipelajari. Namun, contoh yang terlalu terbatas bisa membuat model kurang cocok pada keadaan lain. Misalnya, model yang hanya melihat foto terang perlu diuji kembali pada foto gelap atau sudut yang berbeda.

Generalisasi berarti kemampuan memakai pola yang dipelajari pada data baru. Untuk mengetahui apakah model mampu melakukannya, pengujian perlu mencakup contoh yang belum dipakai untuk melatih model.

#### Penutup — setelah melihat contoh atau pembahasan

Saat melihat diagram, bedakan perubahan yang berasal dari pelatihan model dengan penggunaan model untuk membaca satu contoh baru.

#### Penghubung ke bagian berikutnya

Berikutnya, kita telusuri proses dari menyiapkan data sampai menghasilkan prediksi.

### 2.3 — Data → training → model → output

#### Materi utama — lengkap

Untuk pengenal kucing dan anjing, kita bisa memberi banyak foto beserta jawabannya. Saat training, sistem menyesuaikan model agar bisa membedakan pola.

Setelah itu, **foto baru menjadi input dan model membuat prediksi**.

Model tidak harus menyimpan aturan sederhana seperti ‘jika telinga segitiga, maka kucing’; hubungan yang dipelajarinya bisa jauh lebih kompleks.

Ini hanya gambaran dasar untuk memudahkan pemahaman. Tidak semua sistem AI dilatih dengan proses yang persis sama.

Intinya, kualitas data dan proses training memengaruhi kemampuan model. Saat menerima input baru, model tetap menghasilkan prediksi, dan prediksi itu bisa salah.

**Alur dasar dari data sampai prediksi**

- **Data:** Kumpulkan foto kucing dan anjing dengan label yang benar.
- **Training:** Model dilatih untuk membedakan pola dari foto-foto itu.
- **Model:** Foto baru menjadi input bagi model yang sudah dilatih.
- **Output:** Model memprediksi ‘kucing’ atau ‘anjing’; prediksi ini masih bisa salah.

**Latihan interaktif**

Susun alur melatih dan memakai sebuah model pengenal gambar.

**Pilihan**

- Model: hasil pelatihan yang siap dipakai
- Data: foto berlabel kucing dan anjing
- Prediksi: jawaban untuk foto baru
- Training: model menyesuaikan diri dari contoh

**Petunjuk:** Bedakan bahan latihan, proses belajar, hasil pelatihan, dan penggunaan hasil itu pada foto baru.

**Urutan jawaban:** Data: foto berlabel kucing dan anjing → Training: model menyesuaikan diri dari contoh → Model: hasil pelatihan yang siap dipakai → Prediksi: jawaban untuk foto baru

**Pembahasan:** Data → Training → Model → Prediksi. Model tidak diberi aturan satu per satu; ia menyesuaikan diri dari contoh yang sudah berlabel.

#### Konteks — sebelum contoh atau aktivitas

Kita memakai kasus foto kucing dan anjing yang sama. Kali ini, perhatikan apa yang tersedia sebelum pelatihan dan apa yang dipakai ketika foto baru masuk.

#### Teori singkat — teks langsung

Data menjadi bahan pelatihan. Training adalah proses menyesuaikan model. Model yang dihasilkan kemudian dipakai untuk membuat prediksi dari input baru.

#### Penjelasan tambahan — bisa dibuka

Label adalah jawaban atau kategori yang menyertai contoh latihan, seperti “kucing” atau “anjing”. Prediksi adalah perkiraan model ketika memproses contoh baru.

Training dan penggunaan model merupakan kegiatan berbeda. Mengirim satu foto baru untuk dikenali biasanya memakai model yang sudah dilatih. Itu tidak otomatis berarti model langsung dilatih ulang dari foto tersebut. Penyimpanan input atau penggunaan untuk pelatihan selanjutnya mengikuti cara sistem dan layanannya dirancang.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah menyusun urutan, jelaskan apa peran tiap langkah: bahan latihan, proses penyesuaian, hasil pelatihan, lalu jawaban untuk foto baru.

#### Penghubung ke bagian berikutnya

Pelatihan dapat memakai jenis contoh dan umpan balik yang berbeda. Kita akan membandingkan beberapa pendekatannya.

### 2.4 — Tiga cara belajar yang sering dibahas

#### Materi utama — lengkap

Ada beberapa cara model belajar dari data. Jika setiap foto latihan sudah diberi label ‘kucing’ atau ‘anjing’, model memiliki jawaban yang bisa dipakai sebagai acuan selama training. Cara ini disebut **supervised learning**. Contoh lain ialah email yang diberi label spam atau bukan spam.

Model memakai contoh berlabel itu untuk membuat prediksi pada foto atau email baru.

Dalam **unsupervised learning**, data tidak diberi kelompok yang benar sejak awal.

Sistem mencari pola kemiripan, misalnya pelanggan yang sering belanja kecil-kecilan dan pelanggan yang jarang belanja tetapi sekali transaksi besar.

Dalam **reinforcement learning**, sistem mencoba tindakan, menerima umpan balik, lalu menyesuaikan perilaku; robot yang belajar bergerak adalah salah satu contohnya.

Ketiganya tidak perlu dihafal sebagai daftar; yang penting adalah memahami bagaimana data dan umpan balik dipakai dalam proses belajar.

**Tiga pendekatan belajar yang umum**

- **Supervised learning:** Model belajar dari contoh yang sudah diberi label, seperti email spam atau bukan spam.
- **Unsupervised learning:** Model mencari kelompok atau kemiripan dalam data yang belum diberi label.
- **Reinforcement learning:** Model mencoba tindakan dan memperbaikinya berdasarkan umpan balik.

#### Konteks — sebelum contoh atau aktivitas

Pada foto berlabel, model memiliki contoh jawaban. Pada data lain, sistem mungkin mencari kemiripan atau belajar dari hasil suatu tindakan.

#### Teori singkat — teks langsung

Perhatikan bentuk informasi yang membantu proses belajar: jawaban pada contoh, pola kemiripan, atau umpan balik atas tindakan.

#### Penjelasan tambahan — bisa dibuka

Pada supervised learning, contoh latihan disertai target atau label. Pada unsupervised learning, sistem mencari struktur dalam data tanpa target jawaban yang sama seperti latihan berlabel. Pada reinforcement learning, sistem mempelajari tindakan melalui umpan balik yang terkait dengan tujuan.

Kelompok yang ditemukan dalam data belum otomatis memiliki makna yang benar atau berguna. Umpan balik pada tindakan juga perlu dirancang sesuai tujuan. Sebuah sistem dapat memakai lebih dari satu pendekatan selama pengembangannya.

#### Penutup — setelah melihat contoh atau pembahasan

Gunakan contoh untuk memahami perbedaannya. Nama pendekatannya dapat kamu lihat kembali saat diperlukan.

#### Penghubung ke bagian berikutnya

Selain cara memberi contoh dan umpan balik, bentuk model juga memengaruhi bagaimana pola dipelajari.

### 2.5 — Deep learning dan data yang lebih rumit

#### Materi utama — lengkap

Sebagian data lebih sulit ditangani dengan aturan sederhana. Foto terdiri dari banyak piksel, suara memiliki pola frekuensi dan waktu, makna kata bergantung pada konteks kalimat, dan video menambahkan gerakan serta urutan kejadian.

Untuk menemukan pola dalam data seperti itu, banyak sistem modern memakai **deep learning, yaitu bagian dari machine learning** yang menggunakan jaringan saraf buatan dengan banyak lapisan.

Istilah ‘saraf’ terinspirasi sejarah penelitian, tetapi jaringan itu bukan otak manusia dalam komputer. Jaringan saraf buatan adalah pendekatan matematis untuk mempelajari hubungan yang kompleks.

Deep learning membantu banyak kemajuan pada pengenalan gambar, suara, bahasa, dan robotika.

**Alur sederhana deep learning**

- **Input:** Foto, suara, atau teks menjadi data yang diproses model.
- **Lapisan model:** Jaringan saraf buatan mempelajari hubungan antarpola melalui banyak lapisan.
- **Output:** Hasilnya bisa berupa label objek pada foto, teks dari ucapan, atau prediksi lain.

**Diagram:** Training dan prediksi adalah dua fase yang berbeda. Yang kamu pakai sehari-hari adalah fase kanan, yaitu model yang sudah selesai belajar.

Training memakai banyak contoh berlabel untuk menyesuaikan model. Saat prediksi, data baru tanpa label masuk ke model yang sudah dilatih dan menghasilkan jawaban.

#### Konteks — sebelum contoh atau aktivitas

Foto berisi banyak piksel, suara berubah sepanjang waktu, dan arti kalimat bergantung pada kata di sekitarnya. Model perlu memproses hubungan yang rumit dalam data tersebut.

#### Teori singkat — teks langsung

Deep learning adalah bagian dari machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. Lapisan-lapisan itu mempelajari hubungan dalam data.

#### Penjelasan tambahan — bisa dibuka

Jaringan saraf buatan merupakan susunan perhitungan yang dapat disesuaikan selama pelatihan. Istilah “saraf” tidak berarti sistem memiliki otak, perasaan, atau pengalaman seperti manusia.

Banyaknya lapisan bukan ukuran kecerdasan manusia. Kualitas data, tujuan pelatihan, rancangan model, dan cara pengujian ikut menentukan kemampuan yang dapat digunakan. Diagram pada bagian ini merupakan gambaran awal; kamu belum perlu memahami rumus atau membangun jaringan sendiri.

#### Penutup — setelah melihat contoh atau pembahasan

Ketika membaca diagram, perhatikan mana yang menunjukkan pelatihan dan mana yang menunjukkan penggunaan model pada input baru.

#### Penghubung ke bagian berikutnya

Model dapat dipakai untuk mengenali sesuatu atau menghasilkan konten. Berikutnya kita membedakan tugasnya.

### 2.6 — Dari mengenali menjadi menghasilkan

#### Materi utama — lengkap

Sebagian AI memperkirakan kategori atau memilih sesuatu yang relevan: filter spam memberi label, sistem rekomendasi memilih lagu, model prediksi memperkirakan risiko.

Kelompok ini sering disebut AI prediktif atau diskriminatif, bergantung pada tugasnya.

**Generative AI membuat konten baru** seperti teks, gambar, audio, video, atau kode berdasarkan input pengguna.

Keduanya berada di dalam payung AI; generative AI bukan nama lain untuk seluruh AI.

Generative AI modern banyak memakai deep learning.

Ada juga model generatif yang lebih lama dan tidak memakai deep learning. Jadi, jangan menganggap AI, machine learning, deep learning, dan generative AI selalu tersusun sebagai empat tingkat yang sederhana.

Untuk pemula, cukup tanyakan tugasnya: apakah sistem sedang mengklasifikasi, merekomendasikan, memprediksi, atau menghasilkan konten?

**Bedakan tugas prediktif dan generatif**

- **AI prediktif:** Contohnya filter spam yang memberi label atau sistem yang memperkirakan risiko.
- **Generative AI:** Contohnya model yang membuat teks, gambar, suara, video, atau kode baru.

#### Konteks — sebelum contoh atau aktivitas

Filter spam mengelompokkan email, sedangkan alat penulis membuat draf balasan. Keduanya dapat memakai AI, tetapi hasil yang diminta berbeda.

#### Teori singkat — teks langsung

Perhatikan pekerjaan sistem: memberi kategori, memperkirakan nilai, merekomendasikan pilihan, atau menghasilkan konten.

#### Penjelasan tambahan — bisa dibuka

Generative AI dapat menghasilkan teks, gambar, suara, video, atau kode berdasarkan input. Hasil yang baru dibuat tetap dapat memuat kesalahan atau pola yang tidak sesuai kebutuhan.

Satu aplikasi dapat menggabungkan beberapa tugas. Misalnya, aplikasi mengenali objek pada gambar lalu menghasilkan penjelasan tentangnya. AI, machine learning, dan deep learning menjelaskan bidang atau pendekatan; generatif menjelaskan kemampuan menghasilkan. Hubungannya tidak perlu dipaksakan menjadi empat kotak bertingkat yang selalu sama.

#### Penutup — setelah melihat contoh atau pembahasan

Coba jelaskan contoh berdasarkan tugas dan hasilnya dahulu. Kamu bisa memakai istilah teknis setelah hubungan itu jelas.

#### Penghubung ke bagian berikutnya

Untuk hasil berbentuk teks, kita akan melihat gambaran dasar bagaimana model bahasa menyusun jawaban.

### 2.7 — Mengapa model bahasa bisa menjawab dengan lancar?

#### Materi utama — lengkap

Model bahasa bisa menghasilkan kalimat yang lancar karena dilatih pada sangat banyak contoh teks. Saat menjawab, model memproses input lalu memperkirakan bagian berikutnya berdasarkan pola yang dipelajari saat training.

Sistem modern melakukan proses ini berulang sehingga bisa menulis kalimat panjang, mengikuti instruksi, merangkum, dan membantu memecahkan masalah.

Penjelasan “memprediksi bagian berikutnya” hanya gambaran awal, bukan uraian lengkap tentang cara kerja model bahasa modern.

**Kelancaran bahasa tidak membuktikan** bahwa model memiliki pengalaman, niat, atau pemahaman seperti manusia. Bahkan jawaban yang terdengar sangat yakin bisa berisi informasi yang salah.

**Alur sederhana model bahasa**

- **Input:** Kamu mengirim prompt berisi pertanyaan dan konteks.
- **Pola yang dipelajari:** Model memakai pola bahasa yang dipelajari saat training.
- **Output:** Model menyusun jawaban bagian demi bagian berdasarkan input tadi.

**Diagram:** Model menyusun jawaban sedikit demi sedikit berdasarkan pola yang dipelajari. Proses ini bukan pemeriksaan fakta, sehingga kalimat yang terdengar lancar belum tentu benar.

Pada setiap langkah, model mempertimbangkan beberapa kemungkinan lanjutan berdasarkan pola dari data training. Proses memilih lanjutan ini bukan proses mengecek apakah sebuah fakta benar.

#### Konteks — sebelum contoh atau aktivitas

Kamu mengirim pertanyaan dan mendapatkan beberapa paragraf jawaban. Kelancarannya membuat jawaban mudah dibaca, tetapi kamu tetap perlu menilai isinya.

#### Teori singkat — teks langsung

Model bahasa menyusun jawaban bagian demi bagian berdasarkan input dan pola yang dipelajari. Proses menghasilkan kalimat tidak dengan sendirinya memverifikasi fakta di dalamnya.

#### Penjelasan tambahan — bisa dibuka

Token adalah potongan yang diproses model; token bisa berupa bagian kata, kata, atau tanda baca, bergantung pada sistemnya. Pada gambaran dasar ini, model memperkirakan kemungkinan potongan berikutnya lalu meneruskan prosesnya.

Sebuah aplikasi juga dapat menyediakan pencarian atau alat lain. Sumber dari alat tersebut dapat membantu pemeriksaan, tetapi hasil akhir masih perlu dicocokkan dengan bukti. Memahami proses ini tidak berarti seluruh kemampuan model modern hanya dijelaskan oleh satu analogi sederhana.

#### Penutup — setelah melihat contoh atau pembahasan

Pisahkan dua pertanyaan saat membaca jawaban: apakah kalimatnya mudah dipahami, dan apakah informasi pentingnya didukung bukti?

#### Penghubung ke bagian berikutnya

Selanjutnya, kita melihat mengapa kemampuan dan tindakan AI perlu dinilai sesuai tugas yang sedang dikerjakan.

### 2.8 — Bagus di satu tugas belum tentu bagus di tugas lain

#### Materi utama — lengkap

Kemampuan model tidak selalu konsisten di semua jenis tugas. Model bisa menyelesaikan persoalan yang terlihat sulit, tetapi tetap gagal pada permintaan yang lebih sederhana jika membutuhkan ketelitian tinggi, konteks yang tidak tersedia, atau alat yang tidak dimiliki.

Performa juga berubah menurut model, versi, dan cara pengguna memberi tugas.

Satu video yang menunjukkan kegagalan model bisa menjadi contoh, tetapi tidak membuktikan bahwa semua model akan selalu gagal pada tugas yang sama.

Kadang AI bisa berkata seolah-olah sudah membuka link, menjalankan kode, atau memeriksa sumber, padahal pada sesi itu AI tidak punya tool untuk melakukan tindakan itu.

Tanyakan apa yang benar-benar dilakukan sistem, lalu periksa bukti yang bisa kamu lihat: file yang berubah, hasil pengujian, atau halaman sumber asli.

**Jangan menganggap klaim kemampuan sebagai bukti tindakan.**

**Klaim tindakan perlu bukti**

- **Klaim:** AI mungkin mengatakan sudah membuka link atau menjalankan pengujian.
- **Bukti:** Lihat halaman yang dibuka, file yang berubah, atau hasil pengujian yang benar-benar ada.

**Diagram:** Klaim dan sitasi bisa terlihat rapi, tetapi yang penting adalah apakah sumbernya benar-benar ada dan bisa dibuka.

Jika AI memberi sitasi, buka sitasinya dan pastikan dokumennya benar-benar ada serta mendukung klaim yang dibuat. Jika sumbernya tidak bisa ditemukan, klaim itu belum terverifikasi.

#### Konteks — sebelum contoh atau aktivitas

AI mengatakan sudah membuka sumber atau memeriksa pekerjaan. Kamu ingin memastikan apa yang benar-benar dilakukan sebelum memakai kesimpulannya.

#### Teori singkat — teks langsung

Kemampuan suatu model dan tindakan pada suatu sesi adalah hal yang berbeda. Periksa bukti yang sesuai dengan pekerjaan yang diklaim.

#### Penjelasan tambahan — bisa dibuka

Alat yang tersedia, input, versi model, dan jenis tugas dapat memengaruhi hasil. Satu contoh keberhasilan atau kegagalan tidak cukup untuk menyimpulkan kemampuan semua model pada semua keadaan.

Jika sistem mengaku menjalankan pemeriksaan, lihat hasil pemeriksaannya. Jika sistem memberi rujukan, buka halaman atau dokumen yang dirujuk. Jika bukti belum tersedia, perlakukan tindakannya sebagai belum terkonfirmasi.

#### Penutup — setelah melihat contoh atau pembahasan

Nilai sistem berdasarkan hasil dan bukti yang dapat diperiksa. Klaim “sudah dicek” perlu diikuti informasi tentang apa yang diperiksa dan hasilnya.

#### Penghubung ke bagian berikutnya

Sekarang kita satukan istilah yang sudah muncul agar hubungannya lebih mudah diingat.

### 2.9 — Merangkum istilah yang sudah dipelajari

#### Materi utama — lengkap

Sistem otomatis bisa bekerja tanpa AI. Machine learning mempelajari pola dari data; deep learning adalah salah satu jenisnya; generative AI membuat konten baru.

Pada saat yang sama, model bisa salah, membuat klaim tanpa bukti, atau mengatakan seolah-olah sudah melakukan sesuatu padahal belum.

Setelah memahami istilah dasarnya, pertanyaan yang lebih berguna adalah: kapan AI membantu, bagaimana cara mengecek hasilnya, dan keputusan apa yang tidak seharusnya kita serahkan begitu saja kepada AI?

**Ringkasan istilah utama**

- **Otomatisasi:** Sistem menjalankan langkah tertentu tanpa harus dioperasikan terus-menerus.
- **Machine learning:** Model dilatih dengan data untuk mengenali pola pada contoh baru.
- **Deep learning:** Jenis machine learning yang memakai jaringan saraf buatan berlapis.
- **Generative AI:** Model membuat konten baru, misalnya teks atau gambar.

#### Konteks — sebelum contoh atau aktivitas

Kamu sudah bertemu beberapa istilah. Ringkasan ini membantu menghubungkan istilah dengan contoh, supaya tidak semuanya dianggap sebagai nama lain untuk hal yang sama.

#### Teori singkat — teks langsung

AI merupakan bidang yang luas. Machine learning adalah salah satu pendekatannya. Deep learning termasuk machine learning. Generative AI menghasilkan konten.

#### Penjelasan tambahan — bisa dibuka

Otomatisasi menjelaskan bagaimana proses berjalan dengan sedikit pengoperasian langsung. Model menjelaskan sistem perhitungan yang dipakai untuk menghasilkan perkiraan atau keluaran. Produk atau aplikasi dapat memadukan beberapa pendekatan sekaligus.

Kamu tidak perlu menebak istilah dari tampilan produk. Bila ingin mengetahui teknologinya, cari penjelasan cara kerja fitur tersebut. Gunakan glosarium sebagai rujukan ketika ada istilah yang terlupa.

#### Penutup — setelah melihat contoh atau pembahasan

Pada cek pemahaman, gunakan penjelasan mekanismenya. Nama “perbaiki otomatis” belum memberi informasi yang cukup untuk memastikan pendekatan yang digunakan.

#### Penghubung ke bagian berikutnya

Setelah memahami dasar cara kerja, kita beralih ke kebiasaan memakai AI untuk belajar dan bekerja.

### Penutup pelajaran 2 — materi utama lengkap

**Yang perlu diingat:** Kata ‘otomatis’ belum menjelaskan cara sebuah fitur bekerja. Cari tahu apakah fitur itu hanya mengikuti aturan yang sudah ditulis atau memakai model yang belajar dari data. Untuk hasil yang penting, tetap cek hasil akhirnya.

**Cek pemahaman:** Sebuah fitur foto bertuliskan ‘perbaiki otomatis’. Apakah fitur itu pasti memakai AI?

1. Ya, karena hasil perbaikannya bisa berbeda untuk setiap foto. — Aturan biasa pun bisa memberi hasil berbeda ketika gambar masukannya berbeda.

2. Belum dapat dipastikan; cari penjelasan tentang cara fitur itu memproses foto. **(jawaban tepat)** — Tepat. Fitur otomatis bisa memakai aturan tetap atau model yang belajar dari data.

3. Tidak, karena kata ‘otomatis’ biasanya berarti prosesnya mengikuti aturan tetap. — Nama fitur tidak cukup untuk menyingkirkan kemungkinan bahwa model AI dipakai.

## Pelajaran 3: Berpikir di Era AI

**Pertanyaan utama:** Bagaimana memakai AI tanpa menyerahkan seluruh keputusan kepada AI?

Setelah memahami kemampuan dan cara kerja dasar AI, sekarang kita masuk ke cara menggunakannya dalam pekerjaan. Misalnya, saat magang sebagai analis kamu diminta menyiapkan ringkasan untuk rapat tim. AI bisa membuat draf dengan cepat, tetapi salah satu angkanya tidak punya sumber. Kamu tetap perlu memutuskan apakah angka itu layak dipakai atau harus dibuang.

### 3.1 — Pekerjaan terdiri dari banyak tugas

#### Materi utama — lengkap

Pekerjaan seperti menyiapkan rapat sebenarnya terdiri dari beberapa tugas: mencari data, membaca dokumen, menyusun slide, dan memilih rekomendasi yang bisa dijelaskan kepada tim. AI mungkin mempercepat pencarian dan draf awal, tetapi kamu tetap perlu memahami situasi tim dan mempertanggungjawabkan saranmu.

Artinya, jabatannya bisa tetap sama, tetapi **cara mengerjakan sebagian tugasnya sudah berubah**.

Daripada bertanya apakah AI akan menggantikan seluruh pekerjaan analis, lihat tugasnya satu per satu. Bagian mana yang bisa dibantu AI? Bagian mana yang membutuhkan pemahaman tentang tim, hubungan dengan orang lain, dan tanggung jawabmu sendiri?

Tugas yang jelas, berulang, dan banyak memproses informasi biasanya lebih mudah dibantu AI. Sebaliknya, keputusan yang bergantung pada konteks manusia atau bisa berdampak pada orang lain membutuhkan penilaian yang lebih hati-hati.

**Satu pekerjaan terdiri dari beberapa jenis tugas**

- **Cari informasi:** Analis membaca dokumen dan mencari data yang relevan.
- **Susun draf:** AI bisa membantu merangkum dokumen atau membuat draf presentasi.
- **Pilih rekomendasi:** Manusia menimbang konteks perusahaan sebelum memilih saran.
- **Tanggung jawab:** Manusia menjelaskan alasan keputusan dan menanggung akibatnya.

#### Konteks — sebelum contoh atau aktivitas

Bayangkan kamu menyiapkan bahan untuk rapat tim. Pekerjaannya mencakup membaca data, membuat draf, memeriksa isi, dan memilih rekomendasi.

#### Teori singkat — teks langsung

Untuk menilai bantuan AI, pecah pekerjaan menjadi tugas yang konkret. Tentukan hasil yang dibutuhkan dan siapa yang memeriksanya.

#### Penjelasan tambahan — bisa dibuka

Sebuah jabatan mencakup berbagai tugas dengan kebutuhan berbeda. AI dapat membantu pada satu bagian, sedangkan bagian lain memerlukan informasi organisasi, percakapan dengan orang terkait, atau tanggung jawab profesional.

Daftar tugas membantu menghindari kesimpulan terlalu luas tentang suatu pekerjaan. Mulai dari bagian yang bisa diuji hasilnya, lalu nilai apakah bantuan tersebut benar-benar sesuai kebutuhan.

#### Penutup — setelah melihat contoh atau pembahasan

Perhatikan tugas mana yang menghasilkan draf dan tugas mana yang membutuhkan keputusan tentang hasil draf itu.

#### Penghubung ke bagian berikutnya

Perubahan pada tugas juga dibahas dalam penelitian pekerjaan. Kita akan membaca arti angkanya dengan hati-hati.

### 3.2 — Apa yang ditunjukkan data pekerjaan?

#### Materi utama — lengkap

Perubahan pada tugas-tugas kerja juga terlihat dalam data pasar kerja. ILO melaporkan pada 2026 bahwa di ASEAN belum terlihat kehilangan pekerjaan besar-besaran akibat generative AI. Yang lebih sering terlihat adalah perubahan pada sebagian tugas di dalam sebuah pekerjaan.

Di Indonesia, sebagian pekerjaan memiliki tugas yang secara teknis bisa dipengaruhi AI. Sekitar 3-4% pekerjaan masuk kategori dengan tingkat paparan tertinggi. Angka keseluruhannya ada di latihan di bawah.

**Paparan** di sini berarti seberapa banyak tugas dalam suatu pekerjaan yang secara teknis bisa dipengaruhi AI. Angka ini bukan persentase orang yang pasti kehilangan pekerjaan.

**Rincian Indonesia**

Besarnya paparan berbeda menurut jenis pekerjaan.

Menurut ILO, 93,9% pekerjaan dukungan administratif di Indonesia memiliki tugas yang berpotensi terdampak generative AI, dan 67,5% masuk kategori paparan tertinggi.

Untuk pekerja muda usia 15-24 tahun, angkanya diperkirakan 26,1%, dibanding 21,1% pada pekerja dewasa. Angka ini menunjukkan bahwa sebagian tugas bisa berubah; bukan berarti pekerja muda pasti kehilangan pekerjaannya.

**Sinyal dari Amerika Serikat**

Data dari Stanford Digital Economy Lab memberi gambaran tambahan dari Amerika Serikat.

Hingga Juni 2026, jumlah pekerja usia 22-25 tahun di bidang dengan paparan AI tinggi sekitar 19% lebih rendah dari perkiraan.

Perkiraan itu membandingkan pekerja muda di bidang dengan paparan AI tinggi dengan kelompok muda di bidang yang paparannya lebih rendah. Perubahannya lebih banyak terlihat dari perekrutan yang melambat daripada dari PHK.

Studi itu tidak membuktikan bahwa AI sendirian menyebabkan seluruh selisihnya, dan hasil Amerika Serikat tidak boleh langsung dianggap sebagai prediksi Indonesia.

**Sumber bacaan**

- [ILO · pasar kerja ASEAN 2026](https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited)
- [ILO · rincian Indonesia](https://www.ilo.org/resource/article/navigating-generative-ai%E2%80%99s-transformations-asean-labour-markets)
- [Stanford Digital Economy Lab · pekerja muda](https://digitaleconomy.stanford.edu/news/canariesaug26/)

**Potensi dampak pada pekerjaan di Indonesia**

Menurut ILO, sebagian pekerjaan di Indonesia memiliki tugas yang berpotensi terdampak generative AI. Coba tebak persentasenya pada latihan di bawah. Angka ini bukan jumlah pekerja yang pasti kehilangan pekerjaan.

- **3-4%:** Sekitar 3-4% pekerjaan di Indonesia masuk kategori dengan paling banyak tugas yang bisa dipengaruhi AI.
- **26,1%:** Sekitar 26,1% pekerjaan pada kelompok usia 15-24 tahun memiliki tugas yang berpotensi terdampak AI.

**Latihan interaktif**

Menurut ILO, berapa persen pekerjaan di Indonesia yang punya sebagian tugas berpotensi terdampak generative AI?

Rentang tebakan: 0–60 persen pekerjaan (langkah 0.1).

**Jawaban:** 21.7 persen pekerjaan. Toleransi latihan: ±6.

**Pembahasan:** Sekitar 21,7%. Perhatikan kata ‘sebagian tugas’: ini bukan jumlah pekerja yang pasti kehilangan pekerjaan, melainkan pekerjaan yang sebagian tugasnya bisa berubah.

**Sumber latihan:** [ILO · potensi dampak generative AI](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure)

#### Konteks — sebelum contoh atau aktivitas

Kamu membaca angka tentang pekerjaan yang bisa terdampak AI. Sebelum menafsirkannya, cari tahu apa yang sebenarnya diukur dan kelompok siapa yang diteliti.

#### Teori singkat — teks langsung

Paparan AI menunjukkan kemungkinan sebagian tugas dipengaruhi kemampuan AI. Angka paparan tidak otomatis menunjukkan jumlah orang yang kehilangan pekerjaan.

#### Penjelasan tambahan — bisa dibuka

Perubahan teknis, penggunaan nyata, perekrutan, dan kehilangan pekerjaan merupakan ukuran berbeda. Angka dari negara atau kelompok usia tertentu perlu dibaca sesuai cakupannya.

Ketika membandingkan studi, perhatikan tahun, definisi paparan, jenis pekerjaan, dan cara menghitungnya. Data yang menunjukkan hubungan antara dua keadaan belum otomatis membuktikan bahwa salah satunya menjadi penyebab tunggal.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah angka latihan dibuka, jelaskan arti “sebagian tugas”. Perhatikan apa yang dapat disimpulkan dari ukuran tersebut dan apa yang masih membutuhkan bukti lain.

#### Penghubung ke bagian berikutnya

Berikutnya, kita hubungkan perubahan tugas dengan kemampuan yang dapat kamu latih.

### 3.3 — Apa artinya bagi mahasiswa Indonesia?

#### Materi utama — lengkap

Bagi mahasiswa Indonesia, pertanyaan yang paling relevan bukan hanya ‘pekerjaan apa yang akan berubah?’, tetapi juga ‘kemampuan apa yang bisa saya bangun sekarang?’. Pengembangan AI bergantung pada banyak hal—energi, infrastruktur, chip, talenta, dan aplikasi—dan Indonesia masih membangun kemampuan di berbagai bagian tersebut.

**Tidak setiap mahasiswa perlu membuat model sebesar ChatGPT dari awal.** Jauh lebih banyak orang akan memakai AI dalam belajar, riset, desain, coding, bisnis, dan pelayanan sehari-hari.

Yang lebih penting bagi mahasiswa adalah belajar memakai AI untuk masalah nyata: tahu kapan AI membantu, informasi apa yang perlu diberikan, dan kapan hasilnya harus dicek lagi.

Menguasai nama satu alat saja tidak cukup, karena alatnya akan berubah.

**Sumber bacaan**

- [Komdigi · lima lapisan AI](https://portal.komdigi.go.id/kanal-publik/berita-kini/10477)

**Cara menerapkan AI pada kebutuhan nyata**

- **Saat belajar:** Gunakan AI untuk mencari penjelasan, lalu cek informasi pentingnya.
- **Saat riset:** AI bisa membantu membuat ringkasan awal; kamu tetap membuka sumber asli.
- **Saat berkarya:** AI bisa membantu membuat draf desain, kode, atau ide bisnis.

#### Konteks — sebelum contoh atau aktivitas

Kamu ingin memakai AI untuk kuliah, magang, pekerjaan pertama, atau kegiatan komunitas. Pilih kebutuhan nyata yang hasilnya bisa kamu pahami dan periksa.

#### Teori singkat — teks langsung

Kemampuan memakai AI mencakup menentukan kebutuhan, memberi informasi yang relevan, memahami hasil, dan memeriksa bagian penting.

#### Penjelasan tambahan — bisa dibuka

Contoh mahasiswa digunakan sebagai situasi belajar. Prinsip yang sama dapat dipakai oleh anak muda yang sedang bekerja, berwirausaha, atau mengerjakan kegiatan lain.

Mengenal alat membantu memulai, tetapi alat dapat berubah. Pengetahuan bidang dan kebiasaan memeriksa hasil membantu kamu menilai alat baru tanpa hanya bergantung pada nama produk. Kamu juga tidak perlu membangun model sendiri untuk mempelajari penggunaan AI yang bertanggung jawab.

#### Penutup — setelah melihat contoh atau pembahasan

Pilih satu tugas kecil yang dekat dengan kegiatanmu, lalu tentukan hasil apa yang akan menunjukkan bahwa bantuan AI berguna.

#### Penghubung ke bagian berikutnya

Ketika menerima saran AI, kepercayaan kita pada sistem juga bisa memengaruhi keputusan.

### 3.4 — Manusia + AI tidak otomatis lebih baik

#### Materi utama — lengkap

AI tidak hanya membantu menghasilkan jawaban; cara jawabannya disampaikan juga bisa memengaruhi keputusan kita. Misalnya, kamu awalnya yakin jawaban sebuah soal adalah B, tetapi AI memilih D dengan penjelasan panjang dan terdengar meyakinkan. Jika langsung mengikuti AI tanpa memeriksa alasan dan bukti, kamu bisa meninggalkan jawaban yang sebenarnya benar.

Kebiasaan memberi kepercayaan berlebih kepada sistem otomatis disebut **automation bias**.

Eksperimen yang terbit di Nature Medicine pada 2026 melibatkan 623 orang awam dan 153 dokter layanan primer dalam tugas diagnosis kondisi kulit.

Bantuan AI yang benar bisa membantu, tetapi orang awam lebih sering mengikuti saran AI ketika sarannya salah. Dokter berpengalaman lebih jarang mengikuti saran AI yang salah.

Hasil itu tidak berarti ahli selalu benar. Intinya, pengetahuan bidang membantu kita menilai saran AI.

**Sumber bacaan**

- [Nature Medicine · AI dan keputusan diagnosis 2026](https://www.nature.com/articles/s41591-026-04553-w)

**Automation bias dalam pengambilan keputusan**

- **Langsung ikut AI:** Mengganti penilaian sendiri hanya karena penjelasan AI terdengar yakin.
- **Periksa saran AI:** Bandingkan dengan pengetahuan bidang dan bukti yang tersedia.

#### Konteks — sebelum contoh atau aktivitas

Kamu sudah memiliki jawaban, tetapi AI memberi pilihan lain dengan penjelasan panjang. Sebelum mengganti keputusan, periksa alasan dan bukti dari keduanya.

#### Teori singkat — teks langsung

Automation bias adalah kecenderungan terlalu mengandalkan saran sistem otomatis. Penjelasan yang yakin dapat terasa meyakinkan meskipun sarannya keliru.

#### Penjelasan tambahan — bisa dibuka

Memiliki pengetahuan bidang membantu menilai apakah alasan AI masuk akal. Namun, pengalaman juga tidak menjamin setiap keputusan benar. Pemeriksaan tetap perlu mengikuti tugas dan bukti yang tersedia.

Jika jawabanmu dan AI berbeda, identifikasi bagian yang menyebabkan perbedaan. Cocokkan dengan sumber, contoh, atau perhitungan yang relevan. Menanyakan ulang tanpa menambah bukti belum menyelesaikan perbedaan itu.

#### Penutup — setelah melihat contoh atau pembahasan

Gunakan saran AI sebagai bahan yang perlu dinilai. Keputusan dapat berubah ketika alasannya didukung bukti yang lebih kuat.

#### Penghubung ke bagian berikutnya

Kebiasaan menilai saran berkaitan dengan kemampuan lain yang perlu terus dilatih.

### 3.5 — Lima kemampuan yang tetap perlu dilatih

#### Materi utama — lengkap

Dari contoh-contoh sebelumnya, ada lima kemampuan yang tetap penting saat bekerja bersama AI:

1. **Tentukan tujuan dengan jelas.** Gunakan AI untuk bagian yang memang cocok dibantu, seperti mencari ide awal, merangkum, atau membuat draf, lalu tentukan sendiri bagian yang masih membutuhkan pekerjaan manusia.
2. **Pahami bidang yang sedang dikerjakan.** Pengetahuan coding membantu melihat masalah keamanan pada kode yang dihasilkan AI; pengetahuan riset membantu mengenali asumsi yang keliru dalam ringkasan.
3. **Sesuaikan pemeriksaan dengan risikonya.** Nama acara kampus yang kurang menarik mudah diganti, tetapi ringkasan jurnal perlu dicek ke sumber asli dan keputusan kesehatan memerlukan sumber serta tenaga profesional yang tepat.
4. **Pahami konteks dan orang yang terlibat.** Keputusan tentang pelanggan, tim, atau kebijakan jarang bisa diselesaikan hanya dari informasi yang mudah dimasukkan ke prompt.
5. **Terus belajar.** Alat AI dan cara kerja di banyak bidang terus berubah, sehingga kemampuan menyesuaikan diri tetap penting.

Tidak ada daftar keterampilan yang bisa menjamin pekerjaan seseorang tidak akan terdampak AI.

Namun **kemampuan memakai alat, memahami bidang yang dikerjakan, mengecek hasil AI, memahami situasi dan orang yang terlibat, lalu terus belajar** membuat kita lebih siap menghadapi perubahan.

**Contoh manfaat yang terukur**

Ada manfaat yang terukur pada beberapa tugas.

Dalam studi atas 5.172 agen layanan pelanggan, akses ke asisten AI meningkatkan produktivitas rata-rata 15%, diukur dari jumlah masalah yang diselesaikan per jam. Besarnya manfaat berbeda antarpekerja.

Angka 15% itu berasal dari satu lingkungan kerja, jadi tidak berarti semua pekerjaan akan mendapat peningkatan yang sama. Temuannya hanya menunjukkan bahwa AI bisa membantu produktivitas ketika tugas dan cara penggunaannya memang cocok.

**Sumber bacaan**

- [OECD · AI dan keterampilan](https://www.oecd.org/en/publications/ai-and-skills_f843b352-en/full-report.html)
- [Brynjolfsson dkk. · Generative AI at Work](https://arxiv.org/abs/2304.11771)

**Lima kemampuan yang perlu terus dilatih**

- **Tentukan tujuan:** Tahu masalah apa yang ingin diselesaikan sebelum meminta bantuan AI.
- **Pahami bidangmu:** Pengetahuan bidang membantu melihat kesalahan pada hasil AI.
- **Cek sesuai risiko:** Periksa lebih teliti ketika akibat kesalahan lebih besar.
- **Pahami konteks:** Pertimbangkan orang dan situasi yang tidak terlihat dalam prompt.
- **Terus belajar:** Perbarui keterampilan saat alat dan tugas kerja berubah.

#### Konteks — sebelum contoh atau aktivitas

Kamu memakai AI untuk sebuah tugas, tetapi tetap perlu tahu apa yang diminta, bagaimana memeriksa hasilnya, dan bagaimana menjelaskan keputusanmu.

#### Teori singkat — teks langsung

Kemampuan memakai alat perlu berjalan bersama pengetahuan bidang, penilaian hasil, pemahaman konteks, dan kebiasaan belajar.

#### Penjelasan tambahan — bisa dibuka

Manfaat AI bergantung pada kecocokan tugas dan cara penggunaannya. Studi yang menemukan peningkatan produktivitas pada satu lingkungan kerja tidak memastikan hasil yang sama pada pekerjaan lain.

Lima kemampuan pada materi ini merupakan bekal yang saling melengkapi. Menentukan tujuan membantu memilih penggunaan; pengetahuan bidang membantu memeriksa isi; pemahaman konteks membantu menimbang dampak; belajar berkelanjutan membantu menyesuaikan diri.

#### Penutup — setelah melihat contoh atau pembahasan

Hubungkan tiap kemampuan dengan satu tindakan nyata. Misalnya, “memahami bidang” dapat berarti membuka materi rujukan untuk memeriksa istilah pada ringkasan.

#### Penghubung ke bagian berikutnya

Kemampuan tersebut berkembang ketika kamu tetap terlibat dalam proses berpikir saat memakai AI.

### 3.6 — Jangan menyerahkan seluruh proses berpikir

#### Materi utama — lengkap

Memakai AI untuk mempercepat pekerjaan juga bisa mengubah cara kita berpikir selama mengerjakannya. Sebuah studi Microsoft Research dan Carnegie Mellon mengumpulkan 936 contoh penggunaan generative AI dari 319 pekerja pengetahuan.

Berdasarkan jawaban peserta sendiri, semakin tinggi kepercayaan mereka pada AI, semakin sedikit upaya berpikir kritis yang mereka laporkan pada tugas tertentu.

Peneliti juga menemukan bahwa ketika memakai AI, pengguna **lebih banyak memeriksa, menggabungkan, dan mengawasi hasil AI**.

Studi ini tidak membuktikan bahwa AI membuat orang menjadi kurang pintar. Namun hasilnya menunjukkan pentingnya tetap melakukan bagian pekerjaan yang membutuhkan penilaian dan pemikiran sendiri.

Bandingkan dua cara memakai AI untuk tugas kuliah. Mahasiswa pertama meminta AI mengerjakan semuanya, lalu menyalin hasilnya.

Mahasiswa kedua membuat jawabannya dahulu, meminta AI mencari kelemahannya, memeriksa umpan balik, dan memperbaiki jawabannya sendiri.

Keduanya memakai AI, tetapi cara kedua tetap membuat mahasiswa menyusun jawaban, menilai kritik, dan memperbaikinya sendiri.

**Sumber bacaan**

- [Microsoft Research · studi berpikir kritis](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/)

**Dua pola penggunaan AI untuk belajar**

- **Serahkan semuanya:** Minta jawaban jadi, lalu salin tanpa memeriksa.
- **Minta AI mengkritik draf:** Buat jawaban awal sendiri, minta AI mencari kelemahannya, lalu periksa dan perbaiki.

#### Konteks — sebelum contoh atau aktivitas

Kamu sedang belajar suatu topik. AI dapat membantu menjelaskan atau mengkritik jawabanmu, sementara kamu tetap perlu berlatih menyusun dan memperbaiki pemahaman sendiri.

#### Teori singkat — teks langsung

Perhatikan bagian berpikir yang kamu kerjakan: menyusun jawaban awal, memilih alasan, memeriksa kritik, dan menjelaskan hasil dengan kata-katamu sendiri.

#### Penjelasan tambahan — bisa dibuka

Contoh penggunaan AI dalam materi ini menunjukkan cara yang berbeda untuk melibatkan diri dalam tugas. Kamu bisa mencoba menjawab dahulu, meminta petunjuk untuk bagian yang belum dipahami, lalu memperbaiki jawaban.

Studi yang dibahas memakai laporan pengalaman peserta. Hubungan yang ditemukan tidak membuktikan bahwa AI membuat semua pengguna kehilangan kemampuan berpikir. Gunakan temuan itu sebagai alasan untuk meninjau kebiasaan belajar, sambil tetap memperhatikan batas studinya.

#### Penutup — setelah melihat contoh atau pembahasan

Jika AI memberi jawaban, coba jelaskan alasan di baliknya tanpa menyalin seluruh teks. Bagian yang belum bisa kamu jelaskan dapat menjadi bahan pertanyaan berikutnya.

#### Penghubung ke bagian berikutnya

Untuk membantu menerapkan kebiasaan tersebut, kita gunakan empat langkah sederhana.

### 3.7 — Empat langkah yang mudah dipakai

#### Materi utama — lengkap

Untuk menangani angka tanpa sumber pada slide magang tadi, gunakan empat langkah berikut.

**TENTUKAN:** apa masalah yang sebenarnya ingin diselesaikan? Mulai dari tujuan, bukan dari merangkai prompt.

**GUNAKAN:** pilih bagian yang bisa dibantu AI, seperti mencari ide, membuat draf, merangkum, membandingkan, atau menjelaskan.

**CEK:** untuk klaim penting, angka, kutipan, dan sumber, kembali ke bukti aslinya. Semakin besar akibat jika jawaban salah, semakin teliti pemeriksaannya.

**PUTUSKAN:** AI bisa memberi pilihan dan rekomendasi, tetapi kamu menentukan apa yang dipakai dan bertanggung jawab atas hasilnya.

**Contoh proposal sponsor**

Di draf slide rapat tadi, AI menulis ‘78% Gen Z menyukai merek yang mendukung keberlanjutan’ tanpa sumber. Kalimat itu mungkin mendukung pesan yang ingin disampaikan tim, tetapi angkanya belum bisa dipertanggungjawabkan.

Cari penelitian aslinya, lihat siapa yang disurvei dan kapan. Jika tidak ditemukan atau tidak relevan, keluarkan angka itu dari slide.

**Kerangka: Tentukan → Gunakan → Cek → Putuskan**

- **Tentukan:** Apa masalah yang sebenarnya ingin kamu selesaikan?
- **Gunakan:** Bagian mana yang cocok dibantu AI?
- **Cek:** Klaim, angka, dan sumber apa yang harus dibuka lagi?
- **Putuskan:** Apa yang layak dipakai dan siapa yang bertanggung jawab?

**Renungkan:** Pada langkah mana keputusan akhir tetap ada padamu?

**Jawaban:** Pada langkah Putuskan. Kamu bisa memakai AI untuk membantu, lalu memeriksa hasil dan menentukan tindakan sesuai konteks.

#### Konteks — sebelum contoh atau aktivitas

Kamu menemukan angka tanpa sumber di draf presentasi. Ada kebutuhan yang ingin diselesaikan, bagian yang dapat dibantu AI, bukti yang perlu dicari, dan keputusan yang perlu diambil.

#### Teori singkat — teks langsung

Tentukan tujuan, gunakan AI pada bagian yang sesuai, cek hasil yang penting, lalu putuskan apa yang layak dipakai.

#### Penjelasan tambahan — bisa dibuka

Empat langkah ini dapat berulang. Jika pemeriksaan menemukan sumber yang tidak sesuai, kamu bisa kembali mencari bahan atau meminta revisi draf.

Kedalaman pemeriksaan mengikuti dampak kesalahan. Pada ide judul, kamu dapat menilai kecocokan dan gaya. Pada kutipan, angka, atau informasi yang berdampak besar, kamu perlu membuka bukti dan melibatkan pihak yang tepat bila diperlukan.

#### Penutup — setelah melihat contoh atau pembahasan

Setelah refleksi, hubungkan keputusan dengan hasil pemeriksaan. Jika angka belum dapat dipertanggungjawabkan, tentukan tindakan terhadap angka itu sebelum presentasi dipakai.

#### Penghubung ke bagian berikutnya

Berikutnya, kita tegaskan bagian pekerjaan yang tetap memerlukan penilaian dan tanggung jawab manusia.

### 3.8 — Bagian yang tetap membutuhkan keputusan manusia

#### Materi utama — lengkap

Pada contoh pekerjaan analis, AI bisa mempercepat pembuatan ringkasan dan draf slide. Namun kamu tetap perlu menentukan tujuan, menilai kualitas hasil, dan bertanggung jawab atas keputusan yang diambil.

**Manusia tetap perlu menentukan tujuan**, memilih saran yang sesuai, menilai kualitas hasil, memahami kondisi yang tidak tertulis di prompt, dan bertanggung jawab atas keputusan akhirnya.

Ini bukan berarti kita berhenti menulis, menganalisis, atau membuat kode. Justru ketika AI ikut mengerjakan sebagian proses, kita perlu tetap memahami apa yang dihasilkan dan alasan di baliknya.

Data tadi tidak mendukung kesimpulan bahwa semua pekerjaan akan hilang. Namun perubahan pada cara kerja juga tetap perlu diperhatikan meskipun AI masih sering salah.

Gunakan AI untuk membantu pekerjaan, tetapi tetap pahami hasilnya, cek bagian yang penting, dan ambil keputusan akhirnya sendiri.

**Bagian yang tetap membutuhkan keputusan manusia**

AI bisa mempercepat pekerjaan. Kita tetap memilih arah, memahami konteks, memeriksa kualitas, dan bertanggung jawab atas hasilnya.

#### Konteks — sebelum contoh atau aktivitas

AI telah membantu membuat draf. Kamu akan menggunakannya untuk berkomunikasi atau mengambil tindakan yang dapat memengaruhi orang lain.

#### Teori singkat — teks langsung

Sebelum memakai hasil, pastikan kamu memahami isinya, dapat menjelaskan alasan penggunaan, dan mengetahui siapa yang bertanggung jawab atas keputusan.

#### Penjelasan tambahan — bisa dibuka

Konteks penting tidak selalu tercatat di prompt. Kebutuhan anggota tim, batas tugas, atau kesepakatan dengan orang lain mungkin perlu diperiksa melalui percakapan atau dokumen tambahan.

Jika suatu keputusan melampaui pengetahuan atau kewenanganmu, libatkan pihak yang bertanggung jawab. Mengetahui keterbatasan sendiri juga bagian dari penilaian yang baik.

#### Penutup — setelah melihat contoh atau pembahasan

Perhatikan keputusan yang benar-benar akan diambil dari draf itu. Hasil yang rapi masih perlu ditinjau sesuai tujuan dan akibat penggunaannya.

#### Penghubung ke bagian berikutnya

Kita akan membawa kebiasaan ini ke kasus yang lebih konkret.

### 3.9 — Lanjutkan latihan dengan situasi nyata

#### Materi utama — lengkap

Prinsip tadi akan dipakai lagi di NUSA Lab Game melalui situasi yang lebih konkret: kutipan dari AI yang terlihat sah, tangkapan layar yang tampak asli, data yang belum tentu boleh dibagikan, dan tugas kuliah yang bisa dikerjakan dengan bantuan AI.

Pertanyaannya bukan sekadar ‘AI baik atau buruk?’, melainkan ‘Apa yang akan kamu lakukan, dan **bukti apa yang kamu perlukan?**’

Setelah tiga pelajaran ini, gunakan pola sederhana yang sama saat belajar atau bekerja: tentukan tujuan, pakai AI jika membantu, cek bagian yang penting, lalu ambil keputusan sendiri.

**Menerapkan prinsip pada situasi nyata**

- **Kutipan dari AI:** Buka tulisan asli untuk memastikan kutipan dan sumbernya benar.
- **Bukti transfer:** Cek riwayat transaksi di aplikasi bank, bukan hanya tangkapan layar.
- **Data pribadi:** Tanya dulu apakah informasi itu boleh dikirim ke layanan AI.
- **Tugas kuliah:** Gunakan AI sebagai bantuan tanpa menyerahkan seluruh proses berpikir.

#### Konteks — sebelum contoh atau aktivitas

Pada latihan berikutnya, kamu menghadapi bukti digital, kutipan, data pribadi, atau tugas belajar. Setiap kasus membutuhkan pemeriksaan yang sesuai dengan jenis klaimnya.

#### Teori singkat — teks langsung

Mulailah dari keputusan yang perlu diambil, lalu tentukan bukti yang membantu mengambil keputusan tersebut.

#### Penjelasan tambahan — bisa dibuka

Untuk kutipan, cari tulisan aslinya. Untuk pembayaran, periksa catatan transaksi yang sesuai. Untuk pengiriman data, periksa kebutuhan dan izin. Untuk tugas belajar, perhatikan bagian yang perlu kamu pahami dan kerjakan sendiri.

Contoh-contoh ini menggunakan prinsip yang sama, tetapi tidak selalu memakai langkah pemeriksaan yang identik. Pilih tindakan berdasarkan situasi.

#### Penutup — setelah melihat contoh atau pembahasan

Pada cek pemahaman terakhir, periksa asal dan konteks statistik sebelum memakainya untuk mendukung proposal. Kesamaan jawaban dari beberapa AI belum menggantikan bukti.

#### Penghubung ke bagian berikutnya

Kamu dapat melanjutkan ke game untuk mencoba keputusan ini pada situasi lain, lalu kembali ke materi bila ingin melihat penjelasannya.

### Penutup pelajaran 3 — materi utama lengkap

**Yang perlu diingat:** AI bisa membantu menyiapkan draf, tetapi klaim penting tetap perlu dicek ke sumber aslinya. Jika angka dalam slide tadi tidak bisa dibuktikan, coret atau ganti sebelum rapat.

**Cek pemahaman:** AI memberi statistik yang cocok untuk proposalmu, tetapi tidak menyertakan sumber. Apa langkah berikutnya?

1. Temukan sumber asli angka itu dan periksa tahun serta kelompok yang diteliti. **(jawaban tepat)** — Tepat. Angka baru layak masuk proposal setelah asal dan konteksnya jelas.

2. Tanyakan angka yang sama kepada dua AI lain dan gunakan bila jawabannya serupa. — Beberapa AI bisa mengulang angka keliru dari sumber yang sama; kesamaan jawaban belum memverifikasi klaim.

3. Cantumkan angkanya sebagai perkiraan sementara dengan catatan ‘perlu diverifikasi’. — Catatan itu jujur, tetapi statistik tanpa sumber belum kuat untuk mendukung proposal.

## Penutup kelas — materi utama lengkap

Sampai di sini, kamu sudah mempelajari tiga hal: kemampuan AI saat ini, cara kerja dasarnya, dan cara mengecek hasilnya sebelum mengambil keputusan. Selanjutnya, kamu bisa mencoba prinsip yang sama lewat skenario di NUSA Lab Game.

**Lanjut:** [Coba NUSA Lab Game ↗](/games)

## Penutup pelajaran dan konteks cek pemahaman

Cek pemahaman yang sudah ada tetap digunakan. Tambahan berikut membantu menjelaskan keputusan yang sedang diuji. Pembahasannya ditempatkan setelah peserta memilih, agar alasan tidak langsung membocorkan jawaban sebelum aktivitas.

### Setelah pelajaran 1 — dari tampilan ke bukti

**Sebelum cek pemahaman:**

Kamu akan mengambil keputusan setelah menerima bukti pembayaran. Pertimbangkan pemeriksaan yang menunjukkan apakah transaksi yang sesuai benar-benar terjadi.

**Setelah pembahasan:**

Perhatikan asal bukti. Gambar dan nomor yang dikirim pembeli masih berasal dari pihak yang sama. Catatan transaksi pada rekeningmu membantu memeriksa apakah uang diterima sebelum kamu menyerahkan tiket.

**Penghubung:**

Kamu sudah melihat beberapa kemampuan dan batas AI. Berikutnya, kita pelajari perbedaan cara kerja sistem yang tampak otomatis atau pintar.

### Setelah pelajaran 2 — dari nama fitur ke cara kerja

**Sebelum cek pemahaman:**

Sebuah fitur memakai nama “perbaiki otomatis”. Tentukan apakah nama itu memberi informasi yang cukup untuk mengetahui cara fitur memproses foto.

**Setelah pembahasan:**

Hasil yang berbeda pada setiap foto bisa muncul dari aturan atau model. Untuk memastikan pendekatannya, cari penjelasan teknis yang sesuai dengan fitur tersebut.

**Penghubung:**

Memahami cara kerja membantu kita menilai hasil. Pada pelajaran berikutnya, kita hubungkan penilaian itu dengan tugas belajar dan pekerjaan.

### Setelah pelajaran 3 — dari angka ke keputusan

**Sebelum cek pemahaman:**

Kamu ingin memakai statistik untuk mendukung proposal. Pertimbangkan bukti yang diperlukan supaya angka itu dapat dipertanggungjawabkan.

**Setelah pembahasan:**

Buka sumber asli, periksa kelompok dan tahun datanya, lalu cocokkan dengan klaim pada proposal. Bila sumber belum dapat ditemukan atau tidak sesuai, angka itu belum layak menjadi dasar kesimpulan. Jawaban serupa dari beberapa AI tidak menggantikan pemeriksaan tersebut.

### Setelah kelas — tambahan penutup

Kamu sudah melihat kegunaan AI, memahami dasar cara kerjanya, dan mencoba memilih cara memeriksa hasil. Pada situasi berikutnya, mulai dari kebutuhanmu, gunakan bantuan yang sesuai, lalu nilai bukti sebelum mengambil keputusan.

Jika ada konsep yang belum jelas, kamu bisa melihat kembali contoh dan glosarium. Game berikutnya menjadi tempat mencoba prinsip yang sama pada kasus lain.

Catatan penyusun: penutup tidak menyatakan bahwa peserta pasti sudah menguasai materi. Progres selesai menunjukkan kegiatan yang sudah dilalui; pemahaman perlu ditinjau melalui jawaban, alasan, dan penerapan.

## Glosarium — bisa dibuka saat diperlukan

| Istilah | Penjelasan singkat |
| --- | --- |
| AI / kecerdasan buatan | Bidang yang mengembangkan sistem untuk tugas seperti mengenali pola, membuat prediksi, memecahkan masalah, atau menghasilkan konten. |
| Otomatisasi | Proses yang dapat berjalan tanpa dioperasikan terus-menerus. |
| Aturan | Arahan atau kondisi yang menentukan tindakan sistem. |
| Machine learning | Pendekatan yang menyesuaikan model dari data untuk membuat perkiraan atau menghasilkan keluaran. |
| Model | Sistem perhitungan yang memproses input untuk menghasilkan perkiraan atau keluaran; dalam machine learning, hubungannya dipelajari lewat pelatihan. |
| Data | Informasi yang digunakan untuk pelatihan, pengujian, atau sebagai masukan. |
| Input / output | Informasi yang diterima sistem / hasil yang diberikan. |
| Training / pelatihan | Proses menyesuaikan model menggunakan data atau pengalaman yang dirancang untuk tujuan tertentu. |
| Inferensi | Penggunaan model untuk memproses input dan menghasilkan keluaran. |
| Label | Jawaban atau kategori yang menyertai suatu contoh. |
| Prediksi | Perkiraan model berdasarkan input dan pola yang dipelajari. |
| Generalisasi | Kemampuan memakai pola yang dipelajari pada data baru. |
| Supervised learning | Pelatihan dengan contoh yang disertai target atau label. |
| Unsupervised learning | Pendekatan untuk mencari struktur dalam data tanpa target jawaban seperti pada latihan berlabel. |
| Reinforcement learning | Pendekatan belajar tindakan melalui umpan balik yang terkait dengan tujuan. |
| Deep learning | Jenis machine learning yang memakai jaringan saraf buatan dengan banyak lapisan. |
| Generative AI | AI yang menghasilkan konten, seperti teks, gambar, suara, atau kode. |
| Model bahasa | Model yang memproses dan menghasilkan bahasa. |
| Prompt | Instruksi atau permintaan yang diberikan kepada AI. |
| Token | Potongan yang diproses model, misalnya bagian kata atau tanda baca. |
| Multimodal | Dapat memproses beberapa jenis informasi, seperti teks dan gambar. |
| Benchmark | Tugas atau kumpulan soal untuk mengukur kemampuan tertentu. |
| Simulasi | Lingkungan atau keadaan buatan untuk mencoba perilaku atau kegiatan. |
| World model | Model yang memperkirakan perubahan pada lingkungan, termasuk akibat suatu tindakan. |
| Agent | Sistem AI yang dapat memakai alat untuk mengerjakan langkah menuju tujuan. |
| Tool | Alat yang tersedia bagi sistem, misalnya pencarian atau pembaca file. |
| Konten sintetis | Konten yang dibuat atau dimanipulasi secara buatan. |
| Deepfake | Manipulasi konten yang meniru wajah atau suara seseorang. |
| Halusinasi AI | Informasi salah atau dibuat-buat yang disampaikan seolah-olah benar. |
| Sitasi | Rujukan yang menunjukkan asal suatu informasi. |
| Verifikasi | Memeriksa klaim melalui bukti yang relevan. |
| Automation bias | Kecenderungan terlalu mengandalkan saran sistem otomatis. |
| Paparan AI pada pekerjaan | Kemungkinan sebagian tugas dalam pekerjaan dipengaruhi kemampuan AI, sesuai ukuran studi yang digunakan. |
| Radiolog | Dokter yang memeriksa dan menafsirkan gambar medis. |
| Mammogram | Gambar dari pemeriksaan mammografi. |
| Protein | Molekul yang menjalankan berbagai fungsi dalam tubuh dan sel; tersusun dari rangkaian asam amino. |
| Struktur protein | Susunan tiga dimensi protein yang membantu menjelaskan bagaimana protein bekerja. |

## Peta penempatan pada seluruh 29 bagian

Ini peta untuk penyusun materi. Jumlah bagian berikut mengikuti kelas Dasar AI yang ada, bukan jumlah layar atau klik pada suatu pilot baru.

| Bagian | Konteks atau teori yang ditambahkan | Penempatan |
| --- | --- | --- |
| 1.1 | Fungsi AI pada kegiatan sehari-hari | Sebelum contoh; definisi singkat saat istilah pertama muncul |
| 1.2 | Arti capaian, benchmark, dan batas kesimpulan | Di dekat contoh; rincian dapat dibuka |
| 1.3 | Arti ukuran studi dan pemeriksaan lanjutan | Sebelum latihan; kesimpulan setelah angka dibuka |
| 1.4 | Input, output, dan multimodal | Sebelum contoh jenis informasi |
| 1.5 | Sensor, simulasi, dan pengawasan | Sebelum urutan; alasan hubungan setelah pemeriksaan |
| 1.6 | Agent, tool, akses, dan bukti tindakan | Di dekat perbandingan chatbot dan agent |
| 1.7 | Pemeriksaan bukti sesuai klaim pembayaran | Sebelum refleksi; penutup setelah jawaban dibuka |
| 1.8 | Konten sintetis, identitas, dan dampak penyebaran | Di dekat contoh; rincian dapat dibuka |
| 1.9 | Data yang diperlukan, izin, dan ketentuan layanan | Sebelum daftar pemeriksaan unggahan |
| 1.10 | Halusinasi, sitasi, dan bukti | Sebelum latihan; koreksi setelah pemeriksaan |
| 1.11 | Otomatisasi dan batas penilaian dari nama fitur | Sebelum penghubung ke pelajaran 2 |
| 2.1 | Perbedaan aturan dan model yang dilatih | Sebelum refleksi; alasan setelah jawaban dibuka |
| 2.2 | Variasi contoh dan generalisasi | Di dekat kasus kucing dan anjing |
| 2.3 | Data, label, training, model, dan inferensi | Sebelum urutan; penjelasan hubungan setelah pemeriksaan |
| 2.4 | Jenis informasi dan umpan balik pada pelatihan | Di dekat tiga pendekatan belajar |
| 2.5 | Jaringan saraf buatan dan batas analogi | Di dekat diagram; rincian dapat dibuka |
| 2.6 | Perbedaan tugas mengenali dan menghasilkan | Sebelum perbandingan contoh |
| 2.7 | Token, jawaban, dan pemeriksaan fakta | Di dekat diagram model bahasa |
| 2.8 | Kemampuan sistem dan bukti tindakan pada sesi | Di dekat contoh klaim tindakan |
| 2.9 | Hubungan istilah dan cara memastikan fitur | Sebelum ringkasan dan cek pemahaman |
| 3.1 | Pekerjaan yang terdiri dari tugas konkret | Sebelum contoh pekerjaan analis |
| 3.2 | Definisi paparan dan batas membaca statistik | Sebelum latihan; penafsiran setelah angka dibuka |
| 3.3 | Kebutuhan nyata dan kemampuan yang dapat dilatih | Di dekat contoh mahasiswa; berlaku juga untuk konteks lain |
| 3.4 | Automation bias dan perbandingan alasan | Sebelum contoh keputusan |
| 3.5 | Hubungan kemampuan alat, bidang, dan penilaian | Di dekat daftar lima kemampuan |
| 3.6 | Keterlibatan berpikir dan batas studi laporan pengalaman | Di dekat dua cara memakai AI |
| 3.7 | Empat langkah yang dapat berulang | Sebelum kerangka; penutup setelah refleksi |
| 3.8 | Memahami hasil, konteks, dan tanggung jawab | Sebelum penutup tentang keputusan manusia |
| 3.9 | Pemeriksaan berbeda untuk jenis klaim berbeda | Sebelum contoh penerapan dan cek pemahaman terakhir |

## Hubungan teori dengan kegiatan yang sudah ada

| Kegiatan | Yang perlu dipahami peserta | Yang menjadi alasan setelah mencoba |
| --- | --- | --- |
| Perkiraan hasil studi medis pada 1.3 | Ada beberapa ukuran manfaat dan beban | Satu angka tidak cukup untuk menilai keseluruhan strategi |
| Susun proses robot pada 1.5 | Informasi tiap tahap diperlukan untuk tahap berikutnya | Pengujian dan pengawasan membantu menilai perilaku sebelum digunakan |
| Refleksi bukti transfer pada 1.7 | Klaim pembayaran membutuhkan catatan transaksi yang sesuai | Tampilan bukti saja belum memastikan transaksi diterima |
| Tandai klaim pada 1.10 | Angka dan sitasi memerlukan bukti yang dapat diperiksa | Rapi atau spesifik belum berarti didukung sumber |
| Refleksi otomatisasi pada 2.1 | Nama dan perilaku otomatis belum menjelaskan mekanisme | Sistem dapat memakai aturan, model, atau gabungan keduanya |
| Susun data sampai prediksi pada 2.3 | Pelatihan dan penggunaan model berbeda | Model perlu tersedia sebelum dipakai untuk input baru |
| Perkiraan paparan pekerjaan pada 3.2 | Ukuran paparan punya definisi dan batas | Potensi perubahan tugas tidak sama dengan kepastian kehilangan pekerjaan |
| Refleksi empat langkah pada 3.7 | Tujuan, bantuan, pemeriksaan, dan keputusan saling terhubung | Hasil pemeriksaan menjadi dasar keputusan berikutnya |
| Cek pemahaman tiap pelajaran | Menerapkan konsep pada keputusan kasus | Penjelasan mengikuti bukti dan konteks, bukan sekadar label benar atau salah |

## Catatan penyuntingan dan pemeriksaan sebelum penerapan

### Makna yang perlu dipertahankan

- AI adalah bidang luas; machine learning merupakan salah satu pendekatannya.
- Otomatisasi bisa memakai aturan, model, atau gabungan keduanya. Sistem berbasis aturan tidak selalu dapat dikeluarkan dari seluruh definisi AI.
- Deep learning adalah bagian dari machine learning. Generatif menjelaskan kemampuan menghasilkan, sehingga hubungan istilah tidak selalu berupa empat tingkat yang sederhana.
- Training dan penggunaan model berbeda. Mengirim input tidak otomatis melatih ulang model saat itu juga.
- Kelancaran bahasa tidak membuktikan fakta benar, niat, atau pengalaman seperti manusia.
- Alat pencarian atau pemeriksaan dapat membantu, tetapi sumber dan hasil penting tetap perlu dicocokkan.
- Hasil studi dibaca bersama populasi, sistem, ukuran, dan kondisi pengujiannya.
- Paparan pekerjaan tidak sama dengan jumlah orang yang pasti kehilangan pekerjaan.
- Laporan pengalaman berpikir tidak membuktikan bahwa AI membuat semua pengguna kehilangan kemampuan.
- Pemeriksaan mengikuti jenis klaim dan dampaknya. Peserta tidak harus mengikuti langkah identik pada semua situasi.
- Kasus aturan kampus pada latihan tidak menjadi pernyataan tentang semua kampus atau hukum yang berlaku.
- Catatan tentang kesehatan membantu memahami contoh penelitian, bukan memberi diagnosis atau keputusan perawatan.

### Angka dan sumber pada materi lama

Tambahan ini tidak mengganti angka, tanggal, toleransi latihan, jawaban, atau sumber pada materi utama. Angka baru tidak ditambahkan sebagai fakta penelitian.

Ada hal yang perlu dicocokkan sebelum materi diterbitkan kembali:

1. Pada bagian **1.3**, bacaan utama menautkan artikel Nature Medicine 2026, sementara latihan menautkan DOI studi lain yang memuat tahun 2023 pada pengenal artikelnya. Pastikan angka, ukuran hasil, dan pembanding pada bacaan serta latihan memang bersumber dari studi yang dimaksud. Artikel Nature tersebut tidak berhasil dibuka pada pemeriksaan sumber untuk draf ini, jadi angka medis belum diverifikasi ulang.
2. Pada bagian **3.2**, bacaan merujuk laporan ASEAN dan rincian Indonesia, sementara latihan menautkan indeks paparan global. Cocokkan angka Indonesia dengan tabel atau laporan yang memuatnya. Tambahan teori menjelaskan arti paparan dan tidak mengesahkan angka yang belum dicocokkan.
3. Capaian model, temuan pekerjaan, fitur produk, dan pengaturan data dapat berubah. Sebelum penerapan, periksa kembali tanggal dan sumber khusus untuk pernyataan yang masih dipakai.

Perbedaan rujukan tidak dengan sendirinya membuktikan angka salah. Catatan ini menunjukkan bagian yang perlu diperiksa, bukan koreksi angka yang sudah dipastikan.

### Penempatan dan kenyamanan belajar

Konteks perlu cukup untuk memahami tugas tanpa mengulang seluruh bacaan. Penjelasan tambahan dapat dibuka sesuai kebutuhan. Penghubung satu kalimat cukup untuk menunjukkan hubungan antarbagian.

Dokumen ini masih memuat bahan lengkap untuk penyuntingan. Panjangnya tidak berarti semua paragraf perlu tampil langsung pada layar. Saat bahasa final disepakati, susun tampilan berdasarkan kebutuhan langkah dan coba dengan peserta baru untuk menilai kejelasan serta durasi.

## Dasar rujukan

Susunan, kasus, aktivitas, dan batas klaim mengikuti [materi kelas yang sekarang](materi-pembelajaran-lengkap.md#kelas-1-ai-fundamentals). Contoh konteks serta saran penempatan merupakan tambahan editorial. Dokumen ini tidak mengklaim hasil pengujian pengguna atas draf tambahan.

Rujukan berikut dibaca untuk memeriksa dasar teori pada 3 Oktober 2026:

1. [Google — What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml). Rujukan untuk model, data, prediksi, pendekatan belajar, dan konten generatif.
2. [Google — Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting). Rujukan tentang kemampuan model pada data baru dan pentingnya pengujian terpisah dari contoh pelatihan.
3. [Microsoft Research — The Impact of Generative AI on Critical Thinking](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers/). Rujukan untuk memahami bahwa temuan berasal dari laporan penggunaan dan upaya berpikir peserta, dengan batas kesimpulan yang perlu dijaga.
4. [ILO — Generative AI and labour markets in ASEAN](https://www.ilo.org/publications/generative-ai-and-labour-markets-asean-significant-exposure-limited). Rujukan untuk pembahasan perubahan tugas dan paparan pekerjaan. Rincian statistik pada materi lama tetap perlu dicocokkan dengan sumber yang sesuai.

Sumber khusus lain yang sudah ada pada materi utama tetap dipertahankan untuk capaian riset, kesehatan, contoh robot, pembayaran, dan kebijakan data. Tidak semua sumber tersebut diperiksa ulang dalam pembuatan draf tambahan ini.
