import { DefaultThemePluginsOptions } from '@theme-zp-src/shared/options/plugin/index.js'
import type { Plugin } from '@vuepress/core'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'

export default (options: DefaultThemePluginsOptions['pwaOption']): Plugin[] =>
  [
    pwaPlugin({ ...(options?.pwa || {}), skipWaiting: !options?.pwaPopup }),
  ].concat(
    // 该插件必须和 pwa 插件 一起使用，并且 skipWaiting 配置项不能设置为 true
    !options?.pwa.skipWaiting ? pwaPopupPlugin(options?.pwaPopup) : []
  )
