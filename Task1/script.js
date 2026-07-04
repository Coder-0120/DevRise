/* ==========================================================================
   MERIDIAN — Watches Landing Page
   Vanilla JS: live clock, nav toggle, scroll reveal, slider, cart, form.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky header on scroll ---------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu toggle ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');

  const closeMenu = () => {
    menuToggle.classList.remove('open');
    primaryNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------------- Live analog watch (hero) ---------------- */
  const ticksGroup = document.querySelector('#liveClock .ticks');
  if (ticksGroup) {
    const CENTER = 150, R_OUT = 122, R_IN_MAJOR = 104, R_IN_MINOR = 112;
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) * (Math.PI / 180);
      const isMajor = i % 5 === 0;
      const rIn = isMajor ? R_IN_MAJOR : R_IN_MINOR;
      const x1 = CENTER + R_OUT * Math.sin(angle);
      const y1 = CENTER - R_OUT * Math.cos(angle);
      const x2 = CENTER + rIn * Math.sin(angle);
      const y2 = CENTER - rIn * Math.cos(angle);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1.toFixed(2));
      line.setAttribute('y1', y1.toFixed(2));
      line.setAttribute('x2', x2.toFixed(2));
      line.setAttribute('y2', y2.toFixed(2));
      line.setAttribute('stroke-width', isMajor ? '2.4' : '1');
      ticksGroup.appendChild(line);
    }
  }

  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const secondHand = document.getElementById('secondHand');

  function tickClock() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();

    const secDeg = s * 6;
    const minDeg = m * 6 + s * 0.1;
    const hourDeg = h * 30 + m * 0.5;

    if (secondHand) secondHand.setAttribute('transform', `rotate(${secDeg} 150 150)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minDeg} 150 150)`);
    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourDeg} 150 150)`);
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------------- Testimonial slider ---------------- */
  const track = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const slides = track ? Array.from(track.children) : [];
  let current = 0;
  let autoplayTimer = null;

  function renderDots() {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Go to review ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    renderDots();
    restartAutoplay();
  }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goTo(current + 1), 6000);
  }

  if (track && slides.length) {
    renderDots();
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    restartAutoplay();

    // basic swipe support
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) diff > 0 ? goTo(current - 1) : goTo(current + 1);
    }, { passive: true });
  }

  /* ---------------- Add to cart micro-interaction ---------------- */
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    const original = btn.textContent;
    btn.addEventListener('click', () => {
      if (btn.classList.contains('added')) return;
      btn.classList.add('added');
      btn.textContent = 'Added ✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.textContent = original;
      }, 1800);
    });
  });

  /* ---------------- "Watch our story" placeholder ---------------- */
  const storyBtn = document.getElementById('watchStoryBtn');
  if (storyBtn) {
    storyBtn.addEventListener('click', () => {
      document.getElementById('craft').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------- Contact form (front-end only) ---------------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const submitBtn = document.getElementById('cfSubmit');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in every field before sending.';
        formNote.style.color = '#e07a5f';
        return;
      }
      if (!emailPattern.test(email)) {
        formNote.textContent = 'That email address doesn\u2019t look right.';
        formNote.style.color = '#e07a5f';
        return;
      }

      const label = submitBtn.querySelector('.btn-label');
      submitBtn.disabled = true;
      label.textContent = 'Sending…';

      // Simulated submission (no backend in this static build)
      setTimeout(() => {
        label.textContent = 'Send Message';
        submitBtn.disabled = false;
        formNote.style.color = '';
        formNote.textContent = `Thanks, ${name.split(' ')[0]} — we'll be in touch shortly.`;
        form.reset();
      }, 1100);
    });
  }

});