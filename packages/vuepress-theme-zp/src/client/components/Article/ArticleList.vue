<template>
  <div class="article-list-wrapper">
    <ArticleItem
      v-for="item in [
        ...articleDataList,
        ...articleDataList,
        ...articleDataList,
      ]"
      :key="item.path"
      :data="item"
    />
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
