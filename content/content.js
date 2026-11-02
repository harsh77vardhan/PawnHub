// ==========================================================================
// PawnHub - Content Orchestrator (Themes, Audio, and Big Comedy FX)
// ==========================================================================
// High-visibility, cosmetic-only extension for chess.com.


// ==========================================================================
// Global Settings
// ==========================================================================
let settings = {
  pawnhub_theme: "default",
  pawnhub_pieces: {},
  comedy_enabled: true,
  comedy_jokes: false,
  comedy_effects: true,
  comedy_sounds: true,
  comedy_volume: 80,
  joke_size: "30px",
  joke_duration: 3800
};

// ==========================================================================
// Joke Database (At least 12 original jokes per event)
// ==========================================================================
const JOKES = {
  game_start: [
    "Two armies. 64 squares. Zero regrets (yet).",
    "May the pawns be ever in your favor.",
    "Opening book: Chapter 1: Don't panic.",
    "Deep breath. Time to push some innocent wood.",
    "Let the 40-move blunder festival begin!",
    "Remember: knights move in an L, not in a panic.",
    "Game on! Try not to hang all your pieces before move 10.",
    "Handshakes are over. The pawns march forward.",
    "Welcome to the battle of wooden minds!",
    "May your tactics be sharp and your mouse slips few.",
    "Pawns forward! Glory awaits on the 8th rank.",
    "Chess: 99% calculation, 1% hoping opponent didn't see that."
  ],
  capture: [
    "Pawn down. Thoughts and prayers.",
    "Another one bites the wooden dust.",
    "Gone to the great captured box in the sky.",
    "Someone call a taxi for that piece.",
    "A moment of silence for that brave sacrifice.",
    "That piece had a family, you know.",
    "Yeeted off the board in broad daylight.",
    "Trading down like a wall street intern.",
    "One less mouth to feed in the army.",
    "Sent straight to the shadow realm!",
    "Snatched like a cookie from the jar.",
    "That piece was one day away from retirement."
  ],
  queen_capture: [
    "The queen has left the chat.",
    "ROYAL DOWN! We repeat: ROYAL DOWN!",
    "Someone just lost their primary reason for playing.",
    "Her Majesty has abdicated the throne (forcefully).",
    "That sound was a heart shattering into 64 pieces.",
    "The queen was sacrificed... or was it a giant mistake?",
    "Sirens are blaring in the throne room!",
    "Queen down! Hope you had a backup plan.",
    "Unforgivable regicide! Total throne room chaos!",
    "The highest ranking piece on the board has fallen!",
    "Massive royal trade-off or tragic oversight?",
    "Check the resignation button, someone might need it."
  ],
  check: [
    "Look who's nervous! King on notice.",
    "Check! Step to the side, Your Majesty.",
    "Your king's blood pressure just spiked.",
    "Knock knock. Who's there? Impending doom.",
    "King says: 'Can we talk about this like civilized adults?'",
    "Red alert! Move the royal behind some pawns quickly.",
    "Incoming missile! Check!",
    "The king is sweating through his royal robes.",
    "Run, royal, run! Danger is on your doorstep.",
    "Crown askew! The king feels the heat.",
    "Direct threat incoming! Evacuate the royal square.",
    "Sirens are sounding in the king's chambers!"
  ],
  castle: [
    "Castle built! King hides behind his drywall.",
    "The classic switcheroo. Very cozy in the corner.",
    "Rook slides in: 'Pardon me, Your Majesty.'",
    "Safety first! Now don't get back-ranked.",
    "Tucking the king into bed for the night.",
    "King sprinted into the fortress like it's raining.",
    "Castled! Now pray the f-pawn doesn't move.",
    "Housekeeping! The king has relocated to a safer zip code.",
    "The royal bunker is locked and sealed.",
    "Flank defense established! Maximum cozy fortress.",
    "Rook and King handshake in the corner.",
    "Castling complete: time to pretend we know what we're doing."
  ],
  promotion: [
    "From humble pawn to CEO of destruction!",
    "Started from the 2nd rank, now we're here!",
    "Corporate ladder climbed: maximum promotion achieved!",
    "Walked eight miles uphill in the snow for this crown.",
    "Promotion time! Say hello to the new powerhouse.",
    "A peasant no more. Bow down!",
    "The glow-up of the century has occurred.",
    "Diploma granted with highest royal honors!",
    "New royal unlocked! Chaos levels multiplied.",
    "Promoted to Queen! The board is officially terrifying.",
    "Hard work pays off: crowned on the 8th rank!",
    "Maximum power surge! The pawn has ascended."
  ],
  checkmate: [
    "Checkmate! The king's reign has officially ended.",
    "GG! Tip your king and fetch some warm tea.",
    "It's all over, folks! Time to analyze the replay.",
    "The board has fallen silent. Well played!",
    "King trapped in a corner with nowhere left to run.",
    "Fade to black. That's a wrap on this royal saga.",
    "Game over! Time to blame the mouse slip.",
    "The final curtain closes on the 64 squares.",
    "Total victory! Fireworks in the throne room!",
    "The king has fallen! Outstanding performance.",
    "Trophy delivered! A masterclass on 64 squares.",
    "Crown captured! That is game, set, and match!"
  ]
};

