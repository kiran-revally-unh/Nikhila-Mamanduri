"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  if (state === "done")
    return (
      <div className="grid place-items-center rounded-2xl border border-border bg-surface p-10 text-center">
        <Check className="size-8 text-emerald-500" />
        <p className="mt-3 font-semibold">Message sent — thank you!</p>
        <p className="text-sm text-muted-foreground">I usually reply within two working days.</p>
      </div>
    );
  const input = "w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent";
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm"><span className="mb-1.5 block font-medium">Name</span><input name="name" required className={input} /></label>
        <label className="block text-sm"><span className="mb-1.5 block font-medium">Email</span><input name="email" type="email" required className={input} /></label>
      </div>
      <label className="block text-sm"><span className="mb-1.5 block font-medium">Subject</span><input name="subject" className={input} /></label>
      <label className="block text-sm"><span className="mb-1.5 block font-medium">Message</span><textarea name="message" rows={5} required className={input} /></label>
      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state === "error" && <p className="text-sm text-red-500">Something went wrong. Please email me directly.</p>}
      <button disabled={state === "sending"} className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
