import { useCopyBtn } from '@vuepress-zp/plugin-code-copy/lib/client/composables/useCopyBtn'
import { toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useCodeCopy(): void {
  const route = useRoute()
  const { path } = toRefs(route)
  const { initCopyBtn } = useCopyBtn()

  watch(path, () => {
    setTimeout(() => {
      initCopyBtn()
    }, 500)
  })
}
