import { NextResponse, type NextRequest } from "next/server";
import { append } from "@/server/session/repository";
import { scoreSession } from "@/server/scoring/scorer";
import { createClient } from "@/lib/supabase/server";
import { recordFirstGameScore } from "@/server/games/results";
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
    const report = scoreSession(citationMini, session.events);
    let resultSaved = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        try { await recordFirstGameScore(user.id, "sitasi-bermasalah", report.total); resultSaved = true; }
        catch { /* The result screen offers a retry without losing the submitted answers. */ }
      }
    }
    return NextResponse.json({ snapshot: session.snapshot, report, resultSaved });
  } catch (error) {
    return NextResponse.json({ error: { code: "SUBMISSION_FAILED", message: "Refresh and try again." } },
      { status: error instanceof Error && error.message === "LOGIN_REQUIRED" ? 401 : error instanceof Error && error.message === "AUTH_NOT_CONFIGURED" ? 503 : 409 });
  }
}
