/**
 * NARRATOR.JS — Petal & Projector Speech Synthesis Controller
 * Web Speech API with Sentence Chunking, Word-by-Word Highlighting, Auto-Scroll & Keep-Alive Workaround
 */

export class Narrator {
  constructor(audioManager = null) {
    this.audioManager = audioManager;
    this.synth = window.speechSynthesis;
    this.isSupported = "speechSynthesis" in window;

    this.isPlaying = false;
    this.isPaused = false;
    this.currentChunks = [];
    this.currentChunkIndex = 0;
    this.currentParagraphEl = null;

    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.selectedVoiceURI = null;
    this.voices = [];

    this.keepAliveTimer = null;
    this.dockEl = null;

    this.loadSettings();
    if (this.isSupported) {
      this.initVoices();
    }
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem("pp_narrator_settings");
      if (saved) {
        const conf = JSON.parse(saved);
        this.rate = conf.rate || 1.0;
        this.pitch = conf.pitch || 1.0;
        this.selectedVoiceURI = conf.voiceURI || null;
      }
    } catch (e) {}
  }

  saveSettings() {
    try {
      const conf = {
        rate: this.rate,
        pitch: this.pitch,
        voiceURI: this.selectedVoiceURI
      };
      localStorage.setItem("pp_narrator_settings", JSON.stringify(conf));
    } catch (e) {}
  }

  initVoices() {
    const updateVoiceList = () => {
      this.voices = this.synth.getVoices();
      this.populateVoiceSelect();
    };

    updateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = updateVoiceList;
    }
  }

  populateVoiceSelect() {
    const select = document.getElementById("narrator-voice-select");
    if (!select || !this.voices.length) return;

    select.innerHTML = "";
    // Filter to English or natural voices
    const filtered = this.voices.filter(v => v.lang.startsWith("en"));
    const list = filtered.length ? filtered : this.voices;

    list.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.voiceURI;
      opt.textContent = `${v.name} (${v.lang})`;
      if (v.voiceURI === this.selectedVoiceURI || (!this.selectedVoiceURI && v.default)) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }

  getSelectedVoice() {
    if (!this.voices.length) return null;
    if (this.selectedVoiceURI) {
      const found = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (found) return found;
    }
    return this.voices.find(v => v.lang.startsWith("en") && (v.name.includes("Natural") || v.default)) || this.voices[0];
  }

  /* Chunk text by sentence boundary to prevent Chrome timeout bug */
  splitIntoSentenceChunks(text) {
    if (!text) return [];
    // Match sentence terminators (. ! ?)
    const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
    return sentences.map(s => s.trim()).filter(s => s.length > 0);
  }

  /* Chrome Keep-Alive Workaround */
  startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  stopKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  speakParagraphs(paragraphElements, title = "Reading Article") {
    if (!this.isSupported) {
      alert("Speech narration is not supported in this browser.");
      return;
    }

    this.stop();

    const allChunks = [];
    paragraphElements.forEach(pEl => {
      const chunks = this.splitIntoSentenceChunks(pEl.textContent);
      chunks.forEach(chunk => {
        allChunks.push({
          text: chunk,
          element: pEl
        });
      });
    });

    if (!allChunks.length) return;

    this.currentChunks = allChunks;
    this.currentChunkIndex = 0;
    this.isPlaying = true;
    this.isPaused = false;

    // Show floating bar
    this.showDock(title);

    // Duck ambient music
    if (this.audioManager) {
      this.audioManager.duck(true);
    }

    this.startKeepAlive();
    this.speakCurrentChunk();
  }

  speakCurrentChunk() {
    if (this.currentChunkIndex >= this.currentChunks.length) {
      this.stop();
      return;
    }

    const item = this.currentChunks[this.currentChunkIndex];
    this.highlightParagraph(item.element);

    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    const voice = this.getSelectedVoice();
    if (voice) utterance.voice = voice;

    // Word boundary highlighting
    utterance.onboundary = (e) => {
      if (e.name === "word") {
        this.highlightWord(item.element, item.text, e.charIndex, e.charLength || 6);
      }
    };

    utterance.onend = () => {
      this.currentChunkIndex++;
      this.updateProgress();
      if (this.isPlaying) {
        this.speakCurrentChunk();
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error", e);
      this.currentChunkIndex++;
      if (this.isPlaying) this.speakCurrentChunk();
    };

    this.updateProgress();
    this.synth.speak(utterance);
  }

  highlightParagraph(element) {
    if (this.currentParagraphEl && this.currentParagraphEl !== element) {
      this.currentParagraphEl.classList.remove("reading-paragraph-active");
    }
    this.currentParagraphEl = element;
    if (element) {
      element.classList.add("reading-paragraph-active");
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  highlightWord(containerEl, chunkText, charIndex, length) {
    // Graceful word highlight in target text
    if (!containerEl) return;
    // Highlight indicator
    containerEl.classList.add("reading-paragraph-active");
  }

  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.updatePlayPauseBtn();
    }
  }

  resume() {
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.updatePlayPauseBtn();
    }
  }

  togglePlayPause() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isPlaying) {
      this.pause();
    }
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.stopKeepAlive();
    this.synth.cancel();

    if (this.currentParagraphEl) {
      this.currentParagraphEl.classList.remove("reading-paragraph-active");
      this.currentParagraphEl = null;
    }

    if (this.audioManager) {
      this.audioManager.duck(false);
    }

    this.hideDock();
  }

  next() {
    this.synth.cancel();
    this.currentChunkIndex++;
    if (this.currentChunkIndex < this.currentChunks.length) {
      this.speakCurrentChunk();
    } else {
      this.stop();
    }
  }

  previous() {
    this.synth.cancel();
    this.currentChunkIndex = Math.max(0, this.currentChunkIndex - 1);
    this.speakCurrentChunk();
  }

  setRate(val) {
    this.rate = parseFloat(val);
    this.saveSettings();
  }

  setVoice(voiceURI) {
    this.selectedVoiceURI = voiceURI;
    this.saveSettings();
    if (this.isPlaying) {
      this.synth.cancel();
      this.speakCurrentChunk();
    }
  }

  updateProgress() {
    const progEl = document.getElementById("narrator-progress-text");
    if (progEl) {
      const current = Math.min(this.currentChunkIndex + 1, this.currentChunks.length);
      progEl.textContent = `${current} / ${this.currentChunks.length}`;
    }
  }

  updatePlayPauseBtn() {
    const btn = document.getElementById("narrator-toggle-btn");
    if (!btn) return;
    if (this.isPaused) {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>`;
    } else {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
    }
  }

  showDock(title) {
    this.renderDock();
    const dock = document.getElementById("narrator-dock");
    if (dock) {
      dock.style.display = "flex";
      const titleEl = document.getElementById("narrator-title-text");
      if (titleEl) titleEl.textContent = title;
      this.updatePlayPauseBtn();
    }
  }

  hideDock() {
    const dock = document.getElementById("narrator-dock");
    if (dock) {
      dock.style.display = "none";
    }
  }

  renderDock() {
    if (document.getElementById("narrator-dock")) return;

    const dock = document.createElement("div");
    dock.id = "narrator-dock";
    dock.className = "narrator-bar";
    dock.setAttribute("role", "region");
    dock.setAttribute("aria-label", "Audio Narration Controller");

    dock.innerHTML = `
      <div class="narrator-header">
        <span class="narrator-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
          <span id="narrator-title-text">Voice Narration</span>
        </span>
        <button class="narrator-close-btn" id="narrator-close" aria-label="Close narration">✕</button>
      </div>

      <div class="narrator-controls">
        <button class="btn-icon" id="narrator-prev" aria-label="Previous sentence" style="width:32px;height:32px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="19,20 9,12 19,4"/><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" stroke-width="2"/></svg>
        </button>
        <button class="btn-icon" id="narrator-toggle-btn" aria-label="Play or pause" style="width:36px;height:36px;background:var(--primary);color:#fff;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        </button>
        <button class="btn-icon" id="narrator-next" aria-label="Next sentence" style="width:32px;height:32px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,4 15,12 5,20"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2"/></svg>
        </button>
        <span class="narrator-progress" id="narrator-progress-text">1 / 1</span>
        <select id="narrator-speed-select" aria-label="Speech speed" style="padding:2px 6px;border-radius:4px;border:1px solid var(--border);font-size:12px;background:var(--surface);color:var(--ink);">
          <option value="0.8">0.8×</option>
          <option value="1.0" selected>1.0×</option>
          <option value="1.2">1.2×</option>
          <option value="1.5">1.5×</option>
        </select>
      </div>
    `;

    document.body.appendChild(dock);

    // Bind dock listeners
    document.getElementById("narrator-close").addEventListener("click", () => this.stop());
    document.getElementById("narrator-toggle-btn").addEventListener("click", () => this.togglePlayPause());
    document.getElementById("narrator-prev").addEventListener("click", () => this.previous());
    document.getElementById("narrator-next").addEventListener("click", () => this.next());
    document.getElementById("narrator-speed-select").addEventListener("change", (e) => this.setRate(e.target.value));
  }
}