const lastJokeIndex = {};

function getRandomJoke(eventKey) {
  const list = JOKES[eventKey];
  if (!list || list.length === 0) return null;

  let index;
  do {
    index = Math.floor(Math.random() * list.length);
  } while (list.length > 1 && index === lastJokeIndex[eventKey]);

  lastJokeIndex[eventKey] = index;
  return list[index];
}

// ==========================================================================
// Board Snapshot Engine (Remembers pieces before moves for Ghost Clones)
// ==========================================================================
let boardSnapshot = {}; // Map: "square-XY" -> { square, pieceClass, rect, style }
let lastMoveSignature = "";
let previousPieceCount = 32;
let gameStartedLogged = false;

function extractSquareClass(el) {
  return Array.from(el.classList).find(c => c.startsWith("square-"));
}

function extractPieceTypeClass(el) {
  return Array.from(el.classList).find(c => c.length === 2 && /^[wb][prnbqk]$/.test(c));
}

function takeBoardSnapshot(board) {
  const newSnapshot = {};
  const pieces = board.querySelectorAll(".piece");

  pieces.forEach(p => {
    const sq = extractSquareClass(p);
    const pieceType = extractPieceTypeClass(p);
    if (sq && pieceType) {
      const rect = p.getBoundingClientRect();
      const comp = window.getComputedStyle(p);
      newSnapshot[sq] = {
        square: sq,
        pieceType: pieceType,
        rect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        },
        style: {
          backgroundImage: comp.backgroundImage,
          backgroundSize: comp.backgroundSize
        }
      };
    }
  });

  return newSnapshot;
}

function getMoveSignature(board) {
  const highlights = board.querySelectorAll(".highlight");
  const squareClasses = Array.from(highlights)
    .map(h => extractSquareClass(h))
    .filter(Boolean)
    .sort()
    .join("_");

  let notation = "";
  const lastNode = document.querySelector("vertical-move-list .node:last-child, .move-node-highlight");
  if (lastNode) notation = lastNode.textContent.trim();

  const pieceCount = board.querySelectorAll(".piece").length;
  return `${squareClasses}|${notation}|${pieceCount}`;
}

