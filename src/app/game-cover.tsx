import styles from "./landing.module.css";

export default function GameCover() {
  return (
    <div className={styles.gameCover} aria-hidden="true">
      <span className={styles.coverLabel}>Kasus 01 · Tugas kuliah</span>
      <div className={styles.coverDocument}>
        <i />
        <i />
        <i />
        <b>[1]</b>
        <i />
        <i />
      </div>
      <div className={styles.coverCheck}>
        <span>Periksa sumber</span>
        <strong>?</strong>
      </div>
      <p>Jawaban terlihat meyakinkan. Apakah sumbernya juga?</p>
    </div>
  );
}
