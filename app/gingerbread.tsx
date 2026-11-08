export function Star({ x, y, size = 9 }: { x: number; y: number; size?: number }) {
  return <path d={`M${x} ${y-size} Q${x} ${y} ${x+size} ${y} Q${x} ${y} ${x} ${y+size} Q${x} ${y} ${x-size} ${y} Q${x} ${y} ${x} ${y-size}`} fill="currentColor" />;
}

function Rosette({ x, y, size = 11 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size/11})`} stroke="#fff9eb" strokeWidth="1.5">
    {[0,60,120,180,240,300].map(angle => <ellipse key={angle} cy="-6" rx="2.5" ry="5.5" transform={`rotate(${angle})`}/>)}
    <circle r="2.7" fill="#e3bf7a" stroke="none"/>
  </g>;
}

function Fir({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 0-29 43h12L-44 82h15l-29 42H58L29 82h15L17 43h12Z" fill="#465e4e" stroke="#f7f0dc" strokeWidth="2"/>
    <path d="m0 8-19 29 19-7 19 7M-27 69l27-9 27 9M-39 110l39-12 39 12" stroke="#fff9ec" strokeWidth="5" strokeLinecap="round"/>
    <path d="M-4 124v20h8v-20" fill="#835439"/>
    <g fill="#e2c386"><circle cx="-12" cy="51" r="3"/><circle cx="16" cy="81" r="3"/><circle cx="-24" cy="103" r="3"/><circle cx="25" cy="116" r="3"/></g>
  </g>;
}

function UpstairsWindow({ x }: { x: number }) {
  return <g transform={`translate(${x} 336)`}>
    <path d="M-30 46v-57a30 30 0 0 1 60 0v57Z" fill="#71412d" stroke="#fff8e8" strokeWidth="5"/>
    <path d="M-23 38v-48a23 23 0 0 1 46 0v48Z" fill="url(#windowLight)"/>
    <path d="M0-33v71M-23 1h46" stroke="#9a633f" strokeWidth="3.5"/>
    <path d="M-38 49q8-7 16-2 12-7 23-1 15-7 24-1 10-4 15 3" stroke="#fffdf5" strokeWidth="9" strokeLinecap="round"/>
    <path d="M-23 50v6m20-7v10m19-10v5" stroke="#fffdf5" strokeWidth="4" strokeLinecap="round"/>
    <path d="M-30 61q30 18 60 0" stroke="#fff5e2" strokeWidth="2"/>
    <circle cy="70" r="3" fill="#e2bd78"/>
  </g>;
}

function BayWindow({ x, side }: { x: number; side: string }) {
  return <g className={`drawn-bay drawn-bay-${side}`} transform={`translate(${x} 432)`}>
    <rect x="-52" y="-4" width="104" height="106" rx="4" fill="#6c422e" stroke="#fff8e9" strokeWidth="4"/>
    <rect x="-45" y="3" width="90" height="92" rx="2" fill="url(#bayLight)"/>
    <path d="M-43 5q20 7 17 51l-17 16M43 5q-20 7-17 51l17 16" fill="#eee1c5" opacity=".75"/>
    <path d="m0 34-17 24h8L-24 80h48L9 58h8Z" fill="#556948"/>
    <path d="M-10 58 4 61m-21 12 28 3" stroke="#edcc88" strokeWidth="2"/>
    <g fill="#fff1b7"><circle cx="-3" cy="49" r="2"/><circle cx="6" cy="65" r="2"/><circle cx="-8" cy="73" r="2"/></g>
    <path d="m0 27 3 6 6 1-5 5 1 6-5-3-6 3 2-6-5-5 6-1Z" fill="#e5bd72"/>
    <path d="M-49-4q10-8 22-3 13-8 27-3 14-5 27 2 12-4 22 3" stroke="#fffdf4" strokeWidth="9" strokeLinecap="round"/>
    <path d="M-40-2v8m30-8v6m26-8v9m26-8v5" stroke="#fffdf4" strokeWidth="4" strokeLinecap="round"/>
    <path d="M-58 104q15-8 29-3 16-7 29-2 17-5 28-1 17-4 30 5" stroke="#fffdf5" strokeWidth="10" strokeLinecap="round"/>
    <path d="M-43 105v6m28-7v10m28-10v6m29-6v8" stroke="#fffdf5" strokeWidth="4" strokeLinecap="round"/>
  </g>;
}

export default function Gingerbread() {
  return <svg viewBox="0 0 700 620" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="houseWall" x1="350" y1="180" x2="350" y2="555" gradientUnits="userSpaceOnUse"><stop stopColor="#c58b53"/><stop offset="1" stopColor="#a5693c"/></linearGradient>
      <linearGradient id="roof" x1="350" y1="85" x2="350" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#ae7143"/><stop offset="1" stopColor="#89502e"/></linearGradient>
      <linearGradient id="windowLight" x1="0" y1="-35" x2="0" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe9af"/><stop offset="1" stopColor="#d9aa61"/></linearGradient>
      <linearGradient id="bayLight" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#f6dca1"/><stop offset="1" stopColor="#b98b50"/></linearGradient>
      <radialGradient id="glow"><stop stopColor="#e4b975" stopOpacity=".3"/><stop offset="1" stopColor="#e4b975" stopOpacity="0"/></radialGradient>
      <filter id="houseShadow" x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="13" stdDeviation="12" floodColor="#442018" floodOpacity=".2"/></filter>
      <pattern id="biscuits" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r=".7" fill="#5e381e" opacity=".12"/><circle cx="10" cy="11" r=".6" fill="#fff3d7" opacity=".22"/></pattern>
    </defs>
    <ellipse cx="350" cy="322" rx="310" ry="278" fill="url(#glow)"/>
    <g color="#cba666"><Star x={102} y={168} size={9}/><Star x={598} y={168} size={9}/><Star x={123} y={311} size={7}/><Star x={577} y={311} size={7}/><Star x={270} y={61} size={6}/><Star x={430} y={61} size={6}/></g>
    <g stroke="#c5a368" opacity=".75">
      {[80,620].map(x=><g key={x}><path d={`M${x} 0v102`}/><circle cx={x} cy="116" r="13"/><path d={`m${x} 103 8 13-8 13-8-13Z`}/></g>)}
      {[130,570].map(x=><g key={x}><path d={`M${x} 0v73`}/><path d={`m${x} 73 8 14-8 14-8-14Z`}/></g>)}
    </g>
    <ellipse cx="350" cy="566" rx="294" ry="28" fill="#dfd5c4" opacity=".55"/>
    <path d="M52 558q48-23 95-12 44-18 92-4 62-15 111-7 58-8 111 7 50-14 92 4 51-11 95 12-96 29-298 26-201 3-298-26Z" fill="#fffdf5"/>
    <Fir x={95} y={373} scale={1.23}/><Fir x={605} y={373} scale={1.23}/><Fir x={48} y={454} scale={.7}/><Fir x={652} y={454} scale={.7}/>
    <g filter="url(#houseShadow)">
      <path d="M450 175v-70h42v108" fill="#9f643c" stroke="#fff5e3" strokeWidth="3"/>
      <path d="M446 104q10-8 19-3 12-6 20 0 10-4 15 3" stroke="#fffdf3" strokeWidth="9" strokeLinecap="round"/>
      <path d="M461 123h21m-21 14h21m-21 14h21" stroke="#edc999" strokeWidth="2"/>
      <path className="chimney-smoke" d="M469 86q-22-3-12-22 8-15 20-5 12 15-6 17-21 0-16-20 4-16 21-16" stroke="#b3a38f" strokeWidth="2" strokeLinecap="round"/>
      <path d="M170 281 350 121 530 281v272H170Z" fill="url(#houseWall)" stroke="#fff8e7" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M170 281 350 121 530 281v272H170Z" fill="url(#biscuits)"/>
      <path d="m131 280 219-194 219 194-28 29L350 141 159 309Z" fill="url(#roof)" stroke="#fff9eb" strokeWidth="5" strokeLinejoin="round"/>
      <path d="m142 280 208-182 208 182M163 286l187-164 187 164" stroke="#fff5e3" strokeWidth="2" strokeLinecap="round"/>
      {[0,1].map(side=><g key={side} transform={side?"translate(700 0) scale(-1 1)":undefined}>
        {Array.from({length:10},(_,i)=><g key={i} transform={`translate(${162+i*19} ${272-i*16.7}) rotate(-41.4)`}><path d="m0 0 9-8 9 8-9 8Z" stroke="#fff6e4" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="9" cy="0" r="2" fill="#fff6e4"/></g>)}
        <path d="M269 277h25m-12-12v25m-9-21 18 17m-18 0 18-17" stroke="#fff6e7" strokeWidth="2.5" strokeLinecap="round"/>
        {[0,1,2,3,4,5].map(i=><circle key={i} cx="179" cy={434+i*19} r="2.2" fill="#fff5df"/>)}
      </g>)}
      <circle cx="350" cy="235" r="37" fill="#ad7448" stroke="#fff8e9" strokeWidth="3.5"/>
      <circle cx="350" cy="235" r="30" stroke="#fff8e9" strokeWidth="1.5"/>
      <Rosette x={350} y={235} size={24}/>
      <path d="m350 161 6 10-6 10-6-10Z" fill="#fff7e4"/>
      {[0,1,2,3,4].map(i=><circle key={i} cx={310+i*20} cy={292+Math.abs(2-i)*-3} r="2.3" fill="#fff7e4"/>)}
      <path d="M182 404h336" stroke="#fdf5e6" strokeWidth="5" strokeLinecap="round"/>
      {Array.from({length:10},(_,i)=><path key={i} d={`M${190+i*32} 408q16 12 32 0`} stroke="#fff6e7" strokeWidth="2"/>)}
      <UpstairsWindow x={244}/><UpstairsWindow x={456}/>
      <Rosette x={350} y={338} size={22}/>
      <circle cx="350" cy="377" r="3" fill="#f9e7ba"/>
      <BayWindow x={244} side="left"/><BayWindow x={456} side="right"/>
      <path d="M309 550v-91a41 41 0 0 1 82 0v91Z" fill="#6c422d" stroke="#fff8e7" strokeWidth="7"/>
      <path d="M302 554h96m-106 9h116" stroke="#fffdf5" strokeWidth="7" strokeLinecap="round"/>
      <path d="M177 547q10-11 21-2M502 545q11-9 21 2" stroke="#fffdf3" strokeWidth="10" strokeLinecap="round"/>
    </g>
    {[0,1].map(side=><g key={side} transform={side?"translate(700 0) scale(-1 1)":undefined}>
      <path d="M139 553v-71a11 11 0 0 1 22 0v13" stroke="#fff5e1" strokeWidth="8" strokeLinecap="round"/>
      <path d="m135 503 8-6m-8 23 8-6m-8 23 8-6" stroke="#8a3442" strokeWidth="5"/>
      <path d="M109 553q-12-20 0-30 12 2 14 21 3-24 17-22 9 18-5 31" fill="#526b4e" stroke="#fff5df" strokeWidth="2"/>
      <circle cx="121" cy="541" r="3" fill="#a84849"/>
      <g color="#cba768"><Star x={199} y={581} size={5}/><Star x={112} y={352} size={5}/></g>
    </g>)}
  </svg>;
}
