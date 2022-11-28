import { blogPlugin } from 'vuepress-plugin-blog2'

export default () =>
  blogPlugin({
    hotReload: true,
    metaScope: 'blogInfo',
    // only files under posts are articles
    filter: ({ filePathRelative }) => {
      console.log({ filePathRelative })
      return (filePathRelative || '').startsWith('posts/')
    },
    getInfo: ({ frontmatter, title }) => ({
      title,
      author: frontmatter.author || '',
      date: frontmatter.date || null,
      category: frontmatter.category || [],
      tag: frontmatter.tag || [],
    }),
    category: [
      {
        key: 'tag',
        // @ts-ignore
        getter: ({ frontmatter }) => frontmatter?.tag || [],
        path: '/tag/',
        layout: 'Tag',
        frontmatter: () => ({ title: 'Tags', sidebar: false }),
        itemLayout: 'Tag',
        itemPath: '/tag/:name/',
        itemFrontmatter: (name) => ({ title: `${name}`, sidebar: false }),
      },
    ],
    type: [
      {
        key: 'article',
        // remove archive articles
        filter: (page) => !page.frontmatter.archive,
        path: '/article/',
        layout: 'Article',
        frontmatter: () => ({ title: 'Articles', sidebar: false }),
        // sort pages with time and sticky
        sorter: (pageA, pageB) => {
          if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
            return (
              (pageB.frontmatter.sticky as number) -
              (pageA.frontmatter.sticky as number)
            )

          if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

          if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

          if (!pageB.frontmatter.date) return 1
          if (!pageA.frontmatter.date) return -1

          return (
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime()
          )
        },
      },
    ],
  })
