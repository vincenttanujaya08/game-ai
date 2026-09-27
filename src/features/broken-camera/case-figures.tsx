import type { Ranked } from "./game-logic";
import { hitungBenturan, segmenLinimasa, stasiun, toBars } from "./visuals";
import { scenario } from "./scenario";
import styles from "./game.module.css";

/**
 * Semua gambar di sini adalah HTML dan SVG sebaris, tanpa dependency dan tanpa
 * satu byte biner. Pelajaran dari diagram di sisi /learn tetap berlaku: isi
 * gambar tidak pernah disembunyikan di balik animasi, hanya pergerakannya yang
 * dianimasikan, dan setiap gambar punya nama yang bisa dibacakan.
 */

/** Peringkat AI sebagai batang, bukan kalimat beruntun. */
const arahTeks: Record<string, string> = { naik: "naik", turun: "turun", tetap: "" };

export function RankingBars({ ranking, sebelumnya, judul }: { ranking: Ranked[]; sebelumnya?: Ranked[]; judul?: string }) {
  const bars = toBars(ranking, sebelumnya);
  const bergeser = bars.some((bar) => bar.arah !== "tetap");
  const adaData = bars.some((bar) => !bar.kosong);

  return (
    <figure className={styles.bars}>
      {judul ? <figcaption>{judul}</figcaption> : null}
      <ul>
        {bars.map((bar) => (
          <li key={bar.name} data-teratas={bar.teratas ? "true" : undefined} data-kosong={bar.kosong ? "true" : undefined}>
            <span className={styles.barName}>{bar.name}</span>
            <span className={styles.barTrack}>
              <i style={{ width: bar.width + "%" }} />
            </span>
            <span className={styles.barValue}>{bar.percent}%</span>
            {/* Panah dibaca mata, teksnya dibaca pembaca layar. */}
            <span className={styles.barArah} data-arah={bar.arah}>
              <span aria-hidden="true">{bar.arah === "naik" ? "\u25b2" : bar.arah === "turun" ? "\u25bc" : ""}</span>
              <span className={styles.srOnly}>
                {bar.arah === "tetap" ? "" : `${arahTeks[bar.arah]} ${bar.tingkat} tingkat`}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.barNote}>
        {!adaData
          ? "Belum ada keterangan yang masuk, jadi AI belum punya dasar untuk memberi bobot."
          : bergeser
            ? "Panah menandai jalur yang berpindah peringkat karena keterangan terakhir yang kamu dengar."
            : "Jalur bernilai 0% berarti AI belum menerima satu pun keterangan tentangnya."}
      </p>
    </figure>
  );
}

/** Perjalanan kamera sebagai empat stasiun, sekaligus penunjuk tahap penyelidikan. */
/** Kamera kecil yang berhenti di titik terjauh yang sudah diketahui pemain. */
function IkonKamera() {
  return (
    <svg className={styles.mapCamera} viewBox="0 0 24 17" aria-hidden="true">
      <path d="M2.4 4.2h3.9L7.9 2h8.2l1.6 2.2h3.9a1.9 1.9 0 0 1 1.9 1.9v7.6a1.9 1.9 0 0 1-1.9 1.9H2.4a1.9 1.9 0 0 1-1.9-1.9V6.1a1.9 1.9 0 0 1 1.9-1.9z" />
      <circle cx="12" cy="9.9" r="3.6" />
    </svg>
  );
}

export function MovementMap({ interviewed }: { interviewed: string[] }) {
  const daftar = stasiun(interviewed);
  const label = "Perjalanan kamera: " + daftar.map((item) => item.nama).join(", lalu ");

  return (
    <figure className={styles.map} aria-label={label}>
      <ol>
        {daftar.map((item, index) => (
          <li
            key={item.id}
            data-terbuka={item.terbuka ? "true" : undefined}
            data-terkini={item.terkini ? "true" : undefined}
            data-dilewati={item.dilewati ? "true" : undefined}
          >
            <span className={styles.mapDot} aria-hidden="true">{item.terkini ? <IkonKamera /> : null}</span>
            <span className={styles.mapName}>{item.nama}</span>
            <span className={styles.mapCount}>
              {item.terbuka ? `${item.beats.filter((beat) => beat.jenis === "benturan").length} kemungkinan benturan` : "Belum terbuka"}
            </span>
            {index < daftar.length - 1 ? <span className={styles.mapLine} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Linimasa kamera, dengan benturan dan celah pemeriksaan lensa yang terlihat. */
export function CameraTimeline({ interviewed }: { interviewed: string[] }) {
  const segmen = segmenLinimasa(interviewed);
  const benturan = hitungBenturan(segmen);

  return (
    <figure className={styles.timeline}>
      <figcaption>
        Perjalanan kamera, pukul 17.45 sampai ditemukan. {benturan.terbuka} dari {benturan.total} kemungkinan benturan sudah kamu buka, dan tidak satu pun diikuti pemeriksaan lensa.
      </figcaption>
      <ol>
        {/*
          Beat yang saksinya tidak pernah didengar tetap tertutup. Main teliti
          akhirnya membeli sesuatu, dan linimasa ini berhenti menjadi hadiah
          yang sama untuk semua orang.
        */}
        {segmen.map((beat, index) => (
          <li key={beat.waktu + index} data-jenis={beat.jenis} data-tertutup={!beat.terbuka}>
            <span className={styles.timeMark} aria-hidden="true" />
            <span className={styles.timeWhen}>{beat.waktu}</span>
            <span className={styles.timeWhat}>
              {beat.terbuka ? (
                <>
                  <strong>{beat.isi}</strong>
                  {beat.catatan ? <em>{beat.catatan}</em> : null}
                </>
              ) : (
                <strong>Bagian ini belum kamu buka. Keterangan {beat.pembuka.join(" dan ")} bisa membukanya.</strong>
              )}
            </span>
          </li>
        ))}
      </ol>
      <p className={styles.timelineGap}>{scenario.celahUtama}</p>
    </figure>
  );
}
