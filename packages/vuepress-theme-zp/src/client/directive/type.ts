import type { DirectiveBinding } from 'vue'

export interface ToolDirectiveBinding extends DirectiveBinding {
  /**
   * 参数
   */
  value:
    | string
    | {
        displayArrow: boolean
        global: boolean
        text: string
        theme?: {
          placement: 'top' | 'bottom' | 'left' | 'right'
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
