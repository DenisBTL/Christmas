"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Check, Mail, X } from "lucide-react";
import Gingerbread from "./gingerbread";
import Reindeer, { GoldenReindeer } from "./reindeer";
import { DATES, dateLabel } from "../lib/christmas";

export function GingerFriend({ waving = false }: { waving?: boolean }) {
  const cookieId=useId().replace(/:/g,"");
  return <svg viewBox="0 0 160 180" fill="none" aria-hidden="true" className={waving ? "ginger-friend waving" : "ginger-friend"}>
    <defs><radialGradient id={`${cookieId}-dough`} cx="40%" cy="27%" r="77%"><stop stopColor="#d9ae73"/><stop offset=".65" stopColor="#bd8b50"/><stop offset="1" stopColor="#996536"/></radialGradient><pattern id={`${cookieId}-crumb`} width="11" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="4" r=".6" fill="#744722" opacity=".28"/><circle cx="8" cy="10" r=".65" fill="#ffe3b1" opacity=".35"/><circle cx="9" cy="2" r=".35" fill="#744722" opacity=".25"/></pattern><path id={`${cookieId}-shape`} d="M60 65C51 67 41 74 29 78c-17 6-12 27 4 26 8 0 16-8 23-10l-13 46c-5 18 15 25 24 11l13-27 14 27c10 15 29 6 24-11l-14-46c8 3 16 10 24 10 17 0 20-21 4-26L102 65l-5-6a27 27 0 1 0-34 0Z"/></defs>
    <use href={`#${cookieId}-shape`} fill={`url(#${cookieId}-dough)`} stroke="#a16c39" strokeWidth="2.5" strokeLinejoin="round"/>
    <use href={`#${cookieId}-shape`} fill={`url(#${cookieId}-crumb)`}/>
    <path d="m31 83 4 6-3 6 6 4m84-16-4 6 3 6-6 4M48 135l6-4 5 7 7-3m29 0 7 3 5-7 6 4" stroke="#fff7e8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="70" cy="40" r="3.5" fill="#fffaf0"/>
    {waving?<path d="m88 40 7-2" stroke="#fffaf0" strokeWidth="3.5" strokeLinecap="round"/>:<circle cx="91" cy="40" r="3.5" fill="#fffaf0"/>}
    <path d="M69 51q11 13 23 0" stroke="#fffaf0" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="64" cy="50" r="2.5" fill="#b84a47"/><circle cx="97" cy="50" r="2.5" fill="#b84a47"/>
    <path d="M60 66q20 13 40 0l3 10q-24 12-45 0Z" fill="#a93842"/>
    <path d="m87 76 14 1 7 27-12 4Z" fill="#b9434b"/>
    <g fill="#fff4dc"><circle cx="67" cy="74" r="1.4"/><circle cx="80" cy="76" r="1.4"/><path d="m96 84 2-3 1 3 3 1-3 1-1 3-2-3-3-1Zm3 13 2-3 1 3 3 1-3 1-1 3-2-3-3-1Z"/></g>
    <circle cx="78" cy="95" r="4.5" fill="#4d8a5c" stroke="#fff9e9" strokeWidth="2"/><circle cx="78" cy="111" r="4.5" fill="#4d8a5c" stroke="#fff9e9" strokeWidth="2"/>
  </svg>;
}

function Cocoa({ marshmallows }: { marshmallows: number }) {
  return <svg className="cocoa-drawing" viewBox="0 0 180 160" fill="none" aria-hidden="true">
    <g className="cocoa-steam" stroke="#bf9b69" strokeWidth="2" strokeLinecap="round"><path d="M69 47q-13-12 0-24t0-16M93 43q-13-12 0-24M116 47q-13-12 0-24t0-16"/></g>
    <ellipse cx="88" cy="142" rx="66" ry="7" fill="#e4d4b7"/>
    <path d="M132 74q42-8 29 28-6 15-29 11" stroke="#773043" strokeWidth="11"/>
    <path d="M36 64h102l-6 54q-2 20-47 20-43 0-44-20Z" fill="#813546"/>
    <ellipse cx="87" cy="64" rx="51" ry="11" fill="#f3dfb9"/><ellipse cx="87" cy="65" rx="44" ry="7" fill="#60382b"/>
    {Array.from({ length: Math.min(marshmallows,9) }, (_, i) => <g key={i} className="cup-marshmallow" transform={`translate(${45 + i % 4 * 20} ${49 - Math.floor(i/4)*16}) rotate(${i % 2 ? 12 : -9})`}><rect width="23" height="20" rx="6" fill="#fff9ef" stroke="#e6c9ab"/><circle cx="8" cy="10" r="1" fill="#785342"/><circle cx="16" cy="10" r="1" fill="#785342"/><path d="M9 14q3 3 6 0" stroke="#ba8c7a" strokeLinecap="round"/></g>)}
    <path d="M77 91q10-14 18 0 8-14 17-2 5 9-19 24-23-15-16-22Z" fill="#f5dfb9" transform="translate(-4 0)"/>
  </svg>;
}

