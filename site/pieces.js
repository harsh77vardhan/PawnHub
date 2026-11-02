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
// ==========================================================================
// PawnHub - Premium Piece Set 2: Neon Wireframe
// ==========================================================================
// Glowing laser wireframe contours with high-tech circuit nodes, dark cyber-glass
// bodies (for contrast on bright squares), and neon tubular glows.

(function () {
  function getNeonContours(type) {
    switch (type) {
      case "p": // Pawn: Sleek glowing dome, laser stem, dual neon baseline
        return {
          body: "M 30 84 H 70 L 64 76 H 36 Z M 38 76 L 43 46 H 57 L 62 76 Z",
          accent: "M 41 46 H 59",
          head: "M 36 30 A 14 14 0 1 1 64 30 A 14 14 0 1 1 36 30",
          core: "M 50 20 V 40 M 40 30 H 60"
        };

      case "r": // Rook: Cyber battlements, laser grid slits, fortified pedestal
        return {
          body: "M 26 84 H 74 L 68 76 H 32 Z M 34 76 L 38 42 H 62 L 66 76 Z",
          crenellations: "M 28 42 V 24 H 38 V 32 H 46 V 24 H 54 V 32 H 62 V 24 H 72 V 42 Z",
          core: "M 42 50 H 58 M 42 62 H 58"
        };

      case "n": // Knight: Futuristic cyber-steed, sharp angled visor, laser mane spines
        return {
          body: "M 28 84 H 72 L 66 76 H 34 Z M 34 76 L 33 60 C 33 55 26 50 24 43 C 22 35 28 32 34 29 L 45 16 L 52 22 L 51 17 L 58 23 C 66 31 73 45 70 61 L 66 76 Z",
          visor: "M 28 38 L 42 34 L 38 45 Z",
          mane: "M 48 24 L 62 34 M 52 36 L 66 46 M 54 50 L 68 58"
        };

      case "b": // Bishop: Laser mitre oval, energy slit cleft, high-voltage apex finial
        return {
          body: "M 30 84 H 70 L 64 76 H 36 Z M 38 76 L 44 54 H 56 L 62 76 Z",
          mitre: "M 34 54 C 32 38 38 26 50 20 C 62 26 68 38 66 54 Z",
          cleft: "M 48 24 L 58 38",
          finial: "M 50 14 A 4 4 0 1 1 50 22 A 4 4 0 1 1 50 14"
        };

      case "q": // Queen: Radial neon coronet with glowing orb jewels and matrix core
        return {
          body: "M 26 84 H 74 L 68 76 H 32 Z M 34 76 L 40 52 H 60 L 66 76 Z",
          coronet: "M 24 34 L 34 46 L 50 24 L 66 46 L 76 34 L 70 52 H 30 Z",
          jewels: [
            "M 24 34 A 3 3 0 1 1 24 28 A 3 3 0 1 1 24 34",
            "M 50 24 A 3.5 3.5 0 1 1 50 17 A 3.5 3.5 0 1 1 50 24",
            "M 76 34 A 3 3 0 1 1 76 28 A 3 3 0 1 1 76 34"
          ],
          core: "M 50 36 L 50 68 M 38 62 H 62"
        };

      case "k": // King: Majestic cyber crown with electric cross and royal laser matrix
        return {
          body: "M 26 84 H 74 L 68 76 H 32 Z M 34 76 L 39 48 H 61 L 66 76 Z",
          crown: "M 28 48 C 26 34 34 26 50 24 C 66 26 74 34 72 48 Z",
          cross: "M 48 10 H 52 V 15 H 57 V 19 H 52 V 24 H 48 V 19 H 43 V 15 H 48 Z",
          core: "M 50 32 V 64 M 38 56 H 62"
        };
    }
  }

  function generateNeonSvg(pieceType, isWhite) {
    const c = getNeonContours(pieceType);
    if (!c) return "";

    // White pieces: Electric Cyan / Turquoise Neon Laser
    // Black pieces: Vivid Hot Magenta / Cyberpunk Pink Laser
    const neonColor = isWhite ? "#00f5ff" : "#ff007f";
    const subNeon = isWhite ? "#7000ff" : "#ffaa00";
    const darkGlassFill = "rgba(10, 15, 28, 0.88)"; // Ensures stark contrast on light board squares

    const glowFilter = `
      <filter id="neon_glow_${pieceType}_${isWhite ? 'w' : 'b'}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="${neonColor}" flood-opacity="0.95"/>
        <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="${neonColor}" flood-opacity="0.6"/>
        <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.7"/>
      </filter>`;

    let elements = "";
    if (c.body) {
      elements += `<path d="${c.body}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    if (c.head) {
      elements += `<path d="${c.head}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5"/>`;
    }
    if (c.crenellations) {
      elements += `<path d="${c.crenellations}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    if (c.visor) {
      elements += `<path d="${c.visor}" fill="${neonColor}" opacity="0.8"/>`;
    }
    if (c.mane) {
      elements += `<path d="${c.mane}" stroke="${subNeon}" stroke-width="2" stroke-linecap="round"/>`;
    }
    if (c.mitre) {
      elements += `<path d="${c.mitre}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5"/>`;
    }
    if (c.cleft) {
      elements += `<path d="${c.cleft}" stroke="${subNeon}" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    if (c.finial) {
      elements += `<path d="${c.finial}" fill="${neonColor}"/>`;
    }
    if (c.coronet) {
      elements += `<path d="${c.coronet}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    if (c.jewels) {
      c.jewels.forEach(j => { elements += `<path d="${j}" fill="${neonColor}"/>`; });
    }
    if (c.crown) {
      elements += `<path d="${c.crown}" fill="${darkGlassFill}" stroke="${neonColor}" stroke-width="2.5"/>`;
    }
    if (c.cross) {
      elements += `<path d="${c.cross}" fill="${neonColor}" stroke="${neonColor}" stroke-width="1.5" stroke-linejoin="round"/>`;
    }
    if (c.core) {
      elements += `<path d="${c.core}" stroke="${subNeon}" stroke-width="1.8" stroke-dasharray="3,3" opacity="0.85"/>`;
    }
    if (c.accent) {
      elements += `<path d="${c.accent}" stroke="${neonColor}" stroke-width="2"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        ${glowFilter}
      </defs>
      <g filter="url(#neon_glow_${pieceType}_${isWhite ? 'w' : 'b'})">
        ${elements}
      </g>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  window.PawnHubNeon = {
    generate: generateNeonSvg
  };
})();
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
// ==========================================================================
// PawnHub - Premium Piece Set 4: Paper Cut
// ==========================================================================
// Handcrafted tactile layered paper-craft / origami silhouettes.
// Uses layered geometric cardstock shapes with soft realistic drop shadows
// and folded crease lines.

(function () {
  function getPaperCutShapes(type) {
    switch (type) {
      case "p": // Pawn: Layered circular paper head, folded cone body, tiered base
        return {
          layers: [
            { d: "M 26 86 L 34 78 L 66 78 L 74 86 Z", shade: 3 },
            { d: "M 32 78 L 38 72 L 62 72 L 68 78 Z", shade: 2 },
            { d: "M 36 72 L 44 44 L 56 44 L 64 72 Z", shade: 1 },
            { d: "M 36 72 L 50 64 L 64 72 Z", shade: 2 }, // Crease shadow
            { d: "M 40 44 L 46 40 L 54 40 L 60 44 Z", shade: 0 },
            { d: "M 36 26 A 14 14 0 1 1 64 26 A 14 14 0 1 1 36 26", shade: 0 },
            { d: "M 50 12 L 64 26 L 50 40 Z", shade: 1 } // Paper fold facet
          ]
        };

      case "r": // Rook: Castle crenellations cut from sharp folded cardstock
        return {
          layers: [
            { d: "M 24 86 L 32 78 L 68 78 L 76 86 Z", shade: 3 },
            { d: "M 30 78 L 34 72 L 66 72 L 70 78 Z", shade: 2 },
            { d: "M 34 72 L 37 40 L 63 40 L 66 72 Z", shade: 1 },
            { d: "M 50 40 L 63 40 L 66 72 L 50 72 Z", shade: 2 }, // Right half shadow
            { d: "M 28 40 L 28 22 L 38 22 L 38 28 L 46 28 L 46 22 L 54 22 L 54 28 L 62 28 L 62 22 L 72 22 L 72 40 Z", shade: 0 },
            { d: "M 50 22 L 54 22 L 54 28 L 62 28 L 62 22 L 72 22 L 72 40 L 50 40 Z", shade: 1 } // Right crenellation shadow
          ]
        };

      case "n": // Knight: Origami stallion with angular paper folds
        return {
          layers: [
            { d: "M 26 86 L 34 78 L 66 78 L 74 86 Z", shade: 3 },
            { d: "M 32 78 L 36 72 L 64 72 L 68 78 Z", shade: 2 },
            { d: "M 34 72 L 33 58 C 33 54 26 48 24 42 C 22 35 28 32 34 29 L 45 16 L 52 22 L 51 17 L 58 23 C 66 31 73 45 70 60 L 66 72 Z", shade: 1 },
            { d: "M 45 16 L 52 22 L 48 32 L 38 27 Z", shade: 0 }, // Ear plane
            { d: "M 34 29 L 42 27 L 36 40 L 26 38 Z", shade: 0 }, // Snout plane
            { d: "M 26 38 L 36 40 L 40 48 L 24 42 Z", shade: 2 }, // Jaw shadow
            { d: "M 42 27 L 58 34 L 50 46 L 40 48 Z", shade: 1 }, // Cheek plane
            { d: "M 52 22 L 66 33 L 58 46 L 50 46 Z", shade: 2 }, // Mane back shadow
            { d: "M 40 48 L 58 46 L 68 62 L 66 72 L 50 68 Z", shade: 2 } // Chest fold
          ]
        };

      case "b": // Bishop: Origami mitre with layered cleft cut-out
        return {
          layers: [
            { d: "M 28 86 L 36 78 L 64 78 L 72 86 Z", shade: 3 },
            { d: "M 34 78 L 38 72 L 62 72 L 66 78 Z", shade: 2 },
            { d: "M 38 72 L 44 52 L 56 52 L 62 72 Z", shade: 1 },
            { d: "M 50 52 L 56 52 L 62 72 L 50 72 Z", shade: 2 }, // Stem shadow
            { d: "M 34 52 C 32 38 38 26 50 18 C 62 26 68 38 66 52 Z", shade: 0 },
            { d: "M 50 18 C 62 26 68 38 66 52 L 50 52 Z", shade: 1 }, // Mitre right shadow
            { d: "M 48 22 L 58 36 L 54 38 L 46 24 Z", shade: 3 }, // Cut-out cleft
            { d: "M 47 14 A 3.5 3.5 0 1 1 53 14 A 3.5 3.5 0 1 1 47 14", shade: 0 } // Apex bead
          ]
        };

      case "q": // Queen: Layered origami coronet with flared gown
        return {
          layers: [
            { d: "M 24 86 L 32 78 L 68 78 L 76 86 Z", shade: 3 },
            { d: "M 30 78 L 34 72 L 66 72 L 70 78 Z", shade: 2 },
            { d: "M 36 72 L 41 48 L 59 48 L 64 72 Z", shade: 1 },
            { d: "M 50 48 L 59 48 L 64 72 L 50 72 Z", shade: 2 }, // Gown shadow
            { d: "M 24 34 L 34 46 L 50 24 L 66 46 L 76 34 L 70 50 H 30 Z", shade: 0 },
            { d: "M 50 24 L 66 46 L 76 34 L 70 50 H 50 Z", shade: 1 }, // Right tiara shadow
            { d: "M 24 34 A 3 3 0 1 1 24 28 A 3 3 0 1 1 24 34", shade: 0 },
            { d: "M 50 24 A 3.5 3.5 0 1 1 50 17 A 3.5 3.5 0 1 1 50 24", shade: 0 },
            { d: "M 76 34 A 3 3 0 1 1 76 28 A 3 3 0 1 1 76 34", shade: 0 }
          ]
        };

      case "k": // King: Royal layered paper crown surmounted with cross
        return {
          layers: [
            { d: "M 24 86 L 32 78 L 68 78 L 76 86 Z", shade: 3 },
            { d: "M 30 78 L 34 72 L 66 72 L 70 78 Z", shade: 2 },
            { d: "M 36 72 L 40 46 L 60 46 L 64 72 Z", shade: 1 },
            { d: "M 50 46 L 60 46 L 64 72 L 50 72 Z", shade: 2 },
            { d: "M 26 46 C 24 32 34 24 50 22 C 66 24 76 32 74 46 Z", shade: 0 },
            { d: "M 50 22 C 66 24 76 32 74 46 L 50 46 Z", shade: 1 },
            { d: "M 48 9 H 52 V 14 H 57 V 18 H 52 V 23 H 48 V 18 H 43 V 14 H 48 Z", shade: 0 },
            { d: "M 50 9 H 52 V 14 H 57 V 18 H 52 V 23 H 50 Z", shade: 1 }
          ]
        };
    }
  }

  function generatePaperCutSvg(pieceType, isWhite) {
    const p = getPaperCutShapes(pieceType);
    if (!p) return "";

    // Paper Palette Shades (from brightest paper surface to deepest cut fold)
    const whitePalette = ["#ffffff", "#fef3c7", "#fde68a", "#d97706"];
    const blackPalette = ["#64748b", "#334155", "#1e293b", "#0f172a"];

    const palette = isWhite ? whitePalette : blackPalette;
    const strokeColor = isWhite ? "#d97706" : "#475569";

    const filterDef = `
      <filter id="paper_shadow_${pieceType}_${isWhite ? 'w' : 'b'}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1.5" dy="3" stdDeviation="2.5" flood-color="#000000" flood-opacity="${isWhite ? '0.25' : '0.55'}"/>
      </filter>`;

    let shapes = "";
    p.layers.forEach(l => {
      const fill = palette[l.shade] || palette[0];
      shapes += `<path d="${l.d}" fill="${fill}" stroke="${strokeColor}" stroke-width="1.2" stroke-linejoin="round"/>`;
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        ${filterDef}
      </defs>
      <g filter="url(#paper_shadow_${pieceType}_${isWhite ? 'w' : 'b'})">
        ${shapes}
      </g>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  window.PawnHubPaperCut = {
    generate: generatePaperCutSvg
  };
})();
// ==========================================================================
// PawnHub - Premium Piece Set 5: Friendly Monsters
// ==========================================================================
// Original, cute, expressive creatures hand-designed to perfectly preserve
// standard chess piece silhouettes.
// Every creature features large, expressive eyes with specular gleams.

(function () {
  function getMonsterPath(type) {
    switch (type) {
      case "p": // Peep (Pawn): Chubby droplet body, tiny antennae horn, huge round eyes
        return {
          base: "M 32 86 C 32 80 40 76 50 76 C 60 76 68 80 68 86 Z",
          body: "M 32 76 C 26 56 34 34 50 24 C 66 34 74 56 68 76 Z",
          horn: "M 48 24 C 48 16 52 16 52 24 Z",
          eyes: [
            { cx: 43, cy: 46, r: 7 },
            { cx: 57, cy: 46, r: 7 }
          ],
          pupils: [
            { cx: 44, cy: 46, r: 4 },
            { cx: 58, cy: 46, r: 4 }
          ],
          gleams: [
            { cx: 42, cy: 44, r: 2 },
            { cx: 56, cy: 44, r: 2 }
          ],
          cheeks: [
            { cx: 36, cy: 56, rx: 3, ry: 2 },
            { cx: 64, cy: 56, rx: 3, ry: 2 }
          ],
          smile: "M 47 55 Q 50 58 53 55"
        };

      case "r": // Bouldy (Rook): Friendly stone-golem monster with 3 crenellated head horns
        return {
          base: "M 26 86 C 26 80 34 78 50 78 C 66 78 74 80 74 86 Z",
          body: "M 30 78 L 33 40 L 67 40 L 70 78 Z",
          crenellations: "M 27 40 V 24 H 37 V 30 H 45 V 24 H 55 V 30 H 63 V 24 H 73 V 40 Z",
          eyes: [
            { cx: 41, cy: 52, r: 6.5 },
            { cx: 59, cy: 52, r: 6.5 }
          ],
          pupils: [
            { cx: 42, cy: 52, r: 3.5 },
            { cx: 60, cy: 52, r: 3.5 }
          ],
          gleams: [
            { cx: 40, cy: 50, r: 1.8 },
            { cx: 58, cy: 50, r: 1.8 }
          ],
          smile: "M 45 64 Q 50 70 55 64"
        };

      case "n": // Draco-Pony (Knight): Friendly horned dragon-steed with perked ear & snout
        return {
          base: "M 26 86 C 26 80 34 78 50 78 C 66 78 74 80 74 86 Z",
          body: "M 32 78 C 32 60 25 54 23 44 C 21 35 28 32 34 29 L 45 16 L 53 22 L 52 17 L 59 23 C 67 31 74 46 71 61 L 66 78 Z",
          horn: "M 44 26 L 41 12 L 48 20 Z",
          snout: "M 23 44 C 27 47 33 47 36 44",
          nostril: { cx: 28, cy: 41, r: 1.5 },
          eyes: [
            { cx: 42, cy: 34, r: 6 }
          ],
          pupils: [
            { cx: 43, cy: 34, r: 3.5 }
          ],
          gleams: [
            { cx: 41, cy: 32, r: 1.8 }
          ],
          smile: "M 31 43 Q 34 46 38 42"
        };

      case "b": // Sprout-Shaman (Bishop): Tall hooded forest critter with leafy antenna finial
        return {
          base: "M 28 86 C 28 80 36 78 50 78 C 64 78 72 80 72 86 Z",
          body: "M 36 78 C 38 60 41 54 43 50 L 57 50 C 59 54 62 60 64 78 Z",
          mitre: "M 34 50 C 32 36 38 24 50 18 C 62 24 68 36 66 50 Z",
          sprout: "M 50 18 C 45 10 50 8 52 10 C 55 12 52 16 50 18 Z M 50 18 C 55 10 58 12 56 15 Z",
          cleft: "M 47 22 L 57 34 L 54 36 L 45 24 Z",
          eyes: [
            { cx: 43, cy: 38, r: 5.5 },
            { cx: 57, cy: 38, r: 5.5 }
          ],
          pupils: [
            { cx: 44, cy: 38, r: 3 },
            { cx: 58, cy: 38, r: 3 }
          ],
          gleams: [
            { cx: 42, cy: 36, r: 1.5 },
            { cx: 56, cy: 36, r: 1.5 }
          ],
          smile: "M 47 44 Q 50 47 53 44"
        };

      case "q": // Tiaradusa (Queen): Celestial horned fairy monarch with 5 starry tiara antennae
        return {
          base: "M 24 86 C 24 80 32 78 50 78 C 68 78 76 80 76 86 Z",
          body: "M 34 78 C 36 60 40 54 42 48 L 58 48 C 60 54 64 60 66 78 Z",
          tiara: "M 24 34 L 34 44 L 50 24 L 66 44 L 76 34 L 70 48 H 30 Z",
          eyes: [
            { cx: 42, cy: 56, r: 6.5 },
            { cx: 58, cy: 56, r: 6.5 }
          ],
          pupils: [
            { cx: 43, cy: 56, r: 3.5 },
            { cx: 59, cy: 56, r: 3.5 }
          ],
          gleams: [
            { cx: 41, cy: 54, r: 1.8 },
            { cx: 57, cy: 54, r: 1.8 }
          ],
          cheeks: [
            { cx: 34, cy: 62, rx: 3, ry: 2 },
            { cx: 66, cy: 62, rx: 3, ry: 2 }
          ],
          smile: "M 47 64 Q 50 67 53 64"
        };

      case "k": // Leo-Rex (King): Fluffy crowned royal lion-beast with little golden cross crest
        return {
          base: "M 24 86 C 24 80 32 78 50 78 C 68 78 76 80 76 86 Z",
          body: "M 32 78 C 34 60 38 52 40 46 L 60 46 C 62 52 66 60 68 78 Z",
          mane: "M 26 46 C 22 32 32 22 50 20 C 68 22 78 32 74 46 Z",
          crown: "M 42 20 L 46 14 L 50 18 L 54 14 L 58 20 Z",
          cross: "M 48 8 H 52 V 12 H 55 V 15 H 52 V 18 H 48 V 15 H 45 V 12 H 48 Z",
          eyes: [
            { cx: 42, cy: 34, r: 6 },
            { cx: 58, cy: 34, r: 6 }
          ],
          pupils: [
            { cx: 43, cy: 34, r: 3.2 },
            { cx: 59, cy: 34, r: 3.2 }
          ],
          gleams: [
            { cx: 41, cy: 32, r: 1.7 },
            { cx: 57, cy: 32, r: 1.7 }
          ],
          smile: "M 46 41 Q 50 44 54 41"
        };
    }
  }

  function generateMonstersSvg(pieceType, isWhite) {
    const m = getMonsterPath(pieceType);
    if (!m) return "";

    // White Monster Army: Peach & Vanilla Cream with Rose Blush
    // Black Monster Army: Twilight Indigo & Cosmic Violet with Luminous Cyan Eyes
    const defs = isWhite
      ? `<linearGradient id="mon_body_${pieceType}_w" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="60%" stop-color="#fef3c7"/>
          <stop offset="100%" stop-color="#fde68a"/>
        </linearGradient>
        <filter id="mon_shadow_${pieceType}_w" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#f59e0b" flood-opacity="0.45"/>
        </filter>`
      : `<linearGradient id="mon_body_${pieceType}_b" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#818cf8"/>
          <stop offset="50%" stop-color="#4f46e5"/>
          <stop offset="100%" stop-color="#312e81"/>
        </linearGradient>
        <filter id="mon_shadow_${pieceType}_b" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" flood-color="#000000" flood-opacity="0.65"/>
        </filter>`;

    const fillUrl = isWhite ? `url(#mon_body_${pieceType}_w)` : `url(#mon_body_${pieceType}_b)`;
    const strokeColor = isWhite ? "#d97706" : "#c7d2fe";
    const eyeWhite = "#ffffff";
    const pupilColor = isWhite ? "#1e293b" : "#06b6d4";
    const blushColor = isWhite ? "#fb7185" : "#a855f7";

    let shapes = "";
    if (m.base) shapes += `<path d="${m.base}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.body) shapes += `<path d="${m.body}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.horn) shapes += `<path d="${m.horn}" fill="${isWhite ? '#f59e0b' : '#38bdf8'}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (m.crenellations) shapes += `<path d="${m.crenellations}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.mitre) shapes += `<path d="${m.mitre}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.sprout) shapes += `<path d="${m.sprout}" fill="${isWhite ? '#10b981' : '#34d399'}" stroke="${strokeColor}" stroke-width="1.2"/>`;
    if (m.cleft) shapes += `<path d="${m.cleft}" fill="${isWhite ? '#d97706' : '#1e1b4b'}"/>`;
    if (m.tiara) shapes += `<path d="${m.tiara}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.mane) shapes += `<path d="${m.mane}" fill="${fillUrl}" stroke="${strokeColor}" stroke-width="2"/>`;
    if (m.crown) shapes += `<path d="${m.crown}" fill="${isWhite ? '#f59e0b' : '#fbbf24'}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (m.cross) shapes += `<path d="${m.cross}" fill="${isWhite ? '#f59e0b' : '#fbbf24'}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    if (m.nostril) shapes += `<circle cx="${m.nostril.cx}" cy="${m.nostril.cy}" r="${m.nostril.r}" fill="${strokeColor}"/>`;

    // Cheeks
    if (m.cheeks) {
      m.cheeks.forEach(c => {
        shapes += `<ellipse cx="${c.cx}" cy="${c.cy}" rx="${c.rx}" ry="${c.ry}" fill="${blushColor}" opacity="0.6"/>`;
      });
    }

    // Big Expressive Eyes
    if (m.eyes) {
      m.eyes.forEach(e => {
        shapes += `<circle cx="${e.cx}" cy="${e.cy}" r="${e.r}" fill="${eyeWhite}" stroke="${strokeColor}" stroke-width="1.2"/>`;
      });
    }
    if (m.pupils) {
      m.pupils.forEach(p => {
        shapes += `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}" fill="${pupilColor}"/>`;
      });
    }
    if (m.gleams) {
      m.gleams.forEach(g => {
        shapes += `<circle cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="#ffffff"/>`;
      });
    }

    // Mouth / Smile
    if (m.smile) {
      shapes += `<path d="${m.smile}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        ${defs}
      </defs>
      <g filter="url(#mon_shadow_${pieceType}_${isWhite ? 'w' : 'b'})">
        ${shapes}
      </g>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  window.PawnHubMonsters = {
    generate: generateMonstersSvg
  };
})();
// ==========================================================================
// PawnHub - Premium Piece Sets Registry (Stage 1)
// ==========================================================================
// Assembles the 5 handcrafted premium piece sets with matching board palettes.

(function () {
  const PIECE_TYPES = ["p", "n", "b", "r", "q", "k"];

  function buildSetPieces(generatorFn) {
    const pieces = {};
    PIECE_TYPES.forEach(t => {
      pieces[`w${t}`] = generatorFn(t, true);
      pieces[`b${t}`] = generatorFn(t, false);
    });
    return pieces;
  }

  const PREMIUM_SETS = {
    crystal: {
      id: "crystal",
      name: "💎 Crystal Glass",
      desc: "Faceted translucent gems with light refractions and diamond highlights.",
      board: { light: "#eef2f6", dark: "#1e3a5f" }, // Frosted Diamond White & Deep Sapphire
      generator: () => window.PawnHubCrystal.generate
    },
    neon: {
      id: "neon",
      name: "⚡ Neon Wireframe",
      desc: "Glowing cyan and magenta laser outlines on dark cyber-glass bodies.",
      board: { light: "#181829", dark: "#07070f" }, // Neon Synthwave Grid & Dark Cyber Void
      generator: () => window.PawnHubNeon.generate
    },
    gold_obsidian: {
      id: "gold_obsidian",
      name: "👑 Gold & Obsidian",
      desc: "Polished 24k royal gold and mirror-finished volcanic obsidian.",
      board: { light: "#f5f5f4", dark: "#1c1917" }, // Polished Cream Marble & Obsidian Slate
      generator: () => window.PawnHubGoldObsidian.generate
    },
    paper_cut: {
      id: "paper_cut",
      name: "✂️ Paper Cut",
      desc: "Handcrafted layered origami cardstock with soft depth shadows.",
      board: { light: "#fefae0", dark: "#bc6c25" }, // Cream Cardstock & Warm Kraft Taupe
      generator: () => window.PawnHubPaperCut.generate
    },
    monsters: {
      id: "monsters",
      name: "👾 Friendly Monsters",
      desc: "Cute expressive creatures with big expressive eyes and distinctive silhouettes.",
      board: { light: "#e9f5db", dark: "#718355" }, // Soft Meadow & Playful Forest Moss
      generator: () => window.PawnHubMonsters.generate
    }
  };

  // Cache generated pieces so SVGs are only constructed once
  const CACHED_SETS = {};

  function getPremiumSet(setId) {
    if (!PREMIUM_SETS[setId]) return null;
    if (!CACHED_SETS[setId]) {
      const setDef = PREMIUM_SETS[setId];
      const gen = setDef.generator();
      CACHED_SETS[setId] = {
        id: setDef.id,
        name: setDef.name,
        desc: setDef.desc,
        board: setDef.board,
        pieces: buildSetPieces(gen)
      };
    }
    return CACHED_SETS[setId];
  }

  function getAllPremiumSets() {
    return Object.keys(PREMIUM_SETS).map(id => getPremiumSet(id));
  }

  window.PawnHubPremiumSets = {
    get: getPremiumSet,
    getAll: getAllPremiumSets,
    definitions: PREMIUM_SETS
  };
})();
