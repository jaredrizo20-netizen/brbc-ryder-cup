// ── BRBC TOURNAMENT DATA ──

const BRBC_HOLES = [
  {n:1,  par:4, dist:335},
  {n:2,  par:4, dist:335},
  {n:3,  par:3, dist:171},
  {n:4,  par:4, dist:302},
  {n:5,  par:3, dist:165},
  {n:6,  par:5, dist:494},
  {n:7,  par:4, dist:383},
  {n:8,  par:5, dist:500},
  {n:9,  par:4, dist:364},
  {n:10, par:5, dist:481},
  {n:11, par:4, dist:408},
  {n:12, par:3, dist:172},
  {n:13, par:5, dist:465},
  {n:14, par:4, dist:411},
  {n:15, par:4, dist:391},
  {n:16, par:3, dist:174},
  {n:17, par:4, dist:347},
  {n:18, par:4, dist:314},
];

window.BRBC_DATA = {
  edition: "III",
  year: 2026,
  venue: "Braintree Municipal Golf Course",
  dates: "October 24, 2026",
  weather: { temp: 65, cond: "Clear", wind: "5 mph NW" },

  // 10 matches × 3 pts each = 30 pts total; 15.5 to win
  matches: [
    { id:"m1",  time:"8:30 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m2",  time:"8:40 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m3",  time:"8:50 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m4",  time:"9:00 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m5",  time:"9:10 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m6",  time:"9:20 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m7",  time:"9:30 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m8",  time:"9:40 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m9",  time:"9:50 AM",  tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
    { id:"m10", time:"10:00 AM", tee:1, thru:0, status:"upcoming", holes:BRBC_HOLES, rizo:{players:["TBD","TBD"],score:0}, brooks:{players:["TBD","TBD"],score:0}, lead:null, lead_amt:0 },
  ],

  team_rizo: {
    name: "Rizo",
    captain: "Jared Rizo",
    color: "navy",
    score: 0,
    projected: 0,
    record: { wins: 1, losses: 1 },
    roster: [
      // Captain (unranked)
      { name:"Jared Rizo",       hcp:12.2,  w:2, l:2, h:2, cups:1, appearances:2, bio:"Co-founder and two-time Cup captain. A balanced 2-2-2 record reflects a captain who plays when it matters." },
      // Draft picks — rank order
      { name:"Cade Buckley",     rank:1,  hcp:3.0,   w:0, l:0, h:0, cups:0, appearances:0, bio:"Coming off his first BRBC appearance with a title, Cade looks to complete the BRBC Slam winning both titles in his first season. With that comes lots of pressure to perform as the top of the rankings list." },
      { name:"Joe Hock",         rank:3,  hcp:6.2,   w:0, l:2, h:1, cups:0, appearances:1, bio:"Joe has had a turbulent year on the course after his first born last winter. Joe goes as far as his driver will take him, when it's on he'll be hard to beat. If it's off he may be throwing his opponents (or his teammates) golf ball in the water by 15." },
      { name:"Zack Fries",       rank:5,  hcp:5.6,   w:0, l:3, h:0, cups:0, appearances:1, bio:"Zack is coming back in after a year away. Looking to improve upon his 0-3 career record, his golf game has never been stronger but match play at an away course can give even the best players fits." },
      { name:"Sean Williamson",  rank:7,  hcp:7.0,   w:2, l:0, h:1, cups:1, appearances:1, bio:"Undefeated in BRBC Ryder Cup play, Willy will be looking to continue that streak this Fall. He's the type of player that can make it look so easy. Drinking beers that is. Otherwise his game is all around solid and will be a great fit on any roster." },
      { name:"David Fasano",     rank:9,  hcp:10.7,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Fuzz is making his Ryder Cup debut this fall as someone that has always excelled in the team game. A guy that can hit every single shot, the question is how does the atmosphere and the beverages effect him throughout a long day." },
      { name:"Cam Hooper",       rank:11, hcp:13.0,  w:4, l:0, h:2, cups:2, appearances:2, bio:"With a 4-0-2 record across 2 Ryder Cups you can argue only Costa has been more successful in this format. We know he has emotion, he's competitive, he can sling them back, he can hit golf shots. He's pulled everything together the last 2 years, and I'd expect more of the same this year." },
      { name:"Joe Bina",         rank:13, hcp:10.2,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Joe Bags — for as many BRBCs as he has played in, this will be his first appearance in the Ryder Cup. His game has trended positively this summer after the new irons earlier this spring. Like a lot of us though, he lives and dies on how the driver is going that day." },
      { name:"Alex Ray",         rank:15, hcp:12.2,  w:0, l:2, h:1, cups:1, appearances:1, bio:"Ray is back for the second year in a row, another guy that's smack in the middle of this field where the margins are so small. If I know one thing about the EC boys, they have the energy and will to win." },
      { name:"Andrew Dion",      rank:17, hcp:16.2,  w:3, l:0, h:0, cups:1, appearances:1, bio:"Diesel is coming back after taking last fall off with a perfect 3-0 record. His handicap has certainly risen over the last 12 months, but should feel confident that when he steps back in the ring he can make an impact." },
      { name:"Mark Prezioisi",   rank:19, hcp:null,  w:2, l:2, h:2, cups:1, appearances:2, bio:"The better of the Preziosi brothers — after a really tough last few weeks watching Florida football — has to be ready to take some anger out on someone or something. A decorated BRBC champion with the Spring Classic, but has to want more from himself coming into Year 3 of the Ryder Cup." },
      { name:"Jay Stasiak",      rank:21, hcp:15.5,  w:2, l:2, h:2, cups:2, appearances:2, bio:"Just got engaged — congrats, your golf will start to suffer. He is a solid putter and already has a BRBC Ryder Cup win under his belt." },
      { name:"Lebbo",            rank:23, hcp:null,  w:0, l:0, h:0, cups:0, appearances:0, bio:"It's great to have another fellow lefty back in the field this Fall. Making his debut in the Ryder Cup and his first time back in the BRBC in about 2 years. Another very capable golfer across the board, with a winning pedigree on the Spring Classic side. Excited to see how he will produce in match play." },
      { name:"Tim Flynn",        rank:25, hcp:18.6,  w:4, l:2, h:0, cups:2, appearances:2, bio:"2-0 in Ryder Cups. The deaf mamba is the heart of every team he plays for — he will make sure that his team is ready to go come 10/24. Certainly isn't the best player here but in match play the little things add up to big results." },
      { name:"David Judge",      rank:27, hcp:null,  w:0, l:0, h:0, cups:0, appearances:0, bio:"DJ is making his BRBC debut, part of the Granite corporate crew. That tells you he's disciplined. Jokes aside, Dave is a solid player — he isn't going to be your superstar but he is more than capable of every single shot needed to get around this golf course and compete." },
      { name:"Lou",              rank:29, hcp:null,  w:1, l:5, h:0, cups:0, appearances:2, bio:"Lou coming in with a 1-5 record may be the most surprising record of anyone in this tournament. I'd expect better for someone that can get around the course as well as him. Likely it is because he is everyone's best friend and makes friends with his opponents." },
      { name:"Shane Fries",      rank:31, hcp:null,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Shane (Zack's brother) will be making his debut. He's another guy in that 15-17 handicap range that can make or break a team. He can hit the ball a mile, and is one of the younger players in the tournament. Expect him to bring a ton of drinking and ability to this tournament." },
      { name:"John Tomlin",      rank:33, hcp:null,  w:2, l:2, h:2, cups:1, appearances:2, bio:"Match-play BRBC is made for guys like JT. Someone you want on your team. Is he the best player here? No. But he wants it as much as anyone. If he's keeping the ball between the uprights he can hit it a mile." },
      { name:"Billy Gardner",    rank:35, hcp:24.7,  w:3, l:2, h:1, cups:1, appearances:2, bio:"BG is always a value player due to his level of putting. He putts closer to an 8 handicap than a 24, however the rest of his game has question marks. But with that being said — any given Saturday." },
      { name:"Mike Rizzo",       rank:37, hcp:null,  w:0, l:6, h:0, cups:1, appearances:2, bio:"Mike has had a bit of an unfair and tough go. Last year him and Andrew were thrown to the wolves. I know that he expects more of himself this go around." },
    ],
  },

  team_brooks: {
    name: "Brooks",
    captain: "Sean Brooks",
    color: "crimson",
    score: 0,
    projected: 0,
    record: { wins: 1, losses: 1 },
    roster: [
      // Captain (unranked)
      { name:"Sean Brooks",      hcp:3.5,   w:3, l:3, h:0, cups:1, appearances:2, bio:"Co-founder of the BRBC and a reliable match play presence with 3 wins on his card. Two-time Cup captain looking to reclaim the trophy." },
      // Draft picks — rank order
      { name:"Kyle Devin",       rank:2,  hcp:4.6,   w:3, l:0, h:0, cups:1, appearances:1, bio:"It's not Kyle's first tournament, but it is Fat Kyle's first tournament. He's taken a few steps back this season but when he is on is still the best player in this tournament. Elite upside, and the most course knowledge of anyone in the field." },
      { name:"Keane Costa",      rank:4,  hcp:8.0,   w:6, l:0, h:0, cups:1, appearances:2, bio:"6-0-0. He's the best match play player in our short history. He really is a strong player across the board. He pounds driver, hits irons and wedges well, and can putt. Putting him with another player that limits mistakes will have him in the driver's seat to extend the streak." },
      { name:"Jack Wilson",      rank:6,  hcp:9.3,   w:2, l:1, h:0, cups:1, appearances:1, bio:"Jack is what some people call Sean's achilles heel. One of the only people that can handle him. Expect Jack's temperament to handle the ups and downs of any match in the BRBC." },
      { name:"Bobby Devin",      rank:8,  hcp:10.2,  w:2, l:0, h:1, cups:0, appearances:1, bio:"While Kyle has gotten fat, Bobby has remained steady. He joins Demers as the second member of the BRBC to make a hole-in-one on a Par 4 (No. 4 at Braintree) earlier this summer. Kid can mash the golf ball and will be a factor in the outcome of this tournament." },
      { name:"Steve Wakelin",    rank:10, hcp:11.3,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Wake is making his Ryder Cup debut after having his second child. He is the team captain of team nice guy, and is all around a solid player." },
      { name:"Jeff Demers",      rank:12, hcp:8.9,   w:3, l:3, h:0, cups:1, appearances:2, bio:"Demers always flies under the radar, but is a guy that when paired the right way can make a difference in a match. At an even 3-3 record and 1 Ryder Cup victory, him and his long drives will be looking to get above .500 this fall." },
      { name:"Matt Gardner",     rank:14, hcp:10.5,  w:0, l:4, h:2, cups:0, appearances:2, bio:"Matty G has to be coming into this tournament with a chip on his shoulder. The 0-4-2 record is not indicative of the player he is and the intensity he brings to a team. As we know these matches are decided by the slimmest of margins, and I'd be stunned if they don't fall his way this fall." },
      { name:"Marc Stokes",      rank:16, hcp:10.8,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Stokes is one of the most unique guys out there. Made his first appearance in the BRBC this Spring. Helped his team get to the final playoff, and kept his shirt on the whole time. Beer intake could be a factor in the 2-man format." },
      { name:"Kevin Lawton",     rank:18, hcp:13.1,  w:0, l:2, h:1, cups:0, appearances:1, bio:"I'm delighted to report that Kevin has never won a match in his Ryder Cup History. All kidding aside, Kevin's handicap has basically stayed the same for the last 3 years. We know he's going to get wrecked, we know he can hit the golf ball — it's a question of how long he can do it for. Can he find that drunken sweet spot to get himself into the winners column?" },
      { name:"Bobby Lawton",     rank:20, hcp:11.5,  w:0, l:5, h:1, cups:0, appearances:2, bio:"Multiple time champion. Solid all around player. Just off a recent breakup (maybe it fuels his play?), and one of his exes is the sports betting rocket you see all over TV. He will be a solid teammate if he can keep the Bud Lights out of his ass." },
      { name:"Brian Skelly",     rank:22, hcp:null,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Skelly made his first appearance back in the spring. He was a solid addition, and his team came runner up. He can sling Coors with the best of them. A great guy and teammate." },
      { name:"Kevin O'Halloran", rank:24, hcp:null,  w:2, l:3, h:1, cups:0, appearances:2, bio:"At this point everyone (kind of) knows what you are getting with Kevin. Erratic, long hitter, probably 3 different drivers in the bag and some of the best shots of the day. In between it all is a whole lot of question marks, and that is why he has a damn near .500 record across 2 appearances." },
      { name:"Adam Boari",       rank:26, hcp:13.0,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Adam is making his second BRBC appearance. A fellow lefty, and a guy who will grind for his squad." },
      { name:"Pat Ellis",        rank:28, hcp:null,  w:0, l:0, h:0, cups:0, appearances:0, bio:"Patsy Par 3's — one of the OGs of the BRBC — is making his Ryder Cup debut. He's always been one of if not the most competitive people in this entire group, BUT he also doesn't get out much. Can he keep it together for 18 holes to produce a few points for his team? Time shall tell." },
      { name:"Nick Radcliffe",   rank:30, hcp:12.9,  w:3, l:0, h:0, cups:1, appearances:1, bio:"I had to double check the handicaps when I saw Rad at a 12.9 — talk about a glow-up! We all know about Rad's athletic ability but what you are going to get the morning of the tournament really is a mystery. How drunk / hungover will he be, will he sleep through his alarm, will he ride a zamboni to the course. No one knows." },
      { name:"Andrew Nazarro",   rank:32, hcp:null,  w:0, l:3, h:0, cups:1, appearances:1, bio:"You can't mention the BRBC and not have a funny Naz story. A pioneer of the tournament — it's his Super Bowl. He has moments where he can play up to the mid-level of this tournament and others where he's just about bottom. Some coaching and some liquid luck can swing this one way or the other." },
      { name:"Mike Preziosi",    rank:34, hcp:null,  w:4, l:2, h:0, cups:1, appearances:2, bio:"Mikey P will always punch above his weight class. The Preziosi boys always bring it in the BRBC no matter where they are ranked. In match play — Texas Wedge, 150-yard Hybrids and 175-yard drivers just play. Minimizing mistakes and making your opponents beat themselves is his game." },
      { name:"Big Bob Lawton",   rank:36, hcp:22.6,  w:0, l:2, h:1, cups:0, appearances:1, bio:"Big Bob is searching for his first Ryder Cup win. Couple of runner-up finishes in the 4-man — he might be due. One of the best scramble putters in the field." },
      { name:"Nick Ciuffo",      rank:38, hcp:null,  w:3, l:0, h:0, cups:0, appearances:1, bio:"Second BRBC appearance and won his first Ryder Cup match. He may be law enforcement, but you might see him in the woods with a cart girl. Day-off Ciuffo will be ready to have a day." },
    ],
  },

  // Draft complete — all players assigned to teams above
  undrafted: [],

  hall_of_champions: [
    { year: 2025, edition: "II", winner: "Rizo", score: "16 – 8",
      photo: "assets/champ-2025.jpg",
      roster: ["Jared Rizo","Keane Costa","Cam Hooper","Tim Flynn","Billy Gardner","Andrew Dion","Nick Radcliffe","Kevin Hock","Jeff Demers","John Tomlin","Chris Flaherty","Andrew Nazarro","Mike Rizzo","Lic","Reed Pike","Jay Stasiak"] },
    { year: 2024, edition: "I", winner: "Brooks", score: "18.5 – 5.5",
      photo: "assets/champ-2024.jpg",
      roster: ["Sean Brooks","Mike Preziosi","Jake Harris","Mark Prezioisi","Kevin O'Halloran","Sean Williamson","Jack Wilson","Kyle Devin","Lic","Reed Pike","Jay Stasiak","Cam Hooper","Tim Flynn","Lou","Bobby Lawton","Joe Hock"] },
  ],
};
