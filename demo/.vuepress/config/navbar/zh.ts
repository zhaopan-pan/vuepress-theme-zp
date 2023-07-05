import type { NavbarConfig } from 'vuepress-theme-zp'

export const navbarZh: NavbarConfig = [
  {
    text: '首页',
    link: '/',
    icon: { name: 'home-outline' },
  },
  {
    text: '分类',
    link: '/category/',
    icon: { name: 'iconamoon:category-light' },
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
    link: '/tag',
    icon: { name: 'akar-icons:tag' },
  },
  {
    text: '文档',
    icon: { name: 'solar:document-outline' },
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
    link: '/about.html',
    icon: { name: 'mdi:about-circle-outline' },
  },
]
