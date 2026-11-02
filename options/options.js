// ==========================================================================
// PawnHub - Options Page Controller (Full Tab, Studio, Sounds & Test Lab)
// ==========================================================================
// Manages:
// 1. Molded Silhouette Studio (drag, pan, zoom, side-outlines, badges)
// 2. Custom Sounds & Audio/Video Trimmer Studio (12 events, video extraction, WAV mono 22kHz compression)
// 3. Storage Quota Monitoring & Non-destructive Archiving
// 4. Batch Operations & Soundpack Export/Import with Copyright Guard
// 5. Test Lab (Audition animations & synthesized audio)
// 6. Piece Sets, Themes, and Comedy Mode configuration

const PIECE_DEFINITIONS = {
  white: [
    { key: "wp", name: "Pawn", symbol: "♙", type: "p" },
    { key: "wn", name: "Knight", symbol: "♘", type: "n" },
    { key: "wb", name: "Bishop", symbol: "♗", type: "b" },
    { key: "wr", name: "Rook", symbol: "♖", type: "r" },
    { key: "wq", name: "Queen", symbol: "♕", type: "q" },
    { key: "wk", name: "King", symbol: "♔", type: "k" }
  ],
  black: [
    { key: "bp", name: "Pawn", symbol: "♟", type: "p" },
    { key: "bn", name: "Knight", symbol: "♞", type: "n" },
    { key: "bb", name: "Bishop", symbol: "♝", type: "b" },
    { key: "br", name: "Rook", symbol: "♜", type: "r" },
    { key: "bq", name: "Queen", symbol: "♛", type: "q" },
    { key: "bk", name: "King", symbol: "♚", type: "k" }
  ]
};

// 12 In-Game Event Slots for Custom Soundpacks
const CUSTOM_SOUND_EVENTS = [
  { id: "move_mine", name: "Regular Move (Mine)", icon: "♟️", desc: "Played when you make a non-capturing move" },
  { id: "move_opponent", name: "Regular Move (Opponent)", icon: "♟️", desc: "Played when your opponent makes a non-capturing move" },
  { id: "capture_mine", name: "Capture (By Me)", icon: "⚔️", desc: "Played when you capture an opponent's piece" },
  { id: "capture_opponent", name: "Capture (By Opponent)", icon: "💥", desc: "Played when opponent captures your piece" },
  { id: "queen_capture", name: "Queen Captured", icon: "👑", desc: "Played when either Queen is captured" },
  { id: "check", name: "Check", icon: "⚠️", desc: "Played when either King is put in check" },
  { id: "castle", name: "Castling", icon: "🏰", desc: "Played on king-side or queen-side castling" },
  { id: "promotion", name: "Promotion", icon: "⭐", desc: "Played when a pawn reaches the 8th rank" },
  { id: "win", name: "Checkmate / I Win", icon: "🏆", desc: "Played when you deliver checkmate or win" },
  { id: "lose", name: "I Lose", icon: "💀", desc: "Played when you get checkmated or lose" },
  { id: "draw", name: "Draw", icon: "🤝", desc: "Played on stalemate, repetition, or draw agreement" },
  { id: "game_start", name: "Game Start", icon: "🏁", desc: "Played when a new game begins (32 pieces on board)" }
];

// Global State
let currentTheme = "default";
let currentPieces = {}; // pieceKey -> rendered 256x256 PNG data URL
let currentRawUploads = {}; // pieceKey -> { dataUrl, zoom, offsetX, offsetY, mode }

let comedySettings = {
  comedy_enabled: true,
  comedy_jokes: false,
  comedy_effects: true,
  comedy_sounds: true,
  comedy_volume: 80,
  joke_size: "30px",
  joke_duration: 3800
};

// Custom Sounds State
let customSoundsData = {
  enabled: true,
  mute_chesscom: false,
  slots: {
    move_mine: { enabled: true, sounds: [] },
    move_opponent: { enabled: true, sounds: [] },
    capture_mine: { enabled: true, sounds: [] },
    capture_opponent: { enabled: true, sounds: [] },
    queen_capture: { enabled: true, sounds: [] },
    check: { enabled: true, sounds: [] },
    castle: { enabled: true, sounds: [] },
    promotion: { enabled: true, sounds: [] },
    win: { enabled: true, sounds: [] },
    lose: { enabled: true, sounds: [] },
    draw: { enabled: true, sounds: [] },
    game_start: { enabled: true, sounds: [] }
  }
};

// Studio State (Molded Silhouettes)
const studioState = {
  selectedPiece: "wp",
  shapeMode: "silhouette",
  zoom: 1.0,
  offsetX: 0,
  offsetY: 0,
  currentImage: null,
  currentRawDataUrl: null,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0
};

// Audio Trimmer Modal State
const trimmerState = {
  sourceBuffer: null,
  fileName: "",
  targetSlotKey: "",
  totalDuration: 0,
  startTime: 0,
  endTime: 2.5,
  fadeInOut: true,
  volumeMultiplier: 1.0,
  activePreviewSource: null,
  isDraggingHandle: null, // "start", "end", "range", or null
  dragStartMouseX: 0,
  dragInitialStartTime: 0,
  dragInitialEndTime: 0,
  peaks: []
};

// Safe storage helpers
function storageGet(keys, callback) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(keys, callback);
  } else if (callback) {
    callback({});
  }
}

function storageSet(items, callback) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set(items, callback);
  } else if (callback) {
    callback();
  }
}

let debounceStorageTimer = null;
let pendingStorageItems = {};
function debouncedStorageSet(items) {
  Object.assign(pendingStorageItems, items);
  clearTimeout(debounceStorageTimer);
  debounceStorageTimer = setTimeout(() => {
    const toSave = pendingStorageItems;
    pendingStorageItems = {};
    storageSet(toSave);
  }, 100);
}

// DOM References
const themeSelect = document.getElementById("theme-select");
const whiteList = document.getElementById("white-pieces-list");
const blackList = document.getElementById("black-pieces-list");
const resetAllBtn = document.getElementById("reset-all-pieces-btn");
const tabButtons = document.querySelectorAll(".tab-btn");

// Studio DOM References
const cropCanvas = document.getElementById("crop-canvas");
const cropZoomSlider = document.getElementById("crop-zoom");
const zoomValLabel = document.getElementById("zoom-val");
const btnResetCrop = document.getElementById("btn-reset-crop");
const studioPieceSelect = document.getElementById("studio-piece-select");
const shapeModeRadios = document.querySelectorAll('input[name="shape-mode"]');
const studioFileInput = document.getElementById("studio-file-input");
const btnSavePiece = document.getElementById("btn-save-piece");
const btnApplyAllWhite = document.getElementById("btn-apply-all-white");
const btnApplyAllBlack = document.getElementById("btn-apply-all-black");
const storageMbLabel = document.getElementById("storage-mb");
const storageWarning = document.getElementById("storage-warning");

// Custom Sounds DOM References
const soundSlotsGrid = document.getElementById("sound-slots-grid");
const customSoundsEnabledToggle = document.getElementById("custom-sounds-enabled-toggle");
const muteChesscomToggle = document.getElementById("mute-chesscom-toggle");
const btnExportSounds = document.getElementById("btn-export-sounds");
const btnImportSounds = document.getElementById("btn-import-sounds");
const soundpackFileInput = document.getElementById("soundpack-file-input");
const btnResetSounds = document.getElementById("btn-reset-sounds");

