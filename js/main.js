/* ============================================
   N'Gola Drive — Main JavaScript
   No frameworks. Pure vanilla JS.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL EFFECT ===
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // === SCROLL REVEAL ANIMATIONS ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (target - start) * eased);
          el.textContent = prefix + current.toLocaleString('pt-AO') + suffix;
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = 80;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // === ACTIVE NAV LINK HIGHLIGHT ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === FORM VALIDATION ===
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--red)';
          valid = false;
        }
      });

      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.style.borderColor = 'var(--red)';
          valid = false;
        }
      }

      const phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value) {
        const cleaned = phoneField.value.replace(/\D/g, '');
        if (cleaned.length < 9) {
          phoneField.style.borderColor = 'var(--red)';
          valid = false;
        }
      }

      if (valid) {
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.style.cssText = `
          background: rgba(196, 30, 36, 0.15);
          border: 1px solid var(--red);
          color: var(--white);
          padding: 1.2rem;
          border-radius: 10px;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
        `;
        successMsg.textContent = 'Registo enviado com sucesso! Entraremos em contacto em breve.';
        const existing = form.querySelector('.form-success');
        if (existing) existing.remove();
        form.appendChild(successMsg);
        form.reset();
      }
    });
  });

  // === TESTIMONIAL SLIDER ===
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const cards = slider.querySelectorAll('.testimonial-card');
    let current = 0;

    function showCard(index) {
      cards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
      });
    }

    if (cards.length > 1) {
      showCard(0);
      setInterval(() => {
        current = (current + 1) % cards.length;
        showCard(current);
      }, 5000);
    }
  }

  // === PARALLAX EFFECT ON HERO ===
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    });
  }

  // === LANGUAGE SELECTOR ===
  const langBtns = document.querySelectorAll('[data-lang]');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      document.documentElement.lang = lang;
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      console.log('Language changed to:', lang);
    });
  });

});
