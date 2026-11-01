# PawnHub

A cosmetic Chrome extension that transforms online chess games with 12 immersive themes, custom user pieces, high-impact "Bonk & Fly" animations, loud synthesized audio, and comedy commentary.

## Features
- **12 Immersive Themes**: Candy Land, Lava Volcano, Deep Space, Haunted Mansion, Underwater Reef, Retro Arcade, Desert Pyramids, Wild Jungle, Ice Kingdom, Cyberpunk Neon, Medieval Castle, and Pirate Seas.
- **Matching Vector Pieces**: Custom inline SVG emoji artwork for every theme.
- **Custom Piece Upload Overrides**: Upload your own images; custom uploads seamlessly take top priority over theme sets.
- **💥 Signature Capture Sequences ("Bonk and Fly")**:
  - Capturing pieces wind-up and ram into victims with squash-and-stretch physics.
  - Impact spawns giant comic bursts ("BONK!", "POW!", "WHAM!", "KABOOM!"), shockwaves, and particles.
  - Victim pieces launch spinning across the board in the push direction with floating 🪦 tombstones.
  - 6 unique variants: Ram & Launch, Karate Chop, Cannon Shot, Banana Slip, Sumo Shove, and Vacuum Suck.
- **🔊 Loud Synthesized Web Audio API**:
  - Over 25 distinct sound effects with a dedicated `DynamicsCompressorNode` for crisp, punchy audio without distortion.
- **💬 Big Speech Bubble Jokes**:
  - Centered high-contrast banners (`clamp(26px, 3.5vw, 42px)`) with customizable size and duration sliders in popup.
- **🧪 Interactive Test Lab**:
  - Audition any sound, capture sequence, or random combo directly on the Options page with one click.
- **100% Cosmetic & Fair Play Safe**: Never touches game logic, move generation, or position evaluation.

## Development Setup

1. Open your browser and navigate to `chrome://extensions` (or `brave://extensions`).
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner and select `/home/harsh/Documents/PawnHub`.
4. Open [chess.com/play/computer](https://www.chess.com/play/computer) and enjoy the game!
