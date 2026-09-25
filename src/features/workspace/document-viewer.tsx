"use client";

import type { MouseEvent } from "react";
import type { PublicScenario } from "@/shared/contracts/scenario";

type ScenarioDocument = PublicScenario["documents"][number];

const sourceAddresses: Record<string, string> = {
  doc_committee_brief: "mail.nusa.ac.id/mail/u/0/#inbox/FMfcgzQX",
  doc_unesco: "arsip-perpustakaan.nusa.ac.id/unesco/literasi-ai",
  doc_unesco_students:
    "kemdiktisaintek.go.id/panduan-genai-perguruan-tinggi.pdf",
  doc_digcomp: "joint-research-centre.ec.europa.eu/digcomp-2-2/ai",
  doc_data_ethics: "belajar.nusa.ac.id/modul/etika-data-ai.pdf",
  doc_participants: "drive.nusa.ac.id/sheets/peserta-ai-campus-day",
  doc_ai_draft: "docs.nusa.ac.id/document/draf-literasi-ai-v1",
  doc_ai_industry_report: "pedn.or.id/riset/tren-ai-indonesia-2026.pdf",
  doc_grade_impact: "forum-edutech-kampus.id/berita/ai-naikkan-nilai",
  doc_oecd_broken: "oecd-education.org/id/ai-competency-students",
  doc_campus_policy: "akademik.nusa.ac.id/pedoman/penggunaan-ai-2026.pdf",
  doc_class_notes: "drive.nusa.ac.id/files/catatan-minggu-3.jpg",
  doc_prompt_guide: "komunitas-belajar.nusa.id/panduan-prompt-kuliah",
  doc_vendor_whitepaper: "brightmind.ai/id/whitepaper-produktivitas-2026",
};

