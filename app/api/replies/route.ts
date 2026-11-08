import { getDb } from "../../../db";
import { replies } from "../../../db/schema";
import { DATES, type Results } from "../../../lib/christmas";
export const dynamic = "force-dynamic";
const noCache = { "Cache-Control": "no-store" };
export async function GET() {
  try {
    const rows = await getDb().select({ firstName: replies.firstName, lastName: replies.lastName, dates: replies.dates }).from(replies).limit(1000);
    const result: Results = {
      total: rows.length,
      guests: rows.map(row => row.firstName + " " + Array.from(row.lastName)[0] + "."),
      dates: DATES.map(date => {
        const available = rows.filter(row => row.dates.includes(date));
        return { date, count: available.length, guests: available.map(row => row.firstName + " " + Array.from(row.lastName)[0] + ".") };
      }),
    };
    return Response.json(result, { headers: noCache });
  } catch (error) {
    console.error("Christmas results unavailable", error);
    return Response.json({ error: "Les réponses ne sont pas accessibles pour le moment. Réessaie dans un instant." }, { status: 503, headers: noCache });
  }
}
export async function POST(request: Request) {
  if (request.headers.get("origin") && request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Cette demande ne provient pas de l’invitation." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Format de réponse incorrect." }, { status: 415 });
  }
  const text = await request.text();
  if (text.length > 4096) return Response.json({ error: "La réponse est trop longue." }, { status: 413 });
  let body;
  try { body = JSON.parse(text); } catch { return Response.json({ error: "La réponse est illisible." }, { status: 400 }); }
  if (!body || typeof body !== "object" || typeof body.firstName !== "string" || typeof body.lastName !== "string" || typeof body.token !== "string" || !Array.isArray(body.dates)) {
    return Response.json({ error: "Renseigne ton prénom, ton nom et tes disponibilités." }, { status: 400 });
  }
  const firstName = body.firstName.trim().replace(/\s+/g, " ");
  const lastName = body.lastName.trim().replace(/\s+/g, " ");
  const dates = [...new Set<string>(body.dates)];
  if (!firstName || !lastName || firstName.length > 60 || lastName.length > 60 || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.token) || !dates.length || dates.some(date => !DATES.includes(date))) {
    return Response.json({ error: "Vérifie ton prénom, ton nom (60 caractères maximum) et choisis au moins une date proposée." }, { status: 400 });
  }
  try {
    const values = { token: body.token, firstName, lastName, dates, updatedAt: new Date().toISOString() };
    await getDb().insert(replies).values(values).onConflictDoUpdate({ target: replies.token, set: { firstName, lastName, dates, updatedAt: values.updatedAt } });
    return Response.json({ saved: true }, { headers: noCache });
  } catch (error) {
    console.error("Christmas reply not saved", error);
    return Response.json({ error: "Ta réponse n’a pas pu être enregistrée. Tes choix sont conservés ici : réessaie dans un instant." }, { status: 503, headers: noCache });
  }
}
