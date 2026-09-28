import type { User } from "@supabase/supabase-js";

export function displayName(user: User) {
  const name = user.user_metadata?.full_name || user.user_metadata?.name;
  return typeof name === "string" && name.trim() ? name.trim() : user.email?.split("@")[0] || "Pengguna NUSA Lab";
}
