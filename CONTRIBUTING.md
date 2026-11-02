# Contributing to PawnHub ♟️

Thank you for your interest in contributing to PawnHub! We welcome contributions that expand cosmetic customizability, improve performance, or fix bugs.

---

## Guiding Principles

1. **Strictly Cosmetic**: PawnHub never interacts with chess engine calculations, clocks, or game evaluation. Tools or features that suggest moves or assist gameplay will be rejected.
2. **Privacy First**: Zero telemetry, zero analytics, zero external network requests. All features must run 100% locally on the user's machine.
3. **Pure Web Technologies**: Plain HTML, modern CSS, and vanilla JavaScript only. Do not introduce heavy front-end frameworks or external bundle dependencies.
4. **Original Assets Only**: No copyrighted characters, celebrity likenesses, real people, or proprietary logos. All piece sets and sound effects must be original.

---

## Local Development Workflow

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harsh/pawnhub.git
   cd pawnhub
   ```

2. **Load the extension in Chrome or Brave**:
   - Go to `chrome://extensions` or `brave://extensions`.
   - Enable **Developer mode** in the upper right.
   - Click **Load unpacked** and select the `pawnhub` directory.

3. **Verify Changes**:
   - Run the automated test suite:
     ```bash
     node scripts/test.sh  # or node /path/to/run_cdp_tests.js
     ```
   - Check code syntax:
     ```bash
     node --check content/*.js content/pieces/*.js popup/*.js options/*.js
     ```

4. **Package Production Release**:
   ```bash
   ./scripts/build.sh
   ```

---

## Pull Request Guidelines

- Describe what changed and include manual test steps.
- Ensure all 158 controls in [`docs/QA_CHECKLIST.md`](file:///home/harsh/Documents/PawnHub/docs/QA_CHECKLIST.md) continue to work properly.
- Keep commits clear, focused, and descriptive.
