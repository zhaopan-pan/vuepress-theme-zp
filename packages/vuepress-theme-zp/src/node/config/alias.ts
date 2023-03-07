import { fs, getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

const getDirAlias = (dir: string): [string, string][] =>
  fs
    .readdirSync(path.resolve(path.resolve(__dirname, '../../client'), dir))
    .filter(
      (file) =>
        // js files
        file.endsWith('.js') ||
        // folder
        !file.includes('.') ||
        // vue component
        file.endsWith('.vue')
    )
    .map<[string, string]>((file) => {
      return [
        `@theme-zp-client/${dir}/${file.replace(/\.js$/, '')}`,
        path.resolve(path.resolve(__dirname, '../../client'), dir, file),
      ]
    })

const getEntryAlias = (entry: string): [string, string] | null =>
  fs.existsSync(
    path.resolve(path.resolve(__dirname, '../../client'), entry, 'index.js')
  )
    ? [
        `@theme-zp-client/${entry}/index.js`,
        path.resolve(
          path.resolve(__dirname, '../../client'),
          entry,
          'index.js'
        ),
      ]
    : null

/**
 * 生成别名配置
 * @returns {'alias':path}
 */
export function createAlias(): Record<string, string> {
  const alias = Object.fromEntries([
    ...getDirAlias('components'),
    ...['composables', 'utils']
      .map(getEntryAlias)
      .filter<[string, string]>(
        (item): item is [string, string] => item !== null
      ),
  ])

  return alias
}
