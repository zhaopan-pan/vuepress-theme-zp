<template>
  <div class="article-item cp" @click="toDetail">
    <article>
      <div class="article-name">
        {{ info.title }}
      </div>
      <div v-html="info.excerpt"></div>
    </article>
    <ArticleInfo :info="info" :showTag="showTag" />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import ArticleInfo from './ArticleInfo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { article, showTag } = defineProps({
  article: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})
const { path, info } = article
const toDetail = () => router.push(path)
</script>
