// Lightweight spam protection for the site's forms — invisible to real visitors.
//  1. Honeypot: a hidden "website" field people never see; bots fill it in.
//  2. Timing: forms sent within ~1.5s of appearing are almost always bots.
//  3. Rate limit: a few submissions per visitor (IP) per window, per form.
//  4. Content: drops messages stuffed with links or obvious spam words.
// Bots get a quiet fake "ok" so they don't learn they were blocked.

type Verdict = { ok: true } | { ok: false; status: number; error: string; silent: boolean };

const MIN_ELAPSED_MS = 1500;
const hits = new Map<string, number[]>();

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/** Returns false when this IP has sent more than `max` requests to `bucket` within `windowMs`. */
export function underRateLimit(req: Request, bucket: string, max: number, windowMs: number) {
  const key = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > windowMs)) hits.delete(k);
  }
  return recent.length <= max;
}

const SPAM_WORDS = /\b(viagra|casino|crypto ?invest|seo services|backlinks?|loan offer|porn|bitcoin doubler|forex signals)\b/i;

export function checkSpam(
  req: Request,
  body: Record<string, unknown> | null,
  bucket: string,
  opts: { max?: number; windowMs?: number; text?: string } = {},
): Verdict {
  if (!body) return { ok: false, status: 400, error: "Invalid request", silent: false };

  // 1. Honeypot
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, status: 200, error: "spam", silent: true };
  }
  // 2. Too fast to be human (only when the form reported its timing)
  const elapsed = Number(body.elapsed);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_ELAPSED_MS) {
    return { ok: false, status: 200, error: "spam", silent: true };
  }
  // 3. Rate limit
  if (!underRateLimit(req, bucket, opts.max ?? 5, opts.windowMs ?? 10 * 60 * 1000)) {
    return { ok: false, status: 429, error: "Too many attempts — please try again in a few minutes.", silent: false };
  }
  // 4. Content
  const text = opts.text ?? "";
  const links = (text.match(/https?:\/\//gi) ?? []).length;
  if (links > 2 || SPAM_WORDS.test(text)) {
    return { ok: false, status: 200, error: "spam", silent: true };
  }
  return { ok: true };
}
