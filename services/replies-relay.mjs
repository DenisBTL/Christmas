const allowedOrigin = "https://denisbtl.github.io";
const dates = ["2026-12-12","2026-12-13","2026-12-21","2026-12-22","2026-12-23"];
const commonHeaders = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Vary": "Origin" };
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = origin === allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin, "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "600" } : {};
    const headers = { ...commonHeaders, ...cors };
    const json = (body, status = 200) => Response.json(body, { status, headers });
    if (url.pathname === "/health") return json({ ok: true });
    if (url.pathname !== "/api/replies") return json({ error: "Page introuvable." }, 404);
    if (origin && origin !== allowedOrigin) return json({ error: "Cette origine ne peut pas envoyer de réponse." }, 403);
    if (!["GET","POST","OPTIONS"].includes(request.method)) return json({ error: "Méthode indisponible." }, 405);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    let payload;
    if (request.method === "POST") {
      if (!request.headers.get("Content-Type")?.includes("application/json")) return json({ error: "Format de réponse incorrect." }, 415);
      if (Number(request.headers.get("Content-Length") || 0) > 4096) return json({ error: "La réponse est trop longue." }, 413);
      const reader = request.body?.getReader();
      const chunks = []; let size = 0;
      if (reader) while (true) {
        const chunk = await reader.read(); if (chunk.done) break;
        size += chunk.value.length;
        if (size > 4096) { await reader.cancel(); return json({ error: "La réponse est trop longue." }, 413); }
        chunks.push(chunk.value);
      }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      try { payload = JSON.parse(new TextDecoder().decode(bytes)); } catch { return json({ error: "La réponse est illisible." }, 400); }
      if (!payload || typeof payload.firstName !== "string" || typeof payload.lastName !== "string" || typeof payload.token !== "string" || !Array.isArray(payload.dates)) return json({error:"Renseigne ton prénom, ton nom et tes disponibilités."},400);
      payload.firstName = payload.firstName.trim().replace(/\s+/g," ");
      payload.lastName = payload.lastName.trim().replace(/\s+/g," ");
      payload.dates = [...new Set(payload.dates)];
      if (!payload.firstName || !payload.lastName || payload.firstName.length>60 || payload.lastName.length>60 || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.token) || !payload.dates.length || payload.dates.some(date=>!dates.includes(date))) return json({error:"Vérifie ton prénom, ton nom et choisis au moins une date proposée."},400);
    }
    try {
      if(!env.DB)throw Error("No database binding");
      if(request.method==="GET"){
        const {results} = await env.DB.prepare("SELECT first_name, last_name, dates FROM replies ORDER BY updated_at DESC LIMIT 1000").all();
        const rows=results.map(row=>({name:row.first_name+" "+Array.from(row.last_name)[0]+".",dates:JSON.parse(row.dates)}));
        return json({total:rows.length,guests:rows.map(row=>row.name),dates:dates.map(date=>{const available=rows.filter(row=>row.dates.includes(date));return{date,count:available.length,guests:available.map(row=>row.name)}})});
      }
      await env.DB.prepare("INSERT INTO replies (token, first_name, last_name, dates, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(token) DO UPDATE SET first_name=excluded.first_name, last_name=excluded.last_name, dates=excluded.dates, updated_at=excluded.updated_at").bind(payload.token,payload.firstName,payload.lastName,JSON.stringify(payload.dates),new Date().toISOString()).run();
      return json({saved:true});
    } catch(error) {
      console.error("Christmas responses unavailable",error);
      return json({error:"L’enregistrement ne fonctionne pas pour le moment. Tes choix restent ici : réessaie dans un instant."},503);
    }
  },
};