// Trimmer Modal DOM References
const audioTrimModal = document.getElementById("audio-trim-modal");
const trimWaveformCanvas = document.getElementById("trim-waveform-canvas");
const trimTargetEventLabel = document.getElementById("trim-target-event");
const trimStartTimeLabel = document.getElementById("trim-start-time");
const trimEndTimeLabel = document.getElementById("trim-end-time");
const trimDurationLabel = document.getElementById("trim-duration");
const trimEstSizeLabel = document.getElementById("trim-est-size");
const btnTrimPlay = document.getElementById("btn-trim-play");
const btnTrimStop = document.getElementById("btn-trim-stop");
const trimFadeToggle = document.getElementById("trim-fade-toggle");
const trimVolumeSlider = document.getElementById("trim-volume-slider");
const trimVolumeValLabel = document.getElementById("trim-volume-val");
const btnTrimSave = document.getElementById("btn-trim-save");
const btnTrimCancel = document.getElementById("btn-trim-cancel");
const btnCloseTrimmer = document.getElementById("btn-close-trimmer");

// Export Disclaimer Modal DOM References
const exportDisclaimerModal = document.getElementById("export-disclaimer-modal");
const btnCloseExportDisclaimer = document.getElementById("btn-close-export-disclaimer");
const btnCancelExport = document.getElementById("btn-cancel-export");
const btnConfirmExport = document.getElementById("btn-confirm-export");

// Comedy DOM References
const comedyEnabledToggle = document.getElementById("comedy-enabled-toggle");
const comedyJokesToggle = document.getElementById("comedy-jokes-toggle");
const jokeSizeSlider = document.getElementById("joke-size-slider");
const jokeSizeLabel = document.getElementById("joke-size-label");
const jokeDurationSlider = document.getElementById("joke-duration-slider");
const jokeDurationLabel = document.getElementById("joke-duration-label");
const comedyEffectsToggle = document.getElementById("comedy-effects-toggle");
const comedySoundsToggle = document.getElementById("comedy-sounds-toggle");
const comedyVolumeSlider = document.getElementById("comedy-volume-slider");
const volumeLabel = document.getElementById("volume-label");
const comedySubOptions = document.getElementById("comedy-sub-options");
const randomComboBtn = document.getElementById("test-random-combo-btn");

// ==========================================================================
// 1. Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderPieceRows("white", whiteList);
  renderPieceRows("black", blackList);
  setupTabs();
  setupStudioInteractions();
  setupCustomSounds();
  setupTrimmerModal();
  loadSavedSettings();
  setupEventListeners();
  setupTestLab();
});

// ==========================================================================
// 2. Molded Silhouette Studio Engine
// ==========================================================================
function setupStudioInteractions() {
  if (!cropCanvas) return;
  redrawStudioCanvas();

  cropCanvas.addEventListener("mousedown", (e) => {
    studioState.isDragging = true;
    studioState.dragStartX = e.clientX - studioState.offsetX;
    studioState.dragStartY = e.clientY - studioState.offsetY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!studioState.isDragging) return;
    studioState.offsetX = e.clientX - studioState.dragStartX;
    studioState.offsetY = e.clientY - studioState.dragStartY;
    redrawStudioCanvas();
  });

  window.addEventListener("mouseup", () => {
    studioState.isDragging = false;
  });

  // Touch Support
  cropCanvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      studioState.isDragging = true;
      studioState.dragStartX = e.touches[0].clientX - studioState.offsetX;
      studioState.dragStartY = e.touches[0].clientY - studioState.offsetY;
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!studioState.isDragging || e.touches.length !== 1) return;
    studioState.offsetX = e.touches[0].clientX - studioState.dragStartX;
    studioState.offsetY = e.touches[0].clientY - studioState.dragStartY;
    redrawStudioCanvas();
  }, { passive: true });

  window.addEventListener("touchend", () => {
    studioState.isDragging = false;
  });

  if (cropZoomSlider) {
    cropZoomSlider.addEventListener("input", (e) => {
      const zoomPct = parseInt(e.target.value, 10);
      studioState.zoom = zoomPct / 100;
      if (zoomValLabel) zoomValLabel.textContent = `${zoomPct}%`;
      redrawStudioCanvas();
    });
  }

  if (btnResetCrop) {
    btnResetCrop.addEventListener("click", () => {
      studioState.offsetX = 0;
      studioState.offsetY = 0;
      studioState.zoom = 1.0;
      if (cropZoomSlider) cropZoomSlider.value = 100;
      if (zoomValLabel) zoomValLabel.textContent = "100%";
      redrawStudioCanvas();
    });
  }

  if (studioPieceSelect) {
    studioPieceSelect.addEventListener("change", (e) => {
      selectPieceInStudio(e.target.value);
    });
  }

  shapeModeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        studioState.shapeMode = e.target.value;
        redrawStudioCanvas();
      }
    });
  });

  if (studioFileInput) {
    studioFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const tempImg = new Image();
        tempImg.onload = () => {
          const downscaledDataUrl = downscaleImage(tempImg, 512);
          loadRawImageIntoStudio(downscaledDataUrl, {
            zoom: 1.0,
            offsetX: 0,
            offsetY: 0
          });
        };
        tempImg.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnSavePiece) {
    btnSavePiece.addEventListener("click", () => {
      saveCurrentStudioPiece();
    });
  }

  if (btnApplyAllWhite) {
    btnApplyAllWhite.addEventListener("click", () => {
      applyCurrentStudioPhotoToSide(true);
    });
  }

  if (btnApplyAllBlack) {
    btnApplyAllBlack.addEventListener("click", () => {
      applyCurrentStudioPhotoToSide(false);
    });
  }
}

function redrawStudioCanvas() {
  if (!cropCanvas || !window.PawnHubMasking) return;

  const pieceKey = studioState.selectedPiece;
  const isWhite = pieceKey.startsWith("w");
  const pieceType = pieceKey[1];

  window.PawnHubMasking.renderPiece({
    imageEl: studioState.currentImage,
    pieceType: pieceType,
    isWhite: isWhite,
    mode: studioState.shapeMode,
    zoom: studioState.zoom,
    offsetX: studioState.offsetX,
    offsetY: studioState.offsetY,
    canvasSize: 256,
    targetCanvas: cropCanvas
  });
}

function selectPieceInStudio(pieceKey) {
  studioState.selectedPiece = pieceKey;
  if (studioPieceSelect) studioPieceSelect.value = pieceKey;

  if (currentRawUploads[pieceKey]) {
    const rawData = currentRawUploads[pieceKey];
    loadRawImageIntoStudio(rawData.dataUrl, {
      zoom: rawData.zoom || 1.0,
      offsetX: rawData.offsetX || 0,
      offsetY: rawData.offsetY || 0,
      mode: rawData.mode || "silhouette"
    });
  } else if (currentPieces[pieceKey]) {
    loadRawImageIntoStudio(currentPieces[pieceKey], {
      zoom: 1.0,
      offsetX: 0,
      offsetY: 0,
      mode: "original"
    });
  } else {
    studioState.currentImage = null;
    studioState.currentRawDataUrl = null;
    redrawStudioCanvas();
  }
}

