"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Diagram } from "./diagrams/diagram";
import type { SectionPresentation } from "./fundamentals-presentation";
import styles from "./fundamentals-reader.module.css";

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let rest = text;
  while (rest) {
    const match = /\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(/.exec(rest);
    if (!match) { nodes.push(rest); break; }
    if (match.index) nodes.push(rest.slice(0, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={nodes.length}>{token.slice(2, -2)}</strong>);
      rest = rest.slice(match.index + token.length);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={nodes.length}>{token.slice(1, -1)}</code>);
      rest = rest.slice(match.index + token.length);
    } else {
      const start = match.index + token.length;
      let depth = 1;
      let end = start;
      while (end < rest.length && depth) {
        if (rest[end] === "(") depth++;
        if (rest[end] === ")") depth--;
        end++;
      }
      if (depth) { nodes.push(token); rest = rest.slice(start); continue; }
      const href = rest.slice(start, end - 1);
      nodes.push(<a key={nodes.length} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{token.slice(1, -2)}</a>);
      rest = rest.slice(end);
    }
  }
  return nodes;
}

export function MaterialBody({ markdown, presentation }: { markdown: string; presentation: SectionPresentation }) {
  const blocks = markdown.split(/\n\s*\n/).filter(Boolean);
  return <div className={styles.materialBody}>
    {blocks.map((block, index) => {
      const image = /^!\[([^\]]+)\]\(([^)]+)\)$/.exec(block);
      if (image) {
        const src = image[2].replace(/^\.\.\/public/, "");
        const visual = presentation.visual && presentation.visual.layout !== "diagram"
          ? presentation.visual.items.find((item) => item.src === src) : undefined;
        return <figure className={styles.materialImage} key={index}>
          <Image src={src} alt={image[1]} width={visual?.width ?? 960} height={visual?.height ?? 640} sizes="(max-width: 760px) 100vw, 760px" />
        </figure>;
      }
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- "))) {
        return <ul key={index}>{lines.map((line, item) => <li key={item}>{inline(line.slice(2))}</li>)}</ul>;
      }
      if (lines.every((line) => /^\d+\. /.test(line))) {
        return <ol key={index}>{lines.map((line, item) => <li key={item}>{inline(line.replace(/^\d+\. /, ""))}</li>)}</ol>;
      }
      if (block.startsWith("> ")) {
        return <blockquote className={styles.proseQuote} key={index}>{inline(block.replace(/^> /gm, ""))}</blockquote>;
      }
      if (/^\*\*[^*]+\*\*$/.test(block)) {
        return <h3 key={index}>{block.slice(2, -2)}</h3>;
      }
      return <p key={index} className={index === 0 ? styles.proseLead : undefined}>{inline(block)}</p>;
    })}
    {presentation.visual?.layout === "diagram" ? <div className={styles.diagramVisual}><Diagram spec={presentation.visual.diagram} /></div> : null}
  </div>;
}
