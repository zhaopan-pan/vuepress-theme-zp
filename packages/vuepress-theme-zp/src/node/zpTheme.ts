import type { Page, Theme } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DefaultThemePageData, ZpThemeOptions } from '../shared/index.js'
import {
  createAlias,
  getPlugins,
  injectCssVarToTemplatesFile,
} from './config/index.js'
import { assignDefaultLocaleOptions } from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export const zpTheme = ({
  themePlugins = {},
  ...localeOptions
}: ZpThemeOptions): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  // 注入css变量,并返回新的临时文件地址
  const templatePaths = injectCssVarToTemplatesFile(
    {
      templateDev: path.resolve(__dirname, '../../templates/dev.html'),
      templateBuild:
        localeOptions.templateBuild ||
        path.resolve(__dirname, '../../templates/build.html'),
    },
    localeOptions.cssVariableStr
  )
  return {
    name: 'vuepress-theme-zp',

    ...templatePaths,

    alias: createAlias(),

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title
    },

    plugins: getPlugins({ themePlugins, ...localeOptions }),
  }
}