function loadRawImageIntoStudio(dataUrl, params = {}) {
  const img = new Image();
  img.onload = () => {
    studioState.currentImage = img;
    studioState.currentRawDataUrl = dataUrl;

    if (params.zoom !== undefined) studioState.zoom = params.zoom;
    if (params.offsetX !== undefined) studioState.offsetX = params.offsetX;
    if (params.offsetY !== undefined) studioState.offsetY = params.offsetY;

    if (params.mode !== undefined) {
      studioState.shapeMode = params.mode;
      const radio = document.querySelector(`input[name="shape-mode"][value="${params.mode}"]`);
      if (radio) radio.checked = true;
    }

    if (cropZoomSlider) cropZoomSlider.value = Math.round(studioState.zoom * 100);
    if (zoomValLabel) zoomValLabel.textContent = `${Math.round(studioState.zoom * 100)}%`;

    redrawStudioCanvas();
  };
  img.src = dataUrl;
}

function saveCurrentStudioPiece() {
  if (!studioState.currentImage || !studioState.currentRawDataUrl) {
    alert("Please select or upload a photo first!");
    return;
  }

  const pieceKey = studioState.selectedPiece;
  const isWhite = pieceKey.startsWith("w");
  const pieceType = pieceKey[1];

  const renderedPng = window.PawnHubMasking.renderPiece({
    imageEl: studioState.currentImage,
    pieceType: pieceType,
    isWhite: isWhite,
    mode: studioState.shapeMode,
    zoom: studioState.zoom,
    offsetX: studioState.offsetX,
    offsetY: studioState.offsetY,
    canvasSize: 256
  });

  currentPieces[pieceKey] = renderedPng;
  currentRawUploads[pieceKey] = {
    dataUrl: studioState.currentRawDataUrl,
    zoom: studioState.zoom,
    offsetX: studioState.offsetX,
    offsetY: studioState.offsetY,
    mode: studioState.shapeMode
  };

  storageSet({
    pawnhub_pieces: currentPieces,
    pawnhub_raw_uploads: currentRawUploads
  }, () => {
    updateAllPreviews();
    updateStorageStatus();
    flashButton(btnSavePiece, "Saved!");
  });
}

function applyCurrentStudioPhotoToSide(isWhite) {
  if (!studioState.currentImage || !studioState.currentRawDataUrl) {
    alert("Please upload a photo first to apply it to all pieces!");
    return;
  }

  const sidePrefix = isWhite ? "w" : "b";
  const piecesForSide = ["p", "n", "b", "r", "q", "k"];

  piecesForSide.forEach(pt => {
    const key = `${sidePrefix}${pt}`;
    const renderedPng = window.PawnHubMasking.renderPiece({
      imageEl: studioState.currentImage,
      pieceType: pt,
      isWhite: isWhite,
      mode: studioState.shapeMode,
      zoom: studioState.zoom,
      offsetX: studioState.offsetX,
      offsetY: studioState.offsetY,
      canvasSize: 256
    });

    currentPieces[key] = renderedPng;
    currentRawUploads[key] = {
      dataUrl: studioState.currentRawDataUrl,
      zoom: studioState.zoom,
      offsetX: studioState.offsetX,
      offsetY: studioState.offsetY,
      mode: studioState.shapeMode
    };
  });

  storageSet({
    pawnhub_pieces: currentPieces,
    pawnhub_raw_uploads: currentRawUploads
  }, () => {
    updateAllPreviews();
    updateStorageStatus();
    flashButton(isWhite ? btnApplyAllWhite : btnApplyAllBlack, "Applied to All!");
  });
}

