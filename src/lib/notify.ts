/**
 * Sends an email via Resend when RESEND_API_KEY and NOTIFY_EMAIL are set.
 * Without them the payload is only logged, so forms still work in development.
 */
export async function notify(subject: string, lines: string[], replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) {
    console.log(`[notify] ${subject}\n${lines.join("\n")}`);
    return true;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      subject,
      text: lines.join("\n"),
      reply_to: replyTo,
    }),
  });
  return res.ok;
}

export const isEmail = (v: unknown): v is string => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length < 200;
export const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
