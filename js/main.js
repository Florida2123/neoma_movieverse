/**
 * MAIN.JS — Petal & Projector Core Application Orchestrator
 * Lenis Smooth Scroll, GSAP Choreography, Preloader, Custom Cursor & Shared Chrome
 */

import { SettingsManager } from "./settings.js";
import { PetalsEngine } from "./petals.js";
import { AudioManager } from "./audio.js";
import { TransitionManager } from "./transitions.js";

export class App {
  constructor() {
    this.settings = new SettingsManager();
    this.audio = new AudioManager();
    this.transitions = new TransitionManager(this.audio);
    this.petals = null;
    this.lenis = null;

    this.cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2
    };

    this.init();
  }

  init() {
    this.renderSharedChrome();
    this.initPreloader();
    this.initLenis();
    this.initPetals();
    this.initCustomCursor();
    this.initScrollProgress();
    this.initMagneticButtons();
    this.initCardInteractiveMotion();
    this.initHeaderScroll();
    this.initMobileNav();
    this.bindGlobalAudioEvents();

    // Notify transition manager
    this.transitions.playPageEntry();
  }

  /* ==========================================================================
     Shared Header, Footer & Global Chrome
     ========================================================================== */
  renderSharedChrome() {
    // 1. Noise Grain
    if (!document.querySelector(".noise-overlay")) {
      const noise = document.createElement("div");
      noise.className = "noise-overlay";
      noise.setAttribute("aria-hidden", "true");
      document.body.prepend(noise);
    }

    // 2. Scroll Progress Bar
    if (!document.querySelector(".scroll-progress-bar")) {
      const bar = document.createElement("div");
      bar.className = "scroll-progress-bar";
      bar.setAttribute("aria-hidden", "true");
      document.body.prepend(bar);
    }

    // 3. Audio Dock
    this.audio.renderDock();

    // 4. Highlight active nav link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .mobile-nav-list a").forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentPath || (currentPath === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });

    // 5. Back to Top Button
    const btt = document.querySelector(".back-to-top-btn");
    if (btt) {
      btt.addEventListener("click", () => {
        if (this.lenis) {
          this.lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  }

  /* ==========================================================================
     Preloader with Blooming Flower and Sound Choice
     ========================================================================== */
  initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Only show preloader on the first visit of the session
    if (sessionStorage.getItem("pp_has_preloaded")) {
      preloader.classList.add("hidden");
      preloader.style.display = "none";
      return;
    }

    const countEl = preloader.querySelector(".preloader-count");
    const soundChoice = preloader.querySelector(".preloader-sound-choice");
    let progress = 0;
    let dismissed = false;

    const dismissPreloader = (withSound = false) => {
      if (dismissed) return;
      dismissed = true;
      sessionStorage.setItem("pp_has_preloaded", "true");
      if (withSound && this.audio) {
        this.audio.play();
      }
      this.playIntroFadeIn(preloader);
    };

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (countEl) countEl.textContent = "100";
        if (soundChoice) soundChoice.classList.add("ready");
      } else {
        if (countEl) countEl.textContent = progress;
      }
    }, 35);

    const enterSoundBtn = document.getElementById("preloader-enter-sound");
    const enterQuietBtn = document.getElementById("preloader-enter-quiet");

    if (enterSoundBtn) {
      enterSoundBtn.addEventListener("click", () => dismissPreloader(true));
    }
    if (enterQuietBtn) {
      enterQuietBtn.addEventListener("click", () => dismissPreloader(false));
    }
  }

  /* ==========================================================================
     Intro Fade-In Animation (Hero Entrance)
     ========================================================================== */
  playIntroFadeIn(preloaderEl = null) {
    const hero = document.querySelector(".home-hero");
    const preloader = preloaderEl || document.getElementById("preloader");

    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (this.settings?.settings?.motionLevel === "off");

    if (motionOff) {
      if (preloader) {
        preloader.classList.add("hidden");
        preloader.style.display = "none";
      }
      if (hero) hero.style.opacity = "1";
      return;
    }

    if (window.gsap) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Dissolve preloader smoothly
      if (preloader && !preloader.classList.contains("hidden")) {
        tl.to(preloader, {
          opacity: 0,
          y: -24,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            preloader.classList.add("hidden");
            preloader.style.display = "none";
          }
        });
      }

      // 2. Staggered Hero Fade-In starting as preloader dissolves
      tl.fromTo(".site-header",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 },
        preloader ? "-=0.25" : 0
      )
      .fromTo(".home-hero-bg-glow",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "<"
      )
      .fromTo(".hero-subtitle-wrap",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.55"
      )
      .fromTo(".hero-title",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.95 },
        "-=0.55"
      )
      .fromTo(".hero-description",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(".hero-ctas",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.55"
      )
      .fromTo(".hero-float-card",
        { opacity: 0, y: 35, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.85 },
        "-=0.55"
      )
      .fromTo(".home-marquee",
        { opacity: 0 },
        { opacity: 1, duration: 0.75 },
        "-=0.55"
      );
    } else {
      if (preloader) {
        preloader.classList.add("hidden");
        preloader.style.display = "none";
      }
      if (hero) {
        hero.classList.add("hero-animated");
      }
    }
  }

  /* ==========================================================================
     Lenis Smooth Scroll + ScrollTrigger Integration
     ========================================================================== */
  initLenis() {
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !this.settings.settings.smoothScroll;

    if (motionOff || typeof Lenis === "undefined") {
      return;
    }

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    if (window.ScrollTrigger && window.gsap) {
      this.lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  /* ==========================================================================
     Petals Engine
     ========================================================================== */
  initPetals() {
    this.petals = new PetalsEngine("petals-canvas");

    // Listen to settings changes
    window.addEventListener("settingsChanged", (e) => {
      if (this.petals) {
        this.petals.updateConfig({
          enabled: e.detail.petalsEnabled,
          density: e.detail.petalsDensity,
          speedMultiplier: e.detail.petalsSpeed,
          windStrength: e.detail.petalsWind,
          interactiveMouse: e.detail.petalsMouse,
          onlyOnHome: e.detail.petalsOnlyHome
        });
      }
    });
  }

  /* ==========================================================================
     Custom Cursor System
     ========================================================================== */
  initCustomCursor() {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    let dot = document.querySelector(".cursor-dot");
    let ring = document.querySelector(".cursor-ring");

    if (!dot) {
      dot = document.createElement("div");
      dot.className = "cursor-dot";
      document.body.appendChild(dot);
    }
    if (!ring) {
      ring = document.createElement("div");
      ring.className = "cursor-ring";
      document.body.appendChild(ring);
    }

    window.addEventListener("mousemove", (e) => {
      this.cursor.targetX = e.clientX;
      this.cursor.targetY = e.clientY;
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });

    const animateRing = () => {
      // Smooth interpolation (lerp)
      this.cursor.x += (this.cursor.targetX - this.cursor.x) * 0.18;
      this.cursor.y += (this.cursor.targetY - this.cursor.y) * 0.18;
      ring.style.transform = `translate(${this.cursor.x}px, ${this.cursor.y}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    // Hover interactions
    const addCursorHover = (selector, className, label = "") => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener("mouseenter", () => {
          ring.classList.add(className);
          if (label) ring.textContent = label;
        });
        el.addEventListener("mouseleave", () => {
          ring.classList.remove(className);
          ring.textContent = "";
        });
      });
    };

    addCursorHover("a, button, .filter-pill, .view-btn, .slider-arrow-btn", "cursor-hover-link");
    addCursorHover(".archive-films-grid .film-card, .similar-grid .film-card", "cursor-hover-film", "View");
    addCursorHover(".horizontal-slider-container, .featured-slide-card", "cursor-hover-drag", "Drag");
    addCursorHover(".trailer-poster-facade", "cursor-hover-play", "Play");

    // Dynamic delegation for cards created after filtering/search
    document.addEventListener("mouseover", (e) => {
      const card = e.target.closest(".film-card");
      if (card) {
        ring.classList.add("cursor-hover-film");
        ring.textContent = "View";
      }
    }, { passive: true });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(".film-card")) {
        ring.classList.remove("cursor-hover-film");
        ring.textContent = "";
      }
    }, { passive: true });
  }

  /* ==========================================================================
     Scroll Progress Bar
     ========================================================================== */
  initScrollProgress() {
    const bar = document.querySelector(".scroll-progress-bar");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /* ==========================================================================
     Magnetic Buttons (Physics micro-interaction)
     ========================================================================== */
  initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;

    document.querySelectorAll(".btn-primary, .btn-icon").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
      });
    });
  }

  /* ==========================================================================
     Interactive Movie Card Physics (3D Tilt & Magnetic Drag Follow)
     ========================================================================== */
  initCardInteractiveMotion() {
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (this.settings && this.settings.motion === false);
    if (motionOff) return;

    let activeCard = null;
    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let hasMovedCard = false;

    const applyCardTransform = (card, clientX, clientY) => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Normalized coordinates: -1 (left/top) to +1 (right/bottom)
      const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

      // 3D rotation angles (up to ±13deg)
      const maxRot = 13;
      const rotX = -normY * maxRot;
      const rotY = normX * maxRot;

      // Physical displacement following cursor/finger
      const transX = normX * 12;
      const transY = -8 + normY * 8; // maintain base card lift of -8px

      // Fast transition for smooth responsive tracking
      card.style.transition = "transform 0.08s ease-out, box-shadow 0.15s ease-out, border-color 0.25s ease";
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 12px) scale3d(1.025, 1.025, 1.025)`;

      // Directional drop shadow opposing the light source
      const shadowX = -normX * 16;
      const shadowY = 16 - normY * 10;
      card.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 32px rgba(0, 0, 0, 0.45), 0 0 25px rgba(var(--primary-rgb), 0.28)`;
      card.style.borderColor = "var(--primary)";

      // Poster image parallax depth
      const img = card.querySelector(".film-card-img");
      if (img) {
        img.style.transition = "transform 0.08s ease-out";
        img.style.transform = `scale(1.08) translate3d(${(-normX * 8).toFixed(2)}px, ${(-normY * 8).toFixed(2)}px, 0)`;
      }

      // Dynamic specular sheen following cursor/finger position
      const shine = card.querySelector(".film-card-shine");
      if (shine) {
        const px = ((normX + 1) / 2) * 100;
        const py = ((normY + 1) / 2) * 100;
        shine.style.opacity = "1";
        shine.style.background = `radial-gradient(circle at ${px.toFixed(1)}% ${py.toFixed(1)}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 65%)`;
      }
    };

    const resetCard = (card) => {
      if (!card) return;
      card.style.transition = "transform 0.55s var(--ease-editorial), box-shadow 0.55s var(--ease-editorial), border-color 0.35s ease";
      card.style.transform = "";
      card.style.boxShadow = "";
      card.style.borderColor = "";

      const img = card.querySelector(".film-card-img");
      if (img) {
        img.style.transition = "transform 0.55s var(--ease-editorial)";
        img.style.transform = "";
      }

      const shine = card.querySelector(".film-card-shine");
      if (shine) {
        shine.style.transition = "opacity 0.45s ease";
        shine.style.opacity = "";
        shine.style.background = "";
      }
    };

    // 1. Mouse / Cursor tracking via delegation
    document.addEventListener("mousemove", (e) => {
      if (isTouching) return;
      const card = e.target.closest(".film-card");
      if (card) {
        if (activeCard && activeCard !== card) {
          resetCard(activeCard);
        }
        activeCard = card;
        applyCardTransform(card, e.clientX, e.clientY);
      } else if (activeCard) {
        resetCard(activeCard);
        activeCard = null;
      }
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
      if (activeCard) {
        resetCard(activeCard);
        activeCard = null;
      }
    });

    // 2. Touch / Finger drag tracking (works across all cards as finger glides)
    document.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        hasMovedCard = false;
        const card = document.elementFromPoint(touch.clientX, touch.clientY)?.closest(".film-card");
        if (card) {
          isTouching = true;
          activeCard = card;
          applyCardTransform(card, touch.clientX, touch.clientY);
        }
      }
    }, { passive: true });

    document.addEventListener("touchmove", (e) => {
      if (e.touches.length === 1 && isTouching) {
        const touch = e.touches[0];
        const dist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
        if (dist > 10) {
          hasMovedCard = true;
        }
        const card = document.elementFromPoint(touch.clientX, touch.clientY)?.closest(".film-card");
        if (card) {
          if (activeCard && activeCard !== card) {
            resetCard(activeCard);
          }
          activeCard = card;
          applyCardTransform(card, touch.clientX, touch.clientY);
        } else if (activeCard) {
          resetCard(activeCard);
          activeCard = null;
        }
      }
    }, { passive: true });

    const endTouch = () => {
      if (isTouching) {
        isTouching = false;
        if (activeCard) {
          resetCard(activeCard);
          activeCard = null;
        }
        setTimeout(() => { hasMovedCard = false; }, 100);
      }
    };

    document.addEventListener("touchend", endTouch, { passive: true });
    document.addEventListener("touchcancel", endTouch, { passive: true });

    // Prevent navigation if finger was dragging across movie cards
    document.addEventListener("click", (e) => {
      if (hasMovedCard) {
        const card = e.target.closest(".film-card");
        if (card) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, true);
  }

  /* ==========================================================================
     Header Scroll Blur
     ========================================================================== */
  initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  /* ==========================================================================
     Mobile Navigation Drawer
     ========================================================================== */
  initMobileNav() {
    const toggleBtn = document.querySelector(".menu-toggle-btn");
    const drawer = document.querySelector(".mobile-nav-drawer");
    const closeBtn = drawer ? drawer.querySelector(".close-btn") : null;

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener("click", () => drawer.classList.add("open"));
    }
    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
    }
  }

  /* ==========================================================================
     Global UI Audio Feedback (Subtle clicks and ticks)
     ========================================================================== */
  bindGlobalAudioEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("button, .btn, .filter-pill, .view-btn")) {
        this.audio.playTick();
      }
    });
  }
}

// Global bootstrap
function bootstrapApp() {
  if (!window.ppApp) {
    window.ppApp = new App();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapApp);
} else {
  bootstrapApp();
}

