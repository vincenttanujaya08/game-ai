import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSession } from "@/server/session/repository";
import { FixtureModelGateway } from "@/server/llm/model-gateway";

const Body = z.object({ prompt: z.string().min(1).max(2000), contextIds: z.array(z.string()).max(8) }).strict();

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const input = Body.parse(await request.json());
    const session = await getSession(id);
    if (input.contextIds.some((value) => !session.snapshot.contextDocumentIds.includes(value))) throw new Error("CONTEXT_NOT_AUTHORIZED");
    return NextResponse.json(await new FixtureModelGateway().generateMissionResponse(input));
  } catch (error) {
    return NextResponse.json({ error: { code: "INVALID_AI_REQUEST", message: "Only authorized context IDs are accepted." } },
      { status: error instanceof Error && error.message === "LOGIN_REQUIRED" ? 401 : error instanceof Error && error.message === "AUTH_NOT_CONFIGURED" ? 503 : 400 });
  }
}