// ==========================================================================
// Mutation Handling & Capture Sequence Trigger
// ==========================================================================
function handleBoardMutations(board) {
  try {
    const signature = getMoveSignature(board);
    if (!signature || signature === lastMoveSignature) return;
    lastMoveSignature = signature;

    const currentPieces = board.querySelectorAll(".piece");
    const currentTotal = currentPieces.length;

    // If tab is in background, update internal state silently to save CPU
    if (document.hidden) {
      boardSnapshot = takeBoardSnapshot(board);
      previousPieceCount = currentTotal;
      return;
    }

  // A. Game Start
  if (currentTotal === 32 && !gameStartedLogged) {
    gameStartedLogged = true;
    previousPieceCount = 32;
    boardSnapshot = takeBoardSnapshot(board);
    if (settings.comedy_enabled && settings.comedy_jokes) {
      window.PawnHubEffects.showJoke(getRandomJoke("game_start"), "⚔️", settings.joke_duration, settings.joke_size);
    }
    if (window.PawnHubAudio) {
      window.PawnHubAudio.playEvent("game_start", "fanfare");
    }
    return;
  }

  if (currentTotal < 32) gameStartedLogged = true;

  // Determine board orientation (flipped = Black at bottom, user is Black)
  const isBoardFlipped = board.classList.contains("flipped") || !!document.querySelector(".board.flipped, wc-chess-board.flipped");

  // Highlights identify the origin and destination of the move
  const highlights = Array.from(board.querySelectorAll(".highlight"));
  const highlightSquares = highlights.map(h => extractSquareClass(h)).filter(Boolean);

  let fromSquare = null;
  let toSquare = null;

  // In chess.com, destination square currently contains a piece, origin square does not
  highlightSquares.forEach(sq => {
    const pieceOnSquare = board.querySelector(`.piece.${sq}`);
    if (pieceOnSquare) {
      toSquare = sq;
    } else {
      fromSquare = sq;
    }
  });

  // Read latest notation
  const lastNode = document.querySelector("vertical-move-list .node:last-child, .move-node-highlight");
  const moveText = lastNode ? lastNode.textContent.trim() : "";

  let isMyPiece = true;
  if (fromSquare && boardSnapshot[fromSquare]) {
    const isWhiteAttacker = boardSnapshot[fromSquare].pieceType.startsWith("w");
    isMyPiece = isBoardFlipped ? !isWhiteAttacker : isWhiteAttacker;
  }

  // B. Detect Capture
  if (fromSquare && toSquare && boardSnapshot[fromSquare] && boardSnapshot[toSquare]) {
    const attackerSnapshot = boardSnapshot[fromSquare];
    const victimSnapshot = boardSnapshot[toSquare];
    const realAttackerEl = board.querySelector(`.piece.${toSquare}`);

    const isQueenCapture = victimSnapshot.pieceType === "wq" || victimSnapshot.pieceType === "bq";
    const isRookCapture = victimSnapshot.pieceType === "wr" || victimSnapshot.pieceType === "br";
    const captureEventKey = isQueenCapture ? "queen_capture" : (isMyPiece ? "capture_mine" : "capture_opponent");

    console.log(`[PawnHub] Capture detected (${captureEventKey}): ${attackerSnapshot.pieceType} took ${victimSnapshot.pieceType} at ${toSquare}!`);

    if (settings.comedy_enabled && settings.comedy_effects) {
      window.PawnHubEffects.playCapture({
        attackerStyle: attackerSnapshot.style,
        victimStyle: victimSnapshot.style,
        fromRect: attackerSnapshot.rect,
        toRect: victimSnapshot.rect,
        realAttackerEl: realAttackerEl,
        isQueenCapture: isQueenCapture,
        isRookCapture: isRookCapture,
        eventKey: captureEventKey
      });
    } else {
      if (window.PawnHubAudio) window.PawnHubAudio.playEvent(captureEventKey, "bonk");
    }

    if (settings.comedy_enabled && settings.comedy_jokes) {
      const jokeKey = isQueenCapture ? "queen_capture" : "capture";
      const jokeIcon = isQueenCapture ? "👑" : "🪦";
      setTimeout(() => {
        window.PawnHubEffects.showJoke(getRandomJoke(jokeKey), jokeIcon, settings.joke_duration, settings.joke_size);
      }, 350);
    }
  }
  // C. Normal Move (Non-capture)
  else if (fromSquare && toSquare && boardSnapshot[fromSquare]) {
    const attackerSnapshot = boardSnapshot[fromSquare];
    const realPiece = board.querySelector(`.piece.${toSquare}`);
    const moveEventKey = isMyPiece ? "move_mine" : "move_opponent";

    if (realPiece && settings.comedy_enabled && settings.comedy_effects) {
      window.PawnHubEffects.playNormalMove(attackerSnapshot.rect, realPiece.getBoundingClientRect(), realPiece, { eventKey: moveEventKey });
    } else {
      if (window.PawnHubAudio) window.PawnHubAudio.playEvent(moveEventKey, "hop");
    }
  }

  // D. Castling
  if (moveText.includes("O-O")) {
    const kings = board.querySelectorAll(".piece.wk, .piece.bk");
    if (kings.length > 0 && settings.comedy_enabled && settings.comedy_effects) {
      const kRect = kings[0].getBoundingClientRect();
      window.PawnHubEffects.playCastling(kRect, kRect);
    } else {
      if (window.PawnHubAudio) window.PawnHubAudio.playEvent("castle", "party_horn");
    }
    if (settings.comedy_enabled && settings.comedy_jokes) {
      window.PawnHubEffects.showJoke(getRandomJoke("castle"), "🏰", settings.joke_duration, settings.joke_size);
    }
  }

  // E. Pawn Promotion
  if (moveText.includes("=")) {
    if (toSquare) {
      const promoPiece = board.querySelector(`.piece.${toSquare}`);
      if (promoPiece && settings.comedy_enabled && settings.comedy_effects) {
        window.PawnHubEffects.playPromotion(promoPiece.getBoundingClientRect());
      } else {
        if (window.PawnHubAudio) window.PawnHubAudio.playEvent("promotion", "level_up");
      }
    }
    if (settings.comedy_enabled && settings.comedy_jokes) {
      window.PawnHubEffects.showJoke(getRandomJoke("promotion"), "⭐", settings.joke_duration, settings.joke_size);
    }
  }

  // F. Check & Checkmate
  if (moveText.includes("#")) {
    const winEventKey = isMyPiece ? "win" : "lose";
    if (settings.comedy_enabled && settings.comedy_effects) {
      window.PawnHubEffects.playCheckmate(winEventKey);
    } else {
      if (window.PawnHubAudio) window.PawnHubAudio.playEvent(winEventKey, winEventKey === "win" ? "victory" : "sad_trombone");
    }
    if (settings.comedy_enabled && settings.comedy_jokes) {
      window.PawnHubEffects.showJoke(getRandomJoke("checkmate"), "🏆", settings.joke_duration, settings.joke_size);
    }
  } else if (moveText.includes("+")) {
    const kings = board.querySelectorAll(".piece.wk, .piece.bk");
    if (kings.length > 0 && settings.comedy_enabled && settings.comedy_effects) {
      window.PawnHubEffects.playCheck(kings[0].getBoundingClientRect());
    } else {
      if (window.PawnHubAudio) window.PawnHubAudio.playEvent("check", "alarm");
    }
    if (settings.comedy_enabled && settings.comedy_jokes) {
      window.PawnHubEffects.showJoke(getRandomJoke("check"), "⚠️", settings.joke_duration, settings.joke_size);
    }
  }

  // Save new snapshot for subsequent move comparison
  boardSnapshot = takeBoardSnapshot(board);
  previousPieceCount = currentTotal;
  } catch (err) {
    console.warn("[PawnHub] Safe guard caught mutation handling error:", err.message);
  }
}

