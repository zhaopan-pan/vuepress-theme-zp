<template>
  <RouterLink
    v-for="({ items, path }, name) in tagMap.map"
    :key="name"
    :to="path"
    :class="!isCategory ? `${blogKey}-${createRandomNum(0, 4)}` : blogKey"
  >
    {{ name }}
    <span :class="`${blogKey}-num`">
      {{ items.length }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { createRandomNum } from '../../utils/index.js'

const { blogKey, tagMap } = defineProps({
  isCategory: {},
  blogKey: {
    type: String,
    required: false,
    default: '',
  },
  tagMap: {
    type: Object,
    required: true,
    default: { map: [] },
  },
})
const isCategory = blogKey === 'category'

console.log(createRandomNum(0, 4))
console.log({ blogKey })
</script>

<style scoped></style>
