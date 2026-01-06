/**
 * QUANTIS-TOUCHZ.ORG - OFFICIAL PLATFORM SCRIPT (2026)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. ICON INITIALIZATION
  // Using Lucide for modern minimalistic icons
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. GLOBAL VARIABLES
  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeNav = document.querySelector('.mobile-nav__close');
  const navLinks = document.querySelectorAll('.header__link, .mobile-nav__link');
  const phoneInput = document.getElementById('phoneInput');
  const contactForm = document.getElementById('contactForm');
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptCookies = document.getElementById('acceptCookies');

  // 3. MOBILE MENU LOGIC
  const toggleMenu = () => {
      mobileNav.classList.toggle('mobile-nav--active');
      document.body.style.overflow = mobileNav.classList.contains('mobile-nav--active') ? 'hidden' : '';
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  if (closeNav) closeNav.addEventListener('click', toggleMenu);

  // Close menu on link click (for anchor navigation)
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (mobileNav.classList.contains('mobile-nav--active')) {
              toggleMenu();
          }
      });
  });

  // 4. SCROLL EFFECTS (HEADER)
  window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });

  // 5. ADVANCED ANIMATIONS (GSAP + ScrollTrigger)
  if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Fix word breaking: use SplitType with word and character grouping
      const heroTitle = new SplitType('.hero__title', {
          types: 'words,chars',
          tagName: 'span'
      });

      // Hero title appearance animation
      gsap.from(heroTitle.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 1.2,
          ease: "expo.out"
      });

      // Hero content animation (text and buttons)
      gsap.from('.hero__badge, .hero__text, .hero__btns', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.5,
          stagger: 0.2,
          ease: "power3.out"
      });

      // Scroll Reveal for sections
      const revealElements = document.querySelectorAll('.benefit-card, .innovation-item, .blog-card, .section-header');

      revealElements.forEach((el) => {
          gsap.from(el, {
              scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none none"
              },
              opacity: 0,
              y: 40,
              duration: 0.8,
              ease: "power2.out"
          });
      });

      // Interactive parallax for Hero decorative circle
      gsap.to('.hero__circle', {
          scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true
          },
          y: 200,
          scale: 1.2,
          opacity: 0.5
      });
  }

  // 6. FORM VALIDATION AND CAPTCHA
  if (phoneInput) {
      // Allow only digits in the phone field
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });
  }

  // Generate math captcha
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const captchaQuestion = document.getElementById('captchaQuestion');
  const correctSum = num1 + num2;

  if (captchaQuestion) {
      captchaQuestion.innerText = `${num1} + ${num2} = ?`;
  }

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const userAnswer = document.getElementById('captchaAnswer').value;
          const formMessage = document.getElementById('formMessage');

          if (parseInt(userAnswer) !== correctSum) {
              alert("Error: Incorrect answer to the math problem.");
              return;
          }

          // Simulated AJAX request
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          submitBtn.disabled = true;
          submitBtn.innerText = "Sending...";

          setTimeout(() => {
              formMessage.style.display = 'block';
              formMessage.innerHTML = `<div style="color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 15px; border-radius: 10px; margin-top: 20px;">
                  ⚡ Thank you! Your request has been received. We will contact you shortly.
              </div>`;

              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.innerText = "Submit Request";

              // Clear message after 7 seconds
              setTimeout(() => { formMessage.innerHTML = ""; }, 7000);
          }, 1500);
      });
  }

  // 7. COOKIE POPUP LOGIC
  const COOKIE_KEY = 'quantis_touchz_cookies_accepted';

  if (cookiePopup && !localStorage.getItem(COOKIE_KEY)) {
      // Show smoothly 3 seconds after load
      setTimeout(() => {
          cookiePopup.style.display = 'block';
          gsap.fromTo(cookiePopup, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6 });
      }, 3000);
  }

  if (acceptCookies) {
      acceptCookies.addEventListener('click', () => {
          localStorage.setItem(COOKIE_KEY, 'true');
          gsap.to(cookiePopup, {
              opacity: 0,
              y: 50,
              duration: 0.4,
              onComplete: () => cookiePopup.style.display = 'none'
          });
      });
  }

  // 8. SMOOTH SCROLL TO ANCHORS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          e.preventDefault();
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              const headerOffset = 80;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
              });
          }
      });
  });
});