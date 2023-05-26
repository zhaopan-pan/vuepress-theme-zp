import { initCopyBtn } from '@vuepress-zp/plugin-code-copy/client'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * invokeTheCodePastePlugin
 */
export function useCodeCopy(): void {
  const route = useRoute()

  watch(
    () => route.path,
    () => {
      setTimeout(() => {
        initCopyBtn()
      }, 500)
    }
  )
}
