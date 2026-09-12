"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { moduleOneStages } from "./module-one-data";
import {
  initialLearnProgress,
  readProgress,
  saveProgress,
  type LearnProgress,
} from "./progress";
import styles from "./learn.module.css";

type Choice = {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
};

const aiAroundYou = [
  {
    id: "alarm",
    title: "Alarm",
    description: "Berbunyi pukul 07.00 sesuai waktu yang sudah ditentukan.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: false, feedback: "Alarm tidak perlu memperkirakan sesuatu." },
      { id: "rule", label: "Cukup dengan aturan", correct: true, feedback: "Tepat. Jika waktu menunjukkan 07.00, sistem membunyikan alarm." },
    ],
  },
  {
    id: "music",
    title: "Music recommendation",
    description: "Menggunakan aktivitas mendengarkan untuk memperkirakan lagu yang mungkin kamu sukai.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: true, feedback: "Tepat. Sistem memakai pola aktivitas sebelumnya untuk membuat rekomendasi." },
      { id: "rule", label: "Cukup dengan aturan", correct: false, feedback: "Di sini sistem memperkirakan preferensi dari riwayat aktivitas." },
    ],
  },
  {
    id: "gate",
    title: "Campus QR gate",
    description: "Memeriksa QR. Jika valid, gerbang terbuka.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: false, feedback: "Otomatis belum tentu AI." },
      { id: "rule", label: "Cukup dengan aturan", correct: true, feedback: "Tepat. QR valid → buka; QR tidak valid → jangan buka." },
    ],
  },
  {
    id: "spam",
    title: "Spam filter",
    description: "Menggunakan model yang belajar dari banyak contoh untuk memperkirakan apakah email termasuk spam.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: true, feedback: "Tepat. Ini contoh AI untuk klasifikasi: spam atau bukan spam." },
      { id: "rule", label: "Cukup dengan aturan", correct: false, feedback: "Petunjuknya adalah model yang belajar dari banyak contoh." },
    ],
  },
];

const generationChoices = [
  { id: "spam", label: "Spam filter", description: "Memperkirakan apakah email termasuk spam.", correct: false },
  { id: "music", label: "Music recommendation", description: "Memilih lagu yang mungkin kamu sukai.", correct: false },
  { id: "writing", label: "Writing assistant", description: "Membuat draf email dari instruksi.", correct: true },
  { id: "image", label: "Image generator", description: "Membuat gambar dari deskripsi.", correct: true },
];

const tryGenerationChoices = [
  { id: "image", label: "Sistem membuat ilustrasi dari deskripsi.", correct: true },
  { id: "fraud", label: "Sistem memperkirakan apakah transaksi termasuk fraud.", correct: false },
  { id: "audio", label: "Sistem membuat suara narator dari teks.", correct: true },
  { id: "playlist", label: "Sistem merekomendasikan playlist.", correct: false },
  { id: "caption", label: "Sistem membuat draf caption.", correct: true },
];

