# PawnHub Complete Interactive Controls Checklist (QA Inventory)

This checklist catalogs every interactive control across the PawnHub extension, detailing its location, purpose, handling function, affected `chrome.storage.local` key, and implementation status.

---

## 1. Popup (`popup/popup.html` & `popup/popup.js`)

| # | Control Description | Location | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|----------|-----------------------|-------------------|------------------|---------------------|----------------|
| 1 | **Open Full Tab** | Header | `#open-tab-btn` | Opens the full Options page in a new browser tab | `openFullOptions` | *None (Navigation)* | Active |
| 2 | **Piece Set & Board Theme** | Section 1 | `#theme-select` | Selects one of 5 premium piece sets or 12 classic board themes | `themeSelect.change` | `pawnhub_theme` | Active |
| 3 | **Comedy Mode Master Toggle** | Section 2 | `#comedy-enabled-toggle` | Toggles all comedy features on or off | `comedyEnabledToggle.change` | `comedy_enabled` | Active |
| 4 | **Funny Toast Jokes Toggle** | Section 2 | `#comedy-jokes-toggle` | Toggles speech-bubble joke commentary banners | `comedyJokesToggle.change` | `comedy_jokes` | Active |
| 5 | **Joke Size Slider** | Section 2 | `#joke-size-slider` | Sets font size of joke bubbles (24px - 42px) | `jokeSizeSlider.input` | `joke_size` | Active |
| 6 | **Joke Duration Slider** | Section 2 | `#joke-duration-slider` | Sets on-screen display duration of joke banners (2.0s - 6.0s) | `jokeDurationSlider.input` | `joke_duration` | Active |
| 7 | **Visual Reactions Toggle** | Section 2 | `#comedy-effects-toggle` | Toggles piece animations (RIP tombstones, bonk, shake, etc.) | `comedyEffectsToggle.change` | `comedy_effects` | Active |
| 8 | **Sound FX Toggle** | Section 2 | `#comedy-sounds-toggle` | Toggles synthesized comedy sound effects | `comedySoundsToggle.change` | `comedy_sounds` | Active |
| 9 | **Volume Slider** | Section 2 | `#comedy-volume-slider` | Sets audio output volume (0% - 100%) | `comedyVolumeSlider.input` | `comedy_volume` | Active |
| 10 | **Reset All Pieces Button** | Section 3 | `#reset-all-pieces-btn` | Clears all custom piece photo overrides | `resetAllBtn.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 11 | **Upload Custom Images (Full Tab)** | Section 3 | `#open-options-action-btn` | Prominently navigates to options page Studio for Linux upload stability | `openFullOptions` | *None (Navigation)* | Active |
| 12 | **Side Tab Switcher (White)** | Section 3 | `.tab-btn[data-tab="white"]` | Shows White pieces grid in popup | `setupTabs` | *None (UI State)* | Active |
| 13 | **Side Tab Switcher (Black)** | Section 3 | `.tab-btn[data-tab="black"]` | Shows Black pieces grid in popup | `setupTabs` | *None (UI State)* | Active |
| 14-25 | **Piece File Inputs (12 slots)** | Section 3 | `#file-wp`, `#file-wn`, `#file-wb`, `#file-wr`, `#file-wq`, `#file-wk`, `#file-bp`, `#file-bn`, `#file-bb`, `#file-br`, `#file-bq`, `#file-bk` | Uploads raw image file for specific piece | `handleImageUpload` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 26-37 | **Piece Clear Buttons (12 slots)** | Section 3 | `#clear-wp`, `#clear-wn`, `#clear-wb`, `#clear-wr`, `#clear-wq`, `#clear-wk`, `#clear-bp`, `#clear-bn`, `#clear-bb`, `#clear-br`, `#clear-bq`, `#clear-bk` | Clears individual piece upload | `handleClearPiece` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |

---

