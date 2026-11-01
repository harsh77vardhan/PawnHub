# PawnHub Learning Notes ♟️

A record of what we learned and built during each phase of development.

---

## Phase 1: The Minimal Working Extension
- **`manifest.json`**: The entry point of every Chrome extension. JSON cannot contain comments.
- **Content Scripts**: Scripts that run inside the target webpage (`chess.com`) to inspect or modify the DOM.
- **Isolation**: Content scripts run in an isolated world and can safely add elements.

---

## Phase 2 & 3: Board Themes & Custom Piece Replacement
- **Popup & Options Pages**: Popup for quick toggles, full-tab Options page (`options/options.html`) for Linux file upload stability.
- **Dynamic Vector Themes**: Generates 8×8 SVG checkerboards directly in JS with parity math `(x + y) % 2 === 1`.
- **High-Specificity Overrides**: Targets `wc-chess-board .piece.<key>` with `!important` to override site CSS.
- **Canvas Optimization**: Resizes images to 150×150 before storing to keep `chrome.storage.local` snappy and light.

---

## Stage 1: 12 Immersive Themes & Matching Piece Sets
- **Modular Theme Architecture (`content/themes.js`)**: Decoupled themes from content logic into a dedicated file shared across content scripts, popups, and the options page.
- **12 Full Board & Piece Palettes**: Candy Land, Lava Volcano, Deep Space, Haunted Mansion, Underwater Reef, Retro Arcade, Desert Pyramids, Wild Jungle, Ice Kingdom, Cyberpunk Neon, Medieval Castle, Pirate Seas.
- **Hierarchy of Overrides**: User-uploaded photos still take top priority over theme pieces on a per-slot basis.

---

## Stage 2 Upgrade: High-Impact Animations & Audio Overhaul

### 1. Root Cause of Visibility & Audio Issues
- **Clipping**: Chess.com containers have `overflow: hidden` and internal stacking contexts that clipped or hid effects placed inside `<wc-chess-board>`.
  - **Solution**: A single fixed full-screen overlay (`#pawnhub-overlay-container`) positioned via `getBoundingClientRect()` with `z-index: 99999999` and `pointer-events: none`.
- **Audio Autoplay**: Modern browsers suspend `AudioContext` until user interaction.
  - **Solution**: Multi-event unlocking listener (`click`, `pointerdown`, `keydown`) plus `DynamicsCompressorNode` for loud, distortion-free audio.

### 2. "Bonk and Fly" Capture Sequence
- **Board Snapshotting**: Storing piece locations, styles, and dimensions before mutations allows us to recreate the captured piece even after chess.com deletes it from the DOM.
- **Ghost Clones**:
  1. Capturing piece clone winds up and lunges from origin square to target square.
  2. Real piece hidden during flight so it never appears duplicated.
  3. Impact creates comic text bursts ("BONK!", "POW!", "WHAM!"), board shake, and shockwaves.
  4. Victim piece clone launches spinning across the screen in the direction of the hit and drops a floating 🪦.
- **6 Variants**: Ram & Launch, Karate Chop, Cannon Shot, Banana Slip, Sumo Shove, and Vacuum Suck.

### 3. Big Speech Bubble Jokes & Test Lab
- Jokes scaled to centered speech bubbles (`clamp(26px, 3.5vw, 42px)`) with customizable size and duration sliders in popup.
- Options page upgraded with an **Interactive Test Lab** with one-click audition buttons for all 25+ sounds and animation sequences.