function MarshmallowRain() {
  return <div className="marshmallow-rain" aria-hidden="true">{Array.from({length:36},(_,i)=><span className="falling-marshmallow" key={i} style={{left:`${(i*37)%100}%`,animationDelay:`${i*.055}s`,animationDuration:`${3.2+i%4*.3}s`,"--mallow-tilt":`${i%2?30:-25}deg`} as CSSProperties}><span className="mallow-piece"><i/><i/><b>ᴗ</b></span></span>)}</div>;
}

function ChristmasOutfit() {
  return <svg viewBox="0 0 180 180" fill="none" aria-hidden="true"><path d="m61 30-30 17-21 50 28 13 15-28-3 70h80l-3-70 15 28 28-13-21-50-30-17q-29 26-58 0Z" fill="#813449" stroke="#e5c295" strokeWidth="3" strokeLinejoin="round"/><path d="M61 30q29 26 58 0m-68 109h78M17 88l26 12m94 0 26-12" stroke="#fff0d4" strokeWidth="6"/><g transform="translate(90 89)" stroke="#fff0d4" strokeWidth="3" strokeLinecap="round">{[0,60,120].map(a=><g key={a} transform={`rotate(${a})`}><path d="M0-25v50m-8-42 8 8 8-8m-16 34 8-8 8 8"/></g>)}</g><path d="M64 123h52" stroke="#e6bd7f" strokeWidth="2" strokeDasharray="3 6"/></svg>;
}

function DoorLeaf() {
  return <svg viewBox="0 0 72 126" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M1 126V36a35 35 0 0 1 70 0v90Z" fill="#ae784b" stroke="#edcfa4" strokeWidth="2"/><path d="M8 126V36a28 28 0 0 1 56 0v90" stroke="#fff1d6" strokeWidth="1.5"/><path d="M18 39a18 18 0 0 1 36 0v13H18Z" fill="#e6bf7b" stroke="#fff1d6" strokeWidth="2"/><path d="M36 22v30M19 39h34m-32-9 15 9 15-9" stroke="#fff1d6" strokeWidth="1.5"/><path d="M14 63h44m-42 5 10 4 10-4 10 4 10-4" stroke="#fff1d6" strokeWidth="1.5" strokeLinecap="round"/>{[0,60,120,180,240,300].map(angle=><ellipse key={angle} cx="36" cy="86" rx="2.8" ry="6" transform={`rotate(${angle} 36 92)`} stroke="#fff1d6" strokeWidth="1.5"/>)}<circle cx="36" cy="92" r="2.7" fill="#f9e2b1"/><path d="m29 113 7-5 7 5-7 5Z" stroke="#fff1d6" strokeWidth="1.5"/><circle cx="59" cy="84" r="3" fill="#f4d49a" stroke="#84522e" strokeWidth="1"/></svg>;
}

