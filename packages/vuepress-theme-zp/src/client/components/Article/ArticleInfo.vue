<template>
  <div class="article-info-wrapper">
    <ZpIcons
      v-if="author"
      icon="PersonOutlineFilled"
      iconSize="1"
      link="#"
      :text="author"
    />
    <ZpIcons icon="AccessTimeFilled" iconSize="1" link="#">
      {{ yearMouthDay(date) }}
    </ZpIcons>
    <ZpIcons
      v-if="tag && tag.length"
      icon="Tag"
      iconSize="1"
      :link="`/tag/${tag[0]}/`"
    >
      {{ tag[0] }}
    </ZpIcons>
    <ZpIcons
      v-if="category && category.length"
      icon="FolderRegular"
      iconSize="1"
      :link="`/category/${category[0]}/`"
    >
      {{ category[0] }}
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
const { date, author, tag, category } = data

const yearMouthDay = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
}
</script>
<style lang="scss">
.article-info-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}
</style>