const challengeScenarios = [
  {
    id: "gate",
    location: "Gate",
    symbol: "⌂",
    title: "Campus Gate",
    description: "QR mahasiswa diperiksa. Jika QR valid dan status mahasiswa aktif, gerbang terbuka.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: false, feedback: "Tidak ada petunjuk tentang model yang memperkirakan sesuatu." },
      { id: "rule", label: "Cukup dengan aturan", correct: true, feedback: "Tepat. QR valid dan status aktif → buka gerbang." },
      { id: "unknown", label: "Belum cukup informasi", correct: false, feedback: "Proses yang dijelaskan sudah cukup jelas untuk dijalankan dengan aturan tetap." },
    ],
  },
  {
    id: "library",
    location: "Library",
    symbol: "▦",
    title: "Security Camera",
    description: "Kamera menggunakan model untuk mendeteksi apakah seseorang memasuki area yang sedang ditutup.",
    choices: [
      { id: "ai", label: "Menggunakan AI", correct: true, feedback: "Tepat. Petunjuk pentingnya adalah model yang dipakai untuk mendeteksi objek." },
      { id: "rule", label: "Cukup dengan aturan", correct: false, feedback: "Sistem menggunakan model untuk mendeteksi, bukan hanya aturan tetap." },
      { id: "unknown", label: "Belum cukup informasi", correct: false, feedback: "Informasinya cukup: ada model untuk tugas deteksi." },
    ],
  },
  {
    id: "lab",
    location: "Lab",
    symbol: "⚗",
    title: "Poster Generator",
    description: "Nara menulis instruksi untuk poster donor darah. Sistem menghasilkan desain poster baru.",
    choices: [
      { id: "genai", label: "Generative AI", correct: true, feedback: "Tepat. Sistem menghasilkan konten visual baru dari instruksi." },
      { id: "ai", label: "AI, tetapi bukan GenAI", correct: false, feedback: "Sistem ini menghasilkan konten baru, jadi termasuk Generative AI." },
      { id: "not-ai", label: "Bukan AI", correct: false, feedback: "Sistem menghasilkan desain baru berdasarkan input." },
    ],
  },
  {
    id: "canteen",
    location: "Canteen",
    symbol: "☕",
    title: "Cafeteria Recommendation",
    description: "Aplikasi merekomendasikan menu berdasarkan riwayat pembelian.",
    choices: [
      { id: "history", label: "Riwayat pembelian", correct: true, feedback: "Tepat. Riwayat pembelian memberi pola yang relevan untuk rekomendasi." },
      { id: "table", label: "Warna meja kantin", correct: false, feedback: "Warna meja tidak menjelaskan preferensi menu pengguna." },
      { id: "room", label: "Nomor ruangan", correct: false, feedback: "Nomor ruangan tidak relevan untuk pola pilihan makanan." },
    ],
  },
  {
    id: "assistant",
    location: "Assistant",
    symbol: "✦",
    title: "Campus AI Assistant",
    description: "AI menjawab perpustakaan tutup pukul 23.00. Informasi resmi kampus menyebut Library Hours: 08.00–21.00.",
    choices: [
      { id: "ai", label: "Jawaban AI karena terdengar yakin", correct: false, feedback: "Output AI dapat terdengar meyakinkan tetapi tetap salah." },
      { id: "official", label: "Informasi resmi kampus", correct: true, feedback: "Tepat. Sumber resmi lebih tepat untuk informasi operasional kampus." },
      { id: "repeat", label: "Tanya AI berkali-kali sampai jawabannya sama", correct: false, feedback: "Mengulang jawaban AI tidak menggantikan sumber yang dapat diperiksa." },
    ],
  },
];

function ChoicePanel({
  title,
  description,
  choices,
  value,
  onChoose,
}: {
  title: string;
  description: string;
  choices: Choice[];
  value?: string;
  onChoose: (id: string) => void;
}) {
  const selected = choices.find((choice) => choice.id === value);
  const feedback = selected?.feedback.replace(/^Tepat\.\s*/, "");
  return (
    <article className={styles.choicePanel}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.choiceButtons}>
        {choices.map((choice) => (
          <button key={choice.id} type="button" aria-pressed={value === choice.id} data-selected={value === choice.id} onClick={() => onChoose(choice.id)}>
            {choice.label}
          </button>
        ))}
      </div>
      {selected ? <p className={styles.feedback} data-correct={selected.correct} aria-live="polite"><b>{selected.correct ? "✓ Tepat." : "Belum tepat."}</b> {feedback}</p> : null}
    </article>
  );
}

function MultiSelect({
  title,
  items,
  selected,
  onChange,
  submitted,
  onSubmit,
}: {
  title: string;
  items: { id: string; label: string; description?: string; correct: boolean }[];
  selected: string[];
  onChange: (id: string) => void;
  submitted: boolean;
  onSubmit: () => void;
}) {
  return (
    <section className={styles.interaction} aria-labelledby={title}>
      <p className={styles.eyebrow}>YOU DECIDE</p>
      <h2 id={title}>{title}</h2>
      <div className={styles.selectGrid}>
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          return <button key={item.id} type="button" className={styles.selectCard} aria-pressed={isSelected} data-selected={isSelected} onClick={() => onChange(item.id)}><b>{item.label}</b>{item.description ? <span>{item.description}</span> : null}{submitted ? <small data-correct={item.correct}>{item.correct ? "✓ Menghasilkan konten baru" : "Bukan generation"}</small> : null}</button>;
        })}
      </div>
      <button type="button" className={styles.primaryButton} onClick={onSubmit}>Periksa pilihan</button>
    </section>
  );
}

