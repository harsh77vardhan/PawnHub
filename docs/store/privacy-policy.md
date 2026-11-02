# Privacy Policy for PawnHub

**Last Updated**: November 2, 2026

PawnHub ("we", "our", or "the extension") is an open-source, cosmetic-only browser extension for Chess.com. We believe that your privacy is a fundamental right. This Privacy Policy details our strict commitment to zero data collection.

---

## 1. Zero Data Collection
- **No Personal Information**: PawnHub does not collect, track, log, transmit, or sell any personal data, identifiers, IP addresses, browsing history, or gameplay data.
- **No Analytics or Trackers**: PawnHub contains zero third-party telemetry, analytics services, cookies, tracking pixels, or external scripts.
- **No External Network Traffic**: PawnHub makes zero outbound network requests. All functionality executes strictly inside your local browser environment.

---

## 2. Local Storage & User Uploads
- **Device-Only Storage**: All user settings, chosen themes, uploaded piece photos, and custom audio files are saved exclusively in your browser's local sandbox using the `chrome.storage.local` API.
- **Uploaded Content Remains Private**: Any images or video/audio clips you upload for piece molding or sound effects are processed entirely on your computer via HTML5 Canvas and the Web Audio API. They never leave your device and are never transmitted to any cloud server or third party.

---

## 3. Chrome Web Store Permission Justifications

When submitting to the Chrome Web Store, the following justifications explain why each permission in `manifest.json` is strictly required:

| Permission | Purpose & Justification |
|---|---|
| `storage` | Required to save user preferences, selected board themes, comedy toggles, custom piece cutouts, and sound assignments locally on the device. |
| `unlimitedStorage` | Required to store user-uploaded custom piece images and high-fidelity compressed sound clips locally without hitting the default 5MB `chrome.storage.local` quota. |

### Host Permissions Justification:
- `https://www.chess.com/*` and `https://chess.com/*`: Required to detect board elements on Chess.com pages in order to apply cosmetic styles, piece replacements, and visual/audio reactions.

---

## 4. Open Source Verification
PawnHub is free, open-source software. You are encouraged to inspect the full source code to verify that no data ever leaves your device:  
Repository: [https://github.com/harsh/pawnhub](https://github.com/harsh/pawnhub)

---

## 5. Contact
For questions or concerns regarding this Privacy Policy, please file an issue on our GitHub repository.
