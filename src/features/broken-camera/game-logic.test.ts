import { expect, test } from "vitest";
import { buildScores, rankCandidates } from "./game-logic";

test("detail lanjutan menambah bukti pada jalur yang tepat", () => {
  expect(buildScores(["Arya", "Kevin"], ["Arya", "Kevin"]).Arya).toBe(64);
  expect(rankCandidates(["Arya", "Kevin"], ["Arya", "Kevin"])[0].name).toBe("Arya");
});
