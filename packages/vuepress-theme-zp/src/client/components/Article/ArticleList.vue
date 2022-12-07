<template>
  <div class="article-list-wrapper">
    <ArticleItem
      v-for="item in articlesOfCurrentPage"
      :key="item.path"
      :data="item"
    />
    <Pagination
      v-show="showPagination"
      :total="articleDataList.length"
      :currentPage="currentPageNum"
      :pageSize="pageSize"
      @getCurrentPage="getCurrentPage"
    ></Pagination>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from 'vuepress-plugin-blog2/client'
import ArticleItem from './ArticleItem.vue'
import type { IArticleInfo } from '@vuepressSrc/shared/article.js'
import Pagination from '@zpTheme/Pagination.vue'
import { computed, ref } from 'vue'

const { curPageSize, showPagination } = defineProps({
  curPageSize: { type: Number },
  showPagination: { type: Boolean, default: true },
})

const pageSize = curPageSize || 2
const currentPageNum = ref(1)
const articles = useBlogType<IArticleInfo>('home')
const articleDataList = computed(() =>
  articles.value.items.filter((d) => !d.info.readme)
)

console.log(pageSize, articleDataList)
const articlesOfCurrentPage = computed(() => {
  if (!articleDataList.value.length) return []

  // 减1意思是从当前页开始截取
  let start = (currentPageNum.value - 1) * pageSize
  let end = currentPageNum.value * pageSize

  return articleDataList.value.slice(start, end)
})

const getCurrentPage = (n: number) => {
  console.log({ n })
  currentPageNum.value = n
}
</script>
