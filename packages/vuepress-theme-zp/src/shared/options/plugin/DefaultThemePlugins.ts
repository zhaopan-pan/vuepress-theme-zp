import type { DocsearchPluginOptions } from '@vuepress/plugin-docsearch'
import type { BlogOptions } from 'vuepress-plugin-blog2'
import type { CommentOptions } from 'vuepress-plugin-comment2'

export interface DefaultThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean

  /**
   * Enable @vuepress/plugin-back-to-top or not
   */
  backToTop?: boolean

  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean
    warning?: boolean
    danger?: boolean
    details?: boolean
    codeGroup?: boolean
    codeGroupItem?: boolean
  }

  /**
   * Enable @vuepress/plugin-external-link-icon or not
   */
  externalLinkIcon?: boolean

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean

  /**
   * Enable @vuepress/plugin-medium-zoom or not
   */
  mediumZoom?: boolean

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean

  /**
   * vuepress-plugin-blog2配置，
   * 作用：分类、标签等页面和元数据的生成
   */
  blog?: BlogOptions

  /**
   * 评论插件配置
   */
  comment?: CommentOptions

  /**
   * 搜索插件配置
   */
  search?: DocsearchPluginOptions
}
