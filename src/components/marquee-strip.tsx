const words = [
  "Healthcare operations",
  "Patient experience",
  "Project management",
  "Team leadership",
  "Process improvement",
  "Community building",
];

export function MarqueeStrip() {
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/60 py-6 backdrop-blur [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-10 [--duration:50s]" aria-hidden>
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl italic text-foreground/80 sm:text-4xl">
            {w}
            <span className="size-2 rounded-full bg-coral-bright" />
          </span>
        ))}
      </div>
      <p className="sr-only">{words.join(", ")}</p>
    </div>
  );
}
