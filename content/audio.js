// ==========================================================================
// PawnHub - Web Audio API Sound Synthesizer (Stage 2/3 Engine)
// ==========================================================================
// 100% synthesized in code. Zero audio files, zero copyright.
// Includes DynamicsCompressorNode + MasterGain for loud, punchy, distortion-free audio.

(function () {
  let audioCtx = null;
  let masterGain = null;
  let compressor = null;
  let isMuted = false;
  let currentVolume = 0.8; // High default volume

  function initAudio() {
    if (audioCtx) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume().then(() => {
          console.log("[PawnHub Audio] AudioContext resumed successfully.");
        }).catch(err => {
          console.warn("[PawnHub Audio] Could not resume AudioContext:", err);
        });
      }
      return audioCtx;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("[PawnHub Audio] Web Audio API is not supported in this browser.");
        return null;
      }

      audioCtx = new AudioContextClass();

      // 1. Dynamics Compressor: keeps audio loud and punchy without distortion
      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-16, audioCtx.currentTime); // dB
      compressor.knee.setValueAtTime(24, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(6, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, audioCtx.currentTime);

      // 2. Master Gain Node
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);

      // Connect: Sound Source -> Compressor -> Master Gain -> Destination (Speakers)
      compressor.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      console.log("%c[PawnHub Audio]%c AudioContext initialized (Gain: " + currentVolume + ")", "color: #10b981; font-weight: bold;", "color: inherit;");
    } catch (e) {
      console.error("[PawnHub Audio] Error initializing AudioContext:", e);
    }

    return audioCtx;
  }

  // Auto-unlock on first user interaction anywhere on the page
  const unlockEvents = ["click", "pointerdown", "keydown", "touchstart"];
  const unlockHandler = () => {
    initAudio();
    unlockEvents.forEach(evt => window.removeEventListener(evt, unlockHandler, true));
  };
  unlockEvents.forEach(evt => window.addEventListener(evt, unlockHandler, true));

  // Helper to create a noise buffer (for explosions, whooshes, splats)
  function createNoiseBuffer(duration = 1.0) {
    if (!audioCtx) return null;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // 25+ Synthesized Sound Effects Library
  const SOUND_EFFECTS = {
    // 1. Comic Impact: Bonk
    bonk: (t, p = 1) => {
      // Fast drop tone + wooden knock
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(560 * p, t);
      osc.frequency.exponentialRampToValueAtTime(80 * p, t + 0.16);
      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.16);

      // Sub thud
      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      sub.type = "triangle";
      sub.frequency.setValueAtTime(180 * p, t);
      sub.frequency.exponentialRampToValueAtTime(40 * p, t + 0.22);
      subGain.gain.setValueAtTime(0.9, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      sub.connect(subGain).connect(compressor);
      sub.start(t);
      sub.stop(t + 0.22);
    },

    // 2. Comic Impact: Pow
    pow: (t, p = 1) => {
      // Snappy square crack + deep punch
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(750 * p, t);
      osc.frequency.exponentialRampToValueAtTime(90 * p, t + 0.14);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.14);

      // Low punch
      const thud = audioCtx.createOscillator();
      const thudGain = audioCtx.createGain();
      thud.type = "sine";
      thud.frequency.setValueAtTime(220 * p, t);
      thud.frequency.exponentialRampToValueAtTime(50 * p, t + 0.25);
      thudGain.gain.setValueAtTime(1.0, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      thud.connect(thudGain).connect(compressor);
      thud.start(t);
      thud.stop(t + 0.25);
    },

    // 3. Comic Explosion: Kaboom
    kaboom: (t, p = 1) => {
      // Filtered noise explosion + sub rumble
      const noise = audioCtx.createBufferSource();
      noise.buffer = createNoiseBuffer(0.8);
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800 * p, t);
      filter.frequency.exponentialRampToValueAtTime(60 * p, t + 0.8);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(1.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      noise.connect(filter).connect(gain).connect(compressor);
      noise.start(t);
      noise.stop(t + 0.8);

      // Sub rumble
      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      sub.type = "sawtooth";
      sub.frequency.setValueAtTime(110 * p, t);
      sub.frequency.exponentialRampToValueAtTime(30 * p, t + 0.9);
      subGain.gain.setValueAtTime(0.8, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      sub.connect(subGain).connect(compressor);
      sub.start(t);
      sub.stop(t + 0.9);
    },

    // 4. Splat (Banana slip / pie splat)
    splat: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(380 * p, t);
      osc.frequency.linearRampToValueAtTime(120 * p, t + 0.08);
      osc.frequency.linearRampToValueAtTime(320 * p, t + 0.16);
      osc.frequency.exponentialRampToValueAtTime(70 * p, t + 0.35);
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.35);
    },

    // 5. Whoosh / Air Rush
    whoosh: (t, p = 1) => {
      const noise = audioCtx.createBufferSource();
      noise.buffer = createNoiseBuffer(0.4);
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300 * p, t);
      filter.frequency.exponentialRampToValueAtTime(1600 * p, t + 0.2);
      filter.frequency.exponentialRampToValueAtTime(200 * p, t + 0.4);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.9, t + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      noise.connect(filter).connect(gain).connect(compressor);
      noise.start(t);
      noise.stop(t + 0.4);
    },

    // 6. Laser Zap
    laser_zap: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400 * p, t);
      osc.frequency.exponentialRampToValueAtTime(120 * p, t + 0.22);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.22);
    },

    // 7. Cartoon Boing
    boing: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(140 * p, t);
      osc.frequency.linearRampToValueAtTime(520 * p, t + 0.15);
      osc.frequency.linearRampToValueAtTime(260 * p, t + 0.35);
      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.4);
    },

    // 8. Pop
    pop: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(650 * p, t);
      osc.frequency.exponentialRampToValueAtTime(120 * p, t + 0.1);
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.1);
    },

    // 9. Slide Whistle (Rise & Fall)
    slide_whistle: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(350 * p, t);
      osc.frequency.linearRampToValueAtTime(950 * p, t + 0.25);
      osc.frequency.linearRampToValueAtTime(280 * p, t + 0.55);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.6);
    },

    // 10. Royal Trumpet Fanfare
    fanfare: (t, p = 1) => {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq * p, t + idx * 0.12);
        gain.gain.setValueAtTime(0.7, t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.35);
        osc.connect(gain).connect(compressor);
        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.35);
      });
    },

    // 11. Sad Trombone (Wah-wah-wah-waaah)
    sad_trombone: (t, p = 1) => {
      const notes = [
        { f: 293.66, d: 0.28 }, // D4
        { f: 277.18, d: 0.28 }, // C#4
        { f: 261.63, d: 0.28 }, // C4
        { f: 246.94, d: 0.65 }  // B3 (long sliding wobble)
      ];
      let offset = 0;
      notes.forEach((n, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        const startTime = t + offset;
        osc.frequency.setValueAtTime(n.f * p, startTime);
        if (idx === 3) {
          // Slide down at the end
          osc.frequency.linearRampToValueAtTime(n.f * 0.9 * p, startTime + n.d);
        }
        gain.gain.setValueAtTime(0.75, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.d);
        osc.connect(gain).connect(compressor);
        osc.start(startTime);
        osc.stop(startTime + n.d);
        offset += n.d * 0.85;
      });
    },

    // 12. Party Horn
    party_horn: (t, p = 1) => {
      [220, 330].forEach(f => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f * p, t);
        osc.frequency.linearRampToValueAtTime(f * 1.15 * p, t + 0.35);
        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain).connect(compressor);
        osc.start(t);
        osc.stop(t + 0.4);
      });
    },

    // 13. Drumroll
    drumroll: (t, p = 1) => {
      for (let i = 0; i < 12; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime((130 + Math.random() * 30) * p, t + i * 0.045);
        gain.gain.setValueAtTime(0.5 + (i / 12) * 0.4, t + i * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.045 + 0.04);
        osc.connect(gain).connect(compressor);
        osc.start(t + i * 0.045);
        osc.stop(t + i * 0.045 + 0.04);
      }
    },

    // 14. Applause / Crowd Cheers
    applause: (t, p = 1) => {
      const noise = audioCtx.createBufferSource();
      noise.buffer = createNoiseBuffer(1.2);
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1000 * p, t);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.linearRampToValueAtTime(0.8, t + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      noise.connect(filter).connect(gain).connect(compressor);
      noise.start(t);
      noise.stop(t + 1.2);
    },

    // 15. Gasp
    gasp: (t, p = 1) => {
      const noise = audioCtx.createBufferSource();
      noise.buffer = createNoiseBuffer(0.35);
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450 * p, t);
      filter.frequency.exponentialRampToValueAtTime(1200 * p, t + 0.3);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.85, t + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      noise.connect(filter).connect(gain).connect(compressor);
      noise.start(t);
      noise.stop(t + 0.35);
    },

    // 16. Ding (Harmonic Bell)
    ding: (t, p = 1) => {
      [987.77, 1975.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq * p, t);
        gain.gain.setValueAtTime(i === 0 ? 0.9 : 0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
        osc.connect(gain).connect(compressor);
        osc.start(t);
        osc.stop(t + 0.9);
      });
    },

    // 17. Glitch (Arcade Bit Error)
    glitch: (t, p = 1) => {
      for (let i = 0; i < 6; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime((300 + (i % 2) * 450) * p, t + i * 0.035);
        gain.gain.setValueAtTime(0.65, t + i * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.035 + 0.03);
        osc.connect(gain).connect(compressor);
        osc.start(t + i * 0.035);
        osc.stop(t + i * 0.035 + 0.03);
      }
    },

    // 18. Alarm (Check siren)
    alarm: (t, p = 1) => {
      [0, 0.16, 0.32].forEach((delay, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime((idx % 2 === 0 ? 660 : 880) * p, t + delay);
        gain.gain.setValueAtTime(0.8, t + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.14);
        osc.connect(gain).connect(compressor);
        osc.start(t + delay);
        osc.stop(t + delay + 0.14);
      });
    },

    // 19. Sweat Drip (Cartoon Drop)
    drip: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(900 * p, t);
      osc.frequency.exponentialRampToValueAtTime(1400 * p, t + 0.08);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.12);
    },

    // 20. Wham / Sumo Shove
    wham: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260 * p, t);
      osc.frequency.exponentialRampToValueAtTime(45 * p, t + 0.3);
      gain.gain.setValueAtTime(1.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.3);
    },

    // 21. Vacuum Slurp
    slurp: (t, p = 1) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150 * p, t);
      osc.frequency.exponentialRampToValueAtTime(1200 * p, t + 0.35);
      gain.gain.setValueAtTime(0.85, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.38);
    },

    // 22. Karate Hi-Yah
    karate: (t, p = 1) => {
      // Fast high pitch attack followed by sharp wood block
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(950 * p, t);
      osc.frequency.exponentialRampToValueAtTime(220 * p, t + 0.15);
      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain).connect(compressor);
      osc.start(t);
      osc.stop(t + 0.18);
    },

    // 23. Level Up / Star Sparkle
    level_up: (t, p = 1) => {
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq * p, t + idx * 0.08);
        gain.gain.setValueAtTime(0.7, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.25);
        osc.connect(gain).connect(compressor);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.25);
      });
    },

    // 24. Victory Grand Chime
    victory: (t, p = 1) => {
      const chords = [
        [523.25, 659.25, 783.99], // C major
        [587.33, 739.99, 880.00], // D major
        [659.25, 830.61, 987.77], // E major
        [1046.5, 1318.5, 1567.98] // C6 grand
      ];
      chords.forEach((chord, i) => {
        chord.forEach(f => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f * p, t + i * 0.2);
          gain.gain.setValueAtTime(0.6, t + i * 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.2 + (i === 3 ? 0.8 : 0.25));
          osc.connect(gain).connect(compressor);
          osc.start(t + i * 0.2);
          osc.stop(t + i * 0.2 + (i === 3 ? 0.8 : 0.25));
        });
      });
    },

    // 25. Dance Hop (Bouncy Staccato)
    hop: (t, p = 1) => {
      [330, 440, 550].forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f * p, t + idx * 0.09);
        gain.gain.setValueAtTime(0.75, t + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.1);
        osc.connect(gain).connect(compressor);
        osc.start(t + idx * 0.09);
        osc.stop(t + idx * 0.09 + 0.1);
      });
    }
  };

  // ==========================================================================
  // Custom Sounds Engine (AudioBuffer Caching & Polyphonic Limiter)
  // ==========================================================================
  let customSoundsConfig = null;
  const cachedBuffers = {}; // soundId -> AudioBuffer
  const lastPlayedSoundId = {}; // slotKey -> soundId
  const activeSources = []; // Tracks currently playing AudioBufferSourceNodes (max 4)
  const MAX_CONCURRENT_VOICES = 4;

  function base64ToArrayBuffer(base64DataUrl) {
    const commaIdx = base64DataUrl.indexOf(",");
    const base64 = commaIdx >= 0 ? base64DataUrl.slice(commaIdx + 1) : base64DataUrl;
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async function loadCustomSounds(config) {
    customSoundsConfig = config;
    if (!config || !config.slots) return;

    const ctx = initAudio();
    if (!ctx) return;

    const slots = config.slots;
    for (const slotKey of Object.keys(slots)) {
      const slot = slots[slotKey];
      if (!slot || !Array.isArray(slot.sounds)) continue;

      for (const sound of slot.sounds) {
        if (!sound.id || !sound.dataUrl) continue;
        if (cachedBuffers[sound.id]) continue; // Already pre-decoded

        try {
          const arrayBuf = base64ToArrayBuffer(sound.dataUrl);
          const decoded = await ctx.decodeAudioData(arrayBuf);
          cachedBuffers[sound.id] = decoded;
          sound.failed = false;
        } catch (err) {
          console.warn(`[PawnHub Audio] Failed to decode custom sound '${sound.name}' (${sound.id}):`, err);
          sound.failed = true;
        }
      }
    }
  }

  function playBuffer(audioBuffer, volumeMultiplier = 1.0) {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx || !audioBuffer) return;

    // Polyphonic limit: Stop oldest source if 4 are already playing
    while (activeSources.length >= MAX_CONCURRENT_VOICES) {
      const oldest = activeSources.shift();
      try {
        oldest.stop();
      } catch (e) {}
    }

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    const soundGain = ctx.createGain();
    soundGain.gain.setValueAtTime(Math.max(0, Math.min(2.0, volumeMultiplier)), ctx.currentTime);

    // Source -> SoundGain -> Compressor -> MasterGain -> Destination
    source.connect(soundGain);
    soundGain.connect(compressor || masterGain || ctx.destination);

    source.start(ctx.currentTime);
    activeSources.push(source);

    source.onended = () => {
      const idx = activeSources.indexOf(source);
      if (idx !== -1) activeSources.splice(idx, 1);
    };
  }

  function playSynth(soundName) {
    if (isMuted) return;

    const ctx = initAudio();
    if (!ctx || !SOUND_EFFECTS[soundName]) return;

    const randomPitch = 0.95 + Math.random() * 0.10;
    const startTime = ctx.currentTime;

    try {
      SOUND_EFFECTS[soundName](startTime, randomPitch);
    } catch (err) {
      console.error("[PawnHub Audio] Error playing sound:", err);
    }
  }

  function playEvent(eventKey, fallbackName) {
    if (isMuted) return false;

    // 1. Check if custom sounds config is active and slot has sounds
    if (customSoundsConfig && customSoundsConfig.enabled !== false && customSoundsConfig.slots) {
      const slot = customSoundsConfig.slots[eventKey];
      if (slot && slot.enabled !== false && Array.isArray(slot.sounds) && slot.sounds.length > 0) {
        const candidates = slot.sounds.filter(s => !s.failed && (cachedBuffers[s.id] || s.dataUrl));
        if (candidates.length > 0) {
          // Avoid playing the exact same sound twice in a row (if >1 sound in slot)
          let picked = null;
          if (candidates.length === 1) {
            picked = candidates[0];
          } else {
            const pool = candidates.filter(s => s.id !== lastPlayedSoundId[eventKey]);
            picked = (pool.length > 0 ? pool : candidates)[Math.floor(Math.random() * (pool.length || candidates.length))];
          }

          lastPlayedSoundId[eventKey] = picked.id;

          if (cachedBuffers[picked.id]) {
            playBuffer(cachedBuffers[picked.id], typeof picked.volume === "number" ? picked.volume : 1.0);
            return true;
          } else if (picked.dataUrl) {
            // Lazy decode fallback
            const ctx = initAudio();
            if (ctx) {
              try {
                const arrayBuf = base64ToArrayBuffer(picked.dataUrl);
                ctx.decodeAudioData(arrayBuf).then(decoded => {
                  cachedBuffers[picked.id] = decoded;
                  playBuffer(decoded, typeof picked.volume === "number" ? picked.volume : 1.0);
                }).catch(() => {
                  if (fallbackName) playSynth(fallbackName);
                });
                return true;
              } catch (e) {}
            }
          }
        }
      }
    }

    // 2. Fallback to PawnHub synthesized comedy sound
    if (fallbackName && SOUND_EFFECTS[fallbackName]) {
      playSynth(fallbackName);
      return false;
    }

    return false;
  }

  function playCustomSound(sound) {
    if (!sound) return;
    const ctx = initAudio();
    if (!ctx) return;

    const vol = typeof sound.volume === "number" ? sound.volume : 1.0;
    if (sound.id && cachedBuffers[sound.id]) {
      playBuffer(cachedBuffers[sound.id], vol);
      return;
    }

    if (sound.dataUrl) {
      try {
        const arrayBuf = base64ToArrayBuffer(sound.dataUrl);
        ctx.decodeAudioData(arrayBuf).then(decoded => {
          if (sound.id) cachedBuffers[sound.id] = decoded;
          playBuffer(decoded, vol);
        }).catch(err => {
          console.error("[PawnHub Audio] Error previewing custom sound:", err);
        });
      } catch (err) {
        console.error("[PawnHub Audio] Error converting base64 data:", err);
      }
    }
  }

  function safeWrap(fn, name) {
    return function (...args) {
      try {
        return fn(...args);
      } catch (err) {
        console.warn(`[PawnHub Audio] Safe guard caught error in ${name}:`, err.message);
      }
    };
  }

  // Public Audio API
  window.PawnHubAudio = {
    init: safeWrap(initAudio, "init"),

    setVolume: safeWrap((volPercent) => {
      currentVolume = Math.max(0, Math.min(100, volPercent)) / 100 * 0.85;
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
      }
    }, "setVolume"),

    setMuted: safeWrap((muted) => {
      isMuted = !!muted;
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
      }
    }, "setMuted"),

    play: safeWrap(playSynth, "play"),
    playEvent: safeWrap(playEvent, "playEvent"),
    playCustomSound: safeWrap(playCustomSound, "playCustomSound"),
    loadCustomSounds: safeWrap(loadCustomSounds, "loadCustomSounds"),
    getSoundList: () => Object.keys(SOUND_EFFECTS),
    getAudioContext: initAudio
  };
})();

