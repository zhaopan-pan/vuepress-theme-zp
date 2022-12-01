<template>
  <div class="home-center">
    <ArticleList />
    <BlogInfo />
  </div>
</template>

<script setup lang="ts">
import ArticleList from '../Article/ArticleList.vue'
import BlogInfo from './BlogInfo.vue'
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
