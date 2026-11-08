export default function Reindeer({ leader = false }: { leader?: boolean }) {
  return <svg viewBox="0 0 160 140" fill="none" aria-hidden="true" className="little-reindeer">
    <ellipse cx="75" cy="127" rx="45" ry="5" fill="#ecd8b2" opacity=".35"/>
    <path d="M42 75q-24-22-22-7 1 15 22 16" fill="#a56f43" stroke="#7d4c32" strokeWidth="2"/>
    <g className="deer-legs-a"><path d="m48 91-6 30 9 1 13-28M93 91l5 31 9-1-1-32" fill="#a76c41" stroke="#825232" strokeWidth="2"/><path d="m40 120 12 1m45 0 12-1" stroke="#52372c" strokeWidth="5" strokeLinecap="round"/></g>
    <g className="deer-legs-b"><path d="m60 95 4 29 10-1-1-29m36-11 9 28 9-3-8-32" fill="#c98b54" stroke="#956037" strokeWidth="2"/><path d="m63 123 13-1m40-11 12-3" stroke="#62402c" strokeWidth="5" strokeLinecap="round"/></g>
    <path d="M35 78q3-26 43-23l22 5 9-26 16 9-8 43q-6 20-43 18-35 0-39-26Z" fill="#bd8250" stroke="#8c5837" strokeWidth="2"/>
    <path d="M55 90q25 15 46-4-8 24-33 17Z" fill="#eed3a7"/>
    <g fill="#f4dfb7"><ellipse cx="55" cy="68" rx="3" ry="2"/><ellipse cx="69" cy="65" rx="3" ry="2"/><ellipse cx="82" cy="69" rx="3" ry="2"/><ellipse cx="61" cy="78" rx="3" ry="2"/><ellipse cx="77" cy="79" rx="3" ry="2"/></g>
    <path d="M110 35 102 16m4 10-12-5m10-1-1-12M125 32l5-21m-2 11 10-7m-7 0-4-9" stroke="#8d6847" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M111 39q-27-17-21-3 4 11 21 9m17-8q17-19 19-6 0 10-19 13" fill="#bd8250" stroke="#8c5837" strokeWidth="2"/>
    <path d="m102 39-8-3m40 0 8-4" stroke="#e7bb91" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="122" cy="49" rx="20" ry="18" fill="#cb955f" stroke="#8c5837" strokeWidth="2"/>
    <ellipse cx="138" cy="56" rx="14" ry="10" fill="#efcf9e"/>
    <circle cx="123" cy="45" r="3" fill="#3f3029"/><circle cx="124" cy="44" r="1" fill="#fff9e5"/>
    <circle cx="147" cy="53" r="5" fill={leader ? "#b4424d" : "#634533"}/>
    {leader && <circle cx="146" cy="51" r="1.3" fill="#ef9e96"/>}
    <path d="M136 61q5 3 8-1" stroke="#936546" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="117" cy="56" rx="4" ry="2.5" fill="#d5917b"/>
    <path d="m102 64 14 3-2 7-14-3Z" fill={leader ? "#8b3443" : "#47634b"}/>
    <path d="m107 70-4 21 8-3 3 5 2-21" fill={leader ? "#8b3443" : "#47634b"}/>
    <circle cx="109" cy="72" r="3.5" fill="#e6c17d"/><circle cx="109" cy="73" r="1" fill="#906239"/>
  </svg>;
}

export function GoldenReindeer() {
  return <svg viewBox="0 0 160 140" fill="none" aria-hidden="true" className="little-reindeer golden-reindeer">
    <ellipse cx="77" cy="127" rx="45" ry="5" fill="#ecd8b2" opacity=".35"/>
    <path d="M40 79Q12 72 10 52q-12 30 30 42" fill="#d9ab62" stroke="#a8763f" strokeWidth="2"/>
    <g className="deer-legs-a"><path d="m47 90-1 30h15l5-29m32-3 4 32h14l-6-35" fill="#d4a261" stroke="#a8763f" strokeWidth="2"/><path d="M44 122h19m37 0h18" stroke="#efcc8e" strokeWidth="6" strokeLinecap="round"/></g>
    <g className="deer-legs-b"><path d="m60 93 4 28h14l-1-31m31-10 12 32 12-5-12-34" fill="#e5bd7c" stroke="#af7c40" strokeWidth="2"/><path d="M62 123h18m39-10 16-6" stroke="#f0ce94" strokeWidth="6" strokeLinecap="round"/></g>
    <path d="M33 79q1-26 39-24l27 4 15-16 16 12-12 33q-14 20-44 17-38 0-41-26Z" fill="#dfb674" stroke="#a8763f" strokeWidth="2"/>
    <path d="M46 88q23 21 52 2-15 22-36 15Z" fill="#f2d39a"/>
    <path d="M110 31 103 13m3 9-10-5m8 0V7m24 22 5-19m-2 11 10-8m-7 2-2-9" stroke="#8b623b" strokeWidth="4" strokeLinecap="round"/>
    <path d="M103 33q16-10 30 2" stroke="#9c3d49" strokeWidth="6" strokeLinecap="round"/>
    <path d="M112 33q-20-7-22 13-3 21 10 22 12 1 14-22" fill="#c8954f" stroke="#a8763f" strokeWidth="2"/>
    <path d="M126 33q24-7 24 12 2 22-11 23-11-2-13-22" fill="#c8954f" stroke="#a8763f" strokeWidth="2"/>
    <path d="M104 47q-1-21 17-22 21 0 22 23l-5 17-28-2Z" fill="#e6be7a" stroke="#a8763f" strokeWidth="2"/>
    <path d="M117 49q17-6 30 4 7 15-14 18-19-1-22-9Z" fill="#f1d6a2"/>
    <circle cx="117" cy="43" r="3" fill="#49362a"/><circle cx="132" cy="43" r="3" fill="#49362a"/><circle cx="118" cy="42" r="1" fill="#fff9eb"/><circle cx="133" cy="42" r="1" fill="#fff9eb"/>
    <path d="M139 51q9-3 10 4-1 6-7 6-6-1-3-10Z" fill="#543c2f"/>
    <path d="M127 63q5 8 11 0" stroke="#8b573b" strokeWidth="2" strokeLinecap="round"/>
    <path d="M129 66q1 13 8 8 3-5 0-9" fill="#da9d98" stroke="#b87970" strokeWidth="1"/>
    <path d="m102 67 19 9-3 6-19-9Z" fill="#a33d4e"/><circle cx="112" cy="78" r="4" fill="#e6c282"/>
  </svg>;
}
