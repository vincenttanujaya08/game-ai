"use client";

import { useState } from "react";
import { authConfigured, createClient } from "@/lib/supabase/client";

export default function LoginButton({ next, mode }: { next: string; mode: "signin" | "signup" }) {
  const [error, setError] = useState("");
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

  if (!authConfigured()) return <p>Login dengan Google sedang tidak tersedia. Coba lagi nanti.</p>;
  return <><button type="button" disabled={busy} onClick={() => void signIn()}>{busy ? "Menghubungkan…" : mode === "signup" ? "Sign up with Google" : "Sign in with Google"}</button>{error && <p role="alert">{error}</p>}</>;
}