function LessonOne({ answers, setAnswer }: { answers: Record<string, string>; setAnswer: (id: string, value: string) => void }) {
  return (
    <>
      <section className={styles.section}>
        <p className={styles.eyebrow}>FIRST GUESS</p>
        <h2>Menurutmu, mana yang menggunakan AI?</h2>
        <div className={styles.choiceGrid}>{aiAroundYou.map((item) => <ChoicePanel key={item.id} {...item} value={answers[item.id]} onChoose={(value) => setAnswer(item.id, value)} />)}</div>
      </section>
      <section className={styles.section}>
        <p className={styles.eyebrow}>LEARN</p>
        <h2>Jadi, apa bedanya?</h2>
        <div className={styles.compareGrid}>
          <article><span>RULE-BASED SYSTEM</span><b>INPUT<br />07.00<br />↓<br />ATURAN<br />Jika waktu = 07.00<br />↓<br />Alarm berbunyi</b><p>Developer sudah menentukan apa yang terjadi saat kondisi tertentu terpenuhi.</p></article>
          <article><span>AI-BASED SYSTEM</span><b>INPUT<br />Riwayat lagu<br />↓<br />MODEL<br />↓<br />Rekomendasi lagu</b><p>Model dapat memakai pola untuk membuat prediksi, rekomendasi, klasifikasi, atau konten.</p></article>
        </div>
        <div className={styles.callout} role="note"><b>Penting:</b> AI dan automation tidak selalu terpisah. AI dapat mengenali wajah, lalu aturan otomatis membuka pintu.</div>
      </section>
      <section className={styles.section}>
        <ChoicePanel title="Auto Enhance Photo" description="Sebuah aplikasi memiliki tombol: “Perbaiki foto secara otomatis.” Apakah fitur ini menggunakan AI?" choices={[{ id: "yes", label: "Pasti pakai AI", correct: false, feedback: "Kata “otomatis” belum menjelaskan bagaimana sistem bekerja." }, { id: "no", label: "Pasti tidak pakai AI", correct: false, feedback: "Fitur ini bisa saja memakai model AI." }, { id: "unknown", label: "Belum cukup informasi", correct: true, feedback: "Tepat. Fitur itu bisa memakai filter tetap atau model AI." }]} value={answers.photo} onChoose={(value) => setAnswer("photo", value)} />
        <div className={styles.principle} role="note"><b>Jangan menilai AI dari nama produknya.</b><p>“Smart”, “automatic”, “intelligent”, dan “powered” bukan bukti. Tanyakan input, proses, output, dan apakah sistem memakai aturan atau model.</p></div>
        <ChoicePanel title="Quick check: Smart Lamp" description="Lampu menyala ketika sensor menunjukkan ruangan lebih gelap dari batas yang sudah ditentukan." choices={[{ id: "ai", label: "Menggunakan AI", correct: false, feedback: "Label “smart” tidak otomatis berarti AI." }, { id: "rule", label: "Cukup dengan aturan", correct: true, feedback: "Tepat. Jika cahaya lebih rendah dari batas, nyalakan lampu." }]} value={answers.lamp} onChoose={(value) => setAnswer("lamp", value)} />
      </section>
    </>
  );
}

