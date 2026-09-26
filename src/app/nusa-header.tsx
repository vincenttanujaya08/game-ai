import Link from "next/link";
import styles from "./landing.module.css";

type NusaHeaderProps = {
  active?: "beranda" | "belajar" | "game";
};

export default function NusaHeader({ active }: NusaHeaderProps) {
  return (
    <header className={styles.siteHeader}>
      <Link className={styles.brand} href="/" aria-label="NUSA Lab, beranda">
        <strong>NUSA</strong> Lab
      </Link>

      <nav className={styles.siteNav} aria-label="Navigasi utama">
        <Link data-active={active === "beranda" || undefined} href="/">
          Beranda
        </Link>
        <Link data-active={active === "belajar" || undefined} href="/learn">
          Belajar
        </Link>
        <Link data-active={active === "game" || undefined} href="/games">
          Game
        </Link>
      </nav>

      <span className={styles.headerNote}>Literasi AI untuk generasi muda</span>
    </header>
  );
}
