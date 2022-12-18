<template>
  <div class="home-center">
    <ArticleList :data-list="articles.items" />
    <BlogInfo />
  </div>
</template>

<script setup lang="ts">
import ArticleList from '../Article/ArticleList.vue'
import { useBlogType } from 'vuepress-plugin-blog2/client'
import type { IArticleInfo } from '@vuepressSrc/shared/index.js'
import BlogInfo from './BlogInfo/index.vue'
const articles = useBlogType<IArticleInfo>('home')
</script>

<style lang="scss" scoped>
@import '../../styles/_variables';
.home-center {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}
</style>
