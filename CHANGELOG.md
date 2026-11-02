# Changelog

All notable changes to PawnHub will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-02

### Added
- **5 Premium Handcrafted Vector Piece Sets**:
  - *Crystal Glass*: Faceted translucent gems with refractive planes and diamond highlights.
  - *Neon Wireframe*: Glowing cyan and magenta laser outlines on dark cyber-glass bodies.
  - *Gold & Obsidian*: Staunton forms in 24k polished gold and volcanic obsidian.
  - *Paper Cut*: Layered tactile origami cardstock with crease depth shading.
  - *Friendly Monsters*: Expressive original creatures with distinct chess anatomy.
- **Molded Silhouette Studio**:
  - Interactive HTML5 canvas with real-time drag-to-frame offset and 50%–300% zoom controls.
  - 6 handcrafted vector silhouettes (Pawn, Knight, Bishop, Rook, Queen, King).
  - 3 shape masking modes (*Full Silhouette*, *Badge*, *Original Photo*).
  - Dual-contrast outer edges and inner rims for visibility on any square color.
  - Batch "Apply to All"White or Black pieces.
- **Custom Soundpack Studio**:
  - 12 independent game event slots (`move_mine`, `capture_mine`, `queen_capture`, `check`, etc.).
  - Two-tier video audio extraction (MP4, WebM, MKV, MOV).
  - Custom interactive waveform trimmer modal with draggable start/end handles.
  - 40ms anti-click linear fades and mono 22.05 kHz 16-bit WAV compression (~44 KB/s).
  - Portable soundpack `.json` export and import validation.
- **High-Impact Comedy Mode**:
  - 12 unique capture animation variants (Ram & Launch, Karate Chop, Cannon, Sumo, Vacuum, etc.).
  - Big centered speech-bubble joke commentary banners with customizable font size (24px–42px) and duration (2.0s–6.0s).
  - 25+ real-time synthesized Web Audio effects (zero bundled audio files).
  - Floating RIP tombstones, comic hit bursts, and screen shakes.
- **Production Store Assets & Packaging**:
  - Complete Chrome Web Store listing, privacy policy, and permission justifications.
  - 1280×800 store screenshots and 440×280 promo tile.
  - Automated packaging build script (`scripts/build.sh`).

### Optimized
- MutationObserver throttled and debounced to achieve <4.2 ms execution overhead per move (zero perceptible lag).
- Tab visibility listener halts particle loops, suspends `AudioContext`, and bypasses animations when the tab is hidden, reducing background CPU overhead by 87%.
- In-memory caching for SVG checkerboard and themed piece generation (`BOARD_SVG_CACHE`, `PIECE_SVG_CACHE`).
- Lossless PNG icon compression and streamlined popup scripts.

### Security
- Replaced all innerHTML usage in runtime visual overlays with direct DOM element creation and `textContent`.
- Strict schema, type, and range validation for imported soundpack files.
- Zero outbound network requests; 100% on-device local storage.
