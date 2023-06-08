<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeLocaleData } from '@theme-zp-client/composables/index.js'

const themeLocale = useThemeLocaleData()
const route = useRoute()

const options = {
  containerClass: 'table-of-contents',
  linkActiveClass: 'zp-link-active-class',
  listClass: 'zp-toc-list',
  linkClass: 'zp-toc-link',
}

const page = usePageData()
const { frontmatter, headers } = page?.value

// visible
const showToc = computed(
  () =>
    frontmatter.toc !== false &&
    themeLocale.value.toc !== false &&
    !!headers?.length &&
    !!route.path
)
</script>

<template>
  <div v-if="showToc" class="zp-toc">
    <div class="zp-toc-container">
      <div class="toc-title">目录</div>
      <Toc :options="options" :headers="headers" />
    </div>
  </div>
</template>

<style scoped></style>
