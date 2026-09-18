// Loader
const loader = document.getElementById('loader');
const bar = document.getElementById('loaderBar');
const hero = document.getElementById('hero');
let p = 0;
const tick = () => {
  p = Math.min(100, p + 2 + Math.random() * 5);
  bar.style.width = p + '%';
  if (p < 100) setTimeout(tick, 40);
  else {
    loader.classList.add('is-done');
    hero.classList.add('is-loaded');
    setTimeout(() => loader.style.display = 'none', 950);
  }
};
setTimeout(tick, 350);

// Fixed header state + menu
const header = document.getElementById('header');
const setHeader = () => header.classList.toggle('is-solid', window.scrollY > 40);
window.addEventListener('scroll', setHeader);
setHeader();

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  header.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    [...menu.querySelectorAll('.link')].forEach(a =>
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        header.classList.remove('is-open');
        document.body.style.overflow = '';
      }, { once: true }));
  }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.hidden-fade').forEach(el => io.observe(el));

// Hero title reveal after load
document.querySelectorAll('.hero__title .w span').forEach((s, i) => s.style.transitionDelay = (0.15 + i * 0.12) + 's');

// Testimonials slider
const track = document.getElementById('testiTrack');
const cards = track.children;
let tIndex = 0;
const moveTesti = (dir) => {
  tIndex = Math.min(Math.max(tIndex + dir, 0), cards.length - 1);
  track.style.transform = `translateX(calc(-${tIndex} * (min(560px,84vw) + 2vw)))`;
};
document.getElementById('testiNext').addEventListener('click', () => moveTesti(1));
document.getElementById('testiPrev').addEventListener('click', () => moveTesti(-1));

// Form fake submit
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('formMsg').style.display = 'block';
  form.reset();
  setTimeout(() => document.getElementById('formMsg').style.display = 'none', 6000);
});

// Duplicate marquee content for seamless loop
const mt = document.querySelector('.marquee__track');
mt.innerHTML += mt.innerHTML;