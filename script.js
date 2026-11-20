const $=id=>document.getElementById(id);
/* ---------- sound ---------- */
let AC;
function tone(f,d=.12,type='sine',v=.15,at=0){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+at;o.type=type;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.02)}catch(e){}}
const sfx={
 pop:()=>{tone(880,.08);tone(1320,.1,'sine',.12,.06)},
 play:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.2,'triangle',.14,i*.09)),
 ok:()=>[784,988,1319].forEach((f,i)=>tone(f,.15,'sine',.15,i*.08)),
 bad:()=>{tone(300,.18,'sawtooth',.07);tone(220,.25,'sawtooth',.07,.12)},
 tick:()=>tone(1500,.05,'square',.04),
 bell:()=>{tone(1568,.4,'sine',.1);tone(2093,.5,'sine',.07,.05)}
};
/* ---------- drawing helpers ---------- */
const OL='#6b4a43';
function ell(c,x,y,rx,ry,f,s,lw){c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);if(f){c.fillStyle=f;c.fill()}if(s){c.strokeStyle=s;c.lineWidth=lw||2;c.stroke()}}
function rr(c,x,y,w,h,r,f,s){c.beginPath();c.roundRect(x,y,w,h,r);if(f){c.fillStyle=f;c.fill()}if(s){c.strokeStyle=s;c.lineWidth=2;c.stroke()}}
function poly(c,pts,f,s){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(f){c.fillStyle=f;c.fill()}if(s){c.strokeStyle=s;c.lineWidth=2;c.stroke()}}

