/* ==========================================================================
   SRIKANTH K V — SOFTWARE DEVELOPER PORTFOLIO JAVASCRIPT
   Vanilla JavaScript (ES6+), Zero Frameworks
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. NAVBAR SCROLL EFFECT & SECTION HIGHLIGHTING
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Active section observer
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --------------------------------------------------------------------------
  // 3. SCROLL REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 4. HERO TERMINAL / IDE TABS & INTERACTIVE CLI
  // --------------------------------------------------------------------------
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalPanes = document.querySelectorAll('.terminal-pane');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');

  // Tab switching logic
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      terminalTabs.forEach(t => t.classList.remove('active'));
      terminalPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Copy Code snippet logic
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const activePane = document.querySelector('.terminal-pane.active');
      let textToCopy = '';

      if (activePane) {
        textToCopy = activePane.innerText || activePane.textContent;
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy.trim())
          .then(() => {
            showToast('Code snippet copied to clipboard! 📋');
          })
          .catch(() => {
            showToast('Failed to copy code.');
          });
      }
    });
  }

  // CLI Command Commands logic
  if (cliInput && cliOutput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';

        if (!cmd) return;

        // Append line
        const inputLine = document.createElement('div');
        inputLine.className = 'cli-line';
        inputLine.innerHTML = `<span class="cli-prompt">visitor@srikanth-dev:~$</span> <span class="cli-cmd">${escapeHTML(cmd)}</span>`;
        cliOutput.appendChild(inputLine);

        // Result handling
        const resultLine = document.createElement('div');
        resultLine.className = 'cli-result';

        switch (cmd) {
          case 'help':
            resultLine.innerHTML = `
              <p>Available commands:</p>
              <p>  <strong class="text-emerald">info</strong>       - Overview of Srikanth K V</p>
              <p>  <strong class="text-emerald">projects</strong>   - List engineering projects</p>
              <p>  <strong class="text-emerald">skills</strong>     - Show technical stack</p>
              <p>  <strong class="text-emerald">education</strong>  - View UVCE credentials</p>
              <p>  <strong class="text-emerald">contact</strong>    - Email & social handles</p>
              <p>  <strong class="text-emerald">clear</strong>      - Clear output history</p>
            `;
            break;

          case 'info':
          case 'whoami':
          case 'srikanth':
            resultLine.innerHTML = `
              <p>✨ <strong>Srikanth K V</strong> — Software Developer</p>
              <p>📍 Location: Bengaluru, Karnataka, India</p>
              <p>🎓 Education: UVCE B.Tech in ISE (8.73 CGPA)</p>
              <p>💼 Focus: Backend systems, REST APIs, Databases, Web Apps</p>
            `;
            break;

          case 'projects':
            resultLine.innerHTML = `
              <p>🚀 1. <strong>ShopCalm</strong> [Laravel, PHP, MySQL, REST API]</p>
              <p>🎥 2. <strong>CINEBOOK</strong> [Java/PHP, MySQL, JavaScript]</p>
              <p>📊 3. <strong>College Predictor</strong> [Python, Random Forest ML]</p>
            `;
            break;

          case 'skills':
          case 'stack':
            resultLine.innerHTML = `
              <p>⚡ Languages: Java, C++, C, Python, JavaScript</p>
              <p>🛠️ Backend: Spring Boot, Laravel, PHP, REST APIs</p>
              <p>🗄️ Databases: MySQL, PostgreSQL, MariaDB, SQL</p>
              <p>🔧 Tools: Git, GitHub, Linux, AWS, Nginx</p>
            `;
            break;

          case 'education':
            resultLine.innerHTML = `
              <p>🎓 B.Tech — Information Science & Engineering</p>
              <p>🏫 University Visvesvaraya College of Engineering (UVCE)</p>
              <p>🌟 CGPA: 8.73 / 10</p>
            `;
            break;

          case 'contact':
            resultLine.innerHTML = `
              <p>✉️ Email: srikanthkv.dev@gmail.com</p>
              <p>🐙 GitHub: github.com/Kanth69</p>
              <p>💼 LinkedIn: linkedin.com/in/srikanth-kv</p>
            `;
            break;

          case 'clear':
            cliOutput.innerHTML = '';
            return;

          default:
            resultLine.innerHTML = `<p style="color: #f87171;">Command not recognized: '${escapeHTML(cmd)}'. Type '<strong class="text-emerald">help</strong>' for options.</p>`;
            break;
        }

        cliOutput.appendChild(resultLine);
        cliOutput.scrollTop = cliOutput.scrollHeight;
      }
    });
  }

  // Helper function to prevent XSS in CLI input
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // --------------------------------------------------------------------------
  // 5. RESUME & SHOPCALM DEMO MODALS
  // --------------------------------------------------------------------------
  const resumeModalBtn = document.getElementById('resumeModalBtn');
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
  const resumeModalDismiss = document.getElementById('resumeModalDismiss');

  const demoShopCalmBtn = document.getElementById('demoShopCalmBtn');
  const demoModal = document.getElementById('demoModal');
  const demoModalClose = document.getElementById('demoModalClose');
  const demoModalBackdrop = document.getElementById('demoModalBackdrop');
  const demoModalDismiss = document.getElementById('demoModalDismiss');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (resumeModalBtn) resumeModalBtn.addEventListener('click', () => openModal(resumeModal));
  if (resumeModalClose) resumeModalClose.addEventListener('click', () => closeModal(resumeModal));
  if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', () => closeModal(resumeModal));
  if (resumeModalDismiss) resumeModalDismiss.addEventListener('click', () => closeModal(resumeModal));

  if (demoShopCalmBtn) demoShopCalmBtn.addEventListener('click', () => openModal(demoModal));
  if (demoModalClose) demoModalClose.addEventListener('click', () => closeModal(demoModal));
  if (demoModalBackdrop) demoModalBackdrop.addEventListener('click', () => closeModal(demoModal));
  if (demoModalDismiss) demoModalDismiss.addEventListener('click', () => closeModal(demoModal));

  // Global ESC key listener to close modals or drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(resumeModal);
      closeModal(demoModal);
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 6. COPY EMAIL BUTTON & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.innerText || emailText.textContent;
      navigator.clipboard.writeText(email.trim())
        .then(() => {
          showToast('Email address copied to clipboard! ✉️');
        })
        .catch(() => {
          showToast('Failed to copy email.');
        });
    });
  }

  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // 7. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. AUTO-UPDATE FOOTER YEAR
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
