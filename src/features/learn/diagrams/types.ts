/**
 * Diagram konsep menggantikan foto stok yang tidak menjelaskan mekanisme apa pun.
 * Semuanya inline SVG: aman terhadap CSP `img-src 'self'`, ikut tema lewat
 * custom property, dan tidak menambah satu byte biner pun.
 */
export type DiagramId =
  | "token-stream"
  | "train-vs-infer"
  | "context-window"
  | "classify-boundary"
  | "agent-loop"
  | "citation-chain"
  | "permission-gate";

export type DiagramSpec = {
  id: DiagramId;
  /** Keterangan di bawah gambar. */
  caption: string;
};
