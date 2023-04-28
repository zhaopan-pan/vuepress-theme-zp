import { defineClientConfig } from '@vuepress/client'
import clientEnhance from './clientEnhance.js'
import {
  setupArticles,
  setupCategory,
  setupDarkMode,
  setupSidebarItems,
  setupTag,
} from './composables/index.js'
import Category from './layouts/Category.vue'
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/NotFound.vue'
import Tag from './layouts/Tag.vue'
import './styles/index.scss'

export default defineClientConfig({
  enhance: (...arg) => clientEnhance(...arg),

  setup() {
    setupTag()
    setupCategory()
    setupArticles()
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
