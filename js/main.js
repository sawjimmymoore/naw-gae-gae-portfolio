// ---------- nav toggle ----------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  }));
}

// ---------- sticky nav shadow on scroll ----------
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
  window.addEventListener('scroll', () => {
    siteNav.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -18px rgba(30,43,29,0.4)' : 'none';
  }, { passive: true });
}

// ---------- generic scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ---------- waypoint (journey) reveal ----------
const waypoints = document.querySelectorAll('.waypoint');
if ('IntersectionObserver' in window && waypoints.length) {
  const wpIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        wpIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  waypoints.forEach(el => wpIo.observe(el));
} else {
  waypoints.forEach(el => el.classList.add('in'));
}

// ---------- the path svg draw ----------
const pathSvg = document.querySelector('.path-line-svg');
if (pathSvg) {
  const pathEl = pathSvg.querySelector('path');
  if (pathEl) {
    const len = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = `${len}`;
    pathEl.style.strokeDashoffset = `${len}`;
  }
  if ('IntersectionObserver' in window) {
    const pIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pathSvg.classList.add('drawn');
          if (pathEl) pathEl.style.strokeDashoffset = '0';
          pIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    pIo.observe(pathSvg);
  } else {
    pathSvg.classList.add('drawn');
  }
}

// ---------- hero parallax (subtle) ----------
const heroMedia = document.querySelector('.hero-media .frame img');
if (heroMedia) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 800) heroMedia.style.transform = `translateY(${y * 0.06}px) scale(1.02)`;
  }, { passive: true });
}

// ---------- current year ----------
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
