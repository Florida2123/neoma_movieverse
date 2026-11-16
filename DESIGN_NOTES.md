# DESIGN_NOTES.md — Neoma
*A Class 10 School Cinema Monograph by Supriya*
*Visual Direction, Typography, Token System, Motion Architecture & Page Map*

---

## 1. Aesthetic Direction: Soft-Luxury Editorial Cinema

### Concept
"Petal & Projector" bridges the warmth of vintage Japanese film aesthetics, delicate botanical poetry (falling sakura petals, blush tones, soft textures), and high-end editorial typography seen in award-winning digital culture archives (Awwwards / FWA standard).

### Principles
1. **Never Bubblegum**: The palette is grounded in deep velvet plums (`#2A1420`), muted blush silks, dusty roses, and luminous champagne golds (`#E9B872`). It feels like holding a heavy linen-bound cinema monograph.
2. **Atmospheric Depth**:
   - Subtle procedural film grain overlay (SVG fractal noise at 4.5% opacity) to eliminate digital flatness.
   - Soft, frosted glass cards (`backdrop-filter: blur(20px) saturate(180%)`) with 1px hairline borders (`rgba(232, 93, 138, 0.16)`).
   - Generous breathing room (80px–160px section spacing) adhering to a strict 8px harmonic grid.
3. **Tactile Micro-interactions**:
   - Fluid magnetic attraction on primary calls to action.
   - Dual-state custom cursor (smooth lagging ring with magnetic snapping and dynamic labels like "View", "Drag", "Play", "Listen").
   - 3D card tilt with a delicate specular sheen that tracks the cursor angle.
4. **Cinematic Immersion**:
   - Interactive falling petals with 3D rotational oscillation, mouse-avoidance physics, and scroll-velocity wind gusts.
   - Ambient soundscape player with responsive equalizer bars, cross-page persistence, and intelligent audio ducking during speech narration and trailer playback.

---

## 2. Typography System

### Type Pairings
- **Display Serif**: `Playfair Display` & `Fraunces` (High-contrast, elegant brackets, dramatic italics, tight tracking `-0.03em`).
- **Body & Interface**: `Plus Jakarta Sans` (Crisp, warm, highly legible geometric grotesk with excellent x-height).
- **Handwritten Annotation**: `Caveat` (Editorial marginalia, personal notes from the curator, authentic curatorial feel).
- **Monospace Accent**: `JetBrains Mono` / System Mono (Meta chips, timecodes, indices `01/14`, aspect ratios).

### Fluid Type Scale (CSS `clamp()`)
- `--font-hero`: `clamp(3.2rem, 9vw, 8.5rem)` — Hero editorial titles
- `--font-h1`: `clamp(2.4rem, 5vw, 4.8rem)` — Page titles & featured film headers
- `--font-h2`: `clamp(1.75rem, 3.5vw, 3rem)` — Section titles & editorial pull quotes
- `--font-h3`: `clamp(1.25rem, 2.2vw, 1.85rem)` — Film cards & collection headers
- `--font-body-lg`: `clamp(1.1rem, 1.3vw, 1.35rem)` — Lead introductions, summaries
- `--font-body`: `clamp(0.95rem, 1.05vw, 1.05rem)` — Standard body reading copy
- `--font-caption`: `clamp(0.75rem, 0.85vw, 0.85rem)` — Meta labels, tags, stamps
- `--font-hand`: `clamp(1.2rem, 1.6vw, 1.6rem)` — Handwritten curatorial notes

---

## 3. Color Tokens & Theme Architecture

The system supports 6 curated editorial themes plus a real-time custom theme engine via CSS Custom Properties.

```
                    ┌─────────────────────────┐
                    │    :root Color Tokens   │
                    └────────────┬────────────┘
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
    [Light Themes]          [Dark Themes]          [Custom Theme]
    • Blush (Default)       • Midnight Rose        • User HSL/Hex
    • Sakura                • Cinema Noir Pink       regenerated live
    • Rose Gold             • Lavender Dusk
    • Peach Cream
```

