
// UI helpers
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const $  = (sel, ctx=document) => ctx.querySelector(sel);

// Mobile nav
const nav = $('.nav');
const burger = $('.burger');
if (burger){
  burger.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// IntersectionObserver for reveals
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
},{threshold:.1});
$$('.reveal').forEach(el=> observer.observe(el));

// Ripple on all .btn.ripple
function attachRipple(root=document){
  root.querySelectorAll('.btn.ripple, button.ripple').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const d = document.createElement('span');
      d.className = 'wave';
      const rect = btn.getBoundingClientRect();
      d.style.left = (e.clientX - rect.left) + 'px';
      d.style.top  = (e.clientY - rect.top) + 'px';
      btn.appendChild(d);
      setTimeout(()=> d.remove(), 650);
    });
  });
}
attachRipple(document);
