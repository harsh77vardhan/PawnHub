# PawnHub

A cosmetic Chrome extension that transforms online chess games with 5 premium handcrafted SVG piece sets, 12 immersive themes, custom user uploads, high-impact "Bonk & Fly" animations, and comedy commentary.

## Features
- **🎨 Molded Silhouette Studio (Custom Photo Masking)**:
  - Molds user-uploaded photos into 6 handcrafted chess piece silhouettes (Pawn, Knight, Bishop, Rook, Queen, King).
  - High-contrast multi-layer rims: White pieces feature dark slate borders with luminous white/gold rims; Black pieces feature crisp white borders with obsidian/cyan rims.
  - Interactive drag-to-position pan canvas and 50%–300% zoom slider.
  - 3 Shape Modes: "Full Silhouette", "Silhouette + Badge" (P, N, B, R, Q, K letters), and "Original Photo".
  - Batch "Apply to All" button to assign one photo to all 6 pieces of a side in one click.
  - Non-destructive re-cropping powered by compact 512px raw photo storage and instant 256px pre-rendered PNGs.
  - Built-in storage quota meter with live MB monitoring and threshold warnings.
- **🌟 5 Premium Handcrafted SVG Piece Sets**:
  - 💎 **Crystal Glass**: Faceted translucent gems with refractive planes and diamond highlights.
  - ⚡ **Neon Wireframe**: Glowing cyan and magenta laser outlines on dark cyber-glass bodies.
  - 👑 **Gold & Obsidian**: Polished 24k royal gold and mirror-finished volcanic obsidian luxury forms.
  - ✂️ **Paper Cut**: Tactile layered origami cardstock with realistic depth folds and soft shadows.
  - 👾 **Friendly Monsters**: Original, cute expressive creatures with distinctive chess silhouettes and large expressive eyes.
- **Matching Board Themes**: Every premium set is paired with a custom board palette designed to maximize contrast and immersion.
- **Custom Piece Uploads**: Upload your own images for any slot; custom uploads seamlessly take top priority over set pieces.
- **💥 Signature Capture Sequences ("Bonk and Fly")**:
  - Capturing pieces wind-up and ram into victims with squash-and-stretch physics.
  - Giant comic bursts ("BONK!", "POW!", "WHAM!", "KABOOM!"), shockwaves, and particles.
  - Victim pieces launch spinning across the board with floating 🪦 tombstones.
  - 6 unique variants: Ram & Launch, Karate Chop, Cannon Shot, Banana Slip, Sumo Shove, and Vacuum Suck.
- **🔊 Loud Synthesized Web Audio API**: Over 25 distinct sound effects with a dedicated `DynamicsCompressorNode` for crisp, punchy audio.
- **🎧 Custom Sound Packs & Video Audio Extractor**:
  - 12 independent event slots (Move & Capture for both self and opponent, Queen Capture, Check, Castle, Promotion, Win, Lose, Draw, Game Start).
  - Audio upload (`mp3, wav, ogg, m4a, webm`) and Video extraction (`mp4, webm, mkv, mov`).
  - Interactive Waveform Trimmer with draggable start/end curtains, preview, fade-in/out, and volume slider.
  - High-efficiency 22.05 kHz 16-bit mono WAV compression (~44 KB/s) + `"unlimitedStorage"` permission.
  - Zero-latency in-game playback with in-memory `AudioBuffer` pre-decoding and 4-voice polyphonic limiter.
  - Chess.com default audio muting toggle.
  - Portable JSON Soundpack Export & Import with legal copyright disclaimers.
- **💬 Big Speech Bubble Jokes**: Centered high-contrast banners (`clamp(26px, 3.5vw, 42px)`) with size and duration controls.
- **🧪 Interactive Test Lab**: Audition any sound or animation directly on the Options page with one click.
- **100% Cosmetic & Fair Play Safe**: Never touches game logic, move generation, or position evaluation.

## Development Setup

1. Open your browser and navigate to `chrome://extensions` (or `brave://extensions`).
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner and select `/home/harsh/Documents/PawnHub`.
4. Open [chess.com/play/computer](https://www.chess.com/play/computer) and enjoy the game!