const FL=[
 {n:'Strawberry',cake:'#ffb3c6',cream:'#fff3f6',top:'straw'},
 {n:'Matcha',cake:'#b9dd9e',cream:'#eef7e1',top:'leaf'},
 {n:'Choco',cake:'#9a6650',cream:'#c99a7c',top:'choc'},
 {n:'Blueberry',cake:'#bfb0f2',cream:'#f1ecff',top:'berry'},
 {n:'Lemon',cake:'#ffe58a',cream:'#fffbe0',top:'lemon'}
];
function drawCake(c,x,y,s,f){
 c.save();c.translate(x,y);c.scale(s,s);
 for(let i=0;i<14;i++){const a=i/14*6.283;ell(c,Math.cos(a)*56,Math.sin(a)*11,5,3,'#fffaf0','#e6cdb8',1)}
 ell(c,0,0,58,12,'#fffaf0','#e6cdb8',2);
 rr(c,-38,-50,76,46,10,f.cake,OL);
 c.fillStyle=f.cream;c.fillRect(-37,-32,74,8);
 for(let i=0;i<7;i++)ell(c,-33+i*11,-5,4.5,4,f.cream,OL,1.5);
 for(let i=0;i<5;i++)ell(c,-30+i*15,-46,8,8,f.cream,OL,1.5);
 ell(c,0,-50,38,11,f.cream,OL);
 for(let i=0;i<8;i++){const a=i/8*6.283;ell(c,Math.cos(a)*30,-50+Math.sin(a)*7,3,3,'#fff','#e6cdb8',1)}
 const t=f.top;
 if(t==='straw'){ell(c,0,-62,10,9,'#ff5c7a',OL);[[-4,-64],[3,-60],[4,-66],[-2,-58]].forEach(p=>ell(c,p[0],p[1],1,1.4,'#fff7c2'));ell(c,0,-71,7,3,'#7ccf7a',OL,1.5)}
 if(t==='leaf'){ell(c,-6,-60,9,4,'#6fb86a',OL,1.5);ell(c,6,-63,9,4,'#8fd081',OL,1.5);for(let i=0;i<9;i++)ell(c,-22+i*5.5,-52+(i%2)*3,1.4,1.4,'#7fbf6a')}
 if(t==='choc'){ell(c,0,-60,12,6,'#6a4032',OL,1.5);ell(c,0,-67,8,5,'#7b4a3a',OL,1.5);poly(c,[[16,-58],[26,-64],[22,-52]],'#6a4032',OL);poly(c,[[-16,-58],[-26,-64],[-22,-52]],'#6a4032',OL)}
 if(t==='berry'){[[-10,-60],[10,-60],[0,-65]].forEach(p=>{ell(c,p[0],p[1],6.5,6.5,'#6b6bd6',OL,1.5);ell(c,p[0]-2,p[1]-2,1.6,1.6,'#fff')});ell(c,0,-73,6,3,'#a6e3b8',OL,1.5)}
 if(t==='lemon'){ell(c,0,-63,11,11,'#ffe14d',OL);ell(c,0,-63,8,8,'#fff6a8');c.strokeStyle='#ffd23a';c.lineWidth=1.5;for(let i=0;i<3;i++){const a=i*1.047;c.beginPath();c.moveTo(Math.cos(a)*8,-63+Math.sin(a)*8);c.lineTo(-Math.cos(a)*8,-63-Math.sin(a)*8);c.stroke()}}
 c.restore();
}
/* chibi character: y = feet */
function chibi(c,x,y,s,o,mood,t){
 c.save();c.translate(x,y);c.scale(s,s);c.translate(0,Math.sin(t*3+x)*1.5);
 const k=o.kind,hr=o.hair,sk=o.skin;
 rr(c,-14,-8,11,8,4,sk);rr(c,3,-8,11,8,4,sk);ell(c,-9,0,8,4,'#7a4b4b');ell(c,9,0,8,4,'#7a4b4b');
 if(o.style==='long')rr(c,-37,-98,74,66,28,hr,OL);
 if(o.style==='twin'){ell(c,-40,-60,11,17,hr,OL);ell(c,40,-60,11,17,hr,OL)}
 if(o.style==='bun')ell(c,0,-104,15,13,hr,OL);
 if(k==='senior'){c.strokeStyle='#a0714f';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(34,-4);c.lineTo(34,-34);c.arc(40,-34,6,Math.PI,0);c.stroke()}
 rr(c,-20,-38,40,34,13,o.outfit,OL);
 if(k==='student'){poly(c,[[-10,-38],[10,-38],[0,-26]],'#fff',OL);ell(c,0,-30,5,3.5,'#ff6b8b',OL,1.5)}
 if(k==='employee'){poly(c,[[-9,-38],[9,-38],[0,-22]],'#fff',OL);poly(c,[[0,-34],[-3,-30],[0,-20],[3,-30]],'#e35d6a',OL)}
 if(k==='senior'){rr(c,-23,-40,46,16,8,'#f3c6e8',OL);[-8,0,8].forEach(a=>ell(c,a,-33,1.8,1.8,'#fff'))}
 if(k==='player'){rr(c,-14,-36,28,32,8,'#fffaf1',OL);ell(c,0,-18,3.5,3.5,'#ff8fb1');
  if(o.gender==='girl'){poly(c,[[0,-37],[-9,-42],[-9,-32]],'#ff8fb1',OL);poly(c,[[0,-37],[9,-42],[9,-32]],'#ff8fb1',OL)}
  else{poly(c,[[0,-37],[-8,-41],[-8,-33]],'#5a7bd6',OL);poly(c,[[0,-37],[8,-41],[8,-33]],'#5a7bd6',OL)}}
 ell(c,-24,-26,6,9,o.outfit,OL);ell(c,24,-26,6,9,o.outfit,OL);ell(c,-25,-17,4.5,4.5,sk,OL,1.5);ell(c,25,-17,4.5,4.5,sk,OL,1.5);
 ell(c,0,-66,34,31,sk,OL);
 c.beginPath();c.ellipse(0,-72,35,28,0,Math.PI,2*Math.PI);
 for(let i=0;i<5;i++)c.quadraticCurveTo(35-70*(i+.5)/5,-52,35-70*(i+1)/5,-72);
 c.fillStyle=hr;c.fill();c.strokeStyle=OL;c.lineWidth=2;c.stroke();
 ell(c,-21,-49,6,3.6,'rgba(255,120,150,.45)');ell(c,21,-49,6,3.6,'rgba(255,120,150,.45)');
 c.strokeStyle='#3b2a2a';c.lineWidth=2.5;c.lineCap='round';
 if(mood==='happy'){[-12,12].forEach(ex=>{c.beginPath();c.arc(ex,-54,5,Math.PI*1.1,Math.PI*1.9);c.stroke()});c.beginPath();c.arc(0,-49,6,0,Math.PI);c.fillStyle='#ff7a8a';c.fill();c.stroke()}
 else{[-12,12].forEach(ex=>{ell(c,ex,-56,4.2,5.5,'#3b2a2a');ell(c,ex-1.5,-58,1.6,1.6,'#fff')});
  c.beginPath();if(mood==='sad'){c.arc(0,-44,5,Math.PI*1.15,Math.PI*1.85);c.stroke();c.lineWidth=2;c.beginPath();c.moveTo(-18,-67);c.lineTo(-7,-64);c.moveTo(18,-67);c.lineTo(7,-64);c.stroke();ell(c,-17,-47,2.4,4,'#8fd3ff')}
  else{c.arc(0,-50,4,.15*Math.PI,.85*Math.PI);c.stroke()}}
 if(k==='employee'||k==='senior'){c.strokeStyle='#8a6a5a';c.lineWidth=2;[-12,12].forEach(ex=>{c.beginPath();c.arc(ex,-56,8,0,7);c.stroke()});c.beginPath();c.moveTo(-4,-56);c.lineTo(4,-56);c.stroke()}
 if(k==='student')ell(c,-22,-84,4,4,'#ffd84d',OL,1.5);
 if(o.gender==='girl'&&k!=='senior'&&k!=='player'){poly(c,[[24,-90],[34,-96],[34,-84]],'#ff8fb1',OL);poly(c,[[24,-90],[14,-96],[14,-84]],'#ff8fb1',OL)}
 if(k==='player'){ell(c,0,-93,23,8,'#fff',OL);ell(c,0,-99,13,8,'#fff',OL);ell(c,6,-106,3.5,3.5,'#ff5c7a',OL,1.5)}
 c.restore();
}
/* ---------- baker creator ---------- */
const SKIN=['#ffe0cc','#f6c9a6','#d9a077'],HAIR=['#5a3a2e','#2b2b3a','#e8a5b5','#f2c46d','#8e7cc3'],HST=['short','bun','twin','long'],HNAME={short:'Short',bun:'Bun',twin:'Pigtails',long:'Long'},OUTF=['#ff9eb5','#9ed8ff','#b7e4a4','#ffd37a','#c9b1ff'];
const P={gender:'girl',skin:0,hair:0,style:2,outfit:0};
const playerObj=()=>({kind:'player',gender:P.gender,skin:SKIN[P.skin],hair:HAIR[P.hair],style:HST[P.style],outfit:OUTF[P.outfit]});
function opts(id,list,key,mk){const el=$(id);el.innerHTML='';list.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='opt'+(P[key]===i?' sel':'');mk(b,v);b.onclick=()=>{P[key]=i;sfx.pop();renderOpts()};el.appendChild(b)})}
function renderOpts(){
 const sw=l=>(b,v)=>{b.style.background=v;b.classList.add('sw');b.setAttribute('aria-label',l)};
 opts('o-skin',SKIN,'skin',sw('Skin tone'));
 opts('o-style',HST,'style',(b,v)=>{b.textContent=HNAME[v]});
 opts('o-hair',HAIR,'hair',sw('Hair color'));
 opts('o-outfit',OUTF,'outfit',sw('Outfit color'));
}
document.querySelectorAll('#o-gender button').forEach(b=>b.onclick=()=>{P.gender=b.dataset.g;P.style=P.gender==='girl'?2:0;document.querySelectorAll('#o-gender button').forEach(x=>x.classList.toggle('sel',x===b));sfx.pop();renderOpts()});
renderOpts();

