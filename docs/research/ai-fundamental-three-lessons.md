# Rekomendasi materi AI Fundamental: tiga lesson, interaksi ringan

_Riset diperiksa 25 September 2026. Fokus: draft tiga lesson NUSA dan panduan AI literacy resmi/riset primer._

## Rekomendasi

**Keputusan implementasi:** Setelah draft lengkap diberikan, pemilik materi meminta seluruh pokok isi tetap ada. Karena itu contoh matematika, sains, medis, multimodal, robotika, keamanan, dan dampak kerja dipertahankan dalam lesson bertahap. Yang disederhanakan adalah bentuk interaksinya: satu pertanyaan pilihan dengan umpan balik per lesson. Naskah asli disimpan utuh di `src/content/ai-fundamentals/` agar perubahan bahasa dapat ditinjau.

Pertahankan urutan tiga lesson, tetapi jadikan benang merahnya **kenali AI → pahami cara kerjanya → gunakan dengan penilaian manusia**. Ini sejalan dengan kerangka OECD/Komisi Eropa yang mencakup sifat AI, peran sosialnya, kemampuan dan batasnya, lalu mengevaluasi output dan memutuskan kapan AI digunakan. Kerangka itu ditujukan untuk pendidikan dasar-menengah, jadi gunakan sebagai rujukan kompetensi umum, bukan kurikulum wajib mahasiswa. [OECD/European Commission 2026, pp. 5–7, 19–28](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html)

