<template>
  <div class="home-center">
    <DropTransition type="group">
      <ArticleList :data-list="articles.items" key="ArticleList" />
      <BlogInfo key="BlogInfo" />
    </DropTransition>
  </div>
</template>

<script setup lang="ts">
import ArticleList from '../article/ArticleList.vue'
import { useArticles } from '../../composables/index.js'
import BlogInfo from './BlogInfo/index.vue'
const articles = useArticles()
</script>

<style lang="scss" scoped>
@import '../../styles/_variables';
</style>
