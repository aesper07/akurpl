/**
 * VTO.DEV — Ultra-Modern Developer Portfolio Logic
 * Bento 2.0, Project Estimator, UI Playground, Web Audio SFX, Scroll Animations, CLI & Command Palette.
 */

let soundFxEnabled = false;
let audioCtx = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLiveClock();
  initScrollProgress();
  initCursorSpotlight();
  initScrollReveal();
  initScrollSpy();
  initAnimatedCounters();
  initAnimatedSkillBars();
  initCardTilt();
  initNavMenu();
  initIdeTabs();
  initCopyCode();
  initProjectFilter();
  initHeatmap();
  initFaqAccordion();
  initTerminalPlayground();
  initCommandPalette();
  initEmailCopy();
  initBackToTop();
  initTerminalTyping();
  initModalEvents();
  initYear();
  initEstimator();
  initSoundFx();
});

/**
 * 1. Footer Year
 */
function initYear() {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

/**
 * 2. Dark / Light Theme System (Default: Light)
 */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('vto_theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      playClickSound(520);
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('vto_theme', newTheme);
      showToast(newTheme === 'dark' ? '🌙 Mode Gelap Aktif' : '☀️ Mode Terang Aktif');
    });
  }
}

function toggleThemeFromCmd() {
  const toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) toggleBtn.click();
  closeCmdPalette();
}

/**
 * 3. Real-Time Live Clock (WIB / UTC+7)
 */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * 4. Top Scroll Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/**
 * 5. Mouse Follow Spotlight Glow
 */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  }, { passive: true });
}

/**
 * 6. Scroll-Driven Reveal Animations (IntersectionObserver)
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/**
 * 7. ScrollSpy Active Nav Highlighting
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * 8. Animated Number Counters on Scroll
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = `${currentVal.toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = `${target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.mini-stats');
  if (statsSection) observer.observe(statsSection);
}

/**
 * 9. Animated Skill Progress Bars on Scroll
 */
function initAnimatedSkillBars() {
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress') || '0';
        bar.style.width = `${progress}%`;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach((bar) => observer.observe(bar));
}

/**
 * 10. 3D Card Tilt Effect on Mouse Move
 */
function initCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/**
 * 11. Mobile Navigation Menu
 */
function initNavMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      playClickSound(400);
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        playClickSound(440);
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * 12. Next-Gen IDE Tabs Switcher
 */
