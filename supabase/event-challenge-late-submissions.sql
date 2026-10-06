-- Run once to accept late challenge submissions and mark them in the database.
alter table public.event_submissions
  add column if not exists is_late boolean not null default false;

create or replace function public.mark_vibe_coding_submission_late()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.is_late := statement_timestamp() >= '2026-10-07 00:00:00+07'::timestamptz;
  return new;
end;
$$;

drop trigger if exists mark_vibe_coding_submission_late on public.event_submissions;
create trigger mark_vibe_coding_submission_late
before insert or update on public.event_submissions
for each row execute function public.mark_vibe_coding_submission_late();

drop policy if exists "Create own event submission" on public.event_submissions;
drop policy if exists "Update own event submission" on public.event_submissions;
create policy "Create own event submission" on public.event_submissions for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz);
create policy "Update own event submission" on public.event_submissions for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz);

-- Late participants who already registered must be able to complete the required feedback step.
drop policy if exists "Create own event feedback" on public.event_feedback;
drop policy if exists "Update own event feedback" on public.event_feedback;
create policy "Create own event feedback" on public.event_feedback for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz);
create policy "Update own event feedback" on public.event_feedback for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz);
