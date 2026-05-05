import { useState, useEffect, useRef } from "react";

type Tab = "artemis" | "arbol" | "auroras" | "chernobyl";

/* ─── IDs de YouTube por temática ───────────────────────────────────────── */
const VIDEO_IDS: Record<Tab, string[]> = {
  artemis:   ["spMFXEUCEX8", "R3-OXQd-Fp4", "QLJqKHyzcnU", "4qF9yJWZRcU"],
  arbol:     ["vnCAia6v0bE"],
  auroras:   ["VGjz_9NKYZc"],
  chernobyl: [],
};

const VIDEO_TITLES: Record<Tab, string[]> = {
  artemis: [
    "Artemis III — no es soñar, es llegar",
    "Lunar Gateway — la estación orbital lunar",
    "¿Quiénes irán a la Luna?",
    "El traje espacial de Artemis",
  ],
  arbol:     ["Día del Árbol — plantar para el futuro"],
  auroras:   ["Auroras Boreales — la danza del cielo"],
  chernobyl: ["Próximamente"],
};

/* ─── datos por temática ─────────────────────────────────────────────────── */
const TABS: {
  id: Tab;
  emoji: string;
  label: string;
  tagLabel: string;
  tagClass: string;
  descClass: string;
  activeClass: string;
  bgClass: string;
  leftTitle: string;
  leftDesc: string;
  rightTag: string;
  rightTitle: string;
  rightDesc: string;
  phoneSub: string;
  phoneThumb: string;
  decoLeft: React.ReactNode;
  decoRight?: React.ReactNode;
}[] = [
  {
    id: "artemis",
    emoji: "🚀",
    label: "Artemis III",
    tagLabel: "Ciencia Espacial",
    tagClass: "bg-[rgba(90,70,210,0.2)] text-[#a898ff] border border-[rgba(110,90,230,0.3)]",
    descClass: "text-[#7a7aaa]",
    activeClass: "bg-[rgba(90,70,210,0.2)] border-[rgba(130,110,255,0.4)] text-[#b8a8ff]",
    bgClass: "artemis-bg",
    leftTitle: "Artemis III —\nde vuelta a la Luna",
    leftDesc: "La misión que regresará humanos a la superficie lunar por primera vez en décadas. No es soñar… es llegar.",
    rightTag: "Cápsula STEM",
    rightTitle: "La historia detrás\nde la misión",
    rightDesc: "Todo lo que necesitas saber sobre Artemis III: tecnología, astronautas, riesgos y la carrera espacial del siglo XXI.",
    phoneSub: "Centro de Innovación Y Desarrollo",
    phoneThumb: "radial-gradient(ellipse at 40% 30%,#2a1880 0%,#08041a 60%,#000 100%)",
    decoLeft: (
      <svg style={{position:"absolute",left:"4%",top:"12%",width:"150px",opacity:0.13,pointerEvents:"none",zIndex:1}} viewBox="0 0 150 150">
        <ellipse cx="75" cy="75" rx="70" ry="28" fill="none" stroke="#88f" strokeWidth="1"/>
        <ellipse cx="75" cy="75" rx="70" ry="28" fill="none" stroke="#88f" strokeWidth="1" transform="rotate(60 75 75)"/>
        <ellipse cx="75" cy="75" rx="70" ry="28" fill="none" stroke="#88f" strokeWidth="1" transform="rotate(120 75 75)"/>
        <circle cx="75" cy="75" r="12" fill="#5544cc" opacity="0.7"/>
        <circle cx="75" cy="47" r="4" fill="#aaf" opacity="0.8"/>
      </svg>
    ),
    decoRight: (
      <svg style={{position:"absolute",right:"3%",bottom:"18%",width:"100px",opacity:0.10,pointerEvents:"none",zIndex:1}} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#aaf" strokeWidth="1" strokeDasharray="5 7"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="#aaf" strokeWidth="1" strokeDasharray="3 5"/>
        <circle cx="50" cy="50" r="10" fill="#6655cc" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "arbol",
    emoji: "🌳",
    label: "Día del Árbol",
    tagLabel: "Medio Ambiente",
    tagClass: "bg-[rgba(50,150,10,0.2)] text-[#7add33] border border-[rgba(70,170,20,0.3)]",
    descClass: "text-[#669944]",
    activeClass: "bg-[rgba(50,150,10,0.2)] border-[rgba(70,170,20,0.4)] text-[#99ee55]",
    bgClass: "arbol-bg",
    leftTitle: "Día del Árbol —\ncada árbol cuenta",
    leftDesc: "Por qué plantar un árbol es un acto político, ambiental y humano. Un video que celebra la vida verde.",
    rightTag: "Destacado",
    rightTitle: "La raíz de\ntodo lo vivo",
    rightDesc: "Los árboles son los pulmones del planeta. Este video explica su rol en el ecosistema y por qué urge protegerlos.",
    phoneSub: "Centro de Innovación Y Desarrollo",
    phoneThumb: "linear-gradient(180deg,#0e3806 0%,#1c6010 50%,#091f03 100%)",
    decoLeft: (
      <svg style={{position:"absolute",left:"3%",top:"15%",width:"160px",opacity:0.14,pointerEvents:"none",zIndex:1}} viewBox="0 0 160 220">
        <path d="M80 210 Q80 120 80 60" stroke="#6dcc22" strokeWidth="2" fill="none"/>
        <path d="M80 150 Q50 120 20 100" stroke="#6dcc22" strokeWidth="1.5" fill="none"/>
        <path d="M80 120 Q110 95 140 80" stroke="#6dcc22" strokeWidth="1.5" fill="none"/>
        <path d="M80 90 Q55 65 35 45" stroke="#6dcc22" strokeWidth="1.5" fill="none"/>
        <path d="M80 70 Q105 48 125 32" stroke="#6dcc22" strokeWidth="1.5" fill="none"/>
        <ellipse cx="20" cy="100" rx="20" ry="13" fill="#3a8010" opacity="0.7" transform="rotate(-20 20 100)"/>
        <ellipse cx="140" cy="80" rx="18" ry="12" fill="#3a8010" opacity="0.7" transform="rotate(15 140 80)"/>
        <ellipse cx="35" cy="45" rx="16" ry="11" fill="#3a8010" opacity="0.7" transform="rotate(-30 35 45)"/>
        <ellipse cx="125" cy="32" rx="15" ry="10" fill="#4a9a18" opacity="0.7" transform="rotate(20 125 32)"/>
      </svg>
    ),
    decoRight: (
      <svg style={{position:"absolute",right:"3%",top:"20%",width:"110px",opacity:0.11,pointerEvents:"none",zIndex:1}} viewBox="0 0 110 140">
        <path d="M55 10 Q72 50 55 130" stroke="#99ee33" strokeWidth="2" fill="none"/>
        <ellipse cx="55" cy="48" rx="40" ry="25" fill="#448810" opacity="0.6"/>
        <ellipse cx="55" cy="72" rx="33" ry="20" fill="#337708" opacity="0.6"/>
        <ellipse cx="55" cy="94" rx="25" ry="15" fill="#266005" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "auroras",
    emoji: "🌌",
    label: "Auroras Boreales",
    tagLabel: "Fenómenos Naturales",
    tagClass: "bg-[rgba(0,200,100,0.2)] text-[#33ffaa] border border-[rgba(0,220,120,0.3)]",
    descClass: "text-[#449977]",
    activeClass: "bg-[rgba(0,200,100,0.2)] border-[rgba(0,220,120,0.4)] text-[#55ffbb]",
    bgClass: "auroras-bg",
    leftTitle: "Auroras Boreales —\nla danza del cielo",
    leftDesc: "El fenómeno lumínico más espectacular del planeta explicado con ciencia y asombro.",
    rightTag: "Destacado",
    rightTitle: "Ciencia detrás\nde la magia",
    rightDesc: "Partículas solares, campo magnético y atmósfera — una explicación visual de uno de los shows más bellos de la naturaleza.",
    phoneSub: "Centro de Innovación Y Desarrollo",
    phoneThumb: "radial-gradient(ellipse at 40% 20%,rgba(0,200,100,.4) 0%,transparent 50%),radial-gradient(ellipse at 70% 30%,rgba(100,0,200,.35) 0%,transparent 45%),linear-gradient(180deg,#020e06 0%,#040810 100%)",
    decoLeft: (
      <svg style={{position:"absolute",left:"2%",top:"10%",width:"200px",opacity:0.18,pointerEvents:"none",zIndex:1}} viewBox="0 0 200 300">
        <path d="M20 280 Q60 180 40 120 Q20 60 80 20"    fill="none" stroke="#00ff88" strokeWidth="1.5" opacity="0.7"/>
        <path d="M50 280 Q90 200 70 130 Q50 70 110 30"   fill="none" stroke="#6600ff" strokeWidth="1.5" opacity="0.5"/>
        <path d="M80 280 Q120 210 100 140 Q80 80 140 40"  fill="none" stroke="#00ffcc" strokeWidth="1.5" opacity="0.6"/>
        <path d="M110 280 Q145 220 130 155 Q115 95 165 55" fill="none" stroke="#00ff88" strokeWidth="1"   opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "chernobyl",
    emoji: "☢️",
    label: "Chernobyl",
    tagLabel: "Historia & Ciencia",
    tagClass: "bg-[rgba(160,180,0,0.15)] text-[#c8d400] border border-[rgba(160,180,0,0.3)]",
    descClass: "text-[#888855]",
    activeClass: "bg-[rgba(150,170,0,0.18)] border-[rgba(160,180,0,0.35)] text-[#ddee22]",
    bgClass: "chernobyl-bg",
    leftTitle: "Chernobyl —\nel día que el átomo falló",
    leftDesc: "El mayor accidente nuclear de la historia, sus causas reales, consecuencias y lo que el mundo aprendió de él.",
    rightTag: "Próximamente",
    rightTitle: "La verdad que\nel mundo ocultó",
    rightDesc: "Más allá de la serie de HBO — los hechos reales, la ciencia nuclear y el legado humano de Chernobyl.",
    phoneSub: "Centro de Innovación Y Desarrollo",
    phoneThumb: "radial-gradient(ellipse at 50% 25%,rgba(160,180,0,.15) 0%,transparent 50%),linear-gradient(180deg,#0a0b02 0%,#131400 50%,#050500 100%)",
    decoLeft: (
      <svg style={{position:"absolute",left:"3%",top:"20%",width:"160px",opacity:0.13,pointerEvents:"none",zIndex:1}} viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="30" fill="none" stroke="#ccdd00" strokeWidth="1"/>
        <path d="M80 50 L95 25 L65 25 Z" fill="#ccdd00" opacity="0.5"/>
        <path d="M105 95 L128 108 L115 82 Z" fill="#ccdd00" opacity="0.5"/>
        <path d="M55 95 L32 108 L45 82 Z" fill="#ccdd00" opacity="0.5"/>
        <circle cx="80" cy="80" r="10" fill="#aacc00" opacity="0.6"/>
        <circle cx="80" cy="80" r="55" fill="none" stroke="#aacc00" strokeWidth="1" strokeDasharray="6 8" opacity="0.3"/>
      </svg>
    ),
  },
];

/* ─── CSS fondos ─────────────────────────────────────────────────────────── */
const BG_STYLES = `
  .artemis-bg {
    background: radial-gradient(ellipse at 30% 50%, #12083a 0%, #05020f 60%, #000205 100%);
    position: absolute; inset: 0;
  }
  .artemis-bg::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      radial-gradient(1px 1px at 8% 12%,#fff 0%,transparent 100%),
      radial-gradient(1.5px 1.5px at 20% 55%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 35% 22%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 50% 68%,#fff 0%,transparent 100%),
      radial-gradient(1.5px 1.5px at 65% 18%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 75% 50%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 88% 28%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 12% 80%,#aaf 0%,transparent 100%),
      radial-gradient(1px 1px at 42% 88%,#cce 0%,transparent 100%),
      radial-gradient(1px 1px at 92% 72%,#fff 0%,transparent 100%),
      radial-gradient(1.5px 1.5px at 58% 8%,#fff 0%,transparent 100%),
      radial-gradient(1px 1px at 28% 40%,#aaf 0%,transparent 100%);
    opacity: .65;
  }
  .arbol-bg {
    background: linear-gradient(180deg,#0d2e05 0%,#1a5a0a 35%,#0d2e05 70%,#061502 100%);
    position: absolute; inset: 0;
  }
  .arbol-bg::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%,rgba(180,255,80,.09) 0%,transparent 45%),
      radial-gradient(ellipse at 20% 100%,rgba(60,180,10,.18) 0%,transparent 40%),
      radial-gradient(ellipse at 80% 100%,rgba(40,150,5,.15) 0%,transparent 38%);
  }
  .auroras-bg {
    background: #020d08;
    position: absolute; inset: 0;
  }
  .auroras-bg::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 30% 30%,rgba(0,220,120,.18) 0%,transparent 45%),
      radial-gradient(ellipse at 70% 20%,rgba(80,0,220,.20) 0%,transparent 40%),
      radial-gradient(ellipse at 50% 50%,rgba(0,180,200,.10) 0%,transparent 50%),
      radial-gradient(ellipse at 20% 60%,rgba(0,240,100,.08) 0%,transparent 40%);
    animation: auroraShift 8s ease-in-out infinite alternate;
  }
  @keyframes auroraShift { 0%{opacity:.8} 100%{opacity:1} }
  .chernobyl-bg {
    background: radial-gradient(ellipse at 50% 30%,#1a1205 0%,#0a0b02 50%,#050500 100%);
    position: absolute; inset: 0;
  }
  .chernobyl-bg::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 20%,rgba(180,200,0,.08) 0%,transparent 40%),
      radial-gradient(ellipse at 30% 70%,rgba(100,110,0,.06) 0%,transparent 40%),
      radial-gradient(ellipse at 70% 80%,rgba(80,90,0,.05) 0%,transparent 35%),
      linear-gradient(180deg,transparent 40%,rgba(0,0,0,.5) 100%);
  }
`;

/* ─── Componente Phone ───────────────────────────────────────────────────── */
function Phone({
  videoIds,
  videoIndex,
  activeTab,
  sub,
  thumb,
}: {
  videoIds: string[];
  videoIndex: number;
  activeTab: Tab;
  sub: string;
  thumb: string;
}) {
  const hasVideo = videoIds.length > 0;
  const currentId = hasVideo ? videoIds[videoIndex] : null;
  const currentTitle = VIDEO_TITLES[activeTab][videoIndex] ?? sub;

  const src = currentId
    ? `https://www.youtube.com/embed/${currentId}?autoplay=1&loop=1&playlist=${currentId}&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1`
    : null;

  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{width:210,background:"#0e0e0e",borderRadius:36,border:"2px solid rgba(255,255,255,.13)",boxShadow:"0 28px 70px rgba(0,0,0,.65),inset 0 0 0 1px rgba(255,255,255,.04)",overflow:"hidden"}}>
        {/* notch */}
        <div style={{height:26,background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:55,height:7,background:"#1e1e1e",borderRadius:10}}/>
        </div>

        {/* pantalla */}
        <div style={{width:"100%",aspectRatio:"9/16",position:"relative",overflow:"hidden",background:"#000"}}>
          {src ? (
            <iframe
              key={src}
              src={src}
              title={currentTitle}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{position:"absolute",top:"50%",left:"50%",width:"100%",height:"100%",transform:"translate(-50%,-50%)",border:"none",pointerEvents:"none"}}
            />
          ) : (
            <>
              <div style={{position:"absolute",inset:0,background:thumb}}/>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
                <div style={{fontSize:32}}>☢️</div>
                <div style={{fontSize:12,color:"rgba(200,210,0,.75)",fontWeight:500,textAlign:"center",padding:"0 20px",lineHeight:1.4}}>
                  Video próximamente
                </div>
              </div>
            </>
          )}

          {/* label inferior */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 12px",zIndex:3,background:"linear-gradient(transparent,rgba(0,0,0,.75))"}}>
            <div style={{fontSize:11,fontWeight:500,color:"#fff",lineHeight:1.3}}>{currentTitle}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.5)",marginTop:2}}>{sub}</div>
          </div>
        </div>

        {/* home bar */}
        <div style={{height:18,background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:38,height:4,background:"#222",borderRadius:4}}/>
        </div>
      </div>
    </div>
  );
}