let currentBoardObserver = null;
let currentBodyObserver = null;

function observeBoard(board) {
  if (!board || board.__pawnhub_observed) return;
  board.__pawnhub_observed = true;

  if (currentBoardObserver) {
    try { currentBoardObserver.disconnect(); } catch (e) {}
  }
  if (currentBodyObserver) {
    try { currentBodyObserver.disconnect(); } catch (e) {}
  }

  console.log("[PawnHub] Connected High-Impact MutationObserver to <wc-chess-board>.");
  boardSnapshot = takeBoardSnapshot(board);
  previousPieceCount = board.querySelectorAll(".piece").length;
  lastMoveSignature = getMoveSignature(board);

  let debounceTimer = null;
  currentBoardObserver = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      try {
        handleBoardMutations(board);
      } catch (err) {
        console.warn("[PawnHub] Safe guard caught mutation error:", err.message);
      }
    }, 35);
  });

  currentBoardObserver.observe(board, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });

  // Watch for game-over popup (Win / Lose / Draw) & board reconnections with throttle
  let bodyThrottle = null;
  currentBodyObserver = new MutationObserver(() => {
    if (bodyThrottle) return;
    bodyThrottle = setTimeout(() => {
      bodyThrottle = null;
      try {
        if (!board.isConnected) {
          if (currentBoardObserver) currentBoardObserver.disconnect();
          if (currentBodyObserver) currentBodyObserver.disconnect();
          board.__pawnhub_observed = false;
          attachBoardWatcher();
          return;
        }

        const gameOverModal = document.querySelector(".game-over-modal-shell-content, .game-result-component, [data-cy='game-over-modal']");
        if (gameOverModal && !gameOverModal.dataset.pawnhubSeen) {
          gameOverModal.dataset.pawnhubSeen = "true";
          const isBoardFlipped = !!document.querySelector("wc-chess-board.flipped, .board.flipped");
          const modalText = (gameOverModal.textContent || "").toLowerCase();
          let resultKey = "win";
          if (modalText.includes("draw") || modalText.includes("stalemate") || modalText.includes("repetition") || modalText.includes("agreed") || modalText.includes("insufficient")) {
            resultKey = "draw";
          } else if (modalText.includes("lost") || modalText.includes("defeat") || (modalText.includes("black won") && !isBoardFlipped) || (modalText.includes("white won") && isBoardFlipped)) {
            resultKey = "lose";
          }

          if (settings.comedy_enabled && settings.comedy_effects) {
            window.PawnHubEffects.playCheckmate(resultKey);
          } else {
            if (window.PawnHubAudio) window.PawnHubAudio.playEvent(resultKey, resultKey === "lose" ? "sad_trombone" : (resultKey === "draw" ? "ding" : "victory"));
          }

          if (settings.comedy_enabled && settings.comedy_jokes) {
            window.PawnHubEffects.showJoke(getRandomJoke("checkmate"), "🏆", settings.joke_duration, settings.joke_size);
          }
        }
      } catch (err) {
        console.warn("[PawnHub] Safe guard caught body observer error:", err.message);
      }
    }, 150);
  });

  currentBodyObserver.observe(document.body, { childList: true, subtree: true });
}

