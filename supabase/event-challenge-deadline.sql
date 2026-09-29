-- Apply to existing deployments to enforce the challenge window in Supabase RLS.
drop policy if exists "Create own event registration" on public.event_registrations;
drop policy if exists "Update own event registration" on public.event_registrations;
drop policy if exists "Create own event submission" on public.event_submissions;
drop policy if exists "Update own event submission" on public.event_submissions;

create policy "Create own event registration" on public.event_registrations for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Update own event registration" on public.event_registrations for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Create own event submission" on public.event_submissions for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Update own event submission" on public.event_submissions for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