### 1. Blush (Default Light)
- `--bg`: `#FFF5F7` (Silky warm porcelain with a faint rose flush)
- `--surface`: `#FFFFFF`
- `--surface-card`: `rgba(255, 255, 255, 0.82)`
- `--surface-hover`: `rgba(255, 245, 248, 0.95)`
- `--ink`: `#2A1420` (Deep wine plum, never harsh black)
- `--ink-muted`: `#6D4F61`
- `--ink-faint`: `#A7899B`
- `--primary`: `#E85D8A` (Vibrant editorial rose)
- `--primary-soft`: `#FCE4EC`
- `--accent`: `#FF9BB8`
- `--deep`: `#8E2C57`
- `--gold`: `#E9B872` (Subtle warm highlight for ratings & awards)
- `--border`: `rgba(232, 93, 138, 0.16)`

### 2. Midnight Rose (Dark / OLED Friendly)
- `--bg`: `#14080F` (Deep velvet midnight)
- `--surface`: `#1E0D17`
- `--surface-card`: `rgba(32, 14, 25, 0.78)`
- `--surface-hover`: `rgba(48, 20, 36, 0.9)`
- `--ink`: `#FDEFF3`
- `--ink-muted`: `#CFAFC0`
- `--ink-faint`: `#80566F`
- `--primary`: `#F06D9A`
- `--primary-soft`: `#3A1626`
- `--accent`: `#FFAAC2`
- `--deep`: `#FF4D88`
- `--gold`: `#F5CE85`
- `--border`: `rgba(240, 109, 154, 0.2)`

### 3. Sakura (Spring Petal Wash)
- `--bg`: `#FDF7F8` · `--surface`: `#FFFFFF` · `--ink`: `#2E1823` · `--primary`: `#F48FB1` · `--accent`: `#F8BBD0` · `--deep`: `#AD1457` · `--gold`: `#F6D3B3`

### 4. Rose Gold (Warm Metallic Radiance)
- `--bg`: `#FAF5F3` · `--surface`: `#FFFFFF` · `--ink`: `#2B1D19` · `--primary`: `#D47A6A` · `--accent`: `#E8A89A` · `--deep`: `#944033` · `--gold`: `#E5B27D`

### 5. Lavender Dusk (Violet Twilight)
- `--bg`: `#F8F6FB` · `--surface`: `#FFFFFF` · `--ink`: `#24182D` · `--primary`: `#B368C4` · `--accent`: `#D7A6E6` · `--deep`: `#6D2E7C` · `--gold`: `#E8C97E`

### 6. Cinema Noir Pink (Black Velour & Hot Neon)
- `--bg`: `#0A0709` · `--surface`: `#150F14` · `--ink`: `#FFF2F6` · `--primary`: `#FF2A85` · `--accent`: `#FF66AA` · `--deep`: `#A6004B` · `--gold`: `#FFD166`

---

## 4. Motion Principles & Choreography

- **House Easing**:
  - Dramatic Reveals: `CustomEase.create("editorial", "0.65, 0, 0.35, 1")`
  - Snappy Micro: `power3.out`
  - Floating Ambience: `sine.inOut`
- **Text Splitting**: SplitType reveals with overflow hidden wrappers. Lines translate up `yPercent: 110 → 0`, staggered `0.035s`.
- **Page Transitions**: Seamless full-page curtain wipe in `--primary` with center title typographic reveal, backed by the View Transitions API when supported.
- **Scroll Syncing**: Lenis smooth scroll ticker synced directly with GSAP `ScrollTrigger.update`.
- **Accessibility & Gatekeeping**:
  - Full respect for `prefers-reduced-motion: reduce`.
  - Global Motion Mode toggle: `Full` / `Reduced` / `Off` saved to `localStorage`.

