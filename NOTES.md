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

## Stage 1 & 2: Comedy Mode & 12 Classic Themes
- **Fullscreen Overlay**: Fixed to viewport (`#pawnhub-overlay-container`) via `getBoundingClientRect()` to prevent clipping from chess.com container `overflow: hidden`.
- **"Bonk & Fly" Captures**: Ghost piece animations with wind-up, fast lunge, squash-and-stretch, comic text bursts, and spinning launch physics.
- **Web Audio API**: 25+ layered synthesized sound effects with `DynamicsCompressorNode` for punchy, distortion-free audio.

---

## Premium Piece Sets Upgrade: Stage 1 (Handcrafted Vector Pieces)

### Design Evolution: Retiring Generic Emojis
- **Why Change?**: Emoji-in-a-circle pieces felt cheap and lacked distinct chess silhouettes, making blitz or rapid recognition difficult.
- **The Solution**: 5 fully original, hand-designed SVG piece sets (12 pieces each = 60 custom vector designs):
  1. 💎 **Crystal Glass**: Faceted translucent gems with internal refractive planes, specular highlights, and diamond-cut silhouettes.
  2. ⚡ **Neon Wireframe**: Glowing electric cyan & hot magenta laser outlines on dark cyber-glass bodies (ensuring high contrast against bright squares).
  3. 👑 **Gold & Obsidian**: Luxury Staunton-inspired forms crafted in 24k polished royal gold (White) and mirror-finished volcanic obsidian with platinum bevels (Black).
  4. ✂️ **Paper Cut**: Tactile layered origami cardstock with realistic crease shading and soft paper drop-shadows.
  5. 👾 **Friendly Monsters**: Cute, original creatures (Peep, Draco-Pony, Sprout-Shaman, Bouldy, Tiaradusa, Leo-Rex) with distinct chess anatomy and large expressive eyes.

### Architectural Modularity
- Each piece set is completely isolated in its own file (`content/pieces/crystal.js`, `neon.js`, `gold_obsidian.js`, `paper_cut.js`, `monsters.js`).
- Centrally registered in `content/pieces/index.js` with cached vector generation so SVGs are created once and reused.
- Every set is paired with a matching board color scheme for a cohesive visual aesthetic.
- User-uploaded photos still maintain highest priority on an individual piece slot basis.

---

## Molded Silhouette Studio Upgrade: Shape Masking & Non-Destructive Framing

### The Problem: Unmolded Photos Lose Chess Legibility
- When arbitrary photos (faces, pets, logos) are pasted unclipped on squares, pieces become hard to distinguish (e.g. Knight vs Bishop, Queen vs King).
- Players cannot easily recognize pieces during fast-paced blitz or bullet games.

### The Solution: Handcrafted Piece Silhouettes & Canvas Pre-Rendering
1. **6 Handcrafted Silhouettes (`content/masking.js`)**:
   - Closed vector paths with wide, stable bases designed for instant recognition:
     - **Pawn**: Spherical dome head, tapered waist, flared bell base.
     - **Rook**: Sturdy castle tower with crenellated battlements.
     - **Knight**: Left-facing stallion with snout, pricked ear, and arched neck.
     - **Bishop**: Cathedral mitre with pointed apex cleft and finial orb.
     - **Queen**: Flared royal gown with 5-spiked coronet pearls.
     - **King**: Broad mantle with tall dome and prominent Greek cross.
2. **Dual-Contrast Side Outlines**:
   - **White Pieces**: 7px dark slate outer edge (`#0f172a`) + 4px bright white inner rim (`#ffffff`) + 1.5px gold accent bevel (`#f59e0b`). Pops on both light and dark squares.
   - **Black Pieces**: 7px crisp white outer edge (`#ffffff`) + 4px deep obsidian inner rim (`#0f172a`) + 1.5px cyan accent line (`#38bdf8`). Pops on both light and dark squares.
3. **Interactive Studio Tool (`options/options.html` & `options/options.js`)**:
   - **Canvas Viewport**: Real-time 256×256 canvas with grab/grabbing cursor for drag-to-position framing.
   - **Zoom Slider**: 50% to 300% zoom with live percentage readout.
   - **3 Shape Modes**:
     - *Full Silhouette*: Photo cleanly molded into the silhouette.
     - *Silhouette + Badge*: Molded photo with a crisp corner letter badge (P, N, B, R, Q, K).
     - *Original Photo*: Unclipped photo with rounded corners and side border.
   - **Batch "Apply to All"**: One-click application of photo framing to all 6 pieces of a side (White or Black).
4. **Storage Architecture & Non-Destructive Re-Cropping**:
   - Downscales raw uploads to max 512×512 before storing in `pawnhub_raw_uploads` alongside crop parameters (`zoom`, `offsetX`, `offsetY`, `mode`).
   - Pre-renders 256×256 PNGs in `pawnhub_pieces` for instant, lag-free board injection.
   - Re-opening any piece restores original photo and crop coordinates.
   - Live quota monitoring with `chrome.storage.local.getBytesInUse` and >7MB warning banner.

---

## Custom Sounds Studio Upgrade: Event Slots, Video Extraction, & Waveform Trimmer

### Architectural Highlights
1. **12 Independent Event Slots**:
   - `move_mine`: My regular move
   - `move_opponent`: Opponent regular move
   - `capture_mine`: My piece captures
   - `capture_opponent`: Opponent piece captures
   - `queen_capture`: Queen captured (either side)
   - `check`: King placed in check
   - `castle`: Castling move
   - `promotion`: Pawn promoted
   - `win`: Checkmate win / game won
   - `lose`: Checkmate loss / game lost
   - `draw`: Stalemate / draw
   - `game_start`: First move of a new game
   - Each slot supports multiple sounds, slot on/off toggle, drag & drop upload, individual volume sliders, and non-repeating back-to-back random selection.

