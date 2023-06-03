<script setup lang="ts">
import NavbarItems from '@theme-zp-client/components/NavbarItems.vue'
import ToggleColorModeButton from '@theme-zp-client/components/ToggleColorModeButton.vue'
import { ref } from 'vue'
import { DeviceType, useUpdateDeviceStatus } from '../composables/index.js'

const isMobile = ref(false)

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number): void => {
  if (window.innerWidth < width) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
})
</script>

<template>
  <nav v-if="isMobile" class="menu">
    <NavbarItems />
    <div class="color-mode-btn">
      appearance
      <ToggleColorModeButton />
    </div>
  </nav>
</template>
