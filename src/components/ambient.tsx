"use client";

import { useEffect } from "react";

/**
 * Site-wide ambient layer: soft brand-colour light fields, a pointer-following
 * spotlight and fine film grain. Purely decorative and disabled for reduced motion.
 */
export function Ambient() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-field absolute inset-0" />
      <div className="ambient-spotlight absolute inset-0" />
      <div className="ambient-grain absolute inset-0" />
    </div>
  );
}
