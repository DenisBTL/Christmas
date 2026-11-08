"use client";

import { useState } from "react";
import { Check, Mail, X } from "lucide-react";
import Gingerbread from "./gingerbread";
import { DATES, dateLabel } from "../lib/christmas";

export function GingerFriend({ waving = false }: { waving?: boolean }) {
  return <svg viewBox="0 0 160 180" fill="none" aria-hidden="true" className={waving ? "ginger-friend waving" : "ginger-friend"}>
    <path d="M62 85 39 103Q20 108 24 90L51 68Q56 60 57 50a26 26 0 1 1 46 0q2 10 7 18l26 22q9 17-9 17l-27-20 13 59q0 20-17 13l-16-32-15 31q-17 10-19-8Z" fill="#b77946" stroke="#965a34" strokeWidth="3"/>
    <path d="m55 79-21 18m74-18 20 18M62 110l-6 36m41-36 8 36" stroke="#fff3da" strokeWidth="4" strokeLinecap="round"/>
    <path d="M64 28q16-12 32 0" stroke="#fff3da" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="69" cy="43" r="3" fill="#522f28"/>
    {waving ? <path d="m87 43 7-3" stroke="#522f28" strokeWidth="3" strokeLinecap="round"/> : <circle cx="91" cy="43" r="3" fill="#522f28"/>}
    <path d="M73 52q7 8 14 0" stroke="#522f28" strokeWidth="2.5" strokeLinecap="round"/>
    <ellipse cx="61" cy="51" rx="6" ry="4" fill="#d78c7a"/><ellipse cx="100" cy="51" rx="6" ry="4" fill="#d78c7a"/>
    <path d="m80 72-14-8v17l14-9 14-8v17Z" fill="#743041"/><circle cx="80" cy="72" r="4" fill="#a9525c"/>
    <circle cx="80" cy="92" r="4" fill="#fff3da"/><circle cx="80" cy="108" r="4" fill="#fff3da"/>
  </svg>;
}

function Cocoa({ marshmallows }: { marshmallows: number }) {
  return <svg className="cocoa-drawing" viewBox="0 0 180 160" fill="none" aria-hidden="true">
    <g className="cocoa-steam" stroke="#bf9b69" strokeWidth="2" strokeLinecap="round"><path d="M69 47q-13-12 0-24t0-16M93 43q-13-12 0-24M116 47q-13-12 0-24t0-16"/></g>
    <ellipse cx="88" cy="142" rx="66" ry="7" fill="#e4d4b7"/>
    <path d="M132 74q42-8 29 28-6 15-29 11" stroke="#773043" strokeWidth="11"/>
    <path d="M36 64h102l-6 54q-2 20-47 20-43 0-44-20Z" fill="#813546"/>
    <ellipse cx="87" cy="64" rx="51" ry="11" fill="#f3dfb9"/><ellipse cx="87" cy="65" rx="44" ry="7" fill="#60382b"/>
    {Array.from({ length: marshmallows }, (_, i) => <g key={i} transform={`translate(${58 + i * 21} ${49 - i % 2 * 5}) rotate(${i % 2 ? 12 : -9})`}><rect width="23" height="20" rx="6" fill="#fff9ef" stroke="#e6c9ab"/><circle cx="8" cy="10" r="1" fill="#785342"/><circle cx="16" cy="10" r="1" fill="#785342"/><path d="M9 14q3 3 6 0" stroke="#ba8c7a" strokeLinecap="round"/></g>)}
    <path d="M77 91q10-14 18 0 8-14 17-2 5 9-19 24-23-15-16-22Z" fill="#f5dfb9" transform="translate(-4 0)"/>
  </svg>;
}

const littleJoys = [
  "Les meilleurs cadeaux ont une place autour de la table.",
  "Il reste toujours une place pour toi. Et un biscuit.",
  "Un pull tout doux, des gens qu’on aime. C’est déjà Noël.",
  "Cette année, on collectionne les souvenirs, pas les cadeaux.",
];

