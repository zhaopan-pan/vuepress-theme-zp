<script setup lang="ts">
import ArticleList from '@theme-zp-client/components/article/ArticleList.vue'
import Tags from '@theme-zp-client/components/tag/Tags.vue'
import { useCategory, useTag } from '@theme-zp-client/composables/index.js'
import { dateSortByTime } from '@theme-zp-client/utils/index.js'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ParentLayout from './Layout.vue'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  blogKey: {
    type: String,
    required: false,
    default: 'tag',
  },
})
const isCategory = props.blogKey === 'category'
const tagMap = isCategory ? useCategory() : useTag()

const currentItems = computed(() => dateSortByTime(tagMap.value.currentItems))

watch(
  () => route.path,
  () => {
    const pathArr = route.path.split('/').filter((i) => i)
    if (pathArr.length > 1) {
      return
    }
    const path = Object.values(tagMap.value.map)?.[0]?.path
    path !== route.path && router.push(path)
  }
)
</script>
<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div v-once :class="isCategory ? 'category-wrapper' : 'tag-wrapper'">
          <Tags :blog-key="blogKey" :tag-map="tagMap" />
        </div>
        <div class="tag-article-list">
          <ArticleList :data-list="currentItems" :tagMap="tagMap" />
        </div>
      </main>
    </template>
  </ParentLayout>
</template>
