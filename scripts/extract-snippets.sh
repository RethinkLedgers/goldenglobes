#!/bin/bash
#
# Golden Globes Ceremony Snippet Extractor
#
# Downloads YouTube videos and extracts 2-5 second clips into output/ folder.
# Generates a markdown catalog of all snippets.
#
# Usage:
#   ./scripts/extract-snippets.sh [YouTube URL or search query...]
#   ./scripts/extract-snippets.sh --search "Golden Globes 2026 highlights"
#   ./scripts/extract-snippets.sh --url "https://youtube.com/watch?v=XXXX"
#   ./scripts/extract-snippets.sh --channel "@goldenglobes" --max 5
#
# Requirements: yt-dlp, ffmpeg

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/output"
SNIPPETS_DIR="$OUTPUT_DIR/snippets"
DOWNLOADS_DIR="$OUTPUT_DIR/downloads"
CATALOG_FILE="$OUTPUT_DIR/snippets-catalog.md"
SNIPPET_DURATION=4  # seconds (2-5 range)
MAX_VIDEOS=5
SEARCH_QUERY=""
VIDEO_URL=""
CHANNEL=""

# Golden Globes YouTube channels
declare -A CHANNELS=(
  ["official"]="@goldenglobes"
  ["nbc"]="@NBC"
  ["peacock"]="@peacock"
  ["variety"]="@Variety"
  ["hollywoodreporter"]="@hollywoodreporter"
)

usage() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --search <query>     Search YouTube for videos"
  echo "  --url <url>          Download a specific YouTube video"
  echo "  --channel <handle>   Search within a specific channel (e.g., @goldenglobes)"
  echo "  --max <n>            Max videos to download (default: 5)"
  echo "  --duration <s>       Snippet duration in seconds (default: 4, range: 2-5)"
  echo "  --all-channels       Search across all known Golden Globes channels"
  echo "  --help               Show this help"
  echo ""
  echo "Examples:"
  echo "  $0 --search 'Golden Globes 2026 best moments'"
  echo "  $0 --url 'https://youtube.com/watch?v=XXXX'"
  echo "  $0 --all-channels --max 3"
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --search)
        SEARCH_QUERY="$2"
        shift 2
        ;;
      --url)
        VIDEO_URL="$2"
        shift 2
        ;;
      --channel)
        CHANNEL="$2"
        shift 2
        ;;
      --max)
        MAX_VIDEOS="$2"
        shift 2
        ;;
      --duration)
        SNIPPET_DURATION="$2"
        shift 2
        ;;
      --all-channels)
        CHANNEL="all"
        shift
        ;;
      --help)
        usage
        exit 0
        ;;
      *)
        SEARCH_QUERY="$*"
        break
        ;;
    esac
  done

  # Default search if nothing provided
  if [[ -z "$SEARCH_QUERY" && -z "$VIDEO_URL" && -z "$CHANNEL" ]]; then
    SEARCH_QUERY="Golden Globes 2026 ceremony highlights"
  fi
}

setup_dirs() {
  mkdir -p "$SNIPPETS_DIR" "$DOWNLOADS_DIR"
  echo "Output directory: $OUTPUT_DIR"
}

init_catalog() {
  cat > "$CATALOG_FILE" << 'HEADER'
# Golden Globes Ceremony Snippets Catalog

> Auto-generated catalog of video snippets from Golden Globes ceremony coverage.

| # | Snippet File | Source Video | Duration | Timestamp | Description |
|---|-------------|-------------|----------|-----------|-------------|
HEADER
}

# Download video and return the output filename
download_video() {
  local source="$1"  # URL or search query
  local is_search="${2:-false}"
  local max="${3:-1}"

  echo "Downloading: $source"

  local yt_args=(
    --no-playlist
    --max-downloads "$max"
    -f "best[height<=720]"
    --output "$DOWNLOADS_DIR/%(title)s__%(id)s.%(ext)s"
    --write-info-json
    --no-overwrites
    --restrict-filenames
  )

  if [[ "$is_search" == "true" ]]; then
    yt_args+=("ytsearch${max}:${source}")
  else
    yt_args+=("$source")
  fi

  yt-dlp "${yt_args[@]}" 2>&1 || {
    echo "Warning: yt-dlp failed for: $source"
    return 1
  }
}

# Get video duration using ffprobe
get_duration() {
  local file="$1"
  ffprobe -v error -show_entries format=duration -of csv=p=0 "$file" 2>/dev/null | cut -d. -f1
}

# Extract snippet from a video at given timestamp
extract_snippet() {
  local input_file="$1"
  local output_file="$2"
  local start_time="$3"
  local duration="$4"

  ffmpeg -y -ss "$start_time" -i "$input_file" \
    -t "$duration" \
    -c:v libx264 -preset fast -crf 23 \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    "$output_file" 2>/dev/null
}

