import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import type { BlogCategoryData } from 'vuepress-plugin-blog2/client'

export type TagRef = ComputedRef<BlogCategoryData<IArticleInfo>>

export const tagSymbol: InjectionKey<TagRef> = Symbol.for('tag')

/**
 * Inject Tag
 */
export const useTag = (key?: string): TagRef => {
  const articles = inject(tagSymbol)

  if (!articles) {
    throw new Error('useTag() is called without provider.')
  }

  return key ? articles[key] : articles
}

export const setupTag = (): void => {
  const tag = useBlogCategory<IArticleInfo>('tag')

  provide(tagSymbol, tag)
}
