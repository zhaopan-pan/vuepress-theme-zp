<script setup lang="ts">
import type { DefaultThemePageFrontmatter } from '@theme-zp-src/shared/page.js'
import { usePageFrontmatter } from '@vuepress/client'
import PageMeta from '@theme-zp-components/PageMeta.vue'
import PageNav from '@theme-zp-components/PageNav.vue'
import MyToc from '@theme-zp-components/MyToc.vue'

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
    <slot name="top" />
    <MyToc v-if="shouldShowToc" />

    <div class="theme-default-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <PageMeta />
    <PageNav />
    <CommentService />
    <slot name="bottom" />
  </main>
</template>
