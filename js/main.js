/**
 * Main Interactive Logic for Syed Haider Ali Mahdi's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // 1. DYNAMIC TYPING EFFECT
  // ===================================================================
  const typedTextEl = document.getElementById('typedText');
  const phrases = [
    'AI / ML Developer',
    'Computer Vision Engineer',
    'NLP Practitioner',
    'Python & Flask Specialist',
    'Deep Learning Explorer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeLoop() {
    if (!typedTextEl) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();

  // ===================================================================
  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  // ===================================================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('haider_portfolio_theme');

  // Check saved theme or system preference
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      document.body.classList.toggle('dark-theme', !isLight);

      if (isLight) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeToggle.setAttribute('title', 'Switch to Dark Mode');
        localStorage.setItem('haider_portfolio_theme', 'light');
      } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeToggle.setAttribute('title', 'Switch to Light Mode');
        localStorage.setItem('haider_portfolio_theme', 'dark');
      }
    });
  }

  // ===================================================================
  // 3. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ===================================================================
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function toggleMobileMenu() {
    navLinks.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking nav links
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ===================================================================
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
  // ===================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ===================================================================
  // 5. PROJECT CATEGORY FILTERING
  // ===================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
          card.style.animation = 'fadeInUp 0.45s ease forwards';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ===================================================================
  // 6. SCROLL TO TOP BUTTON
  // ===================================================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===================================================================
  // 7. CURRENT YEAR DYNAMIC UPDATE
  // ===================================================================
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

// ===================================================================
// 8. CLIPBOARD COPY UTILITY & TOAST
// ===================================================================
function copyToClipboard(text, triggerBtn) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    
    // Quick visual button response
    if (triggerBtn) {
      const originalHTML = triggerBtn.innerHTML;
      triggerBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
      setTimeout(() => {
        triggerBtn.innerHTML = originalHTML;
      }, 1500);
    }
  }).catch(err => {
    showToast('Failed to copy. Please select text manually.');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ===================================================================
// 9. CONTACT FORM HANDLER
// ===================================================================
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all required fields.');
    return;
  }

  const encodedSubject = encodeURIComponent(`Portfolio Inquiry: ${subject} (from ${name})`);
  const encodedBody = encodeURIComponent(`Hi Haider,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`);

  showToast('Opening your email client to send message...');

  setTimeout(() => {
    window.location.href = `mailto:syedhaiderali0164@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    form.reset();
  }, 600);
}

