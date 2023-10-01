/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */

import process from 'node:process'
import { type AddressInfo } from 'node:net'
import type { CliOptions, Manifest, NpmScript, StacksError, SyncSubprocess } from '@stacksjs/types'
import { Action } from '@stacksjs/types'
import { frameworkPath, projectPath } from '@stacksjs/path'
import { parse } from 'yaml'
import { runAction } from '@stacksjs/actions'
import { italic, log, runCommand } from '@stacksjs/cli'
import * as storage from '@stacksjs/storage'
import type { Result } from '@stacksjs/error-handling'
import { err, ok } from '@stacksjs/error-handling'
import { semver } from './versions'
import ui from '~/config/ui'
import app from '~/config/app'

export async function packageManager() {
  const { packageManager } = await storage.readPackageJson(frameworkPath('package.json'))
  return packageManager
}

export async function initProject(): Promise<Result<SyncSubprocess, StacksError>> {
  if (app.env !== 'production')
    log.info('Project not yet initialized, generating application key...')
  else
    handleError('Please run `buddy key:generate` to generate an application key')

  const result = await runAction(Action.KeyGenerate, { cwd: projectPath() })

  if (result.isErr())
    return err(handleError(result.error))

  log.info('Application key generated.')

  return ok(result.value)
}

export async function ensureProjectIsInitialized() {
  if (storage.isFile(projectPath('.env')))
    return await isAppKeySet()

  // copy the .env.example file to .env
  if (storage.isFile(projectPath('.env.example')))
    await runCommand('cp .env.example .env', { cwd: projectPath() })
  else
    console.error('no .env.example file found')

  return await isAppKeySet()
}

export async function installIfVersionMismatch() {
  const requiredBunVersion = '0.8.1'
  const installedBunVersion = process.version

  if (!semver.satisfies(installedBunVersion, requiredBunVersion)) {
    log.warn(`Installed Bun version ${italic(installedBunVersion)} does not satisfy required version ${italic(requiredBunVersion)}. Adding it to your environment. One moment...`)
    await runCommand(`tea +bun.sh${requiredBunVersion} >/dev/null 2>&1`)
  }
}

export async function frameworkVersion(): Promise<string> {
  return (await storage.readPackageJson(frameworkPath('package.json'))).version
}

export async function isAppKeySet() {
  const env = await storage.readTextFile('.env', projectPath())
  const lines = env.data.split('\n')
  const appKey = lines.find(line => line.startsWith('APP_KEY='))

  return !!(appKey && appKey.length > 16)
}

/**
 * Determines the utilized reset preset.
 *
 * @url https://www.npmjs.com/package/@unocss/reset
 * @param preset
 */
export function determineResetPreset(preset?: string) {
  if (ui.reset)
    preset = ui.reset

  if (preset === 'tailwind')
    return ['import \'@unocss/reset/tailwind.css\'']

  if (preset === 'normalize')
    return ['import \'@unocss/reset/normalize.css\'']

  if (preset === 'sanitize')
    return ['import \'@unocss/reset/sanitize/sanitize.css\'', 'import \'@unocss/reset/sanitize/assets.css']

  if (preset === 'eric-meyer')
    return ['import \'@unocss/reset/eric-meyer.css\'']

  if (preset === 'antfu')
    return ['import \'@unocss/reset/antfu.css\'']

  return []
}

/**
 * Determines whether the specified value is a package manifest.
 */
export function isManifest(obj: any): obj is Manifest {
  return obj
    && typeof obj === 'object'
    && isOptionalString(obj.name)
    && isOptionalString(obj.version)
    && isOptionalString(obj.description)
}

/**
 * Determines whether the specified value is a string, null, or undefined.
 */
export function isOptionalString(value: any): value is string | undefined {
  const type = typeof value
  return value === null
    || type === 'undefined'
    || type === 'string'
}

export async function setEnvValue(key: string, value: string) {
  const file = await storage.readTextFile(projectPath('.env'))

  await storage.writeTextFile({
    path: projectPath('.env'),
    data: file.data.replace(/APP_KEY=/g, `APP_KEY=${value}`), // todo: do not hardcode the APP_KEY here and instead use the key parameter
  })
}

/**
 * Runs the specified NPM script in the package.json file.
 */
export async function runNpmScript(script: NpmScript, options?: CliOptions): Promise<Result<SyncSubprocess, StacksError>> {
  const { data: manifest } = await storage.readJsonFile('package.json', frameworkPath())

  if (isManifest(manifest) && hasScript(manifest, script)) // simple, yet effective check to see if the script exists
    return await runCommand(`bun --bun run ${script}`, options)

  return err(handleError(`The ${script} script does not exist in the package.json file.`))
}

/**
 * Determines whether the specified NPM script exists in the given manifest.
 */
export function hasScript(manifest: Manifest, script: NpmScript): boolean {
  const scripts = manifest.scripts as Record<NpmScript, string> | undefined

  if (scripts && typeof scripts === 'object')
    return Boolean(scripts[script])

  return false
}

export function parseYaml(content: any) {
  return parse(content)
}

/**
 * Determines the level of debugging.
 *
 * The debug level is determined by the following:
 * 1. The --verbose flag
 * 2. The debug property in the app configuration
 *
 * Currently, we don't support a custom debug level,
 * though, we would like to in the future.
 *
 * @param options
 */
export function determineDebugLevel(options?: CliOptions) {
  if (options?.verbose === true)
    return true

  return app.debug === true
}

export function isIpv6(address: AddressInfo): boolean {
  return address.family === 'IPv6'
  // in node >=18.0 <18.4 this was an integer value. This was changed in a minor version.
  // See: https://github.com/laravel/vite-plugin/issues/103

    // @ts-expect-error-next-line
    || address.family === 6
}

// export { SemVer } from 'semver'
export { dump as dumpYaml, load as loadYaml } from 'js-yaml'
