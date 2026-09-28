"use client";

import { useEffect } from "react";

const targets = "main section, main article, [data-reveal-on-scroll]";

function isRevealTarget(element: Element) {
  if (!(element instanceof HTMLElement) || element.closest('[role="dialog"]')) return false;
  if (element.hasAttribute("data-reveal-on-scroll")) return true;
  if (element.tagName === "SECTION") return !element.parentElement?.closest("section, article");
  return Boolean(element.closest('main[data-nusa-theme="light"]'))
    && !element.parentElement?.closest("article")
    && !element.querySelector("section");
}

export default function ScrollReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = (element: Element) => {
      (element as HTMLElement).dataset.nusaReveal = "visible";
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target.hasAttribute("data-nusa-reveal")) reveal(entry.target);
        } else if (!entry.target.contains(document.activeElement)) {
          (entry.target as HTMLElement).dataset.nusaReveal = "pending";
        }
      }
    }, { threshold: 0.01 });

    const add = (root: Element) => {
      const found = root.matches(targets) ? [root, ...root.querySelectorAll(targets)] : root.querySelectorAll(targets);
      for (const element of found) {
        if (!isRevealTarget(element)) continue;
        if (!element.hasAttribute("data-nusa-reveal")) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top >= window.innerHeight || bottom <= 0) (element as HTMLElement).dataset.nusaReveal = "pending";
        }
        observer.observe(element);
      }
    };

    add(document.body);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) if (node instanceof Element) add(node);
        for (const node of record.removedNodes) if (node instanceof Element) {
          if (node.hasAttribute("data-nusa-reveal")) observer.unobserve(node);
          node.querySelectorAll("[data-nusa-reveal]").forEach((element) => observer.unobserve(element));
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const onFocus = (event: FocusEvent) => {
      for (let element = event.target instanceof Element ? event.target : null; element; element = element.parentElement) {
        if (element.getAttribute("data-nusa-reveal") === "pending") reveal(element);
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("focusin", onFocus);
      mutations.disconnect();
      observer.disconnect();
      document.querySelectorAll('[data-nusa-reveal="pending"]').forEach((element) => element.removeAttribute("data-nusa-reveal"));
    };
  }, []);

  return null;
}
