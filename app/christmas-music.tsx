"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Music2, Volume2, X } from "lucide-react";

// This upload contains a full album. Only the requested song is played.
const videoId = "GHaRsbAZiyE";
const startSeconds = 8 * 60 + 41;
const endSeconds = 11 * 60 + 20;
const videoUrl = `https://www.youtube.com/watch?v=${videoId}&t=${startSeconds}s`;

export function ChristmasMusicButton() {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const pause = () => { if (document.hidden) setOpen(false); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) {
        setOpen(false); trigger.current?.focus();
      }
    };
    document.addEventListener("visibilitychange", pause);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("visibilitychange", pause); document.removeEventListener("keydown", escape); };
  }, [open]);

  return <div className="christmas-music-control">
    <button ref={trigger} type="button" className="christmas-music-button" aria-expanded={open} aria-controls={open ? "christmas-music-player" : undefined} onClick={() => setOpen(value => !value)} title={open ? "Couper la musique" : "Écouter Santa Claus Is Coming to Town ♫"}>
      {open ? <Volume2 size={16} aria-hidden="true"/> : <Music2 size={16} aria-hidden="true"/>}
      <span>{open ? "Couper la musique" : "Musique de Noël"}</span>
    </button>
    {open && createPortal(<aside id="christmas-music-player" className="christmas-music-player" aria-labelledby="christmas-music-title">
      <div className="music-player-heading"><div><p>LA MUSIQUE DE LAULAU ♫</p><h2 id="christmas-music-title">Santa Claus Is Coming to Town</h2><span>The Andrews Sisters</span></div><button type="button" className="music-player-close" aria-label="Fermer le lecteur et couper la musique" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={18}/></button></div>
      <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1&start=${startSeconds}&end=${endSeconds}&rel=0&hl=fr`} title="Santa Claus Is Coming to Town — The Andrews Sisters, lecteur YouTube" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
      <p className="music-player-help">Appuie sur ▶ si la musique ne démarre pas.</p>
      <a className="music-youtube-link" href={videoUrl} target="_blank" rel="noopener noreferrer">Écouter sur YouTube <ExternalLink size={12} aria-hidden="true"/></a>
    </aside>, document.body)}
  </div>;
}
