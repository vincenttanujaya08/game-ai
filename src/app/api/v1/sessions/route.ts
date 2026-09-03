import { NextRequest, NextResponse } from "next/server";
import { startOrResume } from "@/server/session/repository";
import { toPublicScenario } from "@/shared/contracts/scenario";
import { citationMini } from "@/server/scenario/citation-mini";

export async function POST(request: NextRequest) {
  const session = startOrResume(request.nextUrl.searchParams.has("reset"));
  return NextResponse.json({
    sessionId: session.id,
    snapshot: session.snapshot,
    scenario: toPublicScenario(citationMini),
  });
}
