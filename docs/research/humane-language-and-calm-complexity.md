# Bahasa manusiawi dan kompleksitas yang tenang untuk NUSA

Riset diperiksa 15 September 2026. Rekomendasi ini ditujukan untuk redesign Home dan Explore bagi mahasiswa, bukan untuk bahasa surat atau pengumuman resmi kampus.

## Kesimpulan

Hapus blok angka besar. Angka dari survei luar negeri tidak menjelaskan pengalaman NUSA dengan lebih baik daripada sebuah kasus latihan yang nyata, dan memaksa pengunjung memahami sumber, tahun, negara, serta cakupan survei sebelum mereka mengerti halaman. Gantikan dengan **bukti pengalaman**: satu cuplikan jawaban AI, satu sumber yang dapat dibuka, lalu satu pilihan yang bisa dilakukan pengunjung.

Desain boleh lebih kaya, tetapi kerumitannya harus datang dari urutan cerita, kontras ruang, dan detail yang dibuka saat dibutuhkan. Bukan dari banyak warna, kartu, atau istilah sekaligus. Home dan Explore perlu terasa seperti satu studio belajar: identitas visual sama, pekerjaan pengguna berbeda.

## Temuan dari sumber primer

| Temuan | Implikasi praktis |
| --- | --- |
| [KBBI VI Daring, Petunjuk Pemakaian](https://kbbi.kemdikbud.go.id/Content/Files/Petunjuk%20Pemakaian.PDF) menjelaskan bahwa ragam bahasa dipengaruhi medium dan jarak sosial. Ragam baku lazim untuk komunikasi resmi dan teknis, sedangkan ragam takbaku lazim dalam komunikasi akrab. | Antarmuka mahasiswa dapat memakai `kamu` dan kalimat yang terasa percakapan, sambil mempertahankan istilah akademik yang tepat seperti `sumber`, `bukti`, `klaim`, dan `konteks`. Jangan memakai bahasa gaul yang cepat usang atau akrab berlebihan. |
| Buku *Kalimat* dari [Badan Bahasa](https://badanbahasa.kemdikbud.go.id/resource/doc/files/Buku_Seri_Penyuluhan_2019_Kalimat.pdf) menjelaskan kalimat efektif lewat kelugasan, ketepatan, kejelasan, kehematan, dan kesejajaran. Yang utama adalah kesamaan pemahaman, bukan sekadar kalimat pendek. | Tulis satu pekerjaan utama per kalimat dan dahulukan kata kerja. Kalimat boleh lengkap bila membantu konteks, tetapi jangan menumpuk beberapa instruksi atau alasan dalam satu baris. |
| [Perpustakaan dan Arsip UGM](https://lib.ugm.ac.id/manajemen-referensi/) menyebut bahasa akademik yang baik perlu jelas, ringkas, dan konsisten. Klaim perlu didukung sumber, dan gagasan atau data orang lain perlu disitasi. | Gunakan satu nama untuk satu konsep di seluruh layar. Pilih `sumber`, bukan bergantian dengan `referensi`, `bahan`, atau `dokumen` bila maksudnya sama. Tampilkan alasan keputusan dekat dengan klaim dan sumbernya. |
| [W3C, Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/) menyarankan kata yang mudah dipahami, kalimat dan blok teks pendek, satu instruksi tiap langkah, ruang kosong, serta ringkasan untuk materi panjang. | Home cukup memberi orientasi dan satu aksi utama. Explore dapat menyimpan detail dalam panel, accordion, atau langkah lanjutan. Jangan tampilkan semua kriteria penilaian sebelum mahasiswa mulai mengecek kasus. |
| [W3C, Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) mewajibkan judul dan label menjelaskan topik atau tujuan. Judul yang baik membantu orang memprediksi isi dan menemukan bagian yang mereka perlukan. | Pakai judul seperti `Cek sumbernya`, `Pilih bagian yang perlu diperbaiki`, dan `Lihat hasil keputusanmu`. Hindari label abstrak seperti `Eksplorasi`, `Aktivasi`, atau `Tahap berikutnya` bila tidak menjelaskan apa yang akan terjadi. |
| [W3C, Consistent Visual Design](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p03-consistent-design/) meminta font, warna, ikon, kontrol, posisi navigasi, serta gaya fokus dipakai konsisten di kelompok halaman. Konsistensi mengurangi beban saat orang mempelajari antarmuka. | Home dan Explore berbagi logo, keluarga font, radius, warna aksen, tombol, header, dan pola fokus. Explore boleh lebih aktif secara visual, tetapi bukan identitas baru. |

## Arah copy

Nada yang tepat adalah teman satu kelompok yang teliti: tenang, jelas, dan menghormati kemampuan mahasiswa. Hindari nada menguji, menggurui, atau terlalu santai.

| Hindari | Gunakan |
| --- | --- |
| `Lakukan evaluasi terhadap keluaran AI.` | `Cek jawaban AI ini.` |
| `Silakan lakukan eksplorasi sumber.` | `Buka sumbernya.` |
| `Keputusan Anda belum memenuhi kriteria.` | `Pilihan ini belum tepat. Sumbernya tidak mendukung seluruh klaim.` |
| `Mahasiswa diharapkan melakukan verifikasi komprehensif.` | `Sebelum dipakai, cek dulu apakah klaimnya punya bukti.` |
| `Lanjut ke tahap berikutnya.` | `Pilih bagian berikutnya.` |

Pola yang bisa dipakai berulang: **keadaan singkat + aksi spesifik + alasan yang membantu**.

> Jawabannya terlihat meyakinkan. Sekarang cek apakah sumbernya benar-benar mendukung klaim ini.

Jangan mencampur `kamu`, `Anda`, dan bentuk pasif birokratis. Gunakan `kamu` di seluruh produk. Hindari singkatan percakapan seperti `gak`, `bgt`, atau tanda baca berlebihan. Batas ini selaras dengan [panduan etika komunikasi mahasiswa UGM](https://tsp.sv.ugm.ac.id/beranda-2/ii-pendidikan/ii-10-etika-perilaku-dengan-dosen-dan-tenaga-kependidikan/), sambil tetap membedakan UI yang ramah dari surat kepada dosen yang formal.

## Struktur informasi yang lebih kaya tanpa ramai

### Home: alasan untuk mulai

1. Satu pesan utama dan satu CTA: `Mulai cek jawaban`.
2. Satu visual nyata dari aktivitas belajar, misalnya cuplikan klaim dan sumber, bukan metrik besar atau kumpulan kartu fitur.
3. Tiga kemampuan ringkas: `Tanya`, `Cek`, `Putuskan`.
4. Satu kasus unggulan yang membawa pengunjung ke Explore.
5. Rincian tentang cara kerja dan sumber pembelajaran ditempatkan setelah kasus, atau dibuka saat diminta.

### Explore: ruang untuk bekerja

1. Tampilkan konteks kasus, tujuan, dan tindakan pertama.
2. Tampilkan satu klaim per giliran, lalu beri pilihan `Tetap pakai`, `Perbaiki`, atau `Hapus`.
3. Saat sumber dibuka, utamakan cuplikan yang relevan. Detail penerbit, metode, dan konteks tersedia di lapisan berikutnya.
4. Setelah keputusan, beri alasan spesifik dan kesempatan mengubah pilihan.
5. Akhiri dengan rangkuman yang menyebut keputusan dan alasan, bukan skor angka besar.

Dengan struktur ini, halaman terasa lebih kompleks karena pengunjung dapat menelusuri hubungan klaim, bukti, dan keputusan. Namun, pada satu waktu mereka hanya perlu menjawab satu pertanyaan.

## Batas implementasi

- Jangan memakai statistik dekoratif, penghitung, atau skor besar tanpa data produk yang nyata dan relevan.
- Jangan mengganti istilah atau posisi kontrol yang sama antara Home dan Explore.
- Pastikan setiap CTA menyebut aksi dan tujuan. `Buka kasus sitasi` lebih jelas daripada `Pelajari lebih lanjut`.
- Pertahankan struktur heading semantik dan label formulir yang jelas. Ini bukan sekadar detail aksesibilitas, melainkan cara pengguna memahami halaman yang kaya informasi.
