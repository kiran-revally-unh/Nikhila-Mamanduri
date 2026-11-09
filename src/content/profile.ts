/**
 * Single source of truth for every page on the site.
 *
 * Verified from public sources (Nov 2026):
 *  - LinkedIn title: "Nikhila Mamanduri, MHA, CAPM - Medi-Weightloss®"
 *  - Medi-Weightloss Thousand Oaks staff page: "Nikhila Mamanduri — Office Staff" (+ photo)
 *  - ZoomInfo: Lead Admin Coordinator, Tufts Medicine (may be outdated)
 *  - University of New Haven Charger Blog (Feb 24, 2023): "Nikhila Mamanduri ’24 MHA,
 *    director of community relations, SOHA"
 *
 * Anything marked `SAMPLE` is still placeholder copy: the full LinkedIn profile
 * (about, dates, skills, recommendations) is behind LinkedIn's login wall.
 * Fill it in from the LinkedIn "Save to PDF" export.
 */

export const profile = {
  name: "Nikhila Mamanduri",
  credentials: "MHA, CAPM",
  shortName: "Nikki",
  initials: "NM",
  headline: "Healthcare Administration Professional",
  tagline:
    "Healthcare administrator with a Master of Healthcare Administration and a CAPM certification — focused on smooth operations, great patient experiences and well-run projects.",
  location: "Thousand Oaks, California",
  timezone: "America/Los_Angeles",
  email: "hello@example.com", // SAMPLE — replace with a real contact email
  linkedin: "https://www.linkedin.com/in/nikki-mamanduri",
  whatsapp: "", // e.g. "1XXXXXXXXXX" — leave empty to hide the button
  photo: "/images/profile.jpg",
  resumePdf: "", // e.g. "/Nikhila-Mamanduri-Resume.pdf"
  // SAMPLE — written from public facts; replace with the LinkedIn "About" section
  about: [
    "I'm Nikhila (Nikki) Mamanduri, a healthcare administration professional. I earned my Master of Healthcare Administration at the University of New Haven and hold the Certified Associate in Project Management (CAPM) credential.",
    "I've worked on the administrative side of healthcare at Tufts Medicine and today support patients and providers at Medi-Weightloss in Thousand Oaks, California. During my MHA I served as director of community relations for the University's Society of Healthcare Administration (SOHA), connecting students with alumni, faculty and industry leaders.",
  ],
  stats: [
    { value: "MHA", label: "Master of Healthcare Administration" },
    { value: "CAPM", label: "Project Management Institute" },
    { value: "’24", label: "University of New Haven" },
    { value: "2", label: "Healthcare organizations" },
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

// Roles verified from public sources; dates and highlights are SAMPLE until the LinkedIn export is added.
export const experience: Experience[] = [
  {
    role: "Office Staff",
    company: "Medi-Weightloss®",
    start: "SAMPLE",
    end: "Present",
    location: "Thousand Oaks, CA",
    summary: "Front-office and administrative support for a physician-supervised weight loss clinic.",
    highlights: [
      "SAMPLE — patient scheduling, intake and front-desk operations.",
      "SAMPLE — supporting the clinical team across weight loss, GLP-1 and wellness programs.",
    ],
    skills: ["Patient experience", "Clinic operations", "Scheduling"],
  },
  {
    role: "Lead Admin Coordinator",
    company: "Tufts Medicine",
    start: "SAMPLE",
    end: "SAMPLE",
    location: "Massachusetts",
    summary: "Administrative coordination within an academic health system.",
    highlights: ["SAMPLE — add key achievements from LinkedIn."],
    skills: ["Healthcare administration", "Coordination"],
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
];

export const education = [
  {
    school: "University of New Haven",
    degree: "Master of Healthcare Administration (MHA)",
    start: "",
    end: "2024",
    note: "Director of community relations, Society of Healthcare Administration (SOHA).",
  },
  // SAMPLE — add the undergraduate degree from LinkedIn
];

// SAMPLE — inferred from roles; replace with LinkedIn Skills
export const skillGroups = [
  { title: "Healthcare", items: ["Healthcare administration", "Patient experience", "Clinic operations", "Healthcare quality"] },
  { title: "Project management", items: ["CAPM", "Planning & scheduling", "Stakeholder communication", "Process improvement"] },
  { title: "People", items: ["Community relations", "Event planning", "Team coordination"] },
];

export const certifications = [
  { name: "Certified Associate in Project Management (CAPM)®", issuer: "Project Management Institute", year: "", url: "" },
];

export const languages = ["English"]; // SAMPLE — add other languages from LinkedIn

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
    gradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    image: "/images/soha-kickoff.jpg",
    source: { label: "Read the Charger Blog story", url: "https://www.newhaven.edu/news/blog/2023/mha-event.php" },
  },
  {
    slug: "clinic-operations",
    title: "Clinic Front-Office Operations",
    category: "Operations",
    year: "SAMPLE",
    summary: "SAMPLE — a workflow or patient-experience improvement from Medi-Weightloss or Tufts Medicine.",
    problem: "SAMPLE — what wasn't working?",
    approach: "SAMPLE — what did you change?",
    result: "SAMPLE — what improved?",
    metrics: [{ value: "—", label: "Add a metric" }],
    tools: ["Scheduling", "EHR"],
    gradient: "from-sky-500 via-cyan-500 to-emerald-500",
  },
  {
    slug: "mha-capstone",
    title: "MHA Capstone Project",
    category: "Research",
    year: "2024",
    summary: "SAMPLE — the capstone project from the University of New Haven MHA program.",
    problem: "SAMPLE — the healthcare problem the capstone addressed.",
    approach: "SAMPLE — method and partners.",
    result: "SAMPLE — findings and recommendations.",
    metrics: [{ value: "—", label: "Add a metric" }],
    tools: ["Research", "Data analysis"],
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
];

// SAMPLE — replace with LinkedIn Recommendations (shown with a "sample" note until then)
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
};

export const posts: Post[] = [
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

export const faqs = [
  { q: "How do I book a session?", a: "Pick a session on the Book page, choose a time that suits you, and you'll get a confirmation by email." },
  { q: "Which timezone are slots in?", a: "Slots are shown in your own timezone automatically. Nikki is based in California (Pacific Time)." },
  { q: "Do you mentor MHA students?", a: "Yes — book a free mentoring chat for MHA, career or resume questions." },
];
