"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft, Cookie, Film, Coffee, Mail, Sparkles, UsersRound, X } from "lucide-react";
import { ChristmasGarland, DateTree, FestiveTable, GingerFriend, HousePlayground, LetterDelivery, Snowfall } from "./christmas-magic";
import { DATES, dateLabel, type Reply, type Results } from "../lib/christmas";
import { ChristmasMusicButton } from "./christmas-music";
import { PersonalInvitations, PARTY_NAMES } from "./personal-invitations";
import { Organizer } from "./organizer";

const storageKey = "noel-laulau-2026-reply";
type View = "invitation" | "results" | null;

export default function Christmas({ replyEndpoint = "/api/replies" }: { replyEndpoint?: string } = {}) {
  const [organizerSecret, setOrganizerSecret] = useState("");
  const [personalOpen, setPersonalOpen] = useState(false);
  useEffect(() => { const read = () => { const match = window.location.hash.match(/^#organisation\/([a-f0-9]{64})$/); setOrganizerSecret(match?.[1] || ""); }; read(); window.addEventListener("hashchange", read); return () => window.removeEventListener("hashchange", read); }, []);
  const [view, setView] = useState<View>(null);
  const [firstName, setFirstName] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [token, setToken] = useState("");
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [resultsError, setResultsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [night, setNight] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try { if (sessionStorage.getItem("noel-laulau-night") === "1") setNight(true); } catch { /* The colour transition also works without browser storage. */ }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("christmas-night", night);
    return () => document.body.classList.remove("christmas-night");
  }, [night]);

  function welcomeChristmas() {
    if (night) return;
    setNight(true);
    try { sessionStorage.setItem("noel-laulau-night", "1"); } catch { /* Keep the theme for the current visit. */ }
  }

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "null") as Reply | null;
      if (stored && typeof stored.firstName === "string" && typeof stored.token === "string" && Array.isArray(stored.dates)) {
        setFirstName(stored.firstName); setToken(stored.token);
        setDates(stored.dates.filter(date => DATES.includes(date))); setSaved(true);
      }
    } catch { /* Saving still works when local device storage is unavailable. */ }
  }, []);

  useEffect(() => {
    if (!view) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    const timeout = setTimeout(() => view === "invitation" && !saved ? firstInput.current?.focus() : undefined, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 3900);
    return () => { clearTimeout(timeout); document.body.style.overflow = previousOverflow; lastTrigger.current?.focus(); };
  }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  function open(next: View) {
    lastTrigger.current = document.activeElement as HTMLElement;
    setError(""); setView(next);
    if (next === "results") void loadResults();
  }

  function close() { dialog.current?.close(); setView(null); }

  async function loadResults() {
    setLoading(true); setResultsError("");
    try {
      const response = await fetch(replyEndpoint, { cache: "no-store" });
      const data = await response.json() as Results & { error?: string };
      if (!response.ok) throw new Error(data.error || "Impossible de charger les réponses.");
      setResults(data);
    } catch (e) { setResultsError(e instanceof Error ? e.message : "Vérifie ta connexion et réessaie."); }
    finally { setLoading(false); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (!dates.length) { setError("Allume au moins une boule du sapin pour choisir une date."); return; }
    setSending(true);
    const currentToken = token || crypto.randomUUID();
    setToken(currentToken);
    const reply: Reply = { token: currentToken, firstName: firstName.trim(), dates };
    try {
      const response = await fetch(replyEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reply) });
      const data = await response.json() as { saved?: boolean; error?: string };
      if (!response.ok) throw new Error(data.error || "L’envoi n’a pas abouti. Réessaie.");
      try { localStorage.setItem(storageKey, JSON.stringify(reply)); } catch { setStorageWarning(true); }
      setFirstName(reply.firstName);
      setDelivery(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) await new Promise(resolve => setTimeout(resolve, 2300));
      setSaved(true); setDelivery(false);
    } catch (e) { setError(e instanceof Error ? e.message : "L’envoi n’a pas abouti. Vérifie ta connexion et réessaie."); }
    finally { setSending(false); }
  }

  if (organizerSecret) return <Organizer endpoint={replyEndpoint} secret={organizerSecret}/>;

  return <div className={`christmas-site ${night ? "night-mode" : "snow-white"}`} onClickCapture={welcomeChristmas}>
    <Snowfall active/>
    <ChristmasGarland/>
    <a href="#invitation" className="skip-link">Aller à l’invitation</a>
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="#" aria-label="Chez Laulau, accueil"><span className="brand-star">✧</span> Chez Laulau</a>
      <span className="header-season">Cookies, chocolat chaud et film de Noël</span>
      <div className="header-actions">{!personalOpen && <ChristmasMusicButton/>}<button className="header-link" onClick={() => open("results")}>Les réponses <ArrowUpRight size={16}/></button></div>
    </header>

    <main id="invitation">
      <div className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> NOËL À LA MAISON · DÉCEMBRE 2026 <span/></div>
          <h1>Tu es invitée<br/>à mon après-midi<br/><em>de Noël !</em><span className="title-star">✧</span></h1>
          <p className="hero-description">Comme l’année dernière, je vous invite à la maison<br className="desktop-break"/> pour une après-midi et une soirée de Noël !</p>
          <p className="hero-subcopy">Tu peux venir l’après-midi, le soir, ou rester pour les deux.<br/>Les dates sont fixées : retrouve la tienne dans ta lettre.</p>
          <button className="primary-button" onClick={() => document.getElementById("receive-personal-invitation")?.click()}><Mail size={20} strokeWidth={1.5}/>Recevez votre invitation<ArrowRight size={18}/></button>
          <button className="text-button hero-availability" onClick={() => open("invitation")}>{saved ? "Retrouver mes disponibilités" : "Revoir le choix des dates"}</button>
          <div className="hero-note"><CalendarDays size={14}/><span>12 et 22 décembre · Rendez-vous à 15 h 30</span></div>
          <a className="ginger-whisper" href="#maison"><GingerFriend/><span><strong>Le programme est dans les fenêtres.</strong><span>Et les rennes attendent devant la porte ♡</span></span><Sparkles size={17}/></a>
        </div>
        <div className="house-scene">
          <HousePlayground onInvite={() => open("invitation")}/>
        </div>
      </div>

      <PersonalInvitations endpoint={replyEndpoint} onInteract={welcomeChristmas} onOpenChange={setPersonalOpen}/>

      <section className="how-it-works" aria-label="Comment répondre à l’invitation">
        <div className="section-aside"><span className="mini-label">AU PROGRAMME</span><p>On remet <em>ça ?</em></p></div>
        <div className="step"><span className="step-icon"><Cookie size={21} strokeWidth={1.3}/></span><div><h2>L’après-midi</h2><p>On décore les cookies que je prépare.</p></div></div>
        <div className="step"><span className="step-icon"><Coffee size={21} strokeWidth={1.3}/></span><div><h2>Bar à chocolat chaud</h2><p>Et plein de choses à grignoter.</p></div></div>
        <div className="step"><span className="step-icon"><Film size={21} strokeWidth={1.3}/></span><div><h2>Le soir</h2><p>Apéro dînatoire, plaids et film de Noël.</p></div></div>
      </section>
    </main>

    <footer className="site-footer"><span>DES COOKIES, DES COPINES ET NOËL.</span><span className="footer-flower">✧</span><span>Noël chez Laulau · 2026</span></footer>

    {view && <dialog ref={dialog} className={`invitation-dialog ${view === "invitation" ? "with-envelope" : "results-dialog"}`} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === dialog.current) { const box = dialog.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <Snowfall active/>
      {view === "invitation" && <div className="envelope" aria-hidden="true"><div className="envelope-back"/><div className="envelope-flap"/><div className="envelope-front"/><div className="envelope-seal">L</div></div>}
      <div className={`letter ${delivery ? "delivery-letter" : ""}`}>
        <button className="close-button" onClick={close} aria-label="Fermer l’invitation"><X size={20}/></button>
        <div className="letter-ornament" aria-hidden="true">✧ <span/> ✧</div>
        {view === "invitation" && delivery && <LetterDelivery/>}
        {view === "invitation" && !saved && !delivery && <>
          <p className="mini-label">NOËL À LA MAISON</p>
          <h2 id="dialog-title">{firstName.trim() ? <>Tu es invitée, <em>{firstName.trim()}</em> !</> : <>Tu viens à la <em>maison</em> ?</>}</h2>
          <p className="letter-intro">Coche toutes les dates qui t’arrangent.<br/>Je choisirai celle où nous sommes le plus nombreuses.</p>
          <form onSubmit={submit}>
            <div className="name-fields first-name-only"><label>Ton prénom<input ref={firstInput} name="given-name" autoComplete="given-name" required maxLength={60} placeholder="Camille" value={firstName} onChange={event => setFirstName(event.target.value)} disabled={sending}/></label></div>
            <fieldset disabled={sending}><legend>Quelles dates t’arrangent ?</legend><p className="field-help" id="dates-help">Allume une boule pour chaque date où tu es dispo. Reclique pour l’enlever.</p><div aria-describedby="dates-help"><DateTree selected={dates} onToggle={date => { setError(""); setDates(previous => previous.includes(date) ? previous.filter(d => d !== date) : [...previous,date]); }} disabled={sending}/></div></fieldset>
            <p className="selection-count" aria-live="polite">{dates.length ? `Tu es dispo ${dates.length===1?"le":"les"} ${DATES.filter(date => dates.includes(date)).map(date => date.slice(-2)).join(", ")} décembre.` : "Tu peux choisir plusieurs dates."}</p>
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="primary-button submit-button" disabled={sending} type="submit">{sending ? "Envoi en cours…" : "Envoyer mes disponibilités"}{sending ? <span className="spinner"/> : <Mail size={18}/>}</button>
            <p className="privacy-note">Ton prénom sera visible dans les disponibilités. Tu pourras modifier ta réponse sur cet appareil.</p>
          </form>
          <div className="letter-signature">À très vite, <em>Laulau</em></div>
        </>}
        {view === "invitation" && saved && !delivery && <div className="success-content">
          <div className="success-friend"><GingerFriend waving/><span className="success-bubble">C’est envoyé ! ♡</span></div>
          <p className="mini-label">C’EST NOTÉ</p>
          <h2 id="dialog-title">Merci, <em>{firstName}</em> !</h2>
          <p className="letter-intro">J’ai bien reçu tes dates.<br/>Je te confirmerai le jour retenu.</p>
          <div className="saved-dates">{DATES.filter(date => dates.includes(date)).map(date => <span key={date}><CalendarDays size={15}/>{dateLabel(date)}</span>)}</div>
          {storageWarning && <p className="error-message">Ton navigateur ne permet pas de conserver ta réponse sur cet appareil. Elle a bien été reçue par Laulau.</p>}
          <button className="primary-button submit-button" onClick={() => { setView("results"); void loadResults(); }}>Voir les réponses<ArrowRight size={17}/></button>
          <button className="text-button" onClick={() => { setSaved(false); setError(""); setTimeout(() => firstInput.current?.focus(), 0); }}>Modifier ma réponse</button>
          <div className="letter-signature">Des bisous, <em>Laulau</em></div>
        </div>}
        {view === "results" && <>
          <p className="mini-label">LES DISPONIBILITÉS</p>
          <h2 id="dialog-title">Qui est <em>dispo</em> ?</h2>
          <p className="letter-intro">Neuf à la maison, en comptant Laura ♡<br/>Les dates retenues sont les 12 et 22 décembre.</p>
          {loading ? <div className="results-state" role="status"><span className="spinner"/> On rassemble les petits mots…</div> : resultsError ? <div className="results-state"><p className="error-message" role="alert">{resultsError}</p><button className="text-button" onClick={() => void loadResults()}>Réessayer</button></div> : results && <>
            <FestiveTable guests={PARTY_NAMES} total={9}/>
            <div className="reply-total"><UsersRound size={16}/>{results.total} personne{results.total > 1 ? "s" : ""} {results.total > 1 ? "ont" : "a"} répondu</div>
            {results.total === 0 && <p className="empty-note">Pas encore de réponse. Tu ouvres le bal ?</p>}
            <div className="results-list">{results.dates.map(item => <div className="result-row" key={item.date}><div className="result-heading"><span>{dateLabel(item.date)}</span><strong>{item.count}<UsersRound size={13}/></strong></div><div className="result-bar"><span style={{ width: `${results.total ? item.count / results.total * 100 : 0}%` }}/></div><p>{item.guests.length ? item.guests.join(" · ") : "Pas encore de réponse pour cette date"}</p></div>)}</div>
          </>}
          <button className="primary-button submit-button" onClick={() => setView("invitation")}><Mail size={17}/>{saved ? "Retrouver ma réponse" : "Donner mes disponibilités"}<ArrowRight size={17}/></button>
          <button className="text-button back-button" onClick={close}><ChevronLeft size={14}/>Retour à la maison</button>
        </>}
      </div>
    </dialog>}
  </div>;
}
