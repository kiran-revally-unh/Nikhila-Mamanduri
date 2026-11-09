"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import type { GalleryItem } from "@/content/profile";

export function GalleryGrid({ items: gallery }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, gallery.length]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {gallery.map((g, i) => (
          <button
            key={g.src}
            onClick={() => setOpen(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl border border-border bg-surface text-left"
          >
            <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition duration-700 group-hover:scale-[1.03]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
              {g.caption}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={gallery[open].caption}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white" onClick={() => setOpen(null)}>
              <X className="size-5" />
            </button>
            <motion.figure initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <img src={gallery[open].src} alt={gallery[open].alt} className="mx-auto max-h-[78vh] rounded-2xl object-contain" />
              <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-white/80">
                {gallery[open].caption}
                {gallery[open].href && (
                  <Link href={gallery[open].href!} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 font-semibold text-white hover:bg-white/25">
                    View post <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
