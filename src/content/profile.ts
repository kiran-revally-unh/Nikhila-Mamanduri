/**
 * Single source of truth for every page on the site.
 *
 * Sources (Nov 2026):
 *  - LinkedIn profile (linkedin.com/in/nikki-mamanduri): headline, experience, education,
 *    skills, licenses & certifications, projects, volunteering, languages.
 *    The profile has no About section and no recommendations yet.
 *  - Medi-Weightloss Thousand Oaks staff page and Nikki's Setly digital card (setly.net/nikki)
 *  - University of New Haven Charger Blog (Feb 24, 2023)
 *
 * Anything marked `SAMPLE` is still placeholder copy that LinkedIn does not cover.
 */

import { linkedinPosts } from "./linkedin";

export const profile = {
  name: "Nikki Mamanduri",
  legalName: "Nikhila Mamanduri",
  credentials: "MHA, CAPM",
  shortName: "Nikki",
  initials: "NM",
  headline: "Healthcare Operations Manager",
  kicker: "Healthcare operations, made human.",
  manifesto: ["Better systems. Stronger teams.", "Better patient experiences."],
  tagline:
    "Better systems create stronger teams — and a better experience for every patient. Healthcare Operations Manager at Medi-Weightloss® Thousand Oaks, with an MHA and CAPM.",
  location: "Thousand Oaks, California",
  timezone: "America/Los_Angeles",
  email: "nmamanduri@mediweightlossclinics.com",
  phone: "+1-805-601-7931",
  phoneDisplay: "805-601-7931",
  digitalCard: "https://setly.net/nikki",
  linkedin: "https://www.linkedin.com/in/nikki-mamanduri",
  whatsapp: "19139993300",
  photo: "/images/profile-studio.jpg",
  photoAlt: "/images/profile.jpg",
  resumePdf: "", // e.g. "/Nikhila-Mamanduri-Resume.pdf"
  // Written from the LinkedIn experience and education sections (LinkedIn has no About section).
  about: [
    "I'm Nikhila (Nikki) Mamanduri, a healthcare operations leader focused on AI-enabled operations, workflow transformation and scalable care delivery. I hold a CAHME-accredited Master of Healthcare Administration from the University of New Haven, a B.Tech in Biotechnology from Lovely Professional University, and PMI's Certified Associate in Project Management (CAPM).",
    "Today I lead the launch and stabilization of a physician-supervised weight-management clinic for Medi-Weightloss® in the Los Angeles area — mapping patient journeys, writing SOPs and building the dashboards that connect patient access, clinical care, GLP-1 workflows and growth. Before that I ran administrative operations at Tufts Medicine and U.S. Renal Care, and started my career as a Product Executive at Relisys Medical Devices in Hyderabad.",
  ],
  stats: [
    { value: "6+ yrs", label: "Healthcare experience" },
    { value: "MHA", label: "University of New Haven, 3.79 GPA" },
    { value: "CAPM", label: "Project Management Institute" },
    { value: "20%", label: "Fewer claim denials at Tufts Medicine" },
  ],
  values: [
    { title: "Patient-first", text: "Every process should make care easier for patients and staff." },
    { title: "Organised delivery", text: "Clear plans, timelines and follow-through — the CAPM way." },
    { title: "Community builder", text: "Bringing people together, from SOHA events to clinic teams." },
  ],
};

export type Experience = {
  role: string;
  company: string;
  type?: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
};

