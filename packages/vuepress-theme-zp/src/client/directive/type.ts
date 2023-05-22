import type { DirectiveBinding } from 'vue'

export interface ToolDirectiveBinding extends DirectiveBinding {
  /**
   * 参数
   */
  value:
    | string
    | {
        /**
         * 展示箭头
         */
        displayArrow: boolean
        /**
         * 是否是全局
         */
        global: boolean
        /**
         * 文本
         */
        text: string
        /**
         * 主题配置
         */
        theme?: {
          /**
           * 出现位置
           */
          placement: 'top' | 'bottom' | 'left' | 'right'
          /**
           * 偏移方向
           */
          offset: 'top' | 'bottom' | 'left' | 'right'
        }
      }
  dir: DirectiveBinding['dir'] & {
    updateTooltip: (
      el: HTMLElement,
      obj: Pick<DirectiveBinding, 'value' | 'modifiers'>
    ) => void
  }
}
