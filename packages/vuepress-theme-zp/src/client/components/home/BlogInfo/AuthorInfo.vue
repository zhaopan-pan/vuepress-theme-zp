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
      <div
        class="blog-overview-item cp"
        v-for="(item, index) in blogOverviewData"
        :key="index"
        @click="toPage(item.link)"
      >
        <div class="blog-overview-count">{{ item.value }}</div>
        <div class="blog-overview-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  useThemeData,
  useArticles,
  useCategory,
  useTag,
} from '../../../composables/index.js'

const themeData = useThemeData()
const articles = useArticles()
const router = useRouter()

const blogInfo = themeData.value?.blog || null

const categoryKeys = Object.keys(useCategory().value.map)
const tagKeys = Object.keys(useTag().value.map)

const toPage = (link: string) => link && router.push(link)

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

<style scoped lang="scss"></style>
