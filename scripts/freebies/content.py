"""Copy for Nikki's six free guides. DRAFT — written from her LinkedIn experience and
posts; Nikki should review before publishing. Each page is an HTML fragment."""


def checklist(items):
    return '<ul class="check">' + "".join(f"<li><span>{t}</span></li>" for t in items) + "</ul>"


def sec(n, t):
    return f'<div class="sec"><span class="n">{n:02d}</span><span class="t">{t}</span></div>'


def table(head, rows, cls=""):
    h = "".join(f"<th>{c}</th>" for c in head)
    r = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>" for row in rows)
    return f'<table class="{cls}"><tr>{h}</tr>{r}</table>'


def tpl(label, body):
    return f'<div class="tpl"><div class="m label">{label}</div>{body}</div>'


GUIDES = []

# ------------------------------------------------------------------ 1
GUIDES.append(dict(
    slug="clinic-front-desk-fix",
    short="The Clinic Front-Desk Fix",
    audience="Clinic owners & managers",
    title="The Clinic <i>Front-Desk</i> Fix",
    subtitle="A 25-point checklist to cut no-shows and claim denials — built from real front-office work in academic medicine, dialysis and clinic operations.",
    blurb="A 25-point checklist to cut no-shows and claim denials.",
    pages=[
        """<div class="m eyebrow">Why I made this</div><h2>Most revenue problems start at the front desk.</h2>
<p class="lead">At Tufts Medicine I ran scheduling, insurance verification, prior authorizations and billing workflows. Small fixes at the front of the patient journey added up: throughput rose 25%, claim denials fell 20%, administrative bottlenecks dropped 28% and scheduling conflicts fell 15%.</p>
<p>None of that came from one big project. It came from making the same handful of steps happen the same way, every time — and making it obvious when they didn't. This checklist is that list.</p>
<div class="callout"><b>How to use it.</b> Walk through the 25 points with your front-desk lead. Tick what's already reliable, circle what isn't, and pick <b>three</b> circled items to fix in the next 30 days (there's a plan on page 4). Re-score monthly.</div>
<div class="quote">“Patient experience is not separate from operational leadership. It is one of the clearest signals of it.”</div>
<h3>What “good” looks like</h3>
<ul class="dots"><li>Every appointment is <b>verified, authorized and confirmed</b> before the patient arrives.</li><li>Patients know <b>what to bring, what it costs and what happens next</b>.</li><li>Problems surface as <b>exceptions on a list</b>, not surprises at check-in or on a denial letter.</li><li>The team works from <b>written SOPs</b>, so quality doesn't depend on who's at the desk today.</li></ul>""",

        sec(1, "Scheduling & reminders") + checklist([
            "<b>One scheduling template</b> per provider, with visit types, lengths and buffers written down.",
            "New-patient slots are <b>protected</b> and released to follow-ups only 48 hours out.",
            "Every booking captures <b>reason for visit, insurance and preferred contact method</b>.",
            "<b>Two reminders</b> go out (e.g., 3 days and 1 day before) by text and/or call — with a one-tap confirm or reschedule.",
            "A <b>same-day waitlist</b> is used to backfill cancellations within the hour.",
        ]) + sec(2, "Insurance verification & prior authorization") + checklist([
            "Eligibility is <b>verified for every visit</b>, not just new patients — ideally 2–3 business days ahead.",
            "A <b>prior-auth list by payer and service</b> is kept current and posted where schedulers can see it.",
            "Auth requests have an <b>owner, a due date and a status</b> on a shared tracker.",
            "Visits with <b>missing or pending auth are flagged</b> 48 hours out and the patient is called.",
            "Coverage changes (new plan, new year, secondary insurance) <b>trigger re-verification</b>.",
        ]) + sec(3, "Check-in & intake") + checklist([
            "Forms and consents are <b>sent digitally before the visit</b>; paper is the backup.",
            "Photo ID and insurance card are <b>scanned and matched</b> to the chart every time.",
            "Demographics are <b>confirmed out loud</b>: name spelling, DOB, address, phone, guarantor.",
            "Copays and balances are <b>collected at check-in</b> with a friendly, scripted ask.",
            "Check-in time is <b>tracked</b>; anything over target is reviewed weekly.",
        ]),

        sec(4, "Charge capture & claims") + checklist([
            "Every visit is <b>closed and coded the same day</b>; open encounters are reviewed each morning.",
            "<b>CPT/ICD-10 codes match the documentation</b>; common mismatches are on a cheat sheet.",
            "Claims are <b>scrubbed before submission</b> for missing modifiers, auth numbers and demographics.",
            "Denials are <b>logged by reason code</b> and worked within a set number of days.",
            "The <b>top three denial reasons</b> are reviewed monthly and fixed at the source.",
        ]) + sec(5, "Follow-up & recall") + checklist([
            "Patients <b>leave with their next appointment booked</b> when follow-up is needed.",
            "No-shows get a <b>same-day call</b> and a reschedule offer, not just a note in the chart.",
            "A <b>recall list</b> (overdue follow-ups, lapsed treatment plans) is worked weekly.",
            "Patient feedback and reviews are <b>read and shared with the team</b> every week.",
            "Every recurring problem gets an <b>SOP update</b> so it doesn't depend on memory.",
        ]),

        """<div class="m eyebrow">Measure it</div><h2>Six numbers to watch every week</h2>
<p>You can't fix what you can't see. Put these on one simple dashboard (a spreadsheet is fine) and review them in a 10-minute weekly huddle.</p>"""
        + table(["KPI", "How to calculate", "Why it matters"], [
            ["No-show rate", "No-shows ÷ scheduled visits", "Lost capacity and delayed care."],
            ["Same-day cancellation rate", "Cancellations <24h ÷ scheduled visits", "Shows where reminders and waitlists help."],
            ["First-pass claim acceptance", "Claims paid on first submission ÷ claims submitted", "The best single signal of front-end quality."],
            ["Denial rate (by reason)", "Denied claims ÷ claims submitted", "Points to the step that needs fixing."],
            ["Auth turnaround", "Days from request to approval", "Late auths cause reschedules and denials."],
            ["Check-in time", "Arrival to roomed (minutes)", "What patients feel first."],
        ], "kpi")
        + """<h3>Your 30-day plan</h3>""" + table(["Week", "Focus"], [
            ["1", "Score the checklist with your team. Pick 3 circled items. Start tracking the six KPIs."],
            ["2", "Write or update the SOP for each of the 3 items. Assign one owner per item."],
            ["3", "Run it. Hold a 10-minute daily huddle on exceptions (missing auths, unconfirmed visits)."],
            ["4", "Compare KPIs to week 1. Keep what worked, adjust what didn't, choose the next 3."],
        ])
        + """<div class="callout dark"><b>Tip:</b> start with the items that touch every visit — eligibility checks, reminders and same-day coding. They usually move the numbers fastest.</div>""",
    ],
    cta_title="Want a second pair of eyes on <i>your</i> front desk?",
    cta_text="I'm happy to walk through your checklist results with you. Book a free 15-minute intro call, or a working session if you'd like a deeper review of your scheduling, authorization or billing workflow.",
))

