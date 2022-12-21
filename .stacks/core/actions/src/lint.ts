import { runCommand } from '@stacksjs/cli'
import { frameworkPath } from '@stacksjs/path'
import { NpmScript } from '@stacksjs/types'

await runCommand(NpmScript.Lint, { cwd: frameworkPath(), debug: true })
