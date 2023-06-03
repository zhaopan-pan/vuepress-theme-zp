<script setup lang="ts">
import SideToc from '@theme-zp-client/components/SideToc.vue'
import PageMeta from '@theme-zp-client/components/PageMeta.vue'
import PageNav from '@theme-zp-client/components/PageNav.vue'
import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import { useThemeLocaleData } from '../composables/index.js'
import { isArticleContent } from '../utils/index.js'
import ArticleInfo from './article/ArticleInfo.vue'

const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

// 文章详情页才展示文章信息
const showArticleInfo = computed(isArticleContent)

// toc
const shouldShowToc = computed(
  () => frontmatter.value.toc !== false && themeLocale.value.toc !== false
)
</script>

<template>
  <main :class="`page ${shouldShowToc ? 'page-has-toc' : ''}`">
    <slot name="top" />
    <SideToc />

    <div class="theme-default-content">
      <div v-if="showArticleInfo" class="content-header">
        <div class="content-header-title">{{ frontmatter.title }}</div>
        <ArticleInfo :info="(frontmatter as IArticleInfo)" />
      </div>

      <div class="content-cover-box">
        <Image
          v-if="frontmatter.cover"
          :src="frontmatter.cover"
          class="content-cover"
        />
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
