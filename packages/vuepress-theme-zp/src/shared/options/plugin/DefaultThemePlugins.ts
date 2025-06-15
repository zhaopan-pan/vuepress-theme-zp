import type { DocSearchPluginOptions } from '@vuepress/plugin-docsearch'
import type { PwaPluginOptions } from '@vuepress/plugin-pwa'
import type { PwaPopupPluginOptions } from '@vuepress/plugin-pwa-popup'
import type { BlogPluginOptions } from '@vuepress/plugin-blog'
import type { CommentPluginOptions } from '@vuepress/plugin-comment'

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
  blog?: BlogPluginOptions

  /**
   * 评论插件配置
   */
  comment?: CommentPluginOptions

  /**
   * 搜索插件配置
   */
  search?: DocSearchPluginOptions

  /**
   * pwa相关插件配置
   * pwa: https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html
   * pwaPopup: https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html
   */
  pwaOption?: { pwa: PwaPluginOptions; pwaPopup: PwaPopupPluginOptions }
}
