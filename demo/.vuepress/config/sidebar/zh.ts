import type { SidebarConfig } from 'vuepress-theme-zp'

export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: 'js',
      collapsible: true,
      children: [
        '/posts/series-demo/sidebar.md',
        '/posts/series-demo/test-code-group.md',
      ],
    },
  ],
}