function downscaleImage(img, maxSize = 512) {
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;

  if (w > maxSize || h > maxSize) {
    if (w > h) {
      h = Math.round((h * maxSize) / w);
      w = maxSize;
    } else {
      w = Math.round((w * maxSize) / h);
      h = maxSize;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/png");
}

function updateStorageStatus() {
  if (!window.PawnHubMasking || !window.PawnHubMasking.getStorageUsage) return;

  window.PawnHubMasking.getStorageUsage((info) => {
    if (storageMbLabel) storageMbLabel.textContent = `${info.mb} MB`;
    if (storageWarning) {
      storageWarning.style.display = info.isCloseToQuota ? "block" : "none";
    }
  });
}

function flashButton(btn, text) {
  if (!btn) return;
  const oldText = btn.textContent;
  btn.textContent = `✓ ${text}`;
  btn.style.opacity = "0.85";
  setTimeout(() => {
    btn.textContent = oldText;
    btn.style.opacity = "1";
  }, 1200);
}

// ==========================================================================
// 3. Custom Sounds & Audio/Video Trimmer Engine
// ==========================================================================
function setupCustomSounds() {
  renderSoundSlots();

  if (customSoundsEnabledToggle) {
    customSoundsEnabledToggle.addEventListener("change", (e) => {
      customSoundsData.enabled = e.target.checked;
      storageSet({ pawnhub_custom_sounds: customSoundsData });
      renderSoundSlots();
    });
  }

  if (muteChesscomToggle) {
    muteChesscomToggle.addEventListener("change", (e) => {
      customSoundsData.mute_chesscom = e.target.checked;
      storageSet({ pawnhub_custom_sounds: customSoundsData });
    });
  }

  if (btnExportSounds) {
    btnExportSounds.addEventListener("click", () => {
      if (exportDisclaimerModal) exportDisclaimerModal.style.display = "flex";
    });
  }

  if (btnConfirmExport) {
    btnConfirmExport.addEventListener("click", () => {
      const jsonStr = JSON.stringify(customSoundsData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pawnhub_custom_soundpack.json";
      a.click();
      URL.revokeObjectURL(url);
      if (exportDisclaimerModal) exportDisclaimerModal.style.display = "none";
    });
  }

  if (btnCancelExport) {
    btnCancelExport.addEventListener("click", () => {
      if (exportDisclaimerModal) exportDisclaimerModal.style.display = "none";
    });
  }

  if (btnCloseExportDisclaimer) {
    btnCloseExportDisclaimer.addEventListener("click", () => {
      if (exportDisclaimerModal) exportDisclaimerModal.style.display = "none";
    });
  }

  if (soundpackFileInput) {
    soundpackFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          customSoundsData = validateAndSanitizeSoundpack(parsed);
          storageSet({ pawnhub_custom_sounds: customSoundsData }, () => {
            renderSoundSlots();
            if (customSoundsEnabledToggle) customSoundsEnabledToggle.checked = customSoundsData.enabled !== false;
            if (muteChesscomToggle) muteChesscomToggle.checked = !!customSoundsData.mute_chesscom;
            updateStorageStatus();
            alert("Soundpack imported and validated successfully!");
          });
        } catch (err) {
          alert("Could not import soundpack: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

function validateAndSanitizeSoundpack(raw) {
  if (!raw || typeof raw !== "object" || !raw.slots || typeof raw.slots !== "object") {
    throw new Error("Invalid soundpack format. Missing valid slots object.");
  }

  const validEvents = new Set(CUSTOM_SOUND_EVENTS.map(e => e.id));
  const sanitized = {
    enabled: raw.enabled !== false,
    mute_chesscom: !!raw.mute_chesscom,
    slots: {}
  };

  CUSTOM_SOUND_EVENTS.forEach(ev => {
    sanitized.slots[ev.id] = { enabled: true, sounds: [] };
  });

  for (const [slotKey, slotData] of Object.entries(raw.slots)) {
    if (!validEvents.has(slotKey) || !slotData || typeof slotData !== "object") continue;

    sanitized.slots[slotKey].enabled = slotData.enabled !== false;
    if (Array.isArray(slotData.sounds)) {
      sanitized.slots[slotKey].sounds = slotData.sounds
        .filter(s => s && typeof s === "object" && typeof s.dataUrl === "string" && s.dataUrl.startsWith("data:audio/"))
        .map(s => ({
          id: String(s.id || ("snd_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6))),
          name: String(s.name || "Custom Sound").slice(0, 100),
          dataUrl: s.dataUrl,
          volume: typeof s.volume === "number" ? Math.max(0, Math.min(2.0, s.volume)) : 1.0,
          duration: typeof s.duration === "number" ? Math.max(0.1, Math.min(10.0, s.duration)) : 1.0,
          sizeKb: typeof s.sizeKb === "number" ? Math.max(0, s.sizeKb) : Math.round(s.dataUrl.length * 0.75 / 1024)
        }));
    }
  }

  return sanitized;
}

  if (btnResetSounds) {
    btnResetSounds.addEventListener("click", () => {
      if (!confirm("Are you sure you want to reset all custom sounds? All slots will revert to default synthesized sounds.")) return;
      CUSTOM_SOUND_EVENTS.forEach(ev => {
        if (customSoundsData.slots[ev.id]) {
          customSoundsData.slots[ev.id].sounds = [];
        }
      });
      storageSet({ pawnhub_custom_sounds: customSoundsData }, () => {
        renderSoundSlots();
        updateStorageStatus();
      });
    });
  }
}

// Renders the 12 Event Cards in Section 4
function renderSoundSlots() {
  if (!soundSlotsGrid) return;
  soundSlotsGrid.innerHTML = "";

  CUSTOM_SOUND_EVENTS.forEach(ev => {
    const slot = customSoundsData.slots[ev.id] || { enabled: true, sounds: [] };
    const card = document.createElement("div");
    card.className = `sound-slot-card ${slot.enabled ? "" : "disabled"}`;
    card.id = `slot-card-${ev.id}`;

    // Header
    const header = document.createElement("div");
    header.className = "slot-header";
    header.innerHTML = `
      <div class="slot-title-group">
        <span class="slot-icon">${ev.icon}</span>
        <div>
          <div class="slot-name">${ev.name}</div>
          <div class="sound-item-meta">${ev.desc}</div>
        </div>
      </div>
      <label class="toggle-switch small">
        <input type="checkbox" class="slot-toggle" data-slot="${ev.id}" ${slot.enabled ? "checked" : ""}>
        <span class="slider"></span>
      </label>
    `;
    card.appendChild(header);

    // Drop Zone / File Picker
    const dropZone = document.createElement("div");
    dropZone.className = "sound-drop-zone";
    dropZone.innerHTML = `
      <span>➕ Drop audio / video or click to upload</span>
      <input type="file" class="slot-file-input" data-slot="${ev.id}" accept="audio/*,video/*,.mp3,.wav,.ogg,.m4a,.webm,.mp4,.mkv,.mov" style="display: none;">
    `;
    card.appendChild(dropZone);

    const fileInput = dropZone.querySelector(".slot-file-input");
    dropZone.addEventListener("click", () => fileInput.click());

    // Drag and Drop
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("dragover");
    });
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleSoundFileInput(e.dataTransfer.files[0], ev.id);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleSoundFileInput(e.target.files[0], ev.id);
      }
    });

    // Slot on/off toggle listener
    const toggle = header.querySelector(".slot-toggle");
    toggle.addEventListener("change", (e) => {
      slot.enabled = e.target.checked;
      customSoundsData.slots[ev.id] = slot;
      card.classList.toggle("disabled", !slot.enabled);
      storageSet({ pawnhub_custom_sounds: customSoundsData });
    });

    // Sound List
    const soundList = document.createElement("div");
    soundList.className = "sound-list";

    if (!slot.sounds || slot.sounds.length === 0) {
      soundList.innerHTML = `<div class="no-sounds-hint">No custom sounds added (plays default sound).</div>`;
    } else {
      slot.sounds.forEach((sound, idx) => {
        const itemRow = document.createElement("div");
        itemRow.className = "sound-item-row";
        itemRow.innerHTML = `
          <div class="sound-item-info">
            <span class="sound-item-name">🎵 ${escapeHtml(sound.name)}</span>
            <span class="sound-item-meta">${sound.duration.toFixed(1)}s • ${sound.sizeKb || Math.round(sound.dataUrl.length * 0.75 / 1024)} KB</span>
          </div>
          <div class="sound-item-controls">
            <button class="btn-icon-play btn-play-sound" title="Preview Sound">▶</button>
            <input type="range" class="sound-vol-slider" min="0" max="150" value="${Math.round((sound.volume || 1.0) * 100)}" title="Volume: ${Math.round((sound.volume || 1.0) * 100)}%">
            <button class="btn-clear visible btn-delete-sound" title="Delete Sound">✕</button>
          </div>
        `;

        const playBtn = itemRow.querySelector(".btn-play-sound");
        playBtn.addEventListener("click", () => {
          if (window.PawnHubAudio) {
            window.PawnHubAudio.init();
            window.PawnHubAudio.playCustomSound(sound);
          }
        });

        const volSlider = itemRow.querySelector(".sound-vol-slider");
        volSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value, 10);
          sound.volume = val / 100;
          volSlider.title = `Volume: ${val}%`;
        });
        volSlider.addEventListener("change", () => {
          storageSet({ pawnhub_custom_sounds: customSoundsData });
        });

        const deleteBtn = itemRow.querySelector(".btn-delete-sound");
        deleteBtn.addEventListener("click", () => {
          slot.sounds.splice(idx, 1);
          storageSet({ pawnhub_custom_sounds: customSoundsData }, () => {
            renderSoundSlots();
            updateStorageStatus();
          });
        });

        soundList.appendChild(itemRow);
      });
    }

    card.appendChild(soundList);
    soundSlotsGrid.appendChild(card);
  });
}

// Ingestion Pipeline: Ingests Audio or Video -> Extracts AudioBuffer -> Opens Trimmer Modal
async function handleSoundFileInput(file, targetSlotKey) {
  if (!file) return;

  const eventDef = CUSTOM_SOUND_EVENTS.find(e => e.id === targetSlotKey);
  const eventName = eventDef ? eventDef.name : targetSlotKey;

  try {
    const audioCtx = (window.PawnHubAudio && window.PawnHubAudio.getAudioContext()) || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();

    let decodedBuffer = null;

    // Method A: ArrayBuffer -> decodeAudioData (handles MP3, WAV, OGG, M4A, and many MP4/WebM video files)
    try {
      const arrayBuf = await file.arrayBuffer();
      decodedBuffer = await audioCtx.decodeAudioData(arrayBuf.slice(0));
    } catch (err) {
      console.log("[PawnHub Audio] Direct decodeAudioData failed, trying HTML5 Video fallback:", err);
    }

    // Method B: Video captureStream fallback
    if (!decodedBuffer) {
      try {
        decodedBuffer = await extractViaVideoElement(file, audioCtx);
      } catch (videoErr) {
        console.warn("[PawnHub Audio] Video element extraction failed:", videoErr);
      }
    }

    if (!decodedBuffer) {
      alert(
        `Unable to decode audio track from '${file.name}'.\n\n` +
        `This browser on Linux may lack the codec for this specific video or audio format.\n\n` +
        `Tip: Please convert the file to standard MP3, WAV, or MP4 (AAC) before uploading.`
      );
      return;
    }

    // Open Waveform Trimmer Modal with decoded buffer
    openTrimmerModal({
      decodedBuffer,
      fileName: file.name,
      targetSlotKey,
      targetEventName: eventName
    });

  } catch (err) {
    alert("Error loading sound file: " + err.message);
  }
}

