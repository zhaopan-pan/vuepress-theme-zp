import { defineUserConfig, viteBundler } from 'vuepress'
import ZpTheme from 'vuepress-theme-zp'
import { themeConfig } from './config/index.js'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'vp ！',
  description: '这是我的第一个 vp 站点',
  theme: ZpTheme(themeConfig()),
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'http://p2.music.126.net/s-RX4DnzNQdcOM0pRNrVxQ==/109951166556851964.jpg?param=177y177',
      },
    ],
  ],
  markdown: {
    headers: {
      // 侧边栏<h1+>深度
      level: [2, 3, 4],
    },
  },
  bundler: viteBundler({
    viteOptions: {
      server: {
        // 图床代理
        proxy: {
          '/picture-beb': {
            target: 'https://s1.ax1x.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/picture-beb/, ''),
          },
        },
      },
    },
  }),
})
