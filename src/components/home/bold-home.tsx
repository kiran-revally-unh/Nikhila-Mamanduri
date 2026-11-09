"use client";

// Home page "Bold colour" design (mockup 12): name-behind-portrait hero, scroll-lit
// statement, colour-block stats, career log, scroll-driven honours rail, LinkedIn
// block and booking card. Motion uses scroll-linked parallax; with reduced motion the
// same markup renders with all motion values held still.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const glass =
  "border border-[#102a33]/10 bg-white/75 shadow-[0_20px_50px_-25px_rgb(16_42_51/0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#102a33]/70";

/** Scroll-linked value that stays at `from` when the user prefers reduced motion. */
function useParallax(progress: MotionValue<number>, from: number, to: number, reduce: boolean | null) {
  return useTransform(progress, [0, 1], reduce ? [from, from] : [from, to]);
}

// ---------------------------------------------------------------- Hero
export function BoldHero({ role, company, orgs }: { role: string; company: string; orgs: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const nameY = useParallax(p, 0, 220, reduce);
  const nameScale = useParallax(p, 1, 0.86, reduce);
  const surnameY = useParallax(p, 0, 150, reduce);
  const portraitY = useParallax(p, 0, -50, reduce);
  const portraitScale = useParallax(p, 1, 1.06, reduce);
  const badgeA = useParallax(p, 0, -140, reduce);
  const badgeB = useParallax(p, 0, -220, reduce);
  const cardY = useParallax(p, 0, -90, reduce);
  const float = reduce ? undefined : { y: [0, -8, 0] };

  return (
    <>
      <section ref={ref} className="relative -mt-[68px] overflow-hidden pt-[68px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_35%,#fdece6_0%,transparent_60%)] dark:bg-[radial-gradient(120%_70%_at_50%_35%,#1d3a44_0%,transparent_60%)]"
        />
        <div className="relative mx-auto h-[min(760px,calc(100svh-20px))] min-h-[640px] max-w-6xl sm:h-[820px]">
          {/* Name sits behind the portrait */}
          <motion.h1
            style={{ y: nameY, scale: nameScale }}
            className="font-display absolute inset-x-0 top-[40px] text-center text-[clamp(6rem,30vw,17rem)] font-extrabold leading-[0.82] tracking-[-0.05em] text-[#102a33] dark:text-[#d8ede7] sm:top-[30px]"
          >
            <span className="sr-only">Nikki Mamanduri</span>
            <span aria-hidden className="inline-flex overflow-hidden">
              {"NIKKI".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.06, ease }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p
            aria-hidden
            style={{ y: surnameY }}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="font-display absolute inset-x-0 top-[150px] text-center text-[clamp(4.2rem,20vw,9.5rem)] font-light italic leading-[0.82] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.4px_#102a33] dark:[-webkit-text-stroke:1.4px_#d8ede7] sm:top-[200px]"
          >
            Mamanduri
          </motion.p>

          <motion.div
            style={{ y: portraitY, scale: portraitScale }}
            initial={reduce ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className="absolute bottom-0 left-1/2 z-[2] aspect-[800/766] w-[min(155vw,740px)] -translate-x-1/2 origin-bottom"
          >
            <picture>
              <source srcSet="/images/nikki-cutout.webp" type="image/webp" />
              <img
                src="/images/nikki-cutout.png"
                alt="Portrait of Nikki Mamanduri"
                fetchPriority="high"
                className="size-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
              />
            </picture>
          </motion.div>

          <motion.div style={{ y: badgeA }} className="absolute left-3 top-[52%] z-[3] sm:left-[8%]">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, ...float }}
              transition={{ opacity: { delay: 0.8 }, scale: { delay: 0.8, ease }, x: { delay: 0.8, ease }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className={`rounded-2xl px-4 py-2.5 ${glass}`}
            >
              <p className="font-mono text-[10px] tracking-wider text-coral">CREDENTIALS</p>
              <p className="text-sm font-bold">MHA · CAPM</p>
            </motion.div>
          </motion.div>
          <motion.div style={{ y: badgeB }} className="absolute right-3 top-[62%] z-[3] sm:right-[8%]">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, ...float }}
              transition={{ opacity: { delay: 1 }, scale: { delay: 1, ease }, x: { delay: 1, ease }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className={`rounded-2xl px-4 py-2.5 ${glass}`}
            >
              <p className="font-mono text-[10px] tracking-wider text-accent">IMPACT</p>
              <p className="text-sm font-bold">−20% claim denials</p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardY }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className={`absolute inset-x-3 bottom-4 z-[3] mx-auto max-w-md rounded-3xl p-4 sm:bottom-8 ${glass}`}
          >
            <p className="flex items-center gap-2 text-xs font-semibold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {role} · {company}
            </p>
            <p className="font-display mt-2 text-[22px] leading-tight">
              Healthcare operations, <i className="text-coral">made human.</i>
            </p>
            <div className="mt-3 flex gap-2">
              <Link href="/book" className="rounded-full bg-[#102a33] px-4 py-2 text-xs font-semibold text-white dark:bg-[#d8ede7] dark:text-[#102a33]">
                Book a call
              </Link>
              <Link href="/about" className="rounded-full border border-[#102a33]/15 px-4 py-2 text-xs font-semibold dark:border-white/20">
                My story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Employer strip */}
      <div className="overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground [--duration:30s]" aria-hidden>
          {[...orgs, ...orgs, ...orgs, ...orgs].map((o, i) => (
            <span key={i} className="flex items-center gap-8">
              {o} <span className="text-coral">✦</span>
            </span>
          ))}
        </div>
        <p className="sr-only">Experience at {orgs.join(", ")}</p>
      </div>
    </>
  );
}