UNESCO juga menyarankan progresi **Understand → Apply → Create** pada empat aspek: pola pikir berpusat pada manusia, etika, teknik/aplikasi AI, dan desain sistem. Untuk pengantar ini, target utama yang realistis adalah *Understand*, disusul sedikit *Apply* lewat contoh keputusan; peserta tidak harus membuat model AI. Kerangka UNESCO dibuat untuk siswa sekolah, dan perlu dilokalkan menurut waktu belajar dan kesiapan peserta. [UNESCO, *AI competency framework for students* (2024), pp. 17–20](https://unesdoc.unesco.org/ark:/48223/pf0000391105)

## Susunan yang disarankan

| Lesson | Pertanyaan utama | Hasil belajar yang sederhana | Fokus isi dari draft |
| --- | --- | --- | --- |
| **1. AI Hari Ini: Apa yang Bisa Dilakukan?** | Di mana AI digunakan, dan apakah kemampuan berarti selalu benar? | Peserta mengenali bahwa AI bukan hanya chatbot, lalu membedakan kemampuan dari keandalan dan dampak. | Pertahankan contoh matematika, sains, kesehatan, multimodal, kendaraan, robot, dan agen dalam bagian pendek. Benang merahnya: **AI mampu melakukan banyak tugas, tetapi hasilnya tetap perlu dinilai sesuai konteks dan risikonya.** Beri sumber pada detail mutakhir. |
| **2. Sebenarnya, Apa Itu AI?** | Bagaimana AI menghasilkan keluaran, dan kenapa bisa keliru? | Peserta menjelaskan secara awam bahwa AI belajar pola dari data untuk menghasilkan prediksi/konten; ia bukan manusia yang memahami seperti kita. | Ini lesson konsep utama: AI/ML/deep learning/genAI secukupnya, data dan pola, model sebagai penyederhanaan, probabilitas, serta batas seperti bias dan halusinasi. Pakai satu analogi konsisten, lalu satu contoh yang ditelusuri dari input → pola/model → output. Hindari menjadikan daftar istilah sebagai tujuan hafalan. OECD merangkum nature AI sebagai pemrosesan data, deteksi pola, dan keluaran berbasis probabilitas. [OECD/EC 2026, p. 20](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html) |
| **3. Berpikir Jernih Saat Menggunakan AI** | Bagaimana tetap memegang kendali ketika memakai AI? | Peserta mencoba aturan sederhana: tentukan tujuan → gunakan AI bila cocok → cek bagian penting → putuskan sendiri. | Pertahankan evaluasi output, automation bias, pengetahuan bidang, dampak kerja, data Indonesia, dan tanggung jawab. Jelaskan batas setiap statistik; paparan AI bukan kepastian kehilangan pekerjaan. Tutup dengan satu skenario untuk menerapkan aturan tadi. OECD menempatkan evaluasi output, kesadaran pengaruh AI, serta pemilihan kapan AI dipakai sebagai kompetensi dasar. [OECD/EC 2026, pp. 27–28, 37–38](https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html) |

## Interaksi ringan yang cukup

- Maksimal **satu interaksi pendek per lesson**: pilih satu jawaban pada skenario, lalu tampilkan alasan satu atau dua kalimat. Jangan menambah drag-and-drop, matching, kuis berulang, dan refleksi panjang sekaligus.
- Tanyakan keputusan, bukan definisi yang baru saja dibacakan. Contoh: “AI memberi jawaban yang terdengar yakin tetapi tidak menyertakan sumber. Apa langkah berikutnya?” Umpan balik menjelaskan petunjuk yang relevan, bukan hanya menandai benar/salah.
- Akhiri tiap lesson dengan satu kalimat takeaway yang dapat diingat dan digunakan kembali. Di lesson 3, gunakan kembali kasus/karakter lesson 1 atau 2 agar peserta memindahkan konsep ke keputusan.

Ini pilihan desain yang menjaga beban interaksi rendah; bukti kuis tidak berarti setiap halaman harus memiliki kuis. Eksperimen Roediger dan Karpicke menunjukkan latihan mengingat kembali membantu retensi jangka lebih panjang dibanding belajar ulang dalam konteks eksperimen mereka, tetapi tidak menguji format NUSA atau membenarkan klaim dampak kursus ini. Karena itu, satu pertanyaan recall/aplikasi dengan feedback adalah pilihan ringan yang masuk akal, bukan jaminan hasil belajar. [Roediger & Karpicke, 2006](https://doi.org/10.1016/j.jml.2006.09.004)

## Batas klaim dan bahasa

- Bedakan **AI**, **machine learning**, dan **generative AI** dengan hubungan sederhana (GenAI adalah salah satu penggunaan AI), bukan seolah-olah istilah itu sinonim.
- Hindari “AI berpikir seperti manusia”, “AI selalu benar”, “AI akan menggantikan semua pekerjaan”, serta prediksi yang tidak didukung konteks. Beri sumber, tanggal, dan batas populasi pada statistik atau capaian yang dipertahankan.
- Untuk pemula, terangkan istilah saat pertama muncul dan lanjutkan dengan bahasa Indonesia yang lugas. Satu istilah Inggris dapat dicantumkan dalam kurung bila memang umum dipakai.
- Klaim aman untuk modul: **“Modul ini mengenalkan kemampuan dan batas AI serta melatih peserta mengevaluasi contoh keluaran.”** Jangan menyatakan modul meningkatkan kompetensi tanpa evaluasi pembelajaran.

## Sumber

1. UNESCO. [*AI competency framework for students* (2024)](https://unesdoc.unesco.org/ark:/48223/pf0000391105). Kerangka kompetensi dan progresi Understand/Apply/Create.
2. OECD / European Commission. [*Empowering Learners for the Age of AI: An AI Literacy Framework for Primary and Secondary Education* (2026)](https://doi.org/10.1787/65cd27d4-en). Sifat AI, kemampuan/batas, dan kompetensi Engage/Create/Manage/Shape AI. Cakupan resminya pendidikan dasar-menengah.
3. Long, D. & Magerko, B. [“What is AI Literacy? Competencies and Design Considerations” (CHI 2020)](https://doi.org/10.1145/3313831.3376727). Sintesis konseptual kompetensi AI literacy dan pertimbangan desain pembelajaran berpusat pada peserta; penulis menyebutnya titik awal diskusi, bukan daftar definitif.
4. Roediger, H. L. & Karpicke, J. D. [“The power of testing memory: Basic research and implications for educational practice” (2006)](https://doi.org/10.1016/j.jml.2006.09.004). Studi retrieval practice; hasil berlaku pada tugas/kondisi eksperimen, bukan evaluasi modul NUSA.
