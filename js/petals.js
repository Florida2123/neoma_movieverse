/**
 * PETALS.JS — Petal & Projector Procedural Falling Sakura Engine
 * DPR-Aware Canvas 2D, 3D Rotational Oscillation, Wind Gusts & Mouse Repulsion
 */

export class PetalsEngine {
  constructor(canvasId = "petals-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
      this.canvas.id = canvasId;
      document.body.prepend(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");

    // Default configuration (hydrated from localStorage via settings)
    this.config = {
      enabled: true,
      density: "medium", // low: 25, medium: 45, high: 75
      speedMultiplier: 1.0,
      sizeMultiplier: 1.0,
      windStrength: 1.0,
      interactiveMouse: true,
      onlyOnHome: false
    };

    this.petals = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.mouse = { x: -1000, y: -1000, radius: 120 };
    this.scrollVelocity = 0;
    this.lastScrollY = window.scrollY;
    this.scrollTimeout = null;

    this.animId = null;
    this.isPaused = false;

    this.loadSettings();
    this.init();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem("pp_petals_settings");
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      // Use defaults if storage read fails
    }

    // Check page limitation
    if (this.config.onlyOnHome) {
      const isHome = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/") || window.location.pathname === "";
      if (!isHome) {
        this.config.enabled = false;
      }
    }

    // Check accessibility reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.config.enabled = false;
    }
  }

  init() {
    if (!this.config.enabled) {
      this.canvas.style.display = "none";
      return;
    }
    this.canvas.style.display = "block";

    this.resize();
    this.createPetals();
    this.bindEvents();
    this.start();
  }

  getDensityCount() {
    const counts = { low: 25, medium: 45, high: 75 };
    let count = counts[this.config.density] || 45;
    if (this.width < 768) count = Math.round(count * 0.6);
    return count;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  getThemeShades() {
    // Read live CSS custom properties for cohesive blending with active theme
    const style = getComputedStyle(document.documentElement);
    const primary = style.getPropertyValue("--primary").trim() || "#E85D8A";
    const accent = style.getPropertyValue("--accent").trim() || "#FF9BB8";
    const soft = style.getPropertyValue("--primary-soft").trim() || "#FCE4EC";

    return [
      primary,
      accent,
      soft,
      "rgba(255, 182, 193, 0.75)",
      "rgba(255, 228, 235, 0.85)"
    ];
  }

  createPetals() {
    const count = this.getDensityCount();
    const shades = this.getThemeShades();
    this.petals = [];

    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height - this.height,
        size: (8 + Math.random() * 12) * this.config.sizeMultiplier,
        fallSpeed: (0.75 + Math.random() * 1.5) * this.config.speedMultiplier,
        oscillationSpeed: 0.02 + Math.random() * 0.03,
        oscillationDistance: 1 + Math.random() * 2,
        oscillationAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.03 + Math.random() * 0.04,
        color: shades[Math.floor(Math.random() * shades.length)],
        opacity: 0.45 + Math.random() * 0.45
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createPetals();
    }, { passive: true });

    // Track mouse for gentle repulsion
    if (this.config.interactiveMouse) {
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, { passive: true });

      window.addEventListener("mouseleave", () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
    }

    // Track scroll velocity for wind gusts
    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      const delta = currentY - this.lastScrollY;
      this.scrollVelocity = Math.max(Math.min(delta * 0.15, 8), -8);
      this.lastScrollY = currentY;

      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.scrollVelocity = 0;
      }, 100);
    }, { passive: true });

    // Page visibility to pause calculation when tab is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else if (this.config.enabled) {
        this.start();
      }
    });
  }

  drawPetal(petal) {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate((petal.rotation * Math.PI) / 180);
    this.ctx.scale(Math.cos(petal.flip), 1);
    this.ctx.globalAlpha = petal.opacity;

    this.ctx.beginPath();
    // Elegant botanical curved petal shape using cubic Bézier curves
    const s = petal.size;
    this.ctx.moveTo(0, -s);
    this.ctx.bezierCurveTo(s * 0.8, -s * 0.6, s * 0.9, s * 0.5, 0, s);
    this.ctx.bezierCurveTo(-s * 0.9, s * 0.5, -s * 0.8, -s * 0.6, 0, -s);

    this.ctx.fillStyle = petal.color;
    this.ctx.fill();

    // Subtle center vein
    this.ctx.beginPath();
    this.ctx.moveTo(0, -s * 0.7);
    this.ctx.lineTo(0, s * 0.8);
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    this.ctx.lineWidth = 0.8;
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      // Vertical falling + wind & scroll gust
      p.y += p.fallSpeed + Math.abs(this.scrollVelocity * 0.3);
      p.oscillationAngle += p.oscillationSpeed;
      p.x += Math.sin(p.oscillationAngle) * p.oscillationDistance + (0.5 * this.config.windStrength) + (this.scrollVelocity * 0.2);

      // 3D rotation and tumbling
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      // Mouse repulsion physics
      if (this.config.interactiveMouse && this.mouse.x > -500) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 5;
          p.y += Math.sin(angle) * force * 5;
        }
      }

      // Recycle petals that drift beyond bounds
      if (p.y > this.height + 20) {
        p.y = -20;
        p.x = Math.random() * this.width;
      }
      if (p.x > this.width + 20) {
        p.x = -20;
      } else if (p.x < -20) {
        p.x = this.width + 20;
      }

      this.drawPetal(p);
    }

    if (!this.isPaused) {
      this.animId = requestAnimationFrame(() => this.update());
    }
  }

  start() {
    if (!this.animId && this.config.enabled) {
      this.isPaused = false;
      this.update();
    }
  }

  stop() {
    this.isPaused = true;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem("pp_petals_settings", JSON.stringify(this.config));
    } catch (e) {}

    if (this.config.enabled) {
      this.canvas.style.display = "block";
      this.createPetals();
      if (this.isPaused) this.start();
    } else {
      this.stop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.canvas.style.display = "none";
    }
  }
}