// From LinkedIn (plus the SOHA role, from the Charger Blog).
export const experience: Experience[] = [
  {
    role: "Operations Manager",
    company: "Medi-Weightloss®",
    type: "Full-time",
    start: "Mar 2026",
    end: "Present",
    location: "Los Angeles area, CA",
    summary:
      "Leads the launch and stabilization of a physician-supervised weight-management clinic, building the operational structure that connects patient acquisition, access, clinical care, GLP-1 workflows, business growth and longitudinal patient support.",
    highlights: [
      "Maps end-to-end patient journeys to find workflow gaps, unclear handoffs, delays and revenue leakage, and to standardize and automate.",
      "Builds SOPs, escalation pathways and dashboards across patient access, scheduling, provider operations, medication coordination, inventory, compliance, revenue and retention.",
      "Tracks KPIs including lead-response time, assessment attendance, enrollment conversion, cancellations, provider capacity and program retention.",
      "Leads business development through referral relationships, community outreach and corporate-wellness partnerships.",
      "Oversees insurance verification and prior-authorization workflows.",
      "Uses AI-assisted tools and workflow automation for process mapping, SOPs, reporting and exception identification — with human review and privacy safeguards.",
    ],
    skills: ["Operational strategy", "SOP development", "KPI reporting", "Workflow automation"],
  },
  {
    role: "Lead Admin Coordinator",
    company: "Tufts Medicine",
    type: "Full-time",
    start: "Jul 2025",
    end: "Feb 2026",
    location: "Boston, MA",
    summary:
      "Directed end-to-end healthcare operations — patient scheduling, diagnostics coordination, follow-ups and workforce management — using Epic, Meditech, Kronos, Schedule Pro and AI-enabled tools.",
    highlights: [
      "Improved throughput by 25% and coverage by 20%, and cut scheduling conflicts by 15%.",
      "Managed insurance verification, prior authorizations, CPT/ICD-10 coding and billing workflows, reducing claim denials by 20% and administrative bottlenecks by 28%.",
      "Built resource-management dashboards with predictive analytics, reducing equipment shortages by 25%.",
    ],
    skills: ["Epic", "Meditech", "Kronos", "Revenue cycle management"],
  },
  {
    role: "Administrative Assistant",
    company: "U.S. Renal Care",
    type: "Full-time",
    start: "Jul 2024",
    end: "Jul 2025",
    location: "Dallas, TX",
    summary:
      "Ran clinical documentation, quality and compliance, and patient and staff scheduling for a dialysis clinic.",
    highlights: [
      "Reduced catheter usage from 24% to 10% by educating patients on percutaneous access placement.",
      "Cut missed treatments and absences by 18.9% with Schedule Pro patient schedules and regular follow-ups.",
      "Reduced employee turnover by 14% through staff scheduling and staffing.",
      "Ran monthly medical-record and QM audits for 100% compliance on new admissions; kept survey-readiness and QAPI binders current.",
    ],
    skills: ["Practice management", "Quality & compliance", "Schedule Pro"],
  },
  {
    role: "Graduate Assistant",
    company: "University of New Haven",
    type: "Part-time",
    start: "Aug 2022",
    end: "May 2024",
    location: "New Haven, CT",
    summary: "Supported the Department of Health Sciences faculty with research, curriculum and department operations.",
    highlights: [
      "Researched literature and data to bring current research into the course curriculum.",
      "Developed assignments, reading materials, handbooks, flyers and social media posters.",
      "Managed department inventory and organized department events.",
    ],
    skills: ["Research", "Curriculum development", "Coordination"],
  },
  {
    role: "Director of Community Relations",
    company: "Society of Healthcare Administration (SOHA), University of New Haven",
    type: "Student leadership",
    start: "2023",
    end: "2024",
    location: "West Haven, CT",
    summary: "Led community relations for the University's SOHA chapter during the MHA program.",
    highlights: [
      "Wrote and published the Charger Blog story on SOHA's Spring 2023 semester kickoff event.",
      "Promoted the eight-week MHA Career Mentoring Sessions run with faculty, Advisory Board members and alumni.",
      "Connected MHA students with CTAHE and ACHE networking opportunities.",
    ],
    skills: ["Event planning", "Communications", "Networking"],
  },
  {
    role: "Product Executive",
    company: "Relisys Medical Devices Limited",
    type: "Full-time",
    start: "Mar 2020",
    end: "Jul 2022",
    location: "Hyderabad, India",
    summary: "Market strategy, training and clinical-registry coordination for a cardiovascular medical-device maker.",
    highlights: [
      "Supervised and coordinated the PRISTINE Registry, a comparative in-stent restenosis study of Pristine Everolimus drug-eluting stents in India.",
      "Designed and delivered nationwide training for business, clinical and administrative staff, vendors and physicians.",
      "Produced consent forms, patient information booklets, brochures and social media content.",
    ],
    skills: ["Market strategy", "Clinical registries", "Training"],
  },
];

