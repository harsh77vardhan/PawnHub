// ==========================================================================
// PawnHub — Website Interactive Application (Upgraded Toy Demo Engine)
// Playable Chessboard, Web Audio Synthesizer, Event Reactions & UI Controls
// Pure Vanilla JavaScript, Zero External Dependencies, 100% Local
// ==========================================================================

(function () {
  'use strict';

  // ========================================================================
  // 1. Web Audio API Synthesizer (14+ Synthesized Sounds, Pitch Shift & Limits)
  // ========================================================================
  let audioCtx = null;
  let masterGain = null;
  let compressor = null;
  let audioUnlocked = false;
  let isMuted = false;
  let currentVolume = 0.8;
  const activeVoices = []; // Limit simultaneous voices to 4 max

  function initAudio() {
    if (audioUnlocked && audioCtx) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return audioCtx;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;

      audioCtx = new AudioContextClass();

      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-16, audioCtx.currentTime);
      compressor.knee.setValueAtTime(24, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(6, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.2, audioCtx.currentTime);

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);

      compressor.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      audioUnlocked = true;
      updateAudioStatusUI(true);
    } catch (e) {
      console.warn("[PawnHub Site] Web Audio not available:", e);
    }
    return audioCtx;
  }

  function setMasterVolume(val) {
    currentVolume = Math.max(0, Math.min(1, val));
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
    }
    const percentEl = document.getElementById("volumePercent");
    if (percentEl) percentEl.textContent = `${Math.round(currentVolume * 100)}%`;
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(isMuted ? 0 : currentVolume, audioCtx.currentTime);
    }
    const iconEl = document.getElementById("muteIcon");
    if (iconEl) iconEl.textContent = isMuted ? "🔇" : "🔊";
  }

  // Register voice node to ensure max 4 simultaneous sounds
  function registerVoice(node) {
    if (activeVoices.length >= 4) {
      const oldest = activeVoices.shift();
      try { oldest.stop(); oldest.disconnect(); } catch (e) {}
    }
    activeVoices.push(node);
  }

  function createNoiseBuffer(duration = 0.6) {
    if (!audioCtx) return null;
    const bufferSize = audioCtx.sampleRate * duration;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // 14 Original Web Audio Synthesizer Sounds with Random Pitch Variation
  const SYNTH_SOUNDS = {
    // 1. Comic Bonk Impact (pitch ramp + thud)
    bonk: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(560 * p, t);
      osc.frequency.exponentialRampToValueAtTime(75 * p, t + 0.16);
      gain.gain.setValueAtTime(1.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.16);

      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      sub.type = "triangle";
      sub.frequency.setValueAtTime(180 * p, t);
      sub.frequency.exponentialRampToValueAtTime(40 * p, t + 0.22);
      subGain.gain.setValueAtTime(0.9, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      sub.connect(subGain).connect(compressor);
      registerVoice(sub);
      sub.start(t);
      sub.stop(t + 0.22);
    },

    // 2. Comic Pow (square crack + punch)
    pow: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(720 * p, t);
      osc.frequency.exponentialRampToValueAtTime(90 * p, t + 0.14);
      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.14);
    },

    // 3. Comic Smack (triangle snap + low impact)
    smack: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(640 * p, t);
      osc.frequency.exponentialRampToValueAtTime(120 * p, t + 0.12);
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.12);
    },

    // 4. Move Hop Arc (spring sine sweep)
    hop: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320 * p, t);
      osc.frequency.exponentialRampToValueAtTime(540 * p, t + 0.08);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.08);
    },

    // 5. Piece Slide (filtered whoosh)
    slide: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const noise = audioCtx.createBufferSource();
      const buffer = createNoiseBuffer(0.2);
      if (buffer) {
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(600 * p, t);
        filter.frequency.exponentialRampToValueAtTime(1800 * p, t + 0.2);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.6, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        noise.connect(filter).connect(gain).connect(compressor);
        registerVoice(noise);
        noise.start(t);
        noise.stop(t + 0.2);
      }
    },

    // 6. Comic Explosion Kaboom (filtered noise + sub rumble)
    kaboom: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const noise = audioCtx.createBufferSource();
      const buffer = createNoiseBuffer(0.7);
      if (buffer) {
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800 * p, t);
        filter.frequency.exponentialRampToValueAtTime(60 * p, t + 0.7);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(1.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

        noise.connect(filter).connect(gain).connect(compressor);
        registerVoice(noise);
        noise.start(t);
        noise.stop(t + 0.7);
      }

      const sub = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      sub.type = "sawtooth";
      sub.frequency.setValueAtTime(120 * p, t);
      sub.frequency.exponentialRampToValueAtTime(28 * p, t + 0.8);
      subGain.gain.setValueAtTime(0.9, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
      sub.connect(subGain).connect(compressor);
      registerVoice(sub);
      sub.start(t);
      sub.stop(t + 0.8);
    },

    // 7. Sci-fi Laser (downward sweep)
    laser: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1800 * p, t);
      osc.frequency.exponentialRampToValueAtTime(150 * p, t + 0.15);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.15);
    },

    // 8. Check Alarm Horn (dual sawtooth dissonant alert)
    alarm: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      for (let i = 0; i < 2; i++) {
        const offset = i * 0.14;
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(440 * p, t + offset);
        osc1.frequency.linearRampToValueAtTime(520 * p, t + offset + 0.12);

        osc2.type = "square";
        osc2.frequency.setValueAtTime(466 * p, t + offset); // Tritone
        osc2.frequency.linearRampToValueAtTime(554 * p, t + offset + 0.12);

        gain.gain.setValueAtTime(0.6, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, t + offset + 0.12);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(compressor);

        registerVoice(osc1);
        registerVoice(osc2);
        osc1.start(t + offset);
        osc2.start(t + offset);
        osc1.stop(t + offset + 0.12);
        osc2.stop(t + offset + 0.12);
      }
    },

    // 9. Victory Fanfare (4-note triumphant chord)
    fanfare: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      notes.forEach((freq, idx) => {
        const noteTime = t + idx * 0.12;
        const duration = idx === 3 ? 0.65 : 0.15;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq * p, noteTime);

        gain.gain.setValueAtTime(0.7, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

        osc.connect(gain).connect(compressor);
        registerVoice(osc);
        osc.start(noteTime);
        osc.stop(noteTime + duration);
      });
    },

    // 10. Confetti Cannon Pop
    confetti_pop: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(900 * p, t);
      osc.frequency.exponentialRampToValueAtTime(200 * p, t + 0.09);
      gain.gain.setValueAtTime(0.9, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.09);
    },

    // 11. Comic Quack
    quack: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320 * p, t);
      osc.frequency.linearRampToValueAtTime(420 * p, t + 0.08);
      osc.frequency.linearRampToValueAtTime(220 * p, t + 0.22);
      gain.gain.setValueAtTime(0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.22);
    },

    // 12. Trombone Womp
    womp: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(240 * p, t);
      osc.frequency.linearRampToValueAtTime(140 * p, t + 0.35);
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.35);
    },

    // 13. Crystalline Ding
    ding: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5 * p, t); // C6
      gain.gain.setValueAtTime(0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.4);
    },

    // 14. Tactile Piece Tap / Click
    click: (p = 1) => {
      if (!audioCtx) return;
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(480 * p, t);
      osc.frequency.exponentialRampToValueAtTime(180 * p, t + 0.04);
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain).connect(compressor);
      registerVoice(osc);
      osc.start(t);
      osc.stop(t + 0.04);
    }
  };

  function playSound(name) {
    initAudio();
    if (SYNTH_SOUNDS[name]) {
      // Random pitch variation ±7%
      const pitchMultiplier = 0.93 + Math.random() * 0.14;
      SYNTH_SOUNDS[name](pitchMultiplier);
    }
  }

  function updateAudioStatusUI(active) {
    const statusText = document.getElementById("audioStatusText");
    const indicator = document.getElementById("audioIndicator");
    if (statusText && indicator) {
      if (active) {
        statusText.textContent = "Sound active (Web Audio synthesized)";
        indicator.classList.add("active");
      } else {
        statusText.textContent = "Tap anywhere to enable sound";
        indicator.classList.remove("active");
      }
    }
  }

  // ========================================================================
  // 2. Interactive Playable Board State & Mechanics
  // ========================================================================
  const BOARD_THEMES = {
    crystal: { light: "#eef2f6", dark: "#1e3a5f" },
    neon: { light: "#181829", dark: "#07070f" },
    gold_obsidian: { light: "#f5f5f4", dark: "#1c1917" },
    paper_cut: { light: "#fefae0", dark: "#bc6c25" },
    monsters: { light: "#e9f5db", dark: "#718355" },
    candy: { light: "#ffecf1", dark: "#ec4899" },
    lava: { light: "#f97316", dark: "#292524" },
    cyberpunk: { light: "#2dd4bf", dark: "#0f172a" }
  };

  function createInitialBoard() {
    return {
      "0,0": "br", "0,1": "bn", "0,2": "bb", "0,3": "bq", "0,4": "bk", "0,5": "bb", "0,6": "bn", "0,7": "br",
      "1,0": "bp", "1,1": "bp", "1,2": "bp", "1,3": "bp", "1,4": "bp", "1,5": "bp", "1,6": "bp", "1,7": "bp",
      "6,0": "wp", "6,1": "wp", "6,2": "wp", "6,3": "wp", "6,4": "wp", "6,5": "wp", "6,6": "wp", "6,7": "wp",
      "7,0": "wr", "7,1": "wn", "7,2": "wb", "7,3": "wq", "7,4": "wk", "7,5": "wb", "7,6": "wn", "7,7": "wr"
    };
  }

  let boardState = createInitialBoard();
  let selectedSquare = null; // { row, col }
  let legalTargets = []; // array of { row, col, isCapture }
  let activeThemeKey = "crystal";
  let activePieceSetKey = "crystal";
  let chaosLevel = 3;
  let reduceEffects = false;

  // Hype Meter & Combo tracking
  let hypeScore = 0;
  let comboCount = 0;
  let lastActionTime = 0;
  let hypeDecayInterval = null;

  // Variety tracking (never repeat same variant twice in a row)
  const lastVariants = {
    move: -1,
    capture: -1,
    check: -1,
    queen: -1,
    win: -1
  };

  function getVariantIndex(eventKey, totalCount) {
    let pick = Math.floor(Math.random() * totalCount);
    if (totalCount > 1 && pick === lastVariants[eventKey]) {
      pick = (pick + 1) % totalCount;
    }
    lastVariants[eventKey] = pick;
    return pick;
  }

  // Comedic Joke Banners (At least 4 variants each, no judging words)
  const REACTION_VARIANTS = {
    move: [
      "Pawn march: One small step for pawn, one giant leap for chaos.",
      "Knight hop: Warning, unpredictable equine maneuvers ahead.",
      "Tactical repositioning: Just casually sliding across the room.",
      "Forward we go: No retreat, no surrender, only forward."
    ],
    capture: [
      "BONK! Piece sent directly into low Earth orbit.",
      "POW! Clean sweep, nothing to see here.",
      "SMACK! That piece had a family.",
      "WHAM! Rest in pieces, fallen warrior."
    ],
    check: [
      "CHECK! The king's heart rate has officially entered cardio zone.",
      "ALARM! Code Red! Someone get the king an umbrella for the sweat.",
      "PANIC! Royalty in distress, send backup immediately!",
      "WATCH OUT! Royal sirens wailing across the board."
    ],
    queen: [
      "BOOM! The queen is off on vacation.",
      "KABOOM! Royal exit with maximum theatrical drama.",
      "CRUNCH! The monarch has left the building in style.",
      "ZAP! Cosmic departure, queen beamed up to space."
    ],
    win: [
      "CHECKMATE! GG WP! Roll out the victory parade!",
      "VICTORY! The crown topples! Fireworks launched!",
      "GAME OVER! Confetti cannon fired, bow down to the champion!",
      "ROYAL DECREE: Match concluded with ultimate glory!"
    ]
  };

  const COMIC_BURSTS = {
    capture: ["BONK!", "POW!", "WHAM!", "SMACK!"],
    queen: ["BOOM!", "KABOOM!", "ZAP!", "CRUNCH!"]
  };

  function getPieceSvgUrl(pieceCode, setId) {
    if (!window.PawnHubPremiumSets) return "";
    const set = window.PawnHubPremiumSets.get(setId);
    if (!set || !set.pieces) return "";
    return set.pieces[pieceCode] || "";
  }

  function announceBoard(text) {
    const announcer = document.getElementById("boardAnnouncer");
    if (announcer) announcer.textContent = text;
  }

  // ========================================================================
  // 3. Simple Chess Movement Generator (Playable Toy)
  // ========================================================================
  function getPieceMoves(r, c, pieceCode) {
    const moves = [];
    const isWhite = pieceCode.startsWith("w");
    const type = pieceCode[1];

    function addIfValid(tr, tc) {
      if (tr < 0 || tr >= 8 || tc < 0 || tc >= 8) return false;
      const target = boardState[`${tr},${tc}`];
      if (!target) {
        moves.push({ row: tr, col: tc, isCapture: false });
        return true;
      }
      const targetIsWhite = target.startsWith("w");
      if (targetIsWhite !== isWhite) {
        moves.push({ row: tr, col: tc, isCapture: true });
      }
      return false; // Obstacle encountered
    }

    if (type === "p") {
      const dir = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      // Step forward 1
      if (!boardState[`${r + dir},${c}`] && r + dir >= 0 && r + dir < 8) {
        moves.push({ row: r + dir, col: c, isCapture: false });
        // Step forward 2 from start
        if (r === startRow && !boardState[`${r + dir * 2},${c}`]) {
          moves.push({ row: r + dir * 2, col: c, isCapture: false });
        }
      }
      // Diagonal captures
      [-1, 1].forEach(dc => {
        const tr = r + dir;
        const tc = c + dc;
        if (tr >= 0 && tr < 8 && tc >= 0 && tc < 8) {
          const tgt = boardState[`${tr},${tc}`];
          if (tgt && tgt.startsWith("w") !== isWhite) {
            moves.push({ row: tr, col: tc, isCapture: true });
          }
        }
      });
    } else if (type === "n") {
      const offsets = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      offsets.forEach(([dr, dc]) => addIfValid(r + dr, c + dc));
    } else if (type === "b" || type === "r" || type === "q") {
      const dirs = [];
      if (type === "b" || type === "q") dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
      if (type === "r" || type === "q") dirs.push([-1, 0], [1, 0], [0, -1], [0, 1]);
      dirs.forEach(([dr, dc]) => {
        let curR = r + dr;
        let curC = c + dc;
        while (curR >= 0 && curR < 8 && curC >= 0 && curC < 8) {
          const target = boardState[`${curR},${curC}`];
          if (!target) {
            moves.push({ row: curR, col: curC, isCapture: false });
          } else {
            if (target.startsWith("w") !== isWhite) {
              moves.push({ row: curR, col: curC, isCapture: true });
            }
            break;
          }
          curR += dr;
          curC += dc;
        }
      });
    } else if (type === "k") {
      const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      dirs.forEach(([dr, dc]) => addIfValid(r + dr, c + dc));
    }

    return moves;
  }

  // ========================================================================
  // 4. Board Rendering & Square Handlers
  // ========================================================================
  function renderDemoBoard(animatePop = false) {
    const boardEl = document.getElementById("demoBoard");
    if (!boardEl) return;

    boardEl.innerHTML = "";
    const theme = BOARD_THEMES[activeThemeKey] || BOARD_THEMES.crystal;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const square = document.createElement("div");
        square.className = "board-square";
        square.dataset.row = r;
        square.dataset.col = c;
        square.tabIndex = 0;
        square.setAttribute("role", "button");

        const isDark = (r + c) % 2 === 1;
        square.style.backgroundColor = isDark ? theme.dark : theme.light;

        // Check if selected
        if (selectedSquare && selectedSquare.row === r && selectedSquare.col === c) {
          square.classList.add("selected");
        }

        // Check if legal target
        const targetInfo = legalTargets.find(t => t.row === r && t.col === c);
        if (targetInfo) {
          square.classList.add(targetInfo.isCapture ? "legal-capture" : "legal-move");
        }

        const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const rank = 8 - r;
        const squareCoord = `${files[c]}${rank}`;

        const pieceCode = boardState[`${r},${c}`];
        if (pieceCode) {
          const pieceName = getPieceAccessibleName(pieceCode);
          square.setAttribute("aria-label", `${pieceName} on ${squareCoord}`);

          const img = document.createElement("img");
          img.className = "board-piece";
          if (animatePop) img.classList.add("anim-pop");
          img.src = getPieceSvgUrl(pieceCode, activePieceSetKey);
          img.alt = pieceName;
          img.draggable = true;
          img.dataset.piece = pieceCode;
          img.dataset.type = pieceCode[1];
          img.dataset.row = r;
          img.dataset.col = c;

          // Drag and drop support
          img.addEventListener("dragstart", (e) => handleDragStart(e, r, c));
          square.appendChild(img);
        } else {
          square.setAttribute("aria-label", `Square ${squareCoord}`);
        }

        // Click / Touch handler
        square.addEventListener("click", () => handleSquareInteraction(r, c));

        // Dragover & drop handlers
        square.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        });
        square.addEventListener("drop", (e) => handleDrop(e, r, c));

        // Keyboard accessibility
        square.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSquareInteraction(r, c);
          }
        });

        boardEl.appendChild(square);
      }
    }
  }

  function getPieceAccessibleName(code) {
    const isWhite = code.startsWith("w");
    const names = { p: "Pawn", n: "Knight", b: "Bishop", r: "Rook", q: "Queen", k: "King" };
    return `${isWhite ? "White" : "Black"} ${names[code[1]] || "Piece"}`;
  }

  function handleSquareInteraction(r, c) {
    initAudio();
    const clickedPiece = boardState[`${r},${c}`];

    // If destination square is targeted, execute move!
    const targetMove = legalTargets.find(t => t.row === r && t.col === c);
    if (targetMove && selectedSquare) {
      executePlayableMove(selectedSquare.row, selectedSquare.col, r, c, targetMove.isCapture);
      return;
    }

    // If clicked on own piece, select it
    if (clickedPiece) {
      if (selectedSquare && selectedSquare.row === r && selectedSquare.col === c) {
        // Deselect
        selectedSquare = null;
        legalTargets = [];
        renderDemoBoard();
        return;
      }

      selectedSquare = { row: r, col: c };
      legalTargets = getPieceMoves(r, c, clickedPiece);
      playSound("click");

      const squareEl = document.querySelector(`.board-square[data-row="${r}"][data-col="${c}"]`);
      if (squareEl) {
        const pieceImg = squareEl.querySelector(".board-piece");
        if (pieceImg) {
          pieceImg.classList.remove("anim-wiggle");
          void pieceImg.offsetWidth;
          pieceImg.classList.add("anim-wiggle");
        }
      }

      announceBoard(`Selected ${getPieceAccessibleName(clickedPiece)}. ${legalTargets.length} destination squares highlighted.`);
      renderDemoBoard();
    } else {
      // Clicked on empty non-target square: clear selection
      selectedSquare = null;
      legalTargets = [];
      renderDemoBoard();
    }
  }

  function handleDragStart(e, r, c) {
    initAudio();
    const piece = boardState[`${r},${c}`];
    if (!piece) return;
    selectedSquare = { row: r, col: c };
    legalTargets = getPieceMoves(r, c, piece);
    renderDemoBoard();
    e.dataTransfer.setData("text/plain", `${r},${c}`);
  }

  function handleDrop(e, r, c) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    const [fromR, fromC] = data.split(",").map(Number);
    const targetMove = legalTargets.find(t => t.row === r && t.col === c);
    if (targetMove) {
      executePlayableMove(fromR, fromC, r, c, targetMove.isCapture);
    } else {
      selectedSquare = null;
      legalTargets = [];
      renderDemoBoard();
    }
  }

  // ========================================================================
  // 5. Executing Playable Moves with Real Animations
  // ========================================================================
  function executePlayableMove(fromR, fromC, toR, toC, isCapture) {
    const movingPiece = boardState[`${fromR},${fromC}`];
    const capturedPiece = boardState[`${toR},${toC}`];
    if (!movingPiece) return;

    selectedSquare = null;
    legalTargets = [];

    if (isCapture && capturedPiece) {
      // Wind up and ram
      const fromSquare = document.querySelector(`.board-square[data-row="${fromR}"][data-col="${fromC}"]`);
      const toSquare = document.querySelector(`.board-square[data-row="${toR}"][data-col="${toC}"]`);

      if (fromSquare && toSquare) {
        const attackerImg = fromSquare.querySelector(".board-piece");
        const victimImg = toSquare.querySelector(".board-piece");

        if (attackerImg) attackerImg.classList.add("anim-windup-ram");
        if (victimImg) victimImg.classList.add("anim-spin-fly");
      }

      // Calculate square center percentage
      const xPct = ((toC + 0.5) / 8) * 100;
      const yPct = ((toR + 0.5) / 8) * 100;

      // Burst badge, shockwave & sound
      showComicBurst("BONK!", xPct, yPct);
      showShockwave(xPct, yPct);
      triggerBoardShake("shake-md");
      playSound("bonk");
      spawnParticles(xPct, yPct, "bonk", 28);
      boostHype(25);

      const variantIdx = getVariantIndex("capture", REACTION_VARIANTS.capture.length);
      showJokeBanner(REACTION_VARIANTS.capture[variantIdx]);
      announceBoard(`${getPieceAccessibleName(movingPiece)} captured ${getPieceAccessibleName(capturedPiece)} with Bonk reaction.`);

      setTimeout(() => {
        delete boardState[`${fromR},${fromC}`];
        boardState[`${toR},${toC}`] = movingPiece;
        renderDemoBoard();
      }, 700);
    } else {
      // Normal move with hop arc and touchdown dust puff
      delete boardState[`${fromR},${fromC}`];
      boardState[`${toR},${toC}`] = movingPiece;
      renderDemoBoard();

      const destSquare = document.querySelector(`.board-square[data-row="${toR}"][data-col="${toC}"]`);
      if (destSquare) {
        const img = destSquare.querySelector(".board-piece");
        if (img) img.classList.add("anim-hop");
      }

      const xPct = ((toC + 0.5) / 8) * 100;
      const yPct = ((toR + 0.5) / 8) * 100;

      playSound("hop");
      spawnDustPuff(xPct, yPct);
      boostHype(10);

      announceBoard(`${getPieceAccessibleName(movingPiece)} moved to row ${toR + 1}, column ${toC + 1}.`);
    }
  }

  // ========================================================================
  // 6. Upgraded Event Reaction Triggers (The 5 Satisfying Buttons)
  // ========================================================================

  // Reaction 1: Normal Move
  function triggerReactionNormalMove() {
    initAudio();
    // Move e2 to e4 (or back)
    const hasE2 = Boolean(boardState["6,4"]);
    const fromR = hasE2 ? 6 : 4;
    const toR = hasE2 ? 4 : 6;
    const piece = boardState[`${fromR},4`] || "wp";

    delete boardState[`${fromR},4`];
    boardState[`${toR},4`] = piece;
    renderDemoBoard();

    const destSquare = document.querySelector(`.board-square[data-row="${toR}"][data-col="4"]`);
    if (destSquare) {
      const img = destSquare.querySelector(".board-piece");
      if (img) img.classList.add("anim-hop");
    }

    const xPct = ((4 + 0.5) / 8) * 100;
    const yPct = ((toR + 0.5) / 8) * 100;

    playSound("hop");
    spawnDustPuff(xPct, yPct);
    boostHype(12);

    const variantIdx = getVariantIndex("move", REACTION_VARIANTS.move.length);
    showJokeBanner(REACTION_VARIANTS.move[variantIdx]);
    announceBoard(`Normal move executed. ${REACTION_VARIANTS.move[variantIdx]}`);
  }

  // Reaction 2: Capture (Bonk & Orbit Spin)
  function triggerReactionCapture() {
    initAudio();
    const square = document.querySelector(`.board-square[data-row="1"][data-col="4"]`);
    if (square) {
      const pieceImg = square.querySelector(".board-piece");
      if (pieceImg) pieceImg.classList.add("anim-spin-fly");
    }

    const xPct = ((4 + 0.5) / 8) * 100;
    const yPct = ((1 + 0.5) / 8) * 100;

    const burstWords = COMIC_BURSTS.capture;
    const burstWord = burstWords[Math.floor(Math.random() * burstWords.length)];
    showComicBurst(burstWord, xPct, yPct);
    showShockwave(xPct, yPct);
    triggerBoardShake("shake-md");
    playSound("bonk");
    spawnParticles(xPct, yPct, "bonk", 30);
    boostHype(25);

    const variantIdx = getVariantIndex("capture", REACTION_VARIANTS.capture.length);
    showJokeBanner(REACTION_VARIANTS.capture[variantIdx]);
    announceBoard(`Capture reaction triggered. ${REACTION_VARIANTS.capture[variantIdx]}`);

    setTimeout(() => {
      renderDemoBoard();
    }, 1250);
  }

  // Reaction 3: Check Panic! (Tremble, Sweat Drops & Slow Alarm Pulse)
  function triggerReactionCheck() {
    initAudio();
    const kingSquare = document.querySelector(`.board-square[data-row="0"][data-col="4"]`);
    if (kingSquare) {
      const kingImg = kingSquare.querySelector(".board-piece");
      if (kingImg) {
        kingImg.classList.add("anim-panic");
        setTimeout(() => kingImg.classList.remove("anim-panic"), 1800);
      }
    }

    // Spray sweat drops left and right
    spawnSweatDrops(4, 0);

    // Slow red alarm pulse (<= 1 Hz, strictly < 3 Hz)
    const alarmOverlay = document.getElementById("alarmPulseOverlay");
    if (alarmOverlay) {
      alarmOverlay.classList.add("active");
      setTimeout(() => alarmOverlay.classList.remove("active"), 2200);
    }

    playSound("alarm");
    triggerBoardShake("shake-sm");
    boostHype(20);

    const variantIdx = getVariantIndex("check", REACTION_VARIANTS.check.length);
    showJokeBanner(REACTION_VARIANTS.check[variantIdx]);
    announceBoard(`Check panic reaction triggered. ${REACTION_VARIANTS.check[variantIdx]}`);
  }

  // Reaction 4: Queen Captured (Slow-Mo Zoom & BOOM Blast)
  function triggerReactionQueen() {
    initAudio();
    const queenSquare = document.querySelector(`.board-square[data-row="0"][data-col="3"]`);
    if (queenSquare) {
      queenSquare.classList.add("anim-slowmo-zoom");
      setTimeout(() => queenSquare.classList.remove("anim-slowmo-zoom"), 650);
    }

    const xPct = ((3 + 0.5) / 8) * 100;
    const yPct = ((0 + 0.5) / 8) * 100;

    const burstWords = COMIC_BURSTS.queen;
    const burstWord = burstWords[Math.floor(Math.random() * burstWords.length)];
    showComicBurst(burstWord, xPct, yPct);
    showShockwave(xPct, yPct);
    triggerBoardShake("shake-lg");
    playSound("kaboom");
    spawnParticles(xPct, yPct, "boom", 45);
    boostHype(30);

    const variantIdx = getVariantIndex("queen", REACTION_VARIANTS.queen.length);
    showJokeBanner(REACTION_VARIANTS.queen[variantIdx]);
    announceBoard(`Queen captured reaction triggered. ${REACTION_VARIANTS.queen[variantIdx]}`);
  }

  // Reaction 5: Checkmate Fanfare (King Topple, Confetti & Victory Banner)
  function triggerReactionCheckmate() {
    initAudio();
    const kingSquare = document.querySelector(`.board-square[data-row="0"][data-col="4"]`);
    if (kingSquare) {
      const kingImg = kingSquare.querySelector(".board-piece");
      if (kingImg) {
        kingImg.classList.add("anim-topple");
        setTimeout(() => kingImg.classList.remove("anim-topple"), 3000);
      }
    }

    showShockwave(50, 50);
    triggerBoardShake("shake-md");
    playSound("fanfare");
    spawnConfettiShower(50);
    boostHype(40);

    const variantIdx = getVariantIndex("win", REACTION_VARIANTS.win.length);
    showJokeBanner(REACTION_VARIANTS.win[variantIdx]);
    announceBoard(`Checkmate reaction triggered. ${REACTION_VARIANTS.win[variantIdx]}`);
  }

  // Surprise Me! (Plays random reaction with high energy)
  function triggerSurpriseMe() {
    const reactions = [
      triggerReactionNormalMove,
      triggerReactionCapture,
      triggerReactionCheck,
      triggerReactionQueen,
      triggerReactionCheckmate
    ];
    const pick = reactions[Math.floor(Math.random() * reactions.length)];
    pick();
  }

  // Reset Board Toy
  function resetBoardToy() {
    initAudio();
    boardState = createInitialBoard();
    selectedSquare = null;
    legalTargets = [];
    renderDemoBoard(true);
    playSound("ding");
    announceBoard("Board reset to starting layout.");
  }

  // Random Move Toy
  function makeRandomMove() {
    initAudio();
    const piecesWithMoves = [];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardState[`${r},${c}`];
        if (piece) {
          const moves = getPieceMoves(r, c, piece);
          if (moves.length > 0) {
            piecesWithMoves.push({ r, c, piece, moves });
          }
        }
      }
    }

    if (piecesWithMoves.length === 0) {
      resetBoardToy();
      return;
    }

    // Filter pieces with captures first (for more comedy!)
    const capturePieces = piecesWithMoves.filter(p => p.moves.some(m => m.isCapture));
    const pool = (capturePieces.length > 0 && Math.random() < 0.7) ? capturePieces : piecesWithMoves;
    const choice = pool[Math.floor(Math.random() * pool.length)];

    const targetMoves = (choice.moves.some(m => m.isCapture) && Math.random() < 0.8)
      ? choice.moves.filter(m => m.isCapture)
      : choice.moves;

    const moveChoice = targetMoves[Math.floor(Math.random() * targetMoves.length)];
    executePlayableMove(choice.r, choice.c, moveChoice.row, moveChoice.col, moveChoice.isCapture);
  }

  // ========================================================================
  // 7. Visual Overlays: Shockwaves, Bursts, Banners & Sweat Drops
  // ========================================================================
  function showShockwave(xPct, yPct) {
    if (reduceEffects) return;
    const outerEl = document.getElementById("demoBoardOuter");
    if (!outerEl) return;

    const ring = document.createElement("div");
    ring.className = "demo-shockwave";
    ring.style.left = `${xPct}%`;
    ring.style.top = `${yPct}%`;

    const scale = 0.6 + chaosLevel * 0.25;
    ring.style.transform = `translate(-50%, -50%) scale(${scale})`;

    outerEl.appendChild(ring);
    setTimeout(() => { if (ring.parentNode) ring.remove(); }, 900);
  }

  function showComicBurst(word, xPct, yPct) {
    if (reduceEffects) return;
    const layer = document.getElementById("burstLayer");
    if (!layer) return;

    const badge = document.createElement("div");
    badge.className = "comic-burst-badge";
    badge.textContent = word;
    badge.style.left = `${xPct}%`;
    badge.style.top = `${yPct}%`;

    const colors = ["#ef4444", "#f59e0b", "#38bdf8", "#a855f7"];
    badge.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const scale = 0.8 + (chaosLevel - 1) * 0.2;
    badge.style.setProperty("--burst-scale", scale);

    layer.appendChild(badge);
    setTimeout(() => { if (badge.parentNode) badge.remove(); }, 1350);
  }

  function showJokeBanner(text) {
    const banner = document.getElementById("demoBanner");
    if (!banner) return;

    banner.textContent = text;
    banner.classList.remove("active");
    void banner.offsetWidth; // Reflow
    banner.classList.add("active");

    setTimeout(() => {
      banner.classList.remove("active");
    }, 3100);
  }

  function triggerBoardShake(shakeClass) {
    if (reduceEffects) return;
    const outer = document.getElementById("demoBoardOuter");
    if (!outer) return;

    outer.classList.remove("shake-sm", "shake-md", "shake-lg");
    void outer.offsetWidth;
    outer.classList.add(shakeClass);
    setTimeout(() => {
      outer.classList.remove(shakeClass);
    }, 650);
  }

  function spawnSweatDrops(col, row) {
    if (reduceEffects) return;
    const layer = document.getElementById("burstLayer");
    if (!layer) return;

    const centerX = ((col + 0.5) / 8) * 100;
    const centerY = ((row + 0.5) / 8) * 100;

    for (let i = 0; i < 4; i++) {
      const drop = document.createElement("div");
      drop.className = "sweat-drop";
      drop.style.left = `${centerX}%`;
      drop.style.top = `${centerY}%`;

      const dir = i % 2 === 0 ? -1 : 1;
      const tx = dir * (20 + i * 12);
      const txEnd = dir * (40 + i * 20);
      drop.style.setProperty("--tx", `${tx}px`);
      drop.style.setProperty("--tx-end", `${txEnd}px`);

      layer.appendChild(drop);
      setTimeout(() => { if (drop.parentNode) drop.remove(); }, 850);
    }
  }

  // ========================================================================
  // 8. HTML5 Canvas Particles (Confetti, Sparks, Dust Puffs)
  // ========================================================================
  const particles = [];
  let animFrameId = null;
  let effectsCanvas = null;
  let effectsCanvasCtx = null;

  function initCanvas() {
    effectsCanvas = document.getElementById("effectsCanvas");
    if (!effectsCanvas) return;
    effectsCanvas.width = 520;
    effectsCanvas.height = 520;
    effectsCanvasCtx = effectsCanvas.getContext("2d");
  }

  function spawnParticles(xPct, yPct, type, maxCount) {
    if (reduceEffects) return;
    if (!effectsCanvas) initCanvas();
    if (!effectsCanvas) return;

    const cx = (xPct / 100) * effectsCanvas.width;
    const cy = (yPct / 100) * effectsCanvas.height;

    const chaosMultiplier = 0.5 + chaosLevel * 0.25;
    const count = Math.min(50 - particles.length, Math.round(maxCount * chaosMultiplier));
    const colors = ["#38bdf8", "#f59e0b", "#ef4444", "#10b981", "#c084fc", "#ffffff"];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2 + Math.random() * 7) * chaosMultiplier;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === "boom" ? 2 : 1),
        size: 3 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: 0.02 + Math.random() * 0.03,
        gravity: 0.2
      });
    }

    if (!animFrameId) updateParticles();
  }

  function spawnDustPuff(xPct, yPct) {
    if (reduceEffects) return;
    if (!effectsCanvas) initCanvas();
    if (!effectsCanvas) return;

    const cx = (xPct / 100) * effectsCanvas.width;
    const cy = (yPct / 100) * effectsCanvas.height + 15;

    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 0.8) + (Math.random() * Math.PI * 1.4);
      const speed = 1 + Math.random() * 2.5;
      particles.push({
        x: cx + (Math.random() * 16 - 8),
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.4,
        size: 5 + Math.random() * 5,
        color: "rgba(226, 232, 240, 0.75)",
        life: 1.0,
        decay: 0.045,
        gravity: 0.05
      });
    }

    if (!animFrameId) updateParticles();
  }

  function spawnConfettiShower(count = 45) {
    if (reduceEffects) return;
    if (!effectsCanvas) initCanvas();
    if (!effectsCanvas) return;

    const colors = ["#ef4444", "#38bdf8", "#f59e0b", "#10b981", "#a855f7", "#ffffff"];
    const actualCount = Math.min(50 - particles.length, count);

    for (let i = 0; i < actualCount; i++) {
      particles.push({
        x: Math.random() * effectsCanvas.width,
        y: -10 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        size: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.12,
        isRect: Math.random() > 0.4
      });
    }

    if (!animFrameId) updateParticles();
  }

  function updateParticles() {
    if (!effectsCanvasCtx || !effectsCanvas) return;
    effectsCanvasCtx.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      effectsCanvasCtx.globalAlpha = Math.max(0, p.life);
      effectsCanvasCtx.fillStyle = p.color;

      if (p.isRect) {
        effectsCanvasCtx.fillRect(p.x, p.y, p.size, p.size * 0.6);
      } else {
        effectsCanvasCtx.beginPath();
        effectsCanvasCtx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        effectsCanvasCtx.fill();
      }
    }
    effectsCanvasCtx.globalAlpha = 1.0;

    if (particles.length > 0) {
      animFrameId = requestAnimationFrame(updateParticles);
    } else {
      animFrameId = null;
    }
  }

  // ========================================================================
  // 9. Hype Meter & Combo Progression
  // ========================================================================
  function boostHype(points) {
    const now = Date.now();
    if (now - lastActionTime < 3500) {
      comboCount++;
    } else {
      comboCount = 1;
    }
    lastActionTime = now;

    hypeScore = Math.min(100, hypeScore + points * (1 + (comboCount - 1) * 0.2));
    updateHypeUI();

    if (!hypeDecayInterval) {
      hypeDecayInterval = setInterval(() => {
        if (Date.now() - lastActionTime > 2000) {
          hypeScore = Math.max(0, hypeScore - 3.5);
          if (hypeScore === 0) comboCount = 0;
          updateHypeUI();
        }
      }, 350);
    }
  }

  function updateHypeUI() {
    const bar = document.getElementById("hypeMeterBar");
    const badge = document.getElementById("hypeComboBadge");
    const track = document.getElementById("hypeProgressTrack");
    if (!bar || !badge) return;

    bar.style.width = `${Math.round(hypeScore)}%`;
    if (track) track.setAttribute("aria-valuenow", Math.round(hypeScore));

    badge.className = "hype-combo-badge";
    if (hypeScore >= 90 || comboCount >= 5) {
      badge.textContent = `UNSTOPPABLE! ${comboCount}x 🔥`;
      badge.classList.add("tier-4");
    } else if (hypeScore >= 65 || comboCount >= 4) {
      badge.textContent = `MEGA COMBO! ${comboCount}x`;
      badge.classList.add("tier-3");
    } else if (hypeScore >= 35 || comboCount >= 3) {
      badge.textContent = `TRIPLE! ${comboCount}x`;
      badge.classList.add("tier-2");
    } else if (comboCount >= 2) {
      badge.textContent = `DOUBLE! ${comboCount}x`;
      badge.classList.add("tier-2");
    } else {
      badge.textContent = "1x Chill";
    }
  }

  // ========================================================================
  // 10. Piece Set Showcase Gallery
  // ========================================================================
  let showcaseSetId = "crystal";
  let showcaseIsWhite = true;

  function renderPieceGallery() {
    const container = document.getElementById("pieceShowcaseGrid");
    if (!container || !window.PawnHubPremiumSets) return;

    const set = window.PawnHubPremiumSets.get(showcaseSetId);
    if (!set) return;

    const descEl = document.getElementById("pieceSetDesc");
    if (descEl) descEl.textContent = set.desc;

    const types = ["k", "q", "r", "b", "n", "p"];
    const names = { k: "King", q: "Queen", r: "Rook", b: "Bishop", n: "Knight", p: "Pawn" };

    container.innerHTML = "";
    types.forEach(t => {
      const code = (showcaseIsWhite ? "w" : "b") + t;
      const svgUrl = set.pieces[code];

      const tile = document.createElement("div");
      tile.className = "piece-showcase-tile";

      const box = document.createElement("div");
      box.className = "piece-svg-box";

      const img = document.createElement("img");
      img.src = svgUrl;
      img.alt = `${names[t]} (${showcaseIsWhite ? "White" : "Black"})`;
      img.loading = "lazy";
      box.appendChild(img);

      const label = document.createElement("span");
      label.className = "piece-role-label";
      label.textContent = names[t];

      tile.appendChild(box);
      tile.appendChild(label);
      container.appendChild(tile);
    });
  }

  // ========================================================================
  // 11. Themes Gallery Rendering (12 Themes)
  // ========================================================================
  const THEME_LIST = [
    { id: "candy", name: "🍭 Candy Land", desc: "Pastel strawberry cream & raspberry pink with sweets.", light: "#ffecf1", dark: "#ec4899", emoji: ["🍬", "🦄", "🧁", "🍫", "🍭", "👑"] },
    { id: "lava", name: "🌋 Lava Volcano", desc: "Molten magma orange on volcanic basalt charcoal.", light: "#f97316", dark: "#292524", emoji: ["🪨", "🦎", "🌋", "🏰", "🔥", "👑"] },
    { id: "space", name: "🚀 Deep Space", desc: "Cosmic nebula purple on void black with interstellar craft.", light: "#c084fc", dark: "#0f0728", emoji: ["☄️", "🛸", "🛰️", "🚀", "🪐", "👾"] },
    { id: "haunted", name: "👻 Haunted Mansion", desc: "Eerie ectoplasm green on phantom charcoal with ghouls.", light: "#86efac", dark: "#18181b", emoji: ["🕯️", "🦇", "🧙", "🏰", "👻", "💀"] },
    { id: "underwater", name: "🌊 Underwater Reef", desc: "Bioluminescent cyan on deep oceanic abyss with sea life.", light: "#67e8f9", dark: "#082f49", emoji: ["🐚", "Seahorse", "🐙", "Sub", "Mermaid", "Poseidon"] },
    { id: "arcade", name: "👾 Retro Arcade", desc: "1980s CRT neon green on arcade cabinet black with pixel art.", light: "#4ade80", dark: "#052e16", emoji: ["👾", "Joystick", "Disc", "Cabinet", "Crown", "Player"] },
    { id: "desert", name: "🏜️ Desert Pyramids", desc: "Sunbaked dune sand on pharaoh tomb sandstone.", light: "#fde047", dark: "#78350f", emoji: ["Scarab", "Camel", "Ankh", "Pyramid", "Cleo", "Pharaoh"] },
    { id: "jungle", name: "🌴 Jungle Canopy", desc: "Lush tropical lime on dense rainforest bark.", light: "#a3e635", dark: "#14532d", emoji: ["Leaf", "Panther", "Parrot", "Tree", "Tiger", "Gorilla"] },
    { id: "ice", name: "❄️ Ice Kingdom", desc: "Glacial permafrost on polar deep sapphire.", light: "#bae6fd", dark: "#0c4a6e", emoji: ["Snow", "Bear", "Penguin", "Berg", "Queen", "King"] },
    { id: "cyberpunk", name: "⚡ Cyberpunk Neon", desc: "High-voltage electric teal on dark synthwave void.", light: "#2dd4bf", dark: "#0f172a", emoji: ["Chip", "Drone", "Laser", "Tower", "Cyborg", "AI"] },
    { id: "medieval", name: "🏰 Medieval Castle", desc: "Royal banner parchment on stone keep masonry.", light: "#e2e8f0", dark: "#334155", emoji: ["Shield", "Steed", "Cross", "Tower", "Queen", "King"] },
    { id: "pirate", name: "🏴‍☠️ Pirate Seas", desc: "Treasure map aged parchment on stormy deep sea navy.", light: "#fed7aa", dark: "#1e3a8a", emoji: ["Coin", "Shark", "Compass", "Ship", "Siren", "Captain"] }
  ];

  function renderThemesGallery() {
    const grid = document.getElementById("themesGrid");
    if (!grid) return;

    grid.innerHTML = "";
    THEME_LIST.forEach(t => {
      const card = document.createElement("div");
      card.className = "theme-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");

      const swatch = document.createElement("div");
      swatch.className = "theme-swatch-box";

      const lightBox = document.createElement("div");
      lightBox.className = "swatch-light";
      lightBox.style.backgroundColor = t.light;

      const darkBox = document.createElement("div");
      darkBox.className = "swatch-dark";
      darkBox.style.backgroundColor = t.dark;

      const emojiStrip = document.createElement("div");
      emojiStrip.className = "theme-emoji-strip";
      emojiStrip.setAttribute("aria-hidden", "true");
      emojiStrip.textContent = t.emoji.slice(0, 4).join(" ");

      swatch.appendChild(lightBox);
      swatch.appendChild(darkBox);
      swatch.appendChild(emojiStrip);

      const body = document.createElement("div");
      body.className = "theme-card-body";

      const title = document.createElement("h3");
      title.className = "theme-card-title";
      title.id = `theme-heading-${t.id}`;
      title.textContent = t.name;

      const desc = document.createElement("p");
      desc.className = "theme-card-desc";
      desc.textContent = t.desc;

      body.appendChild(title);
      body.appendChild(desc);

      card.appendChild(swatch);
      card.appendChild(body);

      card.addEventListener("click", () => {
        activeThemeKey = t.id;
        BOARD_THEMES[t.id] = { light: t.light, dark: t.dark };
        renderDemoBoard(true);
        showJokeBanner(`Palette Switched: ${t.name}`);
        const demoBoard = document.getElementById("demoSection");
        if (demoBoard) demoBoard.scrollIntoView({ behavior: "smooth" });
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });

      grid.appendChild(card);
    });
  }

  // ========================================================================
  // 12. FAQ Accordion Handling
  // ========================================================================
  function initFaq() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const btn = item.querySelector(".faq-question");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach(other => {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ========================================================================
  // 13. Mobile Navigation
  // ========================================================================
  function initMobileNav() {
    const btn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav-links");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const isVisible = nav.style.display === "flex";
      nav.style.display = isVisible ? "none" : "flex";
      btn.setAttribute("aria-expanded", !isVisible);
    });
  }


  // ========================================================================
  // 14. Initialization & Event Listeners
  // ========================================================================
  function init() {
    initCanvas();
    renderDemoBoard();

    // Event Reaction Buttons
    const btnMove = document.getElementById("btnDemoMove");
    const btnCapture = document.getElementById("btnDemoCapture");
    const btnCheck = document.getElementById("btnDemoCheck");
    const btnQueen = document.getElementById("btnDemoQueen");
    const btnWin = document.getElementById("btnDemoWin");

    if (btnMove) btnMove.addEventListener("click", triggerReactionNormalMove);
    if (btnCapture) btnCapture.addEventListener("click", triggerReactionCapture);
    if (btnCheck) btnCheck.addEventListener("click", triggerReactionCheck);
    if (btnQueen) btnQueen.addEventListener("click", triggerReactionQueen);
    if (btnWin) btnWin.addEventListener("click", triggerReactionCheckmate);

    // Board Toy Toolbar Buttons
    const btnReset = document.getElementById("btnResetBoard");
    const btnRandom = document.getElementById("btnRandomMove");
    const btnSurprise = document.getElementById("btnSurpriseMe");
    const chkReduce = document.getElementById("chkReduceEffects");

    if (btnReset) btnReset.addEventListener("click", resetBoardToy);
    if (btnRandom) btnRandom.addEventListener("click", makeRandomMove);
    if (btnSurprise) btnSurprise.addEventListener("click", triggerSurpriseMe);

    if (chkReduce) {
      chkReduce.addEventListener("change", (e) => {
        reduceEffects = e.target.checked;
        const outer = document.getElementById("demoBoardOuter");
        if (outer) outer.classList.toggle("reduced-effects", reduceEffects);
      });
    }

    // Audio & Volume controls
    const btnMute = document.getElementById("btnMuteAudio");
    const volumeSlider = document.getElementById("volumeSlider");

    if (btnMute) btnMute.addEventListener("click", toggleMute);
    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        initAudio();
        setMasterVolume(Number(e.target.value) / 100);
      });
    }

    // Chaos Level slider
    const chaosSlider = document.getElementById("chaosSlider");
    const chaosLabel = document.getElementById("chaosValueLabel");
    if (chaosSlider && chaosLabel) {
      const chaosNames = {
        "1": "Level 1 (Calm)",
        "2": "Level 2 (Playful)",
        "3": "Level 3 (Loud)",
        "4": "Level 4 (Wild)",
        "5": "Level 5 (Mayhem)"
      };
      chaosSlider.addEventListener("input", (e) => {
        chaosLevel = Number(e.target.value);
        chaosLabel.textContent = chaosNames[String(chaosLevel)] || `Level ${chaosLevel}`;
      });
    }

    // Palette Swatch Selector Items
    const swatches = document.querySelectorAll(".theme-swatch-item");
    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        swatches.forEach(s => {
          s.classList.remove("active");
          s.setAttribute("aria-checked", "false");
        });
        swatch.classList.add("active");
        swatch.setAttribute("aria-checked", "true");

        activeThemeKey = swatch.dataset.theme;
        if (BOARD_THEMES[activeThemeKey]) {
          if (["crystal", "neon", "gold_obsidian", "paper_cut", "monsters"].includes(activeThemeKey)) {
            activePieceSetKey = activeThemeKey;
          }
        }

        renderDemoBoard(true);
        playSound("click");
      });
    });

    // Piece Set Gallery Tabs
    const setTabs = document.querySelectorAll(".piece-tab-btn");
    setTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        setTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        showcaseSetId = tab.dataset.set;
        activePieceSetKey = showcaseSetId;
        renderPieceGallery();
        renderDemoBoard(true);
      });
    });

    // White / Black color toggle
    const btnWhite = document.getElementById("btnPieceWhite");
    const btnBlack = document.getElementById("btnPieceBlack");
    if (btnWhite && btnBlack) {
      btnWhite.addEventListener("click", () => {
        btnWhite.classList.add("active");
        btnBlack.classList.remove("active");
        showcaseIsWhite = true;
        renderPieceGallery();
      });
      btnBlack.addEventListener("click", () => {
        btnBlack.classList.add("active");
        btnWhite.classList.remove("active");
        showcaseIsWhite = false;
        renderPieceGallery();
      });
    }

    // Tab visibility handling (pause particles and sounds when tab hidden)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (audioCtx && audioCtx.state === "running") audioCtx.suspend();
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      } else {
        if (audioUnlocked && audioCtx && audioCtx.state === "suspended") {
          audioCtx.resume();
        }
      }
    });

    // Render Galleries
    renderPieceGallery();
    renderThemesGallery();
    initFaq();
    initMobileNav();

    // Auto-unlock audio on any page interaction
    ["click", "keydown", "touchstart"].forEach(evtName => {
      document.addEventListener(evtName, () => {
        if (!audioUnlocked) {
          initAudio();
        }
      }, { once: true, passive: true });
    });
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