## 2. Options Page: Section 1 — Interactive Test Lab (`options/options.html` & `options/options.js`)

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 38 | **Play Random Combo** | `#test-random-combo-btn` | Randomly triggers one animation sequence with sound | `randomComboBtn.click` | *None (Audition)* | Active |
| 39-50 | **Animation Sequence Buttons (12 buttons)** | `.test-btn[data-effect="..."]` | Auditions visual effect animation on screen | `setupTestLab` | *None (Audition)* | Active |
| | - 💥 Ram & Launch | `[data-effect="bonk"]` | Plays Bonk & Fly capture | `playCapture` | *None* | Active |
| | - 🥋 Karate Chop | `[data-effect="karate"]` | Plays Karate Chop capture | `playCapture` | *None* | Active |
| | - 💣 Cannon Shot | `[data-effect="cannon"]` | Plays Cannon Shot capture | `playCapture` | *None* | Active |
| | - 🍌 Banana Slip | `[data-effect="slip"]` | Plays Banana Slip capture | `playCapture` | *None* | Active |
| | - 🤼 Sumo Shove | `[data-effect="sumo"]` | Plays Sumo Shove capture | `playCapture` | *None* | Active |
| | - 🌀 Vacuum Suck | `[data-effect="vacuum"]` | Plays Vacuum Suck capture | `playCapture` | *None* | Active |
| | - 👑 Queen Blast | `[data-effect="queen"]` | Plays Queen Capture sequence | `playCapture` | *None* | Active |
| | - ⚠️ Check Panic | `[data-effect="check"]` | Plays Check effect & alarm | `playCheck` | *None* | Active |
| | - 🏆 Victory Confetti | `[data-effect="checkmate"]` | Plays Confetti & fanfare | `playCheckmate` | *None* | Active |
| | - 🏰 Castling Swap | `[data-effect="castle"]` | Plays Castling swap effect | `playCastling` | *None* | Active |
| | - ⭐ Promotion Crown | `[data-effect="promotion"]` | Plays Promotion effect & level up | `playPromotion` | *None* | Active |
| | - 💬 Joke Speech Bubble | `[data-effect="joke"]` | Shows centered joke bubble | `showJoke` | *None* | Active |
| 51-69 | **Synthesized Sound FX Buttons (19 buttons)** | `.test-sound-btn[data-sound="..."]` | Auditions Web Audio sound effect | `setupTestLab` | *None (Audition)* | Active |
| | (bonk, pow, kaboom, splat, whoosh, boing, pop, laser_zap, slide_whistle, fanfare, sad_trombone, party_horn, drumroll, applause, ding, glitch, alarm, drip, victory) | `data-sound="<name>"` | Plays sound in speakers | `PawnHubAudio.play` | *None* | Active |

---

## 3. Options Page: Section 2 — Piece Set & Board Theme

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 70 | **Theme & Set Dropdown** | `#theme-select` | Selects active board theme / premium SVG piece set | `themeSelect.change` | `pawnhub_theme` | Active |

---

