/* global React */
// ── BRBC screens (each renders inside an iPhone frame) ──

// ──────────────────────────────────────────────────
// SCREEN A — Scoreboard (default / editorial)
// ──────────────────────────────────────────────────
function ScreenScoreboard({ density = "default", variant = "data" }) {
  const D = window.BRBC_DATA;
  const nav = React.useContext(NavCtx);
  const live = D.matches.filter(m => m.status === "live");
  const upcoming = D.matches.filter(m => m.status === "upcoming");
  const complete = D.matches.filter(m => m.status === "complete");

  const goToMatch = nav.navigate ? (id) => {
    if (window.BRBC_SELECT_MATCH) window.BRBC_SELECT_MATCH(id);
    nav.navigate("matches");
  } : null;

  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader title="Scoreboard" />
      <ScoreboardHero target={12.5} max={25} />

      {live.length > 0 && <>
        <SectionHead>Live Matches</SectionHead>
        <div className="match-list">
          {live.map(m => (
            <MatchCard key={m.id} m={m} onClick={goToMatch ? () => goToMatch(m.id) : undefined} />
          ))}
        </div>
      </>}

      {upcoming.length > 0 && (
        <>
          <Ornament text="◆ ◆ ◆" />
          <SectionHead>Upcoming</SectionHead>
          <div className="match-list" style={{ paddingBottom: 16 }}>
            {upcoming.map(m => (
              <MatchCard key={m.id} m={m} hideHoleStrip hideSubPts onClick={goToMatch ? () => goToMatch(m.id) : undefined} />
            ))}
          </div>
        </>
      )}

      {complete.length > 0 && (
        <>
          <Ornament text="◆ ◆ ◆" />
          <SectionHead>Completed</SectionHead>
          <div className="match-list" style={{ paddingBottom: 16 }}>
            {complete.map(m => (
              <MatchCard key={m.id} m={m} hideHoleStrip onClick={goToMatch ? () => goToMatch(m.id) : undefined} />
            ))}
          </div>
        </>
      )}

      <Ornament text="★    FIRST TO 12.5 POINTS WINS THE CUP    ★" />
      <BottomNav active="scoreboard" />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SCREEN B — Match Detail (hole-by-hole)
// ──────────────────────────────────────────────────
function ScreenMatchDetail({ density = "default", matchId: matchIdProp }) {
  const D = window.BRBC_DATA;
  const live = React.useContext(LiveCtx);

  // Resolve which match to show — from prop, else first live match, else first match
  const resolvedId = matchIdProp
    || (D.matches.find(m => m.status === "live") || D.matches[0]).id;
  const m = D.matches.find(m => m.id === resolvedId) || D.matches[0];

  // Build initial local hole map from LiveCtx (Firebase) or fall back to static data
  const buildHolesFromLive = React.useCallback((liveData) => {
    const map = {};
    for (let i = 1; i <= 18; i++) map[i] = null;
    if (liveData && Object.keys(liveData).length > 0) {
      Object.entries(liveData).forEach(([n, result]) => {
        const k = parseInt(n);
        map[k] = result === 'rizo' ? 'r' : result === 'brooks' ? 'b' : result === 'halved' ? 'h' : null;
      });
    } else {
      (m.holes || []).forEach(h => {
        map[h.n] = h.win === 1 ? 'r' : h.win === -1 ? 'b' : h.win === 0 ? 'h' : null;
      });
    }
    return map;
  }, [m.id]);

  const [holes, setHoles] = React.useState(() => buildHolesFromLive(live.holes[m.id]));

  // Sync when Firebase data arrives or match changes
  React.useEffect(() => {
    setHoles(buildHolesFromLive(live.holes[m.id]));
  }, [live.holes[m.id], m.id]);

  const setHole = (n, v) => {
    setHoles(prev => {
      const newVal = { ...prev, [n]: prev[n] === v ? null : v };
      // Write to Firebase via context
      if (live.setHole) {
        const fbResult = newVal[n] === 'r' ? 'rizo' : newVal[n] === 'b' ? 'brooks' : newVal[n] === 'h' ? 'halved' : null;
        live.setHole(m.id, n, fbResult);
      }
      return newVal;
    });
  };

  // ── derive standings from holes map ──
  const segScore = (lo, hi) => {
    let r = 0, b = 0, played = 0;
    for (let i = lo; i <= hi; i++) {
      const v = holes[i]; if (!v) continue;
      played++;
      if (v === 'r') r++; else if (v === 'b') b++;
    }
    return { r, b, played };
  };
  const segLabel = (s, total) => {
    const diff = s.r - s.b;
    if (s.played === 0) return { txt: '\u2014', cls: 'as' };
    if (diff === 0 && s.played === total) return { txt: 'AS', cls: 'as' };
    if (diff === 0) return { txt: 'AS', cls: 'as' };
    return { txt: `${Math.abs(diff)} UP`, cls: diff > 0 ? 'rizo' : 'brooks' };
  };

  const front = segScore(1, 9);
  const back = segScore(10, 18);
  const total = { r: front.r + back.r, b: front.b + back.b, played: front.played + back.played };
  const fLabel = segLabel(front, 9);
  const bLabel = segLabel(back, 9);
  const tLabel = segLabel(total, 18);
  const thru = total.played;
  const overallDiff = total.r - total.b;

  const heroSide = overallDiff > 0 ? 'rizo' : overallDiff < 0 ? 'brooks' : 'as';
  const heroNum = overallDiff === 0 ? (thru === 0 ? '\u2014' : 'AS') : `${Math.abs(overallDiff)}`;

  const HOLE_DATA = (m.holes || []);
  const holeMeta = (n) => HOLE_DATA.find(h => h.n === n) || { par: 4, dist: 400 };

  const renderEntryRow = (n) => {
    const meta = holeMeta(n);
    const v = holes[n];
    return (
      <div className="entry-row" key={n}>
        <div className="entry-cell entry-num serif numerals">{n}</div>
        <div className="entry-cell entry-meta mono">P{meta.par} · {meta.dist}</div>
        <div className="entry-cell entry-buttons">
          <button className={`entry-btn rizo ${v === 'r' ? 'active' : ''}`} onClick={() => setHole(n, 'r')}>R</button>
          <button className={`entry-btn half ${v === 'h' ? 'active' : ''}`} onClick={() => setHole(n, 'h')}>½</button>
          <button className={`entry-btn brooks ${v === 'b' ? 'active' : ''}`} onClick={() => setHole(n, 'b')}>B</button>
        </div>
      </div>
    );
  };

  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader title={`Match ${D.matches.findIndex(x => x.id === m.id) + 1}`} />
      <div className="venue-strip">
        {thru === 0 ? 'NOT STARTED' : thru >= 18 ? 'FINAL' : `THRU ${thru}`}
      </div>

      <div className="score-banner" style={{ paddingBottom: 10, alignItems: 'start' }}>
        <div className="team-block left">
          <div className="team-name rizo">Rizo</div>
          {m.rizo.players.map((p, i) => (
            <div key={i} className="serif" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{p}</div>
          ))}
        </div>
        <div className="score-target" style={{ paddingTop: 6 }}>
          <div className={`status-num ${heroSide}`} style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{heroNum}</div>
          <div className="target-label" style={{ marginTop: 2 }}>{heroNum === 'AS' || heroNum === '\u2014' ? 'ALL SQUARE' : 'UP'}</div>
        </div>
        <div className="team-block right">
          <div className="team-name brooks">Brooks</div>
          {m.brooks.players.map((p, i) => (
            <div key={i} className="serif" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, textAlign: 'right' }}>{p}</div>
          ))}
        </div>
      </div>

      <div className="sub-pts" style={{ margin: '0 16px', border: '1px solid var(--rule)', borderRadius: 4 }}>
        <div className="sub-pt"><div className="sub-label">Front 9</div><div className={`sub-val ${fLabel.cls}`}>{fLabel.txt}</div></div>
        <div className="sub-pt"><div className="sub-label">Back 9</div><div className={`sub-val ${bLabel.cls}`}>{bLabel.txt}</div></div>
        <div className="sub-pt"><div className="sub-label">Total</div><div className={`sub-val ${tLabel.cls}`}>{tLabel.txt}</div></div>
      </div>

      <SectionHead accent="hole-by-hole">Card</SectionHead>

      <div className="entry-card" style={{ margin: '0 16px' }}>
        {Array.from({ length: 9 }, (_, i) => renderEntryRow(i + 1))}
        <div className="entry-turn">TURN · FRONT 9 · {fLabel.txt === '\u2014' ? '—' : `${fLabel.cls === 'rizo' ? 'RIZO' : fLabel.cls === 'brooks' ? 'BROOKS' : 'ALL SQUARE'}${fLabel.txt !== 'AS' ? ' ' + fLabel.txt : ''}`}</div>
        {Array.from({ length: 9 }, (_, i) => renderEntryRow(i + 10))}
      </div>

      <Ornament text="◆ ◆ ◆" />
      <BottomNav active="matches" />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SCREEN D — Teams Roster
