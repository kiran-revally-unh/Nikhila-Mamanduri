import { NextResponse } from "next/server";
import { sessionTypes } from "@/content/profile";
import { isEmail, notify, str } from "@/lib/notify";
import { checkSpam } from "@/lib/spam";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const spam = checkSpam(req, body, "book", { max: 4, text: `${str(body?.notes)} ${str(body?.company)}` });
  if (!spam.ok) return spam.silent ? NextResponse.json({ ok: true }) : NextResponse.json({ error: spam.error }, { status: spam.status });
  const session = sessionTypes.find((s) => s.id === body?.session);
  const start = new Date(str(body?.start, 40));
  if (!session || !isEmail(body?.email) || !str(body?.name) || isNaN(start.getTime()) || start.getTime() < Date.now()) {
    return NextResponse.json({ error: "Invalid booking" }, { status: 400 });
  }
  const ok = await notify(
    `New booking: ${session.title} — ${str(body.name, 100)}`,
    [
      `Session: ${session.title} (${session.minutes} min)`,
      `When (UTC): ${start.toISOString()}`,
      `Visitor timezone: ${str(body.timezone, 60)}`,
      `Name: ${str(body.name, 100)}`,
      `Email: ${body.email}`,
      `Company: ${str(body.company, 100)}`,
      `Notes: ${str(body.notes)}`,
    ],
    body.email,
  );
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Email failed" }, { status: 502 });
}
