<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper">
          <RouterLink
            v-for="({ items, path }, name) in tagMap.value.map"
            :key="name"
            :to="path"
            class="tag"
          >
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
import ParentLayout from './Layout.vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { computed } from 'vue'
// import { usePageData } from '@vuepress/client'

// console.log('--------tag-------');
const tagMap = computed(() => useBlogCategory('tag'))
// const pageData = usePageData();
// console.log(tagMap.value);
// console.log(pageData.value);
</script>