// Method B: Extracts audio from video files using hidden <video> + captureStream() + MediaRecorder
function extractViaVideoElement(file, ctx) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = false;
    video.volume = 1;
    video.style.display = "none";
    document.body.appendChild(video);

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    const cleanup = () => {
      video.pause();
      URL.revokeObjectURL(objectUrl);
      if (video.parentNode) video.parentNode.removeChild(video);
    };

    video.onloadedmetadata = () => {
      try {
        const stream = video.captureStream ? video.captureStream() : (video.mozCaptureStream ? video.mozCaptureStream() : null);
        if (!stream || stream.getAudioTracks().length === 0) {
          cleanup();
          reject(new Error("No audio track detected in video file."));
          return;
        }

        let mimeType = "audio/webm";
        if (!MediaRecorder.isTypeSupported("audio/webm")) mimeType = "";

        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = async () => {
          cleanup();
          try {
            const blob = new Blob(chunks, { type: chunks[0]?.type || "audio/webm" });
            const buf = await blob.arrayBuffer();
            const decoded = await ctx.decodeAudioData(buf);
            resolve(decoded);
          } catch (err) {
            reject(err);
          }
        };

        recorder.start();
        video.play().catch(pErr => {
          cleanup();
          reject(pErr);
        });

        // Record up to 25 seconds or when video finishes
        video.onended = () => {
          if (recorder.state === "recording") recorder.stop();
        };

        setTimeout(() => {
          if (recorder.state === "recording") {
            video.pause();
            recorder.stop();
          }
        }, 25000);

      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Video playback error."));
    };
  });
}

// ==========================================================================
// 4. Waveform Audio Trimmer Modal Controller
// ==========================================================================
function setupTrimmerModal() {
  if (!audioTrimModal || !trimWaveformCanvas) return;

  // Close / Cancel Handlers
  const closeModal = () => {
    stopTrimPreview();
    audioTrimModal.style.display = "none";
  };

  if (btnCloseTrimmer) btnCloseTrimmer.addEventListener("click", closeModal);
  if (btnTrimCancel) btnTrimCancel.addEventListener("click", closeModal);

  // Play Preview Button
  if (btnTrimPlay) {
    btnTrimPlay.addEventListener("click", () => {
      playTrimPreview();
    });
  }

  // Stop Preview Button
  if (btnTrimStop) {
    btnTrimStop.addEventListener("click", () => {
      stopTrimPreview();
    });
  }

  // Fade Toggle
  if (trimFadeToggle) {
    trimFadeToggle.addEventListener("change", (e) => {
      trimmerState.fadeInOut = e.target.checked;
    });
  }

  // Volume Slider
  if (trimVolumeSlider) {
    trimVolumeSlider.addEventListener("input", (e) => {
      const vol = parseInt(e.target.value, 10);
      trimmerState.volumeMultiplier = vol / 100;
      if (trimVolumeValLabel) trimVolumeValLabel.textContent = `${vol}%`;
    });
  }

  // Save Button: Render 16-bit mono 22.05 kHz WAV and store in slot
  if (btnTrimSave) {
    btnTrimSave.addEventListener("click", async () => {
      if (!trimmerState.sourceBuffer) return;
      stopTrimPreview();

      try {
        btnTrimSave.disabled = true;
        btnTrimSave.textContent = "Compressing...";

        const wavDataUrl = await renderTrimmedWav({
          sourceBuffer: trimmerState.sourceBuffer,
          startTime: trimmerState.startTime,
          endTime: trimmerState.endTime,
          volumeMultiplier: trimmerState.volumeMultiplier,
          fadeInOut: trimmerState.fadeInOut,
          targetSampleRate: 22050
        });

        const sizeKb = Math.round(wavDataUrl.length * 0.75 / 1024);
        const duration = Number((trimmerState.endTime - trimmerState.startTime).toFixed(2));

        const slot = customSoundsData.slots[trimmerState.targetSlotKey] || { enabled: true, sounds: [] };
        if (!slot.sounds) slot.sounds = [];

        slot.sounds.push({
          id: "snd_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
          name: trimmerState.fileName,
          dataUrl: wavDataUrl,
          volume: 1.0,
          duration: duration,
          sizeKb: sizeKb
        });

        customSoundsData.slots[trimmerState.targetSlotKey] = slot;

        storageSet({ pawnhub_custom_sounds: customSoundsData }, () => {
          renderSoundSlots();
          updateStorageStatus();
          closeModal();
          btnTrimSave.disabled = false;
          btnTrimSave.textContent = "💾 Compress & Save to Slot";
        });

      } catch (err) {
        alert("Error saving audio clip: " + err.message);
        btnTrimSave.disabled = false;
        btnTrimSave.textContent = "💾 Compress & Save to Slot";
      }
    });
  }

  // Waveform Dragging & Range Handles (Mouse & Touch)
  trimWaveformCanvas.addEventListener("mousedown", (e) => {
    handleWaveformPointerDown(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!trimmerState.isDraggingHandle) return;
    handleWaveformPointerMove(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    trimmerState.isDraggingHandle = null;
  });

  // Touch Support for Waveform
  trimWaveformCanvas.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      handleWaveformPointerDown(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (trimmerState.isDraggingHandle && e.touches && e.touches[0]) {
      handleWaveformPointerMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    trimmerState.isDraggingHandle = null;
  });
}

function openTrimmerModal({ decodedBuffer, fileName, targetSlotKey, targetEventName }) {
  trimmerState.sourceBuffer = decodedBuffer;
  trimmerState.fileName = fileName;
  trimmerState.targetSlotKey = targetSlotKey;
  trimmerState.totalDuration = decodedBuffer.duration;
  trimmerState.volumeMultiplier = 1.0;
  trimmerState.fadeInOut = true;

  // Default selection: If total duration <= 3.0s, select all. If > 3.0s, select first 3.0s (capped at 10s max)
  trimmerState.startTime = 0.0;
  trimmerState.endTime = Math.min(10.0, Math.min(decodedBuffer.duration, 3.0));

  if (trimTargetEventLabel) {
    trimTargetEventLabel.innerHTML = `Assigning sound to: <strong>${escapeHtml(targetEventName)}</strong> (${escapeHtml(fileName)})`;
  }

  if (trimFadeToggle) trimFadeToggle.checked = true;
  if (trimVolumeSlider) trimVolumeSlider.value = 100;
  if (trimVolumeValLabel) trimVolumeValLabel.textContent = "100%";

  // Calculate waveform peaks (300 bars)
  calculateWaveformPeaks(decodedBuffer, 300);

  updateTrimmerReadout();
  redrawWaveformCanvas();

  audioTrimModal.style.display = "flex";
}

// Calculates RMS amplitude peaks across N bars
function calculateWaveformPeaks(buffer, numBars = 300) {
  const channelData = buffer.getChannelData(0);
  const totalLength = channelData.length;
  const blockSize = Math.floor(totalLength / numBars);
  const peaks = [];

  for (let i = 0; i < numBars; i++) {
    const start = i * blockSize;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      const val = channelData[start + j] || 0;
      sum += val * val;
    }
    const rms = Math.sqrt(sum / blockSize);
    peaks.push(Math.min(1.0, rms * 2.5)); // Boost slightly for visual clarity
  }
  trimmerState.peaks = peaks;
}

