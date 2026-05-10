/* global React */
// ── BRBC shared UI primitives ──

const { useMemo } = React;

// Renders a score like "5&4" with the & in a plain sans-serif font
function Score({ v }) {
  if (!v || !v.includes('&')) return <>{v}</>;
  const [lo, hi] = v.split('&');
  return <>{lo}<span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 400 }}>{"&"}</span>{hi}</>;
}

// ── Navigation context — current screen + navigate fn ──
// Default { current: null } means "no provider" — BottomNav falls back to `active` prop.
const NavCtx = React.createContext({ current: null, navigate: null });

// ── Live holes context — Firebase hole data + setter ──
const LiveCtx = React.createContext({ holes: {}, setHole: null });

// ──────────────────────────────────────────────────
// Crest / header
// ──────────────────────────────────────────────────
function BrbcHeader({ title }) {
  return (
    <div className="brbc-header">
      <img className="crest-logo" src="assets/brbc-logo.png" alt="BRBC — Brooks Rizo Booze Classic" />
      <div className="crest-rule">
        <span className="crest-rule-line"></span>
        <span className="crest-event">Ryder Cup 2026</span>
        <span className="crest-rule-line"></span>
      </div>
    </div>
  );
}

// Pure data ribbon (date / venue / weather)
function LiveRibbon({ children }) {
  return (
    <div className="live-ribbon">
      <span className="dot"></span>
      {children || "LIVE · DAY 1 · FOURBALL"}
    </div>
  );
}

// ──────────────────────────────────────────────────
// Section header w/ italic accent
// ──────────────────────────────────────────────────
function SectionHead({ children, accent }) {
  return (
    <div className="section-head">
      <div className="rule"></div>
      <div className="section-title">
        {children}
        {accent ? <em>&nbsp;{accent}</em> : null}
      </div>
      <div className="rule"></div>
    </div>
  );
}