# ------------------------------------------------------------------ 2
GUIDES.append(dict(
    slug="prior-auth-denial-playbook",
    short="Prior Authorization & Claim Denial Playbook",
    audience="Clinic owners & managers",
    title="Prior Auth & <i>Claim Denial</i> Playbook",
    subtitle="Step-by-step workflows, a prevention table for the most common denial reasons, and the tracker I'd set up on day one.",
    blurb="Workflows, prevention tables and a tracker for fewer denials.",
    pages=[
        """<div class="m eyebrow">The idea</div><h2>Denials are cheaper to prevent than to appeal.</h2>
<p class="lead">Managing insurance verification, prior authorizations, CPT/ICD-10 coding and billing at Tufts Medicine, we reduced claim denials by 20%. The biggest wins weren't clever appeals — they were catching problems before the claim ever went out.</p>
<h3>The six-stage workflow</h3><ol class="steps">
<li><b>Scheduling intake.</b> Capture payer, plan, member ID, referring provider and reason for visit at booking. Missing info = the visit isn't confirmed yet.</li>
<li><b>Eligibility check (2–3 business days out).</b> Verify active coverage, benefits, copay/deductible and whether the service needs authorization.</li>
<li><b>Authorization.</b> Submit with complete clinical documentation; log the reference number, approved units/dates and expiry.</li>
<li><b>Day-before audit.</b> Pull tomorrow's schedule: any visit without verified eligibility or a valid auth is flagged and the patient is called.</li>
<li><b>Same-day coding & scrubbing.</b> Close the encounter, match codes to documentation, attach the auth number, scrub, submit.</li>
<li><b>Denial management.</b> Log every denial by reason code, fix, resubmit or appeal within your target window, and feed the root cause back to step 1–5.</li></ol>
<div class="callout"><b>Rule of thumb:</b> every denial reason should map to the stage that could have prevented it. If it keeps happening, that stage needs an SOP update, a checklist or a training refresh.</div>""",

        """<div class="m eyebrow">Prevention table</div><h2>Common denial reasons — and where to stop them</h2>"""
        + table(["Denial reason", "Usually caused by", "Prevent it at", "Prevention step"], [
            ["Eligibility / coverage terminated", "Coverage changed since last visit", "Stage 2", "Re-verify every visit; re-check at new year and plan changes."],
            ["No authorization on file", "Auth list out of date, request missed", "Stage 3–4", "Payer/service auth list; day-before audit of pending auths."],
            ["Auth expired / units exceeded", "Visits continue past approved dates/units", "Stage 3", "Log expiry and units; alert 2 weeks before they run out."],
            ["Missing or invalid demographics", "Typos, old address, wrong subscriber", "Stage 1 / check-in", "Read back details; scan ID and card every visit."],
            ["Coding mismatch / missing modifier", "Codes don't match documentation", "Stage 5", "Same-day coding; cheat sheet of frequent pairs; scrubber edits."],
            ["Medical necessity", "Diagnosis doesn't support the service", "Stage 3 / 5", "Attach supporting documentation; confirm diagnosis-to-procedure fit."],
            ["Duplicate claim", "Resubmitting instead of correcting", "Stage 6", "Check claim status first; use corrected-claim process."],
            ["Timely filing", "Claims or appeals sent late", "Stage 5–6", "Track payer deadlines; work denials within set days."],
        ])
        + """<p style="font-size:9pt;color:#5b6b70">Exact rules, codes and deadlines vary by payer and contract — keep a one-page summary per major payer.</p>"""
        + tpl("Script · Calling a patient about a missing authorization", """<p style="margin:0">“Hi [name], this is [you] from [clinic] about your visit on [date]. Your insurance needs an approval before this visit and we're still waiting on it. We've followed up today. Would you like to keep the appointment and we'll update you by [time], or move it to [option]? Either way, there's nothing you need to do right now.”</p>"""),

        """<div class="m eyebrow">Run it</div><h2>Cadence, tracker and templates</h2>
<div class="grid2"><div class="card"><b>Daily (15 min)</b><ul class="dots" style="margin-top:4pt"><li>Day-before audit: eligibility + auth for tomorrow</li><li>Open encounters from yesterday</li><li>New denials logged and assigned</li></ul></div>
<div class="card"><b>Weekly (30 min)</b><ul class="dots" style="margin-top:4pt"><li>Denial rate and top 3 reasons</li><li>Auths expiring in the next 14 days</li><li>Aging: anything past your target window</li></ul></div></div>
<h3>Authorization & denial tracker — columns to set up</h3>"""
        + table(["Column", "What goes in it"], [
            ["Patient / MRN · Visit date", "Who and when"],
            ["Payer · Plan · Service / CPT", "What's being authorized or billed"],
            ["Auth # · Approved dates & units · Expiry", "So nothing runs out silently"],
            ["Status · Owner · Next action · Due date", "Every row has one person and one next step"],
            ["Denial reason code · Root-cause stage (1–6)", "Turns denials into process fixes"],
            ["Resolution · Amount recovered · Date closed", "Shows the value of the work"],
        ])
        + tpl("Template · Appeal letter (outline)", """<p style="margin:0">Date · Payer appeals address · Patient name, DOB, member ID · Claim # and date of service<br><b>Re:</b> Request for reconsideration of denied claim [#]<br>1. What was denied and the reason code given.<br>2. Why the service was appropriate and covered (plan language, auth #, medical necessity).<br>3. Supporting documents enclosed (notes, auth approval, corrected claim).<br>4. The specific action requested (reprocess and pay).<br>Contact name, phone and signature.</p>"""),
    ],
    cta_title="Drowning in denials? <i>Let's find the leak.</i>",
    cta_text="Bring your top denial reasons to a free intro call and I'll help you map them to the step that's causing them — or book a working session to set up the tracker and cadence together.",
))

