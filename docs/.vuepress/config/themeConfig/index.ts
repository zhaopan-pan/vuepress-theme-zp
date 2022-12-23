import ZpTheme, { DefaultThemeOptions } from 'vuepress-theme-zp'
import { sidebarZh } from '../sidebar/index.js'
import { navbarZh } from '../navbar/index.js'
import { blogPlugin, commentPlugin } from '../plugin/index.js'

export const themeConfig = (options?: DefaultThemeOptions) =>
  ZpTheme({
    ...options,
    // 默认主题配置
    // navbar: navbarZh,
    // sidebar: sidebarZh,
    // theme-level locales config
    homeTopBg:
      'https://images.pexels.com/photos/1764702/pexels-photo-1764702.jpeg?auto=compress&cs=tinysrgb&w=1600',
    // 'https://images.pexels.com/photos/3695297/pexels-photo-3695297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
    themePlugins: {
      blog: blogPlugin,
      comment: commentPlugin,
    },
  })
