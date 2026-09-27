"use client";

import { useId, useState } from "react";
import { ActivityShell } from "./activity-shell";
import { grade } from "./grade";
import { isArrangeOrdering, type ArrangeActivity, type Verdict } from "./types";
import styles from "./activity.module.css";

type Props = { activity: ArrangeActivity; label: string; onAttempt: (verdict: Verdict) => void };

export function Arrange({ activity, label, onAttempt }: Props) {
  return isArrangeOrdering(activity)
    ? <Ordering activity={activity} label={label} onAttempt={onAttempt} />
    : <Matching activity={activity} label={label} onAttempt={onAttempt} />;
}

/**
 * Urutan awal sengaja ditulis teracak di data, bukan dikocok saat render, supaya
 * server dan klien menghasilkan markup yang sama.
 *
 * Barisnya tidak punya tombol maupun pegangan: barisnya sendiri yang menjadi
 * kontrolnya. Tiga jalur menuju hasil yang sama:
 *   tetikus  : seret barisnya,
 *   sentuh   : ketuk barisnya, lalu ketuk tujuannya (drag HTML5 tidak bekerja di layar sentuh),
 *   keyboard : Tab ke barisnya, lalu panah atas/bawah.
 */
function Ordering({ activity, label, onAttempt }: Props) {
  const [order, setOrder] = useState(() => activity.items.map((item) => item.id));
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const hintId = useId();

  const settled = verdict?.solved === true;
  const labelOf = (id: string) => activity.items.find((item) => item.id === id)?.label ?? id;

  /**
   * Dua baris bertukar tempat. Menyisipkan akan menggeser semua baris di bawahnya,
   * yang membuat hasilnya sulit diikuti saat diseret.
   */
  function swap(from: number, to: number) {
    if (settled || from === to) return;
    if (from < 0 || to < 0 || from >= order.length || to >= order.length) return;
    const next = [...order];
    next[from] = order[to];
    next[to] = order[from];
    setOrder(next);
    setVerdict(null);
    setAnnouncement(
      labelOf(order[from]) + " bertukar tempat dengan " + labelOf(order[to]) +
      ", sekarang di posisi " + (to + 1) + " dari " + next.length + ".",
    );
  }

  /** Ketuk satu baris untuk memilihnya, ketuk baris kedua untuk menukar tempat keduanya. */
  function tap(id: string, index: number) {
    if (settled) return;
    if (picked === null) {
      setPicked(id);
      setAnnouncement(labelOf(id) + " dipilih. Ketuk baris yang ingin ditukar dengannya.");
      return;
    }
    if (picked === id) {
      setPicked(null);
      setAnnouncement(labelOf(id) + " batal dipilih.");
      return;
    }
    swap(order.indexOf(picked), index);
    setPicked(null);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, id: string, index: number) {
    if (settled) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      swap(index, index - 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      swap(index, index + 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      tap(id, index);
    } else if (event.key === "Escape" && picked) {
      setPicked(null);
      setAnnouncement("Pilihan dibatalkan.");
    }
  }

  function check() {
    const next = grade(activity, order);
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setOrder(activity.items.map((item) => item.id));
    setVerdict(null);
    setPicked(null);
    setDragging(null);
    setDropTarget(null);
    setAnnouncement("");
  }

  function stateOf(id: string) {
    if (!verdict) return undefined;
    if (verdict.hits.includes(id)) return "hit";
    if (verdict.misses.includes(id)) return "miss";
    return undefined;
  }

  return (
    <ActivityShell
      label={label}
      title={activity.instruction}
      verdict={verdict}
      action={settled ? undefined : { label: "Periksa urutanku", onClick: check }}
      onRetry={settled ? undefined : reset}
    >
      <p className={styles.instruction} id={hintId}>
        Seret satu baris ke baris lain untuk menukar tempatnya. Di layar sentuh, ketuk dua baris yang ingin ditukar. Dengan keyboard, pakai panah atas dan bawah.
      </p>

      <ol className={styles.order}>
        {order.map((id, index) => (
          // Barisnya sendiri adalah tombolnya: semantik list tetap utuh, dan tidak
          // ada kontrol tambahan yang perlu ditampilkan di sebelahnya.
          <li key={id}>
            <button
              type="button"
              className={styles.orderRow}
              data-state={stateOf(id)}
              data-dragging={dragging === id ? "true" : undefined}
              data-drop-target={dropTarget === id ? "true" : undefined}
              data-picked={picked === id ? "true" : undefined}
              disabled={settled}
              aria-describedby={hintId}
              aria-label={labelOf(id) + ", posisi " + (index + 1) + " dari " + order.length}
              aria-pressed={picked === id}
              draggable={!settled}
              onClick={() => tap(id, index)}
              onKeyDown={(event) => onKeyDown(event, id, index)}
              onDragStart={(event) => {
                setDragging(id);
                setPicked(null);
                event.dataTransfer.effectAllowed = "move";
                // Firefox hanya memulai drag kalau ada data yang dibawa.
                event.dataTransfer.setData("text/plain", id);
              }}
              onDragEnter={() => {
                if (dragging && dragging !== id) setDropTarget(id);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragEnd={() => {
                setDragging(null);
                setDropTarget(null);
              }}
              onDrop={(event) => {
                event.preventDefault();
                // Satu pertukaran antara baris asal dan baris yang dijatuhi,
                // bukan bertukar di tiap baris yang dilewati, yang akan memutar urutannya.
                if (dragging) swap(order.indexOf(dragging), index);
                setDragging(null);
                setDropTarget(null);
              }}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{labelOf(id)}</span>
            </button>
          </li>
        ))}
      </ol>

      <p className="nusa-sr-only" aria-live="polite">{announcement}</p>
    </ActivityShell>
  );
}

function Matching({ activity, label, onAttempt }: Props) {
  const [placement, setPlacement] = useState<Record<string, string>>({});
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const settled = verdict?.solved === true;
  const buckets = activity.buckets ?? [];
  const complete = activity.items.every((item) => placement[item.id]);

  function place(itemId: string, bucketId: string) {
    if (settled) return;
    setPlacement((prev) => ({ ...prev, [itemId]: bucketId }));
    setVerdict(null);
  }

  function check() {
    const next = grade(activity, placement);
    setVerdict(next);
    onAttempt(next);
  }

  function reset() {
    setPlacement({});
    setVerdict(null);
  }

  function stateOf(id: string) {
    if (!verdict) return undefined;
    if (verdict.hits.includes(id)) return "hit";
    if (verdict.misses.includes(id)) return "miss";
    return undefined;
  }

  return (
    <ActivityShell
      label={label}
      title={activity.instruction}
      instruction="Pilih satu kategori untuk tiap baris."
      verdict={verdict}
      action={settled ? undefined : { label: "Periksa pasanganku", disabled: !complete, onClick: check }}
      onRetry={settled ? undefined : reset}
    >
      <div className={styles.match}>
        {activity.items.map((item) => (
          <div key={item.id} className={styles.matchRow} data-state={stateOf(item.id)}>
            <strong>{item.label}</strong>
            <div className={styles.buckets} role="group" aria-label={"Kategori untuk: " + item.label}>
              {buckets.map((bucket) => (
                <button
                  key={bucket.id}
                  type="button"
                  aria-pressed={placement[item.id] === bucket.id}
                  disabled={settled}
                  onClick={() => place(item.id, bucket.id)}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ActivityShell>
  );
}
