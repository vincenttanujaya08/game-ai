-- Run once in the Supabase SQL Editor to save pre-test and post-test progress.
create table if not exists public.course_assessments (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null check (course_id in ('ai-fundamentals', 'working-with-generative-ai', 'vibe-coding')),
  pre_test_answers jsonb,
  pre_test_completed_at timestamptz,
  post_test_answers jsonb,
  post_test_reflection text check (post_test_reflection is null or char_length(post_test_reflection) <= 1200),
  post_test_score integer,
  post_test_completed_at timestamptz,
  primary key (user_id, course_id)
);

-- Safe to rerun after changing the short assessment from 3 to 5 total items.
alter table public.course_assessments
  drop constraint if exists course_assessments_check,
  drop constraint if exists course_assessments_check1,
  drop constraint if exists course_assessments_check2,
  drop constraint if exists course_assessments_post_test_score_check,
  drop constraint if exists course_assessments_pre_consistent,
  drop constraint if exists course_assessments_pre_answers,
  drop constraint if exists course_assessments_post_complete,
  drop constraint if exists course_assessments_post_score;
alter table public.course_assessments
  add constraint course_assessments_pre_consistent
    check ((pre_test_answers is null) = (pre_test_completed_at is null)),
  add constraint course_assessments_pre_answers
    check (pre_test_answers is null or (jsonb_typeof(pre_test_answers) = 'array' and jsonb_array_length(pre_test_answers) in (3, 5))),
  add constraint course_assessments_post_complete
    check ((post_test_answers is null and post_test_reflection is null and post_test_score is null and post_test_completed_at is null)
      or (post_test_answers is not null and jsonb_typeof(post_test_answers) = 'array' and jsonb_array_length(post_test_answers) in (3, 4)
        and post_test_reflection is not null and char_length(trim(post_test_reflection)) between 30 and 1200
        and post_test_score is not null and post_test_completed_at is not null)),
  add constraint course_assessments_post_score
    check (post_test_score is null or post_test_score between 0 and 4);

alter table public.course_assessments enable row level security;
revoke all on public.course_assessments from anon, authenticated;
grant select on public.course_assessments to authenticated;

drop policy if exists "Read own course assessments" on public.course_assessments;
drop policy if exists "Create own course assessments" on public.course_assessments;
drop policy if exists "Update own course assessments" on public.course_assessments;
create policy "Read own course assessments" on public.course_assessments for select to authenticated
  using ((select auth.uid()) = user_id);

-- Writes go through this function so browser clients cannot toggle completion fields directly.
create or replace function public.submit_course_assessment(
  p_course_id text,
  p_kind text,
  p_answers jsonb,
  p_reflection text default null
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_stage_count integer;
  v_progress jsonb;
  v_index integer;
  v_answer_count integer;
  v_keys smallint[];
  v_score integer := 0;
begin
  if v_user_id is null then raise exception 'LOGIN_REQUIRED'; end if;
  if p_course_id not in ('ai-fundamentals', 'working-with-generative-ai', 'vibe-coding') then
    raise exception 'COURSE_NOT_FOUND';
  end if;
  if p_kind not in ('pre', 'post') then raise exception 'INVALID_ASSESSMENT'; end if;
  v_answer_count := case p_kind when 'pre' then 5 else 4 end;
  if p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    raise exception 'ANSWER_EACH_QUESTION';
  end if;
  if jsonb_array_length(p_answers) <> v_answer_count
    or exists (select 1 from jsonb_array_elements(p_answers) as item(value) where item.value::text not in ('0', '1', '2')) then
    raise exception 'ANSWER_EACH_QUESTION';
  end if;

  if p_kind = 'pre' then
    insert into public.course_assessments (user_id, course_id, pre_test_answers, pre_test_completed_at)
      values (v_user_id, p_course_id, p_answers, now())
      on conflict (user_id, course_id) do update
      set pre_test_answers = excluded.pre_test_answers, pre_test_completed_at = excluded.pre_test_completed_at
      where public.course_assessments.pre_test_completed_at is null;
    return jsonb_build_object('preTestCompleted', true);
  end if;

  if p_reflection is null or char_length(trim(p_reflection)) not between 30 and 1200 then
    raise exception 'REFLECTION_LENGTH';
  end if;
  if not exists (select 1 from public.course_assessments a
    where a.user_id = v_user_id and a.course_id = p_course_id and a.pre_test_completed_at is not null) then
    raise exception 'PRE_TEST_REQUIRED';
  end if;

  select case p_course_id
    when 'ai-fundamentals' then 3
    when 'working-with-generative-ai' then 4
    else 7
  end into v_stage_count;
  select cp.progress into v_progress from public.course_progress cp
    where cp.user_id = v_user_id and cp.course_id = p_course_id;
  if v_progress is null then raise exception 'LESSONS_REQUIRED'; end if;
  for v_index in 0..(v_stage_count - 2) loop
    if not coalesce((v_progress -> 'completedStages') @> to_jsonb(array[v_index]), false) then
      raise exception 'LESSONS_REQUIRED';
    end if;
  end loop;

  v_keys := case p_course_id
    when 'ai-fundamentals' then array[0, 1, 1, 0]::smallint[]
    when 'working-with-generative-ai' then array[1, 0, 1, 0]::smallint[]
    else array[2, 1, 0, 1]::smallint[]
  end;
  for v_index in 0..3 loop
    if (p_answers ->> v_index)::smallint = v_keys[v_index + 1] then v_score := v_score + 1; end if;
  end loop;
  insert into public.course_assessments (user_id, course_id, post_test_answers, post_test_reflection, post_test_score, post_test_completed_at)
    values (v_user_id, p_course_id, p_answers, trim(p_reflection), v_score, now())
    on conflict (user_id, course_id) do update
    set post_test_answers = excluded.post_test_answers,
        post_test_reflection = excluded.post_test_reflection,
        post_test_score = excluded.post_test_score,
        post_test_completed_at = coalesce(public.course_assessments.post_test_completed_at, excluded.post_test_completed_at);
  return jsonb_build_object('postTestCompleted', true, 'score', v_score, 'total', 4);
end;
$$;

revoke all on function public.submit_course_assessment(text, text, jsonb, text) from public, anon;
grant execute on function public.submit_course_assessment(text, text, jsonb, text) to authenticated;
