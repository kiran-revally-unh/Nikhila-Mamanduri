"use client";

// Client half of the spam guard (see src/lib/spam.ts): a hidden honeypot field and
// how long the form has been open, sent with every submission.
import { useEffect, useRef } from "react";

export function useSpamGuard() {
  const openedAt = useRef<number>(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  /** Extra fields to merge into the JSON body. */
  const guard = (form?: HTMLFormElement | null) => ({
    website: (form?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
    elapsed: openedAt.current ? Date.now() - openedAt.current : -1,
  });
  return guard;
}

/** Invisible field real people never fill in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
