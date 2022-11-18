import type { GitPluginPageData } from '@vuepress/plugin-git'

export interface ZpThemePageData extends GitPluginPageData {
    filePathRelative: string | null
    logo?: string
    password?: string | Array<string>
}