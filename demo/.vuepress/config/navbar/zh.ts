import type { NavbarConfig } from 'vuepress-theme-zp'

export const navbarZh: NavbarConfig = [
  {
    text: '首页',
    link: '/',
    icon: { name: 'HomeOutlined', size: '1' },
  },
  {
    text: '分类',
    link: '/category/',
    children: [
      {
        text: 'back-end',
        link: '/category/back-end/',
      },
      { text: 'front', link: '/category/front/' },
      { text: 'language', link: '/category/language/' },
      { text: '源码', link: '/category/源码/' },
    ],
  },
  {
    text: 'Tag',
    link: '/tag/',
  },
  {
    text: '文档',
    children: [
      {
        text: 'sidebar',
        link: '/posts/document/sidebar',
      },
      {
        text: 'test',
        link: '/posts/document/test-code-group',
      },
    ],
  },
  {
    text: 'about',
    link: '/about',
  },
]
