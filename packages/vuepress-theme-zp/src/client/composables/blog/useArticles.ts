import { inject, provide } from 'vue'
import { useBlogType } from 'vuepress-plugin-blog2/client'

import type { ComputedRef, InjectionKey } from 'vue'
import type { BlogTypeData } from 'vuepress-plugin-blog2/client'
import type { IArticleInfo } from '@vuepressSrc/shared/index.js'

export type ArticlesRef = ComputedRef<BlogTypeData<IArticleInfo>>

export const articlesSymbol: InjectionKey<ArticlesRef> = Symbol.for('articles')

/**
 * Inject Articles
 */
export const useArticles = (): ArticlesRef => {
  const articles = inject(articlesSymbol)

  if (!articles) {
    throw new Error('useArticles() is called without provider.')
  }

  return articles
}

export const setupArticles = (): void => {
  const articles = useBlogType<IArticleInfo>('home')

  provide(articlesSymbol, articles)
}
