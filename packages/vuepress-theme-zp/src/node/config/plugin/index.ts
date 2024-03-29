import type { ZpThemeOptions } from '@theme-zp-src/shared/index.js'
import type { PluginConfig } from '@vuepress/core'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { containerPlugin } from '@vuepress/plugin-container'
import { gitPlugin } from '@vuepress/plugin-git'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { palettePlugin } from '@vuepress/plugin-palette'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { themeDataPlugin } from '@vuepress/plugin-theme-data'
import { codeCopyPlugin } from '@vuepress-zp/plugin-code-copy'
import { tocPlugin } from '@vuepress-zp/plugin-toc'
import { blogPlugin } from 'vuepress-plugin-blog2'
import { commentPlugin } from 'vuepress-plugin-comment2'
import { resolveContainerPluginOptions } from '../../utils/index.js'
import docsearch from './docsearch.js'
import { createPwa, pwaPopup } from './pwa.js'

export const getPlugins = ({
  themePlugins = {},
  ...localeOptions
}: ZpThemeOptions): PluginConfig => {
  const { blog = {}, comment = {}, search, pwaOption } = themePlugins
  return [
    blogPlugin(blog),
    tocPlugin({}),
    codeCopyPlugin(),
    comment ? commentPlugin(comment) : [],
    search ? docsearch(search) : [],

    pwaOption ? createPwa(pwaOption?.pwa) : [],
    pwaOption && !pwaOption?.pwa.skipWaiting
      ? pwaPopup(pwaOption?.pwaPopup)
      : [],

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
