"use client";

import { useState } from "react";

export function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  if (state === "done") return <p className="text-sm text-accent">Thanks! You&apos;re on the list.</p>;
  return (
    <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
      <label htmlFor="nl-email" className="sr-only">Email</label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
      />
      <button disabled={state === "sending"} className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60">
        Subscribe
      </button>
      {state === "error" && <span className="sr-only">Something went wrong</span>}
    </form>
  );
}
