<template>
  <div @click="toDetail" class="article-item">
    <div class="article-name text-overflow-ellipsis">
      {{ info.title }}
    </div>
    <div v-html="info.excerpt"></div>
    <ArticleInfo :data="info" />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IArticleItem } from '@vuepressSrc/shared/index.js'
import ArticleInfo from './ArticleInfo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { data } = defineProps({
  data: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
})
const { path, info } = data

const toDetail = () => router.push(path)
</script>
