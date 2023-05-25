import type { SidebarConfig } from 'vuepress-theme-zp'

export const sidebarZh: SidebarConfig = {
  '/': [
    {
      text: 'js',
      collapsible: true,
      children: [
        '/posts/document/sidebar.md',
        '/posts/document/test-code-group.md',
      ],
    },
  ],
}
