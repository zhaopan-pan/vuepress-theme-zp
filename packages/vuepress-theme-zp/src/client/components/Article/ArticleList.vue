<template>
  <div class="article-item-wrapper">
    <div v-for="item in articles.items" :key="item.path">
      <ArticleItem :data="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from 'vuepress-plugin-blog2/client'
import ArticleItem from './ArticleItem.vue'
import type { IArticleInfo } from '@vuepressSrc/shared/article.js'

const articles = useBlogType<IArticleInfo>('home')
console.log(articles.value)
</script>
<style lang="scss">
.article-item-wrapper {
  max-width: 780px;
}
</style>