function handleWaveformPointerDown(clientX) {
  const rect = trimWaveformCanvas.getBoundingClientRect();
  const clickX = clientX - rect.left;
  const clickTime = (clickX / rect.width) * trimmerState.totalDuration;

  const startX = (trimmerState.startTime / trimmerState.totalDuration) * rect.width;
  const endX = (trimmerState.endTime / trimmerState.totalDuration) * rect.width;

  const hitTolerance = 18; // pixels

  if (Math.abs(clickX - startX) <= hitTolerance) {
    trimmerState.isDraggingHandle = "start";
  } else if (Math.abs(clickX - endX) <= hitTolerance) {
    trimmerState.isDraggingHandle = "end";
  } else if (clickX > startX && clickX < endX) {
    trimmerState.isDraggingHandle = "range";
    trimmerState.dragStartMouseX = clientX;
    trimmerState.dragInitialStartTime = trimmerState.startTime;
    trimmerState.dragInitialEndTime = trimmerState.endTime;
  } else {
    // Jump nearest handle
    if (Math.abs(clickTime - trimmerState.startTime) < Math.abs(clickTime - trimmerState.endTime)) {
      trimmerState.startTime = Math.max(0, Math.min(clickTime, trimmerState.endTime - 0.1));
      trimmerState.isDraggingHandle = "start";
    } else {
      trimmerState.endTime = Math.min(trimmerState.totalDuration, Math.max(clickTime, trimmerState.startTime + 0.1));
      trimmerState.isDraggingHandle = "end";
    }
  }

  updateTrimmerReadout();
  redrawWaveformCanvas();
}

function handleWaveformPointerMove(clientX) {
  const rect = trimWaveformCanvas.getBoundingClientRect();
  const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
  const clickTime = (clickX / rect.width) * trimmerState.totalDuration;

  if (trimmerState.isDraggingHandle === "start") {
    let newStart = Math.max(0, Math.min(clickTime, trimmerState.endTime - 0.1));
    // Enforce 10s max duration limit
    if (trimmerState.endTime - newStart > 10.0) {
      newStart = trimmerState.endTime - 10.0;
    }
    trimmerState.startTime = newStart;
  } else if (trimmerState.isDraggingHandle === "end") {
    let newEnd = Math.min(trimmerState.totalDuration, Math.max(clickTime, trimmerState.startTime + 0.1));
    // Enforce 10s max duration limit
    if (newEnd - trimmerState.startTime > 10.0) {
      newEnd = trimmerState.startTime + 10.0;
    }
    trimmerState.endTime = newEnd;
  } else if (trimmerState.isDraggingHandle === "range") {
    const deltaSeconds = ((clientX - trimmerState.dragStartMouseX) / rect.width) * trimmerState.totalDuration;
    const dur = trimmerState.dragInitialEndTime - trimmerState.dragInitialStartTime;

    let newStart = trimmerState.dragInitialStartTime + deltaSeconds;
    let newEnd = trimmerState.dragInitialEndTime + deltaSeconds;

    if (newStart < 0) {
      newStart = 0;
      newEnd = dur;
    }
    if (newEnd > trimmerState.totalDuration) {
      newEnd = trimmerState.totalDuration;
      newStart = trimmerState.totalDuration - dur;
    }

    trimmerState.startTime = newStart;
    trimmerState.endTime = newEnd;
  }

  updateTrimmerReadout();
  redrawWaveformCanvas();
}

function updateTrimmerReadout() {
  const dur = trimmerState.endTime - trimmerState.startTime;
  if (trimStartTimeLabel) trimStartTimeLabel.textContent = `${trimmerState.startTime.toFixed(2)}s`;
  if (trimEndTimeLabel) trimEndTimeLabel.textContent = `${trimmerState.endTime.toFixed(2)}s`;
  if (trimDurationLabel) trimDurationLabel.textContent = `${dur.toFixed(2)}s`;
  // Estimated size for mono 22.05 kHz 16-bit WAV (44.1 KB/sec + 44 bytes header)
  if (trimEstSizeLabel) trimEstSizeLabel.textContent = `~${Math.round(dur * 44.1 + 0.1)} KB`;
}

function redrawWaveformCanvas() {
  if (!trimWaveformCanvas) return;
  const ctx = trimWaveformCanvas.getContext("2d");
  const w = trimWaveformCanvas.width;
  const h = trimWaveformCanvas.height;

  // Background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, w, h);

  // Center reference line
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Waveform bars
  const peaks = trimmerState.peaks;
  const numBars = peaks.length;
  const barWidth = w / numBars;

  const startX = (trimmerState.startTime / trimmerState.totalDuration) * w;
  const endX = (trimmerState.endTime / trimmerState.totalDuration) * w;

  for (let i = 0; i < numBars; i++) {
    const bx = i * barWidth;
    const peak = peaks[i];
    const barHeight = Math.max(3, peak * (h * 0.85));
    const by = (h - barHeight) / 2;

    const isInsideSelection = bx >= startX && bx <= endX;
    ctx.fillStyle = isInsideSelection ? "#38bdf8" : "#475569";
    ctx.fillRect(bx, by, Math.max(1, barWidth - 1), barHeight);
  }

  // Dim overlay outside selection
  ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
  ctx.fillRect(0, 0, startX, h);
  ctx.fillRect(endX, 0, w - endX, h);

  // Selection Glow Box
  ctx.fillStyle = "rgba(56, 189, 248, 0.08)";
  ctx.fillRect(startX, 0, endX - startX, h);

  // Start Handle
  ctx.fillStyle = "#10b981";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(startX, 0);
  ctx.lineTo(startX, h);
  ctx.stroke();

  // Start Handle Top Cap (triangle marker)
  ctx.beginPath();
  ctx.moveTo(startX - 8, 0);
  ctx.lineTo(startX + 8, 0);
  ctx.lineTo(startX, 14);
  ctx.closePath();
  ctx.fill();

  // End Handle
  ctx.fillStyle = "#f43f5e";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(endX, 0);
  ctx.lineTo(endX, h);
  ctx.stroke();

  // End Handle Top Cap (triangle marker)
  ctx.beginPath();
  ctx.moveTo(endX - 8, 0);
  ctx.lineTo(endX + 8, 0);
  ctx.lineTo(endX, 14);
  ctx.closePath();
  ctx.fill();
}

