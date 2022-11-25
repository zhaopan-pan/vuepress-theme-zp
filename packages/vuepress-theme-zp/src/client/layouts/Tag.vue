<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper">
          <RouterLink v-for="({ items, path }, name) in tagMap.value.map" :key="name" :to="path" class="tag">
            {{ name }}
            <span class="tag-num">
              {{ items.length }}
            </span>
          </RouterLink>
        </div>
        <!-- <ArticleList :items="tagMap.currentItems" /> -->
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
// import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "./Layout.vue";
import { useBlogCategory } from "vuepress-plugin-blog2/client";
import { computed } from 'vue';

console.log('--------tag-------');
const tagMap = computed(() => useBlogCategory("tag"));
console.log(tagMap.value);
</script>