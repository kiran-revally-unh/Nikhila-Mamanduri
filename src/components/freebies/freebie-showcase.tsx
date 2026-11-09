"use client";

// Homepage "Free guides" block: a dark card with a Clinics / Careers switch, a fan
// of guide covers that spreads as you scroll (tap a cover to pick it), and the
// email form for the chosen guide right beside it.
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Briefcase, Stethoscope } from "lucide-react";
import { audiences, freebieCover, freebies, type Audience, type Freebie } from "@/content/freebies";
import { FreebieForm } from "./freebie-form";

const ease = [0.22, 1, 0.36, 1] as const;

function FanCover({ g, i, n, active, spread, onPick }: { g: Freebie; i: number; n: number; active: boolean; spread: MotionValue<number>; onPick: () => void }) {
  const mid = (n - 1) / 2;
  const offset = i - mid;
  const x = useTransform(spread, (s) => offset * (34 + s * 52));
  const rotate = useTransform(spread, (s) => offset * (4 + s * 6));
  const y = useTransform(spread, (s) => Math.abs(offset) * (6 + s * 14));
  return (
    <motion.button
      type="button"
      onClick={onPick}
      aria-label={`Choose ${g.title}`}
      aria-pressed={active}
      style={{ x, rotate, y, zIndex: active ? 20 : 10 - Math.abs(offset) }}
      animate={{ scale: active ? 1.08 : 0.92, filter: active ? "brightness(1)" : "brightness(0.7)" }}
      whileHover={{ scale: active ? 1.1 : 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="absolute left-1/2 top-0 -ml-[78px] w-[156px] origin-bottom sm:-ml-[100px] sm:w-[200px]"
    >
      <img src={freebieCover(g.slug)} alt="" className="aspect-[8.5/11] w-full rounded-lg object-cover shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10" />
    </motion.button>
  );
}

export function FreebieShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [audience, setAudience] = useState<Audience>("clinic");
  const list = freebies.filter((f) => f.audience === audience);
  const [picked, setPicked] = useState<Record<Audience, string>>({ clinic: "clinic-front-desk-fix", career: "international-student-career-roadmap" });
  const guide = list.find((g) => g.slug === picked[audience]) ?? list[0];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const raw = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const spread = useSpring(raw, { stiffness: 90, damping: 22 });
  const glow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -40]);

  return (
    <section ref={ref} className="mx-2.5 mt-24 overflow-clip rounded-[34px] bg-[#102a33] text-white sm:mx-auto sm:mt-32 sm:max-w-5xl">
      <div className="relative px-5 pb-8 pt-9 sm:px-10 sm:pb-12 sm:pt-12">
        <motion.div style={{ y: glow }} aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,#e97860_0%,transparent_70%)] opacity-50" />
        <motion.div style={{ y: glow }} aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-[radial-gradient(circle,#216f70_0%,transparent_70%)] opacity-80" />

        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-[11px] text-[#f0937e]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#f0937e]" /> FREE · INSTANT DOWNLOAD
          </p>
          <h2 className="font-display mt-3 text-[40px] font-light leading-[0.98] sm:text-6xl">
            Free guides,
            <br />
            <i className="text-[#f6b4a3]">straight from the work.</i>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Checklists, playbooks and templates from Nikki&apos;s work at Tufts Medicine, U.S. Renal Care and clinic operations. Pick yours.
          </p>

          {/* Audience switch */}
          <div role="tablist" aria-label="Who are the guides for" className="relative mt-6 inline-grid grid-cols-2 rounded-full border border-white/15 bg-white/5 p-1">
            {(Object.keys(audiences) as Audience[]).map((a) => (
              <button
                key={a}
                role="tab"
                aria-selected={audience === a}
                onClick={() => setAudience(a)}
                className="relative z-10 flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold sm:text-sm"
              >
                {audience === a && (
                  <motion.span layoutId="freebie-tab" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className={`flex items-center gap-1.5 ${audience === a ? "text-[#102a33]" : "text-white/75"}`}>
                  {a === "clinic" ? <Stethoscope className="size-3.5" /> : <Briefcase className="size-3.5" />}
                  {audiences[a].short}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Cover fan */}
            <div className="relative h-[230px] sm:h-[320px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={audience}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0 origin-top scale-[0.78] sm:scale-100"
                >
                  {list.map((g, i) => (
                    <FanCover
                      key={g.slug}
                      g={g}
                      i={i}
                      n={list.length}
                      active={g.slug === guide.slug}
                      spread={spread}
                      onPick={() => setPicked((p) => ({ ...p, [audience]: g.slug }))}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
              <p className="absolute inset-x-0 bottom-0 text-center text-[11px] text-white/50">Tap a cover to choose</p>
            </div>

            {/* Chosen guide + form */}
            <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={guide.slug} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease }}>
                  <p className="font-mono text-[10px] text-[#6cc3b7]">PDF · {guide.pages} PAGES · FREE</p>
                  <h3 className="font-display mt-1 text-2xl leading-tight">{guide.title}</h3>
                  <p className="mt-1 text-sm text-white/65">{guide.blurb}</p>
                  <div className="mt-4">
                    <FreebieForm key={guide.slug} guides={[guide]} dark />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <Link href="/resources" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#6cc3b7]">
            See all 6 free guides <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
