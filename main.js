/* =============================================
   SHARED JS — Prof. Dr. Imran Pasha Website
   ============================================= */

// ── Mobile nav toggle ──────────────────────────
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    })
  );
}

// ── Active nav link (current page) ─────────────
(function markActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });
})();

// ── Intersection Observer (fade-in) ─────────────
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll(
    '.tl-item, .research-card, .pub-list li, .grant-list li, ' +
    '.student-card, .ql-card, .pub-box, .country-row:not(.header), ' +
    '.awards-list li'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 55);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => io.observe(el));
}

// ── Back-to-top button ───────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Filter tabs (publications / grants) ──────────
document.querySelectorAll('.filter-tabs').forEach(tabGroup => {
  const tabs = tabGroup.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.filter;
      const container = tabGroup.nextElementSibling;
      if (!container) return;
      container.querySelectorAll('[data-category]').forEach(item => {
        const show = target === 'all' || item.dataset.category === target;
        item.style.display = show ? '' : 'none';
      });
    });
  });
});

// ── Simple publication search ─────────────────────
const searchInput = document.getElementById('pub-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll('.pub-list li, .grant-list li').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Contact form submit (demo) ────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#1a5c1a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}
