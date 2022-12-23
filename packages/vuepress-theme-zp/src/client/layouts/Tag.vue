<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="tag-wrapper" v-once>
          <RouterLink
            v-for="({ items, path }, name) in tagMap.map"
            :key="name"
            :to="path"
            :class="!isCategory ? `${type}-${createRandomNum(0, 4)}` : type"
          >
            {{ name }}
            <span :class="`${type}-num`">
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
import { createRandomNum } from '../utils/index.js'

const { type } = defineProps({
  type: {
    type: String,
    required: false,
    default: 'tag',
  },
})

const isCategory = type === 'category'
const tagMap = useBlogCategory<IArticleInfo>(type)

onMounted(() => {
  const router = useRouter()
  router.afterEach((to, from) => {
    if (to.path === from.path) return

    const pathArr = to.path.split('/').filter((i) => i)
    if (pathArr.length > 1) return

    const path = Object.values(tagMap.value.map)?.[0]?.path

    path && router.push(path)
  })
})
</script>
