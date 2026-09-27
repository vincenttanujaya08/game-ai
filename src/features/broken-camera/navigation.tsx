import Link from "next/link";
import styles from "./game.module.css";

export function GameNavigation() {
  return (
    <header className={styles.gameNavigation}>
      <Link href="/" className={styles.gameBrand} aria-label="NUSA Lab, beranda"><strong>NUSA</strong> Lab</Link>
      <Link href="/games" className={styles.back}><span aria-hidden="true">←</span> Kembali ke daftar permainan</Link>
    </header>
  );
}

export function TextBlock({ text }: { text: string }) {
  return <>{text.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>;
}
