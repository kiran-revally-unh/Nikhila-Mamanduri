# Nikhila (Nikki) Mamanduri — Portfolio

Multi-page portfolio site with built-in booking. Next.js 15 (App Router), Tailwind CSS v4, Motion.
Section designs are modelled on popular 21st.dev components (tubelight navbar, scroll-beam timeline,
testimonials marquee, booking slot calendar, "let's work" CTA). See `PORTFOLIO_PLAN.md` for the full plan.

## Pages

`/` Home · `/about` · `/experience` (timeline) · `/services` · `/work` + `/work/[slug]` case studies ·
`/skills` · `/book` · `/testimonials` · `/blog` + `/blog/[slug]` · `/contact` · `/privacy` · 404

## Editing content

All text lives in **`src/content/profile.ts`**. Entries marked `SAMPLE` are placeholders: fill them from
the LinkedIn PDF export or data export. Put the profile photo at `public/images/profile.jpg` and update `profile.photo`.

## Booking

- Default: built-in flow (session → date/time in visitor's timezone → details → confirmation + `.ics` download).
  Availability is set in `availability` in `profile.ts`; requests are emailed via Resend.
- Or set `NEXT_PUBLIC_CAL_LINK` to embed Cal.com (Google Calendar sync, reminders, Stripe payments).

## Run

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm start
```

Deploy on Vercel: import the repo and add the env vars from `.env.example`.
