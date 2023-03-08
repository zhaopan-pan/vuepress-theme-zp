import type { DefaultThemePluginsOptions } from './plugin/index.js'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemeData,
  DefaultThemeLocaleData,
  BlogLocaleInfo,
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
}

export {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
  DefaultThemeData,
  DefaultThemeLocaleData,
}
