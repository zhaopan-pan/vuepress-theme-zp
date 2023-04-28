import { h } from 'vue'
import { useScrollPromise } from './composables/index.js'
import { registerGlobalComponents } from './utils/index.js'

export default ({ app, router }): void => {
  // 注册全局组件
  registerGlobalComponents(app)

  // compat with @vuepress/plugin-external-link-icon
  app.component('AutoLinkExternalIcon', () => {
    const ExternalLinkIcon = app.component('ExternalLinkIcon')
    if (ExternalLinkIcon) {
      return h(ExternalLinkIcon)
    }
    return null
  })

  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component('NavbarSearch', () => {
    const SearchComponent =
      app.component('Docsearch') || app.component('SearchBox')
    if (SearchComponent) {
      return h(SearchComponent)
    }
    return null
  })

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior!
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait()
    return scrollBehavior(...args)
  }
}
