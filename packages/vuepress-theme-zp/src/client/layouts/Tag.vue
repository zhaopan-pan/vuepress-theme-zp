<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper" v-once>
          <Tags :blogKey="blogKey" :tagMap="tagMap" />
        </div>
        <div class="tag-article-list">
          <ArticleList :dataList="tagMap.currentItems" />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import ArticleList from '../components/article/ArticleList.vue'
import Tags from '../components/tag/Tags.vue'

import ParentLayout from './Layout.vue'
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategory, useTag } from '../composables/index.js'
const route = useRoute()
const router = useRouter()

const { blogKey } = defineProps({
  blogKey: {
    type: String,
    required: false,
    default: 'tag',
  },
})

const isCategory = blogKey === 'category'
const tagMap = isCategory ? useCategory() : useTag()

watch(
  () => route.path,
  () => {
    const pathArr = route.path.split('/').filter((i) => i)
    if (pathArr.length > 1) {
      return
    }
    const path = Object.values(tagMap.value.map)?.[0]?.path
    path && router.push(path)
  }
)
</script>
