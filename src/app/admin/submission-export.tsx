"use client";

import styles from "./admin.module.css";

type SubmissionExportRow = {
  name: string | null;
  university: string | null;
  projectName: string;
  summary: string;
  aiTools: string;
  demoUrl: string;
  repositoryUrl: string;
  late: boolean;
};

export function SubmissionExport({ rows }: { rows: SubmissionExportRow[] }) {
  function downloadCsv() {
    const cell = (value: string | number) => {
      const text = String(value);
      const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
      return `"${safe.replaceAll('"', '""')}"`;
    };
    const csv = [
      ["No.", "Peserta", "Institusi", "Project", "Ringkasan dan proses AI", "Alat AI", "Demo URL", "GitHub URL", "Status pengumpulan"],
      ...rows.map((row, index) => [index + 1, row.name ?? "", row.university ?? "", row.projectName, row.summary, row.aiTools, row.demoUrl, row.repositoryUrl, row.late ? "Terlambat" : "Tepat waktu"]),
    ].map((row) => row.map(cell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "karya-peserta-vibe-coding.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <button className={styles.submissionExport} type="button" onClick={downloadCsv} disabled={!rows.length}>Export CSV</button>;
}