# Extract multiple snippets from a single video
process_video() {
  local video_file="$1"
  local snippet_count=0
  local video_basename
  video_basename="$(basename "${video_file%.*}")"
  local total_duration
  total_duration="$(get_duration "$video_file")"

  if [[ -z "$total_duration" || "$total_duration" -lt 5 ]]; then
    echo "  Skipping (too short or unreadable): $video_file"
    return
  fi

  echo "  Processing: $video_basename (${total_duration}s)"

  # Extract snippets at key points: start, 25%, 50%, 75%
  local timestamps=()
  timestamps+=(3)  # Opening (skip first 3s of intro)

  if [[ "$total_duration" -gt 20 ]]; then
    timestamps+=($((total_duration / 4)))
  fi
  if [[ "$total_duration" -gt 40 ]]; then
    timestamps+=($((total_duration / 2)))
  fi
  if [[ "$total_duration" -gt 60 ]]; then
    timestamps+=($((total_duration * 3 / 4)))
  fi

  for ts in "${timestamps[@]}"; do
    # Ensure we don't go past the end
    if [[ $((ts + SNIPPET_DURATION)) -gt "$total_duration" ]]; then
      continue
    fi

    snippet_count=$((snippet_count + 1))
    local snippet_name="${video_basename}__snippet_${snippet_count}.mp4"
    local snippet_path="$SNIPPETS_DIR/$snippet_name"

    extract_snippet "$video_file" "$snippet_path" "$ts" "$SNIPPET_DURATION"

    if [[ -f "$snippet_path" ]]; then
      local ts_formatted
      ts_formatted="$(printf '%02d:%02d' $((ts / 60)) $((ts % 60)))"

      # Read video title from info json if available
      local info_file="${video_file%.*}.info.json"
      local video_title="$video_basename"
      local description="Snippet from ${ts_formatted}"

      if [[ -f "$info_file" ]]; then
        video_title="$(python3 -c "import json; d=json.load(open('$info_file')); print(d.get('title','$video_basename'))" 2>/dev/null || echo "$video_basename")"
        description="$(python3 -c "import json; d=json.load(open('$info_file')); print(d.get('description','')[:100])" 2>/dev/null || echo "Snippet from ${ts_formatted}")"
      fi

      # Append to catalog
      echo "| $GLOBAL_SNIPPET_COUNT | \`$snippet_name\` | $video_title | ${SNIPPET_DURATION}s | ${ts_formatted} | $description |" >> "$CATALOG_FILE"
      GLOBAL_SNIPPET_COUNT=$((GLOBAL_SNIPPET_COUNT + 1))

      echo "    Created: $snippet_name (at ${ts_formatted})"
    fi
  done
}

# Main
GLOBAL_SNIPPET_COUNT=1

parse_args "$@"
setup_dirs
init_catalog

echo ""
echo "============================================"
echo "  Golden Globes Snippet Extractor"
echo "============================================"
echo ""

# Download videos based on input mode
if [[ -n "$VIDEO_URL" ]]; then
  echo "Mode: Direct URL download"
  download_video "$VIDEO_URL" false 1
elif [[ "$CHANNEL" == "all" ]]; then
  echo "Mode: Searching all Golden Globes channels"
  for name in "${!CHANNELS[@]}"; do
    handle="${CHANNELS[$name]}"
    query="${SEARCH_QUERY:-Golden Globes 2026}"
    echo ""
    echo "--- Channel: $name ($handle) ---"
    download_video "$query $handle" true "$MAX_VIDEOS" || true
  done
elif [[ -n "$CHANNEL" ]]; then
  echo "Mode: Channel search ($CHANNEL)"
  query="${SEARCH_QUERY:-Golden Globes 2026}"
  download_video "$query $CHANNEL" true "$MAX_VIDEOS"
else
  echo "Mode: YouTube search"
  download_video "$SEARCH_QUERY" true "$MAX_VIDEOS"
fi

# Process all downloaded videos
echo ""
echo "--- Extracting snippets ---"
echo ""

shopt -s nullglob
video_files=("$DOWNLOADS_DIR"/*.mp4 "$DOWNLOADS_DIR"/*.mkv "$DOWNLOADS_DIR"/*.webm)

if [[ ${#video_files[@]} -eq 0 ]]; then
  echo "No videos downloaded. Check your search query or URL."
  exit 1
fi

for video in "${video_files[@]}"; do
  process_video "$video"
done

# Add footer to catalog
cat >> "$CATALOG_FILE" << FOOTER

---

## Sources

### YouTube Channels
- [Golden Globe Awards](https://youtube.com/@goldenglobes)
- [NBC](https://youtube.com/@NBC)
- [Peacock](https://youtube.com/@peacock)
- [Variety](https://youtube.com/@Variety)
- [The Hollywood Reporter](https://youtube.com/@hollywoodreporter)

### Websites
- [goldenglobes.com](https://goldenglobes.com)
- [NBC Golden Globes](https://nbc.com/golden-globe-awards)

---
*Generated on $(date '+%Y-%m-%d %H:%M:%S')*
FOOTER

echo ""
echo "============================================"
echo "  Done!"
echo "============================================"
echo ""
echo "  Snippets: $SNIPPETS_DIR"
echo "  Catalog:  $CATALOG_FILE"
echo "  Videos:   $DOWNLOADS_DIR"
echo ""
echo "  Total snippets created: $((GLOBAL_SNIPPET_COUNT - 1))"
echo ""
