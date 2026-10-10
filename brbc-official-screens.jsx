/* global React */
// ── BRBC Official — all screens in the refined Bold Official direction ──

// ─── Token palette ───────────────────────────────────────────────
const OT = {
  bg:          "#F5F1E6",
  surface:     "#EDE9DA",
  ink:         "#0E1320",
  soft:        "#3D4354",
  faint:       "#7E8393",
  rule:        "rgba(14,19,32,0.12)",
  ruleStrong:  "rgba(14,19,32,0.22)",
  rizo:        "#1C2F5E",
  rizoLight:   "#253D78",
  rizoTint:    "#E4EBF6",
  brooks:      "#7B2F22",
  brooksLight: "#963628",
  brooksTint:  "#F5E9E7",
  gold:        "#9A7220",
  goldLight:   "#BF9128",
  live:        "#16A34A",
  serif: "'DM Serif Display',Georgia,serif",
  sans:  "'DM Sans',system-ui,sans-serif",
  mono:  "'DM Mono',ui-monospace,monospace",
};

// Renders a score like "5&4" with the & in a plain sans-serif font
function Score({ v }) {
  if (v === null || v === undefined) return null;
  const s = String(v);
  if (!s.includes("&")) return <>{s}</>;
  const [lo, hi] = s.split("&");
  return <>{lo}<span style={{ fontFamily: "Arial,Helvetica,sans-serif", fontWeight: 400 }}>{"&"}</span>{hi}</>;
}

// Final badge — small gold "FINAL" tag below a segment score
function FinalBadge({ color }) {
  return (
    <div style={{ fontFamily: OT.sans, fontSize: 8, fontWeight: 700, letterSpacing: "0.16em", color: color || OT.goldLight, textAlign: "center", marginTop: 3, textTransform: "uppercase" }}>
      Final
    </div>
  );
}

// Sequential-only clinch detector for a hole map keyed by 1..18 with 'r'|'b'|'h'|null
function clinchLocal(holes, lo, hi) {
  const span = hi - lo + 1;
  let r = 0, b = 0, entered = 0;
  for (let i = lo; i <= hi; i++) {
    const v = holes[i];
    if (!v) break;
    if (v === "r") r++; else if (v === "b") b++;
    entered++;
    const remaining = span - entered;
    const diff = r - b;
    if (Math.abs(diff) > remaining) {
      return { winner: diff > 0 ? "r" : "b", up: Math.abs(diff), remaining };
    }
  }
  return null;
}

// ─── Shared primitives ────────────────────────────────────────────

function OHeader() {
  return (
    <div style={{ background:OT.bg, borderBottom:`1px solid ${OT.rule}` }}>
      <div style={{ height:3, display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
        <div style={{ background:OT.rizoLight }}></div>
        <div style={{ background:OT.goldLight }}></div>
        <div style={{ background:OT.brooksLight }}></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", padding:"16px 20px 16px" }}>
        <div style={{ textAlign:"left" }}>
          <div style={{ fontFamily:OT.serif, fontSize:22, fontWeight:700, color:OT.ink, letterSpacing:"-0.01em", lineHeight:1 }}>III</div>
          <div style={{ fontFamily:OT.sans, fontSize:8, fontWeight:600, letterSpacing:"0.2em", color:OT.faint, textTransform:"uppercase", marginTop:2 }}>Edition</div>
        </div>
        <img
          src="assets/ryder-cup-logo.png"
          alt="BRBC Ryder Cup"
          style={{ maxHeight:130, maxWidth:"100%", width:"auto", height:"auto", display:"block", margin:"0 auto" }}
        />
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:OT.serif, fontSize:22, fontWeight:700, color:OT.ink, letterSpacing:"-0.01em", lineHeight:1 }}>2024</div>
          <div style={{ fontFamily:OT.sans, fontSize:8, fontWeight:600, letterSpacing:"0.2em", color:OT.faint, textTransform:"uppercase", marginTop:2 }}>Est.</div>
        </div>
      </div>
    </div>
  );
}

function OSectionHead({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 16px", margin:"10px 0 10px" }}>
      <div style={{ flex:1, height:1, background:OT.ruleStrong }}></div>
      <span style={{ fontFamily:OT.sans, fontSize:10, fontWeight:700, letterSpacing:"0.24em", color:OT.soft, textTransform:"uppercase", whiteSpace:"nowrap" }}>{children}</span>
      <div style={{ flex:1, height:1, background:OT.ruleStrong }}></div>
    </div>
  );
}

