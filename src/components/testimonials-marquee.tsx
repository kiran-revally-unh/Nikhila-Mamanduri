// Testimonials marquee (inspired by 21st.dev "Testimonials with Marquee").
import { Quote } from "lucide-react";
import { testimonials } from "@/content/profile";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-80 shrink-0 rounded-2xl border border-border bg-surface p-6">
      <Quote className="size-5 text-accent" />
      <blockquote className="mt-3 text-sm text-pretty">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {t.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
        </span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsMarquee() {
  const row = [...testimonials, ...testimonials];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export { TestimonialCard };
