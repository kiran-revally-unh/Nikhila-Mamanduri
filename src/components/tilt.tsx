"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Gentle pointer tilt (max 5°) with a moving sheen; fine pointers only. */
export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    ref.current.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    ref.current.style.setProperty("--sx", `${x * 100}%`);
    ref.current.style.setProperty("--sy", `${y * 100}%`);
  }
  function reset() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("tilt", className)}>
      {children}
    </div>
  );
}
