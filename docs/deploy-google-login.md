# Menyalakan login Google dan progres akun

Aplikasi menggunakan Supabase Auth untuk login Google dan Supabase Postgres untuk progres tiga kelas serta dua game. Kode aplikasi sudah disiapkan; akun Supabase dan Google harus dikonfigurasi oleh pemiliknya.

## 1. Buat project Supabase

1. Buat project di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka **SQL Editor**, lalu jalankan isi [`supabase/schema.sql`](../supabase/schema.sql) satu kali. Tiga tabel di sana mengaktifkan Row Level Security agar setiap pengguna hanya membaca dan menulis progresnya sendiri.
   Untuk pendaftaran dan submit Vibe Coding Challenge, jalankan juga [`supabase/event-challenge.sql`](../supabase/event-challenge.sql) satu kali. File ini terpisah agar project yang sudah menjalankan schema progres tidak perlu mengulang policy lama.
   Jika tabel event sudah dibuat dengan versi lama yang mewajibkan URL aplikasi dan dua tautan dokumen, jalankan [`supabase/event-challenge-update.sql`](../supabase/event-challenge-update.sql) untuk membuat kolom tersebut opsional tanpa menghapus data lama.
3. Dari dialog **Connect** project, salin **Project URL** dan **publishable key**. Jangan memakai `service_role` atau secret key di variabel `NEXT_PUBLIC_`.
4. Salin `.env.example` menjadi `.env.local`, lalu isi kedua nilai tersebut. Untuk Vercel, isi variabel yang sama di **Project Settings → Environment Variables**.

## 2. Aktifkan Google

1. Di [Google Auth Platform](https://console.cloud.google.com/auth/overview), siapkan consent screen dan OAuth client bertipe **Web application**.
2. Isi **Authorized JavaScript origins** dengan `http://localhost:3000` dan domain produksi, misalnya `https://namasitus.vercel.app`.
3. Isi **Authorized redirect URIs** dengan URL callback **Supabase**, bukan callback aplikasi. URL tepatnya ada di **Supabase → Authentication → Providers → Google**, dengan bentuk `https://PROJECT_REF.supabase.co/auth/v1/callback`.
4. Masukkan Google Client ID dan Client Secret di halaman provider Google Supabase, lalu aktifkan providernya. Simpan Client Secret hanya di Supabase/Google; aplikasi ini tidak membutuhkannya di `.env.local`.
5. Di **Supabase → Authentication → URL Configuration**, set **Site URL** ke domain produksi. Tambahkan redirect URL `http://localhost:3000/auth/callback` dan `https://namasitus.vercel.app/auth/callback`. Untuk preview Vercel, tambahkan pola preview yang sesuai bila diperlukan.

Panduan resmi: [Google login](https://supabase.com/docs/guides/auth/social-login/auth-google), [redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls), [Next.js SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs).

## 3. Periksa sebelum dibagikan

1. Jalankan `npm run dev`, masuk lewat Google, dan selesaikan satu bagian kelas.
2. Buka `/profile` untuk memeriksa ringkasan. Coba akun yang sama di browser lain: progresnya harus muncul.
3. Coba akun Google lain: progres akun pertama tidak boleh terlihat.
4. Mulai kedua game, muat ulang, lalu lanjutkan. Untuk game Sitasi Bermasalah, hasil yang sudah dikirim tetap terlihat saat halaman dibuka lagi. Untuk Kamera yang Rusak, penyelidikan yang sedang berjalan bisa dilanjutkan dari akun yang sama.
5. Setelah deploy di Vercel, ulangi langkah di domain produksi.

Untuk challenge, buka `/events/vibe-coding-challenge/register` dengan akun Google, simpan pendaftaran, lalu buka `/events/vibe-coding-challenge/submit` dan kirim tautan project. Tanggal acara, batas submit, dan hadiah masih ditandai **akan diumumkan** di halaman event; tetapkan informasi itu sebelum acara dibuka secara resmi.

Progres lokal yang dibuat sebelum login tidak dipindahkan otomatis ke akun Google. Ini menghindari tertukarnya progres saat beberapa orang memakai browser yang sama.
