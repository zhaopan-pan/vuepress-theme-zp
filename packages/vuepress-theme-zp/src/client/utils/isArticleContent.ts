import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { useRoute } from 'vue-router'

/**
 * 是否是文章页
 * @returns boolean
 */
export const isArticleContent = (): boolean => {
  const route = useRoute()
  const frontmatter = usePageFrontmatter<IArticleInfo>()
  return !!(route.path.startsWith('/posts') && frontmatter.value.title)
}
