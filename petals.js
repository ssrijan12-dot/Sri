/* ============================================================
   petals.js — falling sakura petals + drifting clouds + birds
   ============================================================ */

function spawnPetals(container, count){
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random()*100;
    const dur = 9 + Math.random()*10;
    const delay = Math.random()*-20;
    const swayDur = 3 + Math.random()*3;
    const size = 8 + Math.random()*10;
    p.style.left = left+'vw';
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.animationDuration = dur+'s, '+swayDur+'s';
    p.style.animationDelay = delay+'s, '+(Math.random()*-4)+'s';
    container.appendChild(p);
  }
}

function spawnClouds(container, count){
  for(let i=0;i<count;i++){
    const c = document.createElement('div');
    c.className = 'cloud';
    c.style.top = (4 + Math.random()*14)+'%';
    c.style.transform = 'scale('+(0.6 + Math.random()*0.8)+')';
    c.style.animationDuration = (50 + Math.random()*40)+'s';
    c.style.animationDelay = (Math.random()*-60)+'s';
    c.style.opacity = 0.5 + Math.random()*0.4;
    container.appendChild(c);
  }
}

function spawnBirds(container, count){
  const glyphs = ['\u02C0', '\u02C4', '\u2303'];
  for(let i=0;i<count;i++){
    const b = document.createElement('div');
    b.className = 'bird';
    b.textContent = '^';
    b.style.top = (10 + Math.random()*20)+'%';
    b.style.animationDuration = (18 + Math.random()*14)+'s';
    b.style.animationDelay = (Math.random()*-30)+'s';
    container.appendChild(b);
  }
}

function initPetals(){
  const petalLayer = document.getElementById('petal-layer');
  const birdLayer = document.getElementById('bird-layer');
  const intro = document.getElementById('intro');
  if(petalLayer) spawnPetals(petalLayer, 22);
  if(intro) spawnClouds(intro, 3);
  if(birdLayer) spawnBirds(birdLayer, 4);
}
