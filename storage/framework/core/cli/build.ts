import { intro, outro } from '../build/src'

const { startTime } = await intro({
  dir: import.meta.dir,
})

const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'bun',
  sourcemap: 'linked',
  minify: true,
  external: [
    '@stacksjs/config',
    '@stacksjs/types',
    '@stacksjs/tunnel',
    '@stacksjs/logging',
    '@stacksjs/utils',
    '@stacksjs/validation',
    '@stacksjs/error-handling',
    '@stacksjs/collections',
  ],
})

await outro({
  dir: import.meta.dir,
  startTime,
  result,
})
