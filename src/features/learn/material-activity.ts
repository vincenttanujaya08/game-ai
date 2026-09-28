import type { Activity } from "./activities/types";

function value(text: string, label: string) {
  return new RegExp(`^\\*\\*${label}:\\*\\* (.+)$`, "m").exec(text)?.[1];
}

function listed(text: string, label: string) {
  const after = text.split(`**${label}**`, 2)[1];
  return after?.split(/\n\*\*[^\n]+\*\*|\n\n\*\*[^\n]+\*\*/)[0]
    .split(/\n\s*\n|\n/).map((line) => line.replace(/^- /, "").trim()).filter(Boolean) ?? [];
}

export function materialActivity(activity: Activity | undefined, text: string): Activity | undefined {
  if (!activity || !text) return activity;
  const first = text.split("\n\n", 1)[0];
  const reveal = value(text, "Pembahasan");
  if (activity.kind === "predict") {
    const options = [...text.matchAll(/^\d+\. (.+?) — (.+)$/gm)];
    if (options.length !== activity.options.length) return activity;
    return { ...activity, prompt: first, reveal: reveal ?? activity.reveal, options: options.map((match) => ({
      label: match[1].replace(" **(jawaban tepat)**", ""),
      correct: match[1].includes("**(jawaban tepat)**"),
      feedback: match[2],
    })) };
  }
  if (activity.kind === "estimate") {
    const answer = value(text, "Jawaban")?.match(/^([\d.]+)/);
    return { ...activity, question: first, answer: answer ? Number(answer[1]) : activity.answer,
      reveal: reveal ?? activity.reveal };
  }
  if (activity.kind === "spot") {
    const lines = text.split("\n").filter((line) => line.startsWith("- "));
    if (lines.length !== activity.spans.length) return activity;
    return { ...activity, lead: first, reveal: reveal ?? activity.reveal,
      spans: activity.spans.map((span, index) => {
        const [sentence, why = span.why] = lines[index].slice(2).split(" — ");
        const tag = / \*\*\(([^)]+)\)\*\*$/.exec(sentence)?.[1];
        return { ...span, text: sentence.replace(/ \*\*\([^)]+\)\*\*$/, ""), tag, target: why.startsWith("Sasaran."), why };
      }) };
  }
  if (activity.kind === "arrange") {
    const itemLabels = listed(text, "Pilihan");
    if (itemLabels.length !== activity.items.length) return activity;
    const bucketLabels = activity.buckets ? listed(text, "Kategori") : [];
    const items = activity.items.map((item, index) => ({ ...item, label: itemLabels[index] }));
    const buckets = activity.buckets?.map((bucket, index) => ({ ...bucket, label: bucketLabels[index] ?? bucket.label }));
    const hint = value(text, "Petunjuk") ?? activity.hint;
    const sequence = value(text, "Urutan jawaban");
    const pairs = listed(text, "Pasangan jawaban");
    let answer = activity.answer;
    if (sequence && Array.isArray(answer)) {
      answer = sequence.split(" → ").map((label) => items.find((item) => item.label === label)?.id).filter((id): id is string => Boolean(id));
      if (answer.length !== items.length) answer = activity.answer;
    } else if (pairs.length && buckets && !Array.isArray(answer)) {
      answer = Object.fromEntries(pairs.map((pair) => {
        const [itemLabel, bucketLabel] = pair.split(" → ");
        const item = items.find((entry) => entry.label === itemLabel);
        const bucket = buckets.find((entry) => entry.label === bucketLabel);
        return item && bucket ? [item.id, bucket.id] : [];
      }).filter((entry) => entry.length === 2));
      if (Object.keys(answer).length !== items.length) answer = activity.answer;
    }
    return { ...activity, instruction: first, items, buckets, hint, answer, reveal: reveal ?? activity.reveal };
  }
  const checks = [...text.matchAll(/^- (.+?) — (.+?) \(pola pemeriksaan: `(.+?)`(?:; opsi `(.+?)`)?\)$/gm)];
  return { ...activity, task: first, startPrompt: value(text, "Prompt awal") ?? activity.startPrompt,
    checks: checks.length === activity.checks.length ? activity.checks.map((check, index) => ({ ...check,
      label: checks[index][1], hint: checks[index][2], pattern: checks[index][3], flags: checks[index][4],
    })) : activity.checks,
    outputs: { weak: value(text, "Contoh hasil sebelum perbaikan") ?? activity.outputs.weak,
      strong: value(text, "Contoh hasil setelah perbaikan") ?? activity.outputs.strong } };
}