# ------------------------------------------------------------------ 3
def score_rows(items):
    return [[t, '<span class="boxes">1 2 3 4 5</span>'] for t in items]


GUIDES.append(dict(
    slug="patient-experience-scorecard",
    short="Patient Experience Audit Scorecard",
    audience="Clinic owners & managers",
    title="Patient Experience <i>Audit Scorecard</i>",
    subtitle="Score your clinic at six moments that shape how patients feel — from the first call to the follow-up — and turn the low scores into a plan.",
    blurb="Score six patient touchpoints and turn gaps into a plan.",
    pages=[
        """<div class="m eyebrow">Why it matters</div><h2>Patients judge the whole journey, not just the visit.</h2>
<p class="lead">How people are welcomed. How clearly expectations are set. How confidently questions are answered. How consistently the team communicates. Those things don't happen by accident — they're shaped by the systems, standards and culture we build.</p>
<p>This scorecard walks the patient journey in six touchpoints. Score each statement from <b>1 (rarely true)</b> to <b>5 (always true)</b>. Do it twice: once yourself, once with a front-desk team member — the gaps between your scores are often the most useful part.</p>
<div class="callout"><b>Tip:</b> score from real evidence — a mystery call, a walk through the waiting room, reading the last 20 reviews — not from how things are supposed to work.</div>"""
        + sec(1, "First contact") + table(["Statement", "Score"], score_rows([
            "Calls are answered or returned the same business day.",
            "New-patient enquiries get a response quickly and consistently, by phone or online.",
            "The first conversation explains cost, insurance and what to expect.",
        ]), "score")
        + sec(2, "Scheduling") + table(["Statement", "Score"], score_rows([
            "Patients can get a reasonable appointment without multiple calls.",
            "Confirmations include date, location, what to bring and how to reschedule.",
            "Reminders arrive before the visit with an easy way to confirm.",
        ]), "score"),

        sec(3, "Arrival & check-in") + table(["Statement", "Score"], score_rows([
            "Patients are greeted by name within a minute of arriving.",
            "Paperwork is mostly done before arrival.",
            "Wait times are communicated honestly if we're running behind.",
            "The waiting area is clean, calm and accessible.",
        ]), "score")
        + sec(4, "The visit") + table(["Statement", "Score"], score_rows([
            "Patients understand the plan and next steps before they leave the room.",
            "Questions are answered confidently, without rushing.",
            "Hand-offs between team members are smooth — patients don't repeat themselves.",
        ]), "score")
        + sec(5, "Checkout & billing") + table(["Statement", "Score"], score_rows([
            "Patients know what they owe and why.",
            "Next appointments are booked before leaving when needed.",
            "Billing questions get a clear answer from one person.",
        ]), "score")
        + sec(6, "Follow-up") + table(["Statement", "Score"], score_rows([
            "Results and next steps are communicated when promised.",
            "No-shows and lapsed patients are contacted kindly, not just flagged.",
            "Feedback and reviews are read and acted on, and the team hears about the good ones.",
        ]), "score"),

        """<div class="m eyebrow">Turn scores into action</div><h2>Reading your results</h2>"""
        + table(["Touchpoint average", "What it means", "Do this"], [
            ["4.5 – 5", "A strength", "Document it in an SOP so it stays consistent; celebrate it with the team."],
            ["3.5 – 4.4", "Mostly working", "Find the one statement pulling it down and fix that step."],
            ["2.5 – 3.4", "Inconsistent", "Usually depends on who's working — write the SOP and train to it."],
            ["Below 2.5", "A pain point", "Make it one of your top three priorities this month."],
        ])
        + """<h3>Action plan</h3>"""
        + table(["Touchpoint", "Lowest-scoring statement", "One change we'll make", "Owner", "By when"], [["&nbsp;", "", "", "", ""]] * 5)
        + """<div class="callout coral"><b>Make it a habit.</b> Re-score every quarter and share the trend with your team. When patients consistently describe feeling welcomed, informed and supported, that tells you something important about the environment being built around their care.</div>""",
    ],
    cta_title="Want an outside view of <i>your patient journey?</i>",
    cta_text="I can walk through your scorecard with you and suggest the operational changes that will move the lowest scores first. Start with a free 15-minute intro call.",
))

