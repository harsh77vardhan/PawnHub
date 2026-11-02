#!/usr/bin/env python3
"""
Generate a 1200x630 Open Graph / Twitter Card social preview image for PawnHub.
Aesthetic: Editorial Chess Club Poster / Specimen.
Warm paper background (#F6F2EA), ink typography, hairline borders, and muted vermilion (#B8432F) accents.
"""
import subprocess
import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#1C1A17" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background Base: Warm Paper -->
  <rect width="1200" height="630" fill="#F6F2EA"/>

  <!-- Outer Hairline Frame -->
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="#E2DDD5" stroke-width="1"/>

  <!-- Top Metadata Header Strip -->
  <g transform="translate(70, 75)">
    <text x="0" y="0" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="700" fill="#B8432F" letter-spacing="2">SPECIMEN 01 / BROWSER EXTENSION</text>
    <text x="1060" y="0" text-anchor="end" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="600" fill="#7A756D" letter-spacing="1">100% LOCAL-FIRST • ZERO TRACKERS</text>
    <line x1="0" y1="15" x2="1060" y2="15" stroke="#E2DDD5" stroke-width="1"/>
  </g>

  <!-- Left Column: Editorial Presentation -->
  <g transform="translate(70, 140)">
    <!-- Brand Mark -->
    <g transform="translate(0, 0)">
      <circle cx="16" cy="14" r="10" fill="#B8432F"/>
      <path d="M 8 26 C 9 22, 23 22, 24 26 C 23 36, 28 44, 30 50 L 2 50 C 4 44, 9 36, 8 26 Z" fill="#1C1A17"/>
      <rect x="0" y="50" width="32" height="6" rx="2" fill="#1C1A17"/>
      <text x="44" y="42" font-family="'Instrument Serif', Georgia, serif" font-size="52" font-weight="400" fill="#1C1A17" letter-spacing="-1">Pawn<tspan font-style="italic" fill="#B8432F">Hub</tspan></text>
    </g>

    <!-- Main Editorial Headline -->
    <text x="0" y="130" font-family="'Instrument Serif', Georgia, serif" font-size="50" font-weight="400" fill="#1C1A17" letter-spacing="-0.5">
      An animated comedy engine
    </text>
    <text x="0" y="185" font-family="'Instrument Serif', Georgia, serif" font-size="50" font-style="italic" fill="#B8432F" letter-spacing="-0.5">
      for everyday chess matches.
    </text>

    <!-- Subhead Description -->
    <text x="0" y="245" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="400" fill="#5C5852" line-height="1.6">
      Transform online games with handcrafted vector piece sets, custom photo
    </text>
    <text x="0" y="275" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="400" fill="#5C5852">
      silhouettes, cartoon physics capture reactions, and synthesized audio.
    </text>

    <!-- Key Metadata Tags -->
    <g transform="translate(0, 330)">
      <rect width="180" height="36" rx="4" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="1"/>
      <text x="90" y="23" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="600" fill="#1C1A17">5 Original SVG Sets</text>

      <rect x="195" y="0" width="185" height="36" rx="4" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="1"/>
      <text x="287" y="23" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="600" fill="#1C1A17">28+ Cartoon Effects</text>

      <rect x="395" y="0" width="180" height="36" rx="4" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="1"/>
      <text x="485" y="23" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="600" fill="#1C1A17">12 Board Palettes</text>
    </g>
  </g>

  <!-- Right Column: Framed Chess Specimen -->
  <g transform="translate(710, 125)" filter="url(#subtleShadow)">
    <!-- Specimen Card Outer Frame -->
    <rect width="420" height="420" rx="6" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="1"/>

    <!-- Specimen Header -->
    <rect width="420" height="42" rx="6" fill="#EFEAE1"/>
    <text x="20" y="26" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="700" fill="#1C1A17" letter-spacing="1">LIVE TOY SPECIMEN</text>
    <text x="400" y="26" text-anchor="end" font-family="'Inter', -apple-system, sans-serif" font-size="11" font-weight="600" fill="#B8432F">60 FPS • LOCAL</text>
    <line x1="0" y1="42" x2="420" y2="42" stroke="#E2DDD5" stroke-width="1"/>

    <!-- 4x4 Mini Board Grid -->
    <g transform="translate(30, 65)">
      <rect width="360" height="300" fill="#1C1A17" rx="4" stroke="#8C867D" stroke-width="1"/>

      <!-- 6x5 Board Squares -->
      <g>
        <!-- Row 0 -->
        <rect x="0" y="0" width="60" height="60" fill="#F5F5F4"/>
        <rect x="60" y="0" width="60" height="60" fill="#1C1917"/>
        <rect x="120" y="0" width="60" height="60" fill="#F5F5F4"/>
        <rect x="180" y="0" width="60" height="60" fill="#1C1917"/>
        <rect x="240" y="0" width="60" height="60" fill="#F5F5F4"/>
        <rect x="300" y="0" width="60" height="60" fill="#1C1917"/>

        <!-- Row 1 -->
        <rect x="0" y="60" width="60" height="60" fill="#1C1917"/>
        <rect x="60" y="60" width="60" height="60" fill="#F5F5F4"/>
        <rect x="120" y="60" width="60" height="60" fill="#1C1917"/>
        <rect x="180" y="60" width="60" height="60" fill="#F5F5F4"/>
        <rect x="240" y="60" width="60" height="60" fill="#1C1917"/>
        <rect x="300" y="60" width="60" height="60" fill="#F5F5F4"/>

        <!-- Row 2 -->
        <rect x="0" y="120" width="60" height="60" fill="#F5F5F4"/>
        <rect x="60" y="120" width="60" height="60" fill="#1C1917"/>
        <rect x="120" y="120" width="60" height="60" fill="#F5F5F4"/>
        <rect x="180" y="120" width="60" height="60" fill="#1C1917"/>
        <rect x="240" y="120" width="60" height="60" fill="#F5F5F4"/>
        <rect x="300" y="120" width="60" height="60" fill="#1C1917"/>

        <!-- Row 3 -->
        <rect x="0" y="180" width="60" height="60" fill="#1C1917"/>
        <rect x="60" y="180" width="60" height="60" fill="#F5F5F4"/>
        <rect x="120" y="180" width="60" height="60" fill="#1C1917"/>
        <rect x="180" y="180" width="60" height="60" fill="#F5F5F4"/>
        <rect x="240" y="180" width="60" height="60" fill="#1C1917"/>
        <rect x="300" y="180" width="60" height="60" fill="#F5F5F4"/>

        <!-- Row 4 -->
        <rect x="0" y="240" width="60" height="60" fill="#F5F5F4"/>
        <rect x="60" y="240" width="60" height="60" fill="#1C1917"/>
        <rect x="120" y="240" width="60" height="60" fill="#F5F5F4"/>
        <rect x="180" y="240" width="60" height="60" fill="#1C1917"/>
        <rect x="240" y="240" width="60" height="60" fill="#F5F5F4"/>
        <rect x="300" y="240" width="60" height="60" fill="#1C1917"/>
      </g>

      <!-- Pieces on Board -->
      <!-- White Rook -->
      <g transform="translate(10, 248)">
        <rect x="10" y="24" width="20" height="14" rx="2" fill="#B8432F"/>
        <circle cx="20" cy="18" r="8" fill="#B8432F"/>
      </g>
      <!-- White Knight -->
      <g transform="translate(70, 188)">
        <path d="M 12 36 L 12 24 C 12 14, 24 8, 32 14 L 36 22 L 28 26 L 36 36 Z" fill="#B8432F"/>
      </g>
      <!-- Black King (Toppled) -->
      <g transform="translate(190, 68) rotate(45 20 20)">
        <rect x="8" y="24" width="24" height="12" rx="2" fill="#EAE5DC"/>
        <circle cx="20" cy="12" r="8" fill="#EAE5DC"/>
        <polygon points="17,4 23,4 23,8 17,8" fill="#EAE5DC"/>
      </g>

      <!-- "BONK!" Editorial Reaction Badge -->
      <g transform="translate(140, 110)">
        <rect width="115" height="42" rx="4" fill="#B8432F" stroke="#FFFFFF" stroke-width="2"/>
        <text x="57" y="28" text-anchor="middle" font-family="'Instrument Serif', Georgia, serif" font-size="24" font-weight="700" fill="#FFFFFF" letter-spacing="1">BONK!</text>
      </g>
    </g>

    <!-- Bottom Caption inside card -->
    <text x="210" y="396" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="12" font-weight="500" fill="#7A756D">
      Click pieces to play moves • 14 synthesized audio effects
    </text>
  </g>
</svg>
"""

svg_path = "/tmp/pawnhub_og_preview.svg"
png_path = "/home/harsh/Documents/PawnHub/site/assets/og-preview.png"

with open(svg_path, "w") as f:
    f.write(svg_content)

subprocess.run(["magick", svg_path, png_path], check=True)
print(f"Generated {png_path} ({os.path.getsize(png_path)} bytes)")
