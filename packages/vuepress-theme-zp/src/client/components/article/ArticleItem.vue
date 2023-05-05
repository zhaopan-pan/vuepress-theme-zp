<script setup lang="ts">
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import ArticleInfo from './ArticleInfo.vue'

const router = useRouter()
const { article, showTag } = defineProps({
  article: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})
const { path, info } = article
const toDetail = (): unknown => router.push(path)
</script>
<template>
  <div class="article-item cp" @click="toDetail">
    <article>
      <div class="article-name">
        {{ info.title }}
      </div>
      <div
        v-if="info.excerpt"
        class="article-excerpt"
        v-html="info.excerpt"
      ></div>
    </article>
    <ArticleInfo :info="info" :showTag="showTag" />
  </div>
</template>
