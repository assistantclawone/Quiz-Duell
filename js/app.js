// ===== Quiz-Duell App-Logik =====
// Skill-basiertes Wissensspiel. Kein Glücksspiel.

const QUESTIONS_PER_GAME = 10;
const TIME_PER_QUESTION = 20;
const TIMER_MS = TIME_PER_QUESTION * 1000;

// Punkte: Basis + Zeitbonus + Schwierigkeit
function pointsFor(diff, msLeft){
  const base = (diff + 1) * 10;            // 20/30/40
  const timeBonus = Math.round(msLeft / 100); // schnell = mehr
  return base + timeBonus;
}

let state = {
  playerName: '',
  category: null,
  questions: [],
  qIndex: 0,
  p1Score: 0,   // Spieler
  p2Score: 0,   // Gegner (Bot-Sim / zweiter lokaler Spieler)
  mode: 'solp', // solo vs Bot
  timer: null,
  timeLeft: 0,
  answered: false,
  rank: []
};

const $ = (id) => document.getElementById(String(id).replace(/^#/,''));
const screens = ['start','category','game','result'];

// ---- Persistenz ----
function loadRank(){ try{ return JSON.parse(localStorage.getItem('quiz_rank')||'[]'); }catch(e){ return []; } }
function saveRank(r){ localStorage.setItem('quiz_rank', JSON.stringify(r)); }
function loadName(){ return localStorage.getItem('quiz_name')||''; }
function saveName(n){ localStorage.setItem('quiz_name', n); }

function show(name){
  screens.forEach(s=>$('screen-'+s).classList.toggle('active', s===name));
}

function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

// ---- Screen Start ----
function initStart(){
  const n = loadName();
  $('nameInput').value = n || '';
  $('scoreBadge').textContent = 0;
  $('#playerName').textContent = n || 'Gast';
  const rank = loadRank();
  if(rank.length){ const top = rank.slice().sort((a,b)=>b.score-a.score)[0]; $('scoreBadge').textContent = top.score; }
}

function startGame(){
  const name = $('nameInput').value.trim() || 'Spieler';
  saveName(name);
  $('#playerName').textContent = name;
  state.playerName = name;
  renderCategories();
  show('category');
}

function renderCategories(){
  const list = $('categoryList'); list.innerHTML='';
  Object.entries(QUESTION_BANK).forEach(([key,cat])=>{
    const el = document.createElement('div');
    el.className='cat-item';
    el.innerHTML = `<span class="c-emoji">${cat.emoji}</span>${cat.name}<span class="c-opt">${cat.questions.length} Fragen</span>`;
    el.onclick = ()=>selectCategory(key);
    list.appendChild(el);
  });
}

function selectCategory(key){
  state.category = key;
  const cat = QUESTION_BANK[key];
  state.questions = shuffle(cat.questions.map(q=>({...q, a: shuffle(q.a)}))).slice(0, QUESTIONS_PER_GAME);
  state.qIndex = 0;
  state.p1Score = 0;
  state.p2Score = 0;
  $('#p1Name').textContent = state.playerName;
  $('#p2Name').textContent = 'Gegner';
  // Gegner-Fähigkeit (können wir variabel halten)
  state.p2Skill = 0.5;
  show('game');
  nextQuestion();
}

// ---- Game ----
function nextQuestion(){
  if(state.qIndex >= state.questions.length){ return finishGame(); }
  const q = state.questions[state.qIndex];
  state.answered = false;
  $('#qNum').textContent = `Frage ${state.qIndex+1}/${state.questions.length}`;
  $('#qTopic').textContent = QUESTION_BANK[state.category].name;
  $('#questionText').textContent = q.q;
  $('#progressBar').style.width = ((state.qIndex)/state.questions.length*100+10)+'%';
  // Antworten rendern
  const box = $('#answers'); box.innerHTML='';
  q.a.forEach((ans,i)=>{
    const b = document.createElement('button');
    b.className='answer'; b.textContent = ans; b.dataset.i = i;
    b.onclick = ()=>pickAnswer(i, b);
    box.appendChild(b);
  });
  // Timer
  startTimer();
}

function startTimer(){
  clearInterval(state.timer);
  state.timeLeft = TIME_PER_QUESTION;
  $('#timer').textContent = state.timeLeft;
  const start = Date.now();
  state.timer = setInterval(()=>{
    const elapsed = Date.now()-start;
    const left = Math.max(0, TIME_PER_QUESTION - Math.floor(elapsed/1000));
    state.timeLeft = left;
    $('#timer').textContent = left;
    $('#timer').style.color = left<=5 ? 'var(--bad)' : 'var(--warn)';
    if(left<=0){
      clearInterval(state.timer);
      if(!state.answered) resolveAnswer(-1); // Zeit abgelaufen
    }
  }, 200);
}

function pickAnswer(idx, btn){
  if(state.answered) return;
  state.answered = true;
  clearInterval(state.timer);
  const q = state.questions[state.qIndex];
  const msLeft = state.timeLeft*1000;
  // Spieler-Ergebnis
  let correct = (idx === q.c);
  if(correct){ state.p1Score += pointsFor(q.diff, msLeft); }
  // Gegner-Sim (80% Skill, schneller bei einfachen)
  const oppCorrect = Math.random() < (0.55 + q.diff*0.1);
  if(oppCorrect){ state.p2Score += pointsFor(q.diff*1, msLeft*0.5); }
  // Visuelles Feedback
  const answers = $('#answers').children;
  for(let i=0;i<answers.length;i++){
    answers[i].disabled = true;
    if(i===q.c) answers[i].classList.add('correct');
    if(i===idx && !correct) answers[i].classList.add('wrong');
  }
  $('#p1Score').textContent = state.p1Score;
  $('#p2Score').textContent = state.p2Score;
  setTimeout(()=>{ state.qIndex++; nextQuestion(); }, 1200);
}

// Zeit abgelaufen:
function resolveAnswer(idx){
  state.answered = true;
  const q = state.questions[state.qIndex];
  const answers = $('#answers').children;
  for(let i=0;i<answers.length;i++){ answers[i].disabled=true; if(i===q.c) answers[i].classList.add('correct'); }
  // Gegner bekommt Zeitbonus (war schnell)
  const oppCorrect = Math.random()<(0.55+q.diff*0.1);
  if(oppCorrect) state.p2Score += pointsFor(q.diff*1, 600);
  $('#p1Score').textContent = state.p1Score;
  $('#p2Score').textContent = state.p2Score;
  setTimeout(()=>{ state.qIndex++; nextQuestion(); }, 1200);
}

// ---- Result ----
function finishGame(){
  clearInterval(state.timer);
  const p1 = state.p1Score, p2 = state.p2Score;
  let title, text;
  if(p1>p2){ title='🏆 Sieg!'; text=`Du hast ${state.playerName} gewonnen!`; }
  else if(p1===p2){ title='🤝 Unentschieden'; text='Knappes Rennen!'; }
  else { title='📉 Niederlage'; text='Der Gegner war diesmal stärker.'; }
  $('#resultTitle').textContent = title;
  $('#resultScore').textContent = `${p1} : ${p2}`;
  $('#resultText').textContent = text;
  // Statistik
  $('#resultDetail').innerHTML = `
    <div class="line"><span>Richtig gelöst</span><b>${correctCount()} von ${state.questions.length}</b></div>
    <div class="line"><span>Deine Punkte</span><b>${p1}</b></div>
    <div class="line"><span>Gegner</span><b>${p2}</b></div>
  `;
  saveToRank(state.playerName, p1);
  show('result');
}

function correctCount(){
  // vereinfacht: wir zählen P1-Score / im Schnitt
  return Math.round(state.p1Score / 200);
}

function saveToRank(name, score){
  let r = loadRank();
  r.push({name, score, date: Date.now()});
  r = r.sort((a,b)=>b.score-a.score).slice(0,20);
  saveRank(r);
  $('scoreBadge').textContent = r[0].score;
}

// ---- Init ----
// Skripte stehen am Ende von <body> -> DOM ist bereits geparst.
// Zusätzlich auf DOMContentLoaded hören (robust fuer CDP/Headless).
function bindUI(){
  $('#btnStart').onclick = startGame;
  $('#btnChallenge').onclick = ()=>alert('Spieler übernehmen diesen Modus später – schicke einfach deinen Quiz-Link! (MVP)');
  $('#btnReplay').onclick = ()=>selectCategory(state.category);
  $('#btnHome').onclick = ()=>{ initStart(); show('start'); };
  $('#nameInput').addEventListener('keydown', e=>{ if(e.key==='Enter') startGame(); });
  initStart();
  show('start');
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', bindUI);
} else {
  bindUI();
}