# ------------------------------------------------------------------ 4
GUIDES.append(dict(
    slug="clinic-sop-starter-pack",
    short="Clinic SOP Starter Pack",
    audience="Clinic owners & managers",
    title="The Clinic <i>SOP</i> Starter Pack",
    subtitle="A simple SOP format plus ready-to-adapt templates for new-patient intake, scheduling and confirmations, the daily huddle and escalations.",
    blurb="Ready-to-adapt SOP templates for intake, scheduling and huddles.",
    pages=[
        """<div class="m eyebrow">Why SOPs</div><h2>Good care shouldn't depend on who's at the desk today.</h2>
<p class="lead">Building SOPs, escalation pathways and dashboards is a big part of my work in clinic operations — across patient access, scheduling, provider operations, compliance and retention. Clear SOPs are what let a team stay consistent as it grows, onboard new people faster and rely less on memory.</p>
<h3>The one-page SOP format</h3>"""
        + table(["Section", "What to write"], [
            ["Title · ID · Version · Owner · Review date", "So everyone knows which version is current and who maintains it."],
            ["Purpose", "One sentence: why this process exists and what “done well” means."],
            ["Scope", "Who does it, and when it applies (and when it doesn't)."],
            ["Steps", "Numbered, one action per step, in the order it happens. Include the system screen or form used."],
            ["Exceptions & escalation", "What to do when something goes wrong, and who to tell."],
            ["Measures", "The one or two numbers that show it's working."],
        ])
        + """<div class="callout"><b>Writing tips:</b> start each step with a verb · write for a new hire on their first day · keep it to one page where possible · walk through it with the people who do the work before you publish · set a review date (every 6–12 months).</div>""",

        tpl("SOP 01 · New-patient intake", """<p><b>Purpose:</b> Every new patient arrives verified, informed and with paperwork complete.<br><b>Scope:</b> Front desk / patient access, for all new-patient appointments.</p><ol class="steps" style="margin-top:6pt">
<li>At booking, capture name, DOB, phone, email, reason for visit, payer, member ID and referral (if required).</li>
<li>Send the digital intake packet and consents within 1 business day of booking.</li>
<li>Verify eligibility and benefits 2–3 business days before the visit; start prior auth if required.</li>
<li>Call or text the patient with cost estimate, what to bring (ID, insurance card, medication list) and arrival time.</li>
<li>The day before, confirm the packet is complete; call to help if not.</li>
<li>At check-in, scan ID and insurance, read back demographics, collect copay.</li></ol>
<p style="margin:0"><b>Escalate:</b> missing auth or eligibility issue → practice manager, the day before. <b>Measures:</b> % of packets complete before arrival · check-in time.</p>""")
        + tpl("SOP 02 · Scheduling & confirmations", """<ol class="steps"><li>Book using the provider's template; never double-book outside agreed rules.</li>
<li>Confirm the visit type and length match the reason for visit.</li>
<li>Send confirmation with date, time, location, what to bring and how to reschedule.</li>
<li>Send reminders 3 days and 1 day before, with a confirm/reschedule option.</li>
<li>Offer cancelled slots to the same-day waitlist within the hour.</li>
<li>For no-shows, call the same day and offer a new time; note the outcome.</li></ol>
<p style="margin:0"><b>Measures:</b> no-show rate · same-day cancellations · waitlist fills.</p>"""),

        tpl("SOP 03 · 10-minute daily huddle", """<p><b>When:</b> every morning before the first patient · <b>Who:</b> front desk, clinical lead, manager · <b>Where:</b> standing, by the schedule.</p>"""
            + table(["Minutes", "Agenda item"], [
                ["0–2", "Yesterday: anything that went wrong or went really well?"],
                ["2–5", "Today's schedule: new patients, complex visits, gaps to fill, late starts."],
                ["5–7", "Exceptions: missing auths, incomplete paperwork, balances to discuss."],
                ["7–9", "Staffing and supplies: coverage, breaks, anything running low."],
                ["9–10", "One shout-out, and one thing we're improving this week."],
            ]))
        + tpl("SOP 04 · Escalation pathway", table(["Situation", "First contact", "If unresolved in…", "Escalate to"], [
            ["Patient complaint at the desk", "Front-desk lead", "15 min", "Practice manager"],
            ["Missing auth on day of visit", "Auth coordinator", "Before the visit", "Practice manager + provider"],
            ["System or phone outage", "Manager on duty", "30 min", "IT / vendor support"],
            ["Staffing gap", "Practice manager", "Same morning", "Operations leadership"],
            ["Safety or privacy concern", "Manager on duty", "Immediately", "Compliance / leadership"],
        ]))
        + """<p style="font-size:9pt;color:#5b6b70">Adapt the timings, roles and systems to your clinic — these are starting points, not policy.</p>""",
    ],
    cta_title="Want SOPs built <i>around your clinic?</i>",
    cta_text="If you'd like help mapping your patient journey and turning it into SOPs, escalation pathways and a simple dashboard, book a free intro call and we'll see where to start.",
))

