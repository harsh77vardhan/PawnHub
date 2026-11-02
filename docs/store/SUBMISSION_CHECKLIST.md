# Chrome Web Store Developer Submission Checklist

Follow this checklist to publish PawnHub on the Chrome Web Store using your own developer account.

---

## Pre-Submission Verification

- [x] Extension package built: `pawnhub-v1.0.0.zip` (80.8 KB)
- [x] Manifest version: `1.0.0` (Manifest V3)
- [x] Description: 92 characters (under the 132-character limit)
- [x] Icons included: 16×16, 48×48, 128×128 PNGs
- [x] Store screenshots ready: 1280×800 (4 PNGs in `docs/store/screenshots/`)
- [x] Promo tile ready: 440×280 (`docs/store/screenshots/promo_tile_440x280.png`)
- [x] Privacy policy written: `docs/store/privacy-policy.md`
- [x] Store listing text written: `docs/store/STORE_LISTING.md`

---

## Step-by-Step Store Upload Guide

1. **Log in to Developer Dashboard**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
   - Sign in with your Google account. (If it's your first time, pay the one-time $5 developer registration fee).

2. **Upload the Zip Package**:
   - Click **+ New Item** in the upper right.
   - Drag and drop `/home/harsh/Documents/PawnHub/pawnhub-v1.0.0.zip` (or browse to select it).
   - Wait for Chrome to validate the manifest.

3. **Fill in Store Listing Tab**:
   - **Title**: `PawnHub — Custom Themes, Pieces & Sounds for Chess.com` (from [`docs/store/STORE_LISTING.md`](STORE_LISTING.md))
   - **Short Description**: `Custom themes, molded piece shapes, funny sound effects, and animations for Chess.com.`
   - **Detailed Description**: Copy and paste section 3 & 4 from [`docs/store/STORE_LISTING.md`](STORE_LISTING.md).
   - **Category**: Select `Fun` (or `Productivity` / `Accessibility`).
   - **Language**: `English`.

4. **Upload Graphic Assets**:
   - **Store Icon**: Upload `icons/icon128.png` (128×128).
   - **Screenshots**: Upload all 4 screenshots from `docs/store/screenshots/`:
     1. `screenshot1_pieces_themes_1280x800.png`
     2. `screenshot2_silhouette_studio_1280x800.png`
     3. `screenshot3_comedy_mode_1280x800.png`
     4. `screenshot4_custom_sounds_1280x800.png`
   - **Small Promo Tile**: Upload `docs/store/screenshots/promo_tile_440x280.png` (440×280).

5. **Fill in Privacy Practices Tab**:
   - **Single Purpose**: `A cosmetic-only customizer providing custom themes, molded piece shapes, funny sound effects, and animations for Chess.com.`
   - **Permission Justifications** (copy from [`docs/store/privacy-policy.md`](privacy-policy.md)):
     - `storage`: `Required to save user preferences, selected board themes, comedy toggles, custom piece cutouts, and sound assignments locally on the device.`
     - `unlimitedStorage`: `Required to store user-uploaded custom piece images and high-fidelity compressed sound clips locally without hitting the default 5MB quota.`
   - **Host Permissions (`chess.com`)**: `Required to detect board elements on Chess.com pages in order to apply cosmetic styles, piece replacements, and visual/audio reactions.`
   - **Data Usage Questions**: Check **"No, I do not collect or use user data"** (PawnHub collects zero data).
   - **Privacy Policy URL**: Link to your hosted privacy policy (e.g. `https://pawnhub.vercel.app/privacy.html` once deployed, or your GitHub raw URL `https://github.com/harsh/pawnhub/blob/main/docs/store/privacy-policy.md`).

6. **Submit for Review**:
   - Review all fields.
   - Click **Submit for review**.
   - Review typically takes 24–48 hours.
