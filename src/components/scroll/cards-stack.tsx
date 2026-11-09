"use client";

// Cards Stack (inspired by 21st.dev "cards-stack"): each card pins as you scroll and
// the earlier ones shrink back, building a stack.
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function StackCard({
  i,
  total,
  progress,
  children,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const target = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], reduce ? [1, 1] : [1, target]);
  return (
    <div className="sticky top-24 flex h-[70vh] items-start justify-center" style={{ paddingTop: i * 24 }}>
      <motion.div style={{ scale }} className="w-full origin-top">
        {children}
      </motion.div>
    </div>
  );
}

export function CardsStack({ items }: { items: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((node, i) => (
        <StackCard key={i} i={i} total={items.length} progress={scrollYProgress}>
          {node}
        </StackCard>
      ))}
    </div>
  );
}
