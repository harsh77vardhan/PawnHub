// ==========================================================================
// PawnHub - Big Animation & Overlay Engine (Stage 2)
// ==========================================================================
// Renders all comic bursts, ghost piece animations, shockwaves, particles,
// and speech bubble jokes into a single fixed full-screen overlay layer.
// Uses getBoundingClientRect() so effects NEVER get clipped by chess.com overflow.

(function () {
  let overlayContainer = null;
  let particleCanvas = null;
  let pCtx = null;
  let activeParticles = [];
  let isAnimationLoopRunning = false;

  // Track last used variants to avoid back-to-back repeats
  let lastCaptureVariant = "";
  let lastNormalVariant = "";

  // 1. Initialize Full-Screen Overlay Container
  function getOverlayContainer() {
    if (!overlayContainer || !document.body.contains(overlayContainer)) {
      overlayContainer = document.getElementById("pawnhub-overlay-container");
      if (!overlayContainer) {
        overlayContainer = document.createElement("div");
        overlayContainer.id = "pawnhub-overlay-container";
        overlayContainer.className = "pawnhub-fullscreen-overlay";
        document.body.appendChild(overlayContainer);
      }
    }
    return overlayContainer;
  }

  // 2. Initialize Particle Canvas inside Overlay
  function getParticleCanvas() {
    if (!particleCanvas || !document.body.contains(particleCanvas)) {
      const container = getOverlayContainer();
      particleCanvas = document.getElementById("pawnhub-particle-canvas");
      if (!particleCanvas) {
        particleCanvas = document.createElement("canvas");
        particleCanvas.id = "pawnhub-particle-canvas";
        particleCanvas.className = "pawnhub-particle-canvas";
        container.appendChild(particleCanvas);
      }
      pCtx = particleCanvas.getContext("2d");
      resizeParticleCanvas();
    }
    return particleCanvas;
  }

  function resizeParticleCanvas() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeParticleCanvas);

  // 3. Particle System (Capped count, auto-stops when idle for high performance)
  function emitParticles(x, y, count = 24, colors = ["#f59e0b", "#ef4444", "#38bdf8", "#ec4899", "#ffffff"]) {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    getParticleCanvas();
    const safeCount = Math.min(count, 40); // Cap particles

    for (let i = 0; i < safeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      activeParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // Slight upward burst
        size: 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: 0.018 + Math.random() * 0.02,
        gravity: 0.28
      });
    }

    if (!isAnimationLoopRunning) {
      isAnimationLoopRunning = true;
      requestAnimationFrame(renderParticles);
    }
  }

  function renderParticles() {
    if (!pCtx || activeParticles.length === 0) {
      if (pCtx && particleCanvas) pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      isAnimationLoopRunning = false;
      return;
    }

    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = activeParticles.length - 1; i >= 0; i--) {
      const p = activeParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        activeParticles.splice(i, 1);
        continue;
      }

      pCtx.save();
      pCtx.globalAlpha = Math.max(0, p.alpha);
      pCtx.fillStyle = p.color;
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.restore();
    }

    requestAnimationFrame(renderParticles);
  }

  // 4. Comic Burst Text ("BONK!", "POW!", "WHAM!", "KABOOM!", etc.)
  function spawnComicBurst(text, x, y, scale = 1.0, colorTheme = "yellow") {
    const container = getOverlayContainer();
    const burst = document.createElement("div");
    burst.className = `pawnhub-comic-burst theme-${colorTheme}`;
    burst.textContent = text;
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    burst.style.transform = `translate(-50%, -50%) scale(${scale})`;

    container.appendChild(burst);
    setTimeout(() => burst.remove(), 1200);
  }

  // 5. Shockwave Ring
  function spawnShockwave(x, y, size = 260) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = getOverlayContainer();
    const ring = document.createElement("div");
    ring.className = "pawnhub-shockwave-ring";
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.style.width = `${size}px`;
    ring.style.height = `${size}px`;

    container.appendChild(ring);
    setTimeout(() => ring.remove(), 800);
  }

  // 6. Big Centered Speech Bubble Joke Banner (Part 1 - Item 3)
  function showBigJokeBanner(text, icon = "♟️", durationMs = 3800, fontSize = "30px") {
    const container = getOverlayContainer();

    // Remove any existing active joke banner smoothly
    const existing = container.querySelector(".pawnhub-big-joke-banner");
    if (existing) existing.remove();

    // Center over board if available, otherwise viewport center
    const board = document.querySelector("wc-chess-board, .board");
    let left = window.innerWidth / 2;
    let top = window.innerHeight / 2;

    if (board) {
      const bRect = board.getBoundingClientRect();
      left = bRect.left + bRect.width / 2;
      top = bRect.top + bRect.height / 2;
    }

    const banner = document.createElement("div");
    banner.className = "pawnhub-big-joke-banner";
    banner.style.left = `${left}px`;
    banner.style.top = `${top}px`;
    banner.style.fontSize = fontSize;
    const bubble = document.createElement("div");
    bubble.className = "joke-bubble";

    const iconSpan = document.createElement("span");
    iconSpan.className = "joke-icon";
    iconSpan.textContent = icon;

    const textSpan = document.createElement("span");
    textSpan.className = "joke-text";
    textSpan.textContent = text;

    bubble.appendChild(iconSpan);
    bubble.appendChild(textSpan);
    banner.appendChild(bubble);

    container.appendChild(banner);

    // Fade out after duration
    setTimeout(() => {
      banner.classList.add("fading-out");
      setTimeout(() => banner.remove(), 400);
    }, Math.max(2500, durationMs));
  }

  // 7. Screen Shake
  function triggerScreenShake(intensity = "medium") {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const board = document.querySelector("wc-chess-board, .board") || document.body;
    board.classList.remove("pawnhub-screen-shake-light", "pawnhub-screen-shake-heavy");
    void board.offsetWidth; // Force reflow

    const cls = intensity === "heavy" ? "pawnhub-screen-shake-heavy" : "pawnhub-screen-shake-light";
    board.classList.add(cls);
    setTimeout(() => board.classList.remove(cls), intensity === "heavy" ? 600 : 400);
  }

  // 8. Capture Variants Engine ("Bonk and Fly")
  const CAPTURE_VARIANTS = [
    { id: "bonk", name: "Ram & Launch", sound: "bonk", text: "BONK!", color: "yellow" },
    { id: "karate", name: "Karate Chop", sound: "karate", text: "HI-YAH!", color: "cyan" },
    { id: "cannon", name: "Cannon Shot", sound: "kaboom", text: "BOOM!", color: "orange" },
    { id: "slip", name: "Banana Slip", sound: "splat", text: "WHOOPS!", color: "yellow" },
    { id: "sumo", name: "Sumo Shove", sound: "wham", text: "WHAM!", color: "purple" },
    { id: "vacuum", name: "Vacuum Suck", sound: "slurp", text: "SLURP!", color: "blue" }
  ];

  function getNextCaptureVariant(isHighValue = false) {
    if (isHighValue) return { id: "cannon", name: "Mega Cannon", sound: "kaboom", text: "KABOOM!", color: "orange" };

    const pool = CAPTURE_VARIANTS.filter(v => v.id !== lastCaptureVariant);
    const chosen = pool[Math.floor(Math.random() * pool.length)] || CAPTURE_VARIANTS[0];
    lastCaptureVariant = chosen.id;
    return chosen;
  }

  function playCaptureSequence({
    attackerStyle,
    victimStyle,
    fromRect,
    toRect,
    realAttackerEl,
    isQueenCapture = false,
    isRookCapture = false,
    eventKey = null
  }) {
    const container = getOverlayContainer();
    const isHighValue = isQueenCapture || isRookCapture;
    const variant = getNextCaptureVariant(isHighValue);

    // Calculate vectors
    const dx = toRect.left - fromRect.left;
    const dy = toRect.top - fromRect.top;
    const distance = Math.hypot(dx, dy);
    const impactX = toRect.left + toRect.width / 2;
    const impactY = toRect.top + toRect.height / 2;

    const finalEventKey = eventKey || (isQueenCapture ? "queen_capture" : "capture_mine");

    // A. Temporarily hide real attacker piece so it doesn't appear doubled
    if (realAttackerEl) realAttackerEl.style.opacity = "0";

    // B. Create Attacker Ghost Clone
    const attackerGhost = document.createElement("div");
    attackerGhost.className = "pawnhub-ghost-piece attacker-ghost";
    attackerGhost.style.width = `${fromRect.width}px`;
    attackerGhost.style.height = `${fromRect.height}px`;
    attackerGhost.style.left = `${fromRect.left}px`;
    attackerGhost.style.top = `${fromRect.top}px`;
    attackerGhost.style.backgroundImage = attackerStyle.backgroundImage;
    attackerGhost.style.backgroundSize = attackerStyle.backgroundSize || "contain";
    attackerGhost.style.backgroundRepeat = "no-repeat";
    attackerGhost.style.backgroundPosition = "center";
    container.appendChild(attackerGhost);

    // Play whoosh before impact
    if (window.PawnHubAudio) window.PawnHubAudio.play("whoosh");

    // Wind-up & Lunge Animation
    const lungeDuration = 340; // ms
    const keyframes = [
      { transform: "translate(0, 0) scale(1)", offset: 0 },
      { transform: `translate(${-dx * 0.15}px, ${-dy * 0.15}px) scale(0.9) rotate(-10deg)`, offset: 0.3 }, // Wind-up pullback
      { transform: `translate(${dx}px, ${dy}px) scale(1.2, 0.8) rotate(5deg)`, offset: 1.0 } // Squash & stretch on impact
    ];

    const travelAnim = attackerGhost.animate(keyframes, {
      duration: lungeDuration,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      fill: "forwards"
    });

    travelAnim.onfinish = () => {
      // 1. Remove attacker ghost and reveal real piece at destination
      attackerGhost.remove();
      if (realAttackerEl) realAttackerEl.style.opacity = "1";

      // 2. Play Impact Audio & Effects (Custom Sound priority, fallback to comedy)
      if (window.PawnHubAudio) {
        const customPlayed = window.PawnHubAudio.playEvent(finalEventKey, variant.sound);
        if (!customPlayed && isQueenCapture) setTimeout(() => window.PawnHubAudio.play("boing"), 150);
      }

      spawnComicBurst(variant.text, impactX, impactY, isQueenCapture ? 1.5 : 1.15, variant.color);
      spawnShockwave(impactX, impactY, isQueenCapture ? 420 : 280);
      emitParticles(impactX, impactY, isQueenCapture ? 36 : 24);
      triggerScreenShake(isQueenCapture ? "heavy" : "medium");

      // 3. Launch Victim Ghost Flying away
      if (victimStyle && victimStyle.backgroundImage) {
        const victimGhost = document.createElement("div");
        victimGhost.className = "pawnhub-ghost-piece victim-ghost";
        victimGhost.style.width = `${toRect.width}px`;
        victimGhost.style.height = `${toRect.height}px`;
        victimGhost.style.left = `${toRect.left}px`;
        victimGhost.style.top = `${toRect.top}px`;
        victimGhost.style.backgroundImage = victimStyle.backgroundImage;
        victimGhost.style.backgroundSize = victimStyle.backgroundSize || "contain";
        victimGhost.style.backgroundRepeat = "no-repeat";
        victimGhost.style.backgroundPosition = "center";
        container.appendChild(victimGhost);

        // Normalized fly-away direction vector
        const pushDirX = distance > 0 ? (dx / distance) : 1;
        const pushDirY = distance > 0 ? (dy / distance) : -0.5;
        const launchDist = 280 + Math.random() * 140;
        const targetX = pushDirX * launchDist;
        const targetY = pushDirY * launchDist - 120; // Arc upward

        const flyAnim = victimGhost.animate([
          { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
          { transform: `translate(${targetX * 0.5}px, ${targetY}px) scale(1.15) rotate(380deg)`, opacity: 0.9, offset: 0.5 },
          { transform: `translate(${targetX}px, ${targetY + 160}px) scale(0.6) rotate(760deg)`, opacity: 0 } // Bounce & fade
        ], {
          duration: 950,
          easing: "cubic-bezier(0.12, 0, 0.39, 0)",
          fill: "forwards"
        });

        flyAnim.onfinish = () => {
          victimGhost.remove();

          // Spawn floating RIP tombstone at impact point
          const rip = document.createElement("div");
          rip.className = "pawnhub-big-rip-marker";
          rip.textContent = "🪦";
          rip.style.left = `${impactX}px`;
          rip.style.top = `${impactY}px`;
          container.appendChild(rip);
          setTimeout(() => rip.remove(), 1400);
        };
      }
    };
  }

  // 9. Normal Move Animation (Bounce / Hop arc / Dust trail)
  function playNormalMoveAnimation(fromRect, toRect, pieceEl, options = {}) {
    if (!fromRect || !toRect || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = getOverlayContainer();

    // Spawn dust puff at origin
    const dustX = fromRect.left + fromRect.width / 2;
    const dustY = fromRect.top + fromRect.height / 2;
    emitParticles(dustX, dustY, 8, ["#94a3b8", "#cbd5e1", "#e2e8f0"]);

    // Bouncy wobble landing on target square
    const destX = toRect.left + toRect.width / 2;
    const destY = toRect.top + toRect.height / 2;
    const ring = document.createElement("div");
    ring.className = "pawnhub-hop-ring";
    ring.style.left = `${destX}px`;
    ring.style.top = `${destY}px`;
    container.appendChild(ring);
    setTimeout(() => ring.remove(), 500);

    if (window.PawnHubAudio) window.PawnHubAudio.playEvent(options?.eventKey || "move_mine", "hop");
  }

  // 10. Castling Dance Swap
  function playCastlingAnimation(kingRect, rookRect) {
    const container = getOverlayContainer();
    const centerX = (kingRect.left + rookRect.left) / 2;
    const centerY = (kingRect.top + rookRect.top) / 2;

    spawnComicBurst("ROYAL SWAP!", centerX, centerY, 1.25, "cyan");
    emitParticles(centerX, centerY, 30, ["#fef08a", "#38bdf8", "#ec4899", "#ffffff"]);
    if (window.PawnHubAudio) {
      const customPlayed = window.PawnHubAudio.playEvent("castle", "party_horn");
      if (!customPlayed) setTimeout(() => window.PawnHubAudio.play("ding"), 200);
    }
  }

  // 11. Check Panic Animation
  function playCheckAnimation(kingRect) {
    const container = getOverlayContainer();
    const kx = kingRect.left + kingRect.width / 2;
    const ky = kingRect.top + kingRect.height / 2;

    spawnComicBurst("CHECK!", kx, ky - 50, 1.35, "orange");
    spawnShockwave(kx, ky, 320);

    // Sweat drops
    for (let i = 0; i < 3; i++) {
      const drop = document.createElement("div");
      drop.className = "pawnhub-sweat-drop";
      drop.textContent = "💦";
      drop.style.left = `${kx + (i - 1) * 36}px`;
      drop.style.top = `${ky - 30}px`;
      container.appendChild(drop);
      setTimeout(() => drop.remove(), 1000);
    }

    if (window.PawnHubAudio) {
      const customPlayed = window.PawnHubAudio.playEvent("check", "alarm");
      if (!customPlayed) setTimeout(() => window.PawnHubAudio.play("drip"), 250);
    }
  }

  // 12. Checkmate Confetti & Victory Banner
  function playCheckmateAnimation(eventKey = "win") {
    const board = document.querySelector("wc-chess-board, .board");
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    if (board) {
      const bRect = board.getBoundingClientRect();
      cx = bRect.left + bRect.width / 2;
      cy = bRect.top + bRect.height / 2;
    }

    // Celebration explosion
    emitParticles(cx, cy, 60, ["#f59e0b", "#ef4444", "#38bdf8", "#ec4899", "#10b981", "#ffffff"]);
    spawnComicBurst(eventKey === "lose" ? "DEFEAT 💀" : (eventKey === "draw" ? "STALEMATE 🤝" : "CHECKMATE! 🏆"), cx, cy, 1.6, eventKey === "lose" ? "cyan" : "yellow");
    triggerScreenShake("heavy");

    if (window.PawnHubAudio) {
      const customPlayed = window.PawnHubAudio.playEvent(eventKey, eventKey === "lose" ? "sad_trombone" : (eventKey === "draw" ? "ding" : "victory"));
      if (!customPlayed && eventKey === "win") setTimeout(() => window.PawnHubAudio.play("applause"), 300);
    }
  }

  // 13. Pawn Promotion
  function playPromotionAnimation(rect) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnComicBurst("PROMOTED! 👑", cx, cy, 1.3, "yellow");
    emitParticles(cx, cy, 32, ["#fef08a", "#f59e0b", "#ec4899", "#ffffff"]);
    if (window.PawnHubAudio) window.PawnHubAudio.playEvent("promotion", "level_up");
  }

  function safeWrap(fn, name) {
    return function (...args) {
      try {
        return fn(...args);
      } catch (err) {
        console.warn(`[PawnHub Effects] Safe guard caught error in ${name}:`, err.message);
      }
    };
  }

  // Public Effects API
  window.PawnHubEffects = {
    showJoke: safeWrap(showBigJokeBanner, "showJoke"),
    playCapture: safeWrap(playCaptureSequence, "playCapture"),
    playNormalMove: safeWrap(playNormalMoveAnimation, "playNormalMove"),
    playCastling: safeWrap(playCastlingAnimation, "playCastling"),
    playCheck: safeWrap(playCheckAnimation, "playCheck"),
    playCheckmate: safeWrap(playCheckmateAnimation, "playCheckmate"),
    playPromotion: safeWrap(playPromotionAnimation, "playPromotion"),
    burst: safeWrap(spawnComicBurst, "burst"),
    shake: safeWrap(triggerScreenShake, "shake"),
    particles: safeWrap(emitParticles, "particles"),
    getContainer: getOverlayContainer
  };
})();
