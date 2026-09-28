import Link from "next/link";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import styles from "./event.module.css";

export const metadata = {
  title: "Vibe Coding Challenge · NUSA Lab",
  description: "Bangun aplikasi yang berguna untuk kehidupan mahasiswa dalam tujuh hari.",
};

const steps = [
  { when: "Sebelum mulai", title: "Daftar", detail: "Isi nama dan kampusmu, lalu siapkan satu masalah mahasiswa yang ingin kamu bantu." },
  { when: "Hari 1", title: "Mulai dari masalah", detail: "Tentukan siapa penggunanya, apa yang mereka butuhkan, dan aplikasi kecil yang ingin kamu buat." },
  { when: "Hari 1–7", title: "Bangun dan uji", detail: "Gunakan coding agent pilihanmu, coba aplikasinya, lalu perbaiki bagian yang belum bekerja." },
  { when: "Akhir hari 7", title: "Kirim project", detail: "Isi formulir dan sertakan repository GitHub, rekaman video, serta AI tool yang dipakai." },
  { when: "Setelah pengiriman", title: "Penilaian dan hasil", detail: "Penyelenggara meninjau repository dan video yang dikirim. Jadwal pengumuman hasil akan diinformasikan kemudian." },
];

const deliverables = [
  { title: "Repository GitHub", detail: "Sertakan kode dan README: masalah yang dipilih, cara menjalankan aplikasi, proses memakai AI, serta keputusan pentingmu." },
  { title: "Video demo singkat", detail: "Rekam aplikasi saat digunakan, jelaskan kegunaannya, lalu kirim tautan videonya. Tidak ada presentasi langsung." },
  { title: "AI tool dan skills", detail: "Sebutkan alat atau skill tambahan yang dipakai, jika ada, serta bagian pekerjaan yang benar-benar terbantu." },
  { title: "URL aplikasi live", detail: "Tambahkan jika aplikasimu sudah di-deploy. Bagian ini opsional." },
];

export default function ChallengePage() {
  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.page}>
      <Link className={styles.back} href="/events">← Semua event</Link>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>EVENT NUSA LAB · 7 HARI</p>
        <h1>Vibe Coding Challenge</h1>
        <p className={styles.tagline}>Build Something Useful. Ship It in 7 Days.</p>
        <p className={styles.heroDescription}>Selama satu minggu, buat aplikasi yang membantu kehidupan mahasiswa. Kamu boleh memakai coding agent apa pun; yang penting, kamu memahami apa yang dibuat dan bisa menjelaskan prosesnya.</p>
        <div className={styles.actions}>
          <Link className={landing.primaryAction} href="/events/vibe-coding-challenge/register">Daftar event <span aria-hidden="true">→</span></Link>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Sudah daftar? Kirim project <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <dl className={styles.facts}>
        <div><dt>Siapa yang bisa ikut?</dt><dd>Mahasiswa dari kampus mana pun.</dd></div>
        <div><dt>Durasi</dt><dd>7 hari sejak kickoff.</dd></div>
        <div><dt>Jadwal</dt><dd>Tanggal mulai dan batas kirim akan diumumkan.</dd></div>
      </dl>

      <section className={styles.section} aria-labelledby="brief-title">
        <div><p className={styles.kicker}>Brief singkat</p><h2 id="brief-title">Buat sesuatu yang berguna.</h2></div>
        <div className={styles.sectionBody}>
          <p>Pilih satu masalah yang kamu kenal dari kehidupan mahasiswa, lalu bangun aplikasi kecil untuk membantunya. Misalnya, mengatur tugas, mencari informasi kampus, atau belajar bersama. Contoh itu hanya titik awal; idemu boleh berbeda.</p>
          <p>Penilaian melihat apakah aplikasimu bekerja dan bermanfaat, serta bagaimana kamu merencanakan, memakai AI, menguji, dan menjelaskan hasilnya.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="timeline-title">
        <div><p className={styles.kicker}>Alur acara</p><h2 id="timeline-title">Dari daftar sampai hasil.</h2></div>
        <ol className={styles.timeline}>{steps.map((step) => <li key={step.when}>
          <span className={styles.when}>{step.when}</span>
          <div><h3>{step.title}</h3><p>{step.detail}</p></div>
        </li>)}</ol>
      </section>

      <section className={styles.section} aria-labelledby="deliverables-title">
        <div><p className={styles.kicker}>Yang dikumpulkan</p><h2 id="deliverables-title">Cukup tunjukkan project dan prosesmu.</h2></div>
        <div>
          <p className={styles.sectionIntro}>Di formulir, tulis nama dan ringkasan projectmu, lalu sertakan:</p>
          <ul className={styles.deliverables}>{deliverables.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}</ul>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Buka formulir kirim project <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className={styles.skills} aria-labelledby="skills-title">
        <div><p className={styles.kicker}>Bekal yang membantu</p><h2 id="skills-title">Baru pertama kali pakai coding agent?</h2></div>
        <div><p>Kelas Vibe Coding membahas cara memberi konteks ke agent, membuat rencana yang masuk akal, menguji aplikasi, dan meninjau perubahan. Kamu bisa mempelajarinya sebelum event dimulai.</p><Link className={styles.textLink} href="/learn/vibe-coding">Lihat kelas Vibe Coding <span aria-hidden="true">→</span></Link></div>
      </section>

    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
