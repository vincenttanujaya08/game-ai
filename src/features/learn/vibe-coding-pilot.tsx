"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import copy from "./vibe-coding-pilot-content.json";
import { vibeCodingGuidance } from "./vibe-coding-pilot-guidance";
import {
  revisedChoices,
  revisedFields,
  revisedFiles,
  revisedToolRows,
} from "./vibe-coding-pilot-exercises";
import ui from "./vibe-coding-pilot.module.css";

const KEY = "nusa-vibe-coding-pilot-v3";
const stages = [
  "Kenali cara kerjanya",
  "Beri arah dan bangun",
  "Uji dan bagikan",
  "Coba idemu sendiri",
];
const phaseCounts = vibeCodingGuidance.map((section) => section.length);
type Answer = string | string[];
type Progress = {
  step: number;
  phase: number;
  answers: Record<string, Answer>;
  checked: string[];
  helped: string[];
  finished: boolean;
};
const initial: Progress = {
  step: -1,
  phase: 0,
  answers: {},
  checked: [],
  helped: [],
  finished: false,
};

function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      if (part.startsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
      if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      if (link)
        return (
          <a
            key={i}
            href={link[2].replace(/^\.\.\/public/, "")}
            target={link[2].startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {link[1]}
          </a>
        );
      return part;
    });
}
function Prose({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, i) => {
          if (/^#{1,6} /.test(block))
            return <h3 key={i}>{inline(block.replace(/^#{1,6} /, ""))}</h3>;
          if (block.startsWith("|")) {
            const rows = table(block);
            return (
              <div className={ui.tableWrap} key={i}>
                <table>
                  <tbody>
                    {rows.map((row, n) => (
                      <tr key={n}>
                        {row.map((cell, c) => (
                          <td key={c}>{inline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          if (block.startsWith(">"))
            return (
              <blockquote key={i}>
                {inline(block.replace(/^>\s?/gm, ""))}
              </blockquote>
            );
          if (/^(- |\d+\. )/.test(block))
            return (
              <ul key={i}>
                {block.split(/\n(?=- |\d+\. )/).map((line, n) => (
                  <li key={n}>{inline(line.replace(/^(- |\d+\. )/, ""))}</li>
                ))}
              </ul>
            );
          return <p key={i}>{inline(block)}</p>;
        })}
    </>
  );
}
function table(text: string) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("|") && !/^\|[\s:|-]+\|$/.test(line))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim()),
    );
}
function bullets(text: string) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
}
function splitChoice(text: string) {
  const match = /^\*\*([\s\S]*?)\*\*\s*(?:→\s*)?([\s\S]*)$/.exec(text);
  if (match) return [match[1], match[2]];
  return text.split(/ → /);
}
function Panel({
  title,
  children,
  tone = "paper",
}: {
  title: string;
  children: ReactNode;
  tone?: string;
}) {
  return (
    <section className={ui.panel} data-tone={tone}>
      <p className={ui.panelTitle}>{title}</p>
      {children}
    </section>
  );
}

function Timer({
  broken = false,
  label = "Simulasi",
  interactive = true,
  value,
  onChange,
}: {
  broken?: boolean;
  label?: string;
  interactive?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [manual, setManual] = useState(true);
  const callback = useRef(onChange);
  const saved = useRef(value);
  useEffect(() => {
    callback.current = onChange;
    saved.current = value;
  }, [onChange, value]);
  useEffect(() => {
    if (!running || manual) return;
    const id = window.setInterval(
      () => setSeconds((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => window.clearInterval(id);
  }, [running, manual]);
  // Persist observations, not a running clock: resuming never claims unseen tests passed.
  function mark(event: string) {
    callback.current([...new Set([...saved.current, event])]);
  }
  const display = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className={ui.timer}>
      <span className={ui.badge}>{label}</span>
      <div className={ui.dial} data-running={running}>
        <span>{display}</span>
      </div>
      <div className={ui.timerButtons}>
        <button
          disabled={!interactive || running || seconds === 0}
          onClick={() => {
            setRunning(true);
            mark("start");
          }}
        >
          Mulai
        </button>
        <button
          disabled={!interactive || !running}
          onClick={() => {
            setRunning(false);
            if (seconds < 1500) mark("pause");
            if (broken) setSeconds(1500);
          }}
        >
          Jeda
        </button>
        <button
          disabled={!interactive}
          onClick={() => {
            setRunning(false);
            setSeconds(1500);
            if (value.includes("pause")) mark("reset");
          }}
        >
          Reset
        </button>
      </div>
      {interactive && (
        <div className={ui.timerControls}>
          <label>
            <input
              type="checkbox"
              checked={manual}
              onChange={(e) => setManual(e.target.checked)}
            />{" "}
            Demonstrasi langkah demi langkah
          </label>
          {manual && (
            <button
              disabled={!running || seconds === 0}
              onClick={() => setSeconds((s) => Math.max(0, s - 5))}
            >
              Jalankan satu langkah
            </button>
          )}
        </div>
      )}
      <div className={ui.observations}>
        {value.map((event) => (
          <span key={event}>
            ✓{" "}
            {event === "start" ? "Mulai" : event === "pause" ? "Jeda" : "Reset"}
          </span>
        ))}
      </div>
    </div>
  );
}

export function VibeCodingPilot({ storageKey = KEY, backHref = "/dev/yes-man-pilot", completion }: { storageKey?: string; backHref?: string; completion?: ReactNode } = {}) {
  const [s, setS] = useState<Progress>(initial);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          if (
            Number.isInteger(data.step) &&
            data.step >= -1 &&
            data.step < 12 &&
            Number.isInteger(data.phase) &&
            data.phase >= 0 &&
            data.phase < (data.step === -1 ? 3 : phaseCounts[data.step]) &&
            data.answers &&
            typeof data.answers === "object" &&
            Object.values(data.answers).every(
              (v) =>
                typeof v === "string" ||
                (Array.isArray(v) && v.every((x) => typeof x === "string")),
            ) &&
            Array.isArray(data.checked) &&
            Array.isArray(data.helped) &&
            typeof data.finished === "boolean"
          )
            setS(data);
        }
      } catch {
        setStorageError(true);
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [storageKey]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      /* Show the save failure without blocking the lesson. */ requestAnimationFrame(
        () => setStorageError(true),
      );
    }
  }, [s, ready, storageKey]);
  useEffect(() => {
    if (ready) heading.current?.focus({ preventScroll: true });
  }, [s.step, s.phase, s.finished, ready]);
  const section = copy.sections[Math.max(0, s.step)];
  const f: Record<string, string> = {
    ...Object.fromEntries(
      Object.entries(section.fields).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      ),
    ),
    ...revisedFields[s.step],
  };
  const prefix = `${s.step}:${s.phase}`;
  const direction = vibeCodingGuidance[s.step]?.[s.phase];
  const guidance = direction ? (
    <section
      className={ui.instructions}
      aria-labelledby={`task-${s.step}-${s.phase}`}
      data-vibe-task
    >
      <h2 id={`task-${s.step}-${s.phase}`}>{direction.question}</h2>
      <p>{direction.hint}</p>
    </section>
  ) : null;

  const get = (key = "choice") => s.answers[`${prefix}:${key}`] ?? "";
  const list = (key = "items") => {
    const value = get(key);
    return Array.isArray(value) ? value : [];
  };
  const checked = s.checked.includes(prefix);
  const helped = s.helped.includes(prefix);
  const change = (key: string, value: Answer) =>
    setS((prev) => ({
      ...prev,
      answers: { ...prev.answers, [`${prefix}:${key}`]: value },
      checked: prev.checked.filter((x) => x !== prefix),
      helped: prev.helped.filter((x) => x !== prefix),
    }));
  const check = () =>
    setS((prev) => ({
      ...prev,
      checked: [...new Set([...prev.checked, prefix])],
    }));
  const toggle = (key: string, value: string) =>
    change(
      key,
      list(key).includes(value)
        ? list(key).filter((x) => x !== value)
        : [...list(key), value],
    );
  const prose = (label: string) =>
    f[label] ? <Prose text={f[label]} /> : null;
  const feedback = (text: string) => (
    <div className={ui.feedback} role="status">
      <Prose text={text} />
    </div>
  );
  const renderChoice = (
    originalOptions: string[],
    originalCorrect: number,
  ): ReactNode => {
    const exercise = revisedChoices[prefix];
    const options = exercise
      ? exercise.options.map(
          (option) => `**${option.label}** ${option.feedback}`,
        )
      : originalOptions;
    const correct = exercise?.correct ?? originalCorrect;
    return (
      <>
        <div
          className={ui.choices}
          role="group"
          aria-labelledby={`task-${s.step}-${s.phase}`}
        >
          {options.map((option, i) => {
            const [label, detail] = splitChoice(option);
            return (
              <Fragment key={i}>
                <button
                  className={ui.choice}
                  aria-pressed={get() === String(i)}
                  onClick={() => {
                    change("choice", String(i));
                    setS((prev) => ({
                      ...prev,
                      checked: [...new Set([...prev.checked, prefix])],
                    }));
                  }}
                >
                  {inline(label)}
                </button>
                {get() === String(i) && detail && feedback(detail)}
              </Fragment>
            );
          })}
        </div>
        {helped &&
          get() !== String(correct) &&
          feedback(splitChoice(options[correct])[1] || options[correct])}
      </>
    );
  };
  const matchRows = (rows: string[][], options: string[]) => (
    <div className={ui.matchRows}>
      {rows.map((row, i) => (
        <div className={ui.matchRow} key={i}>
          <p>{inline(row[0])}</p>
          <div
            className={ui.segment}
            role="group"
            aria-label={row[0].replace(/[`*]/g, "")}
          >
            {options.map((option) => (
              <button
                key={option}
                aria-pressed={get(`row${i}`) === option}
                onClick={() => change(`row${i}`, option)}
              >
                {option}
              </button>
            ))}
          </div>
          {checked && (
            <p className={ui.rowFeedback}>
              {get(`row${i}`) === row[1] ? "✓ " : `${row[1]} · `}
              {inline(row[2])}
            </p>
          )}
        </div>
      ))}
      <button
        className={ui.primary}
        disabled={rows.some((_, i) => !get(`row${i}`))}
        onClick={check}
      >
        Periksa pilihan
      </button>
    </div>
  );
  const matchPass = (rows: string[][]) =>
    checked && rows.every((row, i) => get(`row${i}`) === row[1]);
  const choicePass = (index: number) =>
    checked && get() === String(revisedChoices[prefix]?.correct ?? index);
  let passed = false;
  let body: ReactNode;

  switch (s.step) {
    case 0: {
      const rows = table(
        f[
          "Interaksi — mana yang benar-benar memanfaatkan kemampuan coding agent?"
        ],
      ).slice(1);
      passed = choicePass(1);

      body = (
        <>
          <Panel title="Module not found" tone="code">
            <div className={ui.fileTree}>
              <span>project / src</span>
              <code>App.jsx</code>
              <code>StudyTimer.jsx</code>
              <code className={ui.missing}>Timer.jsx ?</code>
            </div>
            <p className={ui.fileExplanation}>
              Ini contoh isi folder project. App.jsx dan StudyTimer.jsx adalah
              file yang tersedia. Timer.jsx dengan tanda ? menunjukkan file yang
              dicari project, tetapi belum ditemukan.
            </p>
          </Panel>

          {guidance}
          {renderChoice(
            rows.map((row) => `**${row[0]}** ${row[1]}`),
            1,
          )}
          {(passed || helped) && (
            <Panel title="Simulasi" tone="agent">
              {prose("Jika memilih B, tampilkan simulasi")}
            </Panel>
          )}
        </>
      );
      break;
    }
    case 1: {
      const rows = revisedToolRows;
      if (!s.phase) {
        passed = matchPass(rows);
        body = (
          <>
            {prose("Situasi")}
            {matchRows(
              rows,
              rows.map((row) => row[1]),
            )}
          </>
        );
      } else {
        passed = choicePass(0);
        body = (
          <>
            <Prose
              text={f[
                "Interaksi — pasangkan kebutuhan dengan bantuan yang paling masuk akal"
              ]
                .split("\n\n")
                .slice(1)
                .join("\n\n")}
            />
            {guidance}
            {renderChoice(bullets(f["Interaksi lanjutan"]), 0)}
          </>
        );
      }
      break;
    }
    case 2: {
      const rows = table(
        f["Interaksi — tentukan Allow, Ask, atau Deny untuk latihan ini"],
      ).slice(1);
      if (!s.phase) {
        passed = matchPass(rows);
        body = (
          <>
            {prose("Situasi")}
            {matchRows(rows, ["Allow", "Ask", "Deny"])}
          </>
        );
      } else if (s.phase === 1) {
        passed = choicePass(0);
        body = (
          <>
            <Panel title="Simulasi" tone="agent">
              <Prose
                text={
                  f["Setelah cocok, tampilkan permintaan simulasi"].split(
                    "\n\nPilihan peserta:",
                  )[0]
                }
              />
            </Panel>
            {renderChoice(
              [
                "**Lihat perubahan dan perintah dulu**",
                "**Izinkan semua tindakan berikutnya** izin yang lebih luas berarti lebih sedikit kesempatan untuk memeriksa tindakan berikutnya.",
              ],
              0,
            )}
          </>
        );
      } else {
        passed = checked;
        body = (
          <>
            <Panel title="Lihat perubahan dan perintah dulu" tone="code">
              <pre>
                {
                  "App.jsx\n− import Timer from './Timer.jsx'\n+ import Timer from './StudyTimer.jsx'"
                }
              </pre>
              <p>
                Perintah pemeriksaan: <code>npm run build</code>
              </p>
              <p className={ui.utility}>
                Simulasi · perintah ini tidak dijalankan.
              </p>
            </Panel>
            <button className={ui.primary} onClick={check}>
              Izinkan tindakan ini
            </button>
          </>
        );
      }
      break;
    }
    case 3: {
      const briefs = [
        ...f["Interaksi — lengkapi tiga hal yang paling penting"].matchAll(
          /^\d+\. \*\*([^*]+)\*\*\s*\n\s*“([^”]+)”/gm,
        ),
      ];
      passed = checked;
      body = (
        <>
          <div className={ui.builder}>
            <div className={ui.choices}>
              {briefs.map((brief, i) => (
                <button
                  key={i}
                  className={ui.choice}
                  aria-pressed={list().includes(String(i))}
                  onClick={() => toggle("items", String(i))}
                >
                  <small>{brief[1]}</small>
                  {brief[2]}
                </button>
              ))}
            </div>
            <Panel title="Pratinjau prompt" tone="code">
              <p>
                {briefs
                  .filter((_, i) => list().includes(String(i)))
                  .map((brief) => brief[2])
                  .join(" ") || "Buat aplikasi belajar yang keren."}
              </p>
            </Panel>
          </div>
          <button className={ui.primary} onClick={check}>
            Lihat rencananya
          </button>
          {checked && (
            <Panel title="Logika hasil" tone="agent">
              {list().length === 3 ? (
                <Prose text={bullets(f["Logika hasil"])[3].split(" → ")[1]} />
              ) : (
                <ul>
                  {bullets(f["Logika hasil"])
                    .slice(0, 3)
                    .filter((_, i) => !list().includes(String(i)))
                    .map((line) => (
                      <li key={line}>{inline(line.split(" → ")[1])}</li>
                    ))}
                </ul>
              )}
            </Panel>
          )}
        </>
      );
      break;
    }
    case 4: {
      const rows = table(
        f["Interaksi — bagi kartu ke “Perlu sekarang” atau “Belum perlu”"],
      ).slice(1);
      passed = matchPass(rows);
      body = (
        <>
          {prose("Situasi")}
          {matchRows(rows, ["Perlu sekarang", "Belum perlu"])}
        </>
      );
      break;
    }
    case 5: {
      if (!s.phase) {
        passed = choicePass(0);
        body = (
          <>
            <div className={ui.twoColumns}>
              <Panel title="Rencana A">
                <Prose text={f["Rencana A"]} />
              </Panel>
              <Panel title="Rencana B">
                <Prose text={f["Rencana B"]} />
              </Panel>
            </div>
            {renderChoice(bullets(f["Pertanyaan"]), 0)}
          </>
        );
      } else {
        const order =
          f["Interaksi berikutnya — susun urutan yang mudah diperiksa"].split(
            " → ",
          );
        const current = list().length
          ? list()
          : [order[2], order[0], order[3], order[1]];
        passed = checked && current.every((item, i) => item === order[i]);
        body = (
          <>
            <ol className={ui.order}>
              {current.map((item, i) => (
                <li key={item}>
                  <span>{item}</span>
                  <div>
                    <button
                      disabled={i === 0}
                      aria-label={`Naikkan ${item}`}
                      onClick={() => {
                        const next = [...current];
                        [next[i - 1], next[i]] = [next[i], next[i - 1]];
                        change("items", next);
                      }}
                    >
                      ↑
                    </button>
                    <button
                      disabled={i === current.length - 1}
                      aria-label={`Turunkan ${item}`}
                      onClick={() => {
                        const next = [...current];
                        [next[i + 1], next[i]] = [next[i], next[i + 1]];
                        change("items", next);
                      }}
                    >
                      ↓
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <button className={ui.primary} onClick={check}>
              Periksa urutan
            </button>
            {checked && !passed && feedback(order.join(" → "))}
          </>
        );
      }
      break;
    }
    case 6: {
      if (!s.phase) {
        passed = choicePass(0);
        body = (
          <>
            <Timer interactive={false} value={[]} onChange={() => {}} />
            {prose("Hasil pertama")}
            {renderChoice(bullets(f["Interaksi — apa langkah berikutnya?"]), 0)}
          </>
        );
      } else {
        passed = ["start", "pause", "reset"].every((event) =>
          list().includes(event),
        );
        body = (
          <>
            <Panel title="Tahap berikutnya — permintaan" tone="code">
              <Prose
                text={f["Interaksi — apa langkah berikutnya?"]
                  .split("\n\n")
                  .slice(1)
                  .join("\n\n")}
              />
            </Panel>
            <Timer
              key={prefix}
              label="Simulasi · perilaku yang diminta"
              value={list()}
              onChange={(value) => change("items", value)}
            />
            <Prose
              text={bullets(f["Hasil simulasi yang bisa dicoba"])
                .filter((_, i) =>
                  list().includes(["start", "pause", "reset"][i]),
                )
                .join("\n")}
            />
          </>
        );
      }
      break;
    }
    case 7: {
      if (!s.phase) {
        const files = revisedFiles;
        passed = checked && list().length === 1 && list()[0] === "2";
        body = (
          <>
            <div className={ui.review}>
              {files.map((file, i) => (
                <button
                  key={i}
                  className={ui.file}
                  aria-pressed={list().includes(String(i))}
                  onClick={() => toggle("items", String(i))}
                >
                  <span className={ui.fileIcon}>↗</span>
                  <span>{inline(file.replace(/^\d+\. /, ""))}</span>
                  <span>{list().includes(String(i)) ? "✓" : "+"}</span>
                </button>
              ))}
            </div>
            <button className={ui.primary} onClick={check}>
              Periksa perubahan
            </button>
            {checked &&
              feedback(
                list().length === 4
                  ? "Review bukan berarti menolak semua perubahan. Cari tambahan yang memperluas kebutuhan timer. Perubahan pada timer, CSS, dan petunjuk menjalankan masih terkait dengan tugas ini."
                  : list().includes("2")
                    ? "Library timer dan layanan statistik perlu dijelaskan: apakah keduanya diperlukan, apa dampaknya, dan data apa yang dikirim? Periksa kebutuhan itu sebelum menerima tambahan."
                    : "Perubahan yang kamu tandai masih berkaitan dengan fungsi, tampilan, atau petunjuk timer. Lihat juga tambahan yang membawa dependency dan layanan online baru.",
              )}
          </>
        );
      } else {
        passed = checked;
        body = (
          <>
            <Panel title="Permintaan lanjutan" tone="code">
              {prose("Permintaan lanjutan")}
            </Panel>
            <button className={ui.primary} onClick={check}>
              Lihat perubahan file
            </button>
            {checked && (
              <Panel title="Hasil simulasi" tone="agent">
                {prose("Hasil simulasi")}
                <ul>
                  {revisedFiles
                    .filter((_, index) => index !== 2)
                    .map((line) => (
                      <li key={line}>{inline(line.replace(/^\d+\. /, ""))}</li>
                    ))}
                </ul>
              </Panel>
            )}
          </>
        );
      }
      break;
    }
    case 8: {
      if (!s.phase) {
        passed = list().includes("pause");
        body = (
          <>
            {prose("Situasi")}
            <Prose
              text={f["Interaksi — lakukan langkah berikut"]
                .split("\n\n")
                .slice(0, 1)
                .join("\n\n")}
            />
            <Timer
              key={prefix}
              broken
              label="Simulasi · versi yang diuji"
              value={list()}
              onChange={(value) => change("items", value)}
            />
            {passed && (
              <div className={ui.twoColumns}>
                <Panel title="Yang diharapkan">
                  <Prose text={f["Yang diharapkan"]} />
                </Panel>
                <Panel title="Yang terjadi" tone="warning">
                  <Prose
                    text={f["Yang terjadi di simulasi"].split("\n\n")[0]}
                  />
                </Panel>
              </div>
            )}
            {passed && (
              <Prose
                text={f["Yang terjadi di simulasi"].split("\n\n").at(-1) ?? ""}
              />
            )}
          </>
        );
      } else if (s.phase === 1) {
        passed = choicePass(1);
        body = renderChoice(
          bullets(f["Interaksi — laporan mana yang lebih membantu?"]),
          1,
        );
      } else {
        passed = ["start", "pause", "reset"].every((event) =>
          list().includes(event),
        );
        body = (
          <>
            <Panel title="Simulasi" tone="agent">
              <Prose
                text={
                  f["Setelah pilihan sesuai, tampilkan jawaban agent"].split(
                    "\n\n",
                  )[0]
                }
              />
            </Panel>
            <Timer
              key={prefix}
              value={list()}
              onChange={(value) => change("items", value)}
            />
          </>
        );
      }
      break;
    }
    case 9: {
      const second = s.phase === 1;
      passed = choicePass(second ? 1 : 0);
      body = (
        <>
          <Panel title={second ? "Situasi B" : "Situasi A"} tone="code">
            {prose(second ? "Situasi B" : "Situasi A")}
          </Panel>
          {renderChoice(
            bullets(f[second ? "Pilihan 2" : "Pilihan"]),
            second ? 1 : 0,
          )}
          {checked &&
            !revisedChoices[prefix] &&
            feedback(
              f[
                second ? "Jawaban yang masuk akal 2" : "Jawaban yang masuk akal"
              ].split("\n\n")[0],
            )}
        </>
      );
      break;
    }
    case 10: {
      if (!s.phase) {
        passed = choicePass(0);
        body = (
          <>
            {renderChoice(
              bullets(f["Interaksi — pilih penjelasan yang paling tepat"]),
              0,
            )}
          </>
        );
      } else if (s.phase === 1) {
        const rows = table(
          f["Interaksi — apa yang dilakukan pada tiga kondisi berikut?"],
        ).slice(1);
        passed = list().length === rows.length;
        body = (
          <>
            <Prose
              text={f["Interaksi — pilih penjelasan yang paling tepat"]
                .split("\n\n")
                .slice(1)
                .join("\n\n")}
            />
            <div className={ui.matchRows}>
              {rows.map((row, i) => (
                <div className={ui.matchRow} key={i}>
                  <p>{inline(row[0])}</p>
                  <button
                    className={ui.choice}
                    aria-pressed={list().includes(String(i))}
                    onClick={() => toggle("items", String(i))}
                  >
                    Periksa temuan {i + 1}
                  </button>
                  {list().includes(String(i)) && feedback(row[1])}
                </div>
              ))}
            </div>
          </>
        );
      } else if (s.phase === 2) {
        passed = checked;
        body = (
          <>
            {renderChoice(
              bullets(
                f["Interaksi — apa yang dilakukan pada tiga kondisi berikut?"],
              ),
              0,
            )}
            {checked && (
              <Panel title="Hasil publikasi — simulasi" tone="agent">
                <code>https://timer-belajar.example</code>
                <p className={ui.utility}>Alamat contoh, bukan project live.</p>
              </Panel>
            )}
          </>
        );
      } else {
        passed = choicePass(0);
        body = renderChoice(bullets(f["Pertanyaan terakhir"]), 0);
      }
      break;
    }
    case 11: {
      const prompts = [
        ...f["Interaksi — isi empat bagian"].matchAll(
          /^\d+\. \*\*([^*]+)\*\*\s*\n\s*“([^”]+)”/gm,
        ),
      ];
      if (!s.phase) {
        passed = prompts.every(
          (_, i) => String(get(`field${i}`)).trim().length > 0,
        );
        body = (
          <>
            <div className={ui.form}>
              {prompts.map((prompt, i) => (
                <label key={i}>
                  <span>
                    {i + 1}. {prompt[1]}
                  </span>
                  <textarea
                    value={String(get(`field${i}`))}
                    onChange={(e) => change(`field${i}`, e.target.value)}
                    placeholder={prompt[2]}
                    rows={3}
                  />
                </label>
              ))}
            </div>
            <details className={ui.details}>
              <summary>Contoh</summary>
              {prose("Contoh dari project yang baru kita ikuti")}
            </details>
            <button
              className={ui.secondary}
              onClick={() =>
                setS((prev) => ({
                  ...prev,
                  phase: 1,
                  helped: [...new Set([...prev.helped, prefix])],
                }))
              }
            >
              Lanjut tanpa menyimpan brief
            </button>
          </>
        );
      } else {
        passed = true;
        const finalBrief = prompts
          .map((_, i) => String(s.answers["11:0:field" + i] ?? ""))
          .filter(Boolean)
          .join("\n\n");
        const checklist = bullets(f["Hasil"]);
        body = (
          <>
            <Panel title="Brief project-mu" tone="code">
              <Prose text={finalBrief || "Lanjut tanpa menyimpan brief"} />
              {finalBrief && (
                <button
                  className={ui.secondary}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(finalBrief);
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? "Tersalin" : "Salin brief"}
                </button>
              )}
            </Panel>
            <div className={ui.checklist}>
              {checklist.map((line, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={list("review").includes(String(i))}
                    onChange={() => toggle("review", String(i))}
                  />
                  {inline(line)}
                </label>
              ))}
            </div>
            <div className={ui.form}>
              {bullets(f["Refleksi"]).map((line, i) => (
                <label key={i}>
                  <span>{line}</span>
                  <textarea
                    rows={2}
                    value={String(get(`reflection${i}`))}
                    onChange={(e) => change(`reflection${i}`, e.target.value)}
                  />
                </label>
              ))}
            </div>
            <Prose text={f["Refleksi"].split("\n\n").slice(1).join("\n\n")} />
          </>
        );
      }
      break;
    }
  }
  const lastPhase = s.phase === phaseCounts[s.step] - 1;
  const complete = passed || helped;
  const next = () => {
    setCopied(false);
    setS((prev) =>
      lastPhase
        ? prev.step === 11
          ? { ...prev, finished: true }
          : { ...prev, step: prev.step + 1, phase: 0 }
        : { ...prev, phase: prev.phase + 1 },
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const back = () =>
    setS((prev) =>
      prev.finished
        ? { ...prev, finished: false }
        : prev.phase
          ? { ...prev, phase: prev.phase - 1 }
          : {
              ...prev,
              step: prev.step - 1,
              phase: prev.step > 0 ? phaseCounts[prev.step - 1] - 1 : 0,
            },
    );
  const intro = copy.intro.Judul.split(/\n\s*\n/);
  if (!ready)
    return (
      <main className={ui.shell}>
        <p>Memuat materi…</p>
      </main>
    );
  return (
    <main className={ui.shell} data-nusa-theme="light">
      <header className={ui.header}>
        <Link className={ui.wordmark} href={backHref}>
          NUSA <span>Lab</span>
        </Link>
        <Link href={backHref}>← Kembali ke daftar materi</Link>
        <button className={ui.secondary} onClick={() => setPaused(true)}>
          Jeda belajar
        </button>
      </header>
      {storageError && (
        <p role="alert" className={ui.saveError}>
          Progres belum bisa disimpan di browser ini. Tetap lanjutkan selama
          halaman ini terbuka.
        </p>
      )}
      <div
        className={ui.layout}
        data-stage={s.step < 3 ? 0 : s.step < 8 ? 1 : s.step < 11 ? 2 : 3}
      >
        <aside className={ui.rail}>
          <p className={ui.eyebrow}>PRATINJAU · VIBE CODING</p>
          <p className={ui.projectName}>
            {s.step === -1 && s.phase === 0 ? (
              <>
                Vibe
                <br />
                <span>Coding.</span>
              </>
            ) : (
              <>
                timer
                <br />
                <span>belajar.</span>
              </>
            )}
          </p>
          <div
            className={ui.projectSketch}
            aria-hidden="true"
            hidden={s.step === -1 && s.phase === 0}
          >
            <span>25:00</span>
            <i />
            <i />
            <i />
          </div>
          <ol>
            {stages.map((stage, i) => (
              <li
                key={stage}
                aria-current={
                  s.step >= 0 &&
                  (s.step < 3 ? 0 : s.step < 8 ? 1 : s.step < 11 ? 2 : 3) === i
                    ? "step"
                    : undefined
                }
              >
                <small>0{i + 1}</small>
                <span>{stage}</span>
              </li>
            ))}
          </ol>
          <p className={ui.utility}>Simulasi · 12 bagian</p>
        </aside>
        <article className={ui.studio}>
          {paused ? (
            <>
              <h1 ref={heading} tabIndex={-1}>
                Jeda belajar
              </h1>
              <p>
                {storageError
                  ? "Progres belum bisa disimpan di browser ini. Tetap lanjutkan selama halaman ini terbuka."
                  : "Posisi dan pilihanmu disimpan pada browser ini."}
              </p>
              <button className={ui.primary} onClick={() => setPaused(false)}>
                Lanjutkan belajar →
              </button>
            </>
          ) : s.finished ? (
            <>
              <p className={ui.eyebrow}>SELESAI SIMULASI</p>
              {completion}
              <h1 ref={heading} tabIndex={-1}>
                Mulai project-mu dari kebutuhan, bukan dari daftar teknologi
              </h1>
              <Panel title="Selesai simulasi" tone="agent">
                <Prose
                  text={copy.sections[11].fields["Selesai simulasi"] ?? ""}
                />
              </Panel>
              <Prose text={copy.sections[11].fields["Ringkasan akhir"] ?? ""} />
              <Prose
                text={(copy.sections[11].fields["Pilihan berikutnya"] ?? "")
                  .split("\n\n")
                  .slice(1)
                  .join("\n\n")}
              />
              <details className={ui.details}>
                <summary>Coba project sungguhan</summary>
                <Prose text={copy.practice} />
              </details>
              <details className={ui.details}>
                <summary>Baca detail dan sumber</summary>
                <Prose text={copy.appendix} />
              </details>
              <button className={ui.secondary} onClick={back}>
                Kembali ke bagian sebelumnya
              </button>
            </>
          ) : s.step === -1 ? (
            <>
              <p className={ui.eyebrow}>PEMBUKA {s.phase + 1} / 3</p>
              <h1 ref={heading} tabIndex={-1}>
                {intro[0]}
              </h1>
              <div className={s.phase === 1 ? ui.intro : ui.context}>
                <div>
                  <Prose
                    text={intro
                      .slice(1 + s.phase * 2, 3 + s.phase * 2)
                      .join("\n\n")}
                  />
                </div>
                {s.phase === 1 && (
                  <Timer interactive={false} value={[]} onChange={() => {}} />
                )}
              </div>
              <div className={ui.footer}>
                {s.phase > 0 && (
                  <button
                    className={ui.secondary}
                    onClick={() =>
                      setS((prev) => ({ ...prev, phase: prev.phase - 1 }))
                    }
                  >
                    ← Kembali
                  </button>
                )}
                <button
                  className={ui.primary}
                  onClick={() => {
                    setS((prev) =>
                      prev.phase < 2
                        ? { ...prev, phase: prev.phase + 1 }
                        : { ...prev, step: 0, phase: 0 },
                    );
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                >
                  {s.phase === 2 ? copy.intro.Tombol : "Lanjutkan →"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={ui.stepHeader}>
                <span className={ui.eyebrow}>BAGIAN {s.step + 1} / 12</span>
                <span className={ui.utility}>
                  Langkah {s.phase + 1} / {phaseCounts[s.step]}
                </span>
              </div>
              <h1 ref={heading} tabIndex={-1}>
                {section.title}
              </h1>
              <div className={ui.activity}>
                {s.phase === 0 && (
                  <div className={ui.context}>
                    <Prose
                      text={section.context
                        .split("\n\n")
                        .filter(
                          (block) => s.step !== 7 || !/^\d+\. /.test(block),
                        )
                        .join("\n\n")}
                    />
                  </div>
                )}
                {s.step !== 0 && !(s.step === 1 && s.phase === 1) && guidance}
                {body}
              </div>
              {complete && !helped && lastPhase && f.Pembahasan && (
                <Panel title="Pembahasan" tone="note">
                  {prose("Pembahasan")}
                </Panel>
              )}
              {f["Baca lebih lanjut"] && (
                <details className={ui.details}>
                  <summary>Baca lebih lanjut</summary>
                  {prose("Baca lebih lanjut")}
                </details>
              )}
              {complete && lastPhase && f.Transisi && (
                <div className={ui.transition}>{prose("Transisi")}</div>
              )}
              <footer className={ui.footer}>
                <button className={ui.secondary} onClick={back}>
                  ← Kembali
                </button>
                <button
                  className={ui.primary}
                  disabled={!complete}
                  onClick={next}
                >
                  {lastPhase ? f.Lanjut || "Selesai simulasi →" : "Lanjutkan →"}
                </button>
              </footer>
              {!complete && (
                <button
                  className={ui.help}
                  onClick={() =>
                    setS((prev) => ({
                      ...prev,
                      helped: [...new Set([...prev.helped, prefix])],
                      checked: [...new Set([...prev.checked, prefix])],
                    }))
                  }
                >
                  Lihat pembahasan dan lanjut
                </button>
              )}
              {helped && (
                <>
                  <Panel title="Pembahasan" tone="note">
                    <Prose
                      text={
                        f.Pembahasan ||
                        f["Baca lebih lanjut"] ||
                        f["Ringkasan akhir"] ||
                        ""
                      }
                    />
                  </Panel>
                  <p className={ui.utility}>Dilanjutkan dengan pembahasan.</p>
                </>
              )}
            </>
          )}
        </article>
      </div>
    </main>
  );
}
