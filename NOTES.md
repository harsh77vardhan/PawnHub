# PawnHub Learning Notes ♟️

A record of what we learned and built during each phase of development.

---

## Phase 1: The Minimal Working Extension

### What We Built
- Created our extension's blueprint (`manifest.json`) using Chrome's **Manifest V3** standard.
- Created a **Content Script** (`content/content.js` and `content/content.css`) that injects a test banner whenever chess.com opens.

### Key Concepts Learned

1. **What is `manifest.json`?**
   - It is the entry point and ID card of every Chrome extension.
   - It tells the browser the extension's name, version, required permissions, and which scripts should run on which websites.
   - **Important rule**: JSON files cannot have comments (`//` or `/* */`). Chrome will reject the extension if comments are present in `manifest.json`.

2. **What is a Content Script?**
   - A script that runs directly in the context of a web page (in our case, `chess.com`).
   - It can read and modify the page's HTML (DOM) and CSS styles.
   - We configured `"run_at": "document_idle"`, which tells Chrome to wait until the basic page DOM has loaded before injecting our code, preventing errors.

3. **URL Matching (`matches`)**:
   - The pattern `"https://www.chess.com/*"` tells Chrome to ONLY load our scripts when visiting `chess.com`. On any other website (like Google or YouTube), the extension stays completely dormant.

4. **Self-Contained Styling & Isolation**:
   - Web pages have their own CSS rules that can accidentally alter our elements.
   - To make sure our banner always looks right without interfering with the game, we gave our elements unique IDs (`#pawnhub-banner`) and high `z-index` values.
