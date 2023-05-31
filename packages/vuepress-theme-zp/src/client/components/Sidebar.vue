<script setup lang="ts">
import SidebarItems from '@theme-zp-client/components/SidebarItems.vue'
import { computed, ref } from 'vue'
import { DeviceType, useUpdateDeviceStatus } from '../composables/index.js'
import { showSideBar } from '../utils/index.js'

defineSlots<{
  top?: (props: Record<never, never>) => any
  bottom?: (props: Record<never, never>) => any
}>()

const isMobile = ref(false)

const handleMobile = (width: number): void => {
  if (window.innerWidth < width) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
useUpdateDeviceStatus(DeviceType.MOBILE, handleMobile)

const sidebarVisible = computed(() => showSideBar())
</script>

<template>
  <aside v-if="sidebarVisible || isMobile" class="sidebar">
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
