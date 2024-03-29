import type { DefaultThemePluginsOptions } from './plugin/index.js'
import type {
  BlogLocaleInfo,
  DefaultThemeData,
  DefaultThemeLocaleData,
  DefaultThemeLocaleOptions,
} from './theme/index.js'

export interface ZpThemeOptions extends DefaultThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: DefaultThemePluginsOptions

  /**
   * blog 相关配置项
   */
  blog: BlogLocaleInfo

  /**
   * css变量字符串
   */
  cssVariableStr?: string

  /**
   * 生产模板
   */
  templateBuild?: string
  /**
   * footer 自定义配置
   */
  footer?: {
    nameLink?: string
    startYear?: number
    beian?: {
      text: string
      link: string
    }
    copyrightInfo?: string
  }
  /**
   * 默认文章封面图片地址
   */
  defaultArticleCover?: string
}

export type {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
  DefaultThemeData,
  DefaultThemeLocaleData,
}