export function HousePlayground({ onInvite }: { onInvite: () => void }) {
  const [secret, setSecret] = useState<number | null>(null);
  const secretDialog = useRef<HTMLDialogElement>(null);
  const [found, setFound] = useState<number[]>([]);
  const [marshmallows, setMarshmallows] = useState(1);
  const marshmallowPrompt = ["Il en manque !", "Rajoutes-en encore !", "Encore un peu…", "On ne s’arrête pas là !", "Allez, encore un !", "Ça va déborder…", "Marshmallooooow ♡"][Math.min(marshmallows - 1, 6)];
  const [waving, setWaving] = useState(false);
  const [rain, setRain] = useState(0);
  const [reindeerInside, setReindeerInside] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [parade, setParade] = useState<{ id: number; side: "left" | "right"; startX: number; startY: number; endX: number; endY: number } | null>(null);
  const [reindeerMessage, setReindeerMessage] = useState("");
  useEffect(()=>{
    if(secret===null)return;
    secretDialog.current?.showModal();
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{secretDialog.current?.close();document.body.style.overflow=previousOverflow;};
  },[secret]);
  useEffect(() => {
    if (!parade) return;
    const timer = setTimeout(() => {
      setReindeerInside(true);
      setDoorOpen(false);
      setParade(null);
      setReindeerMessage("Les trois rennes et le golden déguisé en renne sont rentrés. La porte est fermée.");
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 7200);
    return () => clearTimeout(timer);
  }, [parade]);
  useEffect(() => {
    if (!rain) return;
    const timer=setTimeout(()=>setRain(0),5500);
    return ()=>clearTimeout(timer);
  },[rain]);
  function inviteReindeer(side: "left" | "right", button: HTMLButtonElement) {
    const art = button.parentElement!.getBoundingClientRect();
    const door = button.parentElement!.querySelector(".door-hotspot")!.getBoundingClientRect();
    const size = window.innerWidth < 700 ? 82 : 118;
    setDoorOpen(true); setSecret(null);
    setReindeerMessage("Trois petits rennes arrivent, suivis d’un golden déguisé en renne. Ils entrent par la porte !");
    setParade({ id: Date.now(), side, startX: side === "left" ? -art.left-size : window.innerWidth-art.left+size, startY: door.bottom-art.top+12, endX: door.left-art.left+door.width/2-size/2, endY: door.top-art.top+door.height/2-size/2 });
  }
  const openSecret = (index: number) => { setSecret(index); setFound(previous => previous.includes(index) ? previous : [...previous, index]); };
  return <div className={`house-playground ${found.length === 3 ? "house-enchanted" : ""}`} id="maison">
    <div className="scene-caption"><span>Bienvenue chez moi !</span><svg viewBox="0 0 68 51" aria-hidden="true"><path d="M3 2Q63 0 54 43m-9-11 8 13 12-11" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg></div>
    <div className="house-art">
      <Gingerbread/>
      <div className="house-fairy-lights" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <i key={i} style={{ left: `${25+i*5}%`, top: `${46-Math.sin(i/10*Math.PI)*24}%`, animationDelay: `${i*.15}s` }}/>)}</div>
      <button className={`house-hotspot cocoa-hotspot ${found.includes(0) ? "found" : ""}`} onClick={() => openSecret(0)} aria-label="Ouvrir la fenêtre du chocolat chaud" aria-expanded={secret===0}><span className="window-shutter shutter-left"/><span className="window-shutter shutter-right"/><span className="hotspot-sparkle">{found.includes(0) ? "♡" : "✧"}</span></button>
      <button className={`house-hotspot biscuit-hotspot ${found.includes(1) ? "found" : ""}`} onClick={() => openSecret(1)} aria-label="Ouvrir la fenêtre des cookies"><span className="window-shutter shutter-left"/><span className="window-shutter shutter-right"/><span className="hotspot-sparkle">{found.includes(1) ? "♡" : "✧"}</span></button>
      <button className={`house-hotspot gift-hotspot ${found.includes(2) ? "found" : ""}`} onClick={() => openSecret(2)} aria-label="Ouvrir la fenêtre de la tenue de Noël"><span className="heart-sparkle">{found.includes(2) ? "♡" : "✧"}</span></button>
      {(["left","right"] as const).map(side => <div className={`house-hotspot bay-hotspot bay-${side} bay-static`} key={side} aria-hidden="true">
        <span className="bay-glass-pane pane-left"/><span className="bay-glass-pane pane-right"/><span className="bay-handle"/><span className="bay-welcome">♡</span>
      </div>)}
      <button className={`house-hotspot door-hotspot ${doorOpen?"door-is-open":""} ${reindeerInside?"door-has-guests":""}`} onClick={event=>inviteReindeer("left",event.currentTarget)} aria-label="Ouvrir la porte et accueillir les rennes" aria-expanded={doorOpen}><span className="door-interior" aria-hidden="true">{reindeerInside&&<span className="door-indoor-guests"><Reindeer leader/><Reindeer/><GoldenReindeer/></span>}</span><span className="door-leaf" aria-hidden="true"><DoorLeaf/></span></button>
      {parade && <div key={parade.id} className={`reindeer-parade from-${parade.side}`} aria-hidden="true">{[0,1,2,3].map(i=><div key={i} className={`reindeer-actor ${i===3?"golden-actor":""}`} style={{ "--deer-from-x": `${parade.startX}px`, "--deer-from-y": `${parade.startY}px`, "--deer-to-x": `${parade.endX}px`, "--deer-to-y": `${parade.endY}px`, animationDelay: `${i===3?3.9:i*.48}s` } as CSSProperties}><div className="deer-direction">{i===3?<GoldenReindeer/>:<Reindeer leader={i===0}/>}</div></div>)}</div>}
    </div>
    <div className="secret-counter" aria-live="polite"><span className="discovery-stars" aria-hidden="true">{[0,1,2].map(i => <span className={found.includes(i) ? "is-found" : ""} key={i}>✧</span>)}</span><span>{found.length === 3 ? "Tu sais tout ! Il ne reste qu’à choisir une date." : "Ouvre les fenêtres de l’étage pour voir ce qu’on fera."}</span></div>
    <p className="bay-hint">Les rennes attendent devant la porte. Tu leur ouvres ? ♡</p>
    <span className="sr-only" role="status">{reindeerMessage}</span>
    {secret !== null && <dialog ref={secretDialog} className="secret-window-dialog" aria-labelledby="secret-title" onCancel={event=>{event.preventDefault();setSecret(null);}} onClick={event=>{if(event.target===secretDialog.current){const box=secretDialog.current.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)setSecret(null);}}}><Snowfall active/><section key={secret} className="secret-note" aria-label="Les infos de Noël">
      <button className="secret-close" onClick={() => setSecret(null)} aria-label="Fermer le petit secret"><X size={16}/></button>
      <div className="secret-illustration">{secret === 0 ? <Cocoa marshmallows={marshmallows}/> : secret === 1 ? <GingerFriend waving={waving}/> : <ChristmasOutfit/>}</div>
      <div className="secret-copy"><p className="mini-label">{secret===0?"HOT CHOCOLATE BAR":secret===1?"L’APRÈS-MIDI":"DRESS CODE"}</p><h3 id="secret-title">{secret === 0 ? "Un chocolat chaud ?" : secret === 1 ? "On décore des cookies !" : "Ton meilleur outfit de Noël !"}</h3><p>{secret === 0 ? "Il y aura un bar à hot chocolate, plein de toppings et de quoi grignoter. Tu veux des marshmallows ?" : secret === 1 ? "Je prépare les cookies et on les décore ensemble l'après-midi. Si tu en as envie, tu peux apporter ce que tu veux pour les décorer, par exemple :" : "Pull de Noël, pyjama, serre-tête à rennes… fais-toi plaisir 😂"}</p>
      {secret===0&&<p className="marshmallow-prompt" role="status" aria-live="polite">{marshmallowPrompt}</p>}
      {secret===1&&<><ul className="cookie-supplies"><li>Du glaçage ou des stylos alimentaires</li><li>Des vermicelles et des perles en sucre</li><li>Des <span className="edible-glitter">paillettes<span className="edible-glitter-sparks" aria-hidden="true"><i>✦</i><i>✧</i><i>✦</i><i>✧</i><i>·</i><i>·</i></span></span> alimentaires</li><li>Des petites décos à croquer</li></ul><p className="glaze-note">Le glaçage que je prépare sera fait avec des blancs d’œufs pasteurisés, notamment pour les personnes enceintes. Je vous préciserai aussi comment bien conserver vos cookies.</p><p><strong>Tout est facultatif, c'est vraiment si tu en as envie !</strong></p><p>Et chacune repart avec son sachet de cookies, même si tu viens seulement le soir.</p></>}
      {secret===2&&<p>Tu peux venir l’après-midi, le soir ou aux deux. Préviens-moi juste un peu avant pour que je puisse m’organiser.</p>}
      <button className="secret-action" onClick={() => {if(secret===0){const next=marshmallows+1;setMarshmallows(next);if(next>=7)setRain(Date.now());}else if(secret===1)setWaving(previous=>!previous);else setSecret(null);}}>{secret === 0 ? "Encore un marshmallow ♡" : secret === 1 ? waving ? "Il te fait coucou ♡" : "Faire coucou au cookie ♡" : "C’est noté !"}</button></div>
    </section>{rain>0&&<MarshmallowRain key={rain}/>}</dialog>}
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
    <span className="tree-whisper" aria-hidden="true">{selected.length ? "C’est noté ♡" : "Quelles dates te vont ?"}</span>
  </div>;
}