export function HousePlayground({ onInvite }: { onInvite: () => void }) {
  const [secret, setSecret] = useState<number | null>(null);
  const [found, setFound] = useState<number[]>([]);
  const [marshmallows, setMarshmallows] = useState(1);
  const [waving, setWaving] = useState(false);
  const [joy, setJoy] = useState(0);
  const openSecret = (index: number) => { setSecret(index); setFound(previous => previous.includes(index) ? previous : [...previous, index]); };
  return <div className={`house-playground ${found.length === 3 ? "house-enchanted" : ""}`} id="maison">
    <div className="scene-caption"><span>Il y a de la magie là-dedans…</span><svg viewBox="0 0 68 51" aria-hidden="true"><path d="M3 2Q63 0 54 43m-9-11 8 13 12-11" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg></div>
    <div className="house-art">
      <Gingerbread/>
      <div className="house-fairy-lights" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <i key={i} style={{ left: `${25+i*5}%`, top: `${46-Math.sin(i/10*Math.PI)*24}%`, animationDelay: `${i*.15}s` }}/>)}</div>
      <button className={`house-hotspot cocoa-hotspot ${found.includes(0) ? "found" : ""}`} onClick={() => openSecret(0)} aria-label="Ouvrir la fenêtre du chocolat chaud"><span className="window-shutter"/><span className="hotspot-sparkle">{found.includes(0) ? "♡" : "✧"}</span></button>
      <button className={`house-hotspot biscuit-hotspot ${found.includes(1) ? "found" : ""}`} onClick={() => openSecret(1)} aria-label="Ouvrir la fenêtre du petit biscuit"><span className="window-shutter"/><span className="hotspot-sparkle">{found.includes(1) ? "♡" : "✧"}</span></button>
      <button className={`house-hotspot gift-hotspot ${found.includes(2) ? "found" : ""}`} onClick={() => openSecret(2)} aria-label="Ouvrir le tiroir aux petits bonheurs"><span className="hotspot-sparkle">{found.includes(2) ? "♡" : "✧"}</span></button>
      <button className="house-hotspot door-hotspot" onClick={onInvite} aria-label="Ouvrir la porte et mon invitation"><span className="door-whisper"><Mail size={12}/>Pour toi</span></button>
    </div>
    <div className="secret-counter" aria-live="polite"><span className="discovery-stars" aria-hidden="true">{[0,1,2].map(i => <span className={found.includes(i) ? "is-found" : ""} key={i}>✧</span>)}</span><span>{found.length === 3 ? "Les trois secrets sont à toi. La maison s’illumine !" : `${found.length}/3 petits secrets · Ouvre les fenêtres et le tiroir étoilé`}</span></div>
    {secret !== null && <section key={secret} className="secret-note" aria-label="Le petit secret de la maison">
      <button className="secret-close" onClick={() => setSecret(null)} aria-label="Fermer le petit secret"><X size={16}/></button>
      <div className="secret-illustration">{secret === 0 ? <Cocoa marshmallows={marshmallows}/> : secret === 1 ? <GingerFriend waving={waving}/> : <div className="fortune-star" aria-hidden="true">✦<span>♡</span></div>}</div>
      <div className="secret-copy"><p className="mini-label">UN PETIT SECRET DE LAULAU</p><h3>{secret === 0 ? "Un nuage de douceur" : secret === 1 ? "Ton nouveau +1" : "Un bonheur à emporter"}</h3><p aria-live="polite">{secret === 0 ? marshmallows === 3 ? "Trois marshmallows heureux. Ta tasse de câlins est prête !" : "Il fait froid dehors. Je te sers un chocolat chaud ?" : secret === 1 ? waving ? "Il t’a fait un clin d’œil ! Il te garde une place au chaud. ♡" : "Il est venu pour les biscuits. Mais il reste pour toi." : littleJoys[joy]}</p>
      <button className="secret-action" onClick={() => secret === 0 ? setMarshmallows(previous => previous === 3 ? 1 : previous + 1) : secret === 1 ? setWaving(previous => !previous) : setJoy(previous => (previous + 1) % littleJoys.length)}>{secret === 0 ? marshmallows === 3 ? "On recommence ?" : "Un marshmallow en plus ♡" : secret === 1 ? waving ? "Encore un coucou ♡" : "Lui faire coucou ♡" : "Un autre petit bonheur ✧"}</button></div>
    </section>}
  </div>;
}

