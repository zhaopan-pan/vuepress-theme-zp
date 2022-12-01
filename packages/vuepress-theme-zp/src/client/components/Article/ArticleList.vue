<template>
  <div class="article-list-wrapper">
    <div v-for="item in articleDataList" :key="item.path">
      <ArticleItem :data="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from 'vuepress-plugin-blog2/client'
import ArticleItem from './ArticleItem.vue'
import type { IArticleInfo } from '@vuepressSrc/shared/article.js'
import { computed } from 'vue'

const articles = useBlogType<IArticleInfo>('home')
const articleDataList = computed(() =>
  articles.value.items.filter((d) => !d.info.readme)
)
</script>
