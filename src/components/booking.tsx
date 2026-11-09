"use client";

// Booking flow (inspired by 21st.dev "booking-slot-calendar" / "time-slot-picker").
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, CalendarPlus, Check, ChevronLeft, ChevronRight, Clock, Globe } from "lucide-react";
import { availability, profile, sessionTypes } from "@/content/profile";
import { icsFor, slotsForDay, zonedDate } from "@/lib/slots";
import { cn } from "@/lib/utils";
import { CalEmbed } from "./cal-embed";

type Step = "session" | "time" | "details" | "done";
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Booking({ initialSession, calLinks = {} }: { initialSession?: string; calLinks?: Record<string, string | undefined> }) {
  const [sessionId, setSessionId] = useState(
    sessionTypes.some((s) => s.id === initialSession) ? initialSession! : sessionTypes[0].id,
  );
  const [step, setStep] = useState<Step>(initialSession ? "time" : "session");
  const [slot, setSlot] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const base = sessionTypes.find((s) => s.id === sessionId)!;
  const session = { ...base, calLink: calLinks[base.id] };
  const visitorTz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!slot) return;
    setSending(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, session: session.id, start: slot.toISOString(), timezone: visitorTz }),
    }).catch(() => null);
    setSending(false);
    if (res?.ok) setStep("done");
    else setError("Couldn't send your booking. Please try again or use the contact page.");
  }

  function downloadIcs() {
    if (!slot) return;
    const blob = new Blob(
      [icsFor({ start: slot, minutes: session.minutes, title: `${session.title} with ${profile.name}`, description: session.description })],
      { type: "text/calendar" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "booking.ics";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[280px_1fr]">
      <aside className="border-b border-border bg-muted/40 p-6 md:border-b-0 md:border-r">
        <img src={profile.photo} alt="" className="size-14 rounded-full object-cover" />
        <p className="mt-3 text-sm text-muted-foreground">{profile.name}</p>
        <h2 className="text-xl font-semibold">{session.title}</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Clock className="size-4" /> {session.minutes} min · {session.price}</li>
          <li className="flex items-center gap-2"><Globe className="size-4" /> {visitorTz}</li>
          {slot && (
            <li className="flex items-center gap-2 font-medium text-foreground">
              <CalendarPlus className="size-4" />
              {slot.toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}
            </li>
          )}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">{session.description}</p>
      </aside>

      <div className="min-h-[460px] p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {step === "session" && (
              <div>
                <h3 className="mb-4 font-semibold">Choose a session</h3>
                <div className="grid gap-3">
                  {sessionTypes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSessionId(s.id);
                        setSlot(null);
                        setStep("time");
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 text-left transition hover:border-accent",
                        s.id === sessionId ? "border-accent bg-accent-soft" : "border-border",
                      )}
                    >
                      <span>
                        <span className="block font-medium">{s.title}</span>
                        <span className="block text-sm text-muted-foreground">{s.description}</span>
                      </span>
                      <span className="shrink-0 pl-4 text-right text-sm">
                        <span className="block font-semibold">{s.minutes} min</span>
                        <span className="block text-muted-foreground">{s.price}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "time" && session.calLink && (
              <div>
                <button type="button" onClick={() => setStep("session")} className="mb-3 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="size-4" /> All sessions
                </button>
                <p className="mb-3 text-sm text-muted-foreground">
                  Pick a time below — you&apos;ll get a confirmation email with a <b>Google Meet</b> link and a calendar invite.
                </p>
                <CalEmbed calLink={session.calLink} namespace={session.id} />
              </div>
            )}

            {step === "time" && !session.calLink && (
              <TimePicker
                minutes={session.minutes}
                selected={slot}
                onBack={() => setStep("session")}
                onPick={(d) => {
                  setSlot(d);
                  setStep("details");
                }}
              />
            )}

            {step === "details" && (
              <form onSubmit={submit} className="space-y-4">
                <button type="button" onClick={() => setStep("time")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="size-4" /> Change time
                </button>
                <h3 className="font-semibold">Your details</h3>
                <p className="text-sm text-muted-foreground">Working sessions are confirmed personally — Nikki will reply by email to confirm the time and send a meeting link.</p>
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Company (optional)" name="company" />
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium">What would you like to discuss?</span>
                  <textarea name="notes" rows={4} className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
                </label>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button disabled={sending} className="w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground disabled:opacity-60">
                  {sending ? "Sending…" : "Send request"}
                </button>
              </form>
            )}

            {step === "done" && slot && (
              <div className="grid place-items-center py-12 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <Check className="size-7" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold">Request sent!</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  {session.title} on{" "}
                  {slot.toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}. Nikki will
                  reply by email to confirm and share a meeting link.
                </p>
                <button onClick={downloadIcs} className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
                  <CalendarPlus className="size-4" /> Add to calendar
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium">{label}</span>
      <input {...props} className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
    </label>
  );
}

function TimePicker({
  minutes,
  selected,
  onPick,
  onBack,
}: {
  minutes: number;
  selected: Date | null;
  onPick: (d: Date) => void;
  onBack: () => void;
}) {
  const tz = profile.timezone;
  const today = zonedDate(new Date(), tz);
  const [month, setMonth] = useState({ y: today.y, m: today.m });
  const [day, setDay] = useState<{ y: number; m: number; d: number } | null>(null);
  const opts = { tz, ...availability };
  const last = new Date(Date.UTC(today.y, today.m, today.d + availability.bookAheadDays));

  const cells = useMemo(() => {
    const first = new Date(Date.UTC(month.y, month.m, 1)).getUTCDay();
    const count = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    return [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)] as (number | null)[];
  }, [month]);

  const slots = day ? slotsForDay(day, minutes, opts) : [];
  const monthLabel = new Date(Date.UTC(month.y, month.m, 1)).toLocaleString(undefined, { month: "long", year: "numeric", timeZone: "UTC" });
  const canPrev = month.y > today.y || month.m > today.m;
  const canNext = Date.UTC(month.y, month.m + 1, 1) <= last.getTime();

  return (
    <div>
      <button type="button" onClick={onBack} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Change session
      </button>
      <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">{monthLabel}</h3>
            <div className="flex gap-1">
              <button aria-label="Previous month" disabled={!canPrev} onClick={() => setMonth(({ y, m }) => (m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }))} className="grid size-8 place-items-center rounded-full hover:bg-muted disabled:opacity-30">
                <ChevronLeft className="size-4" />
              </button>
              <button aria-label="Next month" disabled={!canNext} onClick={() => setMonth(({ y, m }) => (m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }))} className="grid size-8 place-items-center rounded-full hover:bg-muted disabled:opacity-30">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {WEEKDAYS.map((w) => <div key={w} className="py-1">{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const date = { y: month.y, m: month.m, d };
              const ts = Date.UTC(date.y, date.m, date.d);
              const inRange = ts >= Date.UTC(today.y, today.m, today.d) && ts <= last.getTime();
              const available = inRange && slotsForDay(date, minutes, opts).length > 0;
              const isSel = day && day.y === date.y && day.m === date.m && day.d === d;
              return (
                <button
                  key={i}
                  disabled={!available}
                  onClick={() => setDay(date)}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-medium transition",
                    isSel ? "bg-accent text-accent-foreground" : available ? "bg-accent-soft text-accent hover:ring-2 hover:ring-accent" : "text-muted-foreground/40",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">{day ? "Available times" : "Pick a date"}</p>
          <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
            {slots.map((s) => (
              <button
                key={s.toISOString()}
                onClick={() => onPick(s)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition hover:border-accent hover:text-accent",
                  selected?.getTime() === s.getTime() ? "border-accent text-accent" : "border-border",
                )}
              >
                {s.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
