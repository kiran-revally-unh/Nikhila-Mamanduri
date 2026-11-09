import { profile } from "@/content/profile";
import { Reveal } from "./reveal";

export function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {profile.stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.06}
          className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-surface/90 p-5 shadow-[0_20px_40px_-24px_rgb(16_42_51/0.3)] backdrop-blur transition hover:-translate-y-1 sm:p-6"
        >
          <dd className="font-serif text-4xl tracking-tight text-accent">{s.value}</dd>
          <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
        </Reveal>
      ))}
    </dl>
  );
}
