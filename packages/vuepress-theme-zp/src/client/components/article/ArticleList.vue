<script setup lang="ts">
import ArticleItem from '@theme-zp-client/components/article/ArticleItem.vue'
import Pagination from '@theme-zp-client/components/Pagination.vue'
import { useArticlesCurrentPage } from '@theme-zp-client/composables/index.js'
import { scrollToTop } from '@theme-zp-client/utils/index.js'
import type { IArticleItem } from '@theme-zp-src/shared/article.js'
import type { PropType } from 'vue'
import { computed, ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  pageSize: { type: Number, default: 10 },
  showPagination: { type: Boolean, default: true },
  showTag: { type: Boolean, default: true },
  dataList: {
    type: Object as PropType<IArticleItem[]>,
    default: undefined,
  },
})
const { pageSize, showPagination, showTag } = toRefs(props)
const curPageSize = pageSize.value || 10
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

const paginationOnChange = (c: number): void => {
  currentPageNum.value = c
  scrollToTop()
}
</script>
<template>
  <div class="article-list-wrapper">
    <DropTransition :delay="0.1" type="group">
      <ArticleItem
        v-for="item in currentPageArticles"
        :key="item.path"
        :article="item"
        :showTag="showTag"
      />
    </DropTransition>
    <Pagination
      v-show="showPagination"
      :total="articleDataList?.length"
      :currentPage="currentPageNum"
      :pageSize="pageSize"
      @onChange="paginationOnChange"
    ></Pagination>
  </div>
</template>
