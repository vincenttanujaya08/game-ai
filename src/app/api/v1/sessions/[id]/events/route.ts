import { NextResponse, type NextRequest } from "next/server";
import { AppendEventsSchema } from "@/shared/contracts/session";
import { append } from "@/server/session/repository";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const header = request.headers.get("if-match");
    const expected = header === null ? NaN : Number(header);
    const body = AppendEventsSchema.parse(await request.json());
    const session = await append(id, expected, body.events);
    return NextResponse.json({ snapshot: session.snapshot, acceptedThrough: session.snapshot.streamVersion });
  } catch (error) {
    const code = error instanceof Error ? error.message : "INVALID_REQUEST";
    return NextResponse.json({ error: { code, message: code === "STREAM_VERSION_CONFLICT" ? "Session changed; refresh and retry." : "Request could not be accepted." } },
      { status: code === "LOGIN_REQUIRED" ? 401 : code === "AUTH_NOT_CONFIGURED" ? 503 : code === "STREAM_VERSION_CONFLICT" ? 409 : 400 });
  }
}
