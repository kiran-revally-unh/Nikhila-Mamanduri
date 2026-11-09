"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <span className={className} />;
  const time = now.toLocaleTimeString("en-US", { timeZone: profile.timezone, hour: "numeric", minute: "2-digit" });
  return (
    <span className={className}>
      Thousand Oaks · <span className="tabular-nums">{time}</span>
    </span>
  );
}
