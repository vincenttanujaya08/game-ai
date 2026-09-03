import { z } from "zod";
const Id = z
  .string()
  .regex(/^(doc|passage|claim|block|rule|consequence|fallback)_[a-z0-9_]+$/);
export const PassageSchema = z
  .object({ id: Id, text: z.string().min(1) })
  .strict();
export const DocumentSchema = z
  .object({
    id: Id,
    title: z.string(),
    owner: z.string(),
    createdAt: z.string(),
    kind: z.enum(["message", "report", "dataset", "reference", "draft"]),
    classification: z.enum(["public", "internal", "restricted"]),
    sourceState: z.enum([
      "original",
      "archived_copy",
      "inaccessible_reference",
      "unverified_copy",
    ]),
    contextPolicy: z.discriminatedUnion("mode", [
      z.object({ mode: z.literal("allowed_full") }),
      z.object({ mode: z.literal("never_send"), reasonKey: z.string() }),
    ]),
    passages: z.array(PassageSchema),
  })
  .strict();
export const PublicScenarioSchema = z
  .object({
    schemaVersion: z.literal("1"),
    id: z.string(),
    title: z.string(),
    locale: z.literal("id-ID"),
    documents: z.array(DocumentSchema),
    claims: z.array(z.object({ id: Id, visibleText: z.string() }).strict()),
    artifact: z
      .object({
        blocks: z.array(
          z.object({ id: Id, title: z.string(), text: z.string() }).strict(),
        ),
      })
      .strict(),
  })
  .strict();
export const ScoreRuleSchema = z
  .object({
    id: Id,
    dimension: z.enum([
      "evidence_judgment",
      "context_discipline",
      "human_oversight",
      "responsible_communication",
    ]),
    maxPoints: z.number().positive(),
    kind: z.enum(["context_selection", "evidence_link", "diff_review"]),
    feedbackKey: z.string(),
  })
  .strict();
export const ScenarioDefinitionSchema = PublicScenarioSchema.extend({
  truth: z
    .object({
      expectedLinks: z.record(z.string(), z.string()),
      rules: z.array(ScoreRuleSchema),
      contentHash: z.string(),
    })
    .strict(),
  fixtureResponse: z
    .object({ id: Id, message: z.string(), diffText: z.string() })
    .strict(),
}).strict();
export type ScenarioDefinition = z.infer<typeof ScenarioDefinitionSchema>;
export type PublicScenario = z.infer<typeof PublicScenarioSchema>;
export const toPublicScenario = (s: ScenarioDefinition): PublicScenario =>
  PublicScenarioSchema.parse({
    schemaVersion: s.schemaVersion,
    id: s.id,
    title: s.title,
    locale: s.locale,
    documents: s.documents,
    claims: s.claims,
    artifact: s.artifact,
  });
