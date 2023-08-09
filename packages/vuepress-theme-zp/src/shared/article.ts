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
  /**
   * 分类
   * @example ['vue', 'vite']
   */
  category: string[]
  /**
   * 是否是readme
   */
  readme?: boolean
  /**
   * 是否显示摘要
   */
  excerpt?: string
  /**
   * 文章封面
   */
  cover?: string
  /**
   * 只在移动端显示的文章封面
   */
  mobileCover?: string
  /**
   * 文章名称
   */
  title?: string
}

export type IArticleItem = Article<IArticleInfo>
