import type { ResolvedSidebarItem } from '../index.js'

/**
 * 获取表层侧边栏数据
 * @param sidebarItems 侧边栏数据
 * @returns
 */
export const getFirstLayerSideBarData = (
  sidebarItems: ResolvedSidebarItem[]
) => {
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