export function Snowfall({ active }: { active: boolean }) {
  if (!active) return null;
  return <div className="snowfall" aria-hidden="true">{Array.from({ length: 100 }, (_, i) => <span key={i} style={{ left: `${(i*43)%100}%`, "--static-top": `${(i*31)%100}%`, width: `${2+i%5}px`, height: `${2+i%5}px`, animationDuration: `${8+(i%7)*2}s`, animationDelay: `${-i*2.7}s`, opacity: .32+(i%4)*.15 } as CSSProperties}/>)}</div>;
}

export function ChristmasGarland() {
  return <div className="christmas-garland" aria-hidden="true"><svg viewBox="0 0 1400 100" preserveAspectRatio="none" fill="none"><path d="M-20 4Q350 116 700 17 1050 116 1420 4" stroke="#c7b084" strokeWidth="1"/>{[100,240,380,520,680,820,960,1100,1240,1360].map((x,i) => <g key={x} transform={`translate(${x} ${x<700 ? Math.sin(x/700*Math.PI)*48+12 : Math.sin((x-700)/700*Math.PI)*48+12})`}><path d="M0 0v16" stroke="#bfa572"/>{i%3 === 0 ? <path d="m0 13 3 7 8 1-6 6 1 8-6-4-7 4 2-8-6-6 8-1Z" fill="#b99050"/> : <><rect x="-2" y="14" width="4" height="4" fill="#b99050"/><ellipse cy="26" rx={i%2 ? 8 : 6} ry="10" fill={i%2 ? "#793040" : "#c1a16a"}/><path d="M-5 23q5 5 10 0" stroke="#fbecd0" opacity=".6"/></>}</g>)}</svg></div>;
}

