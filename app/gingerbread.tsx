export function Star({ x, y, size = 9 }: { x: number; y: number; size?: number }) {
  return <path d={`M${x} ${y-size} Q${x} ${y} ${x+size} ${y} Q${x} ${y} ${x} ${y+size} Q${x} ${y} ${x-size} ${y} Q${x} ${y} ${x} ${y-size}`} fill="currentColor" />;
}

function Fir({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 0 -30 46 -18 46 -45 83 -29 83 -60 125 60 125 29 83 45 83 18 46 30 46Z" fill="#455c4a" stroke="#f7f0dc" strokeWidth="2" />
    <path d="m0 6-20 33 20-7 20 7M-27 69l27-9 27 9M-40 110l40-12 40 12" fill="none" stroke="#f6eddb" strokeWidth="4" strokeLinecap="round"/>
    <path d="M-4 125v20h8v-20" fill="#7a4a38" />
    <g fill="#d3ac69"><circle cx="-12" cy="51" r="3"/><circle cx="17" cy="81" r="3"/><circle cx="-25" cy="103" r="3"/><circle cx="28" cy="118" r="3"/></g>
  </g>;
}

function Window({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-31 34v-47a31 31 0 0 1 62 0v47Z" fill="#4c1826" stroke="#fff1d9" strokeWidth="4"/>
    <path d="M-22 27v-40a22 22 0 0 1 44 0v40Z" fill="url(#windowLight)"/>
    <path d="M0-33v60M-23-4h46M-23 12h46" stroke="#7f422c" strokeWidth="3"/>
    <path d="M-36 38H36" stroke="#fff5e5" strokeWidth="6" strokeLinecap="round"/>
    <path d="M-26 46q26 21 52 0" stroke="#f7e9ce" strokeWidth="2" fill="none"/>
    <circle cy="54" r="4" fill="#d7b16b"/>
  </g>;
}

function AdventDoor({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width="53" height="37" rx="3" fill="#7a3543" stroke="#f8ead1" strokeWidth="2"/>
    <path d="M5 5h43v27H5Z" stroke="#d4af70" strokeWidth=".7" strokeDasharray="1 3"/>
    <g color="#f8ead1"><Star x={26} y={18} size={10}/></g>
    <circle cx="45" cy="19" r="2" fill="#dfb875"/>
  </g>;
}

export default function Gingerbread() {
  return <svg viewBox="0 0 700 620" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="houseWall" x1="190" y1="200" x2="480" y2="570" gradientUnits="userSpaceOnUse"><stop stopColor="#913e4a"/><stop offset="1" stopColor="#602232"/></linearGradient>
      <linearGradient id="roof" x1="320" y1="70" x2="320" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#7a2e3c"/><stop offset="1" stopColor="#4f1929"/></linearGradient>
      <linearGradient id="windowLight" x1="0" y1="-30" x2="0" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#fce1a4"/><stop offset="1" stopColor="#d7a455"/></linearGradient>
      <radialGradient id="glow"><stop stopColor="#ead4a4" stopOpacity=".45"/><stop offset="1" stopColor="#ead4a4" stopOpacity="0"/></radialGradient>
      <filter id="houseShadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#682b31" floodOpacity=".15"/></filter>
      <pattern id="biscuits" width="17" height="17" patternUnits="userSpaceOnUse"><circle cx="4" cy="6" r=".8" fill="#fff" opacity=".07"/></pattern>
    </defs>
    <ellipse cx="350" cy="320" rx="300" ry="270" fill="url(#glow)"/>
    <g color="#c79e58"><Star x={104} y={157} size={10}/><Star x={568} y={130} size={13}/><Star x={610} y={286} size={8}/><Star x={155} y={330} size={7}/><Star x={490} y={62} size={6}/></g>
    <g stroke="#caa86b" opacity=".7"><path d="M80 0v89m0 28v23M570 0v70m0 25v19M635 0v185"/><circle cx="80" cy="105" r="13"/><path d="m80 92 9 13-9 13-9-13Z"/><circle cx="570" cy="83" r="12"/><path d="m635 185 8 15-8 15-8-15Z"/></g>
    <ellipse cx="349" cy="564" rx="287" ry="29" fill="#e8dfce" opacity=".7"/>
    <path d="M64 555q30-20 64-9 42-18 82 0 54-20 106-5 57-11 102 3 65-19 116 1 46-16 105 10-83 39-283 27-188 8-292-27Z" fill="#fffaf0"/>
    <Fir x={110} y={378} scale={1.12}/><Fir x={595} y={349} scale={1.35}/><Fir x={635} y={444} scale={.78}/>
    <g filter="url(#houseShadow)">
      <path d="M455 184v-84h44v114" fill="#682532" stroke="#f5e8d2" strokeWidth="4"/>
      <path d="M450 99h53v15h-53Z" fill="#f5e8d2"/>
      <path d="M468 134h22m-22 14h22m-22 14h22" stroke="#c48b7a" strokeWidth="2"/>
      <path d="M170 283 350 126 530 283v267H170Z" fill="url(#houseWall)" stroke="#f9edd6" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M170 283 350 126 530 283v267H170Z" fill="url(#biscuits)"/>
      <path d="m135 279 215-190 215 190-26 28L350 142 161 307Z" fill="url(#roof)" stroke="#f8efdc" strokeWidth="5" strokeLinejoin="round"/>
      <path d="m147 279 203-178 203 178M171 275l179-157 179 157" stroke="#f7e9d2" strokeWidth="2"/>
      {Array.from({length: 8}, (_, i) => <path key={i} d={`M${188+i*15} ${248-i*13.2}q-6 17 11 15`} stroke="#f7e9d2" strokeWidth="3" strokeLinecap="round"/>)}
      {Array.from({length: 8}, (_, i) => <path key={i} d={`M${400+i*15} ${161+i*13.2}q-11 13 6 17`} stroke="#f7e9d2" strokeWidth="3" strokeLinecap="round"/>)}
      <path d="m169 303 10-7 6 16 7-4 7 13 8-10 9 11 9-7 7 10 11-6 9 9 10-7 9 10 11-7M418 325l10-8 9 10 12-9 9 7 9-10 10 4 8-12 9 5 8-13 9 7 8-15 10 11" stroke="#fff4de" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M185 334v197m330-197v197M183 538h334" stroke="#f7e9d3" strokeWidth="4" strokeLinecap="round"/>
      <path d="M194 352q12 12 0 24t0 24 0 24 0 24 0 24 0 24M506 352q-12 12 0 24t0 24 0 24 0 24 0 24 0 24" stroke="#f2dfc1" strokeWidth="2"/>
      <circle cx="350" cy="245" r="40" fill="#722c39" stroke="#fff0d8" strokeWidth="3"/>
      <circle cx="350" cy="245" r="31" stroke="#dfbc79" strokeWidth="2" strokeDasharray="2 6"/>
      <g color="#fff1db"><Star x={350} y={245} size={23}/></g>
      <path d="M310 202q7-21 22-7m36 0q15-14 22 7M337 182q13-26 26 0" stroke="#fff0d8" strokeWidth="2"/>
      <circle cx="350" cy="174" r="4" fill="#e0bc77"/>
      <Window x={244} y={377}/><Window x={456} y={377}/>
      <AdventDoor x={217} y={439}/><AdventDoor x={217} y={485}/><AdventDoor x={429} y={439}/><AdventDoor x={429} y={485}/>
      <path d="M305 548v-96a45 45 0 0 1 90 0v96Z" fill="#451b29" stroke="#fff0db" strokeWidth="5"/>
      <path d="M314 548v-94a36 36 0 0 1 72 0v94Z" fill="#84404a" stroke="#d5ad68" strokeWidth="2"/>
      <path d="M350 420v126" stroke="#a35d60" strokeWidth="2"/>
      <circle cx="375" cy="493" r="4" fill="#efd191"/>
      <circle cx="350" cy="440" r="21" fill="#3f5845" stroke="#d7c99c" strokeWidth="2"/>
      <path d="m333 428 8 5-4 9m19-22-3 10 9-1m-4 26-5-7-6 9m-18-14 9 4" stroke="#a5ad83" strokeWidth="2"/>
      <path d="m350 421-13-8v15l13-7 13-8v15Z" fill="#c19150"/>
      <rect x="323" y="475" width="54" height="35" rx="2" fill="#f6e7c9" transform="rotate(-8 350 493)"/>
      <path d="m324 480 27 13 24-20" stroke="#b18159" strokeWidth="1.4"/>
      <circle cx="351" cy="490" r="5" fill="#8c3341"/>
      <path d="M298 552h104m-113 9h122" stroke="#fffaed" strokeWidth="8" strokeLinecap="round"/>
      <g stroke="#fff0d8" strokeWidth="2" strokeLinecap="round"><path d="M290 350q-5-20 14-19 14 2 5 13-6 5-7-2m96 8q5-20-14-19-14 2-5 13 6 5 7-2"/></g>
      <path d="M205 546q-8-22 2-35 12-11 20 3 11-7 15 5 9 15-2 26M468 547q-11-15 1-29 8-12 18-1 10-14 18 0 7 16-1 30" fill="#405b47" stroke="#f1e4cb" strokeWidth="2"/>
      <g fill="#e1b36d"><circle cx="209" cy="524" r="3"/><circle cx="229" cy="532" r="3"/><circle cx="479" cy="529" r="3"/><circle cx="496" cy="536" r="3"/></g>
    </g>
    <g stroke="#e7d6b7" strokeWidth="3" strokeLinecap="round"><path d="M126 535v-70a11 11 0 0 1 22 0v12M551 546v-62a10 10 0 0 1 20 0v11"/></g>
    <g stroke="#8a3442" strokeWidth="4"><path d="m122 486 8-7m-8 24 8-7m-8 25 8-7m418-12 8-6m-8 23 8-7m-8 23 8-7"/></g>
    <g fill="#fffaf0"><circle cx="151" cy="366" r="3"/><circle cx="558" cy="341" r="4"/><circle cx="87" cy="267" r="3"/><circle cx="520" cy="392" r="2"/><circle cx="343" cy="73" r="3"/><circle cx="610" cy="238" r="3"/><circle cx="199" cy="169" r="3"/></g>
    <g color="#b9904f"><Star x={160} y={440} size={6}/><Star x={556} y={440} size={7}/><Star x={283} y={580} size={5}/><Star x={467} y={575} size={5}/></g>
  </svg>;
}
