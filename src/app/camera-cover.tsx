import styles from "./landing.module.css";

export default function CameraCover() {
  return (
    <div className={styles.cameraCover} aria-hidden="true">
      <span className={styles.coverLabel}>Kasus 02 · Jejak perpindahan kamera</span>
      <div className={styles.coverTimeline}>
        <span>17.45</span>
        <i />
        <span>17.56</span>
        <i />
        <span>18.10</span>
      </div>
      <div className={styles.coverCamera}>
        <i />
        <b />
        <em />
      </div>
      <div className={styles.coverCrate}>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.coverPhoto}>17.56<br /><strong>KAMERA<br />DI MEJA</strong></div>
      <p>Susun jejaknya. Jangan mengisi celah dengan tebakan.</p>
    </div>
  );
}