// ==========================================================================
// Style Injection Engine (12 Themes + User Custom Overrides)
// ==========================================================================
function getOrCreateStyleElement() {
  let styleEl = document.getElementById("pawnhub-custom-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "pawnhub-custom-styles";
    (document.head || document.documentElement).appendChild(styleEl);
  }
  return styleEl;
}

function applyCustomStyles() {
  const styleEl = getOrCreateStyleElement();
  let cssRules = [];

  const themeId = settings.pawnhub_theme || "default";

  // 1. Check for 5 Premium Handcrafted Piece Sets
  if (window.PawnHubPremiumSets && window.PawnHubPremiumSets.get(themeId)) {
    const premiumSet = window.PawnHubPremiumSets.get(themeId);

    // Matching board background
    if (premiumSet.board) {
      const boardSvgUrl = generateBoardSvg(premiumSet.board.light, premiumSet.board.dark);
      cssRules.push(`
        wc-chess-board, .chessboard-component, .board {
          background-image: url("${boardSvgUrl}") !important;
          background-size: 100% 100% !important;
          background-repeat: no-repeat !important;
        }
      `);
    }

    // Handcrafted premium vector pieces (distinct silhouettes, gradients, 3D shading)
    Object.keys(premiumSet.pieces).forEach(pKey => {
      const svgUrl = premiumSet.pieces[pKey];
      cssRules.push(`
        wc-chess-board .piece.${pKey},
        .board .piece.${pKey},
        #board-layout-chessboard .piece.${pKey},
        .piece.${pKey} {
          background-image: url("${svgUrl}") !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
      `);
    });
  }
  // 2. Fallback to 12 Themed Board & Emojis
  else {
    const theme = (typeof PAWNHUB_THEMES !== "undefined" && PAWNHUB_THEMES[themeId]) ? PAWNHUB_THEMES[themeId] : null;

    if (theme && theme.board) {
      const boardSvgUrl = generateBoardSvg(theme.board.light, theme.board.dark);
      cssRules.push(`
        wc-chess-board, .chessboard-component, .board {
          background-image: url("${boardSvgUrl}") !important;
          background-size: 100% 100% !important;
          background-repeat: no-repeat !important;
        }
      `);
    }

    if (theme && theme.pieces) {
      const pieceTypes = ["p", "n", "b", "r", "q", "k"];
      pieceTypes.forEach(p => {
        const emoji = theme.pieces[p];
        if (emoji) {
          const whiteSvg = generateThemedPieceSvg(emoji, true, themeId);
          const blackSvg = generateThemedPieceSvg(emoji, false, themeId);

          cssRules.push(`
            wc-chess-board .piece.w${p}, .board .piece.w${p}, .piece.w${p} {
              background-image: url("${whiteSvg}") !important;
              background-size: contain !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
            }
            wc-chess-board .piece.b${p}, .board .piece.b${p}, .piece.b${p} {
              background-image: url("${blackSvg}") !important;
              background-size: contain !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
            }
          `);
        }
      });
    }
  }

  const customPieces = settings.pawnhub_pieces || {};
  Object.keys(customPieces).forEach((pieceKey) => {
    const dataUrl = customPieces[pieceKey];
    if (dataUrl) {
      cssRules.push(`
        wc-chess-board .piece.${pieceKey},
        .board .piece.${pieceKey},
        #board-layout-chessboard .piece.${pieceKey},
        .piece.${pieceKey} {
          background-image: url("${dataUrl}") !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
      `);
    }
  });

  styleEl.textContent = cssRules.join("\n");
}

