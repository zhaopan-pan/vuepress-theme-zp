<script setup lang="ts">
import NavbarItems from '@theme-zp-client/components/nav/NavbarItems.vue'
import ToggleColorModeButton from '@theme-zp-client/components/ToggleColorModeButton.vue'
import {
  DeviceType,
  useUpdateDeviceStatus,
} from '@theme-zp-client/composables/index.js'
import { ref } from 'vue'

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
