export const DATES = ["2026-12-12", "2026-12-13", "2026-12-21", "2026-12-22", "2026-12-23"];
export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(date + "T12:00:00Z"));
}
export type Reply = { token: string; firstName: string; dates: string[] };
export type Results = { total: number; guests: string[]; dates: { date: string; count: number; guests: string[] }[] };
