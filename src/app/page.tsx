import Link from "next/link";
import Image from "next/image";
import HomeProgress from "./home-progress";
import HomeIcon from "./home-icon";
import styles from "./home.module.css";

export const metadata = {
  title: "NUSA Lab · Main. Belajar. Untuk Nanti.",
  description: "Belajar AI lewat materi, misi, dan langkah kecil yang bermakna.",
};

const stages = [
  { icon: "play", label: "1. Apa itu AI?" },
  { icon: "document", label: "2. Cara kerja AI" },
  { icon: "gear", label: "3. AI di kehidupan nyata" },
  { icon: "flag", label: "4. Saatnya kamu mencoba" },
] as const;

export default function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="NUSA Lab, beranda"><HomeIcon name="logo" />NUSA Lab<span className={styles.spark} aria-hidden="true" /></Link>
          <nav className={styles.headerNav} aria-label="Navigasi utama"><a href="#learn">Learn</a><a href="#missions">Missions</a></nav>
        </header>
        <div className={styles.heroCopy}>
          <h1>Belajar sambil main, yuk!<span className={styles.rays} aria-hidden="true" /></h1>
          <p>Pengetahuan baru. Tantangan seru. Langkah kecil untuk masa depan yang lebih besar.</p>
        </div>
        <div className={styles.heroArtwork} aria-hidden="true">
          <Image src="/home/reference-03/hero-student.png" alt="" fill preload sizes="(max-width: 900px) 130px, 260px" />
          <p className={styles.stickyNote}>Main<br />hari ini,<br />lebih siap<br />untuk nanti.</p>
        </div>
      </section>

      <section className={styles.learnSection} id="learn" aria-labelledby="learn-title">
        <div className={styles.learnCopy}>
          <p className={styles.sectionTag}>LEARN</p>
          <h2 id="learn-title">AI Fundamentals</h2>
          <p>Kenali AI dari dasar</p>
          <Link className={styles.paperButton} href="/learn">Mulai belajar <HomeIcon name="arrow" /></Link>
        </div>
        <div className={styles.learnBook}>
          <Image src="/home/reference-03/learn-book.png" alt="" fill preload sizes="(max-width: 900px) 95vw, 45vw" />
          <div className={styles.bookNotes}><span>Langkah kecil,<br />pemahaman besar.</span><span>Dari rasa ingin tahu<br />ke dampak nyata</span></div>
          <ol className={styles.bookStages} aria-label="Perjalanan belajar AI">
            {stages.map((stage, index) => <li key={stage.icon}><span className={index === 0 ? styles.activeStage : styles.stageIcon}><HomeIcon name={stage.icon} /></span><span>{stage.label}</span></li>)}
          </ol>
        </div>
        <div className={styles.reader} aria-hidden="true"><Image src="/home/reference-03/learn-reader.png" alt="" fill sizes="(max-width: 900px) 130px, 25vw" /></div>
      </section>

      <section className={styles.missionsSection} id="missions" aria-labelledby="missions-title">
        <div className={styles.missionsCopy}><h2 id="missions-title" className={styles.sectionTag}>Missions</h2><p>Mainkan cerita.<br />Pecahkan masalah.<br />Jadi bagian dari perubahan.</p><Link className={styles.paperButton} href="/games/sitasi-bermasalah">Mulai main <HomeIcon name="arrow" /></Link></div>
        <Link className={styles.missionPreview} href="/games/sitasi-bermasalah">
          <Image src="/home/reference-03/mission-campus.png" alt="Mahasiswa menuju kampus hijau untuk memulai misi" fill sizes="(max-width: 900px) 90vw, 52vw" />
          <div className={styles.missionNote}><h3>Sitasi Bermasalah</h3><p>Sebuah tugas, banyak pertanyaan.<br />Bantu selesaikan dengan jujur!</p><HomeIcon name="arrow" /></div>
        </Link>
        <div className={styles.signpost} aria-hidden="true"><Image src="/home/reference-03/mission-signpost.png" alt="" fill sizes="180px" /><div><span>JELAJAH</span><span>PECAHKAN</span><span>BERDAMPAK</span></div></div>
      </section>

      <HomeProgress />

      <section className={styles.toolsSection} aria-labelledby="tools-title">
        <div className={styles.toolsTitle}><p className={styles.sectionTag}>Tools</p><h2 id="tools-title"><HomeIcon name="flask" />Prompt Lab</h2></div>
        <p className={styles.toolsCopy}>Bereksperimen dengan ide.<br />Dari pertanyaan sederhana, ke kemungkinan besar.</p>
        <span className={styles.comingSoon}><HomeIcon name="soon" />Segera hadir</span>
        <span className={styles.flyingPaper} aria-hidden="true" />
        <div className={styles.robot} aria-hidden="true"><Image src="/home/reference-03/prompt-robot.png" alt="" fill sizes="120px" /></div>
        <p className={styles.toolNote}>Ide bagus<br />perlu ruang<br />untuk tumbuh.</p>
      </section>
    </main>
  );
}
