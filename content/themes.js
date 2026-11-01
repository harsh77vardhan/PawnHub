// ==========================================================================
// PawnHub - 12 Immersive Themes & Matching Piece Definitions (Stage 1)
// ==========================================================================
// Each theme defines:
// 1. Board colors (light and dark squares)
// 2. Matching piece icons (White and Black versions of all 6 piece types)
// 3. Theme metadata (display name, description)

const PAWNHUB_THEMES = {
  default: {
    id: "default",
    name: "Original (chess.com)",
    desc: "Default chess.com styling without overrides.",
    board: null,
    pieces: null
  },
  candy: {
    id: "candy",
    name: "🍭 Candy Land",
    desc: "Sweet pastel checkerboard with candy and dessert pieces.",
    board: { light: "#ffecf1", dark: "#ec4899" }, // Strawberry cream & Raspberry pink
    pieces: {
      p: "🍬", // Sweet Candy
      n: "🦄", // Gummy Unicorn
      b: "🧁", // Cupcake
      r: "🍫", // Chocolate Bar
      q: "🍭", // Swirl Lollipop
      k: "👑"  // Sugar Crown
    }
  },
  lava: {
    id: "lava",
    name: "🌋 Lava Volcano",
    desc: "Molten magma orange on volcanic basalt charcoal.",
    board: { light: "#f97316", dark: "#292524" },
    pieces: {
      p: "🪨", // Basalt Pebble
      n: "🦎", // Magma Salamander
      b: "🌋", // Volcano
      r: "🏰", // Obsidian Fortress
      q: "🔥", // Eternal Flame
      k: "👹"  // Magma Golem
    }
  },
  space: {
    id: "space",
    name: "🌌 Deep Space",
    desc: "Starlight silver and cosmic nebula purple.",
    board: { light: "#e2e8f0", dark: "#3b0764" },
    pieces: {
      p: "🛰️", // Satellite
      n: "🛸", // Flying Saucer
      b: "🪐", // Ringed Planet
      r: "🚀", // Rocket
      q: "🌟", // Supernova Star
      k: "👨‍🚀"  // Commander Astronaut
    }
  },
  haunted: {
    id: "haunted",
    name: "🏚️ Haunted Mansion",
    desc: "Spooky cobweb white and midnight phantom violet.",
    board: { light: "#e2e8f0", dark: "#312e81" },
    pieces: {
      p: "🕯️", // Haunted Candle
      n: "🦇", // Vampire Bat
      b: "🧙", // Phantom Sorcerer
      r: "🏚️", // Spooky Tower
      q: "🕷️", // Black Widow Spider
      k: "🧛"  // Vampire Lord
    }
  },
  underwater: {
    id: "underwater",
    name: "🌊 Underwater Reef",
    desc: "Sunlit lagoon cyan and deep oceanic trench azure.",
    board: { light: "#cffafe", dark: "#0369a1" },
    pieces: {
      p: "🐚", // Conch Shell
      n: "🦐", // Seahorse
      b: "🪼", // Jellyfish
      r: "⚓", // Anchor
      q: "🧜", // Mermaid Princess
      k: "🔱"  // Neptune Trident
    }
  },
  arcade: {
    id: "arcade",
    name: "🕹️ Retro Arcade",
    desc: "Phosphor CRT neon green and arcade cabinet black.",
    board: { light: "#86efac", dark: "#0f172a" },
    pieces: {
      p: "👾", // Space Invader
      n: "🕹️", // Joystick
      b: "💿", // Floppy Disc
      r: "📺", // CRT Monitor
      q: "🍒", // Pixel Cherries
      k: "🏆"  // High Score Trophy
    }
  },
  desert: {
    id: "desert",
    name: "🏜️ Desert Pyramids",
    desc: "Golden dune sands and terracotta sandstone.",
    board: { light: "#fef3c7", dark: "#b45309" },
    pieces: {
      p: "🏺", // Clay Urn
      n: "🐪", // Desert Camel
      b: "🪲", // Sacred Scarab
      r: "🏛️", // Pillar of Karnak
      q: "🧕", // Empress Cleopatra
      k: "👑"  // Pharaoh Sphinx
    }
  },
  jungle: {
    id: "jungle",
    name: "🌴 Wild Jungle",
    desc: "Bamboo sprout light green and deep canopy emerald.",
    board: { light: "#dcfce7", dark: "#14532d" },
    pieces: {
      p: "🍌", // Wild Banana
      n: "🐒", // Agile Chimp
      b: "🦜", // Rainforest Parrot
      r: "🌴", // Coconut Palm
      q: "🐆", // Golden Leopard
      k: "🦁"  // King of the Jungle
    }
  },
  ice: {
    id: "ice",
    name: "❄️ Ice Kingdom",
    desc: "Frosty crystalline glaze and deep glacier blue.",
    board: { light: "#f0fdfa", dark: "#0284c7" },
    pieces: {
      p: "❄️", // Snowflake
      n: "🦌", // Arctic Reindeer
      b: "⛄", // Snow Wizard
      r: "🏔️", // Ice Glacier
      q: "🧝", // Frost Empress
      k: "🐻"  // Polar Bear King
    }
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "⚡ Cyberpunk Neon",
    desc: "Electric neon cyan and synthwave dark violet.",
    board: { light: "#a5f3fc", dark: "#4c1d95" },
    pieces: {
      p: "💾", // Memory Chip
      n: "⚡", // Volt Runner
      b: "🕶️", // VR Matrix
      r: "📡", // Comms Antenna
      q: "🤖", // AI Overlord
      k: "🧬"  // Cyber Core
    }
  },
  medieval: {
    id: "medieval",
    name: "🏰 Medieval Castle",
    desc: "Stone cobblestone gray and royal battle crimson.",
    board: { light: "#e2e8f0", dark: "#881337" },
    pieces: {
      p: "🛡️", // Knightly Shield
      n: "🐴", // Warhorse
      b: "🏹", // Royal Crossbow
      r: "🏰", // Stone Bastion
      q: "👸", // High Princess
      k: "👑"  // Crowned Monarch
    }
  },
  pirate: {
    id: "pirate",
    name: "🏴‍☠️ Pirate Seas",
    desc: "Ancient treasure parchment and dark navy sea.",
    board: { light: "#fef08a", dark: "#1e3a5f" },
    pieces: {
      p: "💣", // Cannonball
      n: "🦜", // Pirate Parrot
      b: "🧭", // Brass Compass
      r: "⛵", // Galleon
      q: "🏴‍☠️", // Pirate Queen
      k: "💀"  // Captain Skull
    }
  }
};

// Generates an exact 8x8 SVG checkerboard vector data URL
function generateBoardSvg(light, dark) {
  let darkSquares = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if ((x + y) % 2 === 1) {
        darkSquares += `<rect x="${x}" y="${y}" width="1" height="1" fill="${dark}"/>`;
      }
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="800" height="800"><rect width="8" height="8" fill="${light}"/>${darkSquares}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generates a crisp vector badge with theme emoji
function generateThemedPieceSvg(emoji, isWhite, themeId) {
  // White piece styling: Bright glowing badge
  // Black piece styling: Deep saturated badge
  const bg = isWhite ? "#ffffff" : "#0f172a";
  const border = isWhite ? "#38bdf8" : "#f59e0b";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="${bg}" stroke="${border}" stroke-width="5"/>
    <text x="50" y="66" font-size="50" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Export for extension modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PAWNHUB_THEMES, generateBoardSvg, generateThemedPieceSvg };
}
