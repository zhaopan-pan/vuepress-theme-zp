import { useRoute } from 'vue-router'
import type { ResolvedSidebarItem } from '@theme-zp-src/shared/index.js'


/**
 * 获取表层侧边栏数据
 * @param sidebarItems 侧边栏数据
 * @returns
 */
export const getFirstLayerSideBarData = (
  sidebarItems: ResolvedSidebarItem[]
): ResolvedSidebarItem[] => {
  if (!sidebarItems.length) return []
  const list: ResolvedSidebarItem[] = []
  sidebarItems.forEach((ele) => {
    const { children, ...rest } = ele
    list.push({
      ...rest,
      children:
        children?.map((item) => {
          const { children, ...rest } = item
          return {
            ...rest,
            children: [],
          }
        }) || [],
    })
  })
  return list
}

/**
 * 只有在md中中配置了sidebar: true 才会展示侧边栏
 * @returns boolean
 */
export const showSideBar = (sidebarItems: ResolvedSidebarItem[]): boolean => {
  const route = useRoute()

  return getFirstLayerSideBarData(sidebarItems)?.some((item) => {
    if (item.link === route.path) {
      return true
    }
    if (item?.children) {
      return item.children.some((c) => c.link === route.path)
    }
    return false
  })
}
