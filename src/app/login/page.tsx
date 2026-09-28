import Link from "next/link";
import NusaHeader from "../nusa-header";
import landing from "../landing.module.css";
import LoginButton from "./login-button";
import styles from "./login.module.css";

export const metadata = { title: "Sign in atau Sign up · NUSA Lab" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string; mode?: string }> }) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const next = params.next ?? "/profile";
  const nextQuery = params.next ? `&next=${encodeURIComponent(params.next)}` : "";

  return <main className={landing.shell} data-nusa-theme="light">
    <NusaHeader />
    <section className={styles.login} aria-labelledby="login-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>AKUN NUSA LAB</p>
        <h1 id="login-title">{mode === "signup" ? "Mulai dengan akunmu." : "Selamat datang kembali."}</h1>
        <p>Gunakan Google atau email untuk menyimpan progres belajar dan melanjutkan dari perangkat lain.</p>
      </div>
      <div className={styles.form}>
        <nav className={styles.tabs} aria-label="Pilihan akun">
          <Link href={`/login?mode=signin${nextQuery}`} aria-current={mode === "signin" ? "page" : undefined}>Sign in</Link>
          <Link href={`/login?mode=signup${nextQuery}`} aria-current={mode === "signup" ? "page" : undefined}>Sign up</Link>
        </nav>
        <h2>{mode === "signup" ? "Buat akun" : "Sign in"}</h2>
        <p>{mode === "signup" ? "Buat akun dengan Google atau daftar memakai alamat email dan kata sandi." : "Masuk dengan Google atau email yang terhubung ke akun NUSA Lab."}</p>
        {(next === "/learn" || next.startsWith("/learn/")) && <p className={styles.note}>Materi belajar hanya terbuka untuk akun yang sudah masuk, supaya progresmu tersimpan dan bisa dilanjutkan di perangkat lain.</p>}
        {params.error && <p className={styles.error} role="alert">Autentikasi Google belum berhasil. Silakan coba lagi.</p>}
        <div className={styles.action}><LoginButton next={next} mode={mode} /></div>
        <p className={styles.note}>{mode === "signup" ? "Jika mendaftar dengan email, konfirmasi akun lewat tautan yang kami kirim." : "Progres belajarmu akan tersimpan di akun ini."}</p>
      </div>
    </section>
    <footer className={landing.siteFooter}><span><strong>NUSA</strong> Lab</span><span>Literasi AI untuk generasi muda Indonesia.</span></footer>
  </main>;
}
