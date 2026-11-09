"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Volume2 } from "lucide-react";
import { ChristmasMusic } from "../lib/christmas-music";

export function ChristmasMusicButton() {
  const player = useRef<ChristmasMusic | null>(null);
  const [playing, setPlaying] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const pause = () => {
      if (document.hidden) { player.current?.stop(); setPlaying(false); }
    };
    document.addEventListener("visibilitychange", pause);
    return () => { document.removeEventListener("visibilitychange", pause); player.current?.stop(); };
  }, []);

  async function toggle() {
    setError("");
    if (playing) { player.current?.stop(); setPlaying(false); return; }
    setStarting(true);
    const music = player.current ??= new ChristmasMusic();
    try { setPlaying(await music.start()); }
    catch { music.stop(); setPlaying(false); setError("La musique n’a pas démarré. Tu peux réessayer."); }
    finally { setStarting(false); }
  }

  return <div className="christmas-music-control">
    <button type="button" className={`christmas-music-button ${playing ? "is-playing" : ""}`} aria-pressed={playing} disabled={starting} onClick={() => void toggle()} title={playing ? "Couper la musique" : "Écouter Vive le vent ♫"}>
      {playing ? <Volume2 size={16} aria-hidden="true"/> : <Music2 size={16} aria-hidden="true"/>}
      <span>{starting ? "Un instant…" : playing ? "Couper la musique" : "Musique de Noël"}</span>
      <span className="music-lights" aria-hidden="true"><i/><i/><i/></span>
    </button>
    {error && <span className="music-error" role="alert">{error}</span>}
  </div>;
}
