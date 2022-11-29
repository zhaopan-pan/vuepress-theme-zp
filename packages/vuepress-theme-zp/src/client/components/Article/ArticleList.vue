<template>
  <div>
    <div v-for="{ info, path } in articles.items" :key="path">
      <RouterLink class="tag-num" :to="path">
        {{ info.title }}
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from 'vuepress-plugin-blog2/client'
const articles = useBlogType('home')
console.log(articles.value)
</script>