/* ---------- game ---------- */
const cv=$('cv'),c=cv.getContext('2d');
const TIME={student:15,employee:10,senior:20},LABEL={student:'🎒 Student · 15s',employee:'💼 Employee · 10s',senior:'🌿 Senior · 20s'};
let cur='title',T=0,G=null,best=0;
const go=id=>{cur=id;document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id))};
const pick=a=>a[Math.floor(Math.random()*a.length)];

const tray=$('tray');
FL.forEach((f,i)=>{const b=document.createElement('button');b.className='cakeBtn';b.type='button';b.dataset.i=i;b.setAttribute('aria-label','Serve '+f.n+' cake (key '+(i+1)+')');const cc=document.createElement('canvas');cc.width=96;cc.height=82;drawCake(cc.getContext('2d'),48,70,.72,f);b.appendChild(cc);b.append(f.n);b.onclick=()=>serve(i);tray.appendChild(b)});
document.querySelectorAll('.cakes canvas').forEach((cc,i)=>drawCake(cc.getContext('2d'),55,76,.85,FL[[0,3,1][i]]));
addEventListener('keydown',e=>{if(cur==='game'&&e.key>='1'&&e.key<='5')serve(+e.key-1)});

function makeCust(kind,want){
 const girl=Math.random()<.5;
 const o={kind,gender:girl?'girl':'boy',skin:pick(SKIN),
  hair:kind==='senior'?pick(['#e9e9ef','#cfcfd8']):pick(HAIR),
  style:kind==='senior'?pick(['short','bun']):pick(HST),
  outfit:kind==='student'?'#7fb2ff':kind==='employee'?'#8d93a8':'#d8a6e6'};
 return{kind,o,want:want??Math.floor(Math.random()*FL.length),max:TIME[kind],t:TIME[kind],x:950,state:'enter',mood:'neutral',lt:0,frozen:false,lastTick:0};
}
function spawn(kind,want,frozen){G.cust=makeCust(kind||pick(['student','employee','senior']),want);G.cust.frozen=!!frozen;}
function hud(){$('hLives').textContent='♥'.repeat(Math.max(0,G.lives))+'♡'.repeat(Math.max(0,3-G.lives));$('hScore').textContent=G.score;$('hLevel').textContent=G.level;$('hCombo').textContent=G.combo>1?'Combo ×'+G.combo:''}
function burst(x,y,ch,n=6){for(let i=0;i<n;i++)G.parts.push({x,y,vx:(Math.random()-.5)*160,vy:-60-Math.random()*120,life:1,ch})}
function newGame(tut){
 G={lives:3,score:0,combo:0,level:1,served:0,gap:.8,cust:null,cake:null,parts:[],tut,ts:0,pm:0,run:true};
 hud();go('game');
 $('coach').style.display=tut?'flex':'none';
 if(tut)step(0);else clearHint();
}
function clearHint(){document.querySelectorAll('.cakeBtn').forEach(b=>b.classList.remove('hint'))}
const TUT=[
 {t:"Hi, baker! Welcome to Sweet Nook. Customers walk up to your counter and order a cake. Let’s meet the first one.",btn:"Show me"},
 {t:"A Student arrived! Read the speech bubble: they want a Strawberry cake. Tap the glowing cake below to serve it. (Keys 1–5 work too.)",c:['student',0],freeze:1},
 {t:"Nice! Employees are in a hurry and only wait 10 seconds. Watch the timer bar in their bubble (paused for practice). Serve the Matcha cake.",c:['employee',1],freeze:1},
 {t:"Students wait 15 seconds, Senior Citizens wait 20. This timer is running, so serve the Blueberry cake before it empties!",c:['senior',3],freeze:0},
 {t:"A wrong cake or an empty timer costs a heart. Lose all 3 and the shop closes. Serve fast in a row to build combos. Ready?",btn:"Open the shop"}
];
function say(t){$('coachTxt').textContent=t;const cb=$('coach');cb.classList.remove('shake');void cb.offsetWidth;cb.classList.add('shake')}
function step(i){
 G.ts=i;const s=TUT[i];$('coachTxt').textContent=s.t;$('coachNext').style.display=s.btn?'':'none';$('coachNext').textContent=s.btn||'';
 clearHint();
 if(s.c){spawn(s.c[0],s.c[1],s.freeze);tray.children[s.c[1]].classList.add('hint')}
}
$('coachNext').onclick=()=>{sfx.pop();if(G.ts<TUT.length-1)step(G.ts+1);else newGame(false)};
$('skip').onclick=()=>{sfx.pop();newGame(false)};

