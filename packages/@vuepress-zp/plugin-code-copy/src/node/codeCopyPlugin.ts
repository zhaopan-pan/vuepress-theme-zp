import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import type { CodeCopyPropsOptions } from '../shared/index.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress-zp/plugin-code-copy
 */
export interface CodeCopyPluginOptions {
  /**
   * Specify the name of the Copy component
   *
   * @default 'CodeCopy'
   */
  componentName?: string

  /**
   * Override the default values of the `options` prop of the Copy component
   */
  defaultPropsOptions?: Partial<CodeCopyPropsOptions>
}

export const codeCopyPlugin = ({
  componentName = 'CodeCopy',
  defaultPropsOptions = {},
}: CodeCopyPluginOptions = {}): Plugin => ({
  name: '@vuepress-zp/plugin-code-copy',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __CODE_COPY_COMPONENT_NAME__: componentName,
    __CODE_COPY_DEFAULT_PROPS_OPTIONS__: defaultPropsOptions,
  },
})
