/**
 * blog 配置信息
 *
 * @interface BlogLocaleInfo
 */
export interface BlogLocaleInfo {
  /**
   * blogger name
   */
  name?: string

  /**
   * blogger avatar
   */
  avatar?: string

  /**
   * blogger 描述
   */
  description: string

  /**
   * Home top background img
   */
  homeTopBg?: string

  /**
   * external link list
   */
  externalLinkList?: { icon: string; text: string; url: string }[]
}
