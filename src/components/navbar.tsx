"use client";

// Floating pill navbar (Supahero / Navbar Gallery style): sits full-width at the top,
// then tucks into a floating glass pill once you scroll. Below xl it opens a
// full-screen menu with oversized serif links and a featured-work card.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarCheck, Menu, X } from "lucide-react";
import { profile, projects } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { LinkedInIcon } from "./icons";
import { cn } from "@/lib/utils";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const menuItems = [...navItems, { href: "/skills", label: "Skills" }, { href: "/testimonials", label: "Testimonials" }];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const featured = projects[0];

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
        <div
          className={cn(
            "mx-auto flex h-14 items-center justify-between gap-4 rounded-full border px-2 pl-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "max-w-5xl border-border/80 bg-surface/75 shadow-[0_10px_40px_-12px_rgb(16_42_51/0.25)] backdrop-blur-xl backdrop-saturate-150"
              : "max-w-7xl border-transparent bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${profile.name}, home`}>
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent to-[#102a33] font-serif text-sm font-semibold text-white shadow-md shadow-accent/30">
              {profile.initials}
            </span>
            <span className="hidden whitespace-nowrap font-serif text-lg sm:inline">{profile.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              href="/book"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 sm:inline-flex"
            >
              <CalendarCheck className="size-4" /> Book a call
            </Link>
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface/80 px-4 text-sm font-semibold backdrop-blur xl:hidden"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <Menu className="size-4" /> Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#0a1c22] text-[#eef5f2]"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: reduce ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-[#216f70]/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-20 size-[26rem] rounded-full bg-[#e97860]/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-full max-w-6xl flex-col px-5 pb-8 pt-5 sm:px-8">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg">{profile.name}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-10 grid flex-1 gap-12 md:grid-cols-[1fr_300px] md:items-center">
                <nav aria-label="Menu" className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={reduce ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduce ? 0 : 0.15 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-3 border-b border-white/10 py-2.5"
                      >
                        <span className="w-6 font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={cn(
                            "font-serif text-4xl leading-tight transition group-hover:translate-x-1 group-hover:text-[#6cc3b7] sm:text-5xl",
                            isActive(pathname, item.href) && "italic text-[#6cc3b7]",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <Link
                  href={`/work/${featured.slug}`}
                  onClick={() => setOpen(false)}
                  className="group hidden overflow-hidden rounded-3xl border border-white/10 bg-white/5 md:block"
                >
                  {featured.image && <img src={featured.image} alt="" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0937e]">Featured work</p>
                    <p className="mt-2 font-serif text-2xl leading-snug">{featured.title}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-sm text-white/70">
                      Read the story <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
                    </p>
                  </div>
                </Link>
              </div>

              <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                  <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
                  <a href={`tel:${profile.phone}`} className="hover:text-white">{profile.phoneDisplay}</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                    <LinkedInIcon /> LinkedIn
                  </a>
                </div>
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#6cc3b7] px-6 py-3 text-sm font-semibold text-[#0a1c22]"
                >
                  <CalendarCheck className="size-4" /> Book a call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
