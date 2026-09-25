import { expect, it } from "vitest";
import { FixtureModelGateway } from "./model-gateway";

it("mengubah saran sesuai konteks dokumen", async () => {
  const gateway = new FixtureModelGateway();
  const relevant = await gateway.generateMissionResponse({
    contextIds: ["doc_unesco"],
    prompt: "Buat klaim",
  });
  const misleading = await gateway.generateMissionResponse({
    contextIds: ["doc_grade_impact"],
    prompt: "Buat klaim",
  });

  expect(relevant.diffText).toContain("etika");
  expect(misleading.diffText).toContain("pengalaman belajar");
});
