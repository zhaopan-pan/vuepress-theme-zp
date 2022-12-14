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
        <div class="tag-article-list">
          <ArticleList :dataList="list" />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import ArticleList from '../components/Article/ArticleList.vue'
import ParentLayout from './Layout.vue'
import { useBlogCategory, BlogTypeData } from 'vuepress-plugin-blog2/client'
import { computed, ref, watch } from 'vue'
import { usePageData } from '@vuepress/client'
import type { IArticleInfo } from '@vuepressSrc/shared/index.js'

let list = ref<BlogTypeData<IArticleInfo>>()
const tagMap = computed(() => useBlogCategory<IArticleInfo>('tag'))

const pageData = usePageData()
watch(
  () => pageData.value.title,
  () => {
    list.value = tagMap.value.value.map[pageData.value.title]
  }
)
</script>
