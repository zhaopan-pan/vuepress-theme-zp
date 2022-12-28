import { inject, provide } from 'vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'

import type { ComputedRef, InjectionKey } from 'vue'
import type { BlogCategoryData } from 'vuepress-plugin-blog2/client'
import type { IArticleInfo } from '@theme-zp-src/shared/index.js'

export type CategoryRef = ComputedRef<BlogCategoryData<IArticleInfo>>

export const categorySymbol: InjectionKey<CategoryRef> = Symbol.for('category')

/**
 * Inject Category
 */
export const useCategory = (): CategoryRef => {
  const articles = inject(categorySymbol)

  if (!articles) {
    throw new Error('useArticles() is called without provider.')
  }

  return articles
}

export const setupCategory = (): void => {
  const articles = useBlogCategory<IArticleInfo>('category')

  provide(categorySymbol, articles)
}
