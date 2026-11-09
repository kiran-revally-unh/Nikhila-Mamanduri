"use client";

// Zoom Parallax (inspired by 21st.dev "zoom-parallax"): a cluster of images that
// zoom at different rates as you scroll, ending on the centre image full-screen.
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Offsets (relative to the centred slot) and sizes for each tile.
const layout: React.CSSProperties[] = [
  { width: "25vw", height: "25vh" },
  { top: "-30vh", left: "5vw", width: "35vw", height: "30vh" },
  { top: "-10vh", left: "-25vw", width: "20vw", height: "45vh" },
  { left: "27.5vw", width: "25vw", height: "25vh" },
  { top: "27.5vh", left: "5vw", width: "20vw", height: "25vh" },
];

export function ZoomParallax({ images }: { images: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scales = [
    useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 4]),
    useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 5]),
    useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 6]),
    useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 5]),
    useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 8]),
  ];
  return (
    <div ref={ref} className="relative h-[260vh]" aria-hidden>
      <div className="sticky top-0 h-svh overflow-hidden">
        {images.slice(0, 5).map((img, i) => (
          <motion.div key={img.src} style={{ scale: scales[i] }} className="absolute inset-0 flex items-center justify-center">
            <div className="relative overflow-hidden rounded-2xl" style={layout[i]}>
              <img src={img.src} alt={img.alt} className="size-full object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
