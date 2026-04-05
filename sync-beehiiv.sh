#!/bin/bash
# Beehiiv RSS sync — rebuild Astro site and push to deploy branch
# Cron: 0 10 * * 2,4 (kedd + csütörtök 10:00)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASTRO_DIR="$SCRIPT_DIR/cyan-comet"
LOG="$SCRIPT_DIR/beehiiv-sync.log"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG"; }

# Netdata monitoring
_CRON_START=$(date +%s)
trap 'echo "cron_exit.beehiiv_sync:$?|g" | nc -u -w0 127.0.0.1 8125 2>/dev/null; echo "cron_time.beehiiv_sync:$(( $(date +%s) - _CRON_START ))|g" | nc -u -w0 127.0.0.1 8125 2>/dev/null' EXIT

log "=== Beehiiv sync started ==="

# Step 1: Build
cd "$ASTRO_DIR"
log "Building Astro site..."
if npm run build >> "$LOG" 2>&1; then
    PAGE_COUNT=$(find dist -name '*.html' | wc -l)
    log "Build OK — $PAGE_COUNT pages"
else
    log "ERROR: Build failed"
    exit 1
fi

# Step 2: Push to deploy branch
cd "$SCRIPT_DIR"
CURRENT_BRANCH=$(git branch --show-current)

log "Switching to deploy branch..."
git checkout deploy >> "$LOG" 2>&1

# Clean old files (keep .git)
find . -maxdepth 1 -not -name '.git' -not -name '.' -not -name '..' -exec rm -rf {} + 2>/dev/null || true

# Copy new build output
cp -r "$ASTRO_DIR/dist/"* .

# Commit and push if there are changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    log "No changes — skipping commit"
else
    git add -A
    git commit -m "deploy: beehiiv sync $(date '+%Y-%m-%d %H:%M')" >> "$LOG" 2>&1
    git push origin deploy >> "$LOG" 2>&1
    log "Deployed to origin/deploy"
fi

# Switch back
git checkout "$CURRENT_BRANCH" >> "$LOG" 2>&1
log "=== Beehiiv sync complete ==="
