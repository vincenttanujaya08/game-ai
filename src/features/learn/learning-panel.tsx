"use client";

import Image from "next/image";
import { Diagram } from "./diagrams/diagram";
import type { SectionPresentation } from "./fundamentals-presentation";
import styles from "./fundamentals-reader.module.css";

export function ShortParagraphs({ text, lead = false }: { text: string; lead?: boolean }) {
  return text.split("\n\n").map((paragraph, index) => {
    const quoted = paragraph.startsWith("> ");
    const content = quoted ? paragraph.replace(/^> /gm, "") : paragraph;
    const inline = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, partIndex) => {
      if (part.startsWith("**")) return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`")) return <code key={partIndex}>{part.slice(1, -1)}</code>;
      return part;
    });
    return quoted
      ? <blockquote key={index} className={styles.proseQuote}>{inline}</blockquote>
      : <p key={index} className={lead && index === 0 ? styles.proseLead : undefined}>{inline}</p>;
  });
}

export function LearningPanel({ panel, selected, onSelect }: { panel: SectionPresentation; selected: number; onSelect: (index: number) => void }) {
  return (
    <div className={styles.learningPanel} data-kind={panel.kind} role="group" aria-label={panel.label}>
      <span className={styles.panelLabel}>{panel.label}</span>
      <h3>{panel.title}</h3>
      {panel.detail ? <p className={styles.panelDetail}>{panel.detail}</p> : null}
      {panel.visual?.layout === "logos" ? (
        <div className={styles.brandLogos} aria-label="Contoh produk generative AI">
          {panel.visual.items.map((item) => (
            <a key={item.caption} href={item.source} target="_blank" rel="noreferrer" aria-label={item.alt + ", " + item.credit}>
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
              <span>{item.caption}</span>
            </a>
          ))}
        </div>
      ) : null}
      {panel.items ? (
        <div className={styles.panelItems}>
          {panel.items.map((item, index) => panel.interactive ? (
            <button key={item.title} type="button" aria-pressed={selected === index} onClick={() => onSelect(index)}>
              <strong>{item.title}</strong>
              <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      ) : null}
      {panel.visual?.layout === "diagram" ? (
        <div className={styles.diagramVisual}>
          <Diagram spec={panel.visual.diagram} />
        </div>
      ) : null}
      {panel.visual?.layout === "feature" ? (
        <div className={styles.featureVisual}>
          {panel.visual.items.map((item) => (
            <figure key={item.src}>
              <a href={item.source} target="_blank" rel="noreferrer" aria-label={"Buka sumber: " + item.credit}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 760px) 100vw, 800px"
                />
              </a>
              <figcaption>{item.caption} <a href={item.source} target="_blank" rel="noreferrer">Sumber: {item.credit} ↗</a></figcaption>
            </figure>
          ))}
        </div>
      ) : null}
      {panel.interactive ? <p className={styles.panelReveal} aria-live="polite">{panel.items?.[selected]?.detail}</p> : null}
    </div>
  );
}

/** Panel netral kalau data presentasi dan data pelajaran tidak sejajar. */
export const fallbackPanel: SectionPresentation = {
  kind: "tiles",
  label: "BAGIAN INI",
  title: "Lanjutkan membaca",
  bridge: "Lanjut ke bagian berikutnya.",
};
