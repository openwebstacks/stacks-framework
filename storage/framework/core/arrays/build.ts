import dts from 'bun-plugin-dts-auto'
import { log } from '@stacksjs/logging'

log.info(`Building @stacksjs/arrays...`)

await Bun.build({
  entrypoints: [
    './src/index.ts',
  ],

  outdir: './dist',

  format: 'esm',
  target: 'bun',

  external: [
    '@stacksjs/utils',
  ],

  plugins: [
    dts({
      withSourceMap: true, // optional
    }),
  ],
})

log.success(`Built @stacksjs/arrays`)