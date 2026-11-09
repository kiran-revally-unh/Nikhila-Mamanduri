import { NextResponse } from "next/server";
import { isEmail, notify } from "@/lib/notify";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!isEmail(body?.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  const ok = await notify("New newsletter subscriber", [body.email]);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Failed" }, { status: 502 });
}
