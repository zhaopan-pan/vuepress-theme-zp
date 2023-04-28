<script setup lang="ts">
import { createRandomNum } from '../../utils/index.js'

const props = defineProps({
  blogKey: {
    type: String,
    required: false,
    default: '',
  },
  tagMap: {
    type: Object,
    required: true,
    default: Object,
  },
})
const isCategory = props.blogKey === 'category'
</script>

<template>
  <RouterLink
    v-for="({ items, path }, name) in tagMap.map"
    :key="name"
    :to="path"
    :class="!isCategory ? `${props.blogKey}-${createRandomNum(0, 4)}` : blogKey"
  >
    {{ name }}
    <span :class="`${blogKey}-num`">
      {{ items.length }}
    </span>
  </RouterLink>
</template>

<style scoped></style>
