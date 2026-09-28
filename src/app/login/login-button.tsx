"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authConfigured, createClient } from "@/lib/supabase/client";
import styles from "./login.module.css";

export default function LoginButton({ next, mode }: { next: string; mode: "signin" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    try {
      const redirectTo = new URL("/auth/callback", window.location.origin);
      redirectTo.searchParams.set("next", next.startsWith("/") && !next.startsWith("//") ? next : "/profile");
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTo.toString() },
      });
      if (error) throw error;
    } catch {
      setError("Tidak dapat terhubung ke Google. Coba lagi.");
      setBusy(false);
    }
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const callback = new URL("/auth/callback", window.location.origin);
        callback.searchParams.set("next", safeNext(next));
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: callback.toString() } });
        if (error) throw error;
        setMessage("Cek email kamu untuk mengonfirmasi akun sebelum sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.replace(safeNext(next));
        router.refresh();
      }
    } catch {
      setError(mode === "signup" ? "Akun belum dapat dibuat. Periksa email dan kata sandi, lalu coba lagi." : "Email atau kata sandi belum cocok. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  if (!authConfigured()) return <p>Layanan akun belum dikonfigurasi. Coba lagi nanti.</p>;
  return <>
    <button type="button" disabled={busy} onClick={() => void signIn()}>{busy ? "Menghubungkan…" : mode === "signup" ? "Sign up with Google" : "Sign in with Google"}</button>
    <div className={styles.divider} aria-hidden="true"><span>atau pakai email</span></div>
    <form className={styles.emailForm} onSubmit={submitEmail}>
      <label htmlFor="account-email">Email</label>
      <input id="account-email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="account-password">Kata sandi</label>
      <input id="account-password" name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} required />
      <button type="submit" disabled={busy}>{busy ? "Memproses…" : mode === "signup" ? "Buat akun dengan email" : "Sign in dengan email"}</button>
    </form>
    {error && <p role="alert">{error}</p>}{message && <p role="status">{message}</p>}
  </>;
}

function safeNext(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return "/profile";
  const destination = new URL(path, window.location.origin);
  return destination.origin === window.location.origin
    ? destination.pathname + destination.search + destination.hash
    : "/profile";
}
