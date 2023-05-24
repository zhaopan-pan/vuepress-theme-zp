import { defineClientConfig } from '@vuepress/client'
import clientSetup from './clientSetup.js'

export default defineClientConfig({
  // enhance({ app }) {
  //   console.log(app)
  // },
  setup() {
    clientSetup()
  },
})
