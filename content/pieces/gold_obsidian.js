// ==========================================================================
// PawnHub - Premium Piece Set 3: Gold & Obsidian Luxury
// ==========================================================================
// Handcrafted luxury Staunton silhouettes.
// White: Polished 24k Royal Gold with champagne highlights and amber bevels.
// Black: Mirror-finished Volcanic Obsidian with platinum-silver beveled edges.

(function () {
  function getLuxuryPath(type) {
    switch (type) {
      case "p": // Pawn
        return {
          base: "M 26 86 C 26 82 32 78 50 78 C 68 78 74 82 74 86 Z",
          pedestal: "M 32 78 L 36 72 L 64 72 L 68 78 Z",
          stem: "M 38 72 C 40 56 43 47 44 42 L 56 42 C 57 47 60 56 62 72 Z",
          ring: "M 36 42 C 36 39 42 37 50 37 C 58 37 64 39 64 42 Z",
          head: "M 35 24 C 35 15 41 12 50 12 C 59 12 65 15 65 24 C 65 33 59 36 50 36 C 41 36 35 33 35 24 Z",
          specular: "M 44 16 C 47 14 53 14 56 16 C 54 18 46 18 44 16 Z"
        };

      case "r": // Rook
        return {
          base: "M 24 86 C 24 82 30 78 50 78 C 70 78 76 82 76 86 Z",
          pedestal: "M 30 78 L 34 72 L 66 72 L 70 78 Z",
          stem: "M 35 72 L 37 38 L 63 38 L 65 72 Z",
          capital: "M 30 38 L 28 22 L 38 22 L 38 28 L 46 28 L 46 22 L 54 22 L 54 28 L 62 28 L 62 22 L 72 22 L 70 38 Z",
          specular: "M 32 42 L 34 70 L 40 70 L 38 42 Z"
        };

      case "n": // Knight
        return {
          base: "M 24 86 C 24 82 30 78 50 78 C 70 78 76 82 76 86 Z",
          pedestal: "M 30 78 L 34 72 L 66 72 L 70 78 Z",
          body: "M 34 72 C 34 58 26 52 24 44 C 22 36 28 32 34 29 L 45 16 L 53 22 L 52 17 L 59 23 C 67 31 74 46 71 61 L 66 72 Z",
          snout: "M 24 44 C 27 46 33 46 36 43 L 34 38 L 26 38 Z",
          eye: "M 37 30 A 2 2 0 1 1 37 26 A 2 2 0 1 1 37 30",
          specular: "M 48 24 C 54 30 62 42 63 56 L 58 56 C 58 45 52 32 46 26 Z"
        };

      case "b": // Bishop
        return {
          base: "M 26 86 C 26 82 32 78 50 78 C 68 78 74 82 74 86 Z",
          pedestal: "M 32 78 L 36 72 L 64 72 L 68 78 Z",
          stem: "M 38 72 C 40 58 43 54 44 50 L 56 50 C 57 54 60 58 62 72 Z",
          collar: "M 36 50 C 36 47 42 45 50 45 C 58 45 64 47 64 50 Z",
          mitre: "M 34 45 C 32 34 38 22 50 16 C 62 22 68 34 66 45 Z",
          cleft: "M 48 20 L 58 32 L 54 34 L 46 22 Z",
          finial: "M 47 13 A 3 3 0 1 1 53 13 A 3 3 0 1 1 47 13",
          specular: "M 42 24 C 46 20 54 20 58 24 L 56 26 C 52 23 48 23 44 26 Z"
        };

      case "q": // Queen
        return {
          base: "M 24 86 C 24 82 30 78 50 78 C 70 78 76 82 76 86 Z",
          pedestal: "M 30 78 L 34 72 L 66 72 L 70 78 Z",
          stem: "M 36 72 C 38 58 41 52 42 46 L 58 46 C 59 52 62 58 64 72 Z",
          coronet: "M 24 34 L 34 44 L 50 24 L 66 44 L 76 34 L 70 48 H 30 Z",
          pearls: [
            "M 22 34 A 3 3 0 1 1 26 34 A 3 3 0 1 1 22 34",
            "M 33 28 A 3 3 0 1 1 37 28 A 3 3 0 1 1 33 28",
            "M 48 22 A 3.5 3.5 0 1 1 52 22 A 3.5 3.5 0 1 1 48 22",
            "M 63 28 A 3 3 0 1 1 67 28 A 3 3 0 1 1 63 28",
            "M 74 34 A 3 3 0 1 1 78 34 A 3 3 0 1 1 74 34"
          ],
          specular: "M 40 50 L 42 68 L 46 68 L 44 50 Z"
        };

      case "k": // King
        return {
          base: "M 24 86 C 24 82 30 78 50 78 C 70 78 76 82 76 86 Z",
          pedestal: "M 30 78 L 34 72 L 66 72 L 70 78 Z",
          stem: "M 36 72 C 38 56 40 48 41 44 L 59 44 C 60 48 62 56 64 72 Z",
          crown: "M 26 44 C 24 32 34 24 50 22 C 66 24 76 32 74 44 Z",
          cross: "M 48 8 H 52 V 14 H 57 V 18 H 52 V 23 H 48 V 18 H 43 V 14 H 48 Z",
          specular: "M 38 28 C 44 24 56 24 62 28 C 58 26 42 26 38 28 Z"
        };
    }
  }

  function generateGoldObsidianSvg(pieceType, isWhite) {
    const p = getLuxuryPath(pieceType);
    if (!p) return "";

    // White pieces: Polished 24k Royal Gold
    // Black pieces: Jet Volcanic Obsidian Mirror with Platinum Bevels
    const defs = isWhite
      ? `<linearGradient id="gold_body_${pieceType}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="35%" stop-color="#eab308"/>
          <stop offset="70%" stop-color="#ca8a04"/>
          <stop offset="100%" stop-color="#854d0e"/>
        </linearGradient>
        <linearGradient id="gold_bevel_${pieceType}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
        <filter id="gold_shadow_${pieceType}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="3.5" flood-color="#78350f" flood-opacity="0.55"/>
        </filter>`
      : `<linearGradient id="obsidian_body_${pieceType}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3f3f46"/>
          <stop offset="40%" stop-color="#27272a"/>
          <stop offset="75%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#09090b"/>
        </linearGradient>
        <linearGradient id="platinum_bevel_${pieceType}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f4f4f5"/>
          <stop offset="100%" stop-color="#71717a"/>
        </linearGradient>
        <filter id="obsidian_shadow_${pieceType}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.75"/>
        </filter>`;

    const fillUrl = isWhite ? `url(#gold_body_${pieceType})` : `url(#obsidian_body_${pieceType})`;
    const strokeColor = isWhite ? "url(#gold_bevel_" + pieceType + ")" : "url(#platinum_bevel_" + pieceType + ")";
    const filterUrl = isWhite ? `url(#gold_shadow_${pieceType})` : `url(#obsidian_shadow_${pieceType})`;

    let shapes = "";
    if (p.base) shapes += `<path d="${p.base}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.pedestal) shapes += `<path d="${p.pedestal}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.8"/>`;
    if (p.stem) shapes += `<path d="${p.stem}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.ring) shapes += `<path d="${p.ring}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.collar) shapes += `<path d="${p.collar}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.head) shapes += `<path d="${p.head}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.capital) shapes += `<path d="${p.capital}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.body) shapes += `<path d="${p.body}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.snout) shapes += `<path d="${p.snout}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.eye) shapes += `<path d="${p.eye}" fill="${isWhite ? '#78350f' : '#38bdf8'}"/>`;
    if (p.mitre) shapes += `<path d="${p.mitre}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.cleft) shapes += `<path d="${p.cleft}" fill="${isWhite ? '#78350f' : '#09090b'}"/>`;
    if (p.finial) shapes += `<path d="${p.finial}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.coronet) shapes += `<path d="${p.coronet}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.pearls) p.pearls.forEach(pr => { shapes += `<path d="${pr}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.5"/>`; });
    if (p.crown) shapes += `<path d="${p.crown}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.cross) shapes += `<path d="${p.cross}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="1.8"/>`;

    // Specular glossy reflection sheen
    let spec = "";
    if (p.specular) {
      spec = `<path d="${p.specular}" fill="#ffffff" opacity="${isWhite ? '0.55' : '0.4'}"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        ${defs}
      </defs>
      <g filter="${filterUrl}">
        ${shapes}
        ${spec}
      </g>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  window.PawnHubGoldObsidian = {
    generate: generateGoldObsidianSvg
  };
})();
