/* ============================================================
   app.js — main entry point. Wires up every module and handles
   scroll-based reveal, the chapter nav, and the day-to-night sky.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ambient layers
  initPetals();
  initFireflies();
  spawnStars(document.getElementById('stars'), 60);
  spawnBlooms(document.getElementById('canopy'), 16);

  // interactions
  initWatch();
  Music.init();
  initTimer();
  initEnvelope();
  initStorm();
  initBirthdayConfetti();
  initHoliBurst();
  initFinaleTree();
  initFinaleFirefly();
  initSecretRoom();

  // whisper line + intro sequencing
  const whisper = document.getElementById('whisper-line');
  setTimeout(() => { if(whisper) whisper.classList.add('show'); }, 5000);

  // scroll reveal for each chapter
  const chapters = document.querySelectorAll('.chapter-inner');
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:.25 });
  chapters.forEach(c => revealIo.observe(c));

  // day -> night sky transition as the story progresses
  const sky = document.getElementById('sky');
  const storyStart = document.getElementById('story');
  const finale = document.getElementById('finale');
  function updateSky(){
    const total = finale.offsetTop + finale.offsetHeight - storyStart.offsetTop;
    const progressed = window.scrollY - storyStart.offsetTop;
    const pct = Math.min(1, Math.max(0, progressed/total));
    const c1 = [27,19,48], c2 = [8,6,18];
    const mix = c1.map((v,i) => Math.round(v + (c2[i]-v)*pct));
    sky.style.background = `linear-gradient(180deg, rgb(${mix[0]},${mix[1]},${mix[2]}), rgb(${Math.round(mix[0]*0.7)},${Math.round(mix[1]*0.6)},${Math.round(mix[2]*1.4+20)}) 60%, #150f22 100%)`;
  }
  window.addEventListener('scroll', updateSky, { passive:true });
  updateSky();

  // chapter side-nav
  const nav = document.getElementById('chapter-nav');
  const navButtons = nav.querySelectorAll('button');
  const sections = Array.from(navButtons).map(b => document.getElementById(b.dataset.target));
  function showNav(){
    if(window.scrollY > window.innerHeight*0.6) nav.classList.add('show');
    else nav.classList.remove('show');
  }
  window.addEventListener('scroll', showNav, { passive:true });
  navButtons.forEach(b => {
    b.addEventListener('click', () => {
      const target = document.getElementById(b.dataset.target);
      if(target) target.scrollIntoView({ behavior:'smooth' });
    });
  });
  const navIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const btn = nav.querySelector(`button[data-target="${e.target.id}"]`);
      if(!btn) return;
      if(e.isIntersecting){ navButtons.forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
    });
  }, { threshold:.5 });
  sections.forEach(s => s && navIo.observe(s));

  // restart button at the very end
  const restartBtn = document.getElementById('restart-btn');
  if(restartBtn){
    restartBtn.addEventListener('click', () => {
      document.getElementById('blackout').classList.remove('on');
      document.getElementById('closing-line').classList.remove('show');
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }
});

function spawnStars(container, count){
  if(!container) return;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = (Math.random()*100)+'vw';
    s.style.top = (Math.random()*100)+'vh';
    s.style.animationDelay = (Math.random()*-4)+'s';
    container.appendChild(s);
  }
}

function spawnBlooms(container, count){
  if(!container) return;
  for(let i=0;i<count;i++){
    const b = document.createElement('div');
    b.className = 'bloom';
    b.style.left = (Math.random()*80)+'%';
    b.style.top = (Math.random()*55)+'%';
    b.style.animationDelay = (Math.random()*-5)+'s';
    b.style.transform = `scale(${0.6 + Math.random()*0.5})`;
    container.appendChild(b);
  }
}
