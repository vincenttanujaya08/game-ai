-- Run AFTER event-challenge-feedback.sql and BEFORE deploying the new feedback form.
-- At the owner's request, map existing ratings to learning through classes or the NUSA Lab website feedback.
-- Version 3 records this mapping; original material/game values remain unchanged.
begin;
alter table public.event_feedback
  alter column material_rating drop not null,
  alter column game_rating drop not null,
  add column if not exists feedback_version smallint not null default 1,
  add column if not exists teaching_rating smallint,
  add column if not exists practice_rating smallint;

alter table public.event_feedback drop constraint if exists event_feedback_version_shape;
alter table public.event_feedback add constraint event_feedback_version_shape check (
  (feedback_version = 1 and material_rating is not null and game_rating is not null
    and teaching_rating is null and practice_rating is null)
  or
  (feedback_version in (2, 3) and teaching_rating is not null and teaching_rating between 1 and 5
    and practice_rating is not null and practice_rating between 1 and 5)
);
update public.event_feedback
set teaching_rating = material_rating,
    practice_rating = game_rating,
    feedback_version = 3
where feedback_version = 1;

comment on column public.event_feedback.feedback_version is '1 = original material/game questionnaire; 2 = learning through classes or the NUSA Lab website questionnaire; 3 = original ratings mapped to teaching at owner request.';
comment on column public.event_feedback.teaching_rating is 'Usefulness of learning through classes or the NUSA Lab website for understanding the material (1–5).';
comment on column public.event_feedback.practice_rating is 'Usefulness of learning through classes or the NUSA Lab website for building the challenge project (1–5).';
commit;
