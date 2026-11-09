import { profile } from "@/content/profile";
import { Reveal } from "./reveal";

export function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
      {profile.stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06} className="bg-surface p-6 text-center">
          <dd className="text-3xl font-semibold tracking-tight text-accent">{s.value}</dd>
          <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
        </Reveal>
      ))}
    </dl>
  );
}
