"use client";

// Impact Ring (Scrolltide-style 3D scroll scene): result cards sit on a 3D cylinder
// that turns as you scroll through a pinned section. Reduced motion: a still ring
// (same markup, only the motion values differ, so server and client HTML match).
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export type Impact = { value: string; label: string; org: string };

export function ImpactRing({ items }: { items: Impact[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [radius, setRadius] = useState(420);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const rotate = useTransform(smooth, [0, 1], reduce ? [0, 0] : [10, -360 + 360 / items.length + 10]);
  const tilt = useTransform(smooth, [0, 0.5, 1], reduce ? [-8, -8, -8] : [-14, -6, -14]);

  useEffect(() => {
    const fit = () => setRadius(Math.max(220, Math.min(460, window.innerWidth * 0.42)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const step = 360 / items.length;

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div aria-hidden className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative z-10 mb-10 px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-coral">Impact</p>
          <h2 className="mt-3 text-4xl sm:text-6xl">Results, not just roles.</h2>
        </div>

        <div className="relative h-[340px] w-full [perspective:1400px]">
          <motion.div
            className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
            style={{ rotateY: rotate, rotateX: tilt }}
          >
            {items.map((it, i) => (
              <div
                key={it.label}
                className="absolute -left-[110px] -top-[130px] h-[260px] w-[220px] [backface-visibility:hidden]"
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.75rem] border border-border bg-surface/90 p-6 shadow-[0_30px_60px_-20px_rgb(16_42_51/0.35)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{it.org}</p>
                  <div>
                    <p className={`text-gradient-brand whitespace-nowrap font-serif leading-none ${it.value.length > 4 ? "text-[2.6rem]" : "text-6xl"}`}>{it.value}</p>
                    <p className="mt-3 text-sm font-medium leading-snug">{it.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <p className="relative mt-8 text-sm text-muted-foreground">Keep scrolling to turn the ring</p>
      </div>
    </div>
  );
}
