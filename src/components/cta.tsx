// Booking CTA (cta.gallery style): headline + actions on the left, a booking preview
// card on the right
import Link from "next/link";
import { ArrowRight, CalendarCheck, Clock } from "lucide-react";
import { sessionTypes } from "@/content/profile";
import { Container } from "./ui";

export function CTA({
  title = "Let's build better systems together",
  text = "Have a clinic workflow, a project or a career question? Book a free intro call — it takes less than a minute.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Container className="mt-28">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#102a33] px-6 py-14 text-[#eef5f2] shadow-2xl shadow-[#102a33]/30 sm:px-12 lg:px-16">
        <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-96 rounded-full bg-[#216f70]/60 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 right-0 -z-10 size-96 rounded-full bg-[#e97860]/25 blur-3xl" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#5fc596] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#5fc596]" />
              </span>
              Booking this week
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] text-balance sm:text-6xl">{title}</h2>
            <p className="mt-5 max-w-lg text-lg text-pretty text-white/70">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6cc3b7] px-6 py-3.5 text-sm font-semibold text-[#0a1c22] shadow-lg shadow-[#6cc3b7]/20 transition hover:bg-[#86d3c8]"
              >
                <CalendarCheck className="size-4" /> Book a free call
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10">
                Send a message
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="rotate-[-2deg] rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl transition hover:rotate-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Pick a session</p>
              <ul className="mt-4 space-y-2.5">
                {sessionTypes.map((s, i) => (
                  <li key={s.id}>
                    <Link
                      href={`/book?session=${s.id}`}
                      className={
                        "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition " +
                        (i === 0 ? "border-[#6cc3b7] bg-[#6cc3b7]/15" : "border-white/10 bg-white/[0.04] hover:border-white/30")
                      }
                    >
                      <span>
                        <span className="block font-semibold">{s.title}</span>
                        <span className="flex items-center gap-1 text-xs text-white/60"><Clock className="size-3" /> {s.minutes} min</span>
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">{s.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-xs text-white/50">Times shown in your timezone</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
