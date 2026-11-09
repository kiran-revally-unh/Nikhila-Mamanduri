"use client";

// Scroll-beam timeline (inspired by 21st.dev "timeline" by manuarora700).
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Experience } from "@/content/profile";
import { Tag } from "./ui";

export function Timeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setHeight(e.contentRect.height));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 20%", "end 60%"] });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {items.map((item, i) => (
        <div key={i} className="flex gap-6 pb-14 md:gap-10">
          <div className="sticky top-28 z-10 flex h-fit w-10 shrink-0 flex-col items-center md:w-48 md:flex-row md:items-start md:gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background">
              <span className="size-3 rounded-full border border-border bg-muted" />
            </div>
            <p className="hidden pt-1.5 text-sm font-semibold text-muted-foreground md:block">
              {item.start} — {item.end}
            </p>
          </div>
          <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface p-6">
            <p className="mb-1 text-sm text-muted-foreground md:hidden">
              {item.start} — {item.end}
            </p>
            <h3 className="text-xl font-semibold">{item.role}</h3>
            <p className="text-sm text-muted-foreground">
              {item.company}
              {item.type ? ` · ${item.type}` : ""} · {item.location}
            </p>
            <p className="mt-4 text-pretty">{item.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {item.highlights.map((h, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.skills.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div
        style={{ height }}
        className="absolute left-5 top-0 w-0.5 -translate-x-1/2 overflow-hidden bg-border [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
      >
        <motion.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-gradient-to-b from-transparent via-accent to-fuchsia-500"
        />
      </div>
    </div>
  );
}
