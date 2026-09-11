This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Branching, commits and CI

Work moves in one direction, and nothing reaches a protected branch except through
a pull request:

```
feat/my-thing  ──PR──>  development  ──PR──>  master
```

`master` accepts a pull request **only** from `development`. One opened straight
from a feature branch is rejected by CI, so this is a rule rather than an
understanding.

### Day to day

```bash
git switch development && git pull
git switch -c feat/fare-breakdown        # <type>/<kebab-case-description>

# ...work...

git commit -m "feat(booking): show the fare breakdown"
git push -u origin feat/fare-breakdown   # then open a PR into development
```

Releasing is the same move one level up: open a pull request from `development`
into `master`.

### Commit messages

[Conventional Commits](https://www.conventionalcommits.org/), enforced by the
`commit-msg` hook as you commit and re-checked against every commit on a pull
request:

```
<type>(<optional scope>): <subject>
```

| Part | Rule |
| --- | --- |
| `type` | One of `feat` `fix` `perf` `refactor` `style` `docs` `test` `build` `ci` `chore` `revert` |
| scope | Optional, kebab-case: `(booking)`, `(auth)`, `(driver-profile)` |
| subject | Imperative, lower-case, no trailing period. Whole header at most 100 characters |

```text
feat(booking): block commission-owing drivers from accepting rides   ✓
fix(auth): stop refreshing the token on a 401 from the login call    ✓
docs: explain the settlement rule                                   ✓

Updated stuff.                                   ✗  no type, capitalised, full stop
update: tweak the header                         ✗  "update" is not a type
feat: Add Fare Breakdown.                        ✗  capitals, full stop
```

A breaking change takes `!` before the colon and a `BREAKING CHANGE:` footer
saying what to do instead. Anything longer than the subject goes in the body,
after a blank line. `git commit` opens on a reminder of all this, from
`.gitmessage`.

The pull request title follows the same rule, because a squash merge takes its
commit message from the title.

### What runs, and when

| Check | Trigger | What it does |
| --- | --- | --- |
| `pre-commit` | `git commit` | Refuses a commit on `master`, `main` or `development`, then lints and formats the staged files |
| `commit-msg` | `git commit` | Rejects a message that is not a Conventional Commit |
| `pre-push` | `git push` | Refuses a push to a protected branch, then runs `yarn validate` |
| `typecheck` | pull request, push | `tsc --noEmit` |
| `lint` | pull request, push | ESLint |
| `build` | pull request, push | `next build`, against placeholder public env vars |
| `commits` | pull request | Re-runs commitlint over every commit on the branch, so a `--no-verify` commit does not slip through |
| `branch-policy` | pull request | Rejects a pull request into `master` from anything other than `development` |
| `pr-title` | pull request | Rejects a pull request title that is not a Conventional Commit |

`yarn validate` is exactly the code gate CI applies, so it is the thing to run
before pushing:

```bash
yarn validate   # typecheck && lint
```

### Setting it up

The hooks install themselves during `yarn install`, so a fresh clone needs
nothing extra. `yarn prepare` reinstalls them if they ever go missing, and they
are skipped automatically in CI, in a production install, and in a tree checked
out without `.git`.

Hooks are a convenience, and `git commit --no-verify` walks straight past them.
The enforcement that holds lives on GitHub, and has to be applied once per
repository by someone with admin rights:

```bash
bash .github/setup-branch-protection.sh --dry-run   # show what it would apply
bash .github/setup-branch-protection.sh             # apply it
```

That refuses direct pushes to `master` and `development` (admins included),
requires every check above to pass before a merge, and leaves squash-merge as the
only merge option. It needs the [GitHub CLI](https://cli.github.com/),
authenticated with `gh auth login`.
