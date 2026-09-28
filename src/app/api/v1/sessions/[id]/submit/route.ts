import { NextResponse, type NextRequest } from "next/server";
import { append } from "@/server/session/repository";
import { scoreSession } from "@/server/scoring/scorer";
import { citationMini } from "@/server/scenario/citation-mini";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const header = request.headers.get("if-match");
    const expected = header === null ? NaN : Number(header);
    const session = await append(id, expected, [{
      clientEventId: crypto.randomUUID(), type: "session_submitted",
      occurredAt: new Date().toISOString(), payload: { responsibilityConfirmed: true },
    }]);
    return NextResponse.json({ snapshot: session.snapshot, report: scoreSession(citationMini, session.events) });
  } catch (error) {
    return NextResponse.json({ error: { code: "SUBMISSION_FAILED", message: "Refresh and try again." } },
      { status: error instanceof Error && error.message === "LOGIN_REQUIRED" ? 401 : error instanceof Error && error.message === "AUTH_NOT_CONFIGURED" ? 503 : 409 });
  }
}
