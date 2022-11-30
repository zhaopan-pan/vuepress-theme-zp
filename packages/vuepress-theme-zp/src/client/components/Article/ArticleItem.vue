<template>
  <div class="article-list-wrapper">
    <RouterLink class="tag-num" :to="path">
      {{ info.title }}
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IArticleItem } from '@vuepressSrc/shared/index.js'

const { data } = defineProps({
  data: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
})
const { path, info } = data
</script>
<style lang="scss">
.article-list-wrapper {
  width: 100%;
}
</style>
