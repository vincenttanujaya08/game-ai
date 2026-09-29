export const challengeStartsAt = new Date("2026-09-29T00:00:00+07:00");
export const challengeClosesAt = new Date("2026-10-07T00:00:00+07:00");

export function isChallengeOpen(now = Date.now()) {
  return now >= challengeStartsAt.getTime() && now < challengeClosesAt.getTime();
}