# ------------------------------------------------------------------ 5
GUIDES.append(dict(
    slug="international-student-career-roadmap",
    short="International Student to Healthcare Operations",
    audience="Students & early-career",
    title="From International Student to <i>Healthcare Operations</i>",
    subtitle="The roadmap I wish I'd had — what to do before, during and after your MHA, and how to keep going when the job market is hard.",
    blurb="A career roadmap for international students in healthcare ops.",
    pages=[
        """<div class="m eyebrow">My story, briefly</div><h2>Growth isn't linear — and that's okay.</h2>
<p class="lead">I came from a B.Tech in Biotechnology in India, spent two years as a Product Executive at a cardiovascular medical-device company, then moved to the U.S. for my MHA at the University of New Haven. Since then: a graduate assistantship, SOHA leadership, hospital volunteering, a CAPM, roles at U.S. Renal Care and Tufts Medicine, and now operations management at Medi-Weightloss®.</p>"""
        + table(["Year", "Step"], [
            ["2016–2020", "B.Tech Biotechnology, Lovely Professional University"],
            ["2020–2022", "Product Executive, Relisys Medical Devices (Hyderabad)"],
            ["2022–2024", "MHA, University of New Haven (3.79 GPA) · Graduate Assistant · SOHA Director of Community Relations"],
            ["2023–2024", "Volunteering at Yale New Haven Health · ACHE Congress program assistant · CAPM®"],
            ["2024–2026", "Administrative Assistant, U.S. Renal Care → Lead Admin Coordinator, Tufts Medicine"],
            ["2026", "Operations Manager, Medi-Weightloss® Thousand Oaks"],
        ])
        + """<p>Some transitions were exciting. Others were unexpected and exhausting. Along the way I learned that stability doesn't always mean having everything figured out — sometimes it means trusting yourself to navigate the unknown.</p>
<div class="grid2"><div class="card"><b>🌱 Resilience</b><br>Rebuilding when things don't go to plan.</div><div class="card"><b>🌱 Adaptability</b><br>Finding opportunity in unfamiliar places.</div><div class="card"><b>🌱 Independence</b><br>Making decisions and trusting them.</div><div class="card"><b>🌱 Perspective</b><br>Setbacks don't define the destination.</div></div>""",

        """<div class="m eyebrow">The roadmap</div><h2>Four phases</h2>"""
        + sec(1, "Before you arrive") + checklist([
            "Translate your past experience into U.S. healthcare language — e.g., “medical-device training” → <b>stakeholder education</b>, “registry coordination” → <b>clinical operations</b>.",
            "Learn the basics: how U.S. insurance, prior authorization and revenue cycle work. It sets you apart in interviews.",
            "Set up LinkedIn properly before day one and start following healthcare leaders and your program's alumni.",
        ]) + sec(2, "During your MHA") + checklist([
            "<b>Join (or lead) the student healthcare club.</b> Leading SOHA's community relations connected me with alumni, faculty and industry leaders.",
            "<b>Volunteer inside a hospital.</b> It's how you learn real workflows and earn U.S. references.",
            "<b>Go to professional events</b> like ACHE and your local chapter — volunteer to help run them and you'll meet more people.",
            "Take an on-campus role (graduate assistant, department work) to build U.S. experience and a reference.",
            "Pick an internship or capstone with a <b>real operational problem</b> and measurable results.",
            "Add a credential that signals structure — I chose <b>PMI's CAPM</b>.",
        ]),

        sec(3, "The job search") + checklist([
            "Expect a long process: multi-month timelines and many interview rounds are common. Plan for it, don't take it personally.",
            "Apply to <b>front-line operations roles</b> too (patient access, scheduling, coordination). They teach the system from the ground up.",
            "Quantify everything on your resume — see the companion <i>Resume & LinkedIn Kit</i>.",
            "Ask for 2–3 sentences of feedback after interviews; it turns rejection into growth.",
            "Talk to your school's international student office early about work-authorization timelines.",
        ])
        + sec(4, "Your first 90 days") + checklist([
            "Learn every step of the patient journey in your area — sit with front desk, billing and clinical staff.",
            "Find one process that frustrates people and quietly fix it with data.",
            "Keep a “wins” document with numbers. It becomes your next resume and your review.",
            "Share what you're learning on LinkedIn — it builds your reputation and network.",
        ])
        + """<div class="quote">“The market rewards persistence more than perfection. Community beats competition every time. Your timeline ≠ your worth.”</div>
<h3>When it gets hard</h3><ul class="dots"><li>Build a small support circle of classmates who are job-hunting too — share leads and review each other's resumes.</li><li>Keep one thing you control moving every week: a course, a project, a coffee chat.</li><li>Celebrate small wins. Growth isn't always linear, and setbacks don't define the destination.</li></ul>
<div class="callout"><b>A note on visas and work authorization:</b> rules change and depend on your situation. Always confirm with your school's international student office (DSO) or an immigration attorney — not social media.</div>""",
    ],
    cta_title="Navigating this right now? <i>Let's talk.</i>",
    cta_text="I'm always happy to help fellow international students and early-career professionals in healthcare operations and administration. Book a free 30-minute mentoring chat — bring your questions, your resume or your plan.",
))

