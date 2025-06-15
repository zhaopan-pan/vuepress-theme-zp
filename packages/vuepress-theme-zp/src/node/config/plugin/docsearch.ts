import type { Plugin } from '@vuepress/core'
import { docsearchPlugin,type DocSearchPluginOptions } from '@vuepress/plugin-docsearch'

export default (opt: DocSearchPluginOptions): Plugin => docsearchPlugin(opt)
