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
        text: 'doc-center',
        link: '/posts/document/doc-center',
      },
      {
        text: 'test-code-group',
        link: '/posts/document/test-code-group',
      },
    ],
  },
  {
    text: 'about',
    link: '/about.html',
    icon: { name: 'mdi:about-circle-outline' },
  },
  {
    text: '主题源码',
    link: 'https://github.com/zhaopan-pan/vuepress-theme-zp',
  },
]
