<script setup lang="ts">
import type { DefaultThemePageFrontmatter } from '@vuepressSrc/shared/page.js'
import { usePageFrontmatter } from '@vuepress/client'
import PageMeta from '@zpTheme/PageMeta.vue'
import PageNav from '@zpTheme/PageNav.vue'
import MyToc from '@zpTheme/MyToc.vue'

import { computed } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()
const themeLocale = useThemeLocaleData()

// toc
const shouldShowToc = computed(
  () => frontmatter.value.toc !== false && themeLocale.value.toc !== false
)
</script>

<template>
  <main :class="`page ${shouldShowToc ? 'page-has-toc' : ''}`">
    <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    <slot name="top" />
    <MyToc v-if="shouldShowToc" />

    <div class="theme-default-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
  </main>
</template>
