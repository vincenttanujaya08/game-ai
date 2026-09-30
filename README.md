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

Untuk menyimpan rating setelah post-test, jalankan [migrasi course ratings](supabase/course-ratings.sql) di Supabase SQL Editor.

Materi ketiga kelas bersumber dari [dokumen Markdown lengkap](docs/materi-pembelajaran-lengkap.md). Setelah menyunting dokumen itu, jalankan `python3 scripts/sync-learning-material.py` agar materi di aplikasi ikut diperbarui.
