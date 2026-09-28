-- Run once in the Supabase SQL Editor before enabling account progress.
create table if not exists public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id in ('ai-fundamentals', 'working-with-generative-ai', 'vibe-coding')),
  progress jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists public.game_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  snapshot jsonb not null,
  events jsonb not null default '[]'::jsonb,
  stream_version integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.game_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null check (game_id = 'kamera-rusak'),
  state jsonb not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

alter table public.course_progress enable row level security;
alter table public.game_sessions enable row level security;
alter table public.game_progress enable row level security;

revoke all on public.course_progress from anon, authenticated;
revoke all on public.game_sessions from anon, authenticated;
revoke all on public.game_progress from anon, authenticated;
grant select, insert, update on public.course_progress to authenticated;
grant select, insert, update on public.game_sessions to authenticated;
grant select, insert, update, delete on public.game_progress to authenticated;

create policy "Read own course progress" on public.course_progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own course progress" on public.course_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own course progress" on public.course_progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "Read own game session" on public.game_sessions for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own game session" on public.game_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own game session" on public.game_sessions for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "Read own camera progress" on public.game_progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own camera progress" on public.game_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own camera progress" on public.game_progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own camera progress" on public.game_progress for delete to authenticated
  using ((select auth.uid()) = user_id);
