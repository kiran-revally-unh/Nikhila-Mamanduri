"use client";

// Sticky Scroll Reveal (inspired by 21st.dev "sticky-scroll-reveal"): chapters scroll
// on the left while a sticky visual on the right swaps to match the active chapter.
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type Chapter = {
  period: string;
  title: string;
  org: string;
  text: string;
  image?: string;
  gradient: string;
  label: string;
};

export function StickyReveal({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length))));
  });
  const c = chapters[active];

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        {chapters.map((ch, i) => (
          <div key={i} className="flex min-h-[60vh] flex-col justify-center py-10">
            <motion.div animate={{ opacity: active === i ? 1 : 0.3 }} transition={{ duration: 0.4 }}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">{ch.period}</p>
              <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{ch.title}</h3>
              <p className="mt-2 text-lg font-semibold text-accent">{ch.org}</p>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">{ch.text}</p>
            </motion.div>
            {/* Mobile visual */}
            <div className={cn("relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br lg:hidden", ch.gradient)}>
              {ch.image ? <img src={ch.image} alt="" className="absolute inset-0 size-full object-cover" /> : <Placard label={ch.label} />}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-[15vh] h-[70vh] overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-accent/10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn("absolute inset-0 bg-gradient-to-br", c.gradient)}
            >
              {c.image ? <img src={c.image} alt="" className="absolute inset-0 size-full object-cover" /> : <Placard label={c.label} />}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-5 left-5 flex gap-1.5">
            {chapters.map((_, i) => (
              <span key={i} className={cn("h-1.5 rounded-full bg-white/80 transition-all", i === active ? "w-8" : "w-1.5 opacity-60")} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Placard({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-10 text-center">
      <p className="font-serif text-5xl italic leading-tight text-white/95 sm:text-6xl">{label}</p>
    </div>
  );
}
