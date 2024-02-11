import { log, runCommand } from '../cli/src'

const result = await runCommand('bun build ./src/index.ts --outdir dist --format esm --external @stacksjs/types --external @stacksjs/cli --external @stacksjs/path --external consola --target bun', {
  cwd: import.meta.dir,
})

if (result.isErr())
  log.error(result.error)
