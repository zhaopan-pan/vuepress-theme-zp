import type { IArticleItem } from '@theme-zp-src/shared/article.js'

// 获取时间的毫秒
const getTimeToSecond = (date: string) => {
  return new Date(date).getTime()
}

// 补零
const addZero = (d: string) =>
  d
    .split('-')
    .map((n) => (n.length === 1 ? `0${n}` : n))
    .join('-')

// 文章根据时间排序
const dateSortByTime = (data?: IArticleItem[]) => {
  return data && data.length > 0
    ? data.sort((a, b) => {
        return (
          getTimeToSecond(addZero(b.info.date)) -
          getTimeToSecond(addZero(a.info.date))
        )
      })
    : []
}

export { dateSortByTime, getTimeToSecond }