function initIdeTabs() {
  const tabs = document.querySelectorAll('.ide-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      playClickSound(600);
      const target = tab.getAttribute('data-tab');

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panes.forEach((pane) => {
        pane.classList.remove('active');
      });
      const activePane = document.getElementById(`tab-${target}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/**
 * 13. Copy Code from Active IDE Tab
 */
function initCopyCode() {
  const copyBtn = document.getElementById('copyCodeBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    playClickSound(700);
    const activePane = document.querySelector('.tab-pane.active pre code');
    if (activePane) {
      const textToCopy = activePane.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const copyText = copyBtn.querySelector('.copy-text');
        if (copyText) copyText.textContent = 'Copied!';
        copyBtn.style.background = 'var(--accent-blue)';
        copyBtn.style.color = '#ffffff';

        showToast('📋 Kode konfigurasi berhasil disalin!');

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      });
    }
  });
}

/**
 * 14. Project Category Filter
 */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playClickSound(480);
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * 15. GitHub Activity Heatmap Generator
 */
function initHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;

  const totalSquares = 168;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('span');
    square.className = 'square';

    const rand = Math.random();
    let level = 0;
    if (rand > 0.82) level = 4;
    else if (rand > 0.65) level = 3;
    else if (rand > 0.45) level = 2;
    else if (rand > 0.25) level = 1;
    else level = 0;

    square.classList.add(`c-${level}`);
    fragment.appendChild(square);
  }

  grid.appendChild(fragment);
}

/**
 * 16. FAQ Accordion
 */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        playClickSound(500);
        const isOpen = item.classList.contains('is-open');

        items.forEach((other) => {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

/**
 * 17. Interactive Developer CLI Terminal Playground
 */
function initTerminalPlayground() {
  const input = document.getElementById('termInput');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCLISubmit(e);
    }
  });
}

function handleCLISubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('termInput');
  if (!input) return;

  const cmd = input.value.trim().toLowerCase();
  input.value = '';

  if (cmd) {
    playClickSound(650);
    runCLICommand(cmd);
  }
}

function runCLICommand(cmd) {
  playClickSound(550);
  const screen = document.getElementById('termScreen');
  if (!screen) return;

  const inputLine = document.createElement('div');
  inputLine.className = 'term-line';
  inputLine.innerHTML = `<span class="prompt-user">guest@vto.dev:~$</span> <span class="command-out">${escapeHTML(cmd)}</span>`;
  screen.appendChild(inputLine);

  const responseLine = document.createElement('div');
  responseLine.className = 'term-line';

  switch (cmd) {
    case 'help':
      responseLine.innerHTML = `
        <span class="text-info">Perintah yang tersedia:</span><br>
        • <strong>skills</strong>: Daftar keahlian & tech stack utama<br>
        • <strong>projects</strong>: Ringkasan portofolio produk digital<br>
        • <strong>contact</strong>: Info kontak langsung & WhatsApp<br>
        • <strong>about</strong>: Informasi profil & pengalaman VTO<br>
        • <strong>theme</strong>: Beralih antara Tema Terang & Gelap<br>
        • <strong>clear</strong>: Bersihkan layar terminal
      `;
      break;

    case 'skills':
      responseLine.innerHTML = `
        <span class="text-info">Tech Stack & Tools:</span><br>
        ⚡ <strong>Frontend:</strong> TypeScript, React, Next.js, Tailwind CSS, HTML5/CSS3<br>
        🟢 <strong>Backend:</strong> Node.js, Express, RESTful APIs, PostgreSQL<br>
        📐 <strong>Design:</strong> Figma, UI/UX Systems, Accessibility (a11y)<br>
        🚀 <strong>DevOps:</strong> Git, GitHub CI/CD, Vercel, Docker
      `;
      break;

    case 'projects':
      responseLine.innerHTML = `
        <span class="text-info">Proyek Unggulan:</span><br>
        1. <strong>Bionesia Platform</strong> — Corporate Web Platform (Live in Prod)<br>
        2. <strong>Alecto Collection</strong> — High-Performance E-Commerce (Live in Prod)<br>
        3. <strong>Perpusdigital App</strong> — Full-Stack Library Dashboard (Live in Prod)
      `;
      break;

    case 'contact':
      responseLine.innerHTML = `
        <span class="text-info">Kontak Resmi VTO:</span><br>
        📫 Email: <a href="mailto:rafiffito145@gmail.com" style="color: #38bdf8;">rafiffito145@gmail.com</a><br>
        📱 WhatsApp: <a href="https://wa.me/6289653604495" target="_blank" style="color: #34d399;">+62 896-5360-4495</a><br>
        💻 GitHub: <a href="https://github.com/aesper07" target="_blank" style="color: #c084fc;">github.com/aesper07</a>
      `;
      break;

    case 'about':
      responseLine.innerHTML = `
        <span class="text-info">Tentang VTO (Rafif Fito):</span><br>
        Senior Software Engineer & UI/UX Architect dengan fokus pada clean architecture, kecepatan eksekusi, dan desain presisi tinggi.
      `;
      break;

    case 'theme':
      toggleThemeFromCmd();
      responseLine.innerHTML = `<span class="text-info">✔ Tema tampilan berhasil diubah.</span>`;
      break;

    case 'clear':
      screen.innerHTML = '';
      return;

    default:
      responseLine.innerHTML = `<span style="color: #f43f5e;">Perintah tidak dikenali: '${escapeHTML(cmd)}'. Ketik <strong>help</strong> untuk bantuan.</span>`;
      break;
  }

  screen.appendChild(responseLine);
  screen.scrollTop = screen.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * 18. Quick Command Palette (`Ctrl + K` / `⌘K`)
 */
function initCommandPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  const openBtn = document.getElementById('openCmdPaletteBtn');
  const input = document.getElementById('cmdInput');
  const items = document.querySelectorAll('.cmd-item');

  if (!modal) return;

  function openPalette() {
    playClickSound(580);
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    if (input) {
      input.value = '';
      input.focus();
      filterCmdItems('');
    }
  }

  function closePalette() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openPalette);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('is-active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closePalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePalette();
    }
  });

  if (input) {
    input.addEventListener('input', (e) => {
      filterCmdItems(e.target.value.toLowerCase().trim());
    });
  }

  function filterCmdItems(query) {
    items.forEach((item) => {
      const text = item.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

function closeCmdPalette() {
  const modal = document.getElementById('cmdPaletteModal');
  if (modal) {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function navigateAndClose(selector) {
  playClickSound(450);
  closeCmdPalette();
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function triggerEmailCopyFromCmd() {
  closeCmdPalette();
  navigator.clipboard.writeText('rafiffito145@gmail.com').then(() => {
    showToast('📫 Email tersalin: rafiffito145@gmail.com');
  });
}

/**
 * 19. One-Click Copy Email Chip
 */
function initEmailCopy() {
  const emailChip = document.getElementById('copyEmailChip');
  if (!emailChip) return;

  emailChip.addEventListener('click', () => {
    playClickSound(620);
    const email = 'rafiffito145@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('📫 Email tersalin: rafiffito145@gmail.com');
    });
  });
}

/**
 * 20. Back to Top Floating Button
 */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    playClickSound(750);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 21. Terminal Animated Typing in IDE
 */
function initTerminalTyping() {
  const termText = document.querySelector('.term-text');
  if (!termText) return;

  const commands = [
    'npm run deploy:production --status=success',
    'git status: 0 errors, 100% tests passed',
    'npx build --optimized-lighthouse-score=99',
    'system:ready => Listening on port :3000'
  ];
  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeTerminal() {
    const currentCmd = commands[cmdIndex];
    
    if (isDeleting) {
      termText.textContent = currentCmd.substring(0, charIndex - 1);
      charIndex--;
    } else {
      termText.textContent = currentCmd.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 25 : 55;

    if (!isDeleting && charIndex === currentCmd.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
      speed = 400;
    }

    setTimeout(typeTerminal, speed);
  }

  setTimeout(typeTerminal, 800);
}

/**
 * 22. Modal Preview Events
 */
function initModalEvents() {
  const modal = document.getElementById('webPreviewModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWebPreview();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWebPreview();
    }
  });
}

function openWebPreview(title, webUrl, imageUrl) {
  playClickSound(520);
  const modal = document.getElementById('webPreviewModal');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalImage = document.getElementById('modalPreviewImage');
  const modalLink = document.getElementById('modalExternalLink');

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = title || 'Preview Web Proyek';
  if (modalImage) {
    modalImage.src = imageUrl || '';
    modalImage.alt = `Preview ${title}`;
  }
  if (modalLink) {
    modalLink.href = webUrl || '#';
  }

  modal.classList.add('is-active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeWebPreview() {
  const modal = document.getElementById('webPreviewModal');
  if (!modal) return;

  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * 23. Toast Notification
 */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  const msgSpan = toast.querySelector('.toast-message');
  if (msgSpan) msgSpan.textContent = message;

  toast.classList.add('is-shown');

  setTimeout(() => {
    toast.classList.remove('is-shown');
  }, 2800);
}

/**
 * 24. Interactive Bento UI Component Playground
 */
function setLabStyle(style) {
  playClickSound(640);
  const target = document.getElementById('uiLabTarget');
  const btns = document.querySelectorAll('.lab-ctrl-btn');

  btns.forEach((b) => b.classList.remove('active'));
  event.target.classList.add('active');

  if (!target) return;

  target.className = 'ui-lab-preview';
  if (style !== 'default') {
    target.classList.add(`style-${style}`);
  }
}

/**
 * 25. Interactive Project Scope / Cost Estimator Tool
 */
function initEstimator() {
  const typeBtns = document.querySelectorAll('.est-btn[data-type="type"]');
  const speedBtns = document.querySelectorAll('.est-btn[data-type="speed"]');

  typeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playClickSound(480);
      typeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      calculateEstimate();
    });
  });

  speedBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playClickSound(480);
      speedBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      calculateEstimate();
    });
  });

  calculateEstimate();
}

function calculateEstimate() {
  const activeType = document.querySelector('.est-btn[data-type="type"].active');
  const activeSpeed = document.querySelector('.est-btn[data-type="speed"].active');

  const chkSeo = document.getElementById('chkSeo')?.checked;
  const chkCms = document.getElementById('chkCms')?.checked;
  const chkPayment = document.getElementById('chkPayment')?.checked;

  const typeName = activeType?.getAttribute('data-name') || 'Landing Page';
  let baseDays = parseInt(activeType?.getAttribute('data-days') || '5', 10);

  const speedMult = parseFloat(activeSpeed?.getAttribute('data-mult') || '1.0');
  const speedName = activeSpeed?.getAttribute('data-name') || 'Standar';

  if (chkCms) baseDays += 3;
  if (chkPayment) baseDays += 4;
  if (chkSeo) baseDays += 1;

  if (speedMult > 1.0) {
    baseDays = Math.max(3, Math.round(baseDays * 0.7));
  }

  const nameEl = document.getElementById('estTypeName');
  const timeEl = document.getElementById('estTimeOutput');
  const waBtn = document.getElementById('estWaBtn');

  if (nameEl) nameEl.textContent = typeName;
  if (timeEl) timeEl.textContent = `~${baseDays} Hari Kerja (${speedName.split(' ')[0]})`;

  if (waBtn) {
    const msg = encodeURIComponent(`Halo VTO, saya tertarik konsultasi proyek web:\n- Tipe: ${typeName}\n- Estimasi: ~${baseDays} Hari Kerja\n- Fitur Tambahan: ${[chkSeo ? 'SEO' : '', chkCms ? 'CMS' : '', chkPayment ? 'Payment Gateway' : ''].filter(Boolean).join(', ') || 'Standar'}`);
    waBtn.href = `https://wa.me/6289653604495?text=${msg}`;
  }
}

/**
 * 26. Web Audio API Sound Effects Synthesizer
 */
function initSoundFx() {
  const sfxBtn = document.getElementById('soundFxBtn');
  if (!sfxBtn) return;

  sfxBtn.addEventListener('click', () => {
    soundFxEnabled = !soundFxEnabled;
    sfxBtn.classList.toggle('is-active', soundFxEnabled);
    const icon = sfxBtn.querySelector('.sound-icon');
    if (icon) icon.textContent = soundFxEnabled ? '🔊' : '🔇';
    
    if (soundFxEnabled) {
      playClickSound(800);
      showToast('🔊 Efek Suara Diaktifkan');
    } else {
      showToast('🔇 Efek Suara Dimatikan');
    }
  });
}

function playClickSound(freq = 500) {
  if (!soundFxEnabled) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, audioCtx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) {
    // Graceful fallback if AudioContext is blocked
  }
}