export function LetterDelivery() {
  return <div className="delivery-content" role="status">
    <p className="mini-label">C’EST ENVOYÉ</p>
    <h2 id="dialog-title">Tes dispos <em>sont envoyées !</em></h2>
    <div className="delivery-stage" aria-hidden="true">
      <svg viewBox="0 0 320 220" fill="none" className="mailbox-drawing"><ellipse cx="160" cy="201" rx="115" ry="10" fill="#e4d8bf"/><path d="M195 124v75h14v-75" fill="#956d51"/><path d="M128 67q0-34 37-34h46q37 0 37 34v73H128Z" fill="#713043" stroke="#dfbe80" strokeWidth="2"/><path d="M128 70q0-37 33-37 33 0 33 37v70h-66Z" fill="#9d5060" stroke="#f2d7a5" strokeWidth="2"/><path d="M137 87h49" stroke="#3e1d2a" strokeWidth="8" strokeLinecap="round"/><path d="M211 69V13h29v17h-25" stroke="#bd9758" strokeWidth="4"/><path d="M208 108h27" stroke="#d4ac6b" strokeWidth="2"/><path d="m154 51 7 5 7-5-7 13Z" fill="#edd1a0"/><path d="M105 199q-20-19-8-36 13 3 18 21 2-23 17-24 10 23-8 39" fill="#50684c"/></svg>
      <div className="travelling-letter"><Mail size={35} strokeWidth={1}/><span>♡</span></div>
      <span className="delivery-heart heart-one">♡</span><span className="delivery-heart heart-two">✧</span><span className="delivery-heart heart-three">♡</span>
    </div>
    <p className="letter-intro">Elles sont bien enregistrées.<br/>Je te tiens au courant pour la date. ♡</p>
  </div>;
}

export function FestiveTable({ guests, total }: { guests: string[]; total: number }) {
  return <div className={`festive-table ${guests.length > 6 ? "all-guests" : ""}`} aria-label="Les prénoms autour de la table">
    <div className="table-cloth"><span className="table-runner"/><span className="table-candle candle-left"/><span className="table-candle candle-right"/><span className="table-centrepiece">✧</span></div>
    {guests.map((name,i) => <div key={`${name}-${i}`} className={`table-guest guest-${i}`}><span className="guest-plate">♡</span><span className="guest-name">{name}</span></div>)}
    {!total && <span className="table-empty-note">Ta petite place t’attend ♡</span>}
  </div>;
}
