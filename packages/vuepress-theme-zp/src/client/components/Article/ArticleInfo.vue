<template>
  <div class="article-item-wrapper">
    <ZpIcons icon="PersonOutlineFilled" iconSize="20" link="#">authors</ZpIcons>
    <ZpIcons icon="AccessTimeFilled" iconSize="20" link="#">
      {{ yearMouthDay(date) }}
    </ZpIcons>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { IArticleItem } from '@vuepressSrc/shared/index.js'

const { data } = defineProps({
  data: {
    type: Object as PropType<IArticleItem['info']>,
    required: true,
  },
})

const yearMouthDay = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
}

console.log(data)
const { date, author } = data
</script>
<style lang="scss">
.article-item-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
</style>
