import type { Article } from 'vuepress-plugin-blog2/client'

export interface IArticleInfo extends Record<string, unknown> {
  /**
   * 作者
   */
  author: string
  /**
   * 日期
   * @example 2021-01-01
   */
  date: string
  /**
   * 标签
   * @example ['vue', 'vite']
   */
  tag: string[]
  category: string[]
  readme?: boolean
  excerpt?: string
  cover?: string
  mobileCover?: string
  title?: string
  description?: string
}

export type IArticleItem = Article<IArticleInfo>