export const education = [
  {
    school: "University of New Haven",
    degree: "Master of Healthcare Administration (MHA), CAHME-accredited",
    start: "2022",
    end: "2024",
    note: "GPA 3.79. Director of community relations, Society of Healthcare Administration (SOHA).",
  },
  {
    school: "Lovely Professional University",
    degree: "Bachelor of Technology (B.Tech), Biotechnology",
    start: "2016",
    end: "2020",
    note: "",
  },
];

// Grouped from the LinkedIn Skills section.
export const skillGroups = [
  {
    title: "Operations",
    items: ["Operational strategy", "Workflow design", "Workflow optimization", "SOP development", "Operations process improvement", "Change management", "Performance management", "KPI reporting"],
  },
  {
    title: "Healthcare",
    items: ["Patient administration", "Medical operations", "Ambulatory care", "Revenue cycle management", "HIPAA", "OSHA compliance", "Digital health"],
  },
  {
    title: "AI & technology",
    items: ["AI for healthcare", "Process automation", "Workflow automation", "Operational analytics", "Healthcare IT", "Epic", "Meditech", "Kronos", "Tableau", "SQL"],
  },
  {
    title: "Leadership",
    items: ["Cross-functional team leadership", "Program management", "Software implementation management", "Innovation management", "Business strategy"],
  },
];

export const certifications = [
  { name: "Certified Associate in Project Management (CAPM)®", issuer: "Project Management Institute", year: "2024", url: "" },
  { name: "OSHA Course Certificate — Healthcare Compliance & Safety", issuer: "MP1 Solution", year: "2026", url: "" },
];

export const languages = ["English", "Telugu", "Hindi", "Tamil (elementary)"];

export const volunteering = [
  { role: "Program Assistant", org: "American College of Healthcare Executives (ACHE) Congress", period: "Mar 2024" },
  { role: "Cancer Genetics Administrative Volunteer", org: "Yale New Haven Health", period: "Jan 2024 — May 2024" },
  { role: "Emergency Department Volunteer", org: "Yale New Haven Health", period: "Feb 2023 — Dec 2023" },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
  price: string;
  sessionId: string;
};

// SAMPLE — what Nikki offers; confirm with her
export const services: Service[] = [
  {
    slug: "operations",
    title: "Clinic Operations Support",
    summary: "Help small practices tighten front-office workflows, scheduling and patient intake.",
    deliverables: ["Workflow review", "Practical recommendations", "Follow-up check-in"],
    price: "On request",
    sessionId: "deep-dive",
  },
  {
    slug: "projects",
    title: "Healthcare Project Coordination",
    summary: "CAPM-grounded planning, timelines and stakeholder updates for healthcare initiatives.",
    deliverables: ["Project plan & timeline", "Status reporting", "Risk & issue tracking"],
    price: "Custom quote",
    sessionId: "intro",
  },
  {
    slug: "mentoring",
    title: "MHA & Career Mentoring",
    summary: "Guidance for students and early-career professionals entering healthcare administration.",
    deliverables: ["1:1 sessions", "Resume & LinkedIn review", "Networking tips"],
    price: "Free",
    sessionId: "consult",
  },
];

export type SessionType = {
  id: string;
  title: string;
  minutes: number;
  description: string;
  price: string;
};

export const sessionTypes: SessionType[] = [
  { id: "intro", title: "Intro call", minutes: 15, description: "Say hello and see if we're a fit.", price: "Free" },
  { id: "consult", title: "Mentoring chat", minutes: 30, description: "Career questions, MHA advice or a resume review.", price: "Free" },
  { id: "deep-dive", title: "Working session", minutes: 60, description: "A focused session on your clinic or project.", price: "On request" },
];

/** Weekly availability in the profile timezone (24h clock). */
export const availability = {
  days: [1, 2, 3, 4, 5], // Mon–Fri
  startHour: 10,
  endHour: 18,
  bookAheadDays: 30,
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  metrics: { value: string; label: string }[];
  tools: string[];
  gradient: string;
  image?: string;
  source?: { label: string; url: string };
};

