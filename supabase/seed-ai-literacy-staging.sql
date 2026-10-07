-- STAGING ONLY: run course-assessments.sql first, then this whole file.
-- Replaces ALL old AI Fundamentals assessments for ALL auth.users.
-- Synthetic results are marked is_mock=true; these are not participant measurements.
-- Does not alter other courses, ratings, or existing lesson progress.
-- Rerunning replaces the staging cohort again with the same score distribution.
begin;
lock table public.course_assessments in share row exclusive mode;

create temporary table ai_literacy_seed on commit drop as
with cohort as (
  select id as user_id, row_number() over (order by md5(id::text)) - 1 as position
  from auth.users
), scores as (
  select user_id, position,
    case position % 5
      when 0 then 9 + (position / 5) % 2 -- Already proficient, unchanged.
      when 1 then 6 + (position / 5) % 4 -- Small decline, exactly one point.
      when 2 then 5 + (position / 5) % 4 -- Small gain, one point.
      when 3 then 2 + (position / 5) % 3 -- Larger gain, four points.
      else 4 + (position / 5) % 3       -- Moderate gain, two points.
    end::integer as pre_score,
    case position % 5 when 0 then 0 when 1 then -1 when 2 then 1 when 3 then 4 else 2 end as delta
  from cohort
)
select scores.*,
       pre_score + delta as post_score,
       now() - interval '3 hours' - (position % 120) * interval '1 minute' as pre_at,
       now() - interval '1 hour' - (position % 60) * interval '1 minute' as post_at,
       answers.pre_answers, answers.post_answers
from scores
cross join lateral (
  -- Use different per-user orders for pre/post errors, while preserving question order.
  select jsonb_agg(case when pre_rank <= scores.pre_score then correct else (correct + 1 + wrong_offset) % 4 end order by question) as pre_answers,
         jsonb_agg(case when post_rank <= scores.pre_score + scores.delta then correct else (correct + 1 + wrong_offset) % 4 end order by question) as post_answers
  from (
    select question, correct,
           row_number() over (order by md5(scores.user_id::text || ':pre:' || question)) as pre_rank,
           row_number() over (order by md5(scores.user_id::text || ':post:' || question)) as post_rank,
           (question + scores.position) % 3 as wrong_offset
    from unnest(array[1,0,2,3,0,2,1,3,0,2]) with ordinality as key(correct, question)
  ) ranked
) answers;

-- Replacement and inserts are atomic; a failure rolls back the deletion.
delete from public.course_assessments where course_id = 'ai-fundamentals';
insert into public.course_assessments (
  user_id, course_id, pre_test_answers, pre_test_score, pre_test_completed_at,
  post_test_answers, post_test_score, post_test_completed_at,
  post_test_reflection, assessment_version, is_mock
)
select user_id, 'ai-fundamentals', pre_answers, pre_score, pre_at,
       post_answers, post_score, post_at, null, 2, true
from ai_literacy_seed;

-- Verify that both answer arrays really produce the stored scores.
do $$
begin
  if exists (
    select 1 from ai_literacy_seed s
    cross join lateral (
      select count(*) filter (where (s.pre_answers ->> (question - 1)::integer)::integer = correct) as pre_count,
             count(*) filter (where (s.post_answers ->> (question - 1)::integer)::integer = correct) as post_count
      from unnest(array[1,0,2,3,0,2,1,3,0,2]) with ordinality as key(correct, question)
    ) totals
    where totals.pre_count <> s.pre_score or totals.post_count <> s.post_score or s.delta < -1
  ) then raise exception 'SEED_SCORE_MISMATCH'; end if;
end;
$$;

select count(*) as seeded_users,
       count(*) filter (where delta = 0) as unchanged,
       count(*) filter (where delta = -1) as declined_one_point,
       count(*) filter (where delta = 1) as gained_one_point,
       count(*) filter (where delta = 2) as gained_two_points,
       count(*) filter (where delta = 4) as gained_four_points,
       round(avg(pre_score), 2) as average_pre,
       round(avg(post_score), 2) as average_post
from ai_literacy_seed;
commit;
