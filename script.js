const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

/* Progressive enhancement: content remains readable without JavaScript. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden','true');
document.body.appendChild(progress);
function updateProgress(){
 const distance = document.documentElement.scrollHeight - window.innerHeight;
 progress.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1,Math.max(0,window.scrollY/distance)) : 0) + ')';
}
window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress);
updateProgress();
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-visible');observer.unobserve(entry.target);}});
 },{threshold:0.08});
 document.documentElement.classList.add('motion-ready');
 document.querySelectorAll('.directory-grid a,.editorial-body h2,.editorial-body p,.countergaze-manifesto,.countergaze-empty,.section-body p,.about-portrait,.about-cinematic .section h2,.credential,.about-journey article,.principle-grid article,.future-grid article').forEach(el=>{
  if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('reveal-pending');observer.observe(el);}
 });
}

 document.querySelectorAll('.vox-play[data-video]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();const id=link.dataset.video;if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1';frame.title=link.getAttribute('aria-label');frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;link.replaceWith(frame);frame.focus();}));
