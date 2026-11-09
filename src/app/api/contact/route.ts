import { NextResponse } from "next/server";
import { isEmail, notify, str } from "@/lib/notify";
import { checkSpam } from "@/lib/spam";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const spam = checkSpam(req, body, "contact", { text: `${str(body?.subject)} ${str(body?.message, 5000)}` });
  if (!spam.ok) return spam.silent ? NextResponse.json({ ok: true }) : NextResponse.json({ error: spam.error }, { status: spam.status });
  if (!isEmail(body?.email) || !str(body?.name) || !str(body?.message)) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
  const ok = await notify(
    `Contact: ${str(body.subject, 150) || "New message"}`,
    [`From: ${str(body.name, 100)} <${body.email}>`, "", str(body.message, 5000)],
    body.email,
  );
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Email failed" }, { status: 502 });
}
