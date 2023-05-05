<script setup lang="ts">
import MyToc from '@theme-zp-client/components/MyToc.vue'
import PageMeta from '@theme-zp-client/components/PageMeta.vue'
import PageNav from '@theme-zp-client/components/PageNav.vue'
import type { IArticleInfo } from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeLocaleData } from '../composables/index.js'
import ArticleInfo from './article/ArticleInfo.vue'

const route = useRoute()
const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

// 文章详情页才展示文章信息
const showArticleInfo = computed(() => route.path.startsWith('/posts'))

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
      <div v-if="showArticleInfo" class="content-header">
        <span class="content-header-title">{{ frontmatter.title }}</span>
        <ArticleInfo :info="(frontmatter as IArticleInfo)" />
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
