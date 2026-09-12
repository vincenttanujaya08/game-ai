import type { CSSProperties } from "react";

export default function HomeIcon({ name, style }: { name: "arrow" | "book" | "game" | "flame" | "play" | "document" | "gear" | "flag" | "flask" | "plane" | "logo" | "soon" | "home" | "compass" | "prompt" | "code" | "lock"; style?: CSSProperties }) {
  const paths = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    book: <><path fill="#ff6858" d="M3 4q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1Z" /><path d="M12 5v15" /></>,
    game: <><path fill="#6bc4f2" d="M8 6h8q4 0 5 5l1 6q0 4-4 2l-3-3H9l-3 3q-4 2-4-2l1-6q1-5 5-5Z" /><path d="M6 10v5m-2-2.5h5m7-2h.1m3 3h.1" /></>,
    flame: <path fill="#ffb965" d="M12 2q2 6 5 8l2-4q5 9 1 13-8 7-14 0-4-5 2-12l1 5q3-5 3-10Z" />,
    play: <path fill="currentColor" stroke="none" d="m9 5 11 7-11 7Z" />,
    document: <><path d="M6 2h9l4 4v16H6Z M14 2v5h5M9 11h7m-7 4h7m-7 3h5" /></>,
    gear: <><path d="m10 2 4 0 1 3 3 1 3 0 1 4-2 2 0 3 1 3-3 3-3-1-3 0-2 2-4-1 0-3-1-3-3-1V10l3-1 1-3 3 0Z" /><circle cx="12" cy="12" r="4" /></>,
    flag: <path d="M5 22V3q4-3 8 0t7 0v10q-3 3-7 0t-8 0" />,
    flask: <><path fill="#ff9b9b" d="M9 3v7L3 20q0 2 3 2h12q3 0 3-2l-6-10V3Z" /><path d="M8 3h8M6 16h12m-8-3h.1m3 5h.1" /></>,
    plane: <path d="m2 10 20-8-8 20-3-9-9-3Zm9 3L22 2" />,
    logo: <><path fill="#071b3e" d="m2 21 5-12 4 3 6-10 5 19-10-4Z" /><path stroke="#fffef8" d="m6 16 4-4 3 3 4-6m-5 6 5 3" /></>,
    soon: <><circle cx="12" cy="12" r="9" /><path d="M6 19 18 5" /></>,
    home: <><path fill="currentColor" stroke="none" d="m2 11 10-9 10 9-2 2v9h-6v-7h-4v7H4v-9Z" /><path d="m2 11 10-9 10 9" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path fill="#ff6858" d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
    prompt: <><path d="M4 4h16v12H9l-5 4Z" /><path d="m14 7 .7 1.6L16.5 9l-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.4Z" /></>,
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-13-4 16" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>,
  };
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]}</svg>;
}
