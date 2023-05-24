import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import type { BlogCategoryData } from 'vuepress-plugin-blog2/client'

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
  const articles = useBlogCategory<IArticleInfo>(
    'category'
  ) as unknown as CategoryRef

  provide(categorySymbol, articles)
}
