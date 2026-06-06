#!/usr/bin/env bash
# auto-pr.sh — Batch PR creation, auto-approve, and auto-merge.
set -euo pipefail

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
MERGE=false AUTO=false BRANCHES=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --merge)  MERGE=true; shift ;;
    --auto)   AUTO=true; shift ;;
    --branch) shift; while [[ $# -gt 0 && ! "$1" =~ ^-- ]]; do BRANCHES+=("$1"); shift; done ;;
    *)        echo "Unknown: $1"; exit 1 ;;
  esac
done

create_prs() {
  for branch in "${BRANCHES[@]}"; do
    echo "Creating PR for $branch..."
    TITLE=$(git log --format='%s' -1 "origin/$branch" 2>/dev/null || echo "$branch")
    PR_URL=$(gh pr create --head "$branch" --base main --title "$TITLE" \
      --body "Auto-created PR" 2>/dev/null || true)
    if [ -n "$PR_URL" ]; then
      PR_NUM=$(basename "$PR_URL")
      echo "  PR #$PR_NUM: $PR_URL"
      gh pr review "$PR_NUM" --approve -b "Auto-approved" 2>/dev/null || true
    fi
  done
}

merge_all() {
  PRS=$(gh pr list --state open --json number,headRefName --jq '.[] | "\(.number) \(.headRefName)"')
  [ -z "$PRS" ] && echo "No open PRs." && return
  echo "$PRS" | while read -r num branch; do
    echo "Merging PR #$num ($branch)..."
    gh pr review "$num" --approve -b "Auto-approved" 2>/dev/null || true
    SHA=$(git rev-parse "origin/$branch" 2>/dev/null || echo "")
    [ -z "$SHA" ] && echo "  ⚠️  No SHA" && continue
    gh api "repos/$REPO/pulls/$num/merge" --method PUT \
      --field commit_title="$(gh pr view "$num" --json title -q '.title') (#$num)" \
      --field merge_method=squash --field sha="$SHA" \
      2>/dev/null && echo "  ✅ Merged" || echo "  ❌ Failed"
  done
}

auto_merge() {
  create_prs
  sleep 60
  for num in $(gh pr list --state open --json number -q '.[].number'); do
    echo "CI for PR #$num..."
    elapsed=0
    while [ $elapsed -lt 900 ]; do
      checks=$(gh pr checks "$num" 2>&1 || echo "unknown")
      echo "$checks" | grep -q "fail" && echo "  ❌ CI failed" && break
      echo "$checks" | grep -qE "pending|in_progress" && sleep 30 && elapsed=$((elapsed+30)) && continue
      echo "  ✅ Green — merging"
      gh pr review "$num" --approve 2>/dev/null || true
      gh pr merge "$num" --squash --delete-branch 2>/dev/null || true
      break
    done
  done
}

if [ "$AUTO" = true ]; then auto_merge
elif [ "$MERGE" = true ]; then merge_all
elif [ ${#BRANCHES[@]} -gt 0 ]; then create_prs
else echo "Usage: $0 [--merge | --auto | --branch <branches>...]"; exit 1
fi
