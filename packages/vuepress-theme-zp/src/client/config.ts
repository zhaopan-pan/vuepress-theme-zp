import { defineClientConfig } from '@vuepress/client'
import { setupDarkMode, setupSidebarItems } from './composables/index.js'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'
import Tag from './layouts/Tag.vue'
import Category from './layouts/Category.vue'
import clientEnhance from './clientEnhance.js'
import './styles/index.scss'

export default defineClientConfig({
  enhance: (...arg) => clientEnhance(...arg),

  setup() {
    setupDarkMode()
    setupSidebarItems()
  },

  layouts: {
    Layout,
    NotFound,
    Tag,
    Category,
  },
})
