import { alasanTidakMampu, formatSisa, hargaTeks, mampu, sisa } from "./budget";
import { CaseNotebook } from "./case-notebook";
import type { Ranked } from "./game-logic";
import { GameNavigation, TextBlock } from "./navigation";
import { isUnlocked, personById, scenario, unlockedEvidence } from "./scenario";
import type { GameAction, GameState } from "./state";
import { CameraTimeline, MovementMap } from "./case-figures";
import { pemandu } from "./visuals";
import styles from "./game.module.css";

type Props = { state: GameState; ranking: Ranked[]; synthesis: string; dispatch: (action: GameAction) => void };

export function InvestigationScreen({ state, ranking, synthesis, dispatch }: Props) {
  const { selected, interviewed, followedUp, terpakai, closed, notice } = state;
  const person = personById[selected];
  const known = interviewed.includes(selected);
  const asked = followedUp.includes(selected);
  const bisaWawancara = mampu("wawancara", terpakai, interviewed.length);
  const bisaDalami = mampu("dalami", terpakai, interviewed.length);
  const evidence = unlockedEvidence(interviewed);
  const open = evidence.find((item) => item.id === state.showEvidence) ?? null;
  const panduan = pemandu(interviewed.length);

  return (
    <main className={styles.game}>
      <GameNavigation />
      <header className={styles.header}>
        <div><h1>{scenario.meta.judul}</h1><p>{scenario.meta.versi}</p></div>
        <div className={styles.stats}>
          <b className={sisa(terpakai) <= 120 ? styles.danger : sisa(terpakai) <= 240 ? styles.warning : ""}>{formatSisa(terpakai)}</b>
          <span>Sisa jatah waktu</span>
        </div>
        <div className={styles.stats}><b>{interviewed.length}/{scenario.tokoh.length}</b><span>Wawancara</span></div>
        <div className={styles.stats}><b>{evidence.length}/{scenario.bukti.length}</b><span>Bukti terbuka</span></div>
      </header>

      <div className={styles.pemandu} data-tingkat={panduan.tingkat}>
        <MovementMap interviewed={interviewed} />
        <p>{panduan.teks}</p>
      </div>

      <section className={styles.workspace}>
        <aside className={styles.people} aria-label="Daftar orang yang bisa diwawancarai">
          <div className={styles.sectionHead}>
            <h2>Orang yang bisa diwawancarai</h2>
            <p>Semakin banyak keterangan terkumpul, semakin banyak jalur penyelidikan terbuka.</p>
          </div>
          {scenario.fase.map((phase) => (
            <div key={phase.judul} className={styles.phase}>
              <h3>{phase.judul}</h3>
              {phase.ids.map((id) => {
                const item = personById[id];
                const unlocked = isUnlocked(item, interviewed);
                const seen = interviewed.includes(id);
                const more = followedUp.includes(id);
                return (
                  <button
                    key={id}
                    className={`${styles.person} ${selected === id && unlocked ? styles.selected : ""}`}
                    disabled={!unlocked}
                    onClick={() => dispatch({ type: "pilihOrang", id })}
                  >
                    <strong>{item.nama}</strong>
                    <span>{item.ringkas}</span>
                    <small>
                      {!unlocked
                        ? `Belum terbuka · dengarkan ${item.buka.join(" dan ")} lebih dulu`
                        : more ? "Sudah ditanya lebih lanjut" : seen ? "Keterangan sudah didengar" : "Bisa diwawancarai"}
                    </small>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        <section className={styles.statement} aria-live="polite">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Wawancara</p>
            <h2>{person.nama}</h2>
            <p>{person.peran}</p>
          </div>
          <article className={styles.paper}>
            <p className={styles.paperLabel}>Mengapa keterangannya penting</p>
            <p>{person.mengapa}</p>
            {known ? (
              <>
                <p className={styles.paperLabel}>Keterangan awal</p>
                <p className={styles.quote}>{person.awal}</p>
                {asked ? (
                  <>
                    <p className={styles.paperLabel}>Pertanyaan lanjutan</p>
                    <p><b>Tanya:</b> {person.tanya}</p>
                    <p className={styles.quote}>{person.lanjut}</p>
                  </>
                ) : null}
              </>
            ) : (
              <p className={styles.preview}>
                Orang-orang ini bukan tersangka. Mereka diwawancarai karena keterangan mereka membantu menyusun kronologi.
                Dengarkan satu per satu untuk melihat bagaimana teori sementara AI berubah.
              </p>
            )}
            {/*
              Linimasa hidup selama bermain, bukan cuma hadiah di layar hasil.
              Ia tumbuh tiap kali satu keterangan membuka segmennya, jadi
              kemajuan penyelidikan terlihat sebagai bentuk, bukan sebagai angka.
            */}
            <div className={styles.paperTimeline}>
              <CameraTimeline interviewed={interviewed} />
            </div>
          </article>
          <div className={styles.actions}>
            <button onClick={() => dispatch({ type: "dengarkan" })} disabled={closed || known || !bisaWawancara}>
              {known ? "Keterangan sudah didengar ✓" : `Dengarkan keterangan · ${hargaTeks("wawancara")}`}
            </button>
            <button className={styles.secondary} onClick={() => dispatch({ type: "tanyaLanjut" })} disabled={closed || !known || asked || !bisaDalami}>
              {asked ? "Pertanyaan lanjutan sudah dipakai ✓" : `Tanya lebih lanjut · ${hargaTeks("dalami")}`}
            </button>
          </div>
          {/* Tombol yang mati menyebutkan alasannya, tidak hanya tampil kelabu. */}
          {!closed && !known && !bisaWawancara ? <p className={styles.notice}>{alasanTidakMampu("wawancara", terpakai, interviewed.length)}</p> : null}
          {!closed && known && !asked && !bisaDalami ? <p className={styles.notice}>{alasanTidakMampu("dalami", terpakai, interviewed.length)}</p> : null}
          {closed ? <p className={styles.notice}>Penyelidikan sudah ditutup. Kamu masih bisa membaca ulang keterangan dan bukti.</p> : null}
          {notice ? <p className={styles.notice}>{notice}</p> : null}
        </section>

        <CaseNotebook
          tab={state.tab}
          ranking={ranking}
          sebelumnya={state.peringkatSebelumnya}
          synthesis={synthesis}
          interviewed={interviewed}
          followedUp={followedUp}
          history={state.history}
          catatan={state.catatan}
          aiTop={state.aiTrail[state.aiTrail.length - 1] ?? null}
          onTab={(tab) => dispatch({ type: "gantiTab", tab })}
          onCatat={(tebakan) => dispatch({ type: "catatDugaan", tebakan })}
          onUbahCatatan={() => dispatch({ type: "ubahCatatan" })}
        />
      </section>

      <footer className={styles.evidenceBar}>
        <div>
          <h2>Bukti yang terbuka</h2>
          {evidence.length ? (
            <div className={styles.evidenceList}>
              {evidence.map((item) => (
                <button
                  key={item.id}
                  className={styles.evidence}
                  aria-pressed={state.showEvidence === item.id}
                  onClick={() => dispatch(state.showEvidence === item.id ? { type: "tutupBukti" } : { type: "bukaBukti", id: item.id })}
                >
                  {item.judul}
                </button>
              ))}
            </div>
          ) : (
            <p>Mulai dari orang yang bisa diwawancarai. Bukti akan muncul saat ada alasan untuk memeriksanya.</p>
          )}
        </div>
        {closed
          ? <button className={styles.end} onClick={() => dispatch({ type: "kembaliKePenyelidikan" })}>Lihat rangkuman akhir</button>
          : <button className={styles.end} onClick={() => dispatch({ type: "konfirmasiAkhiri", buka: true })}>Akhiri penyelidikan</button>}
      </footer>

      {state.konfirmasi ? (
        <section className={styles.konfirmasi} aria-label="Konfirmasi mengakhiri penyelidikan">
          <div>
            <h2>Akhiri penyelidikan sekarang?</h2>
            <p>
              Wawancara: {interviewed.length} dari {scenario.tokoh.length}. Pertanyaan lanjutan: {followedUp.length}. Sisa jatah waktu: {formatSisa(terpakai)}.
            </p>
            <p>Keterangan yang belum kamu dengar tidak ikut masuk ke rangkuman akhir.</p>
          </div>
          <div className={styles.konfirmasiAksi}>
            <button onClick={() => dispatch({ type: "akhiriPenyelidikan" })}>Ya, akhiri</button>
            <button className={styles.secondary} onClick={() => dispatch({ type: "konfirmasiAkhiri", buka: false })}>Belum, lanjut dulu</button>
          </div>
        </section>
      ) : null}

      {/*
        Panel sebaris, bukan <dialog open>. Versi lama tidak memakai showModal()
        sehingga tidak punya focus trap dan tidak bisa ditutup dengan Esc.
        Sebaris juga berarti bukti bisa dibaca sambil memindai daftar saksi.
      */}
      {open ? (
        <section className={styles.evidenceDetail} aria-live="polite" aria-label={`Bukti: ${open.judul}`}>
          <div>
            <h2>{open.judul}</h2>
            <TextBlock text={open.isi} />
          </div>
          <button className={styles.evidenceClose} onClick={() => dispatch({ type: "tutupBukti" })}>Tutup bukti</button>
        </section>
      ) : null}
    </main>
  );
}