// ──────────────────────────────────────────────────
function ScreenTeams({ density = "default" }) {
  const D = window.BRBC_DATA;
  const initials = (n) => n.split(" ").map(s => s[0]).join("").slice(0, 2);

  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader title="Teams" />
      <LiveRibbon>20 PLAYERS · 2 CAPTAINS · 1 CUP</LiveRibbon>

      {/* Versus banner */}
      <div className="score-banner" style={{ paddingBottom: 8, alignItems: "center" }}>
        <div className="team-block left">
          <div className="team-name rizo">Rizo</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--rizo)" }}>{D.team_rizo.score}</div>
          <div className="team-proj">CAPT · {D.team_rizo.captain.toUpperCase()}</div>
        </div>
        <div className="score-target">
          <div className="serif" style={{ fontSize: 22, fontStyle: "italic", color: "var(--gold-2)" }}>vs</div>
        </div>
        <div className="team-block right">
          <div className="team-name brooks">Brooks</div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 700, color: "var(--brooks)" }}>{D.team_brooks.score}</div>
          <div className="team-proj">CAPT · {D.team_brooks.captain.toUpperCase()}</div>
        </div>
      </div>

      <SectionHead accent="navy">Team Rizo</SectionHead>
      <div>
        {D.team_rizo.roster.slice(0, 5).map(p => (
          <div className="roster-row" key={p.name}>
            <div className="avatar rizo">{initials(p.name)}</div>
            <div>
              <div className="roster-name">{p.name}</div>
              <div className="roster-role">{p.role} · HCP {p.hcp}</div>
            </div>
            <div className="roster-stats">
              <div><span className="stat-num numerals">{p.w}</span><span className="stat-lab">W</span></div>
              <div><span className="stat-num numerals">{p.l}</span><span className="stat-lab">L</span></div>
              <div><span className="stat-num numerals">{p.h}</span><span className="stat-lab">H</span></div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead accent="crimson">Team Brooks</SectionHead>
      <div>
        {D.team_brooks.roster.slice(0, 5).map(p => (
          <div className="roster-row" key={p.name}>
            <div className="avatar brooks">{initials(p.name)}</div>
            <div>
              <div className="roster-name">{p.name}</div>
              <div className="roster-role">{p.role} · HCP {p.hcp}</div>
            </div>
            <div className="roster-stats">
              <div><span className="stat-num numerals">{p.w}</span><span className="stat-lab">W</span></div>
              <div><span className="stat-num numerals">{p.l}</span><span className="stat-lab">L</span></div>
              <div><span className="stat-num numerals">{p.h}</span><span className="stat-lab">H</span></div>
            </div>
          </div>
        ))}
      </div>

      <Ornament text="★" />
      <BottomNav active="teams" />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SCREEN E — Player Profile
// ──────────────────────────────────────────────────
function ScreenPlayer({ density = "default" }) {
  const D = window.BRBC_DATA;
  const p = D.team_rizo.roster[0]; // captain
  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader title="Player" />
      <LiveRibbon>CAPTAIN · TEAM RIZO</LiveRibbon>

      <div style={{ padding: "24px 16px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div className="avatar rizo" style={{ width: 84, height: 84, fontSize: 30 }}>GR</div>
        <div className="serif" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{p.name}</div>
        <div className="eyebrow-gold">Captain · 7th Appearance</div>
      </div>

      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", margin: "0 16px" }}>
        {[
          { lab: "HCP", val: p.hcp.toFixed(1) },
          { lab: "Wins", val: p.w },
          { lab: "Losses", val: p.l },
          { lab: "Halves", val: p.h },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 6px", textAlign: "center", borderRight: i < 3 ? "1px solid var(--rule)" : "none" }}>
            <div className="serif numerals" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>{s.val}</div>
            <div className="eyebrow" style={{ marginTop: 4 }}>{s.lab}</div>
          </div>
        ))}
      </div>

      <SectionHead accent="2026">Today's Match</SectionHead>
      <div className="match-list">
        <MatchCard m={D.matches.find(m => m.rizo.players.includes(p.name)) || D.matches[2]} />
      </div>

      <SectionHead>Career · Cup History</SectionHead>
      <div>
        {D.hall_of_champions.slice(0, 4).map(c => (
          <div className="champ-row" key={c.year} style={{ padding: "12px 16px" }}>
            <div>
              <div className="champ-year" style={{ fontSize: 20 }}>{c.year}</div>
              <div className="champ-edition" style={{ fontSize: 10 }}>{c.edition}</div>
            </div>
            <div>
              <div className={`champ-winner ${c.winner === "Rizo" ? "rizo" : "brooks"}`} style={{ fontSize: 14 }}>
                {c.winner === "Rizo" ? "Won · Team Rizo" : "Lost · Team Brooks"}
              </div>
              <div className="champ-meta">{c.venue}</div>
            </div>
            <div className="champ-score" style={{ fontSize: 11 }}>{c.score}</div>
          </div>
        ))}
      </div>

      <Ornament text="★" />
      <BottomNav active="teams" />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SCREEN F — Hall of Champions
// ──────────────────────────────────────────────────
function ScreenHistory({ density = "default" }) {
  const D = window.BRBC_DATA;
  const rizoWins = D.hall_of_champions.filter(c => c.winner === "Rizo").length;
  const brooksWins = D.hall_of_champions.filter(c => c.winner === "Brooks").length;
  const leader = rizoWins > brooksWins ? "RIZO" : rizoWins < brooksWins ? "BROOKS" : "TIED";

  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader title="Hall of Champions" />

      <div style={{ padding: "22px 16px 10px", textAlign: "center" }}>
        <div className="serif" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Hall of Champions
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 8, letterSpacing: "0.18em" }}>
          {D.hall_of_champions.length} EDITIONS · EST. 2024
        </div>
      </div>

      {/* All-time series banner */}
      <div className="series-banner">
        <div className="series-side rizo">
          <div className="series-name">Rizo</div>
          <div className="series-num numerals">{rizoWins}</div>
        </div>
        <div className="series-mid">
          <div className="series-eye">All-Time</div>
          <div className="series-dash">—</div>
          <div className="series-leader">{leader === "TIED" ? "ALL SQUARE" : leader + " LEADS"}</div>
        </div>
        <div className="series-side brooks">
          <div className="series-name">Brooks</div>
          <div className="series-num numerals">{brooksWins}</div>
        </div>
      </div>

      <SectionHead>Past Champions</SectionHead>

      <div className="champ-stack">
        {D.hall_of_champions.map(c => {
          const sideClass = c.winner === "Rizo" ? "rizo" : "brooks";
          return (
            <article className={`champ-card ${sideClass}`} key={c.year}>
              <div className="champ-photo-wrap">
                {c.photo ? (
                  <img className="champ-photo" src={c.photo} alt={`${c.year} ${c.winner} champions`} />
                ) : (
                  <div className="champ-photo placeholder">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="1"/>
                      <circle cx="8.5" cy="10.5" r="1.5"/>
                      <path d="M21 16l-5-5-9 8"/>
                    </svg>
                    <span>Team Photo</span>
                  </div>
                )}
                <div className="champ-photo-rule"></div>
              </div>

              <div className="champ-body">
                <div className="champ-eyebrow">{c.year} · Ryder Cup {c.edition}</div>
                <div className={`champ-title ${sideClass}`}>Team {c.winner}</div>

                <div className="champ-meta-row">
                  <div className="champ-meta-cell">
                    <div className="champ-meta-lab">Final Score</div>
                    <div className="champ-meta-val numerals">{c.score}</div>
                  </div>
                  <div className="champ-meta-cell">
                    <div className="champ-meta-lab">Edition</div>
                    <div className="champ-meta-val">Ryder Cup {c.edition}</div>
                  </div>
                </div>

                {c.roster && c.roster.length > 0 && (
                  <>
                    <div className="champ-roster-lab">Team Roster</div>
                    <div className="champ-roster">
                      {c.roster.map(n => (
                        <div className="champ-roster-name" key={n}>{n}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <Ornament text="★    THE BROOKS RIZO BOOZE CLASSIC    ★" />
      <BottomNav active="history" />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SCREEN G — Rankings
// ──────────────────────────────────────────────────
function ScreenRankings({ density = "default" }) {
  const D = window.BRBC_DATA;
  const [expanded, setExpanded] = React.useState(null);

  // Combine both rosters, compute ranking score (W + 0.5*H) / max(1, W+L+H)
  const allPlayers = [
    ...D.team_rizo.roster.map(p => ({ ...p, team: "rizo" })),
    ...D.team_brooks.roster.map(p => ({ ...p, team: "brooks" })),
  ].map(p => {
    const played = p.w + p.l + p.h;
    const pts = p.w + p.h * 0.5;
    const pct = played > 0 ? pts / played : 0;
    return { ...p, played, pts, pct };
  }).sort((a, b) => {
    // Rookies (0 played) go last
    if (a.played === 0 && b.played > 0) return 1;
    if (b.played === 0 && a.played > 0) return -1;
    if (b.pct !== a.pct) return b.pct - a.pct;
    return b.pts - a.pts;
  });

  const initials = n => n.split(" ").map(s => s[0]).join("").slice(0, 2);

  return (
    <div className="brbc" data-density={density}>
      <BrbcHeader />

      <div style={{ padding: "18px 16px 8px" }}>
        <div className="serif" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Player Rankings
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-faint)", marginTop: 6, letterSpacing: "0.18em" }}>
          {allPlayers.length} PLAYERS · RANKED BY WIN PCT
        </div>
      </div>

      <SectionHead>All-Time Match Play</SectionHead>

      <div className="rank-list">
        {allPlayers.map((p, i) => {
          const isOpen = expanded === p.name;
          const isRookie = p.played === 0;
          return (
            <div
              key={p.name}
              className={`rank-card ${isOpen ? "open" : ""}`}
              onClick={() => setExpanded(isOpen ? null : p.name)}
            >
              <div className="rank-main">
                <div className="rank-num serif numerals">
                  {isRookie ? <span style={{ fontSize: 11, color: "var(--gold-2)", letterSpacing: "0.1em" }}>NEW</span> : i + 1}
                </div>
                <div className={`avatar ${p.team}`} style={{ width: 38, height: 38, fontSize: 13, flexShrink: 0 }}>
                  {initials(p.name)}
                </div>
                <div className="rank-info">
                  <div className="rank-name serif">{p.name}</div>
                  <div className="rank-meta">
                    <span className={`rank-team-tag ${p.team}`}>{p.team === "rizo" ? "Rizo" : "Brooks"}</span>
                    <span className="rank-dot">·</span>
                    <span>HCP {p.hcp.toFixed(1)}</span>
                    {p.cups > 0 && (
                      <>
                        <span className="rank-dot">·</span>
                        <span className="rank-cups">
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2, verticalAlign: "middle" }}>
                            <path d="M7 4h10v5a5 5 0 0 1-10 0z"/>
                            <path d="M5 4H3.5v2A2.5 2.5 0 0 0 6 8.5M19 4h1.5v2A2.5 2.5 0 0 1 18 8.5M9 19h6M12 14v5"/>
                          </svg>
                          {p.cups}x
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="rank-record">
                  {isRookie ? (
                    <div className="rank-record-str rookie">ROOKIE</div>
                  ) : (
                    <>
                      <div className="rank-record-str numerals">{p.w}–{p.l}–{p.h}</div>
                      <div className="rank-pct numerals">{(p.pct * 100).toFixed(0)}%</div>
                    </>
                  )}
                </div>
              </div>

              {isOpen && (
                <div className="rank-bio">
                  <div className="rank-bio-stats">
                    {[
                      { lab: "Played", val: p.played || "—" },
                      { lab: "Wins",   val: p.w || "—" },
                      { lab: "Losses", val: p.l || "—" },
                      { lab: "Halved", val: p.h || "—" },
                      { lab: "Cups",   val: p.cups || "—" },
                      { lab: "HCP",    val: p.hcp.toFixed(1) },
                    ].map(s => (
                      <div className="rank-bio-stat" key={s.lab}>
                        <div className="rank-bio-val numerals">{s.val}</div>
                        <div className="rank-bio-lab">{s.lab}</div>
                      </div>
                    ))}
                  </div>
                  <p className="rank-bio-text">{p.bio}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Ornament text="★" />
      <BottomNav active="rankings" />
    </div>
  );
}

Object.assign(window, {
  ScreenScoreboard, ScreenMatchDetail,
  ScreenTeams, ScreenPlayer, ScreenHistory, ScreenRankings,
});
