import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import type { ZpThemeOptions } from '../../shared/index.js'

export const useThemeData = (): ThemeDataRef<ZpThemeOptions> =>
  _useThemeData<ZpThemeOptions>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<ZpThemeOptions> =>
  _useThemeLocaleData<ZpThemeOptions>()
