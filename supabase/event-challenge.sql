-- Run once in the Supabase SQL Editor to enable Vibe Coding Challenge registration and submission.
-- Vibe Coding Challenge: one registration and one editable submission per account.
create table if not exists public.event_registrations (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id text not null check (event_id = 'vibe-coding-challenge'),
  name text not null check (length(trim(name)) between 2 and 100),
  university text not null check (length(trim(university)) between 2 and 150),
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

create table if not exists public.event_submissions (
  user_id uuid not null,
  event_id text not null check (event_id = 'vibe-coding-challenge'),
  project_name text not null check (length(trim(project_name)) between 2 and 120),
  summary text not null check (length(trim(summary)) between 2 and 600),
  app_url text check (app_url like 'https://%'),
  repository_url text not null check (repository_url like 'https://github.com/%'),
  demo_url text not null check (demo_url like 'https://%'),
  ai_tools text not null check (length(trim(ai_tools)) between 2 and 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, event_id),
  foreign key (user_id, event_id) references public.event_registrations(user_id, event_id) on delete cascade
);

create index if not exists event_registrations_event_id_idx on public.event_registrations(event_id);
create index if not exists event_submissions_event_id_idx on public.event_submissions(event_id);

alter table public.event_registrations enable row level security;
alter table public.event_submissions enable row level security;
revoke all on public.event_registrations from anon, authenticated;
revoke all on public.event_submissions from anon, authenticated;
grant select, insert, update on public.event_registrations to authenticated;
grant select, insert, update on public.event_submissions to authenticated;

create policy "Read own event registration" on public.event_registrations for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own event registration" on public.event_registrations for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Update own event registration" on public.event_registrations for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);

create policy "Read own event submission" on public.event_submissions for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own event submission" on public.event_submissions for insert to authenticated
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
create policy "Update own event submission" on public.event_submissions for update to authenticated
  using ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz)
  with check ((select auth.uid()) = user_id and statement_timestamp() >= '2026-09-29 00:00:00+07'::timestamptz and statement_timestamp() < '2026-10-07 00:00:00+07'::timestamptz);