---

## 5. Site Architecture & Page Map

```
/
├── index.html            [Home: Preloader, Hero, Story scrub, Marquee, Horizontal Featured, Stats, Teasers]
├── films.html            [Archive: GSAP Flip filter system, 14 film cards, Grid/List/Timeline toggle]
├── movie.html?id=xxx     [Detail: Dynamic single template, sticky sub-nav, narration, rating petals, gallery lightbox, trailer]
├── about.html            [Editorial: Story of Supriya's Class 10 project, timeline, tech stack]
├── settings.html         [Control Center: Themes, custom color generator, typography, motion, petals, audio, speech]
│
├── css/
│   ├── base.css          [Resets, fluid typography, cursor, noise grain, layout primitives]
│   ├── tokens.css        [All CSS variables, spacing scales, shadows, radii, transitions]
│   ├── components.css    [Header, footer, buttons, cards, modal, audio player, narrator bar, lightbox]
│   ├── pages.css         [Page-specific layouts: hero, archive grid, movie detail, collections, about, settings]
│   └── themes.css        [Theme classes & overrides for 6 themes + custom overrides]
│
├── js/
│   ├── main.js           [App initializer, header/footer/cursor injection, global listeners]
│   ├── movies.js         [Complete dataset for 14 films: reviews, summaries, palettes, SVG posters]
│   ├── petals.js         [Canvas 2D falling sakura physics engine with wind & mouse interaction]
│   ├── audio.js          [Persistent ambient soundscape player, equalizer, ducking manager]
│   ├── narrator.js       [Web Speech API controller with sentence chunking & word highlighting]
│   ├── settings.js       [Live preferences engine with export/import and instant CSS updates]
│   └── transitions.js    [Curtain page transitions + View Transitions API fallback]
│
└── assets/
    ├── audio/            [Ambient track references & audio guidelines README]
    └── movies/           [Per-film asset structure: posters, backdrops, gallery placeholders]
```

---

## 6. Curated Movie Dataset (14 Films)

| ID | Title | Year | Director | Collection | Primary Accent |
|---|---|---|---|---|---|
| `walle` | WALL·E | 2008 | Andrew Stanton | Futures & Machines | `#E58B44` |
| `inside-out` | Inside Out | 2015 | Pete Docter | Hearts & Worlds | `#F3BD3C` |
| `i-robot` | I, Robot | 2004 | Alex Proyas | Futures & Machines | `#4A90E2` |
| `zootopia` | Zootopia | 2016 | Byron Howard, Rich Moore | Hearts & Worlds | `#E67E22` |
| `october-sky` | October Sky | 1999 | Joe Johnston | Dreamers & Scientists | `#3498DB` |
| `boy-harnessed-wind` | The Boy Who Harnessed the Wind | 2019 | Chiwetel Ejiofor | Dreamers & Scientists | `#D35400` |
| `coco` | Coco | 2017 | Lee Unkrich | Hearts & Worlds | `#E91E63` |
| `hidden-figures` | Hidden Figures | 2016 | Theodore Melfi | Dreamers & Scientists | `#9B59B6` |
| `moana` | Moana | 2016 | Ron Clements, John Musker | Hearts & Worlds | `#1ABC9C` |
| `akeelah-and-the-bee` | Akeelah and the Bee | 2006 | Doug Atchison | Dreamers & Scientists | `#F1C40F` |
| `avatar` | Avatar | 2009 | James Cameron | Futures & Machines | `#00BCD4` |
| `interstellar` | Interstellar | 2014 | Christopher Nolan | Futures & Machines | `#5C6BC0` |
| `man-who-knew-infinity` | The Man Who Knew Infinity | 2015 | Matthew Brown | Dreamers & Scientists | `#8E44AD` |
| `men-in-black` | Men in Black | 1997 | Barry Sonnenfeld | Futures & Machines | `#34495E` |