function LessonTwo({ selected, setSelected, submitted, setSubmitted }: { selected: string[]; setSelected: (id: string) => void; submitted: boolean; setSubmitted: () => void }) {
  const [openExample, setOpenExample] = useState("fraud");
  const [activeMedium, setActiveMedium] = useState("Text");
  const [activeTask, setActiveTask] = useState("generation");
  const media = [
    ["Text", "Draft email, ringkasan, ide", "“Buat pengumuman acara kampus.”", "Draf pengumuman baru"],
    ["Image", "Poster dan ilustrasi", "“Poster donor darah bergaya editorial.”", "Komposisi visual baru"],
    ["Audio", "Voice dan musik", "“Narasi hangat untuk video orientasi.”", "Audio narasi baru"],
    ["Video", "Video yang dihasilkan", "“Animasi singkat tentang daur ulang.”", "Klip video baru"],
    ["Code", "Function dan script", "“Buat fungsi untuk mengurutkan jadwal.”", "Potongan kode baru"],
  ];
  const medium = media.find(([type]) => type === activeMedium) ?? media[0];
  const tasks = [
    { id: "classification", label: "Classification", input: "Email baru", output: "Spam / bukan spam", note: "Memilih kategori yang paling sesuai.", generative: false },
    { id: "recommendation", label: "Recommendation", input: "Riwayat tontonan", output: "Daftar video", note: "Memilih hal yang mungkin relevan untukmu.", generative: false },
    { id: "prediction", label: "Prediction", input: "Aktivitas pelanggan", output: "Kemungkinan berhenti", note: "Memperkirakan apa yang mungkin terjadi.", generative: false },
    { id: "generation", label: "Generation", input: "Instruksi untuk dosen", output: "Draf email baru", note: "Menyusun konten baru berdasarkan input.", generative: true },
  ];
  const task = tasks.find((item) => item.id === activeTask) ?? tasks[0];
  const examples = [
    ["fraud", "Fraud detection", "Transaksi → kemungkinan mencurigakan", "AI, bukan GenAI"],
    ["image", "Image generator", "Deskripsi → gambar baru", "Generative AI"],
    ["video", "Video recommendation", "Riwayat tontonan → daftar video", "AI, bukan GenAI"],
    ["code", "Coding assistant", "Instruksi → kode baru", "Generative AI"],
  ];
  return (
    <>
      <MultiSelect title="Mana yang menghasilkan sesuatu yang baru?" items={generationChoices} selected={selected} onChange={setSelected} submitted={submitted} onSubmit={setSubmitted} />
      <section className={styles.section}>
        <p className={styles.eyebrow}>EXPLORE</p>
        <h2>Generative AI menghasilkan konten berdasarkan input.</h2>
        <div className={styles.tabs}>{media.map(([type, output]) => <button key={type} type="button" aria-pressed={type === activeMedium} data-active={type === activeMedium} onClick={() => setActiveMedium(type)}><b>{type}</b><span>{output}</span></button>)}</div>
        <output key={activeMedium} className={styles.mediaPreview}><span>INPUT · {medium[0]}</span><b>{medium[2]}</b><i aria-hidden="true">→</i><strong>{medium[3]}</strong></output>
        {activeMedium === "Image" ? <figure className={styles.lessonFigure}><Image src="/material/generative-ai-example.jpg" width={1280} height={1280} sizes="(max-width: 620px) 100vw, 560px" alt="Ilustrasi kota hijau futuristis yang dihasilkan dengan model difusi." /><figcaption>Contoh visual hasil model generatif: keluaran baru disusun dari pola yang dipelajari, bukan salinan satu gambar sumber. <a href="https://commons.wikimedia.org/wiki/File:Solarpunk,_a_positive_possible_near-future.jpg" target="_blank" rel="noreferrer">Wikimedia Commons · CC0</a></figcaption></figure> : null}
        <div className={styles.taskExplorer}>
          <div className={styles.taskPicker} aria-label="Pilih tugas AI">
            {tasks.map((item, index) => <button key={item.id} type="button" aria-pressed={item.id === activeTask} data-active={item.id === activeTask} onClick={() => setActiveTask(item.id)}><i aria-hidden="true">0{index + 1}</i><b>{item.label}</b></button>)}
          </div>
          <output key={activeTask} className={styles.taskLens} data-generative={task.generative}>
            <span>{task.generative ? "MENCIPTAKAN" : "MEMPERKIRAKAN"}</span>
            <div><small>INPUT</small><b>{task.input}</b></div>
            <i aria-hidden="true">→</i>
            <div><small>OUTPUT</small><b>{task.output}</b></div>
            <p>{task.note} <strong>{task.generative ? "Ini Generative AI." : "Ini AI, tetapi bukan Generative AI."}</strong></p>
          </output>
        </div>
      </section>
      <section className={styles.section}>
        <p className={styles.eyebrow}>CONTEXT</p>
        <h2>AI, ML, DL, dan GenAI bukan empat nama untuk hal yang sama.</h2>
        <div className={styles.hierarchy}><div className={styles.aiUniverse} aria-label="Deep Learning berada di dalam Machine Learning, dan Machine Learning berada di dalam Artificial Intelligence. Generative AI modern umumnya memakai Deep Learning."><span>ARTIFICIAL INTELLIGENCE</span><div><span>MACHINE LEARNING</span><b>DEEP<br />LEARNING<i>GEN AI<small>MODERN</small></i></b></div></div><p><b>Letakkan Generative AI modern di dalam Deep Learning.</b> Transformer dan diffusion model yang umum dipakai saat ini adalah deep-learning model. Namun “generative” menjelaskan kemampuan menghasilkan konten; generative model yang lebih lama tidak selalu memakai deep learning.</p></div>
        <div className={styles.exampleRow}>{examples.map(([id, title, flow, type]) => <button key={id} type="button" data-active={openExample === id} onClick={() => setOpenExample(id)}><b>{title}</b><span>{openExample === id ? flow : "Buka contoh"}</span><em>{openExample === id ? type : ""}</em></button>)}</div>
      </section>
      <MultiSelect title="Pilih semua yang termasuk Generative AI" items={tryGenerationChoices} selected={selected.filter((id) => id.startsWith("try-")).map((id) => id.slice(4))} onChange={(id) => setSelected("try-" + id)} submitted={submitted} onSubmit={setSubmitted} />
    </>
  );
}

