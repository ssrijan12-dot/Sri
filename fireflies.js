/* ============================================================
   fireflies.js — ambient fireflies + the finale's hidden-firefly
   surprise sequence (the "if this website ever disappears..." moment)
   ============================================================ */

function spawnFireflies(container, count){
  for(let i=0;i<count;i++){
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = (Math.random()*100)+'vw';
    f.style.top = (40 + Math.random()*55)+'vh';
    f.style.animationDelay = (Math.random()*-8)+'s, '+(Math.random()*-14)+'s';
    container.appendChild(f);
  }
}

function initFireflies(){
  const layer = document.getElementById('firefly-layer');
  if(layer) spawnFireflies(layer, 16);
}

/* The last firefly beneath the wisteria tree — tap it to unlock the
   final surprise sequence and the carved names on the plaque. */
function initFinaleFirefly(){
  const firefly = document.getElementById('last-firefly');
  const hint = document.getElementById('firefly-hint');
  if(!firefly) return;

  const seqIds = ['seq1','seq2','seq3','seq4','seq5','seq6','seq7'];
  let fired = false;

  firefly.addEventListener('click', () => {
    if(fired) return;
    fired = true;
    firefly.classList.remove('show');
    if(hint) hint.classList.remove('show');

    const overlay = document.getElementById('surprise-overlay');
    overlay.classList.add('on');

    seqIds.forEach((id, i) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if(el) el.classList.add('show');
      }, 1200 + i*1600);
    });

    const totalSeq = 1200 + seqIds.length*1600;
    setTimeout(() => overlay.classList.remove('on'), totalSeq + 2200);
    setTimeout(() => {
      const plaque = document.getElementById('plaque');
      if(plaque) plaque.classList.add('reveal');
    }, totalSeq + 3600);
    setTimeout(() => document.getElementById('blackout').classList.add('on'), totalSeq + 5600);
    setTimeout(() => document.getElementById('closing-line').classList.add('show'), totalSeq + 7200);
  });
}

/* Reveal the last firefly once the tree has fully grown in (called from gallery.js
   after the tree-tap sequence finishes). */
function revealFinaleFirefly(){
  const firefly = document.getElementById('last-firefly');
  const hint = document.getElementById('firefly-hint');
  if(firefly) firefly.classList.add('show');
  if(hint) hint.classList.add('show');
}
