"use client";

// Email capture for Nikki's free guides: pick a guide (when there's more than one),
// enter name + email, then the PDF downloads straight away and Nikki is notified.
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarCheck, Check, Download, Loader2 } from "lucide-react";
import { freebieCover, type Freebie } from "@/content/freebies";
import { cn } from "@/lib/utils";

export function FreebieForm({
  guides,
  defaultSlug,
  onDone,
  dark = false,
}: {
  guides: Freebie[];
  defaultSlug?: string;
  onDone?: () => void;
  dark?: boolean;
}) {
  const [slug, setSlug] = useState(defaultSlug ?? guides[0]?.slug);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; title: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/freebie", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, name, email, page: window.location.pathname }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
      setState("done");
      try {
        localStorage.setItem("nm-freebie", "done");
      } catch {}
      // Start the download right away.
      const a = document.createElement("a");
      a.href = data.url;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      a.remove();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  };

  const field = cn(
    "w-full rounded-2xl border px-4 py-3 text-base outline-none transition sm:text-sm",
    dark ? "border-white/15 bg-white/10 text-white placeholder:text-white/50 focus:border-[#6cc3b7]" : "border-border bg-surface placeholder:text-muted-foreground focus:border-accent",
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "done" && result ? (
        <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="mx-auto grid size-14 place-items-center rounded-full bg-success text-white"
          >
            <Check className="size-7" />
          </motion.div>
          <p className="font-display mt-4 text-2xl">It&apos;s yours!</p>
          <p className={cn("mt-1 text-sm", dark ? "text-white/70" : "text-muted-foreground")}>
            <b>{result.title}</b> is downloading. If it didn&apos;t start, use the button below.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a href={result.url} download className={cn("inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold", dark ? "bg-white text-[#102a33]" : "bg-[#102a33] text-white dark:bg-[#d8ede7] dark:text-[#102a33]")}>
              <Download className="size-4" /> Download the PDF
            </a>
            <Link href="/book" className={cn("inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold", dark ? "border-white/20" : "border-border")}>
              <CalendarCheck className="size-4" /> Book a free call with Nikki
            </Link>
            <Link href="/resources" className={cn("text-xs font-semibold underline underline-offset-2", dark ? "text-white/70" : "text-accent")}>
              See all 6 free guides
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {guides.length > 1 && (
            <div role="radiogroup" aria-label="Choose a guide" className="grid gap-2">
              {guides.map((g, i) => {
                const on = g.slug === slug;
                return (
                  <motion.button
                    type="button"
                    role="radio"
                    aria-checked={on}
                    key={g.slug}
                    onClick={() => setSlug(g.slug)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border p-2 pr-3 text-left transition",
                      on ? (dark ? "border-[#6cc3b7] bg-[#6cc3b7]/15" : "border-accent bg-accent-soft/60") : dark ? "border-white/10 hover:border-white/30" : "border-border hover:border-accent/50",
                    )}
                  >
                    <img src={freebieCover(g.slug)} alt="" className="h-14 w-11 shrink-0 rounded-md object-cover shadow" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-tight">{g.title}</span>
                      <span className={cn("line-clamp-1 text-[11px]", dark ? "text-white/60" : "text-muted-foreground")}>{g.blurb}</span>
                    </span>
                    <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border-2", on ? "border-accent bg-accent text-white" : dark ? "border-white/30" : "border-border")}>
                      {on && <Check className="size-3" />}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="First name (optional)" autoComplete="given-name" maxLength={80} aria-label="First name" />
          <input className={field} value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="Email address" type="email" autoComplete="email" required maxLength={200} aria-label="Email address" />
          {error && <p className="text-xs font-semibold text-coral">{error}</p>}
          <motion.button
            type="submit"
            disabled={state === "sending"}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#216f70] px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#1b5c5d] disabled:opacity-70"
          >
            {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Get the free guide
            <ArrowRight className="size-4" />
          </motion.button>
          <p className={cn("text-center text-[11px]", dark ? "text-white/50" : "text-muted-foreground")}>
            Free and instant. Your email goes only to Nikki — never shared, no spam.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
