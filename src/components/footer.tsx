// Premium portfolio footer (footer.design style): "Let's talk" call-out, link grid,
// then an oversized serif wordmark rising out of a brand gradient with glass bubbles.
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { LinkedInIcon } from "./icons";
import { Newsletter } from "./newsletter";
import { LocalTime } from "./local-time";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/experience", label: "Experience" },
      { href: "/skills", label: "Skills" },
      { href: "/work", label: "Work" },
    ],
  },
  {
    title: "Work with me",
    links: [
      { href: "/services", label: "Services" },
      { href: "/book", label: "Book a session" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/gallery", label: "Gallery" },
      { href: "/blog", label: "Blog" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

const bubbles = [
  { left: "8%", bottom: "18%", size: "4.5rem" },
  { left: "22%", bottom: "42%", size: "2.25rem" },
  { left: "41%", bottom: "8%", size: "5.5rem" },
  { left: "63%", bottom: "38%", size: "3rem" },
  { left: "78%", bottom: "12%", size: "6rem" },
  { left: "91%", bottom: "46%", size: "2.5rem" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-surface/70 backdrop-blur">
      {/* Let's talk */}
      <div className="mx-auto max-w-6xl px-4 pt-20 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-coral">Available for new conversations</p>
        <h2 className="mt-4 text-6xl leading-none sm:text-8xl">
          Let&apos;s <span className="italic text-accent">talk.</span>
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90">
            <CalendarCheck className="size-4" /> Book a call
          </Link>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:bg-muted">
            <Mail className="size-4" /> Email me
          </a>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <LinkedInIcon /> LinkedIn
          </a>
          <a href={profile.digitalCard} target="_blank" rel="noreferrer" className="hover:text-foreground">Digital card</a>
          <a href={`tel:${profile.phone}`} className="hover:text-foreground">{profile.phoneDisplay}</a>
        </div>
      </div>

      {/* Links + newsletter */}
      <div className="mx-auto mt-20 grid max-w-6xl gap-10 border-t border-border px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="font-semibold">Notes on healthcare operations</p>
          <p className="max-w-xs text-sm text-muted-foreground">Occasional updates on clinic workflows, patient experience and MHA life.</p>
          <Newsletter />
          <div className="flex items-center gap-3 pt-2">
            <img src="/images/nikki-qr.png" alt="QR code for Nikki's digital card" className="size-16 rounded-xl border border-border bg-white p-1" />
            <p className="text-xs text-muted-foreground">Scan to save
              <br />my digital card</p>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">
                    {l.label}
                    <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Wordmark over brand gradient */}
      <div className="relative">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a9dacf] via-45% to-[#216f70]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(60%_80%_at_30%_100%,#e97860cc,transparent_70%),radial-gradient(50%_70%_at_80%_100%,#f0b48a99,transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#102a33]/70 to-transparent" />
        {bubbles.map((b, i) => (
          <span
            key={i}
            aria-hidden
            className="animate-float absolute rounded-full border border-white/60 bg-gradient-to-br from-white/50 via-white/10 to-transparent shadow-[inset_-6px_-8px_16px_rgb(255_255_255/0.35),inset_4px_6px_10px_rgb(255_255_255/0.5)] backdrop-blur-[2px]"
            style={{ left: b.left, bottom: b.bottom, width: b.size, height: b.size, animationDelay: `${i * 0.8}s` }}
          />
        ))}
        <p
          aria-hidden
          className="relative select-none pt-6 text-center font-serif leading-[0.8] tracking-tight text-[#f8f4ec] [text-shadow:0_20px_60px_rgb(16_42_51/0.35)]"
          style={{ fontSize: "clamp(4.5rem, 22vw, 20rem)" }}
        >
          Nikki
        </p>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 pb-6 pt-8 text-sm text-white/85 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {profile.legalName}, {profile.credentials}</p>
          <LocalTime className="text-white/85" />
        </div>
      </div>
    </footer>
  );
}
