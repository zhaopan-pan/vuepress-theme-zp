<script setup lang="ts">
import HomeContent from './HomeContent.vue'
import HomeFeatures from './HomeFeatures.vue'
import HomeFooter from './HomeFooter.vue'
// import HomeHero from './HomeHero.vue'
import ArticleList from '../Article/ArticleList.vue'
</script>

<template>
  <main class="home">
    <!-- <HomeHero /> -->
    <ArticleList />
    <HomeFeatures />
    <HomeContent />
    <HomeFooter />
  </main>
</template>