const positions = [{ left: 37, top: 40 }, { left: 63, top: 40 }, { left: 29, top: 73 }, { left: 50, top: 70 }, { left: 71, top: 73 }];

export function DateTree({ selected, onToggle, disabled }: { selected: string[]; onToggle: (date: string) => void; disabled: boolean }) {
  return <div className={`date-tree ${selected.length ? "tree-awake" : ""}`}>
    <svg viewBox="0 0 460 365" preserveAspectRatio="none" fill="none" aria-hidden="true" className="tree-drawing">
      <defs><linearGradient id="fir-color" x1="230" y1="0" x2="230" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#62785c"/><stop offset="1" stopColor="#344e3d"/></linearGradient></defs>
      <ellipse cx="230" cy="344" rx="172" ry="13" fill="#e9dfcc"/>
      <path d="M219 298h22v43h-22Z" fill="#98684b"/>
      <path d="m230 21-74 105h31L120 213h30L72 313q157 21 316 0l-78-100h30l-67-87h31Z" fill="url(#fir-color)" stroke="#e2d9bc" strokeWidth="2" strokeLinejoin="round"/>
      <path d="m161 125 69-17 68 17m-170 84 102-22 101 22M87 304l143-29 140 29" stroke="#c7ccab" strokeWidth="2" opacity=".6"/>
      <path d="M169 111q63 62 128 26M135 191q81 74 185 47M104 281q119 53 250 19" stroke="#dcb671" strokeWidth="3" strokeLinecap="round"/>
      <g className="tree-lights">{[ [185,124],[215,139],[246,143],[278,142],[158,210],[189,228],[222,240],[259,245],[296,242],[125,290],[162,303],[201,311],[244,314],[285,312],[328,307] ].map(([x,y],i) => <circle cx={x} cy={y} r="3.5" key={i} style={{ animationDelay: `${i*.13}s` }}/>)}</g>
      <path className="tree-top-star" d="m230 1 7 16 18 2-13 13 3 19-15-9-16 9 3-19-13-13 18-2Z" fill="#b49a6c" stroke="#e4c98e" strokeWidth="2"/>
      <g className="tree-gifts"><rect x="112" y="321" width="43" height="28" rx="2" fill="#8a3c4d"/><path d="M132 322v27m-20-15h43" stroke="#dcb978" strokeWidth="3"/><path d="M130 320q-17-14-17-3 2 5 17 3 18-15 18-5-2 7-18 5" stroke="#dcb978" strokeWidth="2"/><rect x="286" y="315" width="47" height="32" rx="2" fill="#cead73"/><path d="M309 315v32m-23-20h47" stroke="#f9eed4" strokeWidth="3"/><path d="M309 314q-20-17-20-4 2 6 20 4 17-17 18-6 0 7-18 6" stroke="#f9eed4" strokeWidth="2"/></g>
    </svg>
    {DATES.map((date, i) => <button type="button" className={`date-bauble bauble-${i} ${selected.includes(date) ? "is-lit" : ""}`} key={date} style={{ left: `${positions[i].left}%`, top: `${positions[i].top}%` }} aria-label={dateLabel(date)} aria-pressed={selected.includes(date)} onClick={() => onToggle(date)} disabled={disabled}>
      <span className="bauble-cap"/><span className="bauble-ball"><span className="bauble-number">{date.slice(-2)}</span><span className="bauble-month">DÉC.</span>{selected.includes(date) && <Check className="bauble-check" size={13}/>}</span><span className="bauble-weekday">{dateLabel(date).split(" ")[0]}</span>
    </button>)}
    <span className="tree-whisper" aria-hidden="true">{selected.length === 5 ? "Un Noël tout illuminé ♡" : selected.length ? "Oh, ça brille déjà…" : "À toi de lui donner vie…"}</span>
  </div>;
}

