// ==========================================================================
// PawnHub - Popup Controller
// ==========================================================================
// Manages themes, custom pieces, and Comedy Mode settings.

const PIECE_DEFINITIONS = {
  white: [
    { key: "wp", name: "Pawn", symbol: "♙" },
    { key: "wn", name: "Knight", symbol: "♘" },
    { key: "wb", name: "Bishop", symbol: "♗" },
    { key: "wr", name: "Rook", symbol: "♖" },
    { key: "wq", name: "Queen", symbol: "♕" },
    { key: "wk", name: "King", symbol: "♔" }
  ],
  black: [
    { key: "bp", name: "Pawn", symbol: "♟" },
    { key: "bn", name: "Knight", symbol: "♞" },
    { key: "bb", name: "Bishop", symbol: "♝" },
    { key: "br", name: "Rook", symbol: "♜" },
    { key: "bq", name: "Queen", symbol: "♛" },
    { key: "bk", name: "King", symbol: "♚" }
  ]
};

// In-memory state
let currentTheme = "default";
let currentPieces = {};
let currentRawUploads = {};
let comedySettings = {
  comedy_enabled: true,
  comedy_jokes: false,
  comedy_effects: true,
  comedy_sounds: true,
  comedy_volume: 80,
  joke_size: "30px",
  joke_duration: 3800
};

// Safe storage access
function storageGet(keys, callback) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(keys, callback);
  } else {
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

// DOM Elements
const themeSelect = document.getElementById("theme-select");
const whiteList = document.getElementById("white-pieces-list");
const blackList = document.getElementById("black-pieces-list");
const resetAllBtn = document.getElementById("reset-all-pieces-btn");
const tabButtons = document.querySelectorAll(".tab-btn");
const openTabBtn = document.getElementById("open-tab-btn");
const openOptionsActionBtn = document.getElementById("open-options-action-btn");

// Comedy Controls
const comedyEnabledToggle = document.getElementById("comedy-enabled-toggle");
const comedyJokesToggle = document.getElementById("comedy-jokes-toggle");
const comedyEffectsToggle = document.getElementById("comedy-effects-toggle");
const comedySoundsToggle = document.getElementById("comedy-sounds-toggle");
const comedyVolumeSlider = document.getElementById("comedy-volume-slider");
const volumeLabel = document.getElementById("volume-label");
const comedySubOptions = document.getElementById("comedy-sub-options");

const jokeSizeSlider = document.getElementById("joke-size-slider");
const jokeSizeLabel = document.getElementById("joke-size-label");
const jokeDurationSlider = document.getElementById("joke-duration-slider");
const jokeDurationLabel = document.getElementById("joke-duration-label");

// 1. Initialize UI on popup open
document.addEventListener("DOMContentLoaded", () => {
  renderPieceRows("white", whiteList);
  renderPieceRows("black", blackList);
  setupTabs();
  loadSavedSettings();
  setupEventListeners();
});

// 2. Render piece rows
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
        <label class="btn-upload">
          Upload
          <input type="file" accept="image/*" id="file-${piece.key}" style="display: none;">
        </label>
        <button class="btn-clear" id="clear-${piece.key}" title="Reset to default">✕</button>
      </div>
    `;

    container.appendChild(row);

    const fileInput = row.querySelector(`#file-${piece.key}`);
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) handleImageUpload(piece.key, file);
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
      document.getElementById(`${targetTab}-pieces-list`).classList.add("active");
    });
  });
}

// 3. Load saved settings from chrome.storage.local
function loadSavedSettings() {
  storageGet(null, (data) => {
    if (data.pawnhub_theme) {
      currentTheme = data.pawnhub_theme;
      themeSelect.value = currentTheme;
    }

    if (data.pawnhub_pieces) {
      currentPieces = data.pawnhub_pieces;
      updateAllPreviews();
    }

    if (data.pawnhub_raw_uploads) {
      currentRawUploads = data.pawnhub_raw_uploads;
    }

    // Comedy settings
    comedySettings = {
      comedy_enabled: data.comedy_enabled !== false,
      comedy_jokes: data.comedy_jokes === true,
      comedy_effects: data.comedy_effects !== false,
      comedy_sounds: data.comedy_sounds !== false,
      comedy_volume: typeof data.comedy_volume === "number" ? data.comedy_volume : 80,
      joke_size: data.joke_size || "30px",
      joke_duration: typeof data.joke_duration === "number" ? data.joke_duration : 3800
    };

    updateComedyUI();
  });
}