// ---------------------------------------------------------------- Statement
type Word = { t: string; style?: "bold" | "italic" | "mark" };
const statement: Word[] = [
  { t: "I" }, { t: "build" }, { t: "better", style: "bold" }, { t: "systems", style: "bold" }, { t: "so" }, { t: "care" },
  { t: "teams" }, { t: "are" }, { t: "stronger", style: "italic" }, { t: "—" }, { t: "and" }, { t: "every" }, { t: "patient" },
  { t: "has" }, { t: "a" }, { t: "better", style: "mark" }, { t: "experience.", style: "mark" },
];

function LitWord({ w, i, n, progress, reduce }: { w: Word; i: number; n: number; progress: MotionValue<number>; reduce: boolean | null }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, start + 1 / n], reduce ? [1, 1] : [0.15, 1]);
  const mark = useTransform(progress, [start, start + 2 / n], reduce ? ["100%", "100%"] : ["0%", "100%"]);
  return (
    <motion.span
      style={{ opacity, ...(w.style === "mark" ? { backgroundSize: mark } : {}) }}
      className={
        w.style === "bold"
          ? "font-semibold"
          : w.style === "italic"
            ? "italic text-accent"
            : w.style === "mark"
              ? "bg-[linear-gradient(transparent_60%,#fbd5cb_60%)] bg-no-repeat dark:bg-[linear-gradient(transparent_60%,#7a3b2e_60%)]"
              : undefined
      }
    >
      {w.t}{" "}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  return (
    <div ref={ref} className="mx-auto max-w-5xl px-5 pt-20 sm:px-8 sm:pt-28">
      <p className="font-mono text-xs text-coral">[ ABOUT ]</p>
      <p className="font-display mt-4 text-[34px] font-light leading-[1.14] sm:text-6xl" aria-label={statement.map((w) => w.t).join(" ")}>
        {statement.map((w, i) => (
          <LitWord key={i} w={w} i={i} n={statement.length} progress={scrollYProgress} reduce={reduce} />
        ))}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- Stat blocks
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const [text, setText] = useState(value);
  useEffect(() => {
    if (!m || !inView || reduce) return;
    const target = parseFloat(m[1]);
    const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;
    const c = animate(0, target, { duration: 1.4, ease, onUpdate: (v) => setText(v.toFixed(decimals) + m[2]) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  return <span ref={ref}>{text}</span>;
}

const blockTones = [
  "bg-coral-bright text-white",
  "bg-[#fde047] text-[#102a33]",
  "bg-[#216f70] text-white",
  "bg-[#102a33] text-white dark:bg-[#d8ede7] dark:text-[#102a33]",
];

export function StatBlocks({ stats }: { stats: { value: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useParallax(scrollYProgress, 30, -30, reduce);
  const right = useParallax(scrollYProgress, -10, 50, reduce);
  return (
    <div ref={ref} className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-2.5 px-3.5 sm:mt-20 sm:grid-cols-4 sm:gap-4 sm:px-8">
      {stats.map((s, i) => (
        <motion.div key={s.label} style={{ y: i % 2 === 0 ? left : right }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 70, rotate: i % 2 ? 5 : -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease }}
            whileHover={reduce ? undefined : { y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
            className={`flex min-h-[150px] flex-col justify-between rounded-[28px] p-5 sm:min-h-[200px] sm:p-6 ${blockTones[i % 4]}`}
          >
            <p className="text-xs font-bold opacity-85">{s.label}</p>
            <p className="text-[44px] font-black leading-none tracking-[-0.05em] sm:text-6xl">
              <CountUp value={s.value} />
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- Career log
export function CareerLog({ items }: { items: { role: string; company: string; period: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  return (
    <div className="mx-auto max-w-3xl px-5 pt-24 sm:px-8 sm:pt-32">
      <p className="font-mono text-xs text-accent">/ EXPERIENCE</p>
      <h2 className="mt-2 font-sans text-[32px] font-bold tracking-tight sm:text-5xl">Career log</h2>
      <div ref={ref} className="relative mt-8 pl-6">
        <div className="absolute bottom-6 left-[3px] top-1 w-px bg-border" />
        <motion.div style={{ scaleY: line }} className="absolute bottom-6 left-[3px] top-1 w-px origin-top bg-accent" />
        {items.map((it, i) => (
          <motion.div
            key={it.role + it.company}
            initial={reduce ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease }}
            className="relative pb-7"
          >
            <motion.span
              initial={reduce ? false : { scale: 0.4, backgroundColor: "#cfd8dc" }}
              whileInView={{ scale: 1, backgroundColor: i === 0 ? "#e97860" : "#216f70" }}
              viewport={{ once: true, margin: "-25% 0px" }}
              transition={{ duration: 0.5 }}
              className="absolute -left-[26px] top-1 size-[9px] rounded-full bg-accent ring-4 ring-background"
            />
            <p className="font-mono text-[11px] text-muted-foreground">
              {it.period}
            </p>
            <p className="mt-1 text-lg font-bold sm:text-xl">{it.role}</p>
            <p className="text-sm text-muted-foreground">{it.company}</p>
          </motion.div>
        ))}
      </div>
      <Link href="/experience" className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Full experience <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------- Honours rail
export type Honour = { title: string; caption: string; image: string; href: string };

export function HonoursRail({ items }: { items: Honour[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const pinned = !reduce && distance > 0;
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cards = items.map((h, i) => (
    <Link key={h.href + i} href={h.href} className="group w-[250px] flex-none sm:w-[340px]">
      <div className="overflow-hidden rounded-sm">
        <img src={h.image} alt="" loading="lazy" className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[420px]" />
      </div>
      <p className="font-display mt-3 text-[22px]">{h.title}</p>
      <p className="text-xs text-muted-foreground">{h.caption}</p>
    </Link>
  ));

  return (
    <section
      ref={section}
      className="mt-24 bg-[#fbf8f4] dark:bg-[#0f2128] sm:mt-32"
      style={{ height: pinned ? `calc(100svh + ${distance}px)` : undefined }}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-clip" : "py-14"}>
        <p className="px-5 font-mono text-[11px] tracking-[0.3em] text-coral sm:px-8">CHAPTER — HONOURS</p>
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={pinned ? "mt-6 flex w-max gap-4 px-5 sm:px-8" : "mt-6 flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8"}
        >
          {cards}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Fresh from LinkedIn
export type FreshPost = { title: string; date: string; image: string; href: string };

function ParallaxImage({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useParallax(scrollYProgress, -24, 24, reduce);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt="" loading="lazy" style={{ y, scale: 1.18 }} className="size-full object-cover" />
    </div>
  );
}

export function FreshLinkedIn({ posts, profileUrl }: { posts: FreshPost[]; profileUrl: string }) {
  const reduce = useReducedMotion();
  const [first, ...rest] = posts;
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease }}
      className="mx-2.5 mt-16 rounded-[34px] bg-mint px-5 py-8 dark:bg-[#17343c] sm:mx-auto sm:mt-24 sm:max-w-5xl sm:p-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-sans text-[42px] font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl">
          Fresh from
          <br />
          <span className="text-[#0a66c2] dark:text-[#5aa7f0]">LinkedIn</span>
        </h2>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#0a66c2] px-4 py-2 text-xs font-bold text-white">
          Follow ↗
        </a>
      </div>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-4">
        <Link href={first.href} className="group overflow-hidden rounded-3xl bg-surface sm:row-span-2">
          <ParallaxImage src={first.image} className="h-[220px] sm:h-[340px]" />
          <div className="p-4">
            <p className="text-[11px] font-extrabold uppercase text-[#0a66c2] dark:text-[#5aa7f0]">{first.date}</p>
            <p className="mt-1 text-[17px] font-extrabold leading-snug group-hover:text-accent">{first.title}</p>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {rest.map((p) => (
            <Link key={p.href} href={p.href} className="group overflow-hidden rounded-[20px] bg-surface">
              <ParallaxImage src={p.image} className="h-[100px] sm:h-[150px]" />
              <p className="line-clamp-3 p-2.5 text-xs font-extrabold leading-snug group-hover:text-accent sm:text-sm">{p.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/blog" className="mt-5 inline-flex items-center gap-1 text-sm font-bold">
        All posts <ArrowUpRight className="size-4" />
      </Link>
    </motion.section>
  );
}

// ---------------------------------------------------------------- Booking card
export function BookingCard({ sessions }: { sessions: { title: string; minutes: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.35], reduce ? [1, 1] : [0.92, 1]);
  const glowA = useParallax(scrollYProgress, -40, 80, reduce);
  const glowB = useParallax(scrollYProgress, 60, -60, reduce);
  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="relative mx-3.5 mt-16 overflow-hidden rounded-[32px] bg-[#102a33] px-6 py-9 text-white sm:mx-auto sm:mt-24 sm:max-w-3xl sm:p-12"
    >
      <motion.div style={{ y: glowA }} className="pointer-events-none absolute -right-16 -top-16 size-60 rounded-full bg-[radial-gradient(circle,#e97860_0%,transparent_70%)] opacity-60" />
      <motion.div style={{ y: glowB }} className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-[radial-gradient(circle,#216f70_0%,transparent_70%)] opacity-90" />
      <div className="relative">
        <p className="flex items-center gap-2 font-mono text-[11px] text-[#f0937e]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#f0937e]" /> BOOKING THIS WEEK
        </p>
        <h2 className="font-display mt-4 text-[38px] font-light leading-[1.02] sm:text-6xl">
          Let&apos;s build better
          <br />
          <i>systems together.</i>
        </h2>
        <div className="mt-6 rounded-[20px] border border-white/15 bg-white/[0.07] p-3.5 backdrop-blur">
          {sessions.map((s, i) => (
            <Link
              key={s.title}
              href="/book"
              className={`flex items-center justify-between px-1 py-2.5 text-sm transition hover:text-[#f0937e] ${i < sessions.length - 1 ? "border-b border-white/10" : ""}`}
            >
              {s.title}
              <span className="font-mono text-[11px] opacity-70">{s.minutes} min</span>
            </Link>
          ))}
        </div>
        <Link href="/book" className="mt-4 block rounded-full bg-white py-3.5 text-center text-sm font-bold text-[#102a33] transition hover:bg-mint">
          Pick a time →
        </Link>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------- Footer wordmark
export function Wordmark() {
  const reduce = useReducedMotion();
  return (
    <p aria-hidden className="flex overflow-hidden text-[clamp(5rem,24vw,11rem)] font-black leading-[0.85] tracking-[-0.06em]">
      {"nikki".split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.06, ease }}
        >
          {ch}
        </motion.span>
      ))}
      <motion.span
        className="inline-block text-coral"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        *
      </motion.span>
    </p>
  );
}


// ---------------------------------------------------------------- Featured work (stacking cards)
export type WorkCard = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  metrics: { value: string; label: string }[];
  image?: string;
};

const workTones = [
  { card: "bg-[#102a33] text-white", chip: "bg-white/10 text-[#f0937e]", sub: "text-white/70", rule: "border-white/20" },
  { card: "bg-[#216f70] text-white", chip: "bg-white/15 text-white", sub: "text-white/75", rule: "border-white/25" },
  { card: "bg-[#e97860] text-white", chip: "bg-white/20 text-white", sub: "text-white/85", rule: "border-white/30" },
  { card: "bg-[#d8ede7] text-[#102a33]", chip: "bg-[#102a33]/10 text-[#216f70]", sub: "text-[#102a33]/70", rule: "border-[#102a33]/20" },
];

function StackCard({ w, i, n, progress, reduce }: { w: WorkCard; i: number; n: number; progress: MotionValue<number>; reduce: boolean | null }) {
  const tone = workTones[i % workTones.length];
  const scale = useTransform(progress, [i / n, 1], reduce ? [1, 1] : [1, 1 - (n - 1 - i) * 0.05]);
  const dim = useTransform(progress, [i / n, 1], reduce ? [0, 0] : [0, (n - 1 - i) * 0.12]);
  return (
    <div className="sticky h-[78svh] min-h-[520px] pt-2" style={{ top: `${76 + i * 16}px` }}>
      <motion.div
        style={{ scale }}
        className={`relative flex h-[min(560px,70svh)] min-h-[460px] origin-top flex-col overflow-hidden rounded-[32px] p-6 shadow-[0_-20px_50px_-30px_rgb(16_42_51/0.6)] sm:p-9 ${tone.card}`}
      >
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span className={`rounded-full px-3 py-1 ${tone.chip}`}>{w.category}</span>
          <span className="opacity-70">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {w.year}
          </span>
        </div>
        <h3 className="font-display mt-6 text-[30px] font-normal leading-[1.05] sm:text-5xl">{w.title}</h3>
        <p className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${tone.sub}`}>{w.summary}</p>
        {w.image ? (
          <img src={w.image} alt="" loading="lazy" className="mt-5 min-h-0 w-full flex-1 rounded-2xl object-cover" />
        ) : (
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            {w.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className={`border-t pt-3 ${tone.rule}`}>
                <p className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">{m.value}</p>
                <p className={`mt-1 text-xs ${tone.sub}`}>{m.label}</p>
              </div>
            ))}
          </div>
        )}
        <Link
          href={`/work/${w.slug}`}
          className="mt-5 inline-flex items-center gap-1 self-start rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#102a33] transition hover:bg-[#fde047]"
        >
          Read the case study <ArrowUpRight className="size-4" />
        </Link>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.div>
    </div>
  );
}

export function FeaturedWork({ items }: { items: WorkCard[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="mx-auto max-w-4xl px-3.5 pt-24 sm:px-8 sm:pt-32">
      <p className="px-1.5 font-mono text-xs text-coral">[ FEATURED WORK ]</p>
      <h2 className="font-display mt-3 px-1.5 text-[38px] font-light leading-none sm:text-6xl">
        Selected <i className="text-accent">case studies</i>
      </h2>
      <div ref={ref} className="mt-8">
        {items.map((w, i) => (
          <StackCard key={w.slug} w={w} i={i} n={items.length} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>
      <Link href="/work" className="ml-1.5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        All work <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}

// ---------------------------------------------------------------- Photo wall (parallax collage)
export type WallPhoto = { image: string; href: string; title: string };

function WallColumn({ photos, y, offset }: { photos: WallPhoto[]; y: MotionValue<number>; offset: string }) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-2.5 sm:gap-4 ${offset}`}>
      {photos.map((p, i) => (
        <Link key={p.href + i} href={p.href} className="group relative block overflow-hidden rounded-2xl bg-muted sm:rounded-3xl" aria-label={p.title}>
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className={`w-full object-cover transition duration-700 group-hover:scale-105 ${["aspect-[3/4]", "aspect-square", "aspect-[4/5]"][i % 3]}`}
          />
          <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/75 to-transparent p-2.5 pt-8 text-[11px] font-semibold leading-snug text-white opacity-0 transition group-hover:opacity-100 sm:text-sm">
            {p.title}
          </span>
        </Link>
      ))}
    </motion.div>
  );
}

export function PhotoWall({ photos }: { photos: WallPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 });
  const a = useParallax(p, 40, -120, reduce);
  const b = useParallax(p, 140, -260, reduce);
  const c = useParallax(p, 0, -60, reduce);
  // Repeat the set so every column runs past the bottom edge while it drifts.
  const filled = [...photos, ...photos.slice(0, 6)];
  const cols = [0, 1, 2].map((k) => filled.filter((_, i) => i % 3 === k));
  return (
    <section className="mt-24 overflow-hidden sm:mt-32">
      <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-3 px-5 sm:px-8">
        <div>
          <p className="font-mono text-xs text-coral">[ PHOTO WALL ]</p>
          <h2 className="font-display mt-3 text-[38px] font-light leading-none sm:text-6xl">
            Moments <i className="text-accent">in photos</i>
          </h2>
        </div>
        <Link href="/gallery" className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Full gallery <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div ref={ref} className="mx-auto mt-8 grid max-h-[860px] max-w-5xl grid-cols-3 gap-2.5 overflow-clip px-2.5 [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:max-h-[1100px] sm:gap-4 sm:px-8">
        <WallColumn photos={cols[0]} y={a} offset="" />
        <WallColumn photos={cols[1]} y={b} offset="-mt-10" />
        <WallColumn photos={cols[2]} y={c} offset="mt-6" />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Save my contact
export function SaveContact({ name, role, phone, email, cardUrl }: { name: string; role: string; phone: string; email: string; cardUrl: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto mt-16 max-w-md px-3.5 [perspective:1200px] sm:mt-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, rotateX: 35, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="flex items-center gap-4 rounded-[28px] border border-border bg-surface p-4 shadow-[0_24px_60px_-30px_rgb(16_42_51/0.45)] sm:p-5"
      >
        <a href={cardUrl} target="_blank" rel="noreferrer" className="shrink-0 rounded-2xl border border-border bg-white p-1.5" aria-label="Open the digital card">
          <img src="/images/nikki-qr.png" alt="QR code for the digital card" className="size-24 sm:size-28" />
        </a>
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-wider text-coral">MEET AT AN EVENT?</p>
          <p className="font-display mt-1 text-xl leading-tight">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {phone} · {email}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="/contact.vcf" download className="rounded-full bg-[#102a33] px-4 py-2 text-xs font-bold text-white dark:bg-[#d8ede7] dark:text-[#102a33]">
              Save to phone
            </a>
            <a href={cardUrl} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-xs font-bold">
              Digital card ↗
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
