-- OPTIONAL DEMO DATA: run only for a local/test database, after game-results-and-ratings.sql.
-- These are example scores/ratings, not reconstructed player answers.
-- Existing actual results and ratings are never changed.
begin;
insert into public.game_results (user_id, game_id, score, is_mock)
select user_id, 'sitasi-bermasalah', 80, true from public.game_sessions
where id = 'demo' and snapshot ->> 'status' = 'submitted'
on conflict (user_id, game_id) do nothing;
insert into public.game_results (user_id, game_id, score, is_mock)
select user_id, 'kamera-rusak', 80, true from public.game_progress
where game_id = 'kamera-rusak' and completed = true
on conflict (user_id, game_id) do nothing;
insert into public.game_ratings (user_id, game_id, usefulness_rating, clarity_rating, comment, is_mock)
select user_id, game_id, 4, 4, null, true from public.game_results where is_mock = true
on conflict (user_id, game_id) do nothing;
commit;
