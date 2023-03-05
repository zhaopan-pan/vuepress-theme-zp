import type { NavbarConfig } from 'vuepress-theme-zp'

export const navbarZh: NavbarConfig = [
  {
    text: '首页',
    link: '/',
  },
  {
    text: 'Category',
    link: '/category/',
    children: [
      { text: 'back-end', link: '/category/back-end/' },
      { text: 'front', link: '/category/front/' },
    ],
  },
  {
    text: 'Tag',
    link: '/tag/',
  },
  {
    text: 'about',
    link: '/about',
  },
  // {
  //   text: 'series',
  //   link: '/posts/series-demo',
  // },
]
