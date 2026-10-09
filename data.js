// ── BRBC TOURNAMENT DATA ──

window.BRBC_DATA = {
  edition: "III",
  year: 2026,
  venue: "Braintree Municipal Golf Course",
  dates: "October 24, 2026",
  weather: { temp: 65, cond: "Clear", wind: "5 mph NW" },

  // 10 matches × 3 pts each = 30 pts total; 15.5 to win
  matches: [
    { id:"m1",  time:"8:30 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m2",  time:"8:40 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m3",  time:"8:50 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m4",  time:"9:00 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m5",  time:"9:10 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m6",  time:"9:20 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m7",  time:"9:30 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m8",  time:"9:40 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m9",  time:"9:50 AM",  tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m10", time:"10:00 AM", tee:1, thru:0, status:"upcoming", rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
  ],

  team_rizo: {
    name: "Rizo",
    captain: "Jared Rizo",
    color: "navy",
    score: 0,
    projected: 0,
    record: { wins: 1, losses: 1 },
    roster: [], // populated after draft
  },

  team_brooks: {
    name: "Brooks",
    captain: "Sean Brooks",
    color: "crimson",
    score: 0,
    projected: 0,
    record: { wins: 1, losses: 1 },
    roster: [], // populated after draft
  },

  // All 40 players — undrafted. hcp values are placeholders until provided.
  undrafted: [
    // ── Veterans ──────────────────────────────────────────────────
    { name:"Keane Costa",        hcp:0.0, w:6, l:0, h:0, cups:1, appearances:2, bio:"The most dominant player in BRBC history. A perfect 6-0-0 record across two cups." },
    { name:"Cam Hooper",         hcp:0.0, w:4, l:0, h:2, cups:2, appearances:2, bio:"Two-time Cup winner with an elite 4-0-2 record. Rarely loses a match." },
    { name:"Tim Flynn",          hcp:0.0, w:4, l:2, h:0, cups:2, appearances:2, bio:"Two-time champion with four wins from six matches. A proven alternate-shot weapon." },
    { name:"Mike Preziosi",      hcp:0.0, w:4, l:2, h:0, cups:1, appearances:2, bio:"Four wins across two appearances. A steady ball-striker who makes his partner better." },
    { name:"Kyle Devin",         hcp:0.0, w:3, l:0, h:0, cups:1, appearances:1, bio:"Undefeated in his Cup debut (3-0-0). A weapon entering his second go-around." },
    { name:"Nick Ciuffo",        hcp:0.0, w:3, l:0, h:0, cups:0, appearances:1, bio:"Three straight wins as a rookie. Plays without fear and has the record to back it up." },
    { name:"Nick Radcliffe",     hcp:0.0, w:3, l:0, h:0, cups:1, appearances:1, bio:"Burst onto the scene with three straight wins. Brings energy and confidence into year two." },
    { name:"Andrew Dion",        hcp:0.0, w:3, l:0, h:0, cups:1, appearances:1, bio:"Undefeated in his Cup debut (3-0-0). A clear favorite heading into his sophomore year." },
    { name:"Billy Gardner",      hcp:0.0, w:3, l:2, h:1, cups:1, appearances:2, bio:"Steady veteran with a 3-2-1 ledger. A captain's pick on any roster." },
    { name:"Sean Brooks",        hcp:0.0, w:3, l:3, h:0, cups:1, appearances:2, bio:"Co-founder of the BRBC and a reliable match play presence with 3 wins on his card." },
    { name:"Jeff Demers",        hcp:0.0, w:3, l:3, h:0, cups:1, appearances:2, bio:"A reliable match play hand with three wins and the demeanor to back it up." },
    { name:"Jack Wilson",        hcp:0.0, w:2, l:1, h:0, cups:1, appearances:1, bio:"Won two of three matches in his rookie season. A confidence pick for any captain." },
    { name:"Sean Williamson",    hcp:0.0, w:2, l:0, h:1, cups:1, appearances:1, bio:"Strong rookie debut (2-0-1). Brings a calm presence into the rotation." },
    { name:"Bobby Devin",        hcp:0.0, w:2, l:0, h:1, cups:0, appearances:1, bio:"Strong rookie campaign (2-0-1). The Devin brothers are Cup material." },
    { name:"Jared Rizo",         hcp:0.0, w:2, l:2, h:2, cups:1, appearances:2, bio:"Co-founder and two-time Cup captain. A balanced 2-2-2 record reflects a captain who plays when it matters." },
    { name:"Mark Prezioisi",     hcp:0.0, w:2, l:2, h:2, cups:1, appearances:2, bio:"A steady veteran with a balanced 2-2-2 record. The kind of player who closes you out on 18." },
    { name:"John Tomlin",        hcp:0.0, w:2, l:2, h:2, cups:1, appearances:2, bio:"Two appearances, a balanced 2-2-2 record, and a foundational locker-room presence." },
    { name:"Jay Stasiak",        hcp:0.0, w:2, l:2, h:2, cups:2, appearances:2, bio:"Two-time champion who plays an even-keeled brand of golf. As likely to halve as to win." },
    { name:"Kevin O'Halloran",   hcp:0.0, w:2, l:3, h:1, cups:1, appearances:2, bio:"Battle-tested over two appearances. Plays best when the team needs a half." },
    { name:"Alex Ray",           hcp:0.0, w:0, l:2, h:1, cups:1, appearances:1, bio:"Cup winner in his debut. Looking to add wins to his record in year two." },
    { name:"Andrew Nazarro",     hcp:0.0, w:0, l:2, h:1, cups:1, appearances:1, bio:"Cup winner with a half on his card. Adds depth to any rotation." },
    { name:"Joe Hock",           hcp:0.0, w:0, l:2, h:1, cups:0, appearances:1, bio:"Looking to find his first Cup win in his sophomore year." },
    { name:"Kevin Lawton",       hcp:0.0, w:0, l:2, h:1, cups:0, appearances:1, bio:"A half on his card from his debut. Building toward his first win." },
    { name:"Big Bob Lawton",     hcp:0.0, w:0, l:2, h:1, cups:0, appearances:1, bio:"Strong Cup debut despite the losses. The Lawton family flag-bearer." },
    { name:"Lou",                hcp:0.0, w:1, l:5, h:0, cups:0, appearances:2, bio:"A grinder. Has lost more than he's won but is never out of a match." },
    { name:"Zack Fries",         hcp:0.0, w:0, l:3, h:0, cups:0, appearances:1, bio:"Looking for his first Cup win after a tough rookie debut." },
    { name:"Mike Rizzo",         hcp:0.0, w:0, l:3, h:0, cups:1, appearances:1, bio:"Cup winner in year one. Looking to translate that into wins on the card." },
    { name:"Matt Gardner",       hcp:0.0, w:0, l:4, h:2, cups:0, appearances:2, bio:"Has yet to lift the Cup but his halves keep him in every match." },
    { name:"Bobby Lawton",       hcp:0.0, w:0, l:5, h:1, cups:0, appearances:2, bio:"The Lawton family's most experienced player. Still hunting his first Cup win." },
    // ── Rookies ───────────────────────────────────────────────────
    { name:"Pat Ellis",          hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Joe Bina",           hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Cade Buckley",       hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Marc Stokes",        hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Brian Skelly",       hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Adam Boari",         hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Shane Fries",        hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Steve Wakelin",      hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"Lebbo",              hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"David Fasano",       hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
    { name:"David Judge",        hcp:0.0, w:0, l:0, h:0, cups:0, appearances:0, bio:"Making his BRBC debut in 2026." },
  ],

  hall_of_champions: [
    { year: 2025, edition: "II", winner: "Rizo", score: "16 – 8",
      photo: "assets/champ-2025.jpg",
      roster: ["Jared Rizo","Keane Costa","Cam Hooper","Tim Flynn","Billy Gardner","Andrew Dion","Nick Radcliffe","Kevin Hock","Jeff Demers","John Tomlin","Chris Flaherty","Andrew Nazarro","Mike Rizzo","Lic","Reed Pike","Jay Stasiak"] },
    { year: 2024, edition: "I", winner: "Brooks", score: "18.5 – 5.5",
      photo: "assets/champ-2024.jpg",
      roster: ["Sean Brooks","Mike Preziosi","Jake Harris","Mark Prezioisi","Kevin O'Halloran","Sean Williamson","Jack Wilson","Kyle Devin","Lic","Reed Pike","Jay Stasiak","Cam Hooper","Tim Flynn","Lou","Bobby Lawton","Joe Hock"] },
  ],
};
