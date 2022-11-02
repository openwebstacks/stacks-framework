import { consola, spawn } from '@stacksjs/cli'
import { projectPath } from '@stacksjs/path'
import { type CleanOptions } from '@stacksjs/types'
import { debugLevel } from '@stacksjs/config'

export async function invoke(options?: CleanOptions) {
  consola.info('Running clean command...')
  await spawn.async('rimraf ./pnpm-lock.yaml ./node_modules/ ./**/node_modules', { stdio: debugLevel(options), cwd: projectPath() })
  consola.success('Cleaning completed.')
}

/**
 * An alias of the invoke method.
 * @param options
 * @returns
 */
export async function clean(options: CleanOptions) {
  return invoke(options)
}
