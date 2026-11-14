import partyGuests from "../lib/guests.json" with { type:"json" };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const attendanceValues = ["afternoon","evening","both","absent"];
function validSecret(actual, expected) {
  if (typeof expected !== "string" || expected.length < 32 || actual.length !== expected.length) return false;
  let difference = 0; for(let i=0;i<expected.length;i++)difference |= actual.charCodeAt(i)^expected.charCodeAt(i);
  return difference === 0;
}
async function boundedJson(request) {
  if(!request.headers.get("Content-Type")?.includes("application/json"))return {error:"Format de réponse incorrect.",status:415};
  if(Number(request.headers.get("Content-Length")||0)>8192)return {error:"Ton petit mot est trop long.",status:413};
  const reader=request.body?.getReader(),chunks=[];let size=0;
  if(reader)while(true){const chunk=await reader.read();if(chunk.done)break;size+=chunk.value.length;if(size>8192){await reader.cancel();return{error:"Ton petit mot est trop long.",status:413};}chunks.push(chunk.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  try{return{body:JSON.parse(new TextDecoder().decode(bytes))};}catch{return{error:"Ton petit mot est illisible.",status:400};}
}
export async function handleInvitations(request, env, headers) {
 const json=(body,status=200)=>Response.json(body,{status,headers});
 const path=new URL(request.url).pathname;
 if(request.method!=="POST")return json({error:"Méthode indisponible."},405);
 if(path==="/api/organizer") {
  const authorization=request.headers.get("Authorization")||"";
  if(!validSecret(authorization.startsWith("Bearer ")?authorization.slice(7):"",env.ORGANIZER_KEY))return json({error:"Ce lien privé n’est pas valide. Utilise le lien personnel donné à Laura."},401);
  try {
   const {results}=await env.DB.prepare("SELECT guest_id, attendance, films, allergy_status, allergy_detail, note, updated_at FROM invitation_responses").all();
   return json({guests:partyGuests.map(guest=>{const row=results.find(row=>row.guest_id===guest.id);return{...guest,attendance:row?.attendance??null,films:row?JSON.parse(row.films):[],allergyStatus:row?.allergy_status??null,allergyDetail:row?.allergy_detail??"",note:row?.note??"",updatedAt:row?.updated_at??null};})});
  }catch{return json({error:"Les petits mots ne sont pas accessibles pour le moment. Réessaie dans un instant."},503);}
 }
 const parsed=await boundedJson(request);if(parsed.error)return json({error:parsed.error},parsed.status);
 const p=parsed.body;
 if(!p || typeof p!=="object" || !partyGuests.some(guest=>guest.id===p.guestId) || typeof p.token!=="string" || !uuid.test(p.token) || !attendanceValues.includes(p.attendance) || !Array.isArray(p.films) || p.films.length>8 || p.films.some(film=>typeof film!=="string" || !film.trim() || film.length>100) || !["yes","none"].includes(p.allergyStatus) || typeof p.allergyDetail!=="string" || p.allergyDetail.length>1200 || (p.allergyStatus==="yes" && !p.allergyDetail.trim()) || typeof p.note!=="string" || p.note.length>1200)return json({error:"Vérifie tes réponses avant d’envoyer ton petit mot."},400);
 try {
  const result=await env.DB.prepare("INSERT INTO invitation_responses (guest_id, token, attendance, films, allergy_status, allergy_detail, note, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(guest_id) DO UPDATE SET attendance=excluded.attendance, films=excluded.films, allergy_status=excluded.allergy_status, allergy_detail=excluded.allergy_detail, note=excluded.note, updated_at=excluded.updated_at WHERE invitation_responses.token=excluded.token")
   .bind(p.guestId,p.token,p.attendance,JSON.stringify([...new Set(p.films.map(film=>film.trim()))]),p.allergyStatus,p.allergyStatus==="yes"?p.allergyDetail.trim():"",p.note.trim(),new Date().toISOString()).run();
  if((result.meta?.changes??result.changes)===0)return json({error:"Une réponse existe déjà pour ce prénom sur un autre appareil. Préviens Laura directement pour la modifier."},409);
  return json({saved:true});
 }catch{return json({error:"Ton petit mot n’a pas pu être enregistré. Garde cette fenêtre ouverte et réessaie dans un instant."},503);}
}
