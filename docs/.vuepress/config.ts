import { defineUserConfig } from 'vuepress'
import { themeConfig } from './config/index.js'
import ZpTheme from 'vuepress-theme-zp'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'vp ！',
  description: '这是我的第一个 vp 站点',
  theme: ZpTheme(themeConfig()),
  markdown: {
    headers: {
      // 侧边栏<h1+>深度
      level: [2, 3],
    },
  },
})
