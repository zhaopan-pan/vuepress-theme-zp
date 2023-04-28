<script setup lang="ts">
import { useArticles } from '../../composables/index.js'
import ArticleList from '../article/ArticleList.vue'
import BlogInfo from './BlogInfo/index.vue'
const articles = useArticles()
</script>

<template>
  <div class="home-center">
    <DropTransition type="group">
      <ArticleList
        key="ArticleList"
        :data-list="articles.items"
        :showTag="false"
      />
      <BlogInfo key="BlogInfo" />
    </DropTransition>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/_variables';
</style>
