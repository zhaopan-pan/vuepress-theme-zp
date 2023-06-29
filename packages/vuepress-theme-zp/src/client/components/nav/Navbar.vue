<script setup lang="ts">
import NavbarBrand from '@theme-zp-client/components/nav/NavbarBrand.vue'
import NavbarItems from '@theme-zp-client/components/nav/NavbarItems.vue'
import ToggleColorModeButton from '@theme-zp-client/components/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@theme-zp-client/components/ToggleSidebarButton.vue'
import {
  DeviceType,
  useUpdateDeviceStatus,
} from '@theme-zp-client/composables/index.js'
import { computed, ref } from 'vue'

defineSlots<{
  before?: (props: Record<never, never>) => any
  after?: (props: Record<never, never>) => any
}>()

defineEmits(['toggle-menu'])

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)
const isPc = ref(false)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}

const handleLinksWrapWidth = (width: number): void => {
  isPc.value = window.innerWidth > width
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  if (window.innerWidth < width) {
    linksWrapperMaxWidth.value = 0
  } else {
    linksWrapperMaxWidth.value =
      (navbar.value?.offsetWidth || 0) -
      navbarHorizontalPadding -
      (navbarBrand.value?.offsetWidth || 0)
  }
}
useUpdateDeviceStatus(DeviceType.MOBILE, handleLinksWrapWidth)
</script>

<template>
  <header ref="navbar" class="navbar">
    <span ref="navbarBrand" class="navbar-brand">
      <NavbarBrand />
      <NavbarSearch />
    </span>
    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarItems class="can-hide" />
      <slot name="after" />
      <ToggleColorModeButton v-if="isPc" />
      <ToggleSidebarButton @toggle="$emit('toggle-menu')" />
    </div>
  </header>
</template>
