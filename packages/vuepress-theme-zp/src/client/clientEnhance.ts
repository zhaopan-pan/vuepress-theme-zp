import { h } from 'vue'
import { useScrollPromise } from './composables/index.js'
import tooltip from './directive/tooltip.js'
import { registerGlobalComponents } from './utils/index.js'

export default ({ app, router }): void => {
  // 注册全局组件
  registerGlobalComponents(app)
  // app.directive's first argument is the directive's name you will use
  // it can be whatever you wish
  app.directive('tooltip', tooltip)

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
