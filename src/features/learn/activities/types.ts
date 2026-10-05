/**
 * Blok latihan ditulis sebagai data, bukan komponen baru tiap kali. Semua
 * mekanik di sini membentuk loop tebak-lalu-periksa: pembaca memutuskan dulu,
 * baru melihat alasannya.
 */

/** Pilih satu jawaban, lalu lihat alasan tiap pilihan. */
export type PredictActivity = {
  kind: "predict";
  prompt: string;
  options: { label: string; correct: boolean; feedback: string }[];
  /** Alasan yang muncul sesudah pembaca memilih, apa pun pilihannya. */
  reveal: string;
};

/**
 * Tandai bagian tertentu di dalam sebuah teks.
 * mode "flaw": tandai bagian yang cacat. mode "label": tandai bagian yang benar.
 */
export type SpotActivity = {
  kind: "spot";
  mode: "flaw" | "label";
  lead: string;
  spans: { id: string; text: string; tag?: string; target: boolean; why: string }[];
  /** Berapa span sasaran yang harus ditemukan agar dianggap selesai. */
  requiredHits: number;
  reveal: string;
};

/** Urutkan satu daftar, atau cocokkan tiap item ke keranjang yang tepat. */
export type ArrangeActivity = {
  kind: "arrange";
  instruction: string;
  items: { id: string; label: string }[];
  /** Ada bucket berarti mencocokkan; tanpa bucket berarti mengurutkan. */
  buckets?: { id: string; label: string }[];
  /** itemId → bucketId untuk mencocokkan, atau daftar itemId terurut. */
  answer: Record<string, string> | string[];
  hint?: string;
  reveal: string;
};

/** Tebak sebuah angka dengan slider, lalu bandingkan dengan angka sebenarnya. */
export type EstimateActivity = {
  kind: "estimate";
  question: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  answer: number;
  /** Selisih yang masih dianggap tepat. */
  tolerance: number;
  reveal: string;
  source?: { label: string; url: string };
};

/** Alur beberapa keputusan untuk diagnosis, revisi, dan tantangan akhir. */
export type GuidedActivity = {
  kind: "guided";
  title: string;
  steps: {
    id: string;
    prompt: string;
    options: { label: string; feedback: string; correct: boolean }[];
  }[];
  comparison?: { before: string; after: string };
  checks?: { stepId: string; label: string }[];
  reveal: string;
};

export type Activity =
  | PredictActivity
  | SpotActivity
  | ArrangeActivity
  | EstimateActivity
  | GuidedActivity;

/** Hasil satu percobaan. Dipakai UI untuk umpan balik dan progres untuk penguasaan. */
export type Verdict = {
  solved: boolean;
  /** Bagian yang sudah tepat. */
  hits: string[];
  /** Bagian yang belum tepat atau belum ditemukan. */
  misses: string[];
  message: string;
  firstTryCorrect?: boolean;
};

export function isArrangeOrdering(activity: ArrangeActivity): activity is ArrangeActivity & { answer: string[] } {
  return Array.isArray(activity.answer);
}
