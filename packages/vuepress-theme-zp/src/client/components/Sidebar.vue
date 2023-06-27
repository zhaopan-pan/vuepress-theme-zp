<script setup lang="ts">
import SidebarItems from '@theme-zp-client/components/SidebarItems.vue'
import { showSideBar } from '@theme-zp-client/utils/index.js'
import { computed, ref } from 'vue'
import {
  DeviceType,
  useSidebarItems,
  useUpdateDeviceStatus,
} from '../composables/index.js'

defineSlots<{
  top?: (props: Record<never, never>) => any
  bottom?: (props: Record<never, never>) => any
}>()

const sidebarItems = useSidebarItems()

const isMobile = ref(false)

const handleMobile = (width: number): void => {
  if (window.innerWidth < width) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
useUpdateDeviceStatus(DeviceType.MOBILE, handleMobile)

const sidebarVisible = computed(() => showSideBar(sidebarItems.value))
</script>

<template>
  <aside v-if="sidebarVisible" class="sidebar">
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
