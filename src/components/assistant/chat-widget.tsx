"use client";

// Floating site assistant: replaces the WhatsApp button. Streams answers from
// /api/chat, shows quick replies, typing dots and interactive cards (booking,
// contact, case study, talk-to-Nikki handoff).
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, CalendarCheck, Clock, Download, Mail, MessageCircle, Phone, RotateCcw, Square, X } from "lucide-react";
import { LinkedInIcon, WhatsAppIcon } from "../icons";

const ease = [0.22, 1, 0.36, 1] as const;
const AVATAR = "/images/profile.jpg";

const starters = [
  "Who is Nikki?",
  "Book a call",
  "Show me her best work",
  "What's her experience?",
  "How can I contact her?",
  "Talk to Nikki directly",
];

const followUps: Record<string, string[]> = {
  showBookingOptions: ["What happens on the intro call?", "Talk to Nikki directly"],
  showContactCard: ["Book a call", "What's her experience?"],
  showCaseStudy: ["Show me another project", "Book a call"],
  connectWithNikki: ["What's her experience?", "Show me her best work"],
  none: ["Show me her best work", "Book a call", "Talk to Nikki directly"],
};

type ToolPart = { type: string; state: string; output?: unknown; toolCallId: string };

// --- tiny formatter: **bold**, /internal-links and https links
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\/(?:about|experience|work|services|book|blog|gallery|contact)\b(?:\/[\w-]+)?)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("http")) return <a key={i} href={p} target="_blank" rel="noreferrer" className="underline underline-offset-2">{p.replace(/^https?:\/\//, "")}</a>;
        if (p.startsWith("/")) return <Link key={i} href={p} className="font-semibold text-accent underline underline-offset-2">{p}</Link>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

// ---------------------------------------------------------------- cards
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease }}
      className="mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_30px_-20px_rgb(16_42_51/0.5)]"
    >
      {children}
    </motion.div>
  );
}

