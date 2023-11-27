import { path as p } from '@stacksjs/path'
// @ts-expect-error missing types - somehow, @stacksjs/vite-plugin-vue-layouts does not work
import Layouts from 'vite-plugin-vue-layouts'
// @ts-expect-error missing types - somehow, @stacksjs/vite-plugin-vue-layouts does not work
import type { UserOptions as LayoutOptions } from 'vite-plugin-vue-layouts'

export function layouts(options?: LayoutOptions, isMain = true) {
  if (! isMain) {
    return Layouts(options)
  }

  return Layouts({
    layoutsDir: p.resourcesPath('layouts'),
    defaultLayout: p.resourcesPath('layouts/default.vue'),
    exclude: [
      p.resourcesPath('layouts/mails'),
    ],
    ...options,
  })
}
