// ==========================================================================
// PawnHub - Premium Piece Set 1: Crystal Glass
// ==========================================================================
// Faceted translucent gems with internal refractive planes, specular highlights,
// and diamond-cut silhouettes.

(function () {
  function getCrystalPath(type) {
    switch (type) {
      case "p": // Pawn: Small round faceted orb, tapered crystal stem, octagonal base
        return {
          base: "M 28 86 L 36 78 L 64 78 L 72 86 Z",
          body: "M 38 78 L 44 46 L 56 46 L 62 78 Z",
          collar: "M 40 46 L 46 41 L 54 41 L 60 46 Z",
          head: "M 50 16 L 63 26 L 59 40 L 41 40 L 37 26 Z",
          facets: [
            "M 50 16 L 46 28 L 54 28 Z",
            "M 46 28 L 37 26 L 41 40 L 50 35 Z",
            "M 54 28 L 63 26 L 59 40 L 50 35 Z",
            "M 44 46 L 50 56 L 56 46 Z",
            "M 44 46 L 50 56 L 40 76 L 38 78 Z",
            "M 56 46 L 50 56 L 60 76 L 62 78 Z",
            "M 36 78 L 50 82 L 64 78 Z"
          ]
        };

      case "r": // Rook: Sturdy faceted rampart with sharp geometric crenellations
        return {
          base: "M 24 86 L 32 78 L 68 78 L 76 86 Z",
          body: "M 32 78 L 36 40 L 64 40 L 68 78 Z",
          top: "M 26 40 L 26 22 L 36 22 L 36 29 L 45 29 L 45 22 L 55 22 L 55 29 L 64 29 L 64 22 L 74 22 L 74 40 Z",
          facets: [
            "M 26 40 L 36 34 L 64 34 L 74 40 Z",
            "M 36 40 L 50 54 L 64 40 Z",
            "M 32 78 L 50 54 L 36 40 Z",
            "M 68 78 L 50 54 L 64 40 Z",
            "M 32 78 L 50 74 L 68 78 Z"
          ]
        };

      case "n": // Knight: Angular faceted stallion head with sharp geometric planes
        return {
          base: "M 26 86 L 34 78 L 66 78 L 74 86 Z",
          body: "M 34 78 L 33 60 C 33 55 26 50 24 44 C 22 36 28 32 34 29 L 44 16 L 51 22 L 50 17 L 57 23 C 65 30 73 44 70 60 L 66 78 Z",
          facets: [
            "M 44 16 L 51 22 L 48 30 L 40 25 Z",
            "M 34 29 L 40 25 L 34 38 L 26 38 Z",
            "M 26 38 L 34 38 L 38 46 L 24 44 Z",
            "M 40 25 L 56 32 L 48 42 L 38 46 Z",
            "M 51 22 L 64 32 L 56 44 L 48 42 Z",
            "M 48 42 L 56 60 L 38 46 Z",
            "M 56 60 L 68 62 L 66 78 L 50 72 Z",
            "M 34 78 L 50 72 L 38 46 Z"
          ]
        };

      case "b": // Bishop: Elegant gemstone mitre with sliced diagonal cleft and finial orb
        return {
          base: "M 28 86 L 36 78 L 64 78 L 72 86 Z",
          body: "M 38 78 L 44 54 L 56 54 L 62 78 Z",
          mitre: "M 34 54 C 32 40 38 28 50 20 C 62 28 68 40 66 54 Z",
          finial: "M 50 14 L 54 18 L 50 22 L 46 18 Z",
          cleft: "M 48 24 L 58 36 L 54 38 L 46 26 Z",
          facets: [
            "M 50 20 L 42 34 L 50 42 L 58 34 Z",
            "M 42 34 L 34 54 L 50 50 Z",
            "M 58 34 L 66 54 L 50 50 Z",
            "M 50 50 L 44 54 L 50 66 L 56 54 Z",
            "M 38 78 L 50 66 L 62 78 Z"
          ]
        };

      case "q": // Queen: Majestic tiara coronet with 5 faceted gemstone spikes
        return {
          base: "M 24 86 L 32 78 L 68 78 L 76 86 Z",
          body: "M 34 78 L 40 52 L 60 52 L 66 78 Z",
          coronet: "M 24 34 L 34 46 L 50 24 L 66 46 L 76 34 L 72 52 L 28 52 Z",
          gems: [
            "M 24 34 L 27 30 L 24 26 L 21 30 Z",
            "M 50 24 L 54 19 L 50 14 L 46 19 Z",
            "M 76 34 L 79 30 L 76 26 L 73 30 Z"
          ],
          facets: [
            "M 50 24 L 42 38 L 50 48 L 58 38 Z",
            "M 24 34 L 34 46 L 42 38 Z",
            "M 76 34 L 66 46 L 58 38 Z",
            "M 40 52 L 50 64 L 60 52 Z",
            "M 34 78 L 50 64 L 40 52 Z",
            "M 66 78 L 50 64 L 60 52 Z",
            "M 32 78 L 50 74 L 68 78 Z"
          ]
        };

      case "k": // King: Tall royal gemstone dome topped with a faceted Maltese cross
        return {
          base: "M 24 86 L 32 78 L 68 78 L 76 86 Z",
          body: "M 34 78 L 39 48 L 61 48 L 66 78 Z",
          crown: "M 28 48 C 26 36 34 26 50 24 C 66 26 74 36 72 48 Z",
          cross: "M 48 10 H 52 V 15 H 57 V 19 H 52 V 24 H 48 V 19 H 43 V 15 H 48 Z",
          facets: [
            "M 50 24 L 40 34 L 50 44 L 60 34 Z",
            "M 40 34 L 28 48 L 44 48 Z",
            "M 60 34 L 72 48 L 56 48 Z",
            "M 39 48 L 50 62 L 61 48 Z",
            "M 34 78 L 50 62 L 39 48 Z",
            "M 66 78 L 50 62 L 61 48 Z",
            "M 32 78 L 50 74 L 68 78 Z"
          ]
        };
    }
  }

  function generateCrystalSvg(pieceType, isWhite) {
    const p = getCrystalPath(pieceType);
    if (!p) return "";

    // White piece: Luminous icy diamond crystal (pure white, light aqua & diamond cyan)
    // Black piece: Rich amethyst & deep sapphire obsidian (violet, indigo, midnight magenta)
    const primaryGradient = isWhite
      ? `<linearGradient id="g_${pieceType}_w" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="40%" stop-color="#e0f2fe" stop-opacity="0.90"/>
          <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="facet_${pieceType}_w" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.25"/>
        </linearGradient>`
      : `<linearGradient id="g_${pieceType}_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="#581c87" stop-opacity="0.90"/>
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.92"/>
        </linearGradient>
        <linearGradient id="facet_${pieceType}_b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.3"/>
        </linearGradient>`;

    const strokeColor = isWhite ? "#38bdf8" : "#c084fc";
    const innerStroke = isWhite ? "rgba(255, 255, 255, 0.7)" : "rgba(236, 72, 153, 0.5)";
    const mainFill = isWhite ? `url(#g_${pieceType}_w)` : `url(#g_${pieceType}_b)`;
    const facetFill = isWhite ? `url(#facet_${pieceType}_w)` : `url(#facet_${pieceType}_b)`;
    const glowFilter = isWhite
      ? `<filter id="glow_${pieceType}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#0284c7" flood-opacity="0.45"/>
        </filter>`
      : `<filter id="glow_${pieceType}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#a855f7" flood-opacity="0.6"/>
        </filter>`;

    let shapes = "";
    if (p.base) shapes += `<path d="${p.base}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.body) shapes += `<path d="${p.body}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.collar) shapes += `<path d="${p.collar}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.head) shapes += `<path d="${p.head}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.top) shapes += `<path d="${p.top}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.mitre) shapes += `<path d="${p.mitre}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.cleft) shapes += `<path d="${p.cleft}" fill="${isWhite ? '#0284c7' : '#f43f5e'}" opacity="0.8"/>`;
    if (p.finial) shapes += `<path d="${p.finial}" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (p.coronet) shapes += `<path d="${p.coronet}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.gems) p.gems.forEach(g => { shapes += `<path d="${g}" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.5"/>`; });
    if (p.crown) shapes += `<path d="${p.crown}" fill="${mainFill}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (p.cross) shapes += `<path d="${p.cross}" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.5"/>`;

    // Internal gemstone facets with refractive reflection
    let facetsHtml = "";
    if (p.facets) {
      p.facets.forEach((f, i) => {
        facetsHtml += `<path d="${f}" fill="${facetFill}" stroke="${innerStroke}" stroke-width="1.2" opacity="${i % 2 === 0 ? '0.85' : '0.6'}"/>`;
      });
    }

    // Specular light sheen highlight
    const highlightSheen = `<path d="M 36 26 L 42 22 L 40 44 L 36 42 Z" fill="#ffffff" opacity="${isWhite ? '0.6' : '0.4'}"/>`;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        ${primaryGradient}
        ${glowFilter}
      </defs>
      <g filter="url(#glow_${pieceType})">
        ${shapes}
        ${facetsHtml}
        ${highlightSheen}
      </g>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  window.PawnHubCrystal = {
    generate: generateCrystalSvg
  };
})();
