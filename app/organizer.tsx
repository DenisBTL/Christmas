"use client";
import { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, ArrowLeft } from "lucide-react";
import { dateLabel } from "../lib/christmas";

type Row = { id:string; name:string; date:string; attendance:string|null; films:string[]; allergyStatus:string|null; allergyDetail:string; note:string; updatedAt:string|null };
const attendanceLabels:Record<string,string>={both:"Après-midi et soir",afternoon:"Après-midi",evening:"Soir",absent:"Ne peut pas venir"};
export function Organizer({ endpoint, secret }: { endpoint:string; secret:string }) {
 const [rows,setRows]=useState<Row[]>([]),[loading,setLoading]=useState(false),[error,setError]=useState(""),[updated,setUpdated]=useState("");
 const loadingRef=useRef(false);
 async function refresh() {
  if(loadingRef.current)return;loadingRef.current=true;setLoading(true);setError("");
  try { const response=await fetch(endpoint.replace(/\/replies$/,"/organizer"),{method:"POST",headers:{Authorization:"Bearer "+secret},cache:"no-store"});const data=await response.json() as {error?:string;guests:Row[]};if(!response.ok)throw Error(data.error||"Impossible de charger les réponses.");setRows(data.guests);setUpdated(new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})); }
  catch(e){setError(e instanceof Error?e.message:"Vérifie ta connexion puis réessaie.");} finally{setLoading(false);loadingRef.current=false;}
 }
 useEffect(()=>{void refresh();},[]); // eslint-disable-line react-hooks/exhaustive-deps
 function download() {
  const cell=(value:string)=>'"'+(/^[\s]*[=+@-]/.test(value)?"'"+value:value).replaceAll('"','""')+'"';
  const records=[["Date","Prénom","Présence","Films","Allergies / intolérances","Autre petit mot","Réponse reçue"],...rows.map(row=>[dateLabel(row.date),row.name,attendanceLabels[row.attendance||""]||"Pas encore de réponse",row.films.join(" · "),row.allergyStatus==="none"?"Aucune allergie connue":row.allergyStatus==="yes"?row.allergyDetail:"Non renseigné",row.note,row.updatedAt?new Date(row.updatedAt).toLocaleString("fr-FR"):""])];
  const blob=new Blob(["\uFEFF"+records.map(row=>row.map(cell).join(";")).join("\r\n")],{type:"text/csv;charset=utf-8;"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="Noel-chez-Laulau-2026.csv";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <main className="organizer-page"><header><a className="organizer-back" href={location.pathname}><ArrowLeft size={13}/> Retour au site</a><p className="mini-label">LE CARNET DE LAURA</p><h1>Qui vient,<br/><em>et les petits mots.</em></h1><p>Les huit invitées sont réparties sur les deux dates. Toi, Laura, tu les accueilles à la maison ♡<br/>Ce lien donne accès aux réponses privées : garde-le pour toi.</p><div className="organizer-actions"><button onClick={()=>void refresh()} disabled={loading}><RefreshCw size={14}/> {loading?"Actualisation…":"Actualiser"}</button><button onClick={download} disabled={!rows.length}><Download size={14}/> Télécharger le tableau</button></div><p className="organizer-status" aria-live="polite">{error?<span role="alert" className="error-message">{error}{rows.length>0?" Les données affichées datent de la précédente actualisation.":""}</span>:loading?"Je récupère les petits mots…":updated?`Mis à jour à ${updated} · ${rows.filter(row=>row.updatedAt).length}/8 réponses reçues`:""}</p></header>
 {["2026-12-12","2026-12-22"].map(date=><section key={date}><h2>{dateLabel(date)} · 15 h 30</h2><div className="organizer-table-wrap"><table><caption className="sr-only">Réponses du {dateLabel(date)}</caption><thead><tr><th scope="col">Invitée</th><th scope="col">Présence</th><th scope="col">Envies de films</th><th scope="col">Allergies / intolérances</th><th scope="col">Autre petit mot</th></tr></thead><tbody>{rows.filter(row=>row.date===date).map(row=><tr key={row.id}><td><strong>{row.name}</strong><small>{row.updatedAt?"Réponse reçue":"En attente"}</small></td><td>{attendanceLabels[row.attendance||""]||<span className="no-answer">Pas encore de réponse</span>}</td><td>{row.films.length?row.films.map((film,i)=><div key={i}>{film}</div>):"—"}</td><td className={row.allergyStatus==="yes"?"allergy-alert":""}>{row.allergyStatus==="none"?"Aucune allergie connue":row.allergyStatus==="yes"?row.allergyDetail:"Non renseigné"}</td><td>{row.note||"—"}</td></tr>)}</tbody></table></div></section>)}</main>;
}
