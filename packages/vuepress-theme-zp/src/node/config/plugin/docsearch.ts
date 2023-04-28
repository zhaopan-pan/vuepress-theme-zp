import type { Plugin } from '@vuepress/core'
import type { DocsearchPluginOptions } from '@vuepress/plugin-docsearch'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default (opt: DocsearchPluginOptions): Plugin => docsearchPlugin(opt)
