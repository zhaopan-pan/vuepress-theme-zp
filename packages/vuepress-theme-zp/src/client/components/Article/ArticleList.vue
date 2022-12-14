<template>
  <div class="article-list-wrapper">
    <ArticleItem
      v-for="item in currentPageArticles"
      :key="item.path"
      :data="item"
    />
    <Pagination
      v-show="showPagination"
      :total="articleDataList.length"
      :currentPage="currentPageNum"
      :pageSize="pageSize"
      @onChange="paginationOnChange"
    ></Pagination>
  </div>
</template>
<script setup lang="ts">
import { useBlogType, BlogTypeData } from 'vuepress-plugin-blog2/client'
import ArticleItem from './ArticleItem.vue'
import type { IArticleInfo } from '@vuepressSrc/shared/article.js'
import Pagination from '@zpTheme/Pagination.vue'
import { computed, PropType, ref, watch, watchEffect } from 'vue'
import { useArticlesCurrentPage } from '../../composables/index.js'

const props = defineProps({
  pageSize: { type: Number },
  showPagination: { type: Boolean, default: true },
  dataList: {
    type: Object as PropType<BlogTypeData<IArticleInfo>>,
    default: undefined,
  },
})
const { pageSize, showPagination } = props
const curPageSize = pageSize || 10
const currentPageNum = ref(1)

const articles = computed(
  () => props.dataList || useBlogType<IArticleInfo>('home').value
)

const articleDataList = computed(() =>
  articles.value.items.filter((d) => !d.info.readme)
)

const currentPageArticles = computed(() => {
  const data = useArticlesCurrentPage(articleDataList.value, {
    pageSize: curPageSize,
    pageNum: currentPageNum.value,
  })
  return data
})

watch(
  () => articles.value,
  () => {
    // 传入数据有变就重置当前页数据
    currentPageNum.value = 1
  }
)

const paginationOnChange = (c: number) => {
  currentPageNum.value = c
}
</script>
