<script setup lang="ts">
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { useThemeLocaleData } from '@theme-zp-client/composables/index.js'
import Avatar from '../home/Avatar.vue'

const routeLocale = useRouteLocale()
const siteLocale = useSiteLocaleData()
const themeLocale = useThemeLocaleData()
// const isDarkMode = useDarkMode()

const navbarBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value
)
const navbarBrandTitle = computed(() => siteLocale.value.title)
// const navbarBrandLogo = computed(() => {
//   if (isDarkMode.value && themeLocale.value.logoDark !== undefined) {
//     return themeLocale.value.logoDark
//   }
//   return themeLocale.value.logo || themeLocale.value.blog
// })
// const NavbarBrandLogo: FunctionalComponent = () => {
//   if (!navbarBrandLogo.value) return null
//   const img = h('img', {
//     class: 'logo',
//     src: withBase(navbarBrandLogo.value),
//     alt: navbarBrandTitle.value,
//   })
//   if (themeLocale.value.logoDark === undefined) {
//     return img
//   }
//   // wrap brand logo with <ClientOnly> to avoid ssr-mismatch
//   // when using a different brand logo in dark mode
//   return h(ClientOnly, () => img)
// }
</script>

<template>
  <RouterLink :to="navbarBrandLink">
    <Avatar :size="2" class="logo" />

    <span v-if="navbarBrandTitle" class="site-name">
      {{ navbarBrandTitle }}
    </span>
  </RouterLink>
</template>
