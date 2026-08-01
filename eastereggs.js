/* ============================================================
   eastereggs.js — the hidden "Things I Never Say Enough" page.
   Triple-click Ace's photo on the opening screen to unlock it.
   ============================================================ */

function initSecretRoom(){
  const trigger = document.getElementById('ace-trigger');
  const secret = document.getElementById('secret');
  const closeBtn = document.getElementById('close-secret');
  if(!trigger || !secret) return;

  let clickCount = 0;
  let clickTimer = null;

  trigger.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 700);
    if(clickCount === 3){
      clickCount = 0;
      secret.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  closeBtn.addEventListener('click', () => {
    secret.classList.remove('open');
    document.body.style.overflow = '';
  });
}
