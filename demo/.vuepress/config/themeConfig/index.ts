import path from 'path'
import type { ZpThemeOptions } from 'vuepress-theme-zp'
import cssStr from '../../styles/cssVar.js'
import { navbarZh } from '../navbar/index.js'
import { blogPlugin, commentPlugin, docsearchPlugin } from '../plugin/index.js'
import { sidebarZh } from '../sidebar/index.js'

export const themeConfig = (options?: ZpThemeOptions): ZpThemeOptions => ({
  ...options,
  blog: {
    name: '幻无',
    description: '',
    avatar: 'https://zhaopanpan.com/image/logo.png',
    // homeTopBg:
    //   'https://images.pexels.com/photos/1764702/pexels-photo-1764702.jpeg?auto=compress&cs=tinysrgb&w=1600',
    // 'https://images.pexels.com/photos/3695297/pexels-photo-3695297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    // homeText: '你可以回头,但不可以往回走,逆行是全责',
    externalLinkList: [
      {
        icon: 'https://ts4.cn.mm.bing.net/th?id=ODLS.fe916855-7a5a-4f44-b52e-1c5c31f0329d&w=24&h=24&o=6&pid=1.2',
        text: 'github',
        url: 'https://github.com/zhaopan-pan/vuepress-theme-zp',
      },
      {
        icon: 'https://ts4.cn.mm.bing.net/th?id=ODLS.fe916855-7a5a-4f44-b52e-1c5c31f0329d&w=24&h=24&o=6&pid=1.2',
        text: 'github',
        url: 'https://github.com/zhaopan-pan/vuepress-theme-zp',
      },
      {
        icon: 'https://ts4.cn.mm.bing.net/th?id=ODLS.fe916855-7a5a-4f44-b52e-1c5c31f0329d&w=24&h=24&o=6&pid=1.2',
        text: 'github',
        url: 'https://github.com/zhaopan-pan/vuepress-theme-zp',
      },
    ],
  },
  locales: {
    '/': {
      // navbar
      navbar: navbarZh,
      // sidebar
      sidebar: sidebarZh,
      // page meta
      editLinkText: '编辑此页面',
      lastUpdatedText: '最近更新时间',
      // 不展示提交者信息
      contributors: false,
      // 展示可编辑跳转
      editLink: true,
      // 仓库信息
      docsRepo: 'https://github.com/zhaopan-pan/vuepress-theme-zp',
      docsBranch: 'master',
      docsDir: 'demo',
    },
  },
  themePlugins: {
    blog: blogPlugin,
    comment: commentPlugin,
    search: docsearchPlugin,
    pwaOption: {
      pwa: {
        skipWaiting: false,
      },
      pwaPopup: {
        locales: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
      },
    },
  },
  cssVariableStr: cssStr,
  defaultArticleCover: 'https://s1.ax1x.com/2023/05/13/p96w2rR.jpg',
  templateBuild: path.resolve(__dirname, '../../templates/build.html'),
  footer: {
    nameLink: '/about',
    startYear: 2019,
    beian: {
      text: '备案号',
      link: 'https://beian.miit.gov.cn',
    },
  },
})