# ------------------------------------------------------------------ 6
GUIDES.append(dict(
    slug="healthcare-admin-resume-kit",
    short="Healthcare Admin Resume & LinkedIn Kit",
    audience="Students & early-career",
    title="Healthcare Admin <i>Resume & LinkedIn</i> Kit",
    subtitle="A bullet-point formula with real examples, the keywords recruiters search for, a LinkedIn checklist and message templates that get replies.",
    blurb="Resume formula, keywords, LinkedIn checklist and templates.",
    pages=[
        """<div class="m eyebrow">The formula</div><h2>Every bullet: action + what + result.</h2>
<p class="lead">Recruiters skim. A bullet that starts with a strong verb, says what you did and ends with a number gets read. Here are real examples from my own resume:</p>"""
        + table(["Weak", "Strong"], [
            ["Responsible for scheduling and billing.", "Managed insurance verification, prior authorizations, CPT/ICD-10 coding and billing workflows, <b>reducing claim denials by 20%</b> and administrative bottlenecks by 28%."],
            ["Helped with patient scheduling.", "Improved throughput by <b>25%</b> and cut scheduling conflicts by <b>15%</b> by redesigning scheduling workflows."],
            ["Did patient education.", "Reduced catheter usage from <b>24% to 10%</b> by educating dialysis patients on access placement."],
            ["Worked on staffing.", "Reduced employee turnover by <b>14%</b> through improved staff scheduling."],
            ["Helped with audits.", "Ran monthly medical-record and QM audits for <b>100% compliance</b> on new admissions."],
        ])
        + """<div class="callout"><b>No numbers yet?</b> Use scale (“for a 12-provider clinic”), frequency (“120+ patients a week”), speed (“same-day”), or outcome (“zero findings in survey”). Estimate honestly and be ready to explain.</div>
<h3>Strong verbs for healthcare operations</h3><p>Streamlined · Coordinated · Implemented · Standardized · Reduced · Improved · Led · Launched · Mapped · Audited · Trained · Negotiated · Automated · Analyzed · Partnered</p>""",

        """<div class="m eyebrow">Get found</div><h2>Keywords recruiters search for</h2>"""
        + table(["Area", "Keywords"], [
            ["Operations", "Workflow optimization · SOP development · Process improvement · KPI reporting · Change management · Performance management"],
            ["Patient access & revenue", "Scheduling · Insurance verification · Prior authorization · Revenue cycle management · CPT/ICD-10 · Claim denials"],
            ["Compliance & quality", "HIPAA · OSHA · Quality management (QM/QAPI) · Audits · Survey readiness"],
            ["Systems & data", "Epic · Meditech · Kronos · Tableau · SQL · Dashboards · Excel"],
            ["Leadership", "Cross-functional teams · Stakeholder management · Project management (CAPM/PMP) · Training"],
        ])
        + """<p style="font-size:9pt;color:#5b6b70">Mirror the exact words in each job description where they're true for you — many employers screen with software first.</p>
<h3>One-page resume layout</h3>"""
        + table(["Section", "Tips"], [
            ["Header", "Name, credentials (e.g., MHA, CAPM), city/state, phone, email, LinkedIn URL."],
            ["Summary (2–3 lines)", "Who you are + your strongest result + what you're looking for."],
            ["Experience", "Most recent first. 3–5 formula bullets per role; most impressive first."],
            ["Education", "Degree, school, year; GPA if strong; relevant projects or leadership."],
            ["Certifications & skills", "CAPM, HIPAA/OSHA training, systems you've actually used."],
            ["Leadership & volunteering", "Student orgs, hospital volunteering, events — these matter early in your career."],
        ]),

        """<div class="m eyebrow">LinkedIn</div><h2>Profile checklist</h2>"""
        + checklist([
            "<b>Headline</b> = role + specialty + proof. Example: <i>Healthcare Operations Manager · MHA, CAPM · Building better systems for patients and teams</i>.",
            "<b>Professional photo</b> and a banner that says what you do.",
            "<b>About section</b>: 3 short paragraphs — your story, what you're great at (with one number), what you're looking for.",
            "<b>Experience</b> mirrors your resume bullets, with numbers.",
            "<b>Featured</b>: a project, article, presentation or certificate.",
            "<b>Skills</b> pinned to your top 3 job keywords.",
            "<b>Post</b> once or twice a month: what you learned, an event you attended, a win for your team.",
        ])
        + tpl("Template · Connecting with an alumnus", """<p style="margin:0">Hi [Name] — I'm a [current MHA student / healthcare admin professional] at [school/org], and I noticed you work in [area] at [org]. I'm building my career in healthcare operations and would love to hear how you got there. Would you be open to a 15-minute chat in the next few weeks? Thank you!</p>""")
        + tpl("Template · Following up after an interview", """<p style="margin:0">Hi [Name], thank you for your time today. I enjoyed learning about [specific challenge] and I'm excited about how my experience with [relevant result] could help. If it's helpful, I'd also welcome 2–3 sentences of feedback whatever the outcome. Looking forward to next steps!</p>""")
        + tpl("Template · Asking for a referral", """<p style="margin:0">Hi [Name], I hope you're well! I'm applying for the [role] at [org] (link). Given my work on [result], I think I'd be a strong fit. Would you be comfortable referring me or pointing me to the hiring manager? Happy to send my resume and a short summary.</p>"""),
    ],
    cta_title="Want feedback on <i>your</i> resume?",
    cta_text="Book a free 30-minute mentoring chat and bring your resume or LinkedIn profile — I'll share honest, practical feedback for healthcare operations and admin roles.",
))
