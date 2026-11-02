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
