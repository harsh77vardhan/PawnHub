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
