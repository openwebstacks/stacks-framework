import { dts } from 'bun-plugin-dts-auto'
import { intro, outro } from '../build/src'

const { startTime } = await intro({
  dir: import.meta.dir,
})

const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  format: 'esm',
  target: 'bun',
  sourcemap: 'linked',
  minify: true,

  external: [
    '@stacksjs/cli',
    '@stacksjs/config',
    '@stacksjs/env',
    '@stacksjs/error-handling',
    '@stacksjs/types',
    '@stacksjs/strings',
    '@stacksjs/logging',
    '@stacksjs/path',
    '@stacksjs/error-handling',
    '@stacksjs/whois',
    '@stacksjs/arrays',
    'bun',
  ],
  plugins: [
    // dts({
    //   root: './src',
    //   outdir: './dist',
    // }),
  ],
})

await outro({
  dir: import.meta.dir,
  startTime,
  result,
})
