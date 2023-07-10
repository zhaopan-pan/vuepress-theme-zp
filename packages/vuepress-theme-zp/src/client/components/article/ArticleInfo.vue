<script setup lang="ts">
import { useCategory, useTag } from '@theme-zp-client/composables/index.js'
import { formatDate, IconNameMap } from '@theme-zp-client/utils/index.js'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  info: {
    type: Object as PropType<IArticleItem['info']>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})
const { date, author, tag, category = [] } = props.info

const router = useRouter()
const categoryList = useCategory()
const tags = useTag()
// 分类和标签放在一起 方便取值 {分类1:{},标签1:{}}
const categoryTagsObj = computed(() => ({
  ...categoryList.value.map,
  ...tags.value.map,
}))

const toCategory = (link: string): void => {
  link && router.push(link)
}
</script>
<template>
  <div class="article-info-wrapper">
    <ZpIcons
      v-if="author"
      :icon="IconNameMap['author']"
      iconSize="1"
      link="#12"
      :text="author"
      class="article-info-items"
    />
    <ZpIcons
      :icon="IconNameMap['date']"
      iconSize="1"
      link="#"
      class="article-info-items"
    >
      {{ formatDate(date) }}
    </ZpIcons>
    <ZpIcons
      v-if="tag && tag.length"
      :icon="IconNameMap['tag']"
      iconSize="1"
      :link="`${categoryTagsObj[tag[0]]?.path}`"
      class="article-info-items"
    >
      {{ tag[0] }}
    </ZpIcons>
    <ZpIcons
      v-if="category.length"
      :icon="IconNameMap['category']"
      iconSize="1"
      class="article-info-items"
    >
      <span
        v-for="(item, index) in category"
        :key="index"
        class="category-text"
        @click.stop.prevent="toCategory(`${categoryTagsObj[item]?.path}`)"
      >
        {{ item }}
      </span>
    </ZpIcons>
  </div>
</template>
<style lang="scss"></style>
