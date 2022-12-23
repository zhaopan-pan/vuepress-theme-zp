import tocPlugin from '@vuepress-zp/plugin-toc'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { containerPlugin } from '@vuepress/plugin-container'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import type { DefaultThemeOptions } from '../zpTheme.js'
import { resolveContainerPluginOptions } from '../utils/index.js'
import { blogPlugin } from 'vuepress-plugin-blog2'
import { commentPlugin } from 'vuepress-plugin-comment2'

export default ({
  themePlugins = {},
  ...localeOptions
}: DefaultThemeOptions) => {
  const { blog = {}, comment = {} } = themePlugins
  return [
    blogPlugin(blog),
    commentPlugin(comment),
    tocPlugin({}),
    // @vuepress/plugin-active-header-link
    themePlugins.activeHeaderLinks !== false
      ? activeHeaderLinksPlugin({
          headerLinkSelector: 'a.zp-toc-link',
          // should greater than page transition duration
          delay: 300,
        })
      : [],

    // @vuepress/plugin-back-to-top
    themePlugins.backToTop !== false ? backToTopPlugin() : [],

    // @vuepress/plugin-container
    themePlugins.container?.tip !== false
      ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
      : [],
    themePlugins.container?.warning !== false
      ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'warning'))
      : [],
    themePlugins.container?.danger !== false
      ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'danger'))
      : [],
    themePlugins.container?.details !== false
      ? containerPlugin({
          type: 'details',
          before: (info) =>
            `<details class="custom-container details">${
              info ? `<summary>${info}</summary>` : ''
            }\n`,
          after: () => '</details>\n',
        })
      : [],
    themePlugins.container?.codeGroup !== false
      ? containerPlugin({
          type: 'code-group',
          before: () => `<CodeGroup>\n`,
          after: () => '</CodeGroup>\n',
        })
      : [],
    themePlugins.container?.codeGroupItem !== false
      ? containerPlugin({
          type: 'code-group-item',
          before: (info) => `<CodeGroupItem title="${info}">\n`,
          after: () => '</CodeGroupItem>\n',
        })
      : [],

    // @vuepress/plugin-external-link-icon
    themePlugins.externalLinkIcon !== false
      ? externalLinkIconPlugin({
          locales: Object.entries(localeOptions.locales || {}).reduce(
            (
              result: {
                [key: string]: { openInNewWindow: string | undefined }
              },
              [key, value]
            ) => {
              result[key] = {
                openInNewWindow:
                  value.openInNewWindow ?? localeOptions.openInNewWindow,
              }
              return result
            },
            {}
          ),
        })
      : [],

    // @vuepress/plugin-git
    themePlugins.git !== false
      ? gitPlugin({
          createdTime: false,
          updatedTime: localeOptions.lastUpdated !== false,
          contributors: localeOptions.contributors !== false,
        })
      : [],

    // @vuepress/plugin-medium-zoom
    themePlugins.mediumZoom !== false
      ? mediumZoomPlugin({
          selector:
            '.theme-default-content > img, .theme-default-content :not(a) > img',
          zoomOptions: {},
          // should greater than page transition duration
          delay: 300,
        })
      : [],

    // @vuepress/plugin-nprogress
    themePlugins.nprogress !== false ? nprogressPlugin() : [],

    // @vuepress/plugin-palette
    palettePlugin({ preset: 'sass' }),

    // @vuepress/plugin-prismjs
    themePlugins.prismjs !== false ? prismjsPlugin() : [],

    // @vuepress/plugin-theme-data
    themeDataPlugin({ themeData: localeOptions }),
  ]
}