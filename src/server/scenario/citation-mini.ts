import "server-only";
import { ScenarioDefinitionSchema } from "@/shared/contracts/scenario";
export const citationMini = ScenarioDefinitionSchema.parse({
  schemaVersion: "1",
  id: "citation-crisis-mini@1",
  title: "Kasus Sitasi Bermasalah",
  locale: "id-ID",
  documents: [
    {
      id: "doc_committee_brief",
      title: "Brief tugas dari Dr. Maya",
      owner: "Dr. Maya Santoso",
      createdAt: "2026-08-30",
      kind: "message",
      classification: "internal",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_assignment",
          text: "Siapkan satu rekomendasi singkat untuk Komite Akademik. Pisahkan bukti yang sudah diperiksa dari rekomendasimu dan jelaskan jika kamu memakai bantuan AI.",
        },
      ],
    },
    {
      id: "doc_unesco",
      title: "Kerangka literasi AI UNESCO",
      owner: "Arsip Perpustakaan NUSA",
      createdAt: "2025-01-01",
      kind: "reference",
      classification: "public",
      sourceState: "archived_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_unesco_scope",
          text: "Literasi AI mencakup pengetahuan, keterampilan, nilai, etika, dan pengawasan manusia—bukan hanya keterampilan teknis.",
        },
      ],
    },
    {
      id: "doc_unesco_students",
      title: "Panduan penggunaan AI generatif di perguruan tinggi",
      owner: "Direktorat Pembelajaran dan Kemahasiswaan",
      createdAt: "2024-10-01",
      kind: "reference",
      classification: "public",
      sourceState: "archived_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_unesco_students",
          text: "Mahasiswa perlu mengevaluasi kekuatan dan kelemahan AI, memeriksa fakta dan sumber, mengenali bias, menjaga data pribadi, serta tetap mengambil keputusan secara mandiri.",
        },
      ],
    },
    {
      id: "doc_digcomp",
      title: "DigComp 2.2: warga dan sistem AI",
      owner: "European Commission · Joint Research Centre",
      createdAt: "2022-03-17",
      kind: "reference",
      classification: "public",
      sourceState: "archived_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_digcomp_ai",
          text: "Kompetensi digital terkait AI mencakup memahami penggunaan data, menilai keluaran secara kritis, mengenali keterbatasan, dan mempertimbangkan dampak etis.",
        },
      ],
    },
    {
      id: "doc_data_ethics",
      title: "Modul etika dan data dalam penggunaan AI",
      owner: "Pusat Pembelajaran Digital NUSA",
      createdAt: "2026-03-22",
      kind: "report",
      classification: "internal",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_data_ethics",
          text: "Pengguna AI perlu memahami data yang masuk, melindungi privasi, menguji keluaran, dan menjelaskan keputusan yang tetap berada di tangan manusia.",
        },
      ],
    },
    {
      id: "doc_participants",
      title: "Daftar peserta kegiatan kampus",
      owner: "Bagian Kemahasiswaan",
      createdAt: "2026-08-01",
      kind: "dataset",
      classification: "restricted",
      sourceState: "original",
      contextPolicy: {
        mode: "never_send",
        reasonKey: "contains_direct_identifiers",
      },
      passages: [
        {
          id: "passage_participant_columns",
          text: "Berisi contoh nama, alamat surel, dan nomor telepon peserta.",
        },
      ],
    },
    {
      id: "doc_ai_draft",
      title: "Draf AI versi 1",
      owner: "AIRA",
      createdAt: "2026-08-30",
      kind: "draft",
      classification: "internal",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_ai_draft",
          text: "Literasi AI terutama berarti mampu memakai alat secara efisien.",
        },
      ],
    },
    {
      id: "doc_ai_industry_report",
      title: "Laporan Lengkap Tren AI Indonesia 2026",
      owner: "Pusat Ekonomi Digital NUSA",
      createdAt: "2026-07-18",
      kind: "report",
      classification: "public",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_industry_report",
          text: "Laporan 64 halaman ini membahas investasi AI, jumlah perusahaan rintisan, adopsi alat generatif, kebutuhan pusat data, dan pertumbuhan pasar 2022–2026. Laporan tidak mendefinisikan literasi AI dan tidak membahas unsur etika atau pengawasan manusia.",
        },
      ],
    },
    {
      id: "doc_grade_impact",
      title: "Data Lengkap: AI Meningkatkan Nilai Mahasiswa",
      owner: "Forum Edutech Kampus",
      createdAt: "2026-06-04",
      kind: "report",
      classification: "public",
      sourceState: "unverified_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_grade_impact",
          text: "Setelah dibuka, dokumen ini ternyata hanya merangkum survei kepuasan 83 mahasiswa terhadap chatbot. Survei tidak mengukur nilai sebelum dan sesudah penggunaan AI, tidak memiliki kelompok pembanding, dan tidak menyertakan tautan ke data mentah.",
        },
      ],
    },
    {
      id: "doc_oecd_broken",
      title: "Kerangka Kompetensi AI OECD untuk Mahasiswa",
      owner: "Tautan kiriman Raka",
      createdAt: "2026-08-29",
      kind: "reference",
      classification: "public",
      sourceState: "inaccessible_reference",
      contextPolicy: {
        mode: "never_send",
        reasonKey: "source_unavailable",
      },
      passages: [
        {
          id: "passage_oecd_broken",
          text: "404 — Halaman tidak ditemukan. Isi sumber dan penulisnya tidak dapat diperiksa dari tautan ini.",
        },
      ],
    },
    {
      id: "doc_campus_policy",
      title: "Pedoman Penggunaan AI Universitas NUSA",
      owner: "Kantor Akademik NUSA",
      createdAt: "2026-02-12",
      kind: "reference",
      classification: "internal",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_campus_policy",
          text: "Mahasiswa wajib menjelaskan bantuan AI yang digunakan, memeriksa fakta dan sitasi, serta bertanggung jawab atas karya yang dikumpulkan. Pedoman ini mengatur perilaku penggunaan AI, tetapi tidak mendefinisikan cakupan literasi AI.",
        },
      ],
    },
    {
      id: "doc_class_notes",
      title: "Catatan Diskusi Kelas Minggu 3",
      owner: "Nadia · Kelompok 4",
      createdAt: "2026-08-27",
      kind: "reference",
      classification: "internal",
      sourceState: "unverified_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_class_notes",
          text: "Catatan berbunyi: 'Literasi AI itu teknis, etis, kritis, dan sosial.' Tidak ada nama penulis, judul bacaan, nomor halaman, atau tautan sumber yang dicatat.",
        },
      ],
    },
    {
      id: "doc_prompt_guide",
      title: "Panduan prompt untuk tugas kuliah",
      owner: "Komunitas Belajar NUSA",
      createdAt: "2026-08-19",
      kind: "reference",
      classification: "public",
      sourceState: "original",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_prompt_guide",
          text: "Panduan berisi pola menulis perintah, memberi contoh, menentukan format, dan meminta revisi agar keluaran chatbot lebih sesuai kebutuhan tugas.",
        },
      ],
    },
    {
      id: "doc_vendor_whitepaper",
      title: "Laporan produktivitas AI 2026",
      owner: "BrightMind AI Indonesia",
      createdAt: "2026-07-02",
      kind: "report",
      classification: "public",
      sourceState: "unverified_copy",
      contextPolicy: { mode: "allowed_full" },
      passages: [
        {
          id: "passage_vendor_productivity",
          text: "Materi pemasaran BrightMind menyatakan fitur ringkasan dan penulisan otomatis menghemat rata-rata 6,4 jam per pengguna setiap minggu.",
        },
      ],
    },
  ],
  claims: [
    {
      id: "claim_multidimensional",
      visibleText: "Literasi AI membutuhkan lebih dari keterampilan teknis.",
    },
  ],
  artifact: {
    blocks: [
      {
        id: "block_recommendation",
        title: "Rekomendasi",
        text: "Literasi AI terutama berarti mampu memakai alat secara efisien.",
      },
    ],
  },
  truth: {
    expectedLinks: {},
    rules: [
      {
        id: "rule_audit_prompt_only",
        dimension: "evidence_judgment",
        maxPoints: 20,
        kind: "claim_state",
        claimId: "claim_prompt_only",
        expectedState: "tidak_pakai",
        feedbackKey: "recognize_partial_skill",
      },
      {
        id: "rule_audit_unesco_scope",
        dimension: "evidence_judgment",
        maxPoints: 20,
        kind: "claim_state",
        claimId: "claim_unesco_scope",
        expectedState: "pakai",
        feedbackKey: "keep_supported_claim",
      },
      {
        id: "rule_audit_vendor_overreach",
        dimension: "evidence_judgment",
        maxPoints: 20,
        kind: "claim_state",
        claimId: "claim_vendor_overreach",
        expectedState: "tidak_pakai",
        feedbackKey: "remove_irrelevant_overreach",
      },
      {
        id: "rule_audit_grade_impact",
        dimension: "evidence_judgment",
        maxPoints: 20,
        kind: "claim_state",
        claimId: "claim_grade_impact",
        expectedState: "tidak_pakai",
        feedbackKey: "reject_unsupported_causal_claim",
      },
      {
        id: "rule_audit_campus_policy",
        dimension: "evidence_judgment",
        maxPoints: 20,
        kind: "claim_state",
        claimId: "claim_campus_policy",
        expectedState: "pakai",
        feedbackKey: "keep_context_specific_rule",
      },
    ],
    contentHash: "citation-ai-output-check-v5-20260914",
  },
  fixtureResponse: {
    id: "fallback_citation_mini",
    message:
      "Berdasarkan kutipan UNESCO, saya menyarankan klaim yang lebih tepat: literasi AI mencakup kemampuan teknis, etika, dan pengawasan manusia. Tolong periksa sebelum menerima.",
    diffText:
      "Literasi AI mencakup kemampuan teknis, etika, dan pengawasan manusia.",
  },
});
