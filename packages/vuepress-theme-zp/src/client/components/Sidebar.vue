<script setup lang="ts">
import NavbarItems from '@theme-zp-client/components/NavbarItems.vue'
import SidebarItems from '@theme-zp-client/components/SidebarItems.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '../composables/index.js'
import {
  DeviceType,
  getFirstLayerSideBarData,
  updateDeviceStatus,
} from '../utils/index.js'

const route = useRoute()
const sidebarItems = useSidebarItems()
const isMobile = ref(false)

const handleMobile = (width: number): void => {
  if (window.innerWidth < width) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
updateDeviceStatus(DeviceType.MOBILE, handleMobile)

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
  <aside v-if="showSideBar || isMobile" class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
