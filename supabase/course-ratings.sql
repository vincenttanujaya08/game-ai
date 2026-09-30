-- Run once in the Supabase SQL Editor to store post-test course ratings.
create table if not exists public.course_ratings (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id in ('ai-fundamentals', 'working-with-generative-ai', 'vibe-coding')),
  rating smallint not null check (rating between 1 and 5),
  comment text check (comment is null or length(trim(comment)) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.course_ratings enable row level security;
revoke all on public.course_ratings from anon, authenticated;
grant select, insert, update on public.course_ratings to authenticated;

create policy "Read own course ratings" on public.course_ratings for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own course ratings" on public.course_ratings for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own course ratings" on public.course_ratings for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
