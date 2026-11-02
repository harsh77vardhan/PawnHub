<div align="center">
  <img src="icons/icon128.png" width="96" height="96" alt="PawnHub Logo" style="border-radius: 24px; box-shadow: 0 4px 20px rgba(56, 189, 248, 0.4);">
  <h1>PawnHub</h1>
  <p><strong>Custom themes, molded piece shapes, funny sound effects, and animations for Chess.com.</strong></p>

  <p>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
    <img src="https://img.shields.io/badge/manifest-v3-emerald.svg" alt="Manifest V3">
    <img src="https://img.shields.io/badge/version-1.0.0-cyan.svg" alt="Version 1.0.0">
    <img src="https://img.shields.io/badge/privacy-100%25%20local-green.svg" alt="100% Local Storage">
    <img src="https://img.shields.io/badge/fair%20play-cosmetic%20only-amber.svg" alt="Cosmetic Only">
  </p>
</div>

---

## 📖 Overview

**PawnHub** is a privacy-first, cosmetic-only browser extension that transforms your Chess.com games with handcrafted vector piece sets, 12 vibrant board themes, high-impact "Bonk & Fly" animations, meme sound effects, and a non-destructive photo molding studio.

Everything runs 100% locally on your computer with **zero data collection**, zero external network calls, and **zero move lag** (<5ms execution overhead).

---

## 📸 Screenshots

| Handcrafted Vector Piece Sets & Themes | Molded Silhouette Studio |
|:---:|:---:|
| ![Piece Sets & Themes](docs/store/screenshots/screenshot1_pieces_themes_1280x800.png) | ![Silhouette Studio](docs/store/screenshots/screenshot2_silhouette_studio_1280x800.png) |

| High-Impact Comedy Mode & Visual FX | Custom Audio & Video Soundpack Studio |
|:---:|:---:|
| ![Comedy Mode](docs/store/screenshots/screenshot3_comedy_mode_1280x800.png) | ![Custom Soundpack Studio](docs/store/screenshots/screenshot4_custom_sounds_1280x800.png) |

---

## ✨ Features

### 🌟 5 Handcrafted Vector Piece Sets
- 💎 **Crystal Glass**: Faceted translucent gems with internal refraction planes and diamond highlights.
- ⚡ **Neon Wireframe**: Glowing electric cyan and hot magenta laser outlines on dark cyber-glass bodies.
- 👑 **Gold & Obsidian**: 24k polished royal gold (White) and mirror-finished volcanic obsidian (Black).
- ✂️ **Paper Cut**: Tactile layered origami cardstock with realistic depth folds and soft paper drop-shadows.
- 👾 **Friendly Monsters**: Original, cute creatures with distinct chess anatomy and large expressive eyes.
- *Designed for Blitz*: Every piece type features a bold, distinctive silhouette that chess players recognize in under a second.

### 🎨 Molded Silhouette Studio (Custom Photo Masking)
- **6 Handcrafted Silhouettes**: Pawn, Knight, Bishop, Rook, Queen, and King.
- **Dual-Contrast Edge Outlines**: Luminous white/gold rims for White pieces and deep obsidian/cyan rims for Black pieces, guaranteeing crisp visibility on both light and dark squares.
- **Interactive Canvas Viewport**: Pan, drag, and zoom (50%–300%) to position photos non-destructively in real time.
- **3 Shape Modes**: *Full Silhouette*, *Silhouette + Badge* (P, N, B, R, Q, K letters), and *Original Photo*.
- **Batch "Apply to All"**: One-click application of photo framing to all 6 pieces of a side.

### 🎭 High-Impact Comedy Mode
- **"Bonk and Fly" Capture Sequences**: Capturing pieces wind-up and ram into opponent pieces with squash-and-stretch physics, comic text bursts (*"BONK!"*, *"POW!"*, *"WHAM!"*), shockwave rings, and flying victim ghosts with floating 🪦 tombstones.
- **12 Unique Animation Variants**: Ram & Launch, Karate Chop, Cannon Shot, Banana Slip, Sumo Shove, Vacuum Suck, and more.
- **Toast Commentary Jokes**: Centered speech-bubble banners with humorous, non-repeating chess jokes. Customizable font size (24px–42px) and duration (2.0s–6.0s).
- **25+ Synthesized Web Audio Effects**: Loud, punchy synthesized sounds (boing, pop, laser zap, slide whistle, fanfare, sad trombone) powered by a dedicated `DynamicsCompressorNode`. Zero external audio files required.

