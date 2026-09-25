# Pedoman Bahasa Indonesia untuk Broken Camera

Riset: 21 September 2026. Berlaku untuk UI dan naskah yang akan dipindahkan dari `public/gamev7.java` ke data JSON.

## Arah bahasa

Pemain diajak menyelidiki, bukan diuji oleh mesin. Gunakan `kamu` di seluruh UI. Sistem berbicara baku ringan dan langsung. Saksi boleh lebih santai, tetapi tetap jelas, sesuai peran, dan tidak memakai slang tren.

- Instruksi: satu aksi utama, kata kerja di depan. Contoh: `Dengarkan keterangan Arya.`
- Status: sebut keadaan dan langkah berikutnya. Contoh: `Keterangan tersimpan. Cek bukti yang baru terbuka.`
- Umpan balik: jelaskan alasannya, jangan menghakimi. Contoh: `Pilihan ini belum kuat. Foto hanya menunjukkan lokasi kamera.`
- Dialog: tiap tokoh membawa aksi, ingatan, atau keterbatasan yang spesifik. Contoh: `"Aku dengar bunyinya, tapi dari situ aku tidak bisa lihat lensanya."`
- Istilah: pertahankan satu istilah untuk satu konsep. Pakai `keterangan`, `bukti`, dan `catatan kasus` secara konsisten.

Kalimat efektif mengutamakan kelugasan, ketepatan, kejelasan, kehematan, dan kesejajaran. Kalimat tidak harus pendek jika konteks dramatis perlu utuh. [Badan Bahasa, *Kalimat*](https://badanbahasa.kemendikdasmen.go.id/resource/doc/files/Buku_Seri_Penyuluhan_2019_Kalimat.pdf) dan [artikel Badan Bahasa tentang kalimat efektif](https://ojs.badanbahasa.kemdikbud.go.id/jurnal/index.php/loa/article/viewFile/5168/1908) mendukung prinsip ini.

Pilihan ragam ditentukan situasi tutur. Karena itu, instruksi dan hasil tetap rapi, sedangkan ujaran saksi dapat memakai bentuk seperti `nggak`, `sempat`, atau `kupikir` jika cocok dengan tokohnya. Jangan membuat semua saksi berbicara dengan ritme yang sama. [Kajian ragam bahasa Badan Bahasa](https://ojs.badanbahasa.kemdikbud.go.id/jurnal/index.php/undas/article/download/4262/1667).

## Kaidah wajib

1. Jangan gunakan em dash atau dua tanda hubung berturut-turut di teks, data, label, maupun komentar. Pisahkan gagasan dengan titik, koma, titik dua, atau kalimat baru. EYD V memang mengenal tanda pisah, tetapi KBBI memakai dua tanda hubung untuk konvensi entri kamus, bukan prosa UI. [EYD V: tanda pisah](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-tanda-baca/tanda-pisah/) dan [KBBI VI: petunjuk pemakaian](https://kbbi.kemdikbud.go.id/Content/Files/Petunjuk%20Pemakaian.PDF).
2. Petikan langsung memakai tanda petik, diawali huruf kapital bila berupa kalimat lengkap, dan diakhiri tanda baca biasa. [EYD V: tanda petik](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-tanda-baca/tanda-petik/) dan [huruf kapital](https://ejaan.kemendikdasmen.go.id/eyd/penggunaan-huruf/huruf-kapital/).
3. Hindari campuran Inggris untuk aksi inti. Ganti `Hear statement`, `Ask more`, `Evidence`, `Case notebook`, dan `End investigation` menjadi `Dengarkan keterangan`, `Tanya lebih lanjut`, `Bukti`, `Catatan kasus`, dan `Akhiri penyelidikan`.
4. Hindari bentuk kaku seperti `melakukan investigasi`, `mengakses bukti`, atau `keputusan Anda belum memenuhi kriteria`. Pilih `selidiki`, `buka bukti`, atau `pilihan ini belum tepat karena...`.

## Batas penyuntingan naskah

Mekanik, urutan fakta, nama, waktu, dan ketidakpastian saksi dari game sumber tidak berubah. Penyuntingan hanya merapikan bahasa, memisahkan instruksi dari dialog, dan memberi tiap tokoh suara yang wajar. Temuan ini sejalan dengan [audit bahasa game yang sudah ada](natural-indonesian-ai-output-audit.md): nada terbaik adalah teman satu tim yang teliti, bukan narator akademik atau chatbot yang terlalu bersemangat.
