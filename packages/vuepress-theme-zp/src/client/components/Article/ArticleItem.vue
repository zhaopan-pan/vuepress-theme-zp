<template>
  <div class="article-item">
    <RouterLink class="article-name text-overflow-ellipsis" :to="path">
      {{ info.title }}
    </RouterLink>
    <div v-html="info.excerpt"></div>
    <ArticleInfo :data="info" />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IArticleItem } from '@vuepressSrc/shared/index.js'
import ArticleInfo from './ArticleInfo.vue'

const { data } = defineProps({
  data: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
})

const { path, info } = data
</script>
