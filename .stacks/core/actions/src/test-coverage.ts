import { NpmScript } from '@stacksjs/types'
import { runCommand } from '@stacksjs/cli'
import { frameworkPath } from '@stacksjs/path'

await runCommand(NpmScript.TestCoverage, { debug: true, cwd: frameworkPath() })