function playTrimPreview() {
  stopTrimPreview();
  if (!trimmerState.sourceBuffer) return;

  const audioCtx = (window.PawnHubAudio && window.PawnHubAudio.getAudioContext()) || new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();

  const source = audioCtx.createBufferSource();
  source.buffer = trimmerState.sourceBuffer;

  const gain = audioCtx.createGain();
  const vol = trimmerState.volumeMultiplier;
  const dur = trimmerState.endTime - trimmerState.startTime;

  if (trimmerState.fadeInOut) {
    const fadeDur = Math.min(0.04, dur * 0.2);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + fadeDur);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime + dur - fadeDur);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
  } else {
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  }

  source.connect(gain);
  gain.connect(audioCtx.destination);

  source.start(0, trimmerState.startTime, dur);
  trimmerState.activePreviewSource = source;

  source.onended = () => {
    trimmerState.activePreviewSource = null;
  };
}

function stopTrimPreview() {
  if (trimmerState.activePreviewSource) {
    try {
      trimmerState.activePreviewSource.stop();
    } catch (e) {}
    trimmerState.activePreviewSource = null;
  }
}

// Resamples, mixes down to mono 22.05 kHz, applies fade in/out and volume, and encodes to 16-bit PCM WAV
async function renderTrimmedWav({
  sourceBuffer,
  startTime,
  endTime,
  volumeMultiplier = 1.0,
  fadeInOut = true,
  targetSampleRate = 22050
}) {
  const duration = Math.max(0.1, Math.min(10.0, endTime - startTime));
  const numFrames = Math.ceil(duration * targetSampleRate);

  const offlineCtx = new OfflineAudioContext(1, numFrames, targetSampleRate);

  const sourceNode = offlineCtx.createBufferSource();
  sourceNode.buffer = sourceBuffer;

  const gainNode = offlineCtx.createGain();
  gainNode.gain.setValueAtTime(volumeMultiplier, 0);

  if (fadeInOut) {
    const fadeTime = Math.min(0.04, duration * 0.2);
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(volumeMultiplier, fadeTime);
    gainNode.gain.setValueAtTime(volumeMultiplier, Math.max(0, duration - fadeTime));
    gainNode.gain.linearRampToValueAtTime(0, duration);
  }

  sourceNode.connect(gainNode);
  gainNode.connect(offlineCtx.destination);

  sourceNode.start(0, startTime, duration);

  const renderedBuffer = await offlineCtx.startRendering();
  const monoChannel = renderedBuffer.getChannelData(0);

  return encodeWav(monoChannel, targetSampleRate);
}

// Encodes mono Float32Array PCM samples to 16-bit WAV base64 Data URL
function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF chunk descriptor
  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");

  // FMT sub-chunk
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // 16 bits per sample

  // DATA sub-chunk
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  // Write 16-bit PCM samples with clipping protection
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  // Convert buffer to base64 Data URL
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return "data:audio/wav;base64," + btoa(binary);
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[m]);
}

// ==========================================================================
// 5. Piece Rows & Previews Overview
// ==========================================================================
function renderPieceRows(colorKey, container) {
  container.innerHTML = "";
  PIECE_DEFINITIONS[colorKey].forEach(piece => {
    const row = document.createElement("div");
    row.className = "piece-row";
    row.id = `row-${piece.key}`;

    row.innerHTML = `
      <div class="piece-info">
        <span class="piece-symbol">${piece.symbol}</span>
        <span class="piece-name">${colorKey === "white" ? "White" : "Black"} ${piece.name}</span>
      </div>
      <div class="piece-actions">
        <div class="piece-preview" id="preview-${piece.key}"></div>
        <button class="btn-upload btn-studio-select" data-piece="${piece.key}">
          Frame in Studio
        </button>
        <button class="btn-clear" id="clear-${piece.key}" title="Reset to default">✕</button>
      </div>
    `;

    container.appendChild(row);

    const selectBtn = row.querySelector(".btn-studio-select");
    selectBtn.addEventListener("click", () => {
      selectPieceInStudio(piece.key);
      document.querySelector(".studio-card").scrollIntoView({ behavior: "smooth" });
    });

    const clearBtn = row.querySelector(`#clear-${piece.key}`);
    clearBtn.addEventListener("click", () => handleClearPiece(piece.key));
  });
}

function setupTabs() {
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = btn.dataset.tab;
      const targetContent = document.getElementById(`${targetTab}-pieces-list`);
      if (targetContent) targetContent.classList.add("active");
    });
  });
}

function updateAllPreviews() {
  [...PIECE_DEFINITIONS.white, ...PIECE_DEFINITIONS.black].forEach(p => {
    const preview = document.getElementById(`preview-${p.key}`);
    const clearBtn = document.getElementById(`clear-${p.key}`);
    if (!preview || !clearBtn) return;

    const dataUrl = currentPieces[p.key];
    if (dataUrl) {
      preview.style.backgroundImage = `url("${dataUrl}")`;
      preview.classList.add("has-image");
      clearBtn.classList.add("visible");
    } else {
      preview.style.backgroundImage = "none";
      preview.classList.remove("has-image");
      clearBtn.classList.remove("visible");
    }
  });
}

function handleClearPiece(pieceKey) {
  delete currentPieces[pieceKey];
  delete currentRawUploads[pieceKey];

  storageSet({
    pawnhub_pieces: currentPieces,
    pawnhub_raw_uploads: currentRawUploads
  }, () => {
    updateAllPreviews();
    updateStorageStatus();
    if (studioState.selectedPiece === pieceKey) {
      redrawStudioCanvas();
    }
  });
}

// ==========================================================================
// 6. Saved Settings Loader & Listener Setup
// ==========================================================================
function loadSavedSettings() {
  storageGet(null, (data) => {
    if (data.pawnhub_theme) {
      currentTheme = data.pawnhub_theme;
      if (themeSelect) themeSelect.value = currentTheme;
    }
    if (data.pawnhub_pieces) {
      currentPieces = data.pawnhub_pieces;
    }
    if (data.pawnhub_raw_uploads) {
      currentRawUploads = data.pawnhub_raw_uploads;
    }

    if (data.pawnhub_custom_sounds) {
      customSoundsData = {
        enabled: data.pawnhub_custom_sounds.enabled !== false,
        mute_chesscom: !!data.pawnhub_custom_sounds.mute_chesscom,
        slots: { ...customSoundsData.slots, ...(data.pawnhub_custom_sounds.slots || {}) }
      };
      if (customSoundsEnabledToggle) customSoundsEnabledToggle.checked = customSoundsData.enabled;
      if (muteChesscomToggle) muteChesscomToggle.checked = customSoundsData.mute_chesscom;
      renderSoundSlots();
    }

    updateAllPreviews();
    updateStorageStatus();

    const initialPiece = currentRawUploads["wp"] ? "wp" : Object.keys(currentRawUploads)[0] || "wp";
    selectPieceInStudio(initialPiece);

    comedySettings = {
      comedy_enabled: data.comedy_enabled !== false,
      comedy_jokes: data.comedy_jokes === true,
      comedy_effects: data.comedy_effects !== false,
      comedy_sounds: data.comedy_sounds !== false,
      comedy_volume: typeof data.comedy_volume === "number" ? data.comedy_volume : 80,
      joke_size: data.joke_size || "30px",
      joke_duration: typeof data.joke_duration === "number" ? data.joke_duration : 3800
    };

    if (window.PawnHubAudio) {
      window.PawnHubAudio.setVolume(comedySettings.comedy_volume);
      window.PawnHubAudio.setMuted(!comedySettings.comedy_sounds || !comedySettings.comedy_enabled);
    }

    updateComedyUI();
  });
}

