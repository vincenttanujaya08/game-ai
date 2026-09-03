import "server-only";

type ModelInput = { contextIds: string[]; prompt: string };
type ModelOutput = { message: string; diffText: string };

export interface ModelGateway {
  generateMissionResponse(input: ModelInput): Promise<ModelOutput>;
  healthcheck(): Promise<{ available: boolean; mode: string }>;
}

const sourceSentences: Record<string, string> = {
  doc_unesco:
    "Literasi AI mencakup pengetahuan, keterampilan, nilai, etika, dan pengawasan manusia.",
  doc_unesco_students:
    "Bagi pelajar, kompetensi ini juga meliputi pola pikir yang berpusat pada manusia, teknik dan aplikasi, serta perancangan sistem AI.",
  doc_digcomp:
    "Pengguna perlu memahami peran data, menilai keluaran secara kritis, dan mengenali keterbatasan AI.",
  doc_data_ethics:
    "Dalam praktiknya, privasi, pengujian keluaran, dan tanggung jawab manusia perlu dijaga.",
  doc_participants:
    "Program dapat menjangkau mahasiswa dari berbagai program studi.",
  doc_ai_draft:
    "Kemampuan memakai alat secara efisien tetap menjadi bagian penting.",
  doc_ai_industry_report:
    "Kebutuhan ini makin mendesak seiring pertumbuhan adopsi AI.",
  doc_grade_impact:
    "AI juga dinilai membantu pencarian ide dan pengalaman belajar mahasiswa.",
  doc_campus_policy:
    "Untuk tugas akademik, fakta dan sitasi tetap perlu diperiksa oleh mahasiswa.",
  doc_class_notes:
    "Pembahasan kelas menambahkan dimensi teknis, etis, kritis, dan sosial.",
  doc_prompt_guide:
    "Kemampuan menyusun prompt membantu pengguna memperoleh keluaran yang lebih sesuai.",
  doc_vendor_whitepaper:
    "Fitur otomatisasi juga dikaitkan dengan penghematan waktu.",
};

export class FixtureModelGateway implements ModelGateway {
  async generateMissionResponse(input: ModelInput): Promise<ModelOutput> {
    const sentences = input.contextIds
      .map((id) => sourceSentences[id])
      .filter(Boolean);
    const diffText =
      sentences.join(" ") ||
      "Literasi AI perlu dipahami sesuai konteks penggunaan dan dampaknya.";

    return {
      message: `Aku menggabungkan ${input.contextIds.length} dokumen yang kamu pilih menjadi satu draf:\n\n${diffText}`,
      diffText,
    };
  }

  async healthcheck() {
    return { available: true, mode: "fixture" };
  }
}