function updateComedyUI() {
  comedyEnabledToggle.checked = comedySettings.comedy_enabled;
  comedyJokesToggle.checked = comedySettings.comedy_jokes;
  comedyEffectsToggle.checked = comedySettings.comedy_effects;
  comedySoundsToggle.checked = comedySettings.comedy_sounds;
  comedyVolumeSlider.value = comedySettings.comedy_volume;
  volumeLabel.textContent = `${comedySettings.comedy_volume}%`;

  const parsedSize = parseInt(comedySettings.joke_size, 10) || 30;
  jokeSizeSlider.value = parsedSize;
  jokeSizeLabel.textContent = `${parsedSize}px`;

  const parsedSec = (comedySettings.joke_duration / 1000).toFixed(1);
  jokeDurationSlider.value = Math.round(parsedSec * 10);
  jokeDurationLabel.textContent = `${parsedSec}s`;

  if (comedySettings.comedy_enabled) {
    comedySubOptions.classList.remove("disabled");
  } else {
    comedySubOptions.classList.add("disabled");
  }
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

function handleImageUpload(pieceKey, file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 150;
      canvas.height = 150;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 150, 150);

      const optimizedDataUrl = canvas.toDataURL("image/png");
      currentPieces[pieceKey] = optimizedDataUrl;
      currentRawUploads[pieceKey] = {
        dataUrl: optimizedDataUrl,
        zoom: 1.0,
        offsetX: 0,
        offsetY: 0,
        mode: "original"
      };

      storageSet({
        pawnhub_pieces: currentPieces,
        pawnhub_raw_uploads: currentRawUploads
      }, () => {
        updateAllPreviews();
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function handleClearPiece(pieceKey) {
  delete currentPieces[pieceKey];
  delete currentRawUploads[pieceKey];

  storageSet({
    pawnhub_pieces: currentPieces,
    pawnhub_raw_uploads: currentRawUploads
  }, () => {
    updateAllPreviews();
  });
}

function setupEventListeners() {
  themeSelect.addEventListener("change", (e) => {
    currentTheme = e.target.value;
    storageSet({ pawnhub_theme: currentTheme });
  });

  resetAllBtn.addEventListener("click", () => {
    currentPieces = {};
    currentRawUploads = {};
    storageSet({
      pawnhub_pieces: currentPieces,
      pawnhub_raw_uploads: currentRawUploads
    }, () => {
      updateAllPreviews();
    });
  });

  const openFullOptions = () => {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL) {
      window.open(chrome.runtime.getURL("options/options.html"));
    } else {
      window.open("../options/options.html");
    }
  };

  if (openTabBtn) openTabBtn.addEventListener("click", openFullOptions);
  if (openOptionsActionBtn) openOptionsActionBtn.addEventListener("click", openFullOptions);

  comedyEnabledToggle.addEventListener("change", (e) => {
    comedySettings.comedy_enabled = e.target.checked;
    storageSet({ comedy_enabled: comedySettings.comedy_enabled });
    updateComedyUI();
  });

  comedyJokesToggle.addEventListener("change", (e) => {
    comedySettings.comedy_jokes = e.target.checked;
    storageSet({ comedy_jokes: comedySettings.comedy_jokes });
  });

  comedyEffectsToggle.addEventListener("change", (e) => {
    comedySettings.comedy_effects = e.target.checked;
    storageSet({ comedy_effects: comedySettings.comedy_effects });
  });

  comedySoundsToggle.addEventListener("change", (e) => {
    comedySettings.comedy_sounds = e.target.checked;
    storageSet({ comedy_sounds: comedySettings.comedy_sounds });
  });

  comedyVolumeSlider.addEventListener("input", (e) => {
    const vol = parseInt(e.target.value, 10);
    comedySettings.comedy_volume = vol;
    volumeLabel.textContent = `${vol}%`;
    debouncedStorageSet({ comedy_volume: vol });
  });

  jokeSizeSlider.addEventListener("input", (e) => {
    const size = `${e.target.value}px`;
    comedySettings.joke_size = size;
    jokeSizeLabel.textContent = size;
    debouncedStorageSet({ joke_size: size });
  });

  jokeDurationSlider.addEventListener("input", (e) => {
    const durationMs = parseInt(e.target.value, 10) * 100;
    comedySettings.joke_duration = durationMs;
    jokeDurationLabel.textContent = `${(durationMs / 1000).toFixed(1)}s`;
    debouncedStorageSet({ joke_duration: durationMs });
  });
}
