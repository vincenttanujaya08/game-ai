import "server-only";
import { SessionEvent } from "@/shared/contracts/session";
import { ScenarioDefinition } from "@/shared/contracts/scenario";

export type ScoreReport = {
  scorerVersion: string;
  scenarioContentHash: string;
  total: number;
  dimensions: {
    id: string;
    earned: number;
    possible: number;
    normalized: number;
  }[];
  findings: {
    ruleId: string;
    outcome: "met" | "missed";
    earned: number;
    possible: number;
    eventIds: string[];
    artifactBlockIds: string[];
    evidencePassageIds: string[];
    feedbackKey: string;
  }[];
  consequenceIds: string[];
};

export function scoreSession(
  scenario: ScenarioDefinition,
  events: readonly SessionEvent[],
): ScoreReport {
  const context = new Set<string>();
  const claimStates = new Map<string, string>();
  for (const event of events) {
    if (event.type === "context_item_added") {
      context.add(String(event.payload.documentId));
    }
    if (event.type === "context_item_removed") {
      context.delete(String(event.payload.documentId));
    }
    if (event.type === "claim_state_changed") {
      claimStates.set(
        String(event.payload.claimId),
        String(event.payload.state),
      );
    }
  }

  const contextEventIds = events
    .filter(
      (event) =>
        event.type === "context_item_added" ||
        event.type === "context_item_removed",
    )
    .map((event) => event.id);
  const contextIsFocused = context.size === 1 && context.has("doc_unesco");
  const link = events.find(
    (event) =>
      event.type === "evidence_linked" &&
      event.payload.claimId === "claim_multidimensional" &&
      event.payload.passageId ===
        scenario.truth.expectedLinks.claim_multidimensional,
  );
  const diff = [...events]
    .reverse()
    .find(
      (event) =>
        event.type === "diff_accepted" || event.type === "diff_rejected",
    );

  const findings = scenario.truth.rules.map((rule) => {
    const met =
      rule.kind === "source_choice"
        ? rule.documentId !== undefined &&
          context.has(rule.documentId) === rule.expectedSelected
        : rule.kind === "claim_state"
          ? rule.claimId !== undefined &&
            claimStates.get(rule.claimId) === rule.expectedState
          : rule.kind === "context_selection"
            ? contextIsFocused
            : rule.kind === "evidence_link"
              ? Boolean(link)
              : diff?.type === "diff_accepted";
    const eventIds = met
      ? rule.kind === "context_selection" || rule.kind === "source_choice"
        ? contextEventIds
        : rule.kind === "claim_state"
          ? events
              .filter(
                (event) =>
                  event.type === "claim_state_changed" &&
                  event.payload.claimId === rule.claimId,
              )
              .map((event) => event.id)
          : [String((rule.kind === "evidence_link" ? link : diff)?.id)]
      : [];
    return {
      ruleId: rule.id,
      outcome: met ? ("met" as const) : ("missed" as const),
      earned: met ? rule.maxPoints : 0,
      possible: rule.maxPoints,
      eventIds,
      artifactBlockIds:
        rule.kind === "diff_review" ? ["block_recommendation"] : [],
      evidencePassageIds:
        rule.kind === "evidence_link" && met ? ["passage_unesco_scope"] : [],
      feedbackKey: rule.feedbackKey,
    };
  });
  const dimensions = Object.values(
    scenario.truth.rules.reduce<
      Record<string, { id: string; earned: number; possible: number }>
    >((result, rule) => {
      const finding = findings.find((item) => item.ruleId === rule.id)!;
      const dimension = result[rule.dimension] ?? {
        id: rule.dimension,
        earned: 0,
        possible: 0,
      };
      dimension.earned += finding.earned;
      dimension.possible += finding.possible;
      result[rule.dimension] = dimension;
      return result;
    }, {}),
  ).map((dimension) => ({
    ...dimension,
    normalized: (dimension.earned / dimension.possible) * 100,
  }));
  const total = findings.reduce((sum, finding) => sum + finding.earned, 0);
  return {
    scorerVersion: "ai-output-audit-1",
    scenarioContentHash: scenario.truth.contentHash,
    total,
    dimensions,
    findings,
    consequenceIds: [
      total === 100 ? "consequence_strong" : "consequence_mixed",
    ],
  };
}