function serve(i){
 const q=G&&G.cust;if(cur!=='game'||!q||q.state!=='wait'){return}
 sfx.pop();
 if(i===q.want){
  G.combo++;G.pm=1.2;G.cake={f:FL[i],t:0};q.mood='happy';q.state='leave';q.lt=1;sfx.ok();burst(q.x,260,'💖');burst(q.x,260,'✨',4);
  if(G.tut){clearHint();q.after=()=>step(G.ts+1)}
  else{G.score+=10+Math.ceil(q.t)+(G.combo>1?G.combo*2:0);G.served++;const lv=1+Math.floor(G.served/5);if(lv>G.level){G.level=lv;burst(400,200,'⭐',8)}}
  hud();
 }else if(G.tut){sfx.bad();say("Oops! They asked for "+FL[q.want].n+". Look at the bubble again.")}
 else fail(q,i);
}
function fail(q,i){
 G.lives--;G.combo=0;q.mood='sad';q.state='leave';q.lt=1;sfx.bad();burst(q.x,260,'💔');
 if(i!==undefined)G.cake={f:FL[i],t:0};
 if(G.lives<=0)q.after=end;
 hud();
}
function end(){G.run=false;best=Math.max(best,G.score);$('oScore').textContent=G.score;$('oServed').textContent=G.served;$('oBest').textContent=best;go('over')}

