import { defineUserConfig } from 'vuepress'
import { themeConfig } from './config/index.js'
import ZpTheme from 'vuepress-theme-zp'

// todo 采用ejs模板变量注入的形式
// https://v2.vuepress.vuejs.org/zh/reference/bundler/vite.html#vite
// https://www.npmjs.com/package/vite-plugin-html
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
