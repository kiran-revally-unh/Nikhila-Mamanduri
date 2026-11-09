"use client";

// A free guide on the Resources page: cover tilts on hover; "Get the guide" flips
// the card to the email form.
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { freebieCover, type Freebie } from "@/content/freebies";
import { FreebieForm } from "./freebie-form";

export function ResourceCard({ guide, index }: { guide: Freebie; index: number }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-[0_20px_50px_-35px_rgb(16_42_51/0.5)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="group bg-[#102a33]/5 px-10 pt-8 [perspective:900px]">
              <motion.img
                src={freebieCover(guide.slug)}
                alt={`Cover of ${guide.title}`}
                loading="lazy"
                whileHover={reduce ? undefined : { rotateY: -12, rotateX: 4, y: -6 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="mx-auto aspect-[8.5/11] w-full max-w-[220px] rounded-t-lg object-cover shadow-[0_-10px_40px_-10px_rgb(16_42_51/0.5)]"
              />
            </div>
            <div className="p-5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                <FileText className="size-3.5" /> PDF · {guide.pages} pages · Free
              </p>
              <h3 className="font-display mt-1.5 text-xl leading-tight">{guide.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{guide.blurb}</p>
              <button
                onClick={() => setOpen(true)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#102a33] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 dark:bg-[#d8ede7] dark:text-[#102a33]"
              >
                <Download className="size-4" /> Get the guide
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-5">
            <button onClick={() => setOpen(false)} className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" /> Back
            </button>
            <h3 className="font-display mt-2 text-xl leading-tight">{guide.title}</h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">Where should we send it? The download starts right away.</p>
            <FreebieForm guides={[guide]} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