function BookingCard({ data }: { data: { sessions: { id: string; title: string; minutes: number; price: string; description: string }[] } }) {
  return (
    <CardShell>
      <p className="border-b border-border px-3.5 py-2 font-mono text-[10px] tracking-wider text-coral">PICK A SESSION</p>
      {data.sessions.map((s, i) => (
        <motion.div key={s.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
          <Link href={`/book?session=${s.id}`} className="group flex items-center justify-between gap-3 border-b border-border px-3.5 py-2.5 last:border-0 hover:bg-muted">
            <span className="min-w-0">
              <span className="block text-sm font-semibold group-hover:text-accent">{s.title}</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Clock className="size-3" /> {s.minutes} min · {s.description}</span>
            </span>
            <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">{s.price}</span>
          </Link>
        </motion.div>
      ))}
    </CardShell>
  );
}

function ContactCard({ data }: { data: { name: string; role: string; email: string; phone: string; tel: string; linkedin: string; whatsapp: string | null; vcard: string } }) {
  const btn = "flex items-center justify-center gap-1.5 rounded-xl border border-border px-2 py-2 text-xs font-semibold transition hover:border-accent hover:text-accent";
  return (
    <CardShell>
      <div className="flex items-center gap-3 p-3.5">
        <img src={AVATAR} alt="" className="size-11 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="font-display text-base leading-tight">{data.name}</p>
          <p className="truncate text-[11px] text-muted-foreground">{data.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3.5 pb-3.5">
        <a href={data.vcard} download className={`${btn} col-span-2 border-transparent bg-[#102a33] text-white hover:text-white dark:bg-[#d8ede7] dark:text-[#102a33]`}><Download className="size-3.5" /> Save to phone</a>
        <a href={`mailto:${data.email}`} className={btn}><Mail className="size-3.5" /> Email</a>
        <a href={`tel:${data.tel}`} className={btn}><Phone className="size-3.5" /> {data.phone}</a>
        <a href={data.linkedin} target="_blank" rel="noreferrer" className={btn}><LinkedInIcon /> LinkedIn</a>
        {data.whatsapp && <a href={data.whatsapp} target="_blank" rel="noreferrer" className={btn}><WhatsAppIcon /> WhatsApp</a>}
      </div>
    </CardShell>
  );
}

function CaseCard({ data }: { data: { slug: string; title: string; category: string; year: string; summary: string; metrics: { value: string; label: string }[]; image: string | null } }) {
  return (
    <CardShell>
      <Link href={`/work/${data.slug}`} className="group block">
        <div className="bg-[#102a33] p-3.5 text-white">
          <p className="font-mono text-[10px] text-[#f0937e]">{data.category.toUpperCase()} · {data.year}</p>
          <p className="font-display mt-1 text-lg leading-tight">{data.title}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {data.metrics.map((m) => (
              <div key={m.label} className="border-t border-white/20 pt-1.5">
                <p className="text-2xl font-black tracking-tight">{m.value}</p>
                <p className="text-[10px] text-white/70">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-accent">
          Read the case study <span className="transition group-hover:translate-x-0.5">→</span>
        </p>
      </Link>
    </CardShell>
  );
}

function HandoffCard({ data }: { data: { whatsapp: string | null; email: string; book: string; linkedin: string } }) {
  const row = "flex items-center gap-3 border-b border-border px-3.5 py-2.5 text-sm font-semibold last:border-0 hover:bg-muted";
  return (
    <CardShell>
      <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
        <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-success" /></span>
        <p className="text-xs font-semibold">Reach Nikki directly</p>
      </div>
      {data.whatsapp && (
        <a href={data.whatsapp} target="_blank" rel="noreferrer" className={row}>
          <span className="grid size-8 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon /></span>
          <span>WhatsApp<span className="block text-[11px] font-normal text-muted-foreground">Fastest — message is pre-filled</span></span>
        </a>
      )}
      <a href={data.email} className={row}>
        <span className="grid size-8 place-items-center rounded-full bg-coral-bright text-white"><Mail className="size-4" /></span>
        <span>Email<span className="block text-[11px] font-normal text-muted-foreground">Message goes straight to her inbox</span></span>
      </a>
      <Link href={data.book} className={row}>
        <span className="grid size-8 place-items-center rounded-full bg-[#102a33] text-white"><CalendarCheck className="size-4" /></span>
        <span>Book a free call<span className="block text-[11px] font-normal text-muted-foreground">Pick a time that suits you</span></span>
      </Link>
    </CardShell>
  );
}

function ToolCard({ part }: { part: ToolPart }) {
  if (part.state !== "output-available") {
    return <div className="mt-2 h-24 animate-pulse rounded-2xl bg-muted" />;
  }
  const out = part.output as never;
  switch (part.type) {
    case "tool-showBookingOptions": return <BookingCard data={out} />;
    case "tool-showContactCard": return <ContactCard data={out} />;
    case "tool-showCaseStudy": return <CaseCard data={out} />;
    case "tool-connectWithNikki": return <HandoffCard data={out} />;
    default: return null;
  }
}

function Typing() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-3.5 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- widget
export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, setMessages, error, regenerate } = useChat();
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busy = status === "submitted" || status === "streaming";

  // Teaser bubble a few seconds after load, unless dismissed before.
  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem("nm-chat-seen") === "1"; } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 3500);
    return () => clearTimeout(t);
  }, []);

  const markSeen = () => {
    setTeaser(false);
    try { localStorage.setItem("nm-chat-seen", "1"); } catch {}
  };

  useEffect(() => {
    if (!open) return;
    markSeen();
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    if (mobile) document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, status, reduce]);

  const send = (text: string) => {
    const t = text.trim().slice(0, 1000);
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  const last = messages[messages.length - 1];
  const lastTool = last?.role === "assistant" ? (last.parts.find((p) => p.type.startsWith("tool-")) as ToolPart | undefined)?.type.replace("tool-", "") : undefined;
  const chips = status === "ready" && last?.role === "assistant" ? followUps[lastTool ?? "none"] ?? followUps.none : [];

  return (
    <>
      {/* Teaser */}
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.4, ease }}
            className="fixed bottom-[88px] right-4 z-40 w-[250px] origin-bottom-right rounded-2xl rounded-br-md border border-border bg-surface p-3.5 pr-8 shadow-[0_20px_50px_-20px_rgb(16_42_51/0.5)]"
          >
            <button onClick={markSeen} aria-label="Dismiss" className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted-foreground hover:bg-muted"><X className="size-3.5" /></button>
            <button onClick={() => setOpen(true)} className="text-left">
              <p className="text-sm font-semibold">Hi there! 👋</p>
              <p className="mt-0.5 text-xs text-muted-foreground">I&apos;m Nikki&apos;s assistant — ask me anything or book a call.</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Nikki's assistant"}
        aria-expanded={open}
        initial={reduce ? false : { scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-4 right-4 z-[61] size-14 rounded-full bg-[#102a33] text-white shadow-[0_14px_36px_-10px_rgb(16_42_51/0.7)] ${open ? "max-sm:hidden" : ""}`}
      >
        {!open && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#216f70] opacity-30 [animation-duration:2.5s]" />}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="grid size-full place-items-center">
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="a" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="relative grid size-full place-items-center">
              <img src={AVATAR} alt="" className="size-[52px] rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 grid size-6 place-items-center rounded-full border-2 border-white bg-coral-bright"><MessageCircle className="size-3" /></span>
              <span className="absolute right-0.5 top-0.5 size-3 rounded-full border-2 border-white bg-success" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Nikki's assistant"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[60] flex origin-bottom-right flex-col overflow-hidden bg-background sm:inset-auto sm:bottom-[88px] sm:right-4 sm:h-[min(640px,calc(100svh-120px))] sm:w-[400px] sm:rounded-[28px] sm:border sm:border-border sm:shadow-[0_30px_80px_-30px_rgb(16_42_51/0.6)]"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[#102a33] px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] text-white">
              <div aria-hidden className="absolute -right-10 -top-16 size-44 rounded-full bg-[radial-gradient(circle,#e97860_0%,transparent_70%)] opacity-50" />
              <div aria-hidden className="absolute -bottom-20 -left-10 size-48 rounded-full bg-[radial-gradient(circle,#216f70_0%,transparent_70%)] opacity-80" />
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <img src={AVATAR} alt="" className="size-11 rounded-full object-cover ring-2 ring-white/20" />
                  <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#102a33] bg-success" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">Nikki&apos;s assistant</p>
                  <p className="text-[11px] text-white/65">Online · replies instantly</p>
                </div>
                {messages.length > 0 && (
                  <button onClick={() => { stop(); setMessages([]); }} aria-label="Start over" className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><RotateCcw className="size-4" /></button>
                )}
                <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X className="size-4" /></button>
              </div>
              <button onClick={() => send("I'd like to talk to Nikki directly")} className="relative mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/20">
                <span className="size-1.5 animate-pulse rounded-full bg-success" /> Talk to Nikki directly
              </button>
            </div>

            {/* Messages */}
            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4" data-lenis-prevent>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-end gap-2">
                <img src={AVATAR} alt="" className="size-7 shrink-0 rounded-full object-cover" />
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed">
                  Hi! 👋 I&apos;m Nikki&apos;s assistant. I can tell you about her healthcare operations work, share her results, book a call, or connect you with her directly.
                </div>
              </motion.div>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {starters.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      onClick={() => send(s)}
                      className="rounded-full border border-accent/30 bg-accent-soft/60 px-3 py-1.5 text-xs font-semibold text-accent transition hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}

              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className={m.role === "user" ? "flex justify-end" : "flex items-end gap-2"}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#216f70] px-3.5 py-2.5 text-sm text-white">
                      {m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null))}
                    </div>
                  ) : (
                    <>
                      <img src={AVATAR} alt="" className="mb-0.5 size-7 shrink-0 self-end rounded-full object-cover" />
                      <div className="min-w-0 max-w-[85%] flex-1">
                        {m.parts.map((p, i) => {
                          if (p.type === "text") {
                            return p.text ? (
                              <div key={i} className="mt-1 w-fit whitespace-pre-wrap rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-sm leading-relaxed first:mt-0">
                                <RichText text={p.text} />
                              </div>
                            ) : null;
                          }
                          if (p.type.startsWith("tool-")) return <ToolCard key={i} part={p as unknown as ToolPart} />;
                          return null;
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}

              {status === "submitted" && (
                <div className="flex items-end gap-2">
                  <img src={AVATAR} alt="" className="size-7 shrink-0 rounded-full object-cover" />
                  <Typing />
                </div>
              )}

              {error && (
                <div className="ml-9 rounded-2xl border border-coral/30 bg-coral/5 px-3.5 py-2.5 text-xs">
                  Something went wrong.{" "}
                  <button onClick={() => regenerate()} className="font-semibold text-coral underline">Try again</button>
                </div>
              )}

              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 pl-9">
                  {chips.map((s, i) => (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-accent hover:text-accent"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="border-t border-border bg-background px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-4 pr-1 focus-within:border-accent">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Nikki's work…"
                  maxLength={1000}
                  aria-label="Message"
                  className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
                />
                {busy ? (
                  <button type="button" onClick={() => stop()} aria-label="Stop" className="grid size-9 place-items-center rounded-full bg-muted"><Square className="size-3.5 fill-current" /></button>
                ) : (
                  <motion.button
                    type="submit"
                    aria-label="Send"
                    disabled={!input.trim()}
                    whileTap={{ scale: 0.9 }}
                    className="grid size-9 place-items-center rounded-full bg-[#102a33] text-white transition disabled:opacity-30 dark:bg-[#d8ede7] dark:text-[#102a33]"
                  >
                    <ArrowUp className="size-4" />
                  </motion.button>
                )}
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground">AI assistant · answers come from Nikki&apos;s site · may make mistakes</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
