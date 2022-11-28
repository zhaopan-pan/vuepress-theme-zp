import ZpTheme, { DefaultThemeOptions } from 'vuepress-theme-zp'
import { sidebarZh } from '../sidebar/index.js'
import { navbarZh } from '../navbar/index.js'

export const themeConfig = (options?: DefaultThemeOptions) =>
  ZpTheme({
    ...options,
    sidebarDepth: 3,
    // 默认主题配置
    // navbar: navbarZh,
    // sidebar: sidebarZh,
    // theme-level locales config
    locales: {
      '/': {
        // navbar
        navbar: navbarZh,
        // sidebar
        sidebar: sidebarZh,
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },
    },
  })
