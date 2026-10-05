# NUSA Lab

Aplikasi belajar literasi AI dengan tiga kelas dan dua game.

## Menjalankan

```bash
npm install
npm run dev
```

Buka <http://localhost:3000> untuk memilih kelas atau game.

## Memeriksa

```bash
npm run check
npm run build
npm run test:e2e
```

Game memakai skenario lokal dan respons AIRA deterministik, sehingga tidak membutuhkan API key model AI.

Untuk mengaktifkan **login Google dan progres per akun**, ikuti [panduan Supabase](docs/deploy-google-login.md). Tanpa konfigurasi Supabase, aplikasi tetap dapat dijalankan lokal; progres kelas tersimpan di browser dan sesi game memakai mode demo lokal.

Dashboard admin tersedia di `/admin`. Atur `ADMIN_EMAILS` sebagai daftar email admin dipisahkan koma dan `SUPABASE_SERVICE_ROLE_KEY` sebagai secret server Supabase. Jangan gunakan awalan `NEXT_PUBLIC_` untuk service role key.

Dashboard memisahkan course, game, dan event. Course dihitung dari progres pelajaran dan post-test; game dari progres game yang tersimpan di server. Rating saat pengumpulan event menilai manfaat pembelajaran di kelas atau melalui website NUSA Lab untuk memahami materi dan membuat project, dan tidak menandai penyelesaian course/game. Atas permintaan pemilik, rating lama dipetakan ke konteks pengajaran (materi → memahami materi, game → membuat project). `feedback_version = 3` menandai hasil pemetaan dan kolom nilai asli tetap disimpan. Dashboard menampilkan seluruh rating pengajaran tanpa label pemetaan. Rating baru memakai versi 2.

**Sebelum deploy perubahan feedback event**, jalankan [migrasi feedback pengajaran](supabase/event-teaching-feedback.sql) setelah migrasi `event-challenge-feedback.sql`. Migrasi menambah kolom feedback dan memetakan jawaban lama ke versi 3 tanpa mengubah nilai asli. Aman dijalankan ulang: hanya baris versi 1 yang dipetakan. Peserta yang sudah memiliki feedback lama tetap bisa memperbarui karya, dan dapat mengisi feedback pengajaran lewat tautan di halaman submit.

Jumlah akun terdaftar mencakup seluruh akun Supabase Auth. Seluruh data course, game, dan event ditampilkan tanpa filter email.

Untuk menyimpan rating setelah post-test, jalankan [migrasi course ratings](supabase/course-ratings.sql) di Supabase SQL Editor.

Materi ketiga kelas bersumber dari [dokumen Markdown lengkap](docs/materi-pembelajaran-lengkap.md). Setelah menyunting dokumen itu, jalankan `python3 scripts/sync-learning-material.py` agar materi di aplikasi ikut diperbarui.


Game menyimpan skor keputusan pertama (0–100) dan menampilkan form rating manfaat serta kejelasan (1–5) di layar hasil. Jalankan [migrasi skor dan rating game](supabase/game-results-and-ratings.sql) sebelum deploy; penyimpanan skor membutuhkan `SUPABASE_SERVICE_ROLE_KEY` di server. Skor dihitung ulang di server dari jawaban tersimpan, tidak diterima dari input skor klien. Bermain ulang tidak mengganti skor pertama; rating bisa diperbarui.

Untuk pemain lama di **database lokal/uji**, tersedia [SQL mock hasil game](supabase/mock-completed-game-metrics.sql). Script hanya menambah data contoh untuk akun dengan progres selesai tanpa menimpa hasil/rating yang ada. Data contoh diberi `is_mock`, ditampilkan sebagai mock di dashboard, dan diganti saat ada hasil/jawaban sungguhan. Jawaban akhir Kamera yang Rusak sebelum perubahan ini tidak tersimpan lengkap sehingga skor aslinya tidak dapat dipulihkan.
