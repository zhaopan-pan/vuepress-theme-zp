<template>
  <div class="home-center">
    <ArticleList :data-list="articles.items" />
    <BlogInfo />
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
