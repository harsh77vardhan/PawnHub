// ==========================================================================
// PawnHub - Content Script (Phase 1)
// ==========================================================================
// This script runs automatically inside chess.com pages.
// Its only job in Phase 1 is to verify that our extension is loaded and active.

(function () {
  // 1. Guard against duplicate injection
  // Web apps can trigger multiple navigation events; this prevents duplicate banners.
  if (document.getElementById("pawnhub-banner")) {
    return;
  }

  // 2. Log to Developer Tools Console so you can see it in DevTools (F12)
  console.log(
    "%c[PawnHub]%c Extension loaded successfully on chess.com!",
    "color: #38bdf8; font-weight: bold; font-size: 13px;",
    "color: inherit; font-size: 13px;"
  );

  // 3. Create the banner element
  const banner = document.createElement("div");
  banner.id = "pawnhub-banner";

  // 4. Fill in the banner HTML content
  banner.innerHTML = `
    <span class="pawnhub-icon">♟️</span>
    <span class="pawnhub-text"><strong>PawnHub</strong> is working!</span>
    <button class="pawnhub-close-btn" title="Dismiss banner" aria-label="Close banner">✕</button>
  `;

  // 5. Add click event to dismiss the banner
  const closeButton = banner.querySelector(".pawnhub-close-btn");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      banner.style.opacity = "0";
      banner.style.transform = "translateX(-50%) translateY(-10px)";
      setTimeout(() => banner.remove(), 300);
    });
  }

  // 6. Mount to the page
  // Fall back to documentElement if body isn't available yet
  const mountPoint = document.body || document.documentElement;
  mountPoint.appendChild(banner);
})();