function LessonThree({ answers, setAnswer, setFlowCorrect }: { answers: Record<string, string>; setAnswer: (id: string, value: string) => void; setFlowCorrect: (value: boolean) => void }) {
  const [flow, setFlow] = useState<string[]>([]);
  const [slogan, setSlogan] = useState(0);
  const [activeFlow, setActiveFlow] = useState("data");
  const slogans = ["Kopi sederhana, pagi yang lebih baik.", "Mulai hari dari satu cangkir yang tepat.", "Tempat kecil untuk pagi yang lebih baik.", "Satu cangkir, satu awal baru."];
  const addToFlow = (item: string) => setFlow((current) => current.includes(item) ? current : [...current, item]);
  const correctFlow = flow.join("|") === "DATA / EXAMPLES|TRAINING|MODEL";
  useEffect(() => setFlowCorrect(correctFlow), [correctFlow, setFlowCorrect]);
  return (
    <>
      <section className={styles.section}>
        <p className={styles.eyebrow}>BEFORE YOU USE AI</p>
        <h2>Data dan contoh membantu membentuk model.</h2>
        <div className={styles.flowDiagram}><button type="button" aria-pressed={activeFlow === "data"} data-active={activeFlow === "data"} onClick={() => setActiveFlow("data")}>DATA / EXAMPLES{activeFlow === "data" ? <span>Contoh memberi pola yang dapat dipelajari sistem.</span> : null}</button><i>→</i><button type="button" aria-pressed={activeFlow === "training"} data-active={activeFlow === "training"} onClick={() => setActiveFlow("training")}>TRAINING{activeFlow === "training" ? <span>Proses menyesuaikan model berdasarkan contoh.</span> : null}</button><i>→</i><button type="button" aria-pressed={activeFlow === "model"} data-active={activeFlow === "model"} onClick={() => setActiveFlow("model")}>MODEL{activeFlow === "model" ? <span>Hasil training yang memproses input baru.</span> : null}</button></div>
        <div className={styles.callout} role="note">Ini adalah penyederhanaan. Sistem AI yang berbeda dapat dibuat dengan cara yang berbeda.</div>
        <figure className={styles.lessonFigure}>
          <Image src="/material/neural-network-example.png" width={1280} height={1098} sizes="(max-width: 620px) 100vw, 720px" alt="Diagram contoh model yang mengenali bentuk bintang laut dan bulu babi dari gambar." />
          <figcaption>Contoh model klasifikasi yang belajar mengenali pola. Bukan gambaran semua sistem AI. <a href="https://commons.wikimedia.org/wiki/File:Simplified_neural_network_example.png" target="_blank" rel="noreferrer">Wikimedia Commons · CC0</a></figcaption>
        </figure>
        <div className={styles.flowBuilder}><b>Susun prosesnya</b><p aria-live="polite">{flow.length ? flow.join(" → ") : "Pilih tiga kartu di bawah."}</p><div>{["MODEL", "TRAINING", "DATA / EXAMPLES"].map((item) => <button key={item} type="button" disabled={flow.includes(item)} onClick={() => addToFlow(item)}>{item}</button>)}</div>{flow.length ? <button type="button" className={styles.textButton} onClick={() => setFlow([])}>Ulangi</button> : null}{flow.length === 3 ? <small data-correct={correctFlow}>{correctFlow ? "✓ Tepat: data → training → model." : "Belum tepat. Coba susun ulang."}</small> : null}</div>
      </section>
      <section className={styles.section}>
        <p className={styles.eyebrow}>WHEN YOU USE AI</p>
        <h2>Input → model → output</h2>
        <div className={styles.flowDiagram} data-small><b>INPUT<br /><span>Prompt, gambar, suara, atau riwayat aktivitas</span></b><i>↓</i><b>MODEL<br /><span>Memproses input dengan pola yang dipelajari</span></b><i>↓</i><b>OUTPUT<br /><span>Prediksi, rekomendasi, kategori, teks, gambar, atau audio</span></b></div>
        <div className={styles.compareGrid}><article><span>MUSIC RECOMMENDATION</span><b>Riwayat dengar → Model → Lagu rekomendasi</b></article><article><span>GENERATIVE AI</span><b>“Buat nama kedai.” → Model → Nama baru</b></article><article><span>SPAM DETECTION</span><b>Email baru → Model → Spam / bukan spam</b></article></div>
      </section>
      <section className={styles.section}>
        <p className={styles.eyebrow}>IMPORTANT</p>
        <h2>AI bisa terdengar manusiawi tanpa memahami dunia seperti manusia.</h2>
        <figure className={styles.lessonFigure}>
          <Image src="/material/ai-context.jpg" width={1280} height={853} sizes="(max-width: 620px) 100vw, 720px" alt="Ilustrasi simbolik kepala manusia dengan pola sirkuit." />
          <figcaption>Visual ini simbolik: model AI bukan otak manusia dan tidak memahami dunia dengan cara yang sama. <a href="https://commons.wikimedia.org/wiki/File:Artificial-Intelligence.jpg" target="_blank" rel="noreferrer">Wikimedia Commons · CC0</a></figcaption>
        </figure>
        <div className={styles.compareGrid}><article><span>HINDARI</span><b>“AI tahu, merasa, atau benar-benar memahami…”</b></article><article><span>LEBIH TEPAT</span><b>“Model memperkirakan… AI menghasilkan… sistem menggunakan pola…”</b></article></div>
        <div className={styles.demo}><p>Prompt: <b>Buat satu slogan pendek untuk kedai kopi.</b></p><output key={slogan}>{slogans[slogan]}</output><button type="button" className={styles.primaryButton} onClick={() => setSlogan((current) => (current + 1) % slogans.length)}>Generate again</button><small>Prompt yang sama dapat memiliki beberapa kemungkinan output.</small></div>
        <ChoicePanel title="Terdengar yakin belum tentu benar" description="Campus Assistant berkata perpustakaan tutup pukul 23.00, tanpa sumber. Apakah jawabannya pasti benar?" choices={[{ id: "yes", label: "Ya", correct: false, feedback: "AI dapat menghasilkan informasi yang terdengar meyakinkan tetapi tetap salah." }, { id: "no", label: "Tidak", correct: true, feedback: "Tepat. Untuk informasi penting, kita perlu memeriksanya." }]} value={answers.confidence} onChoose={(value) => setAnswer("confidence", value)} />
      </section>
    </>
  );
}

