import { NextRequest, NextResponse } from "next/server";
import { startOrResume } from "@/server/session/repository";
import { toPublicScenario } from "@/shared/contracts/scenario";
import { citationMini } from "@/server/scenario/citation-mini";
import { scoreSession } from "@/server/scoring/scorer";

export async function POST(request: NextRequest) {
  let session;
  try { session = await startOrResume(request.nextUrl.searchParams.has("reset")); }
  catch (error) {
    return NextResponse.json({ error: "SESSION_UNAVAILABLE" }, { status: error instanceof Error && error.message === "LOGIN_REQUIRED" ? 401 : error instanceof Error && error.message === "AUTH_NOT_CONFIGURED" ? 503 : 500 });
  }
  return NextResponse.json({
    sessionId: session.id,
    snapshot: session.snapshot,
    scenario: toPublicScenario(citationMini),
    report: session.snapshot.status === "submitted" ? scoreSession(citationMini, session.events) : null,
  });
}
