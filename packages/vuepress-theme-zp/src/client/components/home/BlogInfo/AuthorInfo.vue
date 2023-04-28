<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  useArticles,
  useCategory,
  useTag,
  useThemeData,
} from '../../../composables/index.js'

const themeData = useThemeData()
const articles = useArticles()
const router = useRouter()

const blogInfo = themeData.value?.blog || null

const categoryKeys = Object.keys(useCategory().value.map)
const tagKeys = Object.keys(useTag().value.map)

const toPage = (link: string): unknown => link && router.push(link)

const blogOverviewData = [
  {
    name: '文章',
    value: articles.value.items.length,
    link: '',
  },
  {
    name: '分类',
    value: categoryKeys.length,
    link: `/category/${categoryKeys[0]}/`,
  },
  {
    name: '标签',
    value: tagKeys.length,
    link: `/tag/${tagKeys[0]}/`,
  },
]
</script>

<template>
  <div v-if="blogInfo" class="author-info">
    <img
      class="author-logo"
      :src="blogInfo.avatar || ''"
      alt="logo"
      srcset=""
    />
    <div class="author-name">{{ blogInfo.name || '' }}</div>
    <div class="blog-overview">
      <div
        v-for="(item, index) in blogOverviewData"
        :key="index"
        class="blog-overview-item cp"
        @click="toPage(item.link)"
      >
        <div class="blog-overview-count">{{ item.value }}</div>
        <div class="blog-overview-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
