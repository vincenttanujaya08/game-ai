-- Run once if event-challenge.sql was applied before the submit form changed.
-- Keep old document URLs on existing submissions; new submissions no longer need them.
alter table public.event_submissions
  alter column app_url drop not null,
  alter column instructions_url drop not null,
  alter column architecture_url drop not null;
