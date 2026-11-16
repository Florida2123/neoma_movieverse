/**
 * AUDIO.JS — Petal & Projector Ambient Audio System
 * Persistent Cross-Page Audio Engine, Equalizer, Smart Ducking & Procedural Synthesizer
 */

export class AudioManager {
  constructor() {
    this.playlist = [
      {
        title: "Cherry Blossom Reverie",
        artist: "Ambient Lo-Fi",
        src: "assets/audio/track-1-cherry-blossom-reverie.mp3"
      },
      {
        title: "Celestial Projector",
        artist: "Deep Dream Pads",
        src: "assets/audio/track-2-celestial-projector.mp3"
      },
      {
        title: "Memories in Velvet",
        artist: "Acoustic Warmth",
        src: "assets/audio/track-3-memories-in-velvet.mp3"
      }
    ];

    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.volume = 0.45;
    this.isMuted = false;
    this.isDucked = false;
    this.uiSoundsEnabled = true;

    this.audioElement = new Audio();
    this.audioElement.preload = "none";
    this.audioElement.loop = true;

    // Web Audio Context for synthesized fallback and delicate UI sounds
    this.audioCtx = null;
    this.synthInterval = null;
    this.synthMasterGain = null;
    this.isUsingSynthesizer = false;

    this.loadState();
    this.bindAudioEvents();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
        this.synthMasterGain = this.audioCtx.createGain();
        this.synthMasterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.synthMasterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem("pp_audio_state");
      if (saved) {
        const state = JSON.parse(saved);
        this.currentTrackIndex = state.trackIndex || 0;
        this.volume = state.volume !== undefined ? state.volume : 0.45;
        this.audioElement.volume = this.volume;
        this.uiSoundsEnabled = state.uiSounds !== undefined ? state.uiSounds : true;
      }
    } catch (e) {}
  }

  saveState() {
    try {
      const state = {
        trackIndex: this.currentTrackIndex,
        volume: this.volume,
        isPlaying: this.isPlaying,
        currentTime: this.audioElement.currentTime || 0,
        uiSounds: this.uiSoundsEnabled
      };
      localStorage.setItem("pp_audio_state", JSON.stringify(state));
    } catch (e) {}
  }

  bindAudioEvents() {
    this.audioElement.addEventListener("error", () => {
      // Graceful fallback to procedural ambient synthesis if external audio file isn't found
      if (this.isPlaying && !this.isUsingSynthesizer) {
        this.startProceduralAmbientSynthesizer();
      }
    });

    this.audioElement.addEventListener("timeupdate", () => {
      this.saveState();
    });

    this.audioElement.addEventListener("ended", () => {
      this.nextTrack();
    });
  }

  /* ==========================================================================
     Procedural Ambient Synthesizer (Zero-dependency ethereal soundscape)
     Plays soft, warm pentatonic chords so user enjoys relaxing background music
     even before downloading external MP3 files!
     ========================================================================== */
  startProceduralAmbientSynthesizer() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.isUsingSynthesizer = true;
    const pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5

    const playChime = () => {
      if (!this.isPlaying || !this.isUsingSynthesizer) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const note = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, this.audioCtx.currentTime);

      const now = this.audioCtx.currentTime;
      const attack = 1.2;
      const decay = 3.5;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08 * (this.isDucked ? 0.2 : 1.0), now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

      osc.connect(gain);
      gain.connect(this.synthMasterGain);

      osc.start(now);
      osc.stop(now + attack + decay + 0.5);
    };

    // Trigger soft overlapping chords
    playChime();
    this.synthInterval = setInterval(() => {
      if (this.isPlaying) {
        playChime();
        if (Math.random() > 0.4) {
          setTimeout(playChime, 400);
        }
      }
    }, 2800);
  }

  stopProceduralAmbientSynthesizer() {
    this.isUsingSynthesizer = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  play() {
    this.initAudioContext();
    this.isPlaying = true;
    const track = this.playlist[this.currentTrackIndex];

    this.audioElement.src = track.src;
    this.audioElement.volume = this.isDucked ? this.volume * 0.2 : this.volume;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to synthesized ambient generator
        this.startProceduralAmbientSynthesizer();
      });
    }

    this.updateDockUI();
    this.saveState();
  }

  pause() {
    this.isPlaying = false;
    this.audioElement.pause();
    this.stopProceduralAmbientSynthesizer();
    this.updateDockUI();
    this.saveState();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    if (this.isPlaying) {
      this.stopProceduralAmbientSynthesizer();
      this.play();
    } else {
      this.updateDockUI();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    this.audioElement.volume = this.isDucked ? this.volume * 0.2 : this.volume;
    if (this.synthMasterGain && this.audioCtx) {
      this.synthMasterGain.gain.setValueAtTime(this.audioElement.volume, this.audioCtx.currentTime);
    }
    this.saveState();
  }

  /* Smart ducking for trailers */
  duck(enable = true) {
    this.isDucked = enable;
    const target = enable ? this.volume * 0.15 : this.volume;
    if (this.audioElement) {
      this.audioElement.volume = target;
    }
    if (this.synthMasterGain && this.audioCtx) {
      this.synthMasterGain.gain.setValueAtTime(target, this.audioCtx.currentTime);
    }
  }

  /* Micro UI Sounds (synthesized with Web Audio API) */
  playTick() {
    if (!this.uiSoundsEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);

    const now = this.audioCtx.currentTime;
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playWhoosh() {
    if (!this.uiSoundsEnabled) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.25);

    const now = this.audioCtx.currentTime;
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  /* Floating Dock Element UI Sync */
  updateDockUI() {
    const dock = document.getElementById("audio-dock");
    if (!dock) return;

    const track = this.playlist[this.currentTrackIndex];
    const playBtn = dock.querySelector(".audio-play-btn");
    const titleEl = dock.querySelector(".audio-track-title");
    const artistEl = dock.querySelector(".audio-track-artist");

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;

    if (this.isPlaying) {
      dock.classList.add("audio-playing");
      if (playBtn) playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
      if (playBtn) playBtn.setAttribute("aria-label", "Pause music");
    } else {
      dock.classList.remove("audio-playing");
      if (playBtn) playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>`;
      if (playBtn) playBtn.setAttribute("aria-label", "Play music");
    }
  }

  renderDock() {
    if (document.getElementById("audio-dock")) return;

    const dock = document.createElement("aside");
    dock.id = "audio-dock";
    dock.className = "audio-dock";
    dock.setAttribute("aria-label", "Ambient Soundscape Player");

    dock.innerHTML = `
      <button class="audio-play-btn" aria-label="Play ambient music">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
      </button>
      <div class="audio-info">
        <span class="audio-track-title">${this.playlist[0].title}</span>
        <span class="audio-track-artist">${this.playlist[0].artist}</span>
      </div>
      <div class="audio-equalizer" aria-hidden="true">
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
      </div>
      <input type="range" class="audio-volume-slider" min="0" max="1" step="0.05" value="${this.volume}" aria-label="Music volume" />
    `;

    document.body.appendChild(dock);

    // Event listeners
    const playBtn = dock.querySelector(".audio-play-btn");
    const slider = dock.querySelector(".audio-volume-slider");

    playBtn.addEventListener("click", () => this.toggle());
    slider.addEventListener("input", (e) => this.setVolume(parseFloat(e.target.value)));

    this.updateDockUI();
  }
}

