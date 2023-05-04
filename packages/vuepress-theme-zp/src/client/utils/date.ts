import type { IArticleItem } from '@theme-zp-src/shared/article.js'

/**
 * 获取时间的毫秒
 * @param date
 * @returns
 */
const getTimeToSecond = (date: string): number => {
  return new Date(date).getTime()
}

/**
 * 年月日格式化
 * @param date string
 * @returns string
 */
const formatDate = (date: string): string => {
  if (!date || !date.includes('-')) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-
  ${String(d.getMonth() + 1).padStart(2, '0')}-
  ${String(d.getDate()).padStart(2, '0')}`
}

/**
 * 根据时间排序文章
 * @param data
 * @returns
 */
const dateSortByTime = (data?: IArticleItem[]): IArticleItem[] => {
  return data && data.length > 0
    ? data.sort((a, b) => {
        return getTimeToSecond(b.info.date) - getTimeToSecond(a.info.date)
      })
    : []
}

export { dateSortByTime, getTimeToSecond, formatDate }