## 4. Options Page: Section 3 — Molded Silhouette Studio

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 71 | **Interactive Canvas Viewport** | `#crop-canvas` | Click-and-drag or touch-and-drag to position photo within silhouette | `setupStudioInteractions` | *None (UI State)* | Active |
| 72 | **Zoom Slider** | `#crop-zoom` | Zooms photo from 50% to 300% | `cropZoomSlider.input` | *None (UI State)* | Active |
| 73 | **Center Photo Button** | `#btn-reset-crop` | Resets zoom to 100% and centers image | `btnResetCrop.click` | *None (UI State)* | Active |
| 74 | **Target Piece Dropdown** | `#studio-piece-select` | Selects which of the 12 pieces to edit in the studio | `studioPieceSelect.change` | *None (UI State)* | Active |
| 75-77 | **Shape Masking Mode Radios** | `input[name="shape-mode"]` | Selects "silhouette", "badge", or "original" | `shapeModeRadios.change` | *None (UI State)* | Active |
| 78 | **Choose Image File Input** | `#studio-file-input` | Opens file picker to select a raw photo | `studioFileInput.change` | *None (Loads to canvas)* | Active |
| 79 | **Save This Piece Button** | `#btn-save-piece` | Renders 256x256 masked PNG and saves to storage | `btnSavePiece.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 80 | **Apply to All White Pieces** | `#btn-apply-all-white` | Applies current photo framing to all 6 White pieces | `btnApplyAllWhite.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 81 | **Apply to All Black Pieces** | `#btn-apply-all-black` | Applies current photo framing to all 6 Black pieces | `btnApplyAllBlack.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 82 | **Reset All Custom Uploads** | `#reset-all-pieces-btn` | Clears all custom pieces and raw upload archives | `resetAllBtn.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |
| 83 | **Side Tab Switcher (White)** | `.tab-btn[data-tab="white"]` | Shows White pieces grid in overview | `setupTabs` | *None (UI State)* | Active |
| 84 | **Side Tab Switcher (Black)** | `.tab-btn[data-tab="black"]` | Shows Black pieces grid in overview | `setupTabs` | *None (UI State)* | Active |
| 85-96 | **Piece File Inputs (12 slots)** | `#file-wp` .. `#file-bk` | Uploads image directly to specific slot | `fileInput.change` | *None (Loads into studio)* | Active |
| 97-108 | **Piece Clear Buttons (12 slots)** | `#clear-wp` .. `#clear-bk` | Clears custom photo for that slot | `clearBtn.click` | `pawnhub_pieces`, `pawnhub_raw_uploads` | Active |

---

## 5. Options Page: Section 4 — Comedy Mode Settings

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 109 | **Comedy Mode Master Toggle** | `#comedy-enabled-toggle` | Toggles all comedy features on or off | `comedyEnabledToggle.change` | `comedy_enabled` | Active |
| 110 | **Funny Toast Jokes Toggle** | `#comedy-jokes-toggle` | Toggles speech-bubble joke commentary | `comedyJokesToggle.change` | `comedy_jokes` | Active |
| 111 | **Joke Size Slider** | `#joke-size-slider` | Sets font size of joke bubbles (24px - 42px) | `jokeSizeSlider.input` | `joke_size` | Added in QA Pass |
| 112 | **Joke Duration Slider** | `#joke-duration-slider` | Sets display duration of joke bubbles (2.0s - 6.0s) | `jokeDurationSlider.input` | `joke_duration` | Added in QA Pass |
| 113 | **Visual Reactions Toggle** | `#comedy-effects-toggle` | Toggles visual animations and reactions | `comedyEffectsToggle.change` | `comedy_effects` | Active |
| 114 | **Sound FX Toggle** | `#comedy-sounds-toggle` | Toggles synthesized sound effects | `comedySoundsToggle.change` | `comedy_sounds` | Active |
| 115 | **Volume Slider** | `#comedy-volume-slider` | Sets master comedy sound volume (0% - 100%) | `comedyVolumeSlider.input` | `comedy_volume` | Active |

---

