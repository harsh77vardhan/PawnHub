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
