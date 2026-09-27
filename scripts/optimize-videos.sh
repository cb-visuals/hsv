#!/bin/bash
# Re-encodes every .mp4 under public/media to VP9/.webm in place (deleting
# the .mp4), so clips dropped in at raw camera bitrate (often 8-9 Mbps,
# several MB per second) don't ship to visitors at that size. VP9 generally
# beats H.264 at the same visual quality. Every video on this site is always
# rendered muted (see LightboxMedia/HeroVideoCarousel), so audio is stripped
# entirely. All four video folders (hero, gallery, flip-design-direction
# before/after) discover files by extension, not by a hardcoded filename, so
# switching the extension needs no code changes elsewhere.
#
# Usage: scripts/optimize-videos.sh [max-dimension] [crf]
#   max-dimension: longest edge in pixels a video is allowed to keep (default 1920)
#   crf:           VP9 quality, 0-63, lower = better/bigger (default 34 —
#                   verified by eye against a source frame before picking this)
#
# Requires ffmpeg built with libvpx-vp9. Videos already at or under
# max-dimension are only re-encoded (never upscaled), and the .webm is only
# kept if it's actually smaller than the source .mp4 — otherwise the
# original .mp4 is left untouched (nothing is deleted in that case).
set -euo pipefail

MAX_DIMENSION="${1:-1920}"
CRF="${2:-34}"
MEDIA_DIR="public/media"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "This script requires ffmpeg (brew install ffmpeg). Aborting." >&2
  exit 1
fi

total_before=0
total_after=0
changed=0
skipped=0

while IFS= read -r -d '' file; do
  before_size=$(stat -f%z "$file")
  out_file="${file%.mp4}.webm"

  ffmpeg -nostdin -y -loglevel error -i "$file" \
    -vf "scale='min(${MAX_DIMENSION},iw)':'min(${MAX_DIMENSION},ih)':force_original_aspect_ratio=decrease" \
    -c:v libvpx-vp9 -crf "$CRF" -b:v 0 -deadline good -cpu-used 2 -an \
    "$out_file"

  after_size=$(stat -f%z "$out_file")

  if [ "$after_size" -lt "$before_size" ]; then
    rm -f "$file"
    total_before=$(( total_before + before_size ))
    total_after=$(( total_after + after_size ))
    changed=$(( changed + 1 ))
    printf "%-85s %6dKB -> %6dKB\n" "$file" "$(( before_size / 1024 ))" "$(( after_size / 1024 ))"
  else
    rm -f "$out_file"
    total_before=$(( total_before + before_size ))
    total_after=$(( total_after + before_size ))
    skipped=$(( skipped + 1 ))
    printf "%-85s %6dKB    (already optimal, left as .mp4)\n" "$file" "$(( before_size / 1024 ))"
  fi
done < <(find "$MEDIA_DIR" -type f -iname "*.mp4" -print0)

echo
echo "Converted $changed videos to webm, left $skipped already-optimal videos as .mp4."
printf "Total: %.1f MB -> %.1f MB (%.0f%% reduction)\n" \
  "$(echo "$total_before / 1024 / 1024" | bc -l)" \
  "$(echo "$total_after / 1024 / 1024" | bc -l)" \
  "$(echo "(1 - $total_after / $total_before) * 100" | bc -l)"
