// ------------------------------
// NAV: hamburger open/close
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');

  if (navToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      const open = nav.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    navToggle.addEventListener('click', toggleMenu);

    // Close when clicking any nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) closeMenu();
      });
    });

    // Close when pressing Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    });

    // Optional: close when clicking outside the panel (mobile)
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ------------------------------
  // Reveal on scroll (.reveal)
  // ------------------------------
  (function () {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => io.observe(el));
  })();

  // ------------------------------
  // Reveal on scroll for timeline (.reveal-left / .reveal-right)
  // ------------------------------
  (function () {
    const targets = document.querySelectorAll('.reveal-left, .reveal-right');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(el => io.observe(el));
  })();

  // ------------------------------
  // SERVICES: "View All" toggle
  // ------------------------------
  (function () {
    const btn = document.getElementById('viewAllBtn');
    const cards = Array.from(document.querySelectorAll('.services .service-card'));
    if (!btn || cards.length <= 3) return;

    // Ensure only the first 3 are visible on load
    cards.forEach((card, idx) => {
      if (idx > 2) {
        // start collapsed
        card.classList.add('hidden');
        card.classList.remove('show');
      }
    });

    let expanded = false;

    const showAll = () => {
      cards.forEach((card, idx) => {
        if (idx > 2) {
          card.classList.remove('hidden');
          // trigger animation if CSS provides it
          requestAnimationFrame(() => card.classList.add('show'));
        }
      });
      btn.textContent = 'Hide Services';
      btn.setAttribute('aria-expanded', 'true');
      expanded = true;
    };

    const hideExtra = () => {
      cards.forEach((card, idx) => {
        if (idx > 2) {
          card.classList.remove('show');
          // Wait for animation end (200–400ms typically) then hide
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
      btn.textContent = 'View All Services';
      btn.setAttribute('aria-expanded', 'false');
      expanded = false;

      // Optional: scroll the grid back into view so the jump feels natural
      const grid = btn.closest('.services') || document.getElementById('services');
      if (grid && 'scrollIntoView' in grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    btn.addEventListener('click', () => {
      if (expanded) hideExtra();
      else showAll();
    });
  })();

  // ------------------------------
  // PROJECTS: Tab Switching
  // ------------------------------
  (function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const uiuxGrid = document.getElementById('uiux-projects');
    const graphicGrid = document.getElementById('graphic-projects');
    const webGrid = document.getElementById('web-projects');

    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');

        // Get category
        const category = tab.getAttribute('data-category');

        // Hide all grids
        uiuxGrid?.classList.add('hidden');
        graphicGrid?.classList.add('hidden');
        webGrid?.classList.add('hidden');

        // Show selected grid
        if (category === 'uiux') {
          uiuxGrid?.classList.remove('hidden');
        } else if (category === 'graphic') {
          graphicGrid?.classList.remove('hidden');
        } else if (category === 'web') {
          webGrid?.classList.remove('hidden');
        }
      });
    });
  })();

  // ------------------------------
  // IMAGE MODAL: UI/UX Projects
  // ------------------------------
  (function () {
    const modal = document.getElementById('imageModal');
    const modalImage = modal?.querySelector('.modal-image');
    const closeBtn = modal?.querySelector('.modal-close');
    const overlay = modal?.querySelector('.modal-overlay');
    const uiuxCards = document.querySelectorAll('#uiux-projects .project-card');

    if (!modal || !modalImage) return;

    // Open modal when clicking UI/UX cards
    uiuxCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.project-image img');
        if (img) {
          modalImage.src = img.src;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
      });
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
      setTimeout(() => {
        modalImage.src = '';
      }, 300);
    };

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  })();
});
