import { defineUserConfig } from 'vuepress'
import ZpTheme from 'vuepress-theme-zp'

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
        text: 'Tag',
        link: '/tag/',
      },
      {
        text: 'about',
        link: '/posts/about',
      },
    ],
  }),
})
