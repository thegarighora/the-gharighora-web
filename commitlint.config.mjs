/**
 * Conventional Commits, enforced by the `commit-msg` hook and again in CI.
 *
 * Format: <type>(<optional-scope>): <subject>
 *   feat(booking): block commission-owing drivers from accepting rides
 *
 * The subject is imperative, lower-case and carries no trailing period.
 * Anything longer than one line belongs in the body, after a blank line.
 */
const configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // user-facing capability
        'fix', // bug fix
        'perf', // performance only, no behaviour change
        'refactor', // internal restructure, no behaviour change
        'style', // formatting only
        'docs', // documentation only
        'test', // tests only
        'build', // build system, dependencies, native config
        'ci', // workflows and hooks
        'chore', // housekeeping that fits nowhere above
        'revert', // reverts an earlier commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // Warnings, so wrapped prose and long URLs in trailers never fail a commit.
    'body-max-line-length': [1, 'always', 200],
    'footer-max-line-length': [1, 'always', 200],
  },
};

export default configuration;
