#!/usr/bin/env bash
# ==============================================================================
# PawnHub Production Packaging Script
# Generates a clean, store-ready pawnhub-v1.0.0.zip
# Excludes .git, docs, site, scripts, node_modules, test files, and notes.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUT_ZIP="${REPO_ROOT}/pawnhub-v1.0.0.zip"

echo "=== Packaging PawnHub Production Archive ==="
echo "Repository: ${REPO_ROOT}"
echo "Output:     ${OUT_ZIP}"

# 1. Validate manifest syntax
if ! python3 -m json.tool "${REPO_ROOT}/manifest.json" > /dev/null 2>&1; then
  echo "Error: manifest.json is invalid JSON!" >&2
  exit 1
fi
echo "✓ Verified manifest.json syntax"

# 2. Package using Python's standard zipfile (cross-platform, zero dependencies)
python3 - <<EOF
import os
import zipfile

repo_root = "${REPO_ROOT}"
out_zip = "${OUT_ZIP}"

# Only include strictly production extension assets
include_dirs = ["icons", "content", "popup", "options"]
include_files = ["manifest.json"]

if os.path.exists(out_zip):
    os.remove(out_zip)

file_count = 0
with zipfile.ZipFile(out_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    # 1. Root files
    for fname in include_files:
        fpath = os.path.join(repo_root, fname)
        if os.path.exists(fpath):
            zf.write(fpath, fname)
            file_count += 1
            print(f"  + {fname}")

    # 2. Component directories
    for dname in include_dirs:
        dir_path = os.path.join(repo_root, dname)
        if not os.path.exists(dir_path):
            continue
        for root, dirs, files in os.walk(dir_path):
            dirs.sort()
            for f in sorted(files):
                if f.startswith(".") or f.endswith(".tmp") or f.endswith("~"):
                    continue
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, repo_root)
                zf.write(full_path, rel_path)
                file_count += 1
                print(f"  + {rel_path}")

size_bytes = os.path.getsize(out_zip)
size_kb = size_bytes / 1024
print(f"\n✓ Successfully packaged {file_count} files into {out_zip}")
print(f"✓ Archive size: {size_bytes:,} bytes ({size_kb:.1f} KB)")
EOF

echo "=== Build Complete! Ready for Chrome Web Store upload ==="
