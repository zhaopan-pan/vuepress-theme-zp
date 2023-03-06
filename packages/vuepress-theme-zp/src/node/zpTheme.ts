import type { Page, Theme } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { DefaultThemePageData, ZpThemeOptions } from '../shared/index.js'
import { assignDefaultLocaleOptions } from './utils/index.js'
import getPlugins from './config/plugin/index.js'
import createAlias from './config/alias.js'

const __dirname = getDirname(import.meta.url)

export const zpTheme = ({
  themePlugins = {},
  ...localeOptions
}: ZpThemeOptions): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  return {
    name: 'vuepress-theme-zp',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),
    templateDev: path.resolve(__dirname, '../../templates/dev.html'),

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
