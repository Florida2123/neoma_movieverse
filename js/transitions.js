/**
 * TRANSITIONS.JS — Petal & Projector Editorial Page Transitions
 * Pink Curtain Wipe, View Transitions API Integration, Link Preloading & Reduced Motion
 */

export class TransitionManager {
  constructor(audioManager = null) {
    this.audioManager = audioManager;
    this.curtain = null;
    this.curtainText = null;
    this.isTransitioning = false;
    this.init();
  }

  init() {
    this.createCurtainElement();
    this.bindLinkInterception();
  }

  createCurtainElement() {
    if (document.getElementById("page-curtain")) {
      this.curtain = document.getElementById("page-curtain");
      this.curtainText = document.getElementById("curtain-title");
      return;
    }

    const curtain = document.createElement("div");
    curtain.id = "page-curtain";
    curtain.className = "page-curtain";
    curtain.innerHTML = `
      <div class="curtain-content" id="curtain-title">Neoma</div>
    `;
    document.body.appendChild(curtain);

    this.curtain = curtain;
    this.curtainText = curtain.querySelector("#curtain-title");
  }

  bindLinkInterception() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore external, hash, mailto, tel, or target="_blank"
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        href.includes("://") && !href.startsWith(window.location.origin)
      ) {
        return;
      }

      // Check motion settings
      const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.getAttribute("data-transition-style") === "none";

      if (motionOff) {
        // Direct navigation without animation
        return;
      }

      e.preventDefault();
      const pageTitle = link.getAttribute("data-transition-title") || link.textContent.trim() || "Loading";
      this.navigateTo(href, pageTitle);
    });

    // Hover preloading for ultra-fast navigation
    document.addEventListener("mouseover", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !link.dataset.preloaded) {
        link.dataset.preloaded = "true";
        const prefetch = document.createElement("link");
        prefetch.rel = "prefetch";
        prefetch.href = href;
        document.head.appendChild(prefetch);
      }
    }, { passive: true });
  }

  navigateTo(url, title = "") {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    if (this.audioManager) {
      this.audioManager.playWhoosh();
    }

    // Set transition curtain title
    if (this.curtainText) {
      this.curtainText.textContent = title;
    }

    // If GSAP is loaded, perform the curtain wipe
    if (window.gsap) {
      sessionStorage.setItem("pp_curtain_active", "true");
      const tl = gsap.timeline({
        onComplete: () => {
          window.location.href = url;
        }
      });

      tl.set(this.curtain, { transformOrigin: "bottom center" })
        .to(this.curtain, {
          y: "0%",
          duration: 0.6,
          ease: "power4.inOut"
        })
        .to(this.curtainText, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out"
        }, "-=0.2");
    } else {
      // Direct fallback
      window.location.href = url;
    }
  }

  /* Reveal transition on page entry */
  playPageEntry() {
    if (!window.gsap || !this.curtain) return;

    // If preloader is present and active (first visit), preloader handles the intro
    const preloader = document.getElementById("preloader");
    if (preloader && !preloader.classList.contains("hidden")) {
      gsap.set(this.curtain, { y: "100%" });
      sessionStorage.removeItem("pp_curtain_active");
      return;
    }

    // Only play curtain reveal if navigating from another page transition
    const wasTransition = sessionStorage.getItem("pp_curtain_active");
    sessionStorage.removeItem("pp_curtain_active");
    if (!wasTransition) {
      gsap.set(this.curtain, { y: "100%" });
      return;
    }

    // Slide curtain up and away
    gsap.timeline()
      .set(this.curtain, { y: "0%" })
      .to(this.curtainText, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in"
      })
      .to(this.curtain, {
        y: "-100%",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          this.isTransitioning = false;
          gsap.set(this.curtain, { y: "100%" });
        }
      });
  }
}

