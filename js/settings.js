/**
 * SETTINGS.JS — Petal & Projector Preference Engine
 * Instant Live Updates, Token Regeneration, Export/Import & Reset
 */

export const DEFAULT_SETTINGS = {
  // Theme & Color
  theme: "blush",
  mode: "light", // light, dark, auto
  customPrimary: "#E85D8A",
  customAccent: "#FF9BB8",
  isCustomColorActive: false,

  // Typography & Appearance
  fontSize: "medium", // small, medium, large, xlarge
  fontPreset: "default", // default, modern, editorial-garamond
  radius: "soft", // sharp, soft, round
  grain: true,

  // Motion
  motionLevel: "full", // full, reduced, off
  smoothScroll: true,
  transitionStyle: "curtain", // curtain, fade, none
  customCursor: true,
  parallax: true,

  // Petals
  petalsEnabled: true,
  petalsDensity: "medium", // low, medium, high
  petalsSpeed: 1.0,
  petalsWind: 1.0,
  petalsMouse: true,
  petalsOnlyHome: false,

  // Music & Audio
  musicAutoplay: false,
  musicVolume: 0.45,
  uiSounds: true,

  // Reading & Accessibility
  dyslexiaFont: false,
  highContrast: false,

  // Personalization
  siteTitle: "Neoma",
  siteTagline: "Films that taught me to dream bigger. (Class 10 School Project)",
  curatorName: "Supriya"
};

export class SettingsManager {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.load();
    this.applyAll();
    window.ppSettings = this;
  }

  load() {
    try {
      const saved = localStorage.getItem("pp_global_settings");
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        if (this.settings.siteTitle === "Petal & Projector" || this.settings.siteTitle === "Petals and Projector") {
          this.settings.siteTitle = "Neoma";
        }
      }
    } catch (e) {
      console.warn("Could not read settings from localStorage", e);
    }
  }

  save() {
    try {
      localStorage.setItem("pp_global_settings", JSON.stringify(this.settings));
      // Dispatch event for other components (petals, audio)
      window.dispatchEvent(new CustomEvent("settingsChanged", { detail: this.settings }));
    } catch (e) {
      console.warn("Could not save settings to localStorage", e);
    }
  }

  set(key, value) {
    this.settings[key] = value;
    this.save();
    this.applyAll();
  }

  reset() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.save();
    this.applyAll();
  }

  exportJSON() {
    return JSON.stringify(this.settings, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      this.settings = { ...DEFAULT_SETTINGS, ...parsed };
      this.save();
      this.applyAll();
      return true;
    } catch (e) {
      console.error("Invalid settings JSON", e);
      return false;
    }
  }

  /* ==========================================================================
     Apply settings dynamically to the DOM
     ========================================================================== */
  applyAll() {
    const root = document.documentElement;

    // 1. Theme and Dark Mode
    if (this.settings.mode === "dark") {
      root.setAttribute("data-theme", "midnight-rose");
    } else if (this.settings.mode === "auto") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", isSystemDark ? "midnight-rose" : this.settings.theme);
      root.classList.toggle("dark-theme", isSystemDark);
    } else {
      root.setAttribute("data-theme", this.settings.theme);
      root.classList.remove("dark-theme");
    }

    // Custom color override
    let customStyleTag = document.getElementById("pp-custom-theme-style");
    if (this.settings.isCustomColorActive && this.settings.customPrimary) {
      if (!customStyleTag) {
        customStyleTag = document.createElement("style");
        customStyleTag.id = "pp-custom-theme-style";
        document.head.appendChild(customStyleTag);
      }

      // Convert hex to rgb
      const hex = this.settings.customPrimary.replace("#", "");
      let r = 232, g = 93, b = 138;
      if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }

      customStyleTag.innerHTML = `
        :root {
          --primary: ${this.settings.customPrimary} !important;
          --primary-rgb: ${r}, ${g}, ${b} !important;
          --accent: ${this.settings.customAccent || '#FF9BB8'} !important;
          --border: rgba(${r}, ${g}, ${b}, 0.22) !important;
          --border-strong: rgba(${r}, ${g}, ${b}, 0.45) !important;
        }
      `;
    } else if (customStyleTag) {
      customStyleTag.remove();
    }

    // 2. Typography
    root.setAttribute("data-font-size", this.settings.fontSize);
    root.setAttribute("data-font-preset", this.settings.fontPreset);
    root.setAttribute("data-radius", this.settings.radius);
    root.setAttribute("data-grain", String(this.settings.grain));
    root.setAttribute("data-cursor", String(this.settings.customCursor));
    root.setAttribute("data-dyslexia", String(this.settings.dyslexiaFont));
    root.setAttribute("data-contrast", this.settings.highContrast ? "high" : "normal");

    // 3. Update personal strings across pages
    document.querySelectorAll("[data-personal='site-title']").forEach(el => {
      el.textContent = this.settings.siteTitle;
    });
    document.querySelectorAll("[data-personal='site-tagline']").forEach(el => {
      el.textContent = this.settings.siteTagline;
    });
    document.querySelectorAll("[data-personal='curator-name']").forEach(el => {
      el.textContent = this.settings.curatorName;
    });
  }
}

