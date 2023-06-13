import type { Plugin } from '@vuepress/core'
import { pwaPlugin, type PwaPluginOptions } from '@vuepress/plugin-pwa'
import {
  pwaPopupPlugin,
  type PwaPopupPluginOptions,
} from '@vuepress/plugin-pwa-popup'

/**
 * 创建pwa应用
 * https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html
 * @returns Plugin
 */
export const pwa = (options: PwaPluginOptions, skipWaiting: boolean): Plugin =>
  pwaPlugin({ ...(options || {}), skipWaiting })

/**
 * 弹出手动刷新弹窗
 * https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html
 * 该插件必须和 pwa 插件 一起使用，并且 skipWaiting 配置项不能设置为 true
 * @returns Plugin
 */
export const pwaPopup = (options: PwaPopupPluginOptions): Plugin | [] =>
  pwaPopupPlugin(options)
