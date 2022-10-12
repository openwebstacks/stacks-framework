interface Hooks {
  'applypatch-msg'?: string
  'pre-applypatch'?: string
  'post-applypatch'?: string
  'pre-commit'?: string
  'pre-merge-commit'?: string
  'prepare-commit-msg'?: string
  'commit-msg'?: string
  'post-commit'?: string
  'pre-rebase'?: string
  'post-checkout'?: string
  'post-merge'?: string
  'pre-push'?: string
  'pre-receive'?: string
  'update'?: string
  'proc-receive'?: string
  'post-receive'?: string
  'post-update'?: string
  'reference-transaction'?: string
  'push-to-checkout'?: string
  'pre-auto-gc'?: string
  'post-rewrite'?: string
  'sendemail-validate'?: string
  'fsmonitor-watchman'?: string
  'p4-changelist'?: string
  'p4-prepare-changelist'?: string
  'p4-post-changelist'?: string
  'p4-pre-submit'?: string
  'post-index-change'?: string
}

export interface GitHooks extends Hooks {}

export interface GitOptions {
  /**
   * The git hooks to use.
   * @default object
   * @see https://git-scm.com/docs/githooks
   * @example
   * hooks: {
   *  'pre-commit': 'lint-staged',
   * }
   */
  hooks: GitHooks

  /**
   * The git commit scopes to use.
   * @default array
   * @example
   * scopes: [
   *   '', 'ci', 'core', 'config', 'deps', 'cli', 'docs', 'dx',
   *   'example', 'release', 'readme', 'build', 'scripts', 'test',
   * ]
   * @see https://stacksjs.dev/docs/git/scopes
   */
  scopes: string[]
}
