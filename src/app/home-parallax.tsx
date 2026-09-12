"use client";

import { useEffect } from "react";

export default function HomeParallax() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverCapable = window.matchMedia("(hover: hover)");
    if (reducedMotion.matches || !hoverCapable.matches) return;

    const layers = [...document.querySelectorAll<HTMLElement>("[data-nusa-parallax]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      layers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const offset = Math.round((rect.top + rect.height / 2 - center) * -0.07);
        layer.style.setProperty("--parallax-y", `${offset}px`);
      });
    };
    const queueUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