export function Snowfall({ active }: { active: boolean }) {
  if (!active) return null;
  return <div className="snowfall" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <span key={i} style={{ left: `${(i*43)%100}%`, animationDuration: `${12+(i%5)*3}s`, animationDelay: `${-i*2.7}s`, fontSize: `${i%3 === 0 ? 16 : 8}px`, opacity: .22+(i%3)*.12 }}>{i%4 === 0 ? "✧" : "•"}</span>)}</div>;
}

export function ChristmasGarland() {
  return <div className="christmas-garland" aria-hidden="true"><svg viewBox="0 0 1400 100" preserveAspectRatio="none" fill="none"><path d="M-20 4Q350 116 700 17 1050 116 1420 4" stroke="#c7b084" strokeWidth="1"/>{[100,240,380,520,680,820,960,1100,1240,1360].map((x,i) => <g key={x} transform={`translate(${x} ${x<700 ? Math.sin(x/700*Math.PI)*48+12 : Math.sin((x-700)/700*Math.PI)*48+12})`}><path d="M0 0v16" stroke="#bfa572"/>{i%3 === 0 ? <path d="m0 13 3 7 8 1-6 6 1 8-6-4-7 4 2-8-6-6 8-1Z" fill="#b99050"/> : <><rect x="-2" y="14" width="4" height="4" fill="#b99050"/><ellipse cy="26" rx={i%2 ? 8 : 6} ry="10" fill={i%2 ? "#793040" : "#c1a16a"}/><path d="M-5 23q5 5 10 0" stroke="#fbecd0" opacity=".6"/></>}</g>)}</svg></div>;
}

export function LetterDelivery() {
  return <div className="delivery-content" role="status">
    <p className="mini-label">DIRECTION LA MAISON DE LAULAU</p>
    <h2 id="dialog-title">Un petit mot, <em>beaucoup d’amour.</em></h2>
    <div className="delivery-stage" aria-hidden="true">
      <svg viewBox="0 0 320 220" fill="none" className="mailbox-drawing"><ellipse cx="160" cy="201" rx="115" ry="10" fill="#e4d8bf"/><path d="M195 124v75h14v-75" fill="#956d51"/><path d="M128 67q0-34 37-34h46q37 0 37 34v73H128Z" fill="#713043" stroke="#dfbe80" strokeWidth="2"/><path d="M128 70q0-37 33-37 33 0 33 37v70h-66Z" fill="#9d5060" stroke="#f2d7a5" strokeWidth="2"/><path d="M137 87h49" stroke="#3e1d2a" strokeWidth="8" strokeLinecap="round"/><path d="M211 69V13h29v17h-25" stroke="#bd9758" strokeWidth="4"/><path d="M208 108h27" stroke="#d4ac6b" strokeWidth="2"/><path d="m154 51 7 5 7-5-7 13Z" fill="#edd1a0"/><path d="M105 199q-20-19-8-36 13 3 18 21 2-23 17-24 10 23-8 39" fill="#50684c"/></svg>
      <div className="travelling-letter"><Mail size={35} strokeWidth={1}/><span>♡</span></div>
      <span className="delivery-heart heart-one">♡</span><span className="delivery-heart heart-two">✧</span><span className="delivery-heart heart-three">♡</span>
    </div>
    <p className="letter-intro">Tes dates sont enregistrées.<br/>Ton invitation a trouvé son chemin ♡</p>
  </div>;
}

export function FestiveTable({ guests, total }: { guests: string[]; total: number }) {
  return <div className="festive-table" aria-label="Les petits mots déjà reçus">
    <div className="table-cloth"><span className="table-runner"/><span className="table-candle candle-left"/><span className="table-candle candle-right"/><span className="table-centrepiece">✧</span></div>
    {guests.slice(0,6).map((name,i) => <div key={`${name}-${i}`} className={`table-guest guest-${i}`}><span className="guest-plate">♡</span><span className="guest-name">{name}</span></div>)}
    {!total && <span className="table-empty-note">Ta petite place t’attend ♡</span>}
    {total>6 && <span className="table-extra">et {total-6} autre{total>7?"s":""} petit{total>7?"s":""} mot{total>7?"s":""} ♡</span>}
  </div>;
}
