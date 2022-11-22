import { defineUserConfig } from 'vuepress'
import ZpTheme from 'vuepress-theme-zp'
// import ZpTheme from '../../packages/vuepress-theme-zp/lib/node/index.js'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， vp ！',
  description: '这是我的第一个 vp 站点',
  theme: ZpTheme({
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'about',
        link: '/docs/about',
      },
    ],
  }),
})
