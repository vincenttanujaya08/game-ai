import type {
  Activity,
  ArrangeActivity,
  EstimateActivity,
  PredictActivity,
  SpotActivity,
  Verdict,
} from "./types";
import { isArrangeOrdering } from "./types";

/**
 * Seluruh kebenaran blok latihan tinggal di satu file tanpa React dan tanpa DOM,
 * supaya komponennya jadi UI saja dan aturannya bisa diuji langsung.
 */

function unsolved(message: string): Verdict {
  return { solved: false, hits: [], misses: [], message };
}

function gradePredict(activity: PredictActivity, response: unknown): Verdict {
  if (!Number.isInteger(response)) return unsolved("Pilih salah satu dulu.");
  const index = response as number;
  const option = activity.options[index];
  if (!option) return unsolved("Pilih salah satu dulu.");
  return {
    solved: option.correct,
    hits: option.correct ? [option.label] : [],
    misses: option.correct ? [] : [option.label],
    message: option.feedback,
  };
}

function gradeSpot(activity: SpotActivity, response: unknown): Verdict {
  const picked = Array.isArray(response) ? response.filter((id): id is string => typeof id === "string") : [];
  if (picked.length === 0) {
    return unsolved(activity.mode === "flaw" ? "Tandai bagian yang menurutmu bermasalah." : "Tandai bagian yang kamu kenali.");
  }
  const targets = activity.spans.filter((span) => span.target).map((span) => span.id);
  const hits = picked.filter((id) => targets.includes(id));
  const wrong = picked.filter((id) => !targets.includes(id));
  const missed = targets.filter((id) => !picked.includes(id));
  const solved = hits.length >= activity.requiredHits && wrong.length === 0;
  return {
    solved,
    hits,
    misses: [...wrong, ...missed],
    message: solved
      ? activity.reveal
      : wrong.length > 0
        ? "Ada bagian yang sebenarnya sudah tepat. Lepas tanda itu dan periksa lagi."
        : "Masih ada bagian yang terlewat. Cari " + (activity.requiredHits - hits.length) + " lagi.",
  };
}

function gradeArrange(activity: ArrangeActivity, response: unknown): Verdict {
  if (isArrangeOrdering(activity)) {
    const order = Array.isArray(response) ? response.filter((id): id is string => typeof id === "string") : [];
    if (order.length !== activity.answer.length) return unsolved("Susun semua langkahnya dulu.");
    const hits = order.filter((id, index) => activity.answer[index] === id);
    const misses = order.filter((id, index) => activity.answer[index] !== id);
    return {
      solved: misses.length === 0,
      hits,
      misses,
      message: misses.length === 0
        ? activity.reveal
        : hits.length + " dari " + order.length + " sudah di tempat yang tepat. " + (activity.hint ?? "Periksa langkah yang saling bergantung."),
    };
  }

  const placement = response && typeof response === "object" ? (response as Record<string, unknown>) : {};
  // Negasi isArrangeOrdering tidak mempersempit tipe intersection, jadi tegaskan di sini.
  const answer = activity.answer as Record<string, string>;
  const placed = activity.items.filter((item) => typeof placement[item.id] === "string");
  if (placed.length !== activity.items.length) return unsolved("Tempatkan semua item dulu.");
  const hits = activity.items.filter((item) => placement[item.id] === answer[item.id]).map((item) => item.id);
  const misses = activity.items.filter((item) => placement[item.id] !== answer[item.id]).map((item) => item.id);
  return {
    solved: misses.length === 0,
    hits,
    misses,
    message: misses.length === 0
      ? activity.reveal
      : hits.length + " dari " + activity.items.length + " sudah tepat. " + (activity.hint ?? "Lihat lagi yang masih tertukar."),
  };
}

function gradeEstimate(activity: EstimateActivity, response: unknown): Verdict {
  if (typeof response !== "number" || Number.isNaN(response)) return unsolved("Geser slider untuk menebak.");
  const gap = Math.abs(response - activity.answer);
  const solved = gap <= activity.tolerance;
  const direction = response > activity.answer ? "lebih tinggi" : "lebih rendah";
  return {
    solved,
    hits: solved ? ["estimate"] : [],
    misses: solved ? [] : ["estimate"],
    message: solved
      ? activity.reveal
      : "Tebakanmu " + direction + " dari angka sebenarnya, selisih " + Math.round(gap * 100) / 100 + " " + activity.unit + ". " + activity.reveal,
  };
}

export function grade(activity: Activity, response: unknown): Verdict {
  switch (activity.kind) {
    case "predict":
      return gradePredict(activity, response);
    case "spot":
      return gradeSpot(activity, response);
    case "arrange":
      return gradeArrange(activity, response);
    case "estimate":
      return gradeEstimate(activity, response);
    case "guided":
      return unsolved("Ikuti langkah-langkah latihan ini dulu.");
  }
}
