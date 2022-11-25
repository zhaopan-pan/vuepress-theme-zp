
<template>
  <div>
    <RouterLink v-for="({ info, path } ) in articles.items" :key="path" :to="path">
      <span class="tag-num">
        {{ info.title }}
      </span>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/client";
const articles = useBlogType("article");
console.log(articles.value);
</script>