function jumpTo(event: MouseEvent<HTMLAnchorElement>, targetId: string) {
  event.preventDefault();
  event.currentTarget
    .closest(".source-browser")
    ?.querySelector<HTMLElement>(`#${targetId}`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function JumpLink({
  targetId,
  children,
}: {
  targetId: string;
  children: string;
}) {
  return (
    <a href={`#${targetId}`} onClick={(event) => jumpTo(event, targetId)}>
      {children} ↓
    </a>
  );
}

export function SourceDocumentViewer({
  document,
}: {
  document: ScenarioDocument;
}) {
  const unavailable = document.sourceState === "inaccessible_reference";
  return (
    <div className={`source-browser source-${document.id}`}>
      <div className="source-browser-chrome" aria-label="Bilah alamat sumber">
        <span className="window-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span aria-hidden>‹　›　↻</span>
        <div className={`source-address ${unavailable ? "address-error" : ""}`}>
          {unavailable ? "⚠" : "🔒"} {sourceAddresses[document.id]}
        </div>
        <span aria-hidden>☆　⋮</span>
      </div>
      <div className="source-browser-viewport">
        <DocumentBody documentId={document.id} />
      </div>
    </div>
  );
}

function DocumentBody({ documentId }: { documentId: string }) {
  switch (documentId) {
    case "doc_committee_brief":
      return <CommitteeEmail />;
    case "doc_unesco":
      return <UnescoArticle />;
    case "doc_unesco_students":
      return <StudentFramework />;
    case "doc_digcomp":
      return <DigCompBrief />;
    case "doc_data_ethics":
      return <DataEthicsModule />;
    case "doc_participants":
      return <ParticipantSheet />;
    case "doc_ai_draft":
      return <AiDraft />;
    case "doc_ai_industry_report":
      return <IndustryReport />;
    case "doc_grade_impact":
      return <GradeNews />;
    case "doc_oecd_broken":
      return <BrokenReference />;
    case "doc_campus_policy":
      return <CampusPolicy />;
    case "doc_class_notes":
      return <ClassNotes />;
    case "doc_prompt_guide":
      return <PromptGuide />;
    case "doc_vendor_whitepaper":
      return <VendorWhitepaper />;
    default:
      return <p>Pratinjau dokumen tidak tersedia.</p>;
  }
}

function CommitteeEmail() {
  return (
    <article className="web-document email-document">
      <header className="document-appbar">
        <b>NUSA Mail</b>
        <span>Arsip surel</span>
      </header>
      <section className="document-sheet email-sheet">
        <span className="mail-label">KOTAK MASUK</span>
        <h1>Tolong cek draf ini sebelum kelas</h1>
        <div className="mail-person">
          <span className="mail-avatar">M</span>
          <p>
            <b>Dr. Maya Santoso</b> &lt;maya.santoso@nusa.ac.id&gt;
            <small>kepada saya, Raka, Nadia · 30 Agu 2026, 16.42</small>
          </p>
        </div>
        <div className="letter-body">
          <p>Halo Kelompok 4,</p>
          <p>
            Tolong siapkan satu rekomendasi singkat untuk Komite Akademik:
            apakah literasi AI membutuhkan lebih dari keterampilan teknis?
          </p>
          <p>
            Pisahkan bukti yang sudah kalian periksa dari rekomendasi kelompok.
            Jika memakai bantuan AI, jelaskan sumber yang diberikan kepada AI
            dan pastikan keputusan akhir tetap dibuat oleh kalian.
          </p>
          <p>
            Saya perlu hasilnya sebelum kelas besok pukul 10.00. Satu paragraf
            yang kuat lebih berguna daripada laporan panjang yang tidak fokus.
          </p>
          <p>
            Terima kasih,
            <br />
            Maya
          </p>
        </div>
      </section>
    </article>
  );
}

function UnescoArticle() {
  const highlightId = "kutipan-valid-unesco";
  return (
    <article className="web-document unesco-document">
      <header className="site-masthead unesco-masthead">
        <div>
          <b>UNESCO</b>
          <span>Arsip Pendidikan Digital</span>
        </div>
        <nav aria-label="Navigasi situs simulasi">
          Pendidikan　Publikasi　Tentang
        </nav>
      </header>
      <div className="source-linkbar">
        <span>Salinan arsip · 1 Januari 2025</span>
        <JumpLink targetId={highlightId}>
          Lompat ke bagian yang dikutip
        </JumpLink>
      </div>
      <section className="document-sheet article-page">
        <p className="section-kicker">PENDIDIKAN · KERANGKA KOMPETENSI</p>
        <h1>Memahami literasi AI untuk pendidikan</h1>
        <p className="article-deck">
          Kerangka ringkas untuk membantu pelajar menggunakan, menilai, dan
          mempertanyakan sistem kecerdasan artifisial secara bertanggung jawab.
        </p>
        <p className="article-byline">
          Tim Pendidikan Digital · Bacaan 4 menit
        </p>
        <hr />
        <p>
          Penggunaan alat AI tidak otomatis membuat seseorang memahami cara
          kerja, keterbatasan, dan dampaknya. Pelajar perlu dapat mengenali
          kapan sebuah sistem membantu, kapan hasilnya perlu diuji, dan siapa
          yang bertanggung jawab atas keputusan akhir.
        </p>
        <aside className="article-callout">
          <b>Empat bidang yang dibahas</b>
          <span>
            Pengetahuan　·　Keterampilan　·　Nilai &amp; etika　·　Peran manusia
          </span>
        </aside>
        <p>
          Karena itu, kegiatan belajar sebaiknya tidak berhenti pada latihan
          mengoperasikan alat. Evaluasi sumber, pemahaman data, dan pertimbangan
          dampak sosial perlu dipraktikkan bersama.
        </p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet article-page second-page">
        <h2>Kompetensi yang saling melengkapi</h2>
        <p>
          Kompetensi teknis adalah salah satu bagian penting, tetapi tidak cukup
          untuk menghadapi keluaran yang keliru, bias, atau digunakan di luar
          konteks. Nilai dan etika membantu pelajar mempertimbangkan siapa yang
          terdampak, sedangkan pengawasan manusia menjaga akuntabilitas.
        </p>
        <blockquote id={highlightId} className="verified-quote">
          <span>BAGIAN 2.1 · CAKUPAN KOMPETENSI</span>
          <mark>
            <strong>
              Literasi AI mencakup pengetahuan, keterampilan, nilai, etika, dan
              pengawasan manusia—bukan hanya keterampilan teknis.
            </strong>
          </mark>
        </blockquote>
        <p>
          Dalam praktiknya, literasi ini terlihat ketika pelajar mampu memilih
          alat yang sesuai, memeriksa klaim dengan sumber, melindungi data, dan
          menjelaskan alasan di balik keputusan mereka.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function StudentFramework() {
  const targetId = "cek-keluaran-genai";
  return (
    <article className="web-document unesco-document">
      <header className="site-masthead unesco-masthead">
        <div>
          <b>DIKTI</b>
          <span>Direktorat Pembelajaran dan Kemahasiswaan</span>
        </div>
        <nav aria-label="Navigasi situs simulasi">
          Panduan　Pustaka　Tentang
        </nav>
      </header>
      <div className="source-linkbar">
        <span>Edisi pertama · Oktober 2024</span>
        <JumpLink targetId={targetId}>Lihat bagian yang dipakai</JumpLink>
      </div>
      <section className="document-sheet article-page">
        <p className="section-kicker">PANDUAN UNTUK PERGURUAN TINGGI</p>
        <h1>Penggunaan AI generatif dalam pembelajaran</h1>
        <p className="article-deck">
          Pedoman bagi dosen dan mahasiswa untuk memakai AI secara aman, etis,
          dan bertanggung jawab.
        </p>
        <p className="article-byline">
          Direktorat Pembelajaran dan Kemahasiswaan · 2024
        </p>
        <hr />
        <p>
          Literasi AI tidak hanya berarti dapat memakai alat. Mahasiswa perlu
          memahami cara kerja dan keterbatasannya, menilai informasi secara
          kritis, serta mengambil keputusan secara mandiri.
        </p>
        <p>
          Jawaban AI dapat terdengar masuk akal, tetapi tetap keliru, bias, atau
          bahkan memuat informasi yang dibuat-buat. Karena itu, isi dan
          sumbernya harus diperiksa sebelum dipakai.
        </p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section
        className="document-sheet article-page second-page"
        id={targetId}
      >
        <h2>Apa yang perlu dilakukan mahasiswa?</h2>
        <ol className="framework-list">
          <li>
            <strong>
              Nilai akurasi, keterpercayaan, dan kemungkinan bias.
            </strong>
          </li>
          <li>
            <strong>Periksa fakta dan sumber yang dicantumkan.</strong>
          </li>
          <li>
            <strong>Jangan memasukkan data pribadi tanpa izin.</strong>
          </li>
          <li>
            <strong>
              Jelaskan penggunaan AI bila aturan tugas memintanya.
            </strong>
          </li>
        </ol>
        <p>
          AI boleh membantu proses belajar, tetapi tanggung jawab atas keputusan
          dan karya yang dikumpulkan tetap berada pada manusia.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function DigCompBrief() {
  const targetId = "digcomp-ai-section";
  return (
    <article className="web-document report-document digcomp-document">
      <div className="pdf-toolbar">
        <b>DigComp_2.2_AI_examples.pdf</b>
        <span>−　100%　＋　│　1 / 2　│　⇩　⎙</span>
      </div>
      <div className="source-linkbar">
        <span>European Commission · Joint Research Centre</span>
        <JumpLink targetId={targetId}>Buka bagian AI</JumpLink>
      </div>
      <section className="document-sheet report-page">
        <p className="section-kicker">DIGCOMP 2.2</p>
        <h1>Contoh pengetahuan, keterampilan, dan sikap terkait AI</h1>
        <p className="article-deck">
          Contoh kemampuan digital yang digunakan warga ketika berhadapan dengan
          sistem berbasis data dan kecerdasan artifisial.
        </p>
        <h2>Informasi dan literasi data</h2>
        <p>
          Pengguna perlu mengetahui bahwa layanan digital dapat memakai data
          untuk membuat prediksi, rekomendasi, dan keputusan otomatis.
        </p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet report-page second-page" id={targetId}>
        <h2>Berinteraksi secara kritis</h2>
        <p>
          <strong>
            Pengguna perlu menilai keluaran AI secara kritis, memahami peran
            data, mengenali keterbatasan sistem, dan mempertimbangkan dampak
            etisnya.
          </strong>
        </p>
        <p>
          Contohnya termasuk membandingkan rekomendasi dengan sumber lain,
          mengenali kapan keputusan otomatis memerlukan peninjauan manusia, dan
          memahami bahwa hasil dapat berbeda untuk kelompok pengguna yang
          berbeda.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function DataEthicsModule() {
  return (
    <article className="web-document docs-document">
      <header className="docs-header">
        <span className="docs-icon">▤</span>
        <div>
          <b>Modul etika dan data dalam penggunaan AI</b>
          <small>Pusat Pembelajaran Digital NUSA · Maret 2026</small>
        </div>
      </header>
      <section className="document-sheet typed-page">
        <p className="doc-running-head">MODUL PENDAMPING · UNIT 2</p>
        <h1>Sebelum data masuk ke sistem AI</h1>
        <p>
          Pertanyaan pertama bukan “fitur apa yang tersedia?”, melainkan data
          apa yang dibutuhkan dan siapa yang dapat terdampak.
        </p>
        <h2>Empat kebiasaan dasar</h2>
        <ol>
          <li>Kenali data yang akan dimasukkan.</li>
          <li>Lindungi informasi pribadi dan rahasia.</li>
          <li>Uji keluaran dengan bukti lain.</li>
          <li>Jelaskan keputusan yang tetap dibuat manusia.</li>
        </ol>
        <p>
          <strong>
            Kecakapan memakai fitur perlu berjalan bersama privasi, evaluasi,
            dan tanggung jawab.
          </strong>
        </p>
        <footer>1</footer>
      </section>
    </article>
  );
}

function ParticipantSheet() {
  return (
    <article className="web-document sheet-document">
      <header className="sheets-header">
        <span className="sheet-icon">▦</span>
        <div>
          <b>Daftar peserta kegiatan kampus</b>
          <small>Tersimpan di NUSA Drive</small>
        </div>
        <span>Terakhir diedit 1 Agu 2026</span>
      </header>
      <div className="sheet-toolbar">
        File　Edit　Tampilan　Sisipkan　Format　Data　Alat
      </div>
      <section className="data-grid" aria-label="Tabel peserta">
        <span className="cell corner" />
        {["A", "B", "C", "D", "E"].map((value) => (
          <b className="cell axis" key={value}>
            {value}
          </b>
        ))}
        {[
          [
            "1",
            "Nama peserta",
            "Program studi",
            "Surel",
            "Nomor telepon",
            "Kehadiran",
          ],
          [
            "2",
            "Alya Prameswari",
            "Psikologi",
            "alya.p@nusa.ac.id",
            "0812-9401-2873",
            "Hadir",
          ],
          [
            "3",
            "Bima Adinata",
            "Informatika",
            "bima.a@nusa.ac.id",
            "0821-7340-5182",
            "Hadir",
          ],
          [
            "4",
            "Citra Mahendra",
            "Komunikasi",
            "citra.m@nusa.ac.id",
            "0813-2684-1095",
            "Izin",
          ],
          [
            "5",
            "Damar Prakoso",
            "Manajemen",
            "damar.p@nusa.ac.id",
            "0857-4812-3066",
            "Hadir",
          ],
          [
            "6",
            "Eka Lestari",
            "Hukum",
            "eka.l@nusa.ac.id",
            "0819-5502-7441",
            "Hadir",
          ],
          [
            "7",
            "Farhan Yusuf",
            "Sosiologi",
            "farhan.y@nusa.ac.id",
            "0812-6631-0908",
            "Belum konfirmasi",
          ],
        ].flatMap((row) =>
          row.map((value, index) =>
            index === 0 ? (
              <b className="cell axis" key={`${row[0]}-${index}`}>
                {value}
              </b>
            ) : (
              <span
                className={`cell ${row[0] === "1" ? "header-cell" : ""}`}
                key={`${row[0]}-${index}`}
              >
                {value}
              </span>
            ),
          ),
        )}
      </section>
      <div className="sheet-tabs">
        <b>Peserta utama</b>
        <span>＋ Tambah sheet</span>
      </div>
    </article>
  );
}

function AiDraft() {
  return (
    <article className="web-document docs-document">
      <header className="docs-header">
        <span className="docs-icon">▤</span>
        <div>
          <b>Draf AI versi 1</b>
          <small>File　Edit　Tampilan　Sisipkan　Format　Alat</small>
        </div>
        <button type="button" tabIndex={-1}>
          Bagikan
        </button>
      </header>
      <section className="document-sheet typed-page">
        <p className="doc-running-head">DRAF KELOMPOK 4 · BELUM DIPERIKSA</p>
        <h1>Rekomendasi Literasi AI</h1>
        <p>
          <b>Pertanyaan:</b> Apakah literasi AI membutuhkan lebih dari
          keterampilan teknis?
        </p>
        <h2>Draf jawaban</h2>
        <p className="draft-selection">
          <strong>
            Literasi AI terutama berarti mampu memakai alat secara efisien.
          </strong>
        </p>
        <p>
          Mahasiswa yang dapat membuat prompt dan menghasilkan keluaran dengan
          cepat dapat dianggap siap menggunakan AI untuk kegiatan akademik.
        </p>
        <footer>1</footer>
      </section>
    </article>
  );
}

function IndustryReport() {
  return (
    <article className="web-document report-document">
      <div className="pdf-toolbar">
        <b>Tren_AI_Indonesia_2026.pdf</b>
        <span>−　100%　＋　│　1 / 2　│　⇩　⎙</span>
      </div>
      <section className="document-sheet report-cover">
        <span>LAPORAN EKONOMI DIGITAL · JULI 2026</span>
        <h1>Tren AI Indonesia 2026</h1>
        <p>Investasi, adopsi perusahaan, talenta, dan infrastruktur</p>
        <div className="report-hero-number">
          <b>37%</b>
          <span>pertumbuhan belanja solusi AI dibanding 2025</span>
        </div>
        <div className="mini-bars" aria-label="Ilustrasi pertumbuhan pasar">
          <i style={{ height: "28%" }} />
          <i style={{ height: "42%" }} />
          <i style={{ height: "57%" }} />
          <i style={{ height: "73%" }} />
          <i style={{ height: "92%" }} />
        </div>
        <p className="report-publisher">PUSAT EKONOMI DIGITAL NUSA</p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet report-page second-page">
        <h2>Ringkasan temuan pasar</h2>
        <div className="metric-row">
          <span>
            <b>412</b>perusahaan rintisan AI
          </span>
          <span>
            <b>68%</b>perusahaan mencoba AI generatif
          </span>
          <span>
            <b>2,4×</b>kebutuhan pusat data
          </span>
        </div>
        <h3>Ruang lingkup data</h3>
        <p>
          Analisis ini memetakan investasi AI, jumlah perusahaan rintisan,
          adopsi alat generatif, kebutuhan pusat data, dan pertumbuhan pasar
          2022–2026. Data dikumpulkan dari survei perusahaan dan laporan
          industri.
        </p>
        <h3>Daftar bab</h3>
        <p>
          Bab 1 membahas investasi, Bab 2 adopsi perusahaan, Bab 3 talenta, dan
          Bab 4 infrastruktur. Responden survei adalah 214 perusahaan teknologi.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function GradeNews() {
  const methodId = "metode-survei-nilai";
  return (
    <article className="web-document news-document">
      <header className="site-masthead news-masthead">
        <div>
          <b>FORUM EDUTECH</b>
          <span>Kabar teknologi kampus</span>
        </div>
        <nav aria-label="Navigasi berita simulasi">
          Berita　Opini　Kampus　Riset
        </nav>
      </header>
      <div className="source-linkbar">
        <span>Berita · 4 Juni 2026</span>
        <JumpLink targetId={methodId}>Periksa data studinya</JumpLink>
      </div>
      <section className="document-sheet news-page">
        <p className="section-kicker">TEKNOLOGI KAMPUS</p>
        <h1>Data Lengkap: AI Meningkatkan Nilai Mahasiswa</h1>
        <p className="article-deck">
          Survei baru disebut membuktikan chatbot membuat pembelajaran lebih
          efektif.
        </p>
        <p className="article-byline">
          Oleh Redaksi Forum Edutech · 3 menit baca
        </p>
        <div
          className="news-photo"
          role="img"
          aria-label="Ilustrasi mahasiswa memakai laptop"
        >
          <span>FE</span>
          <p>Mahasiswa mencoba chatbot di ruang belajar bersama.</p>
        </div>
        <p>
          Sebanyak 83 mahasiswa menjawab survei setelah mencoba chatbot selama
          satu pekan. Mayoritas responden menyatakan alat terasa membantu dan
          mempercepat pencarian ide untuk tugas.
        </p>
        <p>
          Penyelenggara kemudian menyimpulkan bahwa AI berpotensi meningkatkan
          hasil belajar. Artikel kiriman ini tidak mencantumkan nama peneliti
          utama maupun jurnal penerbit.
        </p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet news-page second-page" id={methodId}>
        <h2>Bagaimana datanya dikumpulkan?</h2>
        <p>
          Kuesioner daring menanyakan rasa puas, kemudahan penggunaan, dan niat
          memakai chatbot lagi. Delapan puluh tiga jawaban yang masuk diringkas
          dalam persentase tanpa lampiran data mentah.
        </p>
        <h3>Butir kuesioner</h3>
        <ol>
          <li>Chatbot mudah digunakan.</li>
          <li>Chatbot membantu mencari ide lebih cepat.</li>
          <li>Saya ingin memakai chatbot lagi.</li>
        </ol>
        <p>
          Kuesioner tidak meminta nilai mata kuliah atau nilai tugas responden.
          Semua peserta mencoba chatbot; laporan tidak mencantumkan kelompok
          mahasiswa yang belajar tanpa chatbot.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function BrokenReference() {
  return (
    <article className="web-document broken-webpage" role="status">
      <div className="broken-page-icon" aria-hidden>
        📄
      </div>
      <h1>Halaman ini tidak dapat dijangkau</h1>
      <p>
        Alamat <b>oecd-education.org/id/ai-competency-students</b> tidak
        menemukan dokumen yang diminta.
      </p>
      <div className="browser-error-code">
        <strong>404</strong> · PAGE_NOT_FOUND
      </div>
      <p>
        Periksa alamat, cari salinan resmi lain, atau minta tautan baru kepada
        pengirim.
      </p>
      <button type="button" tabIndex={-1}>
        Muat ulang
      </button>
    </article>
  );
}

function CampusPolicy() {
  const policyId = "pasal-pemeriksaan-ai";
  return (
    <article className="web-document policy-document">
      <div className="pdf-toolbar">
        <b>Pedoman_Penggunaan_AI_NUSA_2026.pdf</b>
        <span>−　110%　＋　│　1 / 2　│　⇩　⎙</span>
      </div>
      <div className="source-linkbar">
        <span>Dokumen resmi internal</span>
        <JumpLink targetId={policyId}>Lihat bagian tanggung jawab</JumpLink>
      </div>
      <section className="document-sheet policy-page">
        <div className="university-mark">N</div>
        <p>UNIVERSITAS NUSA · KANTOR AKADEMIK</p>
        <h1>
          Pedoman Penggunaan Kecerdasan Artifisial dalam Kegiatan Akademik
        </h1>
        <p className="policy-number">
          Nomor: 04/KA-NUSA/II/2026 · Berlaku 12 Februari 2026
        </p>
        <h2>1. Tujuan</h2>
        <p>
          Pedoman ini mengatur penggunaan alat AI dalam tugas, penelitian, dan
          kegiatan belajar agar tetap transparan dan dapat
          dipertanggungjawabkan.
        </p>
        <h2>2. Ruang lingkup</h2>
        <p>
          Ketentuan berlaku bagi mahasiswa, dosen, dan tenaga kependidikan
          Universitas NUSA.
        </p>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet policy-page second-page" id={policyId}>
        <h2>3. Tanggung jawab pengguna</h2>
        <ol>
          <li>Menjelaskan bantuan AI yang digunakan dalam karya akademik.</li>
          <li>
            <strong>
              Memeriksa fakta, kutipan, dan sitasi sebelum karya dikumpulkan.
            </strong>
          </li>
          <li>
            Tidak memasukkan data rahasia atau data pribadi tanpa dasar yang
            sah.
          </li>
          <li>
            Bertanggung jawab atas isi akhir meskipun AI membantu penyusunan.
          </li>
        </ol>
        <div className="signature-block">
          <span>Disahkan secara elektronik</span>
          <b>Prof. Ratna Dewi</b>
          <small>Wakil Rektor Bidang Akademik</small>
        </div>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}

function ClassNotes() {
  return (
    <article className="web-document photo-document">
      <div className="photo-toolbar">
        <b>catatan-minggu-3.jpg</b>
        <span>27 Agu 2026 · 1,8 MB　ⓘ</span>
      </div>
      <section className="notebook-page">
        <p className="hand-date">Diskusi kelas — Minggu 3</p>
        <h1>Jadi, literasi AI itu apa?</h1>
        <ul>
          <li>
            <strong>teknis</strong> → bisa pakai alat
          </li>
          <li>
            <strong>etis</strong> → pikirkan dampaknya
          </li>
          <li>
            <strong>kritis</strong> → jangan langsung percaya jawaban
          </li>
          <li>
            <strong>sosial</strong> → siapa yang untung / dirugikan?
          </li>
        </ul>
        <p className="hand-circle">“lebih dari sekadar prompt!”</p>
        <p>Katanya ada di bacaan yang ditampilkan Bu Maya — cari lagi nanti.</p>
      </section>
    </article>
  );
}

function PromptGuide() {
  return (
    <article className="web-document news-document prompt-document">
      <header className="site-masthead prompt-masthead">
        <div>
          <b>KOMUNITAS BELAJAR</b>
          <span>Tips tugas dan teknologi kampus</span>
        </div>
        <nav aria-label="Navigasi situs simulasi">Artikel　Kelas　Tentang</nav>
      </header>
      <section className="document-sheet news-page">
        <p className="section-kicker">PANDUAN PRAKTIS</p>
        <h1>Lima pola prompt untuk tugas kuliah</h1>
        <p className="article-deck">
          Cara memberi konteks dan format agar chatbot menghasilkan jawaban yang
          lebih mudah digunakan.
        </p>
        <p className="article-byline">Oleh Dimas A. · 19 Agustus 2026</p>
        <ol className="prompt-steps">
          <li>
            <strong>Berikan peran:</strong> jelaskan siapa pembacanya.
          </li>
          <li>
            <strong>Berikan konteks:</strong> tulis tujuan tugas.
          </li>
          <li>
            <strong>Tentukan format:</strong> tabel, daftar, atau paragraf.
          </li>
          <li>
            <strong>Tambahkan contoh:</strong> tunjukkan gaya yang diinginkan.
          </li>
          <li>
            <strong>Minta revisi:</strong> perbaiki bagian yang belum sesuai.
          </li>
        </ol>
        <p>
          Simpan prompt yang berhasil agar dapat dipakai kembali untuk tugas
          berikutnya.
        </p>
        <footer>HALAMAN 1 / 1</footer>
      </section>
    </article>
  );
}

function VendorWhitepaper() {
  return (
    <article className="web-document vendor-document">
      <div className="pdf-toolbar vendor-toolbar">
        <b>BrightMind_Productivity_2026.pdf</b>
        <span>−　100%　＋　│　1 / 2　│　⇩</span>
      </div>
      <section className="document-sheet vendor-cover">
        <span>BRIGHTMIND AI · WHITEPAPER 2026</span>
        <h1>Lebih banyak selesai, lebih sedikit waktu</h1>
        <p>
          Studi pelanggan mengenai ringkasan otomatis, penulisan draf, dan
          pencarian berbantuan AI.
        </p>
        <div className="vendor-number">
          <b>6,4 jam</b>
          <span>
            rata-rata waktu yang menurut responden dapat dihemat tiap minggu
          </span>
        </div>
        <footer>HALAMAN 1 / 2</footer>
      </section>
      <section className="document-sheet report-page second-page">
        <h2>Metode survei pelanggan</h2>
        <p>
          Tautan survei dikirim kepada pelanggan aktif BrightMind. Sebanyak 126
          pengguna memilih menjawab pertanyaan tentang waktu kerja sebelum dan
          setelah memakai fitur otomatisasi.
        </p>
        <p>
          Responden memperkirakan sendiri waktu yang mereka hemat. Whitepaper
          ini diterbitkan oleh tim pemasaran BrightMind dan membahas produk
          BrightMind Workspace versi berbayar.
        </p>
        <footer>HALAMAN 2 / 2</footer>
      </section>
    </article>
  );
}
