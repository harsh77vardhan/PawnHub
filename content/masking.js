// ==========================================================================
// PawnHub - Piece Shape Masking & Custom Photo Molding Engine
// ==========================================================================
// Clips user-uploaded photos to 6 original, handcrafted chess silhouettes.
// Adds high-contrast rims, side outlines, optional corner badges, and pre-renders
// 256x256 PNGs via HTML5 Canvas for instant, glitch-free board rendering.

(function () {
  // 1. Handcrafted 256x256 Piece Silhouettes (Single closed paths, flat bases)
  const PIECE_SILHOUETTES = {
    // PAWN: Compact round head, tapered neck, ring collar, flared flat base
    p: "M 68 232 L 188 232 C 188 220 180 214 170 214 C 164 180 154 142 158 128 C 162 128 168 122 168 116 C 168 110 160 106 158 104 C 164 94 166 82 166 72 C 166 46 148 28 128 28 C 108 28 90 46 90 72 C 90 82 92 94 98 104 C 96 106 88 110 88 116 C 88 122 94 128 98 128 C 102 142 92 180 86 214 C 76 214 68 220 68 232 Z",

    // ROOK: Sturdy castle tower with 3 bold crenellated battlements
    r: "M 60 232 L 196 232 C 196 218 184 212 174 212 L 168 102 L 192 102 L 192 52 L 164 52 L 164 74 L 146 74 L 146 52 L 110 52 L 110 74 L 92 74 L 92 52 L 64 52 L 64 102 L 88 102 L 82 212 C 72 212 60 218 60 232 Z",

    // KNIGHT: Distinctive equine stallion head facing left with snout, ear, and arched neck
    n: "M 60 232 L 196 232 C 196 218 184 210 174 210 C 172 164 186 128 180 96 C 174 68 152 46 142 34 L 138 22 C 136 18 128 20 128 26 L 126 32 C 120 34 112 36 102 44 C 94 36 84 38 78 46 C 70 54 62 68 56 82 C 50 96 54 104 64 106 C 74 108 86 104 94 96 C 90 108 74 122 74 134 C 74 148 94 156 94 170 C 94 186 84 198 82 210 C 72 210 60 218 60 232 Z",

    // BISHOP: Cathedral mitre with pointed apex finial orb and carved cleft notch
    b: "M 64 232 L 192 232 C 192 220 182 214 172 214 C 164 184 156 146 156 138 C 166 126 176 106 174 88 C 172 74 164 62 152 50 L 142 62 L 134 54 L 144 42 C 138 36 134 32 128 28 A 10 10 0 1 0 128 12 A 10 10 0 0 0 128 28 C 122 32 118 36 112 42 C 92 62 82 86 82 108 C 82 126 90 134 100 138 C 100 146 92 184 84 214 C 74 214 64 220 64 232 Z",

    // QUEEN: Flared royal gown and 5-spiked coronet with radiating jewel pearls
    q: "M 56 232 L 200 232 C 200 218 188 212 178 212 C 168 184 156 144 154 128 L 176 128 L 200 76 A 6 6 0 1 0 196 68 L 170 56 A 6 6 0 1 0 164 48 L 128 38 A 7 7 0 1 0 128 24 A 7 7 0 0 0 128 38 L 92 48 A 6 6 0 1 0 86 56 L 60 68 A 6 6 0 1 0 56 76 L 80 128 L 102 128 C 100 144 88 184 78 212 C 68 212 56 218 56 232 Z",

    // KING: Royal broad-shouldered mantle with tall dome and prominent Greek Cross
    k: "M 56 232 L 200 232 C 200 218 188 212 178 212 C 170 178 158 142 156 128 C 168 116 178 94 176 72 C 174 62 168 54 156 46 L 156 36 L 148 36 L 148 24 L 134 24 L 134 14 L 122 14 L 122 24 L 108 24 L 108 36 L 100 36 L 100 46 C 88 54 82 62 80 72 C 78 94 88 116 100 128 C 98 142 86 178 78 212 C 68 212 56 218 56 232 Z"
  };

  const BADGE_LETTERS = {
    p: "P",
    n: "N",
    b: "B",
    r: "R",
    q: "Q",
    k: "K"
  };

  // Helper to pre-cache Path2D objects for instant canvas rendering
  const PATH2D_CACHE = {};
  function getPath2D(type) {
    if (!PATH2D_CACHE[type] && PIECE_SILHOUETTES[type]) {
      PATH2D_CACHE[type] = new Path2D(PIECE_SILHOUETTES[type]);
    }
    return PATH2D_CACHE[type];
  }

  // 2. Shape Masking & Rendering Engine
  function renderPieceMasked({
    imageEl,
    pieceType = "p",
    isWhite = true,
    mode = "silhouette", // "silhouette", "badge", "original"
    zoom = 1.0,
    offsetX = 0,
    offsetY = 0,
    canvasSize = 256,
    targetCanvas = null
  }) {
    const canvas = targetCanvas || document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // MODE: "original" (Unclipped photo with subtle rounded border)
    if (mode === "original") {
      ctx.save();
      // Drop shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Rounded rect clip
      const r = 24;
      ctx.beginPath();
      ctx.roundRect(16, 16, canvasSize - 32, canvasSize - 32, r);
      ctx.fillStyle = isWhite ? "#ffffff" : "#0f172a";
      ctx.fill();
      ctx.clip();

      if (imageEl) {
        drawFittedImage(ctx, imageEl, canvasSize, zoom, offsetX, offsetY);
      } else {
        ctx.fillStyle = isWhite ? "#f1f5f9" : "#1e293b";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = isWhite ? "#64748b" : "#94a3b8";
        ctx.font = "bold 15px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Upload Photo", canvasSize / 2, canvasSize / 2);
      }
      ctx.restore();

      // Outer rim
      ctx.lineWidth = 4;
      ctx.strokeStyle = isWhite ? "#ffffff" : "#38bdf8";
      ctx.beginPath();
      ctx.roundRect(16, 16, canvasSize - 32, canvasSize - 32, r);
      ctx.stroke();

      return canvas.toDataURL("image/png");
    }

    // MODE: "silhouette" OR "badge"
    const path = getPath2D(pieceType);
    if (!path) return "";

    // Step A: Draw Drop Shadow
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = isWhite ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.4)";
    ctx.fill(path);
    ctx.restore();

    // Step B: Clip User Photo to Piece Silhouette
    ctx.save();
    ctx.clip(path);

    // Base background behind photo (avoids transparency holes)
    ctx.fillStyle = isWhite ? "#fef08a" : "#1e1b4b";
    ctx.fill(path);

    if (imageEl) {
      drawFittedImage(ctx, imageEl, canvasSize, zoom, offsetX, offsetY);
    } else {
      ctx.fillStyle = isWhite ? "#fef08a" : "#1e293b";
      ctx.fill(path);
      ctx.fillStyle = isWhite ? "#854d0e" : "#94a3b8";
      ctx.font = "bold 14px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Upload Photo", canvasSize / 2, canvasSize / 2 + 10);
    }
    ctx.restore();

    // Step C: High-Contrast Multi-Layer Side Outlines
    // White pieces: Dark 2px outer line + 5px crisp white/gold inner rim (pops on both light and dark squares)
    // Black pieces: Crisp 2px white outer line + 5px deep obsidian/cyan inner rim (pops on both light and dark squares)
    ctx.save();
    if (isWhite) {
      // 1. Thin contrasting outer edge
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#0f172a";
      ctx.stroke(path);

      // 2. Bright luminous inner rim
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke(path);

      // 3. Subtle gold inner bevel accent
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#f59e0b";
      ctx.stroke(path);
    } else {
      // 1. Thin contrasting outer edge
      ctx.lineWidth = 7;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke(path);

      // 2. Rich dark obsidian inner rim
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#0f172a";
      ctx.stroke(path);

      // 3. Electric cyan inner accent line
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#38bdf8";
      ctx.stroke(path);
    }
    ctx.restore();

    // Step D: Corner Letter Badge (if mode === "badge")
    if (mode === "badge") {
      drawCornerBadge(ctx, pieceType, isWhite, canvasSize);
    }

    return canvas.toDataURL("image/png");
  }

  // Draw image centered, covered, and adjusted by zoom and pan offsets
  function drawFittedImage(ctx, img, canvasSize, zoom, offsetX, offsetY) {
    if (!img || !img.width || !img.height) return;

    const scale = Math.max(canvasSize / img.width, canvasSize / img.height) * zoom;
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvasSize - w) / 2 + offsetX;
    const y = (canvasSize - h) / 2 + offsetY;

    ctx.drawImage(img, x, y, w, h);
  }

  // Draws clean corner letter badge (P, N, B, R, Q, K)
  function drawCornerBadge(ctx, pieceType, isWhite, canvasSize) {
    const letter = BADGE_LETTERS[pieceType] || "";
    const bx = canvasSize - 38;
    const by = canvasSize - 38;
    const radius = 22;

    ctx.save();
    // Drop shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;

    // Badge circle
    ctx.beginPath();
    ctx.arc(bx, by, radius, 0, Math.PI * 2);
    ctx.fillStyle = isWhite ? "#ffffff" : "#0f172a";
    ctx.fill();

    // Badge border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = isWhite ? "#f59e0b" : "#38bdf8";
    ctx.stroke();
    ctx.restore();

    // Badge letter
    ctx.save();
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = isWhite ? "#0f172a" : "#f8fafc";
    ctx.fillText(letter, bx, by + 1);
    ctx.restore();
  }

  // 3. Batch "Apply to All 6 Pieces" for a Side
  function applyToAllPieces({ imageEl, isWhite = true, mode = "silhouette", zoom = 1.0, offsetX = 0, offsetY = 0 }) {
    const prefix = isWhite ? "w" : "b";
    const pieceTypes = ["p", "n", "b", "r", "q", "k"];
    const results = {};

    pieceTypes.forEach(t => {
      const key = `${prefix}${t}`;
      results[key] = renderPieceMasked({
        imageEl,
        pieceType: t,
        isWhite,
        mode,
        zoom,
        offsetX,
        offsetY
      });
    });

    return results;
  }

  // 4. Storage Quota Monitoring
  function getStorageUsage(callback) {
    if (typeof chrome === "undefined" || !chrome.storage || !chrome.storage.local || !chrome.storage.local.getBytesInUse) {
      if (callback) callback({ bytes: 0, mb: "0.0", isCloseToQuota: false });
      return;
    }

    chrome.storage.local.getBytesInUse(null, (bytes) => {
      const mb = (bytes / (1024 * 1024)).toFixed(2);
      const isCloseToQuota = bytes > 7 * 1024 * 1024; // >7MB of 10MB limit
      if (callback) callback({ bytes, mb, isCloseToQuota });
    });
  }

  window.PawnHubMasking = {
    silhouettes: PIECE_SILHOUETTES,
    renderPiece: renderPieceMasked,
    applyToAll: applyToAllPieces,
    getStorageUsage
  };
})();
