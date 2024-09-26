import { intro, outro } from '../build/src'
import { dts } from 'bun-plugin-dts-auto'

const { startTime } = await intro({
  dir: import.meta.dir,
})

const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  format: 'esm',
  sourcemap: 'linked',
  minify: true,
  target: 'bun',
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
