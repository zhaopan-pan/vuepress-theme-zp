<template>
  <div class="article-info-wrapper">
    <ZpIcons
      v-if="author"
      icon="PersonOutlineFilled"
      iconSize="1"
      link="#"
      :text="author"
      class="article-info-items"
    />
    <ZpIcons icon="AccessTimeFilled" iconSize="1" link="#">
      {{ yearMouthDay(date) }}
    </ZpIcons>
    <ZpIcons
      v-if="tag && tag.length"
      icon="Tag"
      iconSize="1"
      :link="`${categoryTagsObj[tag[0]]?.path}`"
      class="article-info-items"
    >
      {{ tag[0] }}
    </ZpIcons>
    <ZpIcons
      icon="FolderRegular"
      iconSize="1"
      v-if="category.length"
      class="article-info-items"
    >
      <RouterLink
        v-for="(item, index) in category"
        :key="index"
        :to="`${categoryTagsObj[item]?.path}`"
        class="category-text"
      >
        {{ item }}
      </RouterLink>
    </ZpIcons>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { RouterLink } from 'vue-router'
import { useCategory, useTag } from '@theme-zp-client/composables/index.js'
const { data } = defineProps({
  data: {
    type: Object as PropType<IArticleItem['info']>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})
const { date, author, tag, category = [] } = data

const categoryList = useCategory()
const tags = useTag()
// 分类和标签放在一起 方便取值 {分类1:{},标签1:{}}
const categoryTagsObj = computed(() => ({
  ...categoryList.value.map,
  ...tags.value.map,
}))

const yearMouthDay = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
}
</script>
<style lang="scss"></style>
