<script setup lang="ts">
import type { DefaultThemePageFrontmatter } from '@theme-zp-src/shared/page.js'
import { usePageFrontmatter } from '@vuepress/client'
import PageMeta from '@theme-zp-client/components/PageMeta.vue'
import PageNav from '@theme-zp-client/components/PageNav.vue'
import MyToc from '@theme-zp-client/components/MyToc.vue'
import ArticleInfo from './article/ArticleInfo.vue'

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
      <div class="content-header">
        <span class="content-header-title">{{ frontmatter.title }}</span>
        <ArticleInfo :info="frontmatter" />
      </div>
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
