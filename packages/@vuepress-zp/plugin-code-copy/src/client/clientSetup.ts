import { onMounted } from 'vue'
import { useCopyBtn } from './composables/useCopyBtn.js'

export default function clientSetup(): void {
  const { initCopyBtn } = useCopyBtn()

  onMounted(() => {
    setTimeout(() => {
      initCopyBtn()
    }, 500)
  })
}
