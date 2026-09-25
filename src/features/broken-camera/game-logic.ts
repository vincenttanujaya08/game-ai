export type Candidate = "Arya" | "Bella" | "Dimas" | "Chris" | "Leo";

const candidates: Candidate[] = ["Arya", "Bella", "Dimas", "Chris", "Leo"];
const ties: Candidate[] = ["Chris", "Leo", "Dimas", "Bella", "Arya"];

const interviewPoints: Record<string, [Candidate, number]> = {
  Arya: ["Arya", 4], Kevin: ["Arya", 10], Bella: ["Bella", 6], Fajar: ["Bella", 10],
  Dimas: ["Dimas", 14], Rafi: ["Dimas", 10], Chris: ["Chris", 7], Nina: ["Chris", 20],
  Leo: ["Leo", 15], Maya: ["Leo", 10],
};
const followUpPoints: Record<string, [Candidate, number]> = {
  Arya: ["Arya", 16], Kevin: ["Arya", 22], Bella: ["Bella", 16], Fajar: ["Bella", 22],
  Dimas: ["Dimas", 20], Rafi: ["Dimas", 18], Chris: ["Chris", 20], Nina: ["Chris", 18],
  Leo: ["Leo", 20], Maya: ["Leo", 18],
};

export function buildScores(interviewed: string[], followedUp: string[]) {
  const scores = Object.fromEntries(candidates.map((name) => [name, 0])) as Record<Candidate, number>;
  for (const id of interviewed) {
    const point = interviewPoints[id];
    if (point) scores[point[0]] += point[1];
  }
  for (const id of followedUp) {
    const point = followUpPoints[id];
    if (point) scores[point[0]] += point[1];
  }
  if (followedUp.includes("Arya") && followedUp.includes("Kevin")) scores.Arya += 12;
  if (followedUp.includes("Bella") && followedUp.includes("Fajar")) scores.Bella += 12;
  if (followedUp.includes("Dimas") && followedUp.includes("Rafi")) scores.Dimas += 12;
  if (followedUp.includes("Chris") && followedUp.includes("Nina")) scores.Chris += 12;
  if (followedUp.includes("Leo") && followedUp.includes("Maya")) scores.Leo += 12;
  if (followedUp.includes("Siska")) { scores.Arya += 3; scores.Bella += 3; }
  return scores;
}

export function rankCandidates(interviewed: string[], followedUp: string[]) {
  const scores = buildScores(interviewed, followedUp);
  const total = candidates.reduce((sum, name) => sum + Math.max(1, scores[name]), 0);
  return [...candidates].sort((a, b) => scores[b] - scores[a] || ties.indexOf(a) - ties.indexOf(b)).map((name) => ({
    name,
    score: scores[name],
    percent: Math.round((100 * Math.max(1, scores[name])) / total),
  }));
}
