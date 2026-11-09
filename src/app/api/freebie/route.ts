// Records a free-guide download request and emails it to Nikki (via notify), then
// returns the PDF link so the visitor can download it right away.
import { NextResponse } from "next/server";
import { audiences, freebieFile, freebies } from "@/content/freebies";
import { isEmail, notify, str } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const guide = freebies.find((f) => f.slug === body?.slug);
  if (!guide || !isEmail(body?.email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const name = str(body?.name, 80);
  await notify(
    `New guide download: ${guide.title}${name ? ` — ${name}` : ""}`,
    [
      `Guide: ${guide.title}`,
      `Audience: ${audiences[guide.audience].label}`,
      `Name: ${name || "(not given)"}`,
      `Email: ${body.email}`,
      `Page: ${str(body?.page, 200)}`,
    ],
    body.email,
  );
  // The download is never blocked by an email hiccup.
  return NextResponse.json({ ok: true, url: freebieFile(guide.slug), title: guide.title });
}
