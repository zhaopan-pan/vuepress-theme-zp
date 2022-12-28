import type { Page, Theme } from '@vuepress/core'
import { fs, getDirname, path } from '@vuepress/utils'
import type { DefaultThemePageData, ZpThemeOptions } from '../shared/index.js'
import { assignDefaultLocaleOptions } from './utils/index.js'
import getPlugins from './config/plugin/index.js'
import createAlias from './config/alias.js'

const __dirname = getDirname(import.meta.url)

const getDirAlias = (dir: string): [string, string][] =>
  fs
    .readdirSync(path.resolve(path.resolve(__dirname, '../client'), dir))
    .filter(
      (file) =>
        // js files
        file.endsWith('.js') ||
        // folder
        !file.includes('.') ||
        file.endsWith('.vue')
    )
    .map<[string, string]>((file) => {
      console.log({ file })
      return [
        `@theme-zp-client/${dir}/${file.replace(/\.js$/, '')}`,
        path.resolve(path.resolve(__dirname, '../client'), dir, file),
      ]
    })

const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(
    path.resolve(path.resolve(__dirname, '../client'), entry, 'index.js')
  )
    ? [
        `@theme-zp-client/${entry}/index.js`,
        path.resolve(path.resolve(__dirname, '../client'), entry, 'index.js'),
      ]
    : null

export const zpTheme = ({
  themePlugins = {},
  ...localeOptions
}: ZpThemeOptions): Theme => {
  assignDefaultLocaleOptions(localeOptions)
  return {
    name: 'vuepress-theme-zp',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

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