export const projects: Project[] = [
  {
    slug: "soha-spring-kickoff",
    title: "SOHA Spring Semester Kickoff",
    category: "Community",
    year: "2023",
    summary: "A welcome-back networking event for University of New Haven MHA students, run by the Society of Healthcare Administration.",
    problem: "MHA students needed a way to reconnect after the break and meet the people who could shape their careers — faculty, alumni and industry leaders.",
    approach:
      "SOHA brought together the MHA program director, a Connecticut Association of Healthcare Executives (CTAHE) speaker, capstone faculty, an alumnus from Stamford Health and current students for talks on internships, networking and the job market. As director of community relations, Nikhila covered the event for the Charger Blog and promoted the MHA Career Mentoring Sessions.",
    result: "Students left with new contacts, a clearer view of CTAHE/ACHE opportunities and an invitation to the eight-week MHA Career Mentoring program.",
    metrics: [
      { value: "5", label: "Guest speakers" },
      { value: "8 wk", label: "Mentoring program promoted" },
    ],
    tools: ["Event planning", "Communications", "Networking"],
    gradient: "from-cyan-600 via-teal-500 to-emerald-500",
    image: "/images/soha-kickoff.jpg",
    source: { label: "Read the Charger Blog story", url: "https://www.newhaven.edu/news/blog/2023/mha-event.php" },
  },
  {
    slug: "tufts-scheduling-revenue",
    title: "Scheduling & Revenue-Cycle Operations",
    category: "Operations",
    year: "2025",
    summary: "Tightening scheduling, prior authorizations and billing workflows at Tufts Medicine.",
    problem: "Scheduling conflicts, coverage gaps, claim denials and administrative bottlenecks were slowing patient throughput.",
    approach:
      "Coordinated scheduling, diagnostics, follow-ups and workforce management in Epic, Meditech, Kronos and Schedule Pro; managed insurance verification, prior authorizations, CPT/ICD-10 coding and billing with Excel and Google Sheets automation; and built resource dashboards with predictive analytics.",
    result: "Throughput up 25%, coverage up 20%, scheduling conflicts down 15%, claim denials down 20% and equipment shortages down 25%.",
    metrics: [
      { value: "25%", label: "Higher throughput" },
      { value: "20%", label: "Fewer claim denials" },
    ],
    tools: ["Epic", "Meditech", "Kronos", "Schedule Pro"],
    gradient: "from-sky-500 via-cyan-500 to-emerald-500",
  },
  {
    slug: "gaylord-feasibility-study",
    title: "Gaylord Outpatient Feasibility Study",
    category: "Strategy",
    year: "2023",
    summary: "An MHA internship project assessing a new outpatient visit unit for Gaylord Specialty Healthcare.",
    problem: "Gaylord needed to know whether adding an outpatient visit unit to an existing or new therapy site was practical and financially sound.",
    approach:
      "Led a three-person team through a feasibility assessment covering financial, operational and logistical factors: CPT and ICD-10 code trends, cost analysis, financial modelling and forecasting to project the right therapy site, plus a review of state and federal healthcare regulations.",
    result: "A project plan and feasibility assessment with revenue and expenditure projections to support long-range planning.",
    metrics: [
      { value: "3", label: "Direct reports" },
      { value: "5 mo", label: "Aug — Dec 2023" },
    ],
    tools: ["Financial analysis", "Forecasting", "Team leadership"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    slug: "renal-access-education",
    title: "Vascular Access Patient Education",
    category: "Patient care",
    year: "2024",
    summary: "Reducing catheter use at a U.S. Renal Care dialysis clinic through patient education.",
    problem: "Too many dialysis patients relied on catheters rather than permanent access.",
    approach: "Educated patients on why percutaneous access placement matters, alongside scheduling follow-ups to reduce missed treatments.",
    result: "Catheter usage fell from 24% to 10%, and missed treatments and absences dropped 18.9%.",
    metrics: [
      { value: "24→10%", label: "Catheter usage" },
      { value: "18.9%", label: "Fewer missed treatments" },
    ],
    tools: ["Patient education", "Schedule Pro"],
    gradient: "from-teal-500 via-emerald-500 to-lime-500",
  },
];

// SAMPLE — LinkedIn has no recommendations yet (checked Nov 2026); shown with a "sample" note until real ones are added
export const testimonialsAreSamples = true;
export const testimonials = [
  { quote: "Paste a LinkedIn recommendation here. Keep it to two or three sentences.", name: "Colleague Name", role: "Title, Company" },
  { quote: "Another recommendation that shows how Nikki works with people.", name: "Manager Name", role: "Title, Company" },
  { quote: "A quote from a SOHA peer or professor.", name: "Name", role: "University of New Haven" },
  { quote: "A teammate on what it's like to work with Nikki.", name: "Teammate Name", role: "Title, Company" },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  externalUrl?: string;
  publication?: string;
  images?: string[];
  source?: "linkedin";
  /** false when the date is estimated (LinkedIn only shows "3mo", "2yr", …). */
  exactDate?: boolean;
  linkedinUrl?: string;
};

const linkedinActivity = "https://www.linkedin.com/in/nikki-mamanduri/recent-activity/all/";

const articlePosts: Post[] = [
  {
    slug: "soha-spring-kickoff",
    title: "Spring Semester Kickoff Event Fosters Community Among Master of Healthcare Administration Students",
    date: "2023-02-24",
    publication: "The Charger Blog, University of New Haven",
    externalUrl: "https://www.newhaven.edu/news/blog/2023/mha-event.php",
    excerpt:
      "Candidates in the Master of Healthcare Administration program came together for the welcome back event organized by the University's chapter of the Society of Healthcare Administration (SOHA).",
    body: [
      "I wrote this piece for the University of New Haven's Charger Blog as director of community relations for the Society of Healthcare Administration (SOHA).",
      "It covers SOHA's spring welcome-back event, where MHA candidates networked with the program director, a Connecticut Association of Healthcare Executives (CTAHE) speaker, capstone faculty, alumni and classmates, and learned about internships, CTAHE/ACHE congresses and the job market for MHA graduates.",
      "The article also introduced the MHA Career Mentoring Sessions — an eight-week program run by MHA faculty, Advisory Board members and alumni.",
    ],
  },
];

/** Every post on the site: the Charger Blog article plus all of Nikki's LinkedIn posts, newest first. */
export const posts: Post[] = [
  ...articlePosts,
  ...linkedinPosts.map(
    (p): Post => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      body: p.body,
      images: p.images,
      source: "linkedin",
      publication: "LinkedIn",
      exactDate: p.exactDate,
      linkedinUrl: p.url || linkedinActivity,
      externalUrl: p.article || undefined,
    }),
  ),
].sort((a, b) => b.date.localeCompare(a.date));

