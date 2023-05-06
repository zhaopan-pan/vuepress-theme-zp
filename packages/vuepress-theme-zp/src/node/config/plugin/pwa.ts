import type { Plugin } from '@vuepress/core'
import { pwaPlugin, PwaPluginOptions } from '@vuepress/plugin-pwa'

export default (options: PwaPluginOptions): Plugin => pwaPlugin(options)