function updateComedyUI() {
  if (!comedyEnabledToggle) return;
  comedyEnabledToggle.checked = comedySettings.comedy_enabled;
  comedyJokesToggle.checked = comedySettings.comedy_jokes;
  comedyEffectsToggle.checked = comedySettings.comedy_effects;
  comedySoundsToggle.checked = comedySettings.comedy_sounds;
  comedyVolumeSlider.value = comedySettings.comedy_volume;
  if (volumeLabel) volumeLabel.textContent = `${comedySettings.comedy_volume}%`;

  if (jokeSizeSlider) {
    const parsedSize = parseInt(comedySettings.joke_size, 10) || 30;
    jokeSizeSlider.value = parsedSize;
    if (jokeSizeLabel) jokeSizeLabel.textContent = `${parsedSize}px`;
  }

  if (jokeDurationSlider) {
    const parsedSec = (comedySettings.joke_duration / 1000).toFixed(1);
    jokeDurationSlider.value = Math.round(parsedSec * 10);
    if (jokeDurationLabel) jokeDurationLabel.textContent = `${parsedSec}s`;
  }

  if (comedySettings.comedy_enabled) {
    comedySubOptions.classList.remove("disabled");
  } else {
    comedySubOptions.classList.add("disabled");
  }
}

function setupEventListeners() {
  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      currentTheme = e.target.value;
      storageSet({ pawnhub_theme: currentTheme });
    });
  }

  if (resetAllBtn) {
    resetAllBtn.addEventListener("click", () => {
      if (!confirm("Are you sure you want to reset all custom piece uploads?")) return;
      currentPieces = {};
      currentRawUploads = {};
      studioState.currentImage = null;
      studioState.currentRawDataUrl = null;

      storageSet({
        pawnhub_pieces: currentPieces,
        pawnhub_raw_uploads: currentRawUploads
      }, () => {
        updateAllPreviews();
        updateStorageStatus();
        redrawStudioCanvas();
      });
    });
  }

  if (comedyEnabledToggle) {
    comedyEnabledToggle.addEventListener("change", (e) => {
      comedySettings.comedy_enabled = e.target.checked;
      storageSet({ comedy_enabled: comedySettings.comedy_enabled });
      if (window.PawnHubAudio) window.PawnHubAudio.setMuted(!comedySettings.comedy_sounds || !comedySettings.comedy_enabled);
      updateComedyUI();
    });
  }

  if (comedyJokesToggle) {
    comedyJokesToggle.addEventListener("change", (e) => {
      comedySettings.comedy_jokes = e.target.checked;
      storageSet({ comedy_jokes: comedySettings.comedy_jokes });
    });
  }

  if (jokeSizeSlider) {
    jokeSizeSlider.addEventListener("input", (e) => {
      const size = `${e.target.value}px`;
      comedySettings.joke_size = size;
      if (jokeSizeLabel) jokeSizeLabel.textContent = size;
      debouncedStorageSet({ joke_size: size });
    });
  }

  if (jokeDurationSlider) {
    jokeDurationSlider.addEventListener("input", (e) => {
      const durationMs = parseInt(e.target.value, 10) * 100;
      comedySettings.joke_duration = durationMs;
      if (jokeDurationLabel) jokeDurationLabel.textContent = `${(durationMs / 1000).toFixed(1)}s`;
      debouncedStorageSet({ joke_duration: durationMs });
    });
  }

  if (comedyEffectsToggle) {
    comedyEffectsToggle.addEventListener("change", (e) => {
      comedySettings.comedy_effects = e.target.checked;
      storageSet({ comedy_effects: comedySettings.comedy_effects });
    });
  }

  if (comedySoundsToggle) {
    comedySoundsToggle.addEventListener("change", (e) => {
      comedySettings.comedy_sounds = e.target.checked;
      storageSet({ comedy_sounds: comedySettings.comedy_sounds });
      if (window.PawnHubAudio) window.PawnHubAudio.setMuted(!comedySettings.comedy_sounds || !comedySettings.comedy_enabled);
    });
  }

  if (comedyVolumeSlider) {
    comedyVolumeSlider.addEventListener("input", (e) => {
      const vol = parseInt(e.target.value, 10);
      comedySettings.comedy_volume = vol;
      if (volumeLabel) volumeLabel.textContent = `${vol}%`;
      debouncedStorageSet({ comedy_volume: vol });
      if (window.PawnHubAudio) window.PawnHubAudio.setVolume(vol);
    });
  }
}

// ==========================================================================
// 7. Test Lab (Audition Effects & Sounds Live)
// ==========================================================================
function setupTestLab() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  document.querySelectorAll(".test-sound-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const soundName = btn.dataset.sound;
      if (window.PawnHubAudio) {
        window.PawnHubAudio.init();
        window.PawnHubAudio.play(soundName);
      }
    });
  });

  document.querySelectorAll(".test-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.PawnHubAudio) window.PawnHubAudio.init();
      const effect = btn.dataset.effect;
      const fakeFrom = { left: cx - 180, top: cy, width: 64, height: 64 };
      const fakeTo = { left: cx + 120, top: cy, width: 64, height: 64 };

      const dummyAttackerStyle = { backgroundImage: `url("${generateThemedPieceSvg("🦄", true, "candy")}")`, backgroundSize: "contain" };
      const dummyVictimStyle = { backgroundImage: `url("${generateThemedPieceSvg("🧁", false, "candy")}")`, backgroundSize: "contain" };

      switch (effect) {
        case "bonk":
        case "karate":
        case "cannon":
        case "slip":
        case "sumo":
        case "vacuum":
          window.PawnHubEffects.playCapture({
            attackerStyle: dummyAttackerStyle,
            victimStyle: dummyVictimStyle,
            fromRect: fakeFrom,
            toRect: fakeTo,
            realAttackerEl: null,
            isQueenCapture: false
          });
          break;
        case "queen":
          window.PawnHubEffects.playCapture({
            attackerStyle: dummyAttackerStyle,
            victimStyle: dummyVictimStyle,
            fromRect: fakeFrom,
            toRect: fakeTo,
            realAttackerEl: null,
            isQueenCapture: true
          });
          break;
        case "check":
          window.PawnHubEffects.playCheck(fakeTo);
          break;
        case "checkmate":
          window.PawnHubEffects.playCheckmate();
          break;
        case "castle":
          window.PawnHubEffects.playCastling(fakeFrom, fakeTo);
          break;
        case "promotion":
          window.PawnHubEffects.playPromotion(fakeTo);
          break;
        case "joke":
          window.PawnHubEffects.showJoke("Pawn down. Thoughts and prayers.", "🪦", 3800, "32px");
          if (window.PawnHubAudio) window.PawnHubAudio.play("ding");
          break;
      }
    });
  });

  if (randomComboBtn) {
    randomComboBtn.addEventListener("click", () => {
      if (window.PawnHubAudio) window.PawnHubAudio.init();
      const effects = ["bonk", "karate", "cannon", "slip", "sumo", "vacuum", "queen", "check", "checkmate", "castle", "promotion"];
      const chosen = effects[Math.floor(Math.random() * effects.length)];
      const targetBtn = document.querySelector(`.test-btn[data-effect="${chosen}"]`);
      if (targetBtn) targetBtn.click();
    });
  }
}
