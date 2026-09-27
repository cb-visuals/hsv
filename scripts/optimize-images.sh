#!/bin/bash
# Resizes and recompresses every JPEG under public/media in place, so photos
# dropped in at full camera/phone resolution (often 3000-4000px, several MB
# each) don't ship to visitors at that size. Videos are left untouched.
#
# Usage: scripts/optimize-images.sh [max-dimension] [quality]
#   max-dimension: longest edge in pixels a photo is allowed to keep (default 2000)
#   quality:       JPEG quality 0-100 (default 75)
#
# Uses macOS's built-in `sips` — no extra dependency to install. Images
# already at or under max-dimension are only recompressed, and only if that
# actually makes them smaller (some already-optimized photos can come out
# larger from a straight re-encode, and those are left untouched).
set -euo pipefail

MAX_DIMENSION="${1:-2000}"
QUALITY="${2:-75}"
MEDIA_DIR="public/media"

if ! command -v sips >/dev/null 2>&1; then
  echo "This script requires 'sips', which is macOS-only. Aborting." >&2
  exit 1
fi

total_before=0
total_after=0
changed=0
skipped=0

while IFS= read -r -d '' file; do
  dims=$(sips -g pixelWidth -g pixelHeight "$file" 2>/dev/null)
  width=$(echo "$dims" | awk '/pixelWidth/{print $2}')
  height=$(echo "$dims" | awk '/pixelHeight/{print $2}')
  max_dim=$(( width > height ? width : height ))

  before_size=$(stat -f%z "$file")
  tmp_file="${file}.optim-tmp"
  cp "$file" "$tmp_file"

  if [ "$max_dim" -gt "$MAX_DIMENSION" ]; then
    sips -Z "$MAX_DIMENSION" -s formatOptions "$QUALITY" "$tmp_file" >/dev/null 2>&1
  else
    sips -s formatOptions "$QUALITY" "$tmp_file" >/dev/null 2>&1
  fi

  after_size=$(stat -f%z "$tmp_file")

  if [ "$after_size" -lt "$before_size" ]; then
    mv "$tmp_file" "$file"
    total_before=$(( total_before + before_size ))
    total_after=$(( total_after + after_size ))
    changed=$(( changed + 1 ))
    printf "%-85s %6dKB -> %6dKB\n" "$file" "$(( before_size / 1024 ))" "$(( after_size / 1024 ))"
  else
    rm -f "$tmp_file"
    total_before=$(( total_before + before_size ))
    total_after=$(( total_after + before_size ))
    skipped=$(( skipped + 1 ))
    printf "%-85s %6dKB    (already optimal, left as-is)\n" "$file" "$(( before_size / 1024 ))"
  fi
done < <(find "$MEDIA_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

echo
echo "Changed $changed photos, left $skipped already-optimal photos untouched."
printf "Total: %.1f MB -> %.1f MB (%.0f%% reduction)\n" \
  "$(echo "$total_before / 1024 / 1024" | bc -l)" \
  "$(echo "$total_after / 1024 / 1024" | bc -l)" \
  "$(echo "(1 - $total_after / $total_before) * 100" | bc -l)"
