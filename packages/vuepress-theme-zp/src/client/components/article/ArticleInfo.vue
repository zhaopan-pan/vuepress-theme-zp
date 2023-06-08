<script setup lang="ts">
import { useCategory, useTag } from '@theme-zp-client/composables/index.js'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDate } from '@theme-zp-client/utils/index.js'

const props = defineProps({
  info: {
    type: Object as PropType<IArticleItem['info']>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})
const { date, author, tag, category = [] } = props.info

const categoryList = useCategory()
const tags = useTag()
// 分类和标签放在一起 方便取值 {分类1:{},标签1:{}}
const categoryTagsObj = computed(() => ({
  ...categoryList.value.map,
  ...tags.value.map,
}))
</script>
<template>
  <div class="article-info-wrapper">
    <ZpIcons
      v-if="author"
      icon="PersonOutlineRound"
      iconSize="1.1"
      :iconProps="{ viewBox: '2 2 20 20' }"
      link="#12"
      :text="author"
      class="article-info-items"
    />
    <ZpIcons
      icon="AccessTimeFilled"
      iconSize="1"
      :iconProps="{ viewBox: '1 1 22 22' }"
      link="#"
      class="article-info-items"
    >
      {{ formatDate(date) }}
    </ZpIcons>
    <ZpIcons
      v-if="tag && tag.length"
      icon="Tag"
      iconSize="1.1"
      :link="`${categoryTagsObj[tag[0]]?.path}`"
      class="article-info-items"
    >
      {{ tag[0] }}
    </ZpIcons>
    <ZpIcons
      v-if="category.length"
      icon="FolderRegular"
      :iconProps="{ viewBox: '-30 -30 600 600' }"
      iconSize="1.1"
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
<style lang="scss"></style>
