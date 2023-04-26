<script setup lang="ts">
import NavbarItems from '@theme-zp-client/components/NavbarItems.vue'
import SidebarItems from '@theme-zp-client/components/SidebarItems.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '../composables/index.js'
import { getFirstLayerSideBarData } from '../utils/index.js'

const route = useRoute()
const sidebarItems = useSidebarItems()
const isMobile = ref(false)

// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719

  const handleMobile = (): void => {
    if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
      isMobile.value = true
    } else {
      isMobile.value = false
    }
  }
  handleMobile()
  window.addEventListener('resize', handleMobile, false)
  window.addEventListener('orientationchange', handleMobile, false)
})
// 只有在sidebar中配置了的md才会展示 侧边栏
const showSideBar = computed(() =>
  getFirstLayerSideBarData(sidebarItems.value)?.some((item) => {
    if (item.link === route.path) {
      return true
    }
    if (item?.children) {
      return item.children.some((c) => c.link === route.path)
    }
    return false
  })
)
</script>

<template>
  <aside class="sidebar" v-if="showSideBar || isMobile">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
