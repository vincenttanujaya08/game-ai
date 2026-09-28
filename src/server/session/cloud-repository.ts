import "server-only";
import type { EventInput, SessionEvent, SessionSnapshot } from "@/shared/contracts/session";
import { initialSnapshot } from "@/shared/contracts/session";
import { citationMini } from "@/server/scenario/citation-mini";
import { reduceSession } from "./reducer";
import { createClient } from "@/lib/supabase/server";

type Stored = { id: string; snapshot: SessionSnapshot; events: SessionEvent[] };

async function account() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("LOGIN_REQUIRED");
  return { supabase, userId: user.id };
}

export async function startOrResumeCloud(reset = false): Promise<Stored> {
  const { supabase, userId } = await account();
  const { data: old, error: loadError } = await supabase.from("game_sessions")
    .select("snapshot,events").eq("user_id", userId).eq("id", "demo").maybeSingle();
  if (loadError) throw new Error("SESSION_LOAD_FAILED");
  if (!reset && old) {
    return { id: "demo", snapshot: old.snapshot as SessionSnapshot, events: old.events as SessionEvent[] };
  }
  const snapshot = initialSnapshot();
  const { error } = await supabase.from("game_sessions").upsert({
    user_id: userId, id: "demo", snapshot, events: [], stream_version: 0,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,id" });
  if (error) throw new Error("SESSION_SAVE_FAILED");
  return { id: "demo", snapshot, events: [] };
}

export async function getSessionCloud(id: string): Promise<Stored> {
  const { supabase, userId } = await account();
  const { data, error } = await supabase.from("game_sessions")
    .select("snapshot,events").eq("user_id", userId).eq("id", id).maybeSingle();
  if (error) throw new Error("SESSION_LOAD_FAILED");
  if (!data) throw new Error("NOT_FOUND");
  return { id, snapshot: data.snapshot as SessionSnapshot, events: data.events as SessionEvent[] };
}

export async function appendCloud(id: string, expected: number, inputs: EventInput[]): Promise<Stored> {
  const { supabase, userId } = await account();
  const { data, error } = await supabase.from("game_sessions")
    .select("snapshot,events").eq("user_id", userId).eq("id", id).maybeSingle();
  if (error) throw new Error("SESSION_LOAD_FAILED");
  if (!data) throw new Error("NOT_FOUND");
  let snapshot = data.snapshot as SessionSnapshot;
  const events = [...data.events as SessionEvent[]];
  if (!Number.isInteger(expected) || snapshot.streamVersion !== expected) throw new Error("STREAM_VERSION_CONFLICT");
  for (const input of inputs) {
    if (events.some((event) => event.clientEventId === input.clientEventId)) continue;
    if (input.type === "context_item_added" && !citationMini.documents.some((doc) => doc.id === input.payload.documentId)) {
      throw new Error("EVENT_NOT_ALLOWED");
    }
    const event: SessionEvent = {
      ...input, id: `event_${events.length + 1}`, sessionId: id, sequence: events.length + 1,
      receivedAt: new Date().toISOString(), actor: "learner", schemaVersion: 1,
    };
    events.push(event);
    snapshot = reduceSession(snapshot, event);
  }
  const { data: saved, error: saveError } = await supabase.from("game_sessions")
    .update({ snapshot, events, stream_version: snapshot.streamVersion, updated_at: new Date().toISOString() })
    .eq("user_id", userId).eq("id", id).eq("stream_version", expected).select("snapshot,events").maybeSingle();
  if (saveError) throw new Error("SESSION_SAVE_FAILED");
  if (!saved) throw new Error("STREAM_VERSION_CONFLICT");
  return { id, snapshot: saved.snapshot as SessionSnapshot, events: saved.events as SessionEvent[] };
}
