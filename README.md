# Neoma — Class 10 Cinema Monograph
*Created for a Class 10 school project by Supriya*
*Built with pure HTML5, modern CSS custom properties, and vanilla ES modules (No frameworks, no build step)*

---

## 1. Quick Start / How to Run

Because this site is built purely in standard HTML, CSS, and vanilla ES modules with relative paths, you can run it with any static local web server:

### Option A: Using Python (Pre-installed on most systems)
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option B: Using Node / npx
```bash
npx serve .
# or
npx live-server
```

### Option C: VS Code Live Server
Right-click on `index.html` and choose **"Open with Live Server"**.

### Deploying to Production:
- **GitHub Pages**: Push this repository to GitHub and enable GitHub Pages on `main` branch.
- **Netlify / Vercel**: Drag and drop the folder into the Netlify dashboard or link the repository with zero build configuration.

---

## 2. Architecture & File Structure

```
/
├── index.html            Landing page (Preloader, Hero, Word-Scrub Intro, Marquee, Pinned Featured, Stats)
├── films.html            Complete 14-Film Monograph Archive (GSAP Flip filters, Grid/List/Timeline)
├── movie.html?id=xxx     Dynamic Single Film Template (Side-nav, Summary, Speech Narration, Stills, Trailer)
├── about.html            Editorial Story of Supriya's Class 10 Project, Milestones, Technology
├── settings.html         Live Control Center (6 Themes, Custom Palette Generator, Motion, Petals, Dyslexia Font)
│
├── css/
│   ├── tokens.css        Design tokens, fluid typography clamp(), spacing, shadows, radii
│   ├── base.css          Resets, custom cursor, SVG film grain, canvas layer, accessibility
│   ├── components.css    Header, footer, buttons, film cards, floating audio dock, narrator bar, lightbox
│   ├── pages.css         Page-specific layouts: hero, archive grid, movie detail, collections, settings
│   └── themes.css        6 themes (Blush, Midnight Rose, Sakura, Rose Gold, Lavender Dusk, Peach Cream, Cinema Noir)
│
├── js/
│   ├── main.js           Core orchestrator, Lenis smooth scrolling, GSAP ticker sync, shared chrome
│   ├── movies.js         Complete 14-film dataset, procedural SVG gradient poster/backdrop generators
│   ├── petals.js         DPR-aware canvas 2D falling sakura physics engine with wind and mouse repulsion
│   ├── audio.js          Cross-page ambient music player, visualizer equalizer, smart ducking, Web Audio synth
│   ├── narrator.js       Web Speech API controller with sentence chunking, word highlight & Chrome keep-alive
│   ├── settings.js       Live settings engine, token regeneration, export/import JSON, instant preview
│   └── transitions.js    Curtain page transitions + View Transitions API integration
│
├── assets/
│   ├── audio/            Audio assets and guidelines README
│   ├── movies/           Folder structure for custom film posters, backdrops, and stills
│   └── img/              Site icons and image assets
│
├── DESIGN_NOTES.md       Art direction, typography pairings, color tokens, and motion principles
└── README.md             Complete documentation and extension guide
```

---

## 3. How to Add a New Film (Step-by-Step)

All film entries are data-driven. To add a 15th film:

1. Open `js/movies.js`.
2. Scroll to the `movies` array and append a new movie object:

