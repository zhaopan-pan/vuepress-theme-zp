import type { IArticleItem } from '@vuepressSrc/shared/article.js'

/**
 * 获取当前页文章
 * @param list 文章列表
 * @param param1 分页信息
 * @returns
 */
export const useArticlesCurrentPage = (
  list: IArticleItem[] | undefined,
  { pageSize, pageNum }
): IArticleItem[] => {
  if (!list?.length) return []

  // 减1意思是从当前页开始截取
  let start = (pageNum - 1) * pageSize
  let end = pageNum * pageSize

  return list.slice(start, end)
}