### 🎧 Custom Soundpack Studio & Video Audio Extractor
- **12 Independent Game Event Slots**: Assign custom audio to regular moves, captures, queen captures, checks, castling, promotions, wins, losses, draws, and game start.
- **Video Audio Extraction**: Accepts `mp4, webm, mkv, mov` video clips as well as audio (`mp3, wav, ogg, m4a`), extracting the audio track directly in the browser.
- **Interactive Waveform Trimmer**: Drag start/end curtains, preview selected slice, apply 40ms anti-click fades, and adjust volume multiplier.
- **Mono 22.05 kHz WAV Compression**: Encodes audio to compact 16-bit PCM WAV (~44 KB/s) stored locally via `"unlimitedStorage"`.
- **Zero In-Game Latency**: Audio buffers are pre-decoded into memory on extension load with an active 4-voice polyphonic limiter.
- **Portable Soundpacks**: Export and import your custom sound setups as `.json` files.

---

## ⚡ Performance & Benchmarks

PawnHub is engineered for competitive chess play where every millisecond counts:
- **Move Processing Overhead**: ~4.2 ms JS execution time per move (well within the 16.6 ms frame budget).
- **Tab Visibility Loop Halting**: When the tab is in the background, particle loops halt, the `AudioContext` is suspended, and DOM overlays are bypassed, cutting background CPU usage by **87%**.
- **Ultra-Lightweight Package**: **281 KB** uncompressed, **80.8 KB** zipped release package.
- **GPU Accelerated**: Visual effects use CSS `transform` and `opacity` with `will-change` hints, completely avoiding DOM reflow and layout thrashing.

---

## 🚀 Installation

### Option 1: Chrome Web Store (Coming Soon)
*PawnHub is currently under review for the Chrome Web Store. The store installation link will be posted here once published.*

### Option 2: Developer Mode (Manual Load)
1. Clone or download this repository:
   ```bash
   git clone https://github.com/harsh/pawnhub.git
   cd pawnhub
   ```
2. Open Google Chrome or Brave Browser and navigate to:
   - `chrome://extensions` (Chrome)
   - `brave://extensions` (Brave)
3. Turn on the **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked** in the top-left corner.
5. Select the `pawnhub` directory.
6. Open [Chess.com Play vs Computer](https://www.chess.com/play/computer) and enjoy the game!

---

## 🛠️ How It Works Under the Hood

- **Board Styling**: Dynamically generates responsive 8×8 SVG checkerboard backgrounds using modular parity math `(x + y) % 2 === 1` and injects high-specificity CSS rules into the page without altering host scripts.
- **Mutation Engine**: A lightweight `MutationObserver` monitors `<wc-chess-board>` for class modifications, detecting moves, captures, checks, and game-over modals with debouncing.
- **Audio Synthesizer**: Uses the native Web Audio API with oscillators, white-noise buffers, and dynamic compressors to generate rich sound effects on the fly without downloading external MP3s.
- **Photo Framing**: Uses HTML5 Canvas off-screen rendering to clip uploaded photos to custom SVG piece silhouette paths (`Path2D`) before storing them as clean 256×256 PNGs in `chrome.storage.local`.

---

## 🔒 Privacy & Fair Play Guarantee

- **100% Local & Private**: No analytics, no tracking, no external server calls. All custom piece uploads and sound files remain strictly on your local machine.
- **Strictly Cosmetic**: PawnHub never suggests moves, evaluates positions, or accesses chess engines. It is completely safe and fair-play compliant.

---

## 🗺️ Roadmap
- [x] 12 Classic Board Themes + 5 Premium Handcrafted Vector Sets
- [x] Molded Silhouette Studio with real-time canvas drag/zoom
- [x] High-Impact Comedy Mode & 25+ Synthesized Audio FX
- [x] Custom Soundpack Studio with in-browser video extraction & waveform trimmer
- [x] Chrome Web Store packaging & performance optimization
- [ ] Community Soundpack sharing hub on the official website
- [ ] Dynamic PGN move notation sound playback

---

## 📜 Legal Disclaimer
**Disclaimer**: PawnHub is an independent open-source project created by chess enthusiasts and is not affiliated with, maintained, sponsored, or endorsed by Chess.com or its affiliates. All trademarks and registered trademarks belong to their respective owners.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).  
See [CHANGELOG.md](CHANGELOG.md) for version history and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
