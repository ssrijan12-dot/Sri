/* ============================================================
   gallery.js — chapter-level interactions:
   envelope open, storm rain, birthday confetti, Holi colour burst,
   and tapping the wisteria tree to read the final letter.
   ============================================================ */

function initEnvelope(){
  const envelope = document.getElementById('envelope');
  if(envelope){
    envelope.addEventListener('click', () => envelope.classList.toggle('open'));
  }
}

function initStorm(){
  const field = document.getElementById('storm-field');
  if(!field) return;
  for(let i=0;i<40;i++){
    const r = document.createElement('div');
    r.className = 'raindrop';
    r.style.left = (Math.random()*100)+'%';
    r.style.animationDuration = (0.6 + Math.random()*0.6)+'s';
    r.style.animationDelay = (Math.random()*-2)+'s';
    r.style.opacity = 0.3 + Math.random()*0.5;
    field.appendChild(r);
  }
}

function spawnConfettiBurst(field, count){
  const colors = ['#e9c07f','#f0c9c2','#a389c9','#9db98f','#faf3ea'];
  for(let i=0;i<count;i++){
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = (Math.random()*100)+'%';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDuration = (2.5 + Math.random()*2)+'s';
    c.style.animationDelay = (Math.random()*1.5)+'s';
    field.appendChild(c);
  }
}

function initBirthdayConfetti(){
  const field = document.getElementById('confetti-field');
  if(!field) return;
  let fired = false;
  const section = document.getElementById('ch-birthday');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !fired){
        fired = true;
        spawnConfettiBurst(field, 50);
      }
    });
  }, { threshold:.5 });
  if(section) io.observe(section);
}

function spawnHoliBurst(field, count){
  const colors = ['#e9c07f','#f0c9c2','#a389c9','#9db98f','#e77b7b','#7bc7e7'];
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'holi-particle';
    const size = 6 + Math.random()*14;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = (30 + Math.random()*40)+'%';
    p.style.top = (30 + Math.random()*40)+'%';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.setProperty('--dx', (Math.random()*240-120)+'px');
    p.style.setProperty('--dy', (Math.random()*240-120)+'px');
    p.style.animationDelay = (Math.random()*0.6)+'s';
    field.appendChild(p);
  }
}

function initHoliBurst(){
  const field = document.getElementById('holi-field');
  if(!field) return;
  let fired = false;
  const section = document.getElementById('ch-holi');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !fired){
        fired = true;
        spawnHoliBurst(field, 36);
        setTimeout(() => spawnHoliBurst(field, 24), 900);
      }
    });
  }, { threshold:.5 });
  if(section) io.observe(section);
}

/* ---------- The wisteria tree: tap to read the final letter ---------- */
function initFinaleTree(){
  const tree = document.getElementById('tree-wrap');
  const modal = document.getElementById('final-letter-modal');
  const closeBtn = document.getElementById('final-letter-close');
  const petal = document.getElementById('landed-petal');
  const finale = document.getElementById('finale');
  if(!tree || !modal) return;

  let opened = false;
  tree.addEventListener('click', () => {
    if(opened) return;
    opened = true;
    modal.classList.add('show');
    if(window.Music) Music.switchToFinale();
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    // camera pulls back, the tree finishes glowing, petal lands, firefly appears
    finale.classList.add('pulled-back');
    setTimeout(() => petal.classList.add('show'), 800);
    setTimeout(() => { if(window.revealFinaleFirefly) revealFinaleFirefly(); }, 2200);
  });
}
