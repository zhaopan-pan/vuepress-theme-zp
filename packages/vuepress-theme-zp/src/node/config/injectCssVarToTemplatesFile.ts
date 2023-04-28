import { fs } from '@vuepress/utils'

// 临时目录名称
const tempDirName = '.temp'

/**
 * 获取临时文件地址
 * @param filePath filePath
 * @returns
 */
const getTempPath = (filePath: string): string => {
  const pathItems = filePath.split('/')
  pathItems.splice(pathItems.length - 1, 0, tempDirName)
  return pathItems.join('/')
}

/**
 * 注入css变量到模板文件
 */
export const injectCssVarToTemplatesFile = (
  templatePaths: Record<string, string>,
  cssStr?: string
): object | null => {
  if (!templatePaths || !Object.keys(templatePaths).length) return {}
  if (!cssStr) {
    cssStr = ':root {--c-theme: #3eaf7c !important;}'
  }
  try {
    // 清空临时目录
    const devTempPathArr = getTempPath(Object.values(templatePaths)[0]).split(
      '/'
    )
    fs.emptyDirSync(
      devTempPathArr.splice(0, devTempPathArr.length - 1).join('/')
    )

    // 临时模板文件地址
    const tempFilePathObj: Record<string, string> = {}
    for (const item in templatePaths) {
      const filePath = templatePaths[item]
      if (!filePath) continue
      const devTemplate = fs.readFileSync(filePath).toString()
      const html = devTemplate.replace(
        '<!--vuepress-theme-zp-css-variable-->',
        `<style data-id='zp'>${cssStr}</style>`
      )
      // 修改临时文件，如果更改源文件二次修改无法匹配
      const tempFilePath = getTempPath(filePath)
      tempFilePathObj[item] = tempFilePath
      fs.outputFileSync(tempFilePath, html)
    }

    return tempFilePathObj
  } catch (err) {
    console.error('[injectCssVarToTemplatesFile]-error:', err)
    return templatePaths
  }
}
