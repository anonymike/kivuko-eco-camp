/**
 * Pure date helpers for the booking flow. Dates are carried as ISO
 * strings (YYYY-MM-DD, local calendar date) everywhere — no timezones.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** "2026-09-12" -> Date (local midnight). Returns null for garbage. */
export function parseISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

/** Date -> "2026-09-12" (local). */
export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso, days) {
  const date = parseISO(iso);
  if (!date) return iso;
  date.setDate(date.getDate() + days);
  return toISO(date);
}

/** Whole nights between two ISO dates (check-out minus check-in). */
export function nightsBetween(checkInISO, checkOutISO) {
  const from = parseISO(checkInISO);
  const to = parseISO(checkOutISO);
  if (!from || !to) return 0;
  return Math.round((to - from) / DAY_MS);
}

/** "2026-09-12" -> "12 September 2026" */
export function formatDateLong(iso) {
  const date = parseISO(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "2026-09-12" -> "Sat 12 Sep" — compact, used in summaries. */
export function formatDateShort(iso) {
  const date = parseISO(iso);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** Local-midnight Date for "today" (calendar comparisons must ignore time). */
export function todayISO() {
  return toISO(new Date());
}

export function isBeforeOrSame(a, b) {
  return a <= b;
}

/** First day-of-week of a month as a Date (Monday-based week start). */
export function startOfMonth(year, monthIndex) {
  return new Date(year, monthIndex, 1);
}

/** Builds the 6-row (max) day grid for a month, Monday-first. */
export function monthGrid(year, monthIndex) {
  const first = startOfMonth(year, monthIndex);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];
  // Monday = 1 ... Sunday = 0
  const lead = (first.getDay() + 6) % 7;
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toISO(new Date(year, monthIndex, d)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}