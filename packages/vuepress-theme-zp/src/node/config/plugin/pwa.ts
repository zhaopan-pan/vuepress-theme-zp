import type { Plugin } from '@vuepress/core'
import { pwaPlugin, type PwaPluginOptions } from '@vuepress/plugin-pwa'

/**
 * 创建pwa应用
 * @docs https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html
 * @returns Plugin
 */
export const createPwa = (options: PwaPluginOptions = {}): Plugin =>
  pwaPlugin(options)
