import Link from "next/link";
import { redirect } from "next/navigation";
import NusaHeader from "@/app/nusa-header";
import landing from "@/app/landing.module.css";
import styles from "./event.module.css";
import { isChallengeOpen } from "./status";

export const metadata = {
  title: "Vibe Coding Challenge · NUSA Lab",
  description: "Buat aplikasi sederhana untuk membantu menyelesaikan masalah mahasiswa dalam tujuh hari.",
};

const steps = [
  { when: "Sebelum challenge dimulai", title: "Daftar", detail: "Isi data diri dan kampusmu. Sambil menunggu kickoff, coba pikirkan satu masalah mahasiswa yang ingin kamu bantu selesaikan." },
  { when: "Hari 1", title: "Tentukan apa yang ingin kamu buat", detail: "Pilih masalahnya, siapa yang akan memakai aplikasimu, dan fitur utama yang benar-benar mereka butuhkan." },
  { when: "Hari 1–7", title: "Mulai bikin", detail: "Gunakan coding agent pilihanmu untuk membantu mengembangkan project. Coba aplikasinya sendiri, cari bagian yang masih bermasalah, lalu perbaiki." },
  { when: "Akhir hari ke-7", title: "Kirim projectmu", detail: "Kirim repository GitHub, video singkat yang menunjukkan aplikasimu, dan informasi tentang AI tools yang kamu gunakan." },
  { when: "Setelah challenge selesai", title: "Review project", detail: "Tim NUSA Lab akan melihat aplikasi yang dibuat, cara kamu menyelesaikan masalah, serta proses pengerjaannya. Jadwal pengumuman hasil akan diinformasikan setelah periode pengumpulan berakhir." },
];

const deliverables = [
  { title: "Repository GitHub", detail: "Sertakan kode project dan README yang menjelaskan masalah yang ingin diselesaikan, cara menjalankan aplikasi, AI tools yang digunakan, bagaimana AI membantumu, dan keputusan penting yang kamu ambil." },
  { title: "Video demo singkat", detail: "Tunjukkan cara kerja aplikasimu dan bagian utama yang sudah berhasil kamu buat." },
];

export default function ChallengePage() {
  if (!isChallengeOpen) redirect("/events");

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader active="event" />
    <div className={styles.page}>
      <Link className={styles.back} href="/events">← Semua event</Link>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>EVENT NUSA LAB · 7 HARI</p>
        <h1>Vibe Coding Challenge</h1>
        <p className={styles.tagline}>Punya ide? Coba wujudkan dalam 7 hari.</p>
        <p className={styles.heroDescription}>Pilih masalah yang dekat dengan kehidupan mahasiswa, lalu buat aplikasi sederhana untuk membantu menyelesaikannya. Kamu bebas memakai coding agent apa pun selama kamu tetap memahami apa yang kamu buat dan bisa menceritakan proses di baliknya.</p>
        <div className={styles.actions}>
          <Link className={landing.primaryAction} href="/events/vibe-coding-challenge/register">Daftar event <span aria-hidden="true">→</span></Link>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Sudah daftar? Kirim project <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <dl className={styles.facts}>
        <div><dt>Siapa yang bisa ikut?</dt><dd>Mahasiswa dari kampus mana pun.</dd></div>
        <div><dt>Durasi</dt><dd>7 hari sejak kickoff.</dd></div>
        <div><dt>Jadwal</dt><dd>Tanggal mulai dan batas pengumpulan akan diumumkan.</dd></div>
      </dl>

      <section className={styles.section} aria-labelledby="brief-title">
        <div><p className={styles.kicker}>Tentang challenge ini</p><h2 id="brief-title">Mulai dari masalah yang kamu temui sehari-hari.</h2></div>
        <div className={styles.sectionBody}>
          <p>Cari satu hal yang menurutmu bisa dibuat lebih mudah untuk mahasiswa. Bisa soal mengatur tugas, mencari informasi kampus, belajar bareng, atau masalah lain yang menurutmu menarik untuk diselesaikan.</p>
          <p>Tidak perlu membuat aplikasi yang besar. Yang penting, idenya jelas, aplikasinya bisa dicoba, dan kamu tahu kenapa kamu membuatnya seperti itu.</p>
          <p>Kami juga ingin melihat bagaimana kamu menggunakan AI selama proses pengerjaan: mulai dari menyusun ide, membuat aplikasi, menguji hasilnya, sampai memperbaiki bagian yang belum sesuai.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="timeline-title">
        <div><p className={styles.kicker}>Alur challenge</p><h2 id="timeline-title">Dari ide sampai jadi project.</h2></div>
        <ol className={styles.timeline}>{steps.map((step) => <li key={step.when} data-reveal-on-scroll>
          <span className={styles.when}>{step.when}</span>
          <div><h3>{step.title}</h3><p>{step.detail}</p></div>
        </li>)}</ol>
      </section>

      <section className={styles.section} aria-labelledby="deliverables-title">
        <div><p className={styles.kicker}>Yang perlu dikumpulkan</p><h2 id="deliverables-title">Tunjukkan apa yang kamu buat dan bagaimana kamu membuatnya.</h2></div>
        <div>
          <p className={styles.sectionIntro}>Saat mengirim project, sertakan:</p>
          <ul className={styles.deliverables}>{deliverables.map((item) => <li key={item.title} data-reveal-on-scroll><strong>{item.title}</strong><span>{item.detail}</span></li>)}</ul>
          <Link className={styles.textLink} href="/events/vibe-coding-challenge/submit">Kirim project <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Belajar AI. Coba sendiri. Bikin sesuatu.</span></footer>
  </main>;
}
