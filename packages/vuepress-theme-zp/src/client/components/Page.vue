<script setup lang="ts">
import PageMeta from '@theme-zp-client/components/PageMeta.vue'
import PageNav from '@theme-zp-client/components/PageNav.vue'
import SideToc from '@theme-zp-client/components/SideToc.vue'
import { useThemeLocaleData } from '@theme-zp-client/composables/index.js'
import { isArticleContent } from '@theme-zp-client/utils/index.js'
import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import ArticleInfo from './article/ArticleInfo.vue'

const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

// 文章详情页才展示文章信息
const showArticleInfo = computed(
  () => isArticleContent() && frontmatter.value.title
)

// toc
const shouldShowToc = computed(
  () => frontmatter.value.toc !== false && themeLocale.value.toc !== false
)

const coverUrl = computed(
  () => frontmatter.value.mobileCover || frontmatter.value.cover
)
</script>

<template>
  <main :class="`page ${shouldShowToc ? 'page-has-toc' : ''}`">
    <slot name="top" />
    <SideToc />

    <div class="theme-default-content">
      <div v-if="showArticleInfo" class="content-header">
        <h1 class="content-header-title">{{ frontmatter.title }}</h1>
        <ArticleInfo :info="(frontmatter as IArticleInfo)" />
      </div>

      <div v-if="coverUrl" class="content-cover-box">
        <Image :src="coverUrl" class="content-cover" />
      </div>
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <PageMeta />
    <PageNav />
    <slot name="bottom" />
    <CommentService />
  </main>
</template>
