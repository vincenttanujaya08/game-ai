import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function isAdminEmail(email: string | undefined) {
  return Boolean(email && process.env.ADMIN_EMAILS?.split(",").some((item) => item.trim().toLowerCase() === email.toLowerCase()));
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key
    ? createSupabaseClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;
}