2. **Video Audio Extraction Engine (`options/options.js`)**:
   - Accepts `mp4, webm, mkv, mov` video files alongside standard audio (`mp3, wav, ogg, m4a, webm`).
   - Two-tier extraction pipeline:
     1. Direct byte read with `AudioContext.decodeAudioData` (fastest, zero re-encoding loss).
     2. Stream capture fallback using a detached hidden `<video>` element + `captureStream()` + `MediaRecorder` webm chunk aggregation.
   - Graceful fallback with human-friendly guidance if browser codecs cannot decode the container.

3. **Interactive Waveform Trimmer Modal**:
   - Custom `<canvas>` rendering showing decoded audio peaks with normalized time scales.
   - Draggable start and end handle curtains with touch/mouse interaction.
   - Max 10.0-second clip duration enforcement with automatic 3.0s smart default selection for files > 3s.
   - Optional 40ms linear fade-in and fade-out to prevent audio clicking.
   - Dedicated preview and stop controls with real-time audio volume preview.

4. **WAV Compression Engine & Storage**:
   - Encodes trimmed audio buffers to mono, 22.05 kHz, 16-bit PCM WAV.
   - Produces crisp voice clips and meme sounds at ~44.1 KB/sec (~44 KB for a 1-second move sound).
   - Displayed live clip size in KB on every sound item.
   - Added `"unlimitedStorage"` permission to `manifest.json` to allow rich custom sound libraries without the 10MB `chrome.storage.local` quota limit.

5. **Zero-Latency In-Game Engine (`content/audio.js` & `content/content.js`)**:
   - `loadCustomSounds`: Pre-decodes base64 WAVs into native browser `AudioBuffer`s upon extension initialization and storage changes. In-game playback has 0ms decoding latency.
   - Board orientation detection: Evaluates `wc-chess-board.flipped` to differentiate `move_mine` / `capture_mine` from opponent moves in real time.
   - Polyphonic Voice Limiter: Maximum 4 concurrent audio voices (`MAX_CONCURRENT_VOICES = 4`) with FIFO voice-stealing to prevent audio clipping during rapid blitz play.
   - Sound Priority & Fallback: Custom sounds play first; unassigned or toggled-off slots cleanly fall back to synthesized comedy sounds.
   - Auto-Unlock: Resumes `AudioContext` on first user interaction anywhere on chess.com.

6. **Chess.com Default Sound Handling**:
   - Toggle to automatically mute chess.com's default audio when custom sounds are active.
   - Intercepts `<audio>` playback elements safely without breaking site functionality.

7. **Export & Import with Legal Disclaimers**:
   - One-click export to a portable `.json` soundpack file.
   - Copyright notice modal warning users that they must hold distribution rights to any exported audio.
   - Import validation that verifies schema structure, decodes buffers, and catches malformed JSON files.

---

## Full QA & Bug-Fix Audit (All 158 Controls Verified)

### Comprehensive Static & Dynamic Verification
- Built an exhaustive 158-control inventory documented in [`docs/QA_CHECKLIST.md`](file:///home/harsh/Documents/PawnHub/docs/QA_CHECKLIST.md).
- Developed an automated Chrome DevTools Protocol (CDP) headless test harness (`run_cdp_tests.js`) running in headless Chromium/Brave with zero errors:
  - Auditioned all 19 Web Audio sound effects and 12 animation effect sequences in the Test Lab.
  - Verified Molded Silhouette Studio photo uploads, drag-to-frame canvas offsets, zoom sliders, piece switching, and batch side applications.
  - Auditioned Trimmer Modal and Copyright Notice modal interactions.
  - Simulated complete games on a mock `<wc-chess-board>` (start, normal move, capture, queen capture, check, win/loss/draw game over modals).
  - Validated silent fail-safe on non-board pages (e.g. forums) and dynamic board reconnection via interval-based `attachBoardWatcher()`.

### Key Fixes Implemented
1. **Temporal Dead Zone Prevention (`content/content.js`)**: Moved the immediate IIFE invocation from the top of the file to after all variable declarations and definitions, eliminating `ReferenceError: Cannot access 'settings' before initialization`.
2. **Effects Options & Event Routing (`content/effects.js`)**: Fixed `ReferenceError: options is not defined` inside `playCaptureSequence` and `playNormalMoveAnimation` by explicitly declaring parameter defaults and mapping `finalEventKey`.
3. **Defensive Storage Wrappers (`popup/popup.js` & `options/options.js`)**: Added `storageGet` and `storageSet` helpers guarding against crashes when loaded outside an extension context.
4. **Storage Sync Parity (`popup/popup.js`)**: Updated single-piece clear and `resetAllPieces` to synchronize `pawnhub_raw_uploads` alongside `pawnhub_pieces`.
5. **Feature Parity (`options/options.html` & `options/options.js`)**: Added missing Joke Size and Joke Duration sliders to Options Section 4 with live numerical labels.
6. **Studio Canvas Isolation (`options/options.js`)**: Reset studio image and data URL references to null when selecting unassigned pieces, preventing stale photo retention.
7. **SPA Observer Lifecycle (`content/content.js`)**: Added duplicate observer guards and active DOM connection checks (`!board.isConnected`) to safely re-watch boards across Chess.com single-page app navigations.
8. **Missing ID Fix (`options/options.html`)**: Added missing `id="btn-import-sounds"` attribute to the soundpack import label.