function update(dt){
 G.parts=G.parts.filter(p=>(p.life-=dt)>0);G.parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=200*dt});
 if(G.pm>0)G.pm-=dt;if(G.cake)G.cake.t+=dt;
 const q=G.cust;
 if(!q){if(!G.tut&&G.run){G.gap-=dt;if(G.gap<=0)spawn()}return}
 if(q.state==='enter'){q.x+=(560-q.x)*Math.min(1,dt*5);if(Math.abs(q.x-560)<2){q.x=560;q.state='wait';sfx.bell()}}
 else if(q.state==='wait'&&!q.frozen){
  q.t-=dt;const s=Math.ceil(q.t);if(s<=3&&s>0&&s!==q.lastTick){q.lastTick=s;sfx.tick()}
  if(q.t<=0){if(G.tut){q.t=q.max;say("Time ran out! No worries, I reset it. Try again.")}else fail(q)}
 }else if(q.state==='leave'){q.lt-=dt;if(q.lt<=0)q.x+=dt*700;if(q.x>960){G.cust=null;G.cake=null;G.gap=Math.max(.5,1.6-.12*G.level);if(q.after)q.after()}}
}
function scene(){
 c.fillStyle='#ffe4ec';c.fillRect(0,0,800,460);
 c.fillStyle='#ffd0de';for(let y=20;y<340;y+=44)for(let x=(y/44%2)*22+10;x<800;x+=44)ell(c,x,y+40,5,5,'#ffd0de');
 for(let x=0;x<800;x+=40){c.fillStyle=(x/40)%2?'#fffaf1':'#ff9eb8';c.fillRect(x,0,40,30);ell(c,x+20,30,20,12,c.fillStyle)}
 rr(c,300,50,0,0,0);
 // window & shelf
 rr(c,40,70,130,120,16,'#d6f0ff',OL);c.strokeStyle='#fff';c.lineWidth=4;c.beginPath();c.moveTo(105,74);c.lineTo(105,186);c.moveTo(44,130);c.lineTo(166,130);c.stroke();
 rr(c,640,110,130,10,4,'#c9966b',OL);drawCake(c,675,110,.28,FL[0]);drawCake(c,735,110,.28,FL[3]);
 rr(c,640,170,130,10,4,'#c9966b',OL);drawCake(c,675,170,.28,FL[1]);drawCake(c,735,170,.28,FL[4]);
 // sign
 rr(c,290,44,100,0,0);
}
function counter(){
 rr(c,-10,345,820,130,0,'#fff3dd');c.fillStyle='#ffc2d4';c.fillRect(-10,345,820,24);
 for(let x=0;x<820;x+=24){c.fillStyle='#fff';c.fillRect(x,345,12,24)}
 for(let x=0;x<830;x+=28)ell(c,x,369,14,8,'#ffc2d4');
 c.strokeStyle='#e6cdb8';c.lineWidth=3;c.beginPath();c.moveTo(0,347);c.lineTo(800,347);c.stroke();
 c.fillStyle='#d9a98f';c.font='700 22px Fredoka,"Trebuchet MS",sans-serif';c.textAlign='center';c.fillText('Sweet Nook ♡',400,435);
}
function bubble(q){
 const cx=q.x,f=FL[q.want];
 c.font='600 14px Fredoka,"Trebuchet MS",sans-serif';c.textAlign='center';
 rr(c,cx-62,30,124,22,11,'#fffaf1',OL);c.fillStyle=OL;c.fillText(LABEL[q.kind],cx,46);
 rr(c,cx-112,58,224,120,22,'#fffaf1',OL);poly(c,[[cx-14,176],[cx+14,176],[cx,198]],'#fffaf1');
 c.strokeStyle=OL;c.lineWidth=2;c.beginPath();c.moveTo(cx-14,177);c.lineTo(cx,198);c.lineTo(cx+14,177);c.stroke();c.fillStyle='#fffaf1';c.fillRect(cx-13,174,26,5);
 drawCake(c,cx-62,128,.62,f);
 c.textAlign='left';c.fillStyle=OL;c.font='700 21px Fredoka,"Trebuchet MS",sans-serif';c.fillText(f.n,cx-22,100);c.font='500 16px Fredoka,"Trebuchet MS",sans-serif';c.fillText('cake, please!',cx-22,122);
 const r=Math.max(0,q.t/q.max),w=192;rr(c,cx-96,150,w,12,6,'#eadbd0');
 const col=r>.5?'#7ccf9a':r>.25?'#ffc94d':'#ff6b8b';if(r>0)rr(c,cx-96,150,Math.max(12,w*r),12,6,col);
 c.strokeStyle=OL;c.lineWidth=2;c.beginPath();c.roundRect(cx-96,150,w,12,6);c.stroke();
 if(!q.frozen){c.textAlign='right';c.font='600 13px Fredoka,"Trebuchet MS",sans-serif';c.fillStyle=OL;c.fillText(Math.ceil(q.t)+'s',cx+100,138)}
 c.textAlign='left';
}
function drawGame(){
 scene();
 const q=G.cust;
 if(q)chibi(c,q.x,395,1.6,q.o,q.mood,T);
 chibi(c,130,395,1.6,playerObj(),G.pm>0?'happy':'neutral',T);
 counter();
 if(G.cake){const k=Math.min(1,G.cake.t/.35),e=1-Math.pow(1-k,3);drawCake(c,400+(480-400)*e,470+(375-470)*e-Math.sin(k*3.14)*30,.8,G.cake.f)}
 if(q&&q.state==='wait')bubble(q);
 c.font='24px serif';c.textAlign='center';G.parts.forEach(p=>{c.globalAlpha=Math.max(0,p.life);c.fillText(p.ch,p.x,p.y)});c.globalAlpha=1;
}
function drawPrev(){const p=$('prev').getContext('2d');p.clearRect(0,0,220,250);p.fillStyle='#ffe4ec';p.fillRect(0,0,220,250);ell(p,110,236,60,10,'rgba(0,0,0,.08)');chibi(p,110,225,1.75,playerObj(),'happy',T)}

let last=0;
function loop(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;T+=dt;
 if(cur==='pick')drawPrev();
 if(cur==='game'&&G){if(G.run)update(dt);drawGame()}
 requestAnimationFrame(loop)}
requestAnimationFrame(loop);

$('playBtn').onclick=()=>{sfx.play();go('pick')};
$('startBtn').onclick=()=>{sfx.pop();setTimeout(()=>sfx.bell(),120);newGame(true)};
$('againBtn').onclick=()=>{sfx.pop();newGame(false)};
$('changeBtn').onclick=()=>{sfx.pop();go('pick')};
