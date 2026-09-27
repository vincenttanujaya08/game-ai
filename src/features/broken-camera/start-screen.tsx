import { GameNavigation } from "./navigation";
import { scenario } from "./scenario";
import styles from "./game.module.css";

type StartProps = {
  onStart: () => void;
  /** Ringkasan run tersimpan, atau null kalau tidak ada yang bisa dilanjutkan. */
  lanjutan: { wawancara: number; sisa: string } | null;
  onLanjut: () => void;
};

export function StartScreen({ onStart, lanjutan, onLanjut }: StartProps) {
  const { pembuka } = scenario;
  return (
    <main className={styles.start}>
      <GameNavigation />
      <section>
        <p className={styles.kicker}>{scenario.meta.versi}</p>
        <h1>{pembuka.judul}</h1>

        <article className={styles.startStory}>
          <h2>Latar belakang</h2>
          {pembuka.latarBelakang.map((moment) => (
            <div className={styles.startStoryBeat} key={moment.waktu}>
              <span>{moment.waktu}</span>
              <p>{moment.isi}</p>
            </div>
          ))}
        </article>

        <article className={styles.startMission}>
          <div>
            <p className={styles.kicker}>Tujuan penyelidikan</p>
            <p className={styles.startObjective}>{pembuka.tujuan}</p>
          </div>
          <div className={styles.startQuestions}>
            <h2>Pertanyaan yang perlu dijawab</h2>
            <ol>{pembuka.pertanyaanKunci.map((question) => <li key={question}>{question}</li>)}</ol>
          </div>
        </article>

        {/*
          Layar ini dulu menjelaskan ceritanya dengan baik tetapi tidak pernah
          menunjukkan apa yang akan pemain lakukan. Tiga langkah ini menutup itu.
        */}
        <article className={styles.startHow}>
          <h2>Cara mainnya</h2>
          <ol className={styles.howTo}>
            <li>
              <span className={styles.howToStep}>Langkah 1</span>
              <b>Dengarkan keterangan</b>
              <span>Pilih orang dari daftar di kiri. Tiap keterangan yang masuk bisa membuka saksi dan bukti baru.</span>
            </li>
            <li>
              <span className={styles.howToStep}>Langkah 2</span>
              <b>Lihat teori AI bergeser</b>
              <span>Catatan kasus menunjukkan peringkat dugaan AI sebagai batang. Perhatikan batangnya berpindah setiap kali kamu menambah keterangan.</span>
            </li>
            <li>
              <span className={styles.howToStep}>Langkah 3</span>
              <b>Putuskan sendiri</b>
              <span>Di akhir kamu memilih memakai rangkuman AI atau menggantinya. Pastikan pilihanmu bisa kamu jelaskan dengan bukti yang kamu kumpulkan.</span>
            </li>
          </ol>
        </article>

        {/* Pembungkus tata letak, bukan landmark: isinya dua blok berjudul sendiri. */}
        <div className={styles.startGuide}>
          <div>
            <h2>Catatan AI</h2>
            <p>{pembuka.catatanAi}</p>
          </div>
          <div>
            <h2>Aturan penyelidikan</h2>
            <ul>{pembuka.aturan.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          </div>
        </div>

        <div className={styles.startAction}>
          <p>Periksa keterangan dan bukti. Bedakan hal yang benar-benar diketahui dari dugaan.</p>
          <button onClick={onStart}>{lanjutan ? scenario.lanjutkan.mulaiBaru : pembuka.aksi}</button>
          {lanjutan ? (
            <>
              <button className={styles.secondary} onClick={onLanjut}>
                {scenario.lanjutkan.ajakan
                  .replace("{wawancara}", String(lanjutan.wawancara))
                  .replace("{sisa}", lanjutan.sisa)}
              </button>
              <p className={styles.muted}>{scenario.lanjutkan.catatan}</p>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
