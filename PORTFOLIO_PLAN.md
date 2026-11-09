# Nikhila (Nikki) Mamanduri — Portfolio Website Plan

Status: **planning** (content from LinkedIn still to be collected — see "Content needed" at the bottom).
Design inspiration: Setly Global (to be confirmed once the site's URL is shared).

---

## 1. Goals

1. A personal brand site that is more complete than the LinkedIn profile: story, proof of work, and a clear way to hire or meet Nikki.
2. **Bookings**: visitors can book a call or session directly from the site.
3. Multi-page (not a single landing page), so each section can rank in search and be shared on its own.

## 2. Pages (sitemap)

| # | Page | URL | What goes on it |
|---|------|-----|-----------------|
| 1 | **Home** | `/` | Hero (photo, name, headline, one-line value prop, "Book a call" + "View work" buttons), short intro, key stats (years of experience, projects, clients), featured work (3 cards), logos of companies/clients, 2–3 testimonials, latest blog posts, final booking CTA |
| 2 | **About** | `/about` | Full story (from LinkedIn About), photo gallery, values / working style, career timeline, education, languages, fun facts |
| 3 | **Experience** | `/experience` | Interactive timeline of every role: company logo, title, dates, location, key achievements with numbers, skills used |
| 4 | **Services** | `/services` | What Nikki offers (consulting, freelance, mentoring, etc.), each with deliverables, process steps, starting price or "on request", and a "Book this" button that pre-selects the service in the booking flow |
| 5 | **Projects / Case studies** | `/work` + `/work/[slug]` | Filterable grid; each case study: problem → approach → result (metrics) → images → tools used → testimonial |
| 6 | **Skills & Certifications** | `/skills` | Skill groups with levels, certification badges with verify links, tools/tech stack logos |
| 7 | **Book a Session** | `/book` | Choose session type (15-min intro, 30-min consultation, 60-min deep dive / mentoring) → pick date & time (timezone-aware) → details form → confirmation email + calendar invite. Optional paid sessions (Stripe) |
| 8 | **Testimonials** | `/testimonials` | LinkedIn recommendations + client quotes, with photos and roles |
| 9 | **Blog / Insights** | `/blog` + `/blog/[slug]` | Articles, LinkedIn posts reposted as long-form, categories, search, newsletter signup |
| 10 | **Media / Speaking** | `/media` | Talks, podcasts, events, press mentions, photo gallery from events |
| 11 | **Resume** | `/resume` | Web version + downloadable PDF |
| 12 | **Contact** | `/contact` | Contact form, email, LinkedIn & social links, location / timezone, FAQ |
| 13 | Legal | `/privacy`, `/terms` | Needed once we collect booking data and emails |
| 14 | 404 | — | Friendly not-found page with links back |

## 3. Booking system (the key feature)

- **Session types** with duration, description, price (free or paid).
- **Calendar**: Cal.com (open source, free tier, embeddable) or Calendly embed. Cal.com recommended — it can be styled to match the site, syncs with Google Calendar, sends reminders, and handles timezones.
- **Payments** (optional): Stripe checkout for paid sessions; Cal.com supports this natively.
- **Flow**: service → slot → form (name, email, company, goal of the call) → confirmation page → email + Google Meet/Zoom link.
- **Admin side**: bookings land in Nikki's Google Calendar; optional notification to email/WhatsApp.
- "Book a call" button sticky in the header on every page.

## 4. Extra features that would make it stand out

1. **Dark / light mode** toggle.
2. **Downloadable resume** (auto-generated PDF from the same data).
3. **Newsletter signup** (Buttondown / Mailchimp / Resend).
4. **WhatsApp chat button** (useful for Indian clients).
5. **Testimonial carousel** pulled from LinkedIn recommendations.
6. **Animated stats counters** and scroll animations (subtle).
7. **Case-study filters** by industry / skill.
8. **SEO**: per-page meta tags, Open Graph images for LinkedIn sharing, sitemap.xml, schema.org `Person` markup.
9. **Analytics**: Vercel Analytics or Plausible (privacy friendly).
10. **Contact form** with spam protection, sending to email.
11. **Multi-language** (English + Telugu) — optional, phase 2.
12. **CMS** so Nikki can add blog posts / projects without code (MDX files or Sanity/Notion) — phase 2.
13. **Accessibility**: keyboard navigation, alt text, good contrast.
14. **Fast & mobile-first**: optimized images, Lighthouse 90+.

## 5. Design direction (Setly Global inspired — to confirm)

- Clean, premium, corporate-modern look: lots of white space, large bold headlines, rounded cards, soft shadows.
- One strong brand accent colour + neutral greys; consistent icon set.
- Professional photography from LinkedIn (profile photo, banner, event photos) in hero and About.
- Sticky top navigation with a prominent "Book a call" button; mega-footer with links, socials, newsletter.
- Once the Setly Global URL is shared, we'll pull its exact palette, typography, and section patterns.

## 6. Tech stack (proposed)

- **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui** — multi-page, fast, SEO-friendly.
- **Content**: a single `content/profile.ts` (or JSON/MDX) with all LinkedIn data, so every page reads from one source.
- **Booking**: Cal.com embed (+ Stripe if paid sessions).
- **Forms / email**: Resend or Formspree.
- **Hosting**: Vercel (free tier), custom domain e.g. `nikkimamanduri.com`.

## 7. Build phases

1. **Content collection** — LinkedIn data, photos, Setly Global reference (see below).
2. **Design system** — colours, fonts, components.
3. **Core pages** — Home, About, Experience, Services, Work, Contact.
4. **Booking** — Cal.com setup + `/book` page.
5. **Extras** — Blog, Testimonials, Media, Resume PDF, newsletter, SEO, analytics.
6. **Launch** — domain, Lighthouse/accessibility pass, deploy.

## 8. Content needed (blocked)

LinkedIn could not be scraped from this environment: the network policy blocks `www.linkedin.com`, and LinkedIn also hides most of a profile behind a login wall for automated fetches. The reliable way to get all of it:

1. **LinkedIn PDF export**: open the profile → **More → Save to PDF** → upload the PDF here. This contains headline, about, every experience, education, skills, certifications.
2. **Full data export** (best): LinkedIn **Settings → Data privacy → Get a copy of your data** → download the ZIP (includes recommendations, projects, posts, profile & banner images).
3. **Images**: profile photo, banner, and any event/project photos (original files are higher quality than LinkedIn's compressed versions).
4. **Setly Global**: the exact website URL to use as design reference.
5. Booking decisions: which session types, durations, free vs paid, and which calendar (Google) to connect.