// Star ornament for visual rhythm
function Ornament({ text = "★" }) {
  return (
    <div className="ornament">
      <span className="star">{text}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Scoreboard hero — team scores + projected + progress
// ──────────────────────────────────────────────────
function ScoreboardHero({ target = 12.5, max = 25 }) {
  const D = window.BRBC_DATA;
  const r = D.team_rizo.score;
  const b = D.team_brooks.score;
  const remaining = max - r - b;
  return (
    <>
      <div className="score-banner">
        <div className="team-block left">
          <div className="team-name rizo">Rizo</div>
          <div className="team-score rizo numerals">{r}</div>
          <div className="team-proj">PROJ. {D.team_rizo.projected.toFixed(1)}</div>
        </div>
        <div className="score-target">
          <svg className="target-trophy" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4h10v5a5 5 0 0 1-10 0z"/>
            <path d="M5 4H3.5v2.5A2.5 2.5 0 0 0 6 9M19 4h1.5v2.5A2.5 2.5 0 0 1 18 9"/>
            <path d="M9 19h6M12 14v5"/>
          </svg>
          <div className="target-eyebrow">First To</div>
          <div className="target-num numerals">{target}</div>
          <div className="target-label">Points</div>
        </div>
        <div className="team-block right">
          <div className="team-name brooks">Brooks</div>
          <div className="team-score brooks numerals">{b}</div>
          <div className="team-proj">PROJ. {D.team_brooks.projected.toFixed(1)}</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-rizo"   style={{ width: `${(r / max) * 100}%` }}></div>
          <div className="progress-brooks" style={{ width: `${(b / max) * 100}%` }}></div>
          <div className="progress-marker" style={{ left: `${(target / max) * 100}%` }}></div>
        </div>
        <div className="progress-labels numerals">
          <span>0</span>
          <span className="target">{target} TO WIN</span>
          <span>{max}</span>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────
// Match Card (the main reusable card)
// ──────────────────────────────────────────────────
function statusFromMargin(side, margin, played, max) {
  if (played === 0) return { num: "—", label: "NOT STARTED", side: "as" };
  if (margin === 0 && played >= max) return { num: "AS", label: "HALVED", side: "as" };
  if (margin === 0) return { num: "AS", label: "ALL SQUARE", side: "as" };
  return { num: `${margin} UP`, label: side.toUpperCase(), side };
}

function MatchCard({ m, hideHoleStrip = false, hideSubPts = false, onClick }) {
  const lead = m.lead;
  const status = statusFromMargin(m.lead || "as", m.lead_amt || 0, m.thru || 0, 18);
  const cardClass = lead === "rizo" ? "lead-rizo" : lead === "brooks" ? "lead-brooks" : "";

  const subVal = (seg) => {
    if (!seg || !seg.winner) return { txt: "\u2014", cls: "pending", final: false };
    if (seg.winner === "halved") return { txt: "AS", cls: "as", final: true };
    const cls = seg.winner === "rizo" ? "rizo" : "brooks";
    const txt = seg.remaining > 0 ? `${seg.margin}&${seg.remaining}` : `${seg.margin} UP`;
    return { txt, cls, final: true };
  };
  const f = subVal(m.front);
  const ba = subVal(m.back);
  const t = subVal(m.total);

  return (
    <div className={`match-card ${cardClass}`} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div className="match-meta">
        <div className="match-meta-left">
          <span className="numerals">{m.time}</span>
          {m.status === "upcoming" ? <><span>·</span><span style={{ color: "var(--ink-faint)" }}>UPCOMING</span></> : null}
        </div>
        <div className="thru numerals">
          {m.status === "upcoming" ? "\u2014" : m.thru === 18 ? "F" : `THRU ${m.thru}`}
        </div>
      </div>

      <div className="match-body">
        <div className="team-side rizo left">
          <div className="team-tag">Rizo</div>
          {m.rizo.players.map((p, i) => <div key={i} className="player">{p}</div>)}
        </div>
        <div className="match-status">
          <div className={`status-num ${status.side === "rizo" ? "rizo" : status.side === "brooks" ? "brooks" : "as"}`}>
            {status.num}
          </div>
          <div className="status-label">{m.status === "upcoming" ? "TEE TIME" : ""}</div>
        </div>
        <div className="team-side brooks right">
          <div className="team-tag">Brooks</div>
          {m.brooks.players.map((p, i) => <div key={i} className="player">{p}</div>)}
        </div>
      </div>

      {!hideSubPts && m.status !== "upcoming" ? (
        <div className="sub-pts">
          <div className="sub-pt">
            <div className="sub-label">Front 9</div>
            <div className={`sub-val ${f.cls}`}><Score v={f.txt} /></div>
            {f.final && <div style={{ fontSize: 8, fontFamily: 'var(--sans)', letterSpacing: '0.12em', color: 'var(--gold-2)', textAlign: 'center', marginTop: 2, fontWeight: 600 }}>FINAL</div>}
          </div>
          <div className="sub-pt">
            <div className="sub-label">Back 9</div>
            <div className={`sub-val ${ba.cls}`}><Score v={ba.txt} /></div>
            {ba.final && <div style={{ fontSize: 8, fontFamily: 'var(--sans)', letterSpacing: '0.12em', color: 'var(--gold-2)', textAlign: 'center', marginTop: 2, fontWeight: 600 }}>FINAL</div>}
          </div>
          <div className="sub-pt">
            <div className="sub-label">18 Holes</div>
            <div className={`sub-val ${t.cls}`}><Score v={t.txt} /></div>
            {t.final && <div style={{ fontSize: 8, fontFamily: 'var(--sans)', letterSpacing: '0.12em', color: 'var(--gold-2)', textAlign: 'center', marginTop: 2, fontWeight: 600 }}>FINAL</div>}
          </div>
        </div>
      ) : null}

      {!hideHoleStrip && m.holes ? (
        <div className="hole-strip">
          {Array.from({ length: 18 }).map((_, i) => {
            const h = m.holes.find(x => x.n === i + 1);
            const cls = !h ? "" : h.win === 1 ? "r" : h.win === -1 ? "b" : "h";
            return (
              <React.Fragment key={i}>
                {i === 9 ? <div className="hole-divider"></div> : null}
                <div className={`hole-dot ${cls}`}></div>
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

// ──────────────────────────────────────────────────
// Bottom nav
// ──────────────────────────────────────────────────
function NavIcon({ name }) {
  const ic = {
    scoreboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4h18v14H3z"/><path d="M7 8h4M7 12h4M7 16h4M14 8h3M14 12h3M14 16h3"/></svg>,
    matches: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>,
    teams: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M14 19c0-2 2-3.5 4-3.5s4 1.5 4 3.5"/></svg>,
    rankings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 20h4v-6H3zM10 20h4V8h-4zM17 20h4V4h-4z"/></svg>,
    history: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M5 4H4v3a3 3 0 0 0 3 3M19 4h1v3a3 3 0 0 1-3 3M9 20h6M12 15v5"/></svg>,
  };
  return <div className="nav-icon">{ic[name]}</div>;
}

function BottomNav({ active = "scoreboard" }) {
  const nav = React.useContext(NavCtx);
  // Use context if a real provider is wrapping us, otherwise fall back to the `active` prop
  const currentActive = nav.current !== null ? nav.current : active;
  const items = [
    { id: "scoreboard", label: "Scores" },
    { id: "matches",    label: "Matches" },
    { id: "teams",      label: "Teams" },
    { id: "rankings",   label: "Rankings" },
    { id: "history",    label: "History" },
  ];
  return (
    <div className="bottom-nav">
      {items.map(it => (
        <div
          key={it.id}
          className={`nav-item ${currentActive === it.id ? "active" : ""}`}
          onClick={() => nav.navigate && nav.navigate(it.id)}
          style={nav.navigate ? { cursor: 'pointer' } : undefined}
        >
          <NavIcon name={it.id} />
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// expose
Object.assign(window, {
  NavCtx, LiveCtx,
  Score,
  BrbcHeader, LiveRibbon, SectionHead, Ornament,
  ScoreboardHero, MatchCard, BottomNav, NavIcon,
});
