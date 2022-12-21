import type { Page, Theme } from '@vuepress/core'
import { fs, getDirname, path } from '@vuepress/utils'
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePageData,
  DefaultThemePluginsOptions,
} from '../shared/index.js'
import { assignDefaultLocaleOptions } from './utils/index.js'
import type { BlogOptions } from 'vuepress-plugin-blog2'
import getPlugins from './plugin/index.js'
import type { CommentOptions } from 'vuepress-plugin-comment2'

const __dirname = getDirname(import.meta.url)

export interface DefaultThemeOptions extends DefaultThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: DefaultThemePluginsOptions
}

export const zpTheme = ({
  themePlugins = {},
  ...localeOptions
}: DefaultThemeOptions): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  return {
    name: 'vuepress-theme-zp',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file: string) => file.endsWith('.vue'))
          .map((file: any) => [
            `@zpTheme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ])
      ),
    },

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
