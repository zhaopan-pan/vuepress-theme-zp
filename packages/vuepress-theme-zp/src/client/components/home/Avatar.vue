<script setup lang="ts">
import { computed } from 'vue'
import { useThemeData } from '../../composables/index.js'

const props = defineProps({
  size: { type: Number, default: 5 },
})
const themeData = useThemeData()

const imgStyle = computed(() => ({
  height: `${props.size}rem`,
  width: `${props.size}rem`,
  borderRadius: `${props.size}rem`,
}))

const blogInfo = themeData.value?.blog || null
</script>

<template>
  <img
    class="author-avatar"
    :src="blogInfo.avatar || ''"
    alt="avatar"
    srcset=""
    :style="imgStyle"
  />
</template>

<style lang="scss" scoped></style>
