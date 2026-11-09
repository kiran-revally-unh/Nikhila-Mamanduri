"""Builds Nikki's six free guides as designed PDFs (public/freebies/*.pdf) plus a cover
image for each (public/freebies/covers/*.png), using headless Chrome.

Run:  python -I scripts/freebies/build.py
Content lives in content.py next to this file. DRAFT: Nikki should review the copy.
"""
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from content import GUIDES  # noqa: E402

ROOT = HERE.parent.parent
OUT = ROOT / "public" / "freebies"
COVERS = OUT / "covers"
TMP = HERE / ".tmp"
for d in (OUT, COVERS, TMP):
    d.mkdir(parents=True, exist_ok=True)

IMG = (ROOT / "public" / "images").as_uri()
CHROME = next(p for p in [
    r"C:/Program Files/Google/Chrome/Application/chrome.exe",
    r"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
] if pathlib.Path(p).exists())

INK, TEAL, CORAL, MINT, CREAM = "#102a33", "#216f70", "#e97860", "#d8ede7", "#fbf8f4"

CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=DM+Sans:wght@400;500;700;800&family=JetBrains+Mono:wght@500&display=swap');
@page {{ size: Letter; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: 'DM Sans', Arial, sans-serif; color: {INK}; font-size: 10.5pt; line-height: 1.55; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
.page {{ width: 8.5in; min-height: 11in; padding: 0.7in 0.75in 0.8in; position: relative; page-break-after: always; overflow: hidden; }}
.page:last-child {{ page-break-after: auto; }}
.f {{ font-family: 'Fraunces', Georgia, serif; }}
.m {{ font-family: 'JetBrains Mono', monospace; letter-spacing: .08em; text-transform: uppercase; font-size: 8pt; }}
h1 {{ font-family: 'Fraunces', Georgia, serif; font-weight: 600; line-height: 1.02; letter-spacing: -.02em; }}
h2 {{ font-family: 'Fraunces', Georgia, serif; font-weight: 500; font-size: 22pt; line-height: 1.1; letter-spacing: -.015em; margin: 0 0 10pt; }}
h3 {{ font-size: 11.5pt; font-weight: 800; margin: 14pt 0 6pt; }}
p {{ margin: 0 0 8pt; }}
.eyebrow {{ color: {CORAL}; margin-bottom: 8pt; }}
.lead {{ font-size: 12pt; color: #3d5560; }}
.foot {{ position: absolute; left: .75in; right: .75in; bottom: .4in; display: flex; justify-content: space-between; font-size: 7.5pt; color: #7a8b91; border-top: 1px solid #e3e9e7; padding-top: 6pt; }}
.check {{ list-style: none; }}
.check li {{ display: flex; gap: 9pt; padding: 5.5pt 0; border-bottom: 1px solid #edf2f1; break-inside: avoid; }}
.check li::before {{ content: ''; flex: none; width: 11pt; height: 11pt; border: 1.5px solid {TEAL}; border-radius: 3pt; margin-top: 2pt; }}
.check b {{ font-weight: 700; }}
.sec {{ display: flex; align-items: baseline; gap: 8pt; margin: 14pt 0 4pt; break-after: avoid; }}
.sec .n {{ font-family: 'Fraunces', serif; font-size: 20pt; color: {CORAL}; font-weight: 300; }}
.sec .t {{ font-size: 12.5pt; font-weight: 800; }}
table {{ width: 100%; border-collapse: collapse; font-size: 9.5pt; margin: 6pt 0 12pt; }}
th {{ text-align: left; background: {INK}; color: #fff; padding: 6pt 8pt; font-weight: 700; }}
td {{ padding: 6pt 8pt; border-bottom: 1px solid #e3e9e7; vertical-align: top; }}
tr:nth-child(even) td {{ background: #f6faf9; }}
.callout {{ background: {MINT}; border-radius: 12pt; padding: 12pt 14pt; margin: 10pt 0; break-inside: avoid; }}
.callout.dark {{ background: {INK}; color: #fff; }}
.callout.coral {{ background: #fde9e3; }}
.quote {{ font-family: 'Fraunces', serif; font-style: italic; font-size: 15pt; line-height: 1.3; color: {TEAL}; border-left: 3px solid {CORAL}; padding-left: 12pt; margin: 12pt 0; }}
.steps {{ counter-reset: s; list-style: none; }}
.steps li {{ counter-increment: s; position: relative; padding: 0 0 10pt 30pt; break-inside: avoid; }}
.steps li::before {{ content: counter(s); position: absolute; left: 0; top: 0; width: 20pt; height: 20pt; border-radius: 50%; background: {TEAL}; color: #fff; font-weight: 800; font-size: 9pt; display: grid; place-items: center; }}
.tpl {{ border: 1.5px dashed {TEAL}; border-radius: 10pt; padding: 12pt 14pt; margin: 8pt 0 12pt; font-size: 10pt; background: #fbfdfc; break-inside: avoid; }}
.tpl .label {{ color: {TEAL}; margin-bottom: 6pt; }}
.grid2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }}
.card {{ border: 1px solid #e3e9e7; border-radius: 10pt; padding: 10pt 12pt; break-inside: avoid; }}
.score td:last-child, .score th:last-child {{ width: 92pt; text-align: center; white-space: nowrap; }}
.boxes {{ letter-spacing: 3pt; color: #9fb2b6; }}
.kpi td:first-child {{ font-weight: 700; width: 30%; }}
ul.dots {{ padding-left: 14pt; }} ul.dots li {{ margin: 0 0 4pt; }}
.cover {{ background: {INK}; color: #fff; display: flex; flex-direction: column; padding: .75in; }}
.cover .glow1 {{ position: absolute; right: -1.6in; top: -1.6in; width: 5in; height: 5in; border-radius: 50%; background: radial-gradient(circle, {CORAL} 0%, transparent 65%); opacity: .55; }}
.cover .glow2 {{ position: absolute; left: -1.8in; bottom: -1.8in; width: 6in; height: 6in; border-radius: 50%; background: radial-gradient(circle, {TEAL} 0%, transparent 65%); opacity: .9; }}
.cover > * {{ position: relative; }}
.cover h1 {{ font-size: 46pt; margin-top: 1.1in; }}
.cover h1 i {{ color: #f6b4a3; font-weight: 400; }}
.cover .sub {{ font-size: 14pt; color: rgba(255,255,255,.8); margin-top: 16pt; max-width: 5.6in; }}
.cover .tag {{ display: inline-block; border: 1px solid rgba(255,255,255,.3); border-radius: 30pt; padding: 5pt 12pt; color: #f6b4a3; }}
.cover .by {{ margin-top: auto; display: flex; align-items: center; gap: 14pt; border-top: 1px solid rgba(255,255,255,.2); padding-top: 16pt; }}
.cover .by img {{ width: 64pt; height: 64pt; border-radius: 50%; object-fit: cover; object-position: 50% 15%; background: {TEAL}; }}
.cover .num {{ font-family: 'Fraunces', serif; font-size: 150pt; font-weight: 800; line-height: .8; color: rgba(255,255,255,.07); position: absolute; right: .5in; bottom: 1.6in; }}
.end {{ background: {CREAM}; }}
.end .big {{ font-family: 'Fraunces', serif; font-size: 34pt; line-height: 1.05; font-weight: 400; }}
.end .big i {{ color: {TEAL}; }}
.qr {{ display: flex; gap: 16pt; align-items: center; margin-top: 18pt; background: #fff; border-radius: 14pt; padding: 14pt; border: 1px solid #e6ded4; }}
.qr img {{ width: 92pt; height: 92pt; }}
.sessions td:nth-child(2), .sessions td:nth-child(3) {{ white-space: nowrap; }}
"""


def foot(guide, n):
    return f'<div class="foot"><span>{guide["short"]} · Nikhila (Nikki) Mamanduri, MHA, CAPM</span><span>{n}</span></div>'


def cover(g, i):
    return f"""<section class="page cover"><div class="glow1"></div><div class="glow2"></div>
<div style="display:flex;justify-content:space-between;align-items:center"><span class="f" style="font-size:16pt;font-weight:600">Nikki<span style="color:{CORAL}">.</span></span><span class="tag m">Free guide · {g['audience']}</span></div>
<h1>{g['title']}</h1><p class="sub">{g['subtitle']}</p>
<div class="num">0{i}</div>
<div class="by"><img src="{IMG}/nikki-cutout.png"><div><div class="f" style="font-size:15pt">Nikhila (Nikki) Mamanduri</div><div style="font-size:10pt;color:rgba(255,255,255,.7)">Healthcare Operations Manager · MHA, CAPM</div></div></div></section>"""


def ending(g):
    return f"""<section class="page end"><div class="m eyebrow">Next step</div>
<div class="big">{g['cta_title']}</div>
<p class="lead" style="margin-top:12pt">{g['cta_text']}</p>
<table class="sessions"><tr><th>Session</th><th>Length</th><th>Price</th><th>Best for</th></tr>
<tr><td><b>Intro call</b></td><td>15 min</td><td>Free</td><td>Say hello and see if we're a fit.</td></tr>
<tr><td><b>Mentoring chat</b></td><td>30 min</td><td>Free</td><td>Career questions, MHA advice or a resume review.</td></tr>
<tr><td><b>Working session</b></td><td>60 min</td><td>On request</td><td>A focused session on your clinic or project.</td></tr></table>
<div class="qr"><img src="{IMG}/nikki-qr.png"><div><div class="f" style="font-size:16pt">Save my digital card</div><p style="margin:4pt 0 0;color:#5b6b70">Scan to save my contact, book a call from my website, or connect on LinkedIn: linkedin.com/in/nikki-mamanduri</p></div></div>
<div style="margin-top:22pt" class="callout"><b>About Nikki.</b> Nikhila (Nikki) Mamanduri is a Healthcare Operations Manager at Medi-Weightloss® Thousand Oaks with an MHA from the University of New Haven (3.79 GPA) and PMI's CAPM®. She has worked across medical devices (Relisys), dialysis (U.S. Renal Care), academic medicine (Tufts Medicine) and clinic operations, and believes better systems create stronger teams — and a better experience for every patient.</div>
<p style="font-size:8pt;color:#8a7f74;margin-top:14pt">This guide shares general operational practices for educational purposes. It isn't legal, billing-compliance, immigration or medical advice — check payer rules, your organization's policies and the relevant authorities for your situation.</p>
{foot(g, '')}</section>"""


def build_html(g, i, only_cover=False):
    pages = [cover(g, i)]
    if not only_cover:
        for n, body in enumerate(g["pages"], start=2):
            pages.append(f'<section class="page">{body}{foot(g, n)}</section>')
        pages.append(ending(g))
    return f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{''.join(pages)}</body></html>"


def chrome(*args):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--user-data-dir={TMP / 'profile'}", "--virtual-time-budget=8000", *args],
                   capture_output=True, timeout=180)


for i, g in enumerate(GUIDES, start=1):
    html = TMP / f"{g['slug']}.html"
    html.write_text(build_html(g, i), encoding="utf-8")
    pdf = OUT / f"{g['slug']}.pdf"
    chrome("--no-pdf-header-footer", f"--print-to-pdf={pdf}", html.as_uri())
    cov = TMP / f"{g['slug']}-cover.html"
    cov.write_text(build_html(g, i, only_cover=True), encoding="utf-8")
    png = COVERS / f"{g['slug']}.png"
    chrome("--force-device-scale-factor=0.75", f"--screenshot={png}", "--window-size=816,1056", cov.as_uri())
    print(g["slug"], pdf.exists() and pdf.stat().st_size, png.exists())
