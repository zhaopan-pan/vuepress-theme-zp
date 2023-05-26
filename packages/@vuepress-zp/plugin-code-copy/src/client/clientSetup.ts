import { onMounted } from 'vue'
import { initCopyBtn } from './index.js'
import './style.css'

export default function clientSetup(): void {
  onMounted(() => {
    setTimeout(() => {
      initCopyBtn()
    }, 500)
  })
}
