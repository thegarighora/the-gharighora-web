#!/usr/bin/env bash
#
# Applies the server-side half of the branching rules to this repository.
#
# The git hooks in .husky are a convenience: they fail fast, and `--no-verify`
# walks straight past them. What actually stops work reaching master or
# development is branch protection, and only GitHub can enforce that. Run this
# once per repository, and again after renaming a CI job.
#
# Requires the GitHub CLI, authenticated as someone with admin on the repo:
#   winget install GitHub.cli   (or: brew install gh)
#   gh auth login
#
# Usage:  bash .github/setup-branch-protection.sh [--dry-run]
set -euo pipefail

DRY_RUN=false
[ "${1:-}" = "--dry-run" ] && DRY_RUN=true

cd "$(git rev-parse --show-toplevel)"

command -v gh >/dev/null 2>&1 || {
  echo "error: the GitHub CLI (gh) is not installed. See the header of this script." >&2
  exit 1
}
gh auth status >/dev/null 2>&1 || {
  echo "error: gh is not authenticated. Run: gh auth login" >&2
  exit 1
}

SLUG="$(gh repo view --json nameWithOwner -q .nameWithOwner)"

# Every job name declared in the workflows becomes a required status check. Job
# names sit at four spaces of indentation; step names are deeper, so this picks
# up jobs only. Deriving the list means a renamed job cannot quietly stop being
# required.
mapfile -t CONTEXTS < <(grep -h '^    name: ' .github/workflows/*.yml | sed 's/^    name: //' | sort -u)

if [ "${#CONTEXTS[@]}" -eq 0 ]; then
  echo "error: found no job names in .github/workflows/*.yml" >&2
  exit 1
fi

echo "repository:      $SLUG"
echo "required checks: ${CONTEXTS[*]}"
echo

PAYLOAD="$(CONTEXTS="$(printf '%s\n' "${CONTEXTS[@]}")" node -e '
const contexts = process.env.CONTEXTS.split("\n").filter(Boolean);
process.stdout.write(JSON.stringify({
  required_status_checks: { strict: true, contexts },
  // Admins included. A rule the repository owner can walk around is a
  // suggestion, not a rule.
  enforce_admins: true,
  required_pull_request_reviews: {
    dismiss_stale_reviews: true,
    require_code_owner_reviews: false,
    // Zero, so a solo maintainer is not deadlocked by being unable to approve
    // their own pull request. A pull request is still mandatory. Raise this to 1
    // as soon as there is a second person who can review.
    required_approving_review_count: 0,
  },
  restrictions: null,
  required_linear_history: true,
  allow_force_pushes: false,
  allow_deletions: false,
  required_conversation_resolution: true,
  block_creations: false,
}));
')"

for BRANCH in master development; do
  if ! git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    echo "skip $BRANCH: no such branch on origin"
    continue
  fi

  if $DRY_RUN; then
    echo "would protect $BRANCH with:"
    printf '%s\n' "$PAYLOAD" | node -e 'process.stdin.pipe(process.stdout)'
    echo
    continue
  fi

  printf '%s' "$PAYLOAD" |
    gh api -X PUT "repos/$SLUG/branches/$BRANCH/protection" \
      -H "Accept: application/vnd.github+json" --input - >/dev/null
  echo "protected $BRANCH"
done

if ! $DRY_RUN; then
  # Squash merges only, so the pull request title becomes the commit message on
  # the protected branch and history stays linear. Merged branches clean up
  # after themselves.
  gh api -X PATCH "repos/$SLUG" \
    -F allow_squash_merge=true \
    -F allow_merge_commit=false \
    -F allow_rebase_merge=false \
    -F delete_branch_on_merge=true >/dev/null
  echo "merge settings: squash only, delete branch on merge"
fi

echo
echo "Done. Direct pushes to master and development are now refused by GitHub,"
echo "and a pull request into master is accepted only from development."