function ONav({ active, onNav }) {
  const items = [
    { id:"scoreboard", label:"Leaderboard" },
    { id:"teams",      label:"Teams"       },
    { id:"rankings",   label:"Rankings"    },
    { id:"history",    label:"History"     },
    { id:"rules",      label:"Rules"       },
  ];
  return (
    <div style={{ background:OT.bg, borderBottom:`1px solid ${OT.rule}`, paddingTop:"env(safe-area-inset-top,0px)" }}>
      <div style={{ height:3, display:"grid", gridTemplateColumns:"1fr 1fr 1fr" }}>
        <div style={{ background:OT.rizoLight }}></div>
        <div style={{ background:OT.goldLight }}></div>
        <div style={{ background:OT.brooksLight }}></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${items.length},1fr)` }}>
        {items.map(it => (
          <button key={it.id} onClick={() => onNav(it.id)} style={{ padding:"11px 0", background:"none", border:"none", cursor:"pointer", color: active===it.id ? OT.ink : OT.faint, position:"relative" }}>
            {active===it.id && <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:2, background:OT.goldLight }}></div>}
            <span style={{ fontFamily:OT.sans, fontSize:9, fontWeight: active===it.id ? 700 : 500, letterSpacing:"0.12em", textTransform:"uppercase" }}>{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Match card ───────────────────────────────────────────────────
function OMatchCard({ m, onTap }) {
  const lead = m.lead, amt = m.lead_amt || 0;
  const subVal = seg => {
    if (!seg || !seg.winner) return { txt:"—", color:OT.faint, final:false };
    if (seg.winner==="halved") return { txt:"AS", color:OT.goldLight, final:true };
    const color = seg.winner==="rizo" ? OT.rizoLight : OT.brooksLight;
    const txt = seg.remaining > 0 ? `${seg.margin}&${seg.remaining}` : `${seg.margin} UP`;
    return { txt, color, final:true };
  };
  const subValPrefixed = seg => {
    if (!seg || !seg.winner) return { txt:"—", color:OT.faint, final:false };
    if (seg.winner==="halved") return { txt:"AS", color:OT.goldLight, final:true };
    const color = seg.winner==="rizo" ? OT.rizoLight : OT.brooksLight;
    const prefix = seg.winner==="rizo" ? "R · " : "B · ";
    const score = seg.remaining > 0 ? `${seg.margin}&${seg.remaining}` : `${seg.margin} UP`;
    return { txt: prefix + score, color, final:true };
  };
  const f=subValPrefixed(m.front), ba=subValPrefixed(m.back), t=subValPrefixed(m.total);

  // Center score: use clinch format when decided, live lead otherwise
  let centerTxt, centerColor, centerSub;
  if (m.status === "upcoming") {
    centerTxt = "—"; centerColor = OT.soft; centerSub = "Upcoming";
  } else if (m.total && m.total.winner) {
    centerTxt = m.total.winner === "halved" ? "AS" : (m.total.winner === "rizo" ? "Rizo" : "Brooks");
    centerColor = m.total.winner === "halved" ? OT.goldLight : (m.total.winner === "rizo" ? OT.rizoLight : OT.brooksLight);
    centerSub = m.total.winner === "halved" ? "All Square" : t.txt.replace(/^[RB] · /, "");
  } else {
    centerTxt = amt === 0 ? "AS" : `${amt} UP`;
    centerColor = lead==="rizo" ? OT.rizoLight : lead==="brooks" ? OT.brooksLight : OT.soft;
    centerSub = lead==="rizo" ? "Rizo" : lead==="brooks" ? "Brooks" : "All Square";
  }

  const accentColor = lead==="rizo" ? OT.rizoLight : lead==="brooks" ? OT.brooksLight : m.status==="complete" ? OT.goldLight : OT.ruleStrong;
  return (
    <div onClick={() => onTap && onTap(m.id)} style={{ background:OT.bg, border:`1px solid ${OT.rule}`, borderLeft:`3px solid ${accentColor}`, cursor: onTap ? "pointer" : "default" }}>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", background:OT.surface, borderBottom:`1px solid ${OT.rule}` }}>
        <div style={{ fontFamily:OT.sans, fontSize:10, fontWeight:600, letterSpacing:"0.16em", color:OT.faint, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
          {m.time}
          {m.status==="live" && <span style={{ color:OT.live, fontWeight:700, fontSize:9 }}>● LIVE</span>}
          {m.status==="upcoming" && <span style={{ color:OT.faint }}>UPCOMING</span>}
        </div>
        <div style={{ fontFamily:OT.mono, fontSize:10, fontWeight:600, color: m.status==="complete" ? centerColor : OT.soft, letterSpacing:"0.04em" }}>
          {m.status==="upcoming" ? "—" : m.thru===18 ? "FINAL" : `THRU ${m.thru}`}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", padding:"12px 12px", alignItems:"start", gap:6 }}>
        <div>
          <div style={{ fontFamily:OT.serif, fontSize:18, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:OT.rizoLight, marginBottom:5 }}>Rizo</div>
          {m.rizo.players.map((p,i) => <div key={i} style={{ fontFamily:OT.sans, fontSize:12.5, fontWeight:400, color:OT.ink, lineHeight:1.3 }}>{p}</div>)}
        </div>
        <div style={{ textAlign:"center", minWidth:76, padding:"2px 4px" }}>
          <div style={{ fontFamily:OT.serif, fontSize:28, fontWeight:700, lineHeight:1, letterSpacing:"-0.01em", color:centerColor }}>
            <Score v={centerTxt} />
          </div>
          <div style={{ fontFamily:OT.sans, fontSize:9, fontWeight:600, letterSpacing:"0.18em", color:OT.faint, marginTop:3, textTransform:"uppercase" }}>
            {centerSub}
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:OT.serif, fontSize:18, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:OT.brooksLight, marginBottom:5 }}>Brooks</div>
          {m.brooks.players.map((p,i) => <div key={i} style={{ fontFamily:OT.sans, fontSize:12.5, fontWeight:400, color:OT.ink, lineHeight:1.3, textAlign:"right" }}>{p}</div>)}
        </div>
      </div>
      {m.status !== "upcoming" && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderTop:`1px solid ${OT.rule}`, background:OT.surface }}>
          {[{lab:"F9",...f},{lab:"B9",...ba},{lab:"18",...t}].map((s,i) => (
            <div key={i} style={{ padding:"8px 4px", textAlign:"center", borderRight:i<2?`1px solid ${OT.rule}`:"none" }}>
              <div style={{ fontFamily:OT.sans, fontSize:8, fontWeight:700, letterSpacing:"0.18em", color:OT.faint, marginBottom:3, textTransform:"uppercase" }}>{s.lab}</div>
              <div style={{ fontFamily:OT.sans, fontSize:11, fontWeight:700, color:s.color, letterSpacing:"0" }}>{s.txt}</div>
              {s.final && <FinalBadge color={s.color} />}
            </div>
          ))}
        </div>
      )}
      {m.holes && m.holes.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(9,1fr) 6px repeat(9,1fr)", gap:2, padding:"7px 12px", borderTop:`1px solid ${OT.rule}`, alignItems:"center" }}>
          {Array.from({length:19}).map((_,i) => {
            if (i===9) return <div key="div" style={{ width:1, height:8, background:OT.ruleStrong, margin:"0 auto" }}></div>;
            const n = i < 9 ? i+1 : i;
            const h = m.holes.find(x => x.n===n);
            const bg = !h ? OT.rule : h.win===1 ? OT.rizoLight : h.win===-1 ? OT.brooksLight : "#C9A84C";
            return <div key={i} style={{ height:4, borderRadius:1, background:bg, opacity: h ? 1 : 0.3 }}></div>;
          })}
        </div>
      )}
    </div>
  );
}

function BRBCFooter() {
  return (
    <div style={{ textAlign:"center", padding:"12px 16px 16px", borderTop:`1px solid ${OT.rule}` }}>
      <img
        src="assets/brbc-footer-logo.png?v=3"
        alt="Brooks Rizo Booze Classic"
        style={{ maxWidth:"100%", width:200, height:"auto", display:"block", margin:"0 auto" }}
      />
    </div>
  );
}

// ─── SCREEN: Scoreboard ───────────────────────────────────────────
function OScreenScoreboard({ D, onNav }) {
  const live = D.matches.filter(m => m.status==="live");
  const upcoming = D.matches.filter(m => m.status==="upcoming");
  const complete = D.matches.filter(m => m.status==="complete");
  const r=D.team_rizo.score, b=D.team_brooks.score, target=15.5;
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      {/* Score header — Rizo | Logo | Brooks */}
      <div style={{ background:OT.bg, borderBottom:`1px solid ${OT.rule}`, padding:"14px 16px 12px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:8 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:OT.serif, fontSize:20, fontWeight:700, color:OT.rizoLight, lineHeight:1, marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Rizo</div>
            <div style={{ fontFamily:OT.serif, fontSize:52, fontWeight:700, lineHeight:0.85, letterSpacing:"-0.03em", color:OT.rizo, fontVariantNumeric:"lining-nums tabular-nums" }}>{r}</div>
            <div style={{ fontFamily:OT.mono, fontSize:8, color:OT.faint, marginTop:5, letterSpacing:"0.08em" }}>PROJ {D.team_rizo.projected.toFixed(1)}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <img src="assets/ryder-cup-logo.png" alt="BRBC" style={{ width:100, height:"auto", display:"block", margin:"0 auto", mixBlendMode:"multiply" }} />
            <div style={{ fontFamily:OT.sans, fontSize:8, fontWeight:600, letterSpacing:"0.14em", color:OT.gold, textTransform:"uppercase", marginTop:4 }}>{target} to win</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:OT.serif, fontSize:20, fontWeight:700, color:OT.brooksLight, lineHeight:1, marginBottom:4, letterSpacing:"0.06em", textTransform:"uppercase" }}>Brooks</div>
            <div style={{ fontFamily:OT.serif, fontSize:52, fontWeight:700, lineHeight:0.85, letterSpacing:"-0.03em", color:OT.brooks, fontVariantNumeric:"lining-nums tabular-nums" }}>{b}</div>
            <div style={{ fontFamily:OT.mono, fontSize:8, color:OT.faint, marginTop:5, letterSpacing:"0.08em" }}>PROJ {D.team_brooks.projected.toFixed(1)}</div>
          </div>
        </div>
      </div>
      {live.length > 0 && <>
        <OSectionHead>Live Matches</OSectionHead>
        <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"0 16px" }}>
          {live.map(m => <OMatchCard key={m.id} m={m} onTap={() => onNav(m.id)} />)}
        </div>
      </>}
      {upcoming.length > 0 && <>
        <OSectionHead>Upcoming</OSectionHead>
        <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"0 16px" }}>
          {upcoming.map(m => <OMatchCard key={m.id} m={m} onTap={() => onNav(m.id)} />)}
        </div>
      </>}
      {complete.length > 0 && <>
        <OSectionHead>Completed</OSectionHead>
        <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"0 16px" }}>
          {complete.map(m => <OMatchCard key={m.id} m={m} onTap={() => onNav(m.id)} />)}
        </div>
      </>}
      <BRBCFooter />
    </div>
  );
}

// ─── SCREEN: Match Detail (interactive, Firebase-backed) ─────────
function OScreenMatchDetail({ D, matchId, onBack }) {
  const live = React.useContext(window.LiveCtx);
  const m = D.matches.find(x => x.id===matchId) || D.matches[0];

  // Build hole map from Firebase data (preferred) or fall back to derived match holes
  const buildHoles = React.useCallback((fbHoles) => {
    const map = {};
    for (let i=1; i<=18; i++) map[i]=null;
    if (fbHoles && Object.keys(fbHoles).length > 0) {
      Object.entries(fbHoles).forEach(([n, result]) => {
        const k = parseInt(n);
        map[k] = result === "rizo" ? "r" : result === "brooks" ? "b" : result === "halved" ? "h" : null;
      });
    } else {
      (m.holes||[]).forEach(h => { map[h.n] = h.win===1 ? "r" : h.win===-1 ? "b" : h.win===0 ? "h" : null; });
    }
    return map;
  }, [m.id]);

  const [holes, setHoles] = React.useState(() => buildHoles(live.holes[m.id]));

  // Intentionally no useEffect syncing live.holes → holes here.
  // Syncing back from Firebase caused visual re-fills: intermediate Firebase
  // "value" events (fired per-hole during a multi-hole clear) would overwrite
  // the user's local cleared state before all removes had propagated.
  // The useState initializer captures the current Firebase state on mount;
  // key={selectedMatch} in App ensures a fresh mount (and fresh read) whenever
  // the user navigates away and back to any match.

  const setHole = (n, v) => {
    setHoles(prev => {
      const newVal = { ...prev, [n]: prev[n]===v ? null : v };
      if (live.setHole) {
        const fbResult = newVal[n] === "r" ? "rizo" : newVal[n] === "b" ? "brooks" : newVal[n] === "h" ? "halved" : null;
        live.setHole(m.id, n, fbResult);
      }
      return newVal;
    });
  };

  const seg = (lo,hi) => {
    let r=0,b=0,played=0;
    for (let i=lo;i<=hi;i++) { const v=holes[i]; if(!v)continue; played++; if(v==="r")r++; else if(v==="b")b++; }
    return {r,b,played};
  };
  const segLab = (s, lo, hi) => {
    const holeCount = hi - lo + 1;
    const d = s.r - s.b;
    if (s.played === 0) return { txt:"—", color:OT.faint, final:false };
    const clinched = clinchLocal(holes, lo, hi);
    if (clinched) {
      const color = clinched.winner === "r" ? OT.rizoLight : OT.brooksLight;
      const txt = clinched.remaining > 0 ? `${clinched.up}&${clinched.remaining}` : `${clinched.up} UP`;
      return { txt, color, final:true };
    }
    if (d === 0 && s.played === holeCount) return { txt:"AS", color:OT.goldLight, final:true };
    if (d === 0) return { txt:"AS", color:OT.soft, final:false };
    return { txt:`${Math.abs(d)} UP`, color: d>0?OT.rizoLight:OT.brooksLight, final: s.played === holeCount };
  };
  const front=seg(1,9), back=seg(10,18), total={r:front.r+back.r,b:front.b+back.b,played:front.played+back.played};
  const fL=segLab(front, 1, 9), bL=segLab(back, 10, 18), tL=segLab(total, 1, 18);
  const diff=total.r-total.b, thru=total.played;

  const totalClinch = clinchLocal(holes, 1, 18);
  const heroColor = totalClinch
    ? (totalClinch.winner === "r" ? OT.rizoLight : OT.brooksLight)
    : (diff>0 ? OT.rizoLight : diff<0 ? OT.brooksLight : "#C9A84C");
  const heroTxt = totalClinch
    ? (totalClinch.remaining > 0 ? `${totalClinch.up}&${totalClinch.remaining}` : `${totalClinch.up} UP`)
    : (diff===0 ? (thru===0 ? "—" : "AS") : `${Math.abs(diff)} UP`);

  const HDATA = m.holes||[];
  const hm = n => HDATA.find(h=>h.n===n) || { par:4, dist:400 };

  const HoleRow = ({ n }) => {
    const meta = hm(n); const v = holes[n];
    return (
      <div style={{ display:"grid", gridTemplateColumns:"34px 1fr auto", alignItems:"center", padding:"7px 12px", borderBottom:`1px solid ${OT.rule}`, background: v==="r"?OT.rizoTint:v==="b"?OT.brooksTint:v==="h"?"rgba(70,75,94,0.04)":OT.bg }}>
        <div style={{ fontFamily:OT.serif, fontSize:16, fontWeight:600, color:OT.ink }}>{n}</div>
        <div style={{ fontFamily:OT.mono, fontSize:10, color:OT.faint }}>P{meta.par} · {meta.dist}y</div>
        <div style={{ display:"grid", gridTemplateColumns:"36px 36px 36px", gap:4 }}>
          {["r","h","b"].map(btn => (
            <button key={btn} onClick={() => setHole(n,btn)} style={{ height:28, borderRadius:2, border:`1px solid ${v===btn ? (btn==="r"?OT.rizoLight:btn==="b"?OT.brooksLight:"#C9A84C") : OT.rule}`, background: v===btn ? (btn==="r"?OT.rizoLight:btn==="b"?OT.brooksLight:"#C9A84C") : OT.bg, color: v===btn ? "#fff" : OT.faint, fontFamily:OT.serif, fontSize:13, fontWeight:700, cursor:"pointer", letterSpacing:"0.04em" }}>
              {btn==="r"?"R":btn==="h"?"½":"B"}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ padding:"12px 16px 14px", borderBottom:`1px solid ${OT.rule}`, display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"start", gap:6 }}>
        <div>
          <div style={{ fontFamily:OT.serif, fontSize:16, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:OT.rizoLight, marginBottom:4 }}>Rizo</div>
          {m.rizo.players.map((p,i) => <div key={i} style={{ fontFamily:OT.sans, fontSize:13, fontWeight:400, color:OT.ink, lineHeight:1.3 }}>{p}</div>)}
        </div>
        <div style={{ textAlign:"center", minWidth:86 }}>
          <div style={{ fontFamily:OT.serif, fontSize:38, fontWeight:600, lineHeight:1, color:heroColor, letterSpacing:"-0.02em" }}><Score v={heroTxt} /></div>
          <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.2em", color:thru===18 ? heroColor : OT.faint, marginTop:2, textTransform:"uppercase" }}>
            {thru===0?"Not Started":thru===18?"Final":`Thru ${thru}`}
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:OT.serif, fontSize:16, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:OT.brooksLight, marginBottom:4 }}>Brooks</div>
          {m.brooks.players.map((p,i) => <div key={i} style={{ fontFamily:OT.sans, fontSize:13, fontWeight:400, color:OT.ink, lineHeight:1.3, textAlign:"right" }}>{p}</div>)}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:`1px solid ${OT.rule}`, background:OT.surface }}>
        {[{lab:"Front 9",...fL},{lab:"Back 9",...bL},{lab:"Total",...tL}].map((s,i) => (
          <div key={i} style={{ padding:"9px 6px", textAlign:"center", borderRight:i<2?`1px solid ${OT.rule}`:"none" }}>
            <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.18em", color:OT.faint, marginBottom:3, textTransform:"uppercase" }}>{s.lab}</div>
            <div style={{ fontFamily:OT.serif, fontSize:15, fontWeight:700, color:s.color }}><Score v={s.txt} /></div>
            {s.final && <FinalBadge color={s.color} />}
          </div>
        ))}
      </div>
      <OSectionHead>Hole by Hole</OSectionHead>
      <div style={{ margin:"0 16px", border:`1px solid ${OT.rule}`, background:OT.bg }}>
        {/* Table header */}
        <div style={{ display:"grid", gridTemplateColumns:"34px 1fr auto", alignItems:"center", padding:"6px 12px", background:OT.surface, borderBottom:`1px solid ${OT.rule}` }}>
          <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.16em", color:OT.faint }}>HO</div>
          <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.16em", color:OT.faint }}>PAR · YDS</div>
          <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.16em", color:OT.faint, display:"grid", gridTemplateColumns:"36px 36px 36px", gap:4, textAlign:"center" }}>
            <span style={{ color:OT.rizoLight }}>R</span><span>½</span><span style={{ color:OT.brooksLight }}>B</span>
          </div>
        </div>
        {/* Front 9 */}
        {Array.from({length:9},(_,i)=>i+1).map(n => <HoleRow key={n} n={n} />)}
        {/* Turn banner */}
        <div style={{ background:OT.ink, color:OT.bg, textAlign:"center", padding:"5px 0", fontFamily:OT.sans, fontSize:9, fontWeight:700, letterSpacing:"0.28em", textTransform:"uppercase" }}>
          Turn · Front 9 · {fL.txt}
        </div>
        {/* Back 9 */}
        {Array.from({length:9},(_,i)=>i+10).map(n => <HoleRow key={n} n={n} />)}
      </div>
      <div style={{ height:28 }}></div>
    </div>
  );
}

// ─── SCREEN: Teams ───────────────────────────────────────────────
function OScreenTeams({ D }) {
  const initials = n => n.split(" ").map(s=>s[0]).join("").slice(0,2);
  const isDraftPending = !D.team_rizo.roster.length && !D.team_brooks.roster.length;

  const RosterRow = ({ p, team }) => (
    <div style={{ display:"grid", gridTemplateColumns:"36px 1fr auto", gap:10, alignItems:"center", padding:"10px 16px", borderBottom:`1px solid ${OT.rule}` }}>
      <div style={{ width:36, height:36, borderRadius:"50%", background: team==="rizo"?OT.rizoLight:OT.brooksLight, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:OT.serif, fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>{initials(p.name)}</div>
      <div>
        <div style={{ fontFamily:OT.serif, fontSize:17, fontWeight:700, color:OT.ink, letterSpacing:"-0.01em" }}>{p.name}</div>
        <div style={{ fontFamily:OT.sans, fontSize:10, fontWeight:700, letterSpacing:"0.16em", color:OT.faint, textTransform:"uppercase", marginTop:1 }}>{p.role}{p.hcp > 0 ? ` · HCP ${p.hcp}` : ""}</div>
      </div>
      <div style={{ display:"flex", gap:10, textAlign:"right" }}>
        {[{v:p.w,l:"W"},{v:p.l,l:"L"},{v:p.h,l:"H"}].map(s => (
          <div key={s.l}>
            <div style={{ fontFamily:OT.serif, fontSize:18, fontWeight:700, color:OT.ink, display:"block", textAlign:"center" }}>{s.v}</div>
            <div style={{ fontFamily:OT.sans, fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:OT.faint, textAlign:"center" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", padding:"14px 16px", alignItems:"center", borderBottom:`1px solid ${OT.rule}` }}>
        <div>
          <div style={{ fontFamily:OT.serif, fontSize:12, fontWeight:700, letterSpacing:"0.2em", color:OT.rizoLight, textTransform:"uppercase" }}>Team Rizo</div>
          <div style={{ fontFamily:OT.sans, fontSize:12, fontWeight:600, color:OT.soft, marginTop:2 }}>Capt. {D.team_rizo.captain}</div>
        </div>
        <div style={{ fontFamily:OT.serif, fontSize:20, fontStyle:"italic", color:OT.gold, padding:"0 10px" }}>vs</div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:OT.serif, fontSize:12, fontWeight:700, letterSpacing:"0.2em", color:OT.brooksLight, textTransform:"uppercase" }}>Team Brooks</div>
          <div style={{ fontFamily:OT.sans, fontSize:12, fontWeight:600, color:OT.soft, marginTop:2 }}>Capt. {D.team_brooks.captain}</div>
        </div>
      </div>

      {isDraftPending ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 32px", gap:16 }}>
          <div style={{ fontFamily:OT.serif, fontSize:32, color:OT.ruleStrong, textAlign:"center" }}>⚑</div>
          <div style={{ fontFamily:OT.serif, fontSize:20, fontWeight:700, color:OT.ink, textAlign:"center" }}>Draft Pending</div>
          <div style={{ fontFamily:OT.sans, fontSize:13, color:OT.faint, textAlign:"center", lineHeight:1.6 }}>
            Team rosters will appear here once the draft is complete. Check Rankings to see all 40 players.
          </div>
        </div>
      ) : (
        <>
          <OSectionHead>Team Rizo</OSectionHead>
          {D.team_rizo.roster.map(p => <RosterRow key={p.name} p={p} team="rizo" />)}
          <OSectionHead>Team Brooks</OSectionHead>
          {D.team_brooks.roster.map(p => <RosterRow key={p.name} p={p} team="brooks" />)}
        </>
      )}
      <div style={{ height:24 }}></div>
    </div>
  );
}

// ─── SCREEN: Rankings ────────────────────────────────────────────
function OScreenRankings({ D }) {
  const [open, setOpen] = React.useState(null);
  const initials = n => n.split(" ").map(s=>s[0]).join("").slice(0,2);

  // Use undrafted pool if teams aren't set yet, otherwise merge rosters
  const isDraftPending = D.undrafted && D.undrafted.length > 0;
  const rawPlayers = isDraftPending
    ? D.undrafted.map(p => ({...p, team: null}))
    : [
        ...D.team_rizo.roster.map(p=>({...p,team:"rizo"})),
        ...D.team_brooks.roster.map(p=>({...p,team:"brooks"})),
      ];

  const players = rawPlayers.map(p => {
    const played=p.w+p.l+p.h, pts=p.w+p.h*0.5, pct=played>0?pts/played:0;
    return {...p,played,pts,pct};
  }).sort((a,b) => {
    if(a.played===0&&b.played>0)return 1;
    if(b.played===0&&a.played>0)return -1;
    return b.pct-a.pct||b.pts-a.pts;
  });
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ padding:"14px 16px 10px" }}>
        <div style={{ fontFamily:OT.serif, fontSize:22, fontWeight:700, color:OT.ink, letterSpacing:"-0.01em" }}>Player Rankings</div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, padding:"0 16px 24px" }}>
        {players.map((p,i) => {
          const isOpen=open===p.name, isRookie=p.appearances===0;
          const teamColor = p.team==="rizo" ? OT.rizoLight : p.team==="brooks" ? OT.brooksLight : OT.ink;
          return (
            <div key={p.name} style={{ border:`1px solid ${OT.rule}`, background:OT.bg, cursor:"pointer" }} onClick={() => setOpen(isOpen?null:p.name)}>
              <div style={{ display:"grid", gridTemplateColumns:"28px 36px 1fr auto", alignItems:"center", gap:9, padding:"11px 12px" }}>
                <div style={{ fontFamily:OT.serif, fontSize:15, fontWeight:600, color:OT.faint, textAlign:"center" }}>
                  {i+1}
                </div>
                <div style={{ width:36, height:36, borderRadius:"50%", background:teamColor, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:OT.serif, fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>{initials(p.name)}</div>
                <div>
                  <div style={{ fontFamily:OT.serif, fontSize:16, fontWeight:700, color:OT.ink, letterSpacing:"-0.01em" }}>{p.name}</div>
                  <div style={{ display:"flex", gap:5, alignItems:"center", marginTop:2, flexWrap:"nowrap" }}>
                    {p.team ? (
                      <span style={{ fontFamily:OT.sans, fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:p.team==="rizo"?OT.rizoLight:OT.brooksLight, background:p.team==="rizo"?OT.rizoTint:OT.brooksTint, padding:"1px 5px" }}>{p.team==="rizo"?"RIZO":"BROOKS"}</span>
                    ) : (
                      <span style={{ fontFamily:OT.sans, fontSize:9, fontWeight:700, letterSpacing:"0.14em", color:OT.faint, background:OT.surface, padding:"1px 5px" }}>UNDRAFTED</span>
                    )}
                    {p.hcp > 0 && <span style={{ fontFamily:OT.mono, fontSize:9, color:OT.faint }}>HCP {p.hcp}</span>}
                    {p.cups>0 && <span style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, color:OT.goldLight }}>★ {p.cups}×</span>}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  {isRookie ? (
                    <div style={{ fontFamily:OT.serif, fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:OT.goldLight }}>ROOKIE</div>
                  ) : (
                    <>
                      <div style={{ fontFamily:OT.mono, fontSize:12, fontWeight:600, color:OT.ink }}>{p.w}–{p.l}–{p.h}</div>
                      <div style={{ fontFamily:OT.mono, fontSize:10, color:OT.faint }}>{(p.pct*100).toFixed(0)}%</div>
                    </>
                  )}
                </div>
              </div>
              {isOpen && (
                <div style={{ borderTop:`1px solid ${OT.rule}`, padding:"12px", background:OT.surface }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", border:`1px solid ${OT.rule}`, marginBottom:10, background:OT.bg }}>
                    {[{l:"Played",v:p.played||"—"},{l:"Wins",v:p.w||"—"},{l:"Losses",v:p.l||"—"},{l:"Halved",v:p.h||"—"},{l:"Cups",v:p.cups||"—"},{l:"HCP",v:p.hcp!=null?p.hcp.toFixed(1):"—"}].map((s,idx) => (
                      <div key={s.l} style={{ padding:"7px 4px", textAlign:"center", borderRight:idx<5?`1px solid ${OT.rule}`:"none" }}>
                        <div style={{ fontFamily:OT.serif, fontSize:15, fontWeight:700, color:OT.ink }}>{s.v}</div>
                        <div style={{ fontFamily:OT.serif, fontSize:8, fontWeight:700, letterSpacing:"0.14em", color:OT.faint, textTransform:"uppercase", marginTop:2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily:OT.sans, fontSize:12, lineHeight:1.6, color:OT.soft, margin:0 }}>{p.bio}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SCREEN: Hall of Champions ───────────────────────────────────
function OScreenHistory({ D }) {
  const rizoW = D.hall_of_champions.filter(c=>c.winner==="Rizo").length;
  const brooksW = D.hall_of_champions.filter(c=>c.winner==="Brooks").length;
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      {/* Series */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", margin:"16px 16px 4px", borderTop:`1px solid ${OT.rule}`, borderBottom:`1px solid ${OT.rule}`, padding:"14px 12px" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:OT.serif, fontSize:12, fontWeight:700, letterSpacing:"0.18em", color:OT.rizoLight, textTransform:"uppercase" }}>Rizo</div>
          <div style={{ fontFamily:OT.serif, fontSize:52, fontWeight:700, lineHeight:0.9, color:OT.rizo, fontVariantNumeric:"lining-nums tabular-nums" }}>{rizoW}</div>
        </div>
        <div style={{ textAlign:"center", padding:"0 12px" }}>
          <div style={{ fontFamily:OT.serif, fontSize:10, fontWeight:700, letterSpacing:"0.2em", color:OT.faint, textTransform:"uppercase", marginBottom:4 }}>All-Time</div>
          <div style={{ fontFamily:OT.serif, fontSize:18, fontWeight:600, color:OT.gold }}>—</div>
          <div style={{ fontFamily:OT.serif, fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:OT.faint, textTransform:"uppercase", marginTop:4 }}>
            {rizoW===brooksW?"All Square":rizoW>brooksW?"Rizo Leads":"Brooks Leads"}
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:OT.serif, fontSize:12, fontWeight:700, letterSpacing:"0.18em", color:OT.brooksLight, textTransform:"uppercase" }}>Brooks</div>
          <div style={{ fontFamily:OT.serif, fontSize:52, fontWeight:700, lineHeight:0.9, color:OT.brooks, fontVariantNumeric:"lining-nums tabular-nums" }}>{brooksW}</div>
        </div>
      </div>
      <OSectionHead>Past Champions</OSectionHead>
      <div style={{ display:"flex", flexDirection:"column", gap:16, padding:"0 16px 28px" }}>
        {D.hall_of_champions.map(c => {
          const isRizo=c.winner==="Rizo";
          const teamColor=isRizo?OT.rizoLight:OT.brooksLight;
          return (
            <div key={c.year} style={{ border:`1px solid ${OT.rule}`, background:OT.bg, overflow:"hidden" }}>
              <div style={{ height:3, background: isRizo?OT.rizoLight:OT.brooksLight }}></div>
              {c.photo && <img src={c.photo} alt={`${c.year} Champions`} style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block" }} />}
              <div style={{ padding:"14px 14px 16px" }}>
                <div style={{ fontFamily:OT.mono, fontSize:9, fontWeight:600, letterSpacing:"0.2em", color:OT.goldLight, marginBottom:4, textTransform:"uppercase" }}>{c.year} · Ryder Cup {c.edition}</div>
                <div style={{ fontFamily:OT.serif, fontSize:28, fontWeight:700, color:teamColor, letterSpacing:"-0.01em", lineHeight:1, marginBottom:12 }}>Team {c.winner}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:`1px solid ${OT.rule}`, marginBottom:12 }}>
                  {[{lab:"Final Score",val:c.score},{lab:"Edition",val:`Ryder Cup ${c.edition}`}].map((s,i) => (
                    <div key={s.lab} style={{ padding:"9px 10px", borderRight:i<1?`1px solid ${OT.rule}`:"none" }}>
                      <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.16em", color:OT.faint, marginBottom:3, textTransform:"uppercase" }}>{s.lab}</div>
                      <div style={{ fontFamily:OT.serif, fontSize:14, fontWeight:700, color:OT.ink }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                {c.roster && c.roster.length > 0 && <>
                  <div style={{ fontFamily:OT.serif, fontSize:9, fontWeight:700, letterSpacing:"0.2em", color:OT.faint, textTransform:"uppercase", marginBottom:6 }}>Team Roster</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", columnGap:14 }}>
                    {c.roster.map(n => (
                      <div key={n} style={{ fontFamily:OT.sans, fontSize:11, color:OT.ink, padding:"4px 0", borderBottom:`1px dotted ${OT.rule}` }}>{n}</div>
                    ))}
                  </div>
                </>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OScreenRules() {
  const rules = [
    { title:"Match Play Format", body:"All matches are played in match play format. Each hole is won, lost, or halved. The player or team that wins the most holes wins the match." },
    { title:"Scoring", body:"Each match is worth up to 3 points — 1 for the front 9, 1 for the back 9, and 1 for the overall 18-hole result. With 10 matches (30 total points), the first team to 15.5 points wins the Cup." },
    { title:"Concessions", body:"Putts, holes, or matches may be conceded at any time." },
    { title:"Local Rules", body:"USGA rules apply. Play the ball up in the fairway. Scramble format — 1 club length drop allowed without changing your lie." },
    { title:"Spirit of the Game", body:"Don't be a jackass. Respect your fellow competitors, the course, and the game. Any dispute should be raised immediately — tournament officials have final say. May the best team win." },
  ];
  return (
    <div style={{ flex:1, overflowY:"auto" }}>
      <div style={{ padding:"20px 16px 8px" }}>
        <div style={{ fontFamily:OT.serif, fontSize:22, fontWeight:700, letterSpacing:"0.04em", color:OT.ink, marginBottom:4 }}>Rules & Format</div>
        <div style={{ fontFamily:OT.sans, fontSize:11, color:OT.faint, letterSpacing:"0.06em" }}>BRBC Ryder Cup 2026 · Official Guidelines</div>
      </div>
      <div style={{ padding:"8px 16px 32px", display:"flex", flexDirection:"column", gap:12 }}>
        {rules.map((r, i) => (
          <div key={i} style={{ background:OT.bg, border:`1px solid ${OT.rule}`, padding:"14px 16px", borderLeft:`3px solid ${OT.goldLight}` }}>
            <div style={{ fontFamily:OT.serif, fontSize:14, fontWeight:700, color:OT.ink, marginBottom:6, letterSpacing:"0.02em" }}>{r.title}</div>
            <div style={{ fontFamily:OT.sans, fontSize:12.5, color:OT.soft, lineHeight:1.6 }}>{r.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  OT, Score, OHeader, ONav, OSectionHead,
  OScreenScoreboard, OScreenMatchDetail,
  OScreenTeams, OScreenRankings, OScreenHistory, OScreenRules,
});