```javascript
{
  id: "dead-poets-society",
  title: "Dead Poets Society",
  year: 1989,
  director: "Peter Weir",
  runtime: "128 min",
  genres: ["Drama", "Comedy"],
  collection: "dreamers", // "dreamers" | "futures" | "hearts"
  tagline: "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
  summary: `At the conservative Welton Academy in 1959, an unorthodox English teacher named John Keating inspires his students to look at poetry not as rigid academic metrics, but as a passionate pursuit of passion and individual voice...`,
  review: {
    rating: 9.7,
    headline: "An impassioned battle cry for intellectual freedom and the power of words.",
    body: `Keating standing upon his desk to remind himself that we must constantly look at things in a different way transformed how I think about education...`,
    favouriteScene: "The boys standing on their desks one by one: 'O Captain! My Captain!'",
    whatItTaughtMe: "That words and ideas have the power to change the world when spoken with conviction."
  },
  cast: ["Robin Williams", "Robert Sean Leonard", "Ethan Hawke", "Josh Charles"],
  palette: { primary: "#C0392B", accent: "#E6B0AA" },
  poster: "assets/movies/dead-poets-society/poster.jpg",
  backdrop: "assets/movies/dead-poets-society/backdrop.jpg",
  trailerYouTubeId: "4lj185DaZ_o",
  gallery: [
    { src: "assets/movies/dead-poets-society/still-1.jpg", caption: "Keating whispering carpe diem in the trophy hall." },
    { src: "assets/movies/dead-poets-society/still-2.jpg", caption: "The cave meetings of the Dead Poets Society." }
  ],
  similar: ["october-sky", "akeelah-and-the-bee", "man-who-knew-infinity"]
}
```
3. That's it! The film will immediately appear in the **Film Archive (`films.html`)**, will be searchable and filterable by genre, and will automatically generate its dedicated single page at `movie.html?id=dead-poets-society`.

---

## 4. How to Swap Images, Audio, and Trailers

### Replacing Movie Images:
- By default, the site uses an elegant, procedural SVG gradient generator with typography so the journal is completely functional and visually stunning without missing image icons.
- To use your own stills or posters:
  1. Create a folder: `assets/movies/<film-id>/` (e.g. `assets/movies/walle/`).
  2. Save your images as:
     - `assets/movies/<film-id>/poster.jpg` (2:3 aspect ratio)
     - `assets/movies/<film-id>/backdrop.jpg` (16:9 aspect ratio)
     - `assets/movies/<film-id>/still-1.jpg`, `still-2.jpg`, etc.

### Adding Real Audio Files:
- The site includes a procedural Web Audio API ambient synthesizer that generates calming harmonic chime chords automatically.
- To play your own music tracks:
  1. Add royalty-free MP3 files into `assets/audio/`:
     - `assets/audio/track-1-cherry-blossom-reverie.mp3`
     - `assets/audio/track-2-celestial-projector.mp3`
     - `assets/audio/track-3-memories-in-velvet.mp3`
  2. You can also edit the tracklist in `js/audio.js` inside the `this.playlist` array.

### Updating YouTube Trailers:
- In `js/movies.js`, change `trailerYouTubeId` to any official YouTube video ID (the 11 characters after `v=` in a YouTube link).
- The player uses `youtube-nocookie.com` for maximum visitor privacy and automatically ducks background ambient audio while playing!

---

## 5. How to Add a New Theme

1. Open `css/themes.css`.
2. Add your new theme selector:

```css
[data-theme="emerald-mist"] {
  --bg: #F4FAF7;
  --bg-subtle: #ECF5F1;
  --surface: #FFFFFF;
  --surface-card: rgba(255, 255, 255, 0.85);
  --ink: #10281F;
  --ink-muted: #3D6B59;
  --ink-faint: #7BA594;
  --primary: #2ECC71;
  --accent: #A3E4D7;
  --deep: #1E8449;
  --gold: #F1C40F;
  --border: rgba(46, 204, 113, 0.2);
}
```
3. In `settings.html`, add a button swatch with `data-theme-val="emerald-mist"`. The settings engine will apply it live!

---

## 6. Accessibility & Performance Benchmarks

- **WCAG AA Compliance**: All text tokens exceed 4.5:1 contrast ratios in light and dark modes. High-contrast toggle available.
- **Screen Reader Support**: Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`), ARIA live regions for filtered results and speech narrator.
- **Motion Reduction**: `prefers-reduced-motion` strictly honored; disables Lenis inertial scrolling, curtain wipes, and falling petals when requested.
- **Performance**: Zero external render-blocking scripts; Google Fonts loaded with `display=swap`; zero build step or heavy framework hydration costs.

