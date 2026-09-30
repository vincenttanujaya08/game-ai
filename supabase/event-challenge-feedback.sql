-- Run once in the Supabase SQL Editor to require and store challenge feedback.
create table if not exists public.event_feedback (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null check (event_id = 'vibe-coding-challenge'),
  material_rating smallint not null check (material_rating between 1 and 5),
  game_rating smallint not null check (game_rating between 1 and 5),
  comment text check (comment is null or length(trim(comment)) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, event_id),
  foreign key (user_id, event_id) references public.event_registrations(user_id, event_id) on delete cascade
);

alter table public.event_feedback enable row level security;
revoke all on public.event_feedback from anon, authenticated;
grant select, insert, update on public.event_feedback to authenticated;

create policy "Read own event feedback" on public.event_feedback for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own event feedback" on public.event_feedback for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Update own event feedback" on public.event_feedback for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
