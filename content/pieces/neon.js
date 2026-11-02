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
