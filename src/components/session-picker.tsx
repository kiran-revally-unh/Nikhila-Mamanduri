"use client";

// Animated "Pick a session" card for the booking CTA: rises into view (sitting straight), follows the
// pointer in 3D with a soft glare, staggers its rows in, and a highlight glides
// between sessions (auto-cycling until someone hovers). Reduced motion keeps the
// same markup with everything held still.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Clock } from "lucide-react";

type Session = { id: string; title: string; minutes: number; price: string };
const ease = [0.22, 1, 0.36, 1] as const;

export function SessionPicker({ sessions }: { sessions: Session[] }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Auto-cycle the highlight while nobody is interacting.
  useEffect(() => {
    if (reduce || hovering) return;
    const t = setInterval(() => setActive((a) => (a + 1) % sessions.length), 2600);
    return () => clearInterval(t);
  }, [reduce, hovering, sessions.length]);

  // Pointer-driven 3D tilt + glare.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], reduce ? [0, 0] : [9, -9]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], reduce ? [0, 0] : [-11, 11]), { stiffness: 180, damping: 18 });
  const gx = useTransform(px, [0, 1], ["0%", "100%"]);
  const gy = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 60%)`;

  // Gentle float with scroll.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setHovering(false);
  };

  return (
    <motion.div ref={wrap} style={{ y: floatY }} className="relative mx-auto w-full max-w-sm [perspective:1100px]">
      <motion.div
        initial={reduce ? false : { opacity: 0, rotateX: 20, y: 60 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease }}
        whileHover={reduce ? undefined : { scale: 1.02 }}
      >
        <motion.div
          onPointerMove={onMove}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl"
        >
          {/* glare */}
          <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0" />
          {/* slow shimmer sweep */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              animate={{ x: ["0%", "400%"] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
          )}

          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Pick a session</p>
          <ul className="relative mt-4 space-y-2.5" style={{ transform: "translateZ(30px)" }}>
            {sessions.map((s, i) => {
              const on = i === active;
              return (
                <motion.li
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12, ease }}
                >
                  <Link
                    href={`/book?session=${s.id}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="relative flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-white/30"
                  >
                    {on && (
                      <motion.span
                        layoutId="session-highlight"
                        className="absolute -inset-px rounded-2xl border border-[#6cc3b7] bg-[#6cc3b7]/15 shadow-[0_0_24px_-6px_rgba(108,195,183,0.6)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      <span className="block font-semibold">{s.title}</span>
                      <span className="flex items-center gap-1 text-xs text-white/60">
                        <motion.span
                          className="inline-flex"
                          animate={on && !reduce ? { rotate: 360 } : { rotate: 0 }}
                          transition={on && !reduce ? { duration: 2.6, ease: "linear" } : { duration: 0.3 }}
                        >
                          <Clock className="size-3" />
                        </motion.span>
                        {s.minutes} min
                      </span>
                    </span>
                    <motion.span
                      className="relative rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold"
                      animate={on && !reduce ? { scale: [1, 1.12, 1], backgroundColor: "rgba(108,195,183,0.28)" } : { scale: 1, backgroundColor: "rgba(255,255,255,0.1)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {s.price}
                    </motion.span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          <p className="relative mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/50">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#6cc3b7] opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#6cc3b7]" />
            </span>
            Times shown in your timezone
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
