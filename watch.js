/* ============================================================
   watch.js — the pocket watch: tap to open, tap Begin to start
   the journey, then it docks in the corner as a mini widget.
   ============================================================ */

function initWatch(){
  const watch = document.getElementById('pocket-watch');
  const hint = document.getElementById('watch-hint');
  const beginBtn = document.getElementById('watch-begin');
  const dock = document.getElementById('watch-dock');
  const watchStage = document.getElementById('watch-stage');

  if(!watch) return;

  // idle swinging while closed, waiting to be tapped
  setTimeout(() => watch.classList.add('idle'), 1800);

  watch.addEventListener('click', (e) => {
    if(watch.classList.contains('open')) return;
    watch.classList.remove('idle');
    watch.classList.add('open');
    if(hint) hint.style.opacity = '0';
  });

  if(beginBtn){
    beginBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      beginJourney();
    });
  }

  function beginJourney(){
    // start the music (first user gesture — safe for autoplay policies)
    if(window.Music) Music.start();

    // scroll into the story
    const story = document.getElementById('story');
    if(story) story.scrollIntoView({ behavior:'smooth' });

    // shrink the big watch away and reveal the docked mini widget
    if(watchStage){
      watchStage.style.transition = 'opacity .6s ease, transform .6s ease';
      watchStage.style.opacity = '0';
      watchStage.style.transform = 'scale(.6) translateY(-20px)';
    }
    setTimeout(() => {
      if(dock) dock.classList.add('show');
    }, 500);
  }
}
