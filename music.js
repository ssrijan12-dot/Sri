/* ============================================================
   music.js — background music controls
   Drop your own tracks into assets/music/ :
     assets/music/our-journey.mp3   (plays once "Begin" is tapped)
     assets/music/finale.mp3        (swaps in for the wisteria finale)
   If no files are present the controls simply stay quiet — nothing
   will break.
   ============================================================ */

const Music = (() => {
  let bg, finale, dockPlay, dockVolume, isPlaying = false, usingFinale = false;

  function init(){
    bg = document.getElementById('bg-music');
    finale = document.getElementById('finale-music');
    dockPlay = document.getElementById('dock-play');
    dockVolume = document.getElementById('dock-volume');

    if(dockVolume){
      bg.volume = dockVolume.value;
      finale.volume = dockVolume.value;
      dockVolume.addEventListener('input', () => {
        bg.volume = dockVolume.value;
        finale.volume = dockVolume.value;
      });
    }

    if(dockPlay){
      dockPlay.addEventListener('click', toggle);
    }
  }

  function play(){
    const track = usingFinale ? finale : bg;
    track.play().catch(() => { /* autoplay may be blocked until a user gesture — that's fine */ });
    isPlaying = true;
    if(dockPlay) dockPlay.textContent = '\u23F8';
  }

  function pause(){
    (usingFinale ? finale : bg).pause();
    isPlaying = false;
    if(dockPlay) dockPlay.textContent = '\u25B6';
  }

  function toggle(){
    isPlaying ? pause() : play();
  }

  function start(){
    // called once, when the pocket watch's "Begin" is tapped
    play();
  }

  function switchToFinale(){
    if(usingFinale) return;
    usingFinale = true;
    const wasPlaying = isPlaying;
    bg.pause();
    if(wasPlaying) play();
  }

  return { init, play, pause, toggle, start, switchToFinale };
})();