/** Date label: exact day when known, otherwise month and year. */
export function postDate(p: Pick<Post, "date" | "exactDate">, style: "medium" | "long" = "medium") {
  const d = new Date(p.date);
  return p.exactDate === false
    ? d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : d.toLocaleDateString("en-US", { dateStyle: style, timeZone: "UTC" });
}

export const faqs = [
  { q: "How do I book a session?", a: "Pick a session on the Book page, choose a time that suits you, and you'll get a confirmation by email." },
  { q: "Can I save your contact?", a: "Yes — use “Save contact” on the Contact page to add Nikki to your phone, or open her digital card." },
  { q: "Which timezone are slots in?", a: "Slots are shown in your own timezone automatically. Nikki is based in California (Pacific Time)." },
  { q: "Do you mentor MHA students?", a: "Yes — book a free mentoring chat for MHA, career or resume questions." },
];

export type GalleryItem = { src: string; alt: string; caption: string; href?: string };

const featuredGallery: GalleryItem[] = [
  { src: "/images/profile-studio.jpg", alt: "Studio portrait of Nikki Mamanduri", caption: "Portrait" },
  { src: "/images/soha-kickoff.jpg", alt: "University of New Haven MHA students at the SOHA spring kickoff event", caption: "SOHA Spring Semester Kickoff, University of New Haven (2023)" },
  { src: "/images/nikki-card.png", alt: "Nikki Mamanduri's digital business card", caption: "Digital business card" },
  { src: "/images/profile.jpg", alt: "Nikki Mamanduri at Medi-Weightloss Thousand Oaks", caption: "Medi-Weightloss® Thousand Oaks" },
];

/** Photos from Nikki's LinkedIn posts, newest first, each linking to its post. */
export const linkedinGallery: GalleryItem[] = posts
  .filter((p) => p.source === "linkedin" && p.images?.length)
  .flatMap((p) =>
    p.images!.map((src, i) => ({
      src,
      alt: `Photo ${i + 1} from Nikki's LinkedIn post: ${p.title}`,
      caption: `${p.title} · ${postDate(p)}`,
      href: `/blog/${p.slug}`,
    })),
  );

export const gallery: GalleryItem[] = [...featuredGallery, ...linkedinGallery];
