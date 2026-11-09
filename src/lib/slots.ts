/** Offset (ms) of `tz` from UTC at the given instant. */
function tzOffset(date: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - date.getTime();
}

/** The UTC instant of a wall-clock time in `tz`. */
export function zonedTime(y: number, m: number, d: number, h: number, min: number, tz: string) {
  const guess = Date.UTC(y, m, d, h, min);
  const first = guess - tzOffset(new Date(guess), tz);
  return new Date(guess - tzOffset(new Date(first), tz));
}

/** Calendar date (y, m, d) of an instant in `tz`. */
export function zonedDate(date: Date, tz: string) {
  const s = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
}

export function slotsForDay(
  day: { y: number; m: number; d: number },
  minutes: number,
  opts: { tz: string; startHour: number; endHour: number; days: number[] },
  now = new Date(),
) {
  const weekday = new Date(Date.UTC(day.y, day.m, day.d)).getUTCDay();
  if (!opts.days.includes(weekday)) return [];
  const out: Date[] = [];
  const step = Math.max(15, Math.min(minutes, 30));
  for (let t = opts.startHour * 60; t + minutes <= opts.endHour * 60; t += step) {
    const slot = zonedTime(day.y, day.m, day.d, Math.floor(t / 60), t % 60, opts.tz);
    if (slot.getTime() > now.getTime() + 2 * 3600_000) out.push(slot);
  }
  return out;
}

export function icsFor(opts: { start: Date; minutes: number; title: string; description: string }) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.start.getTime() + opts.minutes * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//portfolio//booking//EN",
    "BEGIN:VEVENT",
    `UID:${fmt(opts.start)}-${Math.random().toString(36).slice(2)}@portfolio`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(opts.start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
