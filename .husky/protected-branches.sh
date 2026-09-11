# Sourced by the git hooks. Names the branches that may never receive work
# directly, and how to test a branch name against that list.
#
# The flow this enforces:
#
#   feat/my-thing  --PR-->  development  --PR-->  master
#
# `master` only ever takes a pull request from `development`. That half of the
# rule lives in .github/workflows/branch-policy.yml, because a local hook
# cannot see the base branch of a pull request that does not exist yet.
PROTECTED_BRANCHES="master main development"

is_protected() {
  for protected in $PROTECTED_BRANCHES; do
    [ "$1" = "$protected" ] && return 0
  done
  return 1
}
