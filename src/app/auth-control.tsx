"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./landing.module.css";
import { displayName } from "@/lib/auth/display-name";
import { authConfigured, createClient } from "@/lib/supabase/client";

export default function AuthControl() {
  const router = useRouter();
  const pathname = usePathname() ?? "/profile";
  const [name, setName] = useState<string | null>(null);
  const [signOutError, setSignOutError] = useState(false);

  useEffect(() => {
    if (!authConfigured()) return;
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setName(data.user ? displayName(data.user) : null);
    }).catch(() => {});
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setName(session?.user ? displayName(session.user) : null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (!authConfigured()) return null;
  if (!name) return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
      <Link href={`/login?next=${encodeURIComponent(pathname)}`}>Sign in</Link>
      <Link href={`/login?mode=signup&next=${encodeURIComponent(pathname)}`}>Sign up</Link>
    </span>
  );
  return (
    <span className={styles.authActions}>
      <Link className={styles.accountName} href="/profile" aria-label={`Profil ${name}`} title={name}>{name}</Link>
      <button type="button" onClick={async () => {
        const { error } = await createClient().auth.signOut();
        if (error) { setSignOutError(true); return; }
        router.push("/");
        router.refresh();
      }}>Sign out</button>
      {signOutError && <span role="alert">Gagal keluar. Coba lagi.</span>}
    </span>
  );
}