function Challenge({ answers, setAnswer, completed, setCompleted, onComplete }: { answers: Record<string, string>; setAnswer: (id: string, value: string) => void; completed: string[]; setCompleted: (id: string) => void; onComplete: () => void }) {
  const [active, setActive] = useState(challengeScenarios[0].id);
  const scenario = challengeScenarios.find((item) => item.id === active) ?? challengeScenarios[0];
  return (
    <section className={styles.challenge}>
      <p className={styles.eyebrow}>SMART CAMPUS {completed.length} / {challengeScenarios.length}</p>
      <h2>Pilih lokasi yang ingin diperiksa</h2>
      <div className={styles.campusMap} aria-label="Peta pilihan Smart Campus">
        <span className={styles.mapTitle}>NUSA CAMPUS · INTERACTIVE MAP</span>
        <svg className={styles.campusRoutes} viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 64V34M50 34L19 15M50 34L81 14M50 34L18 48M50 34L81 46" />
        </svg>
        {challengeScenarios.map((item) => {
          const isActive = item.id === active;
          const isDone = completed.includes(item.id);
          return <button key={item.id} type="button" aria-pressed={isActive} data-active={isActive} data-done={isDone} onClick={() => setActive(item.id)}><i aria-hidden="true">{isDone ? "✓" : item.symbol}</i><b>{item.location}</b><small>{isDone ? "Selesai" : isActive ? "Sedang dibuka" : "Pilih lokasi"}</small></button>;
        })}
      </div>
      <ChoicePanel key={scenario.id} title={scenario.title} description={scenario.description} choices={scenario.choices} value={answers[scenario.id]} onChoose={(value) => { setAnswer(scenario.id, value); if (scenario.choices.find((choice) => choice.id === value)?.correct) { const completesModule = !completed.includes(scenario.id) && completed.length + 1 === challengeScenarios.length; setCompleted(scenario.id); if (completesModule) onComplete(); } }} />
    </section>
  );
}

