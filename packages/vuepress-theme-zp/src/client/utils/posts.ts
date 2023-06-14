import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { useRoute } from 'vue-router'

/**
 * 是否来自posts
 * @returns boolean
 */
export const isFormPosts = (): boolean => {
  const route = useRoute()
  return !!route.path.startsWith('/posts')
}

/**
 * 是否是文章页
 * @returns boolean
 */
export const isArticleContent = (): boolean => {
  const frontmatter = usePageFrontmatter<IArticleInfo>()
  return !!(isFormPosts() && frontmatter.value.title)
}
