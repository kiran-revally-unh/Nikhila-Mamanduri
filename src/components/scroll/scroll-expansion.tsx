"use client";

// Scroll Expansion Hero (inspired by 21st.dev "scroll-expansion-hero"): a framed
// image grows to full-bleed as you scroll, then the overlay copy fades in.
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function ScrollExpansion({
  image,
  alt,
  eyebrow,
  lines,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  lines: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, [0, 0.6], reduce ? ["94%", "94%"] : ["42%", "94%"]);
  const height = useTransform(scrollYProgress, [0, 0.6], reduce ? ["88%", "88%"] : ["62%", "88%"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], reduce ? [32, 32] : [40, 32]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const overlay = useTransform(scrollYProgress, [0.45, 0.75], reduce ? [1, 1] : [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.8], reduce ? [0, 0] : [40, 0]);

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label={lines.join(" ")}>
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden pt-16">
        <motion.div style={{ width, height, borderRadius: radius, maxWidth: 1100 }} className="relative overflow-hidden shadow-2xl shadow-accent/20">
          <motion.img src={image} alt={alt} style={{ scale: imgScale }} className="absolute inset-0 size-full object-cover object-[50%_30%]" />
          <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-gradient-to-t from-[#102a33]/90 via-[#102a33]/40 to-transparent" />
          <motion.div style={{ opacity: overlay, y: textY }} className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f0937e]">{eyebrow}</p>
            <p className="mt-4 max-w-4xl font-serif text-4xl italic leading-tight sm:text-6xl lg:text-7xl">
              {lines.map((l) => <span key={l} className="block">{l}</span>)}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
