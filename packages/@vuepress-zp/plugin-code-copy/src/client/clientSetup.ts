import { onMounted } from 'vue'
import { useCopyBtn } from './composables/useCopyBtn.js'
import './style.css'

export default function clientSetup(): void {
  const { initCopyBtn } = useCopyBtn()

  onMounted(() => {
    console.log('---------hooks---------')
    setTimeout(() => {
      initCopyBtn()
    }, 500)
  })
}
