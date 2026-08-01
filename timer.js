/* ============================================================
   timer.js — the relationship timer
   Edit RELATIONSHIP_START below to change the date/time it counts from.
   ============================================================ */

const RELATIONSHIP_START = new Date('2025-10-04T00:00:00');

function calcElapsed(){
  const now = new Date();
  let years = now.getFullYear() - RELATIONSHIP_START.getFullYear();
  let months = now.getMonth() - RELATIONSHIP_START.getMonth();
  let days = now.getDate() - RELATIONSHIP_START.getDate();

  if(days < 0){
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if(months < 0){
    years -= 1;
    months += 12;
  }

  let diffMs = now - RELATIONSHIP_START;
  let totalSeconds = Math.floor(diffMs/1000);
  const hours = Math.floor((totalSeconds % 86400)/3600);
  const mins = Math.floor((totalSeconds % 3600)/60);
  const secs = totalSeconds % 60;

  return { years, months, days, hours, mins, secs, totalDays: Math.floor(diffMs/86400000) };
}

function initTimer(){
  const yEl = document.getElementById('t-years');
  const moEl = document.getElementById('t-months');
  const dEl = document.getElementById('t-days');
  const hEl = document.getElementById('t-hours');
  const miEl = document.getElementById('t-mins');
  const sEl = document.getElementById('t-secs');
  const dockEl = document.getElementById('dock-timer');

  function tick(){
    const e = calcElapsed();
    if(yEl) yEl.textContent = e.years;
    if(moEl) moEl.textContent = e.months;
    if(dEl) dEl.textContent = e.days;
    if(hEl) hEl.textContent = String(e.hours).padStart(2,'0');
    if(miEl) miEl.textContent = String(e.mins).padStart(2,'0');
    if(sEl) sEl.textContent = String(e.secs).padStart(2,'0');
    if(dockEl) dockEl.textContent = e.totalDays + 'd';
  }
  tick();
  setInterval(tick, 1000);
}
