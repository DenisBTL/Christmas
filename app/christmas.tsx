"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronLeft, Heart, Mail, UsersRound, X } from "lucide-react";
import Gingerbread from "./gingerbread";
import { DATES, dateLabel, type Reply, type Results } from "../lib/christmas";

const storageKey = "noel-laulau-2026-reply";
type View = "invitation" | "results" | null;

export default function Christmas() {
  const [view, setView] = useState<View>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [token, setToken] = useState("");
  const [saved, setSaved] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [resultsError, setResultsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "null") as Reply | null;
      if (stored && typeof stored.firstName === "string" && typeof stored.lastName === "string" && typeof stored.token === "string" && Array.isArray(stored.dates)) {
        setFirstName(stored.firstName); setLastName(stored.lastName); setToken(stored.token);
        setDates(stored.dates.filter(date => DATES.includes(date))); setSaved(true);
      }
    } catch { /* Saving still works when local device storage is unavailable. */ }
  }, []);

  useEffect(() => {
    if (!view) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    const timeout = setTimeout(() => view === "invitation" && !saved ? firstInput.current?.focus() : undefined, 850);
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
      const response = await fetch("/api/replies", { cache: "no-store" });
      const data = await response.json() as Results & { error?: string };
      if (!response.ok) throw new Error(data.error || "Impossible de charger les réponses.");
      setResults(data);
    } catch (e) { setResultsError(e instanceof Error ? e.message : "Vérifie ta connexion et réessaie."); }
    finally { setLoading(false); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (!dates.length) { setError("Choisis au moins une date pour glisser ta réponse dans l’enveloppe."); return; }
    setSending(true);
    const currentToken = token || crypto.randomUUID();
    setToken(currentToken);
    const reply: Reply = { token: currentToken, firstName: firstName.trim(), lastName: lastName.trim(), dates };
    try {
      const response = await fetch("/api/replies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reply) });
      const data = await response.json() as { saved?: boolean; error?: string };
      if (!response.ok) throw new Error(data.error || "L’envoi n’a pas abouti. Réessaie.");
      try { localStorage.setItem(storageKey, JSON.stringify(reply)); } catch { setStorageWarning(true); }
      setFirstName(reply.firstName); setLastName(reply.lastName); setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : "L’envoi n’a pas abouti. Vérifie ta connexion et réessaie."); }
    finally { setSending(false); }
  }

  return <div className="christmas-site">
    <a href="#invitation" className="skip-link">Aller à l’invitation</a>
    <div className="top-rule" />
    <header className="site-header">
      <a className="wordmark" href="#" aria-label="Noël chez Laulau, accueil"><span className="brand-star">✧</span> chez laulau<span className="brand-dot">.</span></a>
      <span className="header-season">Une soirée, de jolis souvenirs</span>
      <button className="header-link" onClick={() => open("results")}>Les disponibilités <ArrowUpRight size={16}/></button>
    </header>

    <main id="invitation">
      <div className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> LES FÊTES APPROCHENT <span/></div>
          <h1>Et si on faisait<br/>un peu de <em>Noël</em><br/>ensemble<span className="title-star">✧</span> ?</h1>
          <p className="hero-description">Une maison qui sent le pain d’épices,<br className="desktop-break"/> une jolie tablée et surtout… vous.</p>
          <p className="hero-subcopy">Avant de sortir les guirlandes, trouvons notre date.</p>
          <button className="primary-button" onClick={() => open("invitation")}><Mail size={18} strokeWidth={1.5}/>{saved ? "Retrouver ma réponse" : "Ouvrir mon invitation"}<ArrowRight size={18}/></button>
          <div className="hero-note"><CalendarDays size={14}/><span>5 dates proposées · Décembre 2026</span></div>
        </div>
        <div className="house-scene">
          <div className="scene-caption"><span>Un petit avant-goût de la magie</span><svg viewBox="0 0 68 51" aria-hidden="true"><path d="M3 2Q63 0 54 43m-9-11 8 13 12-11" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg></div>
          <button className="house-button" onClick={() => open("invitation")} aria-label="Ouvrir la maison en pain d’épices et mon invitation"><Gingerbread/></button>
          <span className="house-hint"><span className="tiny-sparkle">✧</span> Psst… la maison cache une invitation <span className="tiny-sparkle">✧</span></span>
        </div>
      </div>

      <section className="how-it-works" aria-label="Comment répondre à l’invitation">
        <div className="section-aside"><span className="mini-label">LE PLUS BEAU CADEAU ?</span><p>Être tous <em>réunis.</em></p></div>
        <div className="step"><span className="step-icon"><Mail size={21} strokeWidth={1.3}/></span><div><h2>Ouvre l’invitation</h2><p>Une petite lettre rien que pour toi.</p></div></div>
        <div className="step"><span className="step-icon"><CalendarDays size={21} strokeWidth={1.3}/></span><div><h2>Choisis tes dates</h2><p>Coche tous les jours où tu es dispo.</p></div></div>
        <div className="step"><span className="step-icon"><Heart size={21} strokeWidth={1.3}/></span><div><h2>La magie peut commencer</h2><p>Laulau s’occupe de la suite.</p></div></div>
      </section>
    </main>

    <footer className="site-footer"><span>IMAGINÉ AVEC AMOUR, ET UN PEU DE CANNELLE.</span><span className="footer-flower">✧</span><span>Noël chez Laulau · 2026</span></footer>

    {view && <dialog ref={dialog} className={`invitation-dialog ${view === "invitation" ? "with-envelope" : "results-dialog"}`} aria-labelledby="dialog-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === dialog.current) { const box = dialog.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      {view === "invitation" && <div className="envelope" aria-hidden="true"><div className="envelope-back"/><div className="envelope-flap"/><div className="envelope-front"/><div className="envelope-seal">L</div></div>}
      <div className="letter">
        <button className="close-button" onClick={close} aria-label="Fermer l’invitation"><X size={20}/></button>
        <div className="letter-ornament" aria-hidden="true">✧ <span/> ✧</div>
        {view === "invitation" && !saved && <>
          <p className="mini-label">UNE LETTRE POUR TOI</p>
          <h2 id="dialog-title">Tu viens fêter <em>Noël</em> ?</h2>
          <p className="letter-intro">J’aimerais tellement nous réunir.<br/>Dis-moi quand tu es libre, on trouvera le plus joli moment.</p>
          <form onSubmit={submit}>
            <div className="name-fields"><label>Ton prénom<input ref={firstInput} name="given-name" autoComplete="given-name" required maxLength={60} placeholder="Camille" value={firstName} onChange={event => setFirstName(event.target.value)} disabled={sending}/></label><label>Ton nom<input name="family-name" autoComplete="family-name" required maxLength={60} placeholder="Dupont" value={lastName} onChange={event => setLastName(event.target.value)} disabled={sending}/></label></div>
            <fieldset disabled={sending}><legend>Quand est-ce qu’on se retrouve ?</legend><p className="field-help" id="dates-help">Sélectionne toutes tes disponibilités.</p><div className="date-choices" aria-describedby="dates-help">
              {DATES.map(date => <label className={`date-choice ${dates.includes(date) ? "selected" : ""}`} key={date}><input type="checkbox" name="dates" value={date} checked={dates.includes(date)} onChange={() => setDates(previous => previous.includes(date) ? previous.filter(d => d !== date) : [...previous, date])}/><span className="date-day">{date.slice(-2)}</span><span className="date-details"><strong>{dateLabel(date).split(" ")[0]}</strong><span>décembre 2026</span></span><span className="checkbox-art">{dates.includes(date) && <Check size={14}/>}</span></label>)}
            </div></fieldset>
            <p className="selection-count" aria-live="polite">{dates.length ? `${dates.length} date${dates.length > 1 ? "s" : ""} cochée${dates.length > 1 ? "s" : ""}, autant de chances de se retrouver.` : "Plusieurs dates ? C’est encore mieux !"}</p>
            {error && <p className="error-message" role="alert">{error}</p>}
            <button className="primary-button submit-button" disabled={sending} type="submit">{sending ? "Ta réponse s’envole…" : "Envoyer ma réponse"}{sending ? <span className="spinner"/> : <ArrowRight size={18}/>}</button>
            <p className="privacy-note">Ton prénom et l’initiale de ton nom seront visibles dans les disponibilités. Tu pourras modifier ta réponse sur cet appareil.</p>
          </form>
          <div className="letter-signature">À très vite, <em>Laulau</em></div>
        </>}
        {view === "invitation" && saved && <div className="success-content">
          <span className="success-icon"><Check size={26} strokeWidth={1.5}/></span>
          <p className="mini-label">BIEN REÇU, AVEC AMOUR</p>
          <h2 id="dialog-title">Merci, <em>{firstName}</em> !</h2>
          <p className="letter-intro">Tes disponibilités sont enregistrées.<br/>On se rapproche d’un joli Noël ensemble.</p>
          <div className="saved-dates">{DATES.filter(date => dates.includes(date)).map(date => <span key={date}><CalendarDays size={15}/>{dateLabel(date)}</span>)}</div>
          {storageWarning && <p className="error-message">Ton navigateur ne permet pas de conserver ta réponse sur cet appareil. Elle a bien été reçue par Laulau.</p>}
          <button className="primary-button submit-button" onClick={() => { setView("results"); void loadResults(); }}>Voir les disponibilités<ArrowRight size={17}/></button>
          <button className="text-button" onClick={() => { setSaved(false); setError(""); setTimeout(() => firstInput.current?.focus(), 0); }}>Modifier ma réponse</button>
          <div className="letter-signature">Des bisous, <em>Laulau</em></div>
        </div>}
        {view === "results" && <>
          <p className="mini-label">TROUVONS NOTRE MOMENT</p>
          <h2 id="dialog-title">Qui vient <em>quand</em> ?</h2>
          <p className="letter-intro">Le début d’une belle tablée.<br/>La date de la soirée sera confirmée par Laulau.</p>
          {loading ? <div className="results-state" role="status"><span className="spinner"/> On rassemble les petits mots…</div> : resultsError ? <div className="results-state"><p className="error-message" role="alert">{resultsError}</p><button className="text-button" onClick={() => void loadResults()}>Réessayer</button></div> : results && <>
            <div className="reply-total"><UsersRound size={16}/>{results.total} personne{results.total > 1 ? "s" : ""} a{results.total > 1 ? "ont" : ""} répondu</div>
            {results.total === 0 && <p className="empty-note">Les premières réponses feront briller ce calendrier. Et si tu ouvrais le bal ?</p>}
            <div className="results-list">{results.dates.map(item => <div className="result-row" key={item.date}><div className="result-heading"><span>{dateLabel(item.date)}</span><strong>{item.count}<UsersRound size={13}/></strong></div><div className="result-bar"><span style={{ width: `${results.total ? item.count / results.total * 100 : 0}%` }}/></div><p>{item.guests.length ? item.guests.join(" · ") : "Pas encore de réponse pour cette date"}</p></div>)}</div>
          </>}
          <button className="primary-button submit-button" onClick={() => setView("invitation")}><Mail size={17}/>{saved ? "Retrouver ma réponse" : "Donner mes disponibilités"}<ArrowRight size={17}/></button>
          <button className="text-button back-button" onClick={close}><ChevronLeft size={14}/>Retour à la maison</button>
        </>}
      </div>
    </dialog>}
  </div>;
}
