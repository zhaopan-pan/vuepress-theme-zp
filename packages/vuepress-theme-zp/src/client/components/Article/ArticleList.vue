<template>
  <div class="article-list-wrapper">
    <ArticleItem
      v-for="item in currentPageArticles"
      :key="item.path"
      :data="item"
    />
    <Pagination
      v-show="showPagination"
      :total="articleDataList?.length"
      :currentPage="currentPageNum"
      :pageSize="pageSize"
      @onChange="paginationOnChange"
    ></Pagination>
  </div>
</template>
<script setup lang="ts">
import type {
  BlogCategoryData,
  BlogTypeData,
} from 'vuepress-plugin-blog2/client'
import ArticleItem from './ArticleItem.vue'
import type { IArticleInfo, IArticleItem } from '@vuepressSrc/shared/article.js'
import Pagination from '@zpTheme/Pagination.vue'
import { computed, PropType, ref, watch } from 'vue'
import { useArticlesCurrentPage } from '../../composables/index.js'
import { useRoute } from 'vue-router'
// import { scrollToTop } from '../../'

const props = defineProps({
  pageSize: { type: Number },
  showPagination: { type: Boolean, default: true },
  dataList: {
    type: Object as PropType<IArticleItem[]>,
    default: undefined,
  },
})
const { pageSize, showPagination } = props
const curPageSize = pageSize || 10
const currentPageNum = ref(1)

const articleDataList = computed(() =>
  props.dataList?.filter((d) => !d.info.readme)
)

const currentPageArticles = computed(() => {
  const data = useArticlesCurrentPage(articleDataList.value, {
    pageSize: curPageSize,
    pageNum: currentPageNum.value,
  })
  return data
})
const route = useRoute()

watch(
  () => route.path,
  () => {
    // 传入数据有变就重置当前页数据
    currentPageNum.value = 1
  }
)

const paginationOnChange = (c: number) => {
  currentPageNum.value = c
  // scrollToTop()
}
</script>
