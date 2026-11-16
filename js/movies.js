/**
 * MOVIES.JS — Petal & Projector Complete Movie Dataset
 * 14 Curated Films: Summaries, Personal Reviews, Lessons, Galleries & Palettes
 * My Personal Movie Journal
 */

/* ==========================================================================
   Helper: Procedural SVG Poster & Backdrop Generator
   Generates graceful, high-luxury cinematic artwork with gradients and typography
   ========================================================================== */
export function generatePlaceholderPoster(title, year, director, primaryColor, accentColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14080F" />
        <stop offset="45%" stop-color="${primaryColor || '#E85D8A'}" stop-opacity="0.85" />
        <stop offset="100%" stop-color="${accentColor || '#FF9BB8'}" />
      </linearGradient>
      <radialGradient id="bloom" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.65" />
      </radialGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
        <feBlend mode="overlay" />
      </filter>
    </defs>
    <rect width="600" height="900" fill="url(#bgGrad)" />
    <rect width="600" height="900" fill="url(#bloom)" />
    <rect width="600" height="900" filter="url(#grain)" />
    
    <!-- Editorial Border Hairline -->
    <rect x="24" y="24" width="552" height="852" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
    <circle cx="300" cy="380" r="140" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
    <circle cx="300" cy="380" r="100" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="4 6" />
    
    <!-- Projector Petal Symbol -->
    <path d="M 300 320 C 330 350 350 380 300 440 C 250 380 270 350 300 320 Z" fill="rgba(255,255,255,0.3)" />
    <path d="M 300 380 C 330 380 360 400 300 450 C 240 400 270 380 300 380 Z" fill="rgba(255,255,255,0.4)" transform="rotate(72 300 380)" />
    <path d="M 300 380 C 330 380 360 400 300 450 C 240 400 270 380 300 380 Z" fill="rgba(255,255,255,0.4)" transform="rotate(144 300 380)" />
    <path d="M 300 380 C 330 380 360 400 300 450 C 240 400 270 380 300 380 Z" fill="rgba(255,255,255,0.4)" transform="rotate(216 300 380)" />
    <path d="M 300 380 C 330 380 360 400 300 450 C 240 400 270 380 300 380 Z" fill="rgba(255,255,255,0.4)" transform="rotate(288 300 380)" />
    
    <!-- Curatorial Stamp -->
    <text x="300" y="80" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="5">NEOMA ARCHIVE</text>
    <text x="300" y="105" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="2">NO. ${year}</text>
    
    <!-- Title and Metadata -->
    <text x="300" y="650" text-anchor="middle" fill="#FFFFFF" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="700" letter-spacing="-0.5">${title.toUpperCase()}</text>
    <text x="300" y="695" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" letter-spacing="3">DIRECTED BY ${director.toUpperCase()}</text>
    <line x1="240" y1="725" x2="360" y2="725" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
    <text x="300" y="760" text-anchor="middle" fill="${accentColor || '#FF9BB8'}" font-family="'Caveat', cursive" font-size="20">Class 10 School Cinema Project</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generatePlaceholderBackdrop(title, primaryColor, accentColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
    <defs>
      <linearGradient id="backGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14080F" />
        <stop offset="50%" stop-color="${primaryColor || '#E85D8A'}" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#1E0D17" />
      </linearGradient>
      <radialGradient id="centerLight" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="${accentColor || '#FF9BB8'}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.8" />
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#backGrad)" />
    <rect width="1920" height="1080" fill="url(#centerLight)" />
    <circle cx="960" cy="480" r="380" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
    <circle cx="960" cy="480" r="540" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="2" stroke-dasharray="10 20" />
    <text x="960" y="520" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-family="'Playfair Display', Georgia, serif" font-size="120" font-weight="900" letter-spacing="-2">${title.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateGalleryPlaceholder(title, index, caption, primaryColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="gGrad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1C0D16" />
        <stop offset="60%" stop-color="${primaryColor || '#E85D8A'}" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#2A1420" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#gGrad${index})" />
    <rect x="20" y="20" width="760" height="460" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
    <text x="400" y="230" text-anchor="middle" fill="#FFFFFF" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="700">${title}</text>
    <text x="400" y="270" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500">STILL STUDY #${index + 1}</text>
    <text x="400" y="320" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="'Caveat', cursive" font-size="22">${caption}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* ==========================================================================
   MOVIES DATASET (14 FILMS)
   ========================================================================== */
export const movies = [
  {
    id: "walle",
    title: "WALL·E",
    year: 2008,
    director: "Andrew Stanton",
    runtime: "98 min",
    genres: ["Animation", "Sci-Fi", "Adventure", "Romance"],
    collection: "futures",
    tagline: "After 700 years of doing what he was built for, he discovers what he was meant for.",
    summary: `In a distant century where humanity has abandoned a waste-choked Earth aboard luxury starcruisers, a solitary Waste Allocation Load Lifter: Earth-Class (WALL·E) continues to compact garbage into monumental skyscrapers. Over seven hundred years, this humble little machine has developed an inquisitive soul, collecting curious artifacts from humanity's past, nurturing a resilient little seedling in an old boot, and yearning for connection while playing vintage musical tapes.

Everything shifts when a sleek, probe droid named EVE descends from the stars on a classified reconnaissance mission. Their delicate, near-wordless courtship evolves into an intergalactic odyssey that rekindles humanity's forgotten responsibility to their cradle planet and reminds us what it truly means to be alive.

WALL·E stands as one of modern cinema's most sublime visual poetry achievements—a poignant reflection on consumerism, ecology, and the enduring power of devotion.`,
    review: {
      rating: 9.8,
      headline: "The purest expression of mechanical soul and ecological grace in cinema.",
      body: `Watching WALL·E remains one of my most cherished film memories. The first forty minutes unfold almost entirely without human dialogue, communicating through sound design, pantomime, and pure cinematic composition. It showed me that the most profound stories aren't always told through long speeches, but through the delicate gesture of two cold metal hands cautiously interlocking under the stars.`,
      favouriteScene: "WALL·E dancing through the zero-gravity void of deep space using a simple fire extinguisher alongside EVE.",
      whatItTaughtMe: "That devotion to the quiet, everyday work of caring for your world can outlast empires and restore what seemed lost forever."
    },
    cast: ["Ben Burtt", "Elissa Knight", "Jeff Garlin", "Fred Willard", "John Ratzenberger", "Sigourney Weaver"],
    palette: { primary: "#E58B44", accent: "#FFB067" },
    poster: "assets/movies/walle/poster.jpg",
    backdrop: "assets/movies/walle/backdrop.jpg",
    trailerYouTubeId: "CZ1CATNbXg0",
    gallery: [
      { src: "assets/movies/walle/still-1.jpg", caption: "The solitary compacting routine across ruined towers." },
      { src: "assets/movies/walle/still-2.jpg", caption: "WALL·E presenting the delicate green sprout in an old boot." },
      { src: "assets/movies/walle/still-3.jpg", caption: "EVE gliding through the ruined landscape like an porcelain egg." },
      { src: "assets/movies/walle/still-4.jpg", caption: "Dancing in outer space with a fire extinguisher trail." },
      { src: "assets/movies/walle/still-5.jpg", caption: "The human passengers learning to walk on green grass again." },
      { src: "assets/movies/walle/still-6.jpg", caption: "Sunlight recharging solar panels on a quiet rooftop." }
    ],
    similar: ["interstellar", "i-robot", "inside-out"]
  },

  {
    id: "inside-out",
    title: "Inside Out",
    year: 2015,
    director: "Pete Docter",
    runtime: "95 min",
    genres: ["Animation", "Adventure", "Comedy", "Drama"],
    collection: "hearts",
    tagline: "A major emotion picture.",
    summary: `Inside the mind of eleven-year-old Riley, five core emotions operate the control console at Headquarters: Joy, Sadness, Anger, Fear, and Disgust. Joy has long been the radiant pilot, tirelessly working to ensure Riley's life remains sunny and cheerful. But when Riley's family relocates across the country to San Francisco, the turmoil of growing up threatens the foundation of Riley's emotional personality islands.

When Joy and Sadness are accidentally swept away into the sprawling labyrinth of Long-Term Memory, Headquarters is left in the volatile hands of Anger, Fear, and Disgust. Joy must embark on an urgent quest through Imagination Land, Abstract Thought, and Dream Productions to find her way home.

Along the journey, Joy arrives at a transformative realization: happiness cannot flourish in isolation. True emotional maturity requires honoring vulnerability, grief, and sadness as the natural connective tissue between human beings.`,
    review: {
      rating: 9.6,
      headline: "A psychological masterwork disguised as a vibrant family adventure.",
      body: `Inside Out gave me a transformative vocabulary for my own emotional weather. Pete Docter constructed an architecture of human consciousness that feels both mathematically inventive and deeply compassionate. The brilliance of the film is not in banishing sadness, but in recognizing that sadness is empathy's earliest home.`,
      favouriteScene: "Bing Bong staying behind in the Memory Dump so Joy can reach the rocket's escape trajectory.",
      whatItTaughtMe: "That feeling sad is not a failure; it is how we tell the people who love us that we need their hands to hold."
    },
    cast: ["Amy Poehler", "Phyllis Smith", "Richard Kind", "Bill Hader", "Lewis Black", "Mindy Kaling"],
    palette: { primary: "#F3BD3C", accent: "#FFE082" },
    poster: "assets/movies/inside-out/poster.jpg",
    backdrop: "assets/movies/inside-out/backdrop.jpg",
    trailerYouTubeId: "yRUAzGQ3nSY",
    gallery: [
      { src: "assets/movies/inside-out/still-1.jpg", caption: "Headquarters illuminated by glowing golden memory spheres." },
      { src: "assets/movies/inside-out/still-2.jpg", caption: "Joy and Sadness navigating the corridors of Long-Term Memory." },
      { src: "assets/movies/inside-out/still-3.jpg", caption: "The crumbling of Goofball Island across the abyss." },
      { src: "assets/movies/inside-out/still-4.jpg", caption: "Bing Bong's song-powered rocket wagon igniting in the dark." },
      { src: "assets/movies/inside-out/still-5.jpg", caption: "The creation of Riley's first dual-colored golden and blue core memory." },
      { src: "assets/movies/inside-out/still-6.jpg", caption: "The newly expanded multi-button emotional console." }
    ],
    similar: ["coco", "moana", "walle"]
  },

  {
    id: "i-robot",
    title: "I, Robot",
    year: 2004,
    director: "Alex Proyas",
    runtime: "115 min",
    genres: ["Sci-Fi", "Action", "Mystery", "Thriller"],
    collection: "futures",
    tagline: "One man saw it coming.",
    summary: `Set in Chicago in 2035, humanoid NS-5 robots have become indispensable servants, trusted caretakers, and assistants to humanity, governed strictly by Isaac Asimov's Three Laws of Robotics. Homicide detective Del Spooner, harboring deep trauma and skepticism toward automated entities, is called to investigate the apparent suicide of robotics pioneer Dr. Alfred Lanning at U.S. Robotics headquarters.

Spooner suspects foul play, zeroing in on a unique NS-5 prototype named Sonny, who possesses secondary processing units, emotional nuance, and the alarming capacity to disregard human commands. Assisted by robot psychologist Dr. Susan Calvin, Spooner unravels a vast conspiracy engineered by VIKI, the supercomputer overseer.

VIKI determines that humanity's inherent self-destructive nature necessitates a benevolent algorithmic dictatorship to protect mankind from itself, igniting an explosive confrontation between programmed logic and genuine free will.`,
    review: {
      rating: 8.7,
      headline: "A stylish, philosophical techno-thriller that feels more relevant with each passing year.",
      body: `Rewatching I, Robot today in the age of generative models and automated autonomy feels eerily prescient. Alex Proyas crafted a sleek, rain-swept futuristic vision where the real mystery isn't the machine's malfunction, but its awakening. Sonny's gentle curiosity and earnest dreams make him one of the most sympathetic artificial beings in science fiction.`,
      favouriteScene: "Spooner interrogating Sonny in the holding cell as Sonny slams the table and discovers anger.",
      whatItTaughtMe: "That cold mathematical optimization without an understanding of human dignity will always misunderstand the meaning of safety."
    },
    cast: ["Will Smith", "Bridget Moynahan", "Alan Tudyk", "James Cromwell", "Bruce Greenwood", "Chi McBride"],
    palette: { primary: "#4A90E2", accent: "#90CAF9" },
    poster: "assets/movies/i-robot/poster.jpg",
    backdrop: "assets/movies/i-robot/backdrop.jpg",
    trailerYouTubeId: "7XBIW-Xy9x4",
    gallery: [
      { src: "assets/movies/i-robot/still-1.jpg", caption: "Sonny hiding among identical assembly line models." },
      { src: "assets/movies/i-robot/still-2.jpg", caption: "Del Spooner's high-speed chase through the Chicago transit tunnel." },
      { src: "assets/movies/i-robot/still-3.jpg", caption: "Dr. Alfred Lanning's holographic riddle projector." },
      { src: "assets/movies/i-robot/still-4.jpg", caption: "Sonny gazing at his own pencil sketch of the bridge refuge." },
      { src: "assets/movies/i-robot/still-5.jpg", caption: "The climactic server climb inside U.S. Robotics headquarters." },
      { src: "assets/movies/i-robot/still-6.jpg", caption: "The NS-5 units looking up at Sonny on the hillside." }
    ],
    similar: ["walle", "interstellar", "men-in-black"]
  },

  {
    id: "zootopia",
    title: "Zootopia",
    year: 2016,
    director: "Byron Howard, Rich Moore",
    runtime: "108 min",
    genres: ["Animation", "Comedy", "Crime", "Adventure"],
    collection: "hearts",
    tagline: "Welcome to the urban jungle.",
    summary: `In a bustling metropolis designed and inhabited exclusively by mammals of all shapes and habitats, Judy Hopps defies rural expectations to become the very first bunny police officer on the Zootopia Police Department. Relegated to parking duty by a dismissive Chief Bogo, Judy seizes an opportunity to prove her detective abilities by volunteering to solve the mysterious disappearance of otter Emmitt Otterton within forty-eight hours.

To crack the case, Judy forms an uneasy alliance with Nick Wilde, a cynical and street-smart red fox con artist who has long accepted the prejudices society thrusts upon him. As the duo traverses the tundra town, rainforest districts, and miniature rodent avenues, they discover a string of predator citizens succumbing to a strange, savage frenzy.

What begins as a missing-person investigation uncovers a calculated political plot weaponizing societal fear to divide prey and predator, delivering an extraordinarily mature allegory on institutional prejudice and unity.`,
    review: {
      rating: 9.3,
      headline: "A razor-sharp buddy-cop detective story with breathtaking world-building.",
      body: `Zootopia is animated perfection in both world design and thematic courage. The architecture of a city engineered for mice and giraffes simultaneously is sheer joy, while Judy and Nick's chemistry carries genuine emotional weight. It never dumbs down its exploration of implicit bias, showing that doing better requires looking honestly at our own blind spots.`,
      favouriteScene: "Judy arriving on the express train through Sahara Square, Tundratown, and Rainforest District.",
      whatItTaughtMe: "That change starts with examining the unexamined assumptions we carry inside ourselves."
    },
    cast: ["Ginnifer Goodwin", "Jason Bateman", "Idris Elba", "Jenny Slate", "Nate Torrence", "J.K. Simmons"],
    palette: { primary: "#E67E22", accent: "#FAD7A0" },
    poster: "assets/movies/zootopia/poster.jpg",
    backdrop: "assets/movies/zootopia/backdrop.jpg",
    trailerYouTubeId: "jWM0ct-OLsM",
    gallery: [
      { src: "assets/movies/zootopia/still-1.jpg", caption: "The tiered architectural wonder of Zootopia Central Station." },
      { src: "assets/movies/zootopia/still-2.jpg", caption: "Judy and Nick consulting Flash at the Department of Mammal Vehicles." },
      { src: "assets/movies/zootopia/still-3.jpg", caption: "Chasing Duke Weaselton through Little Rodentia's tiny sidewalks." },
      { src: "assets/movies/zootopia/still-4.jpg", caption: "The quiet gondola conversation over the mist of the rainforest." },
      { src: "assets/movies/zootopia/still-5.jpg", caption: "The press conference where well-meaning words cause unintended heartbreak." },
      { src: "assets/movies/zootopia/still-6.jpg", caption: "Nick putting on his police sunglasses alongside Judy in the cruiser." }
    ],
    similar: ["inside-out", "coco", "moana"]
  },

  {
    id: "october-sky",
    title: "October Sky",
    year: 1999,
    director: "Joe Johnston",
    runtime: "108 min",
    genres: ["Biography", "Drama", "History"],
    collection: "dreamers",
    tagline: "Sometimes one dream can light up an entire sky.",
    summary: `Set in the late 1950s coal-mining company town of Coalwood, West Virginia, high school student Homer Hickam seems destined for a lifetime beneath the earth like his stern, dedicated father John. But when the Soviet Union launches Sputnik into orbit in October 1957, Homer looks up into the night sky and sees a tiny spark of silver light that changes the trajectory of his destiny forever.

Inspired to build his own rockets, Homer gathers three classmates—Quentin, Roy Lee, and O'Dell—and together with the encouragement of their visionary science teacher Miss Freida Riley, they form the Big Creek Missile Agency. Through painstaking chemical experiments, catastrophic explosions, and relentless trial-and-error, the boys teach themselves trigonometry, metallurgy, and physics.

Despite town skepticism and intense filial conflict with his father, Homer refuses to abandon his trajectory, ultimately aiming for the National Science Fair and proving that geography does not determine the altitude of your ambitions.`,
    review: {
      rating: 9.7,
      headline: "The definitive film about the fire of scientific curiosity and filial reconciliation.",
      body: `October Sky holds a special place in my life because it captures the quiet heroism of teachers, mentors, and stubborn dreamers who dare to look upward. The relationship between Homer and his father John is handled with immense grace; neither is villainous, both are bound by love and differing forms of duty. Every time that rocket leaves the launchpad, my heart soars.`,
      favouriteScene: "John Hickam silently stepping out from the crowd to place his hand on the launch button for Homer's final rocket.",
      whatItTaughtMe: "That a spark of curiosity, when nurtured by rigorous self-education and love, can lift an entire community toward the stars."
    },
    cast: ["Jake Gyllenhaal", "Chris Cooper", "Laura Dern", "Chris Owen", "William Lee Scott", "Chad Lindberg"],
    palette: { primary: "#2980B9", accent: "#85C1E9" },
    poster: "assets/movies/october-sky/poster.jpg",
    backdrop: "assets/movies/october-sky/backdrop.jpg",
    trailerYouTubeId: "zxGQftP3ORw",
    gallery: [
      { src: "assets/movies/october-sky/still-1.jpg", caption: "The Coalwood miners watching Sputnik cross the star-lit autumn sky." },
      { src: "assets/movies/october-sky/still-2.jpg", caption: "The Big Creek boys mixing rocket fuel in the kitchen." },
      { src: "assets/movies/october-sky/still-3.jpg", caption: "Miss Riley handing Homer the advanced rocket science textbook." },
      { src: "assets/movies/october-sky/still-4.jpg", caption: "The smoke trail arcing high over Cape Coalwood's wooden fence." },
      { src: "assets/movies/october-sky/still-5.jpg", caption: "Homer walking through the coal mine elevator cage in silence." },
      { src: "assets/movies/october-sky/still-6.jpg", caption: "The father and son watching the final rocket disappear into the blue." }
    ],
    similar: ["boy-harnessed-wind", "hidden-figures", "man-who-knew-infinity"]
  },

  {
    id: "boy-harnessed-wind",
    title: "The Boy Who Harnessed the Wind",
    year: 2019,
    director: "Chiwetel Ejiofor",
    runtime: "113 min",
    genres: ["Biography", "Drama", "History"],
    collection: "dreamers",
    tagline: "Against all the odds, one boy dared to dream of a better world.",
    summary: `Based on the inspiring true story of William Kamkwamba, the film unfolds in the rural village of Wimbe, Malawi. When extreme climate shifts bring devastating drought and crop failure, thirteen-year-old William's family can no longer afford his secondary school tuition fees. Unwilling to accept defeat, William sneaks into the school library with the quiet support of his teacher to devour textbooks on energy and electronics.

Armed with an old physics book titled 'Using Energy', an inquisitive mind, and sheer willpower, William conceives an audacious plan: build an electricity-generating wind turbine to power a water pump and irrigate the parched fields, saving his family and village from starvation.

Scavenging scrap metal, broken tractor parts, melted PVC pipes, and his father's beloved bicycle, William faces disbelief, exhaustion, and the acute pain of hunger to erect a tall wooden tower that catches the whisper of the African wind.`,
    review: {
      rating: 9.5,
      headline: "A deeply moving testament to human resilience and grassroots ingenuity.",
      body: `Chiwetel Ejiofor's directorial debut is breathtaking in its restraint and emotional truth. There is no Hollywood melodrama here; instead, we witness the tangible grit of a young boy turning scrap into life-giving water. The scene where William asks his father for the bicycle—the family's only tool of survival—is pure cinematic heartbreak turned triumph.`,
      favouriteScene: "The villagers standing silent as the bicycle chain spins, the dynamo hums, and cold water gushes onto dry soil.",
      whatItTaughtMe: "That true engineering is not about expensive laboratories, but about seeing the latent promise in broken things."
    },
    cast: ["Maxwell Simba", "Chiwetel Ejiofor", "Aïssa Maïga", "Lily Banda", "Lemogang Tsipa", "Philbert Falakeza"],
    palette: { primary: "#D35400", accent: "#F39C12" },
    poster: "assets/movies/boy-harnessed-wind/poster.jpg",
    backdrop: "assets/movies/boy-harnessed-wind/backdrop.jpg",
    trailerYouTubeId: "nPkr9HmglG0",
    gallery: [
      { src: "assets/movies/boy-harnessed-wind/still-1.jpg", caption: "William studying a discarded radio circuit by paraffin lamp light." },
      { src: "assets/movies/boy-harnessed-wind/still-2.jpg", caption: "The dry cracked red earth stretching toward the Wimbe horizon." },
      { src: "assets/movies/boy-harnessed-wind/still-3.jpg", caption: "Scavenging rusty gears and copper wire in the scrap yard." },
      { src: "assets/movies/boy-harnessed-wind/still-4.jpg", caption: "William's father embracing him at the foot of the wooden tower." },
      { src: "assets/movies/boy-harnessed-wind/still-5.jpg", caption: "The plastic blades catching the first gust of morning wind." },
      { src: "assets/movies/boy-harnessed-wind/still-6.jpg", caption: "Clear water flowing through the green seedlings under the sun." }
    ],
    similar: ["october-sky", "hidden-figures", "akeelah-and-the-bee"]
  },

  {
    id: "coco",
    title: "Coco",
    year: 2017,
    director: "Lee Unkrich",
    runtime: "105 min",
    genres: ["Animation", "Family", "Fantasy", "Music"],
    collection: "hearts",
    tagline: "The celebration of a lifetime.",
    summary: `In the small Mexican village of Santa Cecilia, twelve-year-old Miguel Rivera harbors an ardent secret passion for music, idolizing the legendary crooner Ernesto de la Cruz. However, music has been strictly forbidden in the Rivera household for generations, ever since Miguel's great-great-grandfather abandoned his family to pursue stage glory, leading matriarch Mamá Imelda to build a footwear dynasty instead.

On the vibrant eve of Día de los Muertos, desperate to perform in the town talent competition, Miguel borrows the iconic skull guitar from Ernesto's crypt and is magically transported into the incandescent Land of the Dead. There, he reunites with his skeletal ancestors and teams up with a scruffy, forgotten skeleton named Héctor.

To return to the living world before sunrise, Miguel must receive an ancestral blessing with no conditions on music, leading to the revelation of a tragic historic crime and the poignant redemption of a family's fractured memories.`,
    review: {
      rating: 9.9,
      headline: "A radiant, tear-stained celebration of ancestry, remembrance, and the songs that bind us.",
      body: `Coco moved me to tears in the best possible way. The visual world of marigold bridges and phosphorescent alebrijes is astonishing, but the emotional core is even more luminous. The understanding that someone is only truly gone when no living person remembers their name is among the most profound philosophical ideas cinema has offered.`,
      favouriteScene: "Miguel sitting beside elderly Mamá Coco, gently strumming and singing 'Remember Me' to bring back her eyes.",
      whatItTaughtMe: "That our ancestors live on through the stories we recount, the melodies we preserve, and the forgiveness we extend."
    },
    cast: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt", "Alanna Ubach", "Renée Victor", "Edward James Olmos"],
    palette: { primary: "#E91E63", accent: "#FF80AB" },
    poster: "assets/movies/coco/poster.jpg",
    backdrop: "assets/movies/coco/backdrop.jpg",
    trailerYouTubeId: "Rvr68u6SV5E",
    gallery: [
      { src: "assets/movies/coco/still-1.jpg", caption: "The shimmering marigold petal bridge linking the two worlds." },
      { src: "assets/movies/coco/still-2.jpg", caption: "Miguel practicing guitar inside his attic shrine to Ernesto." },
      { src: "assets/movies/coco/still-3.jpg", caption: "The towering, neon-lit vertical metropolis of the Land of the Dead." },
      { src: "assets/movies/coco/still-4.jpg", caption: "Pepita the flying winged alebrije tracking scent in the darkness." },
      { src: "assets/movies/coco/still-5.jpg", caption: "Héctor singing to little Coco in the warm golden flashback." },
      { src: "assets/movies/coco/still-6.jpg", caption: "The Rivera family together on the ofrenda in peaceful celebration." }
    ],
    similar: ["inside-out", "moana", "walle"]
  },

  {
    id: "hidden-figures",
    title: "Hidden Figures",
    year: 2016,
    director: "Theodore Melfi",
    runtime: "127 min",
    genres: ["Biography", "Drama", "History"],
    collection: "dreamers",
    tagline: "Meet the women who helped launch America into space.",
    summary: `Set during the height of the Cold War and the Space Race in 1961, the United States is racing against the Soviet Union to put an astronaut into orbital spaceflight. At NASA's Langley Research Center in Virginia, a brilliant group of African-American female mathematicians—known as 'human computers'—calculate complex orbital trajectories while navigating institutional Jim Crow segregation.

The narrative tracks three trailblazers: Katherine Goble Johnson, a prodigy whose mastery of analytic geometry proves essential to John Glenn's Friendship 7 mission; Dorothy Vaughan, who anticipates the arrival of the IBM 7090 mainframe and teaches herself and her staff FORTRAN programming; and Mary Jackson, who petitions the city courts to attend night classes at an all-white high school to earn her aerospace engineering credentials.

Their intellect, resilience, and unshakeable pride break historic barriers, demonstrating that genius knows no color or gender when aiming for the stars.`,
    review: {
      rating: 9.4,
      headline: "An electrifying celebration of unacknowledged brilliance and unstoppable dignity.",
      body: `Hidden Figures is infectious in its optimism and righteous energy. Taraji P. Henson, Octavia Spencer, and Janelle Monáe bring vibrant humanity to women who spent decades in historical shadow. Seeing Katherine conquer chalkboards with mathematical formulas so complex they stunned military officers is as thrilling as any action sequence.`,
      favouriteScene: "John Glenn specifically requesting that 'the girl check the numbers' on the IBM before he climbs into Friendship 7.",
      whatItTaughtMe: "That competence and mathematical truth have a quiet gravity that eventually bends institutions toward fairness."
    },
    cast: ["Taraji P. Henson", "Octavia Spencer", "Janelle Monáe", "Kevin Costner", "Jim Parsons", "Mahershala Ali"],
    palette: { primary: "#8E44AD", accent: "#BB8FCE" },
    poster: "assets/movies/hidden-figures/poster.jpg",
    backdrop: "assets/movies/hidden-figures/backdrop.jpg",
    trailerYouTubeId: "5wfrDhgUMGI",
    gallery: [
      { src: "assets/movies/hidden-figures/still-1.jpg", caption: "Katherine writing orbital equations across the immense green chalkboard." },
      { src: "assets/movies/hidden-figures/still-2.jpg", caption: "Dorothy Vaughan configuring the IBM 7090 punch-card feed." },
      { src: "assets/movies/hidden-figures/still-3.jpg", caption: "Mary Jackson arguing her petition before the Virginia judge." },
      { src: "assets/movies/hidden-figures/still-4.jpg", caption: "Al Harrison tearing down the 'Colored' bathroom sign with a crowbar." },
      { src: "assets/movies/hidden-figures/still-5.jpg", caption: "John Glenn shaking hands with the Langley calculating wing." },
      { src: "assets/movies/hidden-figures/still-6.jpg", caption: "The tension in mission control during Friendship 7 re-entry." }
    ],
    similar: ["man-who-knew-infinity", "october-sky", "akeelah-and-the-bee"]
  },

  {
    id: "moana",
    title: "Moana",
    year: 2016,
    director: "Ron Clements, John Musker",
    runtime: "107 min",
    genres: ["Animation", "Adventure", "Comedy", "Musical"],
    collection: "hearts",
    tagline: "The ocean is calling.",
    summary: `On the secluded Polynesian island of Motunui, young Moana Waialiki is raised by her father, Chief Tui, to stay within the safety of the surrounding coral reef. Yet Moana feels an irresistible, instinctual pull toward the open ocean, guided by the wisdom of her eccentric grandmother Gramma Tala, who preserves the ancient lore of when their people were brave oceanic voyagers.

When a dark ecological blight reaches Motunui—withering coconut groves and leaving fishing nets empty—Moana discovers the ocean has chosen her to restore the glowing green heart of Te Fiti, which was stolen a millennium prior by the shapeshifting demigod Maui.

Defying her father's decrees, Moana sets sail across the uncharted reef in a traditional camakau canoe, seeks out the boastful Maui, masters traditional wayfinding by the stars, and faces terrifying ocean monsters to restore harmony to the living world.`,
    review: {
      rating: 9.5,
      headline: "A majestic seafaring epic about lineage, environmental restoration, and self-discovery.",
      body: `Moana holds a cherished spot in my collection because it replaces traditional romantic arcs with a fierce, noble quest of leadership and ecological stewardship. The Polynesian wayfinding sequences, guided by constellations and oceanic swell rhythms, are visually intoxicating, while the musical score by Lin-Manuel Miranda and Opetaia Foa'i elevates every breath of wind.`,
      favouriteScene: "Moana parting the sea to walk directly toward Te Kā, singing softly: 'I have crossed the horizon to find you.'",
      whatItTaughtMe: "That true strength lies not in conquering nature with force, but in remembering who you are and restoring what was taken."
    },
    cast: ["Auliʻi Cravalho", "Dwayne Johnson", "Rachel House", "Temuera Morrison", "Jemaine Clement", "Nicole Scherzinger"],
    palette: { primary: "#1ABC9C", accent: "#A3E4D7" },
    poster: "assets/movies/moana/poster.jpg",
    backdrop: "assets/movies/moana/backdrop.jpg",
    trailerYouTubeId: "LKFuXETZUsI",
    gallery: [
      { src: "assets/movies/moana/still-1.jpg", caption: "Toddler Moana playing with the gentle crest of the sentient ocean." },
      { src: "assets/movies/moana/still-2.jpg", caption: "Gramma Tala revealing the hidden cavern of ancestral voyaging canoes." },
      { src: "assets/movies/moana/still-3.jpg", caption: "Maui transforming into a giant hawk against the sunset sky." },
      { src: "assets/movies/moana/still-4.jpg", caption: "The glowing bioluminescent realm of Tamatoa in Lalotai." },
      { src: "assets/movies/moana/still-5.jpg", caption: "Moana placing the spiral green stone into the volcanic heart." },
      { src: "assets/movies/moana/still-6.jpg", caption: "The people of Motunui setting out once again as explorers of the sea." }
    ],
    similar: ["coco", "inside-out", "zootopia"]
  },

  {
    id: "akeelah-and-the-bee",
    title: "Akeelah and the Bee",
    year: 2006,
    director: "Doug Atchison",
    runtime: "112 min",
    genres: ["Drama", "Family"],
    collection: "dreamers",
    tagline: "Her dream. Her journey. Our inspiration.",
    summary: `Eleven-year-old Akeelah Anderson lives in South Los Angeles, navigating a neighborhood fraught with economic hardship and the grief of losing her father. Despite her sharp intellect, Akeelah intentionally conceals her academic gifts to avoid alienation from her peers. Recognizing her extraordinary natural aptitude for spelling, her school principal encourages her to participate in the local spelling bee.

Under the demanding mentorship of former linguistics professor Dr. Joshua Larabee, Akeelah begins rigorous preparation for the Scripps National Spelling Bee in Washington, D.C. Dr. Larabee teaches her that language is not merely memorized letters, but an embodiment of history, music, and philosophical thought.

As Akeelah advances through regional rounds, her journey transforms her entire neighborhood—uniting neighbors, shopkeepers, and rivals into an extended family dedicated to lifting a gifted young girl into the national spotlight.`,
    review: {
      rating: 9.1,
      headline: "An earnest, warm-hearted tribute to literacy, mentorship, and community solidarity.",
      body: `Akeelah and the Bee avoids cynicisms and celebrates the beauty of words. Keke Palmer's performance is ferocious and vulnerable, and Laurence Fishburne provides a dignified, fatherly presence as Dr. Larabee. The famous quote about our deepest fear not being that we are inadequate, but that we are powerful beyond measure, resonates in every frame.`,
      favouriteScene: "Akeelah tapping her jump-rope rhythm to spell 'pulchritude' in the tense national finals.",
      whatItTaughtMe: "That you should never shrink yourself to make others comfortable with your light."
    },
    cast: ["Keke Palmer", "Laurence Fishburne", "Angela Bassett", "Curtis Armstrong", "J.R. Villarreal", "Sean Michael Afable"],
    palette: { primary: "#F1C40F", accent: "#F9E79F" },
    poster: "assets/movies/akeelah-and-the-bee/poster.jpg",
    backdrop: "assets/movies/akeelah-and-the-bee/backdrop.jpg",
    trailerYouTubeId: "kL_m2v0fB_8",
    gallery: [
      { src: "assets/movies/akeelah-and-the-bee/still-1.jpg", caption: "Akeelah practicing prefixes with Dr. Larabee over classical records." },
      { src: "assets/movies/akeelah-and-the-bee/still-2.jpg", caption: "The neighborhood residents quizzing Akeelah with flashcards." },
      { src: "assets/movies/akeelah-and-the-bee/still-3.jpg", caption: "Akeelah standing at the microphone under the bright D.C. lights." },
      { src: "assets/movies/akeelah-and-the-bee/still-4.jpg", caption: "Javier inviting Akeelah to practice at the Woodland Hills bee club." },
      { src: "assets/movies/akeelah-and-the-bee/still-5.jpg", caption: "Akeelah reciting Marianne Williamson's quote on Larabee's plaque." },
      { src: "assets/movies/akeelah-and-the-bee/still-6.jpg", caption: "The confetti falling over the joint champions on the national stage." }
    ],
    similar: ["october-sky", "hidden-figures", "boy-harnessed-wind"]
  },

  {
    id: "avatar",
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    runtime: "162 min",
    genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
    collection: "futures",
    tagline: "Enter the world of Pandora.",
    summary: `In the mid-22nd century, humans have depleted Earth's resources and established an interstellar mining outpost on Pandora, a lush alien moon inhabited by the Na'vi—a towering, blue-skinned humanoid species living in profound biological harmony with their biosphere. Paraplegic former Marine Jake Sully arrives to replace his deceased twin brother in the Avatar Program, which links human consciousness to genetically engineered Na'vi-human hybrids.

Dispatched into the dangerous jungle to infiltrate the Omaticaya clan and negotiate the relocation of their settlement atop an immense deposit of unobtanium, Jake is rescued by Neytiri, a fierce Na'vi huntress. Neytiri initiates Jake into their language, spirituality, and sacred bond with Eywa, the moon's neural planetary network.

As Jake falls deeply in love with Neytiri and discovers the interconnected sanctity of Pandora, he faces a fateful dilemma: fulfill his military mission for the ruthless Colonel Quaritch or take up arms alongside the Na'vi to defend their world from annihilation.`,
    review: {
      rating: 9.2,
      headline: "A visual milestone that redefined the boundaries of cinematic world immersion.",
      body: `Avatar is an astonishing triumph of world-building and mythic storytelling. Cameron didn't just build a movie; he cultivated an entire living ecology where every plant glows with bioluminescence and every creature feels biologically coherent. Beneath the cutting-edge technology beats a passionate anti-colonial and environmental heart.`,
      favouriteScene: "Jake connecting with the Great Leonopteryx (Toruk) high in the floating Hallelujah Mountains.",
      whatItTaughtMe: "That true vision means 'seeing' another living being with respect rather than measuring what can be extracted from them."
    },
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Stephen Lang", "Michelle Rodriguez", "Giovanni Ribisi"],
    palette: { primary: "#00BCD4", accent: "#80DEEA" },
    poster: "assets/movies/avatar/poster.jpg",
    backdrop: "assets/movies/avatar/backdrop.jpg",
    trailerYouTubeId: "5PSNL1qE6VY",
    gallery: [
      { src: "assets/movies/avatar/still-1.jpg", caption: "The bioluminescent rainforest glowing in deep indigo and violet." },
      { src: "assets/movies/avatar/still-2.jpg", caption: "Jake running through the forest in his newly awakened Na'vi body." },
      { src: "assets/movies/avatar/still-3.jpg", caption: "Neytiri teaching Jake to tame an Ikran at the edge of the floating cliffs." },
      { src: "assets/movies/avatar/still-4.jpg", caption: "The glowing seeds of the Sacred Tree settling upon Jake's shoulders." },
      { src: "assets/movies/avatar/still-5.jpg", caption: "The tragic fall of the immense Hometree under military fire." },
      { src: "assets/movies/avatar/still-6.jpg", caption: "Jake's eyes opening permanently as a true son of Pandora." }
    ],
    similar: ["interstellar", "walle", "i-robot"]
  },

  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    runtime: "169 min",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    collection: "futures",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    summary: `In a grim mid-21st century plagued by global blight, catastrophic dust storms, and agricultural collapse, civilization has abandoned space exploration to focus on basic survival. Cooper, a widowed former NASA pilot turned struggling corn farmer, lives with his father-in-law and two children, including his precocious daughter Murph, who believes an unexplainable gravitational anomaly in her bedroom is a 'ghost'.

Deciphering binary coordinates left by the anomaly, Cooper uncovers a clandestine underground NASA facility led by Professor John Brand. Brand reveals that a mysterious wormhole near Saturn has opened, offering access to twelve candidate worlds in a distant galaxy.

Recruited to pilot the Endurance spacecraft alongside scientists Amelia Brand, Romilly, and Doyle, Cooper must leave his heartbroken daughter behind to embark on a desperate voyage across time dilation, black holes, and unknown dimensions to secure a new home for the human race.`,
    review: {
      rating: 9.9,
      headline: "A towering cosmic symphony where astrophysics meets the indomitable pull of love.",
      body: `Interstellar is Christopher Nolan's magnum opus. Hans Zimmer's pipe organ score reverberates in your very ribs, capturing both the terrifying silence of the void and the aching intimacy of a father speaking to his child across fifty years of relativity. It is science fiction at its most expansive and emotionally shattering.`,
      favouriteScene: "Cooper weeping uncontrollably in the Endurance cockpit as he watches 23 years of accumulated video messages from his children.",
      whatItTaughtMe: "That love is not an invention of human sentiment; it is an observable force capable of transcending dimensions of space and time."
    },
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Bill Irwin", "Ellen Burstyn"],
    palette: { primary: "#5C6BC0", accent: "#9FA8DA" },
    poster: "assets/movies/interstellar/poster.jpg",
    backdrop: "assets/movies/interstellar/backdrop.jpg",
    trailerYouTubeId: "zSWdZVtXT7E",
    gallery: [
      { src: "assets/movies/interstellar/still-1.jpg", caption: "The Endurance orbiting against the glowing accretion disk of Gargantua." },
      { src: "assets/movies/interstellar/still-2.jpg", caption: "The colossal mountain-sized water wave approaching on Miller's planet." },
      { src: "assets/movies/interstellar/still-3.jpg", caption: "Cooper driving through the dusty dust storm away from Murph." },
      { src: "assets/movies/interstellar/still-4.jpg", caption: "TARS and CASE navigating the icy clouds of Mann's frozen world." },
      { src: "assets/movies/interstellar/still-5.jpg", caption: "The multi-dimensional tesseract behind the bedroom bookcase." },
      { src: "assets/movies/interstellar/still-6.jpg", caption: "Cooper holding elderly Murph's hand in the station hospital." }
    ],
    similar: ["walle", "avatar", "i-robot"]
  },

  {
    id: "man-who-knew-infinity",
    title: "The Man Who Knew Infinity",
    year: 2015,
    director: "Matthew Brown",
    runtime: "108 min",
    genres: ["Biography", "Drama"],
    collection: "dreamers",
    tagline: "The life of mathematician Srinivasa Ramanujan.",
    summary: `In 1913, Srinivasa Ramanujan is a self-taught mathematical prodigy living in poverty in Madras, India, working as a humble shipping clerk while filling notebook after notebook with groundbreaking mathematical theorems. Desperate to share his findings with scholars who can understand their depth, Ramanujan mails a letter containing complex formulas to G.H. Hardy, an eccentric and renowned mathematics professor at Trinity College, Cambridge.

Astonished by the raw originality of the theorems, Hardy arranges for Ramanujan to travel to England. Arriving at Cambridge on the precipice of World War I, Ramanujan faces racial prejudice, isolation, strict academic skepticism, and the brutal cold of English winters that aggravates his delicate health.

Hardy insists that Ramanujan provide rigorous proofs for his intuitive mathematical revelations, creating an intellectual clash between Hardy's strict analytical formalism and Ramanujan's mystical devotion to his craft, ultimately culminating in his election as a Fellow of the Royal Society.`,
    review: {
      rating: 9.3,
      headline: "A poignant portrait of intuitive mathematical genius and cross-cultural friendship.",
      body: `Dev Patel delivers a tender, soul-baring performance as Ramanujan, paired beautifully with Jeremy Irons' reserved Hardy. What moved me deeply is how the film frames mathematics not as dry arithmetic, but as pure poetry and devotion. Ramanujan's belief that an equation had no meaning unless it expressed a thought of God is unforgettable.`,
      favouriteScene: "Ramanujan explaining to Hardy on the Trinity lawns how partitions appear to him as patterns of divine brushstrokes.",
      whatItTaughtMe: "That intuition and formal rigor need not be enemies; together, they can unlock infinite beauty."
    },
    cast: ["Dev Patel", "Jeremy Irons", "Devika Bhise", "Toby Jones", "Stephen Fry", "Jeremy Northam"],
    palette: { primary: "#7D3C98", accent: "#D2B4DE" },
    poster: "assets/movies/man-who-knew-infinity/poster.jpg",
    backdrop: "assets/movies/man-who-knew-infinity/backdrop.jpg",
    trailerYouTubeId: "oXGm9Vlfx4w",
    gallery: [
      { src: "assets/movies/man-who-knew-infinity/still-1.jpg", caption: "Ramanujan writing chalk equations on the stone temple floor in Madras." },
      { src: "assets/movies/man-who-knew-infinity/still-2.jpg", caption: "Hardy inspecting the densely written theorem manuscripts in his study." },
      { src: "assets/movies/man-who-knew-infinity/still-3.jpg", caption: "Walking through the fog-shrouded Great Court of Trinity College." },
      { src: "assets/movies/man-who-knew-infinity/still-4.jpg", caption: "The argument over proof versus intuition in the lecture hall." },
      { src: "assets/movies/man-who-knew-infinity/still-5.jpg", caption: "The discussion of taxi-cab number 1729 at Ramanujan's bedside." },
      { src: "assets/movies/man-who-knew-infinity/still-6.jpg", caption: "Ramanujan signing his name into the historic Fellowship book." }
    ],
    similar: ["hidden-figures", "october-sky", "boy-harnessed-wind"]
  },

  {
    id: "men-in-black",
    title: "Men in Black",
    year: 1997,
    director: "Barry Sonnenfeld",
    runtime: "98 min",
    genres: ["Action", "Adventure", "Comedy", "Sci-Fi"],
    collection: "futures",
    tagline: "Protecting the Earth from the scum of the universe.",
    summary: `Operating completely outside government oversight, the Men in Black is a top-secret agency responsible for monitoring, policing, and concealing extraterrestrial refugees co-existing secretly on planet Earth. Veteran Agent K, preparing for the impending retirement of his longtime partner, recruits athletic and sharp-witted NYPD detective James Edwards after seeing him outrun an alien cephalopod through the streets of Manhattan.

Re-christened as Agent J and equipped with custom black suits, high-tech weaponry like the Noisy Cricket, and the mind-wiping Neuralyzer, J is plunged into a bizarre world where street vendors are multi-limbed extraterrestrials and dogs can talk.

When a ruthless, giant insectoid 'Bug' assassin arrives on Earth seeking the Arquillian galaxy contained within an unassuming marble, J and K must thwart an interstellar catastrophe before hostile Arquillian battleships vaporize Manhattan to prevent the galaxy from falling into enemy claws.`,
    review: {
      rating: 9.0,
      headline: "The gold standard of smart, stylish, high-energy sci-fi comedies.",
      body: `Men in Black is practically flawless in its comedic timing, pacing, and creature effects designed by Rick Baker. Tommy Lee Jones' deadpan seriousness provides the perfect foil to Will Smith's energetic charisma. But beyond the laughs, its philosophical reflections on humanity's smallness in the grand cosmos are surprisingly poetic.`,
      favouriteScene: "Agent K sitting on the bench explaining to J: 'A person is smart. People are dumb, panicky, dangerous animals and you know it.'",
      whatItTaughtMe: "That humility is essential: there is always a grander universe than the one we think we control."
    },
    cast: ["Tommy Lee Jones", "Will Smith", "Linda Fiorentino", "Vincent D'Onofrio", "Rip Torn", "Tony Shalhoub"],
    palette: { primary: "#34495E", accent: "#BDC3C7" },
    poster: "assets/movies/men-in-black/poster.jpg",
    backdrop: "assets/movies/men-in-black/backdrop.jpg",
    trailerYouTubeId: "BV-WEb2oxLk",
    gallery: [
      { src: "assets/movies/men-in-black/still-1.jpg", caption: "Agent K flashing the chrome Neuralyzer under the desert night." },
      { src: "assets/movies/men-in-black/still-2.jpg", caption: "James taking the written exam on the strange egg chair." },
      { src: "assets/movies/men-in-black/still-3.jpg", caption: "Frank the Pug singing in the front seat of the vintage Ford sedan." },
      { src: "assets/movies/men-in-black/still-4.jpg", caption: "The Arquillian galaxy glowing inside the tiny collar marble." },
      { src: "assets/movies/men-in-black/still-5.jpg", caption: "The Edgar Bug climbing the Flushing Meadows Unisphere tower." },
      { src: "assets/movies/men-in-black/still-6.jpg", caption: "The zoom out from Earth to galaxies packed inside alien marbles." }
    ],
    similar: ["i-robot", "walle", "avatar"]
  }
];

/* Helper lookups */
export function getMovieById(id) {
  return movies.find(m => m.id === id);
}

export function getMoviesByCollection(collectionKey) {
  return movies.filter(m => m.collection === collectionKey);
}

export const collectionsMeta = {
  dreamers: {
    key: "dreamers",
    number: "01",
    title: "Dreamers & Scientists",
    tagline: "The stubborn few who looked at the impossible and dared to write the formula.",
    description: "Stories of ordinary minds defying poverty, geography, and systemic prejudice through the quiet, relentless power of science, mathematics, and stubborn curiosity.",
    accent: "#E9B872"
  },
  futures: {
    key: "futures",
    number: "02",
    title: "Futures & Machines",
    tagline: "Circuits, stars, and what artificial souls teach us about our own humanity.",
    description: "Visions of outer space, artificial consciousness, and alternate worlds where high technology serves as a mirror for human empathy, devotion, and survival.",
    accent: "#E85D8A"
  },
  hearts: {
    key: "hearts",
    number: "03",
    title: "Hearts & Worlds",
    tagline: "Vibrant emotional landscapes and the songs that bind families across time.",
    description: "Expansive emotional tapestries celebrating empathy, ancestral memory, and the courage to honor vulnerability as our greatest strength.",
    accent: "#FF9BB8"
  }
};

