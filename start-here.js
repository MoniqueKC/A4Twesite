// Start here — four taps → one Kaizen tool. Rung one of the ladder.
// Rule (Monique): 5S first almost always, because Sort is the one thing they can do with the least teaching.
// The eight wastes second. Steer elsewhere only on a clear match.
(function(){
const TOOLS={
 s5:{name:'5S',page:5,img:'img/tool-5s.png',sub:'Tool 1 · start here',
  why:'Start with the <b>Sort</b> step. Not the whole of 5S, not the whole business. One place, one afternoon: keep, move, bin. It is the one thing every tradie can do without being taught, and by Monday the result is visible. That matters, because seeing a change is what makes the next one believable.',
  where:{hunt:'Your answer says you hunt for things. Sort the ute or the container first. Every fitting you no longer hunt for is a waste gone.',night:'Sort the paperwork spot first. One tray, one folder, one day a week it gets emptied. The night shift shortens on its own.',soft:'Sort the job software: close finished jobs, delete the cost codes nobody uses. It cannot report on a mess.',phone:'Sort where job information lands: one place, not three. Photos and texts included.',head:'Sort what is in your head onto one page. Jobs, money, people, the ute. Then decide what needs a home.',default:'Pick the place that annoys you most when you open it. That is the one.'},
  twoweeks:['Pick one place: ute, container, yard, the paperwork corner, or the job software','Everything out. Three piles: keep, move somewhere better, bin','Put back only what you use weekly. The rest goes somewhere that makes sense','Take a photo. Show the crew. Ask them what else needs the same treatment'],
  prompt:(a)=>`I run a small trade business (${a.size} of us). I want to 5S my ${a.place}. What is bugging me: ${a.bugs}. Take me through Sort only, for now, in five steps I can do in one afternoon. Keep it short and practical. Then ask me what I found while sorting, because that is where the wastes show up.`},
 wastes:{name:'The eight wastes',page:6,img:'img/tool-wastes.png',sub:'Tool 2',
  why:'You have already sorted something, or the way you answered says you can already see the leaks. So go to the wastes: eight names for the ways time and money get out of a job. <b>Once a waste has a name, it starts to frustrate you, and that frustration tells you exactly where to look next.</b>',
  where:{me:'You ticked "everything routes through me". That is <b>waiting</b> and <b>skills unused</b>, and the bottleneck is you. Circle it.',hours:'Hours nobody invoiced are usually <b>motion</b>, <b>transport</b> and <b>waiting</b>. Walk one job and count the trips.',fires:'Putting out fires all week is <b>defects</b> and <b>waiting</b> feeding each other. Name them on last week.',default:'Walk through one finished job with whoever was on it and tick the eight. Most crews find three in ten minutes.'},
  twoweeks:['Take one job you have just finished, still fresh','Go through the eight wastes with whoever was on it: transport, inventory, motion, waiting, over-production, over-processing, defects, skills unused','Circle the biggest one. That is your bottleneck','Ask why, five times, about the circled one. Stop when you reach a cause you can change'],
  prompt:(a)=>`Here are the eight wastes: transport, inventory, motion, waiting, over-production, over-processing, defects, skills unused. I run a small trade business (${a.size} of us) and what is bugging me is: ${a.bugs}. Ask me about one job I have just finished, one question at a time, and help me name which wastes were in it. Then tell me which one is my bottleneck and why.`},
 whys:{name:'The five whys',page:7,img:'img/tool-whys.png',sub:'Tool 3',
  why:'You ticked callbacks or the same thing going wrong twice. That is a symptom with a cause underneath it, and the cause is almost never the tradesperson. <b>Ask why five times</b> and you land on a handover, a bin with two sizes in it, or a step nobody wrote down.',
  where:{default:'Take the last callback. Not the person, the event. Why did it happen? And why did that happen? Keep going.'},
  twoweeks:['Pick the last callback or the last thing that went wrong twice','Write the problem in one line. No names','Ask why. Write the answer. Ask why about the answer. Five times','When you reach something you can change, change it. Then tell the crew what you found'],
  prompt:(a)=>`Something keeps going wrong in my small trade business (${a.size} of us): ${a.bugs}. Walk me through the five whys, one question at a time. After each of my answers, ask the next why. When we reach a cause I can actually change, tell me the smallest fix and how to check it worked.`},
 back:{name:'Back-costing',page:6,img:'img/tool-wastes.png',sub:'Tool 2, applied to money',
  why:'You said you do not know what the last job made. That is the most expensive thing not to know in a trade business. Back-costing is reading one finished job backwards: <b>what it cost, what it earned, where the margin went.</b> The first time you will only have actual against actual. Do it anyway. It shows you the shape.',
  where:{default:'One job. Labour, materials, subbies, the extra trips, against what was invoiced. One line each.'},
  twoweeks:['Pick one finished, invoiced job','Pull the costs: labour by person, materials, subbies, disbursements','Put them against what was invoiced, one line each','Write down two things worth your time. Then set the next job up so you can do this against the quote'],
  prompt:(a)=>`I run a small trade business (${a.size} of us). I want to back-cost one finished job. Here is what I have: [paste the invoice total and the costs you know]. Build me a simple table: labour, materials and subbies, other, each with cost, invoiced and margin. Then tell me two things worth my time, in plain words, and what I should set up before the next job so I can do this against the quote.`}
};
const BUG={hunt:'hunting for gear and paperwork',hours:'hours nobody invoiced',callback:'callbacks and things going wrong twice',me:'everything routes through me',night:'bills and paperwork at night',made:'not knowing what the last job made',fires:'putting out fires all week',staff:'staff all doing it differently'};
const SIZE={1:'just me',2:'two or three',4:'four to ten',10:'more than ten'};
const PLACE={head:'head and the whiteboard',phone:'phone, texts and photos',soft:'job software that we only half use',softok:'job software'};

function pick(a){
 const b=a.bugs;
 // steer only on a clear single match; otherwise the ladder: 5S, then wastes
 if(b.length===1&&b[0]==='callback')return 'whys';
 if(b.length===1&&b[0]==='made')return 'back';
 if(b.includes('me')&&!b.includes('hunt')&&!b.includes('night')&&a.place==='softok')return 'wastes';
 if(a.place==='softok'&&!b.includes('hunt')&&!b.includes('night'))return 'wastes';
 return 's5';
}
function placeFor(a){
 if(a.bugs.includes('hunt'))return 'ute or container';
 if(a.bugs.includes('night'))return 'paperwork corner';
 if(a.place==='soft')return 'job software';
 if(a.place==='phone')return 'phone and photos, so job information lands in one place';
 if(a.place==='head')return 'whiteboard and the list in my head';
 return 'ute';
}
function whereKey(t,a){
 if(t==='s5'){for(const k of ['hunt','night'])if(a.bugs.includes(k))return k;if(a.place==='soft')return 'soft';if(a.place==='phone')return 'phone';if(a.place==='head')return 'head';return 'default'}
 if(t==='wastes'){for(const k of ['me','hours','fires'])if(a.bugs.includes(k))return k;return 'default'}
 return 'default';
}
function staffNote(a){
 if(a.staff==='yes')return '<div class="staff"><h3>You already know who thinks this way.</h3><p>That person is your first Kaizen tradie. Do the two weeks with them, not alone. Owners who can name that person usually already run a process business without realising it. The ones who cannot are still in survival mode, and that is fine, this is how you get out.</p></div>';
 if(a.staff==='maybe')return '<div class="staff"><h3>"Maybe one" is a yes.</h3><p>Show them what you sorted and ask what else needs it. Watch who answers. In a few weeks you will know who is excited by process and who is not. Both are useful to know.</p></div>';
 if(a.staff==='no')return '<div class="staff"><h3>Nobody brings you problems yet.</h3><p>That usually means they have learnt not to. Do the two weeks visibly and ask the crew what else needs the same treatment. The first person who answers is the one to watch.</p></div>';
 return '<div class="staff"><h3>Just you, for now.</h3><p>Good. The owner leads, it does not work the other way round. Get the habit yourself first, and the day you hire, you will hire someone who fits the way you work.</p></div>';
}

const a={bugs:[],size:null,place:null,staff:null};
const card=document.getElementById('card'),next=document.getElementById('next'),back=document.getElementById('back'),res=document.getElementById('res'),qfoot=document.getElementById('qfoot');
let step=1;
function steps(){return [...card.querySelectorAll('.step')]}
function show(n){step=n;steps().forEach(s=>s.hidden=+s.dataset.step!==n);back.hidden=n===1;next.textContent=n===4?'Show me the tool →':'Next →';check();}
function check(){const s=steps()[step-1];next.disabled=!s.querySelector('.opt.sel')}
card.addEventListener('click',e=>{const o=e.target.closest('.opt');if(!o)return;const g=o.parentElement;if(g.dataset.multi){o.classList.toggle('sel')}else{g.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));o.classList.add('sel')}check();});
back.addEventListener('click',()=>show(step-1));
next.addEventListener('click',()=>{
 const s=steps()[step-1];const sel=[...s.querySelectorAll('.opt.sel')].map(x=>x.dataset.v);
 if(step===1)a.bugs=sel;if(step===2)a.size=sel[0];if(step===3)a.place=sel[0];if(step===4)a.staff=sel[0];
 if(step<4){show(step+1);return}
 render();
});
function render(){
 const key=pick(a),t=TOOLS[key];
 const ctx={size:SIZE[a.size],place:placeFor(a),bugs:a.bugs.map(b=>BUG[b]).join(', ')||'nothing in particular yet'};
 const prompt=t.prompt(ctx);
 steps().forEach(s=>s.hidden=true);qfoot.hidden=true;
 res.innerHTML=`<div class="pbrand"><img src="img/logo.png" alt="Admin for Tradies"><span>Exploring Tradie · Start here · your first rung · admin4tradies.co.nz/exploring-tradie</span></div><div class="rtop"><div><div class="rk">Your first rung · ${t.sub}</div><div class="rt">${t.name}</div><p class="rw">${t.why}</p></div><img src="${t.img}" alt="${t.name}"></div>
 <div class="rgrid"><div class="rb"><h3>Where to point it</h3><p>${t.where[whereKey(key,a)]||t.where.default}</p></div><div class="rb"><h3>The next two weeks</h3><ul>${t.twoweeks.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
 <div class="aibox"><b>Take this to your AI</b><p>Written from your answers. Paste it into ChatGPT, Claude or Copilot and let it walk you through.</p><pre id="pr">${prompt}</pre><div class="row"><button class="btn bx" id="cp">Copy the prompt</button><a class="btn bs" style="padding:11px 18px;font-size:14.5px" href="handouts/kaizen-tools.html">Page ${t.page} of the Kaizen Tradie book →</a></div><p class="ponly" style="display:none;margin:8px 0 0;font-size:10.5pt">Book: admin4tradies.co.nz/handouts/kaizen-tools · page ${t.page}</p></div>
 ${staffNote(a)}
 <p class="honest"><b>What this is not.</b> Not a diagnosis, not a plan, not a score. One tool, two weeks, then look again. You are not fixing the business, you are learning to see it. That is rung one, and most tradies never get there. <a href="exploring-tradie.html">If you want to work through it with someone, that is what Exploring Tradie is.</a></p>
 <div class="rfoot"><button class="btn bd" id="prt">Print or save as PDF</button><a class="btn bp" href="contact.html">Talk to Monique</a><button class="again" id="again">Start again</button></div>`;
 res.classList.add('show');
 document.getElementById('prt').addEventListener('click',()=>window.print());
 document.getElementById('cp').addEventListener('click',function(){navigator.clipboard.writeText(prompt).then(()=>{this.textContent='Copied';setTimeout(()=>this.textContent='Copy the prompt',1600)})});
 document.getElementById('again').addEventListener('click',()=>{a.bugs=[];a.size=a.place=a.staff=null;card.querySelectorAll('.opt.sel').forEach(x=>x.classList.remove('sel'));res.classList.remove('show');res.innerHTML='';qfoot.hidden=false;show(1);window.scrollTo({top:0,behavior:'smooth'})});
 card.scrollIntoView&&window.scrollTo({top:card.getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'});
}
show(1);
})();
