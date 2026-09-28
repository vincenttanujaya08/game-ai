"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { eventId, registrationSchema, submissionSchema } from "./validation";

const base = "/events/vibe-coding-challenge";

function configured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export async function registerChallenge(form: FormData) {
  if (!configured()) redirect(`${base}/register?status=setup`);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`${base}/register`)}`);
  if (!user.email) redirect(`${base}/register?status=error`);
  const parsed = registrationSchema.safeParse({ name: form.get("name"), university: form.get("university") });
  if (!parsed.success) redirect(`${base}/register?status=invalid`);
  const { error } = await supabase.from("event_registrations").upsert({
    user_id: user.id, event_id: eventId, name: parsed.data.name,
    university: parsed.data.university, email: user.email,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,event_id" });
  if (error) redirect(`${base}/register?status=error`);
  redirect(`${base}/register?status=saved`);
}

export async function submitChallenge(form: FormData) {
  if (!configured()) redirect(`${base}/submit?status=setup`);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`${base}/submit`)}`);
  const { data: registered, error: loadError } = await supabase.from("event_registrations")
    .select("user_id").eq("user_id", user.id).eq("event_id", eventId).maybeSingle();
  if (loadError || !registered) redirect(`${base}/register?status=required`);
  const parsed = submissionSchema.safeParse({
    projectName: form.get("projectName"), summary: form.get("summary"),
    appUrl: form.get("appUrl") ?? "", repositoryUrl: form.get("repositoryUrl"),
    demoUrl: form.get("demoUrl"), aiTools: form.get("aiTools"),
  });
  if (!parsed.success) redirect(`${base}/submit?status=invalid`);
  const { error } = await supabase.from("event_submissions").upsert({
    user_id: user.id, event_id: eventId,
    project_name: parsed.data.projectName, summary: parsed.data.summary,
    app_url: parsed.data.appUrl || null, repository_url: parsed.data.repositoryUrl,
    demo_url: parsed.data.demoUrl, ai_tools: parsed.data.aiTools,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,event_id" });
  if (error) redirect(`${base}/submit?status=error`);
  redirect(`${base}/submit?status=saved`);
}
