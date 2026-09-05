"use client";

import { useEffect } from "react";

/** Scroll reveal for [data-reveal] elements, with 40ms stagger per data-stagger step. */
export default function Reveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".wr [data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.stagger ?? 0) * 40;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
