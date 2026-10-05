# AI Fundamentals — penerapan pilot

## Membuka materi

- Daftar dua course: `/dev/yes-man-pilot`.
- AI Fundamentals: `/dev/yes-man-pilot/ai-fundamentals`.
- Prompt Engineering: `/dev/yes-man-pilot/prompt-engineering`.
- Ketiga halaman ini tersedia dalam development. Jalankan server dari worktree `.worktrees/yes-man-pilot` pada branch `feature/microlearning-yesman-pilot`.

Dokumen acuan bahasa terbaru: [ai-fundamentals-alur-natural.md](./ai-fundamentals-alur-natural.md). Revisi teks diterapkan pada 4 Oktober 2026. Transkripsi lengkap: [ai-fundamentals-seluruh-teks-pilot.md](./ai-fundamentals-seluruh-teks-pilot.md).

## Alur yang diterapkan

Pengantar → AI Hari Ini (11 bagian + cek pemahaman) → Sebenarnya, Apa Itu AI? (9 bagian + cek pemahaman) → Berpikir di Era AI (9 bagian + cek pemahaman) → selesai. Total: 29 bagian dan 3 cek pemahaman, atau 32 layar pembelajaran.

Aktivitas dengan beberapa contoh menampilkan satu contoh aktif, memakai tombol untuk berganti. Penjelasan inti tersedia pada awal bagian dan bisa dibuka kembali pada aktivitas berikutnya. Pembahasan muncul setelah memilih, membuka bagian yang diminta, atau menekan tombol pemeriksaan. Semua contoh bisa dicoba ulang dan jawaban yang belum tepat tidak mengunci kemajuan setelah pembahasannya dibuka.

- Pilihan tunggal memakai radio; pilihan jamak memakai checkbox.
- Pilihan jamak diperiksa lewat tombol. Pada pilihan dengan jumlah pasti, pilihan tambahan dinonaktifkan setelah jumlah itu tercapai; pilihan yang sudah aktif tetap dapat dilepas.
- Urutan diacak sekali ketika mulai, disimpan, dapat diubah dengan Naik/Turun, dan dibahas setelah tombol pemeriksaan ditekan. Urutan awal boleh diperiksa tanpa dipindahkan.
- Perkiraan medis dimulai kosong. Peserta dapat memasukkan angka 0–40% atau melihat tanpa menebak. Hasil studi dan penjelasan baru dibuka setelah tindakan tersebut. Perkiraan tidak menjadi skor pemahaman.
- Pada 1.10, dua kalimat ditandai sebelum alasan keempat kalimat ditampilkan.
- Pada 2.8 dan 3.9, peserta boleh memilih kasus mana saja; minimal dua perlu dicoba. Pada 3.5, kelima tindakan tersedia, tetapi tidak wajib menjawab semuanya.
- Catatan bebas opsional, disimpan sesuai tulisan peserta, tidak dikirim ke API AI, dan tidak dinilai lewat kata kunci.
- Glosarium dan bacaan tambahan tertutup secara default. Statistik memiliki kelompok, ukuran, tahun, dan tautan sumber di bagian terkait.

## Halaman selesai

Tersedia tautan kembali ke daftar materi, ringkasan tiga pelajaran beserta cara membuka ulang setiap bagian, dan latihan beasiswa opsional. Latihan beasiswa mencakup penandaan tiga tambahan tanpa dasar, pemilihan tindakan, keputusan tertulis opsional, serta checklist pemeriksaan mandiri tanpa skor.

Dokumen, transaksi, poster, jadwal, dan proposal menggunakan data fiktif dengan label simulasi. Grafik paparan pekerjaan memakai angka sumber yang diberikan, bukan angka simulasi. Ilustrasi hewan hanya menunjukkan variasi foto dan tidak melatih model atau mengklaim akurasi.

## Progres

AI Fundamentals memakai `ai-fundamentals-interactive-pilot-v1`. Prompt Engineering tetap memakai `prompt-engineering-v4-pilot`. Keduanya terpisah.

Posisi bagian dan aktivitas, pilihan, bagian yang telah dibuka, status pembahasan, urutan kartu, catatan, serta posisi latihan tambahan disimpan di localStorage. Saat kembali, peserta memilih Lanjutkan atau mulai ulang. Mulai ulang perlu konfirmasi, mengosongkan progres AI Fundamentals, dan mempertahankan progres Prompt Engineering.

Status tersimpan hanya ditampilkan setelah penyimpanan berhasil. Jika gagal, peserta diberi tahu bahwa progres belum tersimpan dan masih dapat belajar selama halaman tetap terbuka. Data sesi yang tidak sesuai bentuk atau rentang yang diharapkan tidak dimuat.

Event lokal `ai-fundamentals-event` memuat nama event, ID aktivitas, dan pilihan terstruktur. Catatan bebas tidak dimasukkan dalam event. Belum ada pengiriman analytics ke server.

## Pemeriksaan penerapan

TypeScript dan lint diperiksa selama penerapan. Pengujian interaksi browser serta pengukuran durasi peserta belum dilakukan pada perubahan ini.