function ModuleRecap({ onFinish }: { onFinish: () => void }) {
  return <div className={styles.moduleRecapBackdrop} role="dialog" aria-modal="true" aria-labelledby="module-recap-title"><section className={styles.moduleRecap}><p>MODULE 1 COMPLETE</p><h2 id="module-recap-title">Tiga ide untuk dibawa pulang</h2><ul><li>AI adalah payung besar; Machine Learning dan Deep Learning adalah bagian di dalamnya.</li><li>GenAI modern umumnya memakai Deep Learning untuk menghasilkan teks, gambar, audio, atau kode baru.</li><li>Output model adalah hasil pola, bukan jaminan benar—periksa sumber untuk hal penting.</li></ul><button autoFocus type="button" className={styles.primaryButton} onClick={onFinish}>Kembali ke Course Map</button></section></div>;
}

export function ModuleOneGame() {
  const router = useRouter();
  const lessonShellRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState<LearnProgress>(initialLearnProgress);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [challengeDone, setChallengeDone] = useState<string[]>([]);
  const [lessonStep, setLessonStep] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModuleRecap, setShowModuleRecap] = useState(false);
  const [flowCorrect, setFlowCorrect] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { setProgress(readProgress()); setReady(true); });
    return () => cancelAnimationFrame(frame);
  }, []);

  const stage = moduleOneStages[progress.activeStage] ?? moduleOneStages[0];
  const visualLabel = stage.id === "generative-ai" ? "GEN" : stage.id === "how-ai-works" ? "FLOW" : stage.kind === "challenge" ? "5×" : "AI";
  const stepCount = stage.id === "generative-ai" ? 4 : 3;
  const setAnswer = (id: string, value: string) => setAnswers((current) => ({ ...current, [id]: value }));
  const toggleSelected = (id: string) => { setSubmitted(false); setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); };
  const finishStage = () => {
    const index = progress.activeStage;
    const completedStages = progress.completedStages.includes(index) ? progress.completedStages : [...progress.completedStages, index];
    const nextIndex = Math.min(index + 1, moduleOneStages.length - 1);
    const next = { completedStages, unlockedStage: Math.max(progress.unlockedStage, nextIndex), activeStage: nextIndex };
    saveProgress(next);
    if (index === moduleOneStages.length - 1) { router.push("/learn/ai-fundamentals"); return; }
    setProgress(next); setStarted(false); setAnswers({}); setSelected([]); setSubmitted(false); setLessonStep(0); setFlowCorrect(false);
  };
  const completeModule = () => {
    const index = progress.activeStage;
    const completedStages = progress.completedStages.includes(index) ? progress.completedStages : [...progress.completedStages, index];
    const next = { completedStages, unlockedStage: moduleOneStages.length - 1, activeStage: index };
    saveProgress(next);
    setProgress(next);
    setShowModuleRecap(true);
  };
  const chooseStage = (index: number) => {
    if (index > progress.unlockedStage || (!allStagesCompleted && index !== progress.activeStage)) return;
    const next = { ...progress, activeStage: index };
    saveProgress(next); setProgress(next); setStarted(false); setAnswers({}); setSelected([]); setSubmitted(false); setChallengeDone([]); setLessonStep(0); setShowModuleRecap(false); setFlowCorrect(false);
  };
  const runTransition = (update: () => void) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      update();
      setIsTransitioning(false);
      window.requestAnimationFrame(() => lessonShellRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }));
    }, 280);
  };
  const moveStep = (direction: -1 | 1) => {
    runTransition(() => setLessonStep((step) => step + direction));
  };
  const allStagesCompleted = progress.completedStages.length === moduleOneStages.length;
  const hasCorrectAnswers = (expected: Record<string, string>) => Object.entries(expected).every(([id, value]) => answers[id] === value);
  const hasExactSelection = (expected: string[]) => selected.length === expected.length && expected.every((id) => selected.includes(id));
  const canAdvance = allStagesCompleted || (stage.id === "ai-around-you"
    ? lessonStep === 0
      ? hasCorrectAnswers({ alarm: "rule", music: "ai", gate: "rule", spam: "ai" })
      : lessonStep === 2
        ? hasCorrectAnswers({ photo: "unknown", lamp: "rule" })
        : true
    : stage.id === "generative-ai"
      ? lessonStep === 0
        ? hasExactSelection(["writing", "image"])
        : lessonStep === 3
          ? hasExactSelection(["writing", "image", "try-image", "try-audio", "try-caption"])
          : true
      : stage.id === "how-ai-works"
        ? lessonStep === 0
          ? flowCorrect
          : lessonStep === 2
            ? answers.confidence === "no"
            : true
        : true);

  if (!ready) return <main className={styles.gameLoading}>Menyiapkan modul…</main>;

  return (
    <main className={styles.learnGame} data-focus={focusMode} data-color={darkMode ? "dark" : "light"}>
      <header className={styles.gameTopbar}><Link href="/learn/ai-fundamentals">← Course map</Link><strong>NUSA CAMPUS</strong><div className={styles.topbarActions}><button type="button" className={styles.themeButton} onClick={() => setDarkMode((current) => !current)} aria-label={darkMode ? "Mode terang" : "Mode gelap"} aria-pressed={darkMode}><i aria-hidden="true">{darkMode ? "☀" : "◐"}</i><em>{darkMode ? "Mode terang" : "Mode gelap"}</em></button><button type="button" className={styles.fullscreenButton} aria-label="Layar penuh" onClick={() => setFocusMode(true)}><i aria-hidden="true">⛶</i><em>Layar penuh</em></button></div></header>
      {focusMode ? <button type="button" className={styles.focusExit} onClick={() => setFocusMode(false)}><i aria-hidden="true">↙</i> Keluar layar penuh</button> : null}
      <div className={styles.gameLayout}>
        <aside className={styles.stageRail} aria-label="Daftar bagian modul">
          <p>UNDERSTAND AI</p>
          {moduleOneStages.map((item, index) => <button key={item.id} type="button" disabled={(!allStagesCompleted && index !== progress.activeStage) || isTransitioning} aria-current={index === progress.activeStage ? "step" : undefined} onClick={() => runTransition(() => chooseStage(index))}><i>{progress.completedStages.includes(index) ? "✓" : index + 1}</i><span>{item.title}</span></button>)}
        </aside>
        <article ref={lessonShellRef} className={styles.lessonShell} data-stage={stage.id} aria-busy={isTransitioning}>
          <div className={styles.transitionSweep} data-active={isTransitioning} aria-hidden="true"><i /></div>
          <header key={stage.id} className={styles.lessonHeader}><p>{stage.area}</p><h1>{stage.title}</h1><span>{stage.kind === "challenge" ? "SMART CAMPUS " + challengeDone.length + " / 5" : "BAGIAN " + (lessonStep + 1) + " / " + stepCount}</span></header>
          {showModuleRecap ? <ModuleRecap onFinish={() => router.push("/learn/ai-fundamentals")} /> : !started ? <section className={styles.lessonIntro}><div><p className={styles.eyebrow}>{stage.question}</p><h2>{stage.intro}</h2><button type="button" className={styles.primaryButton} disabled={isTransitioning} onClick={() => runTransition(() => setStarted(true))}>Mulai <span aria-hidden="true">→</span></button></div><div className={styles.signalDecor} aria-hidden="true"><i /><i /><i /><b>{visualLabel}</b></div></section> : <>
            <div key={stage.id + lessonStep} className={styles.lessonContent} data-stage={stage.id} data-step={lessonStep} data-leaving={isTransitioning}>
              {stage.id === "ai-around-you" ? <LessonOne answers={answers} setAnswer={setAnswer} /> : null}
              {stage.id === "generative-ai" ? <LessonTwo selected={selected} setSelected={toggleSelected} submitted={submitted} setSubmitted={() => setSubmitted(true)} /> : null}
              {stage.id === "how-ai-works" ? <LessonThree answers={answers} setAnswer={setAnswer} setFlowCorrect={setFlowCorrect} /> : null}
              {stage.kind === "challenge" ? <Challenge answers={answers} setAnswer={setAnswer} completed={challengeDone} setCompleted={(id) => setChallengeDone((current) => current.includes(id) ? current : [...current, id])} onComplete={completeModule} /> : null}
            </div>
            {stage.kind === "lesson" ? <footer className={styles.lessonFooter}><button type="button" className={styles.previousButton} disabled={lessonStep === 0 || isTransitioning} onClick={() => moveStep(-1)}>← Kembali</button><div className={styles.stepDots} role="progressbar" aria-label="Progress bagian lesson" aria-valuemin={1} aria-valuemax={stepCount} aria-valuenow={lessonStep + 1}>{Array.from({ length: stepCount }, (_, index) => <i key={index} data-active={index === lessonStep} />)}</div>{!canAdvance ? <span className={styles.advanceHint}>Jawab pilihan dengan tepat untuk lanjut.</span> : null}<button type="button" className={styles.primaryButton} disabled={isTransitioning || !canAdvance} onClick={() => lessonStep === stepCount - 1 ? runTransition(finishStage) : moveStep(1)}>{lessonStep === stepCount - 1 ? "Selesai Lesson" : "Lanjut →"}</button></footer> : null}
          </>}
        </article>
      </div>
    </main>
  );
}