## 6. Options Page: Section 5 — Custom Sound Packs

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 116 | **Custom Sounds Master Toggle** | `#custom-sounds-enabled-toggle` | Enables or disables all custom sound packs | `customSoundsEnabledToggle.change` | `pawnhub_custom_sounds.enabled` | Active |
| 117 | **Mute Chess.com Default Sounds** | `#mute-chesscom-toggle` | Mutes chess.com default audio when custom sounds are active | `muteChesscomToggle.change` | `pawnhub_custom_sounds.mute_chesscom` | Active |
| 118 | **Export Soundpack Button** | `#btn-export-sounds` | Opens the copyright disclaimer modal | `btnExportSounds.click` | *None (Opens Modal)* | Active |
| 119 | **Import Soundpack File Picker** | `#soundpack-file-input` | Selects a `.json` soundpack file to import | `soundpackFileInput.change` | `pawnhub_custom_sounds` | Active |
| 120 | **Reset All Custom Sounds Button** | `#btn-reset-sounds` | Clears all custom sounds across all 12 slots | `btnResetSounds.click` | `pawnhub_custom_sounds` | Active |
| 121-132 | **Event Slot On/Off Toggles (12 slots)** | `.slot-toggle[data-slot="..."]` | Enables or disables custom sound for this specific event slot | `toggle.change` | `pawnhub_custom_sounds.slots.<id>.enabled` | Active |
| 133-144 | **Event Slot Drop Zones / File Pickers (12 slots)** | `.slot-file-input[data-slot="..."]` | Triggers file picker for audio/video upload to slot | `fileInput.change` & drag-and-drop | *None (Opens Trimmer Modal)* | Active |
| 145+ | **Per-Sound Preview Play Buttons** | `.btn-play-sound` | Plays the custom sound through Web Audio API | `playBtn.click` | *None (Audition)* | Active |
| 146+ | **Per-Sound Volume Sliders** | `.sound-vol-slider` | Adjusts volume multiplier (0% - 150%) for sound | `volSlider.change` | `pawnhub_custom_sounds.slots.<id>.sounds[i].volume` | Active |
| 147+ | **Per-Sound Delete Buttons** | `.btn-delete-sound` | Removes individual sound from the event slot | `deleteBtn.click` | `pawnhub_custom_sounds.slots.<id>.sounds` | Active |

---

## 7. Modals

| # | Control Description | Element ID / Selector | Expected Behavior | Handler Function | Storage Key Changed | Status / Notes |
|---|---------------------|-----------------------|-------------------|------------------|---------------------|----------------|
| 148 | **Close Trimmer Modal Button** | `#btn-close-trimmer` | Closes trimmer modal and stops preview | `closeModal` | *None* | Active |
| 149 | **Cancel Trimmer Modal Button** | `#btn-trim-cancel` | Closes trimmer modal and discards changes | `closeModal` | *None* | Active |
| 150 | **Interactive Waveform Canvas** | `#trim-waveform-canvas` | Drag left/right handles to adjust start/end trim | `setupTrimmerModal` canvas drag | *None (UI State)* | Active |
| 151 | **Play Trim Preview** | `#btn-trim-play` | Plays selected audio slice | `playTrimPreview` | *None (Audition)* | Active |
| 152 | **Stop Trim Preview** | `#btn-trim-stop` | Stops audio playback | `stopTrimPreview` | *None* | Active |
| 153 | **Anti-Click Fade Toggle** | `#trim-fade-toggle` | Toggles 40ms linear fade in/out | `trimFadeToggle.change` | *None (Read on save)* | Active |
| 154 | **Trim Volume Slider** | `#trim-volume-slider` | Sets volume multiplier (20% - 200%) for clip | `trimVolumeSlider.input` | *None (Read on save)* | Active |
| 155 | **Compress & Save to Slot Button** | `#btn-trim-save` | Encodes mono 22.05 kHz WAV and saves to slot | `btnTrimSave.click` | `pawnhub_custom_sounds` | Active |
| 156 | **Close Copyright Disclaimer Button** | `#btn-close-export-disclaimer`| Closes export modal without downloading | `click` | *None* | Active |
| 157 | **Cancel Export Button** | `#btn-cancel-export` | Closes export modal without downloading | `click` | *None* | Active |
| 158 | **Confirm Export Button** | `#btn-confirm-export` | Downloads `.json` soundpack file and closes modal | `btnConfirmExport.click` | *None (File Download)* | Active |

---

## 8. Dead Button & Anomaly Findings During Inventory
1. **Missing ID on Import Label**: In `options/options.html`, the import button was defined as `<label class="btn-subtle">` wrapping `#soundpack-file-input`, but lacked `id="btn-import-sounds"`.
2. **Missing Joke Sliders in Options**: `joke-size-slider` and `joke-duration-slider` existed in `popup/popup.html` and were consumed by `content/content.js`, but were omitted from `options/options.html`.
3. **No Unhandled Dead Buttons**: All 158 controls have active, bound event handlers.
