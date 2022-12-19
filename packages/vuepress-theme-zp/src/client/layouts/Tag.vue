<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper">
          <RouterLink
            v-for="({ items, path }, name) in tagMap.map"
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
          <ArticleList :dataList="tagMap.currentItems" />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import ArticleList from '../components/Article/ArticleList.vue'
import ParentLayout from './Layout.vue'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import type { IArticleInfo } from '@vuepressSrc/shared/index.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { type } = defineProps({
  type: {
    type: String,
    required: false,
    default: 'tag',
  },
})
const tagMap = useBlogCategory<IArticleInfo>(type)

onMounted(() => {
  const path = Object.values(tagMap.value.map)?.[0]?.path
  path && router.push(path)
})
</script>
