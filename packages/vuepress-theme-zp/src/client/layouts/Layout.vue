<script setup lang="ts">
import Home from '@theme-zp-client/components/home/index.vue'
import Menu from '@theme-zp-client/components/Menu.vue'
import Navbar from '@theme-zp-client/components/nav/Navbar.vue'
import MobileNav from '@theme-zp-client/components/nav/NavMobile.vue'
import Page from '@theme-zp-client/components/Page.vue'
import Sidebar from '@theme-zp-client/components/Sidebar.vue'
import {
  setupMenuToggle,
  useCodeCopy,
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '@theme-zp-client/composables/index.js'
import { removeLoading, showSideBar } from '@theme-zp-client/utils/index.js'
import type { DefaultThemePageFrontmatter } from '@theme-zp-src/shared/index.js'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, onErrorCaptured, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineSlots<{
  'navbar'?: (props: Record<never, never>) => any
  'navbar-before'?: (props: Record<never, never>) => any
  'navbar-after'?: (props: Record<never, never>) => any
  'sidebar'?: (props: Record<never, never>) => any
  'sidebar-top'?: (props: Record<never, never>) => any
  'sidebar-bottom'?: (props: Record<never, never>) => any
  'page'?: (props: Record<never, never>) => any
  'page-top'?: (props: Record<never, never>) => any
  'page-bottom'?: (props: Record<never, never>) => any
  'page-content-top'?: (props: Record<never, never>) => any
  'page-content-bottom'?: (props: Record<never, never>) => any
}>()

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()
// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
)

// sidebar
const sidebarItems = useSidebarItems()
const isSidebarOpen = ref(false)
const isMenuOpen = ref(false)

const toggleMenu = (to?: boolean): void => {
  isMenuOpen.value = typeof to === 'boolean' ? to : !isMenuOpen.value
}

setupMenuToggle({ toggleMobileMenu: toggleMenu })

const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value
}

const touchStart = { x: 0, y: 0 }
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX
  touchStart.y = e.changedTouches[0].clientY
}
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x
  const dy = e.changedTouches[0].clientY - touchStart.y
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true)
    } else {
      toggleSidebar(false)
    }
  }
}

// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'menu-open': isMenuOpen.value,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
])

// close sidebar after navigation
let unregisterRouterHook
onMounted(() => {
  removeLoading()
  useCodeCopy()
  const router = useRouter()
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false)
  })
  // clear sessionStorage before page reload
  window.addEventListener('beforeunload', (_e: Event): void => {
    sessionStorage.clear()
  })
})

onUnmounted(() => {
  unregisterRouterHook()
})

onErrorCaptured((_err, _ins, info) => {
  console.error('err-info:', info)
  removeLoading()
})

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise()
const onBeforeEnter = scrollPromise.resolve
const onBeforeLeave = scrollPromise.pending
</script>
<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-menu="toggleMenu">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>
    <div
      v-if="showSideBar()"
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Menu @toggleMobileMenu="toggleMenu" />

    <!-- 移动端导航 -->
    <MobileNav @toggle-sidebar="toggleSidebar" />

    <slot name="sidebar">
      <Sidebar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>

    <slot name="page">
      <Home v-if="frontmatter.home" />

      <Transition
        v-else
        name="fade-slide-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <Page :key="page.path">
          <template #top>
            <slot name="page-top" />
          </template>
          <template #content-top>
            <slot name="page-content-top" />
          </template>
          <template #content-bottom>
            <slot name="page-content-bottom" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </Transition>
    </slot>
  </div>
</template>
