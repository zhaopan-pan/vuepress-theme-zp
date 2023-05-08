<script setup lang="ts">
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { computed, PropType } from 'vue'
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

// 图片、描述、摘要有一个即展示
const showCoverInfo = computed(
  () => info.cover || info.description || info.excerpt
)

// 优先取描述，没有描述取摘要
const excerptContent = computed(() => info.description || info.excerpt)

const toDetail = (): unknown => router.push(path)
</script>
<template>
  <article class="article-item cp" @click="toDetail">
    <div class="article-name">
      {{ info.title }}
    </div>
    <div class="cover-info">
      <div
        v-if="showCoverInfo"
        class="cover-info-text"
        v-html="excerptContent"
      />
      <img
        v-if="info.cover"
        class="article-cover"
        :src="info.cover"
        alt="article-cover"
      />
    </div>
    <ArticleInfo :info="info" :showTag="showTag" />
  </article>
</template>
