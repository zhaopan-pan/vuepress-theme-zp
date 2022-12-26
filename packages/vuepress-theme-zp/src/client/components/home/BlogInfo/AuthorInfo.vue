<template>
  <div class="author-info" v-if="blogInfo">
    <img
      class="author-logo"
      :src="blogInfo.avatar || ''"
      alt="logo"
      srcset=""
    />
    <div class="author-name">{{ blogInfo.name || '' }}</div>
    <div class="blog-overview">
      <div class="blog-overview-item">
        <div class="blog-overview-count">100</div>
        <div class="blog-overview-name">文章</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticleInfo } from '@vuepressSrc/node/index.js'
import { useBlogCategory } from 'vuepress-plugin-blog2/client'
import { useThemeData } from '../../../composables/index.js'

// import { useThemeData } from '../..//useThemeData.js'
const themeData = useThemeData()
const blogInfo = themeData.value?.blog || null
// const getArticles = (t?: string) => useBlogCategory<IArticleInfo>()
// console.log(getArticles().value)
// console.log(useBlogCategory().value)
const blogOverviewData = [
  // {
  //   name: '文章',
  //   value: Object.values(getArticles().value).reduce(
  //     (pre, cur) => pre + cur.items.length,
  //     0
  //   ),
  // },
  // {
  //   name: '分类',
  //   value: Object.keys(getArticles('category').value).length,
  // },
]
</script>

<style scoped lang="scss"></style>
