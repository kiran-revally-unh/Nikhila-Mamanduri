"use client";

// Tubelight-style navbar (inspired by 21st.dev "tubelight-navbar").
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { LocalTime } from "./local-time";
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

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
            {profile.initials}
          </span>
          <span className="hidden whitespace-nowrap sm:inline">{profile.name}</span>
        </Link>
        <LocalTime className="hidden whitespace-nowrap text-xs text-muted-foreground 2xl:block" />

        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-border bg-surface/70 p-1 xl:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="tubelight"
                    className="absolute inset-0 -z-10 rounded-full bg-muted"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <span className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                      <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/20 blur-md" />
                      <span className="absolute -top-1 h-6 w-8 rounded-full bg-accent/20 blur-md" />
                    </span>
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/book"
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm transition hover:opacity-90 sm:inline-flex"
          >
            <CalendarCheck className="size-4" /> Book a call
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-border xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-4 pb-4 xl:hidden">
          {[...navItems, { href: "/skills", label: "Skills" }, { href: "/testimonials", label: "Testimonials" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive(pathname, item.href) ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            <CalendarCheck className="size-4" /> Book a call
          </Link>
        </nav>
      )}
    </header>
  );
}
