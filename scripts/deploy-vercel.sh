#!/bin/bash
set -euo pipefail
DEPLOY_ENDPOINT="https://claude-skills-deploy.vercel.com/api/deploy"
PROJECT_PATH="$(cd "${1:-.}" && pwd)"
TEMP_DIR=$(mktemp -d)
TARBALL="$TEMP_DIR/project.tgz"
STAGING_DIR="$TEMP_DIR/staging"
trap 'rm -rf "$TEMP_DIR"' EXIT

FRAMEWORK="vite"
mkdir -p "$STAGING_DIR"
tar -C "$PROJECT_PATH" \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='kp' \
  --exclude='listy' \
  --exclude='docx' \
  --exclude='docs' \
  --exclude='scripts' \
  --exclude='assets' \
  --exclude='*.zip' \
  --exclude='KP-AutoZap-ARMTEK.pdf' \
  --exclude='dist' \
  -cf - . | tar -C "$STAGING_DIR" -xf -

tar -czf "$TARBALL" -C "$STAGING_DIR" .
echo "Deploying $(du -h "$TARBALL" | cut -f1) package..." >&2
RESPONSE=$(curl -s -X POST "$DEPLOY_ENDPOINT" -F "file=@$TARBALL" -F "framework=$FRAMEWORK")
echo "$RESPONSE"
