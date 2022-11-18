import { getDirname, path } from '@vuepress/utils'
import { Page, Theme } from 'vuepress';
import { defaultTheme, type DefaultThemeOptions } from '@vuepress/theme-default'
import { ZpThemePageData } from '../types/page.js';

const __dirname = getDirname(import.meta.url)

const zpTheme = (options: DefaultThemeOptions): Theme => {
    console.log(options);
    // 返回一个主题对象
    return {
        name: 'vuepress-theme-zp',
        // extends: defaultTheme(options),
        // 主题的客户端配置文件的路径
        clientConfigFile: path.resolve(__dirname, '../client/config.ts'),

        extendsPage: (page: Page<Partial<ZpThemePageData>>) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title
        },
        // 设置自定义 dev / build 模板
        // 如果没有指定模板，将会使用 `@vuepress/client` 提供的默认模板
        // templateBuild: path.resolve(__dirname, 'templates/build.html'),
        // templateDev: path.resolve(__dirname, 'templates/dev.html'),
        // 使用插件
        plugins: [
            // ...
        ],

        // 其他的插件 API 也都可用
    }
}

export default zpTheme;