/* ─── VideoChip ──────────────────────────────────────────────────────────── */
function VideoChip({ num, title, active, onClick }: { num: string; title: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display:"flex",alignItems:"center",gap:10,padding:"7px 12px",borderRadius:7,
        background: active ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.05)",
        border: `1px solid ${active ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.07)"}`,
        cursor: onClick ? "pointer" : "default",
        transition: "background .2s",
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,.10)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
    >
      <span style={{fontSize:10,fontWeight:500,color: active ? "#999" : "#444",minWidth:16}}>{num}</span>
      <span style={{fontSize:12,color: active ? "#fff" : "#bbb",fontWeight: active ? 500 : 400,lineHeight:1.3,textAlign:"left"}}>{title}</span>
    </div>
  );
}

/* ─── Componente principal ───────────────────────────────────────────────── */
export default function Videos() {
  const [activeTab, setActiveTab] = useState<Tab>("artemis");
  const [videoIndex, setVideoIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tab = TABS.find(t => t.id === activeTab)!;
  const ids = VIDEO_IDS[activeTab];
  const titles = VIDEO_TITLES[activeTab];

  // Resetear índice al cambiar tab
  useEffect(() => { setVideoIndex(0); }, [activeTab]);

  // Auto-avance del carrusel cada 70 s
  useEffect(() => {
    if (ids.length <= 1) return;
    timerRef.current = setTimeout(() => {
      setVideoIndex(i => (i + 1) % ids.length);
    }, 70_000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeTab, videoIndex, ids.length]);

  const overlayColor: Record<Tab, string> = {
    artemis:   "rgba(5,2,15,.75) 0%,rgba(5,2,15,.05) 38%,rgba(5,2,15,.05) 62%,rgba(5,2,15,.75) 100%",
    arbol:     "rgba(4,14,2,.78) 0%,rgba(4,14,2,.04) 38%,rgba(4,14,2,.04) 62%,rgba(4,14,2,.78) 100%",
    auroras:   "rgba(2,8,5,.80) 0%,rgba(2,8,5,.05) 38%,rgba(2,8,5,.05) 62%,rgba(2,8,5,.80) 100%",
    chernobyl: "rgba(5,5,2,.80) 0%,rgba(5,5,2,.05) 38%,rgba(5,5,2,.05) 62%,rgba(5,5,2,.80) 100%",
  };

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#080808"}}>
      <style>{BG_STYLES}</style>

      {/* ── HEADER ── */}
      <div style={{textAlign:"center",padding:"8rem 2rem 1.5rem"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:"1.5rem"}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#ff4444,#cc0000)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M23 7l-7 5 7 5V7z"/>
              <rect x="1" y="5" width="15" height="14" rx="2"/>
            </svg>
          </div>
          <span style={{fontSize:13,fontWeight:500,color:"#aaa",letterSpacing:"0.04em"}}>
            Centro de Innovación Y Desarrollo
          </span>
        </div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#fff",lineHeight:1.15,marginBottom:"0.6rem"}}>
          Conocimiento que<br/>transforma el mundo
        </h1>
        <p style={{color:"#555",fontSize:14,fontWeight:300,maxWidth:380,margin:"0 auto 1.8rem",lineHeight:1.6}}>
          Ciencia, naturaleza y tecnología explicados con pasión — desde Envigado para el mundo.
        </p>
        {/* Reemplaza # con tu link de YouTube */}
        <a href="#" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#ff0000",color:"#fff",fontSize:12,fontWeight:500,padding:"9px 20px",borderRadius:4,border:"none",cursor:"pointer",letterSpacing:"0.04em",textDecoration:"none"}}>
          <svg width="15" height="11" viewBox="0 0 24 17" fill="white">
            <path d="M23.5 2.7A3 3 0 0021.4.6C19.5 0 12 0 12 0S4.5 0 2.6.6A3 3 0 00.5 2.7C0 4.6 0 8.5 0 8.5s0 3.9.5 5.8a3 3 0 002.1 2.1C4.5 17 12 17 12 17s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 12.4 24 8.5 24 8.5s0-3.9-.5-5.8z"/>
            <polygon fill="white" points="9.75,12.02 15.5,8.5 9.75,4.98"/>
          </svg>
          Suscribirse
        </a>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",justifyContent:"center",gap:5,padding:"2rem 1rem 0",flexWrap:"wrap"}}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`transition-all duration-[250ms] ${activeTab === t.id ? t.activeClass : "text-[#555] border-[#2a2a2a] hover:border-[#444] hover:text-[#aaa]"}`}
            style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:11,fontWeight:500,letterSpacing:"0.07em",
              padding:"6px 16px",borderRadius:30,
              border: activeTab === t.id ? undefined : "1px solid",
              background: activeTab === t.id ? undefined : "transparent",
              cursor:"pointer",whiteSpace:"nowrap",
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* ── SECTION ── */}
      <div style={{position:"relative",minHeight:580,overflow:"hidden",marginTop:"2rem"}}>
        <div className={tab.bgClass}/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(90deg,${overlayColor[activeTab]})`}}/>
        {tab.decoLeft}
        {tab.decoRight}

        <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",minHeight:580,padding:"3rem 2.5rem",gap:"2rem",maxWidth:1060,margin:"0 auto"}}>

          {/* IZQUIERDA */}
          <div style={{textAlign:"left"}}>
            <span className={tab.tagClass} style={{display:"inline-block",fontSize:10,letterSpacing:".18em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,marginBottom:"1.2rem",fontWeight:500}}>
              {tab.tagLabel}
            </span>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.5rem,2.8vw,2.2rem)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:".9rem",whiteSpace:"pre-line"}}>
              {tab.leftTitle}
            </h2>
            <p className={tab.descClass} style={{fontSize:13,fontWeight:300,lineHeight:1.7,marginBottom:"1.4rem",maxWidth:240}}>
              {tab.leftDesc}
            </p>

            {/* Lista de videos */}
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {titles.map((title, i) => (
                <VideoChip
                  key={i}
                  num={`0${i + 1}`}
                  title={title}
                  active={ids.length > 1 && videoIndex === i}
                  onClick={ids.length > 1 ? () => {
                    setVideoIndex(i);
                    if (timerRef.current) clearTimeout(timerRef.current);
                  } : undefined}
                />
              ))}
            </div>

            {/* Puntos del carrusel (solo Artemis) */}
            {ids.length > 1 && (
              <div style={{display:"flex",gap:6,marginTop:"1rem"}}>
                {ids.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setVideoIndex(i); if (timerRef.current) clearTimeout(timerRef.current); }}
                    style={{width: videoIndex === i ? 20 : 6,height:6,borderRadius:3,background: videoIndex === i ? "#fff" : "rgba(255,255,255,.25)",border:"none",cursor:"pointer",transition:"all .3s",padding:0}}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CENTRO — teléfono */}
          <Phone
            videoIds={ids}
            videoIndex={videoIndex}
            activeTab={activeTab}
            sub={tab.phoneSub}
            thumb={tab.phoneThumb}
          />

          {/* DERECHA */}
          <div style={{textAlign:"right"}}>
            <span className={tab.tagClass} style={{display:"inline-block",fontSize:10,letterSpacing:".18em",textTransform:"uppercase",padding:"4px 12px",borderRadius:20,marginBottom:"1.2rem",fontWeight:500}}>
              {tab.rightTag}
            </span>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.5rem,2.8vw,2.2rem)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:".9rem",whiteSpace:"pre-line"}}>
              {tab.rightTitle}
            </h2>
            <p className={tab.descClass} style={{fontSize:13,fontWeight:300,lineHeight:1.7,marginBottom:"1.4rem",maxWidth:240,marginLeft:"auto"}}>
              {tab.rightDesc}
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
              {/* Reemplaza # con los links reales */}
              <VideoChip num="↗" title="Ver en YouTube"/>
              <VideoChip num="↗" title="Ver toda la serie"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}