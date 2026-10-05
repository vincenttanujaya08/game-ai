-- Run before deploying game scores and end-of-game ratings.
begin;
create table if not exists public.game_results (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null check (game_id in ('sitasi-bermasalah', 'kamera-rusak')),
  score smallint not null check (score between 0 and 100),
  is_mock boolean not null default false,
  completed_at timestamptz not null default now(),
  primary key (user_id, game_id)
);
create table if not exists public.game_ratings (
  user_id uuid not null,
  game_id text not null,
  usefulness_rating smallint not null check (usefulness_rating between 1 and 5),
  clarity_rating smallint not null check (clarity_rating between 1 and 5),
  comment text check (comment is null or char_length(comment) <= 500),
  is_mock boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id),
  foreign key (user_id, game_id) references public.game_results(user_id, game_id) on delete cascade
);
alter table public.game_results enable row level security;
alter table public.game_ratings enable row level security;
revoke all on public.game_results, public.game_ratings from anon, authenticated;
grant select on public.game_results to authenticated;
grant select, insert, update on public.game_ratings to authenticated;
grant select, insert, update on public.game_results to service_role;
grant select on public.game_ratings to service_role;
drop policy if exists "Read own game results" on public.game_results;
create policy "Read own game results" on public.game_results for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Read own game ratings" on public.game_ratings;
create policy "Read own game ratings" on public.game_ratings for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Create own completed game rating" on public.game_ratings;
create policy "Create own completed game rating" on public.game_ratings for insert to authenticated with check (
  (select auth.uid()) = user_id and exists (select 1 from public.game_results r where r.user_id = (select auth.uid()) and r.game_id = game_ratings.game_id)
);
drop policy if exists "Update own completed game rating" on public.game_ratings;
create policy "Update own completed game rating" on public.game_ratings for update to authenticated using ((select auth.uid()) = user_id) with check (
  (select auth.uid()) = user_id and exists (select 1 from public.game_results r where r.user_id = (select auth.uid()) and r.game_id = game_ratings.game_id)
);
commit;
