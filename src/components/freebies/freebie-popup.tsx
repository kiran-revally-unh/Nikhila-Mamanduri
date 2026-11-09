"use client";

// Free-guide popup. Shows once per visitor after ~20s or half a page of scrolling
// (never on the booking or resources pages). Step 1 asks who you are; step 2 offers
// the guides for that audience. "Maybe later" hides it for 14 days.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Briefcase, Stethoscope, X } from "lucide-react";
import { audiences, freebies, type Audience } from "@/content/freebies";
import { FreebieForm } from "./freebie-form";

const KEY = "nm-freebie";
const SNOOZE_DAYS = 14;
const ease = [0.22, 1, 0.36, 1] as const;

function allowed() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "done") return false;
    if (v && Date.now() - Number(v) < SNOOZE_DAYS * 864e5) return false;
  } catch {}
  return true;
}

export function FreebiePopup() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<Audience | null>(null);

  useEffect(() => {
    if (open || !allowed() || pathname.startsWith("/book") || pathname.startsWith("/resources")) return;
    let fired = false;
    const show = () => {
      if (fired || !allowed()) return;
      fired = true;
      setOpen(true);
    };
    const timer = setTimeout(show, 20000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.5) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && later();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const later = () => {
    try {
      if (localStorage.getItem(KEY) !== "done") localStorage.setItem(KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  };

  const guides = audience ? freebies.filter((f) => f.audience === audience) : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button aria-label="Close" onClick={later} className="absolute inset-0 bg-[#0a1c22]/55 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Free guides from Nikki"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative max-h-[88svh] w-full max-w-md overflow-y-auto rounded-[28px] bg-background shadow-2xl sm:max-w-3xl sm:rounded-[30px]"
            data-lenis-prevent
          >
            <button onClick={later} aria-label="Close" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#102a33] shadow backdrop-blur hover:bg-white">
              <X className="size-5" />
            </button>

            <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
              {/* Visual side */}
              <div className="relative h-44 overflow-hidden bg-[#102a33] sm:h-auto">
                <div aria-hidden className="absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,#e97860_0%,transparent_70%)] opacity-60" />
                <div aria-hidden className="absolute -bottom-20 -left-16 size-72 rounded-full bg-[radial-gradient(circle,#216f70_0%,transparent_70%)]" />
                <p className="font-display relative p-5 text-[28px] font-extrabold leading-[0.9] text-white/90 sm:p-7 sm:text-[34px]">
                  Free
                  <br />
                  <i className="font-light text-[#f6b4a3]">guides</i>
                </p>
                <img src="/images/nikki-cutout.webp" alt="" className="absolute bottom-0 right-16 h-[92%] w-auto max-w-none sm:left-1/2 sm:right-auto sm:h-auto sm:w-[120%] sm:-translate-x-1/2" />
              </div>

              {/* Content side */}
              <div className="p-5 sm:p-8">
                <p className="font-mono text-[10px] tracking-wider text-coral">FREE GUIDES FROM NIKKI</p>

                <AnimatePresence mode="wait" initial={false}>
                  {!audience ? (
                    <motion.div key="who" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }}>
                      <h2 className="font-display mt-3 text-[28px] font-normal leading-[1.08] sm:text-[34px]">
                        Get a free guide <i className="text-accent">made for you.</i>
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Practical checklists and templates from Nikki&apos;s work in healthcare operations — free and instant. Which describes you?
                      </p>
                      <div className="mt-5 grid gap-2.5">
                        {(Object.keys(audiences) as Audience[]).map((a, i) => (
                          <motion.button
                            key={a}
                            onClick={() => setAudience(a)}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            whileHover={reduce ? undefined : { y: -2 }}
                            className="group flex items-center gap-3.5 rounded-2xl border border-border p-4 text-left transition hover:border-accent hover:bg-accent-soft/40"
                          >
                            <span className={`grid size-11 shrink-0 place-items-center rounded-xl text-white ${a === "clinic" ? "bg-[#216f70]" : "bg-coral-bright"}`}>
                              {a === "clinic" ? <Stethoscope className="size-5" /> : <Briefcase className="size-5" />}
                            </span>
                            <span className="min-w-0">
                              <span className="block font-bold">{audiences[a].label}</span>
                              <span className="block text-xs text-muted-foreground">
                                {freebies.filter((f) => f.audience === a).length} guides · {audiences[a].description}
                              </span>
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      <button onClick={later} className="mt-4 w-full text-center text-sm font-semibold text-accent hover:underline">
                        Maybe later
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="pick" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3, ease }}>
                      <button onClick={() => setAudience(null)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="size-3.5" /> Back
                      </button>
                      <h2 className="font-display mt-1 text-[26px] font-normal leading-tight">
                        {audience === "clinic" ? (
                          <>Pick your <i className="text-accent">clinic toolkit</i></>
                        ) : (
                          <>Pick your <i className="text-accent">career guide</i></>
                        )}
                      </h2>
                      <div className="mt-4">
                        <FreebieForm guides={guides} />
                      </div>
                      <button onClick={later} className="mt-3 w-full text-center text-sm font-semibold text-accent hover:underline">
                        Maybe later
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