// ==========================================================================
// Initialization
// ==========================================================================
function initPawnHub() {
  try {
    console.log("%c[PawnHub]%c Initializing PawnHub Big Comedy Engine...", "color: #38bdf8; font-weight: bold;", "color: inherit;");

    chrome.storage.local.get(null, (stored) => {
      try {
        if (chrome.runtime.lastError || !stored || typeof stored !== "object") stored = {};
        settings = { ...settings, ...stored };

        // Apply Audio Volume & Custom Sounds
        if (window.PawnHubAudio) {
          window.PawnHubAudio.setVolume(settings.comedy_volume);
          window.PawnHubAudio.setMuted(!settings.comedy_sounds || !settings.comedy_enabled);
          if (stored.pawnhub_custom_sounds) {
            window.PawnHubAudio.loadCustomSounds(stored.pawnhub_custom_sounds);
            if (stored.pawnhub_custom_sounds.mute_chesscom) {
              setChesscomMuteState(true);
            }
          }
        }

        applyCustomStyles();
        attachBoardWatcher();
      } catch (err) {
        console.warn("[PawnHub] Error during storage load:", err.message);
      }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      try {
        Object.keys(changes).forEach(key => {
          settings[key] = changes[key].newValue;
        });

        if (window.PawnHubAudio) {
          window.PawnHubAudio.setVolume(settings.comedy_volume);
          window.PawnHubAudio.setMuted(!settings.comedy_sounds || !settings.comedy_enabled);
        }

        if (changes.pawnhub_custom_sounds && window.PawnHubAudio) {
          window.PawnHubAudio.loadCustomSounds(changes.pawnhub_custom_sounds.newValue);
          if (changes.pawnhub_custom_sounds.newValue?.mute_chesscom !== undefined) {
            setChesscomMuteState(changes.pawnhub_custom_sounds.newValue.mute_chesscom);
          }
        }

        applyCustomStyles();
      } catch (err) {
        console.warn("[PawnHub] Error during storage change handling:", err.message);
      }
    });
  } catch (err) {
    console.warn("[PawnHub] Error initializing extension:", err.message);
  }
}

function setChesscomMuteState(enabled) {
  window.__pawnhub_mute_chesscom = !!enabled;
  if (enabled && !document.getElementById("pawnhub-mute-script")) {
    const script = document.createElement("script");
    script.id = "pawnhub-mute-script";
    script.textContent = `
      (function() {
        window.__pawnhub_mute_chesscom = true;
        const origPlay = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function() {
          try {
            if (window.__pawnhub_mute_chesscom && this.src && (this.src.includes(".mp3") || this.src.includes("/sounds/"))) {
              this.muted = true;
              return Promise.resolve();
            }
          } catch(e) {}
          return origPlay.apply(this, arguments);
        };
      })();
    `;
    (document.head || document.documentElement).appendChild(script);
  }
}

let watcherTimer = null;
let watcherTimeout = null;

function attachBoardWatcher() {
  if (watcherTimer) clearInterval(watcherTimer);
  if (watcherTimeout) clearTimeout(watcherTimeout);

  const findAndWatchBoard = () => {
    const board = document.querySelector("wc-chess-board, .chessboard, #board-layout-chessboard wc-chess-board");
    if (board) {
      if (watcherTimer) {
        clearInterval(watcherTimer);
        watcherTimer = null;
      }
      if (watcherTimeout) {
        clearTimeout(watcherTimeout);
        watcherTimeout = null;
      }
      observeBoard(board);
      return true;
    }
    return false;
  };

  if (!findAndWatchBoard()) {
    watcherTimer = setInterval(() => {
      if (findAndWatchBoard()) {
        clearInterval(watcherTimer);
        watcherTimer = null;
      }
    }, 1000);
    watcherTimeout = setTimeout(() => {
      if (watcherTimer) {
        clearInterval(watcherTimer);
        watcherTimer = null;
      }
    }, 30000);
  }
}

// ==========================================================================
// Kickoff
// ==========================================================================
try {
  initPawnHub();
} catch (err) {
  console.warn("[PawnHub] Safe guard caught an error during initialization:", err);
}
