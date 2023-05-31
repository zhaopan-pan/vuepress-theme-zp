<script setup lang="ts">
import NavbarBrand from '@theme-zp-client/components/NavbarBrand.vue'
import NavbarItems from '@theme-zp-client/components/NavbarItems.vue'
// import ToggleColorModeButton from '@theme-zp-client/components/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@theme-zp-client/components/ToggleSidebarButton.vue'
import { computed, ref } from 'vue'
import {
  DeviceType,
  // useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../composables/index.js'

defineSlots<{
  before?: (props: Record<never, never>) => any
  after?: (props: Record<never, never>) => any
}>()

defineEmits(['toggle-menu'])

// const themeLocale = useThemeLocaleData()

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

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
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  if (window.innerWidth < width) {
    linksWrapperMaxWidth.value = 0
  } else {
    linksWrapperMaxWidth.value =
      navbar.value!.offsetWidth -
      navbarHorizontalPadding -
      (navbarBrand.value?.offsetWidth || 0)
  }
}
useUpdateDeviceStatus(DeviceType.MOBILE, handleLinksWrapWidth)
</script>

<template>
  <header ref="navbar" class="navbar">
    <span ref="navbarBrand">
      <NavbarBrand />
    </span>

    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarItems class="can-hide" />
      <slot name="after" />
      <!-- <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" /> -->
      <NavbarSearch />
      <ToggleSidebarButton @toggle="$emit('toggle-menu')" />
    </div>
  </header>
</template>
