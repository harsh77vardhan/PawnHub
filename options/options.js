// ==========================================================================
// PawnHub - Options Page Controller (Full Tab & Test Lab)
// ==========================================================================

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

let currentTheme = "default";
let currentPieces = {};
let comedySettings = {
  comedy_enabled: true,
  comedy_jokes: true,
  comedy_effects: true,
  comedy_sounds: true,
  comedy_volume: 80
};

// DOM References
const themeSelect = document.getElementById("theme-select");
const whiteList = document.getElementById("white-pieces-list");
const blackList = document.getElementById("black-pieces-list");
const resetAllBtn = document.getElementById("reset-all-pieces-btn");
const tabButtons = document.querySelectorAll(".tab-btn");

const comedyEnabledToggle = document.getElementById("comedy-enabled-toggle");
const comedyJokesToggle = document.getElementById("comedy-jokes-toggle");
const comedyEffectsToggle = document.getElementById("comedy-effects-toggle");
const comedySoundsToggle = document.getElementById("comedy-sounds-toggle");
const comedyVolumeSlider = document.getElementById("comedy-volume-slider");
const volumeLabel = document.getElementById("volume-label");
const comedySubOptions = document.getElementById("comedy-sub-options");
const randomComboBtn = document.getElementById("test-random-combo-btn");

document.addEventListener("DOMContentLoaded", () => {
  renderPieceRows("white", whiteList);
  renderPieceRows("black", blackList);
  setupTabs();
  loadSavedSettings();
  setupEventListeners();
  setupTestLab();
});

// 1. Setup Test Lab (Audition Effects & Sounds Live)
function setupTestLab() {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  // Sound Buttons
  document.querySelectorAll(".test-sound-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const soundName = btn.dataset.sound;
      if (window.PawnHubAudio) {
        window.PawnHubAudio.init();
        window.PawnHubAudio.play(soundName);
      }
    });
  });

  // Effect Buttons
  document.querySelectorAll(".test-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (window.PawnHubAudio) window.PawnHubAudio.init();
      const effect = btn.dataset.effect;
      const fakeFrom = { left: cx - 180, top: cy, width: 64, height: 64 };
      const fakeTo = { left: cx + 120, top: cy, width: 64, height: 64 };

      // Dummy dummy piece styling
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

  // Random Combo Button
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

function loadSavedSettings() {
  chrome.storage.local.get(null, (data) => {
    if (data.pawnhub_theme) {
      currentTheme = data.pawnhub_theme;
      themeSelect.value = currentTheme;
    }
    if (data.pawnhub_pieces) {
      currentPieces = data.pawnhub_pieces;
      updateAllPreviews();
    }

    comedySettings = {
      comedy_enabled: data.comedy_enabled !== false,
      comedy_jokes: data.comedy_jokes !== false,
      comedy_effects: data.comedy_effects !== false,
      comedy_sounds: data.comedy_sounds !== false,
      comedy_volume: typeof data.comedy_volume === "number" ? data.comedy_volume : 80
    };

    if (window.PawnHubAudio) {
      window.PawnHubAudio.setVolume(comedySettings.comedy_volume);
      window.PawnHubAudio.setMuted(!comedySettings.comedy_sounds);
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
  volumeLabel.textContent = `${comedySettings.comedy_volume}%`;

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

      chrome.storage.local.set({ pawnhub_pieces: currentPieces }, () => {
        updateAllPreviews();
      });
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function handleClearPiece(pieceKey) {
  delete currentPieces[pieceKey];
  chrome.storage.local.set({ pawnhub_pieces: currentPieces }, () => {
    updateAllPreviews();
  });
}

function setupEventListeners() {
  themeSelect.addEventListener("change", (e) => {
    currentTheme = e.target.value;
    chrome.storage.local.set({ pawnhub_theme: currentTheme });
  });

  resetAllBtn.addEventListener("click", () => {
    currentPieces = {};
    chrome.storage.local.set({ pawnhub_pieces: currentPieces }, () => {
      updateAllPreviews();
    });
  });

  comedyEnabledToggle.addEventListener("change", (e) => {
    comedySettings.comedy_enabled = e.target.checked;
    chrome.storage.local.set({ comedy_enabled: comedySettings.comedy_enabled });
    updateComedyUI();
  });

  comedyJokesToggle.addEventListener("change", (e) => {
    comedySettings.comedy_jokes = e.target.checked;
    chrome.storage.local.set({ comedy_jokes: comedySettings.comedy_jokes });
  });

  comedyEffectsToggle.addEventListener("change", (e) => {
    comedySettings.comedy_effects = e.target.checked;
    chrome.storage.local.set({ comedy_effects: comedySettings.comedy_effects });
  });

  comedySoundsToggle.addEventListener("change", (e) => {
    comedySettings.comedy_sounds = e.target.checked;
    chrome.storage.local.set({ comedy_sounds: comedySettings.comedy_sounds });
    if (window.PawnHubAudio) window.PawnHubAudio.setMuted(!comedySettings.comedy_sounds);
  });

  comedyVolumeSlider.addEventListener("input", (e) => {
    const vol = parseInt(e.target.value, 10);
    comedySettings.comedy_volume = vol;
    volumeLabel.textContent = `${vol}%`;
    chrome.storage.local.set({ comedy_volume: vol });
    if (window.PawnHubAudio) window.PawnHubAudio.setVolume(vol);
  });
}
