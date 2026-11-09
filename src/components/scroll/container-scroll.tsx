"use client";

// Container Scroll Animation (inspired by 21st.dev "container-scroll-animation"):
// the card starts tilted back and settles flat as it scrolls into view.
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function ContainerScroll({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, 0]);
  return (
    <div ref={ref} className="[perspective:1200px]">
      <motion.div style={{ y: headerY }}>{header}</motion.div>
      <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }} className="mt-10">
        {children}
      </motion.div>
    </div>
  );
}
