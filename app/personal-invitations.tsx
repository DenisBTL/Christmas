"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Feather, Film, Heart, Mail, Plus, Sparkles, X } from "lucide-react";
import guests from "../lib/guests.json";
import { dateLabel } from "../lib/christmas";
import { FestiveTable } from "./christmas-magic";

type Guest = typeof guests[number];
type Stage = "names" | "letter" | "films" | "allergies" | "sent";
const suggestions = ["Maman, j’ai raté l’avion !", "The Holiday", "Love Actually", "Le Grinch", "Klaus", "Le Pôle Express"];
const tokenKey = "laulau-invitation-tokens-2026";

function Quill() {
  return <svg className="invitation-quill" viewBox="0 0 160 240" fill="none" aria-hidden="true"><path d="M30 217C50 164 78 82 139 15C150 74 139 121 93 153L66 158L73 179L30 217Z" fill="#d1b57a" opacity=".55"/><path d="M30 217C54 151 96 66 139 15M65 155L111 123M79 125L125 92M93 97L133 62M48 194L71 180" stroke="#795434" strokeWidth="2" strokeLinecap="round"/><path d="M20 226L32 211" stroke="#5b3926" strokeWidth="3" strokeLinecap="round"/></svg>;
}

export function PersonalInvitations({ endpoint, onInteract }: { endpoint: string; onInteract: () => void }) {
  const [stage, setStage] = useState<Stage | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);
  const [films, setFilms] = useState<string[]>([]);
  const [movie, setMovie] = useState("");
  const [attendance, setAttendance] = useState("both");
  const [allergyStatus, setAllergyStatus] = useState("");
  const [allergyDetail, setAllergyDetail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [filmPop, setFilmPop] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const focusTarget = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!stage) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; trigger.current?.focus(); };
  }, [Boolean(stage)]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (stage) { dialog.current?.scrollTo(0,0); focusTarget.current?.focus(); } }, [stage]);

  function open() { trigger.current = document.activeElement as HTMLElement; onInteract(); setStage("names"); }
  function close() { dialog.current?.close(); setStage(null); setError(""); }
  function selectGuest(selected: Guest) {
    setGuest(selected); setFilms([]); setMovie(""); setAllergyStatus(""); setAllergyDetail(""); setNote(""); setAttendance("both"); setError(""); setStage("letter");
  }
  function toggleFilm(title: string) {
    setFilms(previous => previous.includes(title) ? previous.filter(item => item !== title) : previous.length < 8 ? [...previous,title] : previous);
    setFilmPop(value => value + 1);
  }
  function addFilm(event: FormEvent) { event.preventDefault(); const title = movie.trim(); if (title && !films.includes(title) && films.length < 8) { toggleFilm(title); setMovie(""); } }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!guest || inFlight.current) return;
    if (!allergyStatus || (allergyStatus === "yes" && !allergyDetail.trim())) { setError("Précise tes allergies ou choisis « Aucune allergie connue »."); return; }
    inFlight.current = true; setSending(true); setError("");
    try {
      // Only the editing token is kept on this device. Dietary information stays on the server.
      let tokens: Record<string,string> = {};
      try { const stored = JSON.parse(localStorage.getItem(tokenKey) || "{}"); if (stored && typeof stored === "object" && !Array.isArray(stored)) tokens = stored; } catch { /* The reply can still be sent. */ }
      const token = typeof tokens[guest.id] === "string" ? tokens[guest.id] : crypto.randomUUID();
      tokens[guest.id] = token;
      try { localStorage.setItem(tokenKey, JSON.stringify(tokens)); } catch { /* Do not block sending. */ }
      const response = await fetch(endpoint.replace(/\/replies$/, "/invitations"), { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({guestId:guest.id,token,attendance,films,allergyStatus,allergyDetail:allergyStatus === "yes" ? allergyDetail.trim() : "",note:note.trim()}) });
      const result = await response.json() as { saved?: boolean; error?: string };
      if (!response.ok || result.saved !== true) throw new Error(result.error || "Ta réponse n’a pas été enregistrée. Réessaie dans un instant.");
      setStage("sent");
    } catch (e) { setError(e instanceof Error ? e.message : "Vérifie ta connexion et réessaie."); }
    finally { inFlight.current = false; setSending(false); }
  }

  return <>
    <section className="personal-invitation-entry" aria-labelledby="personal-entry-title">
      <div className="personal-entry-copy"><span className="mini-label">UN PETIT COURRIER POUR CHACUNE</span><h2 id="personal-entry-title">Ton invitation <em>t’attend.</em></h2><p>Les dates sont fixées : le 12 et le 22 décembre.<br/>Trouve ton prénom pour ouvrir ta lettre ♡</p></div>
      <button id="receive-personal-invitation" className="receive-invitation" onClick={open}><span className="receive-envelope" aria-hidden="true"><Mail size={46} strokeWidth={1}/><span>L</span></span><span>Recevez votre invitation<small>Un clic, ton prénom… et ouvre ta lettre.</small></span><ArrowRight size={24}/></button>
      <div className="invitation-name-preview" aria-label="Les huit invitées et Laura">{guests.map(item => <button key={item.id} onClick={() => { trigger.current = document.activeElement as HTMLElement; onInteract(); selectGuest(item); }}>{item.name}<span aria-hidden="true">✧</span></button>)}<span className="host-place">Laura <Heart size={12}/> votre hôte</span></div>
    </section>
    {stage && <dialog ref={dialog} className={`personal-dialog personal-stage-${stage}`} aria-labelledby="personal-dialog-title" onCancel={event => { event.preventDefault(); if (sending) return; stage === "letter" ? setStage("films") : close(); }}>
      <div className="personal-dialog-nav"><button disabled={sending} onClick={() => stage === "letter" ? setStage("films") : close()}><ArrowLeft size={17}/>{stage === "letter" ? "quitter" : "Retour à la maison"}</button>{stage !== "names" && guest && <span>{guest.name} · {dateLabel(guest.date)}</span>}</div>
      {stage === "names" ? <div className="guest-picker">
        <Feather size={35} strokeWidth={1}/><p className="mini-label">LE COURRIER DE LAULAU</p><h2 ref={focusTarget} tabIndex={-1} id="personal-dialog-title">Il y a une lettre <em>pour toi.</em></h2><p>Clique sur ton prénom.</p>
        <div className="guest-groups">{["2026-12-12","2026-12-22"].map(date => <div key={date}><h3>{dateLabel(date)}</h3>{guests.filter(item => item.date === date).map(item => <button key={item.id} onClick={() => selectGuest(item)}><span className="guest-initial">{item.name[0]}</span>{item.name}<Mail size={17}/></button>)}</div>)}</div>
        <p className="host-signoff">Et moi, Laura, je vous attends à la maison ♡</p>
      </div> : stage === "letter" && guest ? <div className="parchment-arrival" key={guest.id}>
        <div className="invitation-sleeve" aria-hidden="true"><span>L</span></div>
        <article className="personal-parchment">
          <div className="parchment-border" aria-hidden="true"/>
          <div className="letter-crest" aria-hidden="true"><span>✧</span><span>L</span><span>✧</span></div>
          <p className="parchment-kicker">CHEZ LAULAU · NOËL 2026</p>
          <h2 ref={focusTarget} tabIndex={-1} id="personal-dialog-title">Chère {guest.name},</h2>
          <p>Tu es invitée à la maison<br/>le <strong>{dateLabel(guest.date)}</strong><br/><span className="parchment-time">à 15 h 30.</span></p>
          <div className="parchment-divider" aria-hidden="true">✧ ♡ ✧</div>
          <p>Au programme : un bar à chocolat chaud,<br className="desktop-break"/> des cookies à décorer ensemble<br className="desktop-break"/> et une bonne dose d’ambiance de Noël.</p>
          <p>Le soir, on continue avec un apéro dînatoire,<br className="desktop-break"/> des plaids et un film de Noël.</p>
          <p>Viens avec ton meilleur outfit de Noël !<br/>Tu peux passer l’après-midi, le soir, ou les deux.</p>
          <p className="parchment-small">Avant de venir, glisse-moi tes envies de films et tes allergies ou intolérances alimentaires. Le petit formulaire t’attend en quittant cette lettre.</p>
          <p className="parchment-signature">J’ai hâte de vous retrouver.<br/><span>Des bisous, Laulau</span></p>
          <Quill/>
        </article>
        <button className="letter-continue" onClick={() => setStage("films")}>Mes envies de films et mes allergies<ArrowRight size={18}/></button>
      </div> : stage === "films" && guest ? <div className="preferences-card">
        <div className="preference-progress"><span className="active">1 · Les films</span><i/><span>2 · À table</span></div>
        <div className="movie-marquee" key={filmPop} aria-hidden="true"><span>✧</span><Film size={34}/><span className="movie-popcorn">🍿</span><span>✧</span></div>
        <p className="mini-label">SOUS LE PLAID, ON REGARDE QUOI ?</p><h2 ref={focusTarget} tabIndex={-1} id="personal-dialog-title">Un film de Noël<br/><em>à revoir ?</em></h2>
        <p>Les grands classiques, ton préféré, celui que tu connais par cœur… Donne-moi tes idées, {guest.name} !</p>
        <div className="film-suggestions">{suggestions.map(title => <button key={title} aria-pressed={films.includes(title)} onClick={() => toggleFilm(title)}>{films.includes(title) ? <Check size={15}/> : <Plus size={15}/>}{title}</button>)}</div>
        <form className="add-film" onSubmit={addFilm}><label htmlFor="film-title">Un autre film ?</label><div><input id="film-title" value={movie} onChange={event => setMovie(event.target.value)} maxLength={100} placeholder="Le titre de ton film…" disabled={films.length >= 8}/><button type="submit" disabled={!movie.trim() || films.length >= 8} aria-label="Ajouter ce film"><Plus size={20}/></button></div></form>
        {films.length > 0 && <div className="chosen-films" aria-live="polite"><span>Ta petite sélection · {films.length}/8</span>{films.map(title => <button key={title} onClick={() => toggleFilm(title)}>{title}<X size={13}/><span className="sr-only">Retirer</span></button>)}</div>}
        <button className="primary-button preference-next" onClick={() => { const title = movie.trim(); if (title && films.length < 8 && !films.includes(title)) setFilms(previous => [...previous,title]); setMovie(""); setStage("allergies"); }}>La suite<ArrowRight size={18}/></button><button className="preference-link" onClick={() => setStage("letter")}>Relire ma lettre</button>
      </div> : stage === "allergies" && guest ? <form className="preferences-card" onSubmit={save}>
        <div className="preference-progress"><span>1 · Les films</span><i/><span className="active">2 · À table</span></div>
        <Heart className="preference-heart" size={35} strokeWidth={1}/>
        <p className="mini-label">POUR QUE JE PRÉPARE TOUT</p><h2 ref={focusTarget} tabIndex={-1} id="personal-dialog-title">Un petit mot<br/><em>avant de venir.</em></h2>
        <fieldset disabled={sending}><legend>Tu penses venir…</legend><div className="attendance-options">{[["afternoon","L’après-midi"],["evening","Le soir"],["both","Les deux ♡"],["absent","Je ne pourrai pas venir"]].map(([value,label]) => <label key={value}><input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)}/><span>{label}</span></label>)}</div></fieldset>
        <fieldset disabled={sending}><legend>Des allergies ou intolérances alimentaires ?</legend><div className="allergy-options"><label><input type="radio" name="allergies" value="none" required checked={allergyStatus === "none"} onChange={() => setAllergyStatus("none")}/>Aucune allergie connue</label><label><input type="radio" name="allergies" value="yes" checked={allergyStatus === "yes"} onChange={() => setAllergyStatus("yes")}/>Oui, je te précise</label></div>{allergyStatus === "yes" && <label className="preference-field">Ce que je dois savoir<textarea required maxLength={1200} value={allergyDetail} onChange={event => setAllergyDetail(event.target.value)} placeholder="Aliments concernés, traces à éviter, précautions…"/></label>}</fieldset>
        <label className="preference-field">Une préférence alimentaire ou un autre petit mot ? <span>(facultatif)</span><textarea disabled={sending} maxLength={1200} value={note} onChange={event => setNote(event.target.value)} placeholder="Végétarienne, heure d’arrivée, quelque chose à me dire…"/></label>
        <p className="preference-privacy">Ces petits mots sont uniquement pour Laura. Ils ne sont pas affichés aux autres invitées.</p>
        {error && <p className="error-message" role="alert">{error}</p>}
        <button type="submit" className="primary-button preference-next" disabled={sending}>{sending ? "J’envoie ton petit mot…" : "Envoyer à Laulau"}{sending ? <span className="spinner"/> : <Mail size={18}/>}</button>
        <button type="button" className="preference-link" disabled={sending} onClick={() => setStage("films")}><ArrowLeft size={14}/>Revenir aux films</button>
      </form> : stage === "sent" && guest ? <div className="preferences-card preference-success"><span className="sent-wax" aria-hidden="true"><Check size={35}/></span><h2 ref={focusTarget} tabIndex={-1} id="personal-dialog-title">Bien reçu,<br/><em>{guest.name} !</em></h2><p>Ton petit mot est enregistré.<br/>{attendance === "absent" ? "On se retrouvera une prochaine fois ♡" : <>On se retrouve le <strong>{dateLabel(guest.date)}</strong> ♡</>}</p><p>Si quelque chose change, tu peux refaire le formulaire depuis cet appareil. Sur un autre appareil, préviens-moi directement.</p><button className="primary-button preference-next" onClick={close}>Retour à la maison<Heart size={18}/></button></div> : null}
    </dialog>}
  </>;
}

export const PARTY_NAMES = [...guests.map(guest => guest.name), "Laura"];
export function PartyTable() { return <FestiveTable guests={PARTY_NAMES} total={9}/>